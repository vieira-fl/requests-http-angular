"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmModalComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ConfirmModalComponent = /** @class */ (function () {
    function ConfirmModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.cancelTxt = 'Cancelar';
        this.confirmTxt = 'Confirmar';
    }
    ConfirmModalComponent.prototype.ngOnInit = function () {
        this.confirmResult = new rxjs_1.Subject();
    };
    ConfirmModalComponent.prototype.onConfirm = function () {
        this.confirmAndClose(true);
    };
    ConfirmModalComponent.prototype.onClose = function () {
        this.confirmAndClose(false);
    };
    ConfirmModalComponent.prototype.confirmAndClose = function (value) {
        this.confirmResult.next(value);
        this.bsModalRef.hide();
    };
    __decorate([
        core_1.Input()
    ], ConfirmModalComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], ConfirmModalComponent.prototype, "message");
    __decorate([
        core_1.Input()
    ], ConfirmModalComponent.prototype, "cancelTxt");
    __decorate([
        core_1.Input()
    ], ConfirmModalComponent.prototype, "confirmTxt");
    ConfirmModalComponent = __decorate([
        core_1.Component({
            selector: 'app-confirm-modal',
            templateUrl: './confirm-modal.component.html',
            styleUrls: ['./confirm-modal.component.scss']
        })
    ], ConfirmModalComponent);
    return ConfirmModalComponent;
}());
exports.ConfirmModalComponent = ConfirmModalComponent;
