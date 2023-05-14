import { splitArrayCollection, processPathData, getPathString } from '@syncfusion/ej2-drawings';
import { Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
var InkAnnotation = /** @class */ (function () {
    function InkAnnotation(pdfViewer, pdfViewerBase) {
        // eslint-disable-next-line
        this.newObject = [];
        /**
         * @private
         */
        this.outputString = '';
        /**
         * @private
         */
        // eslint-disable-next-line
        this.inkAnnotationindex = [];
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        /**
         * @private
         */
        this.currentPageNumber = '';
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     */
    InkAnnotation.prototype.drawInk = function () {
        this.pdfViewerBase.disableTextSelectionMode();
        this.pdfViewer.tool = 'Ink';
    };
    InkAnnotation.prototype.drawInkAnnotation = function (pageNumber) {
        if (this.pdfViewerBase.isToolbarInkClicked) {
            this.pdfViewerBase.isInkAdded = true;
            var pageIndex = !isNaN(pageNumber) ? pageNumber : this.pdfViewerBase.currentPageNumber - 1;
            if (this.outputString && this.outputString !== '') {
                var currentAnnot = this.addInk(pageIndex);
                this.pdfViewer.renderDrawing(undefined, pageIndex);
                this.pdfViewer.clearSelection(pageIndex);
                this.pdfViewer.select([currentAnnot.id], currentAnnot.annotationSelectorSettings);
                if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
                }
                if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools("Ink");
                }
            }
            else {
                this.outputString = '';
                this.newObject = [];
                this.pdfViewerBase.isToolbarInkClicked = false;
                this.pdfViewer.tool = '';
            }
            this.pdfViewerBase.isInkAdded = false;
        }
    };
    /**
     * @private
     */
    InkAnnotation.prototype.storePathData = function () {
        this.convertToPath(this.newObject);
        this.newObject = [];
    };
    /**
     * @param position
     * @param pageIndex
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.drawInkInCanvas = function (position, pageIndex) {
        // eslint-disable-next-line
        if (this.currentPageNumber !== '' && parseInt(this.currentPageNumber) !== pageIndex) {
            // eslint-disable-next-line
            this.drawInkAnnotation(parseInt(this.currentPageNumber));
            this.pdfViewerBase.isToolbarInkClicked = true;
            this.pdfViewer.tool = 'Ink';
        }
        var zoom = this.pdfViewerBase.getZoomFactor();
        var ratio = this.pdfViewerBase.getWindowDevicePixelRatio();
        ;
        // eslint-disable-next-line
        var canvas = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
        // eslint-disable-next-line
        var context = canvas.getContext('2d');
        var thickness = this.pdfViewer.inkAnnotationSettings.thickness ? this.pdfViewer.inkAnnotationSettings.thickness : 1;
        // eslint-disable-next-line max-len
        var opacity = this.pdfViewer.inkAnnotationSettings.opacity ? this.pdfViewer.inkAnnotationSettings.opacity : 1;
        // eslint-disable-next-line max-len
        var strokeColor = this.pdfViewer.inkAnnotationSettings.strokeColor ? this.pdfViewer.inkAnnotationSettings.strokeColor : '#ff0000';
        if (!Browser.isDevice || (Browser.isDevice && zoom <= 0.7)) {
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        }
        context.beginPath();
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.moveTo(position.prevPosition.x, position.prevPosition.y);
        context.lineTo(position.currentPosition.x, position.currentPosition.y);
        context.lineWidth = thickness * zoom > 1 ? thickness * zoom : thickness;
        context.strokeStyle = strokeColor;
        context.globalAlpha = opacity;
        context.stroke();
        // context.lineWidth = 2;
        context.arc(position.prevPosition.x, position.prevPosition.y, 2 / 2, 0, Math.PI * 2, true);
        context.closePath();
        this.pdfViewerBase.prevPosition = position.currentPosition;
        this.newObject.push(position.currentPosition.x, position.currentPosition.y);
        this.currentPageNumber = pageIndex.toString();
    };
    // eslint-disable-next-line
    InkAnnotation.prototype.convertToPath = function (newObject) {
        this.movePath(newObject[0], newObject[1]);
        this.linePath(newObject[0], newObject[1]);
        for (var n = 2; n < newObject.length; n = n + 2) {
            this.linePath(newObject[n], newObject[n + 1]);
        }
    };
    InkAnnotation.prototype.linePath = function (x, y) {
        this.outputString += 'L' + x + ',' + y + ' ';
    };
    InkAnnotation.prototype.movePath = function (x, y) {
        this.outputString += 'M' + x + ',' + y + ' ';
    };
    /**
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.addInk = function (pageNumber) {
        // eslint-disable-next-line
        var currentBounds = this.calculateInkSize();
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        // eslint-disable-next-line
        var annot;
        if (this.pdfViewerBase.isToolbarInkClicked) {
            var annotationName = this.pdfViewer.annotation.createGUID();
            var modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            var pageIndex = !isNaN(pageNumber) ? pageNumber : this.pdfViewerBase.currentPageNumber - 1;
            var thickness = this.pdfViewer.inkAnnotationSettings.thickness ? this.pdfViewer.inkAnnotationSettings.thickness : 1;
            // eslint-disable-next-line max-len
            var opacity = this.pdfViewer.inkAnnotationSettings.opacity ? this.pdfViewer.inkAnnotationSettings.opacity : 1;
            // eslint-disable-next-line max-len
            var strokeColor = this.pdfViewer.inkAnnotationSettings.strokeColor ? this.pdfViewer.inkAnnotationSettings.strokeColor : '#ff0000';
            // eslint-disable-next-line
            var isLock = this.pdfViewer.inkAnnotationSettings.isLock ? this.pdfViewer.inkAnnotationSettings.isLock : this.pdfViewer.annotationSettings.isLock;
            var author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.inkAnnotationSettings.author ? this.pdfViewer.inkAnnotationSettings.author : 'Guest';
            var customData = this.pdfViewer.inkAnnotationSettings.customData;
            var isPrint = this.pdfViewer.inkAnnotationSettings.isPrint;
            // eslint-disable-next-line
            var allowedInteractions = this.pdfViewer.inkAnnotationSettings.allowedInteractions ? this.pdfViewer.inkAnnotationSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            // eslint-disable-next-line
            var annotationSettings = this.pdfViewer.inkAnnotationSettings ? this.pdfViewer.inkAnnotationSettings : this.pdfViewer.annotationSettings;
            annot = {
                // eslint-disable-next-line max-len
                id: 'ink' + this.pdfViewerBase.inkCount, bounds: { x: currentBounds.x, y: currentBounds.y, width: currentBounds.width, height: currentBounds.height }, pageIndex: pageIndex, data: this.outputString, customData: customData,
                shapeAnnotationType: 'Ink', opacity: opacity, strokeColor: strokeColor, thickness: thickness, annotName: annotationName, comments: [],
                author: author, subject: 'Ink', notes: '',
                review: { state: '', stateModel: '', modifiedDate: modifiedDate, author: author },
                annotationSelectorSettings: this.getSelector('Ink', ''), modifiedDate: modifiedDate, annotationSettings: annotationSettings,
                isPrint: isPrint, allowedInteractions: allowedInteractions, isCommentLock: false, isLocked: isLock
            };
            var annotation = this.pdfViewer.add(annot);
            // eslint-disable-next-line
            var bounds = { left: annot.bounds.x, top: annot.bounds.y, width: annot.bounds.width, height: annot.bounds.height };
            // eslint-disable-next-line
            var settings = {
                opacity: annot.opacity, strokeColor: annot.strokeColor, thickness: annot.thickness, modifiedDate: annot.modifiedDate,
                width: annot.bounds.width, height: annot.bounds.height, data: this.outputString
            };
            this.pdfViewerBase.inkCount++;
            // eslint-disable-next-line max-len
            var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('ink', (annot.pageIndex + 1), annot.shapeAnnotationType);
            if (commentsDivid) {
                document.getElementById(commentsDivid).id = annotationName;
            }
            annot.annotName = annotationName;
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(pageIndex, null, annotation, 'Addition', '', annotation, annotation);
            this.pdfViewer.annotationModule.storeAnnotations(pageIndex, annot, '_annotations_ink');
            this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'Ink', bounds, settings);
            if (this.pdfViewerBase.isInkAdded) {
                this.outputString = '';
                this.newObject = [];
            }
            this.pdfViewerBase.isToolbarInkClicked = false;
            this.pdfViewer.tool = '';
        }
        return annot;
    };
    /**
     * @private
     */
    InkAnnotation.prototype.setAnnotationMode = function () {
        if (this.pdfViewerBase.isToolbarInkClicked) {
            this.drawInkAnnotation();
        }
        else {
            this.pdfViewerBase.isToolbarInkClicked = true;
            this.drawInk();
        }
    };
    InkAnnotation.prototype.saveInkSignature = function () {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        // eslint-disable-next-line
        var annotations = new Array();
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            annotations[j] = [];
        }
        if (storeObject) {
            var annotationCollection = JSON.parse(storeObject);
            for (var i = 0; i < annotationCollection.length; i++) {
                // eslint-disable-next-line
                var newArray = [];
                var pageAnnotationObject = annotationCollection[i];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        this.pdfViewer.annotationModule.updateModifiedDate(pageAnnotationObject.annotations[z]);
                        // eslint-disable-next-line max-len
                        var strokeColorString = pageAnnotationObject.annotations[z].strokeColor;
                        pageAnnotationObject.annotations[z].strokeColor = JSON.stringify(this.pdfViewerBase.signatureModule.getRgbCode(strokeColorString));
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.pdfViewer.annotation.getInkBounds(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.pageIndex));
                        // eslint-disable-next-line
                        var collectionData = processPathData(pageAnnotationObject.annotations[z].data);
                        // eslint-disable-next-line
                        var csData = splitArrayCollection(collectionData);
                        pageAnnotationObject.annotations[z].data = JSON.stringify(csData);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    /**
     * @param pageNumber
     * @param annotationBase
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.addInCollection = function (pageNumber, annotationBase) {
        if (annotationBase) {
            // eslint-disable-next-line
            var pageAnnotations = this.getAnnotations(pageNumber, null);
            if (pageAnnotations) {
                pageAnnotations.push(annotationBase);
            }
            this.manageInkAnnotations(pageAnnotations, pageNumber);
        }
    };
    // eslint-disable-next-line
    InkAnnotation.prototype.calculateInkSize = function () {
        var minimumX = -1;
        var minimumY = -1;
        var maximumX = -1;
        var maximumY = -1;
        // eslint-disable-next-line
        var collectionData = processPathData(this.outputString);
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        // eslint-disable-next-line
        for (var k = 0; k < collectionData.length; k++) {
            // eslint-disable-next-line
            var val = collectionData[k];
            if (minimumX === -1) {
                // eslint-disable-next-line
                minimumX = (val['x']);
                // eslint-disable-next-line
                maximumX = (val['x']);
                // eslint-disable-next-line
                minimumY = (val['y']);
                // eslint-disable-next-line
                maximumY = (val['y']);
            }
            else {
                // eslint-disable-next-line
                var point1 = (val['x']);
                // eslint-disable-next-line
                var point2 = (val['y']);
                if (minimumX >= point1) {
                    minimumX = point1;
                }
                if (minimumY >= point2) {
                    minimumY = point2;
                }
                if (maximumX <= point1) {
                    maximumX = point1;
                }
                if (maximumY <= point2) {
                    maximumY = point2;
                }
            }
        }
        var newdifferenceX = maximumX - minimumX;
        var newdifferenceY = maximumY - minimumY;
        // eslint-disable-next-line max-len
        return { x: (minimumX / zoomvalue), y: (minimumY / zoomvalue), width: (newdifferenceX / zoomvalue), height: (newdifferenceY / zoomvalue) };
    };
    /**
     * @param annotationCollection
     * @param pageIndex
     * @param isImport
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.renderExistingInkSignature = function (annotationCollection, pageIndex, isImport) {
        var annot;
        var isinkAnnotationAdded = false;
        if (!isImport) {
            for (var p = 0; p < this.inkAnnotationindex.length; p++) {
                if (this.inkAnnotationindex[p] === pageIndex) {
                    isinkAnnotationAdded = true;
                    break;
                }
            }
        }
        if (annotationCollection && !isinkAnnotationAdded) {
            if (annotationCollection.length > 0 && this.inkAnnotationindex.indexOf(pageIndex) === -1) {
                this.inkAnnotationindex.push(pageIndex);
            }
            for (var n = 0; n < annotationCollection.length; n++) {
                // eslint-disable-next-line
                var currentAnnotation = annotationCollection[n];
                if (currentAnnotation) {
                    // eslint-disable-next-line
                    var data = currentAnnotation.PathData;
                    if (isImport && data) {
                        if (typeof (data) === 'object' && data.length > 1) {
                            data = getPathString(data);
                        }
                        else {
                            if (currentAnnotation.IsPathData || (data.split('command').length <= 1)) {
                                data = data;
                            }
                            else {
                                data = getPathString(JSON.parse(data));
                            }
                        }
                    }
                    this.outputString = data;
                    // eslint-disable-next-line
                    var calculateInkPosition = this.calculateInkSize();
                    this.outputString = '';
                    var rectDiff = 0;
                    var rectDifference = 1;
                    // eslint-disable-next-line
                    var bounds = currentAnnotation.Bounds;
                    if (calculateInkPosition) {
                        if (calculateInkPosition.height < 1) {
                            rectDiff = bounds.Height ? bounds.Height : bounds.height;
                            rectDifference = bounds.Height ? bounds.Height : bounds.height;
                        }
                        else if (calculateInkPosition.width < 1) {
                            rectDiff = bounds.Width ? bounds.Width : bounds.width;
                            rectDifference = bounds.Width ? bounds.Width : bounds.width;
                        }
                    }
                    var currentLeft = !isNullOrUndefined(bounds.X) ? bounds.X + (rectDiff / 2) : bounds.x + (rectDiff / 2);
                    var currentTop = !isNullOrUndefined(bounds.Y) ? bounds.Y + (rectDiff / 2) : bounds.y + (rectDiff / 2);
                    var currentWidth = bounds.Width ? bounds.Width - (rectDifference - 1) : bounds.width - (rectDifference - 1);
                    var currentHeight = bounds.Height ? bounds.Height - (rectDifference - 1) : bounds.height - (rectDifference - 1);
                    var isLock = currentAnnotation.AnnotationSettings ? currentAnnotation.AnnotationSettings.isLock : false;
                    // eslint-disable-next-line
                    var selectorSettings = currentAnnotation.AnnotationSelectorSettings ? currentAnnotation.AnnotationSelectorSettings : this.getSelector(currentAnnotation, 'Ink');
                    var customData = this.pdfViewer.annotation.getCustomData(currentAnnotation);
                    var isPrint = true;
                    if (currentAnnotation.AnnotationSettings) {
                        isPrint = currentAnnotation.AnnotationSettings.isPrint;
                    }
                    else {
                        isPrint = this.pdfViewer.inkAnnotationSettings.isPrint;
                    }
                    if (currentAnnotation.IsLocked) {
                        isLock = currentAnnotation.IsLocked;
                    }
                    if (currentAnnotation.Subject === 'Highlight' && currentAnnotation.Opacity === 1) {
                        currentAnnotation.Opacity = currentAnnotation.Opacity / 2;
                    }
                    // eslint-disable-next-line max-len
                    currentAnnotation.allowedInteractions = currentAnnotation.AllowedInteractions ? currentAnnotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(currentAnnotation);
                    annot = {
                        // eslint-disable-next-line max-len
                        id: 'ink' + this.pdfViewerBase.inkCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data,
                        shapeAnnotationType: 'Ink', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, annotName: currentAnnotation.AnnotName,
                        // eslint-disable-next-line max-len
                        comments: this.pdfViewer.annotationModule.getAnnotationComments(currentAnnotation.Comments, currentAnnotation, currentAnnotation.Author), author: currentAnnotation.Author, allowedInteractions: currentAnnotation.allowedInteractions, subject: currentAnnotation.Subject, modifiedDate: currentAnnotation.ModifiedDate,
                        // eslint-disable-next-line max-len
                        review: { state: '', stateModel: '', modifiedDate: currentAnnotation.ModifiedDate, author: currentAnnotation.Author }, notes: currentAnnotation.Note, annotationSettings: { isLock: isLock },
                        annotationSelectorSettings: selectorSettings, customData: customData, isPrint: isPrint, isCommentLock: currentAnnotation.IsCommentLock
                    };
                    this.pdfViewer.add(annot);
                    // eslint-disable-next-line
                    var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + currentAnnotation.pageIndex);
                    // eslint-disable-next-line
                    this.pdfViewer.renderDrawing(canvass, annot.pageIndex);
                    this.pdfViewer.annotationModule.storeAnnotations(annot.pageIndex, annot, '_annotations_ink');
                    if (this.isAddAnnotationProgramatically) {
                        var settings = {
                            opacity: annot.opacity, strokeColor: annot.strokeColor, thickness: annot.thickness, modifiedDate: annot.modifiedDate,
                            width: annot.bounds.width, height: annot.bounds.height, data: this.outputString
                        };
                        this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'Ink', bounds, settings);
                    }
                    this.pdfViewerBase.currentSignatureAnnot = null;
                    this.pdfViewerBase.signatureCount++;
                    this.pdfViewerBase.inkCount++;
                    // eslint-disable-next-line max-len
                    if (this.pdfViewerBase.navigationPane && this.pdfViewerBase.navigationPane.annotationMenuObj && this.pdfViewer.isSignatureEditable) {
                        // eslint-disable-next-line max-len
                        this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], true);
                        // eslint-disable-next-line max-len
                        this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], true);
                    }
                }
            }
        }
    };
    /**
     * @param pageNumber
     * @param annotations
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.storeInkSignatureData = function (pageNumber, annotations) {
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(annotations.pageIndex, null, annotations, 'Addition', '', annotations, annotations);
        // eslint-disable-next-line
        var annotation = null;
        var left = annotations.bounds.left ? annotations.bounds.left : annotations.bounds.x;
        var top = annotations.bounds.top ? annotations.bounds.top : annotations.bounds.y;
        if (annotations.wrapper && annotations.wrapper.bounds) {
            left = annotations.wrapper.bounds.left;
            top = annotations.wrapper.bounds.top;
        }
        annotation = {
            // eslint-disable-next-line max-len
            id: annotations.id, bounds: { x: left, y: top, width: annotations.bounds.width, height: annotations.bounds.height },
            // eslint-disable-next-line max-len
            shapeAnnotationType: 'Ink', opacity: annotations.opacity, thickness: annotations.thickness, strokeColor: annotations.strokeColor, pageIndex: annotations.pageIndex, data: annotations.data,
            annotName: annotations.annotName,
            // eslint-disable-next-line max-len
            comments: annotations.comments, author: annotations.author, subject: annotations.subject, modifiedDate: annotations.modifiedDate,
            // eslint-disable-next-line max-len
            review: { state: '', stateModel: '', modifiedDate: annotations.modifiedDate, author: annotations.author }, notes: annotations.notes,
            annotationSelectorSettings: this.getSelector(annotations, 'Ink'), isCommentLock: annotations.isCommentLock
        };
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        var index = 0;
        if (!storeObject) {
            var shapeAnnotation = { pageIndex: pageNumber, annotations: [] };
            shapeAnnotation.annotations.push(annotation);
            index = shapeAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(shapeAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_ink', annotationStringified);
        }
        else {
            var annotObject = JSON.parse(storeObject);
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_ink');
            var pageIndex = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[pageIndex]) {
                annotObject[pageIndex].annotations.push(annotation);
                index = annotObject[pageIndex].annotations.indexOf(annotation);
            }
            else {
                var markupAnnotation = { pageIndex: pageNumber, annotations: [] };
                markupAnnotation.annotations.push(annotation);
                index = markupAnnotation.annotations.indexOf(annotation);
                annotObject.push(markupAnnotation);
            }
            var annotationStringified = JSON.stringify(annotObject);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_ink', annotationStringified);
        }
    };
    InkAnnotation.prototype.getSelector = function (type, subject) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (type === 'Ink' && this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings;
        }
        return selector;
    };
    // eslint-disable-next-line
    InkAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        // eslint-disable-next-line
        var annotationCollection;
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = shapeAnnotations;
            }
        }
        else {
            annotationCollection = shapeAnnotations;
        }
        return annotationCollection;
    };
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.modifySignatureInkCollection = function (property, pageNumber, annotationBase) {
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        // eslint-disable-next-line
        var currentAnnotObject = null;
        // eslint-disable-next-line
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[i].id) {
                    if (property === 'bounds') {
                        // eslint-disable-next-line max-len
                        pageAnnotations[i].bounds = { x: annotationBase.wrapper.bounds.left, y: annotationBase.wrapper.bounds.top, width: annotationBase.bounds.width, height: annotationBase.bounds.height };
                    }
                    else if (property === 'stroke') {
                        pageAnnotations[i].strokeColor = annotationBase.wrapper.children[0].style.strokeColor;
                    }
                    else if (property === 'opacity') {
                        pageAnnotations[i].opacity = annotationBase.wrapper.children[0].style.opacity;
                    }
                    else if (property === 'thickness') {
                        pageAnnotations[i].thickness = annotationBase.wrapper.children[0].style.strokeWidth;
                    }
                    else if (property === 'notes') {
                        pageAnnotations[i].notes = annotationBase.notes;
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    pageAnnotations[i].modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], pageNumber);
                }
            }
            this.manageInkAnnotations(pageAnnotations, pageNumber);
        }
        return currentAnnotObject;
    };
    // eslint-disable-next-line
    InkAnnotation.prototype.manageInkAnnotations = function (pageAnnotations, pageNumber) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_ink');
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_ink', annotationStringified);
        }
    };
    /**
     * @param currentAnnotation
     * @param pageIndex
     * @param isImport
     * @param currentAnnotation
     * @param pageIndex
     * @param isImport
     * @private
     */
    // eslint-disable-next-line
    InkAnnotation.prototype.updateInkCollections = function (currentAnnotation, pageIndex, isImport) {
        // eslint-disable-next-line
        var annot;
        // eslint-disable-next-line
        if (currentAnnotation) {
            // eslint-disable-next-line
            var bounds = currentAnnotation.Bounds;
            var currentLeft = (bounds.X);
            var currentTop = (bounds.Y);
            var currentWidth = (bounds.Width);
            var currentHeight = (bounds.Height);
            var customData = currentAnnotation.customData;
            var isPrint = currentAnnotation.isPrint;
            // eslint-disable-next-line
            var allowedInteractions = currentAnnotation.AllowedInteractions ? currentAnnotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(currentAnnotation);
            // eslint-disable-next-line
            var annotationSettings = currentAnnotation.AnnotationSettings ? currentAnnotation.AnnotationSettings : this.pdfViewer.inkAnnotationSettings ? this.pdfViewer.inkAnnotationSettings : this.pdfViewer.annotationSettings;
            if (currentAnnotation.IsLocked) {
                annotationSettings.isLock = currentAnnotation.IsLocked;
            }
            // eslint-disable-next-line
            var data = currentAnnotation.PathData;
            if (isImport) {
                data = getPathString(JSON.parse(currentAnnotation.PathData));
            }
            annot = {
                // eslint-disable-next-line max-len
                id: 'ink' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data,
                // eslint-disable-next-line max-len
                shapeAnnotationType: 'Ink', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, annotationId: currentAnnotation.AnnotName,
                // eslint-disable-next-line max-len
                customData: customData, comments: this.pdfViewer.annotationModule.getAnnotationComments(currentAnnotation.Comments, currentAnnotation, currentAnnotation.Author), author: currentAnnotation.Author, allowedInteractions: allowedInteractions, subject: currentAnnotation.Subject, modifiedDate: currentAnnotation.ModifiedDate,
                review: { state: '', stateModel: '', modifiedDate: currentAnnotation.ModifiedDate, author: currentAnnotation.Author }, notes: currentAnnotation.Note, isPrint: isPrint, isCommentLock: currentAnnotation.IsCommentLock, annotationSettings: annotationSettings, isLocked: annotationSettings.isLock
            };
            return annot;
        }
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationObject - It describes type of annotation object
     * @param offset - It describes about the annotation bounds or location
     * @param pageNumber - It describes about the annotation page number
     * @returns Object
     * @private
     */
    InkAnnotation.prototype.updateAddAnnotationDetails = function (annotationObject, offset, pageNumber) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 10, y: 10 }, pageNumber: 0, width: undefined, height: undefined };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset)
            offset = { x: 10, y: 10 };
        else
            offset = annotationObject.offset;
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        //Creating annotation settings
        var annotationSelectorSettings = this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings ? this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
        var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.inkAnnotationSettings);
        var allowedInteractions = this.pdfViewer.inkAnnotationSettings.allowedInteractions ? this.pdfViewer.inkAnnotationSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : false;
        annotationObject.width = annotationObject.width ? annotationObject.width : 150;
        annotationObject.height = annotationObject.height ? annotationObject.height : 60;
        var pathData = annotationObject.path ? annotationObject.path : '';
        if (!isNullOrUndefined(pathData)) {
            // Check whether the given path of the ink annotation is starts with Move path or Line path. 
            if (pathData[0] === 'M' || pathData[0] === 'L') {
                var collectionData = processPathData(pathData);
                var csData = splitArrayCollection(collectionData);
                pathData = JSON.stringify(csData);
            }
            else {
                pathData = getPathString(JSON.parse(pathData));
            }
        }
        annotationObject.path = pathData;
        //Creating Annotation objects with it's proper properties
        var signatureInkAnnotation = [];
        var ink = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'ink',
            AnnotationFlags: null,
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ? annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            AnnotationType: 'Ink',
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Bounds: { X: offset.x, Y: offset.y, Width: annotationObject.width, Height: annotationObject.height, Left: offset.x, Top: offset.y, Location: { X: offset.x, Y: offset.y }, Size: { Height: annotationObject.height, IsEmpty: false, Width: annotationObject.width } },
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            IsCommentLock: false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: annotationObject.isPrint ? annotationObject.isPrint : true,
            ModifiedDate: currentDateString,
            Note: '',
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            PathData: annotationObject.path,
            PageNumber: pageNumber,
            State: '',
            StateModel: '',
            StrokeColor: annotationObject.strokeColor ? annotationObject.strokeColor : 'rgba(255,0,0,1)',
            SubType: null,
            Subject: 'Ink',
            Type: null,
            Thickness: annotationObject.thickness ? annotationObject.thickness : 1
        };
        //Adding the annotation object to an array and return it
        signatureInkAnnotation[0] = ink;
        return { signatureInkAnnotation: signatureInkAnnotation };
    };
    return InkAnnotation;
}());
export { InkAnnotation };
