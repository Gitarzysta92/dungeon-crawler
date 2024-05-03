import { Component, Input, OnInit } from '@angular/core';
import { IInfoPanelData } from '../../interfaces/info-panel.interface';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input() infoData: IInfoPanelData; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.infoData.narrative, this.infoData.visual);
  }

}
