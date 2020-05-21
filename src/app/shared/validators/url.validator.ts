import { Directive } from '@angular/core';
import {
    NG_VALIDATORS,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    Validator,
} from '@angular/forms';

export const url: ValidatorFn = (
    control: AbstractControl
): ValidationErrors => {
    const pattern = /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/;
    return pattern.test(control.value) ? null : { url: true };
};

@Directive({
    selector: '[url]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: UrlValidator,
            multi: true,
        },
    ],
})
export class UrlValidator implements Validator {
    validate(c: AbstractControl): ValidationErrors {
        return url(c);
    }
}
