import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menus-footer',
  templateUrl: './menus-footer.component.html',
  styleUrls: ['./menus-footer.component.scss']
})
export class MenusFooterComponent implements OnInit {


  public socials: { iconName: string, link: string }[] = [
    { iconName: "kickstarter", link: "" }
  ]

  constructor() { }

  ngOnInit(): void { }
  
  public openLink(url: string): void {
    //this._externalLinkService.openExternalLink(url);
  }

}
