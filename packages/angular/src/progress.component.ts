import { Component, input, computed } from '@angular/core'

@Component({
  selector: 'snx-progress',
  standalone: true,
  template: `
    <div class="snx-progress" role="progressbar"
         [attr.aria-valuenow]="value()" [attr.aria-valuemin]="0" [attr.aria-valuemax]="max()">
      <div class="snx-progress-indicator" [style.transform]="transform()"></div>
    </div>
  `,
})
export class SnxProgressComponent {
  value = input(0)
  max = input(100)
  transform = computed(() => {
    const pct = Math.min(Math.max((this.value() / this.max()) * 100, 0), 100)
    return `translateX(-${100 - pct}%)`
  })
}
