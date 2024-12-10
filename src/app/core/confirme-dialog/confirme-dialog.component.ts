import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirme-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirme-dialog.component.html',
  styleUrl: './confirme-dialog.component.css'
})
export class ConfirmeDialogComponent {


  #dialogRef= inject(MatDialogRef<ConfirmeDialogComponent>)

  onNoClick(): void {
    this.#dialogRef.close(false);
  }
  onYesClick(): void {
    this.#dialogRef.close(true);
  }
}
