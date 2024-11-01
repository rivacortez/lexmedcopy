export class StatusEntity {
  id: number;
  name: string;
  description: string;

  constructor(status: { id?: number; name?: string; description?: string }) {
    this.id = status.id || 0;
    this.name = status.name || '';
    this.description = status.description || '';
  }
}
