import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appColor]', standalone: true })
export class ColorDirective {
  // Reçoit une couleur facultative depuis le template.
  @Input() appColor = 'red';

  @HostBinding('style.color')
  get textColor(): string {
    // Avec appColor sans valeur, conserve la couleur rouge par défaut.
    return this.appColor || 'red';
  }
}
