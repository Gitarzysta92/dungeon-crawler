import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'tile',
  template: `<div>
              <div></div>
              <div class="content-wrapper">
                <div>
                  <ng-content></ng-content>
                </div>
              </div>
            </div>`,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() backgroundImage: string = ''

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _host: ElementRef
  ) { }

  ngOnInit(): void {    
    this._renderer.setStyle(this._host.nativeElement.querySelector('div:first-child'), 'background-image', `url('${this.backgroundImage}')`)
  }

}
