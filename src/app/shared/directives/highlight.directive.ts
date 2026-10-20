import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() appHighlight = '#fef9c3';
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private originalBackground = '';

  @HostListener('mouseenter')
  onEnter(): void {
    // Conserve le style initial pour retrouver le fond défini par Tailwind.
    this.originalBackground = this.element.nativeElement.style.backgroundColor;
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.appHighlight || '#fef9c3');
  }

  @HostListener('mouseleave')
  onLeave(): void {
    if (this.originalBackground) {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', this.originalBackground);
    } else {
      this.renderer.removeStyle(this.element.nativeElement, 'background-color');
    }
  }
}
