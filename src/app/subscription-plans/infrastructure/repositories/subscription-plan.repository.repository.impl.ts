import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionPlanRepository } from '../../domain/repositories/subscription-plan.repository';
import { SubscriptionPlan } from '../../domain/models/subscription-plan.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanRepositoryImpl implements SubscriptionPlanRepository {
  private readonly apiUrl = 'http://localhost:3000/subscriptionPlans';

  constructor(private http: HttpClient) {}

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((plan) => new SubscriptionPlan(plan.id, plan.title, plan.description, plan.price, plan.type))
      )
    );
  }
}
