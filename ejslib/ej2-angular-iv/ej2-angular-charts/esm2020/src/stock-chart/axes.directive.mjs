import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['coefficient', 'crossesAt', 'crossesInAxis', 'crosshairTooltip', 'description', 'desiredIntervals', 'edgeLabelPlacement', 'enableAutoIntervalOnZooming', 'enableTrim', 'interval', 'intervalType', 'isInversed', 'labelFormat', 'labelIntersectAction', 'labelPlacement', 'labelPosition', 'labelRotation', 'labelStyle', 'lineStyle', 'logBase', 'majorGridLines', 'majorTickLines', 'maximum', 'maximumLabelWidth', 'maximumLabels', 'minimum', 'minorGridLines', 'minorTickLines', 'minorTicksPerInterval', 'name', 'opposedPosition', 'placeNextToAxisLine', 'plotOffset', 'rangePadding', 'rowIndex', 'skeleton', 'skeletonType', 'span', 'startAngle', 'stripLines', 'tabIndex', 'tickPosition', 'title', 'titleStyle', 'valueType', 'visible', 'zoomFactor', 'zoomPosition'];
let outputs = [];
/**
 * Axis Directive
 * ```html
 * <e-stockchart-axes><e-stockchart-axis></e-stockchart-axis></e-stockchart-axes>
 * ```
 */
