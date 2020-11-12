import { CursosService } from '../services/cursos.service';
import { Injectable } from '@angular/core';
import { Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../cursos-lista/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {
  
  constructor(
    private cursosService: CursosService,
  ){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Curso | Observable<Curso> | Promise<Curso> {
      if (route.params && route.params.id ){
        return this.cursosService.loadById(route.params.id);
      }

      return of({
        id: null,
        nome: null,
      }) // of => retorna um observable a partir de um objeto
    }
}
