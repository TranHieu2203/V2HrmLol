import { Ajax, Browser, ChildProperty, Collection, Complex, Component, Event, EventHandler, Internationalization, NotifyPropertyChanges, Property, compile, createElement, extend, isNullOrUndefined, merge, print, remove } from '@syncfusion/ej2-base';
import { SvgRenderer, Tooltip } from '@syncfusion/ej2-svg-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { PdfBitmap, PdfDocument, PdfPageOrientation } from '@syncfusion/ej2-pdf-export';

/**
 * TreeMap constants doc
 */
/**
 * Triggers when the treemap is on load.
 *
 * @private
 */
const load = 'load';
/**
 * Triggers after treemap rendered.
 *
 * @private
 */
const loaded = 'loaded';
/**
 * Trigger before call the print method.
 *
 * @private
 */
const beforePrint = 'beforePrint';
/**
 * Trigger before each treemap item rendered.
 *
 * @private
 */
const itemRendering = 'itemRendering';
/**
 * Trigger after click on treemap item.
 *
 * @private
 */
const drillStart = 'drillStart';
/**
 * Trigger after drill start event completed.
 *
 * @private
 */
const drillEnd = 'drillEnd';
/**
 * Trigger after select the treemap item.
 *
 * @private
 */
const itemSelected = 'itemSelected';
/**
 * Trigger after hover on the treemap item.
 *
 * @private
 */
const itemHighlight = 'itemHighlight';
/**
 * Trigger after mouse hover on the treemap item.
 *
 * @private
 */
const tooltipRendering = 'tooltipRendering';
/**
 * Trigger after click on the treemap item.
 *
 * @private
 */
const itemClick = 'itemClick';
/**
 * Trigger after mouse hover on the treemap item.
 *
 * @private
 */
const itemMove = 'itemMove';
/**
 * Trigger after click on the treemap item.
 *
 * @private
 */
const click = 'click';
/**
 * Trigger after double click on the treemap item.
 *
 * @private
 */
const doubleClick = 'doubleClick';
/**
 * Trigger after right click on the treemap item.
 *
 * @private
 */
const rightClick = 'rightClick';
/**
 * Trigger after mouse hover on the treemap item.
 *
 * @private
 */
const mouseMove = 'mouseMove';
/**
 * Trigger before each treemap item.
 *
 * @private
 */
const legendItemRendering = 'legendItemRendering';
/**
 * Trigger before legend items.
 *
 * @private
 */
const legendRendering = 'legendRendering';
/**
 * Trigger after resize the treemap.
 *
 * @private
 */
const resize = 'resize';
/**
 * Define the font family in treemap component.
 *
 * @private
 */
const defaultFont = 'Roboto, Segoe UI, Noto, Sans-serif';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Maps base doc
 */
/**
 * Sets and gets the options for customizing the color and width of the border in treemap component.
 */
class Border extends ChildProperty {
}
__decorate$1([
    Property('#808080')
], Border.prototype, "color", void 0);
__decorate$1([
    Property(0)
], Border.prototype, "width", void 0);
/**
 * Sets and gets the margin for the treemap component.
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
 * Sets and gets the options to customize the style of the text contents in the treemap component.
 */
class Font extends ChildProperty {
}
__decorate$1([
    Property(null)
], Font.prototype, "size", void 0);
__decorate$1([
    Property(null)
], Font.prototype, "color", void 0);
__decorate$1([
    Property(defaultFont)
], Font.prototype, "fontFamily", void 0);
__decorate$1([
    Property('Normal')
], Font.prototype, "fontWeight", void 0);
__decorate$1([
    Property('Normal')
], Font.prototype, "fontStyle", void 0);
__decorate$1([
    Property(1)
], Font.prototype, "opacity", void 0);
/**
 * Sets and gets the options for customizing the common title of the treemap component.
 */
class CommonTitleSettings extends ChildProperty {
}
__decorate$1([
    Property('')
], CommonTitleSettings.prototype, "text", void 0);
__decorate$1([
    Property('')
], CommonTitleSettings.prototype, "description", void 0);
/**
 * Sets and gets the options for customizing the subtitle of the treemap component.
 */
class SubTitleSettings extends CommonTitleSettings {
}
__decorate$1([
    Complex({ fontFamily: null }, Font)
], SubTitleSettings.prototype, "textStyle", void 0);
__decorate$1([
    Property('Center')
], SubTitleSettings.prototype, "alignment", void 0);
/**
 * Sets and gets the options for customizing the title of the treemap component.
 */
class TitleSettings extends CommonTitleSettings {
}
__decorate$1([
    Complex({ fontFamily: null }, Font)
], TitleSettings.prototype, "textStyle", void 0);
__decorate$1([
    Property('Center')
], TitleSettings.prototype, "alignment", void 0);
__decorate$1([
    Complex({}, SubTitleSettings)
], TitleSettings.prototype, "subtitleSettings", void 0);
/**
 * Sets and gets the options to customize the color-mapping in treemap component.
 */
class ColorMapping extends ChildProperty {
}
__decorate$1([
    Property(null)
], ColorMapping.prototype, "from", void 0);
__decorate$1([
    Property(null)
], ColorMapping.prototype, "to", void 0);
__decorate$1([
    Property(null)
], ColorMapping.prototype, "color", void 0);
__decorate$1([
    Property(null)
], ColorMapping.prototype, "label", void 0);
__decorate$1([
    Property(null)
], ColorMapping.prototype, "value", void 0);
__decorate$1([
    Property(null)
], ColorMapping.prototype, "minOpacity", void 0);
__decorate$1([
    Property(null)
], ColorMapping.prototype, "maxOpacity", void 0);
__decorate$1([
    Property(true)
], ColorMapping.prototype, "showLegend", void 0);
/**
 * Sets and gets the options for customizing the legend of the treemap component.
 */
class LegendSettings extends ChildProperty {
}
__decorate$1([
    Property(false)
], LegendSettings.prototype, "visible", void 0);
__decorate$1([
    Property('Default')
], LegendSettings.prototype, "mode", void 0);
__decorate$1([
    Property('transparent')
], LegendSettings.prototype, "background", void 0);
__decorate$1([
    Property('Circle')
], LegendSettings.prototype, "shape", void 0);
__decorate$1([
    Property('')
], LegendSettings.prototype, "width", void 0);
__decorate$1([
    Property('')
], LegendSettings.prototype, "height", void 0);
__decorate$1([
    Complex({ fontFamily: null }, Font)
], LegendSettings.prototype, "textStyle", void 0);
__decorate$1([
    Property(null)
], LegendSettings.prototype, "fill", void 0);
__decorate$1([
    Property(1)
], LegendSettings.prototype, "opacity", void 0);
__decorate$1([
    Property(15)
], LegendSettings.prototype, "shapeWidth", void 0);
__decorate$1([
    Property(15)
], LegendSettings.prototype, "shapeHeight", void 0);
__decorate$1([
    Property(10)
], LegendSettings.prototype, "shapePadding", void 0);
__decorate$1([
    Property(null)
], LegendSettings.prototype, "imageUrl", void 0);
__decorate$1([
    Complex({ color: '#000000', width: 0 }, Border)
], LegendSettings.prototype, "border", void 0);
__decorate$1([
    Complex({ color: '#000000', width: 0 }, Border)
], LegendSettings.prototype, "shapeBorder", void 0);
__decorate$1([
    Complex({}, CommonTitleSettings)
], LegendSettings.prototype, "title", void 0);
__decorate$1([
    Complex({ size: '14px' }, Font)
], LegendSettings.prototype, "titleStyle", void 0);
__decorate$1([
    Property('Bottom')
], LegendSettings.prototype, "position", void 0);
__decorate$1([
    Property('None')
], LegendSettings.prototype, "orientation", void 0);
__decorate$1([
    Property(false)
], LegendSettings.prototype, "invertedPointer", void 0);
__decorate$1([
    Property('After')
], LegendSettings.prototype, "labelPosition", void 0);
__decorate$1([
    Property('None')
], LegendSettings.prototype, "labelDisplayMode", void 0);
__decorate$1([
    Property('Center')
], LegendSettings.prototype, "alignment", void 0);
__decorate$1([
    Property({ x: 0, y: 0 })
], LegendSettings.prototype, "location", void 0);
__decorate$1([
    Property(null)
], LegendSettings.prototype, "showLegendPath", void 0);
__decorate$1([
    Property(null)
], LegendSettings.prototype, "valuePath", void 0);
__decorate$1([
    Property(false)
], LegendSettings.prototype, "removeDuplicateLegend", void 0);
/**
 * Sets and gets the settings for drill to visualize the treemap rendered in the initial state.
 */
class InitialDrillSettings extends ChildProperty {
}
__decorate$1([
    Property(null)
], InitialDrillSettings.prototype, "groupIndex", void 0);
__decorate$1([
    Property(null)
], InitialDrillSettings.prototype, "groupName", void 0);
/**
 * Sets and gets the options for customizing the leaf item of the treemap component.
 */
class LeafItemSettings extends ChildProperty {
}
__decorate$1([
    Property(null)
], LeafItemSettings.prototype, "fill", void 0);
__decorate$1([
    Property(false)
], LeafItemSettings.prototype, "autoFill", void 0);
__decorate$1([
    Complex({}, Border)
], LeafItemSettings.prototype, "border", void 0);
__decorate$1([
    Property(0)
], LeafItemSettings.prototype, "gap", void 0);
__decorate$1([
    Property(10)
], LeafItemSettings.prototype, "padding", void 0);
__decorate$1([
    Property(1)
], LeafItemSettings.prototype, "opacity", void 0);
__decorate$1([
    Property(true)
], LeafItemSettings.prototype, "showLabels", void 0);
__decorate$1([
    Property(null)
], LeafItemSettings.prototype, "labelPath", void 0);
__decorate$1([
    Property(null)
], LeafItemSettings.prototype, "labelFormat", void 0);
__decorate$1([
    Property('TopLeft')
], LeafItemSettings.prototype, "labelPosition", void 0);
__decorate$1([
    Complex({ color: null, size: '12px' }, Font)
], LeafItemSettings.prototype, "labelStyle", void 0);
__decorate$1([
    Property(null)
], LeafItemSettings.prototype, "labelTemplate", void 0);
__decorate$1([
    Property('Center')
], LeafItemSettings.prototype, "templatePosition", void 0);
__decorate$1([
    Property('Trim')
], LeafItemSettings.prototype, "interSectAction", void 0);
__decorate$1([
    Collection([], ColorMapping)
], LeafItemSettings.prototype, "colorMapping", void 0);
/**
 * Sets and gets the options for customizing the tooltip of the treemap component.
 */
class TooltipSettings extends ChildProperty {
}
__decorate$1([
    Property(false)
], TooltipSettings.prototype, "visible", void 0);
__decorate$1([
    Property('')
], TooltipSettings.prototype, "template", void 0);
__decorate$1([
    Property(null)
], TooltipSettings.prototype, "format", void 0);
__decorate$1([
    Property(null)
], TooltipSettings.prototype, "fill", void 0);
__decorate$1([
    Property(0.75)
], TooltipSettings.prototype, "opacity", void 0);
__decorate$1([
    Property(['Circle'])
], TooltipSettings.prototype, "markerShapes", void 0);
__decorate$1([
    Complex({}, Border)
], TooltipSettings.prototype, "border", void 0);
__decorate$1([
    Complex({ fontFamily: defaultFont, size: '13px' }, Font)
], TooltipSettings.prototype, "textStyle", void 0);
/**
 * Sets and gets the options for customizing the selection of the leaf items in treemap component.
 */
class SelectionSettings extends ChildProperty {
}
__decorate$1([
    Property(false)
], SelectionSettings.prototype, "enable", void 0);
__decorate$1([
    Property(null)
], SelectionSettings.prototype, "fill", void 0);
__decorate$1([
    Property('0.5')
], SelectionSettings.prototype, "opacity", void 0);
__decorate$1([
    Complex({}, Border)
], SelectionSettings.prototype, "border", void 0);
__decorate$1([
    Property('Item')
], SelectionSettings.prototype, "mode", void 0);
/**
 * Sets and gets the options for customizing the highlighting of the treemap item,
 * when the mouse hover is performed in it.
 */
class HighlightSettings extends ChildProperty {
}
__decorate$1([
    Property(false)
], HighlightSettings.prototype, "enable", void 0);
__decorate$1([
    Property('#808080')
], HighlightSettings.prototype, "fill", void 0);
__decorate$1([
    Property('0.5')
], HighlightSettings.prototype, "opacity", void 0);
__decorate$1([
    Complex({}, Border)
], HighlightSettings.prototype, "border", void 0);
__decorate$1([
    Property('Item')
], HighlightSettings.prototype, "mode", void 0);
/**
 * Sets and gets the options for customizing the levels of the treemap component.
 */
class LevelSettings extends ChildProperty {
}
__decorate$1([
    Property(null)
], LevelSettings.prototype, "groupPath", void 0);
__decorate$1([
    Property(0)
], LevelSettings.prototype, "groupGap", void 0);
__decorate$1([
    Property(10)
], LevelSettings.prototype, "groupPadding", void 0);
__decorate$1([
    Complex({}, Border)
], LevelSettings.prototype, "border", void 0);
__decorate$1([
    Property(null)
], LevelSettings.prototype, "fill", void 0);
__decorate$1([
    Property(false)
], LevelSettings.prototype, "autoFill", void 0);
__decorate$1([
    Property(1)
], LevelSettings.prototype, "opacity", void 0);
__decorate$1([
    Property(true)
], LevelSettings.prototype, "showHeader", void 0);
__decorate$1([
    Property(20)
], LevelSettings.prototype, "headerHeight", void 0);
__decorate$1([
    Property(null)
], LevelSettings.prototype, "headerTemplate", void 0);
__decorate$1([
    Property(null)
], LevelSettings.prototype, "headerFormat", void 0);
__decorate$1([
    Property('Near')
], LevelSettings.prototype, "headerAlignment", void 0);
__decorate$1([
    Complex({ color: null, size: '13px' }, Font)
], LevelSettings.prototype, "headerStyle", void 0);
__decorate$1([
    Property('TopLeft')
], LevelSettings.prototype, "templatePosition", void 0);
__decorate$1([
    Collection([], ColorMapping)
], LevelSettings.prototype, "colorMapping", void 0);

/**
 * Create the class for size
 */
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Internal use of type rect
 *
 * @private
 */
class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
/**
 * Internal use of rectangle options
 *
 * @private
 */
