"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlertModalService = exports.AlertTypes = void 0;
var core_1 = require("@angular/core");
var confirm_modal_component_1 = require("./../confirm-modal/confirm-modal.component");
var alert_modal_component_1 = require("../alert-modal/alert-modal.component");
var AlertTypes;
(function (AlertTypes) {
    AlertTypes["DANGER"] = "danger";
    AlertTypes["SUCCESS"] = "success";
})(AlertTypes = exports.AlertTypes || (exports.AlertTypes = {}));
var AlertModalService = /** @class */ (function () {
    function AlertModalService(modalService) {
        this.modalService = modalService;
    }
    AlertModalService.prototype.showAlert = function (message, type, dismissTimeout) {
        var bsModalRef = this.modalService.show(alert_modal_component_1.AlertModalComponent);
        bsModalRef.content.type = type;
        bsModalRef.content.message = message;
        if (dismissTimeout) {
            setTimeout(function () { return bsModalRef.hide(); }, dismissTimeout);
        }
    };
    AlertModalService.prototype.showAlertDanger = function (message) {
        this.showAlert(message, AlertTypes.DANGER);
    };
    AlertModalService.prototype.showAlertSuccess = function (message) {
        this.showAlert(message, AlertTypes.SUCCESS, 2000);
    };
    AlertModalService.prototype.showConfirm = function (title, message, confirmTxt, cancelTxt) {
        var bsModalRef = this.modalService.show(confirm_modal_component_1.ConfirmModalComponent);
        bsModalRef.content.title = title;
        bsModalRef.content.message = message;
        if (confirmTxt) {
            bsModalRef.content.confirmTxt = confirmTxt;
        }
        if (cancelTxt) {
            bsModalRef.content.cancelTxt = cancelTxt;
        }
        // return bsModalRef.content.confirmResult;
        return bsModalRef.content.confirmResult;
    };
    AlertModalService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AlertModalService);
    return AlertModalService;
}());
exports.AlertModalService = AlertModalService;
