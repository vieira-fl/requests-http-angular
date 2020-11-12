import { HttpClient } from '@angular/common/http';
import { CrudService } from './../../shared/services/crud-service.service';
import { Injectable } from '@angular/core';
import { Curso } from '../cursos-lista/curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(
    protected http: HttpClient, 
  ) {
    super(http, `${environment.API}cursos`);
   }

   //podemos sobrescrever métodos nesta classe caso o método deva ser diferente.
}
