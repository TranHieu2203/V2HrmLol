import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['color', 'endRange', 'opacity', 'startRange'];
let outputs = [];
export class RangeBandSettingDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RangeBandSettingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeBandSettingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RangeBandSettingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeBandSettingDirective, selector: "e-rangeBandSettings>e-rangeBandSetting", inputs: { color: "color", endRange: "endRange", opacity: "opacity", startRange: "startRange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeBandSettingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-rangeBandSettings>e-rangeBandSetting',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RangeBandSetting Array Directive
 * @private
 */
export class RangeBandSettingsDirective extends ArrayBase {
    constructor() {
        super('rangebandsettings');
    }
}
RangeBandSettingsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeBandSettingsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RangeBandSettingsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RangeBandSettingsDirective, selector: "ejs-sparkline>e-rangeBandSettings", queries: [{ propertyName: "children", predicate: RangeBandSettingDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RangeBandSettingsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-sparkline>e-rangeBandSettings',
                    queries: {
                        children: new ContentChildren(RangeBandSettingDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2ViYW5kc2V0dGluZ3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NwYXJrbGluZS9yYW5nZWJhbmRzZXR0aW5ncy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3JFLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQVUzQixNQUFNLE9BQU8seUJBQTBCLFNBQVEsV0FBc0M7SUF5QmpGLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7c0hBOUJRLHlCQUF5QjswR0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBUnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHdDQUF3QztvQkFDbEQsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQWtDRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsU0FBcUM7SUFDakY7UUFDSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixDQUFDOzt1SEFIUSwwQkFBMEI7MkdBQTFCLDBCQUEwQixrR0FIRCx5QkFBeUI7MkZBR2xELDBCQUEwQjtrQkFOdEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLHlCQUF5QixDQUFDO3FCQUMzRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY29sb3InLCAnZW5kUmFuZ2UnLCAnb3BhY2l0eScsICdzdGFydFJhbmdlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJhbmdlQmFuZFNldHRpbmdzPmUtcmFuZ2VCYW5kU2V0dGluZycsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlQmFuZFNldHRpbmdEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxSYW5nZUJhbmRTZXR0aW5nRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogVG8gY29uZmlndXJlIHNwYXJrbGluZSByYW5nZWJhbmQgY29sb3JcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sb3I6IGFueTtcbiAgICAvKiogXG4gICAgICogVG8gY29uZmlndXJlIHNwYXJrbGluZSBlbmQgcmFuZ2VcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyBlbmRSYW5nZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUbyBjb25maWd1cmUgc3BhcmtsaW5lIHJhbmdlYmFuZCBvcGFjaXR5XG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIHB1YmxpYyBvcGFjaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRvIGNvbmZpZ3VyZSBzcGFya2xpbmUgc3RhcnQgcmFuZ2VcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGFydFJhbmdlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSYW5nZUJhbmRTZXR0aW5nIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtc3BhcmtsaW5lPmUtcmFuZ2VCYW5kU2V0dGluZ3MnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oUmFuZ2VCYW5kU2V0dGluZ0RpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBSYW5nZUJhbmRTZXR0aW5nc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxSYW5nZUJhbmRTZXR0aW5nc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigncmFuZ2ViYW5kc2V0dGluZ3MnKTtcbiAgICB9XG59Il19