import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { TaskStatusBadge } from '../../../../shared/components/task-status-badge/task-status-badge';
import { Component, input, output } from '@angular/core';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import type { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  // Réutilise les pipes du TP3 pour la date et la description.
  imports: [DatePipe, DeadlinePipe, TruncatePipe, NgClass, NgStyle, HighlightDirective, OverdueDirective, TooltipDirective, TaskStatusBadge],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // Le parent doit obligatoirement fournir une tâche avec [task].
  readonly task = input.required<Task>();
  // Le parent fournit le nom et contrôle sa visibilité selon la vue.
  readonly showAssignee = input(true);
  readonly assigneeName = input('Non assignée');

  // L'enfant annonce le nouveau statut sans modifier son entrée task.
  readonly taskStatusChange = output<TaskStatus>();
  // Le parent reçoit la demande ; l'enfant ne supprime pas lui-même la tâche.
  readonly taskDelete = output<void>();

  changeStatus(): void {
    let nextStatus: TaskStatus;
    switch (this.task().status) {
      case 'En attente':
        nextStatus = 'En cours';
        break;
      case 'En cours':
        nextStatus = 'Terminé';
        break;
      default:
        nextStatus = 'En attente';
    }
    this.taskStatusChange.emit(nextStatus);
  }
}
