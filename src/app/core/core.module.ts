import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

const DECLARATIONS = [NavbarComponent, LoginComponent];

@NgModule({
    declarations: DECLARATIONS,
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        SharedModule,
    ],
    exports: [...DECLARATIONS],
})
export class CoreModule {}
