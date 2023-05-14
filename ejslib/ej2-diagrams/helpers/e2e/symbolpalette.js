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
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SymbolpaletteHelper = (function (_super) {
        __extends(SymbolpaletteHelper, _super);
        function SymbolpaletteHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        SymbolpaletteHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        SymbolpaletteHelper.prototype.getSearchElement = function () {
            return this.selector('#' + this.id + '_search');
        };
        SymbolpaletteHelper.prototype.getHeadderElement = function () {
            return this.selector('#' + this.id);
        };
        SymbolpaletteHelper.prototype.getPaletteElement = function (paletteId) {
            return this.selector('#' + paletteId);
        };
        SymbolpaletteHelper.prototype.getSymbolElement = function (symbolId) {
            return this.selector('#' + symbolId);
        };
        return SymbolpaletteHelper;
    }(e2e_1.TestHelper));
    exports.SymbolpaletteHelper = SymbolpaletteHelper;
});
