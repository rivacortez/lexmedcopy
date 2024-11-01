import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SnackbarModule } from '../../../public/components/snackbar/snackbar.module';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';

@NgModule({
    declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule,
    SnackbarModule,
    ToolbarContentComponent
  ],
    exports: [LoginComponent]
})
export class LoginModule { }
