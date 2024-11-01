import {Component, inject, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatDivider } from "@angular/material/divider";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { UserApiService } from "../../services/user-api.service";
import { User } from "../../model/user";  // Importa lo necesario para Reactive Forms

@Component({
  selector: 'app-register',
  /*standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDivider,
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    MatInput,
    RouterLink,
    MatLabel
    // Asegúrate de usar ReactiveFormsModule
  ],*/
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  @Input() email = '';
  @Input() specialization = '';
  @Input() name = '';
  @Input() password = '';

  userApi = inject(UserApiService);


  constructor(private router: Router) { }

  onSubmit() {
    this.userApi.register(this.name, this.specialization, this.email, this.password).subscribe();
    this.router.navigate(['/perfil']);

  }
}
