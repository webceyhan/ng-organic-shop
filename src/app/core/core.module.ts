import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { SharedModule } from 'shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const DECLARATIONS = [NavbarComponent, LoginComponent, HomeComponent];

@NgModule({
    declarations: DECLARATIONS,
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        CoreRoutingModule,
        SharedModule,
    ],
    exports: [...DECLARATIONS],
})
export class CoreModule {}
