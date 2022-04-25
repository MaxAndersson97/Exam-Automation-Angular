import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(items: any, term: any): any {
        let objectKeys;
        if (term === undefined) {
            return items;
        } else {
            objectKeys = Object.keys(items[0]) as Array<string>;
        }

        return items.filter(item =>
            Object.keys(item).some(k => item[k] != null &&
                item[k].toString().toLowerCase()
                    .includes(term.toLowerCase()))

        );
    }

}

