import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[forDirective]'
})
export class ForDirective implements OnChanges {
  @Input('forDirectiveIn') array: any[] = [];

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnChanges(): void {
    for (let object of this.array) {
      this.container.createEmbeddedView(this.template, { $implicit: object });
    }
  }
}
