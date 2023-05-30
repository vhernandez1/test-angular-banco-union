import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClienteConsultor } from 'src/app/model/cliente-consultor.model';
import { Cliente } from 'src/app/model/cliente.model';
import { DesempenhoTotalConsultor } from 'src/app/model/desempenho-cliente-total-model';
import { Desempenho } from 'src/app/model/desempenho-cliente.model';
import { DesempenhoService } from 'src/app/service/desempenho.service';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {

  @Input() cliente: Cliente;
  @Input() consultor: string;
  @Input() title: string;
  items: Desempenho[];
  clienteConsultor: ClienteConsultor = {
    idCliente: 0,
    idConsultor: '',
    title: ''
  };
  caoDesempenhoTotal: DesempenhoTotalConsultor = {
    totalComissao: 0,
    totalLiquido: 0,
    totalSum: 0,
    totalImpuesto: 0
  };








  displayedColumns: string[] = ['noSistema', 'os', 'nf', 'emissao', 'total', 'liquido', 'comissao'];
  private subscription: Subscription;



  constructor(private desempenhoService: DesempenhoService) { }

  ngOnInit(): void {
    this.clienteConsultor.idCliente = this.cliente.id;
    this.clienteConsultor.idConsultor = this.consultor;
    this.clienteConsultor.title = this.cliente.noFantasia;

    console.log(" cliente consultor desempenho", this.clienteConsultor);

    this.desempenhoService.getClientesDesempenho(this.clienteConsultor).subscribe(desempenho => {
      this.items = desempenho;

      this.items.forEach((desempehno: Desempenho) => {
        this.caoDesempenhoTotal.totalComissao += desempehno.comissao;
        this.caoDesempenhoTotal.totalSum += desempehno.total;
        this.caoDesempenhoTotal.totalLiquido += desempehno.liquido;
        this.caoDesempenhoTotal.totalImpuesto += desempehno.impuesto;
      });

      this.caoDesempenhoTotal.totalComissao =
        Number(this.caoDesempenhoTotal.totalComissao.toFixed(2));
      this.caoDesempenhoTotal.totalSum =
        Number(this.caoDesempenhoTotal.totalSum.toFixed(2));
      this.caoDesempenhoTotal.totalLiquido =
        Number(this.caoDesempenhoTotal.totalLiquido.toFixed(2));


      this.desempenhoService.notifySumaTotalParcialSubjectObservable(this.caoDesempenhoTotal);

    });
  }




}
