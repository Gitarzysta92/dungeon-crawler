import { Injectable } from "@angular/core";
import { Observable, merge, fromEvent, connectable, Subject, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class ControlsService {
  
  public listenForHoverEvent(canvasRef: HTMLElement): Observable<PointerEvent> {
    const events = fromEvent<PointerEvent>(canvasRef, 'mousemove');
    const inputs = { pointerEvent$: connectable(events, { connector: () => new Subject() })}
    inputs.pointerEvent$.connect();
    return inputs.pointerEvent$
  }

  public listenForSelectEvent(canvasRef: HTMLElement): import("rxjs").Observable<PointerEvent> {
    const events = merge(
      fromEvent<PointerEvent>(canvasRef, 'click')
    );
    const inputs = { pointerEvent$: connectable(events, { connector: () => new Subject() })}
    inputs.pointerEvent$.connect();
    return inputs.pointerEvent$.pipe(tap(e => e.stopPropagation()))
  }


  public listenForMouseEvents(canvasRef: HTMLElement): Observable<PointerEvent> {
    const events = merge(
      fromEvent<PointerEvent>(canvasRef, 'mousemove'),
      fromEvent<PointerEvent>(canvasRef, 'click')
    );
    const inputs = { pointerEvent$: connectable(events, { connector: () => new Subject() })}
    inputs.pointerEvent$.connect();
    return inputs.pointerEvent$.pipe(tap(e => e.stopPropagation()))
  }
}