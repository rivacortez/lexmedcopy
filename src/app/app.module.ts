import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarModule } from './public/components/snackbar/snackbar.module';
import { RegisterModule } from './iam/components/register/register.module';
import { LoginModule } from './iam/components/login/login.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { ListRequestComponent } from './request-service/components/list-request/list-request.component';
import { RequestHistoryComponent } from './request-service/components/request-history/request-history.component';
import { RequestComponent } from './request-service/components/request/request.component';
import { SubscriptionPlansComponent } from './subscription-plans/ui/components/subscription-plans/subscription-plans.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { DoctorCardsComponent } from './legal-cases/components/doctor-cards/doctor-cards.component';
import { FiltersComponent } from './legal-cases/components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorCardsComponent,
    FiltersComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    LoginModule,
    RegisterModule,
    SnackbarModule,
    CommonModule,
    MatCardModule,
    PageNotFoundComponent,
    RequestHistoryComponent,
    SubscriptionPlansComponent,
    RequestComponent,
    ListRequestComponent,
    MatSidenavModule,
    MatIconModule,

  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
