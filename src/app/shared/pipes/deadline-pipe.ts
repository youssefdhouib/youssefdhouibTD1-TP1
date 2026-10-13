import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline',
  standalone: true,
})
export class DeadlinePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return "Pas d'échéance";
    }

    // Les dates du projet sont au format YYYY-MM-DD.
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) {
      return "Pas d'échéance";
    }

    // Compare uniquement les jours, sans tenir compte de l'heure courante.
    const today = new Date();
    const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const deadlineUtc = Date.UTC(year, month - 1, day);
    const differenceInDays = Math.round((deadlineUtc - todayUtc) / 86_400_000);

    if (differenceInDays === 0) {
      return "Aujourd'hui";
    }

    if (differenceInDays === 1) {
      return 'Demain';
    }

    if (differenceInDays > 1) {
      return `Dans ${differenceInDays} jours`;
    }

    const lateDays = Math.abs(differenceInDays);
    return `En retard de ${lateDays} jour${lateDays > 1 ? 's' : ''}`;
  }
}
