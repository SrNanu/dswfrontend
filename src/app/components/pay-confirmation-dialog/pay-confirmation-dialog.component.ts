import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pay-confirmation-dialog',
  templateUrl: './pay-confirmation-dialog.component.html',
  styleUrls: ['./pay-confirmation-dialog.component.css']
})
export class PayConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PayConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { amount: number }
  ) {}

  // Método para confirmar el pago
  // Este método se llama cuando el usuario hace clic en el botón "Confirmar" en el diálogo
  confirmPayment(): void {
    this.dialogRef.close(true); // Retorna true si el usuario acepta
  }


  cancel(): void {
    this.dialogRef.close(false); // Retorna false si el usuario cancela
  }
}
  