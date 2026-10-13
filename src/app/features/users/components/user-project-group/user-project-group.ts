import { Component, input } from '@angular/core';
import { TaskList } from '../../../projects/components/task-list/task-list';
import type { Project } from '../../../projects/models/project.model';
import type { Task } from '../../../projects/models/task.model';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [TaskList],
  styleUrl: './user-project-group.css',
  templateUrl: './user-project-group.html',
})
export class UserProjectGroup {
  readonly project = input.required<Project>();
  readonly tasks = input.required<Task[]>();
}
