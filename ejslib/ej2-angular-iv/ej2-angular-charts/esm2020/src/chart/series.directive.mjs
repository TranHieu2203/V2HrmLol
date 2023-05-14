import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import { TrendlinesDirective } from './trendlines.directive';
import { SegmentsDirective } from './segments.directive';
import * as i0 from "@angular/core";
let input = ['animation', 'bearFillColor', 'binInterval', 'border', 'boxPlotMode', 'bullFillColor', 'cardinalSplineTension', 'close', 'colorName', 'columnSpacing', 'columnWidth', 'columnWidthInPixel', 'connector', 'cornerRadius', 'dashArray', 'dataSource', 'dragSettings', 'drawType', 'emptyPointSettings', 'enableComplexProperty', 'enableSolidCandles', 'enableTooltip', 'errorBar', 'fill', 'groupName', 'high', 'intermediateSumIndexes', 'isClosed', 'legendImageUrl', 'legendShape', 'low', 'marker', 'maxRadius', 'minRadius', 'name', 'negativeFillColor', 'nonHighlightStyle', 'opacity', 'open', 'pointColorMapping', 'query', 'segmentAxis', 'segments', 'selectionStyle', 'showMean', 'showNormalDistribution', 'size', 'splineType', 'stackingGroup', 'sumIndexes', 'summaryFillColor', 'tooltipFormat', 'tooltipMappingName', 'trendlines', 'type', 'unSelectedStyle', 'visible', 'volume', 'width', 'xAxisName', 'xName', 'yAxisName', 'yName', 'zOrder'];
let outputs = [];
/**
 * Series Directive
 * ```html
 * <e-series-collection>
 * <e-series></e-series>
 * </e-series-collection>
 * ```
 */
