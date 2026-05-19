import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, filter, map, of, tap } from 'rxjs';

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
  private mainCatalogSub: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  public mainCatalog$ = this.mainCatalogSub.asObservable();
  private secondCatalogSub: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  public secondCatalog$ = this.secondCatalogSub.asObservable();
  private tableDataSub = new BehaviorSubject<any[] | null>(null);
  public tableData$ = this.tableDataSub.asObservable();
  private mainSelectionSub: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  public mainSelection$ = this.mainSelectionSub.asObservable();
  private secondSelectionSub: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  public secondSelection$ = this.secondSelectionSub.asObservable();

  constructor() {}

  public getMainCatalog() {
    of(this.catalog1)
      .pipe(delay(1000))
      .subscribe((catalog) => {
        this.mainCatalogSub.next(catalog);
      });
  }
  public getSecondCatalog(value: string) {
    console.log('get2', value);
    this.mainSelectionSub.next(value);
    of(this.getcatalog2(value))
      .pipe(delay(1500))
      .subscribe((catalog2) => {
        this.secondCatalogSub.next(catalog2);
      });
  }
  clearSecondCatalog() {
    this.secondCatalogSub.next(null);
    this.secondSelectionSub.next(null);
  }
  getTableData(secondValue: string) {
    this.secondSelectionSub.next(secondValue);
    const mainVal = this.mainSelectionSub.getValue();
    console.log('get3', mainVal, secondValue);
    of(this.tabla)
      .pipe(delay(2300))
      .subscribe((data) => this.tableDataSub.next(data));
  }
  clearTableData() {
    this.tableDataSub.next(null);
  }
  clearAll() {
    this.mainCatalogSub.next(null);
    this.secondCatalogSub.next(null);
    this.mainSelectionSub.next(null);
    this.secondSelectionSub.next(null);
    this.tableDataSub.next(null);
  }
}
