import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<UserModalComponent>) { }

  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.userForm.setValue({
        email: this.data.email,
        name: this.data.name,
        phone: this.data.phone
      })
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const values = this.userForm.value;
    if (values.name && values.email && values.phone) {
      this.dialogRef.close(this.userForm.value);
    }
    return;
  }
}
