import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'multiply', standalone: true })
export class MultiplyPipe implements PipeTransform {
  transform(value: number, factor = 2): number {
    // Le facteur est optionnel : sans paramètre, on multiplie par deux.
    return value * factor;
  }
}
