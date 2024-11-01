import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListRequestComponent} from './request-service/components/list-request/list-request.component';
import {RequestHistoryComponent} from './request-service/components/request-history/request-history.component';
import {RequestComponent} from './request-service/components/request/request.component';
import {RegisterComponent} from './iam/components/register/register.component';
import {LoginComponent} from './iam/components/login/login.component';
import {
  SubscriptionPlanRepositoryImpl
} from './subscription-plans/infrastructure/repositories/subscription-plan.repository.repository.impl';
import {LawyerListComponent} from './public/pages/lawyer-list/lawyer-list.component';
import {ProfileComponent} from './public/pages/profile/profile.component';
import {EditProfileComponent} from './public/pages/edit-profile/edit-profile.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {
  SubscriptionPlansComponent
} from './subscription-plans/ui/components/subscription-plans/subscription-plans.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'request/new', component: RequestComponent },
  { path: 'list-history-request', component: RequestHistoryComponent },
  { path: 'list-request', component: ListRequestComponent },
  { path: 'subscription-plans', component: SubscriptionPlansComponent },
  { path: 'abogados', component: LawyerListComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'editar-perfil', component: EditProfileComponent },
  { path: '', redirectTo: 'abogados', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
