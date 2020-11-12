"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CursosFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CursosFormComponent = /** @class */ (function () {
    function CursosFormComponent(fb, cursosService, modal, location, route) {
        this.fb = fb;
        this.cursosService = cursosService;
        this.modal = modal;
        this.location = location;
        this.route = route;
        this.submitted = false;
    }
    CursosFormComponent.prototype.ngOnInit = function () {
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
        var curso = this.route.snapshot.data['curso']; // acessando o nome que está definindo do resolve
        this.form = this.fb.group({
            id: [curso.id],
            nome: [curso.nome, [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(20)]]
        });
    };
    // não mais necessário por conta da guarda de rota e do seu resolver
    // updateForm(curso){
    //   this.form.patchValue({
    //     id: curso.id,
    //     nome: curso.nome
    //   })
    // }
    CursosFormComponent.prototype.hasError = function (field) {
        return this.form.get(field).errors;
    };
    CursosFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.form.valid) {
            console.log('submitted');
            var msgSuccess_1 = 'Curso criado com sucesso!';
            var msgError_1 = 'Erro ao criar curso, tente novamente!';
            if (this.form.value.id) {
                msgSuccess_1 = 'Curso atualizado com sucesso!';
                msgError_1 = 'Erro ao atualizar curso, tente novamente!';
            }
            this.cursosService.save(this.form.value).subscribe(function (success) {
                _this.modal.showAlertSuccess(msgSuccess_1);
                _this.location.back(); //volta para o end acessado anteriormente ao atual... ou podemos fazer um router.navigate para o '/cursos'
            }, function (error) {
                _this.modal.showAlertDanger(msgError_1);
            });
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
    };
    CursosFormComponent.prototype.onCancel = function () {
        this.submitted = false;
        this.form.reset();
        // console.log('cancelled')  
    };
    CursosFormComponent = __decorate([
        core_1.Component({
            selector: 'app-cursos-form',
            templateUrl: './cursos-form.component.html',
            styleUrls: ['./cursos-form.component.scss']
        })
    ], CursosFormComponent);
    return CursosFormComponent;
}());
exports.CursosFormComponent = CursosFormComponent;
