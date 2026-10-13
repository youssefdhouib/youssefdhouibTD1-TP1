import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ViewMode, ViewToggle } from './shared/components/view-toggle/view-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectList, UserList, ViewToggle],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly activeView = signal<ViewMode>('tasks');
}

