import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