export class SeriesDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['trendlines', 'segments'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
SeriesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SeriesDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
SeriesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SeriesDirective, selector: "e-series-collection>e-series", inputs: { animation: "animation", bearFillColor: "bearFillColor", binInterval: "binInterval", border: "border", boxPlotMode: "boxPlotMode", bullFillColor: "bullFillColor", cardinalSplineTension: "cardinalSplineTension", close: "close", colorName: "colorName", columnSpacing: "columnSpacing", columnWidth: "columnWidth", columnWidthInPixel: "columnWidthInPixel", connector: "connector", cornerRadius: "cornerRadius", dashArray: "dashArray", dataSource: "dataSource", dragSettings: "dragSettings", drawType: "drawType", emptyPointSettings: "emptyPointSettings", enableComplexProperty: "enableComplexProperty", enableSolidCandles: "enableSolidCandles", enableTooltip: "enableTooltip", errorBar: "errorBar", fill: "fill", groupName: "groupName", high: "high", intermediateSumIndexes: "intermediateSumIndexes", isClosed: "isClosed", legendImageUrl: "legendImageUrl", legendShape: "legendShape", low: "low", marker: "marker", maxRadius: "maxRadius", minRadius: "minRadius", name: "name", negativeFillColor: "negativeFillColor", nonHighlightStyle: "nonHighlightStyle", opacity: "opacity", open: "open", pointColorMapping: "pointColorMapping", query: "query", segmentAxis: "segmentAxis", segments: "segments", selectionStyle: "selectionStyle", showMean: "showMean", showNormalDistribution: "showNormalDistribution", size: "size", splineType: "splineType", stackingGroup: "stackingGroup", sumIndexes: "sumIndexes", summaryFillColor: "summaryFillColor", tooltipFormat: "tooltipFormat", tooltipMappingName: "tooltipMappingName", trendlines: "trendlines", type: "type", unSelectedStyle: "unSelectedStyle", visible: "visible", volume: "volume", width: "width", xAxisName: "xAxisName", xName: "xName", yAxisName: "yAxisName", yName: "yName", zOrder: "zOrder" }, queries: [{ propertyName: "dataLabel_template", first: true, predicate: ["dataLabelTemplate"], descendants: true }, { propertyName: "childTrendlines", first: true, predicate: TrendlinesDirective, descendants: true }, { propertyName: "childSegments", first: true, predicate: SegmentsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], SeriesDirective.prototype, "dataLabel_template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SeriesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-series-collection>e-series',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childTrendlines: new ContentChild(TrendlinesDirective),
                        childSegments: new ContentChild(SegmentsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { dataLabel_template: [{
                type: ContentChild,
                args: ['dataLabelTemplate']
            }] } });
/**
 * Series Array Directive
 * @private
 */
export class SeriesCollectionDirective extends ArrayBase {
    constructor() {
        super('series');
    }
}
SeriesCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SeriesCollectionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SeriesCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SeriesCollectionDirective, selector: "ej-chart>e-series-collection", queries: [{ propertyName: "children", predicate: SeriesDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SeriesCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-chart>e-series-collection',
                    queries: {
                        children: new ContentChildren(SeriesDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jaGFydC9zZXJpZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFekQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxXQUFXLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzN0IsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7O0dBT0c7QUFVSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUE0QjtJQThZN0QsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQXpZOUMsU0FBSSxHQUFhLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBMlkvQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs0R0FuWlEsZUFBZTtnR0FBZixlQUFlLCs2REFKYyxtQkFBbUIsZ0ZBQ3JCLGlCQUFpQjtBQStZckQ7SUFEQyxRQUFRLEVBQUU7MkRBQ29COzJGQTVZdEIsZUFBZTtrQkFUM0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFO3dCQUNMLGVBQWUsRUFBRSxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDdEQsYUFBYSxFQUFFLElBQUksWUFBWSxDQUFDLGlCQUFpQixDQUFDO3FCQUNyRDtpQkFDSjt1R0E2WVUsa0JBQWtCO3NCQUZ4QixZQUFZO3VCQUFDLG1CQUFtQjs7QUFZckM7OztHQUdHO0FBT0gsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFNBQW9DO0lBQy9FO1FBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7O3NIQUhRLHlCQUF5QjswR0FBekIseUJBQXlCLDZGQUhBLGVBQWU7MkZBR3hDLHlCQUF5QjtrQkFOckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQztxQkFDakQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRyZW5kbGluZXNEaXJlY3RpdmUgfSBmcm9tICcuL3RyZW5kbGluZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNlZ21lbnRzRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWdtZW50cy5kaXJlY3RpdmUnO1xuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydhbmltYXRpb24nLCAnYmVhckZpbGxDb2xvcicsICdiaW5JbnRlcnZhbCcsICdib3JkZXInLCAnYm94UGxvdE1vZGUnLCAnYnVsbEZpbGxDb2xvcicsICdjYXJkaW5hbFNwbGluZVRlbnNpb24nLCAnY2xvc2UnLCAnY29sb3JOYW1lJywgJ2NvbHVtblNwYWNpbmcnLCAnY29sdW1uV2lkdGgnLCAnY29sdW1uV2lkdGhJblBpeGVsJywgJ2Nvbm5lY3RvcicsICdjb3JuZXJSYWRpdXMnLCAnZGFzaEFycmF5JywgJ2RhdGFTb3VyY2UnLCAnZHJhZ1NldHRpbmdzJywgJ2RyYXdUeXBlJywgJ2VtcHR5UG9pbnRTZXR0aW5ncycsICdlbmFibGVDb21wbGV4UHJvcGVydHknLCAnZW5hYmxlU29saWRDYW5kbGVzJywgJ2VuYWJsZVRvb2x0aXAnLCAnZXJyb3JCYXInLCAnZmlsbCcsICdncm91cE5hbWUnLCAnaGlnaCcsICdpbnRlcm1lZGlhdGVTdW1JbmRleGVzJywgJ2lzQ2xvc2VkJywgJ2xlZ2VuZEltYWdlVXJsJywgJ2xlZ2VuZFNoYXBlJywgJ2xvdycsICdtYXJrZXInLCAnbWF4UmFkaXVzJywgJ21pblJhZGl1cycsICduYW1lJywgJ25lZ2F0aXZlRmlsbENvbG9yJywgJ25vbkhpZ2hsaWdodFN0eWxlJywgJ29wYWNpdHknLCAnb3BlbicsICdwb2ludENvbG9yTWFwcGluZycsICdxdWVyeScsICdzZWdtZW50QXhpcycsICdzZWdtZW50cycsICdzZWxlY3Rpb25TdHlsZScsICdzaG93TWVhbicsICdzaG93Tm9ybWFsRGlzdHJpYnV0aW9uJywgJ3NpemUnLCAnc3BsaW5lVHlwZScsICdzdGFja2luZ0dyb3VwJywgJ3N1bUluZGV4ZXMnLCAnc3VtbWFyeUZpbGxDb2xvcicsICd0b29sdGlwRm9ybWF0JywgJ3Rvb2x0aXBNYXBwaW5nTmFtZScsICd0cmVuZGxpbmVzJywgJ3R5cGUnLCAndW5TZWxlY3RlZFN0eWxlJywgJ3Zpc2libGUnLCAndm9sdW1lJywgJ3dpZHRoJywgJ3hBeGlzTmFtZScsICd4TmFtZScsICd5QXhpc05hbWUnLCAneU5hbWUnLCAnek9yZGVyJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogU2VyaWVzIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtc2VyaWVzLWNvbGxlY3Rpb24+XG4gKiA8ZS1zZXJpZXM+PC9lLXNlcmllcz5cbiAqIDwvZS1zZXJpZXMtY29sbGVjdGlvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Utc2VyaWVzLWNvbGxlY3Rpb24+ZS1zZXJpZXMnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZFRyZW5kbGluZXM6IG5ldyBDb250ZW50Q2hpbGQoVHJlbmRsaW5lc0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZFNlZ21lbnRzOiBuZXcgQ29udGVudENoaWxkKFNlZ21lbnRzRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VyaWVzRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8U2VyaWVzRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuICAgIHB1YmxpYyBjaGlsZFRyZW5kbGluZXM6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRTZWdtZW50czogYW55O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsndHJlbmRsaW5lcycsICdzZWdtZW50cyddO1xuICAgIC8qKiBcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgc2VyaWVzIGFyZSBcbiAgICAgKiAqIExpbmUgXG4gICAgICogKiBDb2x1bW4gXG4gICAgICogKiBBcmVhIFxuICAgICAqICogQmFyIFxuICAgICAqICogSGlzdG9ncmFtIFxuICAgICAqICogU3RhY2tpbmdDb2x1bW4gXG4gICAgICogKiBTdGFja2luZ0FyZWEgXG4gICAgICogKiBTdGFja2luZ0JhciBcbiAgICAgKiAqIFN0ZXBMaW5lIFxuICAgICAqICogU3RlcEFyZWEgXG4gICAgICogKiBTY2F0dGVyIFxuICAgICAqICogU3BsaW5lIFxuICAgICAqICogU3RhY2tpbmdDb2x1bW4xMDAgXG4gICAgICogKiBTdGFja2luZ0JhcjEwMCBcbiAgICAgKiAqIFN0YWNraW5nQXJlYTEwMCBcbiAgICAgKiAqIFJhbmdlQ29sdW1uIFxuICAgICAqICogSGlsbyBcbiAgICAgKiAqIEhpbG9PcGVuQ2xvc2UgXG4gICAgICogKiBXYXRlcmZhbGwgXG4gICAgICogKiBSYW5nZUFyZWEgXG4gICAgICogKiBTcGxpbmVSYW5nZUFyZWEgXG4gICAgICogKiBCdWJibGUgXG4gICAgICogKiBDYW5kbGUgXG4gICAgICogKiBQb2xhciBcbiAgICAgKiAqIFJhZGFyIFxuICAgICAqICogQm94QW5kV2hpc2tlciBcbiAgICAgKiAqIFBhcmV0b1xuICAgICAqIEBkZWZhdWx0ICdMaW5lJ1xuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgdG8gY3VzdG9taXppbmcgYW5pbWF0aW9uIGZvciB0aGUgc2VyaWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBhbmltYXRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIGluIGZpbmFuY2lhbCBjaGFydHMgdG8gdmlzdWFsaXplIHRoZSBwcmljZSBtb3ZlbWVudHMgaW4gc3RvY2suIFxuICAgICAqIEl0IGRlZmluZXMgdGhlIGNvbG9yIG9mIHRoZSBjYW5kbGUvcG9pbnQsIHdoZW4gdGhlIG9wZW5pbmcgcHJpY2UgaXMgbGVzcyB0aGFuIHRoZSBjbG9zaW5nIHByaWNlLlxuICAgICAqIEBkZWZhdWx0ICcjMmVjZDcxJ1xuICAgICAqL1xuICAgIHB1YmxpYyBiZWFyRmlsbENvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBiaW4gaW50ZXJ2YWwgb2YgZWFjaCBoaXN0b2dyYW0gcG9pbnRzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyBiaW5JbnRlcnZhbDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIHRvIGN1c3RvbWl6aW5nIHRoZSBib3JkZXIgb2YgdGhlIHNlcmllcy4gVGhpcyBpcyBhcHBsaWNhYmxlIG9ubHkgZm9yIGBDb2x1bW5gIGFuZCBgQmFyYCB0eXBlIHNlcmllcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYm9yZGVyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBtb2RlIG9mIHRoZSBib3ggYW5kIHdoaXNrZXIgY2hhciBzZXJpZXMuIFRoZXkgYXJlLCBcbiAgICAgKiBFeGNsdXNpdmUgXG4gICAgICogSW5jbHVzaXZlIFxuICAgICAqIE5vcm1hbFxuICAgICAqIEBkZWZhdWx0ICdOb3JtYWwnXG4gICAgICovXG4gICAgcHVibGljIGJveFBsb3RNb2RlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBpbiBmaW5hbmNpYWwgY2hhcnRzIHRvIHZpc3VhbGl6ZSB0aGUgcHJpY2UgbW92ZW1lbnRzIGluIHN0b2NrLiBcbiAgICAgKiBJdCBkZWZpbmVzIHRoZSBjb2xvciBvZiB0aGUgY2FuZGxlL3BvaW50LCB3aGVuIHRoZSBvcGVuaW5nIHByaWNlIGlzIGhpZ2hlciB0aGFuIHRoZSBjbG9zaW5nIHByaWNlLlxuICAgICAqIEBkZWZhdWx0ICcjZTc0YzNkJ1xuICAgICAqL1xuICAgIHB1YmxpYyBidWxsRmlsbENvbG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEl0IGRlZmluZXMgdGVuc2lvbiBvZiBjYXJkaW5hbCBzcGxpbmUgdHlwZXNcbiAgICAgKiBAZGVmYXVsdCAwLjVcbiAgICAgKi9cbiAgICBwdWJsaWMgY2FyZGluYWxTcGxpbmVUZW5zaW9uOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBEYXRhU291cmNlIGZpZWxkIHRoYXQgY29udGFpbnMgdGhlIGNsb3NlIHZhbHVlIG9mIHkgXG4gICAgICogSXQgaXMgYXBwbGljYWJsZSBmb3Igc2VyaWVzIGFuZCB0ZWNobmljYWwgaW5kaWNhdG9yc1xuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBEYXRhIFNvdXJjZSBmaWVsZCB0aGF0IGNvbnRhaW5zIHRoZSBjb2xvciBtYXBwaW5nIHZhbHVlLiBcbiAgICAgKiBJdCBpcyBhcHBsaWNhYmxlIGZvciByYW5nZSBjb2xvciBtYXBwaW5nIHByb3Blcmx5LlxuICAgICAqL1xuICAgIHB1YmxpYyBjb2xvck5hbWU6IGFueTtcbiAgICAvKiogXG4gICAgICogVG8gcmVuZGVyIHRoZSBjb2x1bW4gc2VyaWVzIHBvaW50cyB3aXRoIHBhcnRpY3VsYXIgY29sdW1uIHNwYWNpbmcuIEl0IHRha2VzIHZhbHVlIGZyb20gMCAtIDEuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBjb2x1bW5TcGFjaW5nOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRvIHJlbmRlciB0aGUgY29sdW1uIHNlcmllcyBwb2ludHMgd2l0aCBwYXJ0aWN1bGFyIGNvbHVtbiB3aWR0aC4gSWYgdGhlIHNlcmllcyB0eXBlIGlzIGhpc3RvZ3JhbSB0aGUgXG4gICAgICogZGVmYXVsdCB2YWx1ZSBpcyAxIG90aGVyd2lzZSAwLjcuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3BkZWZhdWx0dmFsdWVpZ25vcmUgXG4gICAgICogQGJsYXpvcmRlZmF1bHR2YWx1ZSBEb3VibGUuTmFOXG4gICAgICovXG4gICAgcHVibGljIGNvbHVtbldpZHRoOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRvIHJlbmRlciB0aGUgY29sdW1uIHNlcmllcyBwb2ludHMgd2l0aCBwYXJ0aWN1bGFyIGNvbHVtbiB3aWR0aCBhcyBwaXhlbC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAYmxhem9yZGVmYXVsdHZhbHVlIERvdWJsZS5OYU5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29sdW1uV2lkdGhJblBpeGVsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGFwcGVhcmFuY2Ugb2YgbGluZSBjb25uZWN0aW5nIGFkamFjZW50IHBvaW50cyBpbiB3YXRlcmZhbGwgY2hhcnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25uZWN0b3I6IGFueTtcbiAgICAvKiogXG4gICAgICogVG8gcmVuZGVyIHRoZSBjb2x1bW4gc2VyaWVzIHBvaW50cyB3aXRoIHBhcnRpY3VsYXIgcm91bmRlZCBjb3JuZXIuXG4gICAgICovXG4gICAgcHVibGljIGNvcm5lclJhZGl1czogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBwYXR0ZXJuIG9mIGRhc2hlcyBhbmQgZ2FwcyB0byBzdHJva2UgdGhlIGxpbmVzIGluIGBMaW5lYCB0eXBlIHNlcmllcy5cbiAgICAgKiBAZGVmYXVsdCAnMCdcbiAgICAgKi9cbiAgICBwdWJsaWMgZGFzaEFycmF5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgRGF0YVNvdXJjZSBmb3IgdGhlIHNlcmllcy4gSXQgY2FuIGJlIGFuIGFycmF5IG9mIEpTT04gb2JqZWN0cyBvciBhbiBpbnN0YW5jZSBvZiBEYXRhTWFuYWdlci4gXG4gICAgICogXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YVNvdXJjZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIHRvIGN1c3RvbWl6ZSB0aGUgZHJhZyBzZXR0aW5ncyBmb3Igc2VyaWVzXG4gICAgICovXG4gICAgcHVibGljIGRyYWdTZXR0aW5nczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUeXBlIG9mIHNlcmllcyB0byBiZSBkcmF3biBpbiByYWRhciBvciBwb2xhciBzZXJpZXMuIFRoZXkgYXJlIFxuICAgICAqICAnTGluZScgXG4gICAgICogICdDb2x1bW4nIFxuICAgICAqICAnQXJlYScgXG4gICAgICogICdTY2F0dGVyJyBcbiAgICAgKiAgJ1NwbGluZScgXG4gICAgICogICdTdGFja2luZ0NvbHVtbicgXG4gICAgICogICdTdGFja2luZ0FyZWEnIFxuICAgICAqICAnUmFuZ2VDb2x1bW4nIFxuICAgICAqICAnU3BsaW5lQXJlYSdcbiAgICAgKiBAZGVmYXVsdCAnTGluZSdcbiAgICAgKi9cbiAgICBwdWJsaWMgZHJhd1R5cGU6IGFueTtcbiAgICAvKiogXG4gICAgICogb3B0aW9ucyB0byBjdXN0b21pemUgdGhlIGVtcHR5IHBvaW50cyBpbiBzZXJpZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZW1wdHlQb2ludFNldHRpbmdzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoaXMgcHJvcGVydHkgdXNlZCB0byBpbXByb3ZlIGNoYXJ0IHBlcmZvcm1hbmNlIHZpYSBkYXRhIG1hcHBpbmcgZm9yIHNlcmllcyBkYXRhU291cmNlLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIGVuYWJsZUNvbXBsZXhQcm9wZXJ0eTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGlzIHByb3BlcnR5IGlzIGFwcGxpY2FibGUgZm9yIGNhbmRsZSBzZXJpZXMuIFxuICAgICAqIEl0IGVuYWJsZXMvZGlzYWJsZXMgdG8gdmlzdWFsbHkgY29tcGFyZSB0aGUgY3VycmVudCB2YWx1ZXMgd2l0aCB0aGUgcHJldmlvdXMgdmFsdWVzIGluIHN0b2NrLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIGVuYWJsZVNvbGlkQ2FuZGxlczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBJZiBzZXQgdHJ1ZSwgdGhlIFRvb2x0aXAgZm9yIHNlcmllcyB3aWxsIGJlIHZpc2libGUuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGVUb29sdGlwOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgYW5kIGN1c3RvbWl6aW5nIGVycm9yIGJhciBmb3IgaW5kaXZpZHVhbCBwb2ludCBpbiBhIHNlcmllcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZXJyb3JCYXI6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGZpbGwgY29sb3IgZm9yIHRoZSBzZXJpZXMgdGhhdCBhY2NlcHRzIHZhbHVlIGluIGhleCBhbmQgcmdiYSBhcyBhIHZhbGlkIENTUyBjb2xvciBzdHJpbmcuIFxuICAgICAqIEl0IGFsc28gcmVwcmVzZW50cyB0aGUgY29sb3Igb2YgdGhlIHNpZ25hbCBsaW5lcyBpbiB0ZWNobmljYWwgaW5kaWNhdG9ycy4gXG4gICAgICogRm9yIHRlY2huaWNhbCBpbmRpY2F0b3JzLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyAnYmx1ZScgYW5kIGZvciBzZXJpZXMsIGl0IGhhcyBudWxsLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZmlsbDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBuYW1lIHRoYXQgc3BlY2lmaWVzIHRoZSBjaGFydCBzZXJpZXMgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZSBhbmQgY2FuIGJlIG92ZXJsYWlkLiBcbiAgICAgKiBUaGUgYXhpcyBpbiB0aGUgc2FtZSBncm91cCBzaGFyZXMgdGhlIHNhbWUgYmFzZWxpbmUgYW5kIGxvY2F0aW9uIG9uIHRoZSBjb3JyZXNwb25kaW5nIGF4aXMuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgZ3JvdXBOYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBEYXRhU291cmNlIGZpZWxkIHRoYXQgY29udGFpbnMgdGhlIGhpZ2ggdmFsdWUgb2YgeSBcbiAgICAgKiBJdCBpcyBhcHBsaWNhYmxlIGZvciBzZXJpZXMgYW5kIHRlY2huaWNhbCBpbmRpY2F0b3JzXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlnaDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2xsZWN0aW9uIG9mIGluZGV4ZXMgb2YgdGhlIGludGVybWVkaWF0ZSBzdW1tYXJ5IGNvbHVtbnMgaW4gd2F0ZXJmYWxsIGNoYXJ0cy5cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqIEBhc3B0eXBlIGludFtdXG4gICAgICovXG4gICAgcHVibGljIGludGVybWVkaWF0ZVN1bUluZGV4ZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gam9pbiBzdGFydCBhbmQgZW5kIHBvaW50IG9mIGEgbGluZS9hcmVhIHNlcmllcyB1c2VkIGluIHBvbGFyL3JhZGFyIGNoYXJ0IHRvIGZvcm0gYSBjbG9zZWQgcGF0aC5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIGlzQ2xvc2VkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBVUkwgZm9yIHRoZSBJbWFnZSB0aGF0IGlzIHRvIGJlIGRpc3BsYXllZCBhcyBhIExlZ2VuZCBpY29uLiAgSXQgcmVxdWlyZXMgIGBsZWdlbmRTaGFwZWAgdmFsdWUgdG8gYmUgYW4gYEltYWdlYC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBsZWdlbmRJbWFnZVVybDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgc2hhcGUgb2YgdGhlIGxlZ2VuZC4gRWFjaCBzZXJpZXMgaGFzIGl0cyBvd24gbGVnZW5kIHNoYXBlLiBUaGV5IGFyZSwgXG4gICAgICogKiBDaXJjbGUgXG4gICAgICogKiBSZWN0YW5nbGUgXG4gICAgICogKiBUcmlhbmdsZSBcbiAgICAgKiAqIERpYW1vbmQgXG4gICAgICogKiBDcm9zcyBcbiAgICAgKiAqIEhvcml6b250YWxMaW5lIFxuICAgICAqICogVmVydGljYWxMaW5lIFxuICAgICAqICogUGVudGFnb24gXG4gICAgICogKiBJbnZlcnRlZFRyaWFuZ2xlIFxuICAgICAqICogU2VyaWVzVHlwZSBcbiAgICAgKiAqIEltYWdlXG4gICAgICogQGRlZmF1bHQgJ1Nlcmllc1R5cGUnXG4gICAgICovXG4gICAgcHVibGljIGxlZ2VuZFNoYXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBEYXRhU291cmNlIGZpZWxkIHRoYXQgY29udGFpbnMgdGhlIGxvdyB2YWx1ZSBvZiB5IFxuICAgICAqIEl0IGlzIGFwcGxpY2FibGUgZm9yIHNlcmllcyBhbmQgdGVjaG5pY2FsIGluZGljYXRvcnNcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBsb3c6IGFueTtcbiAgICAvKiogXG4gICAgICogT3B0aW9ucyBmb3IgZGlzcGxheWluZyBhbmQgY3VzdG9taXppbmcgbWFya2VycyBmb3IgaW5kaXZpZHVhbCBwb2ludHMgaW4gYSBzZXJpZXMuXG4gICAgICovXG4gICAgcHVibGljIG1hcmtlcjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBNYXhpbXVtIHJhZGl1c1xuICAgICAqIEBkZWZhdWx0IDNcbiAgICAgKi9cbiAgICBwdWJsaWMgbWF4UmFkaXVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE1pbmltdW0gcmFkaXVzXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIHB1YmxpYyBtaW5SYWRpdXM6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHNlcmllcyB2aXNpYmxlIGluIGxlZ2VuZC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBuYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbmVnYXRpdmUgY2hhbmdlcyBpbiB3YXRlcmZhbGwgY2hhcnRzLlxuICAgICAqIEBkZWZhdWx0ICcjQzY0RTRBJ1xuICAgICAqL1xuICAgIHB1YmxpYyBuZWdhdGl2ZUZpbGxDb2xvcjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBDdXN0b20gc3R5bGUgZm9yIHRoZSBub24taGlnaGxpZ2h0ZWQgc2VyaWVzIG9yIHBvaW50cy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIG5vbkhpZ2hsaWdodFN0eWxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBvcGFjaXR5IG9mIHRoZSBzZXJpZXMuXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIHB1YmxpYyBvcGFjaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBEYXRhU291cmNlIGZpZWxkIHRoYXQgY29udGFpbnMgdGhlIG9wZW4gdmFsdWUgb2YgeSBcbiAgICAgKiBJdCBpcyBhcHBsaWNhYmxlIGZvciBzZXJpZXMgYW5kIHRlY2huaWNhbCBpbmRpY2F0b3JzXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgRGF0YVNvdXJjZSBmaWVsZCB0aGF0IGNvbnRhaW5zIHRoZSBjb2xvciB2YWx1ZSBvZiBwb2ludCBcbiAgICAgKiBJdCBpcyBhcHBsaWNhYmxlIGZvciBzZXJpZXNcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBwb2ludENvbG9yTWFwcGluZzogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgcXVlcnkgdG8gc2VsZWN0IGRhdGEgZnJvbSBEYXRhU291cmNlLiBUaGlzIHByb3BlcnR5IGlzIGFwcGxpY2FibGUgb25seSB3aGVuIHRoZSBEYXRhU291cmNlIGlzIGBlai5EYXRhTWFuYWdlcmAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgcXVlcnk6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgYXhpcywgYmFzZWQgb24gd2hpY2ggdGhlIGxpbmUgc2VyaWVzIHdpbGwgYmUgc3BsaXQuXG4gICAgICovXG4gICAgcHVibGljIHNlZ21lbnRBeGlzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGNvbGxlY3Rpb24gb2YgcmVnaW9ucyB0aGF0IGhlbHBzIHRvIGRpZmZlcmVudGlhdGUgYSBsaW5lIHNlcmllcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VnbWVudHM6IGFueTtcbiAgICAvKiogXG4gICAgICogQ3VzdG9tIHN0eWxlIGZvciB0aGUgc2VsZWN0ZWQgc2VyaWVzIG9yIHBvaW50cy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdGlvblN0eWxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIElmIHNldCB0cnVlLCB0aGUgbWVhbiB2YWx1ZSBmb3IgYm94IGFuZCB3aGlza2VyIHdpbGwgYmUgdmlzaWJsZS5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHNob3dNZWFuOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBub3JtYWwgZGlzdHJpYnV0aW9uIG9mIGhpc3RvZ3JhbSBzZXJpZXMuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd05vcm1hbERpc3RyaWJ1dGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgRGF0YVNvdXJjZSBmaWVsZCB0aGF0IGNvbnRhaW5zIHRoZSBzaXplIHZhbHVlIG9mIHlcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzaXplOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdHlwZSBvZiBzcGxpbmUgdG8gYmUgcmVuZGVyZWQuXG4gICAgICogQGRlZmF1bHQgJ05hdHVyYWwnXG4gICAgICovXG4gICAgcHVibGljIHNwbGluZVR5cGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhpcyBwcm9wZXJ0eSBhbGxvd3MgZ3JvdXBpbmcgc2VyaWVzIGluIGBzdGFja2VkIGNvbHVtbiAvIGJhcmAgY2hhcnRzLiBcbiAgICAgKiBBbnkgc3RyaW5nIHZhbHVlIGNhbiBiZSBwcm92aWRlZCB0byB0aGUgc3RhY2tpbmdHcm91cCBwcm9wZXJ0eS4gXG4gICAgICogSWYgYW55IHR3byBvciBhYm92ZSBzZXJpZXMgaGF2ZSB0aGUgc2FtZSB2YWx1ZSwgdGhvc2Ugc2VyaWVzIHdpbGwgYmUgZ3JvdXBlZCB0b2dldGhlci5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGFja2luZ0dyb3VwOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGNvbGxlY3Rpb24gb2YgaW5kZXhlcyBvZiB0aGUgb3ZlcmFsbCBzdW1tYXJ5IGNvbHVtbnMgaW4gd2F0ZXJmYWxsIGNoYXJ0cy5cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqIEBhc3B0eXBlIGludFtdXG4gICAgICovXG4gICAgcHVibGljIHN1bUluZGV4ZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgdmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzdW1tYXJpZXMgaW4gd2F0ZXJmYWxsIGNoYXJ0cy5cbiAgICAgKiBAZGVmYXVsdCAnIzRFODFCQydcbiAgICAgKi9cbiAgICBwdWJsaWMgc3VtbWFyeUZpbGxDb2xvcjogYW55O1xuICAgIC8qKiBcbiAgICAgKiB1c2VyIGNhbiBmb3JtYXQgbm93IGVhY2ggc2VyaWVzIHRvb2x0aXAgZm9ybWF0IHNlcGFyYXRlbHkuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9vbHRpcEZvcm1hdDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgcHJvdmlkZWQgdmFsdWUgd2lsbCBiZSBjb25zaWRlcmVkIGFzIGEgVG9vbHRpcCBuYW1lXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9vbHRpcE1hcHBpbmdOYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGNvbGxlY3Rpb24gb2YgdHJlbmRsaW5lcyB0aGF0IGFyZSB1c2VkIHRvIHByZWRpY3QgdGhlIHRyZW5kXG4gICAgICovXG4gICAgcHVibGljIHRyZW5kbGluZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogQ3VzdG9tIHN0eWxlIGZvciB0aGUgZGVzZWxlY3RlZCBzZXJpZXMgb3IgcG9pbnRzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdW5TZWxlY3RlZFN0eWxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdmlzaWJpbGl0eSBvZiBzZXJpZXMuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGRhdGEgc291cmNlIGZpZWxkIHRoYXQgY29udGFpbnMgdGhlIHZvbHVtZSB2YWx1ZSBpbiBjYW5kbGUgY2hhcnRzIFxuICAgICAqIEl0IGlzIGFwcGxpY2FibGUgZm9yIGZpbmFuY2lhbCBzZXJpZXMgYW5kIHRlY2huaWNhbCBpbmRpY2F0b3JzXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdm9sdW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBzdHJva2Ugd2lkdGggZm9yIHRoZSBzZXJpZXMgdGhhdCBpcyBhcHBsaWNhYmxlIG9ubHkgZm9yIGBMaW5lYCB0eXBlIHNlcmllcy4gXG4gICAgICogSXQgYWxzbyByZXByZXNlbnRzIHRoZSBzdHJva2Ugd2lkdGggb2YgdGhlIHNpZ25hbCBsaW5lcyBpbiB0ZWNobmljYWwgaW5kaWNhdG9ycy5cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgcHVibGljIHdpZHRoOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBob3Jpem9udGFsIGF4aXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBzZXJpZXMuIEl0IHJlcXVpcmVzIGBheGVzYCBvZiB0aGUgY2hhcnQuIFxuICAgICAqIEl0IGlzIGFwcGxpY2FibGUgZm9yIHNlcmllcyBhbmQgdGVjaG5pY2FsIGluZGljYXRvcnMgXG4gICAgICogXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB4QXhpc05hbWU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIERhdGFTb3VyY2UgZmllbGQgdGhhdCBjb250YWlucyB0aGUgeCB2YWx1ZS4gXG4gICAgICogSXQgaXMgYXBwbGljYWJsZSBmb3Igc2VyaWVzIGFuZCB0ZWNobmljYWwgaW5kaWNhdG9yc1xuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHhOYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSB2ZXJ0aWNhbCBheGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2VyaWVzLiBJdCByZXF1aXJlcyBgYXhlc2Agb2YgdGhlIGNoYXJ0LiBcbiAgICAgKiBJdCBpcyBhcHBsaWNhYmxlIGZvciBzZXJpZXMgYW5kIHRlY2huaWNhbCBpbmRpY2F0b3JzIFxuICAgICAqIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgeUF4aXNOYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBEYXRhU291cmNlIGZpZWxkIHRoYXQgY29udGFpbnMgdGhlIHkgdmFsdWUuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgeU5hbWU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIHogb3JkZXIgb2YgdGhlIHNlcmllcy5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIHpPcmRlcjogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2RhdGFMYWJlbFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBkYXRhTGFiZWxfdGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFNlcmllcyBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWotY2hhcnQ+ZS1zZXJpZXMtY29sbGVjdGlvbicsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihTZXJpZXNEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU2VyaWVzQ29sbGVjdGlvbkRpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxTZXJpZXNDb2xsZWN0aW9uRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdzZXJpZXMnKTtcbiAgICB9XG59Il19