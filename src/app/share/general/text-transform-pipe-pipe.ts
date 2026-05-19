import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransformPipe',
  standalone: false,
})
export class TextTransformPipePipe implements PipeTransform {
  transform(value: string, remove: string, upper: string): string {
    return value.replaceAll(remove, '').replace(upper, upper.toUpperCase());
  }
}
