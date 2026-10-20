import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appOverdue]', standalone: true, exportAs: 'appOverdue' })
export class OverdueDirective {
  @Input() dueDate?: string;
  @Input() done = false;

  get isOverdue(): boolean {
    if (this.done || !this.dueDate) {
      return false;
    }
    // Une échéance est dépassée après son jour, pas au début de celui-ci.
    const deadline = new Date(`${this.dueDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline.getTime() < today.getTime();
  }

  // Ces classes s'ajoutent aux classes déjà présentes sur la ligne.
  @HostBinding('class')
  get overdueClasses(): string {
    return this.isOverdue ? 'border-red-500 bg-red-50' : '';
  }
}