class RectOption {
    constructor(id, fill, border, opacity, rect, dashArray) {
        this.y = rect.y;
        this.x = rect.x;
        this.height = rect.height;
        this.width = rect.width;
        this.id = id;
        this.fill = fill;
        this.opacity = opacity;
        this.stroke = border.color;
        this['stroke-width'] = border.width;
        this['stroke-dasharray'] = dashArray;
    }
}
class PathOption {
    constructor(id, fill, width, color, opacity, dashArray, d) {
        this.id = id;
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
}
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text.
 * @param  {FontModel} font - Specifies the font.
 * @param  {string} id - Specifies the id.
 * @returns {Size} - Returns the size.
 * @private
 */
function measureText(text, font) {
    let measureObject = document.getElementById('treeMapMeasureText');
    if (measureObject === null) {
        measureObject = createElement('text', { id: 'treeMapMeasureText' });
        document.body.appendChild(measureObject);
    }
    measureObject.innerHTML = text;
    measureObject.style.position = 'absolute';
    measureObject.style.fontSize = font.size;
    measureObject.style.fontWeight = font.fontWeight;
    measureObject.style.fontStyle = font.fontStyle;
    measureObject.style.fontFamily = font.fontFamily;
    measureObject.style.visibility = 'hidden';
    measureObject.style.top = '-100';
    measureObject.style.left = '0';
    measureObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    measureObject.style.lineHeight = 'normal';
    return new Size(measureObject.clientWidth, measureObject.clientHeight);
}
/**
 * Internal use of text options
 *
 * @private
 */
class TextOption {
    constructor(id, x, y, anchor, text, transform = '', baseLine, connectorText) {
        this.transform = '';
        this.baseLine = 'auto';
        this.id = id;
        this.text = text;
        this.transform = transform;
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.baseLine = baseLine;
        this.connectorText = connectorText;
    }
}
/**
 * Trim the title text
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @returns {string} - Returns the string
 * @private
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
/**
 * Map internal class for Point
 */
class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Method to calculate x position of title
 */
function findPosition(location, alignment, textSize, type) {
    let x;
    switch (alignment) {
        case 'Near':
            x = location.x;
            break;
        case 'Center':
            x = (type === 'title') ? (location.width / 2 - textSize.width / 2) :
                ((location.x + (location.width / 2)) - textSize.width / 2);
            break;
        case 'Far':
            x = (type === 'title') ? (location.width - location.y - textSize.width) :
                ((location.x + location.width) - textSize.width);
            break;
    }
    const y = (type === 'title') ? location.y + (textSize.height / 2) : ((location.y + location.height / 2) + textSize.height / 2);
    return new Location(x, y);
}
function createTextStyle(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
renderer, renderOptions, text) {
    const htmlObject = renderer.createText(renderOptions, text);
    htmlObject.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
    htmlObject.style['user-select'] = 'none';
    htmlObject.style['-moz-user-select'] = 'none';
    htmlObject.style['-webkit-touch-callout'] = 'none';
    htmlObject.style['-webkit-user-select'] = 'none';
    htmlObject.style['-khtml-user-select'] = 'none';
    htmlObject.style['-ms-user-select'] = 'none';
    htmlObject.style['-o-user-select'] = 'none';
    return htmlObject;
}
/**
 * Internal rendering of text
 *
 * @param {TextOption} options - Specifies the text option
 * @param {FontModel} font - Specifies the font model
 * @param {string} color - Specifies the color
 * @param {HTMLElement | Element} parent - Specifes the html element
 * @param {boolean} isMinus - Specifies the boolean value
 * @returns {Element} - Returns the element
 * @private
 */
function renderTextElement(options, font, color, parent, isMinus = false) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderOptions = {
        'font-size': font.size,
        'font-style': font.fontStyle,
        'font-family': font.fontFamily,
        'font-weight': font.fontWeight,
        'text-anchor': options.anchor,
        'transform': options.transform,
        'opacity': font.opacity,
        'dominant-baseline': options.baseLine,
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color
    };
    const text = typeof options.text === 'string' ? options.text : isMinus ? options.text[options.text.length - 1] : options.text[0];
    let tspanElement;
    const renderer = new SvgRenderer('');
    let height;
    let htmlObject;
    const breadCrumbText = !isNullOrUndefined(text) && !isNullOrUndefined(options.connectorText) ?
        (text.search(options.connectorText[1]) >= 0) : false;
    if (breadCrumbText) {
        const drilledLabel = text;
        const spacing = 5;
        const drillLevelText = drilledLabel.split('#');
        for (let z = 0; z < drillLevelText.length; z++) {
            let drillText = (drillLevelText[z].search(options.connectorText) !== -1 && !isNullOrUndefined(options.connectorText)) ?
                options.connectorText : drillLevelText[z];
            renderOptions['id'] = options.id + '_' + z;
            htmlObject = createTextStyle(renderer, renderOptions, drillText);
            if (z % 2 === 0 && z !== 0) {
                const re = /\s+/g;
                drillText = drillText.replace(re, '&nbsp');
            }
            const size = measureText(drillText, font);
            renderOptions['x'] = z !== 0 ? renderOptions['x'] + size.width : renderOptions['x'] + size.width + spacing;
            parent.appendChild(htmlObject);
        }
    }
    else {
        htmlObject = createTextStyle(renderer, renderOptions, text);
        parent.appendChild(htmlObject);
    }
    if (typeof options.text !== 'string' && options.text.length > 1) {
        for (let i = 1, len = options.text.length; i < len; i++) {
            height = (measureText(options.text[i], font).height);
            tspanElement = renderer.createTSpan({
                'x': options.x, 'id': options.id,
                'y': (options.y) + (i * height)
            }, options.text[i]);
            htmlObject.appendChild(tspanElement);
        }
        parent.appendChild(htmlObject);
    }
    return htmlObject;
}
function setItemTemplateContent(targetId, targetElement, contentItemTemplate) {
    const itemSelect = targetId.split('_RectPath')[0];
    let itemTemplate;
    if (targetId.indexOf('_LabelTemplate') > -1) {
        itemTemplate = targetElement;
    }
    else {
        itemTemplate = document.querySelector('#' + itemSelect + '_LabelTemplate');
    }
    if (!isNullOrUndefined(itemTemplate)) {
        itemTemplate.innerHTML = contentItemTemplate;
    }
}
function getElement(id) {
    return document.getElementById(id);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function itemsToOrder(a, b) {
    return a['weight'] === b['weight'] ? 0 : a['weight'] < b['weight'] ? 1 : -1;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isContainsData(source, pathName, processData, treemap) {
    let isExist = false;
    let name = '';
    let path;
    const leaf = treemap.leafItemSettings;
    for (let i = 0; i < source.length; i++) {
        path = treemap.levels[i] ? treemap.levels[i].groupPath : leaf.labelPath ? leaf.labelPath : treemap.weightValuePath;
        const data = processData[path] || 'undefined';
        if (source[i] === data) {
            name += data + (i === source.length - 1 ? '' : '#');
            if (name === pathName) {
                isExist = true;
                break;
            }
        }
    }
    return isExist;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findChildren(data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let children;
    if (data) {
        const keys = Object.keys(data);
        children = {};
        for (let i = 0; i < keys.length; i++) {
            if (data[keys[i]] instanceof Array) {
                children['values'] = data[keys[i]];
                children['key'] = keys[i];
                break;
            }
        }
    }
    return children;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findHightLightItems(data, items, mode, treeMap) {
    if (mode === 'Child') {
        items.push(data['levelOrderName']);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children = findChildren(data)['values'];
        if (children && children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                if (items.indexOf(children[i]['levelOrderName']) === -1) {
                    items.push(children[i]['levelOrderName']);
                }
            }
            for (let j = 0; j < children.length; j++) {
                findHightLightItems(children[j], items, mode, treeMap);
            }
        }
    }
    else if (mode === 'Parent') {
        if (typeof data['levelOrderName'] === 'string' && items.indexOf(data['levelOrderName']) === -1) {
            items.push(data['levelOrderName']);
            findHightLightItems(data['parent'], items, mode, treeMap);
        }
    }
    else if (mode === 'All') {
        const parentName = data['levelOrderName'].split('#')[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let currentItem;
        for (let i = 0; i < treeMap.layout.renderItems.length; i++) {
            currentItem = treeMap.layout.renderItems[i];
            if ((currentItem['levelOrderName']).indexOf(parentName) > -1 && items.indexOf(currentItem['levelOrderName']) === -1) {
                items.push(currentItem['levelOrderName']);
            }
        }
    }
    else {
        items.push(data['levelOrderName']);
    }
    return items;
}
/**
 * Function to compile the template function for maps.
 *
 * @param {string} template - Specifies the template
 * @returns {Function} - Returns the template function
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTemplateFunction(template) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let templateFn = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
        if (document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
        }
    }
    catch (e) {
        templateFn = compile(template);
    }
    return templateFn;
}
/**
 * @private
 * @param {HTMLCollection} element - Specifies the element
 * @param {string} labelId - Specifies the label id
 * @param {Object} data - Specifies the data
 * @returns {HTMLElement} - Returns the element
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertElement(element, labelId, data) {
    const childElement = createElement('div', {
        id: labelId,
        styles: 'position: absolute;pointer-events: auto;'
    });
    let elementLength = element.length;
    while (elementLength > 0) {
        childElement.appendChild(element[0]);
        elementLength--;
    }
    let templateHtml = childElement.innerHTML;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        templateHtml = templateHtml.replace(new RegExp('{{:' + keys[i] + '}}', 'g'), data[keys[i].toString()]);
    }
    childElement.innerHTML = templateHtml;
    return childElement;
}
function findLabelLocation(rect, position, labelSize, type, treemap) {
    const location = new Location(0, 0);
    const padding = 5;
    const paddings = 2;
    const elementRect = treemap.element.getBoundingClientRect();
    const x = (type === 'Template') ? treemap.areaRect.x : 0;
    const y = (type === 'Template') ? treemap.areaRect.y : 0;
    location.x = (Math.abs(x - ((position.indexOf('Left') > -1) ? rect.x + padding : !(position.indexOf('Right') > -1) ?
        rect.x + ((rect.width / 2) - (labelSize.width / 2)) : (rect.x + rect.width) - labelSize.width))) - paddings;
    if (treemap.enableDrillDown && (treemap.renderDirection === 'BottomLeftTopRight'
        || treemap.renderDirection === 'BottomRightTopLeft')) {
        location.y = Math.abs((rect.y + rect.height) - labelSize.height + padding);
    }
    else {
        location.y = Math.abs(y - ((position.indexOf('Top') > -1) ? (type === 'Template' ? rect.y : rect.y + labelSize.height) :
            !(position.indexOf('Bottom') > -1) ? type === 'Template' ? (rect.y + ((rect.height / 2) - (labelSize.height / 2))) :
                (rect.y + (rect.height / 2) + labelSize.height / 4) : (rect.y + rect.height) - labelSize.height));
    }
    return location;
}
function measureElement(element, parentElement) {
    const size = new Size(0, 0);
    parentElement.appendChild(element);
    size.height = element.offsetHeight;
    size.width = element.offsetWidth;
    const measureElementId = document.getElementById(element.id);
    measureElementId.parentNode.removeChild(measureElementId);
    return size;
}
function getArea(rect) {
    return (rect.width - rect.x) * (rect.height - rect.y);
}
function getShortestEdge(input) {
    const container = convertToContainer(input);
    const width = container.width;
    const height = container.height;
    const result = Math.min(width, height);
    return result;
}
function convertToContainer(rect) {
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    const height = rect.height;
    return {
        x: x,
        y: y,
        width: width - x,
        height: height - y
    };
}
function convertToRect(container) {
    const xOffset = container.x;
    const yOffset = container.y;
    const width = container.width;
    const height = container.height;
    return {
        x: xOffset,
        y: yOffset,
        width: xOffset + width,
        height: yOffset + height
    };
}
function getMousePosition(pageX, pageY, element) {
    const elementRect = element.getBoundingClientRect();
    const pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    const pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    const clientTop = element.ownerDocument.documentElement.clientTop;
    const clientLeft = element.ownerDocument.documentElement.clientLeft;
    const positionX = elementRect.left + pageXOffset - clientLeft;
    const positionY = elementRect.top + pageYOffset - clientTop;
    return new Location((pageX - positionX), (pageY - positionY));
}
function colorMap(colorMapping, equalValue, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
value, weightValuePath) {
    let fill;
    const paths = [];
    let opacity;
    if (isNullOrUndefined(equalValue) && (isNullOrUndefined(value) && isNaN(value))) {
        return null;
    }
    for (let i = 0; i < colorMapping.length; i++) {
        let isEqualColor = false;
        const dataValue = value;
        if (!isNullOrUndefined(colorMapping[i].from) && !isNullOrUndefined(colorMapping[i].to)
            && !isNullOrUndefined(colorMapping[i].value)) {
            if ((value >= colorMapping[i].from && colorMapping[i].to >= value) && (colorMapping[i].value === equalValue)) {
                isEqualColor = true;
                if (Object.prototype.toString.call(colorMapping[i].color) === '[object Array]') {
                    fill = !isEqualColor ? colorCollections(colorMapping[i], dataValue) : colorMapping[i].color[0];
                }
                else {
                    fill = colorMapping[i].color;
                }
            }
        }
        else if ((!isNullOrUndefined(colorMapping[i].from) && !isNullOrUndefined(colorMapping[i].to))
            || !isNullOrUndefined((colorMapping[i].value))) {
            if ((value >= colorMapping[i].from && colorMapping[i].to >= value) || (colorMapping[i].value === equalValue)) {
                if (colorMapping[i].value === equalValue) {
                    isEqualColor = true;
                }
                if (Object.prototype.toString.call(colorMapping[i].color) === '[object Array]') {
                    fill = !isEqualColor ? colorCollections(colorMapping[i], dataValue) : colorMapping[i].color[0];
                }
                else {
                    fill = colorMapping[i].color;
                }
            }
        }
        if (((value >= colorMapping[i].from && value <= colorMapping[i].to) || (colorMapping[i].value === equalValue))
            && !isNullOrUndefined(colorMapping[i].minOpacity) && !isNullOrUndefined(colorMapping[i].maxOpacity) && fill) {
            opacity = deSaturationColor(weightValuePath, colorMapping[i], fill, value);
        }
        if ((fill === '' || isNullOrUndefined(fill))
            && isNullOrUndefined(colorMapping[i].from) && isNullOrUndefined(colorMapping[i].to)
            && isNullOrUndefined(colorMapping[i].minOpacity) && isNullOrUndefined(colorMapping[i].maxOpacity)
            && isNullOrUndefined(colorMapping[i].value)) {
            fill = (Object.prototype.toString.call(colorMapping[i].color) === '[object Array]') ?
                colorMapping[i].color[0] : colorMapping[i].color;
        }
        opacity = !isNullOrUndefined(opacity) ? opacity : '1';
        paths.push(fill);
    }
    for (let j = paths.length - 1; j >= 0; j--) {
        fill = paths[j];
        j = (fill) ? -1 : j;
    }
    return { fill: fill, opacity: opacity };
}
function deSaturationColor(weightValuePath, colorMapping, color, rangeValue) {
    let opacity = 1;
    if ((rangeValue >= colorMapping.from && rangeValue <= colorMapping.to)) {
        const ratio = (rangeValue - colorMapping.from) / (colorMapping.to - colorMapping.from);
        opacity = (ratio * (colorMapping.maxOpacity - colorMapping.minOpacity)) + colorMapping.minOpacity;
    }
    return opacity.toString();
}
function colorCollections(colorMap, value) {
    const gradientFill = getColorByValue(colorMap, value);
    return gradientFill;
}
function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function getColorByValue(colorMap, value) {
    let color = '';
    let rbg;
    if (Number(value) === colorMap.from) {
        color = colorMap.color[0];
    }
    else if (Number(value) === colorMap.to) {
        color = colorMap.color[colorMap.color.length - 1];
    }
    else {
        rbg = getGradientColor(Number(value), colorMap);
        color = rgbToHex(rbg.r, rbg.g, rbg.b);
    }
    return color;
}
function getGradientColor(value, colorMap) {
    const previousOffset = colorMap.from;
    const nextOffset = colorMap.to;
    let percent = 0;
    const full = nextOffset - previousOffset;
    let midColor;
    percent = (value - previousOffset) / full;
    let previousColor;
    let nextColor;
    if (colorMap.color.length <= 2) {
        previousColor = colorMap.color[0].charAt(0) === '#' ? colorMap.color[0] : colorNameToHex(colorMap.color[0]);
        nextColor = colorMap.color[colorMap.color.length - 1].charAt(0) === '#' ?
            colorMap.color[colorMap.color.length - 1] : colorNameToHex(colorMap.color[colorMap.color.length - 1]);
    }
    else {
        previousColor = colorMap.color[0].charAt(0) === '#' ? colorMap.color[0] : colorNameToHex(colorMap.color[0]);
        nextColor = colorMap.color[colorMap.color.length - 1].charAt(0) === '#' ?
            colorMap.color[colorMap.color.length - 1] : colorNameToHex(colorMap.color[colorMap.color.length - 1]);
        const a = full / (colorMap.color.length - 1);
        let b;
        let c;
        const length = colorMap.color.length - 1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const splitColorValueOffset = [];
        let splitColor = {};
        for (let j = 1; j < length; j++) {
            c = j * a;
            b = previousOffset + c;
            splitColor = { b: b, color: colorMap.color[j] };
            splitColorValueOffset.push(splitColor);
        }
        for (let i = 0; i < splitColorValueOffset.length; i++) {
            if (previousOffset <= value && value <= splitColorValueOffset[i]['b'] && i === 0) {
                midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                    splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                nextColor = midColor;
                percent = value < splitColorValueOffset[i]['b'] ? 1 - Math.abs((value - splitColorValueOffset[i]['b']) / a)
                    : (value - splitColorValueOffset[i]['b']) / a;
            }
            else if (splitColorValueOffset[i]['b'] <= value && value <= nextOffset && i === (splitColorValueOffset.length - 1)) {
                midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                    splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                previousColor = midColor;
                percent = value < splitColorValueOffset[i]['b'] ?
                    1 - Math.abs((value - splitColorValueOffset[i]['b']) / a) : (value - splitColorValueOffset[i]['b']) / a;
            }
            if (i !== splitColorValueOffset.length - 1 && i < splitColorValueOffset.length) {
                if (splitColorValueOffset[i]['b'] <= value && value <= splitColorValueOffset[i + 1]['b']) {
                    midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                    previousColor = midColor;
                    nextColor = splitColorValueOffset[i + 1]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i + 1]['color'] : colorNameToHex(splitColorValueOffset[i + 1]['color']);
                    percent = Math.abs((value - splitColorValueOffset[i + 1]['b'])) / a;
                }
            }
        }
    }
    return getPercentageColor(percent, previousColor, nextColor);
}
function getPercentageColor(percent, previous, next) {
    const nextColor = next.split('#')[1];
    const prevColor = previous.split('#')[1];
    const r = getPercentage(percent, parseInt(prevColor.substr(0, 2), 16), parseInt(nextColor.substr(0, 2), 16));
    const g = getPercentage(percent, parseInt(prevColor.substr(2, 2), 16), parseInt(nextColor.substr(2, 2), 16));
    const b = getPercentage(percent, parseInt(prevColor.substr(4, 2), 16), parseInt(nextColor.substr(4, 2), 16));
    return new ColorValue(r, g, b);
}
function getPercentage(percent, previous, next) {
    const full = next - previous;
    return Math.round((previous + (full * percent)));
}
function wordWrap(maximumWidth, dataLabel, font) {
    const textCollection = dataLabel.split(' ');
    let label = '';
    const labelCollection = [];
    let text;
    for (let i = 0, len = textCollection.length; i < len; i++) {
        text = textCollection[i];
        if (measureText(label.concat(text), font).width < maximumWidth) {
            label = label.concat((label === '' ? '' : ' ') + text);
        }
        else {
            if (label !== '') {
                labelCollection.push(textTrim(maximumWidth, label, font));
                label = text;
            }
            else {
                labelCollection.push(textTrim(maximumWidth, text, font));
                text = '';
            }
        }
        if (label && i === len - 1) {
            labelCollection.push(textTrim(maximumWidth, label, font));
        }
    }
    return labelCollection;
}
function textWrap(maxWidth, label, font) {
    const resultText = [];
    let currentLength = 0;
    let totalWidth = measureText(label, font).width;
    const totalLength = label.length;
    if (maxWidth >= totalWidth) {
        resultText.push(label);
        return resultText;
    }
    else {
        for (let i = label.length; i > currentLength; i--) {
            const sliceString = label.slice(currentLength, i);
            totalWidth = measureText(sliceString, font).width;
            if (totalWidth <= maxWidth) {
                resultText.push(sliceString);
                currentLength += sliceString.length;
                if (totalLength === currentLength) {
                    return resultText;
                }
                i = totalLength + 1;
            }
        }
    }
    return resultText;
}
/**
 * hide function
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {number} maxHeight - Specifies the maximum height
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @returns {string} - Returns the hideText
 */
function hide(maxWidth, maxHeight, text, font) {
    let hideText = text;
    const textSize = measureText(text, font);
    hideText = (textSize.width > maxWidth || textSize.height > maxHeight) ? ' ' : text;
    return hideText;
}
function orderByArea(a, b) {
    if (a['itemArea'] === b['itemArea']) {
        return 0;
    }
    else if (a['itemArea'] < b['itemArea']) {
        return 1;
    }
    return -1;
}
function maintainSelection(treemap, element, className) {
    const elementId = treemap.levelSelection;
    if (elementId) {
        for (let index = 0; index < elementId.length; index++) {
            if (element.getAttribute('id') === elementId[index]) {
                if (element.childElementCount > 0) {
                    element.children[0].setAttribute('class', className);
                    applyOptions(element.childNodes[0], {
                        border: treemap.selectionSettings.border, fill: treemap.selectionSettings.fill,
                        opacity: treemap.selectionSettings.opacity
                    });
                }
            }
            else {
                element.setAttribute('class', '');
            }
        }
    }
}
function legendMaintain(treemap, legendGroup) {
    const elementId = treemap.legendId;
    if (elementId) {
        for (let i = 0; i < elementId.length; i++) {
            for (let j = 0; j < legendGroup.childElementCount; j++) {
                if (legendGroup.childNodes[j]['id'] === elementId[i]) {
                    legendGroup.childNodes[j].setAttribute('fill', treemap.selectionSettings.fill);
                    legendGroup.childNodes[j].setAttribute('stroke', treemap.selectionSettings.border.color);
                    legendGroup.childNodes[j].setAttribute('stroke-width', (treemap.selectionSettings.border.width).toString());
                    legendGroup.childNodes[j].setAttribute('opacity', treemap.selectionSettings.opacity);
                }
            }
        }
    }
}
function removeClassNames(elements, type, treemap) {
    let element;
    let options = {};
    for (let j = 0; j < elements.length; j++) {
        element = isNullOrUndefined(elements[j].childNodes[0]) ? elements[j] :
            elements[j].childNodes[0];
        options = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])]['options'];
        applyOptions(element, options);
        elements[j].classList.remove(type);
        j -= 1;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyOptions(element, options) {
    element.setAttribute('opacity', options['opacity']);
    if (!isNullOrUndefined(options['fill'])) {
        element.setAttribute('fill', options['fill']);
    }
    element.setAttribute('stroke', options['border']['color']);
    element.setAttribute('stroke-width', options['border']['width']);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function textFormatter(format, data, treemap) {
    if (isNullOrUndefined(format)) {
        return null;
    }
    const keys = Object.keys(data);
    for (const key of keys) {
        format = format.split('${' + key + '}').join(formatValue(data[key], treemap).toString());
    }
    return format;
}
function formatValue(value, treemap) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let formatValue;
    let formatFunction;
    if (treemap.format && !isNaN(Number(value))) {
        formatFunction = treemap.intl.getNumberFormat({ format: treemap.format, useGrouping: treemap.useGroupingSeparator });
        formatValue = formatFunction(Number(value));
    }
    else {
        formatValue = value;
    }
    return formatValue ? formatValue : '';
}
/**
 * @private
 */
class ColorValue {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
/**
 * @param {ColorValue} value - Specfies the color value
 * @returns {string} - Returns the string
 * @private
 */
function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
/**
 * @param {number} value - Specifes the value
 * @returns {string} - Returns the string
 * @private */
function componentToHex(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/**
 * @param {string} hex - Specifies the hex value
 * @returns {ColorValue} - Returns the color value
 * @private
 */
function convertHexToColor(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/**
 * @param {string} color - Specifies the color
 * @returns {string} - Returns the string
 * @private
 */
function colorNameToHex(color) {
    color = color === 'transparent' ? 'white' : color;
    const element = document.getElementById('treeMapMeasureText');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    const exp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
    const isRGBValue = exp.exec(color);
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
}
/**
 * @param {Location} location - Specifies the location
 * @param {string} shape - Specifies the shape
 * @param {Size} size - Specifies the size
 * @param {string} url - Specifies the url
 * @param {PathOption} options - Specifies the options
 * @param {string} label - Specifies the label
 * @returns {Element} - Returns the element
 * @private
 */
function drawSymbol(location, shape, size, url, options, label) {
    const svgRenderer = new SvgRenderer('');
    const temp = renderLegendShape(location, size, shape, options, url);
    const htmlElement = svgRenderer['draw' + temp.functionName](temp.renderOption);
    htmlElement.setAttribute('aria-label', label);
    return htmlElement;
}
/**
 * @param {Location} location - Specifies the location
 * @param {Size} size - Specifies the size
 * @param {string} shape - Specifies the shape
 * @param {PathOption} options - Specifies the path option
 * @param {string} url - Specifies the string
 * @returns {IShapes} - Returns the shapes
 * @private
 */
function renderLegendShape(location, size, shape, options, url) {
    let renderPath;
    let functionName = 'Path';
    const shapeWidth = size.width;
    const shapeHeight = size.height;
    const shapeX = location.x;
    const shapeY = location.y;
    const x = location.x + (-shapeWidth / 2);
    const y = location.y + (-shapeHeight / 2);
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': shapeWidth / 2, 'ry': shapeHeight / 2, 'cx': shapeX, 'cy': shapeY });
            break;
        case 'VerticalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' '
                + (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Diamond':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + shapeY + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Rectangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Triangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'InvertedTriangle':
            renderPath = 'M' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX - (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Pentagon':
            // eslint-disable-next-line no-case-declarations
            const eq = 72;
            // eslint-disable-next-line no-case-declarations
            let xValue;
            // eslint-disable-next-line no-case-declarations
            let yValue;
            for (let i = 0; i <= 5; i++) {
                xValue = (shapeWidth / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (shapeWidth / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    renderPath = 'M' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ';
                }
                else {
                    renderPath = renderPath.concat('L' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ');
                }
            }
            renderPath = renderPath.concat('Z');
            merge(options, { 'd': renderPath });
            break;
        case 'Star':
            renderPath = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
            merge(options, { 'd': renderPath });
            break;
        case 'Cross':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' ' +
                (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': shapeHeight, 'width': shapeWidth, x: x, y: y });
            break;
    }
    return { renderOption: options, functionName: functionName };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isParentItem(data, item) {
    let isParentItem = false;
    for (let j = 0; j < data.length; j++) {
        if (item['levelOrderName'] === data[j]['levelOrderName']) {
            isParentItem = true;
            break;
        }
    }
    return isParentItem;
}
/**
 * Ajax support for treemap
 */
class TreeMapAjax {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options, type, async, contentType, sendData) {
        this.dataOptions = options;
        this.type = type || 'GET';
        this.async = async || true;
        this.contentType = contentType;
        this.sendData = sendData;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeShape(collection, value) {
    if (collection.length > 0) {
        for (let i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item = collection[i];
            setColor(item['legendEle'], item['oldFill'], item['oldOpacity'], item['oldBorderColor'], item['oldBorderWidth']);
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeLegend(collection, value) {
    if (collection.length > 0) {
        for (let j = 0; j < collection.length; j++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item = collection[j];
            setColor(item['legendEle'], item['oldFill'], item['oldOpacity'], item['oldBorderColor'], item['oldBorderWidth']);
            const dataCount = item['ShapeCollection']['Elements'].length;
            for (let k = 0; k < dataCount; k++) {
                setColor(item['ShapeCollection']['Elements'][k], item['shapeOldFill'], item['shapeOldOpacity'], item['shapeOldBorderColor'], item['shapeOldBorderWidth']);
            }
        }
    }
}
function setColor(element, fill, opacity, borderColor, borderWidth) {
    element.setAttribute('fill', fill);
    element.setAttribute('opacity', opacity);
    element.setAttribute('stroke', borderColor);
    element.setAttribute('stroke-width', borderWidth);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeSelectionWithHighlight(collection, element, treemap) {
    removeShape(collection, 'highlight');
    element = [];
    removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLegendIndex(length, item, treemap) {
    let index;
    for (let i = 0; i < length; i++) {
        const dataLength = treemap.treeMapLegendModule.legendCollections[i]['legendData'].length;
        for (let j = 0; j < dataLength; j++) {
            if (treemap.treeMapLegendModule.legendCollections[i]['legendData'][j]['levelOrderName'] === item['levelOrderName']) {
                index = i;
                break;
            }
        }
    }
    return index;
}
function pushCollection(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
collection, index, number, legendElement, shapeElement, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
renderItems, legendCollection) {
    collection.push({
        legendEle: legendElement, oldFill: legendCollection[index]['legendFill'],
        oldOpacity: legendCollection[index]['opacity'], oldBorderColor: legendCollection[index]['borderColor'],
        oldBorderWidth: legendCollection[index]['borderWidth'],
        shapeElement: shapeElement, shapeOldFill: renderItems[number]['options']['fill'],
        shapeOldOpacity: renderItems[number]['options']['opacity'],
        shapeOldBorderColor: renderItems[number]['options']['border']['color'],
        shapeOldBorderWidth: renderItems[number]['options']['border']['width']
    });
}
/**
 * To trigger the download element
 *
 * @param {string} fileName - Specifies the file name
 * @param {ExportType} type - Specifies the type
 * @param {string} url - Specifies the url
 * @param {boolean} isDownload - Specifies the boolean value
 * @returns {void}
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
function removeElement(id) {
    const element = document.getElementById(id);
    return element ? remove(element) : null;
}

/**
 * To calculate and render the shape layer
 */
class LayoutPanel {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(treemap) {
        this.treemap = treemap;
    }
    processLayoutPanel() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data;
        let totalRect;
        if (LevelsData.levelsData && LevelsData.levelsData.length > 0) {
            data = (!isNullOrUndefined(this.treemap.initialDrillDown.groupIndex) &&
                !isNullOrUndefined(this.treemap.initialDrillDown.groupName)) &&
                (isNullOrUndefined(this.treemap.drilledItems) ? isNullOrUndefined(this.treemap.drilledItems)
                    : this.treemap.drilledItems.length === 0) ?
                this.getDrilldownData(LevelsData.levelsData[0], [])[0] : LevelsData.levelsData[0];
            totalRect = extend({}, this.treemap.areaRect, totalRect, false);
            if (!isNullOrUndefined(this.treemap.treeMapLegendModule) && !isNullOrUndefined(this.treemap.totalRect)) {
                if (this.treemap.legendSettings.position !== 'Float') {
                    totalRect = this.treemap.totalRect;
                }
            }
            if (!isNullOrUndefined(this.treemap.currentLevel) &&
                (isNullOrUndefined(this.treemap.drilledItems) ? !isNullOrUndefined(this.treemap.drilledItems)
                    : this.treemap.drilledItems.length !== 0)) {
                const count = this.treemap.drilledItems.length - 1;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const x = this.treemap.drilledItems[count]['data'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const y = {};
                y[this.treemap.drilledItems[count]['data']['groupName']] = [x];
                if (!isNullOrUndefined(this.treemap.initialDrillDown.groupIndex) && !this.treemap.enableBreadcrumb) {
                    this.treemap.currentLevel = this.treemap.drilledItems[count]['data']['groupIndex'];
                }
                this.calculateLayoutItems(y || LevelsData.levelsData[0], totalRect);
                this.renderLayoutItems(y || LevelsData.levelsData[0]);
            }
            else {
                if (!isNullOrUndefined(this.treemap.initialDrillDown.groupIndex) &&
                    (isNullOrUndefined(this.treemap.drilledItems) ? isNullOrUndefined(this.treemap.drilledItems)
                        : this.treemap.drilledItems.length === 0)) {
                    this.treemap.currentLevel = this.treemap.initialDrillDown.groupIndex;
                }
                this.calculateLayoutItems(data || LevelsData.levelsData[0], totalRect);
                this.renderLayoutItems(data || LevelsData.levelsData[0]);
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDrilldownData(data, drillData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const treemap = this.treemap;
        const newData = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const child = findChildren(data)['values'];
        if (child && child.length > 0 && drillData.length === 0) {
            for (let i = 0; i < child.length; i++) {
                if (child[i]['groupIndex'] === treemap.initialDrillDown.groupIndex &&
                    child[i]['name'] === treemap.initialDrillDown.groupName) {
                    child[i]['isDrilled'] = true;
                    newData[child[i]['groupName']] = [child[i]];
                    drillData.push(newData);
                }
            }
            for (let j = 0; j < child.length; j++) {
                this.getDrilldownData(child[j], drillData);
            }
        }
        return drillData;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calculateLayoutItems(data, rect) {
        this.renderItems = [];
        this.parentData = [];
        if (!isNullOrUndefined(this.treemap.weightValuePath)) {
            if (this.treemap.layoutType.indexOf('SliceAndDice') > -1) {
                this.computeSliceAndDiceDimensional(data, rect);
            }
            else {
                rect.height = rect.height + rect.y;
                rect.width = rect.width + rect.x;
                this.computeSquarifyDimensional(data, rect);
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    computeSliceAndDiceDimensional(data, coords) {
        const leafItem = this.treemap.leafItemSettings;
        let rect;
        const groups = this.treemap.levels;
        let groupIndex;
        let isLeafItem = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children = findChildren(data)['values'];
        let gap;
        let headerHeight;
        if (children && children.length > 0) {
            this.sliceAndDiceProcess(children, coords);
            if (this.treemap.levels.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    groupIndex = children[i]['groupIndex'];
                    isLeafItem = (groups.length === 0 || groupIndex === groups.length);
                    gap = isLeafItem ? leafItem.gap : groups[groupIndex].groupGap;
                    headerHeight = groups.length === 0 ? 0 : groups[groupIndex] ? groups[groupIndex].showHeader ?
                        groups[groupIndex].headerHeight : 0 : groups[groupIndex - 1].showHeader ? groups[groupIndex - 1].headerHeight : 0;
                    rect = children[i]['rect'];
                    rect = new Rect(rect.x + (gap / 2), rect.y + (headerHeight + (gap / 2)), rect.width - gap, Math.abs(rect.height - (gap + headerHeight)));
                    this.computeSliceAndDiceDimensional(children[i], rect);
                }
            }
        }
        return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sliceAndDiceProcess(processData, rect) {
        const parentArea = rect.height * rect.width;
        const levels = this.treemap.levels;
        let childValue;
        let alottedValue = 0;
        let totalWeight = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        processData.forEach((data) => { totalWeight += data['weight']; });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        processData.forEach((child) => {
            child['weightArea'] = parentArea * child['weight'] / totalWeight;
        });
        const isHorizontal = (this.treemap.layoutType === 'SliceAndDiceAuto') ? (rect.width > rect.height) :
            (this.treemap.layoutType === 'SliceAndDiceHorizontal');
        processData.sort(itemsToOrder);
        for (let i = 0; i < processData.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item = processData[i];
            item['isLeafItem'] = (levels.length === 0) || ((this.treemap.isHierarchicalData ||
                isNullOrUndefined(this.treemap.leafItemSettings.labelPath)) ?
                item['groupIndex'] === levels.length - 1 : item['groupIndex'] === this.treemap.levels.length);
            if (isHorizontal) {
                childValue = ((parentArea / totalWeight) * processData[i]['weight']) / rect.height;
                if (alottedValue <= rect.width) {
                    processData[i]['rect'] = new Rect(alottedValue + rect.x, rect.y, childValue, rect.height);
                }
            }
            else {
                childValue = ((parentArea / totalWeight) * processData[i]['weight']) / rect.width;
                if (alottedValue <= rect.height) {
                    processData[i]['rect'] = new Rect(rect.x, alottedValue + rect.y, rect.width, childValue);
                }
            }
            alottedValue += childValue;
            this.renderItems.push(processData[i]);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    computeSquarifyDimensional(data, coords) {
        const leaf = this.treemap.leafItemSettings;
        let rect;
        const levels = this.treemap.levels;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const child = findChildren(data)['values'];
        let index;
        let padding;
        let headerHeight;
        if (child && child.length > 0) {
            if (this.parentData.length === 0) {
                this.parentData = [];
                this.parentData.push(child);
            }
            this.calculateChildrenLayout(data, child, coords);
            if (this.treemap.levels.length > 0) {
                for (let i = 0; i < child.length; i++) {
                    item = child[i];
                    index = item['groupIndex'];
                    rect = item['rect'];
                    padding = (item['isLeafItem'] ? leaf.padding : levels[index].groupPadding) / 2;
                    headerHeight = this.treemap.isHierarchicalData ? index === 0 && item['isLeafItem'] ? 0 : levels[index] ?
                        levels[index].showHeader ? levels[index].headerHeight : 0 : 0 : (levels.length === 0) ? 0 : levels[index] ?
                        levels[index].showHeader ? levels[index].headerHeight : 0 : 0;
                    rect = new Rect(rect.x + padding, rect.y + (headerHeight + padding), rect.width - padding, rect.height - padding);
                    if (!item['isLeafItem'] && item['weight'] > 0) {
                        this.computeSquarifyDimensional(child[i], rect);
                    }
                }
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calculateChildrenLayout(parent, children, coords) {
        this.computeTotalArea(children, getArea(coords));
        children.sort(orderByArea);
        this.performRowsLayout(children, [], coords, []);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    performRowsLayout(data, currentRow, rect, stack) {
        const dataLength = data.length;
        if (dataLength === 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newCoordinates = this.getCoordinates(currentRow, rect);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newStack = stack.concat(newCoordinates);
            return newStack;
        }
        const width = getShortestEdge(rect);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nextDatum = data[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const restData = data.slice(1, dataLength);
        if (this.aspectRatio(currentRow, nextDatum, width)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newRow = currentRow.concat(nextDatum);
            return this.performRowsLayout(restData, newRow, rect, stack);
        }
        else {
            const currentRowLength = currentRow.length;
            let valueSum = 0;
            for (let i = 0; i < currentRowLength; i += 1) {
                valueSum += currentRow[i]['itemArea'];
            }
            const newContainer = this.cutArea(rect, valueSum);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newCoordinates = this.getCoordinates(currentRow, rect);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newStack = stack.concat(newCoordinates);
            return this.performRowsLayout(data, [], newContainer, newStack);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aspectRatio(currentRow, nextDatum, length) {
        if (currentRow.length === 0) {
            return true;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newRow = currentRow.concat(nextDatum);
            const currentMaxAspectRatio = this.findMaxAspectRatio(currentRow, length);
            const newMaxAspectRatio = this.findMaxAspectRatio(newRow, length);
            return (currentMaxAspectRatio >= newMaxAspectRatio);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findMaxAspectRatio(row, length) {
        const rowLength = row.length;
        let minArea = Infinity;
        let maxArea = -Infinity;
        let sumArea = 0;
        for (let i = 0; i < rowLength; i += 1) {
            const area = row[i]['itemArea'];
            if (area < minArea) {
                minArea = area;
            }
            if (area > maxArea) {
                maxArea = area;
            }
            sumArea += area;
        }
        const result = Math.max((Math.pow(length, 2)) * maxArea / (Math.pow(sumArea, 2)), (Math.pow(sumArea, 2)) /
            ((Math.pow(length, 2)) * minArea));
        return result;
    }
    cutArea(rect, area) {
        const newContainer = convertToContainer(rect);
        const width = newContainer.width;
        const height = newContainer.height;
        const xOffset = newContainer.x;
        const yOffset = newContainer.y;
        if (width >= height) {
            const areaWidth = area / height;
            const newWidth = width - areaWidth;
            const container = {
                x: xOffset + areaWidth,
                y: yOffset,
                width: newWidth,
                height: height
            };
            return convertToRect(container);
        }
        else {
            const areaHeight = area / width;
            const newHeight = height - areaHeight;
            const container = {
                x: xOffset,
                y: yOffset + areaHeight,
                width: width,
                height: newHeight
            };
            return convertToRect(container);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCoordinates(row, rect) {
        const container = convertToContainer(rect);
        const width = container.width;
        const height = container.height;
        const xOffset = container.x;
        const yOffset = container.y;
        const rowLength = row.length;
        const levels = this.treemap.levels;
        const leaf = this.treemap.leafItemSettings;
        let index;
        let valueSum = 0;
        for (let i = 0; i < rowLength; i += 1) {
            valueSum += row[i]['itemArea'];
        }
        const areaWidth = valueSum / height;
        const areaHeight = valueSum / width;
        let subXOffset = xOffset;
        let subYOffset = yOffset;
        let padding;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const coordinates = [];
        let isParent;
        let parentRect;
        for (let i = 0; i < rowLength; i += 1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item = row[i];
            index = item['groupIndex'];
            item['isLeafItem'] = (levels.length === 0) || (this.treemap.isHierarchicalData ? index === levels.length :
                isNullOrUndefined(leaf.labelPath) ? false : index === levels.length);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            isParent = isParentItem(this.parentData[0], item);
            parentRect = isParent ? this.treemap.areaRect : item['parent'].rect;
            padding = item['isLeafItem'] ? leaf.padding : levels[index].groupPadding;
            if (width >= height) {
                const y1 = subYOffset + item['itemArea'] / areaWidth;
                item['rect'] = {
                    x: subXOffset,
                    y: subYOffset,
                    width: subXOffset + areaWidth,
                    height: y1
                };
                subYOffset = y1;
            }
            else {
                const x1 = subXOffset + item['itemArea'] / areaHeight;
                item['rect'] = {
                    x: subXOffset,
                    y: subYOffset,
                    width: x1,
                    height: subYOffset + areaHeight
                };
                subXOffset = x1;
            }
            if (item['weight'] > 0 && (isParent || (Math.round(rect.y + (padding / 2)) <=
                Math.round(parentRect.y + (parentRect.height - parentRect.y)) && Math.round(rect.x + (padding / 2)) <=
                Math.round(parentRect.x + (parentRect.width - parentRect.x))))) {
                this.renderItems.push(item);
                coordinates.push(item);
            }
        }
        return coordinates;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    computeTotalArea(data, area) {
        const dataLength = data.length;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = [];
        for (let i = 0; i < dataLength; i += 1) {
            const dataLength = data.length;
            let dataSum = 0;
            for (let i = 0; i < dataLength; i += 1) {
                dataSum += data[i]['weight'];
            }
            const multiplier = area / dataSum;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let datum;
            for (let j = 0; j < dataLength; j++) {
                datum = data[j];
                datum['itemArea'] = datum['weight'] * multiplier;
                result.push(datum);
            }
        }
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDemandProcess(childItems) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let parentItem = {};
        let totalRect;
        parentItem = childItems[0]['parent'];
        this.treemap.currentLevel = parentItem['isDrilled'] ? parentItem['groupIndex'] : null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let parentItemGroupname = {};
        if (isNullOrUndefined(parentItem['groupName'])) {
            parentItemGroupname = parentItem;
        }
        else {
            parentItemGroupname[parentItem['groupName']] = [parentItem];
        }
        totalRect = extend({}, this.treemap.areaRect, totalRect, false);
        if (!isNullOrUndefined(this.treemap.treeMapLegendModule) && !isNullOrUndefined(this.treemap.totalRect)) {
            totalRect = this.treemap.totalRect;
        }
        const count = this.treemap.levels.length;
        for (let i = 0; i < count; i++) {
            const levelCount = childItems[0]['groupIndex'];
            if (count === levelCount) {
                this.treemap.levels[count] = this.treemap.levels[i];
            }
            else {
                this.treemap.levels.splice(count - 1, 1);
            }
        }
        this.calculateLayoutItems(parentItemGroupname, totalRect);
        this.renderLayoutItems(parentItemGroupname);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderLayoutItems(renderData) {
        let position;
        const treeMap = this.treemap;
        let colorMapping;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let txtVisible;
        let getItemColor;
        let eventArgs;
        this.renderer = treeMap.renderer;
        let pathOptions;
        const elementID = treeMap.element.id;
        let index;
        let templatePosition;
        const mode = treeMap.layoutType;
        let rect;
        let format;
        const interSectAction = this.treemap.leafItemSettings.interSectAction;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fill;
        let item;
        let renderText;
        let opacity;
        let rectPath = '';
        const secondaryEle = document.getElementById(treeMap.element.id + '_Secondary_Element');
        let groupId;
        let templateEle;
        let gap;
        let textStyle;
        const levels = treeMap.levels;
        this.layoutGroup = this.renderer.createGroup({ id: elementID + '_TreeMap_' + mode + '_Layout' });
        let itemGroup;
        let template;
        let border;
        const templateGroup = createElement('div', {
            id: treeMap.element.id + '_Label_Template_Group',
            className: 'template',
            styles: 'overflow: hidden; position: absolute;pointer-events: none;' +
                'top:' + treeMap.areaRect.y + 'px;' +
                'left:' + treeMap.areaRect.x + 'px;' +
                'height:' + treeMap.areaRect.height + 'px;' +
                'width:' + treeMap.areaRect.width + 'px;'
        });
        let isLeafItem = false;
        const leaf = treeMap.leafItemSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let childItems;
        let connectorText;
        for (let i = 0; i < this.renderItems.length; i++) {
            item = this.renderItems[i];
            index = item['groupIndex'];
            if (this.treemap.drillDownView && isNullOrUndefined(this.treemap.currentLevel)
                && index > 0 || this.treemap.drillDownView
                && index > (this.treemap.currentLevel + 1)) {
                continue;
            }
            rect = item['rect'];
            isLeafItem = item['isLeafItem'];
            groupId = elementID + '_Level_Index_' + index + '_Item_Index_' + i;
            itemGroup = this.renderer.createGroup({ id: groupId + '_Group' });
            gap = (isLeafItem ? leaf.gap : levels[index].groupGap) / 2;
            const treemapItemRect = this.treemap.totalRect ? convertToContainer(this.treemap.totalRect) : this.treemap.areaRect;
            if (treeMap.layoutType === 'Squarified') {
                rect.width = Math.abs(rect.x - rect.width) - gap;
                rect.height = Math.abs(rect.y - rect.height) - gap;
            }
            if (treeMap.renderDirection === 'TopRightBottomLeft') {
                rect.x = (treemapItemRect.x + treemapItemRect.width) - rect.width - Math.abs(treemapItemRect.x - rect.x);
            }
            else if (treeMap.renderDirection === 'BottomLeftTopRight') {
                rect.y = (treemapItemRect.y + treemapItemRect.height) - rect.height - Math.abs(treemapItemRect.y - rect.y);
            }
            else if (treeMap.renderDirection === 'BottomRightTopLeft') {
                rect.x = (treemapItemRect.x + treemapItemRect.width) - rect.width - Math.abs(treemapItemRect.x - rect.x);
                rect.y = (treemapItemRect.y + treemapItemRect.height) - rect.height - Math.abs(treemapItemRect.y - rect.y);
            }
            colorMapping = isLeafItem ? leaf.colorMapping : levels[index].colorMapping;
            getItemColor = this.getItemColor(isLeafItem, item);
            fill = getItemColor['fill'];
            opacity = getItemColor['opacity'];
            format = isLeafItem ? leaf.labelFormat : (levels[index]).headerFormat;
            let levelName;
            txtVisible = isLeafItem ? leaf.showLabels : (levels[index]).showHeader;
            if (index === this.treemap.currentLevel) {
                if (this.treemap.enableBreadcrumb) {
                    const re = /#/gi;
                    connectorText = '#' + this.treemap.breadcrumbConnector + '#';
                    levelName = item['levelOrderName'].replace(re, connectorText);
                    levelName = index !== 0 ? '#' + levelName : levelName;
                }
                else {
                    levelName = item['name'];
                }
            }
            else {
                if (this.treemap.enableBreadcrumb) {
                    item['isDrilled'] = false;
                }
                levelName = item['name'];
            }
            renderText = textFormatter(format, item['data'], this.treemap) || levelName || 'undefined';
            childItems = findChildren(item)['values'];
            renderText = !isLeafItem && childItems && childItems.length > 0 && this.treemap.enableDrillDown ?
                !item['isDrilled'] ? treeMap.enableRtl ? renderText + ' [+]' : '[+] ' + renderText :
                    treeMap.enableRtl ? renderText + ' [-]' : '[-] ' + renderText : renderText;
            textStyle = (isLeafItem ? leaf.labelStyle : levels[index].headerStyle);
            textStyle.fontFamily = this.treemap.themeStyle.labelFontFamily || textStyle.fontFamily;
            border = isLeafItem ? leaf.border : levels[index].border;
            position = !isLeafItem ? (levels[index].headerAlignment) === 'Near' ? 'TopLeft' : (levels[index].headerAlignment) === 'Center' ?
                'TopCenter' : 'TopRight' : leaf.labelPosition;
            templatePosition = isLeafItem ? leaf.templatePosition : levels[index].templatePosition;
            template = isLeafItem ? leaf.labelTemplate : levels[index].headerTemplate;
            item['options'] = { border: border, opacity: opacity, fill: fill };
            eventArgs = {
                cancel: false, name: itemRendering, treemap: this.treemap, text: renderText,
                currentItem: item, RenderItems: this.renderItems, options: item['options']
            };
            this.treemap.trigger(itemRendering, eventArgs, (observedArgs) => {
                if (!observedArgs.cancel) {
                    rectPath = ' M ' + rect.x + ' ' + rect.y + ' L ' + (rect.x + rect.width) + ' ' + rect.y +
                        ' L ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' L ' + rect.x + ' ' + (rect.y + rect.height) + 'z';
                    pathOptions = new PathOption(groupId + '_RectPath', fill, border.width, border.color, opacity, null, rectPath);
                    const path = this.renderer.drawPath(pathOptions);
                    itemGroup.appendChild(path);
                    if (txtVisible) {
                        if (eventArgs.text !== renderText) {
                            eventArgs.text = textFormatter(eventArgs.text, item['data'], this.treemap) || levelName;
                        }
                        this.renderItemText(eventArgs.text.toString(), itemGroup, textStyle, rect, interSectAction, groupId, fill, position, connectorText);
                    }
                    if (template) {
                        templateEle = this.renderTemplate(secondaryEle, groupId, rect, templatePosition, template, item, isLeafItem);
                        if (!isNullOrUndefined(templateEle)) {
                            templateGroup.appendChild(templateEle);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            this.treemap.renderReactTemplates();
                        }
                    }
                    itemGroup.setAttribute('aria-label', item['name']);
                    itemGroup.setAttribute('tabindex', (this.treemap.tabIndex + i + 2).toString());
                    maintainSelection(this.treemap, itemGroup, 'treeMapSelection');
                    this.layoutGroup.appendChild(itemGroup);
                }
            });
        }
        if (templateGroup.childNodes.length > 0) {
            secondaryEle.appendChild(templateGroup);
        }
        this.treemap.svgObject.appendChild(this.layoutGroup);
    }
    renderItemText(text, parentElement, textStyle, rect, interSectAction, groupId, fill, position, connectorText) {
        const secondaryEle = document.getElementById(this.treemap.element.id + '_Secondary_Element');
        const leaf = this.treemap.leafItemSettings;
        const padding = 5;
        let textSize;
        let textCollection = [];
        let customText;
        const tspanText = [];
        let height = 0;
        let textName;
        textCollection = ((text.indexOf('<br>')) !== -1) ? text.split('<br>') : null;
        customText = this.labelInterSectAction(rect, text, textStyle, interSectAction);
        textSize = measureText(textCollection && textCollection[0] || customText[0], textStyle);
        if (this.treemap.enableRtl) {
            const labelSize = measureText(text, textStyle);
            const drillSymbolCount = text.search('[+]') || text.search('[-]');
            if (rect.width < labelSize.width && drillSymbolCount > 0) {
                const label = text.substring(drillSymbolCount - 1, text.length);
                const drillSymbol = '[+]';
                const drillSymbolSize = measureText(drillSymbol, textStyle);
                customText['0'] = textTrim(rect.width - drillSymbolSize.width - padding, customText[0], textStyle) + label;
            }
        }
        const textLocation = findLabelLocation(rect, position, textSize, 'Text', this.treemap);
        if (!isNullOrUndefined(textCollection)) {
            const collection = [];
            let texts = null;
            const maxNumber = [];
            for (let i = 0; i < textCollection.length; i++) {
                texts = textTrim((rect.width - 5), textCollection[i], textStyle);
                textSize = measureText(texts, textStyle);
                height += textSize.height;
                maxNumber.push(textSize.width);
                collection.push(texts);
            }
            customText = collection;
            textSize.width = Math.max.apply(null, maxNumber);
            textSize.height = height;
        }
        if (interSectAction === 'WrapByWord' || interSectAction === 'Wrap' || interSectAction === 'Trim') {
            for (let j = 0; j < customText.length; j++) {
                textSize = measureText(customText[j], textStyle);
                height += textSize.height;
                if ((rect.height - padding) > height) {
                    tspanText.push(customText[j]);
                }
            }
            if (interSectAction === 'Wrap' && customText.length !== tspanText.length && tspanText.length) {
                const collectionLength = tspanText.length - 1;
                let stringText = tspanText[collectionLength];
                stringText = stringText.substring(0, (stringText.length - 1)) + '...';
                tspanText.splice(collectionLength);
                if (stringText !== '...') {
                    tspanText.push(stringText);
                }
            }
        }
        else {
            textName = customText;
            tspanText.push(textName);
        }
        const textOptions = new TextOption(groupId + '_Text', textLocation.x, textLocation.y, 'start', tspanText, '', '', connectorText);
        renderTextElement(textOptions, textStyle, textStyle.color || this.getSaturatedColor(fill), parentElement);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getItemColor(isLeafItem, item) {
        const treemap = this.treemap;
        let itemFill = isLeafItem ? treemap.leafItemSettings.fill : treemap.levels[item['groupIndex']].fill;
        let itemOpacity = isLeafItem ? treemap.leafItemSettings.opacity : treemap.levels[item['groupIndex']].opacity;
        if (!isNullOrUndefined(LevelsData.defaultLevelsData)) {
            if (LevelsData.defaultLevelsData.length > 0) {
                LevelsData.levelsData = LevelsData.defaultLevelsData;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parentData = findChildren(LevelsData.levelsData[0])['values'];
        const colorMapping = isLeafItem ? treemap.leafItemSettings.colorMapping :
            treemap.levels[item['groupIndex']].colorMapping;
        if (colorMapping.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const option = colorMap(colorMapping, item['data'][this.treemap.equalColorValuePath], item['data'][this.treemap.rangeColorValuePath], item['data'][this.treemap.weightValuePath]);
            itemFill = !isNullOrUndefined(option['fill']) ? option['fill'] : treemap.leafItemSettings.fill;
            itemOpacity = option['opacity'];
        }
        else {
            for (let i = 0; i < parentData.length; i++) {
                if (parentData[i]['levelOrderName'] === item['levelOrderName'].split('#')[0]) {
                    itemFill = !isNullOrUndefined(itemFill) ? itemFill : !isNullOrUndefined(treemap.colorValuePath) ?
                        parentData[i]['data'][treemap.colorValuePath] : treemap.palette.length > 0 ?
                        treemap.palette[i % treemap.palette.length] : '#808080';
                }
            }
        }
        return { fill: itemFill, opacity: itemOpacity };
    }
    /**
     * To find saturated color for datalabel
     *
     * @param {string} color - Specifies the color
     * @returns {string} - Returns the color
     */
    getSaturatedColor(color) {
        let saturatedColor = color;
        saturatedColor = (saturatedColor === 'transparent') ? window.getComputedStyle(document.body, null).backgroundColor : saturatedColor;
        const rgbValue = convertHexToColor(colorNameToHex(saturatedColor));
        const contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        return contrast >= 128 ? 'black' : 'white';
    }
    renderTemplate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    secondaryEle, groupId, rect, position, template, item, isLeafItem) {
        const templateId = isLeafItem ? groupId + '_LabelTemplate' : groupId + '_HeaderTemplate';
        const baseTemplateId = isLeafItem ? '_LabelTemplate' : '_HeaderTemplate';
        if (isNullOrUndefined(template['prototype'])) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const keys = Object.keys(item['data']);
            for (let i = 0; i < keys.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                template = template.replace(new RegExp('{{:' + keys[i] + '}}', 'g'), item['data'][keys[i].toString()]);
            }
        }
        let labelElement;
        if (!isNullOrUndefined(document.getElementById(this.treemap.element.id + '_Secondary_Element'))) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const templateFn = getTemplateFunction(template);
            const templateElement = templateFn(item['data'], this.treemap, template, this.treemap.element.id + baseTemplateId, false);
            labelElement = convertElement(templateElement, templateId, item['data']);
            const templateSize = measureElement(labelElement, secondaryEle);
            const templateLocation = findLabelLocation(rect, position, templateSize, 'Template', this.treemap);
            labelElement.style.left = templateLocation.x + 'px';
            labelElement.style.top = templateLocation.y + 'px';
        }
        return labelElement;
    }
    labelInterSectAction(rect, text, textStyle, alignment) {
        let textValue;
        const maxWidth = rect.width - 10;
        switch (alignment) {
            case 'Hide':
                textValue = [hide(maxWidth, rect.height, text, textStyle)];
                break;
            case 'Trim':
                textValue = [textTrim((maxWidth + 3), text, textStyle)];
                break;
            case 'WrapByWord':
                textValue = wordWrap(maxWidth, text, textStyle);
                break;
            case 'Wrap':
                textValue = textWrap(maxWidth, text, textStyle);
                break;
        }
        return textValue;
    }
}

/**
 * Maps Themes doc
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var Theme;
(function (Theme) {
    /**
     * @private
     */
    Theme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Medium',
        color: '#424242',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
})(Theme || (Theme = {}));
/**
 * To get the theme style based on treemap theme.
 *
 * @param {TreeMapTheme} theme Specifies the theme of the treemap control.
 * @returns {IThemeStyle} Returns the theme.
 * @private
 */
function getThemeStyle(theme) {
    let style;
    let color;
    switch (theme.toLowerCase()) {
        case 'materialdark':
            color = '#303030';
            break;
        case 'fabricdark':
            color = '#201F1F';
            break;
        case 'bootstrapdark':
            color = '#1A1A1A';
            break;
    }
    switch (theme.toLowerCase()) {
        case 'bootstrapdark':
        case 'fabricdark':
        case 'materialdark':
            style = {
                backgroundColor: color,
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                tooltipFillColor: '#363F4C',
                tooltipFontColor: '#ffffff',
                legendTitleColor: '#DADADA',
                legendTextColor: '#DADADA',
                fontSize: '15px',
                subtitleFontSize: '14px',
                legendFontSize: '13px',
                fontFamily: 'Roboto, Noto, Sans-serif'
            };
            break;
        case 'highcontrast':
            style = {
                backgroundColor: '#000000',
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                tooltipFillColor: '#363F4C',
                tooltipFontColor: '#ffffff',
                legendTitleColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                fontSize: '15px',
                subtitleFontSize: '14px',
                legendFontSize: '13px',
                fontFamily: 'Roboto, Noto, Sans-serif'
            };
            break;
        case 'bootstrap4':
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#212529',
                subTitleFontColor: '#212529',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                legendTitleColor: '#212529',
                legendTextColor: '#212529',
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: '16px',
                subtitleFontSize: '14px',
                legendFontSize: '14px',
                labelFontFamily: 'HelveticaNeue'
            };
            break;
        case 'tailwind':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#374151',
                subTitleFontColor: '#374151',
                tooltipFillColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                legendTitleColor: '#374151',
                legendTextColor: '#374151',
                fontFamily: 'Inter',
                fontSize: '14px',
                subtitleFontSize: '12px',
                legendFontSize: '12px',
                labelFontFamily: 'Inter'
            };
            break;
        case 'tailwinddark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#D1D5DB',
                subTitleFontColor: '#D1D5DB',
                tooltipFillColor: '#F9FAFB',
                tooltipFontColor: '#1F2937',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                legendTitleColor: '#D1D5DB',
                legendTextColor: '#D1D5DB',
                fontFamily: 'Inter',
                fontSize: '14px',
                subtitleFontSize: '12px',
                legendFontSize: '12px',
                labelFontFamily: 'Inter'
            };
            break;
        case 'bootstrap5':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#212529',
                subTitleFontColor: '#212529',
                tooltipFillColor: '#212529',
                tooltipFontColor: '#F9FAFB',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                legendTitleColor: '#212529',
                legendTextColor: '#212529',
                fontFamily: 'Helvetica Neue',
                fontSize: '14px',
                subtitleFontSize: '12px',
                legendFontSize: '12px',
                labelFontFamily: 'Helvetica Neue'
            };
            break;
        case 'bootstrap5dark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                tooltipFillColor: '#E9ECEF',
                tooltipFontColor: '#212529',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                legendTitleColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                fontFamily: 'Helvetica Neue',
                fontSize: '14px',
                subtitleFontSize: '12px',
                legendFontSize: '12px',
                labelFontFamily: 'Helvetica Neue'
            };
            break;
        case 'fluent':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#201F1E',
                subTitleFontColor: '#201F1E',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#323130',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                legendTitleColor: '#201F1E',
                legendTextColor: '#201F1E',
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                subtitleFontSize: '12px',
                legendFontSize: '12px',
                labelFontFamily: 'Segoe UI'
            };
            break;
        case 'fluentdark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#F3F2F1',
                subTitleFontColor: '#F3F2F1',
                tooltipFillColor: '#252423',
                tooltipFontColor: '#F3F2F1',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                legendTitleColor: '#F3F2F1',
                legendTextColor: '#F3F2F1',
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                subtitleFontSize: '12px',
                legendFontSize: '12px',
                labelFontFamily: 'Segoe UI'
            };
            break;
        default:
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#424242',
                subTitleFontColor: '#424242',
                tooltipFillColor: '#363F4C',
                tooltipFontColor: '#ffffff',
                legendTitleColor: '#353535',
                legendTextColor: '#353535',
                fontSize: '15px',
                subtitleFontSize: '14px',
                legendFontSize: '13px',
                fontFamily: 'Roboto, Noto, Sans-serif'
            };
            break;
    }
    return style;
}

/**
 * Print module handles the print functionality for treemap.
 *
 * @hidden
 */
class Print {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.control = control;
    }
    /**
     * This method is used to perform the print functionality in treemap.
     *
     * @param { string[] | string | Element} elements - Specifies the element.
     * @returns {void}
     * @private
     */
    print(elements) {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        const argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData, () => {
            if (!argsData.cancel) {
                print(argsData.htmlContent, this.printWindow);
            }
        });
    }
    /**
     * To get the html string of the Maps
     *
     * @param {string[] | string | Element} elements - Specifies the element
     * @returns {Element} - Returns the element
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
     *
     * @returns {string} - Returns the module name.
     */
    getModuleName() {
        // Returns te module name
        return 'Print';
    }
    /**
     * To destroy the legend.
     *
     * @param {TreeMap} treemap - Specifies the treemap instance
     * @returns {void}
     * @private
     */
    destroy(treemap) {
        /**
         * Destroy method performed here
         */
    }
}

/**
 * ImageExport module handles the export to image functionality for treemap.
 *
 * @hidden
 */
class ImageExport {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.control = control;
    }
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param {ExportType} type - Specifies the type of the image file.
     * @param {string} fileName - Specifies the file name of the image file.
     * @param {boolean} allowDownload - Specifies whether to download the file or not.
     * @returns {Promise} - Returns the promise string.
     * @private
     */
    export(type, fileName, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const promise = new Promise((resolve, reject) => {
            const element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'height': this.control.availableSize.height.toString(),
                    'width': this.control.availableSize.width.toString()
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
    getModuleName() {
        // Returns te module name
        return 'ImageExport';
    }
    /**
     * To destroy the ImageExport.
     *
     * @param {TreeMap} treemap - Specifies the instance of the treemap.
     * @returns {void}
     * @private
     */
    destroy(treemap) {
        // Destroy method performed here
    }
}

/**
 * PdfExport module handles the export to pdf functionality for treemap.
 *
 * @hidden
 */
class PdfExport {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(control) {
        this.control = control;
    }
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param {ExportType} type - Specifies the type of the document.
     * @param {string} fileName - Specifies the name of the document.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the component.
     * @param {boolean} allowDownload - Specifies whether to download the document or not.
     * @returns {Promise} - Returns the string.
     * @private
     */
    export(type, fileName, orientation, allowDownload) {
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
            orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
            const exportElement = this.control.svgObject.cloneNode(true);
            const backgroundElement = exportElement.childNodes[0];
            if (!isNullOrUndefined(backgroundElement)) {
                const backgroundColor = backgroundElement.getAttribute('fill');
                if ((this.control.theme === 'Tailwind' || this.control.theme === 'TailwindDark' || this.control.theme === 'Bootstrap5' || this.control.theme === 'Bootstrap5Dark'
                    || this.control.theme === 'Fluent' || this.control.theme === 'FluentDark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
                }
            }
            const url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            const image = new Image();
            const context = element.getContext('2d');
            image.onload = (() => {
                context.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                const document = new PdfDocument();
                let imageString = element.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
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
    getModuleName() {
        // Returns te module name
        return 'PdfExport';
    }
    /**
     * To destroy the ImageExport.
     *
     * @param {TreeMap} treemap - Specifies the treemap instance.
     * @returns {void}
     * @private
     */
    destroy(treemap) {
        // Destroy method performed here
    }
}

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable brace-style */
/* eslint-disable max-len */
/**
 * Tree Map Components
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the treemap component.
 * ```html
 * <div id="container"/>
 * <script>
 *   var treemap = new TreeMap();
 *   treemap.appendTo("#container");
 * </script>
 * ```
 */
let TreeMap = class TreeMap extends Component {
    /**s
     * Constructor for TreeMap component.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(options, element) {
        super(options, element);
        /**
         * resize the treemap
         */
        this.isResize = false;
        /** @private */
        this.orientation = 'Horizontal';
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.drilledItems = [];
        /** @private */
        this.isHierarchicalData = false;
        /** @private */
        this.levelSelection = [];
        /** @private */
        this.legendId = [];
    }
    preRender() {
        this.trigger(load, { treemap: this }, () => {
            this.initPrivateVariable();
            this.unWireEVents();
            this.createSvg();
            this.wireEVents();
            this.setCulture();
        });
    }
    render() {
        this.renderElements();
    }
    renderElements() {
        LevelsData.levelsData = null;
        LevelsData.defaultLevelsData = null;
        LevelsData.hierarchyData = null;
        this.createSecondaryElement();
        this.addTabIndex();
        this.themeStyle = getThemeStyle(this.theme);
        this.renderBorder();
        this.renderTitle(this.titleSettings, 'title', null, null);
        if (!isNullOrUndefined(LevelsData.levelsData)) {
            LevelsData.defaultLevelsData = LevelsData.levelsData;
        }
        this.processDataManager();
    }
    processDataManager() {
        let dataModule;
        let queryModule;
        let ajaxModule;
        let localAjax;
        if (this.dataSource instanceof DataManager) {
            dataModule = this.dataSource;
            queryModule = this.query instanceof Query ? this.query : new Query();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataManager = dataModule.executeQuery(queryModule);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataManager.then((e) => {
                this.dataSource = e['result'];
                this.renderTreeMapElements();
            });
        }
        else if (this.dataSource instanceof TreeMapAjax) {
            localAjax = this.dataSource;
            ajaxModule = new Ajax(localAjax.dataOptions, localAjax.type, localAjax.async, localAjax.contentType);
            ajaxModule.onSuccess = (args) => {
                this.dataSource = JSON.parse('[' + args + ']')[0];
                this.renderTreeMapElements();
            };
            ajaxModule.send(localAjax.sendData);
        }
        else {
            this.renderTreeMapElements();
        }
    }
    renderTreeMapElements() {
        this.processingData();
        if (this.treeMapLegendModule && this.legendSettings.visible) {
            this.treeMapLegendModule.renderLegend();
        }
        this.layout.processLayoutPanel();
        this.element.appendChild(this.svgObject);
        this.elementChange();
        this.trigger(loaded, { treemap: this, isResized: this.isResize });
        this.isResize = false;
        this.renderComplete();
    }
    createSvg() {
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        this.clearTemplate();
        const containerWidth = this.element.clientWidth;
        const containerHeight = this.element.clientHeight;
        this.availableSize = new Size(stringToNumber(this.width, containerWidth) || containerWidth || 600, stringToNumber(this.height, containerHeight) || containerHeight || 450);
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + '_svg',
            width: this.availableSize.width,
            height: this.availableSize.height
        });
    }
    /**
     * To initilize the private varibales of treemap.
     *
     * @returns {void}
     */
    initPrivateVariable() {
        if (this.element.id === '') {
            const collection = document.getElementsByClassName('e-treemap').length;
            this.element.id = 'treemap_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.layout = new LayoutPanel(this);
    }
    createSecondaryElement() {
        const secondaryEle = document.getElementById(this.element.id + '_Secondary_Element');
        if (secondaryEle && secondaryEle.childElementCount > 0) {
            secondaryEle.parentNode.removeChild(secondaryEle);
        }
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            const secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element',
                styles: 'position: absolute;z-index:1;'
            });
            this.element.appendChild(secondaryElement);
        }
    }
    elementChange() {
        if (this.treeMapLegendModule && this.legendSettings.visible && this.treeMapLegendModule.legendGroup && this.layout.layoutGroup
            && !isNullOrUndefined(this.svgObject) && !isNullOrUndefined(document.getElementById(this.layout.layoutGroup.id))
            && !isNullOrUndefined(document.getElementById(this.treeMapLegendModule.legendGroup.id))) {
            this.svgObject.insertBefore(this.layout.layoutGroup, this.treeMapLegendModule.legendGroup);
        }
    }
    /**
     * @private
     * Render the treemap border
     *
     * @returns {void}
     */
    renderBorder() {
        const width = this.border.width;
        const borderElement = this.svgObject.querySelector('#' + this.element.id + '_TreeMap_Border');
        if ((this.border.width > 0 || (this.background || this.themeStyle.backgroundColor)) && isNullOrUndefined(borderElement)) {
            const borderRect = new RectOption(this.element.id + '_TreeMap_Border', this.background || this.themeStyle.backgroundColor, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        }
        else if (borderElement) {
            borderElement.setAttribute('fill', this.background || this.themeStyle.backgroundColor);
        }
    }
    renderTitle(title, type, bounds, groupEle) {
        const style = {
            color: title.textStyle.color, size: title.textStyle.size, fontFamily: title.textStyle.fontFamily,
            fontStyle: title.textStyle.fontStyle, fontWeight: title.textStyle.fontWeight, opacity: title.textStyle.opacity
        };
        let height;
        const titlePadding = 10;
        const width = (this.availableSize.width - this.margin.right - this.margin.left);
        style.fontFamily = style.fontFamily || this.themeStyle.fontFamily;
        style.size = style.size || (type === 'title' ? this.themeStyle.fontSize : this.themeStyle.subtitleFontSize);
        if (title.text) {
            if (isNullOrUndefined(groupEle)) {
                groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            }
            const trimmedTitle = textTrim(width, title.text, style);
            const elementSize = measureText(trimmedTitle, style);
            const rect = (isNullOrUndefined(bounds)) ? new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height) : bounds;
            const location = findPosition(rect, title.alignment, elementSize, type);
            const options = new TextOption(this.element.id + '_TreeMap_' + type, location.x, location.y, 'start', trimmedTitle);
            const titleBounds = new Rect(location.x, location.y, elementSize.width, elementSize.height);
            const element = renderTextElement(options, style, style.color || (type === 'title' ? this.themeStyle.titleFontColor : this.themeStyle.subTitleFontColor), groupEle);
            element.setAttribute('aria-label', title.description || title.text);
            element.setAttribute('tabindex', (this.tabIndex + (type === 'title' ? 1 : 2)).toString());
            if ((type === 'title' && !title.subtitleSettings.text) || (type === 'subtitle')) {
                height = (this.availableSize.height - titleBounds.y - titlePadding - this.margin.bottom);
                this.areaRect = new Rect(this.margin.left, titleBounds.y + titlePadding, width, height);
            }
            if (type !== 'subtitle' && title.subtitleSettings.text) {
                this.renderTitle(title.subtitleSettings, 'subtitle', titleBounds, groupEle);
            }
            else {
                this.svgObject.appendChild(groupEle);
            }
        }
        else {
            height = (this.availableSize.height - this.margin.top - this.margin.bottom);
            this.areaRect = new Rect(this.margin.left, this.margin.top, width, height);
        }
    }
    processingData() {
        let path;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.dataSource = this.dataSource;
        if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0 && this.weightValuePath) {
            LevelsData.levelsData = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.dataSource.map((data) => {
                data[this.weightValuePath] = (data[this.weightValuePath]) ? data[this.weightValuePath].toString() :
                    data[this.weightValuePath];
            });
            this.leafItemSettings.labelPath = this.leafItemSettings.labelPath || this.weightValuePath;
            this.checkIsHierarchicalData();
            if (this.levels.length === 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = {};
                data['level'] = 0;
                path = this.leafItemSettings.labelPath;
                data[path] = [];
                for (let i = 0; i < this.dataSource.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const child = findChildren(this.dataSource[i])['values'];
                    if (this.isHierarchicalData && child && child.length > 0) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        child.forEach((currentData, dataIndex) => {
                            if (currentData[path]) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                data[path].push({
                                    groupIndex: 0, name: currentData[path], levelOrderName: currentData[path].toString(),
                                    data: currentData, weight: currentData[this.weightValuePath]
                                });
                            }
                        });
                    }
                    else {
                        if (this.dataSource[i][path]) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            data[path].push({
                                groupIndex: 0, name: this.dataSource[i][path], levelOrderName: this.dataSource[i][path].toString(), data: this.dataSource[i],
                                weight: this.dataSource[i][this.weightValuePath]
                            });
                        }
                    }
                }
                LevelsData.levelsData.push(data);
            }
            else {
                if (this.isHierarchicalData) {
                    LevelsData.hierarchyData = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    LevelsData.hierarchyData = extend([], this.dataSource, LevelsData.hierarchyData, true);
                    for (let i = 0; i < LevelsData.hierarchyData.length; i++) {
                        this.processHierarchicalData(LevelsData.hierarchyData[i], i);
                    }
                    LevelsData.levelsData = LevelsData.hierarchyData;
                }
                else {
                    this.processFlatJsonData();
                    if (LevelsData.levelsData.length > 1) {
                        this.reOrderLevelData(LevelsData.levelsData.length - 1);
                    }
                }
                path = this.levels[0].groupPath;
            }
            if (!this.isHierarchicalData) {
                this.findTotalWeight(LevelsData.levelsData[0][path], 'Parent');
            }
        }
    }
    checkIsHierarchicalData() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let child;
        this.dataSource = this.dataSource;
        for (let i = 0; i < this.dataSource.length; i++) {
            child = findChildren(this.dataSource[i])['values'];
            if (child && child.length) {
                this.isHierarchicalData = true;
                break;
            }
            else if (i === this.dataSource.length - 1) {
                this.isHierarchicalData = false;
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processHierarchicalData(data, dataCount) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let childData;
        let newData = {};
        let levelIndex;
        const path = this.leafItemSettings.labelPath ? this.leafItemSettings.labelPath : this.weightValuePath;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let level;
        let key;
        newData = findChildren(data);
        childData = newData ? newData['values'] : null;
        if (childData && childData.length > 0) {
            key = newData['key'];
            for (let i = 0; i < this.levels.length; i++) {
                if (key === this.levels[i].groupPath) {
                    level = this.levels[i];
                    levelIndex = i;
                }
            }
            for (let j = 0; j < childData.length; j++) {
                childData[j]['name'] = childData[j][path];
                childData[j]['levelOrderName'] = (levelIndex === 0 ? childData[j]['name'] :
                    data['levelOrderName'] + '#' + childData[j]['name']) + '';
                const childItemLevel = childData[j]['levelOrderName'];
                let childLevel;
                if (childItemLevel.search('#') > 0) {
                    childLevel = childItemLevel.split('#').length - 1;
                }
                childData[j]['groupIndex'] = isNullOrUndefined(levelIndex) ? childLevel === this.levels.length
                    ? this.levels.length : childLevel : levelIndex;
                if (levelIndex !== 0) {
                    childData[j]['parent'] = data;
                }
                childData[j]['groupName'] = key;
                childData[j]['data'] = childData[j];
                childData[j]['isDrilled'] = false;
                childData[j]['weight'] = childData[j][this.weightValuePath];
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            childData.forEach((currentData) => {
                this.processHierarchicalData(currentData, dataCount);
            });
        }
        if (dataCount === LevelsData.hierarchyData.length - 1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let mainData = LevelsData.hierarchyData[0][this.levels[0].groupPath];
            for (let k = 0; k < LevelsData.hierarchyData.length; k++) {
                childData = findChildren(LevelsData.hierarchyData[k])['values'];
                if (k !== 0 && childData) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    childData.forEach((currentData) => { mainData.push(currentData); });
                    LevelsData.hierarchyData.splice(k, 1);
                    k -= 1;
                }
            }
            mainData = LevelsData.hierarchyData[0][this.levels[0].groupPath];
            for (let l = 0; l < mainData.length; l++) {
                newData[this.levels[0].groupPath] = mainData;
                mainData[l]['parent'] = newData;
            }
        }
    }
    /* eslint-disable valid-jsdoc */
    /**
     * This method is used to perform the print functionality in treemap.
     *
     * @param id - Specifies the element to print the treemap.
     */
    print(id) {
        if (this.allowPrint && this.printModule) {
            this.printModule.print(id);
        }
    }
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param type - Specifies the index of the axis.
     * @param fileName - Specifies file name for exporting the rendered treemap.
     * @param orientation - Specifies the orientation of the pdf document.
     */
    export(type, fileName, orientation, allowDownload) {
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if (type === 'PDF' && this.allowPdfExport && this.pdfExportModule) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return new Promise((resolve, reject) => {
                resolve(this.pdfExportModule.export(type, fileName, orientation, allowDownload));
            });
        }
        else if (this.allowImageExport && (type !== 'PDF') && this.imageExportModule) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return new Promise((resolve, reject) => {
                resolve(this.imageExportModule.export(type, fileName, allowDownload));
            });
        }
        return null;
    }
    processFlatJsonData() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.dataSource = this.dataSource;
        let groupPath;
        const orderNames = [];
        for (let i = 0; i < this.levels.length + 1; i++) {
            groupPath = this.levels[i] ? this.levels[i].groupPath : this.leafItemSettings.labelPath;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const level = {};
            level['level'] = i;
            level[groupPath] = [];
            LevelsData.levelsData.push(level);
            for (let j = 0; j < this.dataSource.length; j++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const currentData = {};
                let childName = '';
                if (!isNullOrUndefined(groupPath)) {
                    const name = this.dataSource[j][groupPath];
                    if (i !== 0) {
                        for (let k = 0; k <= i; k++) {
                            const childGroupPath = this.levels[k] ? this.levels[k].groupPath : groupPath;
                            childName += (this.dataSource[j][childGroupPath]) + ((k === i) ? '' : '#');
                        }
                    }
                    if (!(orderNames.length > 0 ? orderNames.indexOf(childName ?
                        childName : name) !== -1 : false)) {
                        currentData['name'] = name;
                        currentData['levelOrderName'] = ((childName) ? childName : name) + '';
                        currentData['groupIndex'] = i;
                        currentData['isDrilled'] = false;
                        currentData['groupName'] = groupPath;
                        currentData['data'] = this.dataSource[j];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        LevelsData.levelsData[LevelsData.levelsData.length - 1][groupPath].push(currentData);
                        orderNames.push((childName) ? childName : name);
                    }
                }
            }
        }
    }
    /**
     * This method orders the treemap level data.
     *
     * @param start - Specifies the start value of the treemap level.
     */
    reOrderLevelData(start) {
        let currentName;
        const currentPath = this.levels[start] ? this.levels[start].groupPath : this.leafItemSettings.labelPath;
        const prevPath = this.levels[start - 1].groupPath;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentData = LevelsData.levelsData[start][currentPath];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const previousData = LevelsData.levelsData[start - 1][prevPath];
        for (let i = 0; i < currentData.length; i++) {
            currentName = currentData[i]['levelOrderName'];
            for (let j = 0; j < previousData.length; j++) {
                previousData[j][currentPath] = isNullOrUndefined(previousData[j][currentPath]) ? [] : previousData[j][currentPath];
                if (this.IsChildHierarchy(currentName.split('#'), previousData[j]['levelOrderName'].split('#'))) {
                    if (isNullOrUndefined(currentData[i]['parent'])) {
                        currentData[i]['parent'] = previousData[j];
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    previousData[j][currentPath].push(currentData[i]);
                    break;
                }
            }
        }
        this.findTotalWeight(LevelsData.levelsData[LevelsData.levelsData.length - 1][currentPath], 'Child');
        LevelsData.levelsData.splice(start, 1);
        if ((start - 1) > 0) {
            this.reOrderLevelData(start - 1);
        }
    }
    IsChildHierarchy(current, previous) {
        let isChild = false;
        for (let i = 0; i < previous.length; i++) {
            if (current.length < i || previous[i] !== current[i]) {
                return false;
            }
            else {
                isChild = true;
            }
        }
        return isChild;
    }
    /**
     * This method finds the weight value of the treemap level.
     *
     * @param processData - Specifies the treemap data.
     * @param type - Specifies the type of the data.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findTotalWeight(processData, type) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let totalWeight;
        let split;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let groupName;
        const groupObj = {};
        for (let i = 0; i < processData.length; i++) {
            totalWeight = 0;
            groupName = processData[i]['groupName'];
            split = processData[i]['levelOrderName'].split('#');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.dataSource.forEach((data) => {
                if (isContainsData(split, processData[i]['levelOrderName'], data, this)) {
                    totalWeight += parseFloat(data[this.weightValuePath]);
                }
            });
            if (type === 'Parent') {
                groupObj[groupName] = processData;
                processData[i]['parent'] = groupObj;
            }
            processData[i]['weight'] = totalWeight;
        }
    }
    /**
     * To unbind event handlers for treemap.
     *
     * @returns {void}
     */
    unWireEVents() {
        EventHandler.remove(this.element, 'click', this.clickOnTreeMap);
        EventHandler.remove(this.element, 'dblclick', this.doubleClickOnTreeMap);
        EventHandler.remove(this.element, 'contextmenu', this.rightClickOnTreeMap);
        EventHandler.remove(this.element, Browser.touchStartEvent, this.mouseDownOnTreeMap);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMoveOnTreeMap);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEndOnTreeMap);
        EventHandler.remove(this.element, 'pointerleave mouseleave', this.mouseLeaveOnTreeMap);
        window.removeEventListener('resize', this.resizeOnTreeMap);
    }
    /**
     * To bind event handlers for treemap.
     *
     * @returns {void}
     */
    wireEVents() {
        EventHandler.add(this.element, 'click', this.clickOnTreeMap, this);
        EventHandler.add(this.element, 'dblclick', this.doubleClickOnTreeMap, this);
        EventHandler.add(this.element, 'contextmenu', this.rightClickOnTreeMap, this);
        EventHandler.add(this.element, Browser.touchStartEvent, this.mouseDownOnTreeMap, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMoveOnTreeMap, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEndOnTreeMap, this);
        EventHandler.add(this.element, 'pointerleave mouseleave', this.mouseLeaveOnTreeMap, this);
        window.addEventListener('resize', this.resizeOnTreeMap.bind(this));
    }
    /**
     * Method to set culture for maps
     *
     * @returns {void}
     */
    setCulture() {
        this.intl = new Internationalization();
    }
    /**
     * To add tab index for treemap element
     *
     * @returns {void}
     */
    addTabIndex() {
        this.element.setAttribute('aria-label', this.description || 'TreeMap Element');
        this.element.setAttribute('tabindex', this.tabIndex.toString());
    }
    /**
     * This method handles the window resize event on treemap.
     *
     * @param e - Specifies the pointer event.
     */
    resizeOnTreeMap(e) {
        this.isResize = true;
        let args = {
            name: resize,
            cancel: false,
            previousSize: this.availableSize,
            currentSize: new Size(0, 0),
            treemap: this
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-treemap')) {
            this.resizeTo = setTimeout(() => {
                this.unWireEVents();
                this.createSvg();
                this.refreshing = true;
                this.wireEVents();
                args.currentSize = this.availableSize;
                this.trigger(resize, args, (observedArgs) => {
                    this.render();
                });
            }, 500);
        }
    }
    /**
     * This method handles the click event on the treemap.
     *
     * @param e - Specifies the mouse click event in the treemap.
     */
    clickOnTreeMap(e) {
        const targetEle = e.target;
        const targetId = targetEle.id;
        let eventArgs;
        let itemIndex;
        const labelText = targetEle.innerHTML;
        const clickArgs = { cancel: false, name: click, treemap: this, mouseEvent: e };
        this.trigger(click, clickArgs);
        if (targetId.indexOf('_Item_Index') > -1) {
            e.preventDefault();
            itemIndex = parseFloat(targetId.split('_Item_Index_')[1]);
            eventArgs = {
                cancel: false, name: itemClick, treemap: this, item: this.layout.renderItems[itemIndex], mouseEvent: e,
                groupIndex: this.layout.renderItems[itemIndex]['groupIndex'], groupName: this.layout.renderItems[itemIndex]['name'],
                text: labelText, contentItemTemplate: labelText
            };
            this.trigger(itemClick, eventArgs, (observedArgs) => {
                if (observedArgs.text !== labelText || observedArgs.contentItemTemplate !== labelText) {
                    if (isNullOrUndefined(this.leafItemSettings.labelTemplate)) {
                        observedArgs.text = textFormatter(observedArgs.text, observedArgs['item']['data'], observedArgs.treemap);
                        targetEle.innerHTML = observedArgs.text;
                    }
                    else {
                        setItemTemplateContent(targetId, targetEle, observedArgs.contentItemTemplate);
                    }
                }
            });
        }
        const end = new Date().getMilliseconds();
        let doubleTapTimer1;
        if (!isNullOrUndefined(this.doubleClick)) {
            if (!isNullOrUndefined(doubleTapTimer1) && end - doubleTapTimer1 < 500) {
                this.doubleClickOnTreeMap(e);
            }
            doubleTapTimer1 = end;
        }
    }
    /**
     * This method handles the double click event in the treemap.
     *
     * @param e - Specifies the pointer event of mouse click.
     */
    doubleClickOnTreeMap(e) {
        const doubleClickArgs = { cancel: false, name: doubleClick, treemap: this, mouseEvent: e };
        this.trigger(doubleClick, doubleClickArgs);
        //this.notify('dblclick', e);
    }
    /**
     * This method handles the right click event in the treemap.
     *
     * @param e - Specifies the pointer event of mouse click.
     */
    rightClickOnTreeMap(e) {
        const rightClickArgs = { cancel: false, name: rightClick, treemap: this, mouseEvent: e };
        this.trigger(rightClick, rightClickArgs);
    }
    /**
     * This method handles the mouse down event in the treemap.
     *
     * @param e - Specifies the pointer event of mouse click.
     */
    mouseDownOnTreeMap(e) {
        if (e.target.id.indexOf('_Item_Index') > -1) {
            this.mouseDown = true;
        }
        this.notify(Browser.touchStartEvent, e);
    }
    /**
     * This method handles the mouse move event in the treemap.
     *
     * @param e - Specifies the pointer event of mouse click.
     */
    mouseMoveOnTreeMap(e) {
        const targetEle = e.target;
        const targetId = targetEle.id;
        let eventArgs;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let item;
        const moveArgs = { cancel: false, name: mouseMove, treemap: this, mouseEvent: e };
        this.trigger(mouseMove, moveArgs);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let childItems;
        if (targetId.indexOf('_Item_Index') > -1) {
            item = this.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            childItems = findChildren(item)['values'];
            this.element.style.cursor = (!item['isLeafItem'] && childItems && childItems.length > 0 && this.enableDrillDown) ?
                'pointer' : 'auto';
            eventArgs = { cancel: false, name: itemMove, treemap: this, item: item, mouseEvent: e };
            this.trigger(itemMove, eventArgs);
        }
        this.notify(Browser.touchMoveEvent, e);
    }
    /**
     * This method calculates the selected treemap levels.
     *
     * @param labelText - Specifies the label text.
     * @param item - Specifies the treemap item.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calculateSelectedTextLevels(labelText, item) {
        //to find the levels by clicking the particular text both for drillDownView as true / false.
        let drillLevel;
        let k;
        let text;
        const levelLabels = item['levelOrderName'];
        const levelText = levelLabels.split('#');
        for (k of Object.keys(levelText)) {
            if (levelText[k] === labelText) {
                drillLevel = parseInt(k, 10);
                text = labelText;
            }
        }
        return { drillLevel: drillLevel, currentLevelLabel: text, levelText: levelText };
    }
    /**
     * This method calculates the previous level of child items in treemap.
     *
     * @param labelText - Specifies the label text in treemap
     * @param drillLevelValues - Specifies the values of drill level.
     * @param item - Specifies the treemap item.
     * @param directLevel - Specifies the current level.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calculatePreviousLevelChildItems(labelText, drillLevelValues, item, directLevel) {
        //By clicking any child items drilldown to the particular level.
        //At the time store all the previous drilled level items in drilledItems
        // This condition satisfies while drilldown View is set as false and the text contains '[+]'
        let text;
        let p = 0;
        let levelItems;
        let text1;
        const drillTextLevel = this.layout.renderItems[0]['levelOrderName'].split('#').length;
        for (let h = 0; h < drillTextLevel; h++) {
            text1 = h === 0 ? drillLevelValues['levelText'][h] : text1 + '#' + drillLevelValues['levelText'][h];
        }
        p = drillTextLevel > 1 ? drillTextLevel : p;
        for (levelItems of Object['values'](this.layout.renderItems)) {
            const drillLevelText = levelItems['levelOrderName'].split('#');
            if (drillLevelText[0] === drillLevelValues['levelText'][0]) {
                text = p === 0 ? isNullOrUndefined(text1) ? text1 : drillLevelValues['levelText'][p] :
                    directLevel ? text1 : text1 + '#' + drillLevelValues['levelText'][p];
                if (text === levelItems['levelOrderName']) {
                    this.drilledItems.push({ name: levelItems['levelOrderName'], data: levelItems });
                    p++;
                    directLevel = true;
                    if (p <= item['groupIndex']) {
                        text = text + '#' + drillLevelValues['levelText'][p];
                        text1 = text;
                    }
                }
            }
        }
        return directLevel;
    }
    /**
     * This method compares the selected labels with the drill down items.
     *
     * @param drillLevelValues - Specifies the values of drill level.
     * @param item - Specifies the treemap item.
     * @param i - Specifies the treemap item.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    compareSelectedLabelWithDrillDownItems(drillLevelValues, item, i) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let drillLevelChild;
        const newDrillItem = {};
        const b = drillLevelValues['drillLevel'] + 1;
        if (b === this.drilledItems[i]['data']['groupIndex']) {
            drillLevelChild = this.drilledItems[i]['data']['parent'];
            drillLevelChild['isDrilled'] = true;
            newDrillItem[drillLevelChild[this.drilledItems[i]['data']['groupName']]]
                = [drillLevelChild];
            // to remove all the items after matched drilled items
            this.drilledItems.splice(i, this.drilledItems.length);
        }
        else if (drillLevelValues['drillLevel'] === (this.drilledItems.length - 1)
            || drillLevelValues['drillLevel'] === item['groupIndex']) {
            newDrillItem[item['groupName']] = [item];
        }
        return newDrillItem;
    }
    /**
     * This method handles mouse end event in treemap.
     *
     * @param e - Specifies the pointer event of mouse.
     */
    mouseEndOnTreeMap(e) {
        const targetEle = e.target;
        const targetId = targetEle.id;
        let totalRect;
        let startEvent;
        let endEvent;
        let directLevel = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let index;
        let newDrillItem = {};
        let item;
        const process = true;
        const layoutID = this.element.id + '_TreeMap_' + this.layoutType + '_Layout';
        let drillLevel;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const templateID = this.element.id + '_Label_Template_Group';
        let drillLevelValues;
        if (targetId.indexOf('_Item_Index') > -1 && this.enableDrillDown && !this.drillMouseMove) {
            if (e.cancelable) {
                e.preventDefault();
            }
            index = parseFloat(targetId.split('_Item_Index_')[1]);
            item = this.layout.renderItems[index];
            const labelText = targetEle.innerHTML;
            if (this.enableBreadcrumb) {
                drillLevelValues = this.calculateSelectedTextLevels(labelText, item);
                drillLevel = drillLevelValues['drillLevel'];
                if (!this.drillDownView && labelText.search('[+]') !== -1) {
                    directLevel = this.calculatePreviousLevelChildItems(labelText, drillLevelValues, item, directLevel);
                }
            }
            if (this.levels.length !== 0 && !item['isLeafItem'] && findChildren(item)['values'] &&
                findChildren(item)['values'].length > 0) {
                if (this.drilledItems.length > 0) {
                    item = directLevel ? this.drilledItems[this.drilledItems.length - 1]['data'] : item;
                    for (let i = 0; i < this.drilledItems.length; i++) {
                        if (!isNullOrUndefined(drillLevel)) { //Compare the selected text level with drilled items
                            const drillLength = this.drilledItems.length;
                            newDrillItem = this.compareSelectedLabelWithDrillDownItems(drillLevelValues, item, i);
                            if (drillLength !== this.drilledItems.length) {
                                i -= 1;
                                break;
                            }
                        } //when clicking the levels drill back to the previous level process takes place
                        if (item['levelOrderName'] === this.drilledItems[i]['name'] && !directLevel && isNullOrUndefined(drillLevel)) {
                            if (item['groupIndex'] === 0 && item['parent'][item['groupName']] instanceof Array) {
                                item['isDrilled'] = !(item['isDrilled']);
                                if (!item['isDrilled']) {
                                    newDrillItem = item['parent'];
                                }
                                else {
                                    newDrillItem[item['groupName']] = [item];
                                }
                            }
                            else {
                                item['isDrilled'] = false;
                                item['parent']['isDrilled'] = true;
                                item = item['parent'];
                                newDrillItem[item['groupName']] = [item];
                            }
                            this.drilledItems.splice(i, 1);
                            i -= 1;
                            break;
                        }
                        else if (i === this.drilledItems.length - 1 && isNullOrUndefined(drillLevel)) {
                            item['isDrilled'] = true; // click the items move to next level.
                            newDrillItem[item['groupName']] = [item];
                        }
                    }
                }
                else {
                    item['isDrilled'] = true;
                    newDrillItem[item['groupName']] = [item];
                }
                startEvent = {
                    cancel: false, name: drillStart, treemap: this,
                    element: targetEle, groupIndex: this.enableBreadcrumb &&
                        this.drilledItems.length !== 0 && !isNullOrUndefined(drillLevel) ?
                        this.drilledItems[this.drilledItems.length - 1]['data']['groupIndex'] : item['groupIndex'],
                    groupName: this.enableBreadcrumb && this.drilledItems.length !== 0 && !isNullOrUndefined(drillLevel) ?
                        this.drilledItems[this.drilledItems.length - 1]['data']['name'] : item['name'],
                    rightClick: e.which === 3 ? true : false, childItems: null, item: newDrillItem
                };
                this.trigger(drillStart, startEvent, (observedArgs) => {
                    this.currentLevel = item['isDrilled'] && isNullOrUndefined(drillLevel) ? item['groupIndex'] :
                        (!isNullOrUndefined(drillLevel) && this.enableBreadcrumb && item['isDrilled']) ? drillLevel : null;
                    if (!observedArgs.cancel) {
                        if (document.getElementById(layoutID)) {
                            const layerElementId = document.getElementById(layoutID);
                            layerElementId.parentNode.removeChild(layerElementId);
                        }
                        totalRect = extend({}, this.areaRect, totalRect, true);
                        if (this.legendSettings.visible && !isNullOrUndefined(this.treeMapLegendModule)) {
                            if (!isNullOrUndefined(newDrillItem)) {
                                this.treeMapLegendModule.legendGroup.textContent = '';
                                this.treeMapLegendModule.legendGroup = null;
                                this.treeMapLegendModule.widthIncrement = 0;
                                this.treeMapLegendModule.heightIncrement = 0;
                                if (this.enableBreadcrumb && !isNullOrUndefined(drillLevel)) {
                                    this.drilledLegendItems = {
                                        name: this.drilledItems[this.drilledItems.length - 1]['data']['levelOrderName'],
                                        data: this.drilledItems[this.drilledItems.length - 1]['data']
                                    };
                                }
                                else {
                                    this.drilledLegendItems = { name: item['levelOrderName'], data: item };
                                }
                                this.treeMapLegendModule.renderLegend();
                            }
                            totalRect = !isNullOrUndefined(this.totalRect) ? this.totalRect : totalRect;
                        }
                        if (document.getElementById(templateID)) {
                            const drillElementId = document.getElementById(templateID);
                            drillElementId.parentNode.removeChild(drillElementId);
                        }
                        if (!isNullOrUndefined(observedArgs.childItems) && !observedArgs.cancel) {
                            this.layout.onDemandProcess(observedArgs.childItems);
                        }
                        else {
                            this.layout.calculateLayoutItems(newDrillItem, totalRect);
                            this.layout.renderLayoutItems(newDrillItem);
                        }
                    }
                });
                endEvent = { cancel: false, name: drillEnd, treemap: this, renderItems: this.layout.renderItems };
                this.trigger(drillEnd, endEvent);
                if (process) {
                    if (!directLevel && isNullOrUndefined(drillLevel)) {
                        this.drilledItems.push({ name: item['levelOrderName'], data: item });
                    }
                }
            }
        }
        this.mouseDown = false;
        this.notify(Browser.touchEndEvent, e);
    }
    /**
     * This method handles mouse leave event in treemap.
     *
     * @param e - Specifies the pointer event of mouse.
     */
    mouseLeaveOnTreeMap(e) {
        if (this.treeMapTooltipModule) {
            this.treeMapTooltipModule.removeTooltip();
        }
        if (this.treeMapLegendModule) {
            this.treeMapLegendModule.removeInteractivePointer();
        }
        removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', this);
        if (this.treeMapHighlightModule) {
            removeShape(this.treeMapHighlightModule.shapeHighlightCollection, 'highlight');
            this.treeMapHighlightModule.highLightId = '';
        }
    }
    /**
     * This method is used to select or remove the selection of treemap item based on the provided selection settings.
     */
    selectItem(levelOrder, isSelected) {
        if (isNullOrUndefined(isSelected)) {
            isSelected = true;
        }
        let levelOrderName = '';
        for (let i = 0; i < levelOrder.length; i++) {
            if (i !== levelOrder.length - 1) {
                levelOrderName += levelOrder[i] + '#';
            }
            else {
                levelOrderName += levelOrder[i];
            }
        }
        if (this.treeMapSelectionModule && this.selectionSettings.enable) {
            this.treeMapSelectionModule.selectTreemapItem(levelOrderName, isSelected);
        }
    }
    /**
     * To provide the array of modules needed for maps rendering
     *
     * @returns {ModuleDeclaration[]} Returns the modules
     * @private
     */
    requiredModules() {
        const modules = [];
        if (this.tooltipSettings.visible) {
            modules.push({
                member: 'treeMapTooltip',
                args: [this]
            });
        }
        if (this.highlightSettings.enable) {
            modules.push({
                member: 'treeMapHighlight',
                args: [this]
            });
        }
        if (this.selectionSettings.enable) {
            modules.push({
                member: 'treeMapSelection',
                args: [this]
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'treeMapLegend',
                args: [this]
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this, Print]
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this, ImageExport]
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this, PdfExport]
            });
        }
        return modules;
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeMapModel} newProp - Specifies the new property
     * @param {TreeMapModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        let render = false;
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'background':
                    this.renderBorder();
                    break;
                case 'height':
                case 'width':
                case 'layoutType':
                case 'levels':
                case 'drillDownView':
                case 'renderDirection':
                case 'leafItemSettings':
                case 'legendSettings':
                case 'dataSource':
                    render = true;
                    break;
            }
        }
        if (render) {
            this.createSvg();
            this.renderElements();
        }
    }
    /**
     * Gets component name.
     */
    getModuleName() {
        return 'treemap';
    }
    /**
     * This method is used to dispose the treemap component.
     */
    destroy() {
        this.unWireEVents();
        this.drilledItems = [];
        this.levelSelection = [];
        this.legendId = [];
        this.removeSvg();
        super.destroy();
    }
    removeSvg() {
        removeElement(this.element.id + '_Secondary_Element');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value.
     * @private
     */
    getPersistData() {
        return '';
    }
};
__decorate([
    Property(false)
], TreeMap.prototype, "allowPrint", void 0);
__decorate([
    Property(false)
], TreeMap.prototype, "allowImageExport", void 0);
__decorate([
    Property(false)
], TreeMap.prototype, "allowPdfExport", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "width", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "height", void 0);
__decorate([
    Complex({}, Border)
], TreeMap.prototype, "border", void 0);
__decorate([
    Complex({}, Margin)
], TreeMap.prototype, "margin", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "background", void 0);
__decorate([
    Property('Material')
], TreeMap.prototype, "theme", void 0);
__decorate([
    Complex({}, TitleSettings)
], TreeMap.prototype, "titleSettings", void 0);
__decorate([
    Property('Squarified')
], TreeMap.prototype, "layoutType", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "dataSource", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "query", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "weightValuePath", void 0);
__decorate([
    Property('')
], TreeMap.prototype, "rangeColorValuePath", void 0);
__decorate([
    Property('')
], TreeMap.prototype, "equalColorValuePath", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "colorValuePath", void 0);
__decorate([
    Property([])
], TreeMap.prototype, "palette", void 0);
__decorate([
    Property('TopLeftBottomRight')
], TreeMap.prototype, "renderDirection", void 0);
__decorate([
    Property(false)
], TreeMap.prototype, "enableDrillDown", void 0);
__decorate([
    Property(false)
], TreeMap.prototype, "enableBreadcrumb", void 0);
__decorate([
    Property(' - ')
], TreeMap.prototype, "breadcrumbConnector", void 0);
__decorate([
    Property(false)
], TreeMap.prototype, "drillDownView", void 0);
__decorate([
    Complex({}, InitialDrillSettings)
], TreeMap.prototype, "initialDrillDown", void 0);
__decorate([
    Complex({}, LeafItemSettings)
], TreeMap.prototype, "leafItemSettings", void 0);
__decorate([
    Collection([], LevelSettings)
], TreeMap.prototype, "levels", void 0);
__decorate([
    Complex({}, HighlightSettings)
], TreeMap.prototype, "highlightSettings", void 0);
__decorate([
    Complex({}, SelectionSettings)
], TreeMap.prototype, "selectionSettings", void 0);
__decorate([
    Complex({}, TooltipSettings)
], TreeMap.prototype, "tooltipSettings", void 0);
__decorate([
    Complex({}, LegendSettings)
], TreeMap.prototype, "legendSettings", void 0);
__decorate([
    Property(false)
], TreeMap.prototype, "useGroupingSeparator", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "description", void 0);
__decorate([
    Property(1)
], TreeMap.prototype, "tabIndex", void 0);
__decorate([
    Property(null)
], TreeMap.prototype, "format", void 0);
__decorate([
    Event()
], TreeMap.prototype, "load", void 0);
__decorate([
    Event()
], TreeMap.prototype, "beforePrint", void 0);
__decorate([
    Event()
], TreeMap.prototype, "loaded", void 0);
__decorate([
    Event()
], TreeMap.prototype, "itemRendering", void 0);
__decorate([
    Event()
], TreeMap.prototype, "drillStart", void 0);
__decorate([
    Event()
], TreeMap.prototype, "drillEnd", void 0);
__decorate([
    Event()
], TreeMap.prototype, "itemSelected", void 0);
__decorate([
    Event()
], TreeMap.prototype, "itemHighlight", void 0);
__decorate([
    Event()
], TreeMap.prototype, "tooltipRendering", void 0);
__decorate([
    Event()
], TreeMap.prototype, "itemClick", void 0);
__decorate([
    Event()
], TreeMap.prototype, "itemMove", void 0);
__decorate([
    Event()
], TreeMap.prototype, "click", void 0);
__decorate([
    Event()
], TreeMap.prototype, "doubleClick", void 0);
__decorate([
    Event()
], TreeMap.prototype, "rightClick", void 0);
__decorate([
    Event()
], TreeMap.prototype, "mouseMove", void 0);
__decorate([
    Event()
], TreeMap.prototype, "resize", void 0);
__decorate([
    Event()
], TreeMap.prototype, "legendItemRendering", void 0);
__decorate([
    Event()
], TreeMap.prototype, "legendRendering", void 0);
TreeMap = __decorate([
    NotifyPropertyChanges
], TreeMap);
/**
 * @private
 */
class LevelsData {
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/**
 * Legend module class
 */
class TreeMapLegend {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(treemap) {
        this.page = 0;
        this.legendBorderRect = new Rect(0, 0, 0, 0);
        this.currentPage = 0;
        this.heightIncrement = 0;
        this.widthIncrement = 0;
        this.textMaxWidth = 0;
        this.legendInteractiveGradient = [];
        this.legendItemRect = new Rect(0, 0, 0, 0);
        this.treemap = treemap;
        this.addEventListener();
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * method for legend
     */
    renderLegend() {
        this.legendRenderingCollections = [];
        this.legendCollections = [];
        this.legendNames = [];
        this.totalPages = [];
        this.gradientCount = 1;
        this.widthIncrement = 0;
        this.heightIncrement = 0;
        this.defsElement = this.treemap.renderer.createDefs();
        this.treemap.svgObject.appendChild(this.defsElement);
        let eventArgs;
        eventArgs = {
            cancel: false, name: legendRendering, treemap: this.treemap, _changePosition: this.treemap.legendSettings.position,
            position: this.treemap.legendSettings.position
        };
        this.treemap.trigger(legendRendering, eventArgs, (observedArgs) => {
            // eslint-disable-next-line no-underscore-dangle
            if (!observedArgs.cancel && observedArgs._changePosition !== this.treemap.legendSettings.position) {
                // eslint-disable-next-line no-underscore-dangle
                this.treemap.legendSettings.position = observedArgs._changePosition;
            }
            this.calculateLegendBounds();
            if (this.legendCollections.length > 0) {
                this.drawLegend();
            }
        });
    }
    calculateLegendBounds() {
        const treemap = this.treemap;
        const legend = treemap.legendSettings;
        this.findColorMappingLegendItems(LevelsData.levelsData[0]);
        if ((this.treemap.palette.length > 0 || !isNullOrUndefined(this.treemap.colorValuePath))
            && this.legendCollections.length === 0) {
            this.findPaletteLegendItems(LevelsData.levelsData[0], 'Parent');
        }
        if (this.legendCollections.length > 0) {
            const defaultSize = 25;
            const textPadding = 10;
            const position = legend.position;
            const legendTitle = legend.title.text;
            const titleTextStyle = legend.titleStyle;
            const legendMode = legend.mode;
            let shapeX = 0;
            let shapeY = 0;
            let textX = 0;
            let textY = 0;
            const shapeHeight = legend.shapeHeight;
            const shapeWidth = legend.shapeWidth;
            let shapeLocation = [];
            let textLocation = [];
            const orientation = (legend.orientation === 'None') ? ((position === 'Top' || position === 'Bottom'
                || (position === 'Auto' && treemap.availableSize.width <= treemap.availableSize.height))
                ? 'Horizontal' : 'Vertical') : legend.orientation;
            const leftPadding = 10;
            const topPadding = 10;
            const spacing = 10;
            let legendWidth = (legend.width.length > 1) ? (legend.width.indexOf('%') > -1) ? (treemap.availableSize.width / 100)
                * parseFloat(legend.width) : parseFloat(legend.width) : null;
            let legendHeight = (legend.height.length > 1) ? (legend.height.indexOf('%') > -1) ?
                (treemap.availableSize.height / 100) * parseFloat(legend.height) : parseFloat(legend.height) : null;
            titleTextStyle.fontFamily = treemap.themeStyle.fontFamily || titleTextStyle.fontFamily;
            titleTextStyle.size = treemap.themeStyle.legendFontSize || titleTextStyle.size;
            const legendTitleSize = measureText(legendTitle, titleTextStyle);
            let startX = 0;
            let startY = 0;
            const shapePadding = legend.shapePadding;
            const itemTextStyle = legend.textStyle;
            const legendLength = this.legendCollections.length;
            itemTextStyle.size = itemTextStyle.size || treemap.themeStyle.legendFontSize;
            itemTextStyle.fontFamily = itemTextStyle.fontFamily || treemap.themeStyle.fontFamily;
            if (legendMode === 'Default') {
                legendWidth = (isNullOrUndefined(legendWidth)) ? treemap.areaRect.width : legendWidth;
                legendHeight = (isNullOrUndefined(legendHeight)) ? treemap.areaRect.height : legendHeight;
                let j = 0;
                for (let i = 0; i < this.legendCollections.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const legendItem = this.legendCollections[i];
                    if (isNullOrUndefined(this.totalPages[this.page])) {
                        this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
                    }
                    const legendTextSize = measureText(legendItem['legendName'], itemTextStyle);
                    this.textMaxWidth = Math.max(this.textMaxWidth, legendTextSize.width);
                    if (i === 0) {
                        startX = shapeX = (leftPadding + (shapeWidth / 2));
                        startY = shapeY = topPadding + legendTitleSize.height + (shapeHeight > legendTextSize.height ? shapeHeight / 2
                            : (legendTextSize.height / 4));
                    }
                    else {
                        const maxSize = (legendTextSize.height > shapeHeight) ? legendTextSize.height : shapeHeight;
                        if (orientation === 'Horizontal') {
                            const prvePositionX = (textLocation[j - 1].x + textLocation[j - 1].width) + textPadding + shapeWidth;
                            if ((prvePositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                const nextPositionY = (textLocation[j - 1].y > (shapeLocation[j - 1].y + (shapeHeight / 2)) ?
                                    textLocation[j - 1].y : (shapeLocation[j - 1].y + (shapeHeight / 2))) + topPadding;
                                if ((nextPositionY + maxSize) > legendHeight) {
                                    this.getPageChanged();
                                    j = 0;
                                    shapeLocation = [];
                                    textLocation = [];
                                    shapeX = startX;
                                    shapeY = startY;
                                }
                                else {
                                    shapeX = (shapeLocation[0].x);
                                    shapeY = (nextPositionY + (maxSize / 2));
                                }
                            }
                            else {
                                shapeX = (prvePositionX - (shapeWidth / 2));
                                shapeY = (shapeLocation[j - 1]).y;
                            }
                        }
                        else {
                            const prevPositionY = textLocation[j - 1].y > shapeLocation[j - 1].y + (shapeHeight / 2) ?
                                textLocation[j - 1].y : shapeLocation[j - 1].y + (shapeHeight / 2);
                            if ((prevPositionY + topPadding + maxSize) > legendHeight) {
                                const nextPositionX = (textLocation[j - 1].x + this.textMaxWidth + textPadding);
                                if ((nextPositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                    shapeX = startX;
                                    shapeY = startY;
                                    textLocation = [];
                                    shapeLocation = [];
                                    this.getPageChanged();
                                    j = 0;
                                }
                                else {
                                    shapeX = nextPositionX + (shapeWidth / 2);
                                    shapeY = (shapeLocation[0].y);
                                }
                            }
                            else {
                                shapeX = shapeLocation[j - 1].x;
                                shapeY = prevPositionY + topPadding + (shapeHeight / 2);
                            }
                        }
                    }
                    textX = shapeX + (shapeWidth / 2) + shapePadding;
                    textY = shapeY + (legendTextSize.height / 4);
                    shapeLocation.push({ x: shapeX, y: shapeY });
                    textLocation.push({ x: textX, y: textY, width: legendTextSize.width, height: (legendTextSize.height / 2) });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.totalPages[this.page]['Collection'].push({
                        DisplayText: legendItem['legendName'], element: legendItem['gradientElement'],
                        Shape: { x: shapeX, y: shapeY },
                        Text: { x: textX, y: textY },
                        Fill: legendItem['legendFill'],
                        Data: legendItem['legendData'],
                        Rect: {
                            x: shapeLocation[j].x - (shapeWidth / 2),
                            y: (shapeLocation[j].y - (shapeHeight / 2)) < (textY - legendTextSize.height) ?
                                (shapeLocation[j].y - (shapeHeight / 2)) : (textY - legendTextSize.height),
                            width: Math.abs((shapeLocation[j].x - (shapeWidth / 2)) - (textX + legendTextSize.width)),
                            height: ((shapeHeight > legendTextSize.height) ? shapeHeight : legendTextSize.height)
                        }
                    });
                    j++;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const collection = this.totalPages[0]['Collection'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                collection.forEach((legendObj, index) => {
                    const legendRect = new Rect(legendObj['Rect']['x'], legendObj['Rect']['y'], legendObj['Rect']['width'], legendObj['Rect']['height']);
                    if (index === 0) {
                        startX = legendRect.x;
                        startY = legendRect.y;
                    }
                    this.widthIncrement = Math.max(this.widthIncrement, Math.abs(startX - (legendRect.x + legendRect.width)));
                    this.heightIncrement = Math.max(this.heightIncrement, Math.abs(startY - (legendRect.y + legendRect.height)));
                });
                legendWidth = ((this.widthIncrement < legendWidth) ? this.widthIncrement : legendWidth);
                legendHeight = ((this.heightIncrement < legendHeight) ? this.heightIncrement : legendHeight);
                this.legendItemRect = {
                    x: collection[0]['Rect']['x'], y: collection[0]['Rect']['y'],
                    width: legendWidth, height: legendHeight
                };
            }
            else {
                const legendLength = this.legendCollections.length;
                const rectWidth = (orientation === 'Horizontal') ? (isNullOrUndefined(legendWidth)) ? (treemap.areaRect.width / legendLength) :
                    (legendWidth / legendLength) : (isNullOrUndefined(legendWidth)) ? defaultSize : legendWidth;
                const rectHeight = (orientation === 'Horizontal') ? (isNullOrUndefined(legendHeight)) ? defaultSize : legendHeight :
                    (isNullOrUndefined(legendHeight)) ? (treemap.areaRect.height / legendLength) : (legendHeight / legendLength);
                startX = 0;
                startY = legendTitleSize.height + spacing;
                const textPadding = 10;
                const placement = legend.labelPosition;
                let itemStartX = 0;
                let itemStartY = 0;
                const labelAction = legend.labelDisplayMode;
                let maxTextHeight = 0;
                let maxTextWidth = 0;
                for (let i = 0; i < this.legendCollections.length; i++) {
                    startX = (orientation === 'Horizontal') ? (startX + rectWidth) : startX;
                    startY = (orientation === 'Horizontal') ? startY : (startY + rectHeight);
                    let legendText = this.legendCollections[i]['legendName'];
                    let itemTextSize = new Size(0, 0);
                    if (labelAction === 'None') {
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else if (labelAction === 'Trim') {
                        legendText = textTrim((orientation === 'Horizontal' ? rectWidth : rectHeight), legendText, itemTextStyle);
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else {
                        legendText = '';
                    }
                    maxTextHeight = Math.max(maxTextHeight, itemTextSize.height);
                    maxTextWidth = Math.max(maxTextWidth, itemTextSize.width);
                    if (itemTextSize.width > 0 && itemTextSize.height > 0) {
                        if (orientation === 'Horizontal') {
                            textX = startX + (rectWidth / 2);
                            textY = (placement === 'After') ? (startY + rectHeight + (itemTextSize.height / 2)) + textPadding :
                                (startY - textPadding);
                        }
                        else {
                            textX = (placement === 'After') ? startX - (itemTextSize.width / 2) - textPadding
                                : (startX + rectWidth + itemTextSize.width / 2) + textPadding;
                            textY = startY + (rectHeight / 2) + (itemTextSize.height / 4);
                        }
                    }
                    if (i === 0) {
                        itemStartX = (orientation === 'Horizontal') ? startX : (placement === 'After') ?
                            textX - (itemTextSize.width / 2) : startX;
                        itemStartY = (orientation === 'Horizontal') ? (placement === 'After') ? startY :
                            textY - (itemTextSize.height / 2) : startY;
                    }
                    if (i === legendLength - 1) {
                        legendWidth = (orientation === 'Horizontal') ? Math.abs((startX + rectWidth) - itemStartX) :
                            (rectWidth + maxTextWidth + textPadding);
                        legendHeight = (orientation === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding) :
                            Math.abs((startY + rectHeight) - itemStartY);
                    }
                    this.legendRenderingCollections.push({
                        fill: this.legendCollections[i]['legendFill'], x: startX, y: startY,
                        width: rectWidth, height: rectHeight, element: this.legendCollections[i]['gradientElement'],
                        text: legendText, textX: textX, textY: textY,
                        textWidth: itemTextSize.width, textHeight: itemTextSize.height,
                        data: this.legendCollections[i]['legendData']
                    });
                }
                this.legendItemRect = { x: itemStartX, y: itemStartY, width: legendWidth, height: legendHeight };
            }
        }
    }
    getPageChanged() {
        this.page++;
        if (isNullOrUndefined(this.totalPages[this.page])) {
            this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findColorMappingLegendItems(data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const child = findChildren(data)['values'];
        if (child && child.length > 0) {
            this.calculateLegendItems(child);
            if (this.treemap.levels.length > 0) {
                for (let i = 0; i < child.length; i++) {
                    this.findColorMappingLegendItems(child[i]);
                }
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findPaletteLegendItems(data, type) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let child;
        let legendFillColor;
        if (!isNullOrUndefined(this.treemap.drilledItems)) {
            if (this.treemap.drilledItems.length === 0 && !isNullOrUndefined(this.treemap.initialDrillDown.groupName)
                && isNullOrUndefined(this.treemap.drilledLegendItems)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const items = findChildren(data)['values'];
                for (let k = 0; k < items.length; k++) {
                    if (items[k]['Name'] === this.treemap.initialDrillDown.groupName) {
                        items[k]['isDrilled'] = !items[k]['isDrilled'];
                        data = items[k];
                        this.treemap.currentLevel = this.treemap.initialDrillDown.groupIndex;
                        legendFillColor = this.treemap.palette.length > 0 ? this.treemap.palette[k % this.treemap.palette.length] :
                            items[k]['data'][this.treemap.colorValuePath];
                        break;
                    }
                }
            }
        }
        if (this.treemap.enableDrillDown && !isNullOrUndefined(this.treemap.drilledLegendItems)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const childElement = this.treemap.drilledLegendItems;
            legendFillColor = childElement['data']['options']['fill'];
            if (childElement['data']['isDrilled']) {
                child = findChildren(childElement['data'])['values'];
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const parentElement = childElement['data']['parent'];
                child = findChildren(parentElement)['values'];
            }
        }
        else {
            child = findChildren(data)['values'];
        }
        let isDuplicate;
        let legendName;
        if (child && child.length > 0) {
            for (let i = 0; i < child.length; i++) {
                if (isNullOrUndefined(child[i]['data'][this.treemap.legendSettings.showLegendPath]) ||
                    child[i]['data'][this.treemap.legendSettings.showLegendPath]) {
                    legendName = child[i]['data'][this.treemap.legendSettings.valuePath] ?
                        child[i]['data'][this.treemap.legendSettings.valuePath] : child[i]['name'];
                    isDuplicate = this.treemap.legendSettings.removeDuplicateLegend ?
                        this.removeDuplicates(this.legendCollections, legendName) : false;
                    if (!isDuplicate) {
                        this.legendCollections.push({
                            legendName: legendName,
                            legendFill: this.treemap.palette.length > 0 ? !isNullOrUndefined(this.treemap.currentLevel)
                                ? legendFillColor : this.treemap.palette[i % this.treemap.palette.length] :
                                child[i]['data'][this.treemap.colorValuePath],
                            legendData: [],
                            itemArea: child[i]['weight']
                        });
                    }
                }
            }
            this.legendCollections.sort(orderByArea);
            if (this.treemap.palette.length > 0) {
                for (let j = 0; j < this.legendCollections.length; j++) {
                    this.legendCollections[j]['legendFill'] = !isNullOrUndefined(this.treemap.currentLevel)
                        ? legendFillColor : this.treemap.palette[j % this.treemap.palette.length];
                }
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calculateLegendItems(data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let isAddData;
        let fill;
        let rangeValue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let currentData;
        let legendText;
        let isLeafItem;
        let colorMapProcess = false;
        let colorMapping;
        let groupIndex;
        const leaf = this.treemap.leafItemSettings;
        const levels = this.treemap.levels;
        let equalValue;
        const position = this.treemap.legendSettings.position;
        let gradientElement;
        let x2;
        let y2;
        let actualValue;
        let isDuplicate;
        let isEqualColor;
        let isRange;
        let isDesaturation = false;
        let legendIndex = 0;
        let outfill;
        let labelLegend;
        let otherIndex;
        this.outOfRangeLegend = null;
        for (let i = 0; i < data.length; i++) {
            fill = '';
            isEqualColor = false;
            isRange = false;
            isDesaturation = false;
            currentData = data[i]['data'];
            groupIndex = data[i]['groupIndex'];
            isLeafItem = (this.treemap.levels.length === 0 || groupIndex === this.treemap.levels.length);
            colorMapping = isLeafItem ? leaf.colorMapping : levels[groupIndex].colorMapping;
            for (const colorMap$$1 of colorMapping) {
                gradientElement = null;
                rangeValue = Number(currentData[this.treemap.rangeColorValuePath]);
                equalValue = currentData[this.treemap.equalColorValuePath];
                colorMap$$1.value = !isNullOrUndefined(colorMap$$1.value) ? colorMap$$1.value.toString() : colorMap$$1.value;
                if (!isNullOrUndefined(colorMap$$1.from) && !isNullOrUndefined(colorMap$$1.to) &&
                    rangeValue >= colorMap$$1.from && rangeValue <= colorMap$$1.to && colorMap$$1.showLegend) {
                    colorMapProcess = true;
                    isRange = true;
                    actualValue = colorMap$$1.from + ' - ' + colorMap$$1.to;
                    legendText = !isNullOrUndefined(colorMap$$1.label) ? colorMap$$1.label : colorMap$$1.from + ' - ' + colorMap$$1.to;
                    fill = isNullOrUndefined(colorMap$$1.color) ? fill : colorMap$$1.color;
                    isAddData = this.isAddNewLegendData(actualValue);
                }
                else if (!isNullOrUndefined(colorMap$$1.value) && equalValue === colorMap$$1.value && colorMap$$1.showLegend) {
                    colorMapProcess = true;
                    isEqualColor = true;
                    actualValue = colorMap$$1.value.toString();
                    legendText = !isNullOrUndefined(colorMap$$1.label) ? colorMap$$1.label : colorMap$$1.value.toString();
                    fill = isNullOrUndefined(colorMap$$1.color) ? fill :
                        Object.prototype.toString.call(colorMap$$1.color) === '[object Array]' ? colorMap$$1.color[0] : colorMap$$1.color;
                    isAddData = this.isAddNewLegendData(actualValue);
                }
                if (colorMapProcess && isNullOrUndefined(colorMap$$1.value) && colorMap$$1.maxOpacity && colorMap$$1.minOpacity
                    && this.treemap.legendSettings.mode === 'Interactive') {
                    const colors = [];
                    isDesaturation = true;
                    if (Object.prototype.toString.call(colorMap$$1.color) === '[object Array]') {
                        for (let q = 0; q < colorMap$$1.color.length; q++) {
                            const offsetColor = 100 / (colorMap$$1.color.length - 1);
                            const offsetValue = q * offsetColor + '%';
                            const stop1Color = { colorStop: offsetValue.toString(), color: colorMap$$1.color[q] };
                            colors.push(stop1Color);
                        }
                    }
                    else {
                        const stop1Color = { colorStop: '0%', color: fill };
                        const stop2Color = { colorStop: '100%', color: fill };
                        colors.push(stop1Color);
                        colors.push(stop2Color);
                    }
                    x2 = position === 'Top' || position === 'Bottom' ? '100%' : '0%';
                    y2 = position === 'Top' || position === 'Bottom' ? '0%' : '100%';
                    const gradient = {
                        id: 'groupIndex_' + groupIndex + '_colorIndex_' + this.gradientCount, x1: '0%', y1: '0%', x2: x2, y2: y2
                    };
                    gradientElement = this.treemap.renderer.drawGradient('linearGradient', gradient, colors).childNodes[0];
                    if (Object.prototype.toString.call(colorMap$$1.color) !== '[object Array]') {
                        gradientElement.childNodes[0].setAttribute('stop-opacity', colorMap$$1.minOpacity.toString());
                        gradientElement.childNodes[1].setAttribute('stop-opacity', colorMap$$1.maxOpacity.toString());
                    }
                    this.defsElement.appendChild(gradientElement);
                    this.gradientCount++;
                }
                isDuplicate = this.treemap.legendSettings.removeDuplicateLegend ?
                    this.removeDuplicates(this.legendCollections, legendText) : false;
                if (isAddData && isAddData['process'] && colorMapProcess && !isDuplicate) {
                    colorMapProcess = false;
                    fill = ((Object.prototype.toString.call(colorMap$$1.color) === '[object Array]')) && isNullOrUndefined(gradientElement)
                        && isNullOrUndefined(colorMap$$1.value) ? this.legendGradientColor(colorMap$$1, legendIndex) : fill;
                    this.legendCollections.push({
                        actualValue: actualValue,
                        legendName: legendText, legendFill: fill, legendData: [],
                        gradientElement: !isNullOrUndefined(gradientElement) ? gradientElement : isNullOrUndefined(colorMap$$1.value)
                            ? this.legendLinearGradient : null, name: data[i]['name'],
                        opacity: this.treemap.legendSettings.opacity, borderColor: this.treemap.legendSettings.border.color,
                        borderWidth: this.treemap.legendSettings.border.width
                    });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.legendCollections[this.legendCollections.length - 1]['legendData'].push(data[i]);
                    legendIndex++;
                }
                else if (colorMapProcess && !isDuplicate) {
                    colorMapProcess = false;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.legendCollections[isAddData['value']]['legendData'].push(data[i]);
                }
                if (!isRange && !isDesaturation && !isEqualColor) {
                    if (isNullOrUndefined(colorMap$$1.from) && isNullOrUndefined(colorMap$$1.to)
                        && isNullOrUndefined(colorMap$$1.minOpacity) &&
                        isNullOrUndefined(colorMap$$1.maxOpacity) && isNullOrUndefined(colorMap$$1.value) &&
                        !isNullOrUndefined(colorMap$$1.color)) {
                        outfill = ((Object.prototype.toString.call(colorMap$$1.color) === '[object Array]'))
                            ? colorMap$$1.color[0] : colorMap$$1.color;
                        labelLegend = !isNullOrUndefined(colorMap$$1.label) ? colorMap$$1.label : 'Others';
                        if (isNullOrUndefined(this.outOfRangeLegend)) {
                            this.legendCollections.push({
                                actualValue: labelLegend, legendData: [],
                                legendName: labelLegend, legendFill: outfill
                            });
                            otherIndex = this.legendCollections.length;
                            this.outOfRangeLegend = this.legendCollections[otherIndex - 1];
                            legendIndex++;
                        }
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.legendCollections[otherIndex - 1]['legendData'].push(data[i]);
                    }
                }
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeDuplicates(legendCollection, text) {
        let isDuplicate = false;
        for (let i = 0; i < legendCollection.length; i++) {
            if (legendCollection[i]['legendName'] === text) {
                isDuplicate = true;
                break;
            }
            else {
                continue;
            }
        }
        return isDuplicate;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isAddNewLegendData(legendText) {
        let newDataProcess;
        let itemValue;
        if (this.legendCollections.length === 0) {
            newDataProcess = true;
        }
        else {
            for (let j = 0; j < this.legendCollections.length; j++) {
                if (legendText === this.legendCollections[j]['actualValue']) {
                    newDataProcess = false;
                    itemValue = j;
                    break;
                }
                else if (j === this.legendCollections.length - 1) {
                    newDataProcess = true;
                }
            }
        }
        return { process: newDataProcess, value: itemValue };
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To draw the legend
     */
    drawLegend() {
        const treemap = this.treemap;
        const legend = treemap.legendSettings;
        const render = treemap.renderer;
        let fill;
        let textOptions;
        let gradientElement;
        const textFont = legend.textStyle;
        this.legendGroup = render.createGroup({ id: treemap.element.id + '_Legend_Group' });
        this.renderLegendBorder();
        this.renderLegendTitle();
        if (legend.mode === 'Default') {
            this.drawLegendItem(this.currentPage);
        }
        else {
            for (let i = 0; i < this.legendRenderingCollections.length; i++) {
                const itemId = treemap.element.id + '_Legend_Index_' + i;
                const textId = treemap.element.id + '_Legend_Index_' + i + '_Text';
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const item = this.legendRenderingCollections[i];
                gradientElement = item['element'];
                fill = gradientElement ? 'url(#' + gradientElement.id + ')' : item['fill'];
                const bounds = new Rect(item['x'], item['y'], item['width'], item['height']);
                const textLocation = new Location(item['textX'], item['textY']);
                const rectOptions = new RectOption(itemId, fill, legend.shapeBorder, legend.opacity, bounds);
                if (this.treemap.enableRtl) {
                    if (treemap.legendSettings.position === 'Left' || treemap.legendSettings.position === 'Right'
                        || (treemap.legendSettings.position === 'Auto'
                            && this.treemap.availableSize.width >= this.treemap.availableSize.height)) {
                        rectOptions.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                            - (this.translate.y + rectOptions.height) - Math.abs(this.legendBorderRect.y - rectOptions.y);
                        textLocation.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                            - (this.translate.y) + (item['textHeight'] / 2)
                            - Math.abs(this.legendBorderRect.y - textLocation.y);
                    }
                    else {
                        rectOptions.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
                            - (this.translate.x + rectOptions.width)
                            - Math.abs(this.legendBorderRect.x - rectOptions.x);
                        textLocation.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
                            - this.translate.x - Math.abs(this.legendBorderRect.x - textLocation.x);
                    }
                }
                textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'middle', item['text'], '', '');
                renderTextElement(textOptions, textFont, textFont.color || this.treemap.themeStyle.legendTextColor, this.legendGroup);
                this.legendGroup.appendChild(render.drawRectangle(rectOptions));
            }
        }
        legendMaintain(this.treemap, this.legendGroup);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultLegendRtlLocation(collection, spacing, treemap, legend) {
        const shapeLocation = collection['Shape'];
        const textLocation = collection['Text'];
        const legendText = collection['DisplayText'];
        const textSize = measureText(legendText, legend.textStyle);
        shapeLocation.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
            - (this.translate.x + spacing) - Math.abs(this.legendBorderRect.x - shapeLocation.x);
        textLocation.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
            - (this.translate.x + textSize.width + spacing) - Math.abs(this.legendBorderRect.x - textLocation.x);
        if (treemap.legendSettings.position === 'Left' || treemap.legendSettings.position === 'Right'
            || (treemap.legendSettings.position === 'Auto'
                && this.treemap.availableSize.width >= this.treemap.availableSize.height)) {
            shapeLocation.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                - this.translate.y - Math.abs(Math.abs(this.legendBorderRect.y) - shapeLocation.y) - (legend.shapeHeight / 2);
            textLocation.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                - this.translate.y - Math.abs(Math.abs(this.legendBorderRect.y) - textLocation.y);
        }
        return { shapeLocation: shapeLocation, textLocation: textLocation };
    }
    drawLegendItem(page) {
        const treemap = this.treemap;
        const spacing = 10;
        const legend = treemap.legendSettings;
        const shapeSize = new Size(legend.shapeWidth, legend.shapeHeight);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let textOptions;
        let legendRtlLocation;
        const render = treemap.renderer;
        const shapeBorder = legend.shapeBorder;
        let eventArgs;
        if (page >= 0 && page < this.totalPages.length) {
            if (document.getElementById(this.legendGroup.id)) {
                document.getElementById(this.legendGroup.id).remove();
            }
            const isLineShape = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine' || legend.shape === 'Cross');
            const strokeColor = isLineShape ? isNullOrUndefined(legend.fill) ? '#000000' : legend.fill : shapeBorder.color;
            const strokeWidth = isLineShape ? (shapeBorder.width === 0) ? 1 : shapeBorder.width : shapeBorder.width;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (let i = 0; i < this.totalPages[page]['Collection'].length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const collection = this.totalPages[page]['Collection'][i];
                const legendElement = render.createGroup({ id: treemap.element.id + '_Legend_Index_' + i });
                const legendText = collection['DisplayText'];
                const shapeId = treemap.element.id + '_Legend_Shape_Index_' + i;
                const textId = treemap.element.id + '_Legend_Text_Index_' + i;
                let shapeLocation = collection['Shape'];
                let textLocation = collection['Text'];
                if (treemap.enableRtl) {
                    legendRtlLocation = this.defaultLegendRtlLocation(collection, spacing, treemap, legend);
                    shapeLocation = legendRtlLocation['shapeLocation'];
                    textLocation = legendRtlLocation['textLocation'];
                }
                eventArgs = {
                    cancel: false, name: legendItemRendering, treemap: treemap, fill: collection['Fill'],
                    shape: legend.shape, imageUrl: legend.imageUrl
                };
                this.treemap.trigger(legendItemRendering, eventArgs, (observedArgs) => {
                    const renderOptions = new PathOption(shapeId, observedArgs.fill, strokeWidth, isLineShape ? collection['Fill'] : strokeColor, legend.opacity, '');
                    legendElement.appendChild(drawSymbol(shapeLocation, observedArgs.shape, shapeSize, observedArgs.imageUrl, renderOptions, legendText));
                    textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'start', legendText, '', '');
                    renderTextElement(textOptions, legend.textStyle, legend.textStyle.color || this.treemap.themeStyle.legendTextColor, legendElement);
                    this.legendGroup.appendChild(legendElement);
                });
            }
            let pagingGroup;
            const width = spacing;
            const height = (spacing / 2);
            if (this.page !== 0) {
                const pagingText = (page + 1) + '/' + this.totalPages.length;
                const pagingFont = legend.textStyle;
                const pagingTextSize = measureText(pagingText, pagingFont);
                const leftPageX = (this.legendItemRect.x + this.legendItemRect.width) - pagingTextSize.width -
                    (width * 2) - spacing;
                const rightPageX = (this.legendItemRect.x + this.legendItemRect.width);
                const locY = (this.legendItemRect.y + this.legendItemRect.height) + (height / 2) + spacing;
                const pageTextX = rightPageX - width - (pagingTextSize.width / 2) - (spacing / 2);
                pagingGroup = render.createGroup({ id: treemap.element.id + '_Legend_Paging_Group' });
                const leftPageElement = render.createGroup({ id: treemap.element.id + '_Legend_Left_Paging_Group' });
                const rightPageElement = render.createGroup({ id: treemap.element.id + '_Legend_Right_Paging_Group' });
                const rightPath = ' M ' + rightPageX + ' ' + locY + ' L ' + (rightPageX - width) + ' ' + (locY - height) +
                    ' L ' + (rightPageX - width) + ' ' + (locY + height) + ' z ';
                const leftPath = ' M ' + leftPageX + ' ' + locY + ' L ' + (leftPageX + width) + ' ' + (locY - height) +
                    ' L ' + (leftPageX + width) + ' ' + (locY + height) + ' z ';
                const leftPageOptions = new PathOption(treemap.element.id + '_Left_Page', '#a6a6a6', 0, '#a6a6a6', 1, '', leftPath);
                leftPageElement.appendChild(render.drawPath(leftPageOptions));
                const leftRectPageOptions = new RectOption(treemap.element.id + '_Left_Page_Rect', 'transparent', {}, 1, new Rect(leftPageX - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), '');
                leftPageElement.appendChild(render.drawRectangle(leftRectPageOptions));
                this.wireEvents(leftPageElement);
                const rightPageOptions = new PathOption(treemap.element.id + '_Right_Page', '#a6a6a6', 0, '#a6a6a6', 1, '', rightPath);
                rightPageElement.appendChild(render.drawPath(rightPageOptions));
                const rightRectPageOptions = new RectOption(treemap.element.id + '_Right_Page_Rect', 'transparent', {}, 1, new Rect((rightPageX - width), (locY - height), width, spacing), '');
                rightPageElement.appendChild(render.drawRectangle(rightRectPageOptions));
                this.wireEvents(rightPageElement);
                pagingGroup.appendChild(leftPageElement);
                pagingGroup.appendChild(rightPageElement);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const pageTextOptions = {
                    'id': treemap.element.id + '_Paging_Text',
                    'x': pageTextX,
                    'y': locY + (pagingTextSize.height / 4),
                    'fill': '#a6a6a6',
                    'font-size': '14px',
                    'font-style': pagingFont.fontStyle,
                    'font-family': pagingFont.fontFamily,
                    'font-weight': pagingFont.fontWeight,
                    'text-anchor': 'middle',
                    'transform': '',
                    'opacity': 1,
                    'dominant-baseline': ''
                };
                pagingGroup.appendChild(render.createText(pageTextOptions, pagingText));
                this.legendGroup.appendChild(pagingGroup);
            }
        }
    }
    renderLegendBorder() {
        const treemap = this.treemap;
        const legend = treemap.legendSettings;
        const legendTitle = legend.title.text;
        const spacing = 10;
        const textStyle = legend.titleStyle;
        const title = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        const textSize = measureText(title, textStyle);
        this.legendBorderRect = new Rect((this.legendItemRect.x - spacing), (this.legendItemRect.y - spacing - textSize.height), (this.legendItemRect.width) + (spacing * 2), (this.legendItemRect.height) + (spacing * 2) + textSize.height +
            (legend.mode === 'Interactive' ? 0 : (this.page !== 0) ? spacing : 0));
        const renderOptions = new RectOption(treemap.element.id + '_Legend_Border', legend.background, legend.border, 1, this.legendBorderRect, '');
        const legendBorder = treemap.renderer.drawRectangle(renderOptions);
        legendBorder.style.pointerEvents = 'none';
        this.legendGroup.appendChild(legendBorder);
        this.getLegendAlignment(treemap, this.legendBorderRect.width, this.legendBorderRect.height, legend);
        this.legendGroup.setAttribute('transform', 'translate( ' + (this.translate.x + (-(this.legendBorderRect.x))) + ' ' +
            (this.translate.y + (-(this.legendBorderRect.y))) + ' )');
        treemap.svgObject.appendChild(this.legendGroup);
    }
    renderLegendTitle() {
        const treemap = this.treemap;
        const legend = treemap.legendSettings;
        const textStyle = legend.titleStyle;
        const legendTitle = legend.title.text;
        let textOptions;
        const spacing = 10;
        const trimTitle = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        const textSize = measureText(trimTitle, textStyle);
        if (legendTitle) {
            textOptions = new TextOption(treemap.element.id + '_LegendTitle', (this.legendItemRect.x) + (this.legendItemRect.width / 2), this.legendItemRect.y - (textSize.height / 2) - (spacing / 2), 'middle', trimTitle, '');
            renderTextElement(textOptions, textStyle, textStyle.color || this.treemap.themeStyle.legendTitleColor, this.legendGroup);
        }
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To rendered the interactive pointer
     */
    renderInteractivePointer(e) {
        const treemap = this.treemap;
        let target = e.target;
        const interactiveId = treemap.element.id + '_Interactive_Legend';
        target = !(e.type.indexOf('touch') > -1) ? target :
            document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let targetItem;
        const legend = treemap.legendSettings;
        if (target.id.indexOf('_Item_Index') > -1 && legend.visible && this.legendRenderingCollections.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let currentData;
            let legendRect;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let data;
            let fill;
            let stroke;
            let strokeWidth;
            let legendElement;
            targetItem = treemap.layout.renderItems[parseFloat(target.id.split('_Item_Index_')[1])];
            const svgRect = treemap.svgObject.getBoundingClientRect();
            for (let i = 0; i < this.legendCollections.length; i++) {
                currentData = this.legendCollections[i];
                legendElement = document.getElementById(treemap.element.id + '_Legend_Index_' + i);
                legendRect = legendElement.getBoundingClientRect();
                const rect = new Rect(Math.abs(legendRect.left - svgRect.left), Math.abs(legendRect.top - svgRect.top), legendRect.width, legendRect.height);
                fill = legendElement.getAttribute('fill');
                stroke = legend.shapeBorder.color;
                strokeWidth = legend.shapeBorder.width;
                if (!isNullOrUndefined(currentData['legendData'])) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data = currentData['legendData'];
                    for (let j = 0; j < data.length; j++) {
                        if (data[j]['levelOrderName'] === targetItem['levelOrderName']) {
                            this.drawInteractivePointer(legend, fill, stroke, interactiveId, strokeWidth, rect);
                            break;
                        }
                    }
                }
            }
        }
        else {
            this.removeInteractivePointer();
        }
    }
    drawInteractivePointer(legend, fill, stroke, id, strokeWidth, rect) {
        let path;
        let locX;
        let locY;
        const height = 10;
        const width = 10;
        const direction = (legend.orientation === 'None') ? (legend.position === 'Top' || legend.position === 'Bottom')
            ? 'Horizontal' : 'Vertical' : legend.orientation;
        if (direction === 'Horizontal') {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width / 2);
                locY = rect.y;
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY - height) + ' Z ';
            }
            else {
                locX = rect.x + (rect.width / 2);
                locY = rect.y + (rect.height);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY + height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' Z ';
            }
        }
        else {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX + width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' z ';
            }
            else {
                locX = rect.x;
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX - width) + ' ' + (locY + height) + ' z ';
            }
        }
        const pathOptions = new PathOption(id, fill, strokeWidth, stroke, 1, '', path);
        this.treemap.svgObject.appendChild(this.treemap.renderer.drawPath(pathOptions));
    }
    getLegendAlignment(treemap, width, height, legend) {
        let x;
        let y;
        const spacing = 10;
        let totalRect;
        // eslint-disable-next-line prefer-const
        totalRect = extend({}, treemap.areaRect, totalRect, true);
        const areaX = totalRect.x;
        const areaY = totalRect.y;
        const areaHeight = totalRect.height;
        const areaWidth = totalRect.width;
        const totalWidth = treemap.availableSize.width;
        const totalHeight = treemap.availableSize.height;
        const position = legend.position === 'Auto' ? (totalWidth > totalHeight) ? 'Right' : 'Bottom' : legend.position;
        if (legend.position === 'Float') {
            this.translate = legend.location;
        }
        else {
            switch (position) {
                case 'Top':
                case 'Bottom':
                    totalRect.height = (areaHeight - height);
                    x = (totalWidth / 2) - (width / 2);
                    y = (position === 'Top') ? areaY : (areaY + totalRect.height) + spacing;
                    totalRect.y = (position === 'Top') ? areaY + height + spacing : areaY;
                    break;
                case 'Left':
                case 'Right':
                    totalRect.width = (areaWidth - width);
                    x = (position === 'Left') ? areaX : areaX + totalRect.width;
                    y = (totalHeight / 2) - (height / 2);
                    totalRect.x = (position === 'Left') ? areaX + width : areaX;
                    break;
            }
            switch (legend.alignment) {
                case 'Near':
                    if (position === 'Top' || position === 'Bottom') {
                        x = totalRect.x;
                    }
                    else {
                        y = totalRect.y;
                    }
                    break;
                case 'Far':
                    if (position === 'Top' || position === 'Bottom') {
                        x = totalWidth - width;
                    }
                    else {
                        y = totalHeight - height;
                    }
                    break;
            }
            this.treemap.totalRect = totalRect;
            this.translate = new Location(x, y);
        }
    }
    mouseUpHandler(e) {
        this.renderInteractivePointer(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeInteractivePointer.bind(this), 3000);
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To remove the interactive pointer
     */
    removeInteractivePointer() {
        if (document.getElementById(this.treemap.element.id + '_Interactive_Legend')) {
            const legendElementId = document.getElementById(this.treemap.element.id + '_Interactive_Legend');
            legendElementId.parentNode.removeChild(legendElementId);
        }
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To change the next page
     */
    changeNextPage(e) {
        this.currentPage = (e.target.id.indexOf('_Left_Page_') > -1) ? (this.currentPage - 1) :
            (this.currentPage + 1);
        this.drawLegend();
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * Wire events for event handler
     */
    wireEvents(element) {
        EventHandler.add(element, Browser.touchStartEvent, this.changeNextPage, this);
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To add the event listener
     */
    addEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.renderInteractivePointer, this);
        this.treemap.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To remove the event listener
     */
    removeEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.renderInteractivePointer);
        this.treemap.off(Browser.touchEndEvent, this.mouseUpHandler);
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * Get module name.
     */
    getModuleName() {
        return 'treeMapLegend';
    }
    /**
     * To destroy the legend.
     *
     * @param {TreeMap} treemap - Specifies treemap instance
     * @returns {void}
     * @private
     */
    destroy(treemap) {
        /**
         * Destroy method performed here
         */
        this.removeEventListener();
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * Get the gradient color for interactive legend.
     */
    legendGradientColor(colorMap$$1, legendIndex) {
        let legendFillColor;
        const xmlns = 'http://www.w3.org/2000/svg';
        if (!isNullOrUndefined(colorMap$$1.color) && Object.prototype.toString.call(colorMap$$1.color) === '[object Array]') {
            const defElement = this.treemap.renderer.createDefs();
            const linerGradientEle = document.createElementNS(xmlns, 'linearGradient');
            const opacity = 1;
            const position = this.treemap.legendSettings.position;
            const x2 = position === 'Top' || position === 'Bottom' ? '100' : '0';
            const y2 = position === 'Top' || position === 'Bottom' ? '0' : '100';
            linerGradientEle.setAttribute('id', 'linear_' + legendIndex);
            linerGradientEle.setAttribute('x1', 0 + '%');
            linerGradientEle.setAttribute('y1', 0 + '%');
            linerGradientEle.setAttribute('x2', x2 + '%');
            linerGradientEle.setAttribute('y2', y2 + '%');
            for (let b = 0; b < colorMap$$1.color.length; b++) {
                const offsetColor = 100 / (colorMap$$1.color.length - 1);
                const stopEle = document.createElementNS(xmlns, 'stop');
                stopEle.setAttribute('offset', b * offsetColor + '%');
                stopEle.setAttribute('stop-color', colorMap$$1.color[b]);
                stopEle.setAttribute('stop-opacity', opacity.toString());
                linerGradientEle.appendChild(stopEle);
            }
            defElement.appendChild(linerGradientEle);
            this.legendLinearGradient = linerGradientEle;
            const color = 'url(' + '#linear_' + legendIndex + ')';
            this.defsElement.appendChild(linerGradientEle);
            legendFillColor = color;
        }
        return legendFillColor;
    }
}

/**
 * Performing treemap highlight
 */
class TreeMapHighlight {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(treeMap) {
        this.target = 'highlight';
        this.shapeTarget = 'highlight';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeHighlightCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendHighlightCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.currentElement = [];
        this.treemap = treeMap;
        this.addEventListener();
    }
    /* eslint-disable max-len */
    // eslint-disable-next-line valid-jsdoc
    /**
     * Mouse down event in highlight
     */
    mouseMove(e) {
        const treemap = this.treemap;
        let processHighlight;
        const targetId = e.target.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let eventArgs;
        const items = [];
        const highlight = this.treemap.highlightSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let item;
        const highLightElements = [];
        let process;
        let treeMapElement;
        let element;
        let orders;
        const selectionModule = this.treemap.treeMapSelectionModule;
        if (targetId.indexOf('_Item_Index') > -1 && (selectionModule ? this.treemap.selectionId !== targetId : true)) {
            if (this.highLightId !== targetId) {
                treeMapElement = document.getElementById(treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout');
                const selectionElements = document.getElementsByClassName('treeMapSelection');
                item = this.treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                let index;
                if (this.treemap.legendSettings.visible) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const collection = this.treemap.treeMapLegendModule.legendCollections;
                    const length = this.treemap.treeMapLegendModule.legendCollections.length;
                    index = getLegendIndex(length, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null && (selectionModule ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true)) {
                        if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true) {
                            this.currentElement.push({ currentElement: this.shapeElement });
                            removeShape(this.shapeHighlightCollection, 'highlight');
                            this.shapeHighlightCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                                oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                                oldBorderWidth: collection[index]['borderWidth']
                            });
                            setColor(this.shapeElement, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            this.target = 'highlight';
                        }
                        else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                            removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                            this.highLightId = '';
                        }
                    }
                    else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                        removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                        this.highLightId = '';
                    }
                }
                orders = findHightLightItems(item, [], highlight.mode, treemap);
                if (this.treemap.legendSettings.visible ? selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true : true) {
                    if (this.treemap.legendSettings.visible ? selectionModule ? this.shapeElement !== selectionModule.shapeElement : true : true) {
                        for (let i = 0; i < treeMapElement.childElementCount; i++) {
                            element = treeMapElement.childNodes[i];
                            process = true;
                            item = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                            for (let j = 0; j < selectionElements.length; j++) {
                                if (element.id === selectionElements[j].id) {
                                    process = false;
                                    break;
                                }
                            }
                            if (orders.indexOf(item['levelOrderName']) > -1 && process) {
                                highLightElements.push(element);
                                items.push(item);
                            }
                        }
                        removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                        for (let k = 0; k < highLightElements.length; k++) {
                            element = highLightElements[k];
                            applyOptions(element.childNodes[0], { border: highlight.border, fill: highlight.fill, opacity: highlight.opacity });
                            element.classList.add('treeMapHighLight');
                            this.highLightId = targetId;
                        }
                        eventArgs = { cancel: false, name: itemHighlight, treemap: treemap, items: items, elements: highLightElements };
                        treemap.trigger(itemHighlight, eventArgs);
                    }
                    else {
                        processHighlight = false;
                    }
                }
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1) {
            if (this.treemap.legendSettings.visible && (selectionModule ? selectionModule.legendSelectId !== targetId : true) && (selectionModule ? selectionModule.shapeSelectId !== targetId : true)) {
                let itemIndex;
                let groupIndex;
                let length;
                const targetEle = document.getElementById(targetId);
                if (this.shapeTarget === 'highlight') {
                    removeLegend(this.legendHighlightCollection, 'highlight');
                }
                this.shapeTarget = 'highlight';
                const index = this.treemap.legendSettings.mode === 'Default' ? parseFloat(targetId.split('_Legend_Shape_Index_')[1]) : parseFloat(targetId.split('_Legend_Index_')[1]);
                const dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const collection = this.treemap.treeMapLegendModule.legendCollections;
                const legendIndex = parseInt(targetId[targetId.length - 1], 10);
                for (let i = 0; i < dataLength; i++) {
                    for (let j = 0; j < this.treemap.layout.renderItems.length; j++) {
                        if (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][i]['levelOrderName'] === this.treemap.layout.renderItems[j]['levelOrderName']) {
                            itemIndex = j;
                            groupIndex = this.treemap.layout.renderItems[j]['groupIndex'];
                            const nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (i === 0) {
                                this.legendHighlightCollection = [];
                                pushCollection(this.legendHighlightCollection, legendIndex, j, targetEle, nodeEle, this.treemap.layout.renderItems, collection);
                                length = this.legendHighlightCollection.length;
                                this.legendHighlightCollection[length - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            setColor(targetEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            setColor(nodeEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            length = this.legendHighlightCollection.length;
                            this.legendHighlightCollection[length - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
        }
        else {
            if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && this.treemap.legendSettings.visible) {
                    removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                }
            }
            if ((this.shapeTarget === 'highlight' || this.target === 'highlight') && this.treemap.legendSettings.visible) {
                if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                    if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && selectionModule ? selectionModule.legendSelect : true) {
                        removeShape(this.shapeHighlightCollection, 'highlight');
                        this.shapeHighlightCollection = [];
                    }
                }
            }
            if (this.shapeTarget === 'highlight' && this.treemap.legendSettings.visible) {
                removeLegend(this.legendHighlightCollection, 'highlight');
            }
            this.highLightId = '';
            processHighlight = false;
        }
        return processHighlight;
    }
    /**
     * To bind events for highlight
     *
     * @returns {void}
     */
    addEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.mouseMove, this);
    }
    /**
     * To unbind events for highlight
     *
     * @returns {void}
     */
    removeEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.mouseMove);
    }
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    getModuleName() {
        return 'treeMapHighlight';
    }
    /**
     * To destroy the hightlight.
     *
     * @param {TreeMap} treeMap - Specifies the instance of the treemap.
     * @returns {void}
     * @private
     */
    destroy(treeMap) {
        this.removeEventListener();
    }
}
/**
 * Performing treemap selection
 */
class TreeMapSelection {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(treeMap) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeSelectionCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendSelectionCollection = [];
        this.shapeSelect = true;
        this.legendSelect = true;
        this.treemap = treeMap;
        this.addEventListener();
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * Mouse down event in selection
     */
    mouseDown(e) {
        const targetEle = e.target;
        let eventArgs;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const treemap = this.treemap;
        treemap.levelSelection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = [];
        const targetId = targetEle.id;
        const labelText = targetEle.innerHTML;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let item;
        const selectionElements = [];
        let treeMapElement;
        let element;
        let orders;
        const selection = treemap.selectionSettings;
        const highlightModule = this.treemap.treeMapHighlightModule;
        const layoutID = treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout';
        if (targetId.indexOf('_Item_Index') > -1) {
            e.preventDefault();
            if (this.treemap.selectionId !== targetId && this.legendSelect) {
                treeMapElement = document.getElementById(layoutID);
                item = treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                let index;
                if (this.treemap.legendSettings.visible) {
                    this.shapeSelect = false;
                    const length = this.treemap.treeMapLegendModule.legendCollections.length;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeShape(this.shapeSelectionCollection, 'selection');
                    if (highlightModule) {
                        highlightModule.shapeTarget = 'selection';
                        highlightModule.shapeHighlightCollection = [];
                    }
                    index = getLegendIndex(length, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.shapeSelectionCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                    }
                }
                orders = findHightLightItems(item, [], selection.mode, treemap);
                for (let i = 0; i < treeMapElement.childElementCount; i++) {
                    element = treeMapElement.childNodes[i];
                    item = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                    if (orders.indexOf(item['levelOrderName']) > -1) {
                        selectionElements.push(element);
                        treemap.levelSelection.push(element.id);
                        items.push(item);
                    }
                }
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.treemap.selectionId = targetId;
                const highLightElements = document.getElementsByClassName('treeMapHighLight');
                for (let k = 0; k < selectionElements.length; k++) {
                    element = selectionElements[k];
                    if (highLightElements.length > 0) {
                        for (let j = 0; j < highLightElements.length; j++) {
                            if (highLightElements[j].id === element.id) {
                                highLightElements[j].classList.remove('treeMapHighLight');
                            }
                            applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                            element.classList.add('treeMapSelection');
                        }
                    }
                    else {
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                    eventArgs = { cancel: false, name: itemSelected, treemap: treemap, items: items, elements: selectionElements,
                        text: labelText, contentItemTemplate: labelText };
                    treemap.trigger(itemSelected, eventArgs, (observedArgs) => {
                        if (observedArgs.contentItemTemplate !== labelText) {
                            setItemTemplateContent(targetId, targetEle, observedArgs.contentItemTemplate);
                        }
                    });
                }
            }
            else {
                removeShape(this.shapeSelectionCollection, 'selection');
                this.shapeSelectionCollection = [];
                this.shapeElement = undefined;
                this.shapeSelect = true;
                this.shapeSelectId = '';
                this.treemap.legendId = [];
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.treemap.selectionId = '';
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const collection = this.treemap.treeMapLegendModule.legendCollections;
            if (this.treemap.legendSettings.visible && this.legendSelectId !== targetId && this.shapeSelect) {
                let itemIndex;
                let groupIndex;
                let length;
                this.legendSelectId = targetId;
                this.legendSelect = false;
                const legendIndex = parseInt(targetId[targetId.length - 1], 10);
                const targetEle = document.getElementById(targetId);
                removeLegend(this.legendSelectionCollection, 'selection');
                if (highlightModule) {
                    highlightModule.shapeTarget = 'selection';
                }
                const index = this.treemap.legendSettings.mode === 'Default' ? parseFloat(targetId.split('_Legend_Shape_Index_')[1]) : parseFloat(targetId.split('_Legend_Index_')[1]);
                const dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                for (let k = 0; k < dataLength; k++) {
                    for (let l = 0; l < this.treemap.layout.renderItems.length; l++) {
                        if (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][k]['levelOrderName'] === this.treemap.layout.renderItems[l]['levelOrderName']) {
                            itemIndex = l;
                            groupIndex = this.treemap.layout.renderItems[l]['groupIndex'];
                            const nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (k === 0) {
                                pushCollection(this.legendSelectionCollection, legendIndex, l, targetEle, nodeEle, this.treemap.layout.renderItems, collection);
                                length = this.legendSelectionCollection.length;
                                this.legendSelectionCollection[length - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            setColor(targetEle, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            setColor(nodeEle, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            length = this.legendSelectionCollection.length;
                            this.legendSelectionCollection[length - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
            else {
                removeLegend(this.legendSelectionCollection, 'Selection');
                if (highlightModule) {
                    highlightModule.shapeTarget = 'highlight';
                }
                this.legendSelect = true;
                this.legendSelectId = '';
            }
        }
    }
    /**
     * @param {string} levelOrder - Specifies the level order of treemap item
     * @param {boolean} enable - Specifies the boolean value
     * @returns {void}
     * @private
     */
    selectTreemapItem(levelOrder, enable) {
        if (enable) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let item;
            for (let s = 0; s < this.treemap.layout.renderItems.length; s++) {
                if (levelOrder === this.treemap.layout.renderItems[s]['levelOrderName']) {
                    item = this.treemap.layout.renderItems[s];
                    break;
                }
            }
            const selection = this.treemap.selectionSettings;
            const selectionElements = [];
            let element;
            let index;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items = [];
            this.treemap.levelSelection = [];
            const layoutID = this.treemap.element.id + '_TreeMap_' + this.treemap.layoutType + '_Layout';
            const treeMapElement = document.getElementById(layoutID);
            const orders = findHightLightItems(item, [], selection.mode, this.treemap);
            for (let i = 0; i < treeMapElement.childElementCount; i++) {
                element = treeMapElement.childNodes[i];
                item = this.treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                if (orders.indexOf(item['levelOrderName']) > -1) {
                    selectionElements.push(element);
                    this.treemap.levelSelection.push(element.id);
                    items.push(item);
                }
            }
            if (this.treemap.legendSettings.visible) {
                for (let m = 0; m < items.length; m++) {
                    this.shapeSelect = false;
                    const length = this.treemap.treeMapLegendModule.legendCollections.length;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeShape(this.shapeSelectionCollection, 'selection');
                    index = getLegendIndex(length, items[m], this.treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.treemap.legendId.push(this.shapeSelectId);
                        this.shapeSelectionCollection.push({
                            legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                    }
                }
            }
            removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', this.treemap);
            const selectionElement = document.getElementById(this.treemap.levelSelection[0]);
            this.treemap.selectionId = selectionElement.childNodes[0]['id'];
            const highLightElements = document.getElementsByClassName('treeMapHighLight');
            for (let k = 0; k < selectionElements.length; k++) {
                element = selectionElements[k];
                if (highLightElements.length > 0) {
                    for (let j = 0; j < highLightElements.length; j++) {
                        if (highLightElements[j].id === element.id) {
                            highLightElements[j].classList.remove('treeMapHighLight');
                        }
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                }
                else {
                    selection.fill = selection.fill === 'null' ?
                        this.treemap.layout.renderItems[parseInt(element.id.split('Item_Index_')[1], 10)]['options']['fill']
                        : selection.fill;
                    applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                    element.classList.add('treeMapSelection');
                }
            }
        }
        else {
            removeShape(this.shapeSelectionCollection, 'selection');
            this.shapeElement = undefined;
            this.treemap.levelSelection = [];
            this.shapeSelect = true;
            this.shapeSelectId = '';
            this.treemap.legendId = [];
            removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', this.treemap);
            this.treemap.selectionId = '';
        }
    }
    /**
     * To bind events for selection
     *
     * @returns {void}
     */
    addEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchStartEvent, this.mouseDown, this);
    }
    /**
     * To unbind events for selection
     *
     * @returns {void}
     */
    removeEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchStartEvent, this.mouseDown);
    }
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    getModuleName() {
        return 'treeMapSelection';
    }
    /**
     * To destroy the selection.
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @returns {void}
     * @private
     */
    destroy(treeMap) {
        this.removeEventListener();
    }
}

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * Render Tooltip
 */
class TreeMapTooltip {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(treeMap) {
        this.treemap = treeMap;
        this.tooltipSettings = this.treemap.tooltipSettings;
        this.tooltipId = this.treemap.element.id + '_TreeMapTooltip';
        this.addEventListener();
    }
    renderTooltip(e) {
        let pageX;
        let pageY;
        let target;
        let touchArg;
        let tootipArgs;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let value;
        const targetId = target.id;
        let item = {};
        let tooltipEle;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let location;
        let toolTipHeader;
        let toolTipData = {};
        let tooltipContent = [];
        let markerFill;
        if (targetId.indexOf('_Item_Index') > -1) {
            item = this.treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
            if (!isNullOrUndefined(item)) {
                toolTipHeader = item['name'];
                value = item['weight'];
                toolTipData = item['data'];
                markerFill = item['options']['fill'];
                if (this.treemap.enableRtl) {
                    tooltipContent = [textFormatter(this.tooltipSettings.format, toolTipData, this.treemap) ||
                            formatValue(value, this.treemap) + ' : ' + this.treemap.weightValuePath.toString()];
                }
                else {
                    tooltipContent = [textFormatter(this.tooltipSettings.format, toolTipData, this.treemap) ||
                            this.treemap.weightValuePath.toString() + ' : ' + formatValue(value, this.treemap)];
                }
                if (document.getElementById(this.tooltipId)) {
                    tooltipEle = document.getElementById(this.tooltipId);
                }
                else {
                    tooltipEle = createElement('div', {
                        id: this.treemap.element.id + '_TreeMapTooltip',
                        className: 'EJ2-TreeMap-Tooltip',
                        styles: 'position: absolute;pointer-events:none;'
                    });
                    document.getElementById(this.treemap.element.id + '_Secondary_Element').appendChild(tooltipEle);
                }
                location = getMousePosition(pageX, pageY, this.treemap.svgObject);
                location.y = (this.tooltipSettings.template) ? location.y + 10 : location.y;
                this.tooltipSettings.textStyle.fontFamily = this.treemap.themeStyle.fontFamily;
                this.tooltipSettings.textStyle.color = this.treemap.themeStyle.tooltipFontColor
                    || this.tooltipSettings.textStyle.color;
                this.tooltipSettings.textStyle.opacity = this.treemap.themeStyle.tooltipTextOpacity
                    || this.tooltipSettings.textStyle.opacity;
                tootipArgs = {
                    cancel: false, name: tooltipRendering, item: item,
                    options: {
                        location: location, text: tooltipContent, data: toolTipData,
                        textStyle: this.tooltipSettings.textStyle, template: this.tooltipSettings.template
                    },
                    treemap: this.treemap,
                    element: target, eventArgs: e
                };
                this.treemap.trigger(tooltipRendering, tootipArgs, (args) => {
                    this.addTooltip(tootipArgs, markerFill, tooltipEle);
                });
            }
        }
        else {
            this.removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.treemap.clearTemplate();
        }
    }
    addTooltip(tootipArgs, markerFill, tooltipEle, eventArgs) {
        let cancel;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let args;
        if (!isNullOrUndefined(tootipArgs)) {
            const { cancel: c } = tootipArgs, otherArgs = __rest(tootipArgs, ["cancel"]);
            cancel = c;
            args = otherArgs.options;
        }
        else {
            cancel = eventArgs.cancel;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args = eventArgs;
        }
        if (!cancel) {
            this.svgTooltip = new Tooltip({
                enable: true,
                header: '',
                data: args['data'],
                template: args['template'],
                content: args['text'],
                shapes: [],
                location: args['location'],
                palette: [markerFill],
                areaBounds: this.treemap.areaRect,
                textStyle: args['textStyle'],
                fill: this.treemap.tooltipSettings.fill ? this.treemap.tooltipSettings.fill : this.treemap.themeStyle.tooltipFillColor
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.treemap.isVue || this.treemap.isVue3) {
                this.svgTooltip.controlInstance = this.treemap;
            }
            this.svgTooltip.opacity = this.treemap.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
            this.svgTooltip.appendTo(tooltipEle);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.treemap.renderReactTemplates();
        }
        else {
            this.removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.treemap.clearTemplate();
        }
    }
    mouseUpHandler(e) {
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    }
    removeTooltip() {
        if (document.getElementsByClassName('EJ2-TreeMap-Tooltip').length > 0) {
            const tooltipElementId = document.getElementsByClassName('EJ2-TreeMap-Tooltip')[0];
            tooltipElementId.parentNode.removeChild(tooltipElementId);
        }
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To bind events for tooltip module
     */
    addEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.treemap.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To unbind events for tooltip module
     */
    removeEventListener() {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.renderTooltip);
        this.treemap.off(Browser.touchEndEvent, this.mouseUpHandler);
    }
    /**
     * Get module name.
     *
     * @returns {string} returns string
     */
    getModuleName() {
        return 'treeMapTooltip';
    }
    /**
     * To destroy the tooltip.
     *
     * @param {TreeMap} treeMap - Specifies the instance of the treemap
     * @returns {void}
     * @private
     */
    destroy(treeMap) {
        /**
         * Destroy method performed here
         */
        this.removeEventListener();
    }
}

/**
 * export all modules from treemap component
 */

/**
 * exporting all modules from tree map index
 */

export { TreeMap, LevelsData, Border, Margin, Font, CommonTitleSettings, SubTitleSettings, TitleSettings, ColorMapping, LegendSettings, InitialDrillSettings, LeafItemSettings, TooltipSettings, SelectionSettings, HighlightSettings, LevelSettings, load, loaded, beforePrint, itemRendering, drillStart, drillEnd, itemSelected, itemHighlight, tooltipRendering, itemClick, itemMove, click, doubleClick, rightClick, mouseMove, legendItemRendering, legendRendering, resize, defaultFont, Theme, getThemeStyle, Size, stringToNumber, Rect, RectOption, PathOption, measureText, TextOption, textTrim, Location, findPosition, createTextStyle, renderTextElement, setItemTemplateContent, getElement, itemsToOrder, isContainsData, findChildren, findHightLightItems, getTemplateFunction, convertElement, findLabelLocation, measureElement, getArea, getShortestEdge, convertToContainer, convertToRect, getMousePosition, colorMap, deSaturationColor, colorCollections, rgbToHex, getColorByValue, getGradientColor, getPercentageColor, getPercentage, wordWrap, textWrap, hide, orderByArea, maintainSelection, legendMaintain, removeClassNames, applyOptions, textFormatter, formatValue, ColorValue, convertToHexCode, componentToHex, convertHexToColor, colorNameToHex, drawSymbol, renderLegendShape, isParentItem, TreeMapAjax, removeShape, removeLegend, setColor, removeSelectionWithHighlight, getLegendIndex, pushCollection, triggerDownload, removeElement, TreeMapLegend, LayoutPanel, TreeMapHighlight, TreeMapSelection, TreeMapTooltip, ImageExport, PdfExport, Print };
//# sourceMappingURL=ej2-treemap.es2015.js.map
