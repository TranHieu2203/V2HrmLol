import { Animation, Browser, ChildProperty, Collection, Complex, Component, Event, EventHandler, Internationalization, NotifyPropertyChanges, Property, compile, createElement, isNullOrUndefined, merge, print, remove } from '@syncfusion/ej2-base';
import { SvgRenderer, Tooltip } from '@syncfusion/ej2-svg-base';
import { PdfBitmap, PdfDocument, PdfPageOrientation } from '@syncfusion/ej2-pdf-export';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options for customizing the fonts.
 */
class Font extends ChildProperty {
}
__decorate$1([
    Property('16px')
], Font.prototype, "size", void 0);
__decorate$1([
    Property('')
], Font.prototype, "color", void 0);
__decorate$1([
    Property('Segoe UI')
], Font.prototype, "fontFamily", void 0);
__decorate$1([
    Property('Regular')
], Font.prototype, "fontWeight", void 0);
__decorate$1([
    Property('Normal')
], Font.prototype, "fontStyle", void 0);
__decorate$1([
    Property(1)
], Font.prototype, "opacity", void 0);
/**
 * Sets and gets the margin for the linear gauge.
 */
class Margin extends ChildProperty {
}
__decorate$1([
    Property(10)
], Margin.prototype, "left", void 0);
__decorate$1([
    Property(10)
], Margin.prototype, "right", void 0);
__decorate$1([
    Property(10)
], Margin.prototype, "top", void 0);
__decorate$1([
    Property(10)
], Margin.prototype, "bottom", void 0);
/**
 * Sets and gets the options to customize the border for the linear gauge.
 */
class Border extends ChildProperty {
}
__decorate$1([
    Property(null)
], Border.prototype, "color", void 0);
__decorate$1([
    Property(0)
], Border.prototype, "width", void 0);
__decorate$1([
    Property('')
], Border.prototype, "dashArray", void 0);
/**
 * Sets and gets the options for customizing the annotation in linear gauge.
 */
class Annotation extends ChildProperty {
}
__decorate$1([
    Property('')
], Annotation.prototype, "content", void 0);
__decorate$1([
    Property(0)
], Annotation.prototype, "x", void 0);
__decorate$1([
    Property(0)
], Annotation.prototype, "y", void 0);
__decorate$1([
    Property('None')
], Annotation.prototype, "verticalAlignment", void 0);
__decorate$1([
    Property('None')
], Annotation.prototype, "horizontalAlignment", void 0);
__decorate$1([
    Property('-1')
], Annotation.prototype, "zIndex", void 0);
__decorate$1([
    Complex({ size: '12px', color: null }, Font)
], Annotation.prototype, "font", void 0);
__decorate$1([
    Property(null)
], Annotation.prototype, "axisIndex", void 0);
__decorate$1([
    Property(null)
], Annotation.prototype, "axisValue", void 0);
/**
 * Sets and gets the options for customizing the container of linear gauge.
 */
class Container extends ChildProperty {
}
__decorate$1([
    Property('Normal')
], Container.prototype, "type", void 0);
__decorate$1([
    Property(0)
], Container.prototype, "height", void 0);
__decorate$1([
    Property(0)
], Container.prototype, "width", void 0);
__decorate$1([
    Property(10)
], Container.prototype, "roundedCornerRadius", void 0);
__decorate$1([
    Property('transparent')
], Container.prototype, "backgroundColor", void 0);
__decorate$1([
    Complex({ width: 1, color: null }, Border)
], Container.prototype, "border", void 0);
__decorate$1([
    Property(0)
], Container.prototype, "offset", void 0);
/**
 * Sets and gets the options to customize the tooltip for range in axis.
 */
class RangeTooltip extends ChildProperty {
}
__decorate$1([
    Property(null)
], RangeTooltip.prototype, "fill", void 0);
__decorate$1([
    Complex({ size: '13px' }, Font)
], RangeTooltip.prototype, "textStyle", void 0);
__decorate$1([
    Property(null)
], RangeTooltip.prototype, "format", void 0);
__decorate$1([
    Property(null)
], RangeTooltip.prototype, "template", void 0);
__decorate$1([
    Property(true)
], RangeTooltip.prototype, "enableAnimation", void 0);
__decorate$1([
    Complex({}, Border)
], RangeTooltip.prototype, "border", void 0);
__decorate$1([
    Property('End')
], RangeTooltip.prototype, "position", void 0);
__decorate$1([
    Property(false)
], RangeTooltip.prototype, "showAtMousePosition", void 0);
/**
 * Sets and gets the options for customizing the tooltip in linear gauge.
 */
class TooltipSettings extends ChildProperty {
}
__decorate$1([
    Property(false)
], TooltipSettings.prototype, "enable", void 0);
__decorate$1([
    Property('')
], TooltipSettings.prototype, "fill", void 0);
__decorate$1([
    Complex({ color: '', size: '13px' }, Font)
], TooltipSettings.prototype, "textStyle", void 0);
__decorate$1([
    Property(null)
], TooltipSettings.prototype, "format", void 0);
__decorate$1([
    Property(false)
], TooltipSettings.prototype, "showAtMousePosition", void 0);
__decorate$1([
    Complex({}, RangeTooltip)
], TooltipSettings.prototype, "rangeSettings", void 0);
__decorate$1([
    Property('End')
], TooltipSettings.prototype, "position", void 0);
__decorate$1([
    Property(null)
], TooltipSettings.prototype, "template", void 0);
__decorate$1([
    Property(true)
], TooltipSettings.prototype, "enableAnimation", void 0);
__decorate$1([
    Complex({}, Border)
], TooltipSettings.prototype, "border", void 0);
__decorate$1([
    Property('Pointer')
], TooltipSettings.prototype, "type", void 0);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** Sets and gets the options for customizing the axis line in linear gauge. */
class Line extends ChildProperty {
}
__decorate$2([
    Property('')
], Line.prototype, "dashArray", void 0);
__decorate$2([
    Property(null)
], Line.prototype, "height", void 0);
__decorate$2([
    Property(2)
], Line.prototype, "width", void 0);
__decorate$2([
    Property(null)
], Line.prototype, "color", void 0);
__decorate$2([
    Property(0)
], Line.prototype, "offset", void 0);
/**
 * Sets and gets the options for customizing the appearance of the axis labels.
 */
class Label extends ChildProperty {
}
__decorate$2([
    Complex({ size: '12px', color: null, fontStyle: null, fontWeight: null }, Font)
], Label.prototype, "font", void 0);
__decorate$2([
    Property(false)
], Label.prototype, "useRangeColor", void 0);
__decorate$2([
    Property('')
], Label.prototype, "format", void 0);
__decorate$2([
    Property(0)
], Label.prototype, "offset", void 0);
__decorate$2([
    Property('Auto')
], Label.prototype, "position", void 0);
/**
 * Sets and gets the options for customizing the ranges of an axis.
 */
class Range extends ChildProperty {
}
__decorate$2([
    Property(0)
], Range.prototype, "start", void 0);
__decorate$2([
    Property(0)
], Range.prototype, "end", void 0);
__decorate$2([
    Property(null)
], Range.prototype, "linearGradient", void 0);
__decorate$2([
    Property(null)
], Range.prototype, "radialGradient", void 0);
__decorate$2([
    Property('Outside')
], Range.prototype, "position", void 0);
__decorate$2([
    Property('')
], Range.prototype, "color", void 0);
__decorate$2([
    Property(10)
], Range.prototype, "startWidth", void 0);
__decorate$2([
    Property(10)
], Range.prototype, "endWidth", void 0);
__decorate$2([
    Property(0)
], Range.prototype, "offset", void 0);
__decorate$2([
    Complex({ color: '#000000', width: 0 }, Border)
], Range.prototype, "border", void 0);
/**
 * Sets and gets the options for customizing the minor tick lines in axis.
 */
class Tick extends ChildProperty {
}
__decorate$2([
    Property(20)
], Tick.prototype, "height", void 0);
__decorate$2([
    Property(2)
], Tick.prototype, "width", void 0);
__decorate$2([
    Property(null)
], Tick.prototype, "interval", void 0);
__decorate$2([
    Property(null)
], Tick.prototype, "color", void 0);
__decorate$2([
    Property(null)
], Tick.prototype, "offset", void 0);
__decorate$2([
    Property('Auto')
], Tick.prototype, "position", void 0);
/**
 * Sets and gets the options for customizing the pointers of an axis in linear gauge.
 */
class Pointer extends ChildProperty {
    constructor() {
        super(...arguments);
        /** @private */
        this.animationComplete = true;
        /** @private */
        this.currentValue = null;
    }
}
__decorate$2([
    Property('Marker')
], Pointer.prototype, "type", void 0);
__decorate$2([
    Property(null)
], Pointer.prototype, "linearGradient", void 0);
__decorate$2([
    Property(null)
], Pointer.prototype, "radialGradient", void 0);
__decorate$2([
    Property(null)
], Pointer.prototype, "value", void 0);
__decorate$2([
    Property('InvertedTriangle')
], Pointer.prototype, "markerType", void 0);
__decorate$2([
    Property(null)
], Pointer.prototype, "imageUrl", void 0);
__decorate$2([
    Complex({ color: '#808080' }, Border)
], Pointer.prototype, "border", void 0);
__decorate$2([
    Property(10)
], Pointer.prototype, "roundedCornerRadius", void 0);
__decorate$2([
    Property('Far')
], Pointer.prototype, "placement", void 0);
__decorate$2([
    Property(20)
], Pointer.prototype, "height", void 0);
__decorate$2([
    Property(20)
], Pointer.prototype, "width", void 0);
__decorate$2([
    Property(null)
], Pointer.prototype, "color", void 0);
__decorate$2([
    Property(1)
], Pointer.prototype, "opacity", void 0);
__decorate$2([
    Property(0)
], Pointer.prototype, "animationDuration", void 0);
__decorate$2([
    Property(false)
], Pointer.prototype, "enableDrag", void 0);
__decorate$2([
    Property(0)
], Pointer.prototype, "offset", void 0);
__decorate$2([
    Property('Auto')
], Pointer.prototype, "position", void 0);
__decorate$2([
    Property(null)
], Pointer.prototype, "description", void 0);
/**
 * Sets and gets the options for customizing the axis of a gauge.
 */
class Axis extends ChildProperty {
    constructor() {
        /**
         * Sets and gets the minimum value for the axis.
         *
         * @default 0
         */
        super(...arguments);
        /** @private */
        this.visibleLabels = [];
    }
}
__decorate$2([
    Property(0)
], Axis.prototype, "minimum", void 0);
__decorate$2([
    Property(100)
], Axis.prototype, "maximum", void 0);
__decorate$2([
    Property(false)
], Axis.prototype, "isInversed", void 0);
__decorate$2([
    Property(false)
], Axis.prototype, "showLastLabel", void 0);
__decorate$2([
    Property(false)
], Axis.prototype, "opposedPosition", void 0);
__decorate$2([
    Complex({}, Line)
], Axis.prototype, "line", void 0);
__decorate$2([
    Collection([{}], Range)
], Axis.prototype, "ranges", void 0);
__decorate$2([
    Collection([{}], Pointer)
], Axis.prototype, "pointers", void 0);
__decorate$2([
    Complex({ width: 2, height: 20 }, Tick)
], Axis.prototype, "majorTicks", void 0);
__decorate$2([
    Complex({ width: 1, height: 10 }, Tick)
], Axis.prototype, "minorTicks", void 0);
__decorate$2([
    Complex({}, Label)
], Axis.prototype, "labelStyle", void 0);

/**
 * Specifies the linear gauge constant value
 */
/** @private */
const loaded = 'loaded';
/** @private */
const load = 'load';
/** @private */
const animationComplete = 'animationComplete';
/** @private */
const axisLabelRender = 'axisLabelRender';
/** @private */
const tooltipRender = 'tooltipRender';
/** @private */
const annotationRender = 'annotationRender';
/** @private */
const gaugeMouseMove = 'gaugeMouseMove';
/** @private */
const gaugeMouseLeave = 'gaugeMouseLeave';
/** @private */
const gaugeMouseDown = 'gaugeMouseDown';
/** @private */
const gaugeMouseUp = 'gaugeMouseUp';
/** @private */
const dragStart = 'dragStart';
/** @private */
const dragMove = 'dragMove';
/** @private */
const dragEnd = 'dragEnd';
/** @private */
const valueChange = 'valueChange';
/** @private */
const resized = 'resized';
/** @private */
const beforePrint = 'beforePrint';

/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/**
 * Specifies Linear-Gauge Helper methods
 */
/** @private */
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/** @private */
function stringToNumberSize(value, containerSize) {
    if (!isNullOrUndefined(value)) {
        return value.indexOf('%') !== -1 ? containerSize : parseInt(value, 10);
    }
    return null;
}
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns no
 * @private
 */
function measureText(text, font) {
    let htmlObject = document.getElementById('gauge-measuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'gauge-measuretext' });
        document.body.appendChild(htmlObject);
    }
    htmlObject.innerHTML = text;
    htmlObject.style.position = 'absolute';
    htmlObject.style.fontSize = font.size;
    htmlObject.style.fontWeight = font.fontWeight;
    htmlObject.style.fontStyle = font.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily;
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.whiteSpace = 'nowrap';
    const size = new Size(htmlObject.clientWidth, htmlObject.clientHeight);
    //remove(htmlObject);
    return size;
}
/**
 * @private
 * Trim the title text
 */
function textTrim(maxWidth, text, font) {
    let label = text;
    let size = measureText(text, font).width;
    if (size > maxWidth) {
        const textLength = text.length;
        for (let i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                return label;
            }
        }
    }
    return label;
}
/** @private */
function withInRange(value, start, end, max, min, type) {
    let withIn;
    if (type === 'pointer') {
        withIn = (((value <= max) && (value >= min)));
    }
    else {
        withIn = (start != null && (start <= max) && (start >= min)) && (end != null && (end <= max) && (end >= min));
    }
    return withIn;
}
function convertPixelToValue(parentElement, pointerElement, orientation, axis, type, location) {
    const elementRect = parentElement.getBoundingClientRect();
    const pointerRect = pointerElement.getBoundingClientRect();
    const height = (pointerElement.id.indexOf('MarkerPointer') > -1) ? (pointerRect.height / 2) :
        (!axis.isInversed) ? 0 : pointerRect.height;
    const width = (pointerElement.id.indexOf('MarkerPointer') > -1) ? (pointerRect.width / 2) :
        (!axis.isInversed) ? pointerRect.width : 0;
    const size = new Size(axis.lineBounds.width, axis.lineBounds.height);
    const y = (type === 'drag') ? (location.y - axis.lineBounds.y) :
        ((pointerRect.top + height) - elementRect.top - axis.lineBounds.y);
    const extraWidth = getExtraWidth(parentElement);
    const x = (type === 'drag') ? (location.x - axis.lineBounds.x + extraWidth) :
        ((pointerRect.left + width) - elementRect.left - axis.lineBounds.x + extraWidth);
    const newSize = (orientation === 'Vertical') ? size.height : size.width;
    const divideVal = (orientation === 'Vertical') ? y : x;
    let value = (orientation === 'Vertical') ? (axis.isInversed) ? (divideVal / newSize) :
        (1 - (divideVal / newSize)) : (axis.isInversed) ? (1 - (divideVal / newSize)) : (divideVal / newSize);
    value = value * (axis.visibleRange.delta) + axis.visibleRange.min;
    return value;
}
function getPathToRect(path, size, parentElement) {
    let tempDiv = document.getElementById('gauge_path');
    if (tempDiv === null) {
        tempDiv = createElement('text', { id: 'gauge_path' });
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '0px';
        tempDiv.style.left = '0px';
        parentElement.appendChild(tempDiv);
    }
    const render = new SvgRenderer('id');
    const svg = render.createSvg({ id: 'box_path', width: size.width, height: size.height });
    svg.appendChild(path);
    tempDiv.appendChild(svg);
    const svgRect = path.getBBox();
    remove(tempDiv);
    return svgRect;
}
/** @private */
function getElement(id) {
    return document.getElementById(id);
}
/** @private */
function removeElement(id) {
    const element = getElement(id);
    if (element) {
        remove(element);
    }
}
/** @private */
function isPointerDrag(axes) {
    let pointerEnable = false;
    axes.map((axis, index) => {
        axis.pointers.map((pointer, index) => {
            if (pointer.enableDrag) {
                pointerEnable = true;
            }
        });
    });
    return pointerEnable;
}
/** @private */
function valueToCoefficient(value, axis, orientation, range) {
    let result = (value - range.min) / range.delta;
    result = (orientation === 'Vertical') ? (!axis.isInversed) ? (1 - result) : result : (!axis.isInversed) ? result : (1 - result);
    return result;
}
function getFontStyle(font) {
    let style = '';
    style = 'font-size:' + font.size +
        '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
        '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
        '; color:' + font.color + ';';
    return style;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function textFormatter(format, data, gauge) {
    if (isNullOrUndefined(format)) {
        return null;
    }
    const keys = Object.keys(data);
    for (const key of keys) {
        format = format.split('{' + key + '}').join(formatValue(data[key], gauge).toString());
    }
    return format;
}
function formatValue(value, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let formatValue;
    let formatFunction;
    if (gauge.format && !isNaN(Number(value))) {
        formatFunction = gauge.intl.getNumberFormat({ format: gauge.format, useGrouping: gauge.useGroupingSeparator });
        formatValue = formatFunction(Number(value));
    }
    else {
        formatValue = value;
    }
    return formatValue !== null ? formatValue : '';
}
/** @private */
function getLabelFormat(format) {
    const customLabelFormat = format && format.match('{value}') !== null;
    const skeleton = customLabelFormat ? '' : format;
    return skeleton;
}
/** @private */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTemplateFunction(template, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let templateFn = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
        if (document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
        }
        else if (gauge.isVue || gauge.isVue3) {
            templateFn = compile(template);
        }
    }
    catch (e) {
        templateFn = compile(template);
    }
    return templateFn;
}
/** @private */
function getElementOffset(childElement, parentElement) {
    parentElement.appendChild(childElement);
    const width = childElement.offsetWidth;
    const height = childElement.offsetHeight;
    parentElement.removeChild(childElement);
    return new Size(width, height);
}
/**
 * To trigger the download element
 *
 * @param fileName
 * @param type
 * @param url
 */
function triggerDownload(fileName, type, url, isDownload) {
    createElement('a', {
        attrs: {
            'download': fileName + '.' + type.toLocaleLowerCase(),
            'href': url
        }
    }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
        view: window,
        bubbles: false,
        cancelable: true
    }));
}
/** @private */
class VisibleRange {
    constructor(min, max, interval, delta) {
        this.min = min;
        this.max = max;
        this.interval = interval;
        this.delta = delta;
    }
}
/**
 * Internal use of gauge location
 */
