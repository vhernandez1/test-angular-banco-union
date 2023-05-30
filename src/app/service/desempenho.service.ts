import { Injectable } from '@angular/core';
import { Consultor } from '../model/consultor.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente.model';
import { Subject } from 'rxjs/internal/Subject';
import { ClienteConsultor } from '../model/cliente-consultor.model';
import { Desempenho } from '../model/desempenho-cliente.model';
import { DesempenhoTotalConsultor } from '../model/desempenho-cliente-total-model';
import { DataGraficaConsultorParcial } from '../model/data-grafica-consultor.model';

@Injectable({
  providedIn: 'root'
})
export class DesempenhoService {

  private baseUrl = 'https://azure-spring-cloud-vhhh-banco-union-service.azuremicroservices.io/consultores';

  // Creamos un nuevo Subject que notificará cuando se realice una busqueda
  private searchClientesByConsultorSubject = new Subject<Cliente[]>();
  private consultorSelectedSubject = new Subject<string>();
  private sumaTotalParcialSubject = new Subject<DesempenhoTotalConsultor>();
  private dataGraficaConsultorParcialSubject = new Subject<DataGraficaConsultorParcial>();


  constructor(private http: HttpClient) { }


  getConsultores(): Observable<Consultor[]>{
    return this.http.get<Consultor[]>(this.baseUrl);
  }

  getClientesByConsultor(idConsultor: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseUrl+"/"+idConsultor+"/clientes")
  }


  getClientesDesempenho(clienteConsultor: ClienteConsultor): Observable<Desempenho[]> {
    return this.http.get<Desempenho[]>(this.baseUrl + "/" + clienteConsultor.idConsultor
     + "/clientes"+"/"+clienteConsultor.idCliente)
  }

  getClientesDesempenhoByConsultor(idConsultor: string): Observable<Desempenho[]> {
    return this.http.get<Desempenho[]>(this.baseUrl + "/" + idConsultor);
  }


  // metodo que notifica si se realizo una nueva busqueda de consultor
  notifySearchClientesByConsultorObservable(clientes: Cliente[]) {
    console.log('Notify Client search', clientes);
    this.searchClientesByConsultorSubject.next(clientes);
  }

  // Nuevo método que devuelve un observable que emite el valor de búsqueda actual
  getSearchClientesByConsultorObservable(): Observable<Cliente[]> {
    return this.searchClientesByConsultorSubject.asObservable();
  }



  // metodo que notifica si se realizo una nueva busqueda de consultor
  notifyConsultorSelectedObservable(consultor: string) {
    console.log('Notify consultor selected', consultor);
    this.consultorSelectedSubject.next(consultor);
  }

  // Nuevo método que devuelve un observable que emite el valor de búsqueda actual
  getConsultorSelectedObservable(): Observable<string> {
    return this.consultorSelectedSubject.asObservable();
  }



  // metodo que notifica si se realizo una nueva busqueda de consultor
  notifySumaTotalParcialSubjectObservable(desempenhoTotalConsultor: DesempenhoTotalConsultor) {
    console.log('Notify desempnho consultor', desempenhoTotalConsultor);
    this.sumaTotalParcialSubject.next(desempenhoTotalConsultor);
  }

  // Nuevo método que devuelve un observable que emite el valor de búsqueda actual
  getSumaTotalParcialSubjectObservable(): Observable<DesempenhoTotalConsultor> {
    return this.sumaTotalParcialSubject.asObservable();
  }


}
