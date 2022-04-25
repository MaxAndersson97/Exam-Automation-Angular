import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { LoaderState } from './loader-state';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private _loaderState: BehaviorSubject<LoaderState> =
        new BehaviorSubject(new LoaderState(false));

    get loaderState(): Observable<any> {
        return this._loaderState.asObservable();
    }

    hide() {
        this._loaderState.next(new LoaderState(false));
    }

    show() {
        this._loaderState.next(new LoaderState(true));
    }
}