export class StockChartAxisDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
StockChartAxisDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartAxisDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
StockChartAxisDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StockChartAxisDirective, selector: "e-stockchart-axes>e-stockchart-axis", inputs: { coefficient: "coefficient", crossesAt: "crossesAt", crossesInAxis: "crossesInAxis", crosshairTooltip: "crosshairTooltip", description: "description", desiredIntervals: "desiredIntervals", edgeLabelPlacement: "edgeLabelPlacement", enableAutoIntervalOnZooming: "enableAutoIntervalOnZooming", enableTrim: "enableTrim", interval: "interval", intervalType: "intervalType", isInversed: "isInversed", labelFormat: "labelFormat", labelIntersectAction: "labelIntersectAction", labelPlacement: "labelPlacement", labelPosition: "labelPosition", labelRotation: "labelRotation", labelStyle: "labelStyle", lineStyle: "lineStyle", logBase: "logBase", majorGridLines: "majorGridLines", majorTickLines: "majorTickLines", maximum: "maximum", maximumLabelWidth: "maximumLabelWidth", maximumLabels: "maximumLabels", minimum: "minimum", minorGridLines: "minorGridLines", minorTickLines: "minorTickLines", minorTicksPerInterval: "minorTicksPerInterval", name: "name", opposedPosition: "opposedPosition", placeNextToAxisLine: "placeNextToAxisLine", plotOffset: "plotOffset", rangePadding: "rangePadding", rowIndex: "rowIndex", skeleton: "skeleton", skeletonType: "skeletonType", span: "span", startAngle: "startAngle", stripLines: "stripLines", tabIndex: "tabIndex", tickPosition: "tickPosition", title: "title", titleStyle: "titleStyle", valueType: "valueType", visible: "visible", zoomFactor: "zoomFactor", zoomPosition: "zoomPosition" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartAxisDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-stockchart-axes>e-stockchart-axis',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * StockChartAxis Array Directive
 * @private
 */
export class StockChartAxesDirective extends ArrayBase {
    constructor() {
        super('axes');
    }
}
StockChartAxesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartAxesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
StockChartAxesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StockChartAxesDirective, selector: "ejs-stockchart>e-stockchart-axes", queries: [{ propertyName: "children", predicate: StockChartAxisDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartAxesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stockchart>e-stockchart-axes',
                    queries: {
                        children: new ContentChildren(StockChartAxisDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvY2stY2hhcnQvYXhlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSw2QkFBNkIsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzN3QixJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7O0dBS0c7QUFTSCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsV0FBb0M7SUErUTdFLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7b0hBcFJRLHVCQUF1Qjt3R0FBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBUm5DLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQXdSRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsU0FBa0M7SUFDM0U7UUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7b0hBSFEsdUJBQXVCO3dHQUF2Qix1QkFBdUIsaUdBSEUsdUJBQXVCOzJGQUdoRCx1QkFBdUI7a0JBTm5DLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDekQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2NvZWZmaWNpZW50JywgJ2Nyb3NzZXNBdCcsICdjcm9zc2VzSW5BeGlzJywgJ2Nyb3NzaGFpclRvb2x0aXAnLCAnZGVzY3JpcHRpb24nLCAnZGVzaXJlZEludGVydmFscycsICdlZGdlTGFiZWxQbGFjZW1lbnQnLCAnZW5hYmxlQXV0b0ludGVydmFsT25ab29taW5nJywgJ2VuYWJsZVRyaW0nLCAnaW50ZXJ2YWwnLCAnaW50ZXJ2YWxUeXBlJywgJ2lzSW52ZXJzZWQnLCAnbGFiZWxGb3JtYXQnLCAnbGFiZWxJbnRlcnNlY3RBY3Rpb24nLCAnbGFiZWxQbGFjZW1lbnQnLCAnbGFiZWxQb3NpdGlvbicsICdsYWJlbFJvdGF0aW9uJywgJ2xhYmVsU3R5bGUnLCAnbGluZVN0eWxlJywgJ2xvZ0Jhc2UnLCAnbWFqb3JHcmlkTGluZXMnLCAnbWFqb3JUaWNrTGluZXMnLCAnbWF4aW11bScsICdtYXhpbXVtTGFiZWxXaWR0aCcsICdtYXhpbXVtTGFiZWxzJywgJ21pbmltdW0nLCAnbWlub3JHcmlkTGluZXMnLCAnbWlub3JUaWNrTGluZXMnLCAnbWlub3JUaWNrc1BlckludGVydmFsJywgJ25hbWUnLCAnb3Bwb3NlZFBvc2l0aW9uJywgJ3BsYWNlTmV4dFRvQXhpc0xpbmUnLCAncGxvdE9mZnNldCcsICdyYW5nZVBhZGRpbmcnLCAncm93SW5kZXgnLCAnc2tlbGV0b24nLCAnc2tlbGV0b25UeXBlJywgJ3NwYW4nLCAnc3RhcnRBbmdsZScsICdzdHJpcExpbmVzJywgJ3RhYkluZGV4JywgJ3RpY2tQb3NpdGlvbicsICd0aXRsZScsICd0aXRsZVN0eWxlJywgJ3ZhbHVlVHlwZScsICd2aXNpYmxlJywgJ3pvb21GYWN0b3InLCAnem9vbVBvc2l0aW9uJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogQXhpcyBEaXJlY3RpdmVcbiAqIGBgYGh0bWxcbiAqIDxlLXN0b2NrY2hhcnQtYXhlcz48ZS1zdG9ja2NoYXJ0LWF4aXM+PC9lLXN0b2NrY2hhcnQtYXhpcz48L2Utc3RvY2tjaGFydC1heGVzPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1zdG9ja2NoYXJ0LWF4ZXM+ZS1zdG9ja2NoYXJ0LWF4aXMnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTdG9ja0NoYXJ0QXhpc0RpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPFN0b2NrQ2hhcnRBeGlzRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogVGhlIHBvbGFyIHJhZGFyIHJhZGl1cyBwb3NpdGlvbi5cbiAgICAgKiBAZGVmYXVsdCAxMDBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29lZmZpY2llbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB2YWx1ZSBhdCB3aGljaCB0aGUgYXhpcyBsaW5lIGhhcyB0byBiZSBpbnRlcnNlY3Qgd2l0aCB0aGUgdmVydGljYWwgYXhpcyBvciB2aWNlIHZlcnNhLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY3Jvc3Nlc0F0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyBheGlzIG5hbWUgd2l0aCB3aGljaCB0aGUgYXhpcyBsaW5lIGhhcyB0byBiZSBjcm9zc2VkXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBjcm9zc2VzSW5BeGlzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBjcm9zc2hhaXIgVG9vbFRpcC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3Jvc3NoYWlyVG9vbHRpcDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZXNjcmlwdGlvbiBmb3IgYXhpcyBhbmQgaXRzIGVsZW1lbnQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBXaXRoIHRoaXMgcHJvcGVydHksIHlvdSBjYW4gcmVxdWVzdCBheGlzIHRvIGNhbGN1bGF0ZSBpbnRlcnZhbHMgYXBwcm94aW1hdGVseSBlcXVhbCB0byB5b3VyIHNwZWNpZmllZCBpbnRlcnZhbC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzaXJlZEludGVydmFsczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHBvc2l0aW9uIG9mIGxhYmVscyBhdCB0aGUgZWRnZSBvZiB0aGUgYXhpcy5UaGV5IGFyZSwgXG4gICAgICogKiBOb25lOiBObyBhY3Rpb24gd2lsbCBiZSBwZXJmb3JtZWQuIFxuICAgICAqICogSGlkZTogRWRnZSBsYWJlbCB3aWxsIGJlIGhpZGRlbi4gXG4gICAgICogKiBTaGlmdDogU2hpZnRzIHRoZSBlZGdlIGxhYmVscy5cbiAgICAgKiBAZGVmYXVsdCAnTm9uZSdcbiAgICAgKi9cbiAgICBwdWJsaWMgZWRnZUxhYmVsUGxhY2VtZW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIElmIHNldCB0byB0cnVlLCBheGlzIGludGVydmFsIHdpbGwgYmUgY2FsY3VsYXRlZCBhdXRvbWF0aWNhbGx5IHdpdGggcmVzcGVjdCB0byB0aGUgem9vbWVkIHJhbmdlLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZW5hYmxlQXV0b0ludGVydmFsT25ab29taW5nOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgVHJpbSBwcm9wZXJ0eSBmb3IgYW4gYXhpcy5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGVUcmltOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgaW50ZXJ2YWwgZm9yIGFuIGF4aXMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3BkZWZhdWx0dmFsdWVpZ25vcmUgXG4gICAgICovXG4gICAgcHVibGljIGludGVydmFsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdHlwZXMgbGlrZSBgWWVhcnNgLCBgTW9udGhzYCwgYERheXNgLCBgSG91cnNgLCBgTWludXRlc2AsIGBTZWNvbmRzYCBpbiBkYXRlIHRpbWUgYXhpcy5UaGV5IGFyZSwgXG4gICAgICogKiBBdXRvOiBEZWZpbmVzIHRoZSBpbnRlcnZhbCBvZiB0aGUgYXhpcyBiYXNlZCBvbiBkYXRhLiBcbiAgICAgKiAqIFllYXJzOiBEZWZpbmVzIHRoZSBpbnRlcnZhbCBvZiB0aGUgYXhpcyBpbiB5ZWFycy4gXG4gICAgICogKiBNb250aHM6IERlZmluZXMgdGhlIGludGVydmFsIG9mIHRoZSBheGlzIGluIG1vbnRocy4gXG4gICAgICogKiBEYXlzOiBEZWZpbmVzIHRoZSBpbnRlcnZhbCBvZiB0aGUgYXhpcyBpbiBkYXlzLiBcbiAgICAgKiAqIEhvdXJzOiBEZWZpbmVzIHRoZSBpbnRlcnZhbCBvZiB0aGUgYXhpcyBpbiBob3Vycy4gXG4gICAgICogKiBNaW51dGVzOiBEZWZpbmVzIHRoZSBpbnRlcnZhbCBvZiB0aGUgYXhpcyBpbiBtaW51dGVzLlxuICAgICAqIEBkZWZhdWx0ICdBdXRvJ1xuICAgICAqL1xuICAgIHB1YmxpYyBpbnRlcnZhbFR5cGU6IGFueTtcbiAgICAvKiogXG4gICAgICogSXQgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIGF4aXMgdG8gYmUgcmVuZGVyZWQgaW4gaW52ZXJzZWQgbWFubmVyIG9yIG5vdC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBpc0ludmVyc2VkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFVzZWQgdG8gZm9ybWF0IHRoZSBheGlzIGxhYmVsIHRoYXQgYWNjZXB0cyBhbnkgZ2xvYmFsIHN0cmluZyBmb3JtYXQgbGlrZSAnQycsICduMScsICdQJyBldGMuIFxuICAgICAqIEl0IGFsc28gYWNjZXB0cyBwbGFjZWhvbGRlciBsaWtlICd7dmFsdWV9wrBDJyBpbiB3aGljaCB2YWx1ZSByZXByZXNlbnQgdGhlIGF4aXMgbGFiZWwsIGUuZywgMjDCsEMuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgbGFiZWxGb3JtYXQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBhY3Rpb25zIGxpa2UgYEhpZGVgLCBgUm90YXRlNDVgLCBhbmQgYFJvdGF0ZTkwYCB3aGVuIHRoZSBheGlzIGxhYmVscyBpbnRlcnNlY3Qgd2l0aCBlYWNoIG90aGVyLlRoZXkgYXJlLCBcbiAgICAgKiAqIE5vbmU6IFNob3dzIGFsbCB0aGUgbGFiZWxzLiBcbiAgICAgKiAqIEhpZGU6IEhpZGVzIHRoZSBsYWJlbCB3aGVuIGl0IGludGVyc2VjdHMuIFxuICAgICAqICogUm90YXRlNDU6IFJvdGF0ZXMgdGhlIGxhYmVsIHRvIDQ1IGRlZ3JlZSB3aGVuIGl0IGludGVyc2VjdHMuIFxuICAgICAqICogUm90YXRlOTA6IFJvdGF0ZXMgdGhlIGxhYmVsIHRvIDkwIGRlZ3JlZSB3aGVuIGl0IGludGVyc2VjdHMuXG4gICAgICogQGRlZmF1bHQgSGlkZVxuICAgICAqL1xuICAgIHB1YmxpYyBsYWJlbEludGVyc2VjdEFjdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHBsYWNlbWVudCBvZiBhIGxhYmVsIGZvciBjYXRlZ29yeSBheGlzLiBUaGV5IGFyZSwgXG4gICAgICogKiBiZXR3ZWVuVGlja3M6IFJlbmRlcnMgdGhlIGxhYmVsIGJldHdlZW4gdGhlIHRpY2tzLiBcbiAgICAgKiAqIG9uVGlja3M6IFJlbmRlcnMgdGhlIGxhYmVsIG9uIHRoZSB0aWNrcy5cbiAgICAgKiBAZGVmYXVsdCAnQmV0d2VlblRpY2tzJ1xuICAgICAqL1xuICAgIHB1YmxpYyBsYWJlbFBsYWNlbWVudDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHBsYWNlbWVudCBvZiBhIGxhYmVscyB0byB0aGUgYXhpcyBsaW5lLiBUaGV5IGFyZSwgXG4gICAgICogKiBpbnNpZGU6IFJlbmRlcnMgdGhlIGxhYmVscyBpbnNpZGUgdG8gdGhlIGF4aXMgbGluZS4gXG4gICAgICogKiBvdXRzaWRlOiBSZW5kZXJzIHRoZSBsYWJlbHMgb3V0c2lkZSB0byB0aGUgYXhpcyBsaW5lLlxuICAgICAqIEBkZWZhdWx0ICdPdXRzaWRlJ1xuICAgICAqL1xuICAgIHB1YmxpYyBsYWJlbFBvc2l0aW9uOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBhbmdsZSB0byB3aGljaCB0aGUgYXhpcyBsYWJlbCBnZXRzIHJvdGF0ZWQuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBsYWJlbFJvdGF0aW9uOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBheGlzIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBsYWJlbFN0eWxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgZm9yIGN1c3RvbWl6aW5nIGF4aXMgbGluZXMuXG4gICAgICovXG4gICAgcHVibGljIGxpbmVTdHlsZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgYmFzZSB2YWx1ZSBmb3IgbG9nYXJpdGhtaWMgYXhpcy4gSXQgcmVxdWlyZXMgYHZhbHVlVHlwZWAgdG8gYmUgYExvZ2FyaXRobWljYC5cbiAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAqL1xuICAgIHB1YmxpYyBsb2dCYXNlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgZm9yIGN1c3RvbWl6aW5nIG1ham9yIGdyaWQgbGluZXMuXG4gICAgICovXG4gICAgcHVibGljIG1ham9yR3JpZExpbmVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgZm9yIGN1c3RvbWl6aW5nIG1ham9yIHRpY2sgbGluZXMuXG4gICAgICovXG4gICAgcHVibGljIG1ham9yVGlja0xpbmVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbWF4aW11bSByYW5nZSBvZiBhbiBheGlzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgbWF4aW11bTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIG1heGltdW0gd2lkdGggb2YgYW4gYXhpcyBsYWJlbC5cbiAgICAgKiBAZGVmYXVsdCAzNC5cbiAgICAgKi9cbiAgICBwdWJsaWMgbWF4aW11bUxhYmVsV2lkdGg6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGxhYmVsIGNvdW50IHBlciAxMDAgcGl4ZWxzIHdpdGggcmVzcGVjdCB0byB0aGUgYXhpcyBsZW5ndGguXG4gICAgICogQGRlZmF1bHQgM1xuICAgICAqL1xuICAgIHB1YmxpYyBtYXhpbXVtTGFiZWxzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbWluaW11bSByYW5nZSBvZiBhbiBheGlzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgbWluaW11bTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIGZvciBjdXN0b21pemluZyBtaW5vciBncmlkIGxpbmVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBtaW5vckdyaWRMaW5lczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIGZvciBjdXN0b21pemluZyBtaW5vciB0aWNrIGxpbmVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBtaW5vclRpY2tMaW5lczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIG51bWJlciBvZiBtaW5vciB0aWNrcyBwZXIgaW50ZXJ2YWwuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBtaW5vclRpY2tzUGVySW50ZXJ2YWw6IGFueTtcbiAgICAvKiogXG4gICAgICogVW5pcXVlIGlkZW50aWZpZXIgb2YgYW4gYXhpcy4gXG4gICAgICogVG8gYXNzb2NpYXRlIGFuIGF4aXMgd2l0aCB0aGUgc2VyaWVzLCBzZXQgdGhpcyBuYW1lIHRvIHRoZSB4QXhpc05hbWUveUF4aXNOYW1lIHByb3BlcnRpZXMgb2YgdGhlIHNlcmllcy5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBuYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgYXhpcyB3aWxsIHJlbmRlciBhdCB0aGUgb3Bwb3NpdGUgc2lkZSBvZiBpdHMgZGVmYXVsdCBwb3NpdGlvbi5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBvcHBvc2VkUG9zaXRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHdoZXRoZXIgYXhpcyBlbGVtZW50cyBsaWtlIGF4aXMgbGFiZWxzLCBheGlzIHRpdGxlLCBldGMgaGFzIHRvIGJlIGNyb3NzZWQgd2l0aCBheGlzIGxpbmVcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHBsYWNlTmV4dFRvQXhpc0xpbmU6IGFueTtcbiAgICAvKiogXG4gICAgICogTGVmdCBhbmQgcmlnaHQgcGFkZGluZyBmb3IgdGhlIHBsb3QgYXJlYSBpbiBwaXhlbHMuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBwbG90T2Zmc2V0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgcGFkZGluZyBmb3IgdGhlIGF4aXMgcmFuZ2UgaW4gdGVybXMgb2YgaW50ZXJ2YWwuVGhleSBhcmUsIFxuICAgICAqICogbm9uZTogUGFkZGluZyBjYW5ub3QgYmUgYXBwbGllZCB0byB0aGUgYXhpcy4gXG4gICAgICogKiBub3JtYWw6IFBhZGRpbmcgaXMgYXBwbGllZCB0byB0aGUgYXhpcyBiYXNlZCBvbiB0aGUgcmFuZ2UgY2FsY3VsYXRpb24uIFxuICAgICAqICogYWRkaXRpb25hbDogSW50ZXJ2YWwgb2YgdGhlIGF4aXMgaXMgYWRkZWQgYXMgcGFkZGluZyB0byB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMgb2YgdGhlIHJhbmdlLiBcbiAgICAgKiAqIHJvdW5kOiBBeGlzIHJhbmdlIGlzIHJvdW5kZWQgdG8gdGhlIG5lYXJlc3QgcG9zc2libGUgdmFsdWUgZGl2aWRlZCBieSB0aGUgaW50ZXJ2YWwuXG4gICAgICogQGRlZmF1bHQgJ0F1dG8nXG4gICAgICovXG4gICAgcHVibGljIHJhbmdlUGFkZGluZzogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGluZGV4IG9mIHRoZSByb3cgd2hlcmUgdGhlIGF4aXMgaXMgYXNzb2NpYXRlZCwgd2hlbiB0aGUgY2hhcnQgYXJlYSBpcyBkaXZpZGVkIGludG8gbXVsdGlwbGUgcGxvdCBhcmVhcyBieSB1c2luZyBgcm93c2AuIFxuICAgICAqIFxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgcm93SW5kZXg6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBza2VsZXRvbiBmb3JtYXQgaW4gd2hpY2ggdGhlIGRhdGVUaW1lIGZvcm1hdCB3aWxsIHByb2Nlc3MuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgc2tlbGV0b246IGFueTtcbiAgICAvKiogXG4gICAgICogSXQgc3BlY2lmaWVzIHRoZSB0eXBlIG9mIGZvcm1hdCB0byBiZSB1c2VkIGluIGRhdGVUaW1lIGZvcm1hdCBwcm9jZXNzLlxuICAgICAqIEBkZWZhdWx0ICdEYXRlVGltZSdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2tlbGV0b25UeXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIGBjb2x1bW5zYCBvciBgcm93c2AgYW4gYXhpcyBoYXMgdG8gc3BhbiBob3Jpem9udGFsbHkgb3IgdmVydGljYWxseS5cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgcHVibGljIHNwYW46IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIHN0YXJ0IGFuZ2xlIGZvciB0aGUgc2VyaWVzLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnRBbmdsZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHN0cmlwTGluZSBjb2xsZWN0aW9uIGZvciB0aGUgYXhpc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdHJpcExpbmVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRhYkluZGV4IHZhbHVlIGZvciB0aGUgYXhpcy5cbiAgICAgKiBAZGVmYXVsdCAyXG4gICAgICovXG4gICAgcHVibGljIHRhYkluZGV4OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgcGxhY2VtZW50IG9mIGEgdGlja3MgdG8gdGhlIGF4aXMgbGluZS4gVGhleSBhcmUsIFxuICAgICAqICogaW5zaWRlOiBSZW5kZXJzIHRoZSB0aWNrcyBpbnNpZGUgdG8gdGhlIGF4aXMgbGluZS4gXG4gICAgICogKiBvdXRzaWRlOiBSZW5kZXJzIHRoZSB0aWNrcyBvdXRzaWRlIHRvIHRoZSBheGlzIGxpbmUuXG4gICAgICogQGRlZmF1bHQgJ091dHNpZGUnXG4gICAgICovXG4gICAgcHVibGljIHRpY2tQb3NpdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRpdGxlIG9mIGFuIGF4aXMuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdGl0bGU6IGFueTtcbiAgICAvKiogXG4gICAgICogT3B0aW9ucyBmb3IgY3VzdG9taXppbmcgdGhlIGF4aXMgdGl0bGUuXG4gICAgICovXG4gICAgcHVibGljIHRpdGxlU3R5bGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0eXBlIG9mIGRhdGEgdGhlIGF4aXMgaXMgaGFuZGxpbmcuIFxuICAgICAqICogRG91YmxlOiAgUmVuZGVycyBhIG51bWVyaWMgYXhpcy4gXG4gICAgICogKiBEYXRlVGltZTogUmVuZGVycyBhIGRhdGVUaW1lIGF4aXMuIFxuICAgICAqICogQ2F0ZWdvcnk6IFJlbmRlcnMgYSBjYXRlZ29yeSBheGlzLiBcbiAgICAgKiAqIExvZ2FyaXRobWljOiBSZW5kZXJzIGEgbG9nIGF4aXMuXG4gICAgICogQGRlZmF1bHQgJ0RvdWJsZSdcbiAgICAgKiBAYmxhem9ydHlwZSBTeW5jZnVzaW9uLkVKMi5CbGF6b3IuQ2hhcnRzLlZhbHVlVHlwZVxuICAgICAqIEBpc2VudW1lcmF0aW9uIHRydWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsdWVUeXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIElmIHNldCB0byB0cnVlLCBheGlzIGxhYmVsIHdpbGwgYmUgdmlzaWJsZS5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHZpc2libGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGF4aXMgaXMgc2NhbGVkIGJ5IHRoaXMgZmFjdG9yLiBXaGVuIHpvb21GYWN0b3IgaXMgMC41LCB0aGUgY2hhcnQgaXMgc2NhbGVkIGJ5IDIwMCUgYWxvbmcgdGhpcyBheGlzLiBWYWx1ZSByYW5nZXMgZnJvbSAwIHRvIDEuXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIHB1YmxpYyB6b29tRmFjdG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSB6b29tZWQgYXhpcy4gVmFsdWUgcmFuZ2VzIGZyb20gMCB0byAxLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgem9vbVBvc2l0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBTdG9ja0NoYXJ0QXhpcyBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXN0b2NrY2hhcnQ+ZS1zdG9ja2NoYXJ0LWF4ZXMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oU3RvY2tDaGFydEF4aXNEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU3RvY2tDaGFydEF4ZXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8U3RvY2tDaGFydEF4ZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2F4ZXMnKTtcbiAgICB9XG59Il19