import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDevLogEntry } from '../interfaces/dev-log-entry.interface';
import { EnvironmentService } from 'src/app/infrastructure/environment/services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(
    private readonly _environmentService: EnvironmentService 
  ) { }

  public getProjectVersion(): Observable<{ versionName: string, semanticVersion: string }> {
    return of({
      versionName: 'lorem',
      semanticVersion: 'ipsum'
    })
  }

  public getLastDevLogEntryData(): Observable<IDevLogEntry> {
    return of({
      title: "Lorem ipsum dolor sit amet",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at erat sit amet lacus pretium eleifend. Aenean pharetra ligula eu ullamcorper pulvinar.",
      entryLink: "http://google.com",
      feedLink: "http://google.com",
    })
  } 

}
