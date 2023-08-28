import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'custom-view-template',
  templateUrl: './custom-view-template.component.html',
  styleUrls: ['./custom-view-template.component.scss'],
  animations: []
})
export class CustomViewTemplateComponent implements OnInit {

  @Input() showLoader: boolean = true;

  constructor(
    public readonly routing: RoutingService
  ) { }

  ngOnInit(): void { }
}
