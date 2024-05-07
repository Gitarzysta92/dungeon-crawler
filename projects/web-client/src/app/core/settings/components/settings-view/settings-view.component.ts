import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { SettingsStore } from '../../stores/settings.store';
import { Observable, map, tap } from 'rxjs';
import { languages } from '../../constants/languages';
import { ILanguageDeclaration } from '../../interfaces/language.interface';

@Component({
  selector: 'settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss']
})
export class SettingsViewComponent implements OnInit {
  public selectedLanguage$: Observable<ILanguageDeclaration>;
  public languagesToSelect$: Observable<ILanguageDeclaration[]>;
  public musicVolume$: Observable<number>;
  public soundEffectsVolume$: Observable<number>;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _settingsStore: SettingsStore
  ) { }

  ngOnInit(): void {
    this.selectedLanguage$ = this._settingsStore.state$.pipe(map(s => languages.find(l => s.languageCode === l.code)));
    this.languagesToSelect$ = this._settingsStore.state$.pipe(map(s => languages.filter(l => l.code !== s.languageCode)));
    this.musicVolume$ = this._settingsStore.state$.pipe(map(s => s.sound.musicVolume));
    this.soundEffectsVolume$ = this._settingsStore.state$.pipe(map(s => s.sound.soundEffectsVolume))
  }

  public selectLang(lang: ILanguageDeclaration): void {
    this._settingsStore.changeLanguage(lang.code);
  }

  public backToMainMenu(): void {
    this._routingService.navigateToMainMenu();
  }

  public changeMusicVolume(v: number): void {
    this._settingsStore.changeMusicVolume(v);
  }

  public changeEffectsVolume(v: number): void {
    this._settingsStore.changeSoundEffectsVolume(v);
  }

}