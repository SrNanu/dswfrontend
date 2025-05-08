import { AfterViewInit, Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { Attention } from '../../interfaces/attention';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AttentionService } from '../../services/attentions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PayConfirmationDialogComponent } from '../pay-confirmation-dialog/pay-confirmation-dialog.component';


@Component({
  selector: 'app-list-attention',
  templateUrl: './list-attention.component.html',
  styleUrls: ['./list-attention.component.css']
})
export class ListAttentionsComponent implements OnInit, AfterViewInit {
displayedColumns: string[] = ['estado', 'date', 'consultationHours', 'patient', 'medic', 'dateCancelled', 'paymentDate', "acciones"];
  dataSource: MatTableDataSource<Attention>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _attentionService: AttentionService,
    private _snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log(localStorage.getItem('token'));  // Solo se ejecuta en el navegador
    }

    this.obtenerAttentions();
    this.dataSource.filterPredicate = (data: Attention, filter: string) => {
      const filterText = filter.trim().toLowerCase();

      const fieldsToCheck = [
        data.date ? new Date(data.date).toLocaleDateString() : "",
        data.consultationHours?.startTime || "",
        data.patient?.dni?.toString() || "",
        data.consultationHours?.medic?.firstname || "",
        data.consultationHours?.medic?.lastname || "",
        data.consultationHours?.medic?.specialty?.name || "",
        data.dateCancelled ? new Date(data.dateCancelled).toLocaleString() : "",
        data.paymentDate ? new Date(data.paymentDate.toString()).toLocaleString() : "",
      ];

      return fieldsToCheck.some(value => value.toLowerCase().startsWith(filterText));
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerAttentions() {
    this._attentionService.getAttentions().subscribe(data => {
     // console.log('Data recibida del backend:', data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error al obtener attentions:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditAttention(id?: number) {
    console.log('id:', id);
    /*
    const dialogRef = this.dialog.open(AgregarEditarAttentionComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.obtenerAttentions();
      }
    });
    */
  }

payAttention(id: number) {
  this._attentionService.getAttention(id).subscribe(attention => {
    if (attention.dateCancelled) {
      this.errorMessage("Esta atención ya ha sido cancelada.");
      return;
    }
    
    if (attention && attention.paymentDate) {
      this.errorMessage("Esta atención ya ha sido pagada.");
      return;
    }


    if (!attention.consultationHours || !attention.consultationHours.medic) {
      this.errorMessage("No se pudo obtener el médico de la atención.");
      return;
    }

    const amountToPay = attention.consultationHours.medic.medicalConsultationValue || 0; // Tomar el precio del médico

    const dialogRef = this.dialog.open(PayConfirmationDialogComponent, {
      width: '350px',
      data: { amount: amountToPay }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si el usuario confirma
        attention.paymentDate = new Date().toISOString();
        this._attentionService.updateAttention(id, attention).subscribe(
          () => {
            this.obtenerAttentions();
            this.successMessage("El pago fue registrado con éxito");
          },
          (updateError) => {
            console.error('Error al actualizar la atención:', updateError);
          }
        );
      }
    });
  }, (error) => {
    console.error('Error al obtener la atención:', error);
  });
}


async cancelAttention(id: number) {
  try {
    const attention = await this._attentionService.getAttention(id).toPromise(); // Obtener la atención

    // Verificar si ya está cancelada
    if (attention && attention.dateCancelled) {
      this.errorMessage("Esta atención ya ha sido cancelada.");
      return;
    }

    // Verificar si ya fue pagada
    if (attention && attention.paymentDate) {
      this.errorMessage("Esta atención ya ha sido pagada.");
      return;
    }

    if (!attention) {
      this.errorMessage("No se pudo obtener la atención.");
      return;
    }

    const attentionDate = new Date(attention.date);
    const currentDate = new Date();
    const diffTime = attentionDate.getTime() - currentDate.getTime();
    const diffHours = diffTime / (1000 * 3600);

    if (diffHours < 24) {
      this.errorMessage('No se puede cancelar el turno. El mismo está dentro de las 24 horas.');
      return;
    }

    // Si pasó todas las validaciones, recién ahí se pide confirmación
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: "¿Estás seguro de que deseas cancelar esta atención?" }
    });

    const dialogResult = await dialogRef.afterClosed().toPromise(); // Esperar la respuesta del diálogo

    if (!dialogResult) {
      return; // Si el usuario no confirma, no hacer nada
    }

    attention.dateCancelled = new Date().toISOString(); // Actualizar la fecha de cancelación
    await this._attentionService.updateAttention(id, attention).toPromise(); // Actualizar la atención

    this.obtenerAttentions(); // Obtener las atenciones actualizadas
    this.successMessage("La atención fue cancelada con éxito");

  } catch (error) {
    console.error('Error al procesar la cancelación:', error);
    this.errorMessage("Ocurrió un error al intentar cancelar la atención. Por favor, inténtalo de nuevo.");
  }
}




  successMessage(msj: string) {
    this._snackBar.open(msj, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  errorMessage(error: string) {
    this._snackBar.open(error, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
