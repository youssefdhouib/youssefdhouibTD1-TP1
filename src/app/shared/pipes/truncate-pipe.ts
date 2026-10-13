import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    limit = 50,
    suffix = '...',
  ): string {
    // Une valeur absente donne une chaîne vide.
    if (!value) {
      return '';
    }

    // Un texte court reste inchangé.
    if (value.length <= limit) {
      return value;
    }

    // Coupe le texte, retire les espaces à la fin et ajoute le suffixe.
    return value.slice(0, limit).trimEnd() + suffix;
  }
}
