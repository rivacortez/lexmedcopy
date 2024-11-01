import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionPlanRepository } from '../../domain/repositories/subscription-plan.repository';
import { SubscriptionPlan } from '../../domain/models/subscription-plan.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  private readonly apiUrl = 'http://localhost:3000/subscriptionPlans';

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((plan) => new SubscriptionPlan(plan.id, plan.title, plan.description, plan.price, plan.type))
      )
    );
  }
}
