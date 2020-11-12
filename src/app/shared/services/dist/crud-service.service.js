"use strict";
exports.__esModule = true;
exports.CrudService = void 0;
var operators_1 = require("rxjs/operators");
var CrudService = /** @class */ (function () {
    function CrudService(http, API_URL) {
        this.http = http;
        this.API_URL = API_URL;
    }
    CrudService.prototype.list = function () {
        return this.http.get(this.API_URL)
            .pipe(operators_1.delay(2000), operators_1.tap(console.log)
        // catchError(err => )
        );
    };
    CrudService.prototype.loadById = function (id) {
        return this.http.get(this.API_URL + "/" + id).pipe(operators_1.take(1));
    };
    CrudService.prototype.create = function (record) {
        return this.http.post(this.API_URL, record).pipe(operators_1.take(1));
    };
    CrudService.prototype.update = function (record) {
        return this.http.put(this.API_URL + "/" + record['id'], record).pipe(operators_1.take(1));
    };
    CrudService.prototype.save = function (record) {
        if (record['id']) {
            return this.update(record);
        }
        else {
            return this.create(record);
        }
    };
    CrudService.prototype.remove = function (id) {
        return this.http["delete"](this.API_URL + "/" + id).pipe(operators_1.take(1));
    };
    return CrudService;
}());
exports.CrudService = CrudService;
