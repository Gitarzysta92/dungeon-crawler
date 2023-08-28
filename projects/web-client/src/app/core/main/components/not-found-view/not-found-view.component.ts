import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';


@Component({
  template: `
  <div class="fluid-container fh">
    <div class="row fh">
      <div class="column-10 flex_center-center">
        Page doesn't exists
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./not-found-view.component.scss']
})
export class NotFoundViewComponent implements OnInit, OnDestroy {

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    timer(2000)
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._routingService.navigateToLobby();
      })
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

}
