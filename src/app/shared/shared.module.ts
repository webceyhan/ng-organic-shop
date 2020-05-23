import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UrlValidator } from './validators/url.validator';
import { MinValidator } from './validators/min.validator';

const DECLARATIONS = [UrlValidator, MinValidator];

@NgModule({
    declarations: DECLARATIONS,
    imports: [CommonModule, FormsModule],
    exports: [CommonModule, FormsModule, ...DECLARATIONS],
})
export class SharedModule {}
