import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import type { TaskStatus } from '../../../features/projects/models/task.model';

@Component({
  selector: 'app-task-status-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-status-badge.html',
})
export class TaskStatusBadge {
  // Le même badge peut être utilisé partout avec un statut en entrée.
  readonly status = input.required<TaskStatus>();
}
