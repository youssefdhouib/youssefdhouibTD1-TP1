import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    // Une valeur absente donne le caractère demandé par l'énoncé.
    if (!value) {
      return '?';
    }

    // Nettoie les espaces, garde les deux premiers mots et prend leur initiale.
    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}

