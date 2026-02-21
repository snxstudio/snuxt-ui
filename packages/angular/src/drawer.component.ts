import { Component, input, output, signal } from '@angular/core'

@Component({
  selector: 'snx-drawer',
  standalone: true,
  template: `
    @if (open()) {
      <div class="snx-drawer-overlay" (click)="close()"></div>
      <div
        [class]="'snx-drawer-content snx-drawer-content-' + side()"
        role="dialog"
        aria-modal="true"
        (keydown.escape)="close()"
      >
        <ng-content />
        <button class="snx-drawer-close" (click)="close()" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    }
  `,
})
export class SnxDrawerComponent {
  side = input<'left' | 'right' | 'top' | 'bottom'>('right')
  open = signal(false)
  openChange = output<boolean>()

  show() { this.open.set(true); this.openChange.emit(true) }
  close() { this.open.set(false); this.openChange.emit(false) }
  toggle() { this.open.update(v => !v); this.openChange.emit(this.open()) }
}

@Component({ selector: 'snx-drawer-header', standalone: true, template: `<div class="snx-drawer-header"><ng-content /></div>` })
export class SnxDrawerHeaderComponent {}

@Component({ selector: 'snx-drawer-footer', standalone: true, template: `<div class="snx-drawer-footer"><ng-content /></div>` })
export class SnxDrawerFooterComponent {}

@Component({ selector: 'snx-drawer-title', standalone: true, template: `<h2 class="snx-drawer-title"><ng-content /></h2>` })
export class SnxDrawerTitleComponent {}

@Component({ selector: 'snx-drawer-description', standalone: true, template: `<p class="snx-drawer-description"><ng-content /></p>` })
export class SnxDrawerDescriptionComponent {}

@Component({ selector: 'snx-drawer-body', standalone: true, template: `<div class="snx-drawer-body"><ng-content /></div>` })
export class SnxDrawerBodyComponent {}
