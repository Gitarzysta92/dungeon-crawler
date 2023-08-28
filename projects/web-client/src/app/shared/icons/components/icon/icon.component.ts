import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { Icons, ICONS, IconsToken } from 'src/app/shared/icons/constants/icons';

@Component({
  selector: 'i[name]',
  template: '',
  styleUrls: ['./icon.component.scss'],
  providers: [{ provide: IconsToken, useValue: ICONS }]
})
export class IconComponent implements OnInit {

  @Input() set name(value) { 
    const glyph = this.icons[value]
     
    if (glyph) { 
      // by property
      this.glyph = glyph;
    } else {
      // by glyph name
      this.glyph = Object.values(this.icons).find(i => i === value);
    } 
  };

  @HostBinding('class.oi') oi: boolean = true;

  @HostBinding('attr.data-glyph') glyph: string = "";


  constructor(
    @Inject(IconsToken) public readonly icons: Icons
  ) { }

  ngOnInit(): void {}

}
