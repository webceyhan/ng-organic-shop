import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(list: any[], key: string, value?: string): any[] {
        if (!value || value === '') return list;

        return (list || []).filter((item) =>
            item[key].toLowerCase().includes(value)
        );
    }
}
