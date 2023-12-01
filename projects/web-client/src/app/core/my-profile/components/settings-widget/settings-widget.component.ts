import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MySettingsStore } from '../../stores/my-settings.store';

@Component({
  selector: 'settings-widget',
  templateUrl: './settings-widget.component.html',
  styleUrls: ['./settings-widget.component.scss']
})
export class SettingsWidgetComponent implements OnInit, OnDestroy {

  public isMuted: boolean = false;

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _mySettingsStore: MySettingsStore
  ) { }
  
  ngOnInit(): void {
    this._mySettingsStore.state
      .pipe(takeUntil(this._destroyed))
      .subscribe(s => {
        this.isMuted = s.sound.isMuted;
      })
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public toggleSound(): void {
    this._mySettingsStore.toggleSound();
  }

}
