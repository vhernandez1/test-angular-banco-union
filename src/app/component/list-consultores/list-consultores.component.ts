import { Component, OnInit } from '@angular/core';
import { ClienteConsultor } from 'src/app/model/cliente-consultor.model';
import { Cliente } from 'src/app/model/cliente.model';
import { Consultor } from 'src/app/model/consultor.model';
import { DesempenhoService } from 'src/app/service/desempenho.service';

@Component({
  selector: 'app-list-consultores',
  templateUrl: './list-consultores.component.html',
  styleUrls: ['./list-consultores.component.css']
})
export class ListConsultoresComponent implements OnInit {
  consultores: Consultor[] = [];
  consultorSelected: string = '';
  clientesByConsultor: Cliente[] = [];
  clienteConsultor: ClienteConsultor = {
    idCliente: 0,
    idConsultor: '',
    title: ''
  };

  constructor(private desempenoService: DesempenhoService) { }

  ngOnInit(): void {

    this.desempenoService.getConsultores().subscribe(consultores => {
      this.consultores = consultores;
      console.log("consultores => ", this.consultores);
    });
  }

  consultarDesempehno() {
    this.desempenoService.notifyConsultorSelectedObservable(this.consultorSelected);

    this.desempenoService.getClientesByConsultor(this.consultorSelected).subscribe(clientes => {
      this.clientesByConsultor = clientes;
      console.log("Clientes by subscritor %s  => ", this.consultores, this.clientesByConsultor);
      this.desempenoService.notifySearchClientesByConsultorObservable(this.clientesByConsultor);
    });
  }


}
