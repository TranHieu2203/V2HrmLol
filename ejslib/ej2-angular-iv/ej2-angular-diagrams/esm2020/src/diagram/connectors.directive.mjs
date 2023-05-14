import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { ConnectorFixedUserHandlesDirective } from './connector-fixeduserhandle.directive';
import { ConnectorAnnotationsDirective } from './connector-annotation.directive';
import * as i0 from "@angular/core";
let input = ['addInfo', 'annotations', 'bridgeSpace', 'connectionPadding', 'constraints', 'cornerRadius', 'dragSize', 'excludeFromLayout', 'fixedUserHandles', 'flip', 'flipMode', 'hitPadding', 'id', 'margin', 'previewSize', 'segments', 'shape', 'sourceDecorator', 'sourceID', 'sourcePadding', 'sourcePoint', 'sourcePortID', 'style', 'symbolInfo', 'targetDecorator', 'targetID', 'targetPadding', 'targetPoint', 'targetPortID', 'tooltip', 'type', 'visible', 'wrapper', 'zIndex'];
let outputs = [];
/**
 * Connectors Directive
 * ```html
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * ```
 */
export class ConnectorDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['fixedUserHandles', 'annotations'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ConnectorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ConnectorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ConnectorDirective, selector: "e-connectors>e-connector", inputs: { addInfo: "addInfo", annotations: "annotations", bridgeSpace: "bridgeSpace", connectionPadding: "connectionPadding", constraints: "constraints", cornerRadius: "cornerRadius", dragSize: "dragSize", excludeFromLayout: "excludeFromLayout", fixedUserHandles: "fixedUserHandles", flip: "flip", flipMode: "flipMode", hitPadding: "hitPadding", id: "id", margin: "margin", previewSize: "previewSize", segments: "segments", shape: "shape", sourceDecorator: "sourceDecorator", sourceID: "sourceID", sourcePadding: "sourcePadding", sourcePoint: "sourcePoint", sourcePortID: "sourcePortID", style: "style", symbolInfo: "symbolInfo", targetDecorator: "targetDecorator", targetID: "targetID", targetPadding: "targetPadding", targetPoint: "targetPoint", targetPortID: "targetPortID", tooltip: "tooltip", type: "type", visible: "visible", wrapper: "wrapper", zIndex: "zIndex" }, queries: [{ propertyName: "childFixedUserHandles", first: true, predicate: ConnectorFixedUserHandlesDirective, descendants: true }, { propertyName: "childAnnotations", first: true, predicate: ConnectorAnnotationsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-connectors>e-connector',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childFixedUserHandles: new ContentChild(ConnectorFixedUserHandlesDirective),
                        childAnnotations: new ContentChild(ConnectorAnnotationsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Connector Array Directive
 * @private
 */
export class ConnectorsDirective extends ArrayBase {
    constructor() {
        super('connectors');
    }
}
ConnectorsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ConnectorsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ConnectorsDirective, selector: "ej-diagram>e-connectors", queries: [{ propertyName: "children", predicate: ConnectorDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ConnectorsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ej-diagram>e-connectors',
                    queries: {
                        children: new ContentChildren(ConnectorDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9ycy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlhZ3JhbS9jb25uZWN0b3JzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQUVqRixJQUFJLEtBQUssR0FBYSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2ZSxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7R0FPRztBQVVILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxXQUErQjtJQStNbkUsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQTFNOUMsU0FBSSxHQUFhLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUE0TXhELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OytHQXBOUSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwyOUJBSmlCLGtDQUFrQyxtRkFDdkMsNkJBQTZCOzJGQUczRCxrQkFBa0I7a0JBVDlCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRTt3QkFDTCxxQkFBcUIsRUFBRSxJQUFJLFlBQVksQ0FBQyxrQ0FBa0MsQ0FBQzt3QkFDM0UsZ0JBQWdCLEVBQUUsSUFBSSxZQUFZLENBQUMsNkJBQTZCLENBQUM7cUJBQ3BFO2lCQUNKOztBQXdORDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBOEI7SUFDbkU7UUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Z0hBSFEsbUJBQW1CO29HQUFuQixtQkFBbUIsd0ZBSE0sa0JBQWtCOzJGQUczQyxtQkFBbUI7a0JBTi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQztxQkFDcEQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5pbXBvcnQgeyBDb25uZWN0b3JGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0b3ItZml4ZWR1c2VyaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb25uZWN0b3JBbm5vdGF0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdG9yLWFubm90YXRpb24uZGlyZWN0aXZlJztcblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnYWRkSW5mbycsICdhbm5vdGF0aW9ucycsICdicmlkZ2VTcGFjZScsICdjb25uZWN0aW9uUGFkZGluZycsICdjb25zdHJhaW50cycsICdjb3JuZXJSYWRpdXMnLCAnZHJhZ1NpemUnLCAnZXhjbHVkZUZyb21MYXlvdXQnLCAnZml4ZWRVc2VySGFuZGxlcycsICdmbGlwJywgJ2ZsaXBNb2RlJywgJ2hpdFBhZGRpbmcnLCAnaWQnLCAnbWFyZ2luJywgJ3ByZXZpZXdTaXplJywgJ3NlZ21lbnRzJywgJ3NoYXBlJywgJ3NvdXJjZURlY29yYXRvcicsICdzb3VyY2VJRCcsICdzb3VyY2VQYWRkaW5nJywgJ3NvdXJjZVBvaW50JywgJ3NvdXJjZVBvcnRJRCcsICdzdHlsZScsICdzeW1ib2xJbmZvJywgJ3RhcmdldERlY29yYXRvcicsICd0YXJnZXRJRCcsICd0YXJnZXRQYWRkaW5nJywgJ3RhcmdldFBvaW50JywgJ3RhcmdldFBvcnRJRCcsICd0b29sdGlwJywgJ3R5cGUnLCAndmlzaWJsZScsICd3cmFwcGVyJywgJ3pJbmRleCddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIENvbm5lY3RvcnMgRGlyZWN0aXZlXG4gKiBgYGBodG1sXG4gKiA8ZS1jb25uZWN0b3JzPlxuICogPGUtY29ubmVjdG9yPjwvZS1jb25uZWN0b3I+XG4gKiA8L2UtY29ubmVjdG9ycz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtY29ubmVjdG9ycz5lLWNvbm5lY3RvcicsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkRml4ZWRVc2VySGFuZGxlczogbmV3IENvbnRlbnRDaGlsZChDb25uZWN0b3JGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkQW5ub3RhdGlvbnM6IG5ldyBDb250ZW50Q2hpbGQoQ29ubmVjdG9yQW5ub3RhdGlvbnNEaXJlY3RpdmUpXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0b3JEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxDb25uZWN0b3JEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG4gICAgcHVibGljIGNoaWxkRml4ZWRVc2VySGFuZGxlczogYW55O1xuICAgIHB1YmxpYyBjaGlsZEFubm90YXRpb25zOiBhbnk7XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydmaXhlZFVzZXJIYW5kbGVzJywgJ2Fubm90YXRpb25zJ107XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHR5cGUgb2YgdGhlIGNvbm5lY3RvciBcbiAgICAgKiAqIFN0cmFpZ2h0IC0gU2V0cyB0aGUgc2VnbWVudCB0eXBlIGFzIFN0cmFpZ2h0IFxuICAgICAqICogT3J0aG9nb25hbCAtIFNldHMgdGhlIHNlZ21lbnQgdHlwZSBhcyBPcnRob2dvbmFsIFxuICAgICAqICogQmV6aWVyIC0gU2V0cyB0aGUgc2VnbWVudCB0eXBlIGFzIEJlemllclxuICAgICAqIEBkZWZhdWx0ICdTdHJhaWdodCdcbiAgICAgKiBAYXNwdHlwZSBTeW5jZnVzaW9uLkVKMi5EaWFncmFtcy5TZWdtZW50c1xuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFsbG93cyB0aGUgdXNlciB0byBzYXZlIGN1c3RvbSBpbmZvcm1hdGlvbi9kYXRhIGFib3V0IGEgbm9kZS9jb25uZWN0b3JcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRJbmZvOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFxuICAgICAqL1xuICAgIHB1YmxpYyBhbm5vdGF0aW9uczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBicmlkZ2VTcGFjZSBvZiBjb25uZWN0b3JcbiAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAqL1xuICAgIHB1YmxpYyBicmlkZ2VTcGFjZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIHRoZSBjb25uZWN0b3IgcGFkZGluZyB2YWx1ZVxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29ubmVjdGlvblBhZGRpbmc6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgY29uc3RyYWludHMgb2YgY29ubmVjdG9yIFxuICAgICAqICogTm9uZSAtIEludGVyYWN0aW9uIG9mIHRoZSBjb25uZWN0b3JzIGNhbm5vdCBiZSBkb25lLiBcbiAgICAgKiAqIFNlbGVjdCAtIFNlbGVjdHMgdGhlIGNvbm5lY3Rvci4gXG4gICAgICogKiBEZWxldGUgLSBEZWxldGUgdGhlIGNvbm5lY3Rvci4gXG4gICAgICogKiBEcmFnIC0gRHJhZyB0aGUgY29ubmVjdG9yLiBcbiAgICAgKiAqIERyYWdTb3VyY2VFbmQgLSBEcmFnIHRoZSBzb3VyY2UgZW5kIG9mIHRoZSBjb25uZWN0b3IuIFxuICAgICAqICogRHJhZ1RhcmdldEVuZCAtIERyYWcgdGhlIHRhcmdldCBlbmQgb2YgdGhlIGNvbm5lY3Rvci4gXG4gICAgICogKiBEcmFnU2VnbWVudFRodW1wIC0gRHJhZyB0aGUgc2VnbWVudCB0aHVtYiBvZiB0aGUgY29ubmVjdG9yLiBcbiAgICAgKiAqIEFsbG93RHJvcCAtIEFsbG93IHRvIGRyb3AgYSBub2RlLiBcbiAgICAgKiAqIEJyaWRnaW5nIC0gQ3JlYXRlcyBicmlkZ2UgIG9uIGludGVyc2VjdGlvbiBvZiB0d28gY29ubmVjdG9ycy4gXG4gICAgICogKiBJbmhlcml0QnJpZGdpbmcgLSBDcmVhdGVzIGJyaWRnZSAgb24gaW50ZXJzZWN0aW9uIG9mIHR3byBjb25uZWN0b3JzLiBcbiAgICAgKiAqIFBvaW50ZXJFdmVudHMgLSBTZXRzIHRoZSBwb2ludGVyIGV2ZW50cy4gXG4gICAgICogKiBUb29sdGlwIC0gRGlzcGxheXMgYSB0b29sdGlwIGZvciB0aGUgY29ubmVjdG9ycy4gXG4gICAgICogKiBJbmhlcml0VG9vbFRpcCAtIERpc3BsYXlzIGEgdG9vbHRpcCBmb3IgdGhlIGNvbm5lY3RvcnMuIFxuICAgICAqICogSW50ZXJhY3Rpb24gLSBGZWF0dXJlcyBvZiB0aGUgY29ubmVjdG9yIHVzZWQgZm9yIGludGVyYWN0aW9uLiBcbiAgICAgKiAqIFJlYWRPbmx5IC0gRW5hYmxlcyBSZWFkT25seVxuICAgICAqIEBkZWZhdWx0ICdEZWZhdWx0J1xuICAgICAqIEBhc3BudW1iZXJlbnVtIFxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJhaW50czogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIHRoZSBjb3JuZXIgcmFkaXVzIG9mIHRoZSBjb25uZWN0b3JcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIGNvcm5lclJhZGl1czogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBzaXplIG9mIGEgZHJvcCBzeW1ib2xcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHB1YmxpYyBkcmFnU2l6ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIG5vZGUgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgcG9zaXRpb25lZCBvciBub3QuIEFwcGxpY2FibGUsIGlmIGxheW91dCBvcHRpb24gaXMgZW5hYmxlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBleGNsdWRlRnJvbUxheW91dDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGNvbGxlY3Rpb24gb2YgdGhlIGZpeGVkIHVzZXIgaGFuZGxlXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZml4ZWRVc2VySGFuZGxlczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBGbGlwIHRoZSBlbGVtZW50IGluIEhvcml6b250YWwvVmVydGljYWwgZGlyZWN0aW9uc1xuICAgICAqIEBhc3BkZWZhdWx0dmFsdWVpZ25vcmUgXG4gICAgICogQGRlZmF1bHQgTm9uZVxuICAgICAqL1xuICAgIHB1YmxpYyBmbGlwOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFsbG93cyB5b3UgdG8gZmxpcCBvbmx5IHRoZSBub2RlIG9yIGFsb25nIHdpdGggcG9ydCBhbmQgbGFiZWxcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqIEBkZWZhdWx0IEFsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmbGlwTW9kZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIHRoZSBjb25uZWN0b3IgcGFkZGluZyB2YWx1ZVxuICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICovXG4gICAgcHVibGljIGhpdFBhZGRpbmc6IGFueTtcbiAgICAvKiogXG4gICAgICogUmVwcmVzZW50cyB0aGUgdW5pcXVlIGlkIG9mIG5vZGVzL2Nvbm5lY3RvcnNcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBzcGFjZSB0byBiZSBsZWZ0IGJldHdlZW4gdGhlIG5vZGUgYW5kIGl0cyBpbW1lZGlhdGUgcGFyZW50XG4gICAgICogQGRlZmF1bHQge31cbiAgICAgKi9cbiAgICBwdWJsaWMgbWFyZ2luOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHNpemUgb2YgdGhlIHN5bWJvbCBwcmV2aWV3XG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgcHJldmlld1NpemU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgc2VnbWVudHNcbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqIEBhc3B0eXBlIG9iamVjdFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWdtZW50czogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgY29ubmVjdG9yXG4gICAgICogQGRlZmF1bHQgJ0JwbW4nXG4gICAgICogQGFzcHR5cGUgb2JqZWN0XG4gICAgICovXG4gICAgcHVibGljIHNoYXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHNvdXJjZSBkZWNvcmF0b3Igb2YgdGhlIGNvbm5lY3RvclxuICAgICAqIEBkZWZhdWx0IG5ldyBEZWNvcmF0b3IoKVxuICAgICAqL1xuICAgIHB1YmxpYyBzb3VyY2VEZWNvcmF0b3I6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyB0aGUgc291cmNlIG5vZGUvY29ubmVjdG9yIG9iamVjdCBvZiB0aGUgY29ubmVjdG9yXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBzb3VyY2VJRDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIHRoZSBzb3VyY2UgcGFkZGluZyBvZiB0aGUgY29ubmVjdG9yXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBzb3VyY2VQYWRkaW5nOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgdGhlIGJlZ2lubmluZyBwb2ludCBvZiB0aGUgY29ubmVjdG9yXG4gICAgICogQGRlZmF1bHQgbmV3IFBvaW50KDAsMClcbiAgICAgKi9cbiAgICBwdWJsaWMgc291cmNlUG9pbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyB0aGUgdW5pcXVlIGlkIG9mIHRoZSBzb3VyY2UgcG9ydCBvZiB0aGUgY29ubmVjdG9yXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgc291cmNlUG9ydElEOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIGNvbm5lY3Rpb24gcGF0aFxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHN0eWxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHN5bWJvbCBpbmZvIG9mIGEgY29ubmVjdG9yXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICAgKiBAaWdub3JlYXBpbGluayBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3ltYm9sSW5mbzogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB0YXJnZXQgZGVjb3JhdG9yIG9mIHRoZSBjb25uZWN0b3JcbiAgICAgKiBAZGVmYXVsdCBuZXcgRGVjb3JhdG9yKClcbiAgICAgKi9cbiAgICBwdWJsaWMgdGFyZ2V0RGVjb3JhdG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgdGhlIHRhcmdldCBub2RlL2Nvbm5lY3RvciBvYmplY3Qgb2YgdGhlIGNvbm5lY3RvclxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgdGFyZ2V0SUQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyB0aGUgdGFyZ2V0IHBhZGRpbmcgb2YgdGhlIGNvbm5lY3RvclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgdGFyZ2V0UGFkZGluZzogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIHRoZSBlbmQgcG9pbnQgb2YgdGhlIGNvbm5lY3RvclxuICAgICAqIEBkZWZhdWx0IG5ldyBQb2ludCgwLDApXG4gICAgICovXG4gICAgcHVibGljIHRhcmdldFBvaW50OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgdGhlIHVuaXF1ZSBpZCBvZiB0aGUgdGFyZ2V0IHBvcnQgb2YgdGhlIGNvbm5lY3RvclxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHRhcmdldFBvcnRJRDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBkZWZpbmVzIHRoZSB0b29sdGlwIGZvciB0aGUgY29ubmVjdG9yXG4gICAgICogQGRlZmF1bHQgbmV3IERpYWdyYW1Ub29sVGlwKCk7XG4gICAgICovXG4gICAgcHVibGljIHRvb2x0aXA6IGFueTtcbiAgICAvKiogXG4gICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbm9kZS9jb25uZWN0b3JcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHZpc2libGU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgVUkgb2YgdGhlIGNvbm5lY3RvclxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAZGVwcmVjYXRlZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgd3JhcHBlcjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB2aXN1YWwgb3JkZXIgb2YgdGhlIG5vZGUvY29ubmVjdG9yIGluIERPTVxuICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICovXG4gICAgcHVibGljIHpJbmRleDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQ29ubmVjdG9yIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlai1kaWFncmFtPmUtY29ubmVjdG9ycycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihDb25uZWN0b3JEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdG9yc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxDb25uZWN0b3JzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjb25uZWN0b3JzJyk7XG4gICAgfVxufSJdfQ==