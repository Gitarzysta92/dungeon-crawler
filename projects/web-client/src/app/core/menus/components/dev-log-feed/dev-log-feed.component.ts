import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ExternalLinkService } from 'src/app/aspects/navigation/services/external-link.service';
import { IDevLogEntry } from '../../interfaces/dev-log-entry.interface';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'dev-log-feed',
  templateUrl: './dev-log-feed.component.html',
  styleUrls: ['./dev-log-feed.component.scss']
})
export class DevLogFeedComponent implements OnInit {

  public entry: IDevLogEntry;

  constructor(
    private readonly _projectData: ProjectDataService,
    private readonly _externalLinkService: ExternalLinkService
  ) { }

  async ngOnInit(): Promise<void> {
    this.entry = await firstValueFrom(this._projectData.getLastDevLogEntryData());
  }

  public openLink(url: string): void {
    this._externalLinkService.openExternalLink(url);
  }

}
