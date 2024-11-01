import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../models/subscription-plan.model';

export interface SubscriptionPlanRepository {
  getPlans(): Observable<SubscriptionPlan[]>;
}

