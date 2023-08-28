import { query, transition, trigger, animateChild } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { slideIn, slideOut, swapViews } from 'src/app/shared/animations/predefined-animations';

@Component({
  selector: 'main-view-template',
  templateUrl: './main-view-template.component.html',
  styleUrls: ['./main-view-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideIn('slideIn'),
    slideOut('slideOut'),
    swapViews('routeAnimations'),
    trigger('triggerChilds', [
      transition('void => loaded', [
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]
})
export class MainViewTemplateComponent implements OnInit, OnDestroy, OnChanges {

  @Input() showLoader: boolean = false;

  public isMobile: boolean = false;
  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _breakPointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this._breakPointObserver
      .observe(["(max-width: 1024px)"])
      .pipe(takeUntil(this._destroyed))
      .subscribe(s => {
        this.isMobile = s.matches;
        this._changeDetector.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showLoader.currentValue !== changes.showLoader.previousValue) {
      this._changeDetector.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public prepareRoute(outlet: RouterOutlet) {
    if(!outlet.isActivated) return 'void';
    return outlet && outlet.component?.constructor?.name;
  }

}