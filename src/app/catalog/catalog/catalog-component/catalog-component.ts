import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogOption, CatalogService } from '../../../services/catalog-service';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog-component',
  standalone: false,
  templateUrl: './catalog-component.html',
  styleUrl: './catalog-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnDestroy {
  destroySub = new Subject<void>();
  public loading: boolean = true;
  mainCatalogList$: Observable<CatalogOption[]>;
  subCatalogList$: Observable<CatalogOption[]>;
  tableData$: Observable<any[]>;
  t$: Observable<any>;
  mainForm = new FormGroup({
    animal: new FormControl(''),
  });
  mainSelection: boolean = false;
  secondSelection: boolean = false;
  subForm = new FormGroup({
    sub: new FormControl(''),
  });

  constructor(private catalogService: CatalogService) {
    this.mainCatalogList$ = catalogService.mainCatalogList$.pipe(
      tap((d) => {
        if (d.length > 0) {
          this.loading = false;
        }
      }),
    );
    this.subCatalogList$ = catalogService.subCatalogList$.pipe(
      tap((d) => {
        if (d.length > 0) {
          this.loading = false;
        }
      }),
    );
    this.tableData$ = catalogService.tableData$.pipe(
      tap((d) => {
        if (d.length > 0) {
          this.loading = false;
        }
      }),
    );
    this.t$ = catalogService.mainCatalogList$.pipe(
      takeUntil(this.destroySub),
      filter((list) => list.length !== 0),
      map((list) => ({ data: list, test: '1', loading: false })),
      startWith({ data: [], test: '2', loading: true }),
      tap((data) => {
        console.log(data);
      }),
    );
  }

  ngOnInit(): void {
    this.catalogService.getMainCatalog();
    this.catalogService.mainCatalog$
      .pipe(takeUntil(this.destroySub))
      .subscribe((mainSub: string | null) => {
        console.log(`This only run when updated maincatalog ${mainSub}`);
        if (mainSub) {
          this.mainSelection = true;
          this.loading = true;
          this.catalogService.getSubCatalog(mainSub);
        } else {
          this.mainSelection = false;
          this.catalogService.updateSubCatalog('');
        }
      });
    this.catalogService.subCatalog$
      .pipe(takeUntil(this.destroySub))
      .subscribe((subCatalog: string | null) => {
        if (subCatalog) {
        }
      });

    combineLatest([this.catalogService.mainCatalog$, this.catalogService.subCatalog$])
      .pipe(takeUntil(this.destroySub))
      .subscribe(
        ([mainCat, subCat]) => {
          console.log(`This should run when main or sub change ${mainCat} - ${subCat}`);
          if (subCat && mainCat) {
            this.secondSelection = true;
            this.loading = true;
            this.catalogService.getTable(mainCat, subCat);
          } else {
            this.secondSelection = false;
          }
        },
        (error) => {
          this.loading = false;
          console.error(error);
        },
      );
  }

  updateMainCatalog(event: SubmitEvent): void {
    event.preventDefault();
    this.catalogService.cleanSubCatalog();
    this.catalogService.cleanTable();
    if (this.mainForm.value.animal === '') {
      this.catalogService.updateMainCatalog('');
    }
    if (this.mainForm.value.animal) {
      this.catalogService.updateMainCatalog(this.mainForm.value.animal);
    }
  }
  updateSubCatalog(event: SubmitEvent): void {
    event.preventDefault();
    this.catalogService.cleanTable();
    if (this.subForm.value?.sub) {
      this.catalogService.updateSubCatalog(this.subForm.value.sub);
    }
  }
  trackByValue(i: number, option: CatalogOption) {
    return option.value;
  }
  ngOnDestroy(): void {
    this.catalogService.clean();
    this.destroySub.next();
    this.destroySub.complete();
  }
}