class GaugeLocation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Internal class size for height and width
 */
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
/** @private */
class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
/** @private */
class CustomizeOption {
    constructor(id) {
        this.id = id;
    }
}
/** @private */
class PathOption extends CustomizeOption {
    constructor(id, fill, width, color, opacity, dashArray, d, transform = '') {
        super(id);
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
        this.transform = transform;
    }
}
/** @private */
class RectOption {
    constructor(id, fill, border, opacity, rect, transform, dashArray) {
        this.opacity = opacity;
        this.id = id;
        this.y = rect.y;
        this.x = rect.x;
        this.fill = fill;
        this.stroke = border.color;
        this['stroke-width'] = border.width;
        this['stroke-dasharray'] = border.dashArray;
        this.height = rect.height;
        this.width = rect.width;
    }
}
/** @private */
class TextOption extends CustomizeOption {
    constructor(id, x, y, anchor, text, transform = '', baseLine) {
        super(id);
        this.transform = '';
        this.baseLine = 'auto';
        this.x = x;
        this.y = y;
        this.anchor = anchor;
        this.text = text;
        this.transform = transform;
        this.baseLine = baseLine;
    }
}
/** @private */
class VisibleLabels {
    constructor(text, value, size, x, y) {
        this.text = text;
        this.value = value;
        this.size = size;
        this.x = x;
        this.y = y;
    }
}
/** @private */
class Align {
    constructor(axisIndex, align) {
        this.align = align;
        this.axisIndex = axisIndex;
    }
}
/** @private */
function textElement(options, font, color, parent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderOptions = {};
    const renderer = new SvgRenderer('');
    const style = 'fill:' + color + '; font-size:' + font.size +
        '; font-style:' + font.fontStyle + ' ; font-weight:' + font.fontWeight + '; font-family:' +
        font.fontFamily + '; text-anchor:' + options.anchor + '; transform:' + options.transform +
        '; opacity:' + font.opacity + '; dominant-baseline:' + options.baseLine + ';';
    renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'style': style
    };
    const htmlObject = renderer.createText(renderOptions, options.text);
    parent.appendChild(htmlObject);
    return htmlObject;
}
function calculateNiceInterval(min, max, size, orientation) {
    const delta = max - min;
    let currentInterval;
    const intervalDivs = [10, 5, 2, 1];
    const desiredIntervalsCount = getActualDesiredIntervalsCount(size, orientation);
    let niceInterval = delta / desiredIntervalsCount;
    const minInterval = Math.pow(10, Math.floor(Math.log(niceInterval) / Math.log(10)));
    for (const interval of intervalDivs) {
        currentInterval = minInterval * interval;
        if (desiredIntervalsCount < (delta / currentInterval)) {
            break;
        }
        niceInterval = currentInterval;
    }
    return niceInterval;
}
function getActualDesiredIntervalsCount(size, orientation) {
    const maximumLabels = 5;
    let desiredIntervalsCount = (orientation === 'Horizontal' ? 0.533 : 1) * maximumLabels;
    desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
    return desiredIntervalsCount;
}
/** @private */
function getPointer(target, gauge) {
    let split = [];
    const radix = 10;
    split = target.id.replace(gauge.element.id, '').split('_');
    const axisIndex = parseInt(split[2], radix);
    const pointIndex = parseInt(split[4], radix);
    const axis = gauge.axes[axisIndex];
    const pointer = gauge.axes[axisIndex].pointers[pointIndex];
    return { axis: axis, axisIndex: axisIndex, pointer: pointer, pointerIndex: pointIndex };
}
/** @private */
function getRangeColor(value, ranges) {
    let rangeColor = null;
    ranges.forEach((range, index) => {
        if ((value >= range.start && range.end >= value) && range.start !== range.end) {
            rangeColor = range.interior;
        }
    });
    return rangeColor;
}
/**
 * Function to get the mouse position
 *
 * @param pageX
 * @param pageY
 * @param element
 */
function getMousePosition(pageX, pageY, element) {
    const elementRect = element.getBoundingClientRect();
    const pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    const pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    const clientTop = element.ownerDocument.documentElement.clientTop;
    const clientLeft = element.ownerDocument.documentElement.clientLeft;
    const positionX = elementRect.left + pageXOffset - clientLeft;
    const positionY = elementRect.top + pageYOffset - clientTop;
    return new GaugeLocation((pageX - positionX), (pageY - positionY));
}
/** @private */
function getRangePalette(theme) {
    let palette;
    switch (theme.toLowerCase()) {
        case 'tailwind':
            palette = ['#0369A1', '#14B8A6', '#15803D', '#334155', '#5A61F6',
                '#65A30D', '#8B5CF6', '#9333EA', '#F59E0B', '#F97316'];
            break;
        case 'tailwinddark':
            palette = ['#10B981', '#22D3EE', '#2DD4BF', '#4ADE80', '#8B5CF6',
                '#E879F9', '#F472B6', '#F87171', '#F97316', '#FCD34D'];
            break;
        case 'bootstrap5':
            palette = ['#262E0B', '#668E1F', '#AF6E10', '#862C0B', '#1F2D50',
                '#64680B', '#311508', '#4C4C81', '#0C7DA0', '#862C0B'];
            break;
        case 'bootstrap5dark':
            palette = ['#5ECB9B', '#A860F1', '#EBA844', '#557EF7', '#E9599B',
                '#BFC529', '#3BC6CF', '#7A68EC', '#74B706', '#EA6266'];
            break;
        case 'fluent':
            palette = ['#614570', '#4C6FB1', '#CC6952', '#3F579A', '#4EA09B',
                '#6E7A89', '#D4515C', '#E6AF5D', '#639751', '#9D4D69'];
            break;
        case 'fluentdark':
            palette = ['#8AB113', '#2A72D5', '#43B786', '#584EC6', '#E85F9C',
                '#6E7A89', '#EA6266', '#EBA844', '#26BC7A', '#BC4870'];
            break;
        default:
            palette = ['#ff5985', '#ffb133', '#fcde0b', '#27d5ff', '#50c917'];
            break;
    }
    return palette;
}
/** @private */
function calculateShapes(location, shape, size, url, options, orientation, axis, pointer) {
    let path;
    const width = size.width;
    const height = size.height;
    let locX = location.x;
    let locY = location.y;
    let radius;
    switch (shape) {
        case 'Circle':
            radius = ((width + height) / 4);
            locX = (orientation === 'Vertical') ? (!axis.opposedPosition) ? (pointer.placement !== 'Far') ? locX - radius : locX + radius :
                pointer.placement === 'Near' ? locX - radius : locX + radius : locX;
            locY = (orientation === 'Vertical') ? locY : (!axis.opposedPosition) ? (pointer.placement === 'Far') ?
                locY + radius : locY - radius : (pointer.placement === 'Near') ? locY - radius : locY + radius;
            merge(options, { 'r': radius, 'cx': locX, 'cy': locY });
            break;
        case 'Diamond':
        case 'Rectangle':
            locX = (orientation === 'Horizontal') ? ((locX - (width / 2))) : ((!axis.opposedPosition && pointer.placement !== 'Far') ||
                (axis.opposedPosition && pointer.placement === 'Near')) ? locX - width : locX;
            locY = (orientation === 'Vertical') ? locY : (!axis.opposedPosition) ?
                (pointer.placement === 'Far') ? locY + (height / 2) : locY - (height / 2) :
                (pointer.placement === 'Near') ? locY - (height / 2) : locY + (height / 2);
            if (shape === 'Diamond') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + width) + ' ' + locY + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + locY + ' z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + width) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + width) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + (locY - (height / 2)) + ' z';
            }
            merge(options, { 'd': path });
            break;
        case 'Triangle':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX - width) + ' ' + (locY - (height / 2)) +
                    'L' + (locX - width) + ' ' + (locY + (height / 2)) + ' Z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + (locY - height) +
                    'L' + (locX - (width / 2)) + ' ' + (locY - height) + ' Z';
            }
            merge(options, { 'd': path });
            break;
        case 'InvertedTriangle':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX + width) + ' ' + (locY - (height / 2)) +
                    'L' + (locX + width) + ' ' + (locY + (height / 2)) + ' Z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + (locY + height) +
                    'L' + (locX - (width / 2)) + ' ' + (locY + height) + ' Z';
            }
            merge(options, { 'd': path });
            break;
        case 'Arrow':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + (locX - (width / 2)) + ' ' + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX - width) + ' '
                    + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX - width) + ' ' + ((locY + (height / 2)) -
                    (height / 4)) + ' ' + 'L' + (locX - (width / 2)) + ' ' + ((locY + (height / 2)) - (height / 4)) + ' ' +
                    'L' + (locX - (width / 2)) + ' ' + (locY + height / 2) + 'z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ((locX + (width / 2)) - (width / 4)) + ' ' + (locY - (height / 2)) + ' ' + 'L' + ((locX + (width / 2)) -
                    (width / 4)) + ' ' + (locY - height) + ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY - height) +
                    ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY - (height / 2)) + ' ' + 'L' + (locX - (width / 2))
                    + ' ' + (locY - (height / 2)) + 'z';
            }
            merge(options, { 'd': path });
            break;
        case 'InvertedArrow':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + 'L' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX + width) + ' '
                    + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX + width) + ' ' + ((locY + (height / 2)) - (height / 4))
                    + ' ' + 'L' + (locX + (width / 2)) + ' ' + ((locY + (height / 2)) - (height / 4)) + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + (locY + height / 2) + 'z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ((locX + (width / 2)) - (width / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ((locX + (width / 2)) -
                    (width / 4)) + ' ' + (locY + height) + ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY + height)
                    + ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + (locX - (width / 2)) + ' ' + (locY + (height / 2)) + 'z';
            }
            merge(options, { 'd': path });
            break;
        case 'Image':
            merge(options, { 'href': url, 'height': height, 'width': width, x: locX - (width / 2), y: locY - (height / 2) });
            break;
    }
    return options;
}
/** @private */
function getBox(location, boxName, orientation, size, type, containerWidth, axis, cornerRadius) {
    let path = ' ';
    let radius = cornerRadius;
    let x1;
    let y1;
    let rectWidth;
    let rectHeight;
    let bottomRadius;
    let topRadius;
    switch (boxName) {
        case 'RoundedRectangle':
            x1 = location.x;
            y1 = location.y;
            rectWidth = location.width;
            rectHeight = location.height;
            if (((orientation === 'Vertical' && location.height === 0) || (orientation === 'Horizontal' && location.width === 0)) && radius > 10) {
                radius = 10;
            }
            let horizontalCurve = x1 + rectWidth - radius;
            let verticalCurve = y1 + rectHeight - radius;
            let verticalRadius = radius + y1;
            let horizontalRadius = radius + x1;
            if (type === 'container' || type === 'bar' && ((orientation === 'Vertical' && location.height !== 0) || (orientation === 'Horizontal' && location.width !== 0))) {
                if (horizontalRadius > (x1 + (rectWidth / 2))) {
                    horizontalRadius = x1 + (rectWidth / 2);
                    horizontalCurve = horizontalRadius;
                }
                if (verticalRadius > (y1 + (rectHeight / 2))) {
                    verticalRadius = y1 + (rectHeight / 2);
                    verticalCurve = verticalRadius;
                }
            }
            if (type === 'bar' && ((orientation === 'Vertical' && location.height === 0) || (orientation === 'Horizontal' && location.width === 0))) {
                if (location.width < radius / 2 && !axis.isInversed) {
                    horizontalCurve = horizontalCurve + radius + radius / 2;
                }
                else if (location.width < radius / 2 && axis.isInversed) {
                    horizontalRadius = x1 - Math.ceil(radius / 4);
                }
                if (location.height < radius / 2 && !axis.isInversed) {
                    verticalRadius = y1 - Math.ceil(radius / 4);
                }
                else if (location.height < radius / 2 && axis.isInversed) {
                    verticalCurve = verticalCurve + radius + radius / 2;
                }
            }
            path = 'M' + ' ' + x1 + ' ' + verticalRadius + ' Q ' + x1 + ' ' + y1 + ' ' + horizontalRadius + ' ' + y1 + ' ';
            path += 'L' + ' ' + horizontalCurve + ' ' + y1 + ' Q ' + (x1 + rectWidth) + ' ' + y1 + ' '
                + (x1 + rectWidth) + ' ' + verticalRadius + ' ';
            path += 'L ' + (x1 + rectWidth) + ' ' + verticalCurve + ' Q ' + (x1 + rectWidth) + ' ' + (y1 + rectHeight)
                + ' ' + horizontalCurve + ' ' + (y1 + rectHeight) + ' ';
            path += ' L ' + horizontalRadius + ' ' + (y1 + rectHeight) + ' Q ' + x1 + ' ' + (y1 + rectHeight)
                + ' ' + x1 + ' ' + verticalCurve + ' ';
            path += 'L' + ' ' + x1 + ' ' + verticalRadius + ' ' + 'z';
            break;
        case 'Thermometer':
            // eslint-disable-next-line no-case-declarations
            const width = (orientation === 'Vertical') ? location.width : location.height;
            bottomRadius = width + ((width / 2) / Math.PI);
            topRadius = width / 2;
            if (orientation === 'Vertical') {
                const addValue = ((containerWidth + ((containerWidth / 2) / Math.PI)) - bottomRadius);
                const y1 = (type === 'bar') ? location.y + addValue : location.y;
                const locY = (type === 'bar') ? location.y + (topRadius - (topRadius / Math.PI)) : location.y;
                const locHeight = location.height;
                path = 'M' + location.x + ' ' + (y1 + locHeight) +
                    ' A ' + bottomRadius + ' ' + bottomRadius + ', 0, 1, 0, ' + (location.x + location.width) + ' ' + (y1 + locHeight) +
                    ' L ' + (location.x + location.width) + ' ' + locY +
                    ' A ' + topRadius + ' ' + topRadius + ', 0, 1, 0, ' + location.x + ' ' + locY + ' z ';
            }
            else {
                const x1 = (type === 'bar' && !axis.isInversed) ?
                    location.x - ((containerWidth + ((containerWidth / 2) / Math.PI)) - bottomRadius) : location.x;
                const locWidth = (type === 'bar') ? (location.width - (topRadius - ((topRadius / Math.PI)))) : location.width;
                path = 'M' + x1 + ' ' + (location.y) +
                    ' A ' + bottomRadius + ' ' + bottomRadius + ', 0, 1, 0, ' + x1 + ' ' + (location.y + location.height) +
                    ' L ' + ((type === 'bar' ? location.x : x1) + locWidth) + ' ' + (location.y + location.height) +
                    ' A ' + topRadius + ' ' + topRadius + ', 0, 1, 0, ' +
                    ((type === 'bar' ? location.x : x1) + locWidth) + ' ' + (location.y) + ' z ';
            }
            break;
    }
    return path;
}
/** @private */
function getExtraWidth(gaugeElement) {
    const svgElement = getElement(gaugeElement.id + '_svg');
    let extraWidth = 0;
    if (!isNullOrUndefined(svgElement) && !isNullOrUndefined(gaugeElement)) {
        extraWidth = gaugeElement.getBoundingClientRect().left - svgElement.getBoundingClientRect().left;
    }
    return extraWidth;
}

/* eslint-disable valid-jsdoc */
/**
 * @private
 * To handle the animation for gauge
 */
