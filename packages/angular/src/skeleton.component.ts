import { Component, input, computed } from '@angular/core'

@Component({
  selector: 'snx-skeleton',
  standalone: true,
  template: `<div [class]="classes()"></div>`,
})
export class SnxSkeletonComponent {
  class = input('')
  classes = computed(() => ['snx-skeleton', this.class()].filter(Boolean).join(' '))
}
