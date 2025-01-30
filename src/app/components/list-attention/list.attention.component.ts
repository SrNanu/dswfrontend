import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Attention } from '../../interfaces/attention';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AttentionService } from '../../services/attentions.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-attention',
  templateUrl: './list-attention.component.html',
  styleUrl: './list-attention.component.css'
})
export class ListAttentionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'consultationHours', 'patient','medic', "acciones"];
  dataSource: MatTableDataSource<Attention>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _attentionService: AttentionService, private _snackBar: MatSnackBar
  ) {

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerAttentions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerAttentions() {
    this._attentionService.getAttentions().subscribe(data => {
      console.log('Data recibida del backend:', data );  
      this.dataSource.data = data;
      //console.log('DataSource data:', this.dataSource.data);  Debería mostrar los mismos datos que el log anterior
      this.dataSource.paginator = this.paginator;
      
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error al obtener attentions:', error);

      /*this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Items por pagina"
      this.dataSource.sort = this.sort;*/
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditAttention(id?: number) {
    console.log('id:', id);
     /*
    console.log('id:', id);
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
 

  detalleAttention(id?: number) {
    console.log('id:', id);
    //console.log('id:', id);
     /*
    const dialogRef = this.dialog.open(DetalleAttentionComponent, {
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

  deleteAttention(id: number) {
    this._attentionService.deleteAttention(id).subscribe(data => {
      this.obtenerAttentions();
      this.successMessage();
    }, error => {
      console.error('Error al eliminar attention:', error);
    });
  }
  successMessage() {
    this._snackBar.open('El paciente fue eliminada con exito', "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
