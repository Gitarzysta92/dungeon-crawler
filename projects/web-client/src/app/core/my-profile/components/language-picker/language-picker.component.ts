import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PanelOriginDirective } from 'src/app/shared/dialogs/directives/panel-origin.directive';
import { MyProfileStore } from '../../stores/my-profile.store';


const languages = [
  { id: 1, name: "english", flagUrl: "assets/images/uk-flag.png" },
  { id: 2, name: "polish", flagUrl: "assets/images/pl-flag.png" },
]

@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent {

  @Input() selectedLanguage: number;

  private _languages: LanguageSelect[] = [];
  public languagesForView: LanguageSelect[] = [];
  public selected: Observable<LanguageSelect>;

  constructor(
    private readonly _myProfileStore: MyProfileStore
  ) { 
    this._languages = languages.map(l => new LanguageSelect(l));
    this.selected = this._myProfileStore.state
      .pipe(tap(p => this.languagesForView = this._languages.filter(l => l.id !== p.languageId)))
      .pipe(map(p => this._languages.find(l => l.id === p.languageId) || this._languages[0]))
     
  }

  public setChoosenLanguage(lang: LanguageSelect, panelOrigin: PanelOriginDirective): void {
    panelOrigin.closePanel();
    this._myProfileStore.update({ languageId: lang.id });
  }
}



class LanguageSelect {
  id: number;
  name: string;
  flagUrl: string;

  constructor(data: LanguageSelect) {
    this.id = data.id;
    this.name = data.name;
    this.flagUrl = data.flagUrl;
  }
}
