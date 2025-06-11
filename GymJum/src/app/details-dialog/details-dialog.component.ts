import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent, MatButtonModule],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.css'
})
export class DetailsDialogComponent {
    constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}
