import { Injectable, signal } from '@angular/core';
import { of, delay, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ex3Service {
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
  public mainCatalog = signal<any[] | null>(null);
  public secondCatalog = signal<any[] | null>(null);
  public tableData = signal<any[] | null>(null);
  public loading = signal(false);

  public async getMainCatalog(): Promise<void> {
    this.loading.set(true);
    const data = await lastValueFrom(of(this.catalog1).pipe(delay(1000)));
    this.mainCatalog.set(data);
    this.loading.set(false);
  }
  public async getSubCatalog(mainCatalog: string): Promise<void> {
    this.loading.set(true);
    const data = await lastValueFrom(of(this.getcatalog2(mainCatalog)).pipe(delay(2000)));
    this.secondCatalog.set(data);
    this.loading.set(false);
  }
  public async getTableData(mainCatalog: string, subCatalog: string): Promise<void> {
    this.loading.set(true);
    const data = await lastValueFrom(of(this.getTabla(mainCatalog, subCatalog)).pipe(delay(3000)));
    this.tableData.set(data);
    this.loading.set(false);
  }
  public updateMainSelection(value: string) {
    this.mainSelection.set(value);
    this.secondSelection.set(null);
    this.secondCatalog.set(null);
    this.tableData.set(null);
  }
  public updateSecondSelection(value: string) {
    this.secondSelection.set(value);
    this.tableData.set(null);
  }
  cleanMainCatalog() {
    this.mainSelection.set(null);
    this.mainCatalog.set(null);
  }
  cleanSubCatalog() {
    this.secondSelection.set(null);
    this.secondCatalog.set(null);
  }
  cleanTableData() {
    this.tableData.set(null);
  }
  cleanAll() {
    this.cleanMainCatalog();
    this.cleanSubCatalog();
    this.cleanTableData();
  }
}
