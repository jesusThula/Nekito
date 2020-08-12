import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { IngresoComponent } from './components/inventario/ingreso/ingreso.component';
import { EgresoComponent } from './components/inventario/egreso/egreso.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InventarioComponent,
    IngresoComponent,
    EgresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
