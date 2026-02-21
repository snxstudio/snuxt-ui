import { Component, input, output, computed } from '@angular/core'

@Component({
  selector: 'snx-chip',
  standalone: true,
  template: `
    <span [class]="classes()">
      <ng-content />
      @if (removable()) {
        <button type="button" class="snx-chip-remove" (click)="remove.emit()" aria-label="Remove">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      }
    </span>
  `,
})
export class SnxChipComponent {
  variant = input<'default' | 'primary' | 'outline' | 'destructive'>('default')
  removable = input(false)
  remove = output<void>()
  classes = computed(() =>
    ['snx-chip', `snx-chip-${this.variant()}`, this.removable() ? 'snx-chip-removable' : ''].filter(Boolean).join(' ')
  )
}

@Component({
  selector: 'snx-chips',
  standalone: true,
  template: `<div class="snx-chips"><ng-content /></div>`,
})
export class SnxChipsComponent {}
