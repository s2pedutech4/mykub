import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'
@Pipe({
  name: 'safe'
})

export class AdminpipePipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer){}
  transform(value: string, type: string): SafeUrl {
    switch(type)
    {
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value);
    }
  }

}

