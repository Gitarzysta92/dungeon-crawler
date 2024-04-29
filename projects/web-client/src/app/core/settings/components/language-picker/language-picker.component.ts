import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PanelOriginDirective } from 'src/app/shared/dialogs/directives/panel-origin.directive';
import { SettingsStore } from '../../stores/settings.store';

const languages: LanguageSelect[] = [
  { code: "en", name: "english", flagUrl: "assets/images/uk-flag.png" },
  { code: "pl", name: "polish", flagUrl: "assets/images/pl-flag.png" },
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
    private readonly _settingsStore: SettingsStore
  ) { 
    this._languages = languages.map(l => new LanguageSelect(l));
    this.selected = this._settingsStore.state
      .pipe(tap(p => this.languagesForView = this._languages.filter(l => l.code !== p.languageCode)))
      .pipe(map(p => this._languages.find(l => l.code === p.languageCode) || this._languages[0]))
     
  }

  public setChoosenLanguage(lang: LanguageSelect, panelOrigin: PanelOriginDirective): void {
    panelOrigin.closePanel();
    this._settingsStore.changeLanguage(lang.code);
  }
}



class LanguageSelect {
  code: string;
  name: string;
  flagUrl: string;
  constructor(data: LanguageSelect) {
    Object.assign(this, data);
  }
}
