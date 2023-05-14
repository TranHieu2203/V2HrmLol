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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
/**
 * Maps Component file
 */
import { Component, NotifyPropertyChanges, Property, Ajax } from '@syncfusion/ej2-base';
import { EventHandler, Browser, isNullOrUndefined, createElement, setValue, extend } from '@syncfusion/ej2-base';
import { Event, remove, L10n, Collection, Internationalization, Complex } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Size, createSvg, Point, removeElement, triggerShapeEvent, showTooltip, checkShapeDataFields, getMousePosition, calculateSize } from './utils/helper';
import { getElement, removeClass, getTranslate, triggerItemSelectionEvent, mergeSeparateCluster, customizeStyle, querySelector } from './utils/helper';
import { createStyle } from './utils/helper';
import { ZoomSettings, LegendSettings } from './model/base';
import { LayerSettings, TitleSettings, Border, Margin, MapsAreaSettings, Annotation, CenterPosition } from './model/base';
import { Marker } from './layers/marker';
import { load, click, onclick, loaded, doubleClick, resize, shapeSelected, zoomIn } from './model/constants';
import { getThemeStyle, Theme } from './model/theme';
import { BingMap } from './layers/bing-map';
import { LayerPanel } from './layers/layer-panel';
import { Rect, RectOption, measureText, getElementByID, MapAjax, processResult, getElementsByClassName } from '../maps/utils/helper';
import { findPosition, textTrim, TextOption, renderTextElement, convertGeoToPoint, calculateZoomLevel } from '../maps/utils/helper';
import { Annotations } from '../maps/user-interaction/annotation';
import { MarkerSettings } from './index';
import { changeBorderWidth } from './index';
import { DataManager, Query } from '@syncfusion/ej2-data';
/**
 * Represents the Maps control.
 * ```html
 * <div id="maps"/>
 * <script>
 *   var maps = new Maps();
 *   maps.appendTo("#maps");
 * </script>
 * ```
 */
