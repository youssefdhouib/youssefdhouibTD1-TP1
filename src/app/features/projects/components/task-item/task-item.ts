import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  // Réutilise les pipes du TP3 pour la date et la description.
  imports: [DatePipe, DeadlinePipe, TruncatePipe, NgClass, HighlightDirective, OverdueDirective, TooltipDirective],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // Le parent doit obligatoirement fournir une tâche avec [task].
  readonly task = input.required<Task>();
  // Le parent fournit le nom et contrôle sa visibilité selon la vue.
  readonly showAssignee = input(true);
  readonly assigneeName = input('Non assignée');
}
