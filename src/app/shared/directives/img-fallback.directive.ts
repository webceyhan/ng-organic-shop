import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'img[fallback]',
})
export class ImgFallbackDirective {
    @Input('img[fallback]')
    fallback = '/assets/img-fallback.png';

    @HostListener('error')
    onError() {
        this.ref.nativeElement.src = this.fallback;
    }

    constructor(private ref: ElementRef<HTMLImageElement>) {}
}
