import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square',
})
export class SquarePipe implements PipeTransform {
  transform(value: number, pow: number): number {
    return Math.pow(value, pow);
  }
}
