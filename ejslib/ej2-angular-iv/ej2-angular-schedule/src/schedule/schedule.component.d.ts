import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Schedule } from '@syncfusion/ej2-schedule';
import { ViewsDirective } from './views.directive';
import { ResourcesDirective } from './resources.directive';
import { HeaderRowsDirective } from './headerrows.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ej-schedule` represents the Angular Schedule Component.
 * ```html
 * <ejs-schedule></ejs-schedule>
 * ```
 */
export declare class ScheduleComponent extends Schedule implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    cellClick: any;
    cellDoubleClick: any;
    created: any;
    dataBinding: any;
    dataBound: any;
    destroyed: any;
    drag: any;
    dragStart: any;
    dragStop: any;
    eventClick: any;
    eventRendered: any;
    hover: any;
    moreEventsClick: any;
    navigating: any;
    popupClose: any;
    popupOpen: any;
    renderCell: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    select: any;
    currentViewChange: any;
    selectedDateChange: any;
    childViews: QueryList<ViewsDirective>;
    childResources: QueryList<ResourcesDirective>;
    childHeaderRows: QueryList<HeaderRowsDirective>;
    tags: string[];
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the date header cells. The field that can be accessed via this template is `date`.
     *
     * {% codeBlock src='schedule/dateHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    dateHeaderTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the day header cells. This template is only applicable for year view header cells.
     *
     * {% codeBlock src='schedule/dayHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    dayHeaderTemplate: any;
    /**
     * The template option which is used to render the customized work cells on the Schedule. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the work cells.
     *  The fields accessible via template are as follows.
     * * date
     * * groupIndex
     * * type
     *
     * Refer to the below code snippet.
     *
     *{% codeBlock src='schedule/cellTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    cellTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the month date cells. This template is only applicable for month view day cells.
     *
     * {% codeBlock src='schedule/cellHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    cellHeaderTemplate: any;
    eventSettings_tooltipTemplate: any;
    eventSettings_template: any;
    /**
     * The template option to render the customized editor window. The form elements defined within this template should be accompanied
     *  with `e-field` class, so as to fetch and process it from internally.
     *
     * {% codeBlock src='schedule/editorTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    editorTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the month header cells. This template is only applicable for year view header cells.
     *
     * {% codeBlock src='schedule/monthHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    monthHeaderTemplate: any;
    timeScale_minorSlotTemplate: any;
    timeScale_majorSlotTemplate: any;
    /**
     * Template option to customize the resource header bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the resource header cells.
     * The following can be accessible via template.
     * * resource - All the resource fields.
     * * resourceData - object collection of current resource.
     *
     * Refer to the below code snippet.
     *
     *{% codeBlock src='schedule/resourceHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    resourceHeaderTemplate: any;
    /**
     * Template option to customize the header indent bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the header indent cell.
     *
     * Refer to the below code snippet.
     *
     *{% codeBlock src='schedule/headerIndentTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    headerIndentTemplate: any;
    quickInfoTemplates_header: any;
    quickInfoTemplates_content: any;
    quickInfoTemplates_footer: any;
    group_headerTooltipTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScheduleComponent, "ejs-schedule", never, { "agendaDaysCount": "agendaDaysCount"; "allowDragAndDrop": "allowDragAndDrop"; "allowInline": "allowInline"; "allowKeyboardInteraction": "allowKeyboardInteraction"; "allowMultiCellSelection": "allowMultiCellSelection"; "allowMultiDrag": "allowMultiDrag"; "allowMultiRowSelection": "allowMultiRowSelection"; "allowResizing": "allowResizing"; "calendarMode": "calendarMode"; "cellHeaderTemplate": "cellHeaderTemplate"; "cellTemplate": "cellTemplate"; "cssClass": "cssClass"; "currentView": "currentView"; "dateFormat": "dateFormat"; "dateHeaderTemplate": "dateHeaderTemplate"; "dayHeaderTemplate": "dayHeaderTemplate"; "editorTemplate": "editorTemplate"; "enableAdaptiveUI": "enableAdaptiveUI"; "enableAllDayScroll": "enableAllDayScroll"; "enablePersistence": "enablePersistence"; "enableRecurrenceValidation": "enableRecurrenceValidation"; "enableRtl": "enableRtl"; "endHour": "endHour"; "eventDragArea": "eventDragArea"; "eventSettings": "eventSettings"; "firstDayOfWeek": "firstDayOfWeek"; "firstMonthOfYear": "firstMonthOfYear"; "group": "group"; "headerIndentTemplate": "headerIndentTemplate"; "headerRows": "headerRows"; "height": "height"; "hideEmptyAgendaDays": "hideEmptyAgendaDays"; "locale": "locale"; "maxDate": "maxDate"; "minDate": "minDate"; "monthHeaderTemplate": "monthHeaderTemplate"; "monthsCount": "monthsCount"; "quickInfoOnSelectionEnd": "quickInfoOnSelectionEnd"; "quickInfoTemplates": "quickInfoTemplates"; "readonly": "readonly"; "resourceHeaderTemplate": "resourceHeaderTemplate"; "resources": "resources"; "rowAutoHeight": "rowAutoHeight"; "selectedDate": "selectedDate"; "showHeaderBar": "showHeaderBar"; "showQuickInfo": "showQuickInfo"; "showTimeIndicator": "showTimeIndicator"; "showWeekNumber": "showWeekNumber"; "showWeekend": "showWeekend"; "startHour": "startHour"; "timeFormat": "timeFormat"; "timeScale": "timeScale"; "timezone": "timezone"; "timezoneDataSource": "timezoneDataSource"; "views": "views"; "weekRule": "weekRule"; "width": "width"; "workDays": "workDays"; "workHours": "workHours"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "cellClick": "cellClick"; "cellDoubleClick": "cellDoubleClick"; "created": "created"; "dataBinding": "dataBinding"; "dataBound": "dataBound"; "destroyed": "destroyed"; "drag": "drag"; "dragStart": "dragStart"; "dragStop": "dragStop"; "eventClick": "eventClick"; "eventRendered": "eventRendered"; "hover": "hover"; "moreEventsClick": "moreEventsClick"; "navigating": "navigating"; "popupClose": "popupClose"; "popupOpen": "popupOpen"; "renderCell": "renderCell"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "select": "select"; "currentViewChange": "currentViewChange"; "selectedDateChange": "selectedDateChange"; }, ["dateHeaderTemplate", "dayHeaderTemplate", "cellTemplate", "cellHeaderTemplate", "eventSettings_tooltipTemplate", "eventSettings_template", "editorTemplate", "monthHeaderTemplate", "timeScale_minorSlotTemplate", "timeScale_majorSlotTemplate", "resourceHeaderTemplate", "headerIndentTemplate", "quickInfoTemplates_header", "quickInfoTemplates_content", "quickInfoTemplates_footer", "group_headerTooltipTemplate", "childViews", "childResources", "childHeaderRows"], never>;
}
