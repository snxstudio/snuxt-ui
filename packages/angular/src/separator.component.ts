import { Component, input, computed } from '@angular/core'

@Component({
  selector: 'snx-separator',
  standalone: true,
  template: `<div [class]="classes()" role="separator" [attr.aria-orientation]="orientation()"></div>`,
})
export class SnxSeparatorComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal')
  class = input('')

  classes = computed(() =>
    ['snx-separator', `snx-separator-${this.orientation()}`, this.class()].filter(Boolean).join(' ')
  )
}
