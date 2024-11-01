import { SubscriptionPlan } from '../models/subscription-plan.model';

export class SubscriptionPlanDomainService {
  validatePlan(plan: SubscriptionPlan): boolean {

    return plan.price >= 0;
  }
}
