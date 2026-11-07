import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugService {
    generateSlug(title: string): string {
        return title.trim().toLowerCase().replace(/\s+g/, '-')
    }

}
