/* eslint-disable */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dictionary } from '../../base/dictionary';
import { CharacterRangeType } from '../../base/types';
import { HelperMethods, Point, WrapPosition } from '../editor/editor-helper';
import { WBorder, WCharacterFormat, WParagraphFormat } from '../format/index';
import { WListLevel } from '../list/list-level';
import { BlockContainer, BlockWidget, BodyWidget, BookmarkElementBox, EditRangeEndElementBox, EditRangeStartElementBox, ElementBox, FieldElementBox, FieldTextElementBox, HeaderFooterWidget, ImageElementBox, LineWidget, ListTextElementBox, Margin, ParagraphWidget, Rect, TabElementBox, TableCellWidget, TableRowWidget, TableWidget, TextElementBox, Widget, CheckBoxFormField, DropDownFormField, ShapeElementBox, TextFrame, ContentControl, FootnoteElementBox, FootNoteWidget, ShapeBase, CommentCharacterElementBox } from './page';
import { PageLayoutViewer, WebLayoutViewer } from './viewer';
// Check box character is rendered smaller when compared to MS Word
// So, mutiplied the font side by below factor to render check box character large.
var CHECK_BOX_FACTOR = 1.4;
/**
 * @private
 */
var Layout = /** @class */ (function () {
    function Layout(documentHelper) {
        /**
         * @private
         */
        this.islayoutFootnote = false;
        /**
         * @private
         */
        this.allowLayout = true;
        /**
         * @private
         */
        this.footHeight = 0;
        /**
         * @private
         */
        this.isfootMove = false;
        /**
         * @private
         */
        this.footnoteHeight = 0;
        /**
         * @private
         */
        this.existFootnoteHeight = 0;
        /**
         * @private
         */
        this.isTableFootNote = false;
        /**
         * @private
         */
        this.isRelayout = false;
        /**
         * @private
         */
        this.isRelayoutneed = false;
        /**
         * @private
         */
        this.isOverlapFloatTable = false;
        this.isInitialLoad = true;
        this.fieldBegin = undefined;
        this.maxTextHeight = 0;
        this.maxBaseline = 0;
        this.maxTextBaseline = 0;
        this.isFieldCode = false;
        this.isRtlFieldCode = false;
        this.isRTLLayout = false;
        this.currentCell = undefined;
        this.isFootnoteContentChanged = false;
        this.isEndnoteContentChanged = false;
        this.keepWithNext = false;
        this.is2013Justification = false;
        this.nextElementToLayout = undefined;
        this.isLayoutWhole = false;
        /**
         * @private
         */
        this.isBidiReLayout = false;
        /**
         * @private
         */
        this.defaultTabWidthPixel = 48;
        /**
         * @private
         */
        this.isRelayoutFootnote = false;
        this.isRelayoutOverlap = false;
        this.isWrapText = false;
        this.isYPositionUpdated = false;
        this.isXPositionUpdated = false;
        this.hasFloatingElement = false;
        this.isFootNoteLayoutStart = false;
        this.wrapPosition = [];
        this.shiftedFloatingItemsFromTable = [];
        this.isDocumentContainsRtl = false;
        this.layoutedFootnoteElement = [];
        this.documentHelper = documentHelper;
    }
    Layout.prototype.isSameStyle = function (currentParagraph, isAfterSpacing) {
        var nextOrPrevSibling = undefined;
        if (isAfterSpacing) {
            if (currentParagraph.nextWidget instanceof ParagraphWidget) {
                nextOrPrevSibling = currentParagraph.nextWidget;
            }
        }
        else {
            if (currentParagraph.previousWidget instanceof ParagraphWidget) {
                nextOrPrevSibling = currentParagraph.previousWidget;
            }
        }
        if (isNullOrUndefined(nextOrPrevSibling)) {
            return false;
        }
        if (currentParagraph.paragraphFormat.baseStyle === nextOrPrevSibling.paragraphFormat.baseStyle) {
            if (currentParagraph.paragraphFormat.listFormat.listId >= 0 && nextOrPrevSibling.paragraphFormat.listFormat.listId >= 0) {
                if (!currentParagraph.paragraphFormat.contextualSpacing) {
                    if (isAfterSpacing && currentParagraph.paragraphFormat.spaceAfterAuto) {
                        return true;
                    }
                    else if (!isAfterSpacing && currentParagraph.paragraphFormat.spaceBeforeAuto) {
                        return true;
                    }
                }
            }
            return currentParagraph.paragraphFormat.contextualSpacing;
        }
        return false;
    };
    Object.defineProperty(Layout.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    Layout.prototype.layout = function () {
        // Todo: Need to handle complete document layout(relayout).
        //const page: Page = this.documentHelper.pages[0];
        //const body: BodyWidget = page.bodyWidgets[0];
    };
    /**
     * Releases un-managed and - optionally - managed resources.
     *
     * @returns {void}
     */
    Layout.prototype.destroy = function () {
        this.documentHelper = undefined;
        this.value = undefined;
        this.allowLayout = undefined;
        this.isInitialLoad = undefined;
        this.fieldBegin = undefined;
        this.maxTextHeight = undefined;
        this.maxBaseline = undefined;
        this.maxTextBaseline = undefined;
        this.isFieldCode = undefined;
        this.footnoteHeight = undefined;
    };
    Layout.prototype.layoutItems = function (sections, isReLayout) {
        var _this = this;
        var page;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var lastpage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
            /* eslint-disable-next-line max-len */
            if (i > 0 && sections[i - 1].lastChild.isEndsWithPageBreak && lastpage.bodyWidgets[0].childWidgets.length === 0) {
                this.documentHelper.pages.splice(this.documentHelper.pages.length - 1, 1);
            }
            page = this.viewer.createNewPage(section);
            this.addBodyWidget(this.viewer.clientActiveArea, section);
            if (this.documentHelper.pages.length > 1) {
                var pageIndex = 0;
                for (var i_1 = 0; i_1 < this.documentHelper.pages.length; i_1++) {
                    var prevPage = this.documentHelper.pages[i_1];
                    var prevSectionIndex = prevPage.sectionIndex;
                    var index = section.index;
                    if (prevSectionIndex > index || prevPage === page) {
                        break;
                    }
                    pageIndex++;
                }
                if (pageIndex < this.documentHelper.pages.length - 1) {
                    this.documentHelper.insertPage(pageIndex, page);
                }
            }
            this.layoutSection(section, 0);
        }
        if (!isReLayout) {
            this.layoutComments(this.documentHelper.comments);
        }
        this.updateFieldElements();
        if (this.documentHelper.owner.layoutType === 'Pages') {
            this.layoutEndNoteElement();
        }
        /* tslint:disable:align */
        setTimeout(function () {
            if (_this.documentHelper) {
                _this.documentHelper.isScrollHandler = true;
                if (_this.documentHelper.owner.isSpellCheck && _this.documentHelper.owner.spellChecker.enableOptimizedSpellCheck) {
                    _this.documentHelper.triggerElementsOnLoading = true;
                }
                _this.documentHelper.clearContent();
                _this.viewer.updateScrollBars();
                _this.documentHelper.isScrollHandler = false;
                _this.isInitialLoad = false;
            }
        }, 50);
    };
    /**
     * @private
     */
    Layout.prototype.layoutComments = function (comments) {
        if (!isNullOrUndefined(comments)) {
            this.viewer.owner.commentReviewPane.layoutComments();
        }
    };
    Layout.prototype.layoutSection = function (section, index) {
        var block = section.firstChild;
        var nextBlock;
        do {
            if (block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                && !block.tableFormat.allowAutoFit) {
                block.calculateGrid();
            }
            this.viewer.updateClientAreaForBlock(block, true);
            nextBlock = this.layoutBlock(block, index);
            index = 0;
            this.viewer.updateClientAreaForBlock(block, false);
            block = nextBlock;
        } while (block);
        block = section.firstChild;
        var page;
        if (block && block.bodyWidget && block.bodyWidget.page) {
            page = block.bodyWidget.page;
        }
        while (page) {
            if (page.footnoteWidget) {
                this.layoutfootNote(page.footnoteWidget);
                page = page.nextPage;
            }
            else {
                page = page.nextPage;
            }
        }
        page = undefined;
        block = undefined;
    };
    Layout.prototype.layoutHeaderFooter = function (section, viewer, page) {
        //Header layout
        var headerFooterWidget = viewer.getCurrentPageHeaderFooter(section, true);
        if (headerFooterWidget) {
            if (headerFooterWidget.page) {
                var parentHeader = headerFooterWidget;
                headerFooterWidget = parentHeader.clone();
                headerFooterWidget.parentHeaderFooter = parentHeader;
            }
            this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
            var header = headerFooterWidget;
            header.page = page;
            header.height = 0;
            this.updateRevisionsToHeaderFooter(header, page);
            viewer.updateHFClientArea(section.sectionFormat, true);
            page.headerWidget = this.layoutHeaderFooterItems(viewer, header);
            //this.updateHeaderFooterToParent(header);
        }
        //Footer Layout
        headerFooterWidget = viewer.getCurrentPageHeaderFooter(section, false);
        if (headerFooterWidget) {
            if (headerFooterWidget.page) {
                var parentHeader = headerFooterWidget;
                headerFooterWidget = parentHeader.clone();
                headerFooterWidget.parentHeaderFooter = parentHeader;
            }
            this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
            var footer = headerFooterWidget;
            footer.page = page;
            footer.height = 0;
            viewer.updateHFClientArea(section.sectionFormat, false);
            this.updateRevisionsToHeaderFooter(footer, page);
            page.footerWidget = this.layoutHeaderFooterItems(viewer, footer);
        }
    };
    Layout.prototype.updateHeaderFooterToParent = function (node) {
        var sectionIndex = node.page.sectionIndex;
        var typeIndex = this.viewer.getHeaderFooter(node.headerFooterType);
        var clone = node.clone();
        this.documentHelper.headersFooters[sectionIndex][typeIndex] = clone;
        for (var j = 0; j < clone.childWidgets.length; j++) {
            var child = clone.childWidgets[j];
            if (child instanceof TableWidget) {
                this.clearTableWidget(child, false, true);
            }
        }
        return clone;
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Layout.prototype.updateRevisionsToHeaderFooter = function (clone, page) {
        var childWidge = clone.childWidgets;
        if (clone instanceof HeaderFooterWidget && childWidge.length > 0) {
            for (var i = 0; i < childWidge.length; i++) {
                if (childWidge[i].childWidgets.length > 0) {
                    var lineWidge = childWidge[i].childWidgets;
                    for (var j = 0; j < lineWidge.length; j++) {
                        var childrens = lineWidge[j].children;
                        if (childrens) {
                            for (var k = 0; k < childrens.length; k++) {
                                if (childrens[k].removedIds.length > 0) {
                                    var removeId = childrens[k].removedIds;
                                    for (var l = 0; l < removeId.length; l++) {
                                        var revision = this.documentHelper.revisionsInternal.get(removeId[l]);
                                        childrens[k].revisions[l] = revision;
                                        this.updateRevisionRange(revision, page);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Layout.prototype.updateRevisionRange = function (revision, page) {
        for (var i = 0; i < revision.range.length; i++) {
            var inline = revision.range[i];
            if (!inline.line.paragraph.bodyWidget.page) {
                inline.line.paragraph.bodyWidget.page = page;
            }
        }
    };
    Layout.prototype.linkFieldInHeaderFooter = function (widget) {
        var firstChild = widget.firstChild;
        do {
            if (firstChild instanceof ParagraphWidget) {
                this.linkFieldInParagraph(firstChild);
            }
            else {
                this.linkFieldInTable(firstChild);
            }
            /* eslint-disable no-cond-assign */
        } while (firstChild = firstChild.nextWidget);
    };
    Layout.prototype.linkFieldInParagraph = function (widget) {
        for (var j = 0; j < widget.childWidgets.length; j++) {
            var line = widget.childWidgets[j];
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof FieldElementBox && (element.fieldType !== 0 || (element.fieldType === 0 &&
                    this.documentHelper.fields.indexOf(element) === -1))) {
                    element.linkFieldCharacter(this.documentHelper);
                }
                if (element instanceof FieldTextElementBox &&
                    element.fieldBegin !== element.previousElement.fieldBegin) {
                    element.fieldBegin = element.previousElement.fieldBegin;
                }
                if (element instanceof ShapeElementBox) {
                    var firstBlock = element.textFrame.firstChild;
                    do {
                        if (firstBlock instanceof ParagraphWidget) {
                            this.linkFieldInParagraph(firstBlock);
                        }
                        else {
                            this.linkFieldInTable(firstBlock);
                        }
                        /* eslint-disable no-cond-assign */
                    } while (firstBlock = firstBlock.nextWidget);
                }
                else if (element instanceof CommentCharacterElementBox) {
                    var comment = this.getCommentById(element.commentId);
                    if (!isNullOrUndefined(comment)) {
                        if (element.commentType === 0) {
                            comment.commentStart = element;
                        }
                        else {
                            comment.commentEnd = element;
                        }
                        element.comment = comment;
                    }
                }
            }
        }
    };
    Layout.prototype.getCommentById = function (commentId) {
        for (var i = 0; i < this.documentHelper.comments.length; i++) {
            var comment = this.documentHelper.comments[i];
            if (comment.commentId === commentId) {
                return comment;
            }
        }
        return undefined;
    };
    Layout.prototype.linkFieldInTable = function (widget) {
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var row = widget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                for (var k = 0; k < cell.childWidgets.length; k++) {
                    var block = cell.childWidgets[k];
                    if (block instanceof ParagraphWidget) {
                        this.linkFieldInParagraph(block);
                    }
                    else {
                        this.linkFieldInTable(block);
                    }
                }
            }
        }
    };
    Layout.prototype.layoutHeaderFooterItems = function (viewer, widget) {
        this.viewer.updateClientAreaLocation(widget, viewer.clientActiveArea);
        if (widget.childWidgets.length === 0) {
            var pargaraph = new ParagraphWidget();
            var line = new LineWidget(pargaraph);
            pargaraph.childWidgets.push(line);
            widget.childWidgets.push(pargaraph);
            pargaraph.containerWidget = widget;
        }
        this.linkFieldInHeaderFooter(widget);
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var block = widget.childWidgets[i];
            if (block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                && !block.tableFormat.allowAutoFit && !block.isGridUpdated) {
                block.calculateGrid();
            }
            viewer.updateClientAreaForBlock(block, true);
            this.layoutBlock(block, 0);
            viewer.updateClientAreaForBlock(block, false);
        }
        var type = widget.headerFooterType;
        if (type === 'OddFooter' || type === 'EvenFooter' || type === 'FirstPageFooter') {
            this.shiftChildLocation(viewer.clientArea.y - viewer.clientActiveArea.y, widget);
        }
        return widget;
    };
    Layout.prototype.shiftChildLocation = function (shiftTop, bodyWidget) {
        var widgetTop = bodyWidget.y + shiftTop;
        var footerMaxHeight = bodyWidget.page.boundingRectangle.height - (bodyWidget.page.boundingRectangle.height / 100) * 40;
        widgetTop = Math.max(widgetTop, footerMaxHeight);
        shiftTop = widgetTop - bodyWidget.y;
        var childTop = bodyWidget.y = widgetTop;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            var childWidget = bodyWidget.childWidgets[i];
            if (childWidget instanceof ParagraphWidget) {
                childWidget.x = childWidget.x;
                childWidget.y = i === 0 ? childWidget.y + shiftTop : childTop;
                childTop += childWidget.height;
                for (var j = 0; j < childWidget.childWidgets.length; j++) {
                    var widget = childWidget.childWidgets[j];
                    for (var k = 0; k < widget.children.length; k++) {
                        var element = widget.children[k];
                        if (element instanceof ShapeBase && element.textWrappingStyle !== "Inline") {
                            element.y = childWidget.y + element.verticalPosition;
                        }
                    }
                }
            }
            else {
                this.shiftChildLocationForTableWidget(childWidget, shiftTop);
                childTop += childWidget.height;
            }
        }
    };
    Layout.prototype.shiftChildLocationForTableWidget = function (tableWidget, shiftTop) {
        tableWidget.y = tableWidget.y + shiftTop;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var childWidget = tableWidget.childWidgets[i];
            if (childWidget instanceof TableRowWidget) {
                this.shiftChildLocationForTableRowWidget(childWidget, shiftTop);
            }
        }
    };
    Layout.prototype.shiftChildLocationForTableRowWidget = function (rowWidget, shiftTop) {
        rowWidget.y = rowWidget.y + shiftTop;
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            this.shiftChildLocationForTableCellWidget(rowWidget.childWidgets[i], shiftTop);
        }
    };
    Layout.prototype.shiftChildLocationForTableCellWidget = function (cellWidget, shiftTop) {
        cellWidget.y = cellWidget.y + shiftTop;
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                cellWidget.childWidgets[i].x = cellWidget.childWidgets[i].x;
                cellWidget.childWidgets[i].y = cellWidget.childWidgets[i].y + shiftTop;
            }
            else {
                this.shiftChildLocationForTableWidget(cellWidget.childWidgets[i], shiftTop);
            }
        }
    };
    Layout.prototype.layoutBlock = function (block, index) {
        var nextBlock;
        if (block instanceof ParagraphWidget) {
            block.splitLtrAndRtlText(0);
            block.combineconsecutiveRTL(0);
            nextBlock = this.layoutParagraph(block, index);
            var nextBlockToLayout = this.checkAndRelayoutPreviousOverlappingBlock(block);
            if (nextBlockToLayout) {
                nextBlock = nextBlockToLayout;
            }
        }
        else {
            nextBlock = this.layoutTable(block, index);
            this.checkAndRelayoutPreviousOverlappingBlock(block);
            this.updateTableYPositionBasedonTextWrap(nextBlock);
        }
        return nextBlock.nextRenderedWidget;
    };
    Layout.prototype.updateTableYPositionBasedonTextWrap = function (table) {
        var _this = this;
        if (!isNullOrUndefined(table.bodyWidget)) {
            var tableY_1 = table.y;
            var tableRect_1 = new Rect(table.x, table.y, table.width, table.height);
            table.bodyWidget.floatingElements.forEach(function (shape) {
                if (shape instanceof ShapeElementBox && !shape.paragraph.isInsideTable) {
                    var shapeRect = new Rect(shape.x, shape.y, shape.width, shape.height);
                    var considerShape = (shape.textWrappingStyle === 'TopAndBottom' || shape.textWrappingStyle === 'Square');
                    if (considerShape && tableRect_1.isIntersecting(shapeRect)) {
                        table.y = shape.y + shape.height + shape.distanceBottom;
                        _this.updateChildLocationForTable(table.y, table);
                        var height = table.y - tableY_1;
                        _this.viewer.cutFromTop(_this.viewer.clientActiveArea.y + height);
                    }
                }
            });
        }
    };
    Layout.prototype.checkAndRelayoutPreviousOverlappingBlock = function (block) {
        if (!(block.containerWidget instanceof TextFrame) && !this.isRelayoutOverlap) {
            var preivousBlock = block.previousWidget;
            if (block instanceof ParagraphWidget) {
                if (block.floatingElements.length > 0) {
                    for (var i = 0; i < block.floatingElements.length; i++) {
                        var element = block.floatingElements[i];
                        if (element.textWrappingStyle === 'InFrontOfText' || element.textWrappingStyle === 'Behind') {
                            continue;
                        }
                        var shapeRect = new Rect(element.x, element.y, element.width, element.height);
                        while (preivousBlock) {
                            if (preivousBlock instanceof ParagraphWidget) {
                                /* eslint-disable-next-line max-len */
                                var paraRect = new Rect(preivousBlock.x, preivousBlock.y, preivousBlock.width, preivousBlock.height);
                                if (shapeRect.isIntersecting(paraRect) &&
                                    this.startOverlapWidget !== preivousBlock) {
                                    this.startOverlapWidget = preivousBlock;
                                    this.endOverlapWidget = block;
                                }
                            }
                            preivousBlock = preivousBlock.previousWidget;
                        }
                        preivousBlock = block.previousWidget;
                    }
                }
                else {
                    var widget = block.getSplitWidgets();
                    if (widget) {
                        return widget[widget.length - 1];
                    }
                }
            }
            else {
                var table = block;
                if (!table.wrapTextAround) {
                    return table;
                }
                var tableRect = new Rect(table.x, table.y, table.getTableCellWidth(), table.height);
                while (preivousBlock) {
                    if (preivousBlock instanceof ParagraphWidget) {
                        var blockRect = new Rect(preivousBlock.x, preivousBlock.y, preivousBlock.width, preivousBlock.height);
                        if (tableRect.isIntersecting(blockRect) &&
                            this.startOverlapWidget !== preivousBlock) {
                            this.startOverlapWidget = preivousBlock;
                            this.endOverlapWidget = block;
                        }
                    }
                    preivousBlock = preivousBlock.previousWidget;
                }
                preivousBlock = block.previousWidget;
            }
            if (this.startOverlapWidget) {
                this.isRelayoutOverlap = true;
                this.layoutStartEndBlocks(this.startOverlapWidget, block);
                this.isRelayoutOverlap = false;
            }
            this.startOverlapWidget = undefined;
            this.endOverlapWidget = undefined;
        }
        return block;
    };
    Layout.prototype.addParagraphWidget = function (area, paragraphWidget) {
        // const ownerParaWidget: ParagraphWidget = undefined;
        if (paragraphWidget.isEmpty() && !isNullOrUndefined(paragraphWidget.paragraphFormat) &&
            (paragraphWidget.paragraphFormat.textAlignment === 'Center' || paragraphWidget.paragraphFormat.textAlignment === 'Right') &&
            paragraphWidget.paragraphFormat.listFormat.listId === -1) {
            // const top: number = 0;
            // const bottom: number = 0;
            var width = this.documentHelper.textHelper.getParagraphMarkWidth(paragraphWidget.characterFormat);
            var left = area.x;
            if (paragraphWidget.paragraphFormat.textAlignment === 'Center') {
                left += (area.width - width) / 2;
            }
            else {
                left += area.width - width;
            }
            paragraphWidget.width = width;
            paragraphWidget.x = left;
            paragraphWidget.y = area.y;
        }
        else {
            if (this.viewer.clientActiveArea.width <= 0 && this.viewer instanceof WebLayoutViewer) {
                paragraphWidget.x = this.previousPara;
            }
            else {
                paragraphWidget.x = area.x;
                this.previousPara = paragraphWidget.x;
            }
            paragraphWidget.width = area.width;
            paragraphWidget.y = area.y;
        }
        return paragraphWidget;
    };
    Layout.prototype.addLineWidget = function (paragraphWidget) {
        var line = undefined;
        line = new LineWidget(paragraphWidget);
        line.width = paragraphWidget.width;
        paragraphWidget.childWidgets.push(line);
        line.paragraph = paragraphWidget;
        return line;
    };
    Layout.prototype.isFirstElementWithPageBreak = function (paragraphWidget) {
        var isPageBreak = false;
        if (this.viewer instanceof PageLayoutViewer) {
            var lineWidget = paragraphWidget.childWidgets[0];
            if (lineWidget) {
                var element = lineWidget.children[0];
                while (element) {
                    if (element instanceof BookmarkElementBox && element.name.indexOf('_') >= 0) {
                        element = element.nextElement;
                        continue;
                    }
                    if (element instanceof TextElementBox && element.text === '\f') {
                        isPageBreak = true;
                    }
                    break;
                }
            }
        }
        return isPageBreak;
    };
    /**
     * Layouts specified paragraph.
     *
     * @private
     * @param footnote
     */
    Layout.prototype.layoutfootNote = function (footnote) {
        if (this.documentHelper.owner.layoutType === 'Pages') {
            var clientActiveArea = this.viewer.clientActiveArea.clone();
            var clientArea = this.viewer.clientArea.clone();
            if (footnote.footNoteType === 'Footnote') {
                this.viewer.updateFootnoteClientArea(footnote.sectionFormat, footnote);
            }
            footnote.height = 0;
            var block = void 0;
            var height = 0;
            this.isRelayoutFootnote = false;
            var index = 0;
            //        this.isfoot = true;
            /* eslint-disable-next-line max-len */
            for (var i = 0; i < footnote.bodyWidgets.length; i++) {
                if (i === 0) {
                    var newPara = new ParagraphWidget();
                    newPara.characterFormat = new WCharacterFormat();
                    newPara.paragraphFormat = new WParagraphFormat();
                    newPara.index = 0;
                    var lineWidget = new LineWidget(newPara);
                    newPara.childWidgets.push(lineWidget);
                    // let body: BlockContainer= new BodyWidget();
                    // body.childWidgets.push(newParagraph);
                    // footnote.bodyWidgets.push(body);
                    height = this.documentHelper.textHelper.getParagraphMarkSize(newPara.characterFormat).Height;
                    footnote.height += height;
                    footnote.y = this.viewer.clientActiveArea.y;
                    this.viewer.cutFromTop(this.viewer.clientActiveArea.y + height);
                    footnote.margin = new Margin(0, height, 0, 0);
                }
                for (var j = 0; j < footnote.bodyWidgets[i].childWidgets.length; j++) {
                    block = footnote.bodyWidgets[i].childWidgets[j];
                    block.index = index;
                    index++;
                    block.containerWidget = footnote.bodyWidgets[i];
                    block.containerWidget.page = footnote.page;
                    block.containerWidget.containerWidget = footnote;
                    // paragraph.index = i > 1 ? i - 1 : 0;
                    this.viewer.updateClientAreaForBlock(block, true);
                    if (block instanceof TableWidget) {
                        this.clearTableWidget(block, true, true, true);
                        this.isRelayoutFootnote = true;
                        this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                        this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                    }
                    this.layoutBlock(block, 0);
                    if (footnote.footNoteType === 'Footnote') {
                        footnote.height += block.height;
                    }
                    this.viewer.updateClientAreaForBlock(block, false);
                }
            }
            if (footnote.footNoteType === 'Footnote') {
                this.shiftChildWidgetInFootnote(footnote);
            }
            this.viewer.clientActiveArea = clientActiveArea;
            this.viewer.clientArea = clientArea;
            /* eslint-disable-next-line max-len */
            if (!this.islayoutFootnote) {
                if (this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height > footnote.y) {
                    this.viewer.clientActiveArea.height -= footnote.height;
                    var sub = (this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height - footnote.y);
                    this.viewer.clientActiveArea.height -= sub;
                }
            }
        }
        this.footnoteHeight = 0;
        return footnote;
    };
    Layout.prototype.shiftChildWidgetInFootnote = function (footnote) {
        var page = footnote.page;
        var yPosition = footnote.y - footnote.height;
        if (page.bodyWidgets[0].childWidgets.length === 1 && page.bodyWidgets[0].firstChild) {
            var startY = page.bodyWidgets[0].firstChild.y;
            var bodyWidgetHeight = this.getBodyWidgetHeight(page.bodyWidgets[0]);
            if (yPosition < startY + bodyWidgetHeight) {
                yPosition = startY + bodyWidgetHeight;
            }
        }
        footnote.y = yPosition;
        yPosition += footnote.margin.top;
        for (var i = 0; i < footnote.bodyWidgets.length; i++) {
            for (var j = 0; j < footnote.bodyWidgets[i].childWidgets.length; j++) {
                var childWidget = footnote.bodyWidgets[i].childWidgets[j];
                if (childWidget instanceof ParagraphWidget) {
                    childWidget.y = yPosition;
                    yPosition += childWidget.height;
                }
                else {
                    this.shiftChildLocationForTableWidget(childWidget, yPosition - childWidget.y);
                    yPosition += childWidget.height;
                }
            }
        }
    };
    Layout.prototype.getBodyWidgetHeight = function (bodyWidget) {
        var height = 0;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            height += bodyWidget.childWidgets[i].height;
        }
        return height;
    };
    Layout.prototype.layoutParagraph = function (paragraph, lineIndex) {
        this.addParagraphWidget(this.viewer.clientActiveArea, paragraph);
        var isListLayout = true;
        var isFirstElmIsparagraph = this.isFirstElementWithPageBreak(paragraph);
        if (!isFirstElmIsparagraph) {
            this.layoutListItems(paragraph);
            isListLayout = false;
        }
        if (paragraph.isEmpty()) {
            this.layoutEmptyLineWidget(paragraph, true);
        }
        else {
            var line = lineIndex < paragraph.childWidgets.length ?
                paragraph.childWidgets[lineIndex] : undefined;
            if (!this.isRelayoutOverlap && !(paragraph.containerWidget instanceof TextFrame)) {
                this.layoutFloatElements(paragraph);
            }
            while (line instanceof LineWidget) {
                if (paragraph !== line.paragraph && line.indexInOwner === 0 && isListLayout) {
                    this.layoutListItems(line.paragraph);
                }
                if (line.isFirstLine() && isNullOrUndefined(this.fieldBegin)) {
                    if (!isNullOrUndefined(paragraph.paragraphFormat)) {
                        var firstLineIndent = -HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                        this.viewer.updateClientWidth(firstLineIndent);
                    }
                }
                line.marginTop = 0;
                // if (!this.isInitialLoad && !this.isBidiReLayout && this.isContainsRtl(line)) {
                //     this.reArrangeElementsForRtl(line, paragraph.paragraphFormat.bidi);
                // }
                line = this.layoutLine(line, 0);
                paragraph = line.paragraph;
                line = line.nextLine;
            }
        }
        this.updateWidgetToPage(this.viewer, paragraph);
        paragraph.isLayouted = true;
        return paragraph;
    };
    Layout.prototype.clearLineMeasures = function () {
        this.maxBaseline = 0;
        this.maxTextBaseline = 0;
        this.maxTextHeight = 0;
    };
    Layout.prototype.layoutFloatElements = function (paragraph) {
        var _this = this;
        paragraph.floatingElements.forEach(function (shape) {
            if (shape instanceof ShapeBase) {
                if (!_this.isRelayoutOverlap) {
                    _this.layoutShape(shape);
                }
            }
        });
    };
    Layout.prototype.layoutShape = function (element) {
        if (element.textWrappingStyle !== 'Inline') {
            var position = this.getFloatingItemPoints(element);
            element.x = position.x;
            element.y = position.y;
            if (element.paragraph.indexInOwner !== 0 && element.verticalPosition > 0 && element.paragraph.y > element.y && this.viewer.clientArea.bottom === element.y + element.height && (element.verticalOrigin == "Line" || element.verticalOrigin == "Paragraph") && element.textWrappingStyle !== "InFrontOfText" && element.textWrappingStyle !== "Behind") {
                this.moveToNextPage(this.viewer, element.line);
            }
            var bodyWidget = element.paragraph.bodyWidget;
            if (bodyWidget.floatingElements.indexOf(element) === -1) {
                bodyWidget.floatingElements.push(element);
                /* eslint:disable */
                bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
            }
            if (element.paragraph.floatingElements.indexOf(element) === -1) {
                element.paragraph.floatingElements.push(element);
            }
        }
        else {
            if (element.width === 0 && element.widthScale !== 0) {
                var containerWidth = HelperMethods.convertPointToPixel(element.line.paragraph.getContainerWidth());
                element.width = (containerWidth / 100) * element.widthScale;
            }
        }
        var clientArea = this.viewer.clientArea;
        var clientActiveArea = this.viewer.clientActiveArea;
        if (element instanceof ShapeElementBox) {
            var blocks = element.textFrame.childWidgets;
            this.viewer.updateClientAreaForTextBoxShape(element, true);
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                this.viewer.updateClientAreaForBlock(block, true);
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true);
                }
                this.layoutBlock(block, 0);
                this.viewer.updateClientAreaForBlock(block, false);
            }
        }
        this.viewer.clientActiveArea = clientActiveArea;
        this.viewer.clientArea = clientArea;
    };
    Layout.prototype.moveElementFromNextLine = function (line) {
        var nextLine = line.nextLine;
        while (nextLine instanceof LineWidget) {
            if (nextLine.children.length > 0) {
                var element = nextLine.children.splice(0, 1)[0];
                line.children.push(element);
                element.line = line;
                break;
            }
            else {
                if (nextLine.paragraph.childWidgets.length === 1) {
                    nextLine.paragraph.destroy();
                }
                else {
                    nextLine.paragraph.childWidgets.splice(nextLine.paragraph.childWidgets.indexOf(nextLine), 1);
                }
                nextLine = line.nextLine;
            }
        }
    };
    Layout.prototype.layoutLine = function (line, count) {
        var paragraph = line.paragraph;
        if (line.children.length === 0) {
            this.moveElementFromNextLine(line);
        }
        var element = line.children[count];
        var isNotEmptyField = true;
        if (element instanceof FieldElementBox && line.children[line.children.length - 1] instanceof FieldElementBox) {
            isNotEmptyField = false;
            for (var i = 0; i < line.children.length; i++) {
                if (line.children[i].fieldType == 2 && line.children[i].nextElement != undefined && !(line.children[i].nextElement instanceof FieldElementBox)) {
                    isNotEmptyField = true;
                    break;
                }
            }
        }
        this.clearLineMeasures();
        line.marginTop = 0;
        while (element instanceof ElementBox) {
            element.padding.left = 0;
            if (!isNotEmptyField) {
                this.layoutElement(element, paragraph, true);
                isNotEmptyField = true;
            }
            else {
                this.layoutElement(element, paragraph);
            }
            line = element.line;
            if (element instanceof TextElementBox) {
                var textElement = element;
                if (!isNullOrUndefined(textElement.errorCollection) && textElement.errorCollection.length > 0) {
                    textElement.ischangeDetected = true;
                }
            }
            if (!this.isRTLLayout) {
                if (this.hasFloatingElement) {
                    this.hasFloatingElement = false;
                    var lineIndex = paragraph.childWidgets.indexOf(element.line);
                    if (lineIndex > 0 && paragraph.bodyWidget.floatingElements.length > 0 && element instanceof TextElementBox && !(paragraph.containerWidget instanceof TableCellWidget)) {
                        element = paragraph.childWidgets[lineIndex].children[0];
                    }
                }
                else {
                    if (this.is2013Justification && !isNullOrUndefined(this.nextElementToLayout)) {
                        element = this.nextElementToLayout;
                    }
                    else {
                        element = element.nextElement;
                        if (element instanceof TextElementBox && element.text.indexOf(" ") == 0 && element.text.length > 2) {
                            if (isNullOrUndefined(element.nextElement) && element.text.trim().length > 0) {
                                element.text = element.text.substring(1, element.text.length);
                                var elementIndex = element.line.children.indexOf(element);
                                element.line.children.splice(elementIndex, 1);
                                var textElement = new TextElementBox();
                                textElement.text = " ";
                                textElement.line = element.line;
                                element.line.children.splice(elementIndex, 0, textElement);
                                element.line.children.splice(elementIndex + 1, 0, element);
                                element = textElement;
                            }
                        }
                    }
                    this.nextElementToLayout = undefined;
                }
            }
            else {
                element = undefined;
                this.isRTLLayout = false;
            }
        }
        return line;
    };
    /* eslint-disable  */
    Layout.prototype.layoutElement = function (element, paragraph, isEmptyField) {
        var line = element.line;
        var text = '';
        var index = element.indexInOwner;
        if (element instanceof FieldElementBox) {
            if (element.fieldType === 0) {
                if (this.documentHelper.fields.indexOf(element) === -1) {
                    this.documentHelper.fields.push(element);
                }
                if (!isNullOrUndefined(element.formFieldData) &&
                    this.documentHelper.formFields.indexOf(element) === -1) {
                    this.documentHelper.formFields.push(element);
                }
            }
            this.layoutFieldCharacters(element);
            if (element.line.isLastLine() && isNullOrUndefined(element.nextNode) && !this.isFieldCode) {
                if (element.fieldType !== 2 && isNullOrUndefined(element.fieldSeparator)) {
                    this.layoutEmptyLineWidget(paragraph, false, element.line);
                }
                this.moveToNextLine(line);
            }
            else if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                this.moveElementFromNextLine(line);
                if (element.line.isLastLine() && isNullOrUndefined(element.nextNode) && !this.isFieldCode) {
                    if (element.fieldType !== 2 && isNullOrUndefined(element.fieldSeparator)) {
                        this.layoutEmptyLineWidget(paragraph, false, element.line);
                    }
                    this.moveToNextLine(line);
                }
            }
            else if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width === 0) {
                this.moveToNextLine(line);
                if (line.paragraph.lastChild === line && !isNullOrUndefined(line.nextLine) &&
                    this.viewer.clientActiveArea.height >= 0) {
                    this.moveFromNextPage(line);
                }
            }
            else if (isEmptyField) {
                var textHelper = this.documentHelper.textHelper.getHeight(paragraph.characterFormat);
                element.height = textHelper.Height;
            }
            return;
        }
        if (element instanceof ListTextElementBox || this.isFieldCode || element instanceof BookmarkElementBox ||
            element instanceof EditRangeEndElementBox || element instanceof EditRangeStartElementBox
            || element instanceof ContentControl ||
            (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline')) {
            if (element instanceof BookmarkElementBox) {
                if (element.bookmarkType === 0 && !this.documentHelper.bookmarks.containsKey(element.name)) {
                    this.documentHelper.bookmarks.add(element.name, element);
                }
                else if (element.bookmarkType === 1 && this.documentHelper.bookmarks.containsKey(element.name)) {
                    var bookmrkElement = this.documentHelper.bookmarks.get(element.name);
                    if (isNullOrUndefined(bookmrkElement.reference) || isNullOrUndefined(bookmrkElement.reference.paragraph.bodyWidget)) {
                        bookmrkElement.reference = element;
                        element.reference = bookmrkElement;
                    }
                }
                else if (element.bookmarkType === 0 && this.documentHelper.bookmarks.containsKey(element.name)) {
                    if (isNullOrUndefined(element.reference)) {
                        this.documentHelper.bookmarks.remove(element.name);
                    }
                }
            }
            if (element instanceof ContentControl && this.documentHelper.contentControlCollection.indexOf(element) === -1) {
                if (element.type === 0) {
                    this.documentHelper.contentControlCollection.push(element);
                }
                else if (element.type === 1) {
                    var endPage = element.paragraph.bodyWidget.page;
                    for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
                        var cCStart = this.documentHelper.contentControlCollection[i];
                        var isInHeaderFooter = cCStart.line.paragraph.isInHeaderFooter;
                        // Link content control present in same header.
                        if (isInHeaderFooter && element.contentControlProperties === cCStart.contentControlProperties
                            && endPage === cCStart.line.paragraph.bodyWidget.page) {
                            element.reference = cCStart;
                            cCStart.reference = element;
                        }
                        else if (!isInHeaderFooter && element.contentControlProperties === cCStart.contentControlProperties) {
                            element.reference = cCStart;
                            cCStart.reference = element;
                        }
                    }
                }
            }
            if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                this.moveElementFromNextLine(line);
            }
            if (element.line.isLastLine() && isNullOrUndefined(element.nextElement)) {
                if (this.hasValidElement(line.paragraph) && !paragraph.isContainsShapeAlone()) {
                    this.moveToNextLine(line);
                }
                else if (!this.isInitialLoad && !this.hasValidElement(line.paragraph) && line.paragraph.paragraphFormat.bidi && line.paragraph.paragraphFormat.listFormat.listId !== -1) {
                    this.moveToNextLine(line);
                }
                else {
                    this.layoutEmptyLineWidget(line.paragraph, false, line, false);
                }
            }
            return;
        }
        var width = element.width;
        if (element instanceof FieldTextElementBox && !this.isTocField(element.fieldBegin)) {
            text = this.documentHelper.getFieldResult(element.fieldBegin, element.paragraph.bodyWidget.page);
            if (text !== '') {
                element.text = text;
            }
            else {
                text = element.text;
            }
        }
        else if (element instanceof FootnoteElementBox) {
            text = this.startAt(element, text);
            if (text !== '') {
                element.text = text;
            }
        }
        else if (element instanceof TextElementBox) {
            this.checkAndSplitTabOrLineBreakCharacter(element.text, element);
            //TODO: Need to update revision
            // if (element.text.length > 1 && element.line.paragraph.bidi) {
            //     let splittedText: string[] = this.splitTextByConsecutiveLtrAndRtl(element);
            //     this.updateSplittedText(element, splittedText);
            // }
            text = element.text;
        }
        // Here field code width and height update need to skipped based on the hidden property.
        if (element instanceof TextElementBox) {
            // if (this.isRelayout) {
            width = this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
            /*} else {
                width = element.trimEndWidth;
            }*/
            if (element.text === '\t') {
                width = this.getTabWidth(paragraph, this.viewer, index, line, element);
                element.width = width;
            }
        }
        if (!isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
            !(element instanceof ShapeElementBox) && !(paragraph.containerWidget instanceof TextFrame)) {
            this.adjustPosition(element, element.line.paragraph.bodyWidget);
        }
        if (this.viewer instanceof PageLayoutViewer &&
            ((element instanceof ShapeElementBox && element.textWrappingStyle === 'Inline') || !(element instanceof ShapeElementBox))
            && this.viewer.clientActiveArea.height < element.height && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
            if ((element instanceof TextElementBox && element.text !== '\f') || !(element instanceof TextElementBox)) {
                this.moveToNextPage(this.viewer, line);
            }
            if (element instanceof FieldTextElementBox) {
                this.updateFieldText(element);
            }
            if (element.previousElement &&
                ((element.previousElement instanceof ShapeElementBox && element.previousElement.textWrappingStyle === 'Inline') ||
                    !(element.previousElement instanceof ShapeElementBox))) {
                this.cutClientWidth(element.previousElement);
            }
        }
        if (element instanceof ShapeElementBox && element.textWrappingStyle === 'Inline') {
            this.layoutShape(element);
        }
        // tslint:disable-next-line:max-line-length
        if (element instanceof FootnoteElementBox && (!element.isLayout || this.isLayoutWhole) && this.documentHelper.owner.layoutType === 'Pages') {
            this.layoutFootEndNoteElement(element);
        }
        if (element instanceof FootnoteElementBox) {
            if (this.isfootMove) {
                this.moveToNextPage(this.viewer, element.line);
                if (element.previousElement &&
                    ((element.previousElement instanceof ShapeElementBox && element.previousElement.textWrappingStyle === 'Inline') ||
                        !(element.previousElement instanceof ShapeElementBox))) {
                    this.cutClientWidth(element.previousElement);
                }
                this.isfootMove = false;
            }
            if (paragraph.paragraphFormat.keepWithNext && paragraph.paragraphFormat.keepLinesTogether && !(!element.isLayout || this.isLayoutWhole)) {
                if (paragraph.bodyWidget.page.footnoteWidget.y !== 0 && paragraph.bodyWidget.page.footnoteWidget.y < this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height) {
                    var findDiff = this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height - paragraph.bodyWidget.page.footnoteWidget.y;
                    this.viewer.clientActiveArea.height -= findDiff;
                }
            }
        }
        if (parseFloat(width.toFixed(4)) <= parseFloat(this.viewer.clientActiveArea.width.toFixed(4)) || !this.viewer.textWrap) {
            //Fits the text in current line.
            this.addElementToLine(paragraph, element);
            if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                this.moveElementFromNextLine(line);
            }
            else if (!element.line.isLastLine() && isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width === 0) {
                this.moveToNextLine(line);
                if (line.paragraph.lastChild === line && this.viewer.clientActiveArea.height >= 0) {
                    this.moveFromNextPage(line);
                }
            }
        }
        else if (element instanceof TextElementBox) {
            if (element.text === '\t') {
                var currentLine = element.line;
                // Added the condition to check While the tab element width is greater then clientActiveArea width and while it was first element of line should not move to next line
                var isElementMoved = false;
                if (element.indexInOwner !== 0 && element instanceof TabElementBox) {
                    isElementMoved = true;
                    this.addSplittedLineWidget(currentLine, currentLine.children.indexOf(element) - 1);
                }
                else {
                    if (this.isWrapText && this.viewer.clientActiveArea.x + this.viewer.clientActiveArea.width === this.viewer.clientActiveArea.right) {
                        this.isWrapText = false;
                    }
                    this.addSplittedLineWidget(currentLine, currentLine.children.indexOf(element));
                }
                this.moveToNextLine(currentLine);
                if (currentLine.paragraph.bodyWidget.floatingElements.length > 0 && isElementMoved) {
                    this.nextElementToLayout = element;
                    this.hasFloatingElement = true;
                    return;
                }
                else {
                    // Recalculates tab width based on new client active area X position
                    element.width = this.getTabWidth(paragraph, this.viewer, index, element.line, element);
                    if (isElementMoved) {
                        this.addElementToLine(paragraph, element);
                        if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0
                            && !element.line.isLastLine()) {
                            this.moveElementFromNextLine(element.line);
                        }
                    }
                }
            }
            else {
                //Splits the text and arrange line by line, till end of text.
                do {
                    line = element.line;
                    //Added the condition to skip line split while layouting dropDownFormField 
                    if (!(element.previousElement instanceof FieldElementBox && element.previousElement.fieldType == 2
                        && !isNullOrUndefined(element.previousElement.fieldBeginInternal)
                        && element.previousElement.fieldBeginInternal.formFieldData instanceof DropDownFormField)) {
                        this.splitTextForClientArea(line, element, element.text, element.width, element.characterFormat);
                    }
                    this.checkLineWidgetWithClientArea(line, element);
                    if (element instanceof FieldTextElementBox) {
                        this.updateFieldText(element);
                    }
                    if (element.line !== line && !isNullOrUndefined(this.nextElementToLayout) && this.is2013Justification) {
                        return;
                    }
                } while (element.line !== line && this.cutClientWidth(element));
            }
        }
        else {
            do {
                line = element.line;
                this.splitElementForClientArea(paragraph, element);
                this.checkLineWidgetWithClientArea(line, element);
                if (element instanceof FieldTextElementBox) {
                    this.updateFieldText(element);
                }
            } while (element.line !== line && this.cutClientWidth(element));
        }
        var contentControl;
        if (!isNullOrUndefined(element.nextNode) && element.nextNode instanceof ContentControl) {
            contentControl = element.nextNode;
        }
        if ((text === '\v' || text === '\f') && !contentControl) {
            var elementIndex = line.children.indexOf(element);
            if (elementIndex > -1) {
                this.addSplittedLineWidget(line, elementIndex);
            }
        }
        if (element.line.isLastLine() && isNullOrUndefined(element.nextElement) || text === '\v' || text === '\f') {
            if (this.isXPositionUpdated) {
                this.isXPositionUpdated = false;
                return;
            }
            this.moveToNextLine(element.line);
            if (text === '\v' && isNullOrUndefined(element.nextNode)) {
                this.layoutEmptyLineWidget(paragraph, true, line, true);
            }
            else if (text === '\f' && this.viewer instanceof PageLayoutViewer) {
                if (isNullOrUndefined(element.nextNode) || element.nextNode instanceof ContentControl) {
                    this.moveToNextPage(this.viewer, element.line, true);
                }
                else if (!isNullOrUndefined(element.line.nextLine)) {
                    this.moveToNextPage(this.viewer, element.line.nextLine, false);
                }
            }
        }
        this.isXPositionUpdated = false;
    };
    /**
    * @private
    */
    Layout.prototype.adjustPosition = function (element, bodyWidget) {
        var clientArea = this.viewer.clientActiveArea;
        var previousLeft = this.viewer.clientActiveArea.x;
        var previousTop = this.viewer.clientActiveArea.y;
        var previousWidth = this.viewer.clientActiveArea.width;
        var adjustedRect = this.adjustClientAreaBasedOnTextWrap(element, new Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height));
        this.viewer.clientActiveArea.width = adjustedRect.width;
        //Updated element padding for wrapping.
        // if (this.isWrapText) {
        var wrapDiff = this.viewer.clientActiveArea.x - previousLeft;
        // if (element.indexInOwner === 0 && element.line.isFirstLine()) {
        //     wrapDiff -= HelperMethods.convertPointToPixel(element.line.paragraph.paragraphFormat.firstLineIndent);
        // }
        element.padding.left = wrapDiff;
        if (previousWidth !== this.viewer.clientActiveArea.width) {
            var wrapPos = new WrapPosition(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.width);
            this.updateWrapPosition(wrapPos);
        }
        //this.isWrapText = false;
        // }
        if (this.viewer.clientActiveArea.width === 0) {
            this.isWrapText = false;
        }
        if (this.isYPositionUpdated) {
            if (element.line.isFirstLine()) {
                element.line.paragraph.y = this.viewer.clientActiveArea.y;
            }
            else {
                element.line.marginTop += (this.viewer.clientActiveArea.y - previousTop);
            }
            if (element.line.paragraph.containerWidget instanceof HeaderFooterWidget) {
                element.line.paragraph.containerWidget.height += (this.viewer.clientActiveArea.y - previousTop);
            }
            this.isYPositionUpdated = false;
        }
    };
    Layout.prototype.updateWrapPosition = function (wrapPos) {
        for (var i = 0; i < this.wrapPosition.length; i++) {
            var previousWrapPos = this.wrapPosition[i];
            if (Math.abs(previousWrapPos.right - wrapPos.right) > 1) {
                continue;
            }
            else {
                return;
            }
        }
        this.wrapPosition.push(wrapPos);
    };
    Layout.prototype.isFirstitemInPage = function (element, yposition) {
        if (!element.line.paragraph.isInHeaderFooter && Math.round(yposition) === this.viewer.clientArea.y) {
            return true;
        }
        return false;
    };
    Layout.prototype.isTextFitBelow = function (rect, top, element) {
        //TODO: After shape implementation.
        return false;
    };
    Layout.prototype.isNeedToWrapForSquareTightAndThrough = function (bodyWidget, elementBox, wrapOwnerIndex, wrapItemIndex, textWrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingEntity, isTextRangeInTextBox, rect, width, height) {
        return (bodyWidget.floatingElements.length > 0
            && wrapOwnerIndex !== wrapCollectionIndex
            && wrapItemIndex !== wrapCollectionIndex
            && textWrappingStyle !== 'Inline'
            && textWrappingStyle !== 'Behind'
            && textWrappingStyle !== 'TopAndBottom'
            && textWrappingStyle !== 'InFrontOfText'
            && (Math.round((rect.y + height)) > Math.round(textWrappingBounds.y) ||
                this.isTextFitBelow(textWrappingBounds, rect.y + height, floatingEntity))
            && Math.round(rect.y) < Math.round((textWrappingBounds.y + textWrappingBounds.height))
            && !(allowOverlap && (isTextRangeInTextBox || ((elementBox instanceof ImageElementBox)
                && elementBox.textWrappingStyle !== 'Inline' && elementBox.allowOverlap))));
    };
    Layout.prototype.isNeedToWrapForSquareTightAndThroughForTable = function (container, table, wrapIndex, wrapItemIndex, wrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingElemnt, isInTextBox, rect, width, height) {
        return (container.floatingElements.length > 0 && wrapIndex !== wrapCollectionIndex
            && wrapItemIndex !== wrapCollectionIndex && wrappingStyle !== 'Inline'
            && wrappingStyle !== 'Behind' && wrappingStyle !== 'TopAndBottom'
            && wrappingStyle !== 'InFrontOfText'
            && ((Math.round(rect.y + height) >= Math.round(textWrappingBounds.y)
                && Math.round(rect.y) < Math.round(textWrappingBounds.bottom))
                //Checks whether the bottom of the table intersects with floating item.
                || Math.round(rect.y + height) <= Math.round(textWrappingBounds.bottom)
                    && Math.round(rect.y + height) >= Math.round(textWrappingBounds.y))
            && !(allowOverlap && (isInTextBox)));
    };
    Layout.prototype.isNeedToWrapLeafWidget = function (pargaraph, elementBox) {
        var IsNeedToWrap = true;
        return (pargaraph.bodyWidget.floatingElements.length > 0
            && (IsNeedToWrap || pargaraph.associatedCell)
            && !(elementBox instanceof ImageElementBox));
    };
    Layout.prototype.getMinWidth = function (currTextRange, width, height, rect) {
        var text = currTextRange.text;
        var split = text.split(' ');
        // Gets the minimum width from the text when it contains only empty space.
        if (text !== '' && text.trim() === ''
            && currTextRange && currTextRange.line.paragraph
            && currTextRange.previousNode && currTextRange.nextNode
            && currTextRange.line.paragraph.isEmpty) {
            split = [''];
        }
        // Initialized the text with additional empty string.
        // It avoids the minimum width calculation from next sibling (GetNextTextRangeWidth).
        var minwidth = this.documentHelper.textHelper.measureText(split[0], currTextRange.characterFormat).Width;
        //Need to layout the unicode characters (chinese) character by character.
        // if (DrawingContext.IsUnicodeText(text)) {
        //     minwidth = DrawingContext.MeasureTextRange(currTextRange, text[0].ToString()).Width;
        // }
        var nextSibling = this.getNextSibling(currTextRange);
        if (split.length === 1 && nextSibling) {
            var nextSiblingText = nextSibling.text;
            minwidth += this.getNextTextRangeWidth(nextSibling, nextSiblingText, width, height, rect);
        } // Add the minimum character width of that paragraph, if this text range is para mark
        return minwidth;
    };
    Layout.prototype.getNextTextRangeWidth = function (nextSiblingTextRange, nextSiblingText, width, height, rect) {
        var nextsibling = nextSiblingTextRange;
        // if (nextSiblingTextRange instanceof WFootnote)
        //     nextsibling = ((nextSiblingTextRange as IWidget).LayoutInfo as LayoutFootnoteInfoImpl).TextRange;
        var sizeNext = new Rect(0, 0, 0, 0);
        var isNextSiblingSizeNeedToBeMeasure = this.isNextSibligSizeNeedToBeMeasure(sizeNext, nextSiblingTextRange, rect, width, height);
        while (isNextSiblingSizeNeedToBeMeasure
            && this.isLeafWidgetNextSiblingIsTextRange(nextsibling)
            && width + sizeNext.width < rect.width) {
            nextsibling = this.getNextSibling(nextsibling);
            if (!this.isNextSibligSizeNeedToBeMeasure(sizeNext, nextsibling, rect, width, height)) {
                break;
            }
            nextSiblingText += nextsibling.text;
        }
        return sizeNext.width;
    };
    Layout.prototype.isLeafWidgetNextSiblingIsTextRange = function (textRange) {
        var nextSiblingTextRange = this.getNextSibling(textRange);
        if (nextSiblingTextRange && nextSiblingTextRange instanceof TextElementBox) {
            return true;
        }
        return false;
    };
    Layout.prototype.isNextSibligSizeNeedToBeMeasure = function (sizeNext, nextSiblingwidget, rect, width, height) {
        var text = null;
        var nextSiblingTextRange = nextSiblingwidget;
        if (nextSiblingTextRange) {
            text = nextSiblingTextRange.text;
            if (text.indexOf(' ') !== -1 || (text.indexOf('-') !== -1 || (text.indexOf('_') !== -1)
                && ((width + sizeNext.width + (this.documentHelper.textHelper.measureText(text.split('-')[0], nextSiblingTextRange.characterFormat)).Width) < rect.width))
                || ((nextSiblingTextRange).text === '\t')) {
                var elementWidth = nextSiblingTextRange.width;
                if (text !== text.split(' ')[0]) {
                    elementWidth = this.documentHelper.textHelper.measureText(text.split(' ')[0], nextSiblingTextRange.characterFormat).Width;
                }
                if ((width + sizeNext.width + elementWidth) > rect.width && text.indexOf('-')) {
                    if (text !== text.split('-')[0] + '-') {
                        elementWidth = this.documentHelper.textHelper.measureText(text.split('-')[0] + '-', nextSiblingTextRange.characterFormat).Width;
                    }
                }
                sizeNext.width += elementWidth;
                return false;
            }
            else {
                if (nextSiblingTextRange.text.length > 0) {
                    var textInfo = this.documentHelper.textHelper.measureText(nextSiblingTextRange.text, nextSiblingTextRange.characterFormat);
                    sizeNext.height += textInfo.Height;
                    sizeNext.width += textInfo.Width;
                }
            }
        }
        return true;
    };
    Layout.prototype.isNeedDoIntermediateWrapping = function (remainingClientWidth, textWrappingStyle, rect, width, paragraph, textWrappingBounds, leafWidget, minwidth, minimumWidthRequired) {
        return (((remainingClientWidth > minimumWidthRequired)
            && (((Math.round(rect.width) <= Math.round(minwidth)
                || (rect.width < width && leafWidget.paragraph.isInsideTable))
                && textWrappingStyle !== 'Left' // Skip to update width when the wrap type as left
                && textWrappingStyle !== 'Largest')
                || textWrappingStyle === 'Right' //To layout right side when the wrap type as right
                || (rect.width < remainingClientWidth && textWrappingStyle === 'Largest'))) // Check whether the right side width is greater than the left side when the wrap type as largest
            || ((Math.round(textWrappingBounds.x - paragraph.x + paragraph.leftIndent) < minimumWidthRequired // Check whether the left side of text wrap object is have minimum width to layout or not
                || (leafWidget instanceof TextElementBox && this.isFloatingItemOnLeft(rect, minwidth, textWrappingBounds)))
                && (textWrappingStyle !== 'Left' || remainingClientWidth < minimumWidthRequired)));
    };
    Layout.prototype.isFloatingItemOnLeft = function (rect, minWidth, bounds) {
        return false;
    };
    Layout.prototype.getNextSibling = function (currentElementBox) {
        var nextSibling = currentElementBox.nextNode;
        var isFieldCode = false;
        while (nextSibling) {
            if ((nextSibling instanceof FieldElementBox) || (nextSibling instanceof BookmarkElementBox) || isFieldCode || nextSibling instanceof ListTextElementBox) {
                if (nextSibling instanceof FieldElementBox) {
                    if (nextSibling.fieldType === 0) {
                        isFieldCode = true;
                    }
                    else if (nextSibling.fieldType === 2) {
                        isFieldCode = false;
                    }
                }
            }
            else if (nextSibling instanceof TextElementBox) {
                break;
            }
            nextSibling = nextSibling.nextNode;
        }
        return nextSibling;
    };
    Layout.prototype.adjustClientAreaBasedOnTextWrap = function (elementBox, rect) {
        var ownerPara = elementBox.line.paragraph;
        var bodyWidget = ownerPara.bodyWidget;
        var yValue = 0;
        var layouter = this.viewer;
        var yposition = rect.y;
        var isFirstItem = this.isFirstitemInPage(elementBox, yposition);
        if (isFirstItem) {
            yValue = yposition;
        }
        isFirstItem = isNullOrUndefined(ownerPara.previousWidget);
        //Update Layout area based on text wrap
        if (this.isNeedToWrapLeafWidget(ownerPara, elementBox)) {
            var clientLayoutArea = layouter.clientArea;
            //Need to handle sorting floating items.
            // Sort based on Y position
            bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
            // Sort based on X position
            bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
            for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                var floatingItem = bodyWidget.floatingElements[i];
                var allowOverlap = false;
                if (floatingItem instanceof ShapeBase) {
                    allowOverlap = floatingItem.allowOverlap;
                }
                else {
                    allowOverlap = floatingItem.positioning.allowOverlap;
                }
                if (ownerPara.isInsideTable) {
                    if (floatingItem instanceof TableWidget && !floatingItem.isInsideTable) {
                        continue;
                    }
                }
                if (this.isRelayout && !this.isRelayoutOverlap &&
                    this.viewer.documentHelper.selection.isExistAfter(floatingItem instanceof TableWidget ? floatingItem : floatingItem.line.paragraph, elementBox.line.paragraph)
                    || this.isRelayout && this.isRelayoutOverlap && this.viewer.documentHelper.selection.isExistAfter(floatingItem instanceof TableWidget ? floatingItem : floatingItem.line.paragraph, this.endOverlapWidget)) {
                    continue;
                }
                // if (ownerPara.isInsideTable && allowOverlap
                //     && (ownerPara.associatedCell.ownerTable.positioning.allowOverlap))
                // {
                //     WParagraph ownerParagraph = (m_lcOperator as Layouter).FloatingItems[i].OwnerParagraph;
                //     if (!(ownerParagraph !== null
                //         && ownerParagraph.IsInCell
                //         && ownerPara.GetOwnerEntity() === ownerParagraph.GetOwnerEntity()))
                //     {
                //         continue;
                //     }
                // }
                var xPosition = floatingItem.x;
                var distanceLeft = 0;
                var distanceTop = 0;
                var distanceRight = 0;
                var distanceBottom = 0;
                var width = 0;
                if (floatingItem instanceof ShapeBase) {
                    distanceLeft = floatingItem.distanceLeft;
                    distanceTop = floatingItem.distanceTop;
                    distanceRight = floatingItem.distanceRight;
                    distanceBottom = floatingItem.distanceBottom;
                    width = floatingItem.width;
                }
                else {
                    width = floatingItem.getTableCellWidth();
                    distanceLeft = floatingItem.positioning.distanceLeft;
                    distanceTop = floatingItem.positioning.distanceTop;
                    distanceRight = floatingItem.positioning.distanceRight;
                    distanceBottom = floatingItem.positioning.distanceBottom;
                }
                var textWrappingBounds = new Rect(floatingItem.x - distanceLeft, floatingItem.y - distanceTop, width + distanceLeft + distanceRight, floatingItem.height + distanceTop + distanceBottom);
                var textWrappingStyle = floatingItem instanceof TableWidget ? 'Square' : floatingItem.textWrappingStyle;
                var textWrappingType = floatingItem instanceof TableWidget ? 'Both' : floatingItem.textWrappingType;
                //  //Need to skip the wrapping for line break when it is first item of corresponding paragraph and that paragraph contains First line indent as per Word 2010 and its lower version behavior.
                //  if (IsLineBreakIntersectOnFloatingItem(leafWidget, textWrappingStyle, textWrappingBounds, rect, size, ownerPara))
                //  continue;
                var minimumWidthRequired = 24;
                var bottom = layouter.clientArea.y + floatingItem.height;
                // if (this.isNeedToWrapParaMarkToRightSide(elementBox, ownerPara, textWrappingBounds, bottom, layouter, this.viewer.clientArea, textWrappingType, minimumWidthRequired)) {
                //     if (lineBreakPosition !== 0) {
                //         this.viewer.clientArea.y = lineBreakPosition;
                //         //m_layoutArea.UpdateBoundsBasedOnTextWrap(lineBreakPosition);
                //     }
                //     this.viewer.clientArea.x += textWrappingBounds.width;
                //     //(LeafWidget as IWidget).LayoutInfo.IsLineBreak = false;
                //     elementBox.height = 0;
                //     elementBox.width = textWrappingBounds.width;
                //     return;
                // }
                if (!(clientLayoutArea.x > (textWrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < textWrappingBounds.x - minimumWidthRequired)) {
                    if (this.isNeedToWrapForSquareTightAndThrough(bodyWidget, elementBox, -1, -1, textWrappingStyle, textWrappingBounds, allowOverlap, 1, floatingItem, false, rect, elementBox.width, elementBox.height)) {
                        var rightIndent = 0;
                        var leftIndent = 0;
                        var listLeftIndent = 0;
                        var firstLineIndent = HelperMethods.convertPointToPixel(elementBox.paragraph.paragraphFormat.firstLineIndent);
                        var paragraphLeftIndent = HelperMethods.convertPointToPixel(ownerPara.paragraphFormat.leftIndent);
                        var paragarphRightIndent = HelperMethods.convertPointToPixel(ownerPara.paragraphFormat.rightIndent);
                        firstLineIndent = ((elementBox.indexInOwner === 0 && elementBox.line.isFirstLine()) && firstLineIndent > 0) ? firstLineIndent : 0;
                        var currTextRange = elementBox;
                        var containerWidget = floatingItem instanceof TableWidget ? floatingItem.containerWidget : floatingItem.line.paragraph.containerWidget;
                        var isnewline = false;
                        if (elementBox.line.paragraph) {
                            //Right indent is considered only if the rect.X greater than the floating item's X position and
                            //Text wrapping style should not be left
                            if (rect.x >= textWrappingBounds.x && textWrappingType !== 'Left') {
                                rightIndent = paragarphRightIndent;
                            }
                            //Left indent is considered only if the rect.X less than the floating item's X position and
                            //Text wrapping style should not be right
                            if (rect.x < textWrappingBounds.x && textWrappingType !== 'Right') {
                                leftIndent = paragraphLeftIndent;
                            }
                            var listFormat = ownerPara.paragraphFormat.listFormat;
                            var listLevel = this.getListLevel(listFormat.list, listFormat.listLevelNumber);
                            if (rect.x === (clientLayoutArea.x + paragraphLeftIndent)
                                && listFormat && listFormat.baseStyle
                                && listLevel && listLevel.paragraphFormat.leftIndent !== 0) {
                                listLeftIndent = paragraphLeftIndent;
                                isnewline = true; // to denote the current line is new line of the paragraph
                            }
                        }
                        // if (this.isXPositionUpdated && textWrappingType === 'Both' && this.layoutState === 'Splitted') {
                        //     rect.width = bodyWidget.width - this.viewer.clientActiveArea.x;
                        //     rect.x = textWrappingBounds.right;
                        //     this.viewer.updateClientAreaForTextWrap(rect);
                        //     return rect;
                        // }
                        if (textWrappingStyle === 'Square') {
                            //If the floating item intersects the Horizontal line shape, then we fit the shape in the remaining area
                            if (elementBox instanceof ShapeBase &&
                                elementBox.textWrappingStyle === 'Inline') {
                                if (textWrappingBounds.x - rect.x > 24) {
                                    floatingItem.width = textWrappingBounds.x - rect.x;
                                }
                                else {
                                    floatingItem.width = floatingItem.width - (textWrappingBounds.right - rect.x) - rightIndent;
                                }
                            }
                        }
                        /* Since the Microsoft Word has different behavior to calculate minimum width required to fit a word to a side of Table,
                        the minimum width required changes based upon table border value and table alignment.
                        And this value even differ for different word version, such that 2013, will have different minimum required value, where all other version shares the same logic to calculate minimum width required */
                        var border = 0;
                        var isBorderValueZero = false;
                        var table = void 0;
                        var borderThickness = 0;
                        var tableHorizontalPosition = void 0;
                        if (floatingItem instanceof TableWidget) {
                            table = floatingItem;
                            tableHorizontalPosition = floatingItem.positioning.horizontalAlignment;
                            border = this.getMaximumRightCellBorderWidth(floatingItem);
                            isBorderValueZero = this.getDefaultBorderSpacingValue(border, isBorderValueZero, tableHorizontalPosition);
                            borderThickness = floatingItem.tableFormat.borders.left.lineWidth / 2;
                        }
                        // Skip to update when the wrap type as left
                        if (rect.x + borderThickness >= textWrappingBounds.x && rect.x < textWrappingBounds.right && textWrappingType !== 'Left') // Skip to update when the wrap type as left
                         {
                            rect.width = rect.width - (textWrappingBounds.right - rect.x) - rightIndent;
                            this.isWrapText = true;
                            var isEntityFitInCurrentLine = true;
                            if (table !== null) {
                                minimumWidthRequired = this.getMinimumWidthRequiredForTable(isBorderValueZero, tableHorizontalPosition, border);
                            }
                            //checks minimum width
                            if (!isEntityFitInCurrentLine || Math.round(rect.width) < minimumWidthRequired || (rect.width < elementBox.width && elementBox.text === '\t')
                                || (textWrappingBounds.x < ownerPara.x + paragraphLeftIndent)) // check whether the TextWrap X position is less than the paragraph X position
                             {
                                //TODO
                                rect.width = this.viewer.clientArea.right - textWrappingBounds.right - (isnewline ? listLeftIndent : 0);
                                //checks minimum width of the single word
                                var minwidth = 0;
                                if (currTextRange) {
                                    minwidth = this.getMinWidth(elementBox, elementBox.width, elementBox.height, rect);
                                }
                                else {
                                    minwidth = elementBox.width;
                                }
                                if (Math.round(rect.width) < minimumWidthRequired || rect.width < minwidth) {
                                    if (isEntityFitInCurrentLine && (textWrappingBounds.x - (ownerPara.x + ownerPara.leftIndent)) > minimumWidthRequired
                                        && (this.viewer.clientArea.right - textWrappingBounds.right) > minimumWidthRequired) {
                                        rect.width = 0;
                                    }
                                    else {
                                        var topMarginValue = 0;
                                        //topMarginValue = GetTopMarginValueForFloatingTable(ownerPara,
                                        //layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                        var isPositionsUpdated = false;
                                        //Check whether left side of current floating item has enoush place to fit current widget.
                                        //If it has, need to fit left side of the floating item, instead of moving to bottom.
                                        // if (layouter.clientArea.x + elementBox.width < floatingItem.x) {
                                        //     //Current item should preserve below to the floating item,which preserved left side of the floating item.
                                        //     //If left side has multiple items or none of items this may fail, need to handle this cases.
                                        //     let tempBounds: Rect = GetIntersectingItemBounds(floatingItem, yposition);
                                        //     if (tempBounds.bottom !== 0 && tempBounds.bottom <= textWrappingBounds.bottom) {
                                        //         rect.x = clientLayoutArea.x;
                                        //         rect.width = clientLayoutArea.width;
                                        //         rect.y = tempBounds.bottom + topMarginValue;
                                        //         rect.height = clientLayoutArea.bottom - tempBounds.bottom;
                                        //         this.isYPositionUpdated = true;
                                        //         isPositionsUpdated = true;
                                        //     }
                                        // }
                                        if (!isPositionsUpdated) {
                                            this.isYPositionUpdated = true;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                            rect.y = textWrappingBounds.bottom + topMarginValue;
                                        }
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                    this.isWrapText = false;
                                }
                                else {
                                    var xposition = rect.x;
                                    //TabsLayoutInfo tabsInfo = null;
                                    rect.x = textWrappingBounds.right + (isnewline ? listLeftIndent : 0) + firstLineIndent;
                                    rect.width -= firstLineIndent;
                                    //When there is no space to fit the content in right, then update the y position.
                                    if (textWrappingStyle === 'Square' && rect.width < 0 && elementBox.width > 0) {
                                        // let topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                        var topMarginValue = 0;
                                        this.isYPositionUpdated = true;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                        rect.y = textWrappingBounds.bottom + topMarginValue;
                                        rect.x = xposition;
                                    }
                                    else {
                                        // this.isXPositionUpdated = true;
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect); //
                                    // if (!(leafWidget is Break))
                                    // AdjustClientAreaBasedOnExceededTab(leafWidget, size, ref rect, ownerPara);
                                    // if (leafWidget != null)
                                    //     tabsInfo = (leafWidget as ILeafWidget).LayoutInfo as TabsLayoutInfo;
                                    //if (tabsInfo == null) {
                                    //this.isWrapText = true;
                                    //this.viewer.updateClientAreaForTextWrap(rect);//
                                    // if (layouter.FloatingItems[i].FloatingEntity is WTable)
                                    // layouter.FloatingTableBottom = textWrappingBounds.Bottom;
                                    //}
                                }
                            }
                            else {
                                //Check whether the RightPositionOfTabStopInterSectingFloattingItems have the value or not.
                                //if contains value means continue the layouting even x position exceeds the page right position.
                                var xposition = rect.x;
                                rect.x = textWrappingBounds.right + (isnewline ? listLeftIndent : 0) + firstLineIndent;
                                rect.width = this.viewer.clientArea.right - textWrappingBounds.right - (isnewline ? listLeftIndent : 0) - firstLineIndent;
                                //When there is no space to fit the content in right, then update the y position.
                                if (textWrappingStyle === 'Square' && rect.width < 0 && elementBox.width > 0) {
                                    // float topMarginValue = GetTopMarginValueForFloatingTable(ownerPara,
                                    //     layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                    var topMarginValue = 0;
                                    this.isYPositionUpdated = true;
                                    rect.width = this.viewer.clientArea.width;
                                    rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                    rect.y = textWrappingBounds.bottom + topMarginValue;
                                    rect.x = xposition;
                                }
                                //else
                                // this.isXPositionUpdated = true;
                                // if (!(leafWidget is Break))
                                //     AdjustClientAreaBasedOnExceededTab(leafWidget, size, ref rect, ownerPara);
                                // //Microsoft Word 2013 doesn't split text character by character, when current line has floating item.
                                // if (ownerPara != null && ownerPara.Document.Settings.CompatibilityMode == CompatibilityMode.Word2013)
                                //     layouter.m_canSplitbyCharacter = false;
                                this.isWrapText = true;
                                this.viewer.updateClientAreaForTextWrap(rect); //
                            }
                        }
                        else if (textWrappingBounds.x >= rect.x && rect.right > textWrappingBounds.x) {
                            rect.width = textWrappingBounds.x - rect.x - rightIndent;
                            //Remaining right side width
                            var remainingClientWidth = this.viewer.clientArea.right - textWrappingBounds.right;
                            remainingClientWidth = remainingClientWidth > 0 ? remainingClientWidth : 0;
                            this.isWrapText = true;
                            //checks minimum width
                            var minwidth = 0;
                            if (currTextRange) {
                                minwidth = this.getMinWidth(currTextRange, elementBox.width, elementBox.height, rect);
                            }
                            else {
                                minwidth = elementBox.width;
                            }
                            if (table !== null) {
                                minimumWidthRequired = this.getMinimumWidthRequiredForTable(isBorderValueZero, tableHorizontalPosition, border);
                            }
                            if (this.isNeedDoIntermediateWrapping(remainingClientWidth, textWrappingType, rect, elementBox.width, elementBox.paragraph, textWrappingBounds, elementBox, minwidth, minimumWidthRequired)) {
                                var leftMinimumWidthRequired = 24;
                                rect.width = remainingClientWidth;
                                this.isWrapText = true;
                                if (rect.x + minwidth > textWrappingBounds.x || textWrappingType === 'Right' || clientLayoutArea.x > textWrappingBounds.x - leftMinimumWidthRequired) //Update X position when the wrap type as largest or right or the minimum width + rect.X > wrap x position
                                 {
                                    rect.x = textWrappingBounds.right;
                                    // let listFormat: WListFormat = null;
                                    // let listLevel: WListLevel = null;
                                    // if (elementBox.line.isFirstLine
                                    //    && (listFormat = ownerPara.GetListFormatValue()) != null
                                    //    && listFormat.CurrentListStyle != null
                                    //    && (listLevel = ownerPara.GetListLevel(listFormat)) != null
                                    //    && listLevel.ParagraphFormat.LeftIndent != 0)
                                    // {
                                    //     float x = 0;
                                    //     float width = rect.Width;
                                    //     //Updates the paragraph firstline horizontal positions, such as first line indent and listtab value
                                    //     UpdateParaFirstLineHorizontalPositions(paragraphLayoutInfo, ownerPara, ref x, ref width);
                                    //     rect.X += (x + (float)paragraphLayoutInfo.Margins.Left);
                                    //     rect.Width -= (x + (float)paragraphLayoutInfo.Margins.Left);
                                    // }
                                    // this.isXPositionUpdated = true;
                                    // if (textWrappingStyle == TextWrappingStyle.Through
                                    //     && layouter.FloatingItems[i].IsDoesNotDenotesRectangle) {
                                    //     UpdateXposition(textWrappingBounds, i, ref rect, size, minwidth);
                                    // }
                                    if (rect.width > minwidth || textWrappingType === 'Right') {
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                    }
                                }
                                if ((rect.width < minimumWidthRequired && !(minwidth < remainingClientWidth && ('Tight' === textWrappingStyle)))
                                    || (rect.width < minwidth && Math.round(rect.right) === Math.round(this.viewer.clientArea.right)
                                        && textWrappingType === 'Both')) {
                                    var rect1 = textWrappingBounds;
                                    if (Math.round(rect.x) === Math.round(bodyWidget.sectionFormat.leftMargin + ownerPara.paragraphFormat.leftIndent)) {
                                        //Updates top margin of the paragraph when paragraph mark not wrap based on the floating table.
                                        var topMarginValue = 0;
                                        //topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, floatingItem, rect.y);
                                        rect.y = rect1.bottom + topMarginValue;
                                        this.isYPositionUpdated = true;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height = rect.height - (rect1.height + topMarginValue);
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        this.isWrapText = false;
                                    }
                                    // Reset the rectangle position when the rectangle right position is equialent to layout area right position
                                    else if (Math.round(rect.right) >= Math.round(this.viewer.clientArea.right) && textWrappingType === 'Both') {
                                        //Updates top margin of the paragraph when paragraph mark not wrap based on the floating table.
                                        var topMarginValue = 0;
                                        // topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, floatingItem, rect.y);
                                        rect.y = rect1.bottom + topMarginValue;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height = rect.height - (rect1.height + topMarginValue);
                                        rect.x = this.viewer.clientArea.x + leftIndent;
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        // this.isXPositionUpdated = true;
                                        this.isYPositionUpdated = true;
                                        this.isWrapText = false;
                                    }
                                    else {
                                        rect.width = 0;
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                    }
                                }
                            }
                            else {
                                //While text intersecting with SQUARE type floating item and there is no space
                                //available to fit this text in current line then move the text to bottom
                                //of the floating item and this behavior is applicable only for Word 2013.
                                //Lower versions split the text character by character.
                                if ((elementBox.line.isFirstLine() && elementBox.indexInOwner === 0 || remainingClientWidth === 0) && textWrappingStyle === 'Square'
                                    && Math.round(rect.width) <= Math.round(minwidth)
                                    && ownerPara.containerWidget === containerWidget) {
                                    rect.x = clientLayoutArea.x;
                                    rect.y = textWrappingBounds.bottom;
                                    rect.width = clientLayoutArea.width;
                                    rect.height -= (textWrappingBounds.bottom - rect.y);
                                    this.isYPositionUpdated = true;
                                }
                                else if (Math.round(rect.width) <= Math.round(minwidth) && Math.round(rect.x - leftIndent) !== Math.round(this.viewer.clientArea.x)) {
                                    rect.width = 0;
                                }
                                this.viewer.updateClientAreaForTextWrap(rect); //
                            }
                        }
                        if (textWrappingType !== 'Both') {
                            this.isWrapText = false;
                        }
                    }
                }
            }
        }
        return rect;
    };
    Layout.prototype.adjustClientAreaBasedOnTextWrapForTable = function (table, rect) {
        //let ownerPara: ParagraphWidget = elementBox.line.paragraph;
        if (isNullOrUndefined(table.containerWidget) || isNullOrUndefined(table.bodyWidget)) {
            return rect;
        }
        var bodyWidget = table.bodyWidget;
        var yValue = 0;
        var layouter = this.viewer;
        var yposition = rect.y;
        var isFirstItem = isNullOrUndefined(table.previousWidget);
        if (isFirstItem) {
            yValue = yposition;
        }
        if (bodyWidget.floatingElements.length > 0) {
            var clientLayoutArea = layouter.clientActiveArea;
            bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
            bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
            for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                var floatingElement = bodyWidget.floatingElements[i];
                var allowOverlap = false;
                if (floatingElement instanceof ShapeBase) {
                    allowOverlap = floatingElement.allowOverlap;
                }
                else {
                    allowOverlap = floatingElement.positioning.allowOverlap;
                }
                if (table.isInsideTable) {
                    if (floatingElement instanceof TableWidget && !floatingElement.isInsideTable) {
                        continue;
                    }
                }
                if (floatingElement instanceof TableWidget && floatingElement.wrapTextAround && floatingElement.positioning.allowOverlap) {
                    if (table.wrapTextAround && table.positioning.allowOverlap) {
                        continue;
                    }
                }
                var tableWidth = table.getTableCellWidth();
                var isShape = floatingElement instanceof ShapeBase;
                var distanceLeft = isShape ? floatingElement.distanceLeft : floatingElement.positioning.distanceLeft;
                var distanceTop = isShape ? floatingElement.distanceTop : floatingElement.positioning.distanceTop;
                var distanceRight = isShape ? floatingElement.distanceRight : floatingElement.positioning.distanceRight;
                var distanceBottom = isShape ? floatingElement.distanceBottom : floatingElement.positioning.distanceBottom;
                var width = isShape ? floatingElement.width : floatingElement.getTableCellWidth();
                var wrappingBounds = new Rect(floatingElement.x - distanceLeft, floatingElement.y - distanceTop, width + distanceLeft + distanceRight, floatingElement.height + distanceTop + distanceBottom);
                var textWrappingStyle = floatingElement instanceof TableWidget ? 'Square' : floatingElement.textWrappingStyle;
                var textWrappingType = floatingElement instanceof TableWidget ? 'Both' : floatingElement.textWrappingType;
                var minimumWidthRequired = 24;
                var tableHeight = table.childWidgets.length > 0 ? table.childWidgets[0].rowFormat.height : 0;
                if (!(clientLayoutArea.x > (wrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < wrappingBounds.x - minimumWidthRequired)) {
                    if (this.isNeedToWrapForSquareTightAndThroughForTable(bodyWidget, table, -1, -1, textWrappingStyle, wrappingBounds, allowOverlap, 1, floatingElement, false, rect, tableWidth, tableHeight)) {
                        // Skip to update when the wrap type as left
                        if (rect.x >= wrappingBounds.x && rect.x < wrappingBounds.right && textWrappingType !== 'Left') // Skip to update when the wrap type as left
                         {
                            rect.width = rect.width - (wrappingBounds.right - rect.x);
                            this.isWrapText = true;
                            var isEntityFitInCurrentLine = true;
                            if (!isEntityFitInCurrentLine || Math.round(rect.width) < minimumWidthRequired || (rect.width < tableWidth)
                                || (wrappingBounds.x < table.x)) // check whether the TextWrap X position is less than the paragraph X position
                             {
                                rect.width = this.viewer.clientArea.right - wrappingBounds.right;
                                var minwidth = tableWidth;
                                if (Math.round(rect.width) < minimumWidthRequired || rect.width < minwidth) {
                                    if (isEntityFitInCurrentLine && (wrappingBounds.x - (table.x)) > minimumWidthRequired
                                        && (this.viewer.clientArea.right - wrappingBounds.right) > minimumWidthRequired) {
                                        rect.width = 0;
                                    }
                                    else {
                                        var topMarginValue = 0;
                                        var isPositionsUpdated = false;
                                        if (!isPositionsUpdated) {
                                            this.isYPositionUpdated = true;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height -= (wrappingBounds.bottom + topMarginValue - rect.y);
                                            rect.y = wrappingBounds.bottom + topMarginValue;
                                        }
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                    this.isWrapText = false;
                                }
                                else {
                                    var xposition = rect.x;
                                    //TabsLayoutInfo tabsInfo = null;
                                    rect.x = wrappingBounds.right;
                                    //When there is no space to fit the content in right, then update the y position.
                                    if (textWrappingStyle === 'Square' && rect.width < 0 && tableWidth > 0) {
                                        // let topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                        var marginTop = 0;
                                        this.isYPositionUpdated = true;
                                        rect.height -= (wrappingBounds.bottom + marginTop - rect.y);
                                        rect.width = this.viewer.clientArea.width;
                                        rect.y = wrappingBounds.bottom + marginTop;
                                        rect.x = xposition;
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect); //
                                }
                            }
                            else {
                                var xposition = rect.x;
                                rect.x = wrappingBounds.right + table.firstChild.firstChild.leftMargin;
                                rect.width = this.viewer.clientArea.right - wrappingBounds.right;
                                //When there is no space to fit the content in right, then update the y position.
                                if (textWrappingStyle === 'Square' && rect.width < 0 && tableWidth > 0) {
                                    // float topMarginValue = GetTopMarginValueForFloatingTable(ownerPara,
                                    //     layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                    var topMarginValue = 0;
                                    this.isYPositionUpdated = true;
                                    rect.width = this.viewer.clientArea.width;
                                    rect.height -= (wrappingBounds.bottom + topMarginValue - rect.y);
                                    rect.y = wrappingBounds.bottom + topMarginValue;
                                    rect.x = xposition;
                                }
                                this.viewer.updateClientAreaForTextWrap(rect); //
                            }
                        }
                    }
                }
            }
        }
        return rect;
    };
    Layout.prototype.startAt = function (element, text) {
        if (element.footnoteType === 'Footnote') {
            this.startat = element.paragraph.bodyWidget.sectionFormat.initialFootNoteNumber;
            text = this.getFootEndNote(element.paragraph.bodyWidget.sectionFormat.footNoteNumberFormat, this.documentHelper.footnoteCollection.indexOf(element) + this.startat);
        }
        else {
            this.startat = element.paragraph.bodyWidget.sectionFormat.initialEndNoteNumber;
            text = this.getFootEndNote(element.paragraph.bodyWidget.sectionFormat.endnoteNumberFormat, this.documentHelper.endnoteCollection.indexOf(element) + this.startat);
        }
        return text;
    };
    Layout.prototype.layoutFootEndNoteElement = function (element) {
        this.isFootnoteContentChanged = true;
        var footnote;
        var positionchanged = false;
        var footIndex = this.documentHelper.footnoteCollection.indexOf(element);
        var insertIndex = 1;
        this.islayoutFootnote = true;
        var isFitted;
        var clientArea = new Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
        var clientActiveArea = new Rect(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.y, this.viewer.clientActiveArea.width, this.viewer.clientActiveArea.height);
        var bodyWidget = element.paragraph.bodyWidget;
        var isCreated = false;
        var height = 0;
        if (bodyWidget.page.footnoteWidget) {
            for (var j = 0; j < bodyWidget.page.footnoteWidget.bodyWidgets.length; j++) {
                insertIndex = bodyWidget.page.footnoteWidget.bodyWidgets.length;
                var currentIndex = this.documentHelper.footnoteCollection.indexOf((bodyWidget.page.footnoteWidget.bodyWidgets[j]).footNoteReference);
                if (currentIndex > footIndex) {
                    if (currentIndex - footIndex === 1) {
                        insertIndex = j;
                        positionchanged = true;
                        break;
                    }
                }
            }
        }
        element.isLayout = true;
        if (element.footnoteType === 'Footnote') {
            if (bodyWidget.page.footnoteWidget && bodyWidget.page.footnoteWidget instanceof FootNoteWidget) {
                footnote = bodyWidget.page.footnoteWidget;
            }
            else {
                isCreated = true;
                footnote = new FootNoteWidget();
                footnote.footNoteType = 'Footnote';
                footnote.page = bodyWidget.page;
                var newParagraph = new ParagraphWidget();
                newParagraph.characterFormat = new WCharacterFormat();
                newParagraph.paragraphFormat = new WParagraphFormat();
                newParagraph.index = 0;
                var lineWidget = new LineWidget(newParagraph);
                newParagraph.childWidgets.push(lineWidget);
                height = this.documentHelper.textHelper.getParagraphMarkSize(newParagraph.characterFormat).Height;
                footnote.margin = new Margin(0, height, 0, 0);
            }
            this.isFootNoteLayoutStart = true;
            if (isCreated) {
                bodyWidget.page.footnoteWidget = footnote;
            }
            var body = element.bodyWidget;
            this.viewer.updateClientArea(footnote.sectionFormat, footnote.page);
            this.viewer.clientArea.y = clientArea.y;
            this.viewer.clientActiveArea.y = clientActiveArea.y;
            for (var i = 0; i < element.bodyWidget.childWidgets.length; i++) {
                var block = element.bodyWidget.childWidgets[i];
                //TODO: Ensure this case.
                if (this.isLayoutWhole) {
                    block.containerWidget = undefined;
                }
                else {
                    block.containerWidget = body;
                    body.page = bodyWidget.page;
                    body.sectionFormat = footnote.sectionFormat;
                    block.containerWidget.containerWidget = footnote;
                }
                this.viewer.updateClientAreaForBlock(block, true);
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true);
                }
                this.layoutBlock(block, 0);
                height += block.height;
                block.y = 0;
                this.viewer.updateClientAreaForBlock(block, false);
                body.height += block.height;
            }
            this.isFootNoteLayoutStart = false;
            isFitted = false;
            if (height >= clientActiveArea.height) {
                this.isfootMove = true;
            }
            if (positionchanged) {
                footnote.bodyWidgets.splice(insertIndex, 0, body);
            }
            else {
                footnote.bodyWidgets.push(body);
            }
            if (element.line.paragraph.isInsideTable) {
                var table = this.getParentTable(element.line.paragraph.associatedCell.ownerTable);
                if (isNullOrUndefined(table.footnoteElement)) {
                    table.footnoteElement = [];
                }
                if (table.footnoteElement.indexOf(element) == -1) {
                    table.footnoteElement.push(element);
                    this.layoutedFootnoteElement.push(element);
                }
            }
            footnote.height += height;
            isFitted = true;
            this.viewer.clientActiveArea = clientActiveArea;
            this.viewer.clientActiveArea.height -= height;
            this.footnoteHeight += height;
            this.viewer.clientArea = clientArea;
        }
        return isFitted;
    };
    Layout.prototype.layoutEndNoteElement = function () {
        var lastpage = this.documentHelper.pages.length;
        if (this.documentHelper.endnoteCollection.length > 0) {
            var foot = void 0;
            var endNote = void 0;
            var isCreated = void 0;
            var bodyWidget = this.documentHelper.pages[lastpage - 1].bodyWidgets[0];
            for (var i = 0; i < this.documentHelper.endnoteCollection.length; i++) {
                foot = this.documentHelper.endnoteCollection[i];
                if (bodyWidget.page.endnoteWidget instanceof FootNoteWidget && bodyWidget.page.endnoteWidget.footNoteType === 'Endnote') {
                    endNote = bodyWidget.page.endnoteWidget;
                }
                else {
                    isCreated = true;
                    endNote = new FootNoteWidget();
                    endNote.footNoteType = 'Endnote';
                    endNote.page = bodyWidget.page;
                }
                var body = foot.bodyWidget;
                for (var j = 0; j < foot.bodyWidget.childWidgets.length; j++) {
                    var block = foot.bodyWidget.childWidgets[j];
                    block.containerWidget = body;
                }
                if (endNote.bodyWidgets.indexOf(body) === -1) {
                    endNote.bodyWidgets.push(body);
                    body.sectionFormat = endNote.sectionFormat;
                }
                if (isCreated) {
                    bodyWidget.page.endnoteWidget = endNote;
                }
            }
            this.layoutfootNote(endNote);
        }
    };
    Layout.prototype.hasValidElement = function (paragraph) {
        var line = paragraph.firstChild;
        if (line && !isNullOrUndefined(this.documentHelper.selection)) {
            var elementBox = line.children[0];
            while (elementBox) {
                if (elementBox instanceof FieldElementBox) {
                    elementBox = this.documentHelper.selection.getNextValidElementForField(elementBox);
                    if (!isNullOrUndefined(elementBox) && !elementBox.line.paragraph.equals(paragraph)) {
                        return false;
                    }
                }
                if (elementBox instanceof TextElementBox || elementBox instanceof ImageElementBox) {
                    return true;
                }
                if (!isNullOrUndefined(elementBox)) {
                    elementBox = elementBox.nextNode;
                }
            }
        }
        return false;
    };
    Layout.prototype.updateFieldText = function (element) {
        var text = this.documentHelper.getFieldResult(element.fieldBegin, element.paragraph.bodyWidget.page);
        if (text !== '') {
            element.text = text;
            this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
        }
    };
    Layout.prototype.checkLineWidgetWithClientArea = function (line, element) {
        if (line !== element.line || element.line === line && isNullOrUndefined(element.nextElement)
            && !element.line.isLastLine()) {
            this.moveToNextLine(line);
            if (this.documentHelper.compatibilityMode !== 'Word2013' && this.isOverlapFloatTable) {
                var table = void 0;
                if (element.line.paragraph.previousRenderedWidget instanceof TableWidget && element.line.paragraph.previousRenderedWidget.wrapTextAround) {
                    table = element.line.paragraph.previousRenderedWidget;
                    this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                        HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
                }
                this.viewer.clientActiveArea.x += line.paragraph.leftIndent;
                this.isOverlapFloatTable = false;
            }
            if (line !== element.line) {
                this.isRTLLayout = false;
            }
        }
        if (element.line !== line && this.viewer instanceof PageLayoutViewer
            && this.viewer.clientActiveArea.height < element.height &&
            this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
            this.moveToNextPage(this.viewer, element.line);
        }
        else if (element.line === line && isNullOrUndefined(element.nextElement)
            && line.paragraph.lastChild === line && !line.isLastLine() && this.viewer.clientActiveArea.height >= 0) {
            this.moveFromNextPage(line);
        }
    };
    Layout.prototype.checkAndSplitTabOrLineBreakCharacter = function (text, element) {
        var char = ['\t', '\v', '\f'];
        var index = HelperMethods.indexOfAny(text, char);
        if (index > -1) {
            var character = text[index];
            if ((character === '\t' && text !== '\t') || (character === '\v' && text !== '\v')
                || (character === '\f' && text !== '\f')) {
                this.splitByLineBreakOrTab(this.viewer, element, index, character);
            }
        }
    };
    Layout.prototype.moveFromNextPage = function (line) {
        var nextLine = line.nextLine;
        if (nextLine && line.paragraph.childWidgets.indexOf(nextLine) === -1) {
            var splittedParagraph = nextLine.paragraph;
            nextLine.paragraph.childWidgets.splice(nextLine.indexInOwner, 1);
            line.paragraph.childWidgets.push(nextLine);
            nextLine.paragraph = line.paragraph;
            if (splittedParagraph.childWidgets.length === 0) {
                splittedParagraph.destroy();
            }
        }
    };
    Layout.prototype.cutClientWidth = function (currentElement) {
        if (this.is2013Justification) {
            return false;
        }
        this.clearLineMeasures();
        var line = currentElement.line;
        line.marginTop = 0;
        var width = 0;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            width += element.width;
            if (currentElement === element) {
                break;
            }
        }
        var splitCurrentWidget = this.viewer.clientActiveArea.width - width < 0;
        var paragarph = currentElement.line.paragraph;
        var bodyWidget = paragarph.bodyWidget;
        if (bodyWidget && bodyWidget.floatingElements.length > 0) {
            this.hasFloatingElement = true;
            this.isXPositionUpdated = true;
            return false;
        }
        if (!splitCurrentWidget) {
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + width);
            if (currentElement.line.paragraph.paragraphFormat.textAlignment === 'Justify' &&
                currentElement instanceof TextElementBox) {
                this.splitTextElementWordByWord(currentElement);
            }
            if (isNullOrUndefined(currentElement.nextElement) && this.viewer.clientActiveArea.width > 0
                && !currentElement.line.isLastLine()) {
                this.moveElementFromNextLine(line);
            }
        }
        else if (currentElement.previousElement) {
            this.cutClientWidth(currentElement.previousElement);
        }
        return splitCurrentWidget;
    };
    Layout.prototype.layoutFieldCharacters = function (element) {
        if (element.fieldType === 0) {
            if (!isNullOrUndefined(element.formFieldData) && this.isInitialLoad) {
                this.checkAndUpdateFieldData(element);
            }
            if (!this.isFieldCode && (!isNullOrUndefined(element.fieldEnd) || element.hasFieldEnd)) {
                if (this.documentHelper.fieldStacks.indexOf(element) === -1) {
                    this.documentHelper.fieldStacks.push(element);
                }
                this.isFieldCode = true;
                element.hasFieldEnd = true;
            }
        }
        else if (this.documentHelper.fieldStacks.length > 0) {
            if (element.fieldType === 2) {
                var field = this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1];
                if (field.fieldSeparator === element && (!isNullOrUndefined(field.fieldEnd) || field.hasFieldEnd)) {
                    this.isFieldCode = false;
                }
            }
            else {
                var field = this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1];
                if (element === field.fieldEnd) {
                    this.documentHelper.fieldStacks.pop();
                    this.isFieldCode = false;
                }
            }
        }
    };
    Layout.prototype.checkAndUpdateFieldData = function (fieldBegin) {
        if (fieldBegin.hasFieldEnd && !isNullOrUndefined(fieldBegin.fieldEnd)) {
            if (isNullOrUndefined(fieldBegin.fieldSeparator)) {
                var seperator = new FieldElementBox(2);
                seperator.fieldBegin = fieldBegin;
                seperator.fieldEnd = fieldBegin.fieldEnd;
                seperator.line = fieldBegin.line;
                fieldBegin.line.children.splice(fieldBegin.fieldEnd.indexInOwner, 0, seperator);
                fieldBegin.fieldSeparator = seperator;
                fieldBegin.fieldEnd.fieldSeparator = seperator;
            }
            var previousNode = fieldBegin.fieldEnd.previousNode;
            if (previousNode instanceof FieldElementBox && previousNode.fieldType === 2) {
                var formFieldData = fieldBegin.formFieldData;
                if (formFieldData instanceof CheckBoxFormField) {
                    var checkBoxTextElement = new TextElementBox();
                    checkBoxTextElement.line = fieldBegin.line;
                    var index = fieldBegin.line.children.indexOf(fieldBegin.fieldEnd);
                    fieldBegin.line.children.splice(index, 0, checkBoxTextElement);
                    checkBoxTextElement.characterFormat.copyFormat(fieldBegin.characterFormat);
                    if (formFieldData.checked) {
                        checkBoxTextElement.text = String.fromCharCode(9745);
                    }
                    else {
                        checkBoxTextElement.text = String.fromCharCode(9744);
                    }
                    if (formFieldData.sizeType !== 'Auto') {
                        checkBoxTextElement.characterFormat.fontSize = formFieldData.size * CHECK_BOX_FACTOR;
                    }
                    else {
                        checkBoxTextElement.characterFormat.fontSize = checkBoxTextElement.characterFormat.fontSize * CHECK_BOX_FACTOR;
                    }
                }
                else if (formFieldData instanceof DropDownFormField) {
                    var dropDownTextElement = new TextElementBox();
                    dropDownTextElement.characterFormat.copyFormat(fieldBegin.characterFormat);
                    dropDownTextElement.line = fieldBegin.line;
                    if (formFieldData.dropdownItems.length > 0) {
                        dropDownTextElement.text = formFieldData.dropdownItems[formFieldData.selectedIndex];
                    }
                    else {
                        dropDownTextElement.text = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
                    }
                    var index = fieldBegin.line.children.indexOf(fieldBegin.fieldEnd);
                    fieldBegin.line.children.splice(index, 0, dropDownTextElement);
                }
            }
        }
    };
    Layout.prototype.layoutEmptyLineWidget = function (paragraph, isEmptyLine, line, isShiftEnter) {
        var paraFormat = paragraph.paragraphFormat;
        var subWidth = 0;
        var whiteSpaceCount = 0;
        isShiftEnter = isNullOrUndefined(isShiftEnter) ? false : isShiftEnter;
        var borders = paraFormat.borders;
        var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraph);
        //Calculate line height and descent based on formatting defined in paragraph.
        var paragraphMarkSize = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat);
        var maxHeight = paragraphMarkSize.Height;
        var beforeSpacing = this.getBeforeSpacing(paragraph);
        var lineWidget;
        if (paragraph.childWidgets.length > 0 && !isShiftEnter) {
            lineWidget = paragraph.childWidgets[0];
            if (lineWidget.children.length > 0) {
                if ((paraFormat.bidi || this.isContainsRtl(lineWidget))) {
                    this.shiftElementsForRTLLayouting(lineWidget, paraFormat.bidi);
                }
                var isParagraphStart = lineWidget.isFirstLine();
                var isParagraphEnd = lineWidget.isLastLine();
                var firstLineIndent = 0;
                if (isParagraphStart) {
                    beforeSpacing = this.getBeforeSpacing(paragraph);
                    firstLineIndent = HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
                }
                var textAlignment = paraFormat.textAlignment;
                if (textAlignment !== 'Left' && this.viewer.textWrap
                    && (!(textAlignment === 'Justify' && isParagraphEnd)
                        || (textAlignment === 'Justify' && paraFormat.bidi))) {
                    var getWidthAndSpace = this.getSubWidth(lineWidget, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
                    subWidth = getWidthAndSpace[0].subWidth;
                    whiteSpaceCount = getWidthAndSpace[0].spaceCount;
                }
            }
        }
        else {
            lineWidget = isEmptyLine ? this.addLineWidget(paragraph) : line;
        }
        if (!isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
            !(paragraph.containerWidget instanceof TextFrame)) {
            var elementBox = new TextElementBox();
            elementBox.line = lineWidget;
            lineWidget.children.push(elementBox);
            elementBox.text = '¶';
            elementBox.characterFormat = paragraph.characterFormat;
            elementBox.width = this.documentHelper.textHelper.getTextSize(elementBox, elementBox.characterFormat);
            this.adjustPosition(elementBox, paragraph.bodyWidget);
            paragraph.x += elementBox.padding.left;
            if (isEmptyLine) {
                this.checkInbetweenShapeOverlap(lineWidget);
            }
            lineWidget.children.splice(elementBox.indexInOwner, 1);
        }
        //isNullOrUndefined(this.viewer.currentHeaderFooter) &&
        if (this.viewer instanceof PageLayoutViewer
            && this.viewer.clientActiveArea.height < beforeSpacing + maxHeight
            && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y
            && !(lineWidget.isFirstLine() && isNullOrUndefined(lineWidget.paragraph.previousWidget))) {
            this.moveToNextPage(this.viewer, lineWidget);
        }
        //Gets line spacing.
        var lineSpacing = this.getLineSpacing(paragraph, maxHeight);
        //let maxDescent: number = maxHeight - paragraphMarkSize.BaselineOffset;
        //Calculate the bottom position of current line - max height + line spacing.
        if (!isNaN(this.maxTextHeight)
            && maxHeight < this.maxTextHeight) {
            maxHeight = this.maxTextHeight;
            //maxDescent = maxHeight - this.maxTextBaseline;
        }
        var topMargin = 0;
        var bottomMargin = 0;
        var leftMargin = 0;
        var height = maxHeight;
        var lineSpacingType = paragraph.paragraphFormat.lineSpacingType;
        if (lineSpacingType === 'Multiple') {
            if (lineSpacing > maxHeight) {
                bottomMargin += lineSpacing - maxHeight;
            }
            else {
                topMargin += lineSpacing - maxHeight;
            }
        }
        else if (lineSpacingType === 'Exactly') {
            topMargin += lineSpacing - (topMargin + height + bottomMargin);
        }
        else if (lineSpacing > topMargin + height + bottomMargin) {
            topMargin += lineSpacing - (topMargin + height + bottomMargin);
        }
        topMargin += beforeSpacing;
        bottomMargin += HelperMethods.convertPointToPixel(this.getAfterSpacing(paragraph));
        if (borders.top.lineStyle != 'None') {
            if (lineWidget.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                topMargin += HelperMethods.convertPointToPixel(borders.top.lineWidth + borders.top.space);
            }
        }
        if (borders.bottom.lineStyle != 'None') {
            if (lineWidget.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                bottomMargin += HelperMethods.convertPointToPixel(borders.bottom.lineWidth + borders.bottom.space);
            }
        }
        for (var i = 0; i < lineWidget.children.length; i++) {
            var element = lineWidget.children[i];
            if (i === 0 && element instanceof ListTextElementBox) {
                var textAlignment = paragraph.paragraphFormat.textAlignment;
                if (textAlignment === 'Right') { //Aligns the text as right justified.
                    leftMargin = subWidth;
                }
                else if (textAlignment === 'Center') { //Aligns the text as center justified.
                    leftMargin = subWidth / 2;
                }
                element.margin = new Margin(leftMargin, topMargin, 0, bottomMargin);
                element.line = lineWidget;
                lineWidget.height = topMargin + height + bottomMargin;
            }
        }
        lineWidget.margin = new Margin(0, topMargin, 0, bottomMargin);
        lineWidget.height = topMargin + height + bottomMargin;
        if (isNullOrUndefined(paragraph.nextRenderedWidget) && paragraph.isInsideTable
            && paragraph.previousRenderedWidget instanceof TableWidget && paragraph.childWidgets.length == 1) {
            //Special behavior for empty cell mark after nested table, preserved with zero height by default.
            //Empty line is displayed in cell for the last empty paragraph (Cell mark - last paragraph in cell) after a nested table.
            lineWidget.height = 0;
        }
        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + lineWidget.height);
        this.wrapPosition = [];
        //Clears the previous line elements from collection.
    };
    Layout.prototype.layoutListItems = function (paragraph) {
        if (!this.isFieldCode) {
            if (!isNullOrUndefined(paragraph.paragraphFormat)
                && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)
                && !isNullOrUndefined(this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId)) &&
                paragraph.paragraphFormat.listFormat.listLevelNumber >= 0
                && paragraph.paragraphFormat.listFormat.listLevelNumber < 9) {
                this.clearListElementBox(paragraph);
                this.layoutList(paragraph, this.documentHelper);
            }
            else if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId === -1) {
                this.clearListElementBox(paragraph);
            }
        }
    };
    Layout.prototype.layoutList = function (paragraph, documentHelper) {
        var list = documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
        var currentListLevel = this.getListLevel(list, paragraph.paragraphFormat.listFormat.listLevelNumber);
        if (isNullOrUndefined(currentListLevel) || isNullOrUndefined(currentListLevel.numberFormat) || currentListLevel.numberFormat === '') {
            return;
        }
        this.viewer.updateClientWidth(-HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent));
        var lineWidget = paragraph.childWidgets[0];
        if (isNullOrUndefined(lineWidget)) {
            lineWidget = new LineWidget(paragraph);
            paragraph.childWidgets.push(lineWidget);
        }
        var element = new ListTextElementBox(currentListLevel, false);
        element.line = lineWidget;
        if (currentListLevel.listLevelPattern === 'Bullet') {
            element.text = currentListLevel.numberFormat;
        }
        else {
            element.text = this.getListNumber(paragraph.paragraphFormat.listFormat);
        }
        if (this.documentHelper.isIosDevice) {
            var text = element.text;
            text = text === String.fromCharCode(61623) ? String.fromCharCode(9679) : text === String.fromCharCode(61551) + String.fromCharCode(32) ? String.fromCharCode(9675) : text;
            if (text !== element.text) {
                element.text = text;
            }
        }
        documentHelper.textHelper.updateTextSize(element, paragraph);
        var moveToNextPage;
        if (this.viewer instanceof PageLayoutViewer
            && this.viewer.clientActiveArea.height < element.height && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
            moveToNextPage = true;
        }
        this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
        //Adds the text element to the line
        lineWidget.children.splice(0, 0, element);
        if (currentListLevel.followCharacter !== 'None') {
            element = new ListTextElementBox(currentListLevel, true);
            if (currentListLevel.followCharacter === 'Tab') {
                element.text = '\t';
                var index = lineWidget.children.indexOf(element);
                var tabWidth = this.getTabWidth(paragraph, this.viewer, index, lineWidget, element);
                documentHelper.textHelper.updateTextSize(element, paragraph);
                element.width = tabWidth;
            }
            else {
                element.text = ' ';
                documentHelper.textHelper.updateTextSize(element, paragraph);
            }
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
            //Adds the tabSpace to the line
            lineWidget.children.splice(1, 0, element);
            element.line = lineWidget;
        }
        if (moveToNextPage) {
            this.moveToNextPage(this.viewer, lineWidget);
            this.cutClientWidth(element);
            this.hasFloatingElement = false;
            this.isXPositionUpdated = false;
            return;
        }
        if (currentListLevel.followCharacter !== 'None') {
            this.viewer.updateClientWidth(HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent));
        }
    };
    Layout.prototype.addBodyWidget = function (area, widget) {
        var bodyWidget;
        if (widget) {
            bodyWidget = widget;
        }
        else {
            bodyWidget = new BodyWidget();
        }
        bodyWidget.width = area.width;
        bodyWidget.x = area.x;
        bodyWidget.y = area.y;
        // this.addSectionInDictionary(this.viewer, section, bodyWidget);
        return bodyWidget;
    };
    /**
     * @private
     */
    Layout.prototype.addListLevels = function (abstractList) {
        for (var i = abstractList.levels.length; i < 9; i++) {
            var listLevel = new WListLevel(abstractList);
            var val = i % 3;
            if (abstractList.levels[0].listLevelPattern === 'Bullet') {
                listLevel.listLevelPattern = 'Bullet';
                listLevel.numberFormat = val === 0 ? String.fromCharCode(61623) : val === 1 ? String.fromCharCode(61551) + String.fromCharCode(32) : String.fromCharCode(61607);
                listLevel.characterFormat.fontFamily = listLevel.numberFormat === String.fromCharCode(61607) ? 'Wingdings' : 'Symbol';
            }
            else {
                listLevel.listLevelPattern = this.getListLevelPattern(val);
                listLevel.numberFormat = '%' + (i + 1).toString() + '.';
                listLevel.startAt = 1;
                listLevel.restartLevel = i;
            }
            listLevel.paragraphFormat = new WParagraphFormat(undefined);
            listLevel.paragraphFormat.leftIndent = 48 * (i + 1);
            listLevel.paragraphFormat.firstLineIndent = -24;
            abstractList.levels.push(listLevel);
        }
    };
    Layout.prototype.addSplittedLineWidget = function (lineWidget, elementIndex, splittedElementBox) {
        if (this.isWrapText) {
            if (!isNullOrUndefined(splittedElementBox)) {
                lineWidget.children.splice(elementIndex + 1, 0, splittedElementBox);
                splittedElementBox.line = lineWidget;
            }
            return;
        }
        var paragraph = lineWidget.paragraph;
        var movedElementBox = [];
        var lineIndex = paragraph.childWidgets.indexOf(lineWidget);
        if (!isNullOrUndefined(splittedElementBox)) {
            movedElementBox.push(splittedElementBox);
        }
        var newLineWidget = undefined;
        //Move Next element box to temp collection
        for (var i = elementIndex + 1; i < lineWidget.children.length; i++) {
            movedElementBox.push(lineWidget.children[i]);
        }
        if (movedElementBox.length > 0) {
            if (lineIndex === paragraph.childWidgets.length - 1) {
                newLineWidget = new LineWidget(paragraph);
            }
            else {
                newLineWidget = paragraph.childWidgets[lineIndex + 1];
            }
            for (var j = 0; j < movedElementBox.length; j++) {
                movedElementBox[j].line = newLineWidget;
            }
            lineWidget.children.splice(elementIndex + 1, lineWidget.children.length - 1);
            newLineWidget.children = movedElementBox.concat(newLineWidget.children);
            if (paragraph.childWidgets.indexOf(newLineWidget) === -1) {
                paragraph.childWidgets.splice(lineIndex + 1, 0, newLineWidget);
            }
        }
    };
    Layout.prototype.addElementToLine = function (paragraph, element) {
        if (!(element instanceof ShapeBase && element.textWrappingStyle !== 'Inline')) {
            if (this.isWrapText) {
                this.isWrapText = false;
                this.viewer.clientActiveArea.width = this.viewer.clientArea.right - this.viewer.clientActiveArea.x;
            }
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
        }
        if (paragraph.paragraphFormat.textAlignment === 'Justify' && element instanceof TextElementBox) {
            this.splitTextElementWordByWord(element);
        }
    };
    Layout.prototype.splitElementForClientArea = function (paragraph, element) {
        //const line: LineWidget = element.line;
        if (element.line.children.length > 0) {
            var previousElement = element.previousElement;
            var index = element.indexInOwner;
            // if line widget contain only single image element box need to skip this from splitting
            // else move element to next line
            if (element.line.children.length > 1) {
                if (previousElement && this.viewer.clientActiveArea.x !== this.viewer.clientArea.x) {
                    index -= 1;
                }
            }
            this.addSplittedLineWidget(element.line, index);
        }
    };
    Layout.prototype.splitByWord = function (lineWidget, paragraph, elementBox, text, width, characterFormat) {
        var index = this.getSplitIndexByWord(this.viewer.clientActiveArea.width, text, width, characterFormat);
        if (index > 0 && index < elementBox.length) {
            var indexOf = lineWidget.children.indexOf(elementBox);
            //const lineIndex: number = paragraph.childWidgets.indexOf(lineWidget);
            var splittedElementBox = new TextElementBox();
            text = text.substring(index);
            splittedElementBox.text = text;
            if (text[0] === ' ') {
                var prevLength = text.length;
                text = HelperMethods.trimStart(text); //To trim white space at starting of the text.
                index += prevLength - text.length;
            }
            splittedElementBox.characterFormat.copyFormat(elementBox.characterFormat);
            splittedElementBox.width = this.documentHelper.textHelper.getWidth(splittedElementBox.text, characterFormat);
            splittedElementBox.trimEndWidth = splittedElementBox.width;
            splittedElementBox.characterRange = elementBox.characterRange;
            //splittedElementBox.revisions = splittedElementBox.revisions;
            elementBox.text = elementBox.text.substr(0, index);
            elementBox.width -= splittedElementBox.width;
            elementBox.trimEndWidth = elementBox.width;
            if (elementBox.revisions.length > 0) {
                this.updateRevisionForSplittedElement(elementBox, splittedElementBox, true);
                splittedElementBox.isMarkedForRevision = elementBox.isMarkedForRevision;
            }
            splittedElementBox.height = elementBox.height;
            splittedElementBox.baselineOffset = elementBox.baselineOffset;
            this.splitErrorCollection(elementBox, splittedElementBox);
            this.addSplittedLineWidget(lineWidget, indexOf, splittedElementBox);
            this.addElementToLine(paragraph, elementBox);
            if (elementBox.width === 0) {
                lineWidget.children.splice(indexOf, 1);
            }
        }
    };
    Layout.prototype.splitErrorCollection = function (elementBox, splittedBox) {
        if (elementBox.errorCollection.length > 0) {
            var errorCollection = [];
            var ignoreItems = elementBox.ignoreOnceItems;
            for (var i = 0; i < elementBox.errorCollection.length; i++) {
                errorCollection.push(elementBox.errorCollection[i]);
            }
            for (var j = 0; j < elementBox.errorCollection.length; j++) {
                var index = elementBox.text.indexOf(elementBox.errorCollection[j].text);
                var textElement = elementBox.errorCollection[j];
                if (index < 0) {
                    errorCollection.splice(0, 1);
                    splittedBox.errorCollection.push(textElement);
                }
                else if (splittedBox.text.indexOf(textElement.text) > 0) {
                    splittedBox.errorCollection.push(textElement);
                }
            }
            splittedBox.ignoreOnceItems = ignoreItems;
            elementBox.ignoreOnceItems = [];
            elementBox.errorCollection = errorCollection;
        }
    };
    Layout.prototype.splitByCharacter = function (lineWidget, textElement, text, width, characterFormat) {
        var paragraph = lineWidget.paragraph;
        var index = this.getTextSplitIndexByCharacter(this.viewer.clientArea.width, this.viewer.clientActiveArea.width, text, width, characterFormat);
        var splitWidth = 0;
        if (index < textElement.length) {
            splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.substring(0, index), characterFormat);
            text = text.substring(index);
        }
        if (splitWidth > this.viewer.clientActiveArea.width && textElement.indexInOwner > 0) {
            this.addSplittedLineWidget(lineWidget, textElement.indexInOwner - 1);
            return;
        }
        var indexOf = lineWidget.children.indexOf(textElement);
        if (index < textElement.length) {
            //const lineIndex: number = paragraph.childWidgets.indexOf(lineWidget);
            var splittedElement = new TextElementBox();
            splittedElement.text = text;
            splittedElement.errorCollection = textElement.errorCollection;
            textElement.text = textElement.text.substr(0, index);
            splittedElement.characterFormat.copyFormat(textElement.characterFormat);
            splittedElement.width = this.documentHelper.textHelper.getWidth(splittedElement.text, characterFormat);
            splittedElement.trimEndWidth = splittedElement.width;
            splittedElement.characterRange = textElement.characterRange;
            textElement.width -= splittedElement.width;
            textElement.trimEndWidth = textElement.width;
            splittedElement.height = textElement.height;
            splittedElement.baselineOffset = textElement.baselineOffset;
            lineWidget.children.splice(textElement.indexInOwner + 1, 0, splittedElement);
            if (textElement.revisions.length > 0) {
                this.updateRevisionForSplittedElement(textElement, splittedElement, index > 0);
                splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
            }
            this.addElementToLine(paragraph, textElement);
            this.addSplittedLineWidget(lineWidget, indexOf);
            if (textElement.width === 0) {
                lineWidget.children.splice(indexOf, 1);
            }
        }
        else {
            //Adds the last text element on inline to line elements collection
            this.addSplittedLineWidget(lineWidget, indexOf);
            this.addElementToLine(paragraph, textElement);
        }
    };
    Layout.prototype.updateRevisionForSplittedElement = function (item, splittedElement, isSplitted, isJustify) {
        if (item.revisions.length > 0) {
            for (var i = 0; i < item.revisions.length; i++) {
                var currentRevision = item.revisions[i];
                if (isSplitted) {
                    splittedElement.revisions.push(currentRevision);
                    var rangeIndex = currentRevision.range.indexOf(item);
                    if (rangeIndex < 0) {
                        currentRevision.range.push(splittedElement);
                    }
                    else {
                        if (isJustify) {
                            currentRevision.range.splice(rangeIndex, 0, splittedElement);
                        }
                        else {
                            currentRevision.range.splice(rangeIndex + 1, 0, splittedElement);
                        }
                    }
                }
                else {
                    currentRevision.range.splice(currentRevision.range.length - 1, 1);
                    currentRevision.range.push(splittedElement);
                    splittedElement.revisions.push(currentRevision);
                }
            }
        }
    };
    Layout.prototype.splitTextElementWordByWord = function (textElement) {
        var lineWidget = textElement.line;
        var indexOf = lineWidget.children.indexOf(textElement);
        var startIndex = indexOf;
        var paddingLeft = textElement.padding.left;
        textElement.padding.left = 0;
        var text = textElement.text;
        var format;
        var characterUptoWs = text.trim().indexOf(' ');
        if (characterUptoWs >= 0) {
            lineWidget.children.splice(indexOf, 1);
            format = textElement.characterFormat;
            //const fontSize: number = format.fontSize;
            var index = textElement.length - HelperMethods.trimStart(text).length; //Trim start
            while (index < textElement.length) {
                index = this.getTextIndexAfterSpace(text, index);
                if (index === 0 || index === textElement.length) {
                    break;
                }
                if (index < textElement.length) {
                    var splittedElement = new TextElementBox();
                    var splittedText = text.substring(0, index);
                    text = text.substring(index);
                    if (text.substring(0, 1) === ' ') {
                        // start of the text is trimmed and its length is reduced from text length.
                        index += text.length - HelperMethods.trimStart(text).length;
                    }
                    splittedElement.text = splittedText;
                    splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                    splittedElement.line = lineWidget;
                    splittedElement.width = this.documentHelper.textHelper.getWidth(splittedElement.text, format);
                    splittedElement.trimEndWidth = splittedElement.width;
                    splittedElement.height = textElement.height;
                    splittedElement.baselineOffset = textElement.baselineOffset;
                    splittedElement.characterRange = textElement.characterRange;
                    lineWidget.children.splice(indexOf, 0, splittedElement);
                    if (textElement.revisions.length > 0) {
                        this.updateRevisionForSplittedElement(textElement, splittedElement, index > 0, true);
                        splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                    }
                    textElement.text = text;
                    textElement.width -= splittedElement.width;
                    textElement.trimEndWidth = textElement.width;
                    if (textElement.width === 0 && lineWidget.children.indexOf(textElement) !== -1) {
                        lineWidget.children.splice(lineWidget.children.indexOf(textElement), 1);
                    }
                    index = 0;
                    indexOf++;
                }
            }
            textElement.text = text;
            lineWidget.children.splice(indexOf, 0, textElement);
        }
        lineWidget.children[startIndex].padding.left = paddingLeft;
    };
    Layout.prototype.splitTextForClientArea = function (lineWidget, element, text, width, characterFormat) {
        var paragraph = lineWidget.paragraph;
        var isSplitByWord = true;
        var isSplitByCharacter = false;
        var index = -1;
        if (!(text.substring(0, 1) === ' ') && !(text.substring(0, 1) === '-')) {
            var textWidth = width;
            var characterUptoWS = 0;
            characterUptoWS = HelperMethods.trimEnd(text).indexOf(' ') + 1;
            if (characterUptoWS == 0) {
                characterUptoWS = HelperMethods.trimEnd(text).indexOf('-') + 1;
                if (characterUptoWS > 0) {
                    isSplitByCharacter = true;
                }
            }
            index = characterUptoWS;
            //Checks whether text not starts with white space. If starts with white space, no need to check previous text blocks.
            if (index > 0) {
                textWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.slice(0, index), characterFormat);
            }
            if (this.viewer.clientActiveArea.width < textWidth) {
                //Check and split the previous text elements to next line.
                isSplitByWord = this.checkPreviousElement(lineWidget, lineWidget.children.indexOf(element), characterFormat);
                if (isSplitByWord) {
                    //lineWidget = paragraph.childWidgets[paragraph.childWidgets.indexOf(lineWidget) + 1] as LineWidget;
                    //isSplitByWord = textWidth <= this.viewer.clientActiveArea.width;
                    return;
                }
            }
        }
        else {
            index = 1;
        }
        if (width <= this.viewer.clientActiveArea.width) {
            //Fits the text in current line.
            this.addElementToLine(paragraph, element);
        }
        else if (isSplitByWord && !isSplitByCharacter && (index > 0 || text.indexOf(' ') !== -1 || text.indexOf('-') !== -1)) {
            this.splitByWord(lineWidget, paragraph, element, text, width, characterFormat);
        }
        else {
            this.splitByCharacter(lineWidget, element, text, width, characterFormat);
        }
    };
    Layout.prototype.splitByLineBreakOrTab = function (viewer, span, index, spiltBy) {
        // Splits tab character to separate SpanAdv
        var inlineIndex = span.line.children.indexOf(span);
        var value = span.text;
        var remainder = value.substring(index);
        var newSpan = spiltBy === '\t' ? new TabElementBox() : new TextElementBox();
        newSpan.line = span.line;
        this.updateRevisionForSplittedElement(span, newSpan, true);
        newSpan.characterFormat.copyFormat(span.characterFormat);
        newSpan.characterRange = span.characterRange;
        span.line.children.splice(inlineIndex + 1, 0, newSpan);
        if (index > 0 && remainder.length === 1) {
            newSpan.text = value.substring(index);
            span.text = value.substring(0, index);
        }
        else if (index > 0) {
            newSpan.text = spiltBy;
            var newText = new TextElementBox();
            newText.line = span.line;
            newText.text = value.substring(index + 1);
            this.updateRevisionForSplittedElement(span, newText, true);
            newText.characterFormat.copyFormat(span.characterFormat);
            newText.characterRange = span.characterRange;
            span.line.children.splice(inlineIndex + 2, 0, newText);
            span.text = value.substring(0, index);
        }
        else if (remainder !== '') {
            newSpan.text = value.substring(index + 1);
            span.text = spiltBy;
        }
    };
    /* eslint-disable  */
    Layout.prototype.moveToNextLine = function (line) {
        var paragraph = line.paragraph;
        var paraFormat = paragraph.paragraphFormat;
        var isParagraphStart = line.isFirstLine();
        var isParagraphEnd = line.isLastLine();
        var height = 0;
        var maxDescent = 0;
        var afterSpacing = 0;
        var beforeSpacing = 0;
        var lineSpacing = 0;
        var firstLineIndent = 0;
        var borders = paraFormat.borders;
        this.updateLineWidget(line);
        height = this.maxTextHeight;
        maxDescent = height - this.maxTextBaseline;
        var pageIndex = 0;
        var skip2013Justification = false;
        var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraph);
        if (paragraph.bodyWidget && !(paragraph.bodyWidget instanceof HeaderFooterWidget)) {
            pageIndex = this.documentHelper.pages.indexOf(paragraph.bodyWidget.page);
        }
        //Updates before spacing at the top of Paragraph first line.
        if (isParagraphStart) {
            beforeSpacing = this.getBeforeSpacing(paragraph, pageIndex);
            firstLineIndent = HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
        }
        //Updates after spacing at the bottom of Paragraph last line.
        if (isParagraphEnd) {
            afterSpacing = HelperMethods.convertPointToPixel(this.getAfterSpacing(paragraph));
        }
        if ((paraFormat.bidi || this.isContainsRtl(line))) {
            this.shiftElementsForRTLLayouting(line, paraFormat.bidi);
            // this.reArrangeElementsForRtl(line, paraFormat.bidi);
            this.isRTLLayout = true;
        }
        if (isNaN(this.maxTextHeight)) {
            //Calculate line height and descent based on formatting defined in paragraph.
            var measurement = this.documentHelper.textHelper.measureText('a', paragraph.characterFormat);
            height = measurement.Height;
            maxDescent = height - measurement.BaselineOffset;
        }
        else {
            height = this.maxTextHeight;
            maxDescent = height - this.maxTextBaseline;
        }
        // Gets line spacing.
        lineSpacing = this.getLineSpacing(paragraph, height);
        if (paraFormat.lineSpacingType === 'Exactly'
            && lineSpacing < maxDescent + this.maxBaseline) {
            lineSpacing = maxDescent + this.maxBaseline;
        }
        var subWidth = 0;
        var whiteSpaceCount = 0;
        var getWidthAndSpace;
        var textAlignment = paraFormat.textAlignment;
        var totalSpaceCount = 0;
        // calculates the sub width, for text alignments - Center, Right, Justify.
        // if the element is paragraph end and para bidi is true and text alignment is justify
        // we need to calculate subwidth and add it to the left margin of the element.
        if (textAlignment !== 'Left' && this.viewer.textWrap && (!(textAlignment === 'Justify' && isParagraphEnd)
            || (textAlignment === 'Justify' && paraFormat.bidi) || (this.is2013Justification && isParagraphEnd))) {
            getWidthAndSpace = this.getSubWidth(line, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
            subWidth = getWidthAndSpace[0].subWidth;
            whiteSpaceCount = getWidthAndSpace[0].spaceCount;
            totalSpaceCount = getWidthAndSpace[0].totalSpaceCount;
            skip2013Justification = line.isEndsWithPageBreak || line.isEndsWithLineBreak || line.paragraph.bidi || this.isRTLLayout;
        }
        if (!skip2013Justification && (getWidthAndSpace && getWidthAndSpace.length === 1) && this.viewer.clientActiveArea.width > 0 &&
            !isParagraphEnd && !this.is2013Justification && textAlignment === 'Justify' && this.documentHelper.compatibilityMode === 'Word2013') {
            var availableWidth = this.viewer.clientActiveArea.width;
            var totalSpaceWidth = this.getTotalSpaceWidth(line);
            var averageWidthOfSpace = totalSpaceWidth / totalSpaceCount;
            var avgAvailableLineWidthForSpace = (availableWidth) / totalSpaceCount;
            var diffFactor = (avgAvailableLineWidthForSpace / averageWidthOfSpace) * 100;
            var widthForAdjustment = 0;
            if (diffFactor <= 33) {
                widthForAdjustment = totalSpaceWidth / 8;
            }
            else {
                widthForAdjustment = totalSpaceWidth / 4;
            }
            this.viewer.clientActiveArea.x -= widthForAdjustment;
            this.viewer.clientActiveArea.width += widthForAdjustment;
            this.is2013Justification = true;
            this.moveElementFromNextLine(line);
            this.nextElementToLayout = line.children[line.children.length - 1];
            return;
        }
        else {
            if (this.is2013Justification && isParagraphEnd) {
                if (subWidth > 0) {
                    subWidth = 0;
                    whiteSpaceCount = 0;
                }
            }
            this.is2013Justification = false;
            this.nextElementToLayout = undefined;
        }
        var addSubWidth = false;
        var wrapIndex = 0;
        var lineSpacingType = paraFormat.lineSpacingType;
        var isStarted = false;
        var children = line.renderedElements;
        for (var i = 0; i < children.length; i++) {
            var topMargin = 0;
            var bottomMargin = 0;
            var leftMargin = 0;
            var elementBox = children[i];
            if (!isNullOrUndefined(getWidthAndSpace) && isStarted && elementBox.padding.left > 0 &&
                (getWidthAndSpace.length > wrapIndex + 1)) {
                var previousWidth = subWidth;
                if (textAlignment === "Justify") {
                    previousWidth = subWidth * getWidthAndSpace[wrapIndex].spaceCount;
                }
                else if (textAlignment === "Center") {
                    previousWidth = subWidth / 2;
                }
                elementBox.padding.left = elementBox.padding.left - previousWidth;
                var subWidthInfo = getWidthAndSpace[++wrapIndex];
                subWidth = subWidthInfo.subWidth;
                whiteSpaceCount = subWidthInfo.spaceCount;
            }
            if (elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline') {
                continue;
            }
            isStarted = true;
            var alignElements = this.alignLineElements(elementBox, topMargin, bottomMargin, maxDescent, addSubWidth, subWidth, textAlignment, whiteSpaceCount, i === children.length - 1);
            topMargin = alignElements.topMargin;
            bottomMargin = alignElements.bottomMargin;
            addSubWidth = alignElements.addSubWidth;
            whiteSpaceCount = alignElements.whiteSpaceCount;
            //Updates line spacing, paragraph after/ before spacing and aligns the text to base line offset.
            if (lineSpacingType === 'Multiple') {
                if (lineSpacing > height) {
                    bottomMargin += lineSpacing - height;
                }
                else {
                    topMargin += lineSpacing - height;
                }
            }
            else if (lineSpacingType === 'Exactly') {
                topMargin += lineSpacing - (topMargin + elementBox.height + bottomMargin);
            }
            else if (lineSpacing > topMargin + elementBox.height + bottomMargin) {
                topMargin += lineSpacing - (topMargin + elementBox.height + bottomMargin);
            }
            if (pageIndex > 0 && paragraph === paragraph.bodyWidget.childWidgets[0] && this.documentHelper.pages[pageIndex].sectionIndex === this.documentHelper.pages[pageIndex - 1].sectionIndex) {
                topMargin += 0;
            }
            else {
                topMargin += beforeSpacing;
            }
            if (borders.top.lineStyle != 'None') {
                if (line.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                    topMargin += HelperMethods.convertPointToPixel(borders.top.lineWidth + borders.top.space);
                }
            }
            if (borders.bottom.lineStyle != 'None') {
                if (line.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                    bottomMargin += HelperMethods.convertPointToPixel(borders.bottom.lineWidth + borders.bottom.space);
                }
            }
            bottomMargin += afterSpacing;
            if (i === 0 || (!(elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline') &&
                elementBox.previousElement instanceof ShapeBase && elementBox.previousElement.textWrappingStyle !== 'Inline')
                || elementBox.padding.left > 0) {
                line.height = topMargin + elementBox.height + bottomMargin;
                if (textAlignment === 'Right' || (textAlignment === 'Justify' && paraFormat.bidi && isParagraphEnd)) {
                    //Aligns the text as right justified and consider subwidth for bidirectional paragrph with justify.
                    leftMargin = subWidth;
                }
                else if (textAlignment === 'Center') {
                    //Aligns the text as center justified.
                    leftMargin = subWidth / 2;
                }
            }
            elementBox.margin = new Margin(leftMargin, topMargin, 0, bottomMargin);
            elementBox.line = line;
        }
        if (!isNullOrUndefined(line.paragraph.bodyWidget) && !isNullOrUndefined(line.paragraph.bodyWidget.page.headerWidget)
            && line.paragraph.bodyWidget.page.headerWidget.floatingElements.length > 0
            && line.paragraph === line.paragraph.bodyWidget.childWidgets[0]
            && line.indexInOwner === 0) {
            //To check whether first para in the page overlaps with shape in Header.
            this.checkInbetweenShapeOverlap(line, line.paragraph.bodyWidget.page.headerWidget.floatingElements);
        }
        this.checkInbetweenShapeOverlap(line);
        if (line.isLastLine() && line.indexInOwner === 0 && line.paragraph.paragraphFormat.widowControl) {
            var previousSplitWidget = line.paragraph.previousSplitWidget;
            if (!isNullOrUndefined(previousSplitWidget) && !previousSplitWidget.isEndsWithPageBreak) {
                var startLineIndex = previousSplitWidget.childWidgets.length - 1;
                if (previousSplitWidget.childWidgets.length === 2) {
                    startLineIndex = 0;
                }
                this.splitParagraph(previousSplitWidget, startLineIndex, line.paragraph);
                this.updateClientAreaForNextBlock(line, line.paragraph);
            }
        }
        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + line.height);
        this.wrapPosition = [];
    };
    //Checks Inbetween Overlap & Updates Line marginTop
    Layout.prototype.checkInbetweenShapeOverlap = function (line, floatingElements) {
        var _this = this;
        if (!(line.paragraph.containerWidget instanceof TextFrame) && line.paragraph.bodyWidget) {
            var overlapShape_1;
            var lineY_1 = this.getLineY(line);
            var isInsideTable_1 = line.paragraph.isInsideTable;
            if (isNullOrUndefined(floatingElements)) {
                floatingElements = line.paragraph.bodyWidget.floatingElements;
            }
            /* eslint:disable */
            floatingElements.sort(function (a, b) { return a.y - b.y; });
            floatingElements.forEach(function (shape) {
                if (isInsideTable_1 && shape.line && !shape.line.paragraph.isInsideTable || isNullOrUndefined(shape.line)) {
                    return;
                }
                var lineRect;
                if (shape.textWrappingStyle === 'TopAndBottom' && shape instanceof ImageElementBox) {
                    lineRect = new Rect(line.paragraph.x, _this.viewer.clientActiveArea.y, line.paragraph.width, line.children[0].height);
                }
                else {
                    lineRect = new Rect(line.paragraph.x, _this.viewer.clientActiveArea.y, line.paragraph.width, line.height);
                }
                var shapeRect = new Rect(shape.x, shape.y - shape.distanceTop, shape.width, shape.height);
                if (shape.line && _this.isRelayout && !_this.isRelayoutOverlap && _this.viewer.documentHelper.selection.isExistAfter(shape.line.paragraph, line.paragraph)
                    || _this.isRelayout && _this.isRelayoutOverlap && _this.viewer.documentHelper.selection.isExistAfter(shape.line.paragraph, _this.endOverlapWidget)) {
                    return;
                }
                var considerShape = (shape.textWrappingStyle === 'TopAndBottom');
                if (overlapShape_1 && considerShape &&
                    overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom + line.height > shape.y - shape.distanceTop &&
                    overlapShape_1.y - overlapShape_1.distanceTop < shape.y - shape.distanceTop &&
                    shape.y + shape.height + shape.distanceBottom > overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom) {
                    overlapShape_1 = shape;
                    line.marginTop = ((shape.y + shape.height + shape.distanceBottom) - lineY_1);
                }
                else if (considerShape && !overlapShape_1 && lineRect.isIntersecting(shapeRect)) {
                    overlapShape_1 = shape;
                    line.marginTop = ((shape.y + shape.height + shape.distanceBottom) - lineY_1);
                }
            });
            if (overlapShape_1) {
                this.viewer.cutFromTop(overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom);
            }
            else if (this.isRelayoutOverlap) {
                line.marginTop = 0;
            }
        }
    };
    Layout.prototype.getLineY = function (line) {
        var para = line.paragraph;
        var lineY = para.y;
        if (!para.isEmpty()) {
            var lineWidget = para.firstChild;
            while (lineWidget !== line) {
                lineY = lineY + lineWidget.height + lineWidget.marginTop;
                lineWidget = lineWidget.nextLine;
            }
        }
        return lineY;
    };
    Layout.prototype.updateLineWidget = function (line) {
        var spaceHeight = 0;
        var spaceBaseline = 0;
        var isContainsImage = false;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                continue;
            }
            if (element instanceof TextElementBox && element.text.replace(/\s+/g, '').length === 0) {
                if (spaceHeight < element.height) {
                    spaceHeight = element.height;
                    spaceBaseline = element.baselineOffset;
                }
                continue;
            }
            if (element instanceof TextElementBox || element instanceof ListTextElementBox) {
                var elementHeight = element.height;
                var baselineOffset = element.baselineOffset;
                //We have increased the checkbox form field font size using a constant factor `CHECK_BOX_FACTOR`
                //To match the MS Word check box rendering size.
                //Due to it line height also get increased. So, handled adjusting height while updating line height.
                if (element instanceof TextElementBox && element.isCheckBoxElement) {
                    elementHeight = elementHeight / CHECK_BOX_FACTOR;
                    baselineOffset = baselineOffset / CHECK_BOX_FACTOR;
                }
                if (this.maxTextHeight < elementHeight) {
                    this.maxTextHeight = elementHeight;
                    this.maxTextBaseline = baselineOffset;
                }
                if (this.maxBaseline < this.maxTextBaseline) {
                    this.maxBaseline = this.maxTextBaseline;
                }
            }
            else if (this.maxBaseline < element.height) {
                this.maxBaseline = element.height;
                if (element instanceof ImageElementBox) {
                    isContainsImage = true;
                }
            }
        }
        if (this.maxTextHeight === 0 && spaceHeight !== 0) {
            if (isContainsImage) {
                this.maxTextHeight = 0;
                this.maxTextBaseline = 0;
            }
            else {
                if (line.isLastLine() && this.documentHelper.selection) {
                    var paragraphMarkSize = this.documentHelper.selection.getParagraphMarkSize(line.paragraph, 0, 0);
                    this.maxTextHeight = paragraphMarkSize.height;
                    this.maxTextBaseline = spaceBaseline;
                }
                else {
                    this.maxTextHeight = spaceHeight;
                    this.maxTextBaseline = spaceBaseline;
                }
                if (this.maxBaseline < this.maxTextBaseline) {
                    this.maxBaseline = this.maxTextBaseline;
                }
            }
        }
    };
    Layout.prototype.moveToNextPage = function (viewer, line, isPageBreak) {
        if (this.isFootNoteLayoutStart) {
            return;
        }
        var paragraphWidget = line.paragraph;
        var startBlock;
        var startIndex = 0;
        var keepLinesTogether = false;
        var keepWithNext = false;
        if (paragraphWidget && !(!isNullOrUndefined(paragraphWidget.containerWidget) && !isNullOrUndefined(paragraphWidget.containerWidget.containerWidget) && paragraphWidget.containerWidget.containerWidget instanceof FootNoteWidget)) {
            var index = 0;
            if (paragraphWidget instanceof FootNoteWidget) {
                return;
            }
            if (!isNullOrUndefined(line)) {
                index = paragraphWidget.childWidgets.indexOf(line);
                if (index !== 0) {
                    if (paragraphWidget.paragraphFormat.keepLinesTogether && !isNullOrUndefined(paragraphWidget.previousWidget)) {
                        index = 0;
                        keepLinesTogether = true;
                    }
                    else if (index == 1 && !line.previousLine.isEndsWithPageBreak && paragraphWidget.paragraphFormat.widowControl &&
                        !isNullOrUndefined(paragraphWidget.previousWidget)) {
                        index = 0;
                        keepLinesTogether = true;
                    }
                }
                if (index > 0 || isPageBreak) {
                    paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
                }
                if (index === 0 && !paragraphWidget.isEndsWithPageBreak) {
                    var blockInfo = this.alignBlockElement(paragraphWidget);
                    if (!isNullOrUndefined(blockInfo.node)) {
                        startBlock = blockInfo.node instanceof TableRowWidget ? this.splitRow(blockInfo.node) : blockInfo.node;
                        startIndex = startBlock instanceof TableWidget ? 0 : parseInt(blockInfo.position.index, 10);
                        paragraphWidget = startBlock;
                        index = startIndex;
                        keepLinesTogether = false;
                        keepWithNext = true;
                    }
                }
            }
            /* eslint-disable-next-line max-len */
            if (!isNullOrUndefined(paragraphWidget.bodyWidget) && !isNullOrUndefined(paragraphWidget.bodyWidget.containerWidget) && !(paragraphWidget.bodyWidget.containerWidget instanceof FootNoteWidget) && paragraphWidget.bodyWidget.page.footnoteWidget !== undefined) {
                // this.viewer.updateClientAreaForBlock(paragraphWidget.bodyWidget.page.footnoteWidget.block, true);
                this.layoutfootNote(paragraphWidget.bodyWidget.page.footnoteWidget);
                // this.viewer.updateClientAreaForBlock(paragraphWidget.bodyWidget.page.footnoteWidget.block, false);
            }
            var nextBody = this.moveBlocksToNextPage(paragraphWidget, index === 0);
            this.viewer.updateClientArea(nextBody.sectionFormat, nextBody.page);
            this.viewer.updateClientAreaForBlock(paragraphWidget, true);
            if (index > 0) {
                if (line.isLastLine() && isPageBreak) {
                    return;
                }
                var nextParagraph = void 0;
                if (nextBody.firstChild instanceof ParagraphWidget && nextBody.firstChild.equals(paragraphWidget)) {
                    nextParagraph = nextBody.firstChild;
                }
                else {
                    nextParagraph = new ParagraphWidget();
                }
                nextParagraph = this.addParagraphWidget(this.viewer.clientActiveArea, nextParagraph);
                nextParagraph.index = paragraphWidget.index;
                var insertIndex = 0;
                for (var i = index; i < paragraphWidget.childWidgets.length; i++) {
                    var lineWidget = paragraphWidget.childWidgets[i];
                    lineWidget.paragraph = nextParagraph;
                    nextParagraph.childWidgets.splice(insertIndex, 0, lineWidget);
                    lineWidget.paragraph = nextParagraph;
                    insertIndex++;
                }
                nextParagraph.paragraphFormat = paragraphWidget.paragraphFormat;
                nextParagraph.characterFormat = paragraphWidget.characterFormat;
                paragraphWidget.childWidgets.splice(index);
                nextParagraph.containerWidget = nextBody;
                var footWidget = this.getFootNoteWidgetsOf(nextParagraph);
                this.moveFootNotesToPage(footWidget, paragraphWidget.bodyWidget, nextBody);
                paragraphWidget = nextParagraph;
                this.viewer.clientActiveArea.height -= this.getFootNoteHeight(footWidget);
            }
            else if (!isPageBreak) {
                paragraphWidget.containerWidget.removeChild(paragraphWidget.indexInOwner);
                if (paragraphWidget instanceof ParagraphWidget && paragraphWidget.floatingElements.length > 0) {
                    this.addRemoveFloatElementsFromBody(paragraphWidget, paragraphWidget.containerWidget, false);
                }
            }
            if (!isPageBreak) {
                if (nextBody.childWidgets.indexOf(paragraphWidget) === -1) {
                    nextBody.childWidgets.splice(0, 0, paragraphWidget);
                    if (paragraphWidget instanceof ParagraphWidget && paragraphWidget.floatingElements.length > 0) {
                        this.addRemoveFloatElementsFromBody(paragraphWidget, nextBody, true);
                    }
                }
                paragraphWidget.containerWidget = nextBody;
                this.viewer.updateClientAreaLocation(paragraphWidget, this.viewer.clientActiveArea);
                if (keepLinesTogether || keepWithNext) {
                    if (paragraphWidget.bodyWidget.page.footnoteWidget) {
                        this.layoutfootNote(paragraphWidget.bodyWidget.page.footnoteWidget);
                    }
                    if (line.paragraph !== paragraphWidget) {
                        if (paragraphWidget instanceof TableWidget) {
                            this.clearTableWidget(paragraphWidget, true, true, false);
                        }
                        this.layoutBlock(paragraphWidget, 0);
                        viewer.updateClientAreaForBlock(paragraphWidget, false);
                    }
                    var lastBlock = line.paragraph;
                    if (keepWithNext) {
                        var nextBlock = paragraphWidget.nextWidget;
                        if (!isNullOrUndefined(nextBlock)) {
                            do {
                                viewer.updateClientAreaForBlock(nextBlock, true);
                                if (nextBlock !== lastBlock) {
                                    if (nextBlock instanceof TableWidget) {
                                        this.clearTableWidget(nextBlock, true, true, false);
                                    }
                                    this.layoutBlock(nextBlock, 0);
                                    viewer.updateClientAreaForBlock(nextBlock, false);
                                }
                                else {
                                    this.viewer.updateClientAreaLocation(nextBlock, this.viewer.clientActiveArea);
                                    break;
                                }
                                nextBlock = nextBlock.nextWidget;
                            } while (nextBlock);
                        }
                    }
                    this.updateClientAreaForNextBlock(line, lastBlock);
                }
                if (line.isFirstLine() && line.indexInOwner === 0 && !(line.children[0] instanceof ListTextElementBox)) {
                    var firstLineIndent = -HelperMethods.convertPointToPixel(line.paragraph.paragraphFormat.firstLineIndent);
                    this.viewer.updateClientWidth(firstLineIndent);
                }
            }
        }
        if (paragraphWidget instanceof ParagraphWidget &&
            paragraphWidget.floatingElements.length > 0 && !isPageBreak) {
            for (var m = 0; m < paragraphWidget.floatingElements.length; m++) {
                var shape = paragraphWidget.floatingElements[m];
                var position = this.getFloatingItemPoints(shape);
                shape.y = position.y;
                shape.x = position.x;
                if (shape instanceof ShapeElementBox)
                    this.updateChildLocationForCellOrShape(shape.y, shape);
            }
        }
        if (this.isRelayoutOverlap && this.endOverlapWidget) {
            var block_1 = this.endOverlapWidget.previousRenderedWidget;
            var para = line.paragraph;
            this.startOverlapWidget = para;
            line = this.endOverlapWidget.childWidgets[0];
            para = line.paragraph;
            while (para) {
                para.floatingElements.forEach(function (shape) {
                    if (block_1.bodyWidget.floatingElements.indexOf(shape) !== -1) {
                        block_1.bodyWidget.floatingElements.splice(block_1.bodyWidget.floatingElements.indexOf(shape), 1);
                        line.paragraph.bodyWidget.floatingElements.push(shape);
                    }
                });
                para = para !== this.endOverlapWidget ? para.nextWidget : undefined;
            }
            this.layoutStartEndBlocks(this.startOverlapWidget, this.endOverlapWidget);
            this.startOverlapWidget = undefined;
            this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - this.endOverlapWidget.y;
            this.viewer.clientActiveArea.y = this.endOverlapWidget.y;
        }
    };
    /**
     * @param {ParagraphWidget} paragarph - the paragraph
     * @param {BodyWidget} body - the bodyWidget
     * @param {boolean} add - to specify add or remove floating elements from body widget.
     */
    Layout.prototype.addRemoveFloatElementsFromBody = function (paragarph, body, add) {
        if (paragarph.floatingElements.length > 0) {
            for (var x = 0; x < paragarph.floatingElements.length; x++) {
                if (add) {
                    if (body.floatingElements.indexOf(paragarph.floatingElements[x]) === -1) {
                        body.floatingElements.push(paragarph.floatingElements[x]);
                    }
                }
                else {
                    if (body.floatingElements.indexOf(paragarph.floatingElements[x]) !== -1) {
                        body.floatingElements.splice(body.floatingElements.indexOf(paragarph.floatingElements[x]), 1);
                    }
                }
            }
        }
    };
    /**
     * Align block based on keep with next and keep lines together property.
     */
    Layout.prototype.alignBlockElement = function (block) {
        if (block instanceof ParagraphWidget && block.isEndsWithPageBreak) {
            return { node: undefined, position: { index: '' } };
        }
        var startBlock;
        var startIndex = 0;
        // Check previous block has keep with next property.
        var previousBlock = this.getPreviousBlock(block);
        while (previousBlock) {
            if (previousBlock instanceof ParagraphWidget) {
                if (!previousBlock.paragraphFormat.keepWithNext || previousBlock.isEndsWithPageBreak) {
                    break;
                }
                startBlock = previousBlock;
                if (previousBlock.paragraphFormat.keepLinesTogether) {
                    if (isNullOrUndefined(this.getPreviousBlock(previousBlock))) {
                        startBlock = undefined;
                    }
                    else {
                        startIndex = 0;
                    }
                }
                else {
                    if (isNullOrUndefined(this.getPreviousBlock(previousBlock))
                        && previousBlock.childWidgets.length === 1) {
                        startBlock = undefined;
                    }
                    else {
                        if (!previousBlock.paragraphFormat.widowControl) {
                            startIndex = previousBlock.lastChild.indexInOwner;
                        }
                        else {
                            startIndex = previousBlock.lastChild.indexInOwner - 1;
                            if (startIndex === 1 || startIndex < 0) {
                                // Move entire block to next page based on widow control.
                                startIndex = 0;
                            }
                            if (startIndex !== 0) {
                                break;
                            }
                        }
                    }
                }
            }
            else if (previousBlock instanceof TableRowWidget) {
                var childWidget = previousBlock.childWidgets[0];
                if (childWidget.childWidgets.length > 0) {
                    var firstBlock = this.documentHelper.selection.getFirstParagraphInCell(childWidget);
                    if (!firstBlock.paragraphFormat.keepWithNext) {
                        break;
                    }
                    if (firstBlock.paragraphFormat.keepWithNext) {
                        if (isNullOrUndefined(this.getPreviousBlock(previousBlock))) {
                            startBlock = undefined;
                        }
                        else {
                            startBlock = previousBlock;
                            startIndex = startBlock.indexInOwner;
                        }
                    }
                }
                else {
                    break;
                }
                // TODO: Table row splitting case
            }
            previousBlock = this.getPreviousBlock(previousBlock);
        }
        return { node: startBlock, position: { index: startIndex.toString() } };
    };
    Layout.prototype.getPreviousBlock = function (block) {
        var previousBlock;
        if (block instanceof ParagraphWidget) {
            previousBlock = block.previousWidget;
        }
        else if (block instanceof TableRowWidget) {
            previousBlock = block.previousWidget;
            if (isNullOrUndefined(previousBlock)) {
                previousBlock = block.ownerTable.previousWidget;
            }
        }
        if (previousBlock instanceof TableWidget) {
            previousBlock = previousBlock.lastChild;
        }
        return previousBlock;
    };
    Layout.prototype.splitRow = function (startRow) {
        var table = startRow.ownerTable;
        if (startRow.indexInOwner === 0) {
            return table;
        }
        var newTable = this.createTableWidget(table);
        for (var i = startRow.indexInOwner; i < table.childWidgets.length;) {
            var rowWidget = table.childWidgets.splice(i, 1)[0];
            newTable.childWidgets.push(rowWidget);
            rowWidget.containerWidget = newTable;
            table.height -= rowWidget.height;
            newTable.height += rowWidget.height;
        }
        table.containerWidget.childWidgets.splice(table.indexInOwner + 1, 0, newTable);
        newTable.containerWidget = table.containerWidget;
        return newTable;
    };
    Layout.prototype.splitParagraph = function (paragarph, index, nextParagraph) {
        if (index === 0 && isNullOrUndefined(nextParagraph)) {
            return paragarph;
        }
        var isMoveCurrentBlock = false;
        if (isNullOrUndefined(nextParagraph)) {
            nextParagraph = new ParagraphWidget();
            nextParagraph.containerWidget = paragarph.containerWidget;
            paragarph.containerWidget.childWidgets.splice(paragarph.indexInOwner + 1, 0, nextParagraph);
            nextParagraph.paragraphFormat = paragarph.paragraphFormat;
            nextParagraph.characterFormat = paragarph.characterFormat;
            nextParagraph.index = paragarph.index;
        }
        else if (index === 0) {
            isMoveCurrentBlock = true;
            var temp = paragarph;
            paragarph = nextParagraph;
            nextParagraph = temp;
        }
        var insertIndex = 0;
        for (var i = index; i < paragarph.childWidgets.length; i++) {
            var lineWidget = paragarph.childWidgets[i];
            lineWidget.paragraph = nextParagraph;
            if (isMoveCurrentBlock) {
                nextParagraph.childWidgets.push(lineWidget);
            }
            else {
                nextParagraph.childWidgets.splice(insertIndex, 0, lineWidget);
            }
            nextParagraph.height += lineWidget.height;
            paragarph.height -= lineWidget.height;
            lineWidget.paragraph = nextParagraph;
            insertIndex++;
        }
        if (isMoveCurrentBlock) {
            nextParagraph.containerWidget.childWidgets.splice(nextParagraph.indexInOwner, 1);
            nextParagraph.y = paragarph.y;
            nextParagraph.x = paragarph.x;
            nextParagraph.containerWidget = paragarph.containerWidget;
            paragarph.containerWidget.childWidgets.unshift(nextParagraph);
        }
        else {
            paragarph.childWidgets.splice(index);
        }
        if (paragarph.childWidgets.length === 0 || isMoveCurrentBlock) {
            paragarph.containerWidget.childWidgets.splice(paragarph.indexInOwner, 1);
        }
        return nextParagraph;
    };
    Layout.prototype.updateClientPositionForBlock = function (block, currentBlock) {
        var startBlock = (block instanceof TableRowWidget) ? block.ownerTable : block;
        var isClientAreaUpdated = false;
        do {
            this.viewer.updateClientAreaForBlock(startBlock, true);
            if (startBlock instanceof ParagraphWidget) {
                if (currentBlock instanceof ParagraphWidget && currentBlock.equals(startBlock)) {
                    isClientAreaUpdated = true;
                    break;
                }
                this.addParagraphWidget(this.viewer.clientActiveArea, startBlock);
                this.viewer.cutFromTop(this.viewer.clientActiveArea.y + startBlock.height);
                this.viewer.updateClientAreaForBlock(startBlock, false);
            }
            else if (startBlock instanceof TableWidget) {
                this.addTableWidget(this.viewer.clientActiveArea, [startBlock]);
                var nextRow = startBlock.firstChild;
                if (currentBlock instanceof TableRowWidget && startBlock.equals(currentBlock.ownerTable) && !isNullOrUndefined(nextRow)) {
                    do {
                        if (nextRow.equals(currentBlock)) {
                            isClientAreaUpdated = true;
                            break;
                        }
                        this.addTableRowWidget(this.viewer.clientActiveArea, [nextRow]);
                        this.updateChildLocationForRow(this.viewer.clientActiveArea.y, nextRow);
                        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + nextRow.height);
                        startBlock.height += nextRow.height;
                        nextRow = nextRow.nextWidget;
                    } while (nextRow);
                }
                else {
                    this.updateChildLocationForTable(startBlock.y, startBlock);
                    this.viewer.cutFromTop(this.viewer.clientActiveArea.y + startBlock.height);
                    this.viewer.updateClientAreaForBlock(startBlock, false);
                }
            }
            startBlock = startBlock.nextWidget;
        } while (startBlock && !isClientAreaUpdated);
    };
    Layout.prototype.updateClientAreaForNextBlock = function (line, paragraphWidget) {
        for (var m = 0; m < paragraphWidget.childWidgets.length; m++) {
            var child = paragraphWidget.childWidgets[m];
            if (line === child) {
                break;
            }
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + child.height);
        }
    };
    Layout.prototype.layoutStartEndBlocks = function (startBlock, endBlock) {
        var block = startBlock;
        this.isOverlapFloatTable = true;
        this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - startBlock.y;
        this.viewer.clientActiveArea.y = startBlock.y;
        var startParagaraph;
        if (startBlock instanceof TableWidget) {
            startParagaraph = this.documentHelper.selection.getFirstParagraphInFirstCell(startBlock);
        }
        else {
            startParagaraph = startBlock;
        }
        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
            this.viewer.owner.editorModule.updateWholeListItems(startParagaraph);
        }
        while (block) {
            this.viewer.updateClientAreaForBlock(block, true);
            if (block instanceof ParagraphWidget) {
                this.layoutParagraph(block, 0);
            }
            else {
                this.clearTableWidget(block, true, true, true);
                this.layoutTable(block, 0);
            }
            this.viewer.updateClientAreaForBlock(block, false);
            block = block !== endBlock ? block.nextWidget : undefined;
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.alignLineElements = function (element, topMargin, bottomMargin, maxDescent, addSubWidth, subWidth, textAlignment, whiteSpaceCount, isLastElement) {
        if (element.width > 0 && (element instanceof TextElementBox || element instanceof ListTextElementBox)) {
            var textElement = element instanceof TextElementBox ? element : undefined;
            //Updates the text to base line offset.
            var baselineOffset = element instanceof TextElementBox ? textElement.baselineOffset : element.baselineOffset;
            topMargin += this.maxBaseline - baselineOffset;
            bottomMargin += maxDescent - (element.height - baselineOffset);
            //Updates the text to base line offset.
            if (!isNullOrUndefined(textElement) && textAlignment === 'Justify' && whiteSpaceCount > 0) {
                //Aligns the text as Justified.
                var width = textElement.width;
                var text = textElement.text;
                if (!addSubWidth) {
                    text = HelperMethods.trimStart(text); // trim start
                    addSubWidth = (text.length > 0);
                }
                if (addSubWidth) {
                    var spaceCount = text.length - HelperMethods.removeSpace(text).length;
                    if (isLastElement) {
                        spaceCount -= text.length - HelperMethods.trimEnd(text).length;
                    }
                    if (whiteSpaceCount < spaceCount) {
                        width = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text, textElement.characterFormat);
                        spaceCount = whiteSpaceCount;
                    }
                    if (spaceCount > 0) {
                        textElement.width = width + subWidth * spaceCount;
                        whiteSpaceCount -= spaceCount;
                    }
                }
            }
        }
        else {
            addSubWidth = true;
            //Updates the Image/UIElement to base line offset.
            topMargin += this.maxBaseline - element.height;
            bottomMargin += maxDescent;
        }
        return { 'topMargin': topMargin, 'bottomMargin': bottomMargin, 'addSubWidth': addSubWidth, 'whiteSpaceCount': whiteSpaceCount };
    };
    Layout.prototype.updateWidgetToPage = function (viewer, paragraphWidget) {
        if (paragraphWidget.isInsideTable) {
            var cellWidget = paragraphWidget.associatedCell;
            paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
            // if (viewer instanceof PageLayoutViewer) {
            if (isNullOrUndefined(paragraphWidget.associatedCell) || isNullOrUndefined(paragraphWidget.associatedCell.ownerRow)
                || isNullOrUndefined(paragraphWidget.associatedCell.ownerRow.rowFormat)) {
                return;
            }
            if (paragraphWidget.associatedCell.ownerRow.rowFormat.heightType === 'Exactly') {
                cellWidget.height = HelperMethods.convertPointToPixel(paragraphWidget.associatedCell.ownerRow.rowFormat.height);
            }
            else {
                if ([cellWidget].length <= 1 && paragraphWidget.associatedCell.ownerRow.rowFormat.heightType === 'AtLeast') {
                    cellWidget.height = Math.max(HelperMethods.convertPointToPixel(paragraphWidget.associatedCell.ownerRow.rowFormat.height), this.getCellContentHeight(cellWidget));
                }
                else {
                    cellWidget.height = cellWidget.height + paragraphWidget.height;
                }
            }
            // } else {
            //     cellWidget.height = cellWidget.height + paragraphWidget.height;
            // }
            // cellWidget.childWidgets.push(paragraphWidget);
            paragraphWidget.containerWidget = cellWidget;
        }
        else {
            if (!paragraphWidget.isEndsWithPageBreak || viewer instanceof WebLayoutViewer) {
                paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
            }
            //Adds the paragraph widget to the Header Footer/ Body widget.
            // this.updateWidgetsToBody(paragraphWidget, viewer, paragraphWidget);
            //For canvas no need to render paragraph widget here. In case of div, need to render paragraph here.
            // this.render.renderParagraphWidget((paragraphWidget.containerWidget as BodyWidget).page, paragraphWidget);
        }
        if (this.isRelayoutFootnote && paragraphWidget.bodyWidget instanceof FootNoteWidget) {
            if (!paragraphWidget.isInsideTable) {
                paragraphWidget.containerWidget.height += paragraphWidget.height;
            }
            //this.isRelayoutFootnote = false;
            this.shiftFootnoteChildLocation(paragraphWidget.bodyWidget, this.viewer);
        }
        if (paragraphWidget.bodyWidget instanceof HeaderFooterWidget) {
            if (!paragraphWidget.isInsideTable) {
                paragraphWidget.containerWidget.height += paragraphWidget.height;
            }
            if (this.viewer.owner.enableHeaderAndFooter && paragraphWidget.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                this.shiftFooterChildLocation(paragraphWidget.bodyWidget, this.viewer);
            }
        }
        if (viewer instanceof WebLayoutViewer && paragraphWidget.containerWidget instanceof BodyWidget) {
            paragraphWidget.containerWidget.height += paragraphWidget.height;
        }
    };
    Layout.prototype.shiftFooterChildLocation = function (widget, viewer) {
        var pageHeight = widget.page.bodyWidgets[0].sectionFormat.pageHeight;
        if (widget.headerFooterType.indexOf('Footer') !== -1) {
            var footerDistance = widget.page.bodyWidgets[0].sectionFormat.footerDistance;
            var height = HelperMethods.convertPointToPixel(pageHeight - footerDistance);
            var top_1;
            if (widget.y + widget.height > height) {
                top_1 = height - (widget.y + widget.height);
            }
            else if (widget.y + widget.height < height) {
                top_1 = (widget.y + widget.height) - height;
            }
            if (!isNullOrUndefined(top_1)) {
                top_1 = height - (widget.y + widget.height);
                this.shiftChildLocation(top_1, widget);
                viewer.clientActiveArea.y += top_1;
            }
        }
    };
    Layout.prototype.shiftFootnoteChildLocation = function (widget, viewer) {
        var pageHeight = widget.page.bodyWidgets[0].sectionFormat.pageHeight;
        var footerDistance = widget.page.bodyWidgets[0].sectionFormat.footerDistance;
        var bottomMargin = widget.page.bodyWidgets[0].sectionFormat.bottomMargin;
        var height = HelperMethods.convertPointToPixel(pageHeight - bottomMargin);
        var top;
        if (widget.y + widget.height > height) {
            top = height - (widget.y + widget.height);
        }
        else if (widget.y + widget.height < height) {
            top = (widget.y + widget.height) - height;
        }
        if (!isNullOrUndefined(top)) {
            top = height - (widget.y + widget.height);
            this.shiftChildLocation(top, widget);
            viewer.clientActiveArea.y += top;
        }
    };
    Layout.prototype.checkPreviousElement = function (line, index, characterFormat) {
        var paragraph = line.paragraph;
        var isSplitByWord = false;
        var lastTextElement = 0;
        for (var i = index - 1; i >= 0; i--) {
            var textElement = line.children[i];
            if (textElement instanceof TextElementBox && textElement.width > 0) {
                var text = textElement.text;
                lastTextElement = i;
                if (text.length > 0 && (text[text.length - 1] === ' ' || text[text.length - 1] === '-')) {
                    if (i === index - 1) {
                        this.addSplittedLineWidget(line, index - 1);
                        return true;
                    }
                    isSplitByWord = true;
                    break;
                }
                else if (text === '\t') {
                    return false;
                }
                else if (text.indexOf(' ') >= 0) {
                    isSplitByWord = true;
                    var index_1 = text.lastIndexOf(' ') + 1;
                    //Splits the text element by space.
                    var splittedElement = new TextElementBox();
                    splittedElement.text = text.substr(index_1);
                    splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                    splittedElement.characterRange = textElement.characterRange;
                    if (textElement.revisions.length > 0) {
                        this.updateRevisionForSplittedElement(textElement, splittedElement, index_1 > 0);
                        splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                    }
                    textElement.text = text.substr(0, index_1);
                    this.documentHelper.textHelper.getTextSize(splittedElement, characterFormat);
                    textElement.width -= splittedElement.width;
                    textElement.height = splittedElement.height;
                    if (textElement.width === 0) {
                        line.children.splice(i, 1);
                    }
                    //Adds the text element to the line
                    line.children.splice(i + 1, 0, splittedElement);
                    break;
                }
            }
            else if (!(textElement instanceof ListTextElementBox || textElement instanceof FieldElementBox
                // to skip field code
                || textElement instanceof TextElementBox && textElement.width === 0)) {
                //Handled for inline images/UIelements.
                lastTextElement = i;
                isSplitByWord = true;
                break;
            }
        }
        if (isSplitByWord) {
            lastTextElement++;
            if (lastTextElement < line.children.length) {
                var splitWidth = 0;
                for (var i = lastTextElement; i < line.children.length; i++) {
                    splitWidth += line.children[i].width;
                    this.addSplittedLineWidget(line, i - 1);
                    i--;
                }
                var is2013Justification = paragraph.paragraphFormat.textAlignment === 'Justify' &&
                    this.documentHelper.compatibilityMode === 'Word2013';
                if (!is2013Justification) {
                    this.viewer.updateClientWidth(splitWidth);
                }
            }
        }
        return isSplitByWord;
    };
    Layout.prototype.clearListElementBox = function (paragraph) {
        if (paragraph.childWidgets.length === 0) {
            return;
        }
        var line = paragraph.childWidgets[0];
        if (isNullOrUndefined(line.children)) {
            return;
        }
        for (var i = line.children.length - 1; i > 0; i--) {
            if (line.children[i] instanceof ListTextElementBox) {
                line.children.splice(i, 1);
            }
            else {
                break;
            }
        }
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof ListTextElementBox) {
                line.children.splice(i, 1);
                i--;
            }
            else {
                break;
            }
        }
    };
    /**
 * @private
 */
    Layout.prototype.clearInvalidList = function (list) {
        if (list) {
            if (list.abstractListId === -1 && this.documentHelper.abstractLists.indexOf(list.abstractList) !== -1) {
                this.documentHelper.abstractLists.splice(this.documentHelper.abstractLists.indexOf(list.abstractList), 1);
            }
            if (list.listId === -1 && this.documentHelper.lists.indexOf(list) !== -1) {
                this.documentHelper.lists.splice(this.documentHelper.lists.indexOf(list), 1);
            }
        }
    };
    Layout.prototype.getListNumber = function (listFormat, isAutoList) {
        var list = this.documentHelper.getListById(listFormat.listId);
        var levelNumber = listFormat.listLevelNumber;
        var listLevel = this.getListLevel(list, listFormat.listLevelNumber);
        var levelOverride = !isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[levelNumber] : undefined;
        // If LevelOverride exists and have either override list level or StartAtOverride, then only list numbering will be restarted.
        if (!isNullOrUndefined(levelOverride) && this.documentHelper.renderedLevelOverrides.indexOf(levelOverride) === -1 && isNullOrUndefined(levelOverride.overrideListLevel)) {
            //Add List Override style
            this.documentHelper.renderedLevelOverrides.push(levelOverride);
            var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            if (this.documentHelper.renderedLists.containsKey(abstractList)) {
                var levels = this.documentHelper.renderedLists.get(abstractList);
                if (levels.containsKey(levelNumber)) {
                    levels.remove(levelNumber);
                    this.ClearSubListLevelValues(list, abstractList, levelNumber);
                }
            }
        }
        if (isNullOrUndefined(isAutoList)) {
            this.updateListValues(list, levelNumber);
        }
        return this.getListText(list, levelNumber, listLevel);
    };
    Layout.prototype.ClearSubListLevelValues = function (list, abstractList, levelNumber) {
        var levels = this.documentHelper.renderedLists.get(abstractList);
        var levelNumberTemp = levelNumber + 1;
        while (levelNumberTemp < abstractList.levels.length) {
            var listLevel = this.getListLevel(list, levelNumberTemp);
            if (levels.containsKey(levelNumberTemp) && listLevel.restartLevel > levelNumber) {
                levels.remove(levelNumberTemp);
            }
            levelNumberTemp++;
        }
    };
    Layout.prototype.getListStartValue = function (listLevelNumber, list) {
        var levelOverride = !isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[listLevelNumber] : undefined;
        if (!isNullOrUndefined(levelOverride) && isNullOrUndefined(levelOverride.overrideListLevel)) {
            return levelOverride.startAt;
        }
        var listLevel = this.getListLevel(list, listLevelNumber);
        if (isNullOrUndefined(listLevel)) {
            return 0;
        }
        else {
            return listLevel.startAt;
        }
    };
    Layout.prototype.updateListValues = function (list, listLevelNumber) {
        var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
        if (!this.documentHelper.renderedLists.containsKey(abstractList)) {
            var startVal = new Dictionary();
            this.documentHelper.renderedLists.add(abstractList, startVal);
            var listLevel = this.getListLevel(list, listLevelNumber);
            for (var i = 0; i <= listLevelNumber; i++) {
                startVal.add(i, this.getListStartValue(i, list));
            }
        }
        else {
            var levels = this.documentHelper.renderedLists.get(abstractList);
            if (levels.containsKey(listLevelNumber)) {
                var startAt = levels.get(listLevelNumber);
                levels.set(listLevelNumber, startAt + 1);
                var levelNumber = listLevelNumber + 1;
                while (levelNumber < this.documentHelper.getAbstractListById(list.abstractListId).levels.length) {
                    var listLevel = this.getListLevel(list, levelNumber);
                    // if (!isNullOrUndefined(listLevel)) {
                    if (levels.containsKey(levelNumber) && listLevel.restartLevel > listLevelNumber) {
                        levels.remove(levelNumber);
                        // if (document.renderedListLevels.indexOf(listLevel) > -1) {
                        //     document.renderedListLevels.pop();
                        // }
                    }
                    // }
                    levelNumber++;
                }
            }
            else {
                var levelNumber = listLevelNumber;
                while (!levels.containsKey(levelNumber - 1) && levelNumber > 0) {
                    var listLevel = this.getListLevel(list, levelNumber - 1);
                    // if (!isNullOrUndefined(listLevel)) {
                    levels.add(levelNumber - 1, this.getListStartValue(levelNumber - 1, list));
                    // if (document.renderedListLevels.indexOf(listLevel) !== -1) {
                    //     document.renderedListLevels.push(listLevel);
                    // }
                    // }
                    levelNumber--;
                }
                var startAt = this.getListStartValue(listLevelNumber, list);
                levels.add(listLevelNumber, startAt);
            }
        }
    };
    Layout.prototype.getListText = function (listAdv, listLevelNumber, currentListLevel) {
        var listText = currentListLevel.numberFormat;
        if (this.documentHelper.renderedLists.containsKey(this.documentHelper.getAbstractListById(listAdv.abstractListId))) {
            var levels = this.documentHelper.renderedLists.get(this.documentHelper.getAbstractListById(listAdv.abstractListId));
            var keys = levels.keys;
            for (var i = 0; i < keys.length; i++) {
                var levelNumber = keys[i];
                var levelKey = '%' + (levelNumber + 1).toString();
                var listLevel = this.getListLevel(listAdv, levelNumber);
                if (listText.match(levelKey)) {
                    if (levelNumber > listLevelNumber) {
                        return '';
                    }
                    else if (levels.containsKey(levelNumber) && !isNullOrUndefined(listLevel)) {
                        listText = listText.replace(levelKey, this.getListTextListLevel(listLevel, levels.get(levelNumber)));
                    }
                    else {
                        listText = listText.replace(levelKey, '0');
                    }
                }
            }
        }
        return listText;
    };
    Layout.prototype.getAsLetter = function (number) {
        // if (number <= 0) {
        //     return '';
        // }
        var quotient = number / 26;
        var remainder = number % 26;
        if (remainder === 0) {
            //If number denotes the factor of 26, then reduce quotient by 1 and set remainder as 26.
            remainder = 26;
            quotient--;
        }
        //Index of A char in the ASCII table.     
        var letter = String.fromCharCode(65 - 1 + remainder);
        var listValue = '';
        while (quotient >= 0) {
            listValue = listValue + letter.toString();
            quotient--;
        }
        return listValue;
    };
    Layout.prototype.getListTextListLevel = function (listLevel, listValue) {
        switch (listLevel.listLevelPattern) {
            case 'UpRoman':
                return this.getAsRoman(listValue).toUpperCase();
            case 'LowRoman':
                return this.getAsRoman(listValue).toLowerCase();
            case 'UpLetter':
                return this.getAsLetter(listValue).toUpperCase();
            case 'LowLetter':
                return this.getAsLetter(listValue).toLowerCase();
            case 'Arabic':
                return (listValue).toString();
            case 'LeadingZero':
                return this.getAsLeadingZero(listValue);
            case 'Number':
                return (listValue).toString();
            case 'OrdinalText':
                return (listValue).toString();
            case 'Ordinal':
                return (listValue).toString();
            case 'FarEast':
                return (listValue).toString();
            case 'Special':
                return (listValue).toString();
            default:
                return '';
        }
    };
    Layout.prototype.getFootEndNote = function (numberFormat, value) {
        switch (numberFormat) {
            case 'UpperCaseRoman':
                return this.getAsRoman(value).toUpperCase();
            case 'LowerCaseRoman':
                return this.getAsRoman(value).toLowerCase();
            case 'UpperCaseLetter':
                return this.getAsLetter(value).toUpperCase();
            case 'LowerCaseLetter':
                return this.getAsLetter(value).toLowerCase();
            default:
                return (value).toString();
        }
    };
    Layout.prototype.generateNumber = function (number, magnitude, letter) {
        var numberstring = '';
        while (number >= magnitude) {
            number -= magnitude;
            numberstring += letter;
            this.value = number;
        }
        return numberstring.toString();
    };
    Layout.prototype.getAsLeadingZero = function (listValue) {
        if (listValue < 10) {
            return '0' + listValue.toString();
        }
        else {
            return listValue.toString();
        }
    };
    Layout.prototype.getAsRoman = function (number) {
        var retval = '';
        this.value = number;
        retval += this.generateNumber(this.value, 1000, 'M');
        retval += this.generateNumber(this.value, 900, 'CM');
        retval += this.generateNumber(this.value, 500, 'D');
        retval += this.generateNumber(this.value, 400, 'CD');
        retval += this.generateNumber(this.value, 100, 'C');
        retval += this.generateNumber(this.value, 90, 'XC');
        retval += this.generateNumber(this.value, 50, 'L');
        retval += this.generateNumber(this.value, 40, 'XL');
        retval += this.generateNumber(this.value, 10, 'X');
        retval += this.generateNumber(this.value, 9, 'IX');
        retval += this.generateNumber(this.value, 5, 'V');
        retval += this.generateNumber(this.value, 4, 'IV');
        retval += this.generateNumber(this.value, 1, 'I');
        return retval.toString();
    };
    Layout.prototype.getListLevel = function (list, listLevelNumber) {
        if (!isNullOrUndefined(list)) {
            var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            if (!isNullOrUndefined(list) && abstractList.levels.length <= listLevelNumber
                && listLevelNumber >= 0 && listLevelNumber < 9) {
                this.addListLevels(abstractList);
            }
            var levelOverrideAdv = undefined;
            var level = false;
            level = (!isNullOrUndefined(list.levelOverrides))
                && !isNullOrUndefined(((levelOverrideAdv = list.levelOverrides[listLevelNumber])))
                && (!isNullOrUndefined(levelOverrideAdv.overrideListLevel));
            if (level) {
                return levelOverrideAdv.overrideListLevel;
            }
            else if (!isNullOrUndefined(abstractList) && listLevelNumber >= 0 && listLevelNumber < abstractList.levels.length) {
                return abstractList.levels[listLevelNumber];
            }
        }
        return undefined;
    };
    Layout.prototype.getTabWidth = function (paragraph, viewer, index, lineWidget, element) {
        var fPosition = 0;
        var isCustomTab = false;
        var tabs = paragraph.paragraphFormat.getUpdatedTabs();
        var isList = false;
        var sectionFormat = paragraph.bodyWidget.sectionFormat;
        var leftMargin = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
        if (!isNullOrUndefined(paragraph.paragraphFormat.listFormat.listLevel) && !isNullOrUndefined(paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat)) {
            var listFormat = paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat;
            if (paragraph.paragraphFormat.leftIndent !== listFormat.leftIndent) {
                isList = true;
            }
        }
        var clientWidth = 0;
        var clientActiveX = viewer.clientActiveArea.x;
        var firstLineIndent = HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
        var leftIndent = HelperMethods.convertPointToPixel(paragraph.paragraphFormat.leftIndent);
        if (!isNullOrUndefined(element) && lineWidget.isFirstLine()) {
            clientWidth = this.viewer.clientArea.x + firstLineIndent;
            if (isList) {
                clientActiveX = clientActiveX + firstLineIndent;
            }
        }
        else {
            clientWidth = this.viewer.clientArea.x;
        }
        if (clientActiveX < clientWidth) {
            return viewer.clientArea.x - viewer.clientActiveArea.x;
        }
        if (lineWidget.isFirstLine()
            && leftIndent > 0 && firstLineIndent < 0) {
            if ((viewer.clientArea.x - viewer.clientActiveArea.x) > 0) {
                return viewer.clientArea.x - viewer.clientActiveArea.x;
            }
            else if (tabs.length === 0 && paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listLevel) {
                tabs = paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat.tabs;
            }
        }
        // Calculates tabwidth based on pageleftmargin and defaulttabwidth property
        var position = viewer.clientActiveArea.x -
            (viewer.clientArea.x - HelperMethods.convertPointToPixel(paragraph.paragraphFormat.leftIndent));
        var defaultTabWidth = HelperMethods.convertPointToPixel(this.documentHelper.defaultTabWidth);
        if (tabs.length === 0 && (position > 0 && defaultTabWidth > Math.round(position) && isList ||
            defaultTabWidth === this.defaultTabWidthPixel && defaultTabWidth > Math.round(position))) {
            return defaultTabWidth - position;
        }
        else {
            var breaked = false;
            if (tabs.length > 0) {
                for (var i = tabs.length - 1; i > -1; i--) {
                    var tabStop = tabs[i];
                    var tabPosition = HelperMethods.convertPointToPixel(tabStop.position);
                    if (!(parseFloat(tabPosition.toFixed(2)) > parseFloat(position.toFixed(2)))) {
                        if (i > 0 && (HelperMethods.convertPointToPixel(tabs[i - 1].position) > parseFloat(position.toFixed(2)))) {
                            continue;
                        }
                        if (i != tabs.length - 1) {
                            var tabInfo = this.getJustificationTabWidth(tabs[i + 1], element, lineWidget, paragraph, defaultTabWidth, position, fPosition);
                            defaultTabWidth = tabInfo.defaultTabWidth;
                            fPosition = tabInfo.fPosition;
                            position = tabInfo.position;
                            isCustomTab = true;
                        }
                        breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    var tabJustification = this.getJustificationTabWidth(tabs[0], element, lineWidget, paragraph, defaultTabWidth, position, fPosition);
                    defaultTabWidth = tabJustification.defaultTabWidth;
                    fPosition = tabJustification.fPosition;
                    position = tabJustification.position;
                    isCustomTab = true;
                }
            }
            if (!isCustomTab) {
                var diff = parseFloat(((position * 100) % (defaultTabWidth * 100) / 100).toFixed(2));
                var cnt = (position - diff) / defaultTabWidth;
                fPosition = (cnt + 1) * defaultTabWidth;
            }
            if (parseFloat(fPosition.toFixed(1)) === parseFloat(position.toFixed(1))) {
                return defaultTabWidth;
            }
            return (fPosition - position) > 0 ? fPosition - position : defaultTabWidth;
        }
    };
    Layout.prototype.getJustificationTabWidth = function (tab, element, lineWidget, paragraph, defaultTabWidth, position, fPosition) {
        var elementWidth = element ? this.documentHelper.textHelper.getTextSize(element, element.characterFormat) : 0;
        if (tab.tabJustification === 'Left' || tab.tabJustification === 'List') {
            fPosition = HelperMethods.convertPointToPixel(tab.position);
            if (element instanceof TabElementBox) {
                element.tabLeader = tab.tabLeader;
                element.tabText = '';
            }
        }
        else {
            var tabWidth = HelperMethods.convertPointToPixel(tab.position) - position;
            var width = this.getRightTabWidth(element.indexInOwner + 1, lineWidget, paragraph);
            if (width < tabWidth && tab.tabJustification != 'Decimal') {
                if (tab.tabJustification === 'Right') {
                    defaultTabWidth = tabWidth - width;
                    var rightIndent = HelperMethods.convertPointToPixel(paragraph.rightIndent);
                    var areaWidth = this.viewer.clientActiveArea.width + rightIndent - defaultTabWidth;
                    this.viewer.clientActiveArea.width += rightIndent;
                    if (areaWidth < 0) {
                        defaultTabWidth += areaWidth - width;
                    }
                    else if (width > areaWidth) {
                        defaultTabWidth -= width - areaWidth;
                    }
                }
                else {
                    defaultTabWidth = tabWidth - width / 2;
                }
            }
            else if (tab.tabJustification === 'Center' && (width / 2) < tabWidth) {
                defaultTabWidth = tabWidth - width / 2;
            }
            else if (tab.tabJustification === 'Decimal') {
                if (!isNullOrUndefined(element.nextElement) && element.nextElement instanceof TextElementBox) {
                    var nextElement = element.nextElement;
                    if (nextElement.text.indexOf(".") != -1) {
                        var index = nextElement.text.indexOf(".");
                        var text = nextElement.text.substring(0, index);
                        var textWidth = this.documentHelper.textHelper.getWidth(text, nextElement.characterFormat);
                        defaultTabWidth = tabWidth - textWidth;
                    }
                    else if (width < tabWidth) {
                        defaultTabWidth = tabWidth - width;
                    }
                    else {
                        defaultTabWidth = tabWidth;
                    }
                }
                else {
                    defaultTabWidth = tabWidth;
                }
            }
            else {
                defaultTabWidth = tab.tabJustification === 'Right' ? 0 : elementWidth;
            }
            fPosition = position;
            if (element instanceof TabElementBox) {
                element.tabLeader = tab.tabLeader;
                element.tabText = '';
            }
        }
        return {
            defaultTabWidth: defaultTabWidth,
            fPosition: fPosition,
            position: position
        };
    };
    Layout.prototype.getRightTabWidth = function (index, lineWidget, paragraph) {
        var width = 0;
        var isFieldCode = false;
        var elementBox = lineWidget.children[index];
        while (elementBox) {
            if ((elementBox instanceof FieldElementBox) || (elementBox instanceof BookmarkElementBox) || isFieldCode) {
                if (elementBox instanceof FieldElementBox) {
                    if (elementBox.fieldType === 0) {
                        isFieldCode = true;
                    }
                    else if (elementBox.fieldType === 2) {
                        isFieldCode = false;
                    }
                }
                elementBox.width = 0;
            }
            else {
                if (elementBox instanceof FieldTextElementBox && !this.isTocField(elementBox.fieldBegin)) {
                    var text = this.documentHelper.getFieldResult(elementBox.fieldBegin, elementBox.paragraph.bodyWidget.page);
                    if (text !== '') {
                        elementBox.text = text;
                    }
                }
                if (elementBox instanceof TextElementBox) {
                    this.documentHelper.textHelper.getTextSize(elementBox, elementBox.characterFormat);
                }
            }
            if (elementBox instanceof TextElementBox && elementBox.text === '\t') {
                return width;
            }
            else {
                width = width + elementBox.width;
            }
            elementBox = elementBox.nextNode;
        }
        return width;
    };
    Layout.prototype.getSplitIndexByWord = function (clientActiveWidth, text, width, characterFormat) {
        var index = 0;
        var length = text.length;
        while (index < length) {
            var nextIndex = this.getTextIndexAfterSpace(text, index);
            if (nextIndex === 0 || nextIndex === length) {
                nextIndex = length - 1;
            }
            var splitWidth = width;
            if ((nextIndex < length - 1 || (nextIndex === length - 1 && text[nextIndex - 1] === ' ')) && index !== nextIndex) {
                splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.slice(0, nextIndex), characterFormat);
            }
            if (splitWidth <= clientActiveWidth) {
                index = nextIndex;
            }
            else {
                if (index === 0 && text[0] === ' ') {
                    index = this.getTextIndexAfterSpace(text, 0);
                }
                break;
            }
        }
        return index;
    };
    Layout.prototype.getTextSplitIndexByCharacter = function (totalClientWidth, clientActiveAreaWidth, text, width, characterFormat) {
        var length = text.length;
        for (var i = 0; i < length; i++) {
            var splitWidth = width;
            if (i + 1 < length) {
                splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.substring(0, i + 1), characterFormat);
            }
            if (splitWidth > clientActiveAreaWidth) {
                if (i === 0 && splitWidth > totalClientWidth) {
                    //Handle for cell/section having client width less than a character's width.
                    return (length > 1 && text[1] === ' ') ? this.getTextIndexAfterSpace(text, 1) : 1;
                }
                return i;
            }
        }
        return 0;
    };
    Layout.prototype.getSubWidth = function (lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd) {
        var width = 0;
        var trimSpace = true;
        var lineText = '';
        var trimmedSpaceWidth = 0;
        if (this.wrapPosition.length > 0) {
            var subWidths = this.getSubWidthBasedOnTextWrap(lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd);
            if (subWidths.length > 0) {
                return subWidths;
            }
        }
        var renderElementBox = lineWidget.renderedElements;
        for (var i = renderElementBox.length - 1; i >= 0; i--) {
            var element = renderElementBox[i];
            if (element.width > 0 && element instanceof TextElementBox) {
                var elementText = element.text;
                lineText = elementText + lineText;
                if (trimSpace && (elementText.trim() !== '' || elementText === '\t')) {
                    if (HelperMethods.endsWith(elementText)) {
                        var widthExcludeSpace = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(elementText, element.characterFormat);
                        width += widthExcludeSpace;
                        // Trimmed space width can be found by subtracting the actual width and width exclude end space.
                        trimmedSpaceWidth += element.width - widthExcludeSpace;
                    }
                    else {
                        width += element.width;
                    }
                    trimSpace = false;
                }
                else if (!trimSpace) {
                    width += element.width;
                }
                else {
                    ////Add the width of the textelement which contains space alone and present at end of the line.
                    trimmedSpaceWidth += element.width;
                }
            }
            else {
                lineText = 'a' + lineText;
                trimSpace = false;
                if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                    continue;
                }
                width += element.width;
            }
            if (!justify) {
                width = Math.round(width);
            }
            else {
                width = width;
            }
        }
        var totalSpaceCount = lineText.length - HelperMethods.removeSpace(lineText).length;
        lineText = lineText.trim();
        spaceCount = lineText.length - HelperMethods.removeSpace(lineText).length;
        var subWidth = (this.viewer.clientArea.width - firstLineIndent - width);
        if ((subWidth <= 0 && !this.is2013Justification) || (spaceCount === 0 && justify && !lineWidget.paragraph.paragraphFormat.bidi)) {
            spaceCount = 0;
            subWidth = 0;
        }
        else if (justify) {
            // For justify alignment, element width will be updated based space count value.
            // So when the element is paragraph end, need to set space count to zero.
            if (!isParagraphEnd && spaceCount > 0 || (isParagraphEnd && this.is2013Justification && spaceCount > 0)) {
                subWidth = subWidth / spaceCount;
            }
            else {
                spaceCount = 0;
            }
        }
        ////Generally, trailing space of line should get trimmed, if alignment type is Right or Left.
        ////But, if right-to-left rendering is enabled and it is last line of paragraph than the trailing space should be preserved.
        ////So, subtracted the trimmedSpaceWidth from subWidth.
        else if (trimmedSpaceWidth > 0 && lineWidget.paragraph.paragraphFormat.bidi && isParagraphEnd) {
            subWidth -= trimmedSpaceWidth;
        }
        // So set sub width to zero to layout the element in left alignment
        // Need to remove is once after implementing subwidth update separatly
        return [{ 'subWidth': subWidth, 'spaceCount': spaceCount, 'totalSpaceCount': totalSpaceCount }];
    };
    Layout.prototype.getSubWidthBasedOnTextWrap = function (lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd) {
        var subWidths = [];
        var width = 0;
        var lineContent = '';
        var wrapIndex = this.wrapPosition.length - 1;
        var trimSpace = true;
        for (var z = lineWidget.children.length - 1; z >= 0; z--) {
            var elementBox = lineWidget.children[z];
            if (elementBox.width > 0 && elementBox instanceof TextElementBox) {
                var elementText = elementBox.text;
                lineContent = elementText + lineContent;
                if (trimSpace && (elementText.trim() !== '' || elementText === '\t')) {
                    if (HelperMethods.endsWith(elementText)) {
                        width += this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(elementText, elementBox.characterFormat);
                    }
                    else {
                        width += elementBox.width;
                    }
                    trimSpace = false;
                }
                else if (!trimSpace) {
                    width += elementBox.width;
                }
            }
            else {
                lineContent = 'a' + lineContent;
                trimSpace = false;
                if (!(elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline')) {
                    width += elementBox.width;
                }
            }
            if ((elementBox.padding.left > 0 || z === 0) && (wrapIndex >= 0)) {
                var wrapPosition = this.wrapPosition[wrapIndex--];
                while (wrapPosition.width <= 0 && (wrapIndex >= 0)) {
                    wrapPosition = this.wrapPosition[wrapIndex--];
                }
                var info = this.getSubWidthInfo(lineWidget, wrapPosition.width, width, lineContent, spaceCount, justify, isParagraphEnd);
                if (!isNullOrUndefined(info)) {
                    width = 0;
                    lineContent = '';
                    subWidths.unshift(info);
                }
            }
        }
        return subWidths;
    };
    /**
     * Returns the total space width in line widget.
     * @param {LineWidget} lineWidget - the line widget
     * @returns {number} the total space width.
     */
    Layout.prototype.getTotalSpaceWidth = function (lineWidget) {
        var totalSpaceWidth = 0;
        if (lineWidget) {
            for (var i = 0; i < lineWidget.children.length; i++) {
                var currentWidget = lineWidget.children[i];
                if (currentWidget instanceof TextElementBox) {
                    var spaceCount = currentWidget.text.length - HelperMethods.removeSpace(currentWidget.text).length;
                    if (spaceCount > 0) {
                        var spaceWidth = this.documentHelper.textHelper.getWidth(' ', currentWidget.characterFormat);
                        totalSpaceWidth += spaceCount * spaceWidth;
                    }
                }
            }
        }
        return totalSpaceWidth;
    };
    Layout.prototype.getSubWidthInfo = function (lineWidget, lastWrapPositionWidth, width, lineContent, spaceCount, justify, isParagraphEnd) {
        if (lastWrapPositionWidth > 0) {
            var wrappedSubWidth = lastWrapPositionWidth - width;
            lineContent = lineContent.trim();
            spaceCount = lineContent.length - HelperMethods.removeSpace(lineContent).length;
            // TODO: Consider first line indent.
            var totalSubWidth = wrappedSubWidth;
            if (totalSubWidth <= 0 || (spaceCount === 0 && justify && !lineWidget.paragraph.paragraphFormat.bidi)) {
                spaceCount = 0;
                totalSubWidth = 0;
            }
            else if (justify) {
                // For justify alignment, element width will be updated based space count value.
                // So when the element is paragraph end, need to set space count to zero.
                if (!isParagraphEnd && spaceCount > 0) {
                    totalSubWidth = totalSubWidth / spaceCount;
                }
                else {
                    spaceCount = 0;
                }
            }
            return { 'subWidth': totalSubWidth, 'spaceCount': spaceCount, 'totalSpaceCount': spaceCount };
        }
        return undefined;
    };
    Layout.prototype.getBeforeSpacing = function (paragraph, pageIndex) {
        var beforeSpacing = 0;
        if (!this.documentHelper.dontUseHtmlParagraphAutoSpacing) {
            var previousBlock = paragraph.previousWidget;
            if (previousBlock instanceof ParagraphWidget) {
                var afterSpacing = this.getAfterSpacing(previousBlock);
                var before = paragraph.paragraphFormat.beforeSpacing;
                if (paragraph.paragraphFormat.spaceBeforeAuto) {
                    before = 14;
                }
                if (afterSpacing < before) {
                    beforeSpacing = before - afterSpacing;
                }
            }
            else if (previousBlock instanceof TableWidget) {
                if (paragraph.paragraphFormat.spaceBeforeAuto) {
                    beforeSpacing = 14;
                }
                else {
                    beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                }
            }
            else {
                if (pageIndex > 0 && paragraph === paragraph.bodyWidget.childWidgets[0]) {
                    if (this.documentHelper.pages[pageIndex].sectionIndex !== this.documentHelper.pages[pageIndex - 1].sectionIndex) {
                        if (paragraph.paragraphFormat.spaceBeforeAuto) {
                            beforeSpacing = 14;
                        }
                        else {
                            beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                        }
                    }
                }
                else {
                    if (paragraph.paragraphFormat.spaceBeforeAuto) {
                        beforeSpacing = 0;
                    }
                    else {
                        beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                    }
                }
            }
        }
        else {
            beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
        }
        if (this.isSameStyle(paragraph, false)) {
            return 0;
        }
        else {
            return HelperMethods.convertPointToPixel(beforeSpacing);
        }
    };
    Layout.prototype.getAfterSpacing = function (paragraph) {
        var afterSpacing = paragraph.paragraphFormat.afterSpacing;
        if (!this.documentHelper.dontUseHtmlParagraphAutoSpacing && paragraph.paragraphFormat.spaceAfterAuto) {
            if (isNullOrUndefined(paragraph.nextWidget) && paragraph.isInsideTable) {
                afterSpacing = 0;
            }
            else {
                afterSpacing = 14;
            }
        }
        if (this.isSameStyle(paragraph, true)) {
            return 0;
        }
        else {
            return afterSpacing;
        }
    };
    Layout.prototype.getLineSpacing = function (paragraph, maxHeight, alterLineSpacing) {
        if (isNullOrUndefined(paragraph.paragraphFormat)) {
            return 0;
        }
        var lineSpacing = 0;
        switch (paragraph.paragraphFormat.lineSpacingType) {
            case 'AtLeast':
            case 'Exactly':
                lineSpacing = HelperMethods.convertPointToPixel(paragraph.paragraphFormat.lineSpacing);
                break;
            default:
                lineSpacing = paragraph.paragraphFormat.lineSpacing;
                if (alterLineSpacing) {
                    lineSpacing = lineSpacing - 1;
                }
                lineSpacing = lineSpacing * maxHeight;
                break;
        }
        return lineSpacing;
    };
    Layout.prototype.isParagraphFirstLine = function (paragraph, line) {
        var widget = paragraph;
        if (isNullOrUndefined(widget.childWidgets) || widget.childWidgets.indexOf(line) === 0) {
            //If the line elements conatins the elements from previous paragraph then need to retun false.
            //Example scenario, Field start and field end in different paragraphs.
            if (line.children.length > 0 && !isNullOrUndefined(paragraph.previousWidget)
                && paragraph.previousWidget instanceof ParagraphWidget) {
                return line.paragraph.index !== paragraph.previousWidget.index;
            }
            return true; //If the line elements count is zero then also need to return true.
        }
        return false;
    };
    Layout.prototype.isParagraphLastLine = function (element) {
        var paragraph = element.line.paragraph;
        var lastLineWidget = paragraph.childWidgets[paragraph.childWidgets.length - 1];
        var lastInline = lastLineWidget.children[lastLineWidget.children.length - 1];
        if (element === lastInline) {
            return (lastInline instanceof FieldElementBox) || ((!(lastInline instanceof TextElementBox && lastInline.text === '\v')));
        }
        return false;
    };
    Layout.prototype.getTextIndexAfterSpace = function (text, startIndex) {
        var length = text.length;
        var index = 0;
        index = text.indexOf(' ', startIndex) + 1;
        if (index == 0) {
            index = text.indexOf('-', startIndex) + 1;
        }
        var nextIndex = index;
        if (nextIndex === 0 || nextIndex === length) {
            return nextIndex;
        }
        while (text[nextIndex] === ' ') {
            nextIndex++;
            if (nextIndex === length) {
                break;
            }
        }
        return nextIndex;
    };
    //#region Table
    Layout.prototype.moveNextWidgetsToTable = function (tableWidget, currentRow, moveFromNext) {
        var rowIndex = currentRow.indexInOwner;
        var currentTable = tableWidget[tableWidget.length - 1];
        if (moveFromNext) {
            rowIndex += 1;
        }
        var nextWidgets = currentRow.containerWidget.childWidgets.splice(rowIndex);
        for (var i = 0; i < nextWidgets.length; i++) {
            currentTable.childWidgets.push(nextWidgets[i]);
            nextWidgets[i].containerWidget = currentTable;
        }
    };
    Layout.prototype.addTableCellWidget = function (cell, area, maxCellMarginTop, maxCellMarginBottom) {
        //let tableCellWidget: TableCellWidget = new TableCellWidget(cell);
        var prevColumnIndex = 0;
        var cellspace = 0;
        var left = 0;
        var top = maxCellMarginTop;
        var right = 0;
        var bottom = maxCellMarginBottom;
        if (!isNullOrUndefined(cell.cellFormat)) {
            if (cell.cellFormat.containsMargins()) {
                left = isNullOrUndefined(cell.cellFormat.leftMargin) ? HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.leftMargin) : HelperMethods.convertPointToPixel(cell.cellFormat.leftMargin);
                right = isNullOrUndefined(cell.cellFormat.rightMargin) ? HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.rightMargin) : HelperMethods.convertPointToPixel(cell.cellFormat.rightMargin);
            }
            else {
                if (cell.columnIndex === 0 && cell.ownerRow.rowFormat.hasValue('leftMargin')) {
                    left = HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.leftMargin);
                }
                else {
                    left = HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.leftMargin);
                }
                if (cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1 &&
                    cell.ownerRow.rowFormat.hasValue('rightMargin')) {
                    right = HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.rightMargin);
                }
                else {
                    right = HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.rightMargin);
                }
            }
        }
        cell.margin = new Margin(left, top, right, bottom);
        var autofit = cell.ownerTable.tableFormat.allowAutoFit;
        var cellWidth = cell.cellFormat.cellWidth;
        if (cell.cellFormat.preferredWidthType === 'Percent' && cell.cellFormat.preferredWidth !== 0 && cellWidth <= 0) {
            var width = HelperMethods.convertPointToPixel(cell.ownerTable.getTableClientWidth(cell.ownerTable.getContainerWidth()));
            cellWidth = cell.ownerTable.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, width, cell);
        }
        // if (cellWidth > cell.cellFormat.preferredWidth && cell.cellFormat.preferredWidth !== 0 && cell.cellFormat.preferredWidthType !== 'Percent' && cell.ownerTable.tableFormat.preferredWidthType !== 'Percent' && isNullOrUndefined(cell.ownerTable.positioning) && (!cell.ownerTable.isContainInsideTable) && (!(cell.ownerTable.containerWidget instanceof TableCellWidget))) {
        //     cellWidth = cell.cellFormat.preferredWidth;
        // }
        cell.width = HelperMethods.convertPointToPixel(cellWidth);
        if (!isNullOrUndefined(cell.previousWidget)) {
            prevColumnIndex = cell.previousWidget.columnIndex + cell.previousWidget.cellFormat.columnSpan;
        }
        cellspace = !isNullOrUndefined(cell.ownerTable) && !isNullOrUndefined(cell.ownerTable.tableFormat) ? HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing) : 0;
        var prevSpannedCellWidth = 0;
        if (prevColumnIndex < cell.columnIndex) {
            prevSpannedCellWidth = HelperMethods.convertPointToPixel(cell.ownerTable.tableHolder.getPreviousSpannedCellWidth(prevColumnIndex, cell.columnIndex));
            if (prevColumnIndex === 0) {
                prevSpannedCellWidth = prevSpannedCellWidth - cellspace / 2;
            }
        }
        cell.x = area.x + prevSpannedCellWidth + cell.margin.left;
        cell.y = area.y + cell.margin.top + cellspace;
        cell.width = cell.width - cell.margin.left - cell.margin.right;
        if (cellspace > 0) {
            cell.x += cellspace;
            if (cell.ownerTable.tableHolder.columns.length === 1) {
                cell.width -= cellspace * 2;
            }
            else if (cell.columnIndex === 0 || cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1) {
                cell.width -= ((cellspace * 2) - cellspace / 2);
            }
            else {
                cell.width -= cellspace;
            }
        }
        var leftBorderWidth = HelperMethods.convertPointToPixel(TableCellWidget.getCellLeftBorder(cell).getLineWidth());
        var rightBorderWidth = HelperMethods.convertPointToPixel(TableCellWidget.getCellRightBorder(cell).getLineWidth());
        // update the margins values respect to layouting of borders.
        // for normal table cells only left border is rendred. for last cell left and right border is rendred.
        // this border widths are not included in margins.
        var linestyle = false;
        cell.leftBorderWidth = !cell.ownerTable.isBidiTable ? leftBorderWidth : rightBorderWidth;
        var isLeftStyleNone = (cell.cellFormat.borders.left.lineStyle === 'None');
        var isRightStyleNone = (cell.cellFormat.borders.right.lineStyle === 'None');
        cell.x += (!isLeftStyleNone) ? 0 : (cell.leftBorderWidth > 0) ? 0 : cell.leftBorderWidth;
        cell.width -= (!isLeftStyleNone) ? 0 : (cell.leftBorderWidth > 0) ? 0 : cell.leftBorderWidth;
        var lastCell = !cell.ownerTable.isBidiTable ? cell.cellIndex === cell.ownerRow.childWidgets.length - 1
            : cell.cellIndex === 0;
        if (cellspace > 0 || cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1 ||
            (cell.columnIndex === cell.containerWidget.childWidgets.length - 1 && cell.cellFormat.columnSpan > 1)) {
            cell.rightBorderWidth = !cell.ownerTable.isBidiTable ? rightBorderWidth : leftBorderWidth;
            if (!cell.ownerTable.tableFormat.allowAutoFit) {
                cell.width -= cell.rightBorderWidth;
            }
            if (!this.isInsertTable()) {
                linestyle = this.checkPreviousMargins(cell.ownerTable);
            }
        }
        //Add the border widths to respective margin side.
        //cell.margin.left += (isLeftStyleNone) ? 0 : (cell.leftBorderWidth);
        cell.margin.right += (isRightStyleNone && !linestyle) ? 0 : (cell.rightBorderWidth);
        //cell.ownerWidget = owner;
        if (cell.width < cell.sizeInfo.minimumWidth / 2 && this.documentHelper.owner.editor.tableResize.checkCellMinWidth) {
            cell.width = cell.sizeInfo.minimumWidth / 2;
        }
        return cell;
    };
    Layout.prototype.checkPreviousMargins = function (table) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[row.childWidgets.length - 1];
                if (cell.cellFormat.borders.right.lineStyle !== 'None') {
                    return true;
                }
            }
        }
        return false;
    };
    Layout.prototype.addWidgetToTable = function (viewer, tableCollection, rowCollection, row, footnotes, endRowWidget, isInitialLayout, startRowIndex) {
        //Adds table row widget to owner table widget.
        var tableWidget = tableCollection[0];
        var index = tableWidget.childWidgets.length;
        var prevWidget = undefined;
        var rowWidgetIndex = rowCollection.indexOf(row);
        var footnoteWidgets = [];
        if (rowWidgetIndex > 0) {
            prevWidget = rowCollection[rowWidgetIndex - 1];
            // Need to update on this further
        }
        else if (row.previousRenderedWidget instanceof TableRowWidget &&
            row.previousRenderedWidget.ownerTable.equals(row.ownerTable)) {
            // Need to update on this further
            prevWidget = row.previousRenderedWidget;
        }
        if (!isNullOrUndefined(prevWidget)) {
            tableWidget = prevWidget.containerWidget;
            // index = tableWidget.childWidgets.length;
            index = tableWidget.childWidgets.indexOf(prevWidget) + 1;
            if (Math.round(row.y) !== Math.round(prevWidget.y + prevWidget.height)) {
                var prevIndex = tableCollection.indexOf(tableWidget);
                if (prevIndex + 1 >= tableCollection.length) {
                    //Creates new table widget for splitted rows.
                    this.addTableWidget(viewer.clientActiveArea, tableCollection, true);
                }
                tableWidget = tableCollection[prevIndex + 1];
                index = tableWidget.childWidgets.length;
            }
            if (rowWidgetIndex > 0) {
                index = 0;
            }
        }
        this.updateRowHeightBySpannedCell(tableWidget, row, index);
        this.updateRowHeightByCellSpacing(tableCollection, row, viewer);
        //Remove widget from previous container after splitteing
        if (row.containerWidget && row.containerWidget !== tableWidget &&
            row.containerWidget.childWidgets.indexOf(row) !== -1) {
            row.containerWidget.childWidgets.splice(row.containerWidget.childWidgets.indexOf(row), 1);
        }
        if (tableWidget.childWidgets.indexOf(row) === -1) {
            tableWidget.childWidgets.splice(index, 0, row);
        }
        row.containerWidget = tableWidget;
        if (!row.ownerTable.isInsideTable) {
            if (footnotes.length > 0) {
                if (!isNullOrUndefined(footnotes)) {
                    footnoteWidgets = this.getFootnoteBody(footnotes);
                }
            }
            else {
                if (!isNullOrUndefined(row)) {
                    for (var i = 0; i < row.childWidgets.length; i++) {
                        var cell = row.childWidgets[i];
                        for (var j = 0; j < cell.childWidgets.length; j++) {
                            var footnoteCollection = this.getFootNoteWidgetsOf(cell.childWidgets[j], true);
                            for (var k = 0; k < footnoteCollection.length; k++) {
                                footnoteWidgets.splice(footnoteWidgets.length, 0, footnoteCollection[k]);
                            }
                        }
                    }
                }
            }
            if (footnoteWidgets.length > 0 && isNullOrUndefined(footnoteWidgets[0].containerWidget)) {
                this.layoutFootnoteInSplittedRow(row, footnoteWidgets);
            }
            else if (!isNullOrUndefined(footnoteWidgets) && footnoteWidgets.length > 0 && row.bodyWidget.previousRenderedWidget !== undefined && startRowIndex !== row.bodyWidget.page.index && footnoteWidgets[0].containerWidget.page.index !== row.bodyWidget.page.index) {
                this.moveFootNotesToPage(footnoteWidgets, footnoteWidgets[0].containerWidget.page.bodyWidgets[0], row.bodyWidget);
            }
            else if (!this.isInitialLoad && !isNullOrUndefined(row.bodyWidget.page.footnoteWidget)) {
                this.layoutfootNote(row.bodyWidget.page.footnoteWidget);
            }
            footnotes.length = 0;
        }
        tableWidget.height = tableWidget.height + row.height;
        if (this.viewer instanceof PageLayoutViewer) {
            if (!isNullOrUndefined(tableWidget.containerWidget)
                && tableWidget.containerWidget.childWidgets.indexOf(tableWidget) >= 0 &&
                !(tableWidget.containerWidget instanceof HeaderFooterWidget)) {
                tableWidget.containerWidget.height += row.height;
            }
        }
        this.updateHeightForRowWidget(viewer, false, tableCollection, rowCollection, row, false, endRowWidget, isInitialLayout);
        viewer.cutFromTop(row.y + row.height);
        this.viewer.clientActiveArea.height -= this.getFootNoteHeight(footnoteWidgets);
        this.existFootnoteHeight = 0;
    };
    Layout.prototype.layoutFootnoteInSplittedRow = function (row, footnoteWidgets) {
        if (footnoteWidgets && footnoteWidgets.length > 0) {
            if (isNullOrUndefined(row.ownerTable.bodyWidget.page.footnoteWidget)) {
                this.addEmptyFootNoteToBody(row.ownerTable.bodyWidget);
            }
            var footnoteWidget = row.ownerTable.bodyWidget.page.footnoteWidget;
            if (footnoteWidget) {
                for (var j = 0; j < footnoteWidgets.length; j++) {
                    footnoteWidget.bodyWidgets.push(footnoteWidgets[j]);
                    footnoteWidgets[j].containerWidget = footnoteWidget;
                }
                this.layoutfootNote(footnoteWidget);
            }
        }
    };
    Layout.prototype.getFootNoteHeight = function (footnoteWidgets) {
        var height = 0;
        if (Array.isArray(footnoteWidgets)) {
            for (var i = 0; i < footnoteWidgets.length; i++) {
                height += this.getFootnoteHeightInternal(footnoteWidgets[i]);
            }
        }
        else {
            height = this.getFootnoteHeightInternal(footnoteWidgets);
        }
        return height;
    };
    Layout.prototype.getFootnoteHeightInternal = function (footnoteWidgets) {
        var height = 0;
        for (var i = 0; i < footnoteWidgets.childWidgets.length; i++) {
            height += footnoteWidgets.childWidgets[i].height;
            if (footnoteWidgets.indexInOwner === 0) {
                height += footnoteWidgets.containerWidget.margin.top;
            }
        }
        return height;
    };
    Layout.prototype.updateRowHeightBySpannedCell = function (tableWidget, row, insertIndex) {
        var rowSpan = 1;
        if (tableWidget.childWidgets.length === 0 || insertIndex === 0) {
            this.updateRowHeight(row, row);
            return;
        }
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cellWidget = row.childWidgets[i];
            rowSpan = (isNullOrUndefined(cellWidget) || isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan : cellWidget.cellFormat.rowSpan;
            this.updateSpannedRowCollection(rowSpan, row, cellWidget);
        }
        if (!isNullOrUndefined(row.ownerTable)) {
            for (var i = 0; i < row.ownerTable.spannedRowCollection.length; i++) {
                if (row.ownerTable.spannedRowCollection.keys[i] === row.index) {
                    // Back track to previous table row widgets and update it height if vertical merge ends with this row.
                    for (var j = 0; j < insertIndex; j++) {
                        var prevRowWidget = tableWidget.childWidgets[j];
                        this.updateRowHeight(prevRowWidget, row);
                    }
                    row.ownerTable.spannedRowCollection.remove(row.ownerTable.spannedRowCollection.keys[i]);
                    break;
                }
            }
        }
    };
    Layout.prototype.updateRowHeight = function (prevRowWidget, row) {
        var rowIndex = row.index;
        var rowSpan = 1;
        for (var i = 0; i < prevRowWidget.childWidgets.length; i++) {
            var cellWidget = prevRowWidget.childWidgets[i];
            rowSpan = (isNullOrUndefined(cellWidget) || isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan : cellWidget.cellFormat.rowSpan;
            //To update Row height- if row has row span value greater than 1, need to add it in spannedRowCollection            
            this.updateSpannedRowCollection(rowSpan, row, cellWidget);
            if (rowIndex - cellWidget.rowIndex === rowSpan - 1) {
                var mergedCellHeight = cellWidget.y + cellWidget.height + cellWidget.margin.bottom - row.y;
                if ((row.rowFormat.heightType !== 'Exactly' || (row.rowFormat.heightType === 'Exactly' && row.rowFormat.height > mergedCellHeight)) && row.height < mergedCellHeight) {
                    row.height = mergedCellHeight;
                }
            }
        }
    };
    //if row has row span value greater than 1, need to add it in spannedRowCollection
    Layout.prototype.updateSpannedRowCollection = function (rowSpan, row, cellWidget) {
        if (rowSpan > 1 && !isNullOrUndefined(row.ownerTable)) {
            //Checks the rowspan is already exist in the list
            if (!row.ownerTable.spannedRowCollection.containsKey(row.index + rowSpan - 1)) {
                row.ownerTable.spannedRowCollection.add(row.index + rowSpan - 1, row.index);
            }
        }
    };
    Layout.prototype.updateRowHeightByCellSpacing = function (tableCollection, row, viewer) {
        if (row.ownerTable.tableFormat.cellSpacing > 0) {
            // In the Case of tableWidget is greater than one and rowWidget is start at the Top Position of the page. 
            // In such case we have update the row height with half of cell spacing.
            // Remaining cases we have to update the entire hight
            if (tableCollection.length > 1 && row.y === viewer.clientArea.y && viewer instanceof PageLayoutViewer) {
                row.height = row.height - HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.cellSpacing) / 2;
            }
        }
    };
    Layout.prototype.isRowSpanEnd = function (row, viewer) {
        var rowIndex = row.index;
        var rowSpan = 1;
        for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
            var splittedCell = this.documentHelper.splittedCellWidgets[i];
            rowSpan = (isNullOrUndefined(splittedCell) || isNullOrUndefined(splittedCell.cellFormat)) ? rowSpan : splittedCell.cellFormat.rowSpan;
            if (rowIndex - splittedCell.rowIndex === rowSpan - 1) {
                return true;
            }
        }
        return false;
    };
    Layout.prototype.isVerticalMergedCellContinue = function (row) {
        var colIndex = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            if (colIndex < cell.columnIndex) {
                return true;
            }
            colIndex += cell.cellFormat.columnSpan;
        }
        return colIndex < row.ownerTable.tableHolder.columns.length;
    };
    Layout.prototype.splitWidgets = function (tableRowWidget, viewer, tableCollection, rowCollection, splittedWidget, isLastRow, footNoteCollection) {
        if (this.isFirstLineFitForRow(viewer.clientArea.bottom, tableRowWidget) && tableRowWidget.childWidgets.length > 0) {
            splittedWidget = this.getSplittedWidgetForRow(viewer.clientArea.bottom, tableCollection, rowCollection, tableRowWidget, footNoteCollection);
            if (this.documentHelper.splittedCellWidgets.length > 0 || splittedWidget !== tableRowWidget) {
                if (isLastRow) {
                    for (var i = 0; i < splittedWidget.childWidgets.length; i++) {
                        var cell = splittedWidget.childWidgets[i];
                        if (cell.rowIndex !== splittedWidget.index) {
                            splittedWidget.childWidgets.splice(i, 1);
                            i--;
                        }
                    }
                }
                //Adds the splitted widget of a vertical merged cell, to next row widget in the next page.
                this.insertSplittedCellWidgets(viewer, tableCollection, splittedWidget, tableRowWidget.index - 1);
            }
        }
        else {
            //Adds the splitted widget of a vertical merged cell, to next row widget in the next page.
            this.insertSplittedCellWidgets(viewer, tableCollection, splittedWidget, tableRowWidget.index - 1);
        }
        return splittedWidget;
    };
    Layout.prototype.getSplittedWidgetForRow = function (bottom, tableCollection, rowCollection, tableRowWidget, footNoteCollection) {
        var splittedWidget = undefined;
        var rowIndex = tableRowWidget.index;
        this.isRelayoutneed = false;
        var issplit = false;
        for (var i = 0; i < tableRowWidget.childWidgets.length; i++) {
            var cellWidget = tableRowWidget.childWidgets[i];
            var splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget, footNoteCollection);
            footNoteCollection = [];
            if (!isNullOrUndefined(splittedCell)) {
                if (splittedCell === cellWidget) {
                    //Returns if the whole content of the row does not fit in current page.
                    return tableRowWidget;
                }
                if (tableRowWidget.childWidgets.indexOf(splittedCell) !== -1) {
                    tableRowWidget.childWidgets.splice(tableRowWidget.childWidgets.indexOf(splittedCell), 1);
                }
                tableRowWidget.height -= splittedCell.height;
                if (i === 0 || tableRowWidget.height < cellWidget.height + cellWidget.margin.top + cellWidget.margin.bottom) {
                    tableRowWidget.height = cellWidget.height + cellWidget.margin.top + cellWidget.margin.bottom;
                }
                if (isNullOrUndefined(splittedWidget)) {
                    //Creates new widget, to hold the splitted contents.
                    splittedWidget = new TableRowWidget();
                    splittedWidget.containerWidget = tableRowWidget.containerWidget;
                    splittedWidget.index = tableRowWidget.index;
                    splittedWidget.rowFormat = tableRowWidget.rowFormat;
                    this.updateWidgetLocation(tableRowWidget, splittedWidget);
                    // splittedWidget.height = 0;
                    rowCollection.push(splittedWidget);
                }
                var rowSpan = 1;
                rowSpan = (isNullOrUndefined(splittedCell) || isNullOrUndefined(splittedCell.cellFormat)) ? rowSpan : splittedCell.cellFormat.rowSpan;
                if (rowIndex - splittedCell.rowIndex === rowSpan - 1
                    && splittedWidget.height < splittedCell.height + splittedCell.margin.top + splittedCell.margin.bottom) {
                    splittedWidget.height = splittedCell.height + splittedCell.margin.top + splittedCell.margin.bottom;
                }
                else {
                    if (tableRowWidget.rowFormat.heightType === 'Exactly' || (tableRowWidget.rowFormat.heightType === 'AtLeast' &&
                        splittedWidget.height < tableRowWidget.rowFormat.height)) {
                        //Sets the height for row widget if height type is exact or at least.
                        splittedWidget.height = tableRowWidget.rowFormat.height;
                    }
                }
                splittedWidget.childWidgets.push(splittedCell);
                splittedCell.containerWidget = splittedWidget;
                this.isRelayoutneed = true;
                var count = i;
                while (count > 0 && !issplit) {
                    var cellWidget_1 = tableRowWidget.childWidgets[count - 1];
                    splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget_1, footNoteCollection);
                    splittedWidget.childWidgets.splice(0, 0, splittedCell);
                    splittedCell.containerWidget = splittedWidget;
                    count--;
                }
                issplit = true;
            }
        }
        return splittedWidget;
    };
    Layout.prototype.getFootNoteHeightInLine = function (line) {
        var height = 0;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (element instanceof FootnoteElementBox) {
                height += this.getFootNoteHeight(element.bodyWidget);
            }
        }
        return height;
    };
    Layout.prototype.getFootnoteFromLine = function (line, footNoteCollection) {
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof FootnoteElementBox) {
                footNoteCollection.push(line.children[i]);
            }
        }
    };
    Layout.prototype.updateWidgetsToTable = function (tableWidgets, rowWidgets, row) {
        var startRowIndex = row.bodyWidget.page.index;
        var rowHeight = this.getRowHeight(row, [row]);
        var viewer = this.viewer;
        //initializing row properties with default values.
        var isHeader = row.rowFormat.isHeader;
        var headerRow = undefined;
        var isAllowBreakAcrossPages = row.rowFormat.allowBreakAcrossPages;
        var heightType = row.rowFormat.heightType;
        var cellSpacing = 0;
        var count = 0;
        var tableRowWidget = row;
        var moveRowToNextTable = false;
        var footnoteElements = this.layoutedFootnoteElement;
        if (tableRowWidget.bodyWidget.page.footnoteWidget !== undefined) {
            this.footHeight = tableRowWidget.bodyWidget.page.footnoteWidget.height;
            if (this.footnoteHeight === 0) {
                this.footnoteHeight = this.footHeight;
            }
        }
        else {
            this.footHeight = 0;
        }
        if (row.ownerTable.continueHeader && !isHeader) {
            row.ownerTable.continueHeader = false;
        }
        var isInitialLayout = row.ownerTable.isInsideTable;
        var isLastRow = false;
        cellSpacing = (!isNullOrUndefined(row.ownerTable) && !isNullOrUndefined(row.ownerTable.tableFormat)) ? HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.cellSpacing) : 0;
        while (count < rowWidgets.length) {
            count = rowWidgets.length;
            if (this.isRowSpanEnd(row, viewer) && row.rowFormat.heightType === 'Exactly' && this.documentHelper.splittedCellWidgets.length === 1) {
                this.documentHelper.splittedCellWidgets = [];
            }
            if (row.ownerTable.isInsideTable || (this.documentHelper.splittedCellWidgets.length === 0 && tableRowWidget.y + tableRowWidget.height + cellSpacing + this.footnoteHeight <= viewer.clientArea.bottom)) {
                if (this.isVerticalMergedCellContinue(row) && (tableRowWidget.y === viewer.clientArea.y
                    || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)) {
                    this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.index - 1);
                }
                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements, undefined, isInitialLayout, startRowIndex);
                if (this.documentHelper.splittedCellWidgets.length > 0 && isNullOrUndefined(rowWidgets[rowWidgets.length - 1].nextRow)) {
                    count--;
                    isLastRow = true;
                }
                isInitialLayout = false;
            }
            else {
                footnoteElements = [];
                isInitialLayout = false;
                //Split widget for next page
                if (this.documentHelper.splittedCellWidgets.length > 0 && tableRowWidget.y + tableRowWidget.height + this.footHeight <= viewer.clientArea.bottom) {
                    var isRowSpanEnd = this.isRowSpanEnd(row, viewer);
                    if (!isRowSpanEnd) {
                        if (this.isVerticalMergedCellContinue(row) && (tableRowWidget.y === viewer.clientArea.y
                            || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)) {
                            this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.indexInOwner - 1);
                        }
                        this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                        continue;
                    }
                }
                var splittedWidget = tableRowWidget;
                var tableWidget = tableWidgets[tableWidgets.length - 1];
                if (rowHeight + tableRowWidget.y + this.footHeight > viewer.clientArea.bottom) {
                    if (!isAllowBreakAcrossPages || (isHeader && row.ownerTable.continueHeader) || (heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) < viewer.clientArea.bottom)) {
                        if ((heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) < viewer.clientActiveArea.height && (isAllowBreakAcrossPages || row.indexInOwner === 0)) || (heightType !== 'Exactly' && tableRowWidget.y === viewer.clientArea.y) || (heightType === 'Auto' && isAllowBreakAcrossPages)) {
                            splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements);
                            if (isNullOrUndefined(splittedWidget) && tableRowWidget.y === viewer.clientArea.y) {
                                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            }
                        }
                        // if (heightType === 'AtLeast' && row.ownerTable.spannedRowCollection.keys.length > 0) {
                        //     splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow);
                        // }
                        // if (heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientActiveArea.height && isAllowBreakAcrossPages && tableRowWidget.ownerTable.tableHolder.columns.length > this.getTotalColumnSpan(tableRowWidget)) {
                        //     tableRowWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow);
                        //     splittedWidget = tableRowWidget;
                        // }
                        if (heightType === 'Exactly' && tableRowWidget.y === viewer.clientArea.y) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            count++;
                        }
                        if (isHeader && row.ownerTable.continueHeader) {
                            row.ownerTable.header = false;
                            row.ownerTable.continueHeader = false;
                            row.ownerTable.headerHeight = 0;
                            var pages = undefined;
                            if (viewer instanceof PageLayoutViewer) {
                                pages = this.documentHelper.pages;
                            }
                            if (!isNullOrUndefined(pages)) {
                                for (var i = 0; i < pages.length; i++) {
                                    if (pages[i].repeatHeaderRowTableWidget) {
                                        pages[i].repeatHeaderRowTableWidget = false;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if ((heightType === 'Auto' || heightType === 'AtLeast') && isAllowBreakAcrossPages) {
                            if (!(HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientArea.bottom) || tableRowWidget.y === viewer.clientArea.y) {
                                splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements);
                                if (isNullOrUndefined(splittedWidget) && tableRowWidget.y === viewer.clientArea.y) {
                                    this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                }
                            }
                        }
                        else if (heightType === 'Exactly' && tableRowWidget.y === viewer.clientArea.y) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            count++;
                        }
                    }
                }
                else {
                    var isInsertSplittedWidgets = false;
                    // Splitting handled for the merged cell with allowRowBreakAcross pages. 
                    if (this.isVerticalMergedCellContinue(row) && (isAllowBreakAcrossPages ||
                        (isInsertSplittedWidgets = (tableRowWidget.y === viewer.clientArea.y
                            || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)))) {
                        if (isInsertSplittedWidgets) {
                            this.insertSplittedCellWidgets(viewer, tableWidgets, splittedWidget, tableRowWidget.indexInOwner - 1);
                        }
                        else {
                            splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements);
                            if (isNullOrUndefined(splittedWidget)) {
                                isInsertSplittedWidgets = (tableRowWidget.y === viewer.clientArea.y
                                    || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight);
                                if (isInsertSplittedWidgets) {
                                    this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.indexInOwner - 1);
                                    count--;
                                    continue;
                                }
                            }
                        }
                    }
                    else if (isLastRow && !isAllowBreakAcrossPages) {
                        splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements);
                    }
                }
                //Create New table for splitted widget
                if (!isNullOrUndefined(splittedWidget) && !this.documentHelper.owner.editor.isTableInsert && !(splittedWidget.bodyWidget.containerWidget instanceof FootNoteWidget)) {
                    if (splittedWidget !== tableRowWidget) {
                        this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements, tableRowWidget.nextRow);
                        //Updates the fitted table rows to current page.
                        this.updateWidgetsToPage(tableWidgets, rowWidgets, row.ownerTable, tableRowWidget.nextRow);
                        var index_2 = tableWidgets.indexOf(tableRowWidget.containerWidget);
                        if (index_2 + 1 >= tableWidgets.length) {
                            //Creates new table widget for splitted rows.
                            this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                        }
                        tableRowWidget = splittedWidget;
                    }
                    else {
                        if (row.index > 0) {
                            //Updates the fitted table rows to current page.
                            this.updateWidgetsToPage(tableWidgets, rowWidgets, row.ownerTable, row);
                            // Need to update on this further
                            if (row.previousRenderedWidget instanceof TableRowWidget) {
                                // Need to update on this further
                                var prevWidget = row.previousRenderedWidget;
                                if (HelperMethods.round(tableRowWidget.y, 2) === HelperMethods.round(prevWidget.y + prevWidget.height, 2)) {
                                    var prevIndex = tableWidgets.indexOf(prevWidget.containerWidget);
                                    if (prevIndex + 1 >= tableWidgets.length) {
                                        //Creates new table widget for splitted rows.
                                        this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                    }
                                }
                                else {
                                    //Creates new table widget for splitted rows.
                                    this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                }
                            }
                            else {
                                //Creates new table widget for splitted rows.
                                this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                            }
                        }
                        moveRowToNextTable = true;
                        count--;
                    }
                    tableWidget = tableWidgets[tableWidgets.length - 1];
                    var prevBodyWidget = undefined;
                    if (tableWidgets.length > 1) {
                        //Get Previous Splitted Widget container
                        prevBodyWidget = tableWidgets[tableWidgets.length - 2].containerWidget;
                    }
                    else {
                        var previousBlock = row.ownerTable.previousRenderedWidget;
                        prevBodyWidget = previousBlock.containerWidget;
                    }
                    var pageIndex = 0;
                    if (!isNullOrUndefined(prevBodyWidget)) {
                        pageIndex = this.documentHelper.pages.indexOf(prevBodyWidget.page);
                    }
                    var rowToMove = row;
                    var keepNext = false;
                    var index = row.ownerTable.containerWidget.index;
                    var bodyWidget = void 0;
                    var block = void 0;
                    if (moveRowToNextTable && tableWidgets.length === 1) {
                        block = tableWidgets[tableWidgets.length - 1];
                    }
                    else {
                        block = tableWidgets[tableWidgets.length - 2];
                    }
                    var removeTable = true;
                    //Move Next RowWidge to next page
                    if (moveRowToNextTable && rowWidgets.length === 1) {
                        var prev = this.alignBlockElement(row);
                        if (!isNullOrUndefined(prev.node)) {
                            var previousRow = prev.node;
                            if (previousRow instanceof TableRowWidget
                                && previousRow.indexInOwner === 0) {
                                if (tableWidgets.length > 1 && tableWidgets[tableWidgets.length - 1].childWidgets.length === 0) {
                                    tableWidgets.pop();
                                    tableWidget = tableWidgets[tableWidgets.length - 1];
                                    tableWidget.height = 0;
                                }
                            }
                            else if (prev.node instanceof ParagraphWidget) {
                                var previousWidget = this.splitParagraph(prev.node, parseInt(prev.position.index, 10));
                                block = previousWidget;
                                if (tableWidgets.length > 1 && tableWidgets[tableWidgets.length - 1].childWidgets.length === 0) {
                                    tableWidgets.pop();
                                    tableWidget = tableWidgets[tableWidgets.length - 1];
                                }
                                removeTable = false;
                            }
                            if (previousRow instanceof TableRowWidget) {
                                rowToMove = previousRow;
                                if (!rowToMove.ownerTable.equals(row.ownerTable)) {
                                    removeTable = false;
                                }
                            }
                            keepNext = true;
                        }
                    }
                    bodyWidget = this.moveBlocksToNextPage(block instanceof ParagraphWidget ? block.previousWidget : block, keepNext);
                    var curretTable = tableWidgets[tableWidgets.length - 1];
                    //Move Next RowWidge to next page
                    if (moveRowToNextTable && removeTable) {
                        if (rowToMove.index === 0 && curretTable.containerWidget && curretTable.containerWidget.childWidgets.indexOf(curretTable) !== -1) {
                            curretTable.containerWidget.childWidgets.splice(curretTable.containerWidget.childWidgets.indexOf(curretTable), 1);
                        }
                    }
                    if (removeTable) {
                        if (bodyWidget.childWidgets.indexOf(curretTable) !== -1) {
                            bodyWidget.childWidgets.splice(bodyWidget.childWidgets.indexOf(curretTable), 1);
                        }
                        bodyWidget.childWidgets.unshift(curretTable);
                        this.shiftFloatingItemsFromTable(curretTable, bodyWidget);
                    }
                    curretTable.containerWidget = bodyWidget;
                    if (moveRowToNextTable && rowToMove.index > 0 || rowWidgets.length > 1) {
                        var currentRow = !moveRowToNextTable ? rowWidgets[rowWidgets.length - 2] : rowWidgets[rowWidgets.length - 1];
                        if (keepNext) {
                            currentRow = rowToMove;
                        }
                        this.moveNextWidgetsToTable(tableWidgets, currentRow, !moveRowToNextTable);
                        rowToMove = row;
                    }
                    if (keepNext) {
                        this.updateClientPositionForBlock(removeTable ? curretTable : block, row);
                    }
                    moveRowToNextTable = false;
                    if (rowToMove.ownerTable.header && tableRowWidget.height < viewer.clientArea.bottom && !keepNext) {
                        if (viewer instanceof PageLayoutViewer) {
                            viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget = true;
                        }
                        //Updates table widgets location.
                        viewer.updateClientAreaForBlock(rowToMove.ownerTable, true, tableWidgets);
                        //Update splitted row widget location. if header is repeated update the y position of splitted widget to header height.
                        splittedWidget.x = splittedWidget.x;
                        splittedWidget.y = tableWidget.y + rowToMove.ownerTable.headerHeight;
                        // let cellspace: number = viewer instanceof PageLayoutViewer ? cellspacing / 2 : cellspacing;
                        var cellspace = cellSpacing / 2;
                        this.updateChildLocationForRow(tableWidget.y + rowToMove.ownerTable.headerHeight - cellspace, splittedWidget);
                    }
                    else {
                        //Updates table widgets location.
                        viewer.updateClientAreaForBlock(rowToMove.ownerTable, true, tableWidgets);
                        //Update splitted row widget location. if header is repeated update the y position of splitted widget to header height.
                        splittedWidget.x = splittedWidget.x;
                        splittedWidget.y = tableWidget.y;
                        // let cellspace: number = viewer instanceof PageLayoutViewer ? cellspacing / 2 : cellspacing;
                        var cellspace = cellSpacing / 2;
                        this.updateChildLocationForRow(tableWidget.y - cellspace, splittedWidget);
                    }
                    if (removeTable && this.shiftedFloatingItemsFromTable.length > 0) {
                        for (var i = 0; i < this.shiftedFloatingItemsFromTable.length; i++) {
                            var floatingItem = this.shiftedFloatingItemsFromTable[i];
                            var position = this.getFloatingItemPoints(floatingItem);
                            floatingItem.y = position.y;
                            floatingItem.x = position.x;
                            if (floatingItem instanceof ShapeElementBox) {
                                this.updateChildLocationForCellOrShape(floatingItem.y, floatingItem);
                            }
                        }
                        this.shiftedFloatingItemsFromTable = [];
                    }
                }
                isLastRow = false;
            }
            if (isHeader) {
                if (row.ownerTable.continueHeader) {
                    row.ownerTable.header = true;
                    row.ownerTable.headerHeight = rowHeight + row.ownerTable.headerHeight;
                }
                headerRow = this.getHeader(row.ownerTable);
                if (!isNullOrUndefined(headerRow) && row.index === headerRow.index) {
                    var headerHeight = this.getHeaderHeight(row.ownerTable, row, rowWidgets);
                    if (headerHeight > row.ownerTable.headerHeight || headerHeight > row.ownerTable.headerHeight) {
                        row.ownerTable.headerHeight = headerHeight;
                    }
                    if (row.ownerTable.headerHeight > viewer.clientArea.height) {
                        row.ownerTable.header = false;
                        row.ownerTable.continueHeader = false;
                        row.ownerTable.headerHeight = 0;
                        var pages = this.documentHelper.pages;
                        for (var i = 0; i < pages.length; i++) {
                            if (pages[i].repeatHeaderRowTableWidget) {
                                pages[i].repeatHeaderRowTableWidget = false;
                            }
                        }
                    }
                }
            }
            if (tableWidgets.length > 2 && row.ownerTable.header && tableRowWidget.height < viewer.clientActiveArea.bottom &&
                !viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget) {
                viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget = true;
            }
        }
    };
    Layout.prototype.getHeader = function (table) {
        var header = undefined;
        var flag = true;
        table = table.getSplitWidgets()[0];
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row.rowFormat.isHeader) {
                header = row;
            }
            else {
                flag = false;
            }
            if (!flag) {
                break;
            }
        }
        return header;
    };
    Layout.prototype.getHeaderHeight = function (ownerTable, row, rowCollection) {
        var height = 0;
        if (row.ownerTable.childWidgets.length > 0 && ownerTable.childWidgets[0].rowFormat.isHeader) {
            for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                var row_1 = ownerTable.childWidgets[i];
                if (row_1.rowFormat.isHeader) {
                    height = height + row_1.height;
                }
                else {
                    break;
                }
            }
        }
        return height;
    };
    Layout.prototype.updateWidgetToRow = function (cell) {
        //const viewer: LayoutViewer = this.viewer;
        //Adds table cell widget to owner row widget.
        var rowWidget = cell.ownerRow;
        // let cellLeft: number = rowWidget.x;
        // if (rowWidget.childWidgets.length > 0) {
        //     const lastWidget: TableCellWidget = rowWidget.childWidgets[rowWidget.childWidgets.length - 1] as TableCellWidget;
        //     cellLeft = lastWidget.x + lastWidget.width + lastWidget.margin.right;
        // }
        // rowWidget.childWidgets.push(cell);
        cell.containerWidget = rowWidget;
        //If the row height is set as Atleast then height is set to atleast height for the first cell of the row.
        if (!isNullOrUndefined(cell.ownerRow) && cell.ownerRow.rowFormat.heightType !== 'Exactly' && HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.height) > 0 && cell.cellIndex === 0) {
            rowWidget.height = rowWidget.height + HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.height);
        }
        //Add condition not cell merged vertically.
        if (cell.cellFormat.rowSpan === 1) {
            var cellHeight = void 0;
            if (rowWidget.rowFormat.heightType === 'Exactly') {
                cellHeight = cell.height + cell.margin.bottom;
            }
            else {
                cellHeight = cell.height + cell.margin.top + cell.margin.bottom;
            }
            if (rowWidget.height - HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing) < cellHeight) {
                rowWidget.height = cellHeight + HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.updateHeightForRowWidget = function (viewer, isUpdateVerticalPosition, tableCollection, rowCollection, rowWidget, isLayouted, endRowWidget, isInitialLayout) {
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var cellspacing = 0;
            var cellWidget = undefined;
            var childWidget = rowWidget.childWidgets[i];
            // if (childWidget instanceof TableCellWidget) {
            cellWidget = childWidget;
            // }
            var rowSpan = 1;
            rowSpan = cellWidget.cellFormat.rowSpan;
            cellspacing = HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableFormat.cellSpacing);
            if (rowSpan > 1) {
                var currentRowWidgetIndex = rowWidget.containerWidget.childWidgets.indexOf(rowWidget);
                var rowSpanWidgetEndIndex = currentRowWidgetIndex + rowSpan - 1 - (rowWidget.index - cellWidget.rowIndex);
                if (!isInitialLayout && (viewer.clientArea.bottom < cellWidget.y + cellWidget.height + cellWidget.margin.bottom
                    || rowSpanWidgetEndIndex >= currentRowWidgetIndex + 1) && (rowCollection.length === 1
                    || rowCollection.length >= 1 && rowWidget === rowCollection[rowCollection.length - 1])) {
                    this.splitSpannedCellWidget(cellWidget, tableCollection, rowCollection, viewer);
                }
                var spanEndRowWidget = rowWidget;
                if (rowSpanWidgetEndIndex > 0) {
                    if (rowSpanWidgetEndIndex < rowWidget.containerWidget.childWidgets.length) {
                        var childWidget_1 = rowWidget.containerWidget.childWidgets[rowSpanWidgetEndIndex];
                        if (childWidget_1 instanceof TableRowWidget) {
                            spanEndRowWidget = childWidget_1;
                            if (spanEndRowWidget === endRowWidget) {
                                spanEndRowWidget = rowWidget;
                            }
                        }
                    }
                    else {
                        /* eslint-disable-next-line max-len */
                        spanEndRowWidget = rowWidget.containerWidget.childWidgets[rowWidget.containerWidget.childWidgets.length - 1];
                    }
                }
                if (cellWidget.y + cellWidget.height + cellWidget.margin.bottom < spanEndRowWidget.y + spanEndRowWidget.height) {
                    cellWidget.height = spanEndRowWidget.y + spanEndRowWidget.height - cellWidget.y - cellWidget.margin.bottom;
                    /* eslint-disable-next-line max-len */
                }
                else if (isLayouted && spanEndRowWidget && (spanEndRowWidget.y !== 0 && spanEndRowWidget.height !== 0) && cellWidget.y + cellWidget.height + cellWidget.margin.bottom > spanEndRowWidget.y + spanEndRowWidget.height) {
                    if (spanEndRowWidget.rowFormat.heightType !== 'Exactly' || (spanEndRowWidget.rowFormat.heightType === 'Exactly' && spanEndRowWidget.rowFormat.height > cellWidget.y + cellWidget.height + cellWidget.margin.bottom - spanEndRowWidget.y)) {
                        spanEndRowWidget.height = cellWidget.y + cellWidget.height + cellWidget.margin.bottom - spanEndRowWidget.y;
                    }
                    else {
                        cellWidget.height = (spanEndRowWidget.y - cellWidget.y) + spanEndRowWidget.height;
                    }
                    //Update the next rowlayout widget location. Reason for the updation is previous row height is updated when cell height is greater. So already layouted next row location has to be updated again.
                    // if (rowWidget === spanEndRowWidget && rowWidget.nextWidget instanceof TableRowWidget) {
                    //     let nextRow: TableRowWidget = rowWidget.nextWidget as TableRowWidget;
                    //     // Need to update on this further
                    //     // if (viewer.renderedElements.containsKey(nextRow)) {
                    //     //     let nextWidget: TableRowWidget[] = viewer.renderedElements.get(nextRow) as TableRowWidget[];
                    //     //     if (nextWidget.length > 0) {
                    //     //         nextWidget[0].x = nextWidget[0].x;
                    //     //         nextWidget[0].y = rowWidget.y + rowWidget.height;
                    //     //     }
                    //     // }
                    // }
                }
            }
            else {
                if (cellspacing > 0) {
                    // In the Case of tableWidget is greater than one and rowWidget is start at the Top Position of the page.
                    // In such case we have update the cell height with half of cell spacing.
                    // Remaining cases we have to update the entire hight
                    if (tableCollection.length > 1 && rowWidget.y === viewer.clientArea.y && viewer instanceof PageLayoutViewer) {
                        cellspacing = cellspacing / 2;
                    }
                }
                cellWidget.height = rowWidget.height - cellWidget.margin.top - cellWidget.margin.bottom - cellspacing;
            }
            this.updateHeightForCellWidget(viewer, tableCollection, rowCollection, cellWidget);
            var widget = rowWidget.containerWidget;
            while (widget.containerWidget instanceof Widget) {
                widget = widget.containerWidget;
            }
            var page = undefined;
            if (widget instanceof BodyWidget) {
                page = widget.page;
            }
            /* eslint-disable-next-line max-len */
            if ((viewer instanceof PageLayoutViewer && viewer.visiblePages.indexOf(page) !== -1) || isUpdateVerticalPosition) {
                this.updateCellVerticalPosition(cellWidget, false, cellWidget.ownerTable.isInsideTable);
            }
            //Renders the current table row contents, after relayout based on editing.
            // if (viewer instanceof PageLayoutViewer && (viewer as PageLayoutViewer).visiblePages.indexOf(page) !== -1) {
            //     //Added proper undefined condition check for Asynchronous operation.
            //     if (!isNullOrUndefined(rowWidget.tableRow) && !isNullOrUndefined(rowWidget.tableRow.rowFormat)) {
            //         this.viewer.updateScrollBars();
            //         //this.render.renderTableCellWidget(page, cellWidget);
            //     }
            // }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.updateHeightForCellWidget = function (viewer, tableWidget, rowCollection, cellWidget) {
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof TableWidget) {
                this.updateHeightForTableWidget(tableWidget, rowCollection, cellWidget.childWidgets[i]);
            }
        }
    };
    Layout.prototype.getRowHeight = function (row, rowCollection) {
        var height = 0;
        if (row.rowFormat.heightType === 'Exactly') {
            height = row.rowFormat.height;
        }
        else {
            for (var i = 0; i < rowCollection.length; i++) {
                if (rowCollection[i] instanceof TableRowWidget) {
                    height = rowCollection[i].height + height;
                }
            }
            height = Math.max(height, row.rowFormat.height);
        }
        return height;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.splitSpannedCellWidget = function (cellWidget, tableCollection, rowCollection, viewer) {
        /* eslint-disable-next-line max-len */
        var splittedCell = this.getSplittedWidget(viewer.clientArea.bottom, false, tableCollection, rowCollection, cellWidget, undefined);
        if (!isNullOrUndefined(splittedCell)) {
            //Adds the splitted contents of a vertical merged cell, in order preserve in next page.
            this.documentHelper.splittedCellWidgets.push(splittedCell);
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.insertSplittedCellWidgets = function (viewer, tableCollection, rowWidget, previousRowIndex) {
        if (!isNullOrUndefined(rowWidget)) {
            var left = rowWidget.x;
            var tableWidth = 0;
            var cellIndex = 0;
            tableWidth = HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableHolder.tableWidth);
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                var cellWidget = rowWidget.childWidgets[i];
                if (Math.round(left) < Math.round(cellWidget.x - cellWidget.margin.left)) {
                    if (this.insertRowSpannedWidget(rowWidget, viewer, left, i)) {
                        i--;
                        continue;
                    }
                    var length_1 = rowWidget.childWidgets.length;
                    this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, i, previousRowIndex);
                    if (length_1 < rowWidget.childWidgets.length) {
                        if (i === cellIndex) {
                            break;
                        }
                        i--;
                        continue;
                    }
                }
                left += cellWidget.margin.left + cellWidget.width + cellWidget.margin.right;
                cellIndex++;
                if (i === rowWidget.childWidgets.length - 1 && Math.round(left) < Math.round(rowWidget.x + tableWidth)) {
                    if (this.insertRowSpannedWidget(rowWidget, viewer, left, i + 1)) {
                        continue;
                    }
                    this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, i + 1, previousRowIndex);
                    continue;
                }
            }
            // Special case: when the child widgets of row is equal to 0 then the splitted widgets in the viewer is added in the table row widgets.
            /* eslint-disable-next-line max-len */
            if ((isNullOrUndefined(rowWidget.childWidgets) || rowWidget.childWidgets.length === 0) && this.documentHelper.splittedCellWidgets.length > 0) {
                for (var j = 0; j < this.documentHelper.splittedCellWidgets.length; j++) {
                    var widget = this.documentHelper.splittedCellWidgets[j];
                    if (Math.round(left) <= Math.round(widget.x - widget.margin.left)) {
                        if (this.insertRowSpannedWidget(rowWidget, viewer, left, j)) {
                            j--;
                            continue;
                        }
                        var count = rowWidget.childWidgets.length;
                        this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, j, previousRowIndex);
                        if (count < rowWidget.childWidgets.length) {
                            j--;
                            continue;
                        }
                    }
                    left += widget.margin.left + widget.width + widget.margin.right;
                    if (j === rowWidget.childWidgets.length - 1 && Math.round(left) <
                        Math.round(rowWidget.x + tableWidth)) {
                        if (this.insertRowSpannedWidget(rowWidget, viewer, left, j + 1)) {
                            continue;
                        }
                        this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, j + 1, previousRowIndex);
                        continue;
                    }
                }
            }
            if (this.documentHelper.splittedCellWidgets.length > 0) {
                this.documentHelper.splittedCellWidgets = [];
            }
        }
    };
    Layout.prototype.insertRowSpannedWidget = function (rowWidget, viewer, left, index) {
        var cellSpacing = 0;
        if (rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
            cellSpacing = HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
        }
        for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
            var splittedCell = this.documentHelper.splittedCellWidgets[i];
            if (Math.round(left) === Math.round(splittedCell.x - splittedCell.margin.left)) {
                rowWidget.childWidgets.splice(index, 0, splittedCell);
                splittedCell.containerWidget = rowWidget;
                if (splittedCell.height > rowWidget.height) {
                    rowWidget.height = splittedCell.height;
                }
                //If the splitted cell location differs from expected location update the location of row child widgets.
                if (splittedCell.y !== rowWidget.y + splittedCell.margin.top + cellSpacing) {
                    this.updateChildLocationForRow(rowWidget.y, rowWidget);
                }
                this.documentHelper.splittedCellWidgets.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.insertEmptySplittedCellWidget = function (currentRow, tableCollection, left, index, previousRowIndex) {
        var tableWidget = tableCollection[tableCollection.length - 1];
        var previousRow;
        for (var j = tableCollection.length - 1; j >= 0; j--) {
            var table = tableCollection[j];
            for (var z = table.childWidgets.length - 1; z >= 0; z--) {
                var row = table.childWidgets[z];
                if (row.index === previousRowIndex) {
                    previousRow = row;
                    break;
                }
            }
        }
        if (previousRow) {
            tableWidget = previousRow.ownerTable;
            previousRowIndex = previousRow.indexInOwner;
        }
        for (var i = previousRowIndex; i >= 0; i--) {
            var rowWidget = tableWidget.childWidgets[i];
            var previousLeft = rowWidget.x;
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                var rowSpan = 1;
                var cellWidget = rowWidget.childWidgets[j];
                if (Math.round(left) === Math.round(previousLeft)) {
                    rowSpan = (isNullOrUndefined(cellWidget) || isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan :
                        cellWidget.cellFormat.rowSpan;
                    if (rowSpan > 1) {
                        //if (!isNullOrUndefined(currentRow.childWidgets[index])) {
                        var emptyCellWidget = this.createCellWidget(cellWidget);
                        //if (emptyCellWidget.x < (currentRow.childWidgets[index] as TableCellWidget).x) {
                        currentRow.childWidgets.splice(index, 0, emptyCellWidget);
                        emptyCellWidget.containerWidget = currentRow;
                        this.updateChildLocationForRow(currentRow.y, currentRow);
                        return;
                        //}
                        //}
                    }
                }
                previousLeft += cellWidget.margin.left + cellWidget.width + cellWidget.margin.right;
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.getSplittedWidget = function (bottom, splitMinimalWidget, tableCollection, rowCollection, cellWidget, footNoteCollection) {
        var splittedWidget = undefined;
        if (cellWidget.y + cellWidget.height > bottom - this.footHeight - cellWidget.margin.bottom) {
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                    var paragraphWidget = cellWidget.childWidgets[i];
                    var splittedPara = this.getSplittedWidgetForPara(bottom - cellWidget.margin.bottom, paragraphWidget, footNoteCollection);
                    if (!isNullOrUndefined(splittedPara)) {
                        if (i === 0 && splittedPara === paragraphWidget) {
                            //Returns if the whole content of the cell does not fit in current page.
                            return cellWidget;
                        }
                        if (cellWidget.childWidgets.indexOf(splittedPara) !== -1) {
                            cellWidget.childWidgets.splice(cellWidget.childWidgets.indexOf(splittedPara), 1);
                            i--;
                        }
                        cellWidget.height -= splittedPara.height;
                        if (isNullOrUndefined(splittedWidget)) {
                            //Creates new widget, to hold the splitted contents.
                            splittedWidget = this.createCellWidget(cellWidget);
                        }
                        splittedWidget.height += splittedPara.height;
                        splittedWidget.childWidgets.push(splittedPara);
                        splittedPara.containerWidget = splittedWidget;
                    }
                }
                else {
                    var tableWidget = cellWidget.childWidgets[i];
                    var tableCol = [tableWidget];
                    //Check for nested table.
                    if (bottom - cellWidget.margin.bottom < tableWidget.y + tableWidget.height) {
                        var tableHeight = tableWidget.height;
                        /* eslint-disable-next-line max-len */
                        var splittedTable = this.getSplittedWidgetForTable(bottom - cellWidget.margin.bottom, tableCol, tableWidget, footNoteCollection);
                        if (isNullOrUndefined(splittedTable) &&
                            !(tableWidget.childWidgets[0].rowFormat.allowBreakAcrossPages)) {
                            splittedTable = tableWidget;
                        }
                        if (!isNullOrUndefined(splittedTable)) {
                            if (i === 0 && splittedTable === tableWidget) {
                                //Returns if the whole table does not fit in current page.
                                return cellWidget;
                            }
                            if (cellWidget.childWidgets.indexOf(splittedTable) !== -1) {
                                cellWidget.childWidgets.splice(cellWidget.childWidgets.indexOf(splittedTable), 1);
                                i--;
                                cellWidget.height -= splittedTable.height;
                            }
                            else {
                                cellWidget.height -= tableHeight - tableWidget.height;
                            }
                            if (isNullOrUndefined(splittedWidget)) {
                                //Creates new widget, to hold the splitted contents.
                                splittedWidget = this.createCellWidget(cellWidget);
                            }
                            splittedWidget.height += splittedTable.height;
                            splittedWidget.childWidgets.push(splittedTable);
                            splittedTable.containerWidget = splittedWidget;
                        }
                    }
                }
            }
        }
        if (isNullOrUndefined(splittedWidget) && splitMinimalWidget && this.isRelayoutneed) {
            //Creates new widget, to hold the splitted contents.
            splittedWidget = this.createCellWidget(cellWidget);
        }
        return splittedWidget;
    };
    Layout.prototype.getListLevelPattern = function (value) {
        switch (value) {
            case 0:
                return 'Arabic';
            case 1:
                return 'LowLetter';
            case 2:
                return 'LowRoman';
            case 3:
                return 'UpLetter';
            case 4:
                return 'UpRoman';
            case 5:
                return 'Ordinal';
            case 6:
                return 'Number';
            case 7:
                return 'OrdinalText';
            case 8:
                return 'LeadingZero';
            case 9:
                return 'Bullet';
            case 10:
                return 'FarEast';
            case 11:
                return 'Special';
            default:
                return 'None';
        }
    };
    Layout.prototype.createCellWidget = function (cell) {
        var cellWidget = new TableCellWidget();
        cellWidget.cellFormat = cell.cellFormat;
        cellWidget.index = cell.index;
        cellWidget.rowIndex = cell.rowIndex;
        cellWidget.columnIndex = cell.columnIndex;
        cellWidget.containerWidget = cell.containerWidget;
        this.updateWidgetLocation(cell, cellWidget);
        cellWidget.margin = cell.margin;
        cellWidget.leftBorderWidth = cell.leftBorderWidth;
        cellWidget.rightBorderWidth = cell.rightBorderWidth;
        return cellWidget;
    };
    Layout.prototype.createTableWidget = function (table) {
        var newTable = new TableWidget();
        if (table.header) {
            newTable.header = table.header;
            newTable.headerHeight = table.headerHeight;
        }
        newTable.index = table.index;
        newTable.tableFormat = table.tableFormat;
        newTable.tableHolder = table.tableHolder;
        newTable.footnoteElement = table.footnoteElement;
        newTable.isGridUpdated = table.isGridUpdated;
        newTable.wrapTextAround = table.wrapTextAround;
        newTable.positioning = table.positioning;
        newTable.isContainInsideTable = table.isContainInsideTable;
        newTable.isBidiTable = table.isBidiTable;
        return newTable;
    };
    Layout.prototype.getSplittedWidgetForPara = function (bottom, paragraphWidget, footNoteCollection) {
        var lineBottom = paragraphWidget.y;
        var splittedWidget = undefined;
        var moveEntireBlock = false;
        for (var i = 0; i < paragraphWidget.childWidgets.length; i++) {
            var lineWidget = paragraphWidget.childWidgets[i];
            var height = this.getFootNoteHeightInLine(lineWidget);
            height += this.existFootnoteHeight;
            if (!isNullOrUndefined(footNoteCollection)) {
                for (var j = 0; j < footNoteCollection.length; j++) {
                    height += this.getFootNoteHeight(footNoteCollection[j].bodyWidget);
                }
            }
            if (bottom < lineBottom + height + lineWidget.height) {
                if (paragraphWidget.paragraphFormat.keepLinesTogether && (paragraphWidget.index !== 0 ||
                    (paragraphWidget.index === 0 && !isNullOrUndefined(paragraphWidget.associatedCell.ownerRow.previousWidget)))) {
                    moveEntireBlock = true;
                    i = 0;
                    lineWidget = paragraphWidget.childWidgets[0];
                }
                else if (paragraphWidget.paragraphFormat.widowControl) {
                    if (i === 1) {
                        moveEntireBlock = true;
                        i = 0;
                        lineWidget = paragraphWidget.childWidgets[0];
                    }
                }
                if (i === 0) {
                    if (lineWidget.paragraph.containerWidget instanceof TableCellWidget && !moveEntireBlock) {
                        //checks first line of the page is exceed the page height
                        if (lineWidget.paragraph.containerWidget.y === paragraphWidget.y) {
                            lineBottom += lineWidget.height;
                            continue;
                        }
                    }
                    splittedWidget = paragraphWidget;
                    break;
                }
                if (paragraphWidget.childWidgets.indexOf(lineWidget) !== -1) {
                    paragraphWidget.childWidgets.splice(paragraphWidget.childWidgets.indexOf(lineWidget), 1);
                    i--;
                }
                paragraphWidget.height -= lineWidget.height;
                if (isNullOrUndefined(splittedWidget)) {
                    //Creates new widget, to hold the splitted contents.
                    splittedWidget = new ParagraphWidget();
                    splittedWidget.characterFormat = paragraphWidget.characterFormat;
                    splittedWidget.paragraphFormat = paragraphWidget.paragraphFormat;
                    splittedWidget.index = paragraphWidget.index;
                    this.updateWidgetLocation(paragraphWidget, splittedWidget);
                    splittedWidget.height = lineWidget.height;
                }
                else {
                    splittedWidget.height += lineWidget.height;
                }
                splittedWidget.childWidgets.push(lineWidget);
                lineWidget.paragraph = splittedWidget;
            }
            this.getFootnoteFromLine(lineWidget, footNoteCollection);
            lineBottom += lineWidget.height;
        }
        return splittedWidget;
    };
    Layout.prototype.getSplittedWidgetForTable = function (bottom, tableCollection, tableWidget, footNoteCollection) {
        var rowBottom = tableWidget.y;
        var splittedWidget = undefined;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = undefined;
            var childWidget = tableWidget.childWidgets[i];
            // if (childWidget instanceof TableRowWidget) {
            rowWidget = childWidget;
            // }
            var rowHeight = rowWidget.height;
            if (bottom < rowBottom + rowHeight || !isNullOrUndefined(splittedWidget)) {
                //ToDo: Check whether row included in vertical merge or AllowRowSplitbyPage is true, if so split row.
                //Checks if atleast first line fits in the client area.
                var splittedRow = undefined;
                var allowRowBreakAcrossPages = true;
                if (!isNullOrUndefined(rowWidget) && !isNullOrUndefined(rowWidget.rowFormat)) {
                    allowRowBreakAcrossPages = rowWidget.rowFormat.allowBreakAcrossPages;
                }
                if (allowRowBreakAcrossPages) {
                    /* eslint-disable-next-line max-len */
                    splittedRow = (isNullOrUndefined(splittedWidget) && this.isFirstLineFitForRow(bottom, rowWidget)) ? this.getSplittedWidgetForRow(bottom, tableCollection, [rowWidget], rowWidget, footNoteCollection) : rowWidget;
                }
                else {
                    if ((isNullOrUndefined(tableWidget.containerWidget.containerWidget.previousWidget)
                        && this.isFirstLineFitForRow(bottom, rowWidget))
                        || (tableWidget.isInsideTable
                            && !(tableWidget.containerWidget.containerWidget.rowFormat.allowBreakAcrossPages))) {
                        splittedRow = this.getSplittedWidgetForRow(bottom, tableCollection, [rowWidget], rowWidget, footNoteCollection);
                    }
                    else if (!isNullOrUndefined(tableWidget.containerWidget.containerWidget.previousWidget)) {
                        splittedRow = rowWidget;
                    }
                }
                if (!isNullOrUndefined(splittedRow)) {
                    if (i === 0 && splittedRow === rowWidget) {
                        //Returns if the whole table does not fit in current page.
                        return tableWidget;
                    }
                    if (tableWidget.childWidgets.indexOf(splittedRow) !== -1) {
                        tableWidget.childWidgets.splice(tableWidget.childWidgets.indexOf(splittedRow), 1);
                        i--;
                        tableWidget.height -= splittedRow.height;
                    }
                    else {
                        tableWidget.height -= rowHeight - rowWidget.height;
                    }
                    if (isNullOrUndefined(splittedWidget)) {
                        //Creates new widget, to hold the splitted contents.
                        splittedWidget = this.createTableWidget(tableWidget);
                        this.updateWidgetLocation(tableWidget, splittedWidget);
                        splittedWidget.height = splittedRow.height;
                    }
                    else {
                        splittedWidget.height += splittedRow.height;
                    }
                    splittedWidget.childWidgets.push(splittedRow);
                    splittedRow.containerWidget = splittedWidget;
                }
            }
            rowBottom += rowWidget.height;
        }
        return splittedWidget;
    };
    Layout.prototype.isFirstLineFitForPara = function (bottom, paraWidget) {
        var lineWidget = paraWidget.childWidgets[0];
        var lineHeight = lineWidget.height;
        var height = this.getFootNoteHeightInLine(lineWidget);
        height += this.existFootnoteHeight;
        lineHeight += height;
        if (paraWidget.paragraphFormat.keepLinesTogether) {
            lineHeight = paraWidget.height;
        }
        var cellwidget = lineWidget.paragraph.containerWidget;
        // let document: WordDocument = undefined;
        // if (!isNullOrUndefined(lineWidget.paragraph.currentNode) && !isNullOrUndefined(cellwidget.containerWidget)) {
        //     document = WordDocument.getDocumentOf(lineWidget.paragraph.currentNode);
        // }
        //checks first line of the page is exceed the page height
        if (this.documentHelper.isFirstLineFitInShiftWidgets) {
            /* eslint-disable-next-line max-len */
            if (this.viewer.clientActiveArea.y === this.viewer.clientArea.y && paraWidget.y + lineHeight >= bottom) {
                return true;
            }
        }
        else if (!cellwidget.ownerTable.isInsideTable && cellwidget.containerWidget.y === this.viewer.clientArea.y
            && paraWidget.y + lineHeight >= bottom) {
            return true;
        }
        return (paraWidget.y + lineHeight <= bottom);
    };
    Layout.prototype.isFirstLineFitForTable = function (bottom, tableWidget) {
        var rowWidget = undefined;
        var isFit = false;
        var childWidget = tableWidget.childWidgets[0];
        // if (childWidget instanceof TableRowWidget) {
        rowWidget = childWidget;
        // }
        if (!isNullOrUndefined(rowWidget)) {
            isFit = this.isFirstLineFitForRow(bottom, rowWidget);
        }
        return isFit;
    };
    Layout.prototype.isFirstLineFitForRow = function (bottom, rowWidget) {
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var cellWidget = rowWidget.childWidgets[i];
            if (!this.isFirstLineFitForCell(bottom, cellWidget)) {
                return false;
            }
        }
        return true;
    };
    Layout.prototype.isFirstLineFitForCell = function (bottom, cellWidget) {
        if (cellWidget.childWidgets.length === 0) {
            return true;
        }
        if (cellWidget.childWidgets[0] instanceof ParagraphWidget) {
            var paraWidget = cellWidget.childWidgets[0];
            return this.isFirstLineFitForPara(bottom - cellWidget.margin.bottom, paraWidget);
        }
        else {
            var tableWidget = cellWidget.childWidgets[0];
            return this.isFirstLineFitForTable(bottom - cellWidget.margin.bottom, tableWidget);
        }
    };
    Layout.prototype.updateWidgetLocation = function (widget, table) {
        table.x = widget.x;
        table.y = widget.y;
        table.width = widget.width;
    };
    Layout.prototype.updateChildLocationForTable = function (top, tableWidget) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            //rowWidget.x = rowWidget.x;
            rowWidget.y = top;
            this.updateChildLocationForRow(top, rowWidget);
            top += rowWidget.height;
        }
    };
    Layout.prototype.updateChildLocationForRow = function (top, rowWidget) {
        var spacing = 0;
        if (rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
            spacing = HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
        }
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var cellWidget = rowWidget.childWidgets[i];
            //cellWidget.x = cellWidget.x;
            cellWidget.index = cellWidget.cellIndex;
            cellWidget.y = top + cellWidget.margin.top + spacing;
            this.updateChildLocationForCellOrShape(cellWidget.y, cellWidget);
        }
    };
    Layout.prototype.updateChildLocationForCellOrShape = function (top, widget) {
        var container = widget;
        if (widget instanceof ShapeElementBox) {
            container = widget.textFrame;
        }
        for (var i = 0; i < container.childWidgets.length; i++) {
            var skipHeight = false;
            if (container.childWidgets[i] instanceof TableWidget && container.childWidgets[i].wrapTextAround
                && !isNullOrUndefined(container.childWidgets[i + 1]) && container.childWidgets[i + 1].y > container.childWidgets[i].y
                && container.childWidgets[i + 1].y < (container.childWidgets[i].y + container.childWidgets[i].height)) {
                skipHeight = true;
            }
            container.childWidgets[i].x = container.childWidgets[i].x;
            container.childWidgets[i].y = top;
            if (container.childWidgets[i] instanceof TableWidget) {
                this.updateChildLocationForTable(top, container.childWidgets[i]);
            }
            if (!skipHeight) {
                top += container.childWidgets[i].height;
            }
        }
    };
    Layout.prototype.updateCellVerticalPosition = function (cellWidget, isUpdateToTop, isInsideTable) {
        var containerWidget = cellWidget.ownerTable.containerWidget;
        if (containerWidget instanceof BlockContainer || containerWidget instanceof TextFrame || isInsideTable) {
            var displacement = this.getDisplacement(cellWidget, isUpdateToTop);
            //Update Y position alone for the child widget of cell
            this.updateCellContentVerticalPosition(cellWidget, displacement, isUpdateToTop);
        }
    };
    Layout.prototype.updateCellContentVerticalPosition = function (cellWidget, displacement, isUpdateToTop) {
        if (displacement === 0) {
            return;
        }
        var location = cellWidget.y + displacement;
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                var para = cellWidget.childWidgets[i];
                para.y = location;
                this.updateShapeInsideCell(para, displacement);
            }
            else {
                this.updateTableWidgetLocation(cellWidget.childWidgets[i], location, isUpdateToTop);
            }
            location = location + cellWidget.childWidgets[i].height;
        }
    };
    Layout.prototype.updateShapeInsideCell = function (paragraph, displacement) {
        for (var i = 0; i < paragraph.floatingElements.length; i++) {
            var floatElement = paragraph.floatingElements[i];
            floatElement.y += displacement;
            if (floatElement instanceof ShapeElementBox) {
                this.updateChildLocationForCellOrShape(floatElement.y, floatElement);
            }
        }
    };
    Layout.prototype.updateTableWidgetLocation = function (tableWidget, location, isUpdateToTop) {
        tableWidget.y = location = location + tableWidget.topBorderWidth;
        var cellSpacing = 0;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            rowWidget.y = location;
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                var cellWidget = rowWidget.childWidgets[j];
                cellWidget.y = location + cellWidget.margin.top + cellSpacing;
                this.updateCellVerticalPosition(cellWidget, isUpdateToTop, true);
            }
            location = location + rowWidget.height;
        }
        return location;
    };
    Layout.prototype.getDisplacement = function (cellWidget, isUpdateToTop) {
        //Gets the height of row
        var rowHeight = 0;
        var rowWidget = cellWidget.containerWidget;
        var padding = cellWidget.margin.top + cellWidget.margin.bottom;
        if (!isNullOrUndefined(cellWidget.cellFormat) && cellWidget.cellFormat.rowSpan > 1) {
            rowHeight = cellWidget.height;
        }
        else {
            rowHeight = ((!isNullOrUndefined(rowWidget) ? rowWidget.height : 0) - padding);
        }
        //Gets the height of content within the cell
        var cellContentHeight = this.getCellContentHeight(cellWidget, true);
        //Displacement field holds the value which has reduced from rowHeight and cellContentHeight
        var displacement = 0;
        if (rowHeight > cellContentHeight) {
            displacement = rowHeight - cellContentHeight;
            if (cellWidget.cellFormat.verticalAlignment === 'Center') {
                displacement = displacement / 2;
            }
            else if ((cellWidget.cellFormat.verticalAlignment === 'Top' || isUpdateToTop)) {
                displacement = 0;
            }
        }
        return displacement;
    };
    Layout.prototype.getCellContentHeight = function (cellWidget, isDisplacement) {
        if (isNullOrUndefined(cellWidget.childWidgets)) {
            return 0;
        }
        var contentHeight = 0;
        var cellY = cellWidget.y;
        var withShapeContentHeight = 0;
        var withShapeBottom = 0;
        var considerShapeHeight = false;
        var considerAsTop = false;
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                var para = cellWidget.childWidgets[i];
                contentHeight += cellWidget.childWidgets[i].height;
                for (var k = 0; k < para.floatingElements.length; k++) {
                    considerShapeHeight = true;
                    var floatElement = para.floatingElements[k];
                    if ((cellWidget.y + cellWidget.containerWidget.height) > (floatElement.y + floatElement.height)
                        && (floatElement.y + floatElement.height) > withShapeBottom) {
                        withShapeContentHeight = Math.abs(cellY - (floatElement.y + floatElement.height));
                        withShapeBottom = floatElement.y + floatElement.height;
                        considerAsTop = false;
                    }
                    else {
                        considerAsTop = true;
                    }
                }
            }
            else {
                if (this.considerPositionTableHeight(cellWidget, cellWidget.childWidgets[i])) {
                    contentHeight += cellWidget.childWidgets[i].height;
                }
            }
        }
        if ((cellY + contentHeight) > withShapeBottom) {
            considerShapeHeight = false;
        }
        return (isDisplacement && considerShapeHeight) ? withShapeContentHeight :
            (isDisplacement && considerAsTop ? cellWidget.ownerRow.height : contentHeight);
    };
    Layout.prototype.considerPositionTableHeight = function (cellWidget, nestedWrapTable) {
        if (nestedWrapTable.isLayouted && nestedWrapTable.wrapTextAround) {
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                var blockWidget = cellWidget.childWidgets[i];
                if (nestedWrapTable !== blockWidget && (blockWidget.y === nestedWrapTable.y
                    || (blockWidget.y + blockWidget.height) < nestedWrapTable.y)) {
                    return false;
                }
            }
        }
        return true;
    };
    Layout.prototype.getTableLeftBorder = function (borders) {
        if (!isNullOrUndefined(borders.left)) {
            return borders.left;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getTableRightBorder = function (borders) {
        if (!isNullOrUndefined(borders.right)) {
            return borders.right;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getTableTopBorder = function (borders) {
        if (!isNullOrUndefined(borders.top)) {
            return borders.top;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getTableBottomBorder = function (borders) {
        if (!isNullOrUndefined(borders.bottom)) {
            return borders.bottom;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getCellDiagonalUpBorder = function (tableCell) {
        var diagonalUpBorder = undefined;
        var cellBorder = undefined;
        cellBorder = tableCell.cellFormat.borders;
        diagonalUpBorder = cellBorder.diagonalUp;
        return diagonalUpBorder;
    };
    Layout.prototype.getCellDiagonalDownBorder = function (tableCell) {
        var diagonalDownBorder = undefined;
        var cellBorder = undefined;
        cellBorder = tableCell.cellFormat.borders;
        diagonalDownBorder = cellBorder.diagonalDown;
        return diagonalDownBorder;
    };
    Layout.prototype.getTableWidth = function (table) {
        var width = 0;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            var rowWidth = 0;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                rowWidth += HelperMethods.convertPointToPixel(cell.cellFormat.cellWidth);
            }
            if (width < rowWidth) {
                width = rowWidth;
            }
        }
        return width;
    };
    //#region shifting
    Layout.prototype.layoutNextItemsBlock = function (blockAdv, viewer, isFootnoteReLayout) {
        var sectionIndex = blockAdv.bodyWidget.sectionIndex;
        var block = blockAdv;
        var splittedWidget = block.getSplitWidgets();
        var nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        if (isNullOrUndefined(nextBlock) || this.documentHelper.blockToShift === block) {
            this.documentHelper.blockToShift = undefined;
        }
        var updateNextBlockList = true;
        while (nextBlock instanceof BlockWidget && nextBlock.bodyWidget.sectionIndex === sectionIndex) {
            if (!isNullOrUndefined(isFootnoteReLayout) && isFootnoteReLayout && !nextBlock.isLayouted && this.isInitialLoad) {
                break;
            }
            var currentWidget = undefined;
            var blocks = block.getSplitWidgets();
            currentWidget = blocks[blocks.length - 1];
            // if (viewer.fieldEndParagraph === block) {
            //     //Sets field end paragraph to undefined, inorder to hold reLayouting with this paragraph.
            //     viewer.fieldEndParagraph = undefined;
            // }
            block = nextBlock;
            if (this.documentHelper.blockToShift === block) {
                this.documentHelper.blockToShift = undefined;
            }
            updateNextBlockList = false;
            var nextWidget = undefined;
            nextWidget = block.getSplitWidgets()[0];
            /* eslint-disable-next-line max-len */
            if (this.documentHelper.fieldStacks.length === 0 && !isNullOrUndefined(nextWidget) && currentWidget.containerWidget === nextWidget.containerWidget
                && (HelperMethods.round(nextWidget.y, 2) === HelperMethods.round(currentWidget.y + currentWidget.height, 2))) {
                if (!isNullOrUndefined(this.documentHelper.blockToShift)) {
                    this.documentHelper.blockToShift = block;
                }
                else if (nextWidget.bodyWidget) {
                    var floatingElementLength = nextWidget.bodyWidget.floatingElements.length;
                    if (floatingElementLength > 0) {
                        this.documentHelper.blockToShift = block;
                    }
                }
                break;
            }
            updateNextBlockList = true;
            if (viewer.owner.isShiftingEnabled && this.documentHelper.fieldStacks.length === 0) {
                this.documentHelper.blockToShift = block;
                break;
            }
            else if (isNullOrUndefined(this.viewer.owner.editorModule) || !this.viewer.owner.editorModule.isInsertingTOC) {
                block = block.combineWidget(this.viewer);
                //let paragraph: ParagraphWidget;
                if (currentWidget.containerWidget !== block.containerWidget) {
                    if (!(currentWidget instanceof ParagraphWidget) ||
                        (currentWidget instanceof ParagraphWidget) && !currentWidget.isEndsWithPageBreak) {
                        /* eslint-disable-next-line max-len */
                        this.updateContainerWidget(block, currentWidget.containerWidget, currentWidget.indexInOwner + 1, false);
                    }
                }
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true);
                    block.isGridUpdated = false;
                    //paragraph = this.documentHelper.selection.getFirstParagraphInFirstCell(block as TableWidget);
                }
                else {
                    //paragraph = block as ParagraphWidget;
                }
                //if ((this.viewer.owner.isDocumentLoaded) && this.viewer.owner.editorModule) {
                //    this.viewer.owner.editorModule.updateWholeListItems(paragraph);
                //}
                viewer.updateClientAreaForBlock(block, true);
                if (this.viewer instanceof WebLayoutViewer || block.bodyWidget instanceof HeaderFooterWidget) {
                    block.containerWidget.height -= block.height;
                }
                this.documentHelper.layout.layoutBlock(block, 0);
                viewer.updateClientAreaForBlock(block, false);
            }
            splittedWidget = nextBlock.getSplitWidgets();
            nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        }
        if (!viewer.owner.isShiftingEnabled || (this.documentHelper.blockToShift !== block)) {
            this.viewer.owner.editorModule.updateListItemsTillEnd(block, updateNextBlockList);
        }
    };
    /**
     * Update the client area for the line widget.
     *
     * @param {LineWidget} startLineWidget LineWidget instance.
     * @private
     */
    Layout.prototype.updateClientAreaForLine = function (startLineWidget) {
        startLineWidget.marginTop = 0;
        //Clears the line widget starting from current line.
        var top = this.documentHelper.selection.getTop(startLineWidget);
        var left = this.viewer.clientArea.x;
        this.viewer.cutFromTop(top);
        this.viewer.cutFromLeft(left);
    };
    Layout.prototype.getParentTable = function (block) {
        var widget = block;
        while (widget.containerWidget) {
            if (widget.containerWidget instanceof BlockContainer || widget.containerWidget instanceof TextFrame) {
                return widget;
            }
            widget = widget.containerWidget;
        }
        return undefined;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.reLayoutParagraph = function (paragraphWidget, lineIndex, elementBoxIndex, isBidi, isSkip) {
        if (!this.allowLayout) {
            return;
        }
        this.isRelayout = true;
        if (paragraphWidget.containerWidget instanceof TextFrame
            && paragraphWidget.containerWidget.containerShape.textWrappingStyle === 'Inline') {
            lineIndex = paragraphWidget.containerWidget.containerShape.line.indexInOwner;
            paragraphWidget = paragraphWidget.containerWidget.containerShape.paragraph;
        }
        isBidi = isNullOrUndefined(isBidi) ? false : isBidi;
        this.isRelayout = true;
        if (this.documentHelper.blockToShift === paragraphWidget) {
            this.layoutBodyWidgetCollection(paragraphWidget.index, paragraphWidget.containerWidget, paragraphWidget, false);
            this.isBidiReLayout = true;
        }
        else {
            if (this.isBidiReLayout) {
                this.isBidiReLayout = false;
            }
        }
        // let isElementMoved: boolean = elementBoxIndex > 0;
        if (paragraphWidget.isInsideTable) {
            this.isBidiReLayout = true;
            this.reLayoutTable(paragraphWidget);
            /* eslint-disable-next-line max-len */
            if (this.isFootnoteContentChanged && (!isNullOrUndefined(paragraphWidget.bodyWidget)) && !isNullOrUndefined(paragraphWidget.bodyWidget.page.footnoteWidget)) {
                var foot = paragraphWidget.bodyWidget.page.footnoteWidget;
                this.layoutfootNote(foot);
            }
            this.isBidiReLayout = false;
        }
        else {
            // this.isRelayout = true;
            this.reLayoutLine(paragraphWidget, lineIndex, isBidi, isSkip);
        }
        if (paragraphWidget.bodyWidget instanceof HeaderFooterWidget &&
            paragraphWidget.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
            this.shiftFooterChildLocation(paragraphWidget.bodyWidget, this.viewer);
        }
    };
    Layout.prototype.getParentRow = function (block) {
        var cell = block;
        while (cell.ownerTable !== null && cell.ownerTable.isInsideTable) {
            cell = cell.ownerTable.associatedCell;
        }
        return cell.ownerRow;
    };
    Layout.prototype.reLayoutRow = function (block) {
        if (block instanceof ParagraphWidget) {
            block = block.associatedCell;
        }
        var currentRow = this.getParentRow(block).getSplitWidgets()[0];
        if (!isNullOrUndefined(currentRow) && !currentRow.ownerTable.tableFormat.allowAutoFit) {
            var currentTable = currentRow.ownerTable.getSplitWidgets()[0].combineWidget(this.viewer);
            var startRow = currentRow;
            while (this.isVerticalMergedCellContinue(startRow)) {
                var previousRow = startRow.previousWidget;
                if (isNullOrUndefined(previousRow)) {
                    break;
                }
                startRow = previousRow;
            }
            var bodyWidget = currentTable.containerWidget;
            if (this.viewer instanceof WebLayoutViewer) {
                bodyWidget.height -= currentTable.height;
            }
            if ((this.viewer.owner.enableHeaderAndFooter || block.isInHeaderFooter) && !(bodyWidget instanceof TextFrame)) {
                block.bodyWidget.isEmpty = false;
                bodyWidget.height -= currentTable.height;
                /* eslint-disable-next-line max-len */
                this.viewer.updateHeaderFooterClientAreaWithTop(currentTable.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(currentTable), bodyWidget.page);
            }
            else if (bodyWidget instanceof TextFrame) {
                this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
            }
            else {
                this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page);
            }
            /* eslint-disable-next-line max-len */
            var area = new Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
            var clientArea = new Rect(area.x, area.y, area.width, area.height);
            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                var block_2 = this.documentHelper.selection.getFirstParagraphInFirstCell(currentTable);
                this.viewer.owner.editorModule.updateWholeListItems(block_2);
            }
            this.viewer.updateClientAreaForBlock(currentTable, true);
            this.viewer.cutFromTop(startRow.y);
            this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
            //Clear Hieght for all the content
            currentTable.height = 0;
            do {
                this.clearRowWidget(currentRow, true, true, true);
                this.layoutRow([currentTable], currentRow, true);
                if (startRow === currentRow) {
                    break;
                }
                startRow = startRow.nextRow;
            } while (startRow && startRow !== currentRow);
            this.updateChildLocationForTable(currentTable.y, currentTable);
            this.viewer.clientArea = clientArea;
            this.viewer.clientActiveArea = new Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height);
            this.viewer.updateClientAreaForBlock(currentTable, true);
            currentTable.x -= currentTable.leftBorderWidth;
            currentTable.y -= currentTable.topBorderWidth;
            this.viewer.cutFromTop(currentTable.y);
            this.shiftTableWidget(currentTable, this.viewer, true);
            this.layoutNextItemsBlock(currentTable, this.viewer);
        }
        else {
            this.currentCell = block;
            this.reLayoutTable(block);
            this.currentCell = undefined;
        }
    };
    Layout.prototype.reLayoutTable = function (block, isFootnoteReLayout) {
        //Get Top level owner of block
        var table = this.getParentTable(block);
        //Combine splitted table in to single table
        var currentTable = table.combineWidget(this.viewer);
        var bodyWidget = currentTable.containerWidget;
        if (this.viewer instanceof WebLayoutViewer) {
            bodyWidget.height -= currentTable.height;
        }
        if ((this.viewer.owner.enableHeaderAndFooter || block.isInHeaderFooter) && !(bodyWidget instanceof TextFrame)) {
            block.bodyWidget.isEmpty = false;
            bodyWidget.height -= currentTable.height;
            /* eslint-disable-next-line max-len */
            this.viewer.updateHeaderFooterClientAreaWithTop(table.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(table), bodyWidget.page);
        }
        else if (bodyWidget instanceof TextFrame) {
            this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
        }
        else {
            this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page);
        }
        //Clear Hieght for all the content
        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
            var block_3 = this.documentHelper.selection.getFirstParagraphInFirstCell(currentTable);
            this.viewer.owner.editorModule.updateWholeListItems(block_3);
        }
        this.viewer.updateClientAreaForBlock(currentTable, true);
        //Remove border width
        currentTable.x -= currentTable.leftBorderWidth;
        currentTable.y -= currentTable.topBorderWidth;
        //Update Client area for current position
        var yPos = this.getYPosition(currentTable);
        this.viewer.cutFromTop(yPos);
        this.clearTableWidget(currentTable, true, true, true, true);
        this.isBidiReLayout = true;
        this.layoutBlock(currentTable, 0);
        this.viewer.updateClientAreaForBlock(currentTable, false);
        this.layoutNextItemsBlock(currentTable, this.viewer, isFootnoteReLayout);
    };
    Layout.prototype.getYPosition = function (table) {
        if (table.wrapTextAround) {
            var prevWidget = table.previousWidget;
            while (prevWidget) {
                if (prevWidget instanceof ParagraphWidget) {
                    return prevWidget.y + prevWidget.height;
                }
                else if (prevWidget instanceof TableWidget) {
                    if (prevWidget.wrapTextAround) {
                        prevWidget = prevWidget.previousWidget;
                    }
                    else {
                        return prevWidget.y + prevWidget.height;
                    }
                }
            }
            return this.viewer.clientActiveArea.y;
        }
        return table.y;
    };
    Layout.prototype.clearFootnoteReference = function (table, updateClientHeight) {
        if (table.footnoteElement && table.footnoteElement.length > 0) {
            var startPage = table.bodyWidget.page;
            for (var i = table.footnoteElement.length - 1; i >= 0; i--) {
                var footnote = table.footnoteElement[i];
                footnote.isLayout = false;
                var footNoteWidget = footnote.bodyWidget.containerWidget;
                if (footNoteWidget && footNoteWidget.bodyWidgets.indexOf(footnote.bodyWidget) !== -1) {
                    var footnoteHeight = this.getFootNoteHeight(footnote.bodyWidget);
                    footNoteWidget.height -= footnoteHeight;
                    footNoteWidget.bodyWidgets.splice(footnote.bodyWidget.indexInOwner, 1);
                    if (updateClientHeight && footNoteWidget.page === startPage) {
                        this.viewer.clientActiveArea.height += footnoteHeight;
                        this.viewer.clientArea.height += footnoteHeight;
                    }
                }
                if (footNoteWidget.bodyWidgets.length === 0 && footNoteWidget.page) {
                    footNoteWidget.page.footnoteWidget = undefined;
                }
                footnote.bodyWidget.containerWidget = undefined;
            }
            table.footnoteElement = undefined;
        }
    };
    /**
     * @private
     */
    Layout.prototype.clearTableWidget = function (table, clearPosition, clearHeight, clearGrid, updateClientHeight) {
        table.height = 0;
        if (clearGrid) {
            table.isGridUpdated = false;
        }
        if (clearPosition) {
            table.y = 0;
            table.x = 0;
            if (table.footnoteElement && table.footnoteElement.length > 0) {
                this.clearFootnoteReference(table, updateClientHeight);
            }
        }
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            this.clearRowWidget(row, clearPosition, clearHeight, clearGrid);
        }
    };
    /**
     * @private
     */
    Layout.prototype.clearRowWidget = function (row, clearPosition, clearHeight, clearGrid) {
        row.height = 0;
        if (clearPosition) {
            row.y = 0;
            row.x = 0;
        }
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            this.clearCellWidget(cell, clearPosition, clearHeight, clearGrid);
        }
    };
    /**
     * @private
     */
    Layout.prototype.clearCellWidget = function (cell, clearPosition, clearHeight, clearGrid) {
        cell.height = 0;
        if (clearPosition) {
            cell.y = 0;
            cell.x = 0;
        }
        this.clearBlockWidget(cell.childWidgets, clearPosition, clearHeight, clearGrid);
    };
    /**
     * @private
     */
    Layout.prototype.clearBlockWidget = function (blocks, clearPosition, clearHeight, clearGrid) {
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block instanceof ParagraphWidget) {
                if (clearPosition) {
                    block.y = 0;
                    block.x = 0;
                }
                if (clearHeight) {
                    block.height = 0;
                }
            }
            else {
                this.clearTableWidget(block, clearPosition, clearHeight, clearGrid);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.layoutBodyWidgetCollection = function (blockIndex, bodyWidget, block, shiftNextWidget, isSkipShifting) {
        if (!isNullOrUndefined(this.documentHelper.owner)
            && this.documentHelper.owner.isLayoutEnabled) {
            if (bodyWidget instanceof BlockContainer || bodyWidget instanceof TextFrame) {
                var curretBlock = this.checkAndGetBlock(bodyWidget, blockIndex);
                if (isNullOrUndefined(curretBlock)) {
                    return;
                }
                if (this.viewer instanceof WebLayoutViewer) {
                    curretBlock.containerWidget.height -= curretBlock.height;
                }
                if (bodyWidget instanceof HeaderFooterWidget) {
                    bodyWidget.isEmpty = false;
                    this.viewer.updateHeaderFooterClientAreaWithTop(bodyWidget.sectionFormat, bodyWidget.headerFooterType.indexOf('Header') !== -1, bodyWidget.page);
                    curretBlock.containerWidget.height -= curretBlock.height;
                }
                else if (bodyWidget instanceof TextFrame) {
                    this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
                }
                else if (!isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof FootNoteWidget) {
                    this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page, true);
                    if (bodyWidget.containerWidget.footNoteType === 'Footnote') {
                        this.isRelayoutFootnote = true;
                        this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                        this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                        //curretBlock.containerWidget.height -= curretBlock.height;
                        this.viewer.clientActiveArea.y = curretBlock.containerWidget.containerWidget.y;
                    }
                    else {
                        this.viewer.cutFromTop(bodyWidget.containerWidget.y);
                        this.layoutfootNote(bodyWidget.containerWidget);
                        return;
                    }
                    // curretBlock.containerWidget.height -= curretBlock.height;
                }
                else {
                    if (!isNullOrUndefined(bodyWidget.page.footnoteWidget)) {
                        if (bodyWidget.page.footnoteWidget.footNoteType === 'Footnote') {
                            this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page, true);
                        }
                        else {
                            this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page, true);
                        }
                    }
                    else {
                        this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page, true);
                    }
                    // if (bodyWidget.page.footnoteWidget) {
                    //     this.viewer.clientActiveArea.height -= bodyWidget.page.footnoteWidget.height;
                    //     this.viewer.clientArea.height -= bodyWidget.page.footnoteWidget.height;
                    // }
                }
                if (blockIndex > 0) {
                    var prevWidget = curretBlock.getSplitWidgets()[0].previousRenderedWidget;
                    if (!(prevWidget instanceof ParagraphWidget) ||
                        (prevWidget instanceof ParagraphWidget) && !prevWidget.isEndsWithPageBreak) {
                        this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                        if (isNullOrUndefined(isSkipShifting) && curretBlock.containerWidget !== prevWidget.containerWidget) {
                            /* eslint-disable-next-line max-len */
                            var prevBodyWidget = curretBlock.containerWidget;
                            var newBodyWidget = prevWidget.containerWidget;
                            var footWidgets = this.getFootNoteWidgetsOf(curretBlock);
                            this.updateContainerWidget(curretBlock, newBodyWidget, prevWidget.indexInOwner + 1, false);
                            this.moveFootNotesToPage(footWidgets, prevBodyWidget, newBodyWidget);
                        }
                    }
                    else if (prevWidget instanceof ParagraphWidget && prevWidget.isEndsWithPageBreak &&
                        prevWidget.containerWidget === curretBlock.containerWidget) {
                        this.moveBlocksToNextPage(prevWidget, false);
                    }
                }
                var currentParagraph = void 0;
                curretBlock = curretBlock.combineWidget(this.viewer);
                if (curretBlock instanceof TableWidget) {
                    this.clearTableWidget(curretBlock, true, true);
                    curretBlock.isGridUpdated = false;
                    currentParagraph = this.documentHelper.selection.getFirstParagraphInFirstCell(curretBlock);
                }
                else {
                    currentParagraph = curretBlock;
                }
                if ((this.viewer.owner.isDocumentLoaded) && this.viewer.owner.editorModule) {
                    this.viewer.owner.editorModule.updateWholeListItems(currentParagraph);
                }
                this.viewer.updateClientAreaForBlock(curretBlock, true);
                this.documentHelper.layout.layoutBlock(curretBlock, 0);
                this.viewer.updateClientAreaForBlock(curretBlock, false);
                if (!isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof FootNoteWidget) {
                    if (bodyWidget.containerWidget.footNoteType === 'Footnote') {
                        this.layoutfootNote(bodyWidget.containerWidget);
                    }
                }
                if (shiftNextWidget) {
                    this.shiftNextWidgets(curretBlock);
                }
                else {
                    this.layoutNextItemsBlock(curretBlock, this.viewer);
                }
            }
            else if (bodyWidget instanceof TableCellWidget) {
                /* eslint-disable-next-line max-len */
                var table = this.documentHelper.layout.getParentTable(bodyWidget.ownerTable).getSplitWidgets()[0];
                this.reLayoutTable(bodyWidget.ownerTable);
                this.layoutNextItemsBlock(table, this.viewer);
            }
        }
        this.isRelayoutFootnote = false;
    };
    Layout.prototype.checkAndGetBlock = function (containerWidget, blockIndex) {
        if (containerWidget instanceof TextFrame) {
            return containerWidget.childWidgets[blockIndex];
        }
        else {
            var sectionIndex = containerWidget.index;
            while (containerWidget && containerWidget.index === sectionIndex) {
                if (containerWidget.childWidgets.length > 0 && containerWidget.firstChild.index <= blockIndex &&
                    containerWidget.lastChild.index >= blockIndex) {
                    for (var i = 0; i < containerWidget.childWidgets.length; i++) {
                        var block = containerWidget.childWidgets[i];
                        if (block.index === blockIndex) {
                            return block;
                        }
                    }
                }
                if (containerWidget instanceof BodyWidget) {
                    containerWidget = containerWidget.nextRenderedWidget;
                }
                else {
                    break;
                }
            }
        }
        return undefined;
    };
    //#endregion
    //#region Table
    Layout.prototype.layoutTable = function (table, startIndex) {
        table.isBidiTable = table.bidi;
        if (!table.isGridUpdated) {
            table.buildTableColumns();
            table.isGridUpdated = true;
        }
        if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
            this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        var tableView = [table];
        this.addTableWidget(this.viewer.clientActiveArea, tableView);
        this.viewer.updateClientAreaTopOrLeft(table, true);
        var clientActiveAreaForTableWrap;
        var clientAreaForTableWrap;
        var wrapDiff = 0;
        if (table.wrapTextAround) {
            clientActiveAreaForTableWrap = this.viewer.clientActiveArea.clone();
            clientAreaForTableWrap = this.viewer.clientArea.clone();
            this.updateClientAreaForWrapTable(tableView, table, true, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        else {
            this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
            if (this.isWrapText) {
                wrapDiff = this.viewer.clientActiveArea.x - this.viewer.clientArea.x;
                this.isWrapText = false;
                table.x = this.viewer.clientActiveArea.x;
            }
        }
        var isHeader = table.childWidgets[0].rowFormat.isHeader;
        if (table.childWidgets.length > 0) {
            table.header = isHeader;
            table.continueHeader = isHeader;
            table.headerHeight = 0;
        }
        var row = table.childWidgets[startIndex];
        var index = tableView.length;
        while (row) {
            row = this.layoutRow(tableView, row);
            row = row.nextRow;
        }
        if (this.documentHelper.viewer instanceof PageLayoutViewer && table.wrapTextAround && (table.positioning.verticalAlignment === 'Bottom' || table.positioning.verticalAlignment === 'Center' || table.positioning.verticalAlignment === 'Outside')) {
            this.updateTableFloatPoints(table);
            this.updateChildLocationForTable(table.y, table);
        }
        this.updateWidgetsToPage(tableView, [], table);
        if (wrapDiff > 0) {
            this.viewer.clientArea.x = this.viewer.clientArea.x - wrapDiff;
        }
        if (table.wrapTextAround && table.bodyWidget) {
            this.updateClientAreaForWrapTable(tableView, table, false, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        tableView[tableView.length - 1].isLayouted = true;
        if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable && !table.wrapTextAround) {
            this.viewer.clientArea.x = this.viewer.clientArea.x + HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        return tableView[tableView.length - 1];
    };
    Layout.prototype.updateClientAreaForWrapTable = function (tables, table, beforeLayout, clientActiveAreaForTableWrap, clientAreaForTableWrap) {
        if (beforeLayout) {
            if (table.wrapTextAround) {
                this.updateTableFloatPoints(table);
                var clienactare = this.viewer.clientActiveArea.clone();
                var rect = this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
                if (clienactare.x !== rect.x) {
                    table.x = this.viewer.clientActiveArea.x;
                }
                if (clienactare.y !== rect.y) {
                    table.y = this.viewer.clientActiveArea.y;
                }
            }
        }
        else {
            if (table.wrapTextAround && table.bodyWidget) {
                if (tables.length == 1) {
                    if (table.bodyWidget.floatingElements.indexOf(table) === -1) {
                        table.bodyWidget.floatingElements.push(table);
                    }
                    if (!isNullOrUndefined(table.previousWidget) || table.isInHeaderFooter || table.isInsideTable) {
                        this.viewer.clientActiveArea = clientActiveAreaForTableWrap.clone();
                        this.viewer.clientArea = clientAreaForTableWrap.clone();
                    }
                    else {
                        this.viewer.updateClientArea(table.bodyWidget.sectionFormat, table.bodyWidget.page);
                    }
                }
                else {
                    this.documentHelper.tableLefts.pop();
                    this.viewer.updateClientArea(table.bodyWidget.sectionFormat, table.bodyWidget.page);
                    for (var z = 0; z < tables.length; z++) {
                        var bodyWidget = tables[z].bodyWidget;
                        if (!isNullOrUndefined(bodyWidget) && bodyWidget.floatingElements.indexOf(tables[z]) === -1) {
                            bodyWidget.floatingElements.push(tables[z]);
                        }
                    }
                }
            }
        }
    };
    Layout.prototype.addTableWidget = function (area, table, create) {
        var tableWidget = table[table.length - 1];
        if (create) {
            tableWidget = this.createTableWidget(tableWidget);
            table.push(tableWidget);
        }
        tableWidget.width = area.width;
        tableWidget.x = area.x;
        tableWidget.y = area.y;
        //Update the table height of tableWidget when cell spacing has been defined.
        if (tableWidget.tableFormat.cellSpacing > 0) {
            tableWidget.height = tableWidget.height + HelperMethods.convertPointToPixel(tableWidget.tableFormat.cellSpacing);
            if (!tableWidget.isBidiTable) {
                /* eslint-disable-next-line max-len */
                tableWidget.leftBorderWidth = HelperMethods.convertPointToPixel(this.getTableLeftBorder(tableWidget.tableFormat.borders).getLineWidth());
                /* eslint-disable-next-line max-len */
                tableWidget.rightBorderWidth = HelperMethods.convertPointToPixel(this.getTableRightBorder(tableWidget.tableFormat.borders).getLineWidth());
            }
            else { // Right to left direction table.
                /* eslint-disable-next-line max-len */
                tableWidget.leftBorderWidth = HelperMethods.convertPointToPixel(this.getTableRightBorder(tableWidget.tableFormat.borders).getLineWidth());
                /* eslint-disable-next-line max-len */
                tableWidget.rightBorderWidth = HelperMethods.convertPointToPixel(this.getTableLeftBorder(tableWidget.tableFormat.borders).getLineWidth());
            }
            /* eslint-disable-next-line max-len */
            tableWidget.topBorderWidth = HelperMethods.convertPointToPixel(this.getTableTopBorder(tableWidget.tableFormat.borders).getLineWidth());
            /* eslint-disable-next-line max-len */
            tableWidget.bottomBorderWidth = HelperMethods.convertPointToPixel(this.getTableBottomBorder(tableWidget.tableFormat.borders).getLineWidth());
            tableWidget.x += tableWidget.leftBorderWidth;
            tableWidget.y += tableWidget.topBorderWidth;
            tableWidget.width -= tableWidget.leftBorderWidth;
            tableWidget.width -= tableWidget.rightBorderWidth;
            tableWidget.height += tableWidget.bottomBorderWidth;
        }
        return tableWidget;
    };
    Layout.prototype.updateWidgetsToPage = function (tables, rows, table, endRowWidget) {
        var viewer = this.viewer;
        var tableWidget = tables[tables.length - 1];
        if (!table.isInsideTable) {
            for (var i = 0; i < tables.length; i++) {
                this.updateHeightForTableWidget(tables, rows, tables[i], endRowWidget);
            }
            if (tableWidget.childWidgets.length > 0 && tableWidget.y !== tableWidget.childWidgets[0].y) {
                tableWidget.y = tableWidget.childWidgets[0].y;
            }
            // Need to update on this further
            //Adds the table widget to owner cell widget.
            // (viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as TableCellWidget).childWidgets.push(tableWidget);
            // tableWidget.containerWidget = viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as BodyWidget;
            // (viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as TableCellWidget).height = (viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as TableCellWidget).height + tableWidget.height;
        }
        // Shift the widgets for Right to left directed table.
        if (table.isBidiTable) {
            for (var i = 0; i < tables.length; i++) {
                var layoutedTable = tables[i];
                for (var j = 0; j < layoutedTable.childWidgets.length; j++) {
                    var layoutedRow = layoutedTable.childWidgets[j];
                    layoutedRow.shiftWidgetForRtlTable();
                }
            }
        }
        if (table.tableFormat.cellSpacing > 0) {
            /* eslint-disable-next-line max-len */
            if (tableWidget.y + tableWidget.height + HelperMethods.convertPointToPixel(table.tableFormat.cellSpacing) > viewer.clientArea.bottom && viewer instanceof WebLayoutViewer) {
                //update the table height when split to next page. Which is equivalent Ms Word Behaviour.
                //In Ms Word if the Table Split to next page the bottom spacing of the table will be half of the current spacing.
                //And the Remaining space will be used in next page top of the table.
                tableWidget.height = tableWidget.height - HelperMethods.convertPointToPixel(table.tableFormat.cellSpacing) / 2;
            }
            //Update the current Y position of current clientactivearea.
            viewer.cutFromTop(tableWidget.y + tableWidget.height);
        }
        if (this.viewer instanceof WebLayoutViewer) {
            table.containerWidget.height += table.height;
        }
        if (table.bodyWidget instanceof HeaderFooterWidget) {
            table.containerWidget.height += table.height;
            if (this.viewer.owner.enableHeaderAndFooter && table.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                this.shiftFooterChildLocation(table.bodyWidget, this.viewer);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.updateHeightForTableWidget = function (tables, rows, tableWidget, endRowWidget) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            if (rowWidget === endRowWidget) {
                break;
            }
            this.updateHeightForRowWidget(this.viewer, true, tables, rows, rowWidget, true, endRowWidget);
        }
    };
    //#endregion
    //#region Row
    Layout.prototype.layoutRow = function (tableWidget, row, isRowLayout) {
        var isNestedTable = row.ownerTable.isInsideTable;
        if (!isNestedTable) {
            this.updateExistingFootnoteHeight(row);
        }
        var viewer = this.viewer;
        var rowWidgets = [row];
        this.addTableRowWidget(viewer.clientActiveArea, rowWidgets);
        viewer.updateClientAreaForRow(row, true);
        var topMargin = this.getMaxTopCellMargin(row);
        var bottomMargin = this.getMaxBottomCellMargin(row);
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            this.layoutCell(cell, topMargin + row.topBorderWidth, bottomMargin + row.bottomBorderWidth);
        }
        viewer.updateClientAreaForRow(row, false);
        var rows = [row];
        if (!isRowLayout) {
            this.updateWidgetsToTable(tableWidget, rows, row);
        }
        if (!isNestedTable) {
            this.layoutedFootnoteElement = [];
        }
        return rows[rows.length - 1];
    };
    Layout.prototype.updateExistingFootnoteHeight = function (row) {
        this.layoutedFootnoteElement = [];
        if (!isNullOrUndefined(row.bodyWidget.page.footnoteWidget) && row.bodyWidget.page.footnoteWidget.bodyWidgets.length !== 0) {
            this.existFootnoteHeight = row.bodyWidget.page.footnoteWidget.height;
        }
        else {
            this.existFootnoteHeight = 0;
        }
    };
    Layout.prototype.getAdjacentRowCell = function (cell, cellStartPos, cellEndPos, rowIndex) {
        var adjCells = [];
        var adjRow = cell.ownerRow.ownerTable.childWidgets[rowIndex];
        var previouRow = false;
        if (adjRow) {
            if (adjRow.childWidgets[0].x > cell.x && rowIndex !== 0) {
                adjRow = cell.ownerRow.ownerTable.childWidgets[rowIndex - 1];
                previouRow = true;
            }
            for (var i = 0; i < adjRow.childWidgets.length; i++) {
                var addAdjCell = true;
                var adjCell = adjRow.childWidgets[i];
                var adjCellStartPos = adjCell.x - adjCell.margin.left;
                if (previouRow) {
                    var prevAdjRow = cell.ownerRow.ownerTable.childWidgets[rowIndex];
                    for (var j = 0; j < prevAdjRow.childWidgets.length; j++) {
                        var prevAdjCell = prevAdjRow.childWidgets[j];
                        var prevAdjCellStartPos = prevAdjCell.x - prevAdjCell.margin.left;
                        if (adjCellStartPos === prevAdjCellStartPos) {
                            adjRow = prevAdjRow;
                            i = j;
                            i--;
                            previouRow = false;
                            addAdjCell = false;
                            break;
                        }
                    }
                }
                var adjCellEndPos = adjCell.x + adjCell.width + adjCell.margin.right;
                /* eslint-disable-next-line max-len */
                if ((HelperMethods.round(adjCellEndPos, 2) > HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) <= HelperMethods.round(cellEndPos, 2))
                    /* eslint-disable-next-line max-len */
                    || (HelperMethods.round(adjCellStartPos, 2) >= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellStartPos, 2) < HelperMethods.round(cellEndPos, 2))
                    /* eslint-disable-next-line max-len */
                    || (HelperMethods.round(adjCellStartPos, 2) <= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2))) {
                    //Skipped adding the Horizontal merge start cell multiple times.
                    if (adjCells.indexOf(adjCell) === -1 && addAdjCell) {
                        adjCells.push(adjCell);
                    }
                }
                if (HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                    if (previouRow) {
                        adjRow = cell.ownerRow.ownerTable.childWidgets[rowIndex];
                        previouRow = false;
                    }
                    else {
                        break;
                    }
                }
                if (i === adjRow.childWidgets.length - 1 && previouRow) {
                    adjRow = cell.ownerRow.ownerTable.childWidgets[rowIndex];
                    previouRow = false;
                }
            }
        }
        return adjCells;
    };
    Layout.prototype.addTableRowWidget = function (area, row) {
        var rowWidget = row[row.length - 1];
        if ((rowWidget.rowFormat.beforeWidth !== 0 || rowWidget.rowFormat.gridBeforeWidth !== 0) && ((this.documentHelper.alignTablesRowByRow) ? rowWidget.ownerTable.tableFormat.tableAlignment === 'Left' : true)) {
            rowWidget.x += (rowWidget.rowFormat.beforeWidth !== 0) ? rowWidget.rowFormat.beforeWidth : rowWidget.rowFormat.gridBeforeWidth;
        }
        else {
            rowWidget.x = area.x;
        }
        rowWidget.y = area.y;
        rowWidget.width = area.width;
        var borderWidth = 0;
        if (!isNullOrUndefined(rowWidget.ownerTable) && !isNullOrUndefined(rowWidget.ownerTable.tableFormat)
            && rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
            rowWidget.height = rowWidget.height + HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
            //Update the table height with the border width to layout the border when the cell spacing is defined..
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                if (!isNullOrUndefined(rowWidget.childWidgets[j].cellFormat)
                    && !isNullOrUndefined(rowWidget.childWidgets[j].cellFormat.borders)) {
                    /* eslint-disable-next-line max-len */
                    var width = TableCellWidget.getCellBottomBorder(rowWidget.childWidgets[j]).getLineWidth();
                    if (width > borderWidth) {
                        borderWidth = width;
                    }
                }
            }
            //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
            rowWidget.bottomBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
            if (rowWidget.index > 0 && !isNullOrUndefined(rowWidget.previousWidget)) {
                var prevRow = rowWidget.previousWidget;
                borderWidth = 0;
                for (var i = 0; i < prevRow.childWidgets.length; i++) {
                    /* eslint-disable-next-line max-len */
                    if (!isNullOrUndefined(prevRow.childWidgets[i].cellFormat) && !isNullOrUndefined(prevRow.childWidgets[i].cellFormat.borders)) {
                        /* eslint-disable-next-line max-len */
                        var value = TableCellWidget.getCellBottomBorder(prevRow.childWidgets[i]).getLineWidth();
                        if (value > borderWidth) {
                            borderWidth = value;
                        }
                    }
                }
                //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
                rowWidget.topBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
            }
        }
        if (!isNullOrUndefined(rowWidget.childWidgets)) {
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                if (!isNullOrUndefined(rowWidget.childWidgets[i].cellFormat) && !isNullOrUndefined(rowWidget.childWidgets[i].cellFormat.borders)) {
                    /* eslint-disable-next-line max-len */
                    var topBorderWidth = TableCellWidget.getCellTopBorder(rowWidget.childWidgets[i]).getLineWidth();
                    if (topBorderWidth > borderWidth) {
                        borderWidth = topBorderWidth;
                    }
                }
            }
        }
        //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
        rowWidget.topBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
        //Update the table height of tableWidget when cell spacing has been defined.
        /* eslint-disable-next-line max-len */
        if (!isNullOrUndefined(rowWidget.ownerTable) && !isNullOrUndefined(rowWidget.ownerTable.tableFormat) && rowWidget.ownerTable.tableFormat.cellSpacing <= 0 && rowWidget.rowIndex === rowWidget.ownerTable.childWidgets.length - 1) {
            // Update the bottom width for last row .
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                if (!isNullOrUndefined(rowWidget.childWidgets[i].cellFormat) && !isNullOrUndefined(rowWidget.childWidgets[i].cellFormat.borders)) {
                    /* eslint-disable-next-line max-len */
                    var bottomBorderWidth = TableCellWidget.getCellBottomBorder(rowWidget.childWidgets[i]).getLineWidth();
                    if (bottomBorderWidth > borderWidth) {
                        borderWidth = bottomBorderWidth;
                    }
                }
            }
            //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
            rowWidget.bottomBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
        }
        //tableRowWidget.ownerWidget = owner;
        return rowWidget;
    };
    Layout.prototype.getMaxTopCellMargin = function (row) {
        if (isNullOrUndefined(row.childWidgets)) {
            return 0;
        }
        var value = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            var topMargin = 0;
            if (cell.cellFormat.hasValue('topMargin')) {
                topMargin = HelperMethods.convertPointToPixel(cell.cellFormat.topMargin);
            }
            else if (row.rowFormat.hasValue('topMargin')) {
                topMargin = HelperMethods.convertPointToPixel(row.rowFormat.topMargin);
            }
            else {
                topMargin = HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.topMargin);
            }
            if (topMargin > value) {
                value = topMargin;
            }
        }
        return value;
    };
    Layout.prototype.getMaxBottomCellMargin = function (row) {
        if (isNullOrUndefined(row.childWidgets)) {
            return 0;
        }
        var value = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            var bottomMargin = 0;
            if (cell.cellFormat.hasValue('bottomMargin')) {
                bottomMargin = HelperMethods.convertPointToPixel(cell.cellFormat.bottomMargin);
            }
            else if (row.rowFormat.hasValue('bottomMargin')) {
                bottomMargin = HelperMethods.convertPointToPixel(row.rowFormat.bottomMargin);
            }
            else {
                bottomMargin = HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.bottomMargin);
            }
            if (bottomMargin > value) {
                value = bottomMargin;
            }
        }
        return value;
    };
    //#endregion Row
    //#region cell
    Layout.prototype.layoutCell = function (cell, maxCellMarginTop, maxCellMarginBottom) {
        var viewer = this.viewer;
        this.addTableCellWidget(cell, viewer.clientActiveArea, maxCellMarginTop, maxCellMarginBottom);
        this.updateTopBorders(cell);
        viewer.updateClientAreaForCell(cell, true);
        if (cell.childWidgets.length === 0) {
            var paragraphWidget = new ParagraphWidget();
            paragraphWidget.characterFormat = new WCharacterFormat();
            paragraphWidget.paragraphFormat = new WParagraphFormat();
            paragraphWidget.index = 0;
            var lineWidget = new LineWidget(paragraphWidget);
            paragraphWidget.childWidgets.push(lineWidget);
            cell.childWidgets.push(paragraphWidget);
        }
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            viewer.updateClientAreaForBlock(block, true);
            block.containerWidget = cell;
            this.layoutBlock(block, 0);
            viewer.updateClientAreaForBlock(block, false);
        }
        this.updateWidgetToRow(cell);
        viewer.updateClientAreaForCell(cell, false);
    };
    Layout.prototype.isInsertTable = function () {
        if (this.documentHelper.owner.editorHistory && this.documentHelper.owner.editorHistory.currentBaseHistoryInfo && this.documentHelper.owner.editorHistory.currentBaseHistoryInfo.action === 'InsertTable')
            return true;
        else
            return false;
    };
    Layout.prototype.updateTopBorders = function (cell) {
        cell.updatedTopBorders = [];
        if (cell.ownerTable.tableFormat.cellSpacing === 0) {
            var cellTopBorder = cell.cellFormat.borders.top;
            if (!cellTopBorder.isBorderDefined || (cellTopBorder.isBorderDefined
                && cellTopBorder.lineStyle === 'None' && cellTopBorder.lineWidth === 0 &&
                cellTopBorder.hasValue('color'))) {
                cellTopBorder = cell.ownerRow.rowFormat.borders.horizontal;
            }
            if (!cellTopBorder.isBorderDefined) {
                cellTopBorder = cell.ownerRow.ownerTable.tableFormat.borders.horizontal;
            }
            var cellStartPos = cell.x - cell.margin.left;
            var cellEndPos = cell.x + cell.width + cell.margin.right;
            var adjCells = this.getAdjacentRowCell(cell, cellStartPos, cellEndPos, cell.ownerRow.indexInOwner - 1);
            for (var j = 0; j < adjCells.length; j++) {
                var adjCell = adjCells[j];
                var prevCellBottomBorder = adjCell.cellFormat.borders.bottom;
                if (!prevCellBottomBorder.isBorderDefined || (prevCellBottomBorder.isBorderDefined
                    && prevCellBottomBorder.lineStyle === 'None' && prevCellBottomBorder.lineWidth === 0 &&
                    prevCellBottomBorder.hasValue('color'))) {
                    prevCellBottomBorder = adjCell.ownerRow.rowFormat.borders.horizontal;
                }
                if (!prevCellBottomBorder.isBorderDefined) {
                    prevCellBottomBorder = adjCell.ownerRow.ownerTable.tableFormat.borders.horizontal;
                }
                var border = void 0;
                if (cellTopBorder.lineStyle === 'None' || cellTopBorder.lineStyle === 'Cleared') {
                    border = prevCellBottomBorder;
                }
                else if (prevCellBottomBorder.lineStyle === 'Cleared' || prevCellBottomBorder.lineStyle === 'None') {
                    border = cellTopBorder;
                }
                else {
                    border = cell.getBorderBasedOnPriority(cellTopBorder, prevCellBottomBorder);
                }
                var adjCellStartPos = adjCell.x - adjCell.margin.left;
                var adjCellEndPos = adjCell.x + adjCell.width + adjCell.margin.right;
                if (j === 0 && cellStartPos < adjCellStartPos) {
                    cell.updatedTopBorders.push({ border: cellTopBorder, width: (adjCellStartPos - cellStartPos) });
                }
                if (border) {
                    var width = 0;
                    /* eslint-disable-next-line max-len */
                    if (HelperMethods.round(adjCellEndPos, 2) === HelperMethods.round(cellEndPos, 2) && HelperMethods.round(adjCellStartPos, 2) === HelperMethods.round(cellStartPos, 2)) {
                        width = cellEndPos - cellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) >= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                        width = cellEndPos - adjCellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) >= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) <= HelperMethods.round(cellEndPos, 2)) {
                        width = adjCellEndPos - adjCellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) <= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) <= HelperMethods.round(cellEndPos, 2)) {
                        width = adjCellEndPos - cellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) <= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                        width = cellEndPos - cellStartPos;
                    }
                    else {
                        width = cellEndPos - cellStartPos;
                    }
                    if (width < 0) {
                        width = 0;
                    }
                    cell.updatedTopBorders.push({ border: border, width: width });
                }
                if (j === (adjCells.length - 1) && cellEndPos > adjCellEndPos) {
                    cell.updatedTopBorders.push({ border: cellTopBorder, width: (cellEndPos - adjCellEndPos) });
                }
            }
        }
    };
    //endregion cell
    //#region Shifting
    Layout.prototype.shiftLayoutedItems = function (reLayout) {
        if (isNullOrUndefined(this.documentHelper.blockToShift) || isNullOrUndefined(this.documentHelper.blockToShift.containerWidget)) {
            this.documentHelper.blockToShift = undefined;
            this.checkAndShiftEndnote();
            return;
        }
        var block = this.documentHelper.blockToShift;
        var sectionIndex = block.bodyWidget.index;
        this.reLayoutOrShiftWidgets(block, this.viewer);
        var updateNextBlockList = true;
        // If flow layout, then all sections are in single page. Hence need to update till last block of last section.
        // Todo: For page layout and section break continuous, need to handle the same.
        var splittedWidget = block.getSplitWidgets();
        var nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        while (nextBlock instanceof BlockWidget && nextBlock.bodyWidget.index === sectionIndex) {
            var currentWidget = undefined;
            var blocks = block.getSplitWidgets();
            currentWidget = blocks[blocks.length - 1];
            block = nextBlock;
            updateNextBlockList = false;
            var nextWidget = undefined;
            blocks = block.getSplitWidgets();
            if (block instanceof ParagraphWidget) {
                nextWidget = blocks[0];
            }
            else {
                if (block instanceof TableWidget) {
                    nextWidget = blocks[0];
                }
            }
            if (currentWidget.containerWidget === nextWidget.containerWidget
                && (HelperMethods.round(nextWidget.y, 2) === HelperMethods.round(this.viewer.clientActiveArea.y, 2)) &&
                isNullOrUndefined(nextWidget.nextWidget)) {
                break;
            }
            if (!isNullOrUndefined(currentWidget.floatingElements)) {
                //this.shiftLayoutFloatingItems(currentWidget as ParagraphWidget);
            }
            updateNextBlockList = true;
            this.reLayoutOrShiftWidgets(block, this.viewer);
            splittedWidget = block.getSplitWidgets();
            nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        }
        if (this.viewer.owner.editorModule) {
            this.viewer.owner.editorModule.updateListItemsTillEnd(block, updateNextBlockList);
        }
        this.documentHelper.blockToShift = undefined;
        var viewer = this.viewer;
        // if (viewer instanceof PageLayoutViewer) {
        this.documentHelper.removeEmptyPages();
        this.updateFieldElements();
        if (!this.documentHelper.owner.enableLockAndEdit || !reLayout) {
            viewer.updateScrollBars();
        }
        // }
    };
    Layout.prototype.checkAndShiftEndnote = function () {
        if (this.documentHelper.owner.selection) {
            var endBlock = this.documentHelper.owner.selection.end.paragraph;
            if (endBlock.isInsideTable) {
                endBlock = this.getParentTable(endBlock);
            }
            if (!endBlock.isInHeaderFooter && !(endBlock.bodyWidget.containerWidget instanceof FootNoteWidget) && isNullOrUndefined(endBlock.nextRenderedWidget)) {
                if (!(endBlock.bodyWidget instanceof FootNoteWidget) && !this.isRelayoutFootnote
                    && endBlock.bodyWidget.page.endnoteWidget) {
                    this.layoutfootNote(endBlock.bodyWidget.page.endnoteWidget);
                }
            }
        }
    };
    Layout.prototype.updateFieldElements = function () {
        for (var i = 0; i < this.documentHelper.fields.length; i++) {
            var fieldBegin = this.documentHelper.fields[i];
            if (this.viewer instanceof PageLayoutViewer || (this.viewer instanceof WebLayoutViewer && !(fieldBegin.line.paragraph.bodyWidget instanceof HeaderFooterWidget))) {
                if (!isNullOrUndefined(this.documentHelper.selection)) {
                    var fieldCode = this.documentHelper.selection.getFieldCode(fieldBegin);
                    if (!isNullOrUndefined(fieldCode) && (fieldCode.toLowerCase().match('numpages') || fieldCode.toLowerCase().match('sectionpages')) && !isNullOrUndefined(fieldBegin.fieldSeparator)) {
                        var textElement = fieldBegin.fieldSeparator.nextNode;
                        if (!isNullOrUndefined(textElement)) {
                            var prevPageNum = textElement.text;
                            textElement.text = this.documentHelper.pages.length.toString();
                            var paragraph = fieldBegin.line.paragraph;
                            if (!isNullOrUndefined(paragraph.bodyWidget) && !isNullOrUndefined(paragraph.bodyWidget.page)
                                && prevPageNum !== textElement.text) {
                                var lineIndex = paragraph.childWidgets.indexOf(fieldBegin.line);
                                var elementIndex = fieldBegin.line.children.indexOf(textElement);
                                this.reLayoutParagraph(paragraph, lineIndex, elementIndex);
                            }
                        }
                    }
                }
            }
        }
    };
    Layout.prototype.reLayoutOrShiftWidgets = function (blockAdv, viewer) {
        var block = blockAdv;
        var isRealyoutList = false;
        // if (block instanceof ParagraphWidget) {
        //     reLayoutItems = viewer.renderedElements.get(block as ParagraphWidget).length === 0;
        // } else {
        //     reLayoutItems = viewer.renderedElements.get(block as TableWidget).length === 0;
        // }
        if (this.isNeedToRelayout(blockAdv.bodyWidget)) {
            this.updateContainerForTable(block, viewer);
            //Handle layouting the block.
            if (block instanceof TableWidget) {
                block = block.combineWidget(this.viewer);
                this.clearTableWidget(block, true, true, true);
            }
            viewer.updateClientAreaForBlock(block, true);
            this.layoutBlock(block, 0);
            viewer.updateClientAreaForBlock(block, false);
            isRealyoutList = true;
        }
        else {
            //Handled to check client area and shift layouted widget.
            this.shiftWidgetsBlock(block, viewer);
        }
        var index = this.documentHelper.pages.indexOf(block.bodyWidget.page);
        if (index > 0 && block === block.bodyWidget.childWidgets[0] && block instanceof ParagraphWidget) {
            var val = block.bodyWidget.childWidgets[0].childWidgets[0].children;
            for (var i = 0; i < val.length; i++) {
                var element = val[i];
                if (element.margin.top > 0 && element.margin.top === this.getBeforeSpacing(element.paragraph)) {
                    element.margin.top -= this.getBeforeSpacing(element.paragraph);
                }
            }
        }
        //Updates the list value of the rendered paragraph.
        if (this.viewer.owner.editorModule && !isRealyoutList) {
            this.viewer.owner.editorModule.updateRenderedListItems(block);
        }
        if (!this.isRelayoutFootnote && block.bodyWidget.page.footnoteWidget) {
            this.layoutfootNote(block.bodyWidget.page.footnoteWidget);
        }
        if (!(block.bodyWidget instanceof FootNoteWidget) && !this.isRelayoutFootnote
            && block.bodyWidget.page.endnoteWidget) {
            this.layoutfootNote(block.bodyWidget.page.endnoteWidget);
        }
        // }
    };
    Layout.prototype.isNeedToRelayout = function (bodyWidget) {
        for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
            var floatElement = bodyWidget.floatingElements[i];
            if (floatElement instanceof TableWidget || (floatElement instanceof ShapeBase &&
                (floatElement.textWrappingStyle === 'Square' || floatElement.textWrappingStyle === 'TopAndBottom'))) {
                return true;
            }
        }
        return false;
    };
    Layout.prototype.shiftWidgetsBlock = function (block, viewer) {
        if (block instanceof ParagraphWidget) {
            this.shiftWidgetsForPara(block, viewer);
        }
        else if (block instanceof TableWidget) {
            this.shiftWidgetsForTable(block, viewer);
        }
    };
    Layout.prototype.shiftWidgetsForPara = function (paragraph, viewer) {
        if (paragraph.height > (viewer.clientArea.height + viewer.clientArea.y)) {
            return;
        }
        var bodywid = paragraph.bodyWidget;
        var prevBodyObj = this.getBodyWidgetOfPreviousBlock(paragraph, 0);
        var prevBodyWidget = prevBodyObj.bodyWidget;
        var index = prevBodyObj.index;
        var prevWidget = undefined;
        var skipFootNoteHeight = false;
        for (var i = 0; i < paragraph.getSplitWidgets().length; i++) {
            var widget = paragraph.getSplitWidgets()[i];
            if (!isNullOrUndefined(prevWidget)) {
                var isPageBreak = prevWidget.lastChild ? prevWidget.lastChild.isEndsWithPageBreak : false;
                this.shiftToPreviousWidget(widget, viewer, prevWidget, isPageBreak);
                if ((isNullOrUndefined(widget.childWidgets) || widget.childWidgets.length === 0) && !isPageBreak) {
                    i--;
                    continue;
                }
                prevWidget = undefined;
                if (prevBodyWidget !== widget.containerWidget) {
                    prevBodyWidget = widget.containerWidget;
                    if (isPageBreak) {
                        viewer.updateClientAreaByWidget(widget);
                    }
                }
            }
            var footWidget = [];
            if (!skipFootNoteHeight) {
                footWidget = this.getFootNoteWidgetsOf(widget);
            }
            skipFootNoteHeight = false;
            //let isContainsFootnote: boolean = false;
            if (this.isFitInClientArea(widget, viewer, footWidget)) {
                if (this.keepWithNext) {
                    this.updateClientPositionForBlock(widget.containerWidget.firstChild, widget);
                    this.keepWithNext = false;
                }
                //Check whether this widget is moved to previous container widget.
                prevWidget = widget;
                widget.y = viewer.clientActiveArea.y;
                if (widget.floatingElements.length > 0) {
                    for (var k = 0; k < widget.floatingElements.length; k++) {
                        var shape = widget.floatingElements[k];
                        var position = this.getFloatingItemPoints(shape);
                        shape.y = position.y;
                        shape.x = position.x;
                        if (shape instanceof ShapeElementBox) {
                            this.updateChildLocationForCellOrShape(shape.y, shape);
                        }
                    }
                }
                viewer.cutFromTop(viewer.clientActiveArea.y + widget.height);
                //Moves the paragraph widget to previous body widget.
                if (!isNullOrUndefined(prevBodyWidget) && prevBodyWidget !== widget.containerWidget) {
                    index++;
                    if (!prevBodyWidget.lastChild.isEndsWithPageBreak) {
                        this.updateContainerWidget(widget, prevBodyWidget, index, true, footWidget);
                    }
                    if (footWidget.length > 0) {
                        if (prevBodyWidget.page.footnoteWidget) {
                            for (var k = 0; k < footWidget.length; k++) {
                                if (prevBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footWidget[k]) === -1 && widget.bodyWidget.page.index != footWidget[k].page.index) {
                                    prevBodyWidget.page.footnoteWidget.bodyWidgets.push(footWidget[k]);
                                    prevBodyWidget.page.footnoteWidget.height += footWidget[k].height;
                                }
                            }
                        }
                    }
                }
                if (widget.isEndsWithPageBreak && this.viewer instanceof PageLayoutViewer) {
                    var nextBodyWidget = this.createOrGetNextBodyWidget(prevBodyWidget, this.viewer);
                    nextBodyWidget = this.moveBlocksToNextPage(widget, true);
                    viewer.updateClientArea(nextBodyWidget.sectionFormat, nextBodyWidget.page);
                }
            }
            else {
                var previousBlock = widget.previousRenderedWidget;
                var isPageBreak = false;
                if (previousBlock instanceof ParagraphWidget && previousBlock.isEndsWithPageBreak &&
                    this.viewer instanceof PageLayoutViewer) {
                    isPageBreak = true;
                }
                var isSplittedToNewPage = this.splitWidget(widget, viewer, prevBodyWidget, index + 1, isPageBreak, footWidget);
                prevWidget = undefined;
                if (prevBodyWidget !== widget.containerWidget) {
                    prevBodyWidget = widget.containerWidget;
                    i--;
                    //Paragraph moved to next page and client area get updated with footnote widget height.
                    //So, skip considering footnote height.
                    if (footWidget.length > 0) {
                        skipFootNoteHeight = true;
                    }
                }
                index = prevBodyWidget.childWidgets.indexOf(widget);
                if (isSplittedToNewPage) {
                    prevBodyWidget = paragraph.getSplitWidgets()[i + 1].containerWidget;
                }
            }
        }
    };
    /**
     * @private
     * Get the footnote of the block widget.
     *
     * @param {BlockWidget} widget BlockWidget instance.
     * @returns
     */
    Layout.prototype.getFootNotesOfBlock = function (widget, footnoteElements) {
        if (isNullOrUndefined(footnoteElements)) {
            footnoteElements = [];
        }
        if (widget.childWidgets.length > 0) {
            for (var j = 0; j < this.documentHelper.footnoteCollection.length; j++) {
                if (this.documentHelper.footnoteCollection[j].line.paragraph === widget) {
                    //isContainsFootnote = true;
                    footnoteElements.push(this.documentHelper.footnoteCollection[j]);
                }
            }
        }
        return footnoteElements;
    };
    Layout.prototype.getFootNotesWidgetsInLine = function (line) {
        var footnoteElements = [];
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (element instanceof FootnoteElementBox) {
                footnoteElements.push(element);
            }
        }
        return this.getFootNoteWidgetsBy(line.paragraph, footnoteElements);
    };
    Layout.prototype.getFootNoteWidgetsBy = function (widget, footnoteElements) {
        var footWidgets = [];
        if (widget.bodyWidget.page.footnoteWidget) {
            for (var i = 0; i < widget.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.bodyWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        if (footWidgets.length === 0 && (!isNullOrUndefined(widget.previousRenderedWidget) && widget.previousRenderedWidget.bodyWidget.page.footnoteWidget)) {
            for (var i = 0; i < widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        else if (!isNullOrUndefined(widget.bodyWidget.previousRenderedWidget) && widget.bodyWidget.previousRenderedWidget.page.footnoteWidget) {
            for (var i = 0; i < widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        else if (!isNullOrUndefined(widget.bodyWidget.nextRenderedWidget) && widget.bodyWidget.nextRenderedWidget.page.footnoteWidget) {
            for (var i = 0; i < widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        return footWidgets;
    };
    /**
     * @param widget
     * @private
     */
    Layout.prototype.getFootNoteWidgetsOf = function (widget, isShifting) {
        var footnoteWidgets = [];
        var footnoteElements = [];
        if (widget instanceof TableWidget) {
            for (var k_1 = 0; k_1 < widget.childWidgets.length; k_1++) {
                var row = widget.childWidgets[k_1];
                for (var i = 0; i < row.childWidgets.length; i++) {
                    var cell = row.childWidgets[i];
                    for (var x = 0; x < cell.childWidgets.length; x++) {
                        var block = cell.childWidgets[x];
                        footnoteElements = this.getFootNotesOfBlock(block, footnoteElements);
                        var blockfootnoteWidgets = this.getFootNoteWidgetsBy(block, footnoteElements);
                        for (var f = 0; f < blockfootnoteWidgets.length; f++) {
                            if (footnoteWidgets.indexOf(blockfootnoteWidgets[f]) === -1) {
                                footnoteWidgets.push(blockfootnoteWidgets[f]);
                            }
                        }
                    }
                }
            }
        }
        else {
            footnoteElements = this.getFootNotesOfBlock(widget);
            if (footnoteElements.length > 0) {
                footnoteWidgets = this.getFootNoteWidgetsBy(widget, footnoteElements);
            }
            if (isShifting && footnoteWidgets.length === 0) {
                for (var k = 0; k < footnoteElements.length; k++) {
                    footnoteWidgets.push(footnoteElements[k].bodyWidget);
                }
            }
        }
        return footnoteWidgets;
    };
    Layout.prototype.getFootNodeWidgetsToShiftToPage = function (paragraph) {
        var splittedWidgets = paragraph.getSplitWidgets();
        var footNoteWidgets = [];
        var toBodyWidget = paragraph.containerWidget;
        var fromBodyWidget;
        for (var i = 0; i < splittedWidgets.length; i++) {
            var footWidgets = this.getFootNoteWidgetsOf(splittedWidgets[i]);
            for (var j = 0; j < footWidgets.length; j++) {
                fromBodyWidget = footWidgets[j].containerWidget;
                if (toBodyWidget !== fromBodyWidget) {
                    footNoteWidgets.push(footWidgets[j]);
                }
            }
        }
        return { 'footNoteWidgets': footNoteWidgets, 'fromBodyWidget': fromBodyWidget, 'toBodyWidget': toBodyWidget };
    };
    Layout.prototype.shiftTableWidget = function (table, viewer, isClearHeight) {
        if (isClearHeight === void 0) { isClearHeight = false; }
        var tables = [table];
        this.addTableWidget(this.viewer.clientActiveArea, tables);
        this.viewer.updateClientAreaTopOrLeft(table, true);
        var clientActiveAreaForTableWrap;
        var clientAreaForTableWrap;
        if (table.wrapTextAround) {
            clientActiveAreaForTableWrap = this.viewer.clientActiveArea.clone();
            clientAreaForTableWrap = this.viewer.clientArea.clone();
            this.updateClientAreaForWrapTable(tables, table, true, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        var row = table.childWidgets[0];
        while (row) {
            row = this.shiftRowWidget(tables, row, isClearHeight);
            row = row.nextRow;
        }
        this.updateWidgetsToPage(tables, [], table);
        if (table.wrapTextAround && table.bodyWidget) {
            this.updateClientAreaForWrapTable(tables, table, false, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        return tables[tables.length - 1];
    };
    Layout.prototype.shiftRowWidget = function (tables, row, isClearHeight) {
        if (isClearHeight === void 0) { isClearHeight = false; }
        var viewer = this.viewer;
        if (isClearHeight) {
            row.height = 0;
        }
        var isNestedTable = row.ownerTable.isInsideTable;
        if (!isNestedTable) {
            this.updateExistingFootnoteHeight(row);
        }
        var rows = [row];
        this.addTableRowWidget(viewer.clientActiveArea, rows);
        viewer.updateClientAreaForRow(row, true);
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            if (isClearHeight) {
                cell.height = 0;
            }
            /* eslint-disable-next-line max-len */
            this.shiftCellWidget(cell, this.getMaxTopCellMargin(row) + row.topBorderWidth, this.getMaxBottomCellMargin(row) + row.bottomBorderWidth, isClearHeight);
        }
        viewer.updateClientAreaForRow(row, false);
        if (!isNestedTable) {
            var footheight = this.footnoteHeight;
            this.updateFootnoteToBody(row, this.layoutedFootnoteElement);
            this.footnoteHeight = footheight;
        }
        this.updateWidgetsToTable(tables, rows, row);
        if (!isNestedTable) {
            this.layoutedFootnoteElement = [];
        }
        return rows[rows.length - 1];
    };
    Layout.prototype.updateFootnoteToBody = function (row, footnoteElements) {
        this.layoutFootnoteInSplittedRow(row, this.getFootnoteBody(footnoteElements));
        if (isNullOrUndefined(row.ownerTable.footnoteElement)) {
            row.ownerTable.footnoteElement = [];
        }
        for (var i = 0; i < footnoteElements.length; i++) {
            row.ownerTable.footnoteElement.push(footnoteElements[i]);
        }
    };
    Layout.prototype.getFootnoteBody = function (footnoteElements) {
        var footnoteWidgets = [];
        for (var i = 0; i < footnoteElements.length; i++) {
            footnoteWidgets.push(footnoteElements[i].bodyWidget);
        }
        return footnoteWidgets;
    };
    Layout.prototype.shiftCellWidget = function (cell, maxCellMarginTop, maxCellMarginBottom, isClearHeight) {
        if (isNullOrUndefined(isClearHeight)) {
            isClearHeight = false;
        }
        var viewer = this.viewer;
        this.addTableCellWidget(cell, viewer.clientActiveArea, maxCellMarginTop, maxCellMarginBottom);
        var clientHeight = this.viewer.clientActiveArea.height;
        viewer.updateClientAreaForCell(cell, true);
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            viewer.updateClientAreaForBlock(block, true);
            if (block instanceof ParagraphWidget) {
                this.shiftParagraphWidget(block);
            }
            else {
                this.shiftTableWidget(block, viewer, isClearHeight);
            }
            viewer.updateClientAreaForBlock(block, false);
        }
        this.updateWidgetToRow(cell);
        viewer.updateClientAreaForCell(cell, false);
        if (!cell.ownerTable.isInsideTable) {
            this.viewer.clientActiveArea.height = clientHeight;
        }
    };
    Layout.prototype.shiftParagraphWidget = function (paragraph) {
        this.addParagraphWidget(this.viewer.clientActiveArea, paragraph);
        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + paragraph.height);
        var footnoteCollection = this.getFootNoteWidgetsOf(paragraph, true);
        for (var i = 0; i < footnoteCollection.length; i++) {
            this.layoutedFootnoteElement.push(footnoteCollection[i].footNoteReference);
        }
        this.footnoteHeight += this.getFootNoteHeight(footnoteCollection);
        this.updateWidgetToPage(this.viewer, paragraph);
    };
    Layout.prototype.updateContainerForTable = function (block, viewer) {
        var prevObj = this.getBodyWidgetOfPreviousBlock(block, 0);
        var prevBodyWidget = prevObj.bodyWidget;
        var index = prevObj.index;
        var isPageBreak = prevBodyWidget.lastChild.lastChild.isEndsWithPageBreak;
        if (prevBodyWidget !== block.containerWidget) {
            if (!isPageBreak) {
                this.updateContainerWidget(block, prevBodyWidget, index + 1, true);
            }
            else {
                viewer.updateClientArea(block.bodyWidget.sectionFormat, block.bodyWidget.page);
            }
        }
        if (block.isInHeaderFooter || this.viewer instanceof WebLayoutViewer) {
            block.containerWidget.height -= block.height;
        }
    };
    Layout.prototype.shiftWidgetsForTable = function (table, viewer) {
        this.updateContainerForTable(table, viewer);
        this.viewer.updateClientAreaForBlock(table, true);
        var tempClientAreaX = this.viewer.clientArea.x;
        if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
            this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        this.updateVerticalPositionToTop(table, true);
        //const isPageLayout: boolean = viewer instanceof PageLayoutViewer;
        var combinedTable = table.combineWidget(this.viewer);
        this.documentHelper.layout.updateChildLocationForTable(combinedTable.y, combinedTable);
        this.clearTableWidget(combinedTable, true, false, false, true);
        this.shiftTableWidget(combinedTable, this.viewer);
        this.updateVerticalPositionToTop(table, false);
        if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
            this.viewer.clientArea.x = tempClientAreaX;
        }
        this.viewer.updateClientAreaForBlock(table, false);
    };
    Layout.prototype.updateVerticalPositionToTop = function (table, isUpdateTop) {
        //Iterate the tableWidgets counts
        for (var i = 0; i < table.getSplitWidgets().length; i++) {
            var tablewidget = table.getSplitWidgets()[i];
            //Iterate the tableWidget child items
            for (var j = 0; j < tablewidget.childWidgets.length; j++) {
                var rowWidget = tablewidget.childWidgets[j];
                //Iterate the RowWidgets child items
                for (var k = 0; k < rowWidget.childWidgets.length; k++) {
                    var cellWidget = rowWidget.childWidgets[k];
                    //Iterate the RowWidgets child items
                    this.documentHelper.layout.updateCellVerticalPosition(cellWidget, isUpdateTop, false);
                }
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.splitWidget = function (paragraphWidget, viewer, previousBodyWidget, index, isPageBreak, footWidget) {
        var firstLine = paragraphWidget.childWidgets[0];
        var keepLinesTogether = (paragraphWidget.paragraphFormat.keepLinesTogether && (this.viewer.clientActiveArea.y !== this.viewer.clientArea.y));
        var maxElementHeight = keepLinesTogether ? paragraphWidget.height : this.getMaxElementHeight(firstLine);
        var paragraphView = paragraphWidget.getSplitWidgets();
        var nextBodyWidget = paragraphWidget.containerWidget;
        // Get maximun height based on widow/orphan control.
        maxElementHeight = this.getMaximumLineHeightToSplit(paragraphWidget, maxElementHeight, viewer);
        // TODO: Footnote move on move entire paragraph.
        var footNoteInFirstLine = this.getFootNotesWidgetsInLine(firstLine);
        if (isNullOrUndefined(paragraphWidget.previousWidget) && footNoteInFirstLine.length > 0) {
            for (var i = 0; i < footNoteInFirstLine.length; i++) {
                for (var j = 0; j < footNoteInFirstLine[i].childWidgets.length; j++) {
                    maxElementHeight += footNoteInFirstLine[i].childWidgets[j].height;
                }
            }
            //maxElementHeight += (paragraphWidget.bodyWidget.page.footnoteWidget.childWidgets[0] as ParagraphWidget).height;
        }
        if (viewer.clientActiveArea.height >= maxElementHeight && !isPageBreak) {
            var splittedWidget = undefined;
            var widgetIndex = paragraphView.indexOf(paragraphWidget);
            if (widgetIndex < (paragraphView.length - 1)) {
                splittedWidget = paragraphView[widgetIndex + 1];
                nextBodyWidget = splittedWidget.containerWidget;
            }
            else {
                splittedWidget = new ParagraphWidget();
                splittedWidget.index = paragraphWidget.index;
                splittedWidget.characterFormat = paragraphWidget.characterFormat;
                splittedWidget.paragraphFormat = paragraphWidget.paragraphFormat;
                splittedWidget.width = paragraphWidget.width;
                splittedWidget.x = paragraphWidget.x;
                splittedWidget.y = paragraphWidget.y;
                paragraphView.push(splittedWidget);
            }
            if (previousBodyWidget !== paragraphWidget.containerWidget) {
                var fromBodyWidget = paragraphWidget.containerWidget;
                if (paragraphWidget.childWidgets.indexOf(this.documentHelper.selection.start.currentWidget) !== -1 || paragraphWidget.childWidgets.indexOf(this.documentHelper.selection.end.currentWidget) !== -1) {
                    this.updateContainerWidget(paragraphWidget, previousBodyWidget, index, true);
                    this.moveFootNotesToPage(footWidget, fromBodyWidget, previousBodyWidget);
                }
            }
            for (var i = paragraphWidget.childWidgets.length - 1; i > 0; i--) {
                var line = paragraphWidget.childWidgets[i];
                if (this.isFitInClientArea(paragraphWidget, viewer, undefined)) {
                    if (splittedWidget.childWidgets.length === 1) {
                        this.updateParagraphWidgetInternal(line, splittedWidget, 0);
                    }
                    break;
                }
                else {
                    //Moves the line widget to next widget.
                    this.updateParagraphWidgetInternal(line, splittedWidget, 0);
                }
            }
            if (isNullOrUndefined(splittedWidget.containerWidget) && splittedWidget.childWidgets.length > 0) {
                var y = viewer.clientActiveArea.y;
                /* eslint-disable-next-line max-len */
                var clientArea = new Rect(viewer.clientArea.x, viewer.clientArea.y, viewer.clientArea.width, viewer.clientArea.height);
                /* eslint-disable-next-line max-len */
                var activeArea = new Rect(viewer.clientActiveArea.x, viewer.clientActiveArea.y, viewer.clientActiveArea.width, viewer.clientActiveArea.height);
                //Checks whether next node exists, else adds new page.
                nextBodyWidget = this.moveBlocksToNextPage(paragraphWidget, false);
                // nextBodyWidget = this.createOrGetNextBodyWidget(previousBodyWidget, viewer);
                nextBodyWidget.childWidgets.splice(0, 0, splittedWidget);
                nextBodyWidget.height += splittedWidget.height;
                splittedWidget.containerWidget = nextBodyWidget;
                if (nextBodyWidget != previousBodyWidget && previousBodyWidget.page.footnoteWidget) {
                    footWidget = this.getFootNoteWidgetsOf(splittedWidget, true);
                    this.moveFootNotesToPage(footWidget, previousBodyWidget, nextBodyWidget);
                }
                if (nextBodyWidget.childWidgets.length === 1 && nextBodyWidget.firstChild instanceof ParagraphWidget &&
                    nextBodyWidget.firstChild.equals(paragraphWidget)) {
                    //paragraphWidget.x = paragraphWidget.x;
                    paragraphWidget.y = y;
                    return true;
                }
                else {
                    //Resetting Client area
                    viewer.clientArea = clientArea;
                    viewer.clientActiveArea = activeArea;
                }
            }
        }
        else {
            nextBodyWidget = this.createOrGetNextBodyWidget(previousBodyWidget, this.viewer);
            if (paragraphWidget.containerWidget !== nextBodyWidget) {
                var startBlock = paragraphWidget;
                var blockInfo = this.alignBlockElement(paragraphWidget);
                if (!isNullOrUndefined(blockInfo.node)) {
                    startBlock = blockInfo.node instanceof TableRowWidget ? this.splitRow(blockInfo.node) : this.splitParagraph(blockInfo.node, parseInt(blockInfo.position.index, 10));
                    paragraphWidget = startBlock;
                    this.keepWithNext = true;
                }
                nextBodyWidget = this.moveBlocksToNextPage(paragraphWidget, true);
                this.updateContainerWidget(paragraphWidget, nextBodyWidget, 0, true);
                //footWidget = this.getFootNoteWidgetsOf(paragraphWidget);
                if (!isNullOrUndefined(previousBodyWidget.page.footnoteWidget)) {
                    this.moveFootNotesToPage(footWidget, previousBodyWidget, nextBodyWidget);
                }
            }
            else if (!isNullOrUndefined(previousBodyWidget) && isNullOrUndefined(paragraphWidget.previousWidget)) {
                this.updateContainerWidget(paragraphWidget, previousBodyWidget, previousBodyWidget.childWidgets.length, false);
                var startBlock = paragraphWidget;
                var blockInfo = this.alignBlockElement(paragraphWidget);
                if (!isNullOrUndefined(blockInfo.node)) {
                    startBlock = blockInfo.node instanceof TableRowWidget ? this.splitRow(blockInfo.node) : this.splitParagraph(blockInfo.node, parseInt(blockInfo.position.index, 10));
                    this.keepWithNext = true;
                    nextBodyWidget = this.moveBlocksToNextPage(startBlock.previousWidget, true);
                    this.updateClientPositionForBlock(paragraphWidget.previousWidget, paragraphWidget);
                    // TODO: Handle moving footnote widget
                }
                else {
                    this.updateContainerWidget(paragraphWidget, nextBodyWidget, 0, true);
                }
            }
        }
        if (previousBodyWidget === paragraphWidget.containerWidget) {
            paragraphWidget.y = viewer.clientActiveArea.y;
            viewer.cutFromTop(viewer.clientActiveArea.y + paragraphWidget.height);
        }
        else {
            //Updates client area based on next body widget.
            viewer.updateClientArea(nextBodyWidget.sectionFormat, nextBodyWidget.page);
        }
        return false;
    };
    Layout.prototype.getMaximumLineHeightToSplit = function (paragraphWidget, maxElementHeight, viewer) {
        if (viewer.clientActiveArea.height >= maxElementHeight && !paragraphWidget.paragraphFormat.keepLinesTogether &&
            paragraphWidget.paragraphFormat.widowControl && !isNullOrUndefined(paragraphWidget.previousWidget) &&
            isNullOrUndefined(paragraphWidget.previousSplitWidget)) {
            var paragraphHeight = paragraphWidget.height;
            for (var m = paragraphWidget.childWidgets.length - 1; m >= 0; m--) {
                var lastLine = paragraphWidget.childWidgets[m];
                var lineHeight = this.getMaxElementHeight(lastLine);
                if (lastLine.height > lineHeight) {
                    paragraphHeight -= lastLine.height - lineHeight;
                }
                if (viewer.clientActiveArea.height >= paragraphHeight) {
                    // Move entire paragraph to next page, If first line alone not fitted in the client area.
                    if (m === 0) {
                        maxElementHeight = paragraphWidget.height;
                    }
                    break;
                }
                paragraphHeight -= (lastLine).height;
            }
        }
        return maxElementHeight;
    };
    /**
     * @private
     * @param footnoteWidgets
     * @param fromBodyWidget
     * @param toBodyWidget
     */
    Layout.prototype.moveFootNotesToPage = function (footnoteWidgets, fromBodyWidget, toBodyWidget) {
        if (footnoteWidgets.length > 0 && fromBodyWidget.page.footnoteWidget) {
            var footNoteIndex = -1;
            var footNoteWidget = void 0;
            var insertIndex = 0;
            var check = false;
            for (var k = 0; k < footnoteWidgets.length; k++) {
                /* eslint-disable-next-line max-len */
                footNoteWidget = footnoteWidgets[k];
                footNoteIndex = fromBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footNoteWidget);
                if (footNoteIndex >= 0) {
                    if (toBodyWidget.page.footnoteWidget === undefined) {
                        this.addEmptyFootNoteToBody(toBodyWidget);
                    }
                    for (var i = 0; i < toBodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                        var body = (toBodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference;
                        if (body === (footNoteWidget).footNoteReference) {
                            check = true;
                        }
                    }
                    fromBodyWidget.page.footnoteWidget.bodyWidgets.splice(footNoteIndex, 1);
                    if (toBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footNoteWidget) < 0 && !check) {
                        var childLength = toBodyWidget.page.footnoteWidget.bodyWidgets.length;
                        var fromPage = this.documentHelper.pages.indexOf(fromBodyWidget.page);
                        var toPage = this.documentHelper.pages.indexOf(toBodyWidget.page);
                        footNoteWidget.containerWidget = toBodyWidget.page.footnoteWidget;
                        footNoteWidget.page = toBodyWidget.page;
                        if (fromPage > toPage) {
                            toBodyWidget.page.footnoteWidget.bodyWidgets.push(footNoteWidget);
                            insertIndex++;
                        }
                        else {
                            toBodyWidget.page.footnoteWidget.bodyWidgets.splice(insertIndex++, 0, footNoteWidget);
                        }
                        toBodyWidget.page.footnoteWidget.height += footNoteWidget.height;
                    }
                    fromBodyWidget.page.footnoteWidget.height -= footNoteWidget.height;
                }
            }
            if (fromBodyWidget.page.footnoteWidget && fromBodyWidget.page.footnoteWidget.bodyWidgets.length === 0) {
                fromBodyWidget.page.footnoteWidget = undefined;
            }
            if (fromBodyWidget.page.footnoteWidget !== undefined) {
                this.layoutfootNote(fromBodyWidget.page.footnoteWidget);
            }
            if (toBodyWidget.page.footnoteWidget !== undefined) {
                this.layoutfootNote(toBodyWidget.page.footnoteWidget);
            }
        }
    };
    Layout.prototype.addEmptyFootNoteToBody = function (bodyWidget) {
        var footnoteWidget = new FootNoteWidget();
        footnoteWidget.footNoteType = 'Footnote';
        footnoteWidget.page = bodyWidget.page;
        var newParagraph = new ParagraphWidget();
        newParagraph.characterFormat = new WCharacterFormat();
        newParagraph.paragraphFormat = new WParagraphFormat();
        newParagraph.index = 0;
        var lineWidget = new LineWidget(newParagraph);
        newParagraph.childWidgets.push(lineWidget);
        //  footnoteWidget.childWidgets.push(newParagraph);
        footnoteWidget.height = this.documentHelper.textHelper.getParagraphMarkSize(newParagraph.characterFormat).Height;
        footnoteWidget.margin = new Margin(0, footnoteWidget.height, 0, 0);
        bodyWidget.page.footnoteWidget = footnoteWidget;
    };
    Layout.prototype.getMaxElementHeight = function (lineWidget) {
        var height = 0;
        /* eslint-disable-next-line max-len */
        if (lineWidget.children.length === 0 || ((lineWidget.children.length === 1 && lineWidget.children[0] instanceof ListTextElementBox) || (lineWidget.children.length === 2 && lineWidget.children[0] instanceof ListTextElementBox && lineWidget.children[1] instanceof ListTextElementBox))) {
            var topMargin = 0;
            var bottomMargin = 0;
            height = this.documentHelper.selection.getParagraphMarkSize(lineWidget.paragraph, topMargin, bottomMargin).height;
            height += topMargin;
            if (lineWidget.children.length > 0) {
                var element = lineWidget.children[0];
                if (height < element.margin.top + element.height) {
                    height = element.margin.top + element.height;
                }
            }
        }
        else {
            for (var i = 0; i < lineWidget.children.length; i++) {
                var element = lineWidget.children[i];
                if (height < element.margin.top + element.height) {
                    height = element.margin.top + element.height;
                }
            }
        }
        return height;
    };
    Layout.prototype.createOrGetNextBodyWidget = function (bodyWidget, viewer) {
        var nextBodyWidget = undefined;
        var pageIndex = 0;
        pageIndex = this.documentHelper.pages.indexOf(bodyWidget.page);
        var page = undefined;
        var index = undefined;
        index = bodyWidget.index;
        if (pageIndex === this.documentHelper.pages.length - 1
            || this.documentHelper.pages[pageIndex + 1].sectionIndex !== index) {
            var currentWidget = new BodyWidget();
            currentWidget.sectionFormat = bodyWidget.sectionFormat;
            currentWidget.index = bodyWidget.index;
            page = viewer.createNewPage(currentWidget);
            if (this.documentHelper.pages[pageIndex + 1].sectionIndex !== index) {
                this.documentHelper.insertPage(pageIndex + 1, page);
            }
            nextBodyWidget = page.bodyWidgets[0];
        }
        else {
            page = this.documentHelper.pages[pageIndex + 1];
            nextBodyWidget = page.bodyWidgets[0];
        }
        return nextBodyWidget;
    };
    Layout.prototype.isFitInClientArea = function (paragraphWidget, viewer, blocks) {
        var lastLine = paragraphWidget.childWidgets[paragraphWidget.childWidgets.length - 1];
        var height = paragraphWidget.height;
        var maxElementHeight = this.getMaxElementHeight(lastLine);
        if (lastLine.height > maxElementHeight) {
            height -= lastLine.height - maxElementHeight;
        }
        var footHeight = 0;
        if (!isNullOrUndefined(blocks)) {
            if (blocks.length > 0) {
                if (blocks[0].containerWidget instanceof FootNoteWidget) {
                    footHeight = blocks[0].containerWidget.margin.top;
                }
                for (var k = 0; k < blocks.length; k++) {
                    for (var l = 0; l < blocks[k].childWidgets.length; l++) {
                        footHeight += blocks[k].childWidgets[l].height;
                    }
                }
            }
        }
        return viewer.clientActiveArea.height >= height + footHeight;
    };
    Layout.prototype.isLineInFootNote = function (line, footNotes) {
        for (var i = 0; i < footNotes.length; i++) {
            if (footNotes[i].line === line) {
                return true;
            }
        }
        return false;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.shiftToPreviousWidget = function (paragraphWidget, viewer, previousWidget, isPageBreak) {
        var fromBodyWidget = paragraphWidget.containerWidget;
        var toBodyWidget = previousWidget.containerWidget;
        var footNotes = [];
        var footNoteWidgets = [];
        if (toBodyWidget !== fromBodyWidget) {
            footNotes = this.getFootNotesOfBlock(paragraphWidget);
        }
        for (var i = 0; i < paragraphWidget.childWidgets.length; i++) {
            var line = paragraphWidget.childWidgets[i];
            var maxElementHeight = this.getMaxElementHeight(line);
            if (this.isLineInFootNote(line, footNotes)) {
                var footWidget = this.getFootNoteWidgetsBy(line.paragraph, footNotes);
                var height = 0;
                for (var m = 0; m < footWidget.length; m++) {
                    var footContent = footWidget[m];
                    for (var n = 0; n < footContent.childWidgets.length; n++) {
                        height += footContent.childWidgets[n].height;
                    }
                }
                if (footWidget.length > 0 && footWidget[0].containerWidget) {
                    height += footWidget[0].containerWidget.margin.top;
                }
                maxElementHeight += height;
            }
            if (viewer.clientActiveArea.height >= maxElementHeight && !isPageBreak) {
                if (footNotes.length > 0 && this.isLineInFootNote(line, footNotes)) {
                    footNoteWidgets = footNoteWidgets.concat(this.getFootNoteWidgetsBy(line.paragraph, footNotes));
                }
                //Moves the line widget to previous widget.
                this.updateParagraphWidgetInternal(line, previousWidget, previousWidget.childWidgets.length);
                i--;
                viewer.cutFromTop(viewer.clientActiveArea.y + line.height);
                if (isNullOrUndefined(paragraphWidget.childWidgets)) {
                    break;
                }
            }
            else {
                var bodyWidget = previousWidget.containerWidget;
                var newBodyWidget = this.createOrGetNextBodyWidget(bodyWidget, viewer);
                if (paragraphWidget.containerWidget !== newBodyWidget) {
                    newBodyWidget = this.moveBlocksToNextPage(paragraphWidget, true);
                }
                if (bodyWidget !== newBodyWidget) {
                    footNotes = this.getFootNotesOfBlock(paragraphWidget);
                    if (footNotes.length > 0) {
                        footNoteWidgets = footNoteWidgets.concat(this.getFootNoteWidgetsBy(paragraphWidget, footNotes));
                        toBodyWidget = newBodyWidget;
                    }
                    this.updateContainerWidget(paragraphWidget, newBodyWidget, 0, true);
                }
                //Updates client area based on next page.
                viewer.updateClientArea(fromBodyWidget.sectionFormat, fromBodyWidget.page);
                break;
            }
        }
        if (!isNullOrUndefined(footNoteWidgets) && footNoteWidgets.length > 0 && fromBodyWidget.page.footnoteWidget
            && fromBodyWidget != toBodyWidget) {
            this.moveFootNotesToPage(footNoteWidgets, fromBodyWidget, toBodyWidget);
        }
    };
    Layout.prototype.updateParagraphWidgetInternal = function (lineWidget, newParagraphWidget, index) {
        if (!isNullOrUndefined(lineWidget.paragraph)) {
            lineWidget.paragraph.childWidgets.splice(lineWidget.paragraph.childWidgets.indexOf(lineWidget), 1);
            lineWidget.paragraph.height -= lineWidget.height;
            if (!isNullOrUndefined(lineWidget.paragraph.containerWidget)) {
                lineWidget.paragraph.containerWidget.height -= lineWidget.height;
            }
            if (isNullOrUndefined(lineWidget.paragraph.childWidgets) || lineWidget.paragraph.childWidgets.length === 0) {
                lineWidget.paragraph.destroyInternal(this.viewer);
            }
        }
        newParagraphWidget.childWidgets.splice(index, 0, lineWidget);
        lineWidget.paragraph = newParagraphWidget;
        newParagraphWidget.height += lineWidget.height;
        if (!isNullOrUndefined(newParagraphWidget.containerWidget)) {
            newParagraphWidget.containerWidget.height += lineWidget.height;
        }
    };
    Layout.prototype.shiftNextWidgets = function (blockAdv) {
        var block = blockAdv;
        while (block.nextWidget instanceof BlockWidget) {
            block = block.nextWidget;
            this.reLayoutOrShiftWidgets(block, this.viewer);
        }
    };
    Layout.prototype.updateContainerWidget = function (widget, bodyWidget, index, destroyAndScroll, footWidget) {
        if (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget) {
            return;
        }
        var previousWidget = widget.containerWidget;
        if (!isNullOrUndefined(widget.containerWidget)) {
            widget.containerWidget.childWidgets.splice(widget.containerWidget.childWidgets.indexOf(widget), 1);
            widget.containerWidget.height -= bodyWidget.height;
            if ((isNullOrUndefined(widget.containerWidget.childWidgets) || widget.containerWidget.childWidgets.length === 0)
                && widget.containerWidget instanceof BodyWidget && widget.containerWidget !== bodyWidget && destroyAndScroll) {
                var page = widget.containerWidget.page;
                if (this.documentHelper.pages[this.documentHelper.pages.length - 1] === page &&
                    this.viewer.visiblePages.indexOf(page) !== -1) {
                    this.documentHelper.scrollToBottom();
                }
                if (isNullOrUndefined(page.nextPage) || page.nextPage.bodyWidgets[0].index !== widget.containerWidget.index) {
                    widget.containerWidget.destroyInternal(this.viewer);
                }
            }
        }
        bodyWidget.childWidgets.splice(index, 0, widget);
        if (widget instanceof ParagraphWidget && !isNullOrUndefined(widget.floatingElements)) {
            for (var i = 0; i < widget.floatingElements.length; i++) {
                var shape = widget.floatingElements[i];
                if (shape.textWrappingStyle !== 'Inline') {
                    bodyWidget.floatingElements.push(shape);
                    widget.bodyWidget.floatingElements.splice(widget.bodyWidget.floatingElements.indexOf(shape), 1);
                    /* eslint:disable */
                    bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                }
            }
        }
        if (widget instanceof TableWidget && widget.wrapTextAround
            && widget.bodyWidget.floatingElements.indexOf(widget) !== -1) {
            widget.bodyWidget.floatingElements.splice(widget.bodyWidget.floatingElements.indexOf(widget), 1);
        }
        bodyWidget.height += bodyWidget.height;
        widget.containerWidget = bodyWidget;
        if (previousWidget && previousWidget.page && previousWidget.page.footnoteWidget && footWidget && footWidget.length > 0) {
            this.moveFootNotesToPage(footWidget, previousWidget, bodyWidget);
        }
    };
    Layout.prototype.getBodyWidgetOfPreviousBlock = function (block, index) {
        index = 0;
        var prevBodyWidget = undefined;
        var previousBlock = block.previousRenderedWidget;
        prevBodyWidget = (previousBlock && previousBlock.containerWidget.equals(block.containerWidget)) ?
            previousBlock.containerWidget : block.containerWidget;
        index = previousBlock && previousBlock.containerWidget.equals(block.containerWidget) ?
            prevBodyWidget.childWidgets.indexOf(previousBlock) : block.containerWidget.childWidgets.indexOf(block);
        return { bodyWidget: prevBodyWidget, index: index };
    };
    Layout.prototype.moveBlocksToNextPage = function (block, moveFootnoteFromLastBlock) {
        var body = block.bodyWidget;
        var page = body.page;
        var pageIndex = page.index + 1;
        var nextPage = undefined;
        var nextBody = undefined;
        var insertPage = false;
        if (this.documentHelper.pages.length > pageIndex) {
            nextPage = this.documentHelper.pages[pageIndex];
            if (nextPage.bodyWidgets.length === 0 || !body.equals(nextPage.bodyWidgets[0])) {
                nextPage = undefined;
                insertPage = true;
            }
            else {
                nextBody = nextPage.bodyWidgets[0];
                this.viewer.updateClientArea(nextBody.sectionFormat, nextBody.page);
            }
        }
        if (isNullOrUndefined(nextPage)) {
            nextBody = this.createSplitBody(body);
            nextPage = this.viewer.createNewPage(nextBody, pageIndex);
            if (insertPage) {
                this.documentHelper.insertPage(pageIndex, nextPage);
            }
            this.clearLineMeasures();
        }
        // eslint-disable  no-constant-condition
        do {
            var lastBlock = void 0;
            if (body.lastChild instanceof FootNoteWidget) {
                lastBlock = body.lastChild.previousWidget;
            }
            else {
                lastBlock = body.lastChild;
            }
            if (moveFootnoteFromLastBlock) {
                var footWidget = this.getFootNoteWidgetsOf(lastBlock);
                this.moveFootNotesToPage(footWidget, body, nextBody);
            }
            if (block === lastBlock) {
                break;
            }
            body.childWidgets.splice(body.childWidgets.indexOf(lastBlock), 1);
            nextBody.childWidgets.splice(0, 0, lastBlock);
            if (lastBlock instanceof TableWidget && (body.floatingElements.indexOf(lastBlock) !== -1)) {
                body.floatingElements.splice(body.floatingElements.indexOf(lastBlock), 1);
                //nextBody.floatingElements.push(lastBlock);
            }
            if (lastBlock instanceof ParagraphWidget && lastBlock.floatingElements.length > 0) {
                for (var m = 0; m < lastBlock.floatingElements.length; m++) {
                    if (body.floatingElements.indexOf(lastBlock.floatingElements[m]) !== -1) {
                        body.floatingElements.splice(body.floatingElements.indexOf(lastBlock.floatingElements[m]), 1);
                        nextBody.floatingElements.push(lastBlock.floatingElements[m]);
                    }
                }
            }
            lastBlock.containerWidget = nextBody;
            nextBody.height += lastBlock.height;
            // eslint-disable-next-line no-constant-condition
        } while (true);
        return nextBody;
    };
    Layout.prototype.createSplitBody = function (body) {
        var newBody = this.addBodyWidget(this.viewer.clientActiveArea);
        newBody.sectionFormat = body.sectionFormat;
        newBody.index = body.index;
        return newBody;
    };
    //endregion
    //#region Relayout Parargaph
    /* eslint-disable  */
    Layout.prototype.reLayoutLine = function (paragraph, lineIndex, isBidi, isSkip) {
        this.isFootnoteContentChanged = false;
        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
            this.viewer.owner.editorModule.updateWholeListItems(paragraph);
        }
        var lineWidget;
        if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
            lineWidget = paragraph.getSplitWidgets()[0].firstChild;
        }
        else {
            lineWidget = paragraph.childWidgets[lineIndex];
        }
        var lineToLayout = lineWidget.previousLine;
        if (isNullOrUndefined(lineToLayout)) {
            lineToLayout = lineWidget;
        }
        lineToLayout.paragraph.splitLtrAndRtlText(lineToLayout.indexInOwner);
        lineToLayout.paragraph.combineconsecutiveRTL(lineToLayout.indexInOwner);
        var bodyWidget = paragraph.containerWidget;
        bodyWidget.height -= paragraph.height;
        if ((this.viewer.owner.enableHeaderAndFooter || paragraph.isInHeaderFooter) && !(bodyWidget instanceof TextFrame)) {
            paragraph.bodyWidget.isEmpty = false;
            this.viewer.updateHeaderFooterClientAreaWithTop(paragraph.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(paragraph), bodyWidget.page);
        }
        else if (bodyWidget instanceof TextFrame) {
            this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
            // } else if (bodyWidget instanceof FootNoteWidget) {
            //     this.isRelayoutFootnote = true;
            //     this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page);
            //     this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
            //     this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
            //     // curretBlock.containerWidget.height -= curretBlock.height;
            //     this.viewer.clientActiveArea.y = paragraph.containerWidget.y;
        }
        else {
            this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page, true);
        }
        this.viewer.updateClientAreaForBlock(paragraph, true);
        if (!isNullOrUndefined(paragraph.containerWidget) && !isNullOrUndefined(paragraph.containerWidget.containerWidget) && paragraph.containerWidget.containerWidget instanceof FootNoteWidget) {
            var y = paragraph.bodyWidget.containerWidget.y;
            this.viewer.cutFromTop(y);
            this.documentHelper.owner.editor.isFootNoteInsert = true;
            this.layoutfootNote(paragraph.containerWidget.containerWidget);
            return;
        }
        else if (lineToLayout.paragraph.isEmpty()) {
            this.viewer.cutFromTop(paragraph.y);
            this.layoutParagraph(paragraph, 0);
        }
        else {
            this.updateClientAreaForLine(lineToLayout);
            this.layoutListItems(lineToLayout.paragraph);
            if (lineToLayout.isFirstLine() && !isNullOrUndefined(paragraph.paragraphFormat)) {
                var firstLineIndent = -HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                this.viewer.updateClientWidth(firstLineIndent);
            }
            do {
                lineToLayout = this.layoutLine(lineToLayout, 0);
                paragraph = lineToLayout.paragraph;
                lineToLayout = lineToLayout.nextLine;
            } while (lineToLayout);
            this.updateWidgetToPage(this.viewer, paragraph);
            this.viewer.updateClientAreaForBlock(paragraph, false);
        }
        this.layoutNextItemsBlock(paragraph, this.viewer);
        var prevWidget = paragraph.getSplitWidgets()[0].previousRenderedWidget;
        if (!isNullOrUndefined(prevWidget) && (!(prevWidget instanceof ParagraphWidget) ||
            (prevWidget instanceof ParagraphWidget) && !prevWidget.isEndsWithPageBreak)) {
            this.viewer.cutFromTop(paragraph.y + paragraph.height);
            if (paragraph.containerWidget !== prevWidget.containerWidget && !isNullOrUndefined(prevWidget.containerWidget)) {
                /* eslint-disable-next-line max-len */
                var prevBodyWidget = paragraph.containerWidget;
                var newBodyWidget_1 = prevWidget.containerWidget;
                var footWidgets = this.getFootNoteWidgetsOf(paragraph);
                //this.updateContainerWidget(paragraph as Widget, newBodyWidget, prevWidget.indexInOwner + 1, false);
                if (!isNullOrUndefined(newBodyWidget_1.page.footnoteWidget)) {
                    this.moveFootNotesToPage(footWidgets, newBodyWidget_1, prevBodyWidget);
                }
            }
        }
        var page = this.documentHelper.pages.length;
        var foot;
        var newBodyWidget = this.documentHelper.pages[page - 1].bodyWidgets[0];
        if (this.isFootnoteContentChanged && !isNullOrUndefined(paragraph.bodyWidget.page.footnoteWidget)) {
            foot = paragraph.bodyWidget.page.footnoteWidget;
            this.layoutfootNote(foot);
        }
        if (this.isEndnoteContentChanged && !isNullOrUndefined(newBodyWidget.page.endnoteWidget)) {
            foot = newBodyWidget.page.endnoteWidget;
            var clientArea = this.viewer.clientArea.clone();
            var clientActiveArea = this.viewer.clientActiveArea.clone();
            this.viewer.cutFromTop(newBodyWidget.childWidgets[newBodyWidget.childWidgets.length - 1].y
                + newBodyWidget.childWidgets[newBodyWidget.childWidgets.length - 1].height);
            this.layoutfootNote(foot);
            this.viewer.clientArea = clientArea;
            this.viewer.clientActiveArea = clientActiveArea;
            //this.viewer.updateClientAreaForBlock(foot.block, false);
        }
    };
    //#endregion
    //RTL Feature layout start
    Layout.prototype.isContainsRtl = function (lineWidget) {
        if (this.viewer.documentHelper.isSelectionChangedOnMouseMoved && !this.isDocumentContainsRtl) {
            return false;
        }
        var isContainsRTL = false;
        for (var i = 0; i < lineWidget.children.length; i++) {
            if (lineWidget.children[i] instanceof TextElementBox) {
                isContainsRTL = lineWidget.children[i].characterFormat.bidi || lineWidget.children[i].characterFormat.bdo === 'RTL'
                    || this.documentHelper.textHelper.isRTLText(lineWidget.children[i].text);
                if (isContainsRTL) {
                    if (!this.isDocumentContainsRtl) {
                        this.isDocumentContainsRtl = isContainsRTL;
                    }
                    break;
                }
            }
        }
        return isContainsRTL;
    };
    // Re arranges the elements for Right to left layotuing.
    /* eslint-disable  */
    // public reArrangeElementsForRtl(line: LineWidget, isParaBidi: boolean): void {
    //     if (line.children.length === 0) {
    //         return;
    //     }
    //     let lastAddedElementIsRtl: boolean = false;
    //     let lastAddedRtlElementIndex: number = -1;
    //     let tempElements: ElementBox[] = [];
    //     for (let i: number = 0; i < line.children.length; i++) {
    //         let element: ElementBox = line.children[i];
    //         let elementCharacterFormat: WCharacterFormat = undefined;
    //         if (element.characterFormat) {
    //             elementCharacterFormat = element.characterFormat;
    //         }
    //         let isRtl: boolean = false;
    //         let text: string = '';
    //         let containsSpecchrs: boolean = false;
    //         if (element instanceof BookmarkElementBox) {
    //             if (isParaBidi) {
    //                 if (lastAddedElementIsRtl || element.bookmarkType === 0 && element.nextElement
    //                     && element.nextElement.nextElement instanceof TextElementBox
    //                     && this.documentHelper.textHelper.isRTLText(element.nextElement.nextElement.text)
    //                     || element.bookmarkType === 1 && element.nextElement instanceof TextElementBox
    //                     && this.documentHelper.textHelper.isRTLText(element.nextElement.text)) {
    //                     tempElements.splice(0, 0, element);
    //                 } else {
    //                     tempElements.splice(lastAddedElementIsRtl ? lastAddedRtlElementIndex : lastAddedRtlElementIndex + 1, 0, element);
    //                 }
    //                 lastAddedRtlElementIndex = tempElements.indexOf(element);
    //             } else {
    //                 tempElements.push(element);
    //             }
    //             continue;
    //         }
    //         if (element instanceof TextElementBox) {
    //             text = (element as TextElementBox).text;
    //             containsSpecchrs = this.documentHelper.textHelper.containsSpecialCharAlone(text.trim());
    //             if (containsSpecchrs) {
    //                 if (elementCharacterFormat.bidi && isParaBidi) {
    //                     text = HelperMethods.reverseString(text);
    //                     for (let k: number = 0; k < text.length; k++) {
    //                         let ch: string = this.documentHelper.textHelper.inverseCharacter(text.charAt(k));
    //                         text = text.replace(text.charAt(k), ch);
    //                     }
    //                     element.text = text;
    //                 }
    //             }
    //             let textElement: ElementBox = element.nextElement;
    //             if (element instanceof TextElementBox && this.documentHelper.textHelper.containsNumberAlone(element.text.trim())) {
    //                 while (textElement instanceof TextElementBox && textElement.text.trim() !== '' && (this.documentHelper.textHelper.containsNumberAlone(textElement.text.trim()) || this.documentHelper.textHelper.containsSpecialCharAlone(textElement.text.trim()))) {
    //                     element.text = element.text + textElement.text;
    //                     element.line.children.splice(element.line.children.indexOf(textElement), 1);
    //                     textElement = element.nextElement;
    //                 }
    //                 element.width = this.documentHelper.textHelper.getTextSize(element as TextElementBox, element.characterFormat);
    //             }
    //         }
    //         let isRTLText: boolean = false;
    //         // let isNumber: boolean = false;
    //         // The list element box shold be added in the last position in line widget for the RTL paragraph 
    //         // and first in the line widget for LTR paragrph.
    //         if (element instanceof ListTextElementBox) {
    //             isRtl = isParaBidi;
    //         } else { // For Text element box we need to check the character format and unicode of text to detect the RTL text. 
    //             isRTLText = this.documentHelper.textHelper.isRTLText(text);
    //             isRtl = isRTLText || elementCharacterFormat.bidi
    //                 || elementCharacterFormat.bdo === 'RTL';
    //         }
    //         if (element instanceof FieldElementBox || this.isRtlFieldCode) {
    //             if ((element as FieldElementBox).fieldType === 0) {
    //                 this.isRtlFieldCode = true;
    //             } else if ((element as FieldElementBox).fieldType === 1) {
    //                 this.isRtlFieldCode = false;
    //             }
    //             isRtl = false;
    //         }
    //         // If the text element box contains only whitespaces, then need to check the previous and next elements.
    //         if (!isRtl && !isNullOrUndefined(text) && text !== '' && ((text !== '' && text.trim() === '') || containsSpecchrs)) {
    //             let elements: ElementBox[] = line.children;
    //             //Checks whether the langugae is RTL.
    //             if (elementCharacterFormat.bidi) {
    //                 // If the last added element is rtl then current text element box also considered as RTL for WhiteSpaces.
    //                 if (lastAddedElementIsRtl) {
    //                     isRtl = true;
    //                     // Else, Check for next element.
    //                 } else if (i + 1 < line.children.length && line.children[i + 1] instanceof TextElementBox) {
    //                     text = (elements[i + 1] as TextElementBox).text;
    //                     isRtl = this.documentHelper.textHelper.isRTLText(text) || elements[i + 1].characterFormat.bidi
    //                         || elements[i + 1].characterFormat.bdo === 'RTL';
    //                 }// If the last added element is rtl then current text element box also considered as RTL for WhiteSpaces.
    //             } else if (lastAddedElementIsRtl) {
    //                 isRtl = true;
    //             }
    //         }
    //         // Preserve the isRTL value, to reuse it for navigation and selection.
    //         element.isRightToLeft = isRtl;
    //         //Adds the text element to the line
    //         if (isRtl && elementCharacterFormat.bdo !== 'LTR') {
    //             if (lastAddedElementIsRtl) {
    //                 tempElements.splice(lastAddedRtlElementIndex, 0, element);
    //             } else {
    //                 if (!isParaBidi) {
    //                     tempElements.push(element);
    //                 } else {
    //                     tempElements.splice(0, 0, element);
    //                 }
    //                 lastAddedElementIsRtl = true;
    //                 lastAddedRtlElementIndex = tempElements.indexOf(element);
    //             }
    //         } else {
    //             if (lastAddedElementIsRtl && element instanceof ImageElementBox) {
    //                 if (elementCharacterFormat.bidi) {
    //                     tempElements.splice(lastAddedRtlElementIndex + 1, 0, element);
    //                 } else {
    //                     tempElements.splice(lastAddedRtlElementIndex, 0, element);
    //                 }
    //             } else {
    //                 if (!isParaBidi) {
    //                     tempElements.push(element);
    //                 } else {
    //                     if (lastAddedElementIsRtl) {
    //                         tempElements.splice(0, 0, element);
    //                     } else {
    //                         tempElements.splice(lastAddedRtlElementIndex + 1, 0, element);
    //                     }
    //                     lastAddedRtlElementIndex = tempElements.indexOf(element);
    //                 }
    //                 lastAddedElementIsRtl = false;
    //             }
    //         }
    //     }
    //     // Clear the elemnts and reassign the arranged elements.
    //     line.children = [];
    //     line.children = tempElements;
    // }
    Layout.prototype.shiftElementsForRTLLayouting = function (line, paraBidi) {
        ////Check whether span has bidi value
        var textRangeBidi = this.hasTextRangeBidi(line);
        if (this.isContainsRTLText(line) || paraBidi || textRangeBidi) {
            ////Splits the child elements of a line by consecutive RTL, LTR text and word breaking characters.
            var characterRangeTypes = [];
            var lineElementsBidiValues = [];
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof TextElementBox && element.height > 0 && !(element.isPageBreak)) {
                    var textRange = element;
                    lineElementsBidiValues.push(textRange.characterFormat.bidi);
                    if (textRange.text == "\t") {
                        characterRangeTypes.push(CharacterRangeType.Tab);
                    }
                    else {
                        characterRangeTypes.push(textRange.characterRange);
                    }
                    element.isRightToLeft = characterRangeTypes[characterRangeTypes.length - 1] == CharacterRangeType.RightToLeft;
                }
                else if (element instanceof CommentCharacterElementBox
                    || element instanceof BookmarkElementBox || element instanceof EditRangeStartElementBox
                    || element instanceof EditRangeEndElementBox || element instanceof ContentControl
                    || element instanceof FieldElementBox) {
                    var isStartMark = this.isStartMarker(element);
                    var isEndMark = this.isEndMarker(element);
                    if (isStartMark && i < line.children.length - 1) {
                        var nextltWidget = this.getNextValidWidget(i + 1, line);
                        if (!isNullOrUndefined(nextltWidget) && (nextltWidget instanceof TextElementBox)
                            && nextltWidget.height > 0) {
                            var textRange = nextltWidget;
                            lineElementsBidiValues.push(textRange.characterFormat.bidi);
                            //Since tab-stop in the line changes the reordering, here we consider an tab-stop widget as Tab.
                            if (nextltWidget.text === '\t') {
                                characterRangeTypes.push(CharacterRangeType.Tab);
                            }
                            else {
                                characterRangeTypes.push(textRange.characterRange);
                            }
                        }
                        else {
                            lineElementsBidiValues.push(false);
                            characterRangeTypes.push(CharacterRangeType.LeftToRight);
                        }
                    }
                    else if (!isEndMark && i > 0) {
                        lineElementsBidiValues.push(lineElementsBidiValues[lineElementsBidiValues.length - 1]);
                        characterRangeTypes.push(characterRangeTypes[characterRangeTypes.length - 1]);
                    }
                    else {
                        lineElementsBidiValues.push(false);
                        characterRangeTypes.push(CharacterRangeType.LeftToRight);
                    }
                }
                else if (element instanceof ListTextElementBox && paraBidi) {
                    lineElementsBidiValues.push(paraBidi);
                    characterRangeTypes.push(CharacterRangeType.RightToLeft);
                }
                else {
                    lineElementsBidiValues.push(false);
                    characterRangeTypes.push(CharacterRangeType.LeftToRight);
                }
            }
            ////Sets CharacterRangeType of word split characters as (WordSplit | RTL), if word split characters are present between splitted RTL text in the same layouted line.
            ////This code handles for both single and multiple Text Ranges of a line (Special case for ordering elements)
            var rtlStartIndex = -1;
            var isPrevLTRText = undefined;
            for (var i = 0; i < characterRangeTypes.length; i++) {
                if (i + 1 < lineElementsBidiValues.length
                    && lineElementsBidiValues[i] != lineElementsBidiValues[i + 1]) {
                    if (rtlStartIndex != -1) {
                        this.updateCharacterRange(line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                        rtlStartIndex = -1;
                    }
                    isPrevLTRText = null;
                    continue;
                }
                if (characterRangeTypes[i] == CharacterRangeType.RightToLeft || characterRangeTypes[i] == CharacterRangeType.LeftToRight
                    || characterRangeTypes[i] == CharacterRangeType.Number && rtlStartIndex != -1
                    || (isNullOrUndefined(isPrevLTRText) || !isPrevLTRText) && lineElementsBidiValues[i]) {
                    if (rtlStartIndex == -1 && characterRangeTypes[i] != CharacterRangeType.LeftToRight) {
                        rtlStartIndex = i;
                    }
                    else if (rtlStartIndex == -1) {
                        if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                            isPrevLTRText = true;
                        }
                        else if (characterRangeTypes[i] == CharacterRangeType.RightToLeft) {
                            isPrevLTRText = false;
                        }
                        continue;
                    }
                    else if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                        this.updateCharacterRange(line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                        rtlStartIndex = characterRangeTypes[i] == CharacterRangeType.RightToLeft
                            || characterRangeTypes[i] == CharacterRangeType.Number && rtlStartIndex != -1 ? i : -1;
                    }
                }
                if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                    isPrevLTRText = true;
                }
                else if (characterRangeTypes[i] == CharacterRangeType.RightToLeft) {
                    isPrevLTRText = false;
                }
            }
            if (rtlStartIndex != -1 && rtlStartIndex < characterRangeTypes.length - 1) {
                this.updateCharacterRange(line, characterRangeTypes.length - 1, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                rtlStartIndex = -1;
            }
            if (characterRangeTypes.length != line.children.length) {
                ////This exception is thrown to avoid, unhandled exception in RTL/LTR reordering logic.
                throw new Error("Splitted Widget count mismatch while reordering layouted child widgets of a line");
            }
            var reorderedWidgets = this.reorderElements(line, characterRangeTypes, lineElementsBidiValues, paraBidi);
            lineElementsBidiValues.length = 0;
            characterRangeTypes.length = 0;
            if (line.children.length > 0) {
                line.layoutedElements = reorderedWidgets;
                //elements.Clear();
                //line.children = reorderedWidgets;
                ////ReCalculate the height and baseline offset once again.
                //UpdateMaxElement();
            }
        }
        return paraBidi;
    };
    Layout.prototype.isStartMarker = function (element) {
        if (element instanceof CommentCharacterElementBox) {
            return element.commentType === 0;
        }
        else if (element instanceof BookmarkElementBox) {
            return element.bookmarkType === 0;
        }
        else if (element instanceof EditRangeStartElementBox) {
            return true;
        }
        else if (element instanceof ContentControl) {
            return element.type === 0;
        }
        else if (element instanceof FieldElementBox) {
            return element.fieldType === 0;
        }
        return false;
    };
    Layout.prototype.isEndMarker = function (element) {
        if (element instanceof CommentCharacterElementBox) {
            return element.commentType === 1;
        }
        else if (element instanceof BookmarkElementBox) {
            return element.bookmarkType === 1;
        }
        else if (element instanceof EditRangeStartElementBox) {
            return true;
        }
        else if (element instanceof ContentControl) {
            return element.type === 1;
        }
        else if (element instanceof FieldElementBox) {
            return element.fieldType === 1;
        }
        return false;
    };
    Layout.prototype.getNextValidWidget = function (startIndex, layoutedWidgets) {
        for (var i = startIndex; i < layoutedWidgets.children.length; i++) {
            var element = layoutedWidgets.children[i];
            if (element instanceof CommentCharacterElementBox
                || element instanceof BookmarkElementBox || element instanceof EditRangeStartElementBox
                || element instanceof EditRangeEndElementBox || element instanceof ContentControl
                || element instanceof FieldElementBox) {
                continue;
            }
            else {
                return element[i];
            }
        }
        return null;
    };
    Layout.prototype.hasTextRangeBidi = function (line) {
        for (var i = 0; i < line.children.length; i++) {
            var elementBox = line.children[i];
            if (elementBox instanceof TextElementBox) {
                var textRange = elementBox;
                if (textRange.characterFormat.bidi) {
                    return true;
                }
            }
        }
        return false;
    };
    Layout.prototype.isContainsRTLText = function (line) {
        var documentHelper = line.paragraph.bodyWidget.page.documentHelper;
        var textHelper = documentHelper.textHelper;
        var isContainsRTL = false;
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof TextElementBox) {
                isContainsRTL = line.children[i].characterFormat.bidi || line.children[i].characterFormat.bidi == true
                    || textHelper.isRTLText(line.children[i].text);
                if (isContainsRTL)
                    break;
            }
        }
        return isContainsRTL;
    };
    Layout.prototype.updateCharacterRange = function (line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes) {
        var endIndex = i;
        if (!lineElementsBidiValues[i]) {
            if (characterRangeTypes[i] === CharacterRangeType.LeftToRight) {
                endIndex--;
            }
            for (var j = endIndex; j >= rtlStartIndex; j--) {
                if (characterRangeTypes[j] != CharacterRangeType.WordSplit) {
                    endIndex = j;
                    break;
                }
            }
        }
        for (var j = rtlStartIndex; j <= endIndex; j++) {
            if (characterRangeTypes[j] == CharacterRangeType.WordSplit) {
                characterRangeTypes[j] = CharacterRangeType.RightToLeft | CharacterRangeType.WordSplit;
                var previousIndex = j - 1;
                var nextIndex = j + 1;
                //// Handled a special behavior, When a EastAsia font is "Times New Roman" for text range.
                //// Group of word split character is exist in between a RTL characters, MS Word reverse a corresponding word split characters.
                //// So, that we have reverse the word split characters.
                if (previousIndex >= 0 && nextIndex < characterRangeTypes.length
                    && characterRangeTypes[previousIndex] == CharacterRangeType.RightToLeft
                    && (characterRangeTypes[nextIndex] == CharacterRangeType.RightToLeft || characterRangeTypes[nextIndex] == CharacterRangeType.Number)
                    && line.children[j] instanceof TextElementBox) {
                    var textRange = line.children[j];
                    if (textRange.characterFormat.fontFamilyBidi == "Times New Roman") {
                        var charArray = textRange.text.split("");
                        var reverseArray = charArray.reverse();
                        var joinArray = reverseArray.join("");
                        textRange.text = joinArray;
                    }
                }
            }
        }
    };
    Layout.prototype.reorderElements = function (line, characterRangeTypes, listElementsBidiValues, paraBidi) {
        var insertIndex = 0, lastItemIndexWithoutRTLFlag = -1, consecutiveRTLCount = 0, consecutiveNumberCount = 0;
        var reorderedElements = [];
        var prevCharType = CharacterRangeType.LeftToRight;
        var prevBidi = false;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            var textElement = element;
            textElement.characterRange = characterRangeTypes[i];
            var isRTLText = (textElement.characterRange & CharacterRangeType.RightToLeft) == CharacterRangeType.RightToLeft || textElement.characterRange == CharacterRangeType.Number;
            var isBidi = listElementsBidiValues[i];
            ////If tab-stop is exist with in the line then we have to consider the below behaviours
            if (characterRangeTypes[i] == CharacterRangeType.Tab) {
                if (paraBidi) {
                    ////When para bidi is true, reordering is performed until tab stop position and break the reordering and then again reordering is performed for the remaining contents which exist after the tab-stop. 
                    ////Assume if we have an tab stop in center of the line, then the reordering is performed until the tab stop position and stop and place a tab stop and starts reordering for the remaining contents. 
                    insertIndex = 0;
                    lastItemIndexWithoutRTLFlag = -1;
                    consecutiveRTLCount = 0;
                    prevCharType = CharacterRangeType.LeftToRight;
                    prevBidi = false;
                    reorderedElements.splice(insertIndex, 0, element);
                    continue;
                }
                else if (isBidi) {
                    ////If text range bidi is true for the tab stop widget, MS Word does not consider this tab-stop bidi as LTR Bidi and does not shift it as per our reordering. 
                    ////Instead its consider this widget as non-bidi LTR and do the reordering.
                    isBidi = false;
                }
            }
            if (i > 0 && prevBidi != isBidi) {
                if (paraBidi) {
                    ////If Bidi of paragraph is true, then start inserting widgets from first (index 0).
                    insertIndex = 0;
                    lastItemIndexWithoutRTLFlag = -1;
                    consecutiveRTLCount = 0;
                }
                else {
                    ////If Bidi of paragraph is false, then start inserting widgets from last (reorderedWidgets.Count).
                    lastItemIndexWithoutRTLFlag = reorderedElements.length - 1;
                }
                ////If Bidi for previous and next widget differs, we have to reset consecutive number to 0.
                consecutiveNumberCount = 0;
            }
            if (!isBidi && !isRTLText) {
                if (paraBidi) {
                    if (consecutiveRTLCount > 0 && prevBidi == isBidi) {
                        insertIndex += consecutiveRTLCount;
                    }
                    reorderedElements.splice(insertIndex, 0, element);
                    insertIndex++;
                }
                else {
                    reorderedElements.push(element);
                    insertIndex = i + 1;
                }
                consecutiveRTLCount = 0;
                lastItemIndexWithoutRTLFlag = paraBidi ? insertIndex - 1 : reorderedElements.length - 1;
            }
            else if (isRTLText || (isBidi && textElement.characterRange == CharacterRangeType.WordSplit
                && (prevCharType == CharacterRangeType.RightToLeft || this.isInsertWordSplitToLeft(characterRangeTypes, listElementsBidiValues, i)))) {
                consecutiveRTLCount++;
                insertIndex = lastItemIndexWithoutRTLFlag + 1;
                if (textElement.characterRange == CharacterRangeType.Number) {
                    if (prevCharType == CharacterRangeType.Number) {
                        ////Moves the insertIndex to the right after the previous consecutive number.
                        insertIndex += consecutiveNumberCount;
                    }
                    ////Increments consecutive number counter, to decide how much position the next number text range (widget) has to be moved and inserted towards right of insertIndex.
                    consecutiveNumberCount++;
                }
                reorderedElements.splice(insertIndex, 0, element);
            }
            else {
                reorderedElements.splice(insertIndex, 0, element);
                insertIndex++;
                consecutiveRTLCount = 0;
            }
            if (textElement.characterRange != CharacterRangeType.Number) {
                ////Resets the consecutive number counter when character range is not a number.
                consecutiveNumberCount = 0;
            }
            if (textElement.characterRange != CharacterRangeType.WordSplit) {
                ////Note: Handled to set only CharacterRangeType.RightToLeft and CharacterRangeType.LeftToRight
                ////For CharacterRangeType.WordSplit | CharacterRangeType.RightToLeft case, the IsInsertWordSplitToLeft method will return true.
                prevCharType = textElement.characterRange;
            }
            prevBidi = isBidi;
        }
        return reorderedElements;
    };
    Layout.prototype.isInsertWordSplitToLeft = function (characterRangeTypes, lineElementsBidiValues, elementIndex) {
        for (var i = elementIndex + 1; i < characterRangeTypes.length; i++) {
            if ((characterRangeTypes[i] & CharacterRangeType.RightToLeft) == CharacterRangeType.RightToLeft) {
                return true;
            }
            else if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                if (lineElementsBidiValues[i]) {
                    return false;
                }
                else {
                    ////If bidi is true for previous LTR and bidi is false for next LTR, then insert Word split to before previous inserted widget.
                    return true;
                }
            }
        }
        return true;
    };
    Layout.prototype.shiftLayoutFloatingItems = function (paragraph) {
        for (var i = 0; i < paragraph.floatingElements.length; i++) {
            var element = paragraph.floatingElements[i];
            var position = this.getFloatingItemPoints(element);
            var height = position.y - element.y;
            element.x = position.x;
            element.y = position.y;
            if (element instanceof ShapeElementBox) {
                for (var j = 0; j < element.textFrame.childWidgets.length; j++) {
                    var block = element.textFrame.childWidgets[j];
                    if (block instanceof ParagraphWidget) {
                        block.y = block.y + height;
                    }
                    else if (block instanceof TableWidget) {
                        this.shiftChildLocationForTableWidget(block, height);
                    }
                }
            }
        }
    };
    //RTL feature layout end
    Layout.prototype.getFloatingItemPoints = function (floatElement) {
        var paragraph = floatElement.line.paragraph;
        var sectionFormat = paragraph.bodyWidget.sectionFormat;
        var indentX = 0;
        var indentY = 0;
        if (paragraph) {
            var leftMargin = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
            var rightMargin = HelperMethods.convertPointToPixel(sectionFormat.rightMargin);
            var topMargin = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
            var bottomMargin = sectionFormat.bottomMargin > 0 ? HelperMethods.convertPointToPixel(sectionFormat.bottomMargin) : 48;
            var headerDistance = HelperMethods.convertPointToPixel(sectionFormat.headerDistance);
            var footerDistance = HelperMethods.convertPointToPixel(sectionFormat.footerDistance);
            var pageWidth = HelperMethods.convertPointToPixel(sectionFormat.pageWidth);
            var pageHeight = HelperMethods.convertPointToPixel(sectionFormat.pageHeight);
            var pageClientWidth = pageWidth - (leftMargin + rightMargin);
            var pageClientHeight = pageHeight - topMargin - bottomMargin;
            //Need to consider RTL layout.
            if (paragraph.isInHeaderFooter && sectionFormat.topMargin <= 0) {
                topMargin = Math.abs(topMargin) > 0 ? Math.abs(topMargin)
                    : HelperMethods.convertPointToPixel(sectionFormat.headerDistance) + (paragraph.height);
            }
            else {
                topMargin = topMargin > 0 ? topMargin : 48;
            }
            //Update the top margin as text body y position when text body y position exceeds the top margin. 
            if (!paragraph.isInHeaderFooter && topMargin < this.viewer.clientArea.y) {
                topMargin = this.viewer.clientArea.y;
            }
            var mIsYPositionUpdated = false;
            var textWrapStyle = 'InFrontOfText';
            //if (textWrapStyle !== 'Inline') {
            var isLayoutInCell = false;
            var vertOrigin = floatElement.verticalOrigin;
            var horzOrigin = floatElement.horizontalOrigin;
            var horzAlignment = floatElement.horizontalAlignment;
            var vertAlignment = floatElement.verticalAlignment;
            var verticalPercent = floatElement.verticalRelativePercent;
            var horizontalPercent = floatElement.horizontalRelativePercent;
            var shapeHeight = floatElement.height;
            //Need to update size width for Horizontal Line when width exceeds client width.
            // if(shape !== null && shape.IsHorizontalRule && size.Width > m_layoutArea.ClientActiveArea.Width)
            //     size.Width = m_layoutArea.ClientActiveArea.Width;
            var shapeWidth = floatElement.width;
            var vertPosition = floatElement.verticalPosition;
            var horzPosition = floatElement.horizontalPosition;
            var layoutInCell = floatElement.layoutInCell;
            var autoShape = void 0;
            if (floatElement instanceof ShapeElementBox) {
                autoShape = floatElement.autoShapeType;
            }
            //Word 2013 Layout picture in table cell even layoutInCell property was False.
            if (paragraph.isInsideTable && layoutInCell) {
                isLayoutInCell = true;
                indentY = this.getVerticalPosition(floatElement, vertPosition, vertOrigin, textWrapStyle);
                indentX = this.getHorizontalPosition(floatElement.width, floatElement, horzAlignment, horzOrigin, horzPosition, textWrapStyle, paragraph.associatedCell.cellFormat.cellWidth);
            }
            else {
                if (this.documentHelper.viewer instanceof WebLayoutViewer) {
                    switch (vertOrigin) {
                        case 'Line':
                            indentY = this.documentHelper.selection.getTop(floatElement.line);
                            break;
                        default:
                            indentY = this.viewer.clientActiveArea.y;
                            break;
                    }
                    switch (horzOrigin) {
                        case 'Character':
                            indentX = this.viewer.clientActiveArea.x;
                            break;
                        default:
                            switch (horzAlignment) {
                                case 'Center':
                                    indentX = (this.viewer.clientArea.width / 2) - (floatElement.width / 2);
                                    break;
                                default:
                                    indentX = this.viewer.clientArea.x;
                                    break;
                            }
                            break;
                    }
                }
                else {
                    if (mIsYPositionUpdated) { /* Upadte the Y Coordinate of floating image when floating image postion is changed based on the wrapping style. */
                        indentY = this.viewer.clientArea.y;
                    }
                    else {
                        switch (vertOrigin) {
                            case 'Page':
                            case 'TopMargin':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Top':
                                        indentY = vertPosition;
                                        break;
                                    case 'Center':
                                        if (vertOrigin === 'TopMargin') {
                                            indentY = (topMargin - shapeHeight) / 2;
                                        }
                                        else {
                                            indentY = (pageHeight - shapeHeight) / 2;
                                        }
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        if (vertOrigin === 'Page' && vertAlignment === 'Bottom') {
                                            indentY = pageHeight - shapeHeight;
                                        }
                                        else {
                                            if (vertOrigin === 'TopMargin') {
                                                indentY = (topMargin - shapeHeight);
                                            }
                                            else if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                indentY = pageHeight - shapeHeight - footerDistance / 2;
                                            }
                                            else {
                                                indentY = headerDistance / 2;
                                            }
                                        }
                                        break;
                                    case 'Inside':
                                        if (vertOrigin === 'Page') {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - shapeHeight - footerDistance / 2;
                                            }
                                            else {
                                                indentY = headerDistance / 2;
                                            }
                                        }
                                        else {
                                            //Need to ensure this behaviour.
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = ((topMargin - shapeHeight) / 2 - headerDistance);
                                            }
                                        }
                                        break;
                                    case 'None':
                                        if (Math.abs(verticalPercent) <= 1000) {
                                            indentY = pageHeight * (verticalPercent / 100);
                                        }
                                        else {
                                            indentY = vertPosition;
                                        }
                                        break;
                                }
                                break;
                            case 'Line':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Inside':
                                    case 'Top':
                                        //Need to update line widget height instead of client active area.
                                        indentY = this.viewer.clientActiveArea.y;
                                        break;
                                    case 'Center':
                                        indentY = this.viewer.clientActiveArea.y - shapeHeight / 2;
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        indentY = this.viewer.clientActiveArea.y - shapeHeight;
                                        break;
                                    case 'None':
                                        indentY = Math.round(paragraph.y) + vertPosition;
                                        break;
                                }
                                break;
                            case 'BottomMargin':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Inside':
                                    case 'Top':
                                        indentY = (pageHeight - bottomMargin);
                                        break;
                                    case 'Center':
                                        indentY = pageHeight - bottomMargin + ((bottomMargin - shapeHeight) / 2);
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        if (paragraph.bodyWidget.page.index + 1 % 2 !== 0 && vertAlignment === 'Outside') {
                                            indentY = pageHeight - bottomMargin;
                                        }
                                        else {
                                            indentY = pageHeight - shapeHeight;
                                        }
                                        break;
                                    case 'None':
                                        indentY = pageHeight - bottomMargin + vertPosition;
                                        break;
                                }
                                break;
                            case 'InsideMargin':
                            case 'OutsideMargin':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Inside':
                                        if (vertOrigin === 'InsideMargin') {
                                            if (vertOrigin === 'InsideMargin' && paragraph.bodyWidget.page.index + 1 % 2 === 0) {
                                                indentY = pageHeight - shapeHeight;
                                            }
                                            else {
                                                indentY = 0;
                                            }
                                        }
                                        else {
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin : topMargin - shapeHeight;
                                        }
                                        break;
                                    case 'Top':
                                        if (vertOrigin === 'InsideMargin') {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - bottomMargin;
                                            }
                                            else {
                                                indentY = 0;
                                            }
                                        }
                                        else {
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin : 0;
                                        }
                                        break;
                                    case 'Center':
                                        if (vertOrigin === 'OutsideMargin') {
                                            //Need to ensure this.
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin + (bottomMargin - shapeHeight) / 2 : (topMargin - shapeHeight) / 2;
                                        }
                                        else {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - bottomMargin + (bottomMargin - shapeHeight) / 2;
                                            }
                                            else {
                                                indentY = (topMargin - shapeHeight) / 2;
                                            }
                                        }
                                        break;
                                    case 'Outside':
                                        if (vertOrigin === 'InsideMargin') {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = (pageHeight - bottomMargin);
                                            }
                                            else {
                                                indentY = (topMargin - shapeHeight);
                                            }
                                        }
                                        else {
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? topMargin - shapeHeight : pageHeight - bottomMargin;
                                        }
                                        break;
                                    case 'Bottom':
                                        if (vertOrigin === 'OutsideMargin') {
                                            indentY = (paragraph.bodyWidget.page.index + 1) !== 0 ? pageHeight - shapeHeight : topMargin - shapeHeight;
                                        }
                                        else {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - shapeHeight;
                                            }
                                            else {
                                                indentY = topMargin - shapeHeight;
                                            }
                                        }
                                        break;
                                    case 'None':
                                        break;
                                }
                                break;
                            case 'Paragraph':
                                var space = 0;
                                //let prevsibling: BlockWidget = paragraph.previousWidget as BlockWidget;
                                // if (floatElement) {
                                //     //Need to handle DocIO Implementation.
                                //     if (Math.round(paragraph.y) !== Math.round(topMargin) && (prevsibling instanceof ParagraphWidget)
                                //         && ((paragraph.paragraphFormat.beforeSpacing > prevsibling.paragraphFormat.afterSpacing)
                                //             || (prevsibling.paragraphFormat.afterSpacing < 14)
                                //             && !paragraph.paragraphFormat.contextualSpacing)) {
                                //         space = prevsibling.paragraphFormat.afterSpacing;
                                //     }
                                // }
                                // eslint-disable-next-line max-len
                                //Floating item Y position is calculated from paragraph original Y position not from wrapped paragraph Y(ParagraphLayoutInfo.YPosition) position.
                                indentY = Math.round(paragraph.y) + space + vertPosition;
                                break;
                            case 'Margin':
                                //If header distance is more than top margin, then calculate the position of item based on header distance.
                                //As per Microsoft Word behavior, it is need to consider paragraph height along with the distance.
                                if (paragraph.isInHeaderFooter && headerDistance > topMargin) {
                                    //Need to udpate.
                                    indentY = (headerDistance + (paragraph.height)) + vertPosition;
                                }
                                else {
                                    indentY = topMargin + vertPosition;
                                }
                                switch (vertAlignment) {
                                    case 'Top':
                                        indentY = topMargin;
                                        break;
                                    case 'Center':
                                        indentY = topMargin + (pageClientHeight - shapeHeight) / 2;
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                            indentY = topMargin + pageClientHeight - shapeHeight;
                                        }
                                        else {
                                            indentY = topMargin;
                                        }
                                        break;
                                    case 'Inside':
                                        if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                            indentY = topMargin + pageClientHeight - shapeHeight;
                                        }
                                        else {
                                            indentY = topMargin;
                                        }
                                        break;
                                    case 'None':
                                        break;
                                }
                                break;
                            default:
                                //Need to analyze further.
                                indentY = this.viewer.clientArea.y - vertPosition;
                                break;
                        }
                    }
                    // if (horzOrigin !== 'Column' && horzAlignment !== 'None') {
                    //     indentX = this.viewer.clientArea.x;
                    //     //Update the floating item x position to zero when floating item’s width
                    //     //exceeds the page width when floating item and it wrapping style is not equal to  
                    //     // infront of text and behind text and also vertical origin is not equal to paragraph.
                    // } else 
                    if (paragraph && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind' &&
                        vertOrigin === 'Paragraph' && shapeWidth >= pageWidth) {
                        indentX = 0;
                    }
                    else {
                        switch (horzOrigin) {
                            case 'Page':
                                indentX = horzPosition;
                                switch (horzAlignment) {
                                    case 'Center':
                                        if (isLayoutInCell) {
                                            indentX = (paragraph.associatedCell.cellFormat.cellWidth - shapeWidth) / 2;
                                        }
                                        else {
                                            indentX = (pageWidth - shapeWidth) / 2;
                                        }
                                        break;
                                    case 'Left':
                                        indentX = 0;
                                        break;
                                    case 'Outside':
                                    case 'Right':
                                        if (isLayoutInCell) {
                                            indentX = paragraph.associatedCell.cellFormat.cellWidth - shapeWidth;
                                        }
                                        else {
                                            indentX = pageWidth - shapeWidth;
                                        }
                                        break;
                                    case 'None':
                                        if (isLayoutInCell) {
                                            indentX = paragraph.associatedCell.x + horzPosition;
                                        }
                                        else if (floatElement instanceof ShapeElementBox) {
                                            indentX = horzPosition;
                                            // Shape pItemShape = paraItem as Shape;
                                            // float horRelPercent = pItemShape !== null ? pItemShape.TextFrame.HorizontalRelativePercent
                                            //                       : (paraItem as WTextBox).TextBoxFormat.HorizontalRelativePercent;
                                            // if (Math.Abs(horRelPercent) <= 1000)
                                            //     indentX = pageWidth * (horRelPercent / 100);
                                            // else
                                            //     indentX = pItemShape !== null ? pItemShape.HorizontalPosition
                                            //         : (paraItem as WTextBox).TextBoxFormat.HorizontalPosition;
                                        }
                                        else {
                                            indentX = horzPosition;
                                        }
                                        break;
                                }
                                if (indentX < 0 && isLayoutInCell) {
                                    indentX = paragraph.associatedCell.x;
                                }
                                break;
                            case 'Column':
                                var isXPositionUpated = false;
                                //Update the Xposition while wrapping element exsit in the paragraph
                                if (this.viewer.clientActiveArea.x < paragraph.x) {
                                    // let cellPadings = 0;
                                    // if (paragraph.isInsideTable) {
                                    //     CellLayoutInfo cellLayoutInfo = (ownerPara.GetOwnerEntity() as IWidget).LayoutInfo as CellLayoutInfo;
                                    //     cellPadings = cellLayoutInfo.Paddings.Left + cellLayoutInfo.Paddings.Right;
                                    // }
                                    // float minimumWidthRequired = DEF_MIN_WIDTH_SQUARE;
                                    // if (textWrapStyle === TextWrappingStyle.Tight || textWrapStyle === TextWrappingStyle.Through)
                                    //     minimumWidthRequired = ownerPara.Document.Settings.CompatibilityMode === CompatibilityMode.Word2013 ?
                                    //         DEF_MIN_WIDTH_2013_TIGHTANDTHROW : DEF_MIN_WIDTH_TIGHTANDTHROW;
                                    // minimumWidthRequired -= cellPadings;
                                    // //Re Update the x position to the page left when paragraph starting position not equal to the 
                                    // //column starting and current inline item is x position equal to the column left position.
                                    // if ((ownerPara.IsXpositionUpated && ownerPara.Document.Settings.CompatibilityMode === CompatibilityMode.Word2013)
                                    //     || paragraphLayoutInfo.XPosition > (pageWidth - minimumWidthRequired - rightMargin)
                                    //     || paragraphLayoutInfo.IsXPositionReUpdate)
                                    //     indentX = layouter.ClientLayoutArea.Left + horzPosition;
                                    // else
                                    indentX = paragraph.x + horzPosition;
                                }
                                else {
                                    //Re Update the x position to the page left when word version not equal to 2013 
                                    //and wrapping style not equal to infront of text and behind text. 
                                    if ((textWrapStyle === 'InFrontOfText' || textWrapStyle === 'Behind')) {
                                        if (!(floatElement.paragraph.isInsideTable) && (autoShape === 'StraightConnector' || autoShape === 'Rectangle')) {
                                            isXPositionUpated = true;
                                            indentX = horzPosition + HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                                        }
                                        else {
                                            indentX = paragraph.x + horzPosition;
                                        }
                                    }
                                    else {
                                        indentX = this.viewer.clientActiveArea.x + horzPosition;
                                    }
                                }
                                //Update the Wrapping element right position as page right when 
                                //wrapping element right position  exceeds the page right except position 
                                //InFrontOfText and behindText wrapping style.
                                if (textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind'
                                    && Math.round(indentX + shapeWidth) > Math.round(pageWidth) && shapeWidth < pageWidth) {
                                    indentX = (pageWidth - shapeWidth);
                                }
                                if (paragraph.paragraphFormat.leftIndent && !isXPositionUpated) {
                                    var leftIndent = HelperMethods.convertPointToPixel(paragraph.leftIndent);
                                    indentX -= leftIndent;
                                }
                                switch (horzAlignment) {
                                    case 'Center':
                                        indentX = this.viewer.clientActiveArea.x + (this.viewer.clientActiveArea.width - shapeWidth) / 2;
                                        break;
                                    case 'Left':
                                        indentX = this.viewer.clientActiveArea.x;
                                        break;
                                    case 'Right':
                                        indentX = this.viewer.clientActiveArea.x + this.viewer.clientActiveArea.width - shapeWidth; //- TextBoxFormat.InternalMargin.Right;
                                        break;
                                    case 'None':
                                        break;
                                }
                                break;
                            case 'Margin':
                                if (paragraph.bodyWidget) {
                                    indentX = leftMargin + horzPosition;
                                    switch (horzAlignment) {
                                        case 'Center':
                                            indentX = leftMargin + (pageClientWidth - shapeWidth) / 2;
                                            break;
                                        case 'Left':
                                            indentX = leftMargin;
                                            break;
                                        case 'Outside':
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                indentX = leftMargin + pageClientWidth - shapeWidth;
                                            }
                                            break;
                                        case 'Right':
                                            indentX = leftMargin + pageClientWidth - shapeWidth;
                                            break;
                                        case 'Inside':
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentX = leftMargin + pageClientWidth - shapeWidth;
                                            }
                                            break;
                                        case 'None':
                                            break;
                                    }
                                }
                                else {
                                    indentX = this.viewer.clientArea.x + horzPosition;
                                }
                                break;
                            case 'Character':
                                if (horzAlignment === 'Right' || horzAlignment === 'Center') {
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                else {
                                    //Need to update this while layouting.**
                                    indentX = this.viewer.clientArea.x + horzPosition;
                                }
                                break;
                            case 'LeftMargin':
                                indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                break;
                            case 'RightMargin':
                                indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                break;
                            case 'InsideMargin':
                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                    indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                else {
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                break;
                            case 'OutsideMargin':
                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                else {
                                    indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                break;
                            default:
                                indentX = this.viewer.clientArea.x + horzPosition;
                                break;
                        }
                    }
                    //Update the floating item right position to the page right when floating item 
                    //right position exceeds the page width and it wrapping style is not equal to  
                    // InFrontOfText and behind text and also vertical origin is not equal to paragraph.
                    if (paragraph && textWrapStyle !== 'InFrontOfText'
                        && textWrapStyle !== 'Behind' && vertOrigin === 'Paragraph' && pageWidth < indentX + shapeWidth) {
                        indentX = pageWidth - shapeWidth;
                    }
                }
            }
            if (paragraph && (vertOrigin === 'Paragraph' || vertOrigin === 'Line') && floatElement.textWrappingStyle !== "InFrontOfText" && floatElement.textWrappingStyle !== "Behind") {
                if (this.documentHelper.compatibilityMode === 'Word2013') {
                    if (!paragraph.isInHeaderFooter) {
                        if (indentY + floatElement.height > this.viewer.clientArea.bottom) {
                            indentY = this.viewer.clientArea.bottom - floatElement.height;
                        }
                        if (indentY < sectionFormat.topMargin) {
                            indentY = sectionFormat.topMargin;
                        }
                    }
                }
            }
        }
        //}
        return new Point(indentX, indentY);
    };
    Layout.prototype.getLeftMarginHorizPosition = function (leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle) {
        var indentX = horzPosition;
        switch (horzAlignment) {
            case 'Center':
                indentX = (leftMargin - shapeWidth) / 2;
                break;
            case 'Left':
                indentX = 0;
                break;
            case 'Right':
                indentX = leftMargin - shapeWidth;
                break;
            case 'None':
                break;
        }
        if (indentX < 0 && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind') {
            indentX = 0;
        }
        return indentX;
    };
    Layout.prototype.getRightMarginHorizPosition = function (pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle) {
        var xPosition = pageWidth - rightMargin;
        var indentX = xPosition + horzPosition;
        switch (horzAlignment) {
            case 'Center':
                indentX = xPosition + (rightMargin - shapeWidth) / 2;
                break;
            case 'Left':
                indentX = xPosition;
                break;
            case 'Right':
                indentX = pageWidth - shapeWidth;
                break;
            case 'None':
                break;
        }
        if ((indentX < 0 || indentX + shapeWidth > pageWidth) && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind') {
            indentX = pageWidth - shapeWidth;
        }
        return indentX;
    };
    Layout.prototype.getVerticalPosition = function (paraItem, vertPosition, vertOrigin, textWrapStyle) {
        var paragraph = paraItem.line.paragraph;
        //ParagraphLayoutInfo paragraphLayoutInfo = (paragraph as IWidget).LayoutInfo as ParagraphLayoutInfo;
        var shape = paraItem;
        //WPicture pic = paraItem as WPicture;
        var indentY = 0;
        var topMargin = paragraph.associatedCell.y;
        switch (vertOrigin) {
            case 'Page':
            case 'Margin':
            case 'TopMargin':
            case 'InsideMargin':
            case 'BottomMargin':
            case 'OutsideMargin':
                indentY = topMargin + vertPosition;
                break;
            case 'Line':
            case 'Paragraph':
                var space = 0;
                // if (shape) {
                //     space = paragraph.paragraphFormat.afterSpacing;
                // }
                indentY = paragraph.y + vertPosition + space;
                break;
            default:
                indentY = this.viewer.clientActiveArea.y + vertPosition;
                break;
        }
        return indentY;
    };
    Layout.prototype.getHorizontalPosition = function (width, paraItem, horzAlignment, horzOrigin, horzPosition, textWrapStyle, cellWid) {
        var indentX = 0;
        var paragraph = paraItem.line.paragraph;
        // CellLayoutInfo cellLayoutInfo = (paragraph.OwnerTextBody as IWidget).LayoutInfo as CellLayoutInfo;
        // ILayoutSpacingsInfo spacings = cellLayoutInfo as ILayoutSpacingsInfo;
        var cell = paragraph.associatedCell;
        var cellWidth = cellWid - cell.leftMargin - cell.rightMargin;
        var cellInnerWidth = cell.cellFormat.cellWidth;
        var marginLeft = cell.x;
        var pageLeft = marginLeft - cell.leftMargin;
        switch (horzOrigin) {
            case 'Page':
                {
                    indentX = horzPosition;
                    switch (horzAlignment) {
                        case 'Center':
                            indentX = pageLeft + (cellWidth - width) / 2;
                            break;
                        case 'Left':
                            indentX = pageLeft;
                            break;
                        case 'Right':
                            indentX = pageLeft + (cellWidth - width);
                            break;
                        case 'None':
                            indentX = pageLeft + horzPosition;
                            break;
                    }
                }
                break;
            case 'Column':
            case 'Margin':
                {
                    switch (horzAlignment) {
                        case 'Center':
                            indentX = marginLeft + (cellInnerWidth - width) / 2;
                            break;
                        case 'Left':
                            indentX = marginLeft;
                            break;
                        case 'Right':
                            indentX = marginLeft + (cellInnerWidth - width);
                            break;
                        case 'None':
                            indentX = marginLeft + horzPosition;
                            break;
                    }
                }
                break;
            default:
                {
                    indentX = marginLeft + horzPosition;
                }
                break;
        }
        return indentX;
    };
    Layout.prototype.updateTableFloatPoints = function (table) {
        if (table.wrapTextAround) {
            var tableTotalWidth = table.getTableCellWidth();
            var position = table.positioning;
            var sectionFormat = table.bodyWidget.sectionFormat;
            if (this.documentHelper.viewer instanceof WebLayoutViewer) {
                if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Page' || position.horizontalOrigin === 'Column') {
                    if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                        this.viewer.clientActiveArea.x = this.viewer.clientArea.width - tableTotalWidth;
                    }
                    else {
                        this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
                    }
                }
            }
            else {
                if (!(table.containerWidget instanceof TextFrame) && !table.isInsideTable) {
                    // Vertical position
                    if (position.verticalOrigin === 'Page') {
                        if (position.verticalAlignment === 'Top') {
                            this.viewer.clientActiveArea.y = 0;
                        }
                        else if (position.verticalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.y = 0;
                        }
                        else if (isNullOrUndefined(position.verticalAlignment) || position.verticalAlignment === 'None') {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    else if (position.verticalOrigin === 'Margin') {
                        if (position.verticalAlignment === 'Top') {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                        }
                        else if (position.verticalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                        }
                        else if (Math.round(position.verticalPosition) != 0 && !isNullOrUndefined(sectionFormat.topMargin)) {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(sectionFormat.topMargin + position.verticalPosition);
                        }
                        else {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    else if (position.verticalOrigin === 'Paragraph') {
                        if (isNullOrUndefined(position.verticalAlignment) || position.verticalAlignment === 'None') {
                            this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    if (position.horizontalOrigin === 'Page') {
                        if (position.horizontalAlignment === 'Left') {
                            this.viewer.clientActiveArea.x = 0;
                        }
                        else if (position.horizontalAlignment === 'Inside') {
                            // TODO
                            this.viewer.clientActiveArea.x = 0;
                        }
                        else if (position.horizontalAlignment === 'Right') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth;
                        }
                        else if (position.horizontalAlignment === 'Outside') {
                            // TODO
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth;
                        }
                        else if (position.horizontalAlignment === 'Center') {
                            this.viewer.clientActiveArea.x = (HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth) / 2;
                        }
                    }
                    else if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Column') {
                        if (position.horizontalAlignment === 'Left') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                            if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
                                this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                                    HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
                            }
                        }
                        else if (position.horizontalAlignment === 'Inside') {
                            // TODO
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                        }
                        else if (position.horizontalAlignment === 'Right') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth)
                                - (HelperMethods.convertPointToPixel(sectionFormat.rightMargin) + tableTotalWidth);
                        }
                        else if (position.horizontalAlignment === 'Outside') {
                            // TODO
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth)
                                - (HelperMethods.convertPointToPixel(sectionFormat.rightMargin) + tableTotalWidth);
                        }
                        else if (position.horizontalAlignment === 'Center') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.leftMargin)
                                + (HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.rightMargin - sectionFormat.leftMargin) - tableTotalWidth) / 2;
                        }
                    }
                    if (Math.round(position.horizontalPosition) > 0) {
                        this.viewer.clientActiveArea.x += HelperMethods.convertPointToPixel(position.horizontalPosition);
                    }
                }
                else if (table.isInsideTable) {
                    var ownerCell = table.containerWidget;
                    var cellFormat = ownerCell.cellFormat;
                    if (position.verticalOrigin === 'Page') {
                        this.viewer.clientActiveArea.y = ownerCell.y;
                        this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                    }
                    else if (position.verticalOrigin === 'Margin') {
                        this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                        //Check whether the absolute table vertical position is top relative to the margin
                        if (this.viewer.clientActiveArea.y < ownerCell.y || position.verticalAlignment === 'Top') {
                            this.viewer.clientActiveArea.y = ownerCell.y;
                        }
                    }
                    else {
                        if (this.viewer.clientActiveArea.y + HelperMethods.convertPointToPixel(position.verticalPosition) < ownerCell.y) {
                            this.viewer.clientActiveArea.y = ownerCell.y;
                        }
                        else {
                            this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    if (position.horizontalOrigin === 'Page') {
                        if (position.horizontalAlignment === 'Left' || position.horizontalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.x = ownerCell.x;
                        }
                        else if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                            this.viewer.clientActiveArea.x = ((ownerCell.x + cellFormat.preferredWidth) - tableTotalWidth);
                        }
                    }
                    else if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Column') {
                        if (position.horizontalAlignment === 'Left' || position.horizontalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.x = (ownerCell.x + ownerCell.leftMargin);
                        }
                        else if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                            this.viewer.clientActiveArea.x = ((ownerCell.x + cellFormat.preferredWidth)
                                - (tableTotalWidth + ownerCell.rightMargin));
                        }
                    }
                    if (Math.round(position.horizontalPosition) > 0) {
                        this.viewer.clientActiveArea.x = ownerCell.x;
                        if (position.horizontalOrigin === 'Margin') {
                            this.viewer.clientActiveArea.x += ownerCell.leftMargin;
                        }
                        this.viewer.clientActiveArea.x += HelperMethods.convertPointToPixel(position.horizontalPosition);
                    }
                    if (position.horizontalAlignment === 'Center') {
                        this.viewer.clientActiveArea.x = (cellFormat.preferredWidth / 2) - (tableTotalWidth / 2);
                    }
                }
            }
        }
        table.x = this.viewer.clientActiveArea.x;
        table.y = this.viewer.clientActiveArea.y;
    };
    Layout.prototype.isTocField = function (element) {
        if (element instanceof FieldElementBox) {
            var nextElement = element.nextNode;
            if (element instanceof FieldElementBox && element.fieldType === 0 && nextElement instanceof TextElementBox
                && nextElement.text.trim().toLowerCase().indexOf('toc') !== -1) {
                return true;
            }
        }
        return false;
    };
    Layout.prototype.getTotalColumnSpan = function (row) {
        var tableRow = row;
        var totalColumnSpan = 0;
        for (var i = 0; i < tableRow.childWidgets.length; i++) {
            totalColumnSpan += tableRow.childWidgets[i].cellFormat.columnSpan;
        }
        return totalColumnSpan;
    };
    Layout.prototype.getMaximumRightCellBorderWidth = function (table) {
        var highestBorderSize = 0;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            var cell = row.childWidgets[row.childWidgets.length - 1];
            var cellBorder = cell.cellFormat.borders.right.lineWidth;
            if (highestBorderSize < cellBorder) {
                highestBorderSize = cellBorder;
            }
        }
        return highestBorderSize;
    };
    Layout.prototype.getDefaultBorderSpacingValue = function (border, isBorderValueZero, tableHorizontalPosition) {
        if (border == 0) {
            if (this.documentHelper.compatibilityMode != 'Word2013' && tableHorizontalPosition == 'Center') {
                border = 1.5;
            }
            else {
                border = 0.75;
            }
            return true;
        }
        return isBorderValueZero;
    };
    Layout.prototype.getMinimumWidthRequiredForTable = function (isBorderValueZero, tableHorizontalPosition, border) {
        var minimumWidthRequired = 0;
        //To fit the item right side of the Table Microsoft Word 2013 application and other version has different value based on border of the table and alignment of the table.
        if (this.documentHelper.compatibilityMode == 'Word2013') {
            if (tableHorizontalPosition == 'Center') {
                if (isBorderValueZero) {
                    minimumWidthRequired = 18.5 + Math.round(0.75 / 2);
                }
                else {
                    minimumWidthRequired = 18.5 + Math.round(border / 2);
                }
            }
            else {
                if (isBorderValueZero) {
                    minimumWidthRequired = 18.5 + 0.75;
                }
                else {
                    minimumWidthRequired = 18.5 + border;
                }
            }
        }
        else {
            if (tableHorizontalPosition == 'Center') {
                if (isBorderValueZero) {
                    minimumWidthRequired = 19.25;
                }
                else {
                    minimumWidthRequired = 18.5 + (border / 2);
                }
            }
            else {
                if (border == 0.25) {
                    minimumWidthRequired = 18.5;
                }
                else {
                    minimumWidthRequired = 19.3;
                }
            }
        }
        return HelperMethods.convertPointToPixel(minimumWidthRequired);
    };
    Layout.prototype.shiftFloatingItemsFromTable = function (table, bodyWidget) {
        if (table.containerWidget instanceof BodyWidget) {
            for (var i = 0; i < table.containerWidget.floatingElements.length; i++) {
                var shape = table.containerWidget.floatingElements[i];
                if (!(shape instanceof TableWidget) && shape.paragraph.containerWidget instanceof TableCellWidget
                    && shape.paragraph.containerWidget.ownerTable.containerWidget.ownerTable == table) {
                    bodyWidget.floatingElements.push(table.containerWidget.floatingElements[i]);
                    table.containerWidget.floatingElements.splice(table.containerWidget.floatingElements.indexOf(table.containerWidget.floatingElements[i]), 1);
                    this.shiftedFloatingItemsFromTable.push(shape);
                    i--;
                }
            }
        }
    };
    return Layout;
}());
export { Layout };
