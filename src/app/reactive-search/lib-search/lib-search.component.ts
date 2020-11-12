import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl('angular');
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  results$: Observable<any>;
  total: number;
  readonly FIELDS = 'name,description,version,homepage';
  
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // para uma busca reativa, temos que 
    // queryField é o campo de input ; valueChanges é uma propriedade que retorna um observable (prop de formulários reativos) que retornar as mudanças que ocorrem no campo, que no caso é um campo de input.
    // para não precisarmos fazer um subscribe, iremos atribuir para o campo results$ que é um Observable
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()), // desconsidera espaços fora dos caractéres
      filter(value => value.length > 1), //mínimo de caractéres a serem digitados para iniciar a pesquisa
      debounceTime(300), // delay para que a pesquisa ocorra somente 0,3s após a digitação.
      distinctUntilChanged(), // trás todos os valores distintos até que o valor seja modificado
      tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS,
        }
      })), // retorna um observable e cancela as requisições anteriores. Serve para não fazermos um subscribe alinhado..
      tap((res: any) => this.total = res.total),
      map((res: any)=> res.results)
    )
  }

  onSearch(){
   const fields = 'name,description,version,homepage'
   let value: string = this.queryField.value;

   
   if(value && (value = value.trim()) !== '') {
    //  const params = {
    //    search: value,
    //    fields: fields,
    //  };
  
     // caso quisermos construir os parametros de forma dinamica, usamos o http params
     
     let params = new HttpParams()
     params = params.set('search', value);
     params = params.set('fields', fields);

     this.results$ = this.http //  .get(`${this.SEARCH_URL}?fields=${fields}&search=${value}`)
     .get(this.SEARCH_URL, { params }) //angular monta a estrutura da URL para nós, com os ? e & needed
     .pipe(
        tap((res:any) => (this.total = res.total)),
        map((res:any) => res.results),
      )
    }
  }
   

}
