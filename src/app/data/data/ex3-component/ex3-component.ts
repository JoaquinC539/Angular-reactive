import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ex3Service } from '../../../services/ex3-service';

@Component({
  selector: 'app-ex3-component',
  standalone: false,
  templateUrl: './ex3-component.html',
  styleUrl: './ex3-component.css',
})
export class Ex3Component implements OnInit, OnDestroy {
  mainForm = new FormGroup({
    animal: new FormControl(''),
  });
  subForm = new FormGroup({
    sub: new FormControl(''),
  });
  private ex3Service = inject(Ex3Service);
  loading = this.ex3Service.loading;
  public mainSelection = this.ex3Service.mainSelection;
  public secondSelection = this.ex3Service.secondSelection;
  public mainCatalog = this.ex3Service.mainCatalog;
  public secondCatalog = this.ex3Service.secondCatalog;
  public tableData = this.ex3Service.tableData;

  constructor() {
    effect(() => {
      console.log(this.mainSelection());
      if (this.mainSelection() !== null) {
        this.ex3Service.getSubCatalog(this.mainSelection()!);
      }
    });
    effect(() => {
      console.log(this.mainSelection(), this.secondSelection());
      if (this.mainSelection() && this.secondSelection()) {
        this.ex3Service.getTableData(this.mainSelection()!, this.secondSelection()!);
      }
    });
  }

  ngOnInit(): void {
    this.ex3Service.getMainCatalog();
  }
  ngOnDestroy(): void {
    this.ex3Service.cleanAll();
  }
  submitMainSelection(e: SubmitEvent) {
    e.preventDefault();
    // console.log(this.mainForm.value.animal);
    this.ex3Service.updateMainSelection(this.mainForm.value.animal!);
  }
  submitSecondSelection(e: SubmitEvent) {
    e.preventDefault();
    this.ex3Service.updateSecondSelection(this.subForm.value.sub!);
  }
}
