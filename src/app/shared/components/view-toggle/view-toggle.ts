import { Component, input, output } from '@angular/core';

export type ViewMode = 'tasks' | 'users';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  readonly activeView = input.required<ViewMode>();
  readonly viewChange = output<ViewMode>();

  select(view: ViewMode): void {
    this.viewChange.emit(view);
  }
}
