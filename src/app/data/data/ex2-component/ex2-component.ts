import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  BehaviorSubject,
  startWith,
  combineLatest,
  catchError,
  of,
} from 'rxjs';
import { Ex2Service } from '../../../services/ex2-service';
interface OptionsSelect {
  value: string;
  label: string;
}
@Component({
  selector: 'app-ex2-component',
  standalone: false,
  templateUrl: './ex2-component.html',
  styleUrl: './ex2-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ex2Component implements OnInit, OnDestroy {
  private loadCatalogSubject = new BehaviorSubject<void>(undefined);
  destroysub = new Subject<void>();
  loading: boolean;
  mainSelection: boolean = false;
  secondSelection: boolean = false;
  mainForm = new FormGroup({
    animal: new FormControl(''),
  });
  subForm = new FormGroup({
    sub: new FormControl(''),
  });
  public mainCatalog$: Observable<any[]>;
  public secondCatalog$: Observable<any[] | null>;
  public tableData$: Observable<any[] | null>;
  constructor(private ex2Service: Ex2Service) {
    this.loading = true;
    this.mainCatalog$ = this.loadCatalogSubject.pipe(
      takeUntil(this.destroysub),
      switchMap(() => ex2Service.getMainCatalog()),
      tap(() => (this.loading = false)),
    );
    this.secondCatalog$ = this.ex2Service.mainSelection$.pipe(
      takeUntil(this.destroysub),
      switchMap((mainValue) => ex2Service.getSubCatalog(mainValue as string).pipe(startWith(null))),
      tap((d) => {
        if (d) {
          this.loading = false;
        }
      }),
    );
    this.tableData$ = combineLatest([ex2Service.mainSelection$, ex2Service.secondSelection$]).pipe(
      takeUntil(this.destroysub),

      switchMap(([main, sub]) =>
        ex2Service.getTableData(main as string, sub as string).pipe(startWith(null)),
      ),
      tap((d) => {
        if (d) {
          this.loading = false;
        }
      }),
    );
  }
  ngOnInit(): void {
    console.log('init');
    this.loadCatalogSubject.next();
  }
  ngOnDestroy(): void {
    this.destroysub.next();
    this.destroysub.complete();
  }
  trackByValue(i: number, option: OptionsSelect) {
    return option.value;
  }
  selectMainCatalog($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;
    this.mainSelection = true;
    this.secondSelection = false;
    this.ex2Service.updateMainSelection(this.mainForm.value.animal!);
  }
  selectSubcatalog($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;
    this.secondSelection = true;
    this.ex2Service.updateSecondSeletcion(this.subForm.value.sub!);
  }
}
