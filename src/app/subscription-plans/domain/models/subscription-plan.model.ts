export class SubscriptionPlan {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public type: string
  ) {}
}
