import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any;
export declare const watch: any;
export declare const emitProbs: any;
export declare const isExecute: any;
/**
 * ComboBox component allows the user to type a value or choose an option from the list of predefined options available
 * ```html
 * <ejs-combobox :dataSource='data'></ejs-combobox>
 * ```
 */
export declare class ComboBoxComponent extends ComponentBase {
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
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    custom(): void;
    addItem(items: undefined[] | undefined | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    clear(): void;
    filter(dataSource: undefined[] | Object | string[] | number[] | boolean[], query?: Object, fields?: Object): void;
    focusIn(): void;
    focusOut(e?: Object | Object): void;
    getDataByValue(value: string | number | boolean): Object | string | number | boolean;
    getItems(): Object[];
    hidePopup(e?: Object | Object): void;
    hideSpinner(): void;
    showPopup(): void;
    showSpinner(): void;
}
export declare const ComboBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
