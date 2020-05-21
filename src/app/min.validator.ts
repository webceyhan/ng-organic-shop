import { Directive } from '@angular/core';
import {
    NG_VALIDATORS,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    Validator,
} from '@angular/forms';

export const min: ValidatorFn = (
    control: AbstractControl
): ValidationErrors => {
    const { value } = control;
    return +value > 0 ? null : { min: true };
};

@Directive({
    selector: '[min]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MinValidator,
            multi: true,
        },
    ],
})
export class MinValidator implements Validator {
    validate(c: AbstractControl): ValidationErrors {
        return min(c);
    }
}
