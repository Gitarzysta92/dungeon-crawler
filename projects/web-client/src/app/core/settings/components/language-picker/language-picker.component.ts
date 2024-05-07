import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PanelOriginDirective } from 'src/app/shared/dialogs/directives/panel-origin.directive';
import { ILanguageDeclaration } from '../../interfaces/language.interface';


@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent {

  @Input() selectedLanguage: ILanguageDeclaration;
  @Input() languagesToSelect: ILanguageDeclaration[];

  @Output() onSelect: EventEmitter<ILanguageDeclaration> = new EventEmitter()

  constructor() { }

  public setChoosenLanguage(lang: ILanguageDeclaration, panelOrigin: PanelOriginDirective): void {
    panelOrigin.closePanel();
    this.onSelect.next(lang);
  }
}