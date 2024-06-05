import { Component, OnInit } from '@angular/core';
import { Menu, MenuLocation } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'hero-bar-dev',
  templateUrl: './hero-bar-dev.component.html',
  styleUrls: ['./hero-bar-dev.component.scss']
})
export class HeroBarDevComponent implements OnInit {

  public menu: Menu = {
    items: [],
    label: "",
    location: MenuLocation.AuxiliaryMenu
  }

  constructor() { }

  ngOnInit(): void {
  }

}
