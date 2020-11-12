"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CursosService = void 0;
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var CursosService = /** @class */ (function () {
    function CursosService(http) {
        this.http = http;
        this.API = environment_1.environment.API + "cursos";
    }
    CursosService.prototype.list = function () {
        return this.http.get(this.API)
            .pipe(operators_1.delay(2000), operators_1.tap(console.log)
        // catchError(err => )
        );
    };
    CursosService.prototype.loadById = function (id) {
        return this.http.get(this.API + "/" + id).pipe(operators_1.take(1));
    };
    CursosService.prototype.create = function (curso) {
        return this.http.post(this.API, curso).pipe(operators_1.take(1));
    };
    CursosService.prototype.update = function (curso) {
        return this.http.put(this.API + "/" + curso.id, curso).pipe(operators_1.take(1));
    };
    CursosService.prototype.save = function (curso) {
        if (curso.id) {
            return this.update(curso);
        }
        else {
            return this.create(curso);
        }
    };
    CursosService.prototype.remove = function (id) {
        return this.http["delete"](this.API + "/" + id).pipe(operators_1.take(1));
    };
    CursosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CursosService);
    return CursosService;
}());
exports.CursosService = CursosService;
