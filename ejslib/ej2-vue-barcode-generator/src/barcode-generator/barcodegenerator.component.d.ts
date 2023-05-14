import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any;
export declare const watch: any;
export declare const emitProbs: any;
export declare const isExecute: any;
/**
 * Represents vue Barcode Component
 * ```html
 * <ejs-barcode-generator></ejs-barcode-generator>
 * ```
 */
export declare class BarcodeGeneratorComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    isVue3: boolean;
    templateCollection: any;
    constructor();
    clearTemplate(templateNames?: string[]): any;
    setProperties(prop: any, muteOnChange: boolean): void;
    render(createElement: any): any;
    custom(): void;
    exportAsBase64Image(exportType: Object): Object;
    exportImage(filename: string, exportType: Object): void;
}
export declare const BarcodeGeneratorPlugin: {
    name: string;
    install(Vue: any): void;
};