class Animations {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(gauge) {
        this.gauge = gauge;
    }
    /**
     * To do the marker pointer animation.
     *
     * @return {void}
     * @private
     */
    performMarkerAnimation(element, axis, pointer) {
        const markerElement = element;
        let options;
        let timeStamp;
        const range = axis.visibleRange;
        const rectHeight = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.height : axis.lineBounds.width;
        const rectY = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.y : axis.lineBounds.x;
        if (this.gauge.orientation === 'Vertical') {
            pointer.bounds.y = (valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * rectHeight) + rectY;
        }
        else {
            pointer.bounds.x = (valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * rectHeight) + rectY;
        }
        options = new PathOption(markerElement.id, null, null, null);
        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
        let currentValue;
        let start = pointer.startValue;
        const end = pointer.currentValue;
        start = (start === end) ? range.min : start;
        const val = Math.abs(start - end);
        const currentPath = options.d;
        new Animation({}).animate(markerElement, {
            duration: pointer.animationDuration,
            progress: (args) => {
                if (args.timeStamp >= args.delay) {
                    timeStamp = ((args.timeStamp - args.delay) / args.duration);
                    currentValue = (start < end) ? start + (timeStamp * val) : start - (timeStamp * val);
                    if (this.gauge.orientation === 'Vertical') {
                        pointer.bounds.y = (valueToCoefficient(currentValue, axis, this.gauge.orientation, range) *
                            rectHeight) + rectY;
                    }
                    else {
                        pointer.bounds.x = (valueToCoefficient(currentValue, axis, this.gauge.orientation, range) *
                            rectHeight) + rectY;
                    }
                    options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
                    markerElement.setAttribute('d', options.d);
                }
            },
            end: (model) => {
                markerElement.setAttribute('d', currentPath);
                pointer.startValue = pointer.currentValue;
                pointer.animationComplete = true;
                this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
            }
        });
    }
    /**
     * Perform the bar pointer animation
     *
     * @param element
     * @param axis
     * @param pointer
     */
    performBarAnimation(element, axis, pointer) {
        const radix = 10;
        let timeStamp;
        let value2;
        let value1;
        let currentValue;
        let clipHeight;
        let clipY;
        let clipX;
        let clipVal;
        let clipWidth;
        let currentHeight;
        let clipElement;
        const range = axis.visibleRange;
        const pointerElement = element;
        const lineHeight = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.height : axis.lineBounds.width;
        const lineY = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.y : axis.lineBounds.x;
        const size = new Size(this.gauge.availableSize.width, this.gauge.availableSize.height);
        let start = pointer.startValue;
        const end = pointer.currentValue;
        start = (start === end) ? range.min : start;
        let path = '';
        let currentPath = '';
        const tagName = pointerElement.tagName;
        const val = Math.abs(start - end);
        const pointerValue = (valueToCoefficient(end, axis, this.gauge.orientation, range) * lineHeight) + lineY;
        const startPointerVal = (valueToCoefficient(range.min, axis, this.gauge.orientation, range) *
            lineHeight) + lineY;
        const rectY = (this.gauge.orientation === 'Vertical') ? !axis.isInversed ? pointerValue : startPointerVal :
            axis.isInversed ? pointerValue : startPointerVal;
        const rectHeight = Math.abs(startPointerVal - pointerValue);
        if (this.gauge.container.type === 'Thermometer' && start === 0 && this.gauge.container.width > 0) {
            clipElement = pointerElement.parentElement.childNodes[1].childNodes[0].childNodes[0];
            if (this.gauge.orientation === 'Vertical') {
                clipY = clipElement.getAttribute('y');
                clipHeight = clipElement.getAttribute('height');
                clipVal = parseInt(clipY, radix) + parseInt(clipHeight, radix);
                clipElement.setAttribute('y', clipVal.toString());
            }
            else {
                clipX = clipElement.getAttribute('x');
                clipWidth = clipElement.getAttribute('width');
                clipVal = parseInt(clipX, radix) + parseInt(clipWidth, radix);
                clipElement.setAttribute('width', '0');
            }
        }
        path = pointer.value === axis.minimum && this.gauge.container.type === 'RoundedRectangle' ? '' : getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius);
        new Animation({}).animate(pointerElement, {
            duration: pointer.animationDuration,
            progress: (animate) => {
                if (animate.timeStamp >= animate.delay) {
                    timeStamp = ((animate.timeStamp - animate.delay) / animate.duration);
                    currentValue = (start < end) ? start + (timeStamp * val) : start - (timeStamp * val);
                    value2 = (valueToCoefficient(currentValue, axis, this.gauge.orientation, range) * lineHeight) + lineY;
                    value1 = (valueToCoefficient(range.min, axis, this.gauge.orientation, range) * lineHeight) + lineY;
                    currentHeight = Math.abs(value2 - value1);
                    if (this.gauge.orientation === 'Vertical') {
                        pointer.bounds.y = (!axis.isInversed) ? value2 : value1;
                        pointer.bounds.height = currentHeight;
                    }
                    else {
                        pointer.bounds.x = (axis.isInversed) ? value2 : value1;
                        pointer.bounds.width = currentHeight;
                    }
                    if (tagName === 'path') {
                        if (start === 0 && this.gauge.container.type === 'Thermometer') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            (this.gauge.orientation === 'Vertical') ?
                                clipElement.setAttribute('y', (clipVal - (timeStamp * parseInt(clipHeight, radix))).toString()) :
                                clipElement.setAttribute('width', (timeStamp * parseInt(clipWidth, radix)).toString());
                        }
                        currentPath = pointer.value === axis.minimum && this.gauge.container.type === 'RoundedRectangle' ? '' : getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius);
                        pointerElement.setAttribute('d', currentPath);
                    }
                    else {
                        if (this.gauge.orientation === 'Vertical') {
                            pointerElement.setAttribute('y', pointer.bounds.y.toString());
                            pointerElement.setAttribute('height', pointer.bounds.height.toString());
                        }
                        else {
                            pointerElement.setAttribute('x', pointer.bounds.x.toString());
                            pointerElement.setAttribute('width', pointer.bounds.width.toString());
                        }
                    }
                }
            },
            end: (model) => {
                if (tagName === 'path') {
                    if (start === 0 && this.gauge.container.type === 'Thermometer') {
                        pointerElement.parentElement.children[1].remove();
                    }
                    else {
                        pointerElement.setAttribute('d', path);
                    }
                }
                else {
                    if (this.gauge.orientation === 'Vertical') {
                        pointerElement.setAttribute('y', rectY.toString());
                        pointerElement.setAttribute('height', rectHeight.toString());
                    }
                    else {
                        pointerElement.setAttribute('x', rectY.toString());
                        pointerElement.setAttribute('width', rectHeight.toString());
                    }
                }
                pointer.startValue = pointer.currentValue;
                this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
            }
        });
    }
}

/**
 * @private
 * To render the axis elements
 */
