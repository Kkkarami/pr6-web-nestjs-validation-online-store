import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
    transform(value: any) {
        for (const key in value){
            if (typeof value[key] === 'string') {
                value[key] = value[key].trim()
            }
            if (value[key] !== null && typeof value[key] === 'object') {
                this.transform(value[key]);
            }
        }
        return value;
    }
}