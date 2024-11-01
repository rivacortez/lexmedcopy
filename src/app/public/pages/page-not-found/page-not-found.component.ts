import { Component } from '@angular/core';
import {ToolbarContentComponent} from '../../components/toolbar-content/toolbar-content.component';
import {FooterContentComponent} from '../../components/footer-content/footer-content.component';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  standalone: true,
  imports: [
    ToolbarContentComponent,
    FooterContentComponent
  ],
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
