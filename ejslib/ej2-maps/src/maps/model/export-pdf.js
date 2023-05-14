/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { PdfPageOrientation, PdfDocument, PdfBitmap } from '@syncfusion/ej2-pdf-export';
/**
 * This module enables the export to PDF functionality in Maps control.
 *
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for Maps
     *
     * @param {Maps} control Specifies the instance of the map
     */
    function PdfExport(control) {
        this.control = control;
    }
    /**
     * To export the file as image/svg format
     *
     * @param {ExportType} type - Specifies the type of the document
     * @param {string} fileName - Specifies the file name of the document
     * @param {boolean} allowDownload - Specifies whether to download the document or not
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the component
     * @returns {Promise<string>} - Returns the promise string
     * @private
     */
    PdfExport.prototype.export = function (type, fileName, allowDownload, orientation) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var promise = new Promise(function (resolve, reject) {
            var canvasElement = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': _this.control.availableSize.width.toString(),
                    'height': _this.control.availableSize.height.toString()
                }
            });
            orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
            var svgParent = document.getElementById(_this.control.element.id + '_Tile_SVG_Parent');
            var svgData;
            var exportElement = _this.control.svgObject.cloneNode(true);
            var backgroundElement = exportElement.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((_this.control.theme === 'Tailwind' || _this.control.theme === 'TailwindDark' || _this.control.theme === 'Bootstrap5' || _this.control.theme === 'Bootstrap5Dark'
                || _this.control.theme === 'Fluent' || _this.control.theme === 'FluentDark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            var pdfDocument = new PdfDocument();
            var image = new Image();
            var ctx = canvasElement.getContext('2d');
            if (!_this.control.isTileMap) {
                image.onload = (function () {
                    ctx.drawImage(image, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (type === 'PDF') {
                        var imageString = canvasElement.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                        pdfDocument.pageSettings.orientation = orientation;
                        imageString = imageString.slice(imageString.indexOf(',') + 1);
                        pdfDocument.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, (_this.control.availableSize.width - 60), _this.control.availableSize.height);
                        if (allowDownload) {
                            pdfDocument.save(fileName + '.pdf');
                            pdfDocument.destroy();
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
                image.src = url;
            }
            else {
                var svgParentElement = document.getElementById(_this.control.element.id + '_MapAreaBorder');
                var top_1 = parseFloat(svgParentElement.getAttribute('y'));
                var left_1 = parseFloat(svgParentElement.getAttribute('x'));
                var xHttp = new XMLHttpRequest();
                var tileLength_1 = _this.control.mapLayerPanel.tiles.length;
                var _loop_1 = function (i) {
                    var tile = document.getElementById(_this.control.element.id + '_tile_' + (i - 1));
                    var tileImg = new Image();
                    tileImg.crossOrigin = 'Anonymous';
                    ctx.fillStyle = _this.control.background ? _this.control.background : '#FFFFFF';
                    ctx.fillRect(0, 0, _this.control.availableSize.width, _this.control.availableSize.height);
                    ctx.font = _this.control.titleSettings.textStyle.size + ' Arial';
                    var titleElement = document.getElementById(_this.control.element.id + '_Map_title');
                    if (!isNullOrUndefined(titleElement)) {
                        ctx.fillStyle = titleElement.getAttribute('fill');
                        ctx.fillText(_this.control.titleSettings.text, parseFloat(titleElement.getAttribute('x')), parseFloat(titleElement.getAttribute('y')));
                    }
                    tileImg.onload = (function () {
                        if (i === 0 || i === tileLength_1 + 1) {
                            if (i === 0) {
                                ctx.setTransform(1, 0, 0, 1, 0, 0);
                                ctx.rect(0, top_1, parseFloat(svgParent.style.width), parseFloat(svgParent.style.height));
                                ctx.clip();
                            }
                            else {
                                ctx.setTransform(1, 0, 0, 1, left_1, top_1);
                            }
                        }
                        else {
                            var tileParent = document.getElementById(_this.control.element.id + '_tile_parent');
                            ctx.setTransform(1, 0, 0, 1, parseFloat(tile.style.left) + left_1, parseFloat(tile.style.top) + top_1);
                        }
                        ctx.drawImage(tileImg, 0, 0);
                        if (i === tileLength_1 + 1) {
                            if (type === 'PDF') {
                                localStorage.setItem('saved-image-example', canvasElement.toDataURL('image/jpeg'));
                                var x = localStorage.getItem('saved-image-example');
                                pdfDocument.pageSettings.orientation = orientation;
                                x = x.slice(x.indexOf(',') + 1);
                                pdfDocument.pages.add().graphics.drawImage(new PdfBitmap(x), 0, 0, (_this.control.availableSize.width - 60), _this.control.availableSize.height);
                                if (allowDownload) {
                                    pdfDocument.save(fileName + '.pdf');
                                    pdfDocument.destroy();
                                }
                                else {
                                    resolve(null);
                                }
                            }
                        }
                    });
                    if (i === 0 || i === tileLength_1 + 1) {
                        if (i === 0) {
                            tileImg.src = url;
                        }
                        else {
                            setTimeout(function () {
                                var tileSvg = document.getElementById(_this.control.element.id + '_Tile_SVG');
                                tileImg.src = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(tileSvg)], { type: 'image/svg+xml' }));
                            }, 300);
                        }
                    }
                    else {
                        xHttp.open('GET', tile.children[0].getAttribute('src'), true);
                        xHttp.send();
                        tileImg.src = tile.children[0].getAttribute('src');
                    }
                };
                for (var i = 0; i <= tileLength_1 + 1; i++) {
                    _loop_1(i);
                }
            }
        });
        return promise;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    /**
     * To destroy the PdfExports.
     *
     * @param {Maps} maps - Specifies the instance of the maps.
     * @returns {void}
     * @private
     */
    PdfExport.prototype.destroy = function (maps) {
        /**
         * Destroy method performed here
         */
    };
    return PdfExport;
}());
export { PdfExport };
