import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, map, take } from 'rxjs/operators';
import { Curso } from './curso';
import { CursosService } from '../services/cursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../services/cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  deleteModalRef: BsModalRef; // necessário para escutar o listener de sim ou não
  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>; // $ representa uma notação para variáveis observable
  error$ = new Subject<boolean>();
  cursoSelecionado: Curso; // para capturar curso a ser deletado da base após a confirmação do usuário

  bsModalRef: BsModalRef;

  constructor(
    private cursosService: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    // this.cursosService.list().subscribe(dados => this.cursos = dados);

    this.onRefresh();

  }

  onRefresh(){
    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError()
          return EMPTY;
        })
      );

    // this.cursosService.list()
    // .pipe(
    //   // map(),
    //   // tap(),
    //   // switchMap(),
    //   catchError(error => EMPTY)
    // )  
    // .subscribe(
    //   dados => console.log(dados), // sucesso
    //   error => console.error(error),
    //   () => console.log('observable completed!')
    // )
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar. Entre em contato com seu suporte.')    
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
  
  onDelete(curso){
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover este curso ?');
    
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cursosService.remove(curso.id) : EMPTY),
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Entre em contato com seu suporte.');  
        }
      )
  }

  onConfirmDelete(){
    this.cursosService.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh(),
        this.deleteModalRef.hide()
      },
      error => this.alertService.showAlertDanger('Erro ao remover curso. Entre em contato com seu suporte.')
    )
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
