import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { IngresoComponent } from './components/inventario/ingreso/ingreso.component';
import { EgresoComponent } from './components/inventario/egreso/egreso.component';

//IMPORTACIONES DE FIREBASE (BASE DA DATOS Y MARIQUERAS)
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';
import { ReingresoComponent } from './components/inventario/reingreso/reingreso.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IngresosComponent } from './components/ingresos/ingresos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InventarioComponent,
    IngresoComponent,
    EgresoComponent,
    ReingresoComponent,
    IngresosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
