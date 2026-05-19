import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Field } from './field/field';
import { TextTransformPipePipe } from './text-transform-pipe-pipe';

@NgModule({
  declarations: [Field, TextTransformPipePipe],
  imports: [CommonModule],
  exports: [Field, TextTransformPipePipe],
})
export class GeneralModule {}
