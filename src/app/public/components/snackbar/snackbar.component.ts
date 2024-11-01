import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-snackbar',
  /* standalone: true, */
  /* imports: [MatSnackBarModule, FormsModule, MatIconModule, MatButtonModule, MatProgressBarModule], */
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data: { message: string; icon: string } = inject(MAT_SNACK_BAR_DATA);
  progress: number = 100;

  constructor() {
    this.startProgress();
  }

  startProgress() {
    const intervalTime = 100; // Tiempo de actualización en milisegundos
    const duration = this.snackBarRef.containerInstance.snackBarConfig.duration || 3000; // Duración del snackbar en milisegundos
    const decrementValue = 100 / (duration / intervalTime); // Valor a decrementar por cada intervalo

    const interval = setInterval(() => {
      this.progress -= decrementValue;

      if (this.progress <= 0) {
        clearInterval(interval); // Detiene el intervalo cuando la barra llegue a 0
        this.snackBarRef._dismissAfter(200);
      }
    }, intervalTime);
  }
}
