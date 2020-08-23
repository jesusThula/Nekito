import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './components/inventario/inventario.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { EgresosComponent } from '../app/components/egresos/egresos.component';

const routes: Routes = [
  {path: '', component: InventarioComponent },
  {path: 'inventario', component: InventarioComponent },
  {path: 'ingresos', component: IngresosComponent },
  {path: 'egresos', component: EgresosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
