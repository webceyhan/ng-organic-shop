import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UrlValidator } from './validators/url.validator';
import { MinValidator } from './validators/min.validator';

const DECLARATIONS = [UrlValidator, MinValidator];

@NgModule({
    declarations: DECLARATIONS,
    imports: [CommonModule, FormsModule, NgbModule],
    exports: [CommonModule, FormsModule, NgbModule, ...DECLARATIONS],
})
export class SharedModule {}
