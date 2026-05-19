import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ex2Service {
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
  private getTabla(main: string, second: string) {
    return [
      { a1: main + 'v1', a2: second + 'v2', a3: 'v3' },
      { b1: main + 'v1', b2: second + 'v2', b3: 'v3' },
      { c1: main + 'v1', c2: second + 'v2', c3: 'v3' },
      { d1: main + 'v1', d2: second + 'v2', d3: 'v3' },
      { e1: main + 'v1', e2: second + 'v2', e3: 'v3' },
    ];
  }
  private mainSelectionSub: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  public mainSelection$ = this.mainSelectionSub.asObservable();
  private secondSelectionSub: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  public secondSelection$ = this.secondSelectionSub.asObservable();

  public getMainCatalog(): Observable<any[]> {
    return of(this.catalog1).pipe(delay(1000));
  }
  public getSubCatalog(mainCatalog: string): Observable<any[] | null> {
    return of(this.getcatalog2(mainCatalog)).pipe(delay(2000));
  }
  public getTableData(mainCatalog: string, subCatalog: string): Observable<any[] | null> {
    return of(this.getTabla(mainCatalog, subCatalog)).pipe(delay(3000));
  }
  public updateMainSelection(main: string) {
    this.mainSelectionSub.next(main);
  }
  public updateSecondSeletcion(second: string) {
    this.secondSelectionSub.next(second);
  }
}
