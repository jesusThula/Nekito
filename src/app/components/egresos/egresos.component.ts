import { Component, OnInit } from '@angular/core';
import { EgresoService } from '../../services/egresos.service';
import { Egreso } from '../../models/egreso.models'

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {

  egresos: Egreso[];
  listaEgresos: Egreso[];
  

  constructor(private servicioEgresos: EgresoService,) { }

  ngOnInit(): void {
    this.servicioEgresos.obtenerEgresos().subscribe(items => {
      this.egresos = items.sort((a, b) => (a.fecha < b.fecha) ? 1 : ((a.fecha > b.fecha) ? -1 : 0));
    })
  }

}
