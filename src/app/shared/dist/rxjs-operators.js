"use strict";
exports.__esModule = true;
exports.uploadProgress = exports.filterResponse = void 0;
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
function filterResponse() {
    return rxjs_1.pipe(operators_1.filter(function (event) { return event.type === http_1.HttpEventType.Response; }), operators_1.map(function (res) { return res.body; }));
}
exports.filterResponse = filterResponse;
function uploadProgress(cb) {
    return operators_1.tap(function (event) {
        if (event.type === http_1.HttpEventType.UploadProgress) {
            cb(Math.round((event.loaded * 100) / event.total));
        }
    });
}
exports.uploadProgress = uploadProgress;
