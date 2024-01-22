import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./pages/users/users.component')).UsersComponent,
  },
];
