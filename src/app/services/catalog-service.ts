import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';

export interface CatalogOption {
  value: string;
  label: string;
}
@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private getTabla(main: string, second: string) {
    return [
      { a1: main + 'v1', a2: second + 'v2', a3: 'v3' },
      { b1: main + 'v1', b2: second + 'v2', b3: 'v3' },
      { c1: main + 'v1', c2: second + 'v2', c3: 'v3' },
      { d1: main + 'v1', d2: second + 'v2', d3: 'v3' },
      { e1: main + 'v1', e2: second + 'v2', e3: 'v3' },
    ];
  }
  private mainCatalogListSub = new BehaviorSubject<CatalogOption[]>([]);
  private subCatalogListSub = new BehaviorSubject<CatalogOption[]>([]);
  public mainCatalogList$ = this.mainCatalogListSub.asObservable();
  public subCatalogList$ = this.subCatalogListSub.asObservable();
  private tableDataSub = new BehaviorSubject<any[]>([]);
  public tableData$ = this.tableDataSub.asObservable();

  private mainCatalogSub = new BehaviorSubject<string | null>(null);
  private subCatalogSub = new BehaviorSubject<string | null>(null);
  public mainCatalog$ = this.mainCatalogSub.asObservable();
  public subCatalog$ = this.subCatalogSub.asObservable();

  getMainCatalog() {
    setTimeout(() => {
      this.mainCatalogListSub.next([
        { value: 'mammal', label: 'Mammals' },
        { value: 'fish', label: 'Fishes' },
        { value: 'insect', label: 'Insects' },
        { value: 'micro', label: 'Microscopics' },
      ]);
    }, 3000);
  }

  getSubCatalog(mainCatalogName: string) {
    console.log(`si se requiere ${mainCatalogName}`);
    setTimeout(() => {
      this.subCatalogListSub.next([
        { value: 'p1', label: 'placeholder1' },
        { value: 'p2', label: 'placeholder2' },
        { value: 'p3', label: 'placeholder3' },
        { value: 'p4', label: 'placeholder4' },
      ]);
    }, 3000);
  }
  getTable(main: string, sub: string) {
    setTimeout(() => {
      this.tableDataSub.next(this.getTabla(main, sub));
    }, 2000);
  }
  updateMainCatalog(mainSelect: string): void {
    this.mainCatalogSub.next(mainSelect);
  }
  updateSubCatalog(subSelect: string | null): void {
    this.subCatalogSub.next(subSelect);
  }
  cleanSubCatalog() {
    this.subCatalogListSub.next([]);
    this.subCatalogSub.next(null);
  }
  cleanTable() {
    this.tableDataSub.next([]);
  }
  clean() {
    // console.log(this.mainCatalogListSub.value);
    this.mainCatalogListSub.next([]);
    this.subCatalogListSub.next([]);
    this.mainCatalogSub.next(null);
    this.subCatalogSub.next(null);
  }
}
