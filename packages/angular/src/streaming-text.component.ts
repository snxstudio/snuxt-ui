import { Component } from '@angular/core'

@Component({
  selector: 'snx-streaming-text',
  standalone: true,
  template: `<div class="snx-streaming-text-cursor"><ng-content /></div>`,
})
export class SnxStreamingTextComponent {}

@Component({
  selector: 'snx-streaming-text-fade-in',
  standalone: true,
  template: `<span class="snx-streaming-text-fade-in"><ng-content /></span>`,
})
export class SnxStreamingTextFadeInComponent {}

@Component({
  selector: 'snx-streaming-text-word',
  standalone: true,
  template: `<span class="snx-streaming-text-word"><ng-content /></span>`,
})
export class SnxStreamingTextWordComponent {}

@Component({
  selector: 'snx-streaming-text-line',
  standalone: true,
  template: `<div class="snx-streaming-text-line"><ng-content /></div>`,
})
export class SnxStreamingTextLineComponent {}

@Component({
  selector: 'snx-streaming-text-skeleton',
  standalone: true,
  template: `<div class="snx-streaming-text-skeleton"><ng-content /></div>`,
})
export class SnxStreamingTextSkeletonComponent {}

@Component({
  selector: 'snx-streaming-text-skeleton-line',
  standalone: true,
  template: `<div class="snx-streaming-text-skeleton-line"></div>`,
})
export class SnxStreamingTextSkeletonLineComponent {}
