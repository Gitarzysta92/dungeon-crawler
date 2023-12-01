import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[attachedOverlay]',
  exportAs: 'attachedOverlay'
})
export class AttachedOverlayDirective {

  @Input('attachedOverlay') template: TemplateRef<any>;

  embed: any;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _host: ElementRef,
    private readonly _viewContainerRef: ViewContainerRef,
  ) { 
  }

  public close(): void {
    if (this.embed) 
      this.embed.detach();
  }

  public open(context?: any): void {
    this.close();

    this.embed = this._overlay.create({
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._host).withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -40,
          offsetY: -20
        }
      ])
    });

    const portal =  new TemplatePortal(this.template, this._viewContainerRef, { $implicit: context });
    this.embed.attach(portal);
  }

}
