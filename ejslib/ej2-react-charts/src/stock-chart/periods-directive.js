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
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartIndicatorsDirective>
 * <StockChartIndicatorDirective></StockChartIndicatorDirective>
 * </StockChartIndicatorsDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartPeriodDirective = /** @class */ (function (_super) {
    __extends(StockChartPeriodDirective, _super);
    function StockChartPeriodDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartPeriodDirective.moduleName = 'stockChartPeriod';
    return StockChartPeriodDirective;
}(ComplexBase));
export { StockChartPeriodDirective };
var StockChartPeriodsDirective = /** @class */ (function (_super) {
    __extends(StockChartPeriodsDirective, _super);
    function StockChartPeriodsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartPeriodsDirective.propertyName = 'periods';
    StockChartPeriodsDirective.moduleName = 'stockChartPeriods';
    return StockChartPeriodsDirective;
}(ComplexBase));
export { StockChartPeriodsDirective };