class AxisRenderer extends Animations {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(gauge) {
        super(gauge);
    }
    renderAxes() {
        let axis;
        let major;
        let minor;
        this.axisElements = [];
        const gaugeAxesG = this.gauge.svgObject.querySelector('#' + this.gauge.element.id + '_Axis_Collections');
        if (gaugeAxesG) {
            remove(gaugeAxesG);
        }
        this.axisObject = this.gauge.renderer.createGroup({
            id: this.gauge.element.id + '_Axis_Collections',
            transform: 'translate( 0, 0 )'
        });
        for (let i = 0; i < this.gauge.axes.length; i++) {
            axis = this.gauge.axes[i];
            major = axis.majorTicks;
            minor = axis.minorTicks;
            this.htmlObject = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_Axis_Group_' + i });
            this.drawAxisLine(axis, this.htmlObject, i);
            this.drawRanges(axis, this.htmlObject, i);
            this.drawTicks(axis, major, this.htmlObject, 'MajorTicks', axis.majorTickBounds);
            this.drawTicks(axis, minor, this.htmlObject, 'MinorTicks', axis.minorTickBounds);
            this.drawAxisLabels(axis, this.htmlObject);
            this.drawPointers(axis, this.htmlObject, i);
            this.axisElements.push(this.htmlObject);
        }
        this.axisElements.forEach((axisElement) => {
            this.axisObject.appendChild(axisElement);
        });
        this.gauge.svgObject.appendChild(this.axisObject);
        if (this.gauge.nearSizes.length !== this.gauge.farSizes.length && this.gauge.axes.length > 1) {
            this.axisAlign(this.gauge.axes);
        }
    }
    axisAlign(axes) {
        let nearAxisWidth = 0;
        let farAxisWidth = 0;
        let tranX;
        let transY;
        if (this.gauge.orientation === 'Vertical') {
            axes.forEach((axis, axisIndex) => {
                if (!axis.opposedPosition) {
                    nearAxisWidth += axis.bounds.width;
                }
                else {
                    farAxisWidth += axis.bounds.width;
                }
            });
            nearAxisWidth += this.gauge.containerBounds.width / 2;
            farAxisWidth += this.gauge.containerBounds.width / 2;
            tranX = (nearAxisWidth / 2) - (farAxisWidth / 2);
            this.axisObject.setAttribute('transform', 'translate(' + tranX + ',0)');
            if (!(isNullOrUndefined(this.gauge.containerObject))) {
                this.gauge.containerObject.setAttribute('transform', 'translate(' + tranX + ',0)');
            }
        }
        else {
            axes.forEach((axis, axisIndex) => {
                if (!axis.opposedPosition) {
                    nearAxisWidth += axis.bounds.height;
                }
                else {
                    farAxisWidth += axis.bounds.height;
                }
            });
            nearAxisWidth += (this.gauge.containerBounds.height / 2);
            farAxisWidth += (this.gauge.containerBounds.height / 2);
            transY = (nearAxisWidth / 2) - (farAxisWidth / 2);
            this.axisObject.setAttribute('transform', 'translate(0,' + transY + ')');
            if (!(isNullOrUndefined(this.gauge.containerObject))) {
                this.gauge.containerObject.setAttribute('transform', 'translate(0,' + transY + ')');
            }
        }
    }
    drawAxisLine(axis, axisObject, axisIndex) {
        let options;
        const rect = axis.lineBounds;
        let path = '';
        const color = axis.line.color || this.gauge.themeStyle.lineColor;
        if (axis.line.width > 0) {
            path = 'M' + rect.x + ' ' + rect.y + ' L ' + (this.gauge.orientation === 'Vertical' ? rect.x : rect.x + rect.width) +
                ' ' + (this.gauge.orientation === 'Vertical' ? rect.y + rect.height : rect.y) + 'z';
            options = new PathOption(this.gauge.element.id + '_AxisLine_' + axisIndex, color, axis.line.width, color, 1, axis.line.dashArray, path);
            axisObject.appendChild(this.gauge.renderer.drawPath(options));
        }
    }
    drawTicks(axis, ticks, axisObject, tickID, tickBounds) {
        let tickPath = '';
        let pointY;
        let pointX;
        const range = axis.visibleRange;
        const line = axis.lineBounds;
        const majorTickColor = axis.majorTicks.color || this.gauge.themeStyle.majorTickColor;
        const minorTickColor = axis.minorTicks.color || this.gauge.themeStyle.minorTickColor;
        const tickColor = (tickID === 'MajorTicks') ? majorTickColor : minorTickColor;
        const interval = ((tickID === 'MajorTicks') ? axis.majorInterval : axis.minorInterval);
        const tickHeight = (axis.minimum !== axis.maximum) ? ticks.height : 0;
        // let position: string = (tickID === 'MajorTicks') ? axis.majorTicks.position : axis.minorTicks.position;
        for (let i = range.min; (i <= range.max && interval > 0); i += interval) {
            if ((tickID === 'MajorTicks') || (tickID === 'MinorTicks')) {
                if (this.gauge.orientation === 'Vertical') {
                    // pointX =  position === "Inside" ? tickBounds.x : tickBounds.x + ticks.height;
                    pointX = tickBounds.x;
                    pointY = (valueToCoefficient(i, axis, this.gauge.orientation, range) * line.height) + line.y;
                    tickPath = tickPath.concat('M' + pointX + ' ' + pointY + ' ' + 'L' + (pointX + tickHeight) + ' ' + pointY + ' ');
                }
                else {
                    pointX = (valueToCoefficient(i, axis, this.gauge.orientation, range) * line.width) + line.x;
                    // pointY = position === "Inside" ? tickBounds.y : (tickBounds.y + ticks.height);
                    pointY = tickBounds.y;
                    tickPath = tickPath.concat('M' + pointX + ' ' + pointY + ' ' + 'L' + pointX + ' ' + (pointY + tickHeight) + ' ');
                }
            }
        }
        const options = new PathOption(this.gauge.element.id + '_' + tickID + 'Line_' + 0, tickColor, ticks.width, tickColor, 1, null, tickPath);
        axisObject.appendChild(this.gauge.renderer.drawPath(options));
    }
    drawAxisLabels(axis, axisObject) {
        /* eslint-disable max-len */
        let options;
        let pointX;
        let pointY;
        const rect = axis.lineBounds;
        const bounds = axis.labelBounds;
        const tick = axis.majorTickBounds;
        let labelSize;
        const range = axis.visibleRange;
        let anchor;
        let baseline;
        const padding = 5;
        const fontColor = this.gauge.themeStyle.labelColor;
        let labelColor;
        const offset = axis.labelStyle.offset;
        const labelLength = axis.visibleLabels.length - 1;
        const labelElement = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_AxisLabelsGroup' });
        for (let i = 0; i < axis.visibleLabels.length; i++) {
            labelSize = axis.visibleLabels[i].size;
            labelColor = axis.labelStyle.useRangeColor ? getRangeColor(axis.visibleLabels[i].value, axis.ranges) : null;
            labelColor = isNullOrUndefined(labelColor) ? (axis.labelStyle.font.color || fontColor) : labelColor;
            if (this.gauge.orientation === 'Vertical') {
                pointY = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.height) + rect.y;
                pointX = axis.labelStyle.position === 'Auto' ? (!axis.opposedPosition ? (tick.x - labelSize.width - padding) + offset : bounds.x) : bounds.x;
                pointY += (labelSize.height / 4);
                axis.visibleLabels[i].x = pointX;
                axis.visibleLabels[i].y = pointY;
            }
            else {
                if ((i === 0 || i === labelLength) && this.gauge.edgeLabelPlacement !== 'None') {
                    if (this.gauge.edgeLabelPlacement === 'Shift') {
                        pointX = i === 0 ? (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x + (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2))
                            : (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x - (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2));
                        if (this.gauge.allowMargin) {
                            if (i === labelLength) {
                                if (!axis.isInversed && (pointX - (axis.visibleLabels[i].size.width / 2)) < (axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX += (axis.visibleLabels[i].size.width / 2);
                                }
                                else if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX -= (axis.visibleLabels[i].size.width / 2);
                                }
                            }
                        }
                    }
                    else if (this.gauge.edgeLabelPlacement === 'Trim') {
                        pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x;
                        if (i === labelLength) {
                            if (!this.gauge.allowMargin) {
                                if (!axis.isInversed && this.gauge.margin.right <= 10) {
                                    const maxWidth = axis.visibleLabels[i].size.width * 0.75;
                                    axis.visibleLabels[i].text = textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                                else if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    const maxWidth = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                            }
                            else {
                                if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    const width = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(width, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                                else if (!axis.isInversed && (pointX - (axis.visibleLabels[i].size.width / 2)) < (axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2))) {
                                    const width = axis.visibleLabels[i].size.width - ((axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2)) - (pointX - (axis.visibleLabels[i].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(width, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                            }
                        }
                    }
                    else if (this.gauge.edgeLabelPlacement === 'Auto') {
                        if (!this.gauge.allowMargin) {
                            pointX = i === labelLength ? (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x - (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2)) :
                                (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x + (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2));
                            if (i === labelLength) {
                                if (!axis.isInversed && (pointX - (axis.visibleLabels[i].size.width / 2)) < (axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX += (axis.visibleLabels[i].size.width / 2);
                                    const maxWidth = axis.visibleLabels[i].size.width * 0.75;
                                    axis.visibleLabels[i].text = textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                                else if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX -= (axis.visibleLabels[i].size.width / 2);
                                    const widthValue = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(widthValue, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                            }
                        }
                        else {
                            pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x;
                            if (i === labelLength && axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                const labelWidth = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                axis.visibleLabels[i].text = textTrim(labelWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                            }
                        }
                    }
                    pointY = bounds.y;
                    axis.visibleLabels[i].x = pointX;
                    axis.visibleLabels[i].y = pointY;
                    anchor = 'middle';
                    baseline = '';
                }
                else {
                    pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x;
                    pointY = bounds.y;
                    anchor = 'middle';
                    baseline = '';
                    axis.visibleLabels[i].x = pointX;
                    axis.visibleLabels[i].y = pointY;
                }
            }
            axis.labelStyle.font.fontFamily = this.gauge.themeStyle.labelFontFamily || axis.labelStyle.font.fontFamily;
            axis.labelStyle.font.fontStyle = axis.labelStyle.font.fontStyle || this.gauge.themeStyle.labelStyle;
            axis.labelStyle.font.fontWeight = axis.labelStyle.font.fontWeight || this.gauge.themeStyle.labelWeight;
            options = new TextOption(this.gauge.element.id + '_AxisLabel_' + i, pointX, pointY, anchor, axis.visibleLabels[i].text, null, baseline);
            textElement(options, axis.labelStyle.font, labelColor, labelElement);
        }
        axisObject.appendChild(labelElement);
    }
    drawPointers(axis, axisObject, axisIndex) {
        let pointer;
        let clipId;
        let pointerClipRectGroup;
        const pointesGroup = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_PointersGroup' });
        for (let i = 0; i < axis.pointers.length; i++) {
            pointer = axis.pointers[i];
            clipId = 'url(#' + this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + '_' + pointer.type + 'ClipRect_' + i + ')';
            if (!(isNullOrUndefined(pointer.bounds))) {
                pointerClipRectGroup = this.gauge.renderer.createGroup({
                    'id': this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer_' + i
                });
                if (isNullOrUndefined(pointer.startValue)) {
                    pointer.startValue = axis.visibleRange.min;
                }
                if (pointer.animationDuration > 0 && !this.gauge.gaugeResized) {
                    if (this.gauge.container.type === 'Thermometer' && pointer.startValue === 0) {
                        pointerClipRectGroup.setAttribute('clip-path', clipId);
                    }
                }
                this['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointer, i, pointerClipRectGroup);
                pointesGroup.appendChild(pointerClipRectGroup);
            }
        }
        this.gauge.gradientCount = 0;
        axisObject.appendChild(pointesGroup);
    }
    drawMarkerPointer(axis, axisIndex, pointer, pointerIndex, parentElement) {
        let options;
        const pointerID = this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer' + '_' + pointerIndex;
        const transform = 'translate( 0, 0 )';
        let pointerElement;
        let gradientMarkerColor;
        if (this.gauge.gradientModule) {
            gradientMarkerColor = this.gauge.gradientModule.getGradientColorString(pointer);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            remove(getElement(pointerID));
        }
        const pointerColor = pointer.color || this.gauge.themeStyle.pointerColor;
        let shapeBasedOnPosition = pointer.markerType;
        if (!isNullOrUndefined(pointer.position) && (pointer.markerType === 'InvertedTriangle' ||
            pointer.markerType === 'Triangle')) {
            shapeBasedOnPosition = (((pointer.position === 'Outside' && !axis.opposedPosition) ||
                (pointer.position === 'Inside' && axis.opposedPosition) || pointer.position === 'Cross')
                && pointer.markerType === 'Triangle' ? 'InvertedTriangle' :
                (((pointer.position === 'Inside' && !axis.opposedPosition) || (pointer.position === 'Outside' && axis.opposedPosition)) &&
                    pointer.markerType === 'InvertedTriangle' ? 'Triangle' : pointer.markerType));
        }
        options = new PathOption(pointerID, (gradientMarkerColor) ? gradientMarkerColor : pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, pointer.border.dashArray, null, transform);
        options = calculateShapes(pointer.bounds, shapeBasedOnPosition, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
        // eslint-disable-next-line prefer-const
        pointerElement = ((pointer.markerType === 'Circle' ? this.gauge.renderer.drawCircle(options)
            : (pointer.markerType === 'Image') ? this.gauge.renderer.drawImage(options) :
                this.gauge.renderer.drawPath(options)));
        parentElement.appendChild(pointerElement);
        if (pointer.animationDuration > 0 && !this.gauge.gaugeResized) {
            pointer.animationComplete = false;
            this.performMarkerAnimation(pointerElement, axis, pointer);
        }
        pointerElement.setAttribute('aria-label', pointer.description || 'Pointer:' + Number(pointer.currentValue).toString());
        pointerElement.setAttribute('cursor', 'pointer');
    }
    drawBarPointer(axis, axisIndex, pointer, pointerIndex, parentElement) {
        let rectOptions;
        let clipRectElement;
        let pointerElement;
        let path = '';
        let options;
        let box;
        const size = new Size(this.gauge.availableSize.width, this.gauge.availableSize.height);
        const pointerID = this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer' + '_' + pointerIndex;
        let gradientBarColor;
        if (this.gauge.gradientModule) {
            gradientBarColor = this.gauge.gradientModule.getGradientColorString(pointer);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            remove(getElement(pointerID));
        }
        if (this.gauge.container.type === 'Normal' || this.gauge.container.width === 0) {
            rectOptions = new RectOption(pointerID, (gradientBarColor) ?
                gradientBarColor : pointer.color || this.gauge.themeStyle.pointerColor, pointer.border, pointer.opacity, pointer.bounds, null, null);
            box = pointer.bounds;
            pointerElement = this.gauge.renderer.drawRectangle(rectOptions);
        }
        else {
            path = pointer.value > axis.minimum || this.gauge.container.type === 'Thermometer' ? getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius) : '';
            options = new PathOption(pointerID, (gradientBarColor) ? gradientBarColor : pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, pointer.border.dashArray, path);
            pointerElement = this.gauge.renderer.drawPath(options);
            box = getPathToRect(pointerElement.cloneNode(true), size, this.gauge.element);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            const element = getElement(pointerID).firstElementChild;
            if (this.gauge.container.type === 'Normal') {
                element.setAttribute('x', rectOptions.x + '');
                element.setAttribute('y', rectOptions.y + '');
                element.setAttribute('width', rectOptions.width + '');
                element.setAttribute('height', rectOptions.height + '');
            }
            else {
                element.setAttribute('d', options.d);
            }
        }
        else {
            parentElement.appendChild(pointerElement);
        }
        pointerElement.setAttribute('aria-label', pointer.description || 'Pointer:' + Number(pointer.currentValue).toString());
        pointerElement.setAttribute('cursor', 'pointer');
        if (pointer.animationDuration > 0 && !this.gauge.gaugeResized) {
            if (this.gauge.container.type === 'Thermometer' && pointer.startValue === 0 && this.gauge.container.width > 0) {
                clipRectElement = this.gauge.renderer.drawClipPath(new RectOption(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + '_' + pointer.type + 'ClipRect_' + pointerIndex, 'transparent', { width: 1, color: 'Gray' }, 1, box));
                parentElement.appendChild(clipRectElement);
            }
            this.performBarAnimation(pointerElement, axis, pointer);
        }
    }
    drawRanges(axis, axisObject, axisIndex) {
        let range;
        let options;
        const rangeElement = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_RangesGroup' });
        for (let j = 0; j < axis.ranges.length; j++) {
            range = axis.ranges[j];
            if (!(isNullOrUndefined(range.path))) {
                options = new PathOption(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_Range_' + j, range.interior, (range.start !== range.end) ? range.border.width : 0, range.border.color, 1, range.border.dashArray, range.path);
                rangeElement.appendChild(this.gauge.renderer.drawPath(options));
            }
        }
        axisObject.appendChild(rangeElement);
    }
}

/* eslint-disable valid-jsdoc */
/**
 * @private
 * To calculate the overall axis bounds for gauge.
 */
class AxisLayoutPanel {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(gauge) {
        this.gauge = gauge;
        this.axisRenderer = new AxisRenderer(gauge);
    }
    /**
     * To calculate the axis bounds
     */
    calculateAxesBounds() {
        let axis;
        let bounds;
        this.gauge.nearSizes = [];
        this.gauge.farSizes = [];
        let x;
        let y;
        let width;
        let height;
        const axisPadding = 8;
        const containerRect = this.gauge.containerBounds;
        this.checkThermometer();
        for (let i = 0; i < this.gauge.axes.length; i++) {
            axis = this.gauge.axes[i];
            axis.checkAlign = new Align(i, ((!axis.opposedPosition) ? 'Near' : 'Far'));
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (!axis.opposedPosition) ? this.gauge.nearSizes.push(1) : this.gauge.farSizes.push(1);
            this.calculateLineBounds(axis, i);
            this.calculateTickBounds(axis, i);
            this.calculateLabelBounds(axis, i);
            if (axis.pointers.length > 0) {
                this.calculatePointerBounds(axis, i);
            }
            if (axis.ranges.length > 0) {
                this.calculateRangesBounds(axis, i);
            }
            bounds = axis.labelBounds;
            const offset = this.gauge.axes[i].labelStyle.offset;
            if (this.gauge.orientation === 'Vertical') {
                x = (!axis.opposedPosition) ? bounds.x - offset - axisPadding : axis.lineBounds.x;
                y = axis.lineBounds.y;
                height = axis.lineBounds.height;
                width = Math.abs((!axis.opposedPosition) ? (axis.lineBounds.x - x) : ((bounds.x + bounds.width + axisPadding) - x - offset));
            }
            else {
                y = (!axis.opposedPosition) ? bounds.y - bounds.height - offset - axisPadding : axis.lineBounds.y;
                x = axis.lineBounds.x;
                width = axis.lineBounds.width;
                height = Math.abs((!axis.opposedPosition) ? Math.abs(axis.lineBounds.y - y) : (bounds.y + axisPadding) - y - offset);
            }
            axis.bounds = new Rect(x, y, width, height);
        }
    }
    /**
     * Calculate axis line bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculateLineBounds(axis, axisIndex) {
        let x;
        let y;
        let width;
        let height;
        let prevAxis;
        let lineHeight = axis.line.height;
        const orientation = this.gauge.orientation;
        const containerRect = this.gauge.containerBounds;
        lineHeight = (axis.line.width > 0) ? lineHeight : null;
        if (orientation === 'Vertical') {
            y = (isNullOrUndefined(lineHeight)) ? containerRect.y :
                containerRect.y + ((containerRect.height / 2) - (lineHeight / 2));
            width = axis.line.width;
            height = (isNullOrUndefined(lineHeight)) ? containerRect.height : lineHeight;
        }
        else {
            x = (isNullOrUndefined(lineHeight)) ? containerRect.x :
                containerRect.x + ((containerRect.width / 2) - (lineHeight / 2));
            height = axis.line.width;
            width = (isNullOrUndefined(lineHeight)) ? containerRect.width : lineHeight;
        }
        let index = this.checkPreviousAxes(axis, axisIndex);
        let count = 0;
        if (!isNullOrUndefined(index)) {
            for (let i = index; i >= 0; i--) {
                if (this.gauge.axes[i].minimum !== this.gauge.axes[i].maximum) {
                    index = i;
                    count++;
                    break;
                }
            }
            if (count === 0) {
                index = null;
            }
        }
        if (isNullOrUndefined(index)) {
            if (orientation === 'Vertical') {
                x = (!axis.opposedPosition ? containerRect.x : containerRect.x + containerRect.width) + axis.line.offset;
            }
            else {
                y = (!axis.opposedPosition ? containerRect.y : containerRect.y + containerRect.height) + axis.line.offset;
            }
        }
        else {
            prevAxis = this.gauge.axes[index];
            if (orientation === 'Vertical') {
                x = ((!axis.opposedPosition) ? prevAxis.bounds.x : (prevAxis.bounds.x + prevAxis.bounds.width)) + axis.line.offset;
            }
            else {
                y = ((!axis.opposedPosition) ? prevAxis.bounds.y : (prevAxis.bounds.y + prevAxis.bounds.height)) + axis.line.offset;
            }
        }
        axis.lineBounds = new Rect(x, y, width, height);
        if (axis.minimum === axis.maximum) {
            axis.lineBounds = new Rect(0, 0, 0, 0);
        }
    }
    /**
     * Calculate axis tick bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculateTickBounds(axis, axisIndex) {
        let x;
        let y;
        let min = Math.min(axis.minimum, axis.maximum);
        const max = Math.max(axis.minimum, axis.maximum);
        min = (min === max) ? max - 1 : min;
        const interval = axis.majorTicks.interval;
        const bounds = axis.lineBounds;
        const major = axis.majorTicks;
        const minor = axis.minorTicks;
        axis.majorInterval = major.interval;
        axis.minorInterval = minor.interval;
        const size = (this.gauge.orientation === 'Vertical' ? bounds.height : bounds.width);
        const lineSize = (this.gauge.orientation === 'Vertical' ? bounds.width : bounds.height) / 2;
        axis.majorInterval = isNullOrUndefined(axis.majorInterval) ? calculateNiceInterval(min, max, size, this.gauge.orientation)
            : major.interval;
        axis.visibleRange = new VisibleRange(min, max, axis.majorInterval, (max - min));
        axis.minorInterval = (isNullOrUndefined(axis.minorInterval)) ? axis.majorInterval / 2 : axis.minorInterval;
        if (this.gauge.orientation === 'Vertical') {
            x = axis.majorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.x - lineSize - major.height) : bounds.x + lineSize)
                + major.offset) : x;
            x = axis.majorTicks.position !== 'Auto' ? (axis.majorTicks.position === 'Cross' ? bounds.x - major.height / 2 - major.offset :
                ((axis.majorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.majorTicks.position === 'Outside' && axis.opposedPosition)) ? (bounds.x - lineSize - major.height - major.offset)
                    : (bounds.x + lineSize + major.offset)) : x;
            axis.majorTickBounds = new Rect(x, bounds.y, major.height, bounds.height);
            if (axis.minimum === axis.maximum) {
                axis.majorTickBounds = new Rect(0, 0, 0, 0);
            }
            x = axis.minorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.x - lineSize - minor.height) : bounds.x + lineSize)
                + minor.offset) : x;
            x = axis.minorTicks.position !== 'Auto' ? (axis.minorTicks.position === 'Cross' ? bounds.x - minor.height / 2 - minor.offset :
                ((axis.minorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.minorTicks.position === 'Outside' && axis.opposedPosition)) ? (bounds.x - lineSize - minor.height - minor.offset)
                    : (bounds.x + lineSize + minor.offset)) : x;
            axis.minorTickBounds = new Rect(x, bounds.y, minor.height, bounds.height);
            if (axis.minimum === axis.maximum) {
                axis.minorTickBounds = new Rect(0, 0, 0, 0);
            }
        }
        else {
            y = axis.majorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.y - lineSize - major.height) : bounds.y + lineSize)
                + major.offset) : y;
            y = axis.majorTicks.position !== 'Auto' ? ((axis.majorTicks.position === 'Cross' ? bounds.y - major.height / 2 - major.offset :
                ((axis.majorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.majorTicks.position === 'Outside' && axis.opposedPosition)) ?
                    (bounds.y - lineSize - major.height) - major.offset : bounds.y + lineSize + major.offset)) : y;
            axis.majorTickBounds = new Rect(bounds.x, y, bounds.width, major.height);
            if (axis.minimum === axis.maximum) {
                axis.majorTickBounds = new Rect(0, 0, 0, 0);
            }
            y = axis.minorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.y - lineSize - minor.height) : bounds.y + lineSize)
                + minor.offset) : y;
            y = axis.minorTicks.position !== 'Auto' ? ((axis.minorTicks.position === 'Cross' ? bounds.y - minor.height / 2 - major.offset :
                ((axis.minorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.minorTicks.position === 'Outside' && axis.opposedPosition)) ?
                    (bounds.y - lineSize - minor.height) - minor.offset : bounds.y + lineSize + minor.offset)) : y;
            axis.minorTickBounds = new Rect(bounds.x, y, bounds.width, minor.height);
            if (axis.minimum === axis.maximum) {
                axis.minorTickBounds = new Rect(0, 0, 0, 0);
            }
        }
    }
    /**
     * To Calculate axis label bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculateLabelBounds(axis, axisIndex) {
        let x;
        let y;
        const padding = 5;
        const applyPositionBounds = (axis.labelStyle.position !== 'Auto' && axis.majorTicks.position !== 'Auto' &&
            axis.minorTicks.position !== 'Auto');
        const bounds = applyPositionBounds ? (axis.labelStyle.position === axis.minorTicks.position &&
            axis.minorTicks.position !== axis.majorTicks.position ? axis.minorTickBounds : axis.majorTickBounds) :
            axis.majorTickBounds;
        const offset = axis.labelStyle.offset;
        this.calculateVisibleLabels(axis);
        if (axis.minimum === axis.maximum) {
            axis.labelBounds = new Rect(0, 0, 0, 0);
        }
        else {
            const width = axis.maxLabelSize.width;
            const height = axis.maxLabelSize.height / 2;
            if (this.gauge.orientation === 'Vertical') {
                x = axis.labelStyle.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.x - width - padding) :
                    (bounds.x + bounds.width + padding)) + offset) : x;
                let boundx = bounds.x;
                const offsetForCross = axis.majorTicks.position === 'Cross' || axis.minorTicks.position === 'Cross' ?
                    (bounds.width > axis.lineBounds.width ? bounds.width / 2 : axis.lineBounds.width / 2) : axis.lineBounds.width / 2;
                boundx = applyPositionBounds ? ((axis.labelStyle.position !== axis.minorTicks.position &&
                    axis.labelStyle.position !== axis.majorTicks.position) ?
                    (axis.minorTicks.position !== 'Cross' && axis.majorTicks.position !== 'Cross' ? (axis.labelStyle.position === 'Inside' ?
                        bounds.x - axis.lineBounds.width : axis.labelStyle.position === 'Outside' ?
                        bounds.x + axis.lineBounds.width : bounds.x) : (axis.labelStyle.position === 'Inside' ?
                        axis.lineBounds.x - offsetForCross : axis.labelStyle.position === 'Outside' ?
                        axis.lineBounds.x - bounds.width + offsetForCross : bounds.x)) : bounds.x) : bounds.x;
                x = axis.labelStyle.position !== 'Auto' ? (axis.labelStyle.position === 'Cross' ? axis.lineBounds.x -
                    axis.maxLabelSize.width / 4 - offset : ((axis.labelStyle.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.labelStyle.position === 'Outside' && axis.opposedPosition)) ?
                    ((boundx - width - padding) - offset) : ((boundx + bounds.width + padding) + offset)) : x;
                y = axis.lineBounds.y;
            }
            else {
                y = axis.labelStyle.position === 'Auto' ? ((!axis.opposedPosition ?
                    (bounds.y - padding) : ((bounds.y + bounds.height + padding) + height)) + offset) : y;
                let boundy = bounds.y;
                const offsetForCross = axis.majorTicks.position === 'Cross' || axis.minorTicks.position === 'Cross' ?
                    (bounds.height > axis.lineBounds.height ? bounds.height / 2 : axis.lineBounds.height / 2) : axis.lineBounds.height / 2;
                boundy = applyPositionBounds ? ((axis.labelStyle.position !== axis.minorTicks.position &&
                    axis.labelStyle.position !== axis.majorTicks.position) ?
                    (axis.minorTicks.position !== 'Cross' && axis.majorTicks.position !== 'Cross' ?
                        (axis.labelStyle.position === 'Inside' ? bounds.y - axis.lineBounds.height : axis.labelStyle.position === 'Outside' ?
                            bounds.y + axis.lineBounds.height : bounds.y) : (axis.labelStyle.position === 'Inside' ?
                        axis.lineBounds.y - offsetForCross : axis.labelStyle.position === 'Outside' ?
                        axis.lineBounds.y - bounds.height + offsetForCross : bounds.y)) : bounds.y) : bounds.y;
                y = axis.labelStyle.position !== 'Auto' ? (axis.labelStyle.position === 'Cross' ? axis.lineBounds.y +
                    axis.maxLabelSize.height / 4 - offset : ((axis.labelStyle.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.labelStyle.position === 'Outside' && axis.opposedPosition)) ?
                    (boundy - padding) - offset : ((boundy + bounds.height + padding) + height) + offset) : y;
                x = axis.lineBounds.x;
            }
            axis.labelBounds = new Rect(x, y, width, height);
        }
    }
    /**
     * Calculate pointer bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculatePointerBounds(axis, axisIndex) {
        let pointer;
        const range = axis.visibleRange;
        const orientation = this.gauge.orientation;
        const line = axis.lineBounds;
        const label = axis.labelBounds;
        const minimumValue = Math.min(range.min, range.max);
        const maximumValue = Math.max(range.min, range.max);
        for (let i = 0; i < axis.pointers.length; i++) {
            pointer = axis.pointers[i];
            if (pointer.offset.length > 0) {
                pointer.currentOffset = stringToNumber(pointer.offset, (this.gauge.orientation === 'Horizontal' ?
                    this.gauge.availableSize.height / 2 : this.gauge.availableSize.width / 2));
            }
            else {
                pointer.currentOffset = pointer.offset;
            }
            pointer.currentValue = pointer.value !== null ?
                pointer.value < minimumValue ? minimumValue : pointer.value > maximumValue ? maximumValue : pointer.value
                : minimumValue;
            if (pointer.width > 0 && withInRange(pointer.currentValue, null, null, range.max, range.min, 'pointer')) {
                this['calculate' + pointer.type + 'Bounds'](axisIndex, axis, i, pointer);
            }
        }
    }
    /**
     * Calculate marker pointer bounds
     *
     * @param axisIndex
     * @param axis
     * @param pointerIndex
     * @param pointer
     */
    calculateMarkerBounds(axisIndex, axis, pointerIndex, pointer) {
        let x;
        let y;
        const line = axis.lineBounds;
        const offset = pointer.currentOffset;
        const range = axis.visibleRange;
        const placement = pointer.placement;
        const tick = axis.majorTickBounds;
        const label = axis.labelBounds;
        const border = pointer.border.width;
        if (this.gauge.orientation === 'Vertical') {
            if (pointer.position === 'Auto') {
                x = (!axis.opposedPosition) ? (placement === 'Near') ? label.x : (placement === 'Center') ? tick.x : line.x :
                    placement === 'Far' ? label.x + label.width : (placement === 'Center' ? tick.x + tick.width : line.x);
                x = !axis.opposedPosition ? ((pointer.placement === 'Far' ? ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? x - border : x + border) : ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? x + border : x - border)) + (offset)) :
                    ((pointer.placement === 'Near' ? ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? x + border : x - border) : ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? x - border : x + border)) + (offset));
            }
            else {
                x = (pointer.position === 'Cross' ? line.x - pointer.width / 2 - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.x - line.width / 2 - (pointer.markerType !== 'InvertedTriangle' && pointer.markerType !== 'Triangle' ?
                            pointer.width : 0)) - offset : ((line.x + line.width / 2) + offset));
            }
            y = ((valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * line.height) + line.y);
        }
        else {
            if (pointer.position === 'Auto') {
                y = (!axis.opposedPosition) ? (placement === 'Near') ? label.y - label.height : (placement === 'Center') ? tick.y :
                    line.y : (placement === 'Far') ? label.y : (placement === 'Center') ? tick.y + tick.height : line.y;
                y = !axis.opposedPosition ? ((pointer.placement === 'Far' ? ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? y - border : y + border) : ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? y + border : y - border)) + (offset)) :
                    ((pointer.placement === 'Near' ? ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? y + border : y - border) : ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? y - border : y + border)) + (offset));
            }
            else {
                y = (pointer.position === 'Cross' ? line.y - pointer.height / 2 - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.y - line.height / 2 - (pointer.markerType !== 'InvertedTriangle' && pointer.markerType !== 'Triangle' ?
                            pointer.height : 0)) - offset : ((line.y + line.height / 2) + offset));
            }
            x = ((valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * line.width) + line.x);
        }
        pointer.bounds = new Rect(x, y, pointer.width, pointer.height);
        if (axis.minimum === axis.maximum) {
            pointer.bounds = new Rect(0, 0, 0, 0);
            pointer.width = 0;
            pointer.height = 0;
        }
    }
    /**
     * Calculate bar pointer bounds
     *
     * @param axisIndex
     * @param axis
     * @param pointerIndex
     * @param pointer
     */
    calculateBarBounds(axisIndex, axis, pointerIndex, pointer) {
        let x1;
        let x2;
        let y1;
        let y2;
        let height;
        let width;
        const line = axis.lineBounds;
        const padding = 10;
        const range = axis.visibleRange;
        const orientation = this.gauge.orientation;
        const offset = pointer.currentOffset;
        const container = this.gauge.containerBounds;
        if (orientation === 'Vertical') {
            if (pointer.position === 'Auto') {
                x1 = (container.width > 0) ? container.x + ((container.width / 2) - (pointer.width / 2)) :
                    (!axis.opposedPosition) ? (line.x + padding) : (line.x - pointer.width - padding);
                x1 += (offset);
            }
            else {
                x1 = (pointer.position === 'Cross' ? line.x - pointer.width / 2 - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.x - line.width / 2 - pointer.width) - offset : ((line.x + line.width / 2) + offset));
            }
            y1 = ((valueToCoefficient(pointer.currentValue, axis, orientation, range) * line.height) + line.y);
            y2 = ((valueToCoefficient(range.min, axis, orientation, range) * line.height) + line.y);
            height = Math.abs(y2 - y1);
            y1 = (!axis.isInversed) ? y1 : y2;
            width = pointer.width;
        }
        else {
            if (pointer.position === 'Auto') {
                y1 = (container.height > 0) ? (container.y + (container.height / 2) - (pointer.height) / 2) :
                    (!axis.opposedPosition) ? (line.y + padding) : (line.y - pointer.height - padding);
                y1 += (offset);
            }
            else {
                y1 = (pointer.position === 'Cross' ? line.y - pointer.height / 2 - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.y - line.height / 2 - pointer.height) - offset : ((line.y + line.height / 2) + offset));
            }
            height = pointer.height;
            x1 = ((valueToCoefficient(range.min, axis, orientation, range) * line.width) + line.x);
            x2 = ((valueToCoefficient(pointer.currentValue, axis, orientation, range) * line.width) + line.x);
            width = Math.abs(x2 - x1);
            x1 = (!axis.isInversed) ? x1 : x2;
        }
        pointer.bounds = new Rect(x1, y1, width, height);
        if (axis.minimum === axis.maximum) {
            pointer.bounds = new Rect(0, 0, 0, 0);
            pointer.width = 0;
            pointer.height = 0;
        }
    }
    /**
     * Calculate ranges bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculateRangesBounds(axis, axisIndex) {
        let range;
        let start;
        let end;
        const line = axis.lineBounds;
        const visibleRange = axis.visibleRange;
        const orientation = this.gauge.orientation;
        let startVal;
        let endVal;
        let pointX;
        let pointY;
        let width;
        let height;
        let position;
        let gradientRangeColor;
        let startWidth;
        let endWidth;
        let colors;
        for (let i = 0; i < axis.ranges.length; i++) {
            range = axis.ranges[i];
            if (this.gauge.gradientModule) {
                gradientRangeColor = this.gauge.gradientModule.getGradientColorString(range);
            }
            if (range.offset.length > 0) {
                range.currentOffset = stringToNumber(range.offset, (this.gauge.orientation === 'Horizontal' ?
                    this.gauge.availableSize.height / 2 : this.gauge.availableSize.width / 2));
            }
            else {
                range.currentOffset = range.offset;
            }
            start = Math.max(range.start, visibleRange.min);
            end = Math.min(range.end, visibleRange.max);
            if (withInRange(null, start, end, visibleRange.max, visibleRange.min, 'range')) {
                end = Math.max(start, end);
                start = Math.min(start, range.end);
                position = range.position;
                startWidth = range.startWidth;
                endWidth = range.endWidth;
                colors = this.gauge.rangePalettes.length ? this.gauge.rangePalettes : getRangePalette(this.gauge.theme);
                range.interior = (gradientRangeColor) ? gradientRangeColor :
                    (range.color) ? range.color : colors[i % colors.length];
                if (this.gauge.orientation === 'Vertical') {
                    pointX = line.x + (range.currentOffset) + (position === 'Cross' ? startWidth / 2 :
                        (position === 'Outside' || position === 'Auto') ?
                            -(line.width / 2) : position === 'Inside' ? line.width / 2 : 0);
                    pointY = (valueToCoefficient(end, axis, orientation, visibleRange) * line.height) + line.y;
                    height = (valueToCoefficient(start, axis, orientation, visibleRange) * line.height) + line.y;
                    height -= pointY;
                    startVal = !axis.opposedPosition ? (position === 'Inside' ? (pointX + startWidth) : position === 'Cross' ?
                        (pointX - startWidth) : (pointX - startWidth)) : (position === 'Inside' ? (pointX - startWidth) :
                        position === 'Cross' ? (pointX - startWidth) : (pointX + startWidth));
                    endVal = !axis.opposedPosition ? position === 'Inside' ? (pointX + endWidth) : position === 'Cross' ?
                        (pointX - endWidth) : (pointX - endWidth) : position === 'Inside' ? (pointX - endWidth) :
                        position === 'Cross' ? (pointX - endWidth) : (pointX + endWidth);
                    range.path = 'M' + pointX + ' ' + pointY + ' L ' + pointX + ' ' + (pointY + height) +
                        ' L ' + startVal + ' ' + (pointY + height) + ' L ' + endVal + ' ' + pointY +
                        ' L ' + pointX + ' ' + pointY + ' z ';
                }
                else {
                    pointX = (valueToCoefficient(end, axis, orientation, visibleRange) * line.width) + line.x;
                    pointY = axis.lineBounds.y + (range.currentOffset) + (position === 'Cross' ? startWidth / 2 :
                        (position === 'Outside' || position === 'Auto') ? -(line.height / 2) : position === 'Inside' ? line.height / 2 : 0);
                    width = (valueToCoefficient(start, axis, orientation, visibleRange) * line.width) + line.x;
                    width = pointX - width;
                    startVal = !axis.opposedPosition ? position === 'Inside' ? (pointY + startWidth) : position === 'Cross' ?
                        (pointY - startWidth) : (pointY - startWidth) : (position === 'Inside') ? (pointY - startWidth) :
                        position === 'Cross' ? (pointY - startWidth) : (pointY + startWidth);
                    endVal = !axis.opposedPosition ? position === 'Inside' ? (pointY + endWidth) : position === 'Cross' ?
                        (pointY - endWidth) : (pointY - endWidth) : (position === 'Inside') ? (pointY - endWidth) :
                        position === 'Cross' ? (pointY - endWidth) : (pointY + endWidth);
                    range.path = 'M' + pointX + ' ' + pointY + ' L ' + (pointX - width) + ' ' + pointY +
                        ' L ' + (pointX - width) + ' ' + startVal + ' L ' + pointX + ' ' + endVal +
                        ' L ' + pointX + ' ' + pointY + ' z ';
                }
            }
        }
    }
    checkPreviousAxes(currentAxis, axisIndex) {
        let index = axisIndex - 1;
        let prevAxis;
        const isPositive = (index >= 0) ? true : false;
        if (isPositive) {
            prevAxis = this.gauge.axes[index];
            index = (prevAxis.checkAlign.align === currentAxis.checkAlign.align) ? index : this.checkPreviousAxes(currentAxis, index);
        }
        else {
            index = null;
        }
        return index;
    }
    /**
     *
     * @param axis To calculate the visible labels
     */
    calculateVisibleLabels(axis) {
        axis.visibleLabels = [];
        if (axis.minimum !== axis.maximum) {
            const min = axis.visibleRange.min;
            const max = axis.visibleRange.max;
            const interval = axis.visibleRange.interval;
            let argsData;
            const style = axis.labelStyle;
            let labelSize;
            const customLabelFormat = style.format && style.format.match('{value}') !== null;
            for (let i = min; (i <= max && interval > 0); i += interval) {
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,
                    text: customLabelFormat ? textFormatter(style.format, { value: i }, this.gauge) :
                        formatValue(i, this.gauge).toString(),
                    value: i
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const axisLabelRenderSuccess = (argsData) => {
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new VisibleLabels(argsData.text, i, labelSize));
                    }
                };
                axisLabelRenderSuccess.bind(this);
                this.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
            }
            const lastLabel = axis.visibleLabels.length ? axis.visibleLabels[axis.visibleLabels.length - 1].value : null;
            const maxVal = axis.visibleRange.max;
            if (lastLabel !== maxVal && axis.showLastLabel === true) {
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,
                    text: customLabelFormat ? textFormatter(style.format, { value: maxVal }, this.gauge) :
                        formatValue(maxVal, this.gauge).toString(),
                    value: maxVal
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const axisLabelRenderSuccess = (argsData) => {
                    labelSize = measureText(argsData.text, axis.labelStyle.font);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new VisibleLabels(argsData.text, maxVal, labelSize));
                    }
                };
                axisLabelRenderSuccess.bind(this);
                this.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
            }
            this.getMaxLabelWidth(this.gauge, axis);
        }
    }
    /**
     * Calculate maximum label width for the axis.
     *
     * @return {void}
     * @private
     */
    getMaxLabelWidth(gauge, axis) {
        axis.maxLabelSize = new Size(0, 0);
        let label;
        for (let i = 0; i < axis.visibleLabels.length; i++) {
            label = axis.visibleLabels[i];
            label.size = measureText(label.text, axis.labelStyle.font);
            if (label.size.width > axis.maxLabelSize.width) {
                axis.maxLabelSize.width = label.size.width;
            }
            if (label.size.height > axis.maxLabelSize.height) {
                axis.maxLabelSize.height = label.size.height;
            }
        }
    }
    checkThermometer() {
        if (this.gauge.container.type === 'Thermometer') {
            this.gauge.axes.map((axis, index) => {
                if (axis.isInversed) {
                    axis.pointers.map((pointer, index) => {
                        if (pointer.type === 'Bar') {
                            axis.isInversed = false;
                        }
                    });
                }
            });
        }
    }
}

