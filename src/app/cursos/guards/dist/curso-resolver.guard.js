"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CursoResolverGuard = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CursoResolverGuard = /** @class */ (function () {
    function CursoResolverGuard(cursosService) {
        this.cursosService = cursosService;
    }
    CursoResolverGuard.prototype.resolve = function (route, state) {
        if (route.params && route.params.id) {
            return this.cursosService.loadById(route.params.id);
        }
        return rxjs_1.of({
            id: null,
            nome: null
        }); // of => retorna um observable a partir de um objeto
    };
    CursoResolverGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CursoResolverGuard);
    return CursoResolverGuard;
}());
exports.CursoResolverGuard = CursoResolverGuard;
