import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { CursosService } from '../services/cursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cursos2Service } from '../services/cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params.id;
    //     console.log(id);
    //     const curso$ = this.cursosService.loadById(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso)
    //     })
    //   }
    // )
    
    // this.route.params
    // .pipe(
    //   map((params: any) => params.id),
    //   switchMap(id => this.cursosService.loadById(id)),
    //   // cancela as requisiçoes anteriores e resulta somente nos valores do último pedido.

    // )
    // .subscribe(curso => this.updateForm(curso))
      // alternativamente ao switch map
    // concatMap => ordem da requisição importa
    // mergeMap => ordem não importa
    // exaustMap => faz a requisição e espera a resposta para depois fazer a requisição dos pedidos seguintes (utilizado para login do usuário)

    const curso = this.route.snapshot.data['curso'] // acessando o nome que está definindo do resolve

    this.form = this.fb.group({
      id: [curso.id], // não precisa estar no template do formulário, somente aqui no componente
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  // não mais necessário por conta da guarda de rota e do seu resolver
  // updateForm(curso){
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }
  
  hasError(field:string){
    return this.form.get(field).errors
  }
  
  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      console.log('submitted')

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
        if(this.form.value.id){
          msgSuccess = 'Curso atualizado com sucesso!'
          msgError = 'Erro ao atualizar curso, tente novamente!';
        }
        this.cursosService.save(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess(msgSuccess);
            this.location.back(); //volta para o end acessado anteriormente ao atual... ou podemos fazer um router.navigate para o '/cursos'
          },
          error => {
            this.modal.showAlertDanger(msgError);
          }
        )
    //     // update
    //     this.cursosService.update(this.form.value).subscribe(
    //       success => {
    //         this.modal.showAlertSuccess('Curso atualizado com sucesso!');
    //         this.location.back(); //volta para o end acessado anteriormente ao atual... ou podemos fazer um router.navigate para o '/cursos'
    //       },
    //       error => this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente.'),
    //       () => console.log('update completo')
    //     )
    //   } else {
    //     this.cursosService.create(this.form.value).subscribe(
    //       success => {
    //         this.modal.showAlertSuccess('Curso criado com sucesso!');
    //         this.location.back(); //volta para o end acessado anteriormente ao atual... ou podemos fazer um router.navigate para o '/cursos'
    //       },
    //       error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente.'),
    //       () => console.log('request completo')
    //     );
    //   }
    // }
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    // console.log('cancelled')  
  }

}
