import { Component, Inject } from '@angular/core';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
