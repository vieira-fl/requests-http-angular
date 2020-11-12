"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadFileService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var UploadFileService = /** @class */ (function () {
    function UploadFileService(http) {
        this.http = http;
    }
    // metodo generico e pode ser utilizado em outros locais da aplicação
    UploadFileService.prototype.upload = function (files, url) {
        var formData = new FormData();
        files.forEach(function (file) { return formData.append('file', file, file.name); });
        var request = new http_1.HttpRequest('POST', url, formData);
        return this.http.post(url, formData, {
            observe: 'events',
            reportProgress: true
        });
    };
    UploadFileService.prototype.download = function (url) {
        return this.http.get(url, {
            responseType: 'blob'
        });
    };
    UploadFileService.prototype.handleFile = function (res, fileName) {
        var file = new Blob([res], {
            type: res.type // informa o tipo do arquivo
        });
        // IE 11
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file);
            return;
        }
        var blob = window.URL.createObjectURL(file); //criando um link
        var link = document.createElement('a');
        link.href = blob;
        link.download = fileName;
        // link.click(); // só para o chrome e IE11, não funciona para o firefox
        // modificações para o firefox: dispatch event & settimeout
        // continua funcionando no chrome
        link.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        }));
        setTimeout(function () {
            window.URL.revokeObjectURL(blob);
            link.remove();
        }, 200);
    };
    UploadFileService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UploadFileService);
    return UploadFileService;
}());
exports.UploadFileService = UploadFileService;
