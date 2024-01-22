import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { UserModalComponent } from '../../components/user-modal/user-modal.component';
// services
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
// icons
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
// types
import type { User } from '../../types/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent, ConfirmModalComponent, MatDialogModule],
  providers: [UsersService],
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users = signal<User[]>([]);
  usersList = signal<User[]>([]);

  constructor(private usersService: UsersService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: users => {
        this.users.set(users);
        this.usersList.set(users);
      },
      error: err => {
        this.toastr.error("Something went wrong"),
        console.error(err)
      },
    })
  }

  onChange(e: any): void {
    const value = e.target.value.toLocaleLowerCase();
    this.users.set(this.usersList().filter(user => e.target.value ? user.name.toLocaleLowerCase().includes(value) || user.email.toLocaleLowerCase().includes(value) : true).map(d => d));
  }

  onDelete(id: number): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => this.users.set(this.users().filter(user => user.id !== id)),
      error: err => {
        this.toastr.error("Something went wrong", '', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        }),
        console.error(err)
      },
      complete: () => this.toastr.success('User deleted successfully', '', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      })
    })
  }

  openUserModal(user?: User): void {
    const dialogRef = this.dialog.open(UserModalComponent , {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (user && result) {
        this.usersService.updateUser(user.id, result).subscribe({
          next: res => {
            const findIndex = this.users().findIndex(item => item.id === user.id);
            this.users()[findIndex] = res;
          },
          error: err => console.error(err),
          complete: () => this.toastr.success('User updated Successfully', '', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right'
          })
        });
      } else if (result) {
        this.usersService.createUser(result).subscribe({
          next: res => this.users().push(res),
          error: err => {
            this.toastr.error("Something went wrong", '', {
              closeButton: true,
              progressBar: true,
              positionClass: 'toast-bottom-right'
            }),
            console.error(err)
          },
          complete: () => this.toastr.success('User created Successfully', '', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right'
          })
        });
      }
    });
  }

  openConfirmationModal(id: number): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {onDelete: () => this.onDelete(id)}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
