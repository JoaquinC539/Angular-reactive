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
  filter,
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
  public mainSelection$: Observable<string | null>;
  public secondSelction$: Observable<string | null>;
  public mainCatalog$: Observable<any[]>;
  public secondCatalog$: Observable<any[] | null>;
  public tableData$: Observable<any[] | null>;
  constructor(private ex2Service: Ex2Service) {
    this.mainSelection$ = ex2Service.mainSelection$;
    this.secondSelction$ = ex2Service.secondSelection$;
    this.loading = true;
    this.mainCatalog$ = this.loadCatalogSubject.pipe(
      takeUntil(this.destroysub),
      switchMap(() => ex2Service.getMainCatalog()),
      tap(() => (this.loading = false)),
    );
    this.secondCatalog$ = this.mainSelection$.pipe(
      takeUntil(this.destroysub),
      filter(Boolean),
      switchMap((mainValue) => ex2Service.getSubCatalog(mainValue as string).pipe(startWith(null))),
      tap((d) => {
        if (d) {
          this.loading = false;
        }
      }),
    );
    this.tableData$ = combineLatest([this.mainSelection$, this.secondSelction$]).pipe(
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
    this.ex2Service.updateMainSelection('');
    this.destroysub.next();
    this.destroysub.complete();
  }
  trackByValue(i: number, option: OptionsSelect) {
    return option.value;
  }
  selectMainCatalog($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;
    this.ex2Service.updateMainSelection(this.mainForm.value.animal!);
    this.ex2Service.updateSecondSeletcion('');
  }
  selectSubcatalog($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;
    this.secondSelection = true;
    this.ex2Service.updateSecondSeletcion(this.subForm.value.sub!);
  }
}
