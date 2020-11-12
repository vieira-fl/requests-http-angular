"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LibSearchComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var LibSearchComponent = /** @class */ (function () {
    function LibSearchComponent(http) {
        this.http = http;
        this.queryField = new forms_1.FormControl('angular');
        this.SEARCH_URL = 'https://api.cdnjs.com/libraries';
    }
    LibSearchComponent.prototype.ngOnInit = function () {
    };
    LibSearchComponent.prototype.onSearch = function () {
        var _this = this;
        var fields = 'name,description,version,homepage';
        var value = this.queryField.value;
        if (value && (value = value.trim()) !== '') {
            //  const params = {
            //    search: value,
            //    fields: fields,
            //  };
            // caso quisermos construir os parametros de forma dinamica, usamos o http params
            var params = new http_1.HttpParams();
            params = params.set('search', value);
            params = params.set('fields', fields);
            this.results$ = this.http //  .get(`${this.SEARCH_URL}?fields=${fields}&search=${value}`)
                .get(this.SEARCH_URL, { params: params }) //angular monta a estrutura da URL para nós, com os ? e & needed
                .pipe(operators_1.tap(function (res) { return (_this.total = res.total); }), operators_1.map(function (res) { return res.results; }), operators_1.tap(console.log));
        }
    };
    LibSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-lib-search',
            templateUrl: './lib-search.component.html',
            styleUrls: ['./lib-search.component.scss']
        })
    ], LibSearchComponent);
    return LibSearchComponent;
}());
exports.LibSearchComponent = LibSearchComponent;
