import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExService {
  private catalog1 = [
    { value: 'mammal', label: 'Mammals' },
    { value: 'fish', label: 'Fishes' },
    { value: 'insect', label: 'Insects' },
    { value: 'micro', label: 'Microscopics' },
  ];
  private getcatalog2(val: string) {
    var res;
    if (val === 'mammal') {
      res = [
        { value: 'perro', label: 'Perro' },
        { value: 'gato', label: 'Gato' },
        { value: 'pantera', label: 'Pantera' },
      ];
    } else if (val === 'fish') {
      res = [
        { value: 'atun', label: 'Atun' },
        { value: 'tiburon', label: 'Tiburon' },
      ];
    } else if (val === 'insect') {
      res = [
        { value: 'araña', label: 'Araña' },
        { value: 'gorgojo', label: 'Weevil' },
        { value: 'mariposa', label: 'Mariposa' },
      ];
    } else if (val === 'micro') {
      res = [
        { value: 'bacteria', label: 'Bacteria' },
        { value: 'hongo', label: 'Hongo' },
        { value: 'alga', label: 'Alga' },
      ];
    } else {
      res = [{ value: 'p1', label: 'Placeholder' }];
    }
    return res;
  }
  private tabla = [
    { a1: 'v1', a2: 'v2', a3: 'v3' },
    { b1: 'v1', b2: 'v2', b3: 'v3' },
    { c1: 'v1', c2: 'v2', c3: 'v3' },
    { d1: 'v1', d2: 'v2', d3: 'v3' },
    { e1: 'v1', e2: 'v2', e3: 'v3' },
  ];
  private mainStaterSub: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  public mainCatalog$: Observable<any[] | null>;
  public secondCatalog$: Observable<any[] | null>;
  public tableDataSub = new BehaviorSubject<any[] | null>(null);
  public tableData$: Observable<any[] | null> = this.tableDataSub.asObservable();
  private mainSelectionSub: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  public mainSelection$ = this.mainSelectionSub.asObservable();
  private secondSelectionSub: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  public secondSelection$ = this.secondSelectionSub.asObservable();

  constructor() {
    this.mainCatalog$ = this.mainStaterSub.pipe(
      switchMap(() => this.fetchMainCatalog()),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    this.secondCatalog$ = this.mainSelection$.pipe(
      filter((main) => main !== null),
      switchMap((mainSelection: string) =>
        this.fetchSecondCatalog(mainSelection).pipe(startWith(null)),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    combineLatest([this.mainSelection$, this.secondSelection$])
      .pipe(
        filter(([main, second]) => main !== null && second !== null),
        switchMap(([main, second]) => this.fetchTableData(main!, second!).pipe(startWith(null))),
      )
      .subscribe((data) => {
        this.tableDataSub.next(data);
      });
  }

  private fetchMainCatalog() {
    console.log('fetch main');
    return of(this.catalog1).pipe(delay(1000));
  }
  private fetchSecondCatalog(mainSelection: string) {
    return of(this.getcatalog2(mainSelection)).pipe(delay(1500));
  }
  private fetchTableData(mainSelection: string, secondSelection: string) {
    console.log('get3', mainSelection, secondSelection);
    return of(this.tabla).pipe(delay(2300));
  }
  public getMainCatalog() {
    console.log('init');
    this.mainStaterSub.next();
  }
  public getSecondCatalog(value: string) {
    console.log('get2', value);
    this.clearSecondCatalog();
    this.mainSelectionSub.next(value);
  }
  clearSecondCatalog() {
    this.secondSelectionSub.next(null);
  }
  getTableData(secondValue: string) {
    this.secondSelectionSub.next(secondValue);
  }
  clearTableData() {
    this.tableDataSub.next(null);
  }
  clearAll() {
    this.clearTableData();
    this.mainSelectionSub.next(null);
    this.secondSelectionSub.next(null);
  }
}
