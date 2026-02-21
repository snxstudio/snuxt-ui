import { Component, input, output, signal, computed } from '@angular/core'

@Component({
  selector: 'snx-switch',
  standalone: true,
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [attr.aria-disabled]="disabled()"
      [disabled]="disabled()"
      [class]="'snx-switch'"
      (click)="toggle()"
      (keydown.space)="$event.preventDefault(); toggle()"
      (keydown.enter)="$event.preventDefault(); toggle()"
    >
      <span class="snx-switch-thumb"></span>
    </button>
  `,
})
export class SnxSwitchComponent {
  checked = signal(false)
  disabled = input(false)
  checkedChange = output<boolean>()

  toggle() {
    if (this.disabled()) return
    this.checked.update(v => !v)
    this.checkedChange.emit(this.checked())
  }
}
