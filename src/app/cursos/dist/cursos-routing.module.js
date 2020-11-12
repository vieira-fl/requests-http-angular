"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CursosRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var cursos_lista_component_1 = require("./cursos-lista/cursos-lista.component");
var cursos_form_component_1 = require("./cursos-form/cursos-form.component");
var curso_resolver_guard_1 = require("./guards/curso-resolver.guard");
var routes = [
    { path: '', component: cursos_lista_component_1.CursosListaComponent },
    { path: 'novo', component: cursos_form_component_1.CursosFormComponent,
        resolve: { curso: curso_resolver_guard_1.CursoResolverGuard }
    },
    { path: 'editar/:id', component: cursos_form_component_1.CursosFormComponent,
        resolve: { curso: curso_resolver_guard_1.CursoResolverGuard }
    },
];
var CursosRoutingModule = /** @class */ (function () {
    function CursosRoutingModule() {
    }
    CursosRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CursosRoutingModule);
    return CursosRoutingModule;
}());
exports.CursosRoutingModule = CursosRoutingModule;
