import { group, query, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { slideInAnimation } from '../../../animations/animations/slide-in.animation';
import { slideOutAnimation } from '../../../animations/animations/slide-out.animation';

@Component({
  selector: '[common-button]',
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.scss'],
  host: {
    "[class.blank-btn]": "isBlank"
  },
  animations: [
    trigger('loader', [
      transition('show <=> hide', [
        group([
          query(':enter', [
            style({ 
              position: 'absolute',
              top: '0',
              left: '0',
            }),
            useAnimation(slideInAnimation('fromTop'), { params: { duration: '200ms', delay: '200ms' } })
          ], { optional: true }), 
          query(':leave', [
            style({ 
              position: 'absolute',
              top: '0',
              left: '0',
            }),
            useAnimation(slideOutAnimation('toBottom'), { params: { duration: '200ms', delay: '0ms' } }),
          ], { optional: true })   
        ]) 
      ])
    ]),

  ]
})
export class CommonButtonComponent implements OnInit {
  
  @Input() loader: boolean =  false;
  // @Input() colorCode: string = 'default';
  // @Input() outlined: boolean = false;
  
  @Input() set blank(_: unknown) { this.isBlank = true; }
  public isBlank: boolean = false;

  @HostBinding('@loader') get state() { return this.loader ? 'show' : 'hide' };


  // @HostBinding('style.background-color') get backgroundColor(): string {
  //   return !this.outlined ? this._colors[this.colorCode].backgroundColor || this._colors.default.backgroundColor : 'transparent';
  // }

  // @HostBinding('style.border-color') get borderColor(): string {
  //   return this.outlined ? this._colors[this.colorCode].borderColor : 'none';
  // }

  // @HostBinding('style.color') get color(): string {
  //   return this._colors[this.colorCode].color || 'none';
  // }

  // private readonly _colors = {
  //   transparent: { backgroundColor: 'transparent', color: '#fff', borderColor: '#f6af43' },
  //   default: { backgroundColor: '#f6af43', color: '#25242a', borderColor: '#f6af43' },
  //   orange: { backgroundColor: '#f6af43', color: '#25242a', borderColor: '#f6af43' }

  // }

  constructor() { }

  ngOnInit(): void {}

}
