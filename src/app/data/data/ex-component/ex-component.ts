import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExService } from '../../../services/ex-service';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
interface OptionsSelect {
  value: string;
  label: string;
}

@Component({
  selector: 'app-ex-component',
  standalone: false,
  templateUrl: './ex-component.html',
  styleUrl: './ex-component.css',
})
export class ExComponent implements OnInit, OnDestroy {
  private loadCatalogSubject = new Subject<void>();
  loading: boolean;
  destroysub = new Subject<void>();
  mainForm = new FormGroup({
    animal: new FormControl(''),
  });
  mainSelection: boolean = false;
  secondSelection: boolean = false;
  subForm = new FormGroup({
    sub: new FormControl(''),
  });
  mainOptions$: Observable<OptionsSelect[]>;
  secondOptions$: Observable<OptionsSelect[] | null>;
  tableData$: Observable<any[] | null>;

  constructor(private exService: ExService) {
    this.loading = true;
    this.mainOptions$ = exService.mainCatalog$.pipe(
      takeUntil(this.destroysub),
      filter((data) => data !== null),
      tap(() => {
        this.loading = false;
      }),
    );
    this.secondOptions$ = exService.secondCatalog$.pipe(
      takeUntil(this.destroysub),
      tap((data) => {
        if (data !== null) {
          this.loading = false;
        }
      }),
    );
    this.tableData$ = exService.tableData$.pipe(
      takeUntil(this.destroysub),
      tap((data) => {
        if (data !== null) {
          this.loading = false;
        }
      }),
    );
  }

  ngOnInit(): void {
    this.exService.getMainCatalog();
  }

  ngOnDestroy(): void {
    this.exService.clearAll();
    this.destroysub.next();
    this.destroysub.complete();
  }
  trackByValue(i: number, option: OptionsSelect) {
    return option.value;
  }
  submitMainCatalog(e: SubmitEvent) {
    e.preventDefault();
    console.log('submit 1', this.mainForm.value.animal);
    this.exService.clearSecondCatalog();
    this.exService.clearTableData();
    this.mainSelection = true;
    this.secondSelection = false;
    this.loading = true;
    this.exService.getSecondCatalog(this.mainForm.value.animal!);
  }
  submitSecondCatalog(e: SubmitEvent) {
    e.preventDefault();
    console.log('submit 2', this.subForm.value.sub);
    this.exService.clearTableData();
    this.secondSelection = true;
    this.loading = true;
    this.exService.getTableData(this.subForm.value.sub!);
  }
}
