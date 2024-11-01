import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionPlanRepositoryImpl } from '../repositories/subscription-plan.repository.repository.impl';
import { SubscriptionPlanRepository } from '../../domain/repositories/subscription-plan.repository';
import { InjectionToken } from '@angular/core';

// Define un InjectionToken para SubscriptionPlanRepository
export const SUBSCRIPTION_PLAN_REPOSITORY = new InjectionToken<SubscriptionPlanRepository>('SubscriptionPlanRepository');

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: SUBSCRIPTION_PLAN_REPOSITORY, useClass: SubscriptionPlanRepositoryImpl }
  ]
})
export class DataAccessModule {}
