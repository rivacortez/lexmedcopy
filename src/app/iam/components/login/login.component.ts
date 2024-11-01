import { Component, inject, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel
import { UserApiService } from "../../services/user-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../public/components/snackbar/snackbar.component';


@Component({
  selector: 'app-login',
  /* standalone: true,
  imports: [MatDividerModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, RouterLink, FormsModule], // Asegúrate de importar FormsModule */
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class LoginComponent {
  userApi = inject(UserApiService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  @Input() email = '';
  @Input() password = '';

  login() {
    this.userApi.login(this.email, this.password).subscribe((users: any) => {
      if (users.length) {
        /* alert('Login exitoso'); */
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Login exitoso.',
            icon: 'close'
          }
        });
        this.router.navigate(['/perfil']);


      } else {
        /* alert('Credenciales incorrectas'); */

        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Credenciales incorrectas.',
            icon: 'close'
          }
        });
      }
    });
  }
}
