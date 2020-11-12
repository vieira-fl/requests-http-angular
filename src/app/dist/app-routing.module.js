"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'busca-reativa' },
    {
        path: 'cursos',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./cursos/modules/cursos.module'); }).then(function (m) { return m.CursosModule; }); }
    },
    {
        path: 'upload',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./upload-file/modules/upload-file.module'); }).then(function (m) { return m.UploadFileModule; }); }
    },
    {
        path: 'busca-reativa',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./reactive-search/reactive-search.module'); }).then(function (m) { return m.ReactiveSearchModule; }); }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