/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/**
 * Represent the Annotation rendering for gauge
 */
class Annotations {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(gauge) {
        this.gauge = gauge;
    }
    /**
     * To render annotation elements
     */
    renderAnnotationElements() {
        const secondaryID = this.gauge.element.id + '_Secondary_Element';
        const annotationGroup = createElement('div', { id: this.gauge.element.id + '_AnnotationsGroup' });
        annotationGroup.style.position = 'absolute';
        annotationGroup.style.top = '0px';
        annotationGroup.style.left = '0px';
        this.gauge.annotations.map((annotation, index) => {
            if (annotation.content !== null) {
                this.createAnnotationTemplate(annotationGroup, index);
            }
        });
        if (annotationGroup.childElementCount > 0 && !(isNullOrUndefined(getElement(secondaryID)))) {
            getElement(secondaryID).appendChild(annotationGroup);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.gauge.renderReactTemplates();
    }
    /**
     * To create annotation elements
     */
    createAnnotationTemplate(element, annotationIndex) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let left;
        let top;
        let templateFn;
        let renderAnnotation = false;
        let templateElement;
        let axis;
        let axisIndex;
        const id = this.gauge.element.id + '_Annotation_' + annotationIndex;
        const annotation = this.gauge.annotations[annotationIndex];
        const childElement = createElement('div', {
            id: this.gauge.element.id + '_Annotation_' + annotationIndex, styles: 'position: absolute; z-index:' + annotation.zIndex + ';'
        });
        let argsData = {
            cancel: false, name: annotationRender, content: annotation.content,
            annotation: annotation, textStyle: annotation.font
        };
        argsData.textStyle.color = annotation.font.color || this.gauge.themeStyle.labelColor;
        this.gauge.trigger(annotationRender, argsData, (observerArgs) => {
            if (!argsData.cancel) {
                templateFn = getTemplateFunction(argsData.content, this.gauge);
                if (templateFn && templateFn(this.gauge, this.gauge, argsData.content, this.gauge.element.id + '_ContentTemplate' + annotationIndex).length) {
                    templateElement = Array.prototype.slice.call(templateFn(this.gauge, this.gauge, argsData.content, this.gauge.element.id + '_ContentTemplate' + annotationIndex));
                    const length = templateElement.length;
                    for (let i = 0; i < length; i++) {
                        childElement.appendChild(templateElement[i]);
                    }
                }
                else {
                    childElement.appendChild(createElement('div', {
                        innerHTML: argsData.content,
                        styles: getFontStyle(argsData.textStyle)
                    }));
                }
                const offset = getElementOffset(childElement.cloneNode(true), this.gauge.element);
                if (!(isNullOrUndefined(annotation.axisValue))) {
                    axisIndex = isNullOrUndefined(annotation.axisIndex) ? 0 : annotation.axisIndex;
                    axis = this.gauge.axes[axisIndex];
                    const range = axis.visibleRange;
                    renderAnnotation = (annotation.axisValue >= range.min && annotation.axisValue <= range.max) ? true : false;
                    const line = axis.lineBounds;
                    const extraWidth = getExtraWidth(this.gauge.element);
                    const axisCollection = getElement(this.gauge.element.id + '_Axis_Collections');
                    if (!isNullOrUndefined(axisCollection)) {
                        const transformValue = axisCollection.getAttribute('transform').split("(")[1].split(")")[0];
                        const leftTransformValue = parseInt(transformValue.split(",")[0]);
                        const topTransformValue = parseInt(transformValue.split(",")[1]);
                        if (this.gauge.orientation === 'Vertical') {
                            left = line.x + parseFloat(annotation.x.toString()) + leftTransformValue - extraWidth;
                            top = ((valueToCoefficient(parseFloat(annotation.axisValue.toString()), axis, this.gauge.orientation, range) * line.height) + line.y);
                            top += parseFloat(annotation.y.toString());
                        }
                        else {
                            left = ((valueToCoefficient(parseFloat(annotation.axisValue.toString()), axis, this.gauge.orientation, range) * line.width) + line.x - extraWidth);
                            left += parseFloat(annotation.x.toString());
                            top = line.y + parseFloat(annotation.y.toString()) + topTransformValue;
                        }
                        left -= (offset.width / 2);
                        top -= (offset.height / 2);
                    }
                }
                else {
                    const elementRect = this.gauge.element.getBoundingClientRect();
                    const bounds = this.gauge.svgObject.getBoundingClientRect();
                    renderAnnotation = true;
                    left = Math.abs(bounds.left - elementRect.left);
                    top = Math.abs(bounds.top - elementRect.top);
                    left = (annotation.horizontalAlignment === 'None') ? (left + annotation.x) : left;
                    top = (annotation.verticalAlignment === 'None') ? top + annotation.y : top;
                    switch (annotation.verticalAlignment) {
                        case 'Near':
                            top = top + annotation.y;
                            break;
                        case 'Center':
                            top = top + annotation.y + ((bounds.height / 2) - (offset.height / 2));
                            break;
                        case 'Far':
                            top = (top + bounds.height) + annotation.y - offset.height;
                            break;
                    }
                    switch (annotation.horizontalAlignment) {
                        case 'Near':
                            left = left + annotation.x;
                            break;
                        case 'Center':
                            left = left + annotation.x + ((bounds.width / 2) - (offset.width / 2));
                            break;
                        case 'Far':
                            left = (left + bounds.width) + annotation.x - offset.width;
                            break;
                    }
                }
                childElement.style.left = left + 'px';
                childElement.style.top = top + 'px';
                if (renderAnnotation) {
                    element.appendChild(childElement);
                }
            }
        });
    }
    /*
     * Get module name.
     */
    getModuleName() {
        return 'Annotations';
    }
    /**
     * To destroy the annotation.
     *
     * @return {void}
     * @private
     */
    destroy(gauge) {
        // Destroy method performed here
    }
}

/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/dot-notation */
/**
 * Represent the tooltip rendering for gauge
 */
