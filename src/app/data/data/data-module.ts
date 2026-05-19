import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from './data';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from '../../share/general/general-module';
import { ExComponent } from './ex-component/ex-component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ex2Component } from './ex2-component/ex2-component';
import { Ex3Component } from './ex3-component/ex3-component';

const dataRoutes: Routes = [
  { path: '', component: Data },
  { path: 'ex', component: ExComponent },
  { path: 'ex2', component: Ex2Component },
  { path: 'ex3', component: Ex3Component },
];

@NgModule({
  declarations: [Data, ExComponent, Ex2Component, Ex3Component],
  imports: [CommonModule, RouterModule.forChild(dataRoutes), GeneralModule, ReactiveFormsModule],
  providers: [],
  // bootstrap: [Data],
})
export class DataModule {}
