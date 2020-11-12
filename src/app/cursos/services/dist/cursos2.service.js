"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Cursos2Service = void 0;
var crud_service_service_1 = require("./../../shared/services/crud-service.service");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var Cursos2Service = /** @class */ (function (_super) {
    __extends(Cursos2Service, _super);
    function Cursos2Service(http) {
        var _this = _super.call(this, http, environment_1.environment.API + "cursos") || this;
        _this.http = http;
        return _this;
    }
    Cursos2Service = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Cursos2Service);
    return Cursos2Service;
}(crud_service_service_1.CrudService));
exports.Cursos2Service = Cursos2Service;
