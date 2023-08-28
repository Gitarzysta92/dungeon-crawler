
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { IOriginState } from '../models/origin-state';
import { IPanelOrigin } from '../models/panel-origin';



@Directive({
  selector: '[panel-origin]',
  exportAs:'panel-origin'
})
export class PanelOriginDirective implements IPanelOrigin {

  public state: Subject<IOriginState> = new Subject();
  public get isOpen() { return this._open };

  private _open: boolean = false;
  private _context: any;

  @Input('onClick') set setOnClick(value) {
    this._onClick = true;
  }
  private _onClick: boolean = false;

  @HostListener('click', ['$event']) toggle() {
    if (!this._onClick) return;
    this._open = !this._open;
    this.state.next({ open: this._open, context: this._context });
  }

  constructor(
    public elementRef: ElementRef
  ) {}

  public setState(value: boolean): void {
    this._open = value;
    this.state.next({ open: this._open, context: this._context })
  }

  public openPanel(context?: any): void {
    this._context = context;
    this.setState(true);
  }

  public closePanel(): void {
    this._context = null;
    this.setState(false);
  }


}
