import { Component, computed, effect, inject, resource } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ex4Service } from '../../../services/ex4-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { lastValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-ex4-component',
  standalone: false,
  templateUrl: './ex4-component.html',
  styleUrl: './ex4-component.css',
})
export class Ex4Component {
  mainForm = new FormGroup({
    animal: new FormControl(''),
  });
  subForm = new FormGroup({
    sub: new FormControl(''),
  });
  private ex4Service = inject(Ex4Service);
  public mainSelection = this.ex4Service.mainSelection;
  public secondSelection = this.ex4Service.secondSelection;

  public mainCatalogResource = rxResource({
    stream: () => this.ex4Service.getMainCatalog(),
  });
  public subCatalogResource = rxResource({
    params: () => ({ mainSelection: this.mainSelection() }),
    stream: (params) => {
      if (params.params.mainSelection !== null) {
        return this.ex4Service.getSubCatalog(params.params.mainSelection!);
      }
      return of(null);
    },
    defaultValue: null,
  });
  public tableDataResource = rxResource({
    params: () => ({
      mainSelection: this.mainSelection(),
      secondSelection: this.secondSelection(),
    }),
    stream: ({ params: { mainSelection, secondSelection } }) => {
      if (mainSelection && secondSelection) {
        return this.ex4Service.getTableData(mainSelection, secondSelection);
      }
      return of(null);
    },
    defaultValue: null,
  });
  public loading = computed(() => {
    return (
      this.mainCatalogResource.isLoading() ||
      this.subCatalogResource.isLoading() ||
      this.tableDataResource.isLoading()
    );
  });
  constructor() {
    effect(() => {
      console.log(this.mainSelection(), this.secondSelection());
      console.log(this.tableDataResource.value());
    });
  }

  public submitMainSelection(e: SubmitEvent) {
    e.preventDefault();
    this.ex4Service.updateMainSelection(this.mainForm.value.animal!);
  }
  submitSecondSelection(e: SubmitEvent) {
    e.preventDefault();
    this.ex4Service.updateSecondSelection(this.subForm.value.sub!);
  }
}