class GaugeTooltip {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(gauge) {
        this.gauge = gauge;
        this.element = gauge.element;
        this.tooltip = gauge.tooltip;
        this.textStyle = this.tooltip.textStyle;
        this.borderStyle = this.tooltip.border;
        this.tooltipId = this.gauge.element.id + '_LinearGauge_Tooltip';
        this.addEventListener();
    }
    /**
     * Internal use for tooltip rendering
     *
     * @param pointerElement
     */
    renderTooltip(e) {
        let pageX;
        let pageY;
        let target;
        let touchArg;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        let tooltipEle;
        let tooltipContent;
        if (target.id.indexOf('Pointer') > -1 && this.gauge.tooltip.type.indexOf('Pointer') > -1) {
            this.pointerElement = target;
            const areaRect = this.gauge.element.getBoundingClientRect();
            const current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            this.currentPointer = current.pointer;
            const customTooltipFormat = this.tooltip.format && this.tooltip.format.match('{value}') !== null;
            this.tooltip.textStyle.fontFamily = this.gauge.themeStyle.fontFamily || this.tooltip.textStyle.fontFamily;
            this.tooltip.textStyle.opacity = this.gauge.themeStyle.tooltipTextOpacity || this.tooltip.textStyle.opacity;
            tooltipContent = customTooltipFormat ? textFormatter(this.tooltip.format, { value: this.currentPointer.currentValue }, this.gauge) :
                formatValue(this.currentPointer.currentValue, this.gauge).toString();
            tooltipEle = this.tooltipCreate(tooltipEle);
            this.tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if (target.id.indexOf('Range') > -1 && this.gauge.tooltip.type.indexOf('Range') > -1) {
            this.pointerElement = target;
            const areaRect = this.gauge.element.getBoundingClientRect();
            const current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            const rangePosition = Number(target.id.charAt(target.id.length - 1));
            this.currentRange = this.currentAxis.ranges[rangePosition];
            const startData = (this.currentRange.start).toString();
            const endData = (this.currentRange.end).toString();
            const rangeTooltipFormat = this.gauge.tooltip.rangeSettings.format || this.currentAxis.labelStyle.format;
            const customTooltipFormat = rangeTooltipFormat && (rangeTooltipFormat.match('{end}') !== null ||
                rangeTooltipFormat.match('{start}') !== null);
            this.tooltip.rangeSettings.textStyle.fontFamily = this.gauge.themeStyle.fontFamily ||
                this.tooltip.rangeSettings.textStyle.fontFamily;
            this.tooltip.rangeSettings.textStyle.opacity = this.gauge.themeStyle.tooltipTextOpacity ||
                this.tooltip.rangeSettings.textStyle.opacity;
            tooltipContent = customTooltipFormat ? rangeTooltipFormat.replace(/{start}/g, startData).replace(/{end}/g, endData) :
                'Start : ' + startData + '<br>' + 'End : ' + endData;
            tooltipEle = this.tooltipCreate(tooltipEle);
            this.tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else {
            this.removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.clearTemplate();
        }
    }
    tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY) {
        let location = this.getTooltipLocation();
        if ((this.tooltip.rangeSettings.showAtMousePosition && target.id.indexOf('Range') > -1) ||
            (this.tooltip.showAtMousePosition && target.id.indexOf('Pointer') > -1)) {
            location = getMousePosition(pageX, pageY, this.gauge.svgObject);
        }
        const args = {
            name: tooltipRender,
            cancel: false,
            gauge: this.gauge,
            event: e,
            location: location,
            content: tooltipContent,
            tooltip: this.tooltip,
            axis: this.currentAxis,
            pointer: this.currentPointer
        };
        const tooltipPos = this.getTooltipPosition();
        location.y += ((this.tooltip.rangeSettings.template && tooltipPos === 'Top') ||
            (this.tooltip.template && tooltipPos === 'Top')) ? 20 : 0;
        location.x += ((this.tooltip.rangeSettings.template && tooltipPos === 'Right') ||
            (this.tooltip.template && tooltipPos === 'Right')) ? 20 : 0;
        this.gauge.trigger(tooltipRender, args, (observedArgs) => {
            let template = (target.id.indexOf('Range') > -1) ? args.tooltip.rangeSettings.template : args.tooltip.template;
            if (template !== null && Object.keys(template).length === 1) {
                template = template[Object.keys(template)[0]];
            }
            const themes = this.gauge.theme.toLowerCase();
            if (!args.cancel) {
                args['tooltip']['properties']['textStyle']['color'] = (target.id.indexOf('Range') > -1) ?
                    this.tooltip.rangeSettings.textStyle.color || this.gauge.themeStyle.tooltipFontColor : this.tooltip.textStyle.color || this.gauge.themeStyle.tooltipFontColor;
                const fillColor = (target.id.indexOf('Range') > -1) ? this.tooltip.rangeSettings.fill : this.tooltip.fill;
                this.svgTooltip = this.svgCreate(this.svgTooltip, args, this.gauge, areaRect, fillColor, template, tooltipPos, location, target);
                this.svgTooltip.opacity = this.gauge.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
                this.svgTooltip.textStyle.fontFamily = (target.id.indexOf('Range') > -1) ?
                    this.tooltip.rangeSettings.textStyle.fontFamily || this.gauge.themeStyle.fontFamily : this.tooltip.textStyle.fontFamily || this.gauge.themeStyle.fontFamily;
                this.svgTooltip.appendTo(tooltipEle);
            }
        });
    }
    tooltipCreate(tooltipEle) {
        if (document.getElementById(this.tooltipId)) {
            tooltipEle = document.getElementById(this.tooltipId);
        }
        else {
            tooltipEle = createElement('div', {
                id: this.tooltipId,
                className: 'EJ2-LinearGauge-Tooltip',
                styles: 'position: absolute;pointer-events:none;'
            });
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(tooltipEle);
        }
        return tooltipEle;
    }
    svgCreate(svgTooltip, args, gauge, areaRect, fill, template, tooltipPos, location, target) {
        const tooltipBorder = (target.id.indexOf('Range') > -1) ? args.tooltip.rangeSettings.border : args.tooltip.border;
        svgTooltip = new Tooltip({
            enable: true,
            header: '',
            data: { value: args.content },
            template: template,
            content: [args.content],
            shapes: [],
            location: args.location,
            palette: [],
            inverted: !(args.gauge.orientation === 'Horizontal'),
            enableAnimation: args.tooltip.enableAnimation,
            fill: fill || gauge.themeStyle.tooltipFillColor,
            availableSize: gauge.availableSize,
            areaBounds: new Rect((this.gauge.orientation === 'Vertical') ? areaRect.left : location.x, (this.gauge.orientation === 'Vertical') ? location.y : (tooltipPos === 'Bottom') ? location.y : areaRect.top, tooltipPos === 'Right' ? Math.abs(areaRect.left - location.x) : areaRect.width, areaRect.height),
            textStyle: args.tooltip.textStyle,
            border: tooltipBorder,
            theme: args.gauge.theme
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (gauge.isVue || gauge.isVue3) {
            svgTooltip.controlInstance = gauge;
        }
        return svgTooltip;
    }
    getTooltipPosition() {
        let position;
        if (this.gauge.orientation === 'Vertical') {
            position = (!this.currentAxis.opposedPosition) ? 'Left' : 'Right';
        }
        else {
            position = (this.currentAxis.opposedPosition) ? 'Top' : 'Bottom';
        }
        return position;
    }
    getTooltipLocation() {
        let lineX;
        let lineY;
        const size = new Size(this.gauge.availableSize.width, this.gauge.availableSize.height);
        let x;
        let y;
        const lineId = this.gauge.element.id + '_AxisLine_' + this.axisIndex;
        const tickID = this.gauge.element.id + '_MajorTicksLine_' + this.axisIndex;
        let lineBounds;
        if (getElement(lineId)) {
            lineBounds = getElement(lineId).getBoundingClientRect();
            lineX = lineBounds.left;
            lineY = lineBounds.top;
        }
        else {
            lineBounds = getElement(tickID).getBoundingClientRect();
            lineX = (!this.currentAxis.opposedPosition) ? (lineBounds.left + lineBounds.width) : lineBounds.left;
            lineY = (!this.currentAxis.opposedPosition) ? (lineBounds.top + lineBounds.height) : lineBounds.top;
        }
        const bounds = this.pointerElement.getBoundingClientRect();
        const elementRect = this.gauge.element.getBoundingClientRect();
        x = bounds.left - elementRect.left;
        y = bounds.top - elementRect.top;
        const height = bounds.height;
        const width = bounds.width;
        const tooltipPosition = (this.pointerElement.id.indexOf('Range') > -1) ? this.tooltip.rangeSettings.position :
            this.tooltip.position;
        if (this.gauge.orientation === 'Vertical') {
            x = (lineX - elementRect.left);
            if (this.pointerElement.id.indexOf('Range') > -1 || this.pointerElement.id.indexOf('BarPointer') > -1) {
                y = (!this.currentAxis.isInversed) ? ((tooltipPosition === 'End') ? y : ((tooltipPosition === 'Start') ?
                    y + height : y + (height / 2))) : ((tooltipPosition === 'End') ? y + height : ((tooltipPosition === 'Start') ?
                    y + height : y + (height / 2)));
            }
            else {
                y = (this.currentPointer.type === 'Marker') ? y + (height / 2) : (!this.currentAxis.isInversed) ? y : y + height;
            }
        }
        else {
            y = (lineY - elementRect.top);
            if (this.pointerElement.id.indexOf('Range') > -1 || this.pointerElement.id.indexOf('BarPointer') > -1) {
                x = (!this.currentAxis.isInversed) ? ((tooltipPosition === 'End') ? x + width : ((tooltipPosition === 'Start') ?
                    // eslint-disable-next-line max-len
                    x : x + (width / 2))) : ((tooltipPosition === 'End') ? x : ((tooltipPosition === 'Start') ? x + width : x + (width / 2)));
            }
            else {
                x = (this.currentPointer.type === 'Marker') ? (x + width / 2) : (!this.currentAxis.isInversed) ? x + width : x;
            }
        }
        const location = new GaugeLocation(x, y);
        return location;
    }
    removeTooltip() {
        if (document.getElementsByClassName('EJ2-LinearGauge-Tooltip').length > 0) {
            document.getElementsByClassName('EJ2-LinearGauge-Tooltip')[0].remove();
        }
    }
    mouseUpHandler(e) {
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    }
    /**
     * To bind events for tooltip module
     */
    addEventListener() {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.gauge.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    }
    /**
     * To unbind events for tooltip module
     */
    removeEventListener() {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.off(Browser.touchMoveEvent, this.renderTooltip);
        this.gauge.off(Browser.touchEndEvent, this.mouseUpHandler);
    }
    /*
     * Get module name.
     */
    getModuleName() {
        return 'Tooltip';
    }
    /**
     * To destroy the tooltip.
     *
     * @return {void}
     * @private
     */
    destroy(gauge) {
        // Destroy method performed here
        this.removeEventListener();
    }
}

/** @private */
function getThemeStyle(theme) {
    let style;
    switch (theme.toLowerCase()) {
        case 'materialdark':
        case 'fabricdark':
        case 'bootstrapdark':
            style = {
                backgroundColor: '#333232',
                titleFontColor: '#ffffff',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#000000',
                labelColor: '#DADADA',
                lineColor: '#C8C8C8',
                majorTickColor: '#C8C8C8',
                minorTickColor: '#9A9A9A',
                pointerColor: '#9A9A9A',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf'
            };
            break;
        case 'highcontrast':
            style = {
                backgroundColor: '#000000',
                titleFontColor: '#FFFFFF',
                tooltipFillColor: '#ffffff',
                tooltipFontColor: '#000000',
                labelColor: '#FFFFFF',
                lineColor: '#FFFFFF',
                majorTickColor: '#FFFFFF',
                minorTickColor: '#FFFFFF',
                pointerColor: '#FFFFFF',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf'
            };
            break;
        case 'bootstrap4':
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#212529',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                labelColor: '#212529',
                lineColor: '#ADB5BD',
                majorTickColor: '#ADB5BD',
                minorTickColor: '#CED4DA',
                pointerColor: '#6C757D',
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: '16px',
                labelFontFamily: 'HelveticaNeue',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                containerBackground: '#F8F9FA',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf'
            };
            break;
        case 'tailwind':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#374151',
                tooltipFillColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                labelColor: '#6B7280',
                lineColor: '#E5E7EB',
                majorTickColor: '#9CA3AF',
                minorTickColor: '#9CA3AF',
                pointerColor: '#1F2937',
                fontFamily: 'Inter',
                fontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'Normal',
                titleFontWeight: '500',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#E5E7EB'
            };
            break;
        case 'tailwinddark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#D1D5DB',
                tooltipFillColor: '#F9FAFB',
                tooltipFontColor: '#1F2937',
                labelColor: '#9CA3AF',
                lineColor: '#374151',
                majorTickColor: '#6B7280',
                minorTickColor: '#6B7280',
                pointerColor: '#9CA3AF',
                fontFamily: 'Inter',
                fontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'Normal',
                titleFontWeight: '500',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#4b5563'
            };
            break;
        case 'bootstrap5':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#343A40',
                tooltipFillColor: '#212529',
                tooltipFontColor: '#F9FAFB',
                labelColor: '#495057',
                lineColor: '#E5E7EB',
                majorTickColor: '#9CA3AF',
                minorTickColor: '#9CA3AF',
                pointerColor: '#1F2937',
                fontFamily: 'Helvetica Neue',
                fontSize: '14px',
                labelFontFamily: 'Helvetica Neue',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'normal',
                titleFontWeight: '500',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#E5E7EB'
            };
            break;
        case 'bootstrap5dark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#E9ECEF',
                tooltipFillColor: '#E9ECEF',
                tooltipFontColor: '#212529',
                labelColor: '#CED4DA',
                lineColor: '#343A40',
                majorTickColor: '#6C757D',
                minorTickColor: '#6C757D',
                pointerColor: '#ADB5BD',
                fontFamily: 'Helvetica Neue',
                fontSize: '14px',
                labelFontFamily: 'Helvetica Neue',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'normal',
                titleFontWeight: '500',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#4b5563'
            };
            break;
        case 'fluent':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#201F1E',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#323130',
                labelColor: '#3B3A39',
                lineColor: '#EDEBE9',
                majorTickColor: '#C8C6C4',
                minorTickColor: '#C8C6C4',
                pointerColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#EDEBE9'
            };
            break;
        case 'fluentdark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#F3F2F1',
                tooltipFillColor: '#252423',
                tooltipFontColor: '#F3F2F1',
                labelColor: '#C8C6C4',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#797775',
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#292827'
            };
            break;
        default:
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#424242',
                tooltipFillColor: '#FFFFF',
                tooltipFontColor: '#FFFFFF',
                labelColor: '#686868',
                lineColor: '#a6a6a6',
                majorTickColor: '#a6a6a6',
                minorTickColor: '#a6a6a6',
                pointerColor: '#a6a6a6',
                containerBackground: '#e0e0e0',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf'
            };
            break;
    }
    return style;
}

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable valid-jsdoc */
/**
 * Specified the color information for the gradient in the linear gauge.
 */
class ColorStop extends ChildProperty {
}
__decorate$3([
    Property('#000000')
], ColorStop.prototype, "color", void 0);
__decorate$3([
    Property(1)
], ColorStop.prototype, "opacity", void 0);
__decorate$3([
    Property('0%')
], ColorStop.prototype, "offset", void 0);
__decorate$3([
    Property('')
], ColorStop.prototype, "style", void 0);
/**
 * Specifies the position in percentage from which the radial gradient must be applied.
 */
class GradientPosition extends ChildProperty {
}
__decorate$3([
    Property('0%')
], GradientPosition.prototype, "x", void 0);
__decorate$3([
    Property('0%')
], GradientPosition.prototype, "y", void 0);
/**
 * This specifies the properties of the linear gradient colors for the linear gauge.
 */
class LinearGradient extends ChildProperty {
}
__decorate$3([
    Property('0%')
], LinearGradient.prototype, "startValue", void 0);
__decorate$3([
    Property('100%')
], LinearGradient.prototype, "endValue", void 0);
__decorate$3([
    Collection([{ color: '#000000', opacity: 1, offset: '0%', style: '' }], ColorStop)
], LinearGradient.prototype, "colorStop", void 0);
/**
 * This specifies the properties of the radial gradient colors for the linear gauge.
 */
class RadialGradient extends ChildProperty {
}
__decorate$3([
    Property('0%')
], RadialGradient.prototype, "radius", void 0);
__decorate$3([
    Complex({ x: '0%', y: '0%' }, GradientPosition)
], RadialGradient.prototype, "outerPosition", void 0);
__decorate$3([
    Complex({ x: '0%', y: '0%' }, GradientPosition)
], RadialGradient.prototype, "innerPosition", void 0);
__decorate$3([
    Collection([{ color: '#000000', opacity: 1, offset: '0%', style: '' }], ColorStop)
], RadialGradient.prototype, "colorStop", void 0);
/**
 * To get the gradient support for pointers and ranges in the linear gauge.
 *
 * @hidden
 */
