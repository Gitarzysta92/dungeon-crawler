import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigurationService } from 'src/app/infrastructure/configuration/services/configuration.service';

@Component({
  selector: 'avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUploadComponent implements OnInit {

  @Input() fileUrl: string | undefined;
  @Output() newFile: EventEmitter<any> = new EventEmitter()

  public hovered: boolean;
  public newFileName: string;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _configurationService: ConfigurationService
  ) { 
    this.hovered = false;
  }

  ngOnInit(): void { }

  public updateAvatar(event): void {
    this.newFile.next(event.target.files[0]);
  }

  public onFormHover(event: MouseEvent) {
    event.preventDefault();
    this.hovered = event.type === "mouseenter"; 
    this._changeDetectorRef.detectChanges();
  }

  public setDefaultAvatar(event: any) {
    event.target.src = this._configurationService.defaultAvatarUrl
  }
}
