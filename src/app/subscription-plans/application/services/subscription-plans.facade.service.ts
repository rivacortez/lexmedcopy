import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../domain/models/subscription-plan.model';
import { SubscriptionPlanService } from './subscription-plan.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansFacade {
  constructor(private subscriptionPlanService: SubscriptionPlanService) {}

  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this.subscriptionPlanService.getAllPlans();
  }
}
