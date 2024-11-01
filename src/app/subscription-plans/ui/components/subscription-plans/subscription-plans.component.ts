import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../../domain/models/subscription-plan.model';
import { SubscriptionPlansFacade } from '../../../application/services/subscription-plans.facade.service';
import {SubscriptionPlanService} from '../../../application/services/subscription-plan.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ToolbarContentComponent} from '../../../../public/components/toolbar-content/toolbar-content.component';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatButton,
    MatCardActions,
    MatCardImage,
    ToolbarContentComponent
  ],
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  subscriptionPlans$: Observable<SubscriptionPlan[]> = new Observable<SubscriptionPlan[]>();

  constructor(private subscriptionPlanService: SubscriptionPlanService) {}

  ngOnInit(): void {
    this.subscriptionPlans$ = this.subscriptionPlanService.getAllPlans();
  }
}
