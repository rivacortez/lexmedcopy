import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from '../../service/request.service';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {AppModule} from '../../../app.module';

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    NgIf,
    MatCardTitle,
    MatError,
    MatIcon,
    MatIconButton,
    MatSelect,
    MatOption,
    NgForOf,
    ToolbarContentComponent

  ],
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.css'
})
export class AddRequestComponent {
  @Input() request: RequestServiceEntity = new RequestServiceEntity({});
  @Output() requestAddRequested = new EventEmitter<RequestServiceEntity>();
  @ViewChild('requestForm', { static: false }) requestForm!: NgForm;
  isSubmitting = false;

  constructor(private dialog: MatDialog, private requestService: RequestService) {

    this.request.statusId = 1;
  }

  onSubmit() {
    if (this.requestForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.request.creationDate = new Date().toISOString();

      this.requestService.createRequest(this.request).subscribe(
        () => {
          this.requestAddRequested.emit(this.request);
          this.resetForm();
          this.openSuccessDialog('Inquiry submitted successfully');
          this.isSubmitting = false;
        },
        (error) => {
          console.error("Error creating request", error);
          this.isSubmitting = false;
        }
      );
    } else {
      console.error("Invalid Data or Form is already submitting");
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(DialogSuccessfullyComponent, {
      data: { message }
    });
  }

  resetForm() {
    this.request = new RequestServiceEntity({});
    this.requestForm.resetForm();
    this.request.statusId = 1;
  }
}
