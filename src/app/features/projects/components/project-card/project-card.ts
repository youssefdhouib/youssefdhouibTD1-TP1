import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  KeyValuePipe,
  NgStyle,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import type { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  // Les pipes Angular utilisés dans le template doivent être importés
  // car ce composant est standalone.
  imports: [
    TaskList,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    SlicePipe,
    KeyValuePipe,
    NgStyle,
    HighlightDirective,
  ],
  templateUrl: './project-card.html',
  host: { class: 'block h-full' },
})
export class ProjectCard {
  // Required input: ProjectList passes one project with [project].
  readonly project = input.required<Project>();
  // Output event: sends the selected Project object back to ProjectList.
  readonly projectSelected = output<Project>();

  // Calcule la proportion des tâches terminées.
  // La valeur 0 évite une division par zéro pour un projet sans tâche.
  readonly completionRate = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) {
      return 0;
    }

    const completedTasks = tasks.filter(task => task.status === 'Terminé').length;
    return completedTasks / tasks.length;
  });

  // L'accesseur choisit la couleur de la barre à partir du pourcentage réel.
  get barColor(): string {
    const percentage = this.completionRate() * 100;
    if (percentage < 34) {
      return '#ef4444';
    }
    if (percentage <= 66) {
      return '#f59e0b';
    }
    return '#22c55e';
  }

  // Calcule le coût moyen d'une tâche à partir du budget du projet.
  readonly averageTaskCost = computed(() => {
    const project = this.project();
    return project.tasks.length === 0 ? 0 : project.budget / project.tasks.length;
  });

  // Regroupe le nombre de tâches par priorité pour l'affichage avec keyvalue.
  readonly tasksByPriority = computed(() => {
    const counts = { Haute: 0, Moyenne: 0, Basse: 0 };

    for (const task of this.project().tasks) {
      counts[task.priority]++;
    }

    return counts;
  });

  // Called by the button click; read the input signal with project() and emit it.
  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
