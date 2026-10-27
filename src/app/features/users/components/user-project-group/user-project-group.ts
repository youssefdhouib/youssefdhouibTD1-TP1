import { Component, input, output } from '@angular/core';
import { TaskList } from '../../../projects/components/task-list/task-list';
import type { Project } from '../../../projects/models/project.model';
import type { Task, TaskStatus } from '../../../projects/models/task.model';

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
  readonly taskDelete = output<{ projectId: number; taskId: number }>();
  readonly taskStatusChange = output<{ projectId: number; taskId: number; status: TaskStatus }>();

  // Identifie le projet avant de remonter l'événement vers UserCard.
  onTaskStatusChange(event: { taskId: number; status: TaskStatus }): void {
    this.taskStatusChange.emit({ ...event, projectId: this.project().id });
  }
}
