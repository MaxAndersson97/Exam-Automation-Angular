import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleCaseExcept' })
export class TitleCaseExceptPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      if (args === 'all') {
        return value.split(' ').map(toTitleCase).join(' ');
      } else {
        return toTitleCase(value);
      }
    }
    console.log(value);
    return value;
  }
   
  }

  const toTitleCase = (value) => {
    return value.substring(0, 1).toUpperCase() + value.substring(1);
    // alternately, can also use this: 
    // return value.charAt(0).toUpperCase() + value.slice(1);
  };