class Gradient {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.gauge = control;
    }
    /**
     * To get the linear gradient string.
     *
     * @private
     */
    getLinearGradientColor(element) {
        const render = new SvgRenderer('');
        const colorStop = element.linearGradient.colorStop;
        const colors = this.getGradientColor(colorStop);
        const name = '_' + this.gauge.svgObject.id + '_' + this.gauge.gradientCount + '_' + 'linearGradient';
        const gradientPosition = {
            id: name,
            x1: (element.linearGradient.startValue.indexOf('%') === -1 ?
                element.linearGradient.startValue :
                parseFloat(element.linearGradient.startValue).toString()) + '%',
            x2: (element.linearGradient.endValue.indexOf('%') === -1 ?
                element.linearGradient.endValue :
                parseFloat(element.linearGradient.endValue).toString()) + '%',
            y1: '0' + '%',
            y2: '0' + '%'
        };
        const def = render.drawGradient('linearGradient', gradientPosition, colors);
        this.gauge.svgObject.appendChild(def);
        return 'url(#' + name + ')';
    }
    /**
     * To get the radial gradient string.
     *
     * @private
     */
    getRadialGradientColor(element) {
        const render = new SvgRenderer('');
        const colorStop = element.radialGradient.colorStop;
        const colors = this.getGradientColor(colorStop);
        const name = '_' + this.gauge.svgObject.id + '_' + this.gauge.gradientCount + '_' + 'radialGradient';
        const gradientPosition = {
            id: name,
            r: (element.radialGradient.radius.indexOf('%') === -1 ?
                element.radialGradient.radius :
                parseFloat(element.radialGradient.radius).toString()) + '%',
            cx: (element.radialGradient.outerPosition.x.indexOf('%') === -1 ?
                element.radialGradient.outerPosition.x :
                parseFloat(element.radialGradient.outerPosition.x).toString()) + '%',
            cy: (element.radialGradient.outerPosition.y.indexOf('%') === -1 ?
                element.radialGradient.outerPosition.y :
                parseFloat(element.radialGradient.outerPosition.y).toString()) + '%',
            fx: (element.radialGradient.innerPosition.x.indexOf('%') === -1 ?
                element.radialGradient.innerPosition.y :
                parseFloat(element.radialGradient.innerPosition.x).toString()) + '%',
            fy: (element.radialGradient.innerPosition.y.indexOf('%') === -1 ?
                element.radialGradient.innerPosition.y :
                parseFloat(element.radialGradient.innerPosition.y).toString()) + '%'
        };
        const def = render.drawGradient('radialGradient', gradientPosition, colors);
        this.gauge.svgObject.appendChild(def);
        return 'url(#' + name + ')';
    }
    /**
     * To get the color, offset, opacity and style.
     *
     * @private
     */
    getGradientColor(colorStop) {
        const colors = [];
        const length = colorStop.length;
        for (let j = 0; j < length; j++) {
            const color = {
                color: colorStop[j].color,
                colorStop: colorStop[j].offset,
                opacity: (colorStop[j].opacity) ? (colorStop[j].opacity).toString() : '1',
                style: colorStop[j].style
            };
            colors.push(color);
        }
        return colors;
    }
    /**
     * To get the gradient color string.
     *
     * @private
     */
    getGradientColorString(element) {
        let gradientColor;
        if ((element.linearGradient || element.radialGradient)) {
            if (element.linearGradient) {
                gradientColor = this.getLinearGradientColor(element);
            }
            else {
                gradientColor = this.getRadialGradientColor(element);
            }
            this.gauge.gradientCount += 1;
        }
        else {
            return null;
        }
        return gradientColor;
    }
    /**
     * Get module name.
     */
    getModuleName() {
        return 'Gradient';
    }
    /**
     * To destroy the gradient.
     *
     * @return {void}
     * @private
     */
    destroy(control) {
        /**
         * Destroy method performed here
         */
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable valid-jsdoc */
/**
 * Represents the EJ2 Linear gauge control.
 * ```html
 * <div id="container"/>
 * <script>
 *   var gaugeObj = new LinearGauge({ });
 *   gaugeObj.appendTo("#container");
 * </script>
 * ```
 */
let LinearGauge = class LinearGauge extends Component {
    /**
     * @private
     * Constructor for creating the widget
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(options, element) {
        super(options, element);
        /**
         * Specifies the gradient count of the linear gauge.
         *
         * @private
         */
        this.gradientCount = 0;
        /** @private */
        this.isDrag = false;
        /** @private */
        this.pointerDrag = false;
        /** @private */
        this.mouseX = 0;
        /** @private */
        this.mouseY = 0;
        /** @private */
        this.gaugeResized = false;
    }
    /**
     * Initialize the preRender method.
     */
    preRender() {
        this.unWireEvents();
        this.trigger(load, { gauge: this });
        this.initPrivateVariable();
        this.setCulture();
        this.createSvg();
        this.wireEvents();
    }
    setTheme() {
        this.themeStyle = getThemeStyle(this.theme);
    }
    initPrivateVariable() {
        if (this.element.id === '') {
            const collection = document.getElementsByClassName('e-lineargauge').length;
            this.element.id = 'lineargauge_' + 'control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        this.axisRenderer = new AxisRenderer(this);
    }
    /**
     * Method to set culture for chart
     */
    setCulture() {
        this.intl = new Internationalization();
    }
    /**
     * Methods to create svg element
     */
    createSvg() {
        this.removeSvg();
        this.calculateSize();
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + '_svg',
            width: this.availableSize.width,
            height: this.availableSize.height
        });
    }
    /**
     * To Remove the SVG.
     *
     * @return {boolean}
     * @private
     */
    removeSvg() {
        removeElement(this.element.id + '_Secondary_Element');
        if (!(isNullOrUndefined(this.svgObject)) && !isNullOrUndefined(this.svgObject.parentNode)) {
            remove(this.svgObject);
        }
        this.clearTemplate();
    }
    /**
     * Method to calculate the size of the gauge
     */
    calculateSize() {
        if (!isNullOrUndefined(this.height)) {
            this.element.style.height = this.height;
        }
        if (!isNullOrUndefined(this.width)) {
            this.element.style.width = this.width;
        }
        const width = stringToNumberSize(this.width, this.element.offsetWidth) || this.element.offsetWidth || 600;
        const height = stringToNumberSize(this.height, this.element.offsetHeight) || this.element.offsetHeight || 450;
        this.availableSize = new Size(width, height);
    }
    renderElements() {
        this.setTheme();
        this.renderGaugeElements();
        this.calculateBounds();
        this.renderAxisElements();
        this.renderComplete();
    }
    /**
     * To Initialize the control rendering
     */
    render() {
        this.renderElements();
    }
    /**
     * @private
     * To render the gauge elements
     */
    renderGaugeElements() {
        this.appendSecondaryElement();
        this.renderBorder();
        this.renderTitle();
        this.renderContainer();
    }
    appendSecondaryElement() {
        if (isNullOrUndefined(getElement(this.element.id + '_Secondary_Element'))) {
            const secondaryElement = createElement('div');
            secondaryElement.id = this.element.id + '_Secondary_Element';
            secondaryElement.setAttribute('style', 'position: relative');
            this.element.appendChild(secondaryElement);
        }
    }
    /**
     * Render the map area border
     */
    renderArea() {
        const size = measureText(this.title, this.titleStyle);
        const rectSize = new Rect(this.actualRect.x, this.actualRect.y - (size.height / 2), this.actualRect.width, this.actualRect.height);
        const rect = new RectOption(this.element.id + 'LinearGaugeBorder', this.background || this.themeStyle.backgroundColor, this.border, 1, rectSize);
        this.svgObject.appendChild(this.renderer.drawRectangle(rect));
    }
    /**
     * @private
     * To calculate axes bounds
     */
    calculateBounds() {
        this.gaugeAxisLayoutPanel.calculateAxesBounds();
    }
    /**
     * @private
     * To render axis elements
     */
    renderAxisElements() {
        this.axisRenderer.renderAxes();
        this.element.appendChild(this.svgObject);
        if (this.annotationsModule) {
            this.annotationsModule.renderAnnotationElements();
        }
        this.trigger(loaded, { gauge: this });
        removeElement('gauge-measuretext');
    }
    renderBorder() {
        const width = this.border.width;
        if (width > 0 || (this.background || this.themeStyle.backgroundColor)) {
            const rect = new RectOption(this.element.id + '_LinearGaugeBorder', this.background || this.themeStyle.backgroundColor, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width), null, null);
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        }
    }
    renderTitle() {
        const size = measureText(this.title, this.titleStyle);
        const options = new TextOption(this.element.id + '_LinearGaugeTitle', this.availableSize.width / 2, this.margin.top + (size.height / 2), 'middle', this.title);
        const titleBounds = {
            x: options.x - (size.width / 2),
            y: options.y,
            width: size.width,
            height: size.height
        };
        const x = this.margin.left;
        const y = (isNullOrUndefined(titleBounds)) ? this.margin.top : titleBounds.y;
        const height = (this.availableSize.height - y - this.margin.bottom);
        const width = (this.availableSize.width - this.margin.left - this.margin.right);
        this.actualRect = { x: x, y: y, width: width, height: height };
        if (this.title) {
            this.titleStyle.fontFamily = this.themeStyle.fontFamily || this.titleStyle.fontFamily;
            this.titleStyle.size = this.themeStyle.fontSize || this.titleStyle.size;
            this.titleStyle.fontStyle = this.titleStyle.fontStyle || this.themeStyle.titleFontStyle;
            this.titleStyle.fontWeight = this.titleStyle.fontWeight || this.themeStyle.titleFontWeight;
            const element = textElement(options, this.titleStyle, this.titleStyle.color || this.themeStyle.titleFontColor, this.svgObject);
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    }
    /*
     * Method to unbind the gauge events
     */
    unWireEvents() {
        EventHandler.remove(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMove);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'contextmenu', this.gaugeRightClick);
        EventHandler.remove(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave);
        EventHandler.remove(window, (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.gaugeResize.bind(this));
    }
    /*
     * Method to bind the gauge events
     */
    wireEvents() {
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'contextmenu', this.gaugeRightClick, this);
        EventHandler.add(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave, this);
        EventHandler.add(window, (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.gaugeResize, this);
        this.setStyle(this.element);
    }
    setStyle(element) {
        element.style.touchAction = isPointerDrag(this.axes) ? 'none' : 'element';
        element.style.msTouchAction = isPointerDrag(this.axes) ? 'none' : 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    }
    /**
     * Handles the gauge resize.
     *
     * @return {boolean}
     * @private
     */
    gaugeResize(e) {
        const args = {
            gauge: this,
            previousSize: new Size(this.availableSize.width, this.availableSize.height),
            name: resized,
            currentSize: new Size(0, 0)
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-lineargauge')) {
            this.resizeTo = window.setTimeout(() => {
                this.createSvg();
                args.currentSize = new Size(this.availableSize.width, this.availableSize.height);
                this.trigger(resized, args);
                this.renderElements();
            }, 500);
        }
        return false;
    }
    /**
     * To destroy the gauge element from the DOM.
     */
    destroy() {
        this.unWireEvents();
        this.removeSvg();
        super.destroy();
    }
    /**
     * @private
     * To render the gauge container
     */
    renderContainer() {
        let width;
        let height;
        let x;
        let y;
        let options;
        const labelPadding = 20;
        const extraPadding = 30;
        let path = '';
        const fill = (this.container.backgroundColor !== 'transparent'
            || (this.theme !== 'Bootstrap4' && this.theme !== 'Material'))
            ? this.container.backgroundColor : this.themeStyle.containerBackground;
        let rect;
        const radius = this.container.width;
        const bottomRadius = radius + ((radius / 2) / Math.PI);
        const topRadius = radius / 2;
        let allowContainerRender = false;
        for (let i = 0; i < this.axes.length; i++) {
            if (this.axes[i].minimum !== this.axes[i].maximum) {
                allowContainerRender = true;
                break;
            }
        }
        if (this.orientation === 'Vertical') {
            if (this.allowMargin) {
                height = this.actualRect.height;
                height = (this.container.height > 0) ? this.container.height :
                    ((height / 2) - ((height / 2) / 4)) * 2;
                height = (this.container.type === 'Thermometer') ? height - (bottomRadius * 2) - topRadius : height;
            }
            else {
                height = this.actualRect.height - labelPadding - extraPadding;
                height = (this.container.type === 'Thermometer') ? (radius !== 0) ? (this.actualRect.height - (bottomRadius * 2) - topRadius - extraPadding) : height : height;
            }
            width = this.container.width;
            x = (this.actualRect.x + ((this.actualRect.width / 2) - (this.container.width / 2))) + this.container.offset;
            y = this.actualRect.y + ((this.actualRect.height / 2) - ((this.container.type === 'Thermometer') ?
                ((height + (bottomRadius * 2) - topRadius)) / 2 : height / 2));
        }
        else {
            if (this.allowMargin) {
                width = (this.container.height > 0) ? this.container.height :
                    ((this.actualRect.width / 2) - ((this.actualRect.width / 2) / 4)) * 2;
                width = (this.container.type === 'Thermometer') ? width - (bottomRadius * 2) - topRadius : width;
            }
            else {
                width = this.actualRect.width - labelPadding;
                width = (this.container.type === 'Thermometer') ? (this.actualRect.width - (bottomRadius * 2) - topRadius) : width;
            }
            x = this.actualRect.x + ((this.actualRect.width / 2) - ((this.container.type === 'Thermometer') ?
                (width - (bottomRadius * 2) + topRadius) / 2 : width / 2));
            y = (this.actualRect.y + ((this.actualRect.height / 2) - (this.container.width / 2))) + this.container.offset;
            height = this.container.width;
        }
        this.containerBounds = (!allowContainerRender) ? { x: 0, y: 0, width: 0, height: 0 } : { x: x, y: y, width: width, height: height };
        if ((this.containerBounds.width > 0 && this.orientation === 'Vertical') || (this.containerBounds.height > 0 && this.orientation === 'Horizontal')) {
            this.containerObject = this.renderer.createGroup({ id: this.element.id + '_Container_Group', transform: 'translate( 0, 0)' });
            if (this.container.type === 'Normal') {
                let containerBorder = { color: this.container.border.color || this.themeStyle.containerBorderColor,
                    width: this.container.border.width, dashArray: this.container.border.dashArray };
                rect = new RectOption(this.element.id + '_' + this.container.type + '_Layout', fill, containerBorder, 1, new Rect(x, y, width, height));
                this.containerObject.appendChild(this.renderer.drawRectangle(rect));
            }
            else {
                path = getBox(this.containerBounds, this.container.type, this.orientation, new Size(this.container.height, this.container.width), 'container', null, null, this.container.roundedCornerRadius);
                options = new PathOption(this.element.id + '_' + this.container.type + '_Layout', fill, this.container.border.width, this.container.border.color || this.themeStyle.containerBorderColor, 1, this.container.border.dashArray, path);
                this.containerObject.appendChild(this.renderer.drawPath(options));
            }
            this.svgObject.appendChild(this.containerObject);
        }
    }
    /**
     * Method to set mouse x, y from events
     */
    setMouseXY(e) {
        let pageX;
        let pageY;
        const svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        const rect = this.element.getBoundingClientRect();
        if (e.type.indexOf('touch') > -1) {
            this.isTouch = true;
            const touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
    }
    /**
     * Handles the mouse down on gauge.
     *
     * @return {boolean}
     * @private
     */
    gaugeOnMouseDown(e) {
        const element = e.target;
        const clientRect = this.element.getBoundingClientRect();
        let current;
        let currentPointer;
        this.setMouseXY(e);
        const args = this.getMouseArgs(e, 'touchstart', gaugeMouseDown);
        this.trigger(gaugeMouseDown, args, (observedArgs) => {
            this.mouseX = args.x;
            this.mouseY = args.y;
            if (args.target) {
                if (!args.cancel && ((args.target.id.indexOf('MarkerPointer') > -1) || (args.target.id.indexOf('BarPointer') > -1))) {
                    current = this.moveOnPointer(args.target);
                    currentPointer = getPointer(args.target, this);
                    this.activeAxis = this.axes[currentPointer.axisIndex];
                    this.activePointer = this.activeAxis.pointers[currentPointer.pointerIndex];
                    if (isNullOrUndefined(this.activePointer.pathElement)) {
                        this.activePointer.pathElement = [e.target];
                    }
                    const pointInd = parseInt(this.activePointer.pathElement[0].id.slice(-1), 10);
                    const axisInd = parseInt(this.activePointer.pathElement[0].id.match(/\d/g)[0], 10);
                    if (currentPointer.pointer.enableDrag) {
                        this.trigger(dragStart, {
                            axis: this.activeAxis,
                            name: dragStart,
                            pointer: this.activePointer,
                            currentValue: this.activePointer.currentValue,
                            pointerIndex: pointInd,
                            axisIndex: axisInd
                        });
                    }
                    if (!isNullOrUndefined(current) && current.pointer) {
                        this.pointerDrag = true;
                        this.mouseElement = args.target;
                        this.svgObject.setAttribute('cursor', current.style);
                        this.mouseElement.setAttribute('cursor', current.style);
                    }
                }
            }
        });
        return false;
    }
    /**
     * Handles the mouse move.
     *
     * @return {boolean}
     * @private
     */
    mouseMove(e) {
        let current;
        this.setMouseXY(e);
        const args = this.getMouseArgs(e, 'touchmove', gaugeMouseMove);
        this.trigger(gaugeMouseMove, args, (observedArgs) => {
            this.mouseX = args.x;
            this.mouseY = args.y;
            let dragArgs;
            if (args.target && !args.cancel) {
                if ((args.target.id.indexOf('MarkerPointer') > -1) || (args.target.id.indexOf('BarPointer') > -1)) {
                    const pointerIndex = parseInt(args.target.id.slice(-1), 10);
                    const axisIndex = parseInt(args.target.id.split('AxisIndex_')[1].match(/\d/g)[0], 10);
                    if (this.axes[axisIndex].pointers[pointerIndex].enableDrag) {
                        current = this.moveOnPointer(args.target);
                        if (!(isNullOrUndefined(current)) && current.pointer) {
                            this.element.style.cursor = current.style;
                        }
                        if (this.activePointer) {
                            this.isDrag = true;
                            const dragPointInd = parseInt(this.activePointer.pathElement[0].id.slice(-1), 10);
                            const dragAxisInd = parseInt(this.activePointer.pathElement[0].id.match(/\d/g)[0], 10);
                            dragArgs = {
                                axis: this.activeAxis,
                                pointer: this.activePointer,
                                previousValue: this.activePointer.currentValue,
                                name: dragMove,
                                currentValue: null,
                                axisIndex: dragAxisInd,
                                pointerIndex: dragPointInd
                            };
                            if (args.target.id.indexOf('MarkerPointer') > -1) {
                                this.markerDrag(this.activeAxis, (this.activeAxis.pointers[dragPointInd]));
                            }
                            else {
                                this.barDrag(this.activeAxis, (this.activeAxis.pointers[dragPointInd]));
                            }
                            dragArgs.currentValue = this.activePointer.currentValue;
                            this.trigger(dragMove, dragArgs);
                        }
                    }
                }
                else {
                    this.element.style.cursor = (this.pointerDrag) ? this.element.style.cursor : 'auto';
                }
                this.gaugeOnMouseMove(e);
            }
        });
        this.notify(Browser.touchMoveEvent, e);
        return false;
    }
    /**
     * To find the mouse move on pointer.
     *
     * @param element
     */
    moveOnPointer(element) {
        const clientRect = this.element.getBoundingClientRect();
        let isPointer = false;
        let top;
        let left;
        const pointerElement = getElement(element.id);
        const svgPath = pointerElement;
        let cursorStyle;
        let process;
        const current = getPointer(element, this);
        const axis = current.axis;
        const pointer = current.pointer;
        if (pointer.enableDrag) {
            if (pointer.type === 'Bar') {
                if (this.orientation === 'Vertical') {
                    top = pointerElement.getBoundingClientRect().top - clientRect.top;
                    top = (!axis.isInversed) ? top : top + svgPath.getBBox().height;
                    isPointer = !axis.isInversed ? (this.mouseY < (top + 10) && this.mouseY >= top) :
                        (this.mouseY <= top && this.mouseY > (top - 10));
                    cursorStyle = 'grabbing';
                }
                else {
                    left = pointerElement.getBoundingClientRect().left - clientRect.left;
                    left = (!axis.isInversed) ? left + svgPath.getBBox().width : left;
                    isPointer = !axis.isInversed ? (this.mouseX > (left - 10) && this.mouseX <= left) :
                        (this.mouseX >= left && this.mouseX < (left + 10));
                    cursorStyle = 'grabbing';
                }
            }
            else {
                isPointer = true;
                cursorStyle = 'grabbing';
            }
        }
        if (isPointer) {
            process = { pointer: isPointer, style: cursorStyle };
        }
        return process;
    }
    /**
     * @private
     * Handle the right click
     * @param event
     */
    gaugeRightClick(event) {
        if (event.buttons === 2 || event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    }
    /**
     * Handles the mouse leave.
     *
     * @return {boolean}
     * @private
     */
    mouseLeave(e) {
        let parentNode;
        this.activeAxis = null;
        this.activePointer = null;
        this.svgObject.setAttribute('cursor', 'auto');
        const args = this.getMouseArgs(e, 'touchmove', gaugeMouseLeave);
        if (!isNullOrUndefined(this.mouseElement)) {
            parentNode = this.element;
            parentNode.style.cursor = '';
            this.mouseElement = null;
            this.pointerDrag = false;
        }
        return false;
    }
    /**
     * Handles the mouse move on gauge.
     *
     * @return {boolean}
     * @private
     */
    gaugeOnMouseMove(e) {
        let current;
        if (this.pointerDrag) {
            current = getPointer(this.mouseElement, this);
            if (current.pointer.enableDrag && current.pointer.animationComplete) {
                this[current.pointer.type.toLowerCase() + 'Drag'](current.axis, current.pointer);
            }
        }
        return true;
    }
    /**
     * Handles the mouse up.
     *
     * @return {boolean}
     * @private
     */
    mouseEnd(e) {
        this.setMouseXY(e);
        let parentNode;
        const isImage = isNullOrUndefined(this.activePointer) ? false : this.activePointer.markerType === 'Image';
        const isTouch = e.pointerType === 'touch' || e.pointerType === '2' || e.type === 'touchend';
        const args = this.getMouseArgs(e, 'touchend', gaugeMouseUp);
        this.trigger(gaugeMouseUp, args);
        if (this.activeAxis && this.activePointer) {
            const pointerInd = parseInt(this.activePointer.pathElement[0].id.slice(-1), 10);
            const axisInd = parseInt(this.activePointer.pathElement[0].id.match(/\d/g)[0], 10);
            if (this.activePointer.enableDrag) {
                this.trigger(dragEnd, {
                    name: dragEnd,
                    axis: this.activeAxis,
                    pointer: this.activePointer,
                    currentValue: this.activePointer.currentValue,
                    axisIndex: axisInd,
                    pointerIndex: pointerInd
                });
                if (isImage) {
                    this.activePointer.pathElement[0].setAttribute('cursor', 'pointer');
                }
                this.activeAxis = null;
                this.activePointer = null;
                this.isDrag = false;
                if (!isNullOrUndefined(this.mouseElement && !isImage)) {
                    this.triggerDragEvent(this.mouseElement);
                }
            }
        }
        if (!isNullOrUndefined(this.mouseElement)) {
            parentNode = this.element;
            parentNode.style.cursor = '';
            this.mouseElement = null;
            this.pointerDrag = false;
        }
        this.svgObject.setAttribute('cursor', 'auto');
        this.notify(Browser.touchEndEvent, e);
        return true;
    }
    /**
     * This method handles the print functionality for linear gauge.
     *
     * @param id - Specifies the element to print the linear gauge.
     */
    print(id) {
        if ((this.allowPrint) && (this.printModule)) {
            this.printModule.print(id);
        }
    }
    /**
     * This method handles the export functionality for linear gauge.
     *
     * @param type - Specifies the type of the export.
     * @param fileName - Specifies the file name for the exported file.
     * @param orientation - Specified the orientation for the exported pdf document.
     */
    export(type, fileName, orientation, allowDownload) {
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if ((type !== 'PDF') && (this.allowImageExport) && (this.imageExportModule)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return new Promise((resolve, reject) => {
                resolve(this.imageExportModule.export(type, fileName, allowDownload));
            });
        }
        else if ((this.allowPdfExport) && (this.pdfExportModule)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return new Promise((resolve, reject) => {
                resolve(this.pdfExportModule.export(type, fileName, orientation, allowDownload));
            });
        }
        return null;
    }
    /**
     * Handles the mouse event arguments.
     *
     * @return {IMouseEventArgs}
     * @private
     */
    getMouseArgs(e, type, name) {
        const rect = this.element.getBoundingClientRect();
        const location = new GaugeLocation(-rect.left, -rect.top);
        const isTouch = (e.type === type);
        location.x += isTouch ? e.changedTouches[0].clientX : e.clientX;
        location.y += isTouch ? e.changedTouches[0].clientY : e.clientY;
        return {
            cancel: false, name: name,
            model: this,
            x: location.x, y: location.y,
            target: isTouch ? e.target : e.target
        };
    }
    /**
     * @private
     * @param axis
     * @param pointer
     */
    markerDrag(axis, pointer) {
        let options;
        const value = convertPixelToValue(this.element, this.mouseElement, this.orientation, axis, 'drag', new GaugeLocation(this.mouseX, this.mouseY));
        const process = withInRange(value, null, null, axis.visibleRange.max, axis.visibleRange.min, 'pointer');
        if (withInRange(value, null, null, axis.visibleRange.max, axis.visibleRange.min, 'pointer')) {
            options = new PathOption('pointerID', pointer.color || this.themeStyle.pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, pointer.border.dashArray, null, '');
            if (this.orientation === 'Vertical') {
                pointer.bounds.y = this.mouseY;
            }
            else {
                pointer.bounds.x = this.mouseX + getExtraWidth(this.element);
            }
            pointer.currentValue = value;
            options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.orientation, axis, pointer);
            if (pointer.markerType === 'Image') {
                this.mouseElement.setAttribute('x', (pointer.bounds.x - (pointer.bounds.width / 2)).toString());
                this.mouseElement.setAttribute('y', (pointer.bounds.y - (pointer.bounds.height / 2)).toString());
            }
            else if (pointer.markerType === 'Circle') {
                this.mouseElement.setAttribute('cx', (options.cx).toString());
                this.mouseElement.setAttribute('cy', (options.cy).toString());
                this.mouseElement.setAttribute('r', (options.r).toString());
            }
            else {
                this.mouseElement.setAttribute('d', options.d);
            }
        }
    }
    /**
     * @private
     * @param axis
     * @param pointer
     */
    barDrag(axis, pointer) {
        const line = axis.lineBounds;
        const range = axis.visibleRange;
        let isDrag;
        const lineHeight = (this.orientation === 'Vertical') ? line.height : line.width;
        const lineY = (this.orientation === 'Vertical') ? line.y : line.x;
        let path;
        const value1 = ((valueToCoefficient(range.min, axis, this.orientation, range) * lineHeight) + lineY);
        const value2 = ((valueToCoefficient(range.max, axis, this.orientation, range) * lineHeight) + lineY);
        if (this.orientation === 'Vertical') {
            isDrag = (!axis.isInversed) ? (this.mouseY > value2 && this.mouseY < value1) : (this.mouseY > value1 && this.mouseY < value2);
            if (isDrag) {
                if ((this.container.type === 'Normal' || this.container.width === 0) && !isNullOrUndefined(this.mouseElement)) {
                    if (!axis.isInversed) {
                        this.mouseElement.setAttribute('y', this.mouseY.toString());
                    }
                    this.mouseElement.setAttribute('height', Math.abs(value1 - this.mouseY).toString());
                }
                else {
                    if (!axis.isInversed) {
                        pointer.bounds.y = this.mouseY;
                    }
                    pointer.bounds.height = Math.abs(value1 - this.mouseY);
                }
            }
        }
        else {
            const extraWidth = getExtraWidth(this.element);
            isDrag = (!axis.isInversed) ? (this.mouseX + extraWidth > value1 && this.mouseX + extraWidth < value2) :
                (this.mouseX + extraWidth > value2 && this.mouseX + extraWidth < value1);
            if (isDrag) {
                if ((this.container.type === 'Normal' || this.container.width === 0) && !isNullOrUndefined(this.mouseElement)) {
                    if (axis.isInversed) {
                        this.mouseElement.setAttribute('x', (this.mouseX + extraWidth).toString());
                    }
                    this.mouseElement.setAttribute('width', Math.abs(value1 - (this.mouseX + extraWidth)).toString());
                }
                else {
                    if (axis.isInversed) {
                        pointer.bounds.x = this.mouseX + extraWidth;
                    }
                    pointer.bounds.width = Math.abs(value1 - (this.mouseX + extraWidth));
                }
            }
        }
        if (isDrag && !isNullOrUndefined(this.mouseElement) && this.mouseElement.tagName === 'path') {
            path = getBox(pointer.bounds, this.container.type, this.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.container.width, axis, pointer.roundedCornerRadius);
            this.mouseElement.setAttribute('d', path);
        }
    }
    /**
     * Triggers when drag the pointer
     *
     * @param activeElement
     */
    triggerDragEvent(activeElement) {
        const active = getPointer(activeElement, this);
        const value = convertPixelToValue(this.element, activeElement, this.orientation, active.axis, 'tooltip', null);
        let dragArgs = {
            name: 'valueChange',
            gauge: this,
            element: activeElement,
            axisIndex: active.axisIndex,
            axis: active.axis,
            pointerIndex: active.pointerIndex,
            pointer: active.pointer,
            value: value
        };
        this.trigger(valueChange, dragArgs, (pointerArgs) => {
            this.setPointerValue(pointerArgs.axisIndex, pointerArgs.pointerIndex, pointerArgs.value);
        });
    }
    /**
     * This method is used to set the pointer value in the linear gauge.
     *
     * @param axisIndex - Specifies the index of the axis.
     * @param pointerIndex - Specifies the index of the pointer.
     * @param value - Specifies the pointer value.
     */
    setPointerValue(axisIndex, pointerIndex, value) {
        const axis = this.axes[axisIndex];
        const pointer = axis.pointers[pointerIndex];
        const id = this.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer_' + pointerIndex;
        const pointerElement = getElement(id);
        value = (value < axis.visibleRange.min) ? axis.visibleRange.min : ((value > axis.visibleRange.max) ? axis.visibleRange.max : value);
        pointer.currentValue = value;
        if ((pointerElement !== null) && withInRange(pointer.currentValue, null, null, axis.visibleRange.max, axis.visibleRange.min, 'pointer')) {
            this.gaugeAxisLayoutPanel['calculate' + pointer.type + 'Bounds'](axisIndex, axis, pointerIndex, pointer);
            this.axisRenderer['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointer, pointerIndex, pointerElement.parentElement);
        }
    }
    /**
     * This method is used to set the annotation value in the linear gauge.
     *
     * @param annotationIndex - Specifies the index of the annotation.
     * @param content - Specifies the text of the annotation.
     */
    setAnnotationValue(annotationIndex, content, axisValue) {
        const elementExist = getElement(this.element.id + '_Annotation_' + annotationIndex) === null;
        const element = getElement(this.element.id + '_AnnotationsGroup') ||
            createElement('div', {
                id: this.element.id + '_AnnotationsGroup'
            });
        const annotation = this.annotations[annotationIndex];
        if (content !== null) {
            removeElement(this.element.id + '_Annotation_' + annotationIndex);
            annotation.content = content;
            annotation.axisValue = !isNullOrUndefined(axisValue) ? axisValue : annotation.axisValue;
            this.annotationsModule.createAnnotationTemplate(element, annotationIndex);
            if (!isNullOrUndefined(annotation.axisIndex)) {
                const axis = this.axes[annotation.axisIndex];
                const range = axis.visibleRange;
                if (!elementExist && annotation.axisValue >= range.min && annotation.axisValue <= range.max) {
                    element.appendChild(getElement(this.element.id + '_Annotation_' + annotationIndex));
                }
            }
            else if (!elementExist) {
                element.appendChild(getElement(this.element.id + '_Annotation_' + annotationIndex));
            }
        }
    }
    /**
     * To provide the array of modules needed for control rendering
     *
     * @return {ModuleDeclaration[]}
     * @private
     */
    requiredModules() {
        const modules = [];
        let annotationEnable = false;
        this.annotations.map((annotation, index) => {
            annotationEnable = annotation.content != null;
        });
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this, GaugeTooltip]
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this]
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this]
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this]
            });
        }
        modules.push({
            member: 'Gradient',
            args: [this, Gradient]
        });
        return modules;
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    getPersistData() {
        const keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    }
    /**
     * Get component name
     */
    getModuleName() {
        return 'lineargauge';
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        let renderer = false;
        let refreshBounds = false;
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'height':
                case 'width':
                case 'margin':
                    this.createSvg();
                    refreshBounds = true;
                    break;
                case 'title':
                    refreshBounds = (newProp.title === '' || oldProp.title === '');
                    renderer = !(newProp.title === '' || oldProp.title === '');
                    break;
                case 'titleStyle':
                    if (newProp.titleStyle && newProp.titleStyle.size) {
                        refreshBounds = true;
                    }
                    else {
                        renderer = true;
                    }
                    break;
                case 'border':
                    renderer = true;
                    break;
                case 'background':
                    renderer = true;
                    break;
                case 'container':
                case 'axes':
                case 'orientation':
                    refreshBounds = true;
                    break;
            }
        }
        if (!refreshBounds && renderer) {
            this.removeSvg();
            this.renderGaugeElements();
            this.renderAxisElements();
        }
        if (refreshBounds) {
            this.createSvg();
            this.renderGaugeElements();
            this.calculateBounds();
            this.renderAxisElements();
        }
    }
};
__decorate([
    Property(null)
], LinearGauge.prototype, "width", void 0);
__decorate([
    Property(true)
], LinearGauge.prototype, "allowMargin", void 0);
__decorate([
    Property(null)
], LinearGauge.prototype, "height", void 0);
__decorate([
    Property('Vertical')
], LinearGauge.prototype, "orientation", void 0);
__decorate([
    Property('None')
], LinearGauge.prototype, "edgeLabelPlacement", void 0);
__decorate([
    Property(false)
], LinearGauge.prototype, "allowPrint", void 0);
__decorate([
    Property(false)
], LinearGauge.prototype, "allowImageExport", void 0);
__decorate([
    Property(false)
], LinearGauge.prototype, "allowPdfExport", void 0);
__decorate([
    Complex({}, Margin)
], LinearGauge.prototype, "margin", void 0);
__decorate([
    Complex({ color: '', width: 0 }, Border)
], LinearGauge.prototype, "border", void 0);
__decorate([
    Property(null)
], LinearGauge.prototype, "background", void 0);
__decorate([
    Property('')
], LinearGauge.prototype, "title", void 0);
__decorate([
    Complex({ size: '15px', color: null, fontStyle: null, fontWeight: null }, Font)
], LinearGauge.prototype, "titleStyle", void 0);
__decorate([
    Complex({}, Container)
], LinearGauge.prototype, "container", void 0);
__decorate([
    Collection([{}], Axis)
], LinearGauge.prototype, "axes", void 0);
__decorate([
    Complex({}, TooltipSettings)
], LinearGauge.prototype, "tooltip", void 0);
__decorate([
    Collection([{}], Annotation)
], LinearGauge.prototype, "annotations", void 0);
__decorate([
    Property([])
], LinearGauge.prototype, "rangePalettes", void 0);
__decorate([
    Property(false)
], LinearGauge.prototype, "useGroupingSeparator", void 0);
__decorate([
    Property(null)
], LinearGauge.prototype, "description", void 0);
__decorate([
    Property(1)
], LinearGauge.prototype, "tabIndex", void 0);
__decorate([
    Property(null)
], LinearGauge.prototype, "format", void 0);
__decorate([
    Property('Material')
], LinearGauge.prototype, "theme", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "loaded", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "load", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "animationComplete", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "axisLabelRender", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "dragStart", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "dragMove", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "dragEnd", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "annotationRender", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "tooltipRender", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "gaugeMouseMove", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "gaugeMouseLeave", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "gaugeMouseDown", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "gaugeMouseUp", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "valueChange", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "resized", void 0);
__decorate([
    Event()
], LinearGauge.prototype, "beforePrint", void 0);
LinearGauge = __decorate([
    NotifyPropertyChanges
], LinearGauge);

