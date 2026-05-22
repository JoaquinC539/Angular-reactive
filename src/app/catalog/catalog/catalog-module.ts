import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog-component/catalog-component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ParentComponent } from './parent-component/parent-component';
import { Children1Component } from './children1-component/children1-component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  {
    path: 'parent',
    component: ParentComponent,
    children: [{ path: 'children1', component: Children1Component }],
  },
];
@NgModule({
  declarations: [CatalogComponent, ParentComponent, Children1Component],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, RouterOutlet],
})
export class CatalogModule {}
