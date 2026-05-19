import { Injectable, signal } from '@angular/core';
import { of, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ex4Service {
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
  public mainSelection = signal<string | null>(null);
  public secondSelection = signal<string | null>(null);

  public getMainCatalog(): Observable<{ value: string; label: string }[]> {
    return of(this.catalog1).pipe(delay(1000));
  }
  public getSubCatalog(mainCatalog: string) {
    return of(this.getcatalog2(mainCatalog)).pipe(delay(2000));
  }
  public getTableData(mainCatalog: string, subCatalog: string) {
    return of(this.getTabla(mainCatalog, subCatalog)).pipe(delay(3000));
  }

  public updateMainSelection(value: string) {
    this.mainSelection.set(value);
    this.secondSelection.set(null);
  }
  public updateSecondSelection(value: string) {
    this.secondSelection.set(value);
  }
}