/* eslint-disable valid-jsdoc */
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
class Print {
    /**
     * Constructor for gauge
     *
     * @param control
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.control = control;
    }
    /**
     * To print the gauge
     *
     * @param elements
     * @private
     */
    print(elements) {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        const argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger('beforePrint', argsData, (beforePrintArgs) => {
            if (!argsData.cancel) {
                print(argsData.htmlContent, this.printWindow);
            }
        });
    }
    /**
     * To get the html string of the gauge
     *
     * @param elements
     * @private
     */
    getHTMLContent(elements) {
        const div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach((value) => {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(this.control.element.cloneNode(true));
        }
        return div;
    }
    /**
     * Get module name.
     */
    getModuleName() {
        return 'Print';
    }
    /**
     * To destroy the print.
     *
     * @return {void}
     * @private
     */
    destroy(control) {
        /**
         * Destroy method performed here
         */
    }
}

/* eslint-disable valid-jsdoc */
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
class ImageExport {
    /**
     * Constructor for gauge
     *
     * @param control
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.control = control;
    }
    /**
     * To export the file as image/svg format
     *
     * @param type
     * @param fileName
     * @private
     */
    export(type, fileName, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const promise = new Promise((resolve, reject) => {
            const element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': this.control.availableSize.width.toString(),
                    'height': this.control.availableSize.height.toString()
                }
            });
            const isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            const svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                this.control.svgObject.outerHTML +
                '</svg>';
            const url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(this.control.svgObject)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    triggerDownload(fileName, type, url, isDownload);
                }
                else {
                    resolve(null);
                }
            }
            else {
                const image = new Image();
                const context = element.getContext('2d');
                image.onload = (() => {
                    context.drawImage(image, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (allowDownload) {
                        triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                    }
                    else {
                        if (type === 'JPEG') {
                            resolve(element.toDataURL('image/jpeg'));
                        }
                        else if (type === 'PNG') {
                            resolve(element.toDataURL('image/png'));
                        }
                    }
                });
                image.src = url;
            }
        });
        return promise;
    }
    /**
     * Get module name.
     */
    getModuleName() {
        return 'ImageExport';
    }
    /**
     * To destroy the ImageExport.
     *
     * @return {void}
     * @private
     */
    destroy(control) {
        /**
         * Destroy method performed here
         */
    }
}

/* eslint-disable valid-jsdoc */
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
class PdfExport {
    /**
     * Constructor for gauge
     *
     * @param control
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.control = control;
    }
    /**
     * To export the file as pdf format
     *
     * @param type
     * @param fileName
     * @private
     */
    export(type, fileName, orientation, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const promise = new Promise((resolve, reject) => {
            const canvasElement = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': this.control.availableSize.width.toString(),
                    'height': this.control.availableSize.height.toString()
                }
            });
            orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
            const svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                this.control.svgObject.outerHTML +
                '</svg>';
            const exportElement = this.control.svgObject.cloneNode(true);
            const backgroundElement = exportElement.childNodes[0];
            const backgroundColor = backgroundElement.getAttribute('fill');
            if ((this.control.theme === 'Tailwind' || this.control.theme === 'TailwindDark' || this.control.theme === 'Bootstrap5' || this.control.theme === 'Bootstrap5Dark'
                || this.control.theme === 'Fluent' || this.control.theme === 'FluentDark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            const url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            const image = new Image();
            const context = canvasElement.getContext('2d');
            image.onload = (() => {
                context.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                const document = new PdfDocument();
                let imageString = canvasElement.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                document.pageSettings.orientation = orientation;
                imageString = imageString.slice(imageString.indexOf(',') + 1);
                document.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, (this.control.availableSize.width - 60), this.control.availableSize.height);
                if (allowDownload) {
                    document.save(fileName + '.pdf');
                    document.destroy();
                }
                else {
                    resolve(null);
                }
            });
            image.src = url;
        });
        return promise;
    }
    /**
     * Get module name.
     */
    getModuleName() {
        return 'PdfExport';
    }
    /**
     * To destroy the PdfExport.
     *
     * @return {void}
     * @private
     */
    destroy(control) {
        /**
         * Destroy method performed here
         */
    }
}

/**
 * Linear gauge component exported items
 */

/**
 * LinearGauge component exported.
 */

export { LinearGauge, Font, Margin, Border, Annotation, Container, RangeTooltip, TooltipSettings, Line, Label, Range, Tick, Pointer, Axis, stringToNumber, stringToNumberSize, measureText, textTrim, withInRange, convertPixelToValue, getPathToRect, getElement, removeElement, isPointerDrag, valueToCoefficient, getFontStyle, textFormatter, formatValue, getLabelFormat, getTemplateFunction, getElementOffset, triggerDownload, VisibleRange, GaugeLocation, Size, Rect, CustomizeOption, PathOption, RectOption, TextOption, VisibleLabels, Align, textElement, calculateNiceInterval, getActualDesiredIntervalsCount, getPointer, getRangeColor, getMousePosition, getRangePalette, calculateShapes, getBox, getExtraWidth, Annotations, GaugeTooltip, Print, ImageExport, PdfExport, ColorStop, GradientPosition, LinearGradient, RadialGradient, Gradient };
//# sourceMappingURL=ej2-lineargauge.es2015.js.map
