"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadFileComponent = void 0;
var environment_1 = require("../../../environments/environment");
var core_1 = require("@angular/core");
var rxjs_operators_1 = require("src/app/shared/rxjs-operators");
var UploadFileComponent = /** @class */ (function () {
    function UploadFileComponent(uploadFileService) {
        this.uploadFileService = uploadFileService;
        this.fileNames2 = 'Selecione o(s) arquivo(s) para upload...';
        this.progress = 0;
    }
    UploadFileComponent.prototype.ngOnInit = function () {
    };
    UploadFileComponent.prototype.onChange = function (event) {
        var selectedFiles = event.srcElement.files;
        var fileNames = [];
        this.files = new Set();
        for (var i = 0; i < selectedFiles.length; i++) {
            fileNames.push(selectedFiles[i].name);
            this.files.add(selectedFiles[i]); // para adicionar os arquivos no files Set()...
        }
        document.getElementById('customFileLabel').innerHTML = fileNames.join('; ');
        this.progress = 0; // reiniciando o progresso de upload.
        // outra forma....
        // this.fileNames2 = [...event.srcElement.files]
        // .map((file) => {
        //   `${file.name}`;
        // }).join('; ')
        // e fazer um interpollation no template html na label ou o inner HTML abaixo
        // document.getElementById('customFileLabel').innerHTML = this.fileNames2;
    };
    // subir arquivos para o servidor
    UploadFileComponent.prototype.onUpload = function () {
        var _this = this;
        if (this.files && this.files.size > 0) {
            this.sub = this.uploadFileService.upload(this.files, environment_1.environment.BASE_URL + "/upload")
                .pipe(
            // utilizando os rxjs operators criado por mim e não um default do rxjs
            rxjs_operators_1.uploadProgress(function (progress) {
                console.log(progress);
                _this.progress = progress;
            }), rxjs_operators_1.filterResponse())
                .subscribe(function (response) { return console.log('upload concluído'); });
            // .subscribe((event: HttpEvent<Object>) => {
            //   // HttpEventType.UploadProgress.
            //   console.log(event);
            //   if(event.type === HttpEventType.Response){
            //     console.log('upload concluído');
            //   } 
            //   else if (event.type === HttpEventType.UploadProgress) {
            //     const percentDone = Math.round((event.loaded * 100) / event.total);
            //     console.log('Progresso', percentDone);
            //     this.progress = percentDone;
            //   }
            // });
            // com Cors é melhor fazer o unsubscribe.
        }
        else {
            console.log('não rolou');
        }
    };
    UploadFileComponent.prototype.onDownloadExcel = function () {
        var _this = this;
        this.uploadFileService.download(environment_1.environment.BASE_URL + "/downloadExcel")
            .subscribe(function (res) {
            _this.uploadFileService.handleFile(res, 'report.xlsx');
            // removendo o link
        });
    };
    UploadFileComponent.prototype.onDownloadPdf = function () {
        var _this = this;
        this.uploadFileService.download(environment_1.environment.BASE_URL + "/downloadPdf")
            .subscribe(function (res) {
            _this.uploadFileService.handleFile(res, 'report.pdf');
            // removendo o link
        });
    };
    UploadFileComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        // this.sub.unsubscribe();
    };
    UploadFileComponent = __decorate([
        core_1.Component({
            selector: 'app-upload-file',
            templateUrl: './upload-file.component.html',
            styleUrls: ['./upload-file.component.scss']
        })
    ], UploadFileComponent);
    return UploadFileComponent;
}());
exports.UploadFileComponent = UploadFileComponent;
