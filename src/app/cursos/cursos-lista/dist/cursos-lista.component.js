"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CursosListaComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CursosListaComponent = /** @class */ (function () {
    function CursosListaComponent(cursosService, alertService, router, route, modalService) {
        this.cursosService = cursosService;
        this.alertService = alertService;
        this.router = router;
        this.route = route;
        this.modalService = modalService;
        this.error$ = new rxjs_1.Subject();
    }
    CursosListaComponent.prototype.ngOnInit = function () {
        // this.cursosService.list().subscribe(dados => this.cursos = dados);
        this.onRefresh();
    };
    CursosListaComponent.prototype.onRefresh = function () {
        var _this = this;
        this.cursos$ = this.cursosService.list()
            .pipe(operators_1.catchError(function (error) {
            console.error(error);
            // this.error$.next(true);
            _this.handleError();
            return rxjs_1.EMPTY;
        }));
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
    };
    CursosListaComponent.prototype.handleError = function () {
        this.alertService.showAlertDanger('Erro ao carregar. Entre em contato com seu suporte.');
    };
    CursosListaComponent.prototype.onEdit = function (id) {
        this.router.navigate(['editar', id], { relativeTo: this.route });
    };
    CursosListaComponent.prototype.onDelete = function (curso) {
        var _this = this;
        this.cursoSelecionado = curso;
        // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
        var result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover este curso ?');
        result$.asObservable()
            .pipe(operators_1.take(1), operators_1.switchMap(function (result) { return result ? _this.cursosService.remove(curso.id) : rxjs_1.EMPTY; }))
            .subscribe(function (success) {
            _this.onRefresh();
        }, function (error) {
            _this.alertService.showAlertDanger('Erro ao remover curso. Entre em contato com seu suporte.');
        });
    };
    CursosListaComponent.prototype.onConfirmDelete = function () {
        var _this = this;
        this.cursosService.remove(this.cursoSelecionado.id)
            .subscribe(function (success) {
            _this.onRefresh(),
                _this.deleteModalRef.hide();
        }, function (error) { return _this.alertService.showAlertDanger('Erro ao remover curso. Entre em contato com seu suporte.'); });
    };
    CursosListaComponent.prototype.onDeclineDelete = function () {
        this.deleteModalRef.hide();
    };
    __decorate([
        core_1.ViewChild('deleteModal')
    ], CursosListaComponent.prototype, "deleteModal");
    CursosListaComponent = __decorate([
        core_1.Component({
            selector: 'app-cursos-lista',
            templateUrl: './cursos-lista.component.html',
            styleUrls: ['./cursos-lista.component.scss'],
            preserveWhitespaces: true
        })
    ], CursosListaComponent);
    return CursosListaComponent;
}());
exports.CursosListaComponent = CursosListaComponent;