var Maps = /** @class */ (function (_super) {
    __extends(Maps, _super);
    /**
     * Constructor for creating the widget
     *
     * @param {MapsModel} options Specifies the options
     * @param {string | HTMLElement} element Specifies the element
     */
    function Maps(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Check layer whether is geometry or tile
         *
         * @private
         */
        _this.isTileMap = false;
        /**
         * Resize the map
         */
        _this.isResize = false;
        /**
         * @private
         */
        _this.isReset = false;
        /** @private */
        _this.baseSize = new Size(0, 0);
        /** @public */
        _this.translatePoint = new Point(0, 0);
        /** @private */
        _this.baseTranslatePoint = new Point(0, 0);
        /** @public */
        _this.zoomTranslatePoint = new Point(0, 0);
        /** @private */
        _this.markerZoomedState = true;
        /** @private */
        _this.zoomPersistence = false;
        /** @private */
        _this.defaultState = true;
        /** @private */
        _this.centerPositionChanged = false;
        /** @private */
        _this.isTileMapSubLayer = false;
        /** @private */
        _this.markerNullCount = 0;
        /** @private */
        _this.tileTranslatePoint = new Point(0, 0);
        /** @private */
        _this.baseTileTranslatePoint = new Point(0, 0);
        /** @private */
        // eslint-disable-next-line @typescript-eslint/ban-types
        _this.isDevice = false;
        /** @private */
        _this.staticMapZoom = _this.zoomSettings.enable ? _this.zoomSettings.zoomFactor : 0;
        /** @private */
        _this.zoomNotApplied = false;
        /** @public */
        _this.dataLabelShape = [];
        _this.zoomShapeCollection = [];
        _this.zoomLabelPositions = [];
        _this.mouseDownEvent = { x: null, y: null };
        _this.mouseClickEvent = { x: null, y: null };
        /** @private */
        _this.selectedElementId = [];
        /** @private */
        _this.selectedMarkerElementId = [];
        /** @private */
        _this.selectedBubbleElementId = [];
        /** @private */
        _this.selectedNavigationElementId = [];
        /** @private */
        _this.selectedLegendElementId = [];
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.legendSelectionCollection = [];
        /** @private */
        _this.shapeSelections = true;
        /** @private */
        _this.legendSelection = true;
        /** @private */
        _this.toggledLegendId = [];
        /** @private */
        _this.toggledShapeElementId = [];
        /** @private */
        _this.checkInitialRender = true;
        /** @private */
        _this.initialTileTranslate = new Point(0, 0);
        /** @private */
        _this.initialCheck = true;
        /** @private */
        _this.applyZoomReset = false;
        /** @private */
        _this.markerClusterExpandCheck = false;
        /** @private */
        _this.markerClusterExpand = false;
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.shapeSelectionItem = [];
        setValue('mergePersistData', _this.mergePersistMapsData, _this);
        return _this;
    }
    Object.defineProperty(Maps.prototype, "isShapeSelected", {
        /**
         *
         * Specifies whether the shape is selected in the maps or not.
         *
         * @returns {boolean} - Returns the boolean value.
         */
        get: function () {
            return this.mapSelect;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To manage persist maps data
     *
     * @returns {void}
     */
    Maps.prototype.mergePersistMapsData = function () {
        var data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var windowData;
        try {
            windowData = window.localStorage;
        }
        catch (e) {
            windowData = null;
        }
        if (!isNullOrUndefined(windowData)) {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        }
        if (!(isNullOrUndefined(data) || (data === ''))) {
            var dataObj = JSON.parse(data);
            var keys = Object.keys(dataObj);
            this.isProtectedOnChange = true;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if ((typeof this[key] === 'object') && !isNullOrUndefined(this[key])) {
                    extend(this[key], dataObj[key]);
                }
                else {
                    this[key] = dataObj[key];
                }
            }
            this.isProtectedOnChange = false;
        }
    };
    /**
     * Gets the localized label by locale keyword.
     *
     * @param  {string} key - Specifies the key
     * @returns {string} - Returns the string value
     */
    Maps.prototype.getLocalizedLabel = function (key) {
        return this.localeObject.getConstant(key);
    };
    /**
     * Initializing pre-required values.
     *
     * @returns {void}
     */
    Maps.prototype.preRender = function () {
        this.isDevice = Browser.isDevice;
        this.initPrivateVariable();
        this.allowServerDataBinding = false;
        this.unWireEVents();
        this.wireEVents();
        this.setCulture();
    };
    Maps.prototype.renderElements = function () {
        this.trigger(load, { maps: this });
        this.createSVG();
        this.findBaseAndSubLayers();
        this.createSecondaryElement();
        this.addTabIndex();
        this.themeStyle = getThemeStyle(this.theme);
        this.renderBorder();
        this.renderTitle(this.titleSettings, 'title', null, null);
        this.renderArea();
        this.processRequestJsonData();
        this.renderComplete();
        this.isAddLayer = !this.isTileMap ? false : this.isAddLayer;
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    Maps.prototype.render = function () {
        this.renderElements();
    };
    Maps.prototype.processRequestJsonData = function () {
        var _this = this;
        var length = this.layersCollection.length - 1;
        this.serverProcess = { request: 0, response: 0 };
        var queryModule;
        var localAjax;
        var ajaxModule;
        var dataModule;
        Array.prototype.forEach.call(this.layersCollection, function (layer, layerIndex) {
            if (layer.shapeData instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.shapeData;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataManager = dataModule.executeQuery(queryModule);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataManager.then(function (e) {
                    _this.processResponseJsonData('DataManager', e, layer, 'ShapeData');
                });
            }
            else if (layer.shapeData instanceof MapAjax || layer.shapeData) {
                if (!isNullOrUndefined(layer.shapeData['dataOptions'])) {
                    _this.processAjaxRequest(layer, layer.shapeData, 'ShapeData');
                }
            }
            if (layer.dataSource instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.dataSource;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataManager = dataModule.executeQuery(queryModule);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataManager.then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    layer.dataSource = processResult(e);
                });
            }
            if (layer.markerSettings.length > 0) {
                var _loop_1 = function (i) {
                    if (layer.markerSettings[i].dataSource instanceof DataManager) {
                        _this.serverProcess['request']++;
                        dataModule = layer.markerSettings[i].dataSource;
                        queryModule = layer.markerSettings[i].query instanceof Query ? layer.markerSettings[i].query : new Query();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataManager = dataModule.executeQuery(queryModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataManager.then(function (e) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.markerSettings[i].dataSource = processResult(e);
                        });
                    }
                };
                for (var i = 0; i < layer.markerSettings.length; i++) {
                    _loop_1(i);
                }
            }
            if (layer.bubbleSettings.length > 0) {
                var _loop_2 = function (i) {
                    if (layer.bubbleSettings[i].dataSource instanceof DataManager) {
                        _this.serverProcess['request']++;
                        dataModule = layer.bubbleSettings[i].dataSource;
                        queryModule = layer.bubbleSettings[i].query instanceof Query ? layer.bubbleSettings[i].query : new Query();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataManager = dataModule.executeQuery(queryModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataManager.then(function (e) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.bubbleSettings[i].dataSource = processResult(e);
                        });
                    }
                };
                for (var i = 0; i < layer.bubbleSettings.length; i++) {
                    _loop_2(i);
                }
            }
            if (layer.dataSource instanceof MapAjax || !isNullOrUndefined(layer.dataSource['dataOptions'])) {
                _this.processAjaxRequest(layer, layer.dataSource, 'DataSource');
            }
            if (_this.serverProcess['request'] === _this.serverProcess['response'] && length === layerIndex) {
                _this.processResponseJsonData(null);
            }
        });
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Maps.prototype.processAjaxRequest = function (layer, localAjax, type) {
        var _this = this;
        this.serverProcess['request']++;
        var ajaxModule = new Ajax(localAjax.dataOptions, localAjax.type, localAjax.async, localAjax.contentType);
        ajaxModule.onSuccess = function (args) {
            _this.processResponseJsonData('Ajax', args, layer, type);
        };
        ajaxModule.send(localAjax.sendData);
    };
    /**
     * This method is used to process the JSON data to render the maps.
     *
     * @param {string} processType - Specifies the process type in maps.
     * @param {any | string} data - Specifies the data for maps.
     * @param {LayerSettings} layer - Specifies the layer for the maps.
     * @param {string} dataType - Specifies the data type for maps.
     * @returns {void}
     */
    Maps.prototype.processResponseJsonData = function (processType, data, layer, dataType) {
        this.serverProcess['response']++;
        if (processType) {
            if (dataType === 'ShapeData') {
                layer.shapeData = (processType === 'DataManager') ? processResult(data) : JSON.parse(data);
            }
            else {
                layer.dataSource = (processType === 'DataManager') ? processResult(data) : JSON.parse('[' + data + ']')[0];
            }
        }
        if (!isNullOrUndefined(processType) && this.serverProcess['request'] === this.serverProcess['response']) {
            var collection = this.layersCollection;
            this.layersCollection = [];
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].isBaseLayer) {
                    this.layersCollection.push(collection[i]);
                }
            }
            for (var j = 0; j < collection.length; j++) {
                if (!collection[j].isBaseLayer) {
                    this.layersCollection.push(collection[j]);
                }
            }
            this.renderMap();
        }
        else if (isNullOrUndefined(processType)) {
            this.renderMap();
        }
    };
    Maps.prototype.renderMap = function () {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.renderLegend();
        }
        this.createTile();
        if (this.zoomSettings.enable && this.zoomModule) {
            this.zoomModule.createZoomingToolbars();
        }
        if (!isNullOrUndefined(this.dataLabelModule)) {
            this.dataLabelModule.dataLabelCollections = [];
            this.dataLabelShape = [];
        }
        this.mapLayerPanel.measureLayerPanel();
        this.element.appendChild(this.svgObject);
        var position = this.getExtraPosition();
        for (var i = 0; i < this.layers.length; i++) {
            if (position.x !== 0 || position.y !== 0) {
                var markerTemplate = document.getElementById(this.element.id + '_LayerIndex_' + i + '_Markers_Template_Group');
                if (!isNullOrUndefined(markerTemplate)) {
                    markerTemplate.style.top = this.mapAreaRect.y + position.y + 'px';
                    markerTemplate.style.left = this.mapAreaRect.x + position.x + 'px';
                }
            }
            if (this.layers[i].selectionSettings && this.layers[i].selectionSettings.enable &&
                this.layers[i].initialShapeSelection.length > 0 && this.checkInitialRender) {
                var checkSelection = this.layers[i].selectionSettings.enableMultiSelect;
                this.layers[i].selectionSettings.enableMultiSelect = checkSelection ? checkSelection : true;
                var shapeSelection = this.layers[i].initialShapeSelection;
                for (var j = 0; j < this.layers[i].initialShapeSelection.length; j++) {
                    this.shapeSelection(i, shapeSelection[j].shapePath, shapeSelection[j].shapeValue, true);
                }
                this.layers[i].selectionSettings.enableMultiSelect = checkSelection;
                if (i === this.layers.length - 1) {
                    this.checkInitialRender = false;
                }
            }
            if (!this.isResize) {
                for (var k = 0; k < this.layers[i].markerSettings.length; k++) {
                    if (this.layers[i].markerSettings[k].selectionSettings && this.layers[i].markerSettings[k].selectionSettings.enable
                        && this.layers[i].markerSettings[k].initialMarkerSelection.length > 0) {
                        var markerSelectionValues = this.layers[i].markerSettings[k].initialMarkerSelection;
                        for (var j = 0; j < markerSelectionValues.length; j++) {
                            this.markerInitialSelection(i, k, this.layers[i].markerSettings[k], markerSelectionValues[j].latitude, markerSelectionValues[j].longitude);
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(document.getElementById(this.element.id + '_tile_parent'))) {
            var svg = this.svgObject.getBoundingClientRect();
            var element = document.getElementById(this.element.id);
            var tileElement = document.getElementById(this.element.id + '_tile_parent');
            var tileElement1 = document.getElementById(this.element.id + '_tiles');
            var tile = tileElement.getBoundingClientRect();
            var bottom = void 0;
            var top_1;
            var left = void 0;
            left = parseFloat(tileElement.style.left) + element.offsetLeft;
            var titleTextSize = measureText(this.titleSettings.text, this.titleSettings.textStyle);
            var subTitleTextSize = measureText(this.titleSettings.subtitleSettings.text, this.titleSettings.subtitleSettings.textStyle);
            if (this.isTileMap && this.isTileMapSubLayer && this.legendSettings.position === 'Bottom' && this.legendSettings.visible) {
                if (this.legendSettings.mode !== 'Default') {
                    if (titleTextSize.width !== 0 && titleTextSize.height !== 0) {
                        top_1 = parseFloat(tileElement.style.top) + element.offsetTop + (subTitleTextSize.height / 2)
                            - (this.legendModule.legendBorderRect.height / 2);
                    }
                    else {
                        top_1 = parseFloat(tileElement.style.top) + element.offsetTop - this.mapAreaRect.y;
                    }
                }
                else {
                    left = this.legendModule.legendBorderRect.x;
                    if (titleTextSize.width !== 0 && titleTextSize.height !== 0) {
                        top_1 = parseFloat(tileElement.style.top) + element.offsetTop + (subTitleTextSize['height'] / 2)
                            - this.legendModule.legendBorderRect.y;
                    }
                    else {
                        top_1 = parseFloat(tileElement.style.top) + element.offsetTop + (subTitleTextSize['height'] / 2);
                    }
                }
            }
            else {
                bottom = svg.bottom - tile.bottom - element.offsetTop;
                top_1 = parseFloat(tileElement.style.top) + element.offsetTop;
            }
            top_1 = (bottom <= 11) ? top_1 : (!isNullOrUndefined(this.legendModule) && this.legendSettings.position === 'Bottom') ? this.mapAreaRect.y : (top_1 * 2);
            left = (bottom <= 11) ? left : !isNullOrUndefined(this.legendModule) ? left : (left * 2);
            tileElement.style.top = top_1 + 'px';
            tileElement.style.left = left + 'px';
            tileElement1.style.top = top_1 + 'px';
            tileElement1.style.left = left + 'px';
            if (!isNullOrUndefined(this.legendModule) && this.legendModule.totalPages.length > 0) {
                tileElement.style.height = tileElement1.style.height = this.legendModule.legendTotalRect.height + 'px';
                tileElement.style.width = tileElement1.style.width = this.legendModule.legendTotalRect.width + 'px';
            }
        }
        this.arrangeTemplate();
        if (this.annotationsModule) {
            if (this.width !== '0px' && this.height !== '0px' && this.width !== '0%' && this.height !== '0%') {
                this.annotationsModule.renderAnnotationElements();
            }
        }
        this.element.style.outline = 'none';
        for (var i = 0; i < document.getElementsByTagName('path').length - 1; i++) {
            if (document.getElementsByTagName('path')[i].id.indexOf('shapeIndex') > -1) {
                document.getElementsByTagName('path')[i].style.outline = 'none';
            }
        }
        this.zoomingChange();
        this.trigger(loaded, { maps: this, isResized: this.isResize });
        this.isResize = false;
    };
    /**
     * To apply color to the initial selected marker
     *
     * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
     * @param {Maps} map - Specifies the instance of the maps
     * @param {Element} targetElement - Specifies the target element
     * @param {any} data - Specifies the data
     * @returns {void}
     * @private
     */
    Maps.prototype.markerSelection = function (selectionSettings, map, targetElement, data) {
        var border = {
            color: selectionSettings.border.color,
            width: selectionSettings.border.width / map.scale,
            opacity: selectionSettings.border.opacity
        };
        var markerSelectionProperties = {
            opacity: selectionSettings.opacity,
            fill: selectionSettings.fill,
            border: border,
            target: targetElement.id,
            cancel: false,
            data: data,
            maps: map
        };
        if (!getElement('MarkerselectionMap')) {
            document.body.appendChild(createStyle('MarkerselectionMap', 'MarkerselectionMapStyle', markerSelectionProperties));
        }
        else {
            customizeStyle('MarkerselectionMap', 'MarkerselectionMapStyle', markerSelectionProperties);
        }
        if (this.selectedMarkerElementId.length === 0 || selectionSettings.enableMultiSelect) {
            if (targetElement.tagName === 'g') {
                targetElement.children[0].setAttribute('class', 'MarkerselectionMapStyle');
                this.selectedMarkerElementId.push(targetElement.children[0].id);
            }
            else {
                targetElement.setAttribute('class', 'MarkerselectionMapStyle');
                this.selectedMarkerElementId.push(targetElement.id);
            }
        }
    };
    /**
     * initial selection of marker
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {number} markerIndex - Specifies the marker index
     * @param {MarkerSettingsModel} markerSettings - Specifies the marker settings
     * @param {number} latitude - Specifies hte latitude
     * @param {number} longitude - Specifies the longitude
     * @returns {void}
     * @private
     */
    Maps.prototype.markerInitialSelection = function (layerIndex, markerIndex, markerSettings, latitude, longitude) {
        var selectionSettings = markerSettings.selectionSettings;
        if (selectionSettings.enable) {
            for (var i = 0; i < markerSettings.dataSource['length']; i++) {
                var data = markerSettings.dataSource[i];
                if (data['latitude'] === latitude && data['longitude'] === longitude) {
                    var targetId = this.element.id + '_' + 'LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex +
                        '_dataIndex_' + i;
                    this.markerSelection(selectionSettings, this, getElement(targetId), data);
                }
            }
        }
    };
    /**
     * Render the map area border
     *
     * @returns {void}
     */
    Maps.prototype.renderArea = function () {
        var width = this.mapsArea.border.width;
        var background = this.mapsArea.background;
        if (width > 0 || (background || this.themeStyle.areaBackgroundColor)) {
            var mapBorder = {
                opacity: isNullOrUndefined(this.mapsArea.border.opacity) ? 1 : this.mapsArea.border.opacity,
                color: this.mapsArea.border.color, width: this.mapsArea.border.width
            };
            var rect = new RectOption(this.element.id + '_MapAreaBorder', background || this.themeStyle.areaBackgroundColor, mapBorder, 1, this.mapAreaRect);
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        }
    };
    /**
     * To add tab index for map element
     *
     * @returns {void}
     */
    Maps.prototype.addTabIndex = function () {
        this.element.setAttribute('aria-label', this.description || 'Maps Element');
        this.element.setAttribute('tabindex', this.tabIndex.toString());
    };
    // private setSecondaryElementPosition(): void {
    //     if (!this.isTileMap) {
    //         let element: HTMLDivElement = getElementByID(this.element.id + '_Secondary_Element') as HTMLDivElement;
    //         let rect: ClientRect = this.element.getBoundingClientRect();
    //         let svgRect: ClientRect = getElementByID(this.element.id + '_svg').getBoundingClientRect();
    //         element.style.marginLeft = Math.max(svgRect.left - rect.left, 0) + 'px';
    //         element.style.marginTop = Math.max(svgRect.top - rect.top, 0) + 'px';
    //     }
    // }
    Maps.prototype.zoomingChange = function () {
        var left;
        var top;
        if (getElementByID(this.element.id + '_Layer_Collections') && this.zoomModule) {
            this.zoomModule.layerCollectionEle = getElementByID(this.element.id + '_Layer_Collections');
        }
        if (this.isTileMap && getElementByID(this.element.id + '_Tile_SVG') && getElementByID(this.element.id + '_tile_parent')) {
            var tileElement = getElementByID(this.element.id + '_tile_parent');
            var tileSvgElement = getElementByID(this.element.id + '_Tile_SVG');
            var tileSvgParentElement = getElementByID(this.element.id + '_Tile_SVG_Parent');
            var tileRect = tileElement.getBoundingClientRect();
            var tileSvgRect = tileSvgElement.getBoundingClientRect();
            left = (tileRect.left - tileSvgRect.left);
            top = (tileRect.top - tileSvgRect.top);
            tileSvgParentElement.style.left = left + 'px';
            tileSvgParentElement.style.top = top + 'px';
            if (!isNullOrUndefined(this.legendModule) && this.legendModule.totalPages.length > 0) {
                tileElement.style.width = tileSvgElement.style.width = this.legendModule.legendTotalRect.width.toString();
                tileElement.style.height = tileSvgElement.style.height = this.legendModule.legendTotalRect.height.toString();
                tileSvgParentElement.style.width = this.legendModule.legendTotalRect.width + 'px';
                tileSvgParentElement.style.height = this.legendModule.legendTotalRect.height + 'px';
            }
            var markerTemplateElements = document.getElementsByClassName('template');
            if (!isNullOrUndefined(markerTemplateElements) && markerTemplateElements.length > 0) {
                for (var i = 0; i < markerTemplateElements.length; i++) {
                    var templateGroupEle = markerTemplateElements[i];
                    templateGroupEle.style.left = left + 'px';
                    templateGroupEle.style.top = top + 'px';
                }
            }
        }
        if (this.zoomSettings.zoomFactor >= 0) {
            if (this.zoomModule && this.zoomModule.toolBarGroup && this.zoomSettings.enable) {
                this.zoomModule.alignToolBar();
            }
            var elements = document.getElementById(this.element.id + '_Layer_Collections');
            if (!isNullOrUndefined(elements) && elements.childElementCount > 0) {
                for (var i = 0; i < elements.childNodes.length; i++) {
                    var childElement = elements.childNodes[i];
                    if (childElement.tagName === 'g' && childElement.id.indexOf('_Legend_Group') == -1) {
                        var layerIndex = parseFloat(childElement.id.split('_LayerIndex_')[1].split('_')[0]);
                        for (var j = 0; j < childElement.childNodes.length; j++) {
                            var childNode = childElement.childNodes[j];
                            if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                                (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                                (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                                changeBorderWidth(childNode, layerIndex, this.scale, this);
                            }
                        }
                    }
                }
            }
            if (this.zoomModule && (this.previousScale !== this.scale)) {
                this.zoomModule.applyTransform(true);
            }
        }
    };
    Maps.prototype.createSecondaryElement = function () {
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element',
                styles: 'position: absolute;z-index:2;'
            });
            this.element.appendChild(secondaryElement);
        }
    };
    /**
     * @returns {void}
     * @private
     */
    Maps.prototype.arrangeTemplate = function () {
        if (document.getElementById(this.element.id + '_Legend_Border')) {
            document.getElementById(this.element.id + '_Legend_Border').style.pointerEvents = 'none';
        }
        var templateElements = document.getElementsByClassName(this.element.id + '_template');
        if (!isNullOrUndefined(templateElements) && templateElements.length > 0 &&
            getElementByID(this.element.id + '_Layer_Collections') && !this.isTileMap) {
            for (var i = 0; i < templateElements.length; i++) {
                var offSetLetValue = 0;
                var offSetTopValue = 0;
                var templateGroupEle = templateElements[i];
                if (!isNullOrUndefined(templateGroupEle) && templateGroupEle.childElementCount > 0) {
                    var layerOffset = getElementByID(this.element.id + '_Layer_Collections').getBoundingClientRect();
                    var elementOffset = getElementByID(templateGroupEle.id).getBoundingClientRect();
                    if (templateGroupEle.id.indexOf('Marker') === -1) {
                        offSetLetValue = this.isTileMap ? 0 : (layerOffset.left < elementOffset.left) ?
                            -(Math.abs(elementOffset.left - layerOffset.left)) : (Math.abs(elementOffset.left - layerOffset.left));
                        offSetTopValue = this.isTileMap ? 0 : (layerOffset.top < elementOffset.top) ?
                            -(Math.abs(elementOffset.top - layerOffset.top)) : Math.abs(elementOffset.top - layerOffset.top);
                    }
                    for (var j = 0; j < templateGroupEle.childElementCount; j++) {
                        var currentTemplate = templateGroupEle.childNodes[j];
                        if (currentTemplate.id.indexOf('Marker') !== -1) {
                            var elementOffset_1 = getElementByID(currentTemplate.id).getBoundingClientRect();
                            currentTemplate.style.left = parseFloat(currentTemplate.style.left) - (this.isTileMap ? 0 : elementOffset_1.width / 2) + 'px';
                            currentTemplate.style.top = parseFloat(currentTemplate.style.top) - (this.isTileMap ? 0 : elementOffset_1.height / 2) + 'px';
                        }
                        else {
                            currentTemplate.style.left = parseFloat(currentTemplate.style.left) + offSetLetValue + 'px';
                            currentTemplate.style.top = parseFloat(currentTemplate.style.top) + offSetTopValue + 'px';
                            currentTemplate.style.transform = 'translate(-50%, -50%)';
                        }
                    }
                }
            }
        }
    };
    Maps.prototype.createTile = function () {
        var mainLayer = this.layersCollection[0];
        var padding = 0;
        if (mainLayer.isBaseLayer && (mainLayer.layerType === 'OSM' || mainLayer.layerType === 'Bing' ||
            mainLayer.layerType === 'GoogleStaticMap' || mainLayer.layerType === 'Google' || (!isNullOrUndefined(mainLayer.urlTemplate) && mainLayer.urlTemplate !== ''))) {
            removeElement(this.element.id + '_tile_parent');
            removeElement(this.element.id + '_tiles');
            removeElement('animated_tiles');
            var ele = createElement('div', {
                id: this.element.id + '_tile_parent', styles: 'position: absolute; left: ' +
                    (this.mapAreaRect.x) + 'px; right: ' + (this.margin.right) + 'px; top: '
                    + (this.mapAreaRect.y + padding) + 'px; height: ' +
                    (this.mapAreaRect.height) + 'px; width: '
                    + (this.mapAreaRect.width) + 'px; overflow: hidden;'
            });
            var ele1 = createElement('div', {
                id: this.element.id + '_tiles', styles: 'position: absolute; left: ' +
                    (this.mapAreaRect.x) + 'px;  right: ' + (this.margin.right) + 'px; top: '
                    + (this.mapAreaRect.y + padding) + 'px; height: ' + (this.mapAreaRect.height) + 'px; width: '
                    + (this.mapAreaRect.width) + 'px; overflow: hidden;'
            });
            this.element.appendChild(ele);
            this.element.appendChild(ele1);
        }
    };
    /**
     * To initilize the private varibales of maps.
     *
     * @returns {void}
     */
    Maps.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-maps').length;
            this.element.id = 'maps_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.mapLayerPanel = new LayerPanel(this);
    };
    Maps.prototype.findBaseAndSubLayers = function () {
        var _this = this;
        var baseIndex = this.baseLayerIndex;
        var mainLayers = [];
        var subLayers = [];
        this.layersCollection = [];
        Array.prototype.forEach.call(this.layers, function (layer) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (layer.type === 'Layer') ? mainLayers.push(layer) : subLayers.push(layer);
        });
        for (var i = 0; i < mainLayers.length; i++) {
            var baseLayer = mainLayers[i];
            if (baseLayer.visible && baseIndex === i) {
                baseLayer.isBaseLayer = true;
                this.isTileMap = (baseLayer.layerType === 'Geometry' && !isNullOrUndefined(baseLayer.shapeData)) ? false : true;
                this.layersCollection.push(baseLayer);
                break;
            }
            else if (i === mainLayers.length - 1) {
                this.layersCollection.push(mainLayers[0]);
                break;
            }
        }
        subLayers.map(function (subLayer, subLayerIndex) {
            if (subLayer.visible) {
                _this.layersCollection.push(subLayer);
            }
        });
    };
    /**
     * Render the map border
     *
     * @private
     * @returns {void}
     */
    Maps.prototype.renderBorder = function () {
        var width = this.border.width;
        var borderElement = this.svgObject.querySelector('#' + this.element.id + '_MapBorder');
        if ((width > 0 || (this.background || this.themeStyle.backgroundColor)) && isNullOrUndefined(borderElement)) {
            var border = {
                opacity: isNullOrUndefined(this.border.opacity) ? 1 : this.border.opacity,
                color: this.border.color, width: this.border.width
            };
            var borderRect = new RectOption(this.element.id + '_MapBorder', this.background || this.themeStyle.backgroundColor, border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        }
        else {
            borderElement.setAttribute('fill', this.background || this.themeStyle.backgroundColor);
        }
    };
    /**
     * Render the title and subtitle
     *
     * @param {TitleSettingsModel} title - Specifies the title
     * @param {string} type - Specifies the type
     * @param {Rect} bounds - Specifies the bounds
     * @param {Element} groupEle - Specifies the group element
     * @returns {void}
     * @private
     */
    Maps.prototype.renderTitle = function (title, type, bounds, groupEle) {
        var style = {
            size: title.textStyle.size,
            color: title.textStyle.color,
            fontFamily: title.textStyle.fontFamily,
            fontWeight: title.textStyle.fontWeight,
            fontStyle: title.textStyle.fontStyle,
            opacity: title.textStyle.opacity
        };
        var height;
        var width = Math.abs((this.margin.left + this.margin.right) - this.availableSize.width);
        style.fontFamily = !isNullOrUndefined(style.fontFamily) ? style.fontFamily : this.themeStyle.fontFamily;
        style.fontWeight = style.fontWeight || this.themeStyle.titleFontWeight;
        style.size = type === 'title' ? (style.size || this.themeStyle.titleFontSize) : (style.size || Theme.mapsSubTitleFont.size);
        if (title.text) {
            if (isNullOrUndefined(groupEle)) {
                groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            }
            var trimmedTitle = textTrim(width, title.text, style);
            var elementSize = measureText(trimmedTitle, style);
            var rect = (isNullOrUndefined(bounds)) ? new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height) : bounds;
            var location_1 = findPosition(rect, title.alignment, elementSize, type);
            var options = new TextOption(this.element.id + '_Map_' + type, location_1.x, location_1.y, 'start', trimmedTitle);
            var titleBounds = new Rect(location_1.x, location_1.y, elementSize.width, elementSize.height);
            var element = renderTextElement(options, style, style.color || (type === 'title' ? this.themeStyle.titleFontColor : this.themeStyle.subTitleFontColor), groupEle);
            element.setAttribute('aria-label', this.description || title.text);
            if ((type === 'title' && !title.subtitleSettings.text) || (type === 'subtitle')) {
                height = Math.abs((titleBounds.y + this.margin.bottom) - this.availableSize.height);
                this.mapAreaRect = new Rect(this.margin.left, titleBounds.y + 10, width, height - 10);
            }
            if (type !== 'subtitle' && title.subtitleSettings.text) {
                this.renderTitle(title.subtitleSettings, 'subtitle', titleBounds, groupEle);
            }
            else {
                this.svgObject.appendChild(groupEle);
            }
        }
        else {
            height = Math.abs((this.margin.top + this.margin.bottom) - this.availableSize.height);
            this.mapAreaRect = new Rect(this.margin.left, this.margin.top, width, height);
        }
    };
    /**
     * To create svg element for maps
     *
     * @returns {void}
     */
    Maps.prototype.createSVG = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * To Remove the SVG
     *
     * @returns {void}
     */
    Maps.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        removeElement(this.element.id + '_tile_parent');
        removeElement(this.element.id + '_tiles');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        this.clearTemplate();
    };
    /**
     * To bind event handlers for maps.
     *
     * @returns {void}
     */
    Maps.prototype.wireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, 'click', this.mapsOnClick, this);
        // EventHandler.add(this.element, 'contextmenu', this.mapsOnRightClick, this);
        EventHandler.add(this.element, 'dblclick', this.mapsOnDoubleClick, this);
        EventHandler.add(this.element, Browser.touchStartEvent, this.mouseDownOnMap, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEndOnMap, this);
        EventHandler.add(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        //  EventHandler.add(this.element, cancelEvent, this.mouseLeaveOnMap, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.mapsOnResize.bind(this));
    };
    /**
     * To unbind event handlers from maps.
     *
     * @returns {void}
     */
    Maps.prototype.unWireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, 'click', this.mapsOnClick);
        // EventHandler.remove(this.element, 'contextmenu', this.mapsOnRightClick);
        EventHandler.remove(this.element, 'dblclick', this.mapsOnDoubleClick);
        EventHandler.remove(this.element, Browser.touchStartEvent, this.mouseDownOnMap);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEndOnMap);
        EventHandler.remove(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        //EventHandler.remove(this.element, cancelEvent, this.mouseLeaveOnMap);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.mapsOnResize);
    };
    /**
     * This method is used to perform operations when mouse pointer leave from maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     */
    Maps.prototype.mouseLeaveOnMap = function (e) {
        if (document.getElementsByClassName('highlightMapStyle').length > 0 && this.legendModule) {
            this.legendModule.removeShapeHighlightCollection();
            removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
        }
    };
    Maps.prototype.keyUpHandler = function (event) {
        var id = event.target['id'];
        if (event.code === 'Tab' && id.indexOf('_LayerIndex_') > -1 && id.indexOf('shapeIndex') > -1) {
            this.keyboardHighlightSelection(id, event.type);
        }
        else if (id.indexOf('_LayerIndex_') === -1 && id.indexOf('shapeIndex') === -1 &&
            getElementsByClassName('highlightMapStyle').length > 0) {
            removeClass(getElementsByClassName('highlightMapStyle')[0]);
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.removeShapeHighlightCollection();
            }
        }
    };
    Maps.prototype.keyboardHighlightSelection = function (id, key) {
        var layerIndex = parseInt(id.split('_LayerIndex_')[1].split('_')[0], 10);
        var shapeIndex = parseInt(id.split('_shapeIndex_')[1].split('_')[0], 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeData = this.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
            this.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
        var dataIndex = parseInt(id.split('_dataIndex_')[1].split('_')[0], 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = isNullOrUndefined(dataIndex) ? null : this.layers[layerIndex].dataSource[dataIndex];
        if (this.layers[layerIndex].selectionSettings.enable && key === 'keydown' && this.selectionModule) {
            this.selectionModule.selectionsettings = this.layers[layerIndex].selectionSettings;
            this.selectionModule.selectionType = 'Shape';
            this.selectionModule.selectElement(event.target, layerIndex, data, shapeData);
        }
        else if (this.highlightModule && (this.layers[layerIndex].highlightSettings.enable && key === 'keyup' &&
            !event.target.classList.contains('ShapeselectionMapStyle'))) {
            this.highlightModule.highlightSettings = this.layers[layerIndex].highlightSettings;
            this.highlightModule.handleHighlight(event.target, layerIndex, data, shapeData);
        }
    };
    Maps.prototype.keyDownHandler = function (event) {
        var zoom = this.zoomModule;
        if ((event.key === '+' || event.code === 'Equal') && zoom) {
            zoom.performZoomingByToolBar('zoomin');
        }
        else if ((event.key === '-' || event.code === 'Minus') && zoom) {
            zoom.performZoomingByToolBar('zoomout');
        }
        else if (event['keyCode'] === 82 && zoom) {
            zoom.performZoomingByToolBar('reset');
        }
        else if ((event.code === 'ArrowUp' || event.code === 'ArrowDown') && zoom) {
            event.preventDefault();
            zoom.mouseDownLatLong['x'] = 0;
            zoom.mouseMoveLatLong['y'] = this.mapAreaRect.height / 7;
            zoom.panning('None', zoom.mouseDownLatLong['x'], event.code === 'ArrowUp' ? -(zoom.mouseMoveLatLong['y']) :
                zoom.mouseMoveLatLong['y'], event);
            zoom.mouseDownLatLong['y'] = zoom.mouseMoveLatLong['y'];
        }
        else if ((event.code === 'ArrowLeft' || event.code === 'ArrowRight') && zoom) {
            event.preventDefault();
            zoom.mouseDownLatLong['y'] = 0;
            zoom.mouseMoveLatLong['x'] = this.mapAreaRect.width / 7;
            zoom.panning('None', event.code === 'ArrowLeft' ? -(zoom.mouseMoveLatLong['x']) : zoom.mouseMoveLatLong['x'], zoom.mouseDownLatLong['y'], event);
            zoom.mouseDownLatLong['x'] = zoom.mouseMoveLatLong['x'];
        }
        else if (event.code === 'Enter') {
            var id = event.target['id'];
            event.preventDefault();
            if (this.legendModule && (id.indexOf('_Left_Page_Rect') > -1 || id.indexOf('_Right_Page_Rect') > -1)) {
                this.mapAreaRect = this.legendModule.initialMapAreaRect;
                this.legendModule.currentPage = (id.indexOf('_Left_Page_') > -1) ? (this.legendModule.currentPage - 1) :
                    (this.legendModule.currentPage + 1);
                this.legendModule.legendGroup = this.renderer.createGroup({ id: this.element.id + '_Legend_Group' });
                this.legendModule.drawLegendItem(this.legendModule.currentPage);
                var textContent = (document.getElementById(this.element.id + '_Paging_Text')).textContent;
                var text = textContent.split('/').map(Number);
                if (id.indexOf('_Left_Page_Rect') > -1) {
                    if (text[0] !== 1) {
                        event.target.focus();
                    }
                    event.target.style.outlineColor = text[0] - 1 !== text[1] ? '' : 'transparent';
                }
                else if (id.indexOf('_Right_Page_Rect') > -1) {
                    if (text[0] !== text[1]) {
                        event.target.focus();
                    }
                    event.target.style.outlineColor = text[0] !== text[1] + 1 ? '' : 'transparent';
                }
                if (querySelector(this.element.id + '_Legend_Border', this.element.id)) {
                    querySelector(this.element.id + '_Legend_Border', this.element.id).style.pointerEvents = 'none';
                }
            }
            if (id.indexOf('shapeIndex') > -1) {
                this.keyboardHighlightSelection(id, event.type);
            }
        }
    };
    /**
     * Gets the selected element to be maintained or not.
     *
     * @param {Element} targetEle - Specifies the target element
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.SelectedElement = function (targetEle) {
        var isSelect = false;
        if (targetEle.getAttribute('class') === 'ShapeselectionMapStyle') {
            isSelect = true;
        }
        return isSelect;
    };
    /**
     * This method is used to perform the operations when a click operation is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     */
    Maps.prototype.mapsOnClick = function (e) {
        var _this = this;
        var targetEle = e.target;
        var targetId = targetEle.id;
        var latitude = null;
        var longitude = null;
        this.mouseClickEvent = { x: e.x, y: e.y };
        if (targetEle.id.indexOf('_ToolBar') === -1) {
            var latLongValue = this.getClickLocation(targetId, e.pageX, e.pageY, targetEle, e['layerX'], e['layerY']);
            if (!isNullOrUndefined(latLongValue)) {
                latitude = latLongValue.latitude;
                longitude = latLongValue.longitude;
            }
            var eventArgs_1 = {
                cancel: false, name: click, target: targetId, x: e.clientX, y: e.clientY,
                latitude: latitude, longitude: longitude,
                isShapeSelected: this.SelectedElement(targetEle)
            };
            if (this.onclick) {
                eventArgs_1.name = onclick;
                this.trigger('onclick', eventArgs_1, function (mouseArgs) {
                    _this.clickHandler(e, eventArgs_1, targetEle);
                });
            }
            else {
                this.trigger('click', eventArgs_1, function (mouseArgs) {
                    _this.clickHandler(e, eventArgs_1, targetEle);
                });
            }
        }
    };
    Maps.prototype.clickHandler = function (e, eventArgs, targetEle) {
        if (targetEle.id.indexOf('shapeIndex') > -1) {
            this.mergeCluster();
            if (getElement(this.element.id + '_mapsTooltip') &&
                this.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_') > -1) {
                removeElement(this.element.id + '_mapsTooltip');
            }
        }
        if (this.markerModule) {
            this.markerModule.markerClusterClick(e);
        }
        if (!eventArgs.cancel) {
            this.notify(click, targetEle);
        }
        if (!eventArgs.cancel && targetEle.id.indexOf('shapeIndex') !== -1) {
            this.triggerShapeSelection(targetEle);
        }
    };
    Maps.prototype.triggerShapeSelection = function (targetEle) {
        var layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var shapeSelectedEventArgs = triggerShapeEvent(targetEle.id, this.layers[layerIndex].selectionSettings, this, shapeSelected);
        if (!shapeSelectedEventArgs.cancel && this.selectionModule && !isNullOrUndefined(this.shapeSelected)) {
            customizeStyle(this.selectionModule.selectionType + 'selectionMap', this.selectionModule.selectionType + 'selectionMapStyle', shapeSelectedEventArgs);
        }
        else if (shapeSelectedEventArgs.cancel && this.selectionModule
            && isNullOrUndefined(shapeSelectedEventArgs['data'])) {
            removeClass(targetEle);
            this.selectionModule.removedSelectionList(targetEle);
        }
    };
    Maps.prototype.getClickLocation = function (targetId, pageX, pageY, targetElement, x, y) {
        var layerIndex = 0;
        var latLongValue;
        if (targetId.indexOf('_LayerIndex_') !== -1 && !this.isTileMap && (parseInt(this.mouseDownEvent['x']) === parseInt(this.mouseClickEvent['x']))
            && (parseInt(this.mouseDownEvent['y']) === parseInt(this.mouseClickEvent['y']))) {
            layerIndex = parseFloat(targetId.split('_LayerIndex_')[1].split('_')[0]);
            if (this.layers[layerIndex].geometryType === 'Normal') {
                if (targetId.indexOf('_shapeIndex_') > -1) {
                    var location_2 = getMousePosition(pageX, pageY, targetElement.parentElement);
                    var minLongitude = Math.abs((-this.baseMapBounds.longitude.min) * this.mapLayerPanel.currentFactor);
                    var minLatitude = Math.abs(this.baseMapBounds.latitude.max * this.mapLayerPanel.currentFactor);
                    latLongValue = {
                        latitude: Math.abs(this.baseMapBounds.latitude.max - (location_2.y / this.mapLayerPanel.currentFactor)),
                        longitude: Math.abs((location_2.x / this.mapLayerPanel.currentFactor) + this.baseMapBounds.longitude.min)
                    };
                    if (this.baseMapBounds.longitude.min < 0 && minLongitude > location_2.x) {
                        latLongValue.longitude = -latLongValue.longitude;
                    }
                    if (this.baseMapBounds.latitude.min < 0 && minLatitude > location_2.y) {
                        latLongValue.latitude = -latLongValue.latitude;
                    }
                }
                else if (targetId.indexOf('_MarkerIndex_') > -1 && this.markerModule) {
                    var markerIndex = parseInt(targetId.split('_MarkerIndex_')[1].split('_')[0], 10);
                    var dataIndex = parseInt(targetId.split('_dataIndex_')[1].split('_')[0], 10);
                    if (!isNaN(markerIndex) && !isNaN(dataIndex)) {
                        var dataObject = this.layers[layerIndex].markerSettings[markerIndex].dataSource[dataIndex];
                        latLongValue = { latitude: dataObject['latitude'], longitude: dataObject.longitude };
                    }
                    else {
                        latLongValue = { latitude: null, longitude: null };
                    }
                }
                else {
                    latLongValue = { latitude: null, longitude: null };
                }
            }
            else {
                latLongValue = this.getGeoLocation(layerIndex, x, y);
            }
        }
        else if (this.isTileMap && (parseInt(this.mouseDownEvent['x']) === parseInt(this.mouseClickEvent['x']))
            && (parseInt(this.mouseDownEvent['y']) === parseInt(this.mouseClickEvent['y']))) {
            latLongValue = this.getTileGeoLocation(x, y);
        }
        return latLongValue;
    };
    /**
     * This method is used to perform operations when mouse click on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {boolean} - Returns the boolean value
     */
    Maps.prototype.mouseEndOnMap = function (e) {
        var targetEle = e.target;
        var targetId = targetEle.id;
        var pageX;
        var latitude = null;
        var longitude = null;
        var pageY;
        var target;
        var touchArg;
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
            this.mouseClickEvent = { x: pageX, y: pageY };
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        if (this.isTouch) {
            if (targetEle.id.indexOf('_ToolBar') === -1) {
                var latLongValue = this.getClickLocation(targetId, pageX, pageY, targetEle, pageX, pageY);
                if (!isNullOrUndefined(latLongValue)) {
                    latitude = latLongValue.latitude;
                    longitude = latLongValue.longitude;
                }
            }
            this.titleTooltip(e, pageX, pageY, true);
            if (!isNullOrUndefined(this.legendModule)) {
                this.legendTooltip(e, e.pageX, e.pageY, true);
            }
        }
        this.notify(Browser.touchEndEvent, e);
        if (e.cancelable && !this.isTouch) {
            e.preventDefault();
        }
        return false;
    };
    /**
     * This method is used to perform operations when mouse is clicked down on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps
     * @returns {void}
     */
    Maps.prototype.mouseDownOnMap = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        this.mouseDownEvent = { x: e.x, y: e.y };
        if (e.type.indexOf('touch') !== -1 && e.changedTouches) {
            this.mouseDownEvent = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
        }
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        if (element.id.indexOf('_ToolBar') === -1) {
            var markerModule = this.markerModule;
            if (element.id.indexOf('shapeIndex') > -1 || element.id.indexOf('Tile') > -1) {
                this.mergeCluster();
                if (element.id.indexOf('shapeIndex') > -1) {
                    this.triggerShapeSelection(element);
                }
            }
            if (markerModule) {
                markerModule.markerClick(e);
                markerModule.markerClusterClick(e);
            }
            if (this.bubbleModule) {
                this.bubbleModule.bubbleClick(e);
            }
        }
        this.notify(Browser.touchStartEvent, e);
    };
    /**
     * Merges the marker clusters.
     *
     * @returns {void}
     * @private
     */
    Maps.prototype.mergeCluster = function () {
        if (this.markerModule && (this.markerModule.sameMarkerData.length > 0) &&
            (this.zoomModule ? this.zoomModule.isSingleClick : true)) {
            mergeSeparateCluster(this.markerModule.sameMarkerData, this, getElement(this.element.id + '_Markers_Group'));
            this.markerModule.sameMarkerData = [];
        }
    };
    /**
     * This method is used to perform operations when performing the double click operation on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     */
    Maps.prototype.mapsOnDoubleClick = function (e) {
        this.notify('dblclick', e);
        var targetElement = e.target;
        var targetId = targetElement.id;
        var layerIndex = 0;
        var latLongValue;
        var latitude = null;
        var longitude = null;
        if (targetElement.id.indexOf('_ToolBar') === -1) {
            if (targetElement.id.indexOf('_LayerIndex_') !== -1 && !this.isTileMap && (this.mouseDownEvent['x'] === e.clientX)
                && (this.mouseDownEvent['y'] === e.clientY)) {
                layerIndex = parseFloat(targetElement.id.split('_LayerIndex_')[1].split('_')[0]);
                latLongValue = this.getGeoLocation(layerIndex, e['layerX'], e['layerY']);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            else if (this.isTileMap && (this.mouseDownEvent['x'] === e.clientX)
                && (this.mouseDownEvent['y'] === e.clientY)) {
                latLongValue = this.getTileGeoLocation(e['layerX'], e['layerY']);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            var doubleClickArgs = { cancel: false, name: doubleClick, x: e.clientX, y: e.clientY,
                target: targetId, latitude: latitude, longitude: longitude, isShapeSelected: null };
            this.trigger('doubleClick', doubleClickArgs);
        }
    };
    /**
     * This method is used to perform operations while performing mouse over on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     */
    Maps.prototype.mouseMoveOnMap = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        var target;
        var touches = null;
        target = (e.type === 'touchmove') ? e.target :
            target = e.target;
        // if (target.id.indexOf('shapeIndex') !== -1 && !this.highlightSettings.enable) {
        //     triggerShapeEvent(target.id, this.highlightSettings, this, shapeHighlight);
        // }
        if (this.markerModule) {
            this.markerModule.markerMove(e);
            this.markerModule.markerClusterMouseMove(e);
        }
        if (this.bubbleModule) {
            this.bubbleModule.bubbleMove(e);
        }
        this.onMouseMove(e);
        this.notify(Browser.touchMoveEvent, e);
    };
    /**
     * This method is used to perform operations when mouse move event is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     */
    Maps.prototype.onMouseMove = function (e) {
        var element = e.target;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        if (!this.isTouch) {
            this.titleTooltip(e, e.pageX, e.pageY);
            if (!isNullOrUndefined(this.legendModule)) {
                this.legendTooltip(e, e.pageX, e.pageY, true);
            }
        }
        return false;
    };
    Maps.prototype.legendTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        var legendText;
        var page = this.legendModule.currentPage;
        var legendIndex = event.target.id.split('_Index_')[1];
        var collection;
        page = this.legendModule.totalPages.length <= this.legendModule.currentPage
            ? this.legendModule.totalPages.length - 1 : this.legendModule.currentPage < 0 ?
            0 : this.legendModule.currentPage;
        var count = this.legendModule.totalPages.length !== 0 ?
            this.legendModule.totalPages[page]['Collection'].length : this.legendModule.totalPages.length;
        for (var i = 0; i < count; i++) {
            collection = this.legendModule.totalPages[page]['Collection'][i];
            legendText = collection['DisplayText'];
            targetId = event.target['id'];
            legendIndex = event.target['id'].split('_Index_')[1];
            if ((targetId === (this.element.id + '_Legend_Text_Index_' + legendIndex)) &&
                (event.target.textContent.indexOf('...') > -1) && collection['idIndex'] === parseInt(legendIndex, 10)) {
                showTooltip(legendText, this.legendSettings.textStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Legend_Text_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
            }
        }
        if ((targetId !== (this.element.id + '_Legend_Text_Index_' + legendIndex))) {
            removeElement(this.element.id + '_EJ2_Legend_Text_Tooltip');
        }
    };
    Maps.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if (targetId === (this.element.id + '_LegendTitle') && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.legendSettings.title.text, this.legendSettings.titleStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_LegendTitle_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_LegendTitle_Tooltip');
        }
        if ((targetId === (this.element.id + '_Map_title')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.titleSettings.text, this.titleSettings.textStyle.size || this.themeStyle.titleFontSize, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /*

    /**
     * This method is used to perform operations while resizing the window.
     *
     * @param e - Specifies the arguments of window resize event.
     */
    Maps.prototype.mapsOnResize = function (e) {
        var _this = this;
        this.isResize = this.isReset = true;
        var args = {
            cancel: false,
            name: resize,
            previousSize: this.availableSize,
            currentSize: calculateSize(this),
            maps: this
        };
        this.trigger(resize, args);
        if (!args.cancel) {
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-maps')) {
                this.resizeTo = setTimeout(function () {
                    _this.unWireEVents();
                    _this.createSVG();
                    _this.refreshing = true;
                    _this.wireEVents();
                    _this.render();
                    _this.refreshing = false;
                }, 500);
            }
        }
        return false;
    };
    /**
     * This method is used to zoom the map by specifying the center position.
     *
     * @param {number} centerPosition - Specifies the center position
     * @param {number} centerPosition.latitude - Specifies the latitude value for the center position
     * @param {number} centerPosition.longitude - Specifies the longitude value for the center position
     * @param {number} zoomFactor - Specifies the zoom factor for maps.
     * @returns {void}
     */
    Maps.prototype.zoomByPosition = function (centerPosition, zoomFactor) {
        var factor = this.mapLayerPanel.calculateFactor(this.layersCollection[0]);
        var position;
        var size = this.mapAreaRect;
        if (!this.isTileMap && this.zoomModule) {
            if (!isNullOrUndefined(centerPosition)) {
                position = convertGeoToPoint(centerPosition.latitude, centerPosition.longitude, factor, this.layersCollection[0], this);
                var mapRect = document.getElementById(this.element.id + '_Layer_Collections').getBoundingClientRect();
                var svgRect = this.svgObject.getBoundingClientRect();
                var xDiff = Math.abs(mapRect.left - svgRect.left) / this.scale;
                var yDiff = Math.abs(mapRect.top - svgRect.top) / this.scale;
                var x = this.translatePoint.x + xDiff;
                var y = this.translatePoint.y + yDiff;
                this.scale = zoomFactor;
                this.translatePoint.x = ((mapRect.left < svgRect.left ? x : 0) + (size.width / 2) - (position.x * zoomFactor)) / zoomFactor;
                this.translatePoint.y = ((mapRect.top < svgRect.top ? y : 0) + (size.height / 2) - (position.y * zoomFactor)) / zoomFactor;
                this.zoomModule.applyTransform();
            }
            else {
                position = { x: size.width / 2, y: size.height / 2 };
                this.zoomModule.performZooming(position, zoomFactor, zoomFactor > this.scale ? 'ZoomIn' : 'ZoomOut');
            }
        }
        else if (this.zoomModule) {
            this.tileZoomLevel = zoomFactor;
            this.tileTranslatePoint = this.mapLayerPanel['panTileMap'](this.availableSize.width, this.availableSize.height, { x: centerPosition.longitude, y: centerPosition.latitude });
            this.mapLayerPanel.generateTiles(zoomFactor, this.tileTranslatePoint, null, new BingMap(this));
        }
    };
    /**
     * This method is used to perform panning by specifying the direction.
     *
     * @param {PanDirection} direction - Specifies the direction in which the panning is performed.
     * @param {PointerEvent | TouchEvent} mouseLocation - Specifies the location of the mouse pointer in maps.
     */
    Maps.prototype.panByDirection = function (direction, mouseLocation) {
        var xDiff = 0;
        var yDiff = 0;
        switch (direction) {
            case 'Left':
                xDiff = -(this.mapAreaRect.width / 7);
                break;
            case 'Right':
                xDiff = (this.mapAreaRect.width / 7);
                break;
            case 'Top':
                yDiff = -(this.mapAreaRect.height / 7);
                break;
            case 'Bottom':
                yDiff = (this.mapAreaRect.height / 7);
                break;
        }
        if (this.zoomModule) {
            this.zoomModule.panning(direction, xDiff, yDiff, mouseLocation);
        }
    };
    /**
     * This method is used to add the layers dynamically to the maps.
     *
     * @param {Object} layer - Specifies the layer for the maps.
     */
    Maps.prototype.addLayer = function (layer) {
        var mapsLayer = this.layers;
        mapsLayer.push(layer);
        this.isAddLayer = true;
        this.layers = mapsLayer;
    };
    /**
     * This method is used to remove a layer from map.
     *
     * @param {number} index - Specifies the index number of the layer to be removed.
     * @returns {void}
     */
    Maps.prototype.removeLayer = function (index) {
        var mapsLayer = this.layers;
        mapsLayer.splice(index, 1);
        this.layers = mapsLayer;
    };
    /**
     * This method is used to add markers dynamically in the maps.
     * If we provide the index value of the layer in which the marker to be added and the coordinates
     * of the marker as parameters, the marker will be added in the location.
     *
     * @param {number} layerIndex - Specifies the index number of the layer.
     * @param {MarkerSettingsModel[]} markerCollection - Specifies the settings of the marker to be added.
     * @returns {void}
     */
    Maps.prototype.addMarker = function (layerIndex, markerCollection) {
        var layerEle = document.getElementById(this.element.id + '_LayerIndex_' + layerIndex);
        if (markerCollection.length > 0 && layerEle) {
            for (var _i = 0, markerCollection_1 = markerCollection; _i < markerCollection_1.length; _i++) {
                var newMarker = markerCollection_1[_i];
                this.layersCollection[layerIndex].markerSettings.push(new MarkerSettings(this, 'markerSettings', newMarker));
            }
            var markerModule = new Marker(this);
            markerModule.markerRender(layerEle, layerIndex, this.mapLayerPanel['currentFactor'], 'AddMarker');
            this.arrangeTemplate();
        }
    };
    /**
     * This method is used to select the geometric shape element in the maps component.
     *
     * @param {number} layerIndex - Specifies the index of the layer in maps.
     * @param {string | string[]} propertyName - Specifies the property name from the data source.
     * @param {string} name - Specifies the name of the shape that is selected.
     * @param {boolean} enable - Specifies the shape selection to be enabled.
     * @returns {void}
     */
    Maps.prototype.shapeSelection = function (layerIndex, propertyName, name, enable) {
        var targetEle;
        var subLayerIndex;
        var popertyNameArray = Array.isArray(propertyName) ? propertyName : Array(propertyName);
        if (isNullOrUndefined(enable)) {
            enable = true;
        }
        var selectionsettings = this.layers[layerIndex].selectionSettings;
        if (!selectionsettings.enableMultiSelect && this.legendSelection && enable) {
            this.removeShapeSelection();
        }
        if (this.layers[layerIndex].type === 'SubLayer') {
            for (var i = 0; i < this.layersCollection.length; i++) {
                if ((this.layersCollection[i].shapeData === this.layers[layerIndex].shapeData)) {
                    subLayerIndex = i;
                    break;
                }
            }
        }
        if (selectionsettings.enable) {
            var targetId = void 0;
            var dataIndex = void 0;
            var shapeIndex = void 0;
            var indexValue = void 0;
            var shapeDataValue = void 0;
            var data = void 0;
            var shapeData = this.layers[layerIndex].shapeData['features'];
            for (var i = 0; i < shapeData.length; i++) {
                for (var j = 0; j < popertyNameArray.length; j++) {
                    var propertyName_1 = !isNullOrUndefined(shapeData[i]['properties'][popertyNameArray[j]])
                        && isNaN(shapeData[i]['properties'][popertyNameArray[j]]) ?
                        shapeData[i]['properties'][popertyNameArray[j]].toLowerCase() : shapeData[i]['properties'][popertyNameArray[j]];
                    var shapeName = !isNullOrUndefined(name) ? name.toLowerCase() : name;
                    var k = void 0;
                    if (propertyName_1 === shapeName) {
                        if (!isNullOrUndefined(this.layers[layerIndex].shapeSettings.colorValuePath)) {
                            k = checkShapeDataFields(this.layers[layerIndex].dataSource, shapeData[i]['properties'], this.layers[layerIndex].shapeDataPath, this.layers[layerIndex].shapePropertyPath, this.layers[layerIndex]);
                        }
                        var baseLayer = this.layers[layerIndex];
                        if (this.baseLayerIndex >= 0 && baseLayer.isBaseLayer) {
                            indexValue = 0;
                        }
                        else if (this.layers[layerIndex].type === 'SubLayer') {
                            indexValue = subLayerIndex;
                        }
                        targetId = this.element.id + '_' + 'LayerIndex_' + indexValue + '_shapeIndex_' + i + '_dataIndex_' + k;
                        targetEle = getElement(targetId);
                        if (isNullOrUndefined(k) && isNullOrUndefined(targetEle)) {
                            targetId = this.element.id + '_' + 'LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_null';
                            targetEle = getElement(targetId);
                        }
                        shapeIndex = parseInt(targetEle.id.split('_shapeIndex_')[1].split('_')[0], 10);
                        shapeDataValue = this.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
                            this.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
                        dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                        data = isNullOrUndefined(dataIndex) ? null : this.layers[layerIndex].dataSource[dataIndex];
                        if (enable) {
                            triggerItemSelectionEvent(selectionsettings, this, targetEle, shapeDataValue, data);
                            this.shapeSelectionClass = getElement('ShapeselectionMap');
                            if (this.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1) {
                                this.legendModule.shapeHighLightAndSelection(targetEle, data, selectionsettings, 'selection', layerIndex);
                            }
                            var shapeToggled = this.legendSettings.visible ? this.legendModule.shapeToggled : true;
                            if (shapeToggled) {
                                targetEle.setAttribute('class', 'ShapeselectionMapStyle');
                                if (this.selectedElementId.indexOf(targetEle.getAttribute('id')) === -1) {
                                    this.selectedElementId.push(targetEle.getAttribute('id'));
                                }
                                if (!selectionsettings.enableMultiSelect) {
                                    return;
                                }
                            }
                        }
                        else {
                            this.legendSelection = (!selectionsettings.enableMultiSelect && !this.legendSelection) ?
                                true : this.legendSelection;
                            if (this.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1 &&
                                targetEle.getAttribute('class') === 'ShapeselectionMapStyle') {
                                this.legendModule.shapeHighLightAndSelection(targetEle, data, selectionsettings, 'selection', layerIndex);
                            }
                            var shapeToggled = this.legendSettings.visible ? this.legendModule.shapeToggled : true;
                            if (shapeToggled) {
                                removeClass(targetEle);
                                var selectedElementIdIndex = this.selectedElementId.indexOf(targetEle.getAttribute('id'));
                                if (selectedElementIdIndex !== -1) {
                                    this.selectedElementId.splice(selectedElementIdIndex, 1);
                                    if (!selectionsettings.enableMultiSelect && this.legendSelection && this.selectedElementId.length > 0) {
                                        this.removeShapeSelection();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * This method is used to zoom the maps component based on the provided coordinates.
     *
     * @param {number} minLatitude - Specifies the minimum latitude to be zoomed.
     * @param {number} minLongitude - Specifies the minimum latitude to be zoomed.
     * @param {number} maxLatitude - Specifies the maximum latitude to be zoomed.
     * @param {number} maxLongitude - Specifies the maximum longitude to be zoomed.
     * @returns {void}
     */
    Maps.prototype.zoomToCoordinates = function (minLatitude, minLongitude, maxLatitude, maxLongitude) {
        var _a, _b;
        var centerLatitude;
        var centerLongtitude;
        var isTwoCoordinates = false;
        if (isNullOrUndefined(maxLatitude) && isNullOrUndefined(maxLongitude)
            || isNullOrUndefined(minLatitude) && isNullOrUndefined(minLongitude)) {
            minLatitude = isNullOrUndefined(minLatitude) ? 0 : minLatitude;
            minLongitude = isNullOrUndefined(minLatitude) ? 0 : minLongitude;
            maxLatitude = isNullOrUndefined(maxLatitude) ? minLatitude : maxLatitude;
            maxLongitude = isNullOrUndefined(maxLongitude) ? minLongitude : maxLongitude;
            isTwoCoordinates = true;
        }
        if (minLatitude > maxLatitude) {
            _a = [maxLatitude, minLatitude], minLatitude = _a[0], maxLatitude = _a[1];
        }
        if (minLongitude > maxLongitude) {
            _b = [maxLongitude, minLongitude], minLongitude = _b[0], maxLongitude = _b[1];
        }
        if (!isTwoCoordinates) {
            centerLatitude = (minLatitude + maxLatitude) / 2;
            centerLongtitude = (minLongitude + maxLongitude) / 2;
        }
        else {
            centerLatitude = (minLatitude + maxLatitude);
            centerLongtitude = (minLongitude + maxLongitude);
        }
        this.centerLatOfGivenLocation = centerLatitude;
        this.centerLongOfGivenLocation = centerLongtitude;
        this.minLatOfGivenLocation = minLatitude;
        this.minLongOfGivenLocation = minLongitude;
        this.maxLatOfGivenLocation = maxLatitude;
        this.maxLongOfGivenLocation = maxLongitude;
        this.zoomNotApplied = true;
        this.scaleOfGivenLocation = calculateZoomLevel(minLatitude, maxLatitude, minLongitude, maxLongitude, this.mapAreaRect.width, this.mapAreaRect.height, this);
        var zoomArgs = {
            cancel: false, name: 'zoom', type: zoomIn, maps: this,
            tileTranslatePoint: {}, translatePoint: {},
            tileZoomLevel: this.isTileMap ? { previous: this.tileZoomLevel, current: this.scaleOfGivenLocation } : {},
            scale: !this.isTileMap ? { previous: this.scale, current: this.scaleOfGivenLocation } :
                { previous: this.tileZoomLevel, current: this.scaleOfGivenLocation }
        };
        this.trigger('zoom', zoomArgs);
        this.refresh();
    };
    /**
     * This method is used to remove multiple selected shapes in the maps.
     *
     * @returns {void}
     */
    Maps.prototype.removeShapeSelection = function () {
        var selectedElements = this.selectedElementId.length;
        for (var i = 0; i < selectedElements; i++) {
            removeClass(getElementByID(this.selectedElementId[0]));
            this.selectedElementId.splice(0, 1);
        }
        if (this.legendSettings.visible) {
            var legendSelectedElements = this.legendSelectionCollection.length;
            for (var i = 0; i < legendSelectedElements; i++) {
                removeClass(getElementByID(this.legendSelectionCollection[i]['legendElement']['id']));
                this.selectedLegendElementId.splice(0, 1);
            }
        }
        this.shapeSelectionItem = [];
        this.legendSelectionCollection = [];
    };
    /**
     * This method is used to set culture for maps component.
     *
     * @returns {void}
     */
    Maps.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * This method to set locale constants to the maps component.
     *
     * @returns {void}
     */
    Maps.prototype.setLocaleConstants = function () {
        // Need to modify after the api confirm
        this.defaultLocalConstants = {
            ZoomIn: 'Zoom in',
            Zoom: 'Zoom',
            ZoomOut: 'Zoom out',
            Pan: 'Pan',
            Reset: 'Reset'
        };
    };
    /**
     * This method disposes the maps component.
     */
    Maps.prototype.destroy = function () {
        this.unWireEVents();
        this.shapeSelectionItem = [];
        this.toggledShapeElementId = [];
        this.toggledLegendId = [];
        this.legendSelectionCollection = [];
        this.selectedLegendElementId = [];
        this.selectedNavigationElementId = [];
        this.selectedBubbleElementId = [];
        this.selectedMarkerElementId = [];
        this.selectedElementId = [];
        this.dataLabelShape = [];
        this.zoomShapeCollection = [];
        this.zoomLabelPositions = [];
        this.mouseDownEvent = { x: null, y: null };
        this.mouseClickEvent = { x: null, y: null };
        if (document.getElementById('mapsmeasuretext')) {
            document.getElementById('mapsmeasuretext').remove();
        }
        this.removeSvg();
        _super.prototype.destroy.call(this);
    };
    /**
     * Gets component name
     *
     * @returns {string} - Returns the string value
     */
    Maps.prototype.getModuleName = function () {
        return 'maps';
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getPersistData = function () {
        var keyEntity = ['translatePoint', 'zoomSettings', 'mapScaleValue', 'tileTranslatePoint', 'baseTranslatePoint',
            'scale', 'zoomPersistence', 'defaultState', 'markerZoomedState', 'initialCheck', 'initialZoomLevel', 'initialTileTranslate',
            'applyZoomReset', 'markerZoomFactor'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {MapsModel} newProp - Specifies the new property
     * @param {MapsModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    Maps.prototype.onPropertyChanged = function (newProp, oldProp) {
        var render = false;
        var isMarker = false;
        var isLayer = false;
        var isStaticMapType = false;
        var layerEle;
        if (newProp['layers']) {
            var newLayerLength = Object.keys(newProp['layers']).length;
            layerEle = document.getElementById(this.element.id + '_LayerIndex_' + (newLayerLength - 1));
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'background':
                    this.renderBorder();
                    break;
                case 'height':
                case 'width':
                case 'layers':
                case 'projectionType':
                case 'centerPosition':
                case 'legendSettings':
                case 'baseLayerIndex':
                    if (prop === 'layers') {
                        isLayer = true;
                        var layerPropLength = Object.keys(newProp.layers).length;
                        for (var x = 0; x < layerPropLength; x++) {
                            if (!isNullOrUndefined(newProp.layers[x])) {
                                var collection = Object.keys(newProp.layers[x]);
                                for (var _b = 0, collection_1 = collection; _b < collection_1.length; _b++) {
                                    var collectionProp = collection_1[_b];
                                    if ((collectionProp === 'layerType' && newProp.layers[x].layerType !== 'Geometry') || (isNullOrUndefined(this.layers[x].shapeData)
                                        && !isNullOrUndefined(this.layers[x].urlTemplate) && this.layers[x].urlTemplate !== '')) {
                                        this.isReset = true;
                                    }
                                    else if (collectionProp === 'markerSettings') {
                                        isMarker = true;
                                    }
                                    else if (collectionProp === 'staticMapType') {
                                        isStaticMapType = true;
                                    }
                                }
                            }
                        }
                    }
                    render = true;
                    break;
                case 'zoomSettings':
                    if (!isNullOrUndefined(oldProp.zoomSettings)) {
                        if (newProp.zoomSettings.zoomFactor !== oldProp.zoomSettings.zoomFactor && !isLayer) {
                            render = false;
                        }
                        else if (newProp.zoomSettings.shouldZoomInitially !== oldProp.zoomSettings.shouldZoomInitially) {
                            this.zoomSettings.zoomFactor = 1;
                            render = true;
                        }
                        else if (newProp.zoomSettings.enable !== oldProp.zoomSettings.enable) {
                            this.zoomSettings.zoomFactor = 1;
                            render = true;
                        }
                        else {
                            render = true;
                        }
                    }
                    break;
                case 'locale':
                case 'currencyCode':
                    _super.prototype.refresh.call(this);
                    break;
            }
        }
        if (render) {
            if (newProp.layers && isMarker) {
                removeElement(this.element.id + '_Markers_Group');
                if (this.isTileMap) {
                    this.mapLayerPanel.renderTileLayer(this.mapLayerPanel, this.layers['currentFactor'], (this.layers.length - 1));
                }
                else {
                    this.render();
                }
            }
            else if (newProp.layers && isStaticMapType) {
                this.mapLayerPanel.renderGoogleMap(this.layers[this.layers.length - 1].key, this.staticMapZoom);
            }
            else {
                this.createSVG();
                this.renderElements();
            }
        }
    };
    /**
     * To provide the array of modules needed for maps rendering
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    Maps.prototype.requiredModules = function () {
        var modules = [];
        var isVisible = this.findVisibleLayers(this.layers);
        var annotationEnable = false;
        this.annotations.map(function (annotation, index) {
            annotationEnable = annotation.content != null;
        });
        if (this.isBubbleVisible()) {
            modules.push({
                member: 'Bubble',
                args: [this]
            });
        }
        if (isVisible.highlight) {
            modules.push({
                member: 'Highlight',
                args: [this]
            });
        }
        if (isVisible.selection) {
            modules.push({
                member: 'Selection',
                args: [this]
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }
        if (this.zoomSettings.enable || this.zoomSettings.zoomFactor > this.zoomSettings.minZoom) {
            modules.push({
                member: 'Zoom',
                args: [this]
            });
        }
        if (this.isMarkersVisible()) {
            modules.push({
                member: 'Marker',
                args: [this]
            });
        }
        if (this.isDataLabelVisible()) {
            modules.push({
                member: 'DataLabel',
                args: [this]
            });
        }
        if (this.isNavigationVisible()) {
            modules.push({
                member: 'NavigationLine',
                args: [this]
            });
        }
        if (isVisible.tooltip) {
            modules.push({
                member: 'MapsTooltip',
                args: [this]
            });
        }
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations]
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
        return modules;
    };
    /**
     * To find marker visibility
     */
    Maps.prototype.isMarkersVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer, layerIndex) {
            for (var i = 0; i < layer.markerSettings.length; i++) {
                if (layer.markerSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find DataLabel visibility
     */
    Maps.prototype.isDataLabelVisible = function () {
        var isVisible = false;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].dataLabelSettings.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find navigation line visibility
     */
    Maps.prototype.isNavigationVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer, layerIndex) {
            for (var i = 0; i < layer.navigationLineSettings.length; i++) {
                if (layer.navigationLineSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find space between the secondary element and svg element.
     * @private
     */
    Maps.prototype.getExtraPosition = function () {
        var top = 0;
        var left = 0;
        var svgElement = getElement(this.element.id + '_svg');
        if (!isNullOrUndefined(svgElement)) {
            var svgClientRects = svgElement.getClientRects();
            var mapsClientRects = (getElement(this.element.id + '_Secondary_Element')).getClientRects();
            if (svgClientRects.length !== 0 && mapsClientRects.length !== 0) {
                var svgClientRect = svgClientRects[0];
                var mapsClientRect = mapsClientRects[0];
                top = svgClientRect.top - mapsClientRect.top;
                left = svgClientRect.left - mapsClientRect.left;
            }
        }
        return new Point(left, top);
    };
    /**
     * To find marker visibility
     */
    Maps.prototype.isBubbleVisible = function () {
        var isVisible = false;
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (this.getBubbleVisible(layer)) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find the bubble visibility from layer
     *
     * @param {LayerSettingsModel} layer - Spcifies the layer settings model
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.getBubbleVisible = function (layer) {
        var isVisible = false;
        for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * This method handles the printing functionality for the maps component.
     *
     * @param {string[] | string | Element} id - Specifies the element to be printed.
     * @returns {void}
     */
    Maps.prototype.print = function (id) {
        if ((this.allowPrint) && (this.printModule)) {
            this.printModule.print(id);
        }
    };
    /**
     * This method handles the export functionality for the maps component.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the name of the file with which the rendered maps need to be exported.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the pdf document in exporting.
     * @param {boolean} allowDownload - Specifies whether to download as a file or get as base64 string for the file
     * @returns {Promise<string>} - Returns the string value.
     */
    Maps.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if ((type !== 'PDF') && (this.allowImageExport) && (this.imageExportModule)) {
            return new Promise(function (resolve, reject) {
                resolve(_this.imageExportModule.export(type, fileName, allowDownload));
            });
        }
        else if ((this.allowPdfExport) && (this.pdfExportModule)) {
            return new Promise(function (resolve, reject) {
                resolve(_this.pdfExportModule.export(type, fileName, allowDownload, orientation));
            });
        }
        return null;
    };
    /**
     * This method is used to get the Bing maps URL.
     *
     * @param {string} url - Specifies the URL of the maps.
     * @returns {Promise<string>} - Returns the processed Bing URL as Promise.
     */
    Maps.prototype.getBingUrlTemplate = function (url) {
        var promise = new Promise(function (resolve, reject) {
            var ajax = new Ajax({
                url: url
            });
            ajax.onSuccess = function (json) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var jsonObject = JSON.parse(json);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var resource = jsonObject['resourceSets'][0]['resources'][0];
                resolve(resource['imageUrl']);
            };
            ajax.send();
        });
        return promise;
    };
    /**
     * To find visibility of layers and markers for required modules load.
     *
     * @param {LayerSettingsModel[]} layers - Specifies the layers.
     * @param {boolean} isLayerVisible - Specifies whether the layer is visible or not.
     * @param {boolean} isBubblevisible - Specifies whether the bubble is visible or not.
     * @param {boolean} istooltipVisible - Specifies whether the tooltip is visible or not.
     * @param {boolean} isSelection - Specifies whether the shape is selectd or not.
     * @param {boolean} isHighlight - Specfies whether the shape is highlighted or not.
     * @returns {boolean} - Returns the boolean value
     */
    Maps.prototype.findVisibleLayers = function (layers, isLayerVisible, isBubblevisible, istooltipVisible, isSelection, isHighlight) {
        if (isLayerVisible === void 0) { isLayerVisible = false; }
        if (isBubblevisible === void 0) { isBubblevisible = false; }
        if (istooltipVisible === void 0) { istooltipVisible = false; }
        if (isSelection === void 0) { isSelection = false; }
        if (isHighlight === void 0) { isHighlight = false; }
        var bubbles;
        var markers;
        var navigationLine;
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var layer = layers_1[_i];
            isLayerVisible = layer.visible || isLayerVisible;
            if (layer.visible) {
                bubbles = layer.bubbleSettings;
                markers = layer.markerSettings;
                navigationLine = layer.navigationLineSettings;
                for (var _a = 0, navigationLine_1 = navigationLine; _a < navigationLine_1.length; _a++) {
                    var navigation = navigationLine_1[_a];
                    if (navigation.visible) {
                        isSelection = navigation.highlightSettings.enable || isSelection;
                        isHighlight = navigation.selectionSettings.enable || isHighlight;
                    }
                }
                for (var _b = 0, markers_1 = markers; _b < markers_1.length; _b++) {
                    var marker = markers_1[_b];
                    if (marker.visible) {
                        istooltipVisible = marker.tooltipSettings.visible || istooltipVisible;
                        isSelection = marker.selectionSettings.enable || isSelection;
                        isHighlight = marker.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                for (var _c = 0, bubbles_1 = bubbles; _c < bubbles_1.length; _c++) {
                    var bubble = bubbles_1[_c];
                    if (bubble.visible) {
                        istooltipVisible = bubble.tooltipSettings.visible || istooltipVisible;
                        isSelection = bubble.selectionSettings.enable || isSelection;
                        isHighlight = bubble.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                istooltipVisible = layer.tooltipSettings.visible || istooltipVisible;
                isSelection = layer.selectionSettings.enable || isSelection;
                isHighlight = layer.highlightSettings.enable || isHighlight;
            }
            if (isLayerVisible && isBubblevisible && istooltipVisible) {
                break;
            }
        }
        return {
            layer: isLayerVisible, bubble: isBubblevisible, tooltip: istooltipVisible,
            selection: isSelection, highlight: isHighlight
        };
    };
    /**
     * This method is used to get the geo location points.
     *
     * @param {number} layerIndex - Specifies the index number of the layer of the map.
     * @param {number} x - Specifies the x value.
     * @param {number} y - Specifies the y value.
     * @returns {GeoPosition}- Returns the geo position
     */
    Maps.prototype.getGeoLocation = function (layerIndex, x, y) {
        var container = document.getElementById(this.element.id);
        var pageX = x - container.offsetLeft;
        var pageY = y - container.offsetTop;
        var currentLayer = this.layersCollection[layerIndex];
        var translate = getTranslate(this, currentLayer, false);
        var translatePoint = translate['location'];
        var translatePointX = translatePoint.x * this.scale;
        var translatePointY = translatePoint.y * this.scale;
        var mapSize = (Math.min(this.mapAreaRect.height, this.mapAreaRect.width)
            * this.mapLayerPanel['currentFactor']) * this.scale;
        var xx = (this.clip(pageX - translatePointX, 0, mapSize - 1) / mapSize) - 0.5;
        var yy = 0.5 - (this.clip(pageY - translatePointY, 0, mapSize - 1) / mapSize);
        var lat = 90 - 360 * Math.atan(Math.exp(-yy * 2 * Math.PI)) / Math.PI;
        var long = 360 * xx;
        return { latitude: lat, longitude: long };
    };
    Maps.prototype.clip = function (value, minVal, maxVal) {
        return Math.min(Math.max(value, minVal), maxVal);
    };
    /**
     * This method is used to get the geo location points when tile maps is rendered in the maps component.
     *
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @returns {GeoPosition} - Returns the position
     */
    Maps.prototype.getTileGeoLocation = function (x, y) {
        var container = document.getElementById(this.element.id);
        var ele = document.getElementById(this.element.id + '_tile_parent');
        var latLong = this.pointToLatLong(x + this.mapAreaRect.x - (ele.offsetLeft - container.offsetLeft), y + this.mapAreaRect.y - (ele.offsetTop - container.offsetTop));
        return { latitude: latLong['latitude'], longitude: latLong['longitude'] };
    };
    /**
     * This method is used to convert the point to latitude and longitude in maps.
     *
     * @param {number} pageX - Specifies the x value for the page.
     * @param {number} pageY - Specifies the y value for the page.
     * @returns {Object} - Returns the object.
     */
    Maps.prototype.pointToLatLong = function (pageX, pageY) {
        var padding = this.layers[this.layers.length - 1].layerType === 'GoogleStaticMap' ? 0 : 10;
        pageY = (this.zoomSettings.enable) ? pageY + padding : pageY;
        var mapSize = 256 * Math.pow(2, this.tileZoomLevel);
        var x1 = (this.clip(pageX - (this.translatePoint.x * this.scale), 0, mapSize - 1) / mapSize) - 0.5;
        var y1 = 0.5 - (this.clip(pageY - (this.translatePoint.y * this.scale), 0, mapSize - 1) / mapSize);
        var lat = 90 - 360 * Math.atan(Math.exp(-y1 * 2 * Math.PI)) / Math.PI;
        var long = 360 * x1;
        return { latitude: lat, longitude: long };
    };
    __decorate([
        Property(null)
    ], Maps.prototype, "background", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "height", void 0);
    __decorate([
        Property('MouseMove')
    ], Maps.prototype, "tooltipDisplayMode", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowPrint", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowImageExport", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowPdfExport", void 0);
    __decorate([
        Complex({}, TitleSettings)
    ], Maps.prototype, "titleSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], Maps.prototype, "zoomSettings", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], Maps.prototype, "legendSettings", void 0);
    __decorate([
        Collection([], LayerSettings)
    ], Maps.prototype, "layers", void 0);
    __decorate([
        Collection([], Annotation)
    ], Maps.prototype, "annotations", void 0);
    __decorate([
        Complex({}, Margin)
    ], Maps.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Maps.prototype, "border", void 0);
    __decorate([
        Property('Material')
    ], Maps.prototype, "theme", void 0);
    __decorate([
        Property('Mercator')
    ], Maps.prototype, "projectionType", void 0);
    __decorate([
        Property(0)
    ], Maps.prototype, "baseLayerIndex", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "description", void 0);
    __decorate([
        Property(1)
    ], Maps.prototype, "tabIndex", void 0);
    __decorate([
        Complex({ latitude: null, longitude: null }, CenterPosition)
    ], Maps.prototype, "centerPosition", void 0);
    __decorate([
        Complex({}, MapsAreaSettings)
    ], Maps.prototype, "mapsArea", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "load", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "click", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "onclick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "doubleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "rightClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "resize", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "legendRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRenderComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeSelected", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemSelection", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "layerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "dataLabelRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "annotationRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "zoom", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "pan", void 0);
    Maps = __decorate([
        NotifyPropertyChanges
    ], Maps);
    return Maps;
}(Component));
export { Maps };
