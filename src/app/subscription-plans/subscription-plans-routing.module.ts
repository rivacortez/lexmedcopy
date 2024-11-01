import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionPlansComponent } from './ui/components/subscription-plans/subscription-plans.component';
const routes: Routes = [
  { path: 'subscription-plans', component: SubscriptionPlansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionPlansRoutingModule {}
