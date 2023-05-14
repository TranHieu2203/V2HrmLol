import { Selection } from '../index';
import { TextPosition } from '../selection/selection-helper';
import { IWidget, ParagraphWidget, LineWidget, ElementBox, ImageElementBox, BlockWidget, BodyWidget, TableWidget, TableCellWidget, TableRowWidget, Widget, BookmarkElementBox, HeaderFooterWidget, FieldTextElementBox, EditRangeStartElementBox, CommentElementBox, FormField } from '../viewer/page';
import { WCharacterFormat } from '../format/character-format';
import { IndexInfo, BlockInfo, Base64, TextFormFieldInfo, CheckBoxFormFieldInfo, DropDownFormFieldInfo, FieldInfo } from './editor-helper';
import { WParagraphFormat, WSectionFormat, WTableFormat, WRowFormat, WCellFormat, WBorders, WShading } from '../index';
import { WList } from '../list/list';
import { WListLevel } from '../list/list-level';
import { WLevelOverride } from '../list/level-override';
import { FieldElementBox } from '../viewer/page';
import { HighlightColor, BaselineAlignment, Strikethrough, Underline, LineSpacingType, TextAlignment, ListLevelPattern, HeaderFooterType } from '../../base/index';
import { Action } from '../../index';
import { TableResizer } from './table-resizer';
import { CellVerticalAlignment, BorderType, LineStyle, TabLeader, AutoFitType, ProtectionType, PasteOptions, TablePasteOptions, FormFieldType, RevisionType } from '../../base/types';
import { DocumentHelper } from '../viewer';
import { Revision } from '../track-changes/track-changes';
/**
 * Editor module
 */
export declare class Editor {
    documentHelper: DocumentHelper;
    private nodes;
    private editHyperlinkInternal;
    private startOffset;
    private startParagraph;
    private endOffset;
    private pasteRequestHandler;
    private endParagraph;
    private currentProtectionType;
    private alertDialog;
    private formFieldCounter;
    private skipFieldDeleteTracking;
    private isForHyperlinkFormat;
    private isTrackingFormField;
    private previousBlockToLayout;
    private isInsertText;
    /**
     * @private
     */
    removeEditRange: boolean;
    /**
     * @private
     */
    isRemoveRevision: boolean;
    /**
     * @private
     */
    isFootNoteInsert: boolean;
    /**
     * @private
     */
    isTableInsert: boolean;
    /**
     * @private
     */
    isFootNote: boolean;
    /**
     * @private
     */
    isHandledComplex: boolean;
    /**
     * @private
     */
    isUserInsert: boolean;
    /**
     * @private
     */
    tableResize: TableResizer;
    /**
     * @private
     */
    tocStyles: TocLevelSettings;
    /**
     * @private
     */
    triggerPageSpellCheck: boolean;
    /**
     * @private
     */
    chartType: boolean;
    private removedBookmarkElements;
    /**
     * @private
     */
    tocBookmarkId: number;
    /**
     * @private
     */
    copiedData: string;
    private animationTimer;
    private pageRefFields;
    private delBlockContinue;
    private delBlock;
    private delSection;
    /**
     * @private
     */
    isInsertingTOC: boolean;
    private editStartRangeCollection;
    private skipReplace;
    private skipTableElements;
    private removedTextNodes;
    /**
     * @private
     */
    listNumberFormat: string;
    /**
     * @private
     */
    listLevelPattern: ListLevelPattern;
    /**
     * @private
     */
    listLevelNumber: number;
    /**
     * @private
     */
    isXmlMapped: boolean;
    /**
     * @private
     * @returns {boolean} - Returns the restrict formatting
     */
    readonly restrictFormatting: boolean;
    /**
     * @private
     * @returns {boolean} - Returns the restrict editing
     */
    readonly restrictEditing: boolean;
    /**
     * @private
     * @returns {boolean} - Returns the can edit content control.
     */
    readonly canEditContentControl: boolean;
    copiedContent: any;
    /**
     * @private
     */
    copiedTextContent: string;
    /**
     * @private
     */
    previousParaFormat: WParagraphFormat;
    private previousCharFormat;
    private previousSectionFormat;
    private currentPasteOptions;
    private pasteTextPosition;
    isPaste: boolean;
    isPasteListUpdated: boolean;
    isHtmlPaste: boolean;
    base64: Base64;
    /**
     * @private
     */
    isInsertField: boolean;
    /**
     * Initialize the editor module
     *
     * @param {DocumentHelper} documentHelper - Document helper
     * @private
     */
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    private readonly editorHistory;
    /**
     * @private
     */
    isBordersAndShadingDialog: boolean;
    private readonly selection;
    private readonly owner;
    private getModuleName;
    /**
     * Sets the field information for the selected field.
     *
     * @param { FieldInfo } fieldInfo – Specifies the field information.
     * @returns {void}
     * > Nested field gets replaced completely with the specified field information.
     */
    setFieldInfo(fieldInfo: FieldInfo): void;
    /**
     * Inserts the specified field at cursor position
     *
     * @param {string} code - Specify the field code
     * @param {string} result - Specify the field result
     * @returns {void}
     */
    insertField(code: string, result?: string): void;
    /**
     * To update style for paragraph
     *
     * @param {string} style - style name
     * @param {boolean} clearDirectFormatting - Removes manual formatting (formatting not applied using a style)
     * from the selected text, to match the formatting of the applied style. Default value is false.
     * @returns {void}
     */
    applyStyle(style: string, clearDirectFormatting?: boolean): void;
    /**
     * Moves the selected content in the document editor control to clipboard.
     *
     * @returns {void}
     */
    cut(): void;
    /**
     * Insert editing region where everyone can edit.
     *
     * @returns {void}
     */
    insertEditingRegion(): void;
    /**
     * Insert editing region where mentioned user can edit.
     *
     * @returns {void}
     */
    insertEditingRegion(user: string): void;
    /**
     * Enforce document protection by protection type.
     *
     * @returns {void}
     */
    enforceProtection(credential: string, protectionType: ProtectionType): void;
    /**
     * Enforce document protection.
     *
     * @returns {void}
     */
    enforceProtection(credential: string, limitToFormatting: boolean, isReadOnly: boolean): void;
    private getCommentHierarchicalIndex;
    private alertBox;
    /**
     * Insert comment
     *
     * @param {string} text - comment text.
     * @returns {void}
     */
    insertComment(text?: string): void;
    private insertCommentInternal;
    /**
     * Delete all the comments in current document
     *
     * @returns {void}
     */
    deleteAllComments(): void;
    /**
     * Delete current selected comment.
     *
     * @returns {void}
     */
    deleteComment(): void;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    deleteCommentInternal(comment: CommentElementBox): void;
    private deleteCommentWidgetInternal;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    deleteCommentWidget(comment: CommentElementBox): void;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    resolveComment(comment: CommentElementBox): void;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    reopenComment(comment: CommentElementBox): void;
    /**
     * @private
     */
    resolveOrReopenComment(comment: CommentElementBox, resolve: boolean): void;
    /**
     * @param {CommentElementBox} parentComment - Specified the parent comment
     * @param {string} text - Specified the text.
     * @private
     * @returns {void}
     */
    replyComment(parentComment: CommentElementBox, text?: string): void;
    private removeInline;
    /**
     * @param {CommentElementBox} commentWidget - Specifies the comment
     * @param {boolean} isNewComment - Specifies is new comment
     * @param {boolean} showComments - Specifies show comments
     * @param {boolean} selectComment - Specified select comment
     * @private
     * @returns {void}
     */
    addCommentWidget(commentWidget: CommentElementBox, isNewComment: boolean, showComments: boolean, selectComment: boolean): void;
    /**
     * @param {CommentElementBox} comment - Specifies comment element box
     * @param {string} hierarchicalIndex - Specifies the hierachical index.
     * @private
     * @returns {void}
     */
    addReplyComment(comment: CommentElementBox, hierarchicalIndex: string): void;
    /**
     * @param {string} password - Specifies the password
     * @param {string} protectionType - Specifies the protection type
     * @private
     * @returns {void}
     */
    addProtection(password: string, protectionType: ProtectionType): void;
    private protectionFailureHandler;
    private enforceProtectionInternal;
    private toggleTrackChangesProtection;
    private protectDocument;
    /**
     * Stop document protection.
     *
     * @param {string} password - Specifies the password
     * @returns {void}
     */
    stopProtection(password: string): void;
    private onUnProtectionSuccess;
    private validateHashValue;
    /**
     * @private
     * @returns {void}
     */
    unProtectDocument(): void;
    /**
     * Notify content change event
     *
     * @private
     * @returns {void}
     */
    fireContentChange(): void;
    /**
     * Update physical location for text position
     *
     * @param {boolean} isSelectionChanged - Specifies the selection change
     * @private
     * @returns {void}
     */
    updateSelectionTextPosition(isSelectionChanged: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    onTextInputInternal: () => void;
    /**
     * Predict text
     *
     * @private
     * @returns {void}
     */
    predictText(): void;
    private getPrefixAndSuffix;
    /**
     * Fired on paste.
     *
     * @param {ClipboardEvent} event - Specfies clipboard event
     * @private
     * @returns {void}
     */
    onPaste: (event: ClipboardEvent) => void;
    /**
     * key action
     * @private
     * @returns {void}
     */
    onKeyDownInternal(event: KeyboardEvent, ctrl: boolean, shift: boolean, alt: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    handleShiftEnter(): void;
    /**
     * Handles back key.
     *
     * @private
     * @returns {void}
     */
    handleBackKey(): void;
    /**
     * Handles delete
     *
     * @private
     * @returns {void}
     */
    handleDelete(): void;
    /**
     * Handles enter key.
     *
     * @private
     * @returns {void}
     */
    handleEnterKey(): void;
    /**
     * Handles Control back key.
     *
     * @private
     * @returns {void}
     */
    handleCtrlBackKey(): void;
    /**
     * Handles Ctrl delete
     *
     * @private
     * @returns {void}
     */
    handleCtrlDelete(): void;
    /**
     * @private
     * @returns {void}
     */
    handleTextInput(text: string): void;
    /**
     * Copies to format.
     * @param {WCharacterFormat} format
     * @private
     * @returns {void}
     */
    copyInsertFormat(format: WCharacterFormat, copy: boolean): WCharacterFormat;
    private getResultContentControlText;
    private updateXmlMappedContentControl;
    private updateCustomXml;
    /**
     * Inserts the specified text at cursor position
     * @param {string} text - text to insert
     */
    insertText(text: string): void;
    /**
     * @private
     * @returns {void}
     */
    insertTextInternal(text: string, isReplace: boolean, revisionType?: RevisionType, allowLayout?: boolean): void;
    private updateElementInFieldRevision;
    retrieveFieldResultantText(item: FieldElementBox): string;
    private checkToCombineRevisionsinBlocks;
    private checkToMapRevisionWithNextNode;
    private checkToMapRevisionWithPreviousNode;
    private checkToMapRevisionWithInlineText;
    private combineElementRevisions;
    private applyMatchedRevisionInorder;
    private copyElementRevision;
    private mapMatchedRevisions;
    private isRevisionAlreadyIn;
    private getMatchedRevisionsToCombine;
    private decideInlineForTrackChanges;
    /**
     * @private
     * @returns {void}
     */
    insertIMEText(text: string, isUpdate: boolean): void;
    /**
     * Insert Section break at cursor position
     *
     * @returns {void}
     */
    insertSectionBreak(): void;
    private combineRevisionWithBlocks;
    private checkToCombineRevisionWithNextPara;
    private checkToCombineRevisionWithPrevPara;
    private combineRevisionWithNextPara;
    private combineRevisionWithPrevPara;
    removeRevision(revisionToRemove: Revision): any;
    clearElementRevision(revision: Revision): void;
    /**
     * @private
     * @returns {void}
     */
    insertRevision(item: any, type: RevisionType, author?: string, date?: string, spittedRange?: object[]): void;
    /**
     * Method help to clear previous revisions and include new revision at specified index
     *
     * @param range - range of elements to be cleared
     * @param revision - revision to be inserted
     * @param index - index at which to be included in the revision range
     * @returns {void}
     */
    private clearAndUpdateRevisons;
    private splitRevisionByElement;
    /**
     * Method to update revision for the splitted text element
     * @param inline - Original text element
     * @param splittedSpan - Splitted element
     */
    private updateRevisionForSpittedTextElement;
    private isRevisionMatched;
    private compareElementRevision;
    private canInsertRevision;
    private insertRevisionAtEnd;
    private insertRevisionAtPosition;
    private insertRevisionAtBegining;
    private splitRevisionForSpittedElement;
    /**
     * Method to combine element revision if not inserts new revision
     */
    private combineElementRevision;
    private combineRevisions;
    /**
     * Method to update the revision for whole block
     *
     * @private
     * @returns {void}
     */
    insertRevisionForBlock(widget: ParagraphWidget, revisionType: RevisionType, isTOC?: boolean, revision?: Revision, skipReLayout?: boolean): void;
    private updateRevisionCollection;
    /**
     * @private
     * @returns {BodyWidget}
     */
    insertSection(selection: Selection, selectFirstBlock: boolean): BlockWidget;
    /**
     * @private
     */
    splitBodyWidget(bodyWidget: BodyWidget, sectionFormat: WSectionFormat, startBlock: BlockWidget): BodyWidget;
    private insertRemoveHeaderFooter;
    private updateBlockIndex;
    /**
     * @private
     * @returns {void}
     */
    updateSectionIndex(sectionFormat: WSectionFormat, startBodyWidget: BodyWidget, increaseIndex: boolean): void;
    private checkAndConvertList;
    private checkNextLevelAutoList;
    private getNumber;
    private getListLevelPattern;
    private autoConvertList;
    private checkNumberFormat;
    private checkLeadingZero;
    private getPageFromBlockWidget;
    /**
     * @private
     * @returns {void}
     */
    insertTextInline(element: ElementBox, selection: Selection, text: string, index: number, skipReLayout?: boolean): void;
    private insertFieldBeginText;
    private insertBookMarkText;
    private insertFieldSeparatorText;
    private insertFieldEndText;
    private insertImageText;
    /**
     * @private
     */
    private isListTextSelected;
    private checkAndConvertToHyperlink;
    private autoFormatHyperlink;
    private appylingHyperlinkFormat;
    private createHyperlinkElement;
    private insertHyperlinkfield;
    /**
     * @private
     */
    unlinkRangeFromRevision(inline: any, removeCollection?: boolean): void;
    /**
     * @private
     */
    unlinkWholeRangeInRevision(item: any, revision: Revision): void;
    /**
     * @private
     * @returns {void}
     */
    unLinkFieldCharacter(inline: ElementBox): void;
    private getCharacterFormat;
    /**
     * Insert Hyperlink
     *
     * @param {string} address - Hyperlink URL
     * @param {string} displayText - Display text for the hyperlink
     * @param {string} screenTip - The screen tip text.
     * @returns {void}
     */
    insertHyperlink(address: string, displayText?: string, screenTip?: string): void;
    /**
     * @private
     */
    insertHyperlinkInternal(url: string, displayText: string, remove: boolean, isBookmark?: boolean): void;
    private insertHyperlinkInternalInternal;
    private insertHyperlinkByFormat;
    private initInsertInline;
    private insertElementInCurrentLine;
    /**
     * Edit Hyperlink
     * @param {Selection} selection - Specified the selection
     * @param {string} url - Specifies the url
     * @param {string} displayText - Specified the display test
     * @param {boolean} isBookmark - Specifies is bookmark
     * @private
     * @returns {boolean} - Return tru of hyperlink is edited.
     */
    editHyperlink(selection: Selection, url: string, displayText: string, isBookmark?: boolean): boolean;
    private insertClonedFieldResult;
    private getClonedFieldResultWithSel;
    private getClonedFieldResult;
    /**
     * Removes the hyperlink if selection is within hyperlink.
     *
     * @returns {void}
     */
    removeHyperlink(): void;
    /**
     * Paste copied clipboard content on Paste event
     * @param {ClipboardEvent} event - Specifies the paste event
     * @param {any} pasteWindow - Specifies the paste window
     * @private
     */
    pasteInternal(event: ClipboardEvent, pasteWindow?: any): void;
    private pasteImage;
    /**
     * @private
     * @returns {void}
     */
    onPasteImage(data: string): void;
    private pasteAjax;
    /**
     * @private
     * @returns {void}
     */
    pasteFormattedContent(result: any): void;
    private onPasteFailure;
    /**
     * Pastes provided sfdt content or the data present in local clipboard if any.
     *
     * @param {string} sfdt? insert the specified sfdt content at current position
     * @returns {void}
     */
    paste(sfdt?: string, defaultPasteOption?: PasteOptions): void;
    private getUniqueListOrAbstractListId;
    private checkSameLevelFormat;
    private listLevelPatternInCollection;
    private isEqualParagraphFormat;
    private getBlocksToUpdate;
    private updateListIdForBlocks;
    private updatePasteContent;
    /**
     * @private
     */
    getBlocks(pasteContent: any, isPaste: boolean, sections?: BodyWidget[], comments?: CommentElementBox[], revision?: Revision[]): BodyWidget[];
    private applyMergeFormat;
    private applyFormatInternal;
    /**
     * @private
     */
    applyPasteOptions(options: PasteOptions, isPasteOptionTextOnly?: boolean): void;
    /**
     * @private
     */
    applyTablePasteOptions(options: TablePasteOptions): void;
    /**
     * @private
     * @returns {void}
     */
    pasteContents(content: any, currentFormat?: WParagraphFormat): void;
    private pasteContentsInternal;
    private defaultPaste;
    private pasteAsNewColumn;
    private pasteAsNestedTable;
    private pasteOverwriteCell;
    private pasteAsNewRow;
    private tableUpdate;
    private rowspannedCollection;
    private insertSpannedCells;
    private addRows;
    private pasteContent;
    private pasteCopiedData;
    private generateTableRevision;
    private isSectionEmpty;
    /**
     * Insert table on undo
     *
     * @param {TableWidget} table - Specifies the table
     * @param {TableWidget} newTable - Speciefies the new table
     * @param {boolean} moveRows - Specifies the new row
     * @private
     * @private {void}
     */
    insertTableInternal(table: TableWidget, newTable: TableWidget, moveRows: boolean): void;
    private canConstructRevision;
    private constructRevisionsForTable;
    private constructRevisionsForBlock;
    /**
     * @private
     * @param paraWidget
     * @param startoffset
     * @param endoffset
     * @param revisionId
     * @param isParaMarkIncluded
     * @returns {void}
     */
    applyRevisionForCurrentPara(paraWidget: ParagraphWidget, startoffset: number, endoffset: number, revisionId: string, isParaMarkIncluded: boolean): void;
    /**
     * Insert table on undo
     *
     * @param {Selection} selection - Specified the selection
     * @param {WBlock} block - Spcifies the block
     * @param {WTable} table - Specifies the table.
     * @private
     * @returns {void}
     */
    insertBlockTable(selection: Selection, block: BlockWidget, table: TableWidget): void;
    /**
     * On cut handle selected content remove and relayout
     *
     * @param {Selection} selection - Specified the selection
     * @private
     * @returns {void}
     */
    handleCut(selection: Selection): void;
    private insertInlineInternal;
    private insertElement;
    private updateRevisionForElement;
    private insertElementInternal;
    private incrementCommentIndex;
    /**
     * @private
     * @returns {void}
     */
    constructRevisionFromID(insertElement: any, isEnd: boolean, prevElement?: ElementBox): void;
    /**
     * Insert block on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {WBlock} block - Specifes the block
     * @private
     * @returns {void}
     */
    insertBlock(block: BlockWidget): void;
    private insertBlockInternal;
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     *
     * @param {string} imageString  Base64 string, web URL or file URL.
     * @param {number} width? Image width
     * @param {number} height? Image height
     * @returns {void}
     */
    insertImage(imageString: string, width?: number, height?: number): void;
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     *
     * @private
     * @param {string} imageString Base64 string, web URL or file URL.
     * @param {boolean} isUiInteracted Is image instered from UI interaction.
     * @param {number} width? Image width
     * @param {number} height? Image height
     * @returns {void}
     */
    insertImageInternal(imageString: string, isUiInteracted: boolean, width?: number, height?: number): void;
    /**
     * Inserts a table of specified size at cursor position
     *  in the document editor.
     *
     * @param {number} rows Default value of ‘rows’ parameter is 1.
     * @param {number} columns Default value of ‘columns’ parameter is 1.
     * @returns {void}
     */
    insertTable(rows?: number, columns?: number): void;
    /**
     * Inserts the specified number of rows to the table above or below to the row at cursor position.
     *
     * @param {boolean} above The above parameter is optional and if omitted,
     * it takes the value as false and inserts below the row at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     * @returns {void}
     */
    insertRow(above?: boolean, count?: number): void;
    private rowInsertion;
    /**
     * Fits the table based on AutoFitType.
     *
     * @param {AutoFitType} - auto fit type
     * @returns {void}
     */
    autoFitTable(fitType: AutoFitType): void;
    private updateCellFormatForInsertedRow;
    private updateRowspan;
    private insertTableRows;
    /**
     * Inserts the specified number of columns to the table left or right to the column at cursor position.
     *
     * @param {number} left The left parameter is optional and if omitted, it takes the value as false and
     * inserts to the right of column at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     * @returns {void}
     */
    insertColumn(left?: boolean, count?: number): void;
    private copyCellFormats;
    private tableReLayout;
    /**
     * Creates table with specified rows and columns.
     * @private
     *
     * @returns {TableWidget}
     */
    createTable(rows: number, columns: number): TableWidget;
    private createRowAndColumn;
    private createColumn;
    private getColumnCountToInsert;
    private getRowCountToInsert;
    private getOwnerCell;
    private getOwnerRow;
    private getOwnerTable;
    /**
     * Merge Selected cells
     *
     * @private
     * @returns {void}
     */
    mergeSelectedCellsInTable(): void;
    private confirmCellMerge;
    private mergeSelectedCells;
    private mergeBorders;
    private updateBlockIndexAfterMerge;
    /**
     * Determines whether merge cell operation can be done.
     *
     * @returns {boolean} - Returns can merge cells.
     */
    canMergeCells(): boolean;
    private canMergeSelectedCellsInTable;
    private checkCellWidth;
    private checkCellWithInSelection;
    private checkPrevOrNextCellIsWithinSel;
    private checkCurrentCell;
    private checkRowSpannedCells;
    /**
     * @private
     * @returns {void}
     */
    insertNewParagraphWidget(newParagraph: ParagraphWidget, insertAfter: boolean): void;
    private insertParagraph;
    private moveInlines;
    private moveContent;
    private updateRevisionForMovedContent;
    /**
     * update complex changes when history is not preserved
     *
     * @param {number} action - Specifies the action
     * @param {string} start - Specifies the selection start
     * @param {string} end - Specified the selection end
     * @private
     * @returns {void}
     */
    updateComplexWithoutHistory(action?: number, start?: string, end?: string): void;
    /**
     * Re-layout content.
     *
     * @param {Selection} selection - Specifies the selection
     * @param isSelectionChanged - Specifies the selection changed
     * @private
     * @returns {void}
     */
    reLayout(selection: Selection, isSelectionChanged?: boolean, isLayoutChanged?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    updateHeaderFooterWidget(headerFooterWidget?: HeaderFooterWidget): void;
    private updateHeaderFooterWidgetToPage;
    private updateHeaderFooterWidgetToPageInternal;
    /**
     * @private
     * @returns {void}
     */
    removeFieldInWidget(widget: Widget, isBookmark?: boolean, isContentControl?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    removeFieldInBlock(block: BlockWidget, isBookmark?: boolean, isContentControl?: boolean): void;
    private removeFieldTable;
    private shiftFootnotePageContent;
    /**
     * @private
     * @returns {void}
     */
    shiftPageContent(type: HeaderFooterType, sectionFormat: WSectionFormat): void;
    private checkAndShiftFromBottom;
    private allowFormattingInFormFields;
    private getContentControl;
    private checkPlainTextContentControl;
    /**
     * Applies character format for selection.
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Spcifies the update
     * @private
     * @returns {void}
     */
    onApplyCharacterFormat(property: string, value: Object, update?: boolean, applyStyle?: boolean): void;
    private applyCharacterFormatForListText;
    private applyListCharacterFormatByValue;
    /**
     * @private
     * @returns {void}
     */
    updateListCharacterFormat(selection: Selection, property: string, value: Object): void;
    private updateListTextSelRange;
    /**
     * @private
     * @returns {void}
     */
    updateInsertPosition(): void;
    /**
     * Preserve paragraph and offset value for selection
     *
     * @private
     * @returns {void}
     */
    setOffsetValue(selection: Selection): void;
    /**
     * Toggles the highlight color property of selected contents.
     *
     * @param {HighlightColor} highlightColor Default value of ‘underline’ parameter is Yellow.
     * @returns {void}
     */
    toggleHighlightColor(highlightColor?: HighlightColor): void;
    /**
     * Toggles the subscript formatting of selected contents.
     *
     * @returns {void}
     */
    toggleSubscript(): void;
    /**
     * Toggles the superscript formatting of selected contents.
     *
     * @returns {void}
     */
    toggleSuperscript(): void;
    /**
     * Increases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @returns {void}
     */
    increaseIndent(): void;
    /**
     * Decreases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @returns {void}
     */
    decreaseIndent(): void;
    /**
     * Clears the list format for selected paragraphs.
     *
     * @returns {void}
     */
    clearList(): void;
    /**
     * Applies the bullet list to selected paragraphs.
     *
     * @param {string} bullet Bullet character
     * @param {string} fontFamily Bullet font family
     * @returns {void}
     */
    applyBullet(bullet: string, fontFamily: string): void;
    /**
     * Applies the numbering list to selected paragraphs.
     *
     * @param {string} numberFormat  “%n” representations in ‘numberFormat’ parameter will be replaced by respective list level’s value.
     * `“%1)” will be displayed as “1)” `
     * @param {ListLevelPattern} listLevelPattern  Default value of ‘listLevelPattern’ parameter is ListLevelPattern.Arabic
     * @returns {void}
     */
    applyNumbering(numberFormat: string, listLevelPattern?: ListLevelPattern): void;
    /**
     * Toggles the baseline alignment property of selected contents.
     *
     * @param {BaselineAlignment} baseAlignment Specifies the baseline alignment
     * @returns {void}
     */
    toggleBaselineAlignment(baseAlignment: BaselineAlignment): void;
    /**
     * Clears the formatting.
     *
     * @returns {void}
     */
    clearFormatting(): void;
    private updateProperty;
    private getCompleteStyles;
    /**
     * Initialize default styles
     *
     * @private
     * @returns {void}
     */
    intializeDefaultStyles(): void;
    /**
     * Creates a new instance of Style.
     *
     * @returns {void}
     */
    createStyle(styleString: string): void;
    /**
     * Create a Style.
     * @private
     * @returns {object}
     */
    createStyleIn(styleString: string): Object;
    private getUniqueStyleName;
    private getUniqueName;
    /**
     * Update Character format for selection
     * @private
     */
    updateSelectionCharacterFormatting(property: string, values: Object, update: boolean): void;
    private updateCharacterFormat;
    private updateCharacterFormatWithUpdate;
    private applyCharFormatSelectedContent;
    private applyCharFormatForSelectedPara;
    private splittedLastParagraph;
    private getNextParagraphForCharacterFormatting;
    private applyCharFormat;
    /**
     * Toggles the bold property of selected contents.
     *
     * @returns {void}
     */
    toggleBold(): void;
    /**
     * Toggles the bold property of selected contents.
     *
     * @returns {void}
     */
    toggleItalic(): void;
    /**
     * Change the selected text to uppercase.
     * @private
     */
    changeCase(property: string): void;
    /**
     * Change the selected text case.
     * @private
     */
    changeSelectedTextCase(selection: Selection, startPosition: TextPosition, endPosition: TextPosition, property: string, removedTextNodes?: IWidget[]): void;
    private changeTextCase;
    private changeCaseParagraph;
    private changeCaseInline;
    private addRemovedTextNodes;
    private changeCaseInlineInternal;
    private changeCaseNextBlock;
    private getNextBlockForChangeCase;
    private getChangeCaseText;
    private changeCaseForTable;
    private changeCaseForSelectedCell;
    private changeCaseForSelectedPara;
    private changeCaseForSelTable;
    private changeCaseParaFormatInCell;
    private changeCaseParaForTableCell;
    private changeCaseParaForCellInternal;
    private changeCaseParaFormatTableInternal;
    private changeCaseParaForRow;
    /**
     * Toggle All Caps formatting for the selected content.
     *
     * @returns {void}
     */
    toggleAllCaps(): void;
    private getCurrentSelectionValue;
    private getSelectedCharacterFormat;
    /**
     * Toggles the underline property of selected contents.
     *
     * @param underline Default value of ‘underline’ parameter is Single.
     * @returns {void}
     */
    toggleUnderline(underline?: Underline): void;
    /**
     * Toggles the strike through property of selected contents.
     *
     * @param {Strikethrough} strikethrough Default value of strikethrough parameter is SingleStrike.
     * @returns {void}
     */
    toggleStrikethrough(strikethrough?: Strikethrough): void;
    private updateFontSize;
    private applyCharFormatInline;
    private formatInline;
    private updateRevisionForFormattedContent;
    private applyCharFormatCell;
    private applyCharFormatForSelectedCell;
    private applyCharFormatRow;
    private applyCharFormatForTable;
    private applyCharFormatForSelTable;
    private applyCharFormatForTableCell;
    private updateSelectedCellsInTable;
    private getCharacterFormatValueOfCell;
    /**
     * Apply Character format for selection
     *
     * @private
     * @returns {void}
     */
    applyCharFormatValueInternal(selection: Selection, format: WCharacterFormat, property: string, value: Object): void;
    private copyInlineCharacterFormat;
    private applyCharFormatValue;
    /**
     * @private
     * @returns {void}
     */
    onImageFormat(elementBox: ImageElementBox, width: number, height: number): void;
    /**
     * Toggles the text alignment of selected paragraphs.
     *
     * @param {TextAlignment} textAlignment - Specified the text alignment.
     * @returns {void}
     */
    toggleTextAlignment(textAlignment: TextAlignment): void;
    /**
     * @private
     */
    setPreviousBlockToLayout(): void;
    /**
     * Apply borders for selected paragraph borders
     * @private
     */
    applyParagraphBorders(property: string, bordersType: string, value: Object): void;
    /**
     * Applies paragraph format for the selection ranges.
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @param {boolean} isSelectionChanged - Specifies the selection change.
     * @private
     * @returns {void}
     */
    onApplyParagraphFormat(property: string, value: Object, update: boolean, isSelectionChanged: boolean): void;
    /**
     * Updates the indent value in the ListLevel
     * @param {Object} value - Specifies the value
     * @param {ParagraphWidget} currentPara - Specifies the selected paragraph
     * @private
     * @returns {void}
     */
    updateListLevelIndent(value: Object, currentPara: ParagraphWidget): void;
    /**
     * To check the current selection is first paragraph for list
     * @param {Selection} selection - Specifies the selection
     * @param {ParagraphWidget} currentPara - Specifies the current paragraph
     * @private
     * @returns {boolean}
     */
    isFirstParaForList(selection: Selection, currentPara: ParagraphWidget): boolean;
    /**
     * Update the list level
     *
     * @param {boolean} increaseLevel - Specifies the increase level
     * @private
     * @returns {void}
     */
    updateListLevel(increaseLevel: boolean): void;
    /**
     * Applies list
     *
     * @param {WList} list - Specified the list
     * @param {number} listLevelNumber - Specified the list level number
     * @private
     * @returns {void}
     */
    onApplyListInternal(list: WList, listLevelNumber: number): void;
    /**
     * Apply paragraph format to selection range
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    updateSelectionParagraphFormatting(property: string, value: Object, update: boolean): void;
    private getIndentIncrementValue;
    private getIndentIncrementValueInternal;
    private updateParagraphFormatInternal;
    /**
     * Update paragraph format on undo
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    updateParagraphFormat(property: string, value: Object, update: boolean): void;
    private applyParaFormatSelectedContent;
    /**
     * Apply Paragraph format
     *
     * @param {ParagraphWidget} paragraph - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    applyParaFormatProperty(paragraph: ParagraphWidget, property: string, value: Object, update: boolean): void;
    private copyParagraphFormat;
    /**
     * Copies list level paragraph format
     *
     * @param {WParagraphFormat} oldFormat - Specifies the old format
     * @param {WParagraphFormat} newFormat - Specifies the new format
     * @private
     * @returns {void}
     */
    copyFromListLevelParagraphFormat(oldFormat: WParagraphFormat, newFormat: WParagraphFormat): void;
    /**
     * To apply continue numbering from the previous list
     *
     * @returns {void}
     */
    applyContinueNumbering(): void;
    private applyContinueNumberingInternal;
    private getContinueNumberingInfo;
    /**
     * @private
     * @returns {void}
     */
    revertContinueNumbering(selection: Selection, format: WParagraphFormat): void;
    private changeListId;
    private getParagraphFormat;
    private checkNumberArabic;
    /**
     * @private
     * @returns {void}
     */
    applyRestartNumbering(selection: Selection): void;
    /**
     * @private
     * @returns {void}
     */
    restartListAt(selection: Selection): void;
    /**
     * @private
     * @returns {void}
     */
    restartListAtInternal(selection: Selection, listId: number): void;
    private changeRestartNumbering;
    private applyParaFormat;
    private applyCharacterStyle;
    private applyParaFormatInCell;
    private applyParaFormatCellInternal;
    private getParaFormatValueInCell;
    private applyParagraphFormatRow;
    private applyParaFormatTableCell;
    private applyParaFormatTable;
    private getNextParagraphForFormatting;
    private applyParagraphFormatTableInternal;
    /**
     * Apply section format selection changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplySectionFormat(property: string, value: Object): void;
    /**
     * Update section format
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateSectionFormat(property: string, value: Object): void;
    /**
     * Apply table format property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyTableFormat(property: string, value: Object): void;
    private getTableFormatAction;
    /**
     * Apply table row format property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyTableRowFormat(property: string, value: Object): void;
    private getRowAction;
    /**
     * Apply table cell property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyTableCellFormat(property: string, value: Object): void;
    private getTableCellAction;
    private applyPropertyValueForSection;
    /**
     * @private
     * @returns {void}
     */
    layoutWholeDocument(isLayoutChanged?: boolean): void;
    private combineSection;
    private combineSectionChild;
    private updateSelectionTableFormat;
    /**
     * Update Table Format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateTableFormat(selection: Selection, property: string, value: object): void;
    /**
     * update cell format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateCellFormat(selection: Selection, property: string, value: Object): void;
    /**
     * Update row format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateRowFormat(selection: Selection, property: string, value: Object): void;
    private initHistoryPosition;
    private startSelectionReLayouting;
    private reLayoutSelectionOfTable;
    private reLayoutSelection;
    private reLayoutSelectionOfBlock;
    /**
     * @private
     * @returns {void}
     */
    layoutItemBlock(block: BlockWidget, shiftNextWidget: boolean): void;
    /**
     * @private
     * @returns {boolean}
     */
    removeSelectedContents(selection: Selection): boolean;
    private removeSelectedContentInternal;
    private checkMultipleSectionSelected;
    private getBodyWidgetIndex;
    private removeSelectedContent;
    private deleteSelectedContent;
    /**
     * Merge the selected cells.
     *
     * @returns {void}
     */
    mergeCells(): void;
    /**
     * Deletes the entire table at selection.
     *
     * @returns {void}
     */
    deleteTable(): void;
    /**
     * Deletes the selected column(s).
     *
     * @returns {void}
     */
    deleteColumn(): void;
    private onDeleteColumnConfirmed;
    /**
     * Deletes the selected row(s).
     *
     * @returns {void}
     */
    deleteRow(): void;
    private trackRowDeletion;
    private trackInnerTable;
    private returnDeleteRevision;
    private removeRow;
    /**
     * @private
     * @param {TableWidget} table Specifies the table widget
     * @returns {void}
     */
    updateTable(table: TableWidget): void;
    private getParagraphForSelection;
    private deletePara;
    private deleteSection;
    private combineSectionInternal;
    private checkAndInsertBlock;
    private splitParagraph;
    private removeCommentsInBlock;
    private removeCommentInPara;
    private removeCommentsInline;
    /**
     * @private
     * @returns {void}
     */
    removeBlock(block: BlockWidget, isSkipShifting?: boolean, skipElementRemoval?: boolean): void;
    private removePrevParaMarkRevision;
    private isPasteRevertAction;
    private toCheckForTrack;
    private removeFootnote;
    private removeEndnote;
    private removeAutoShape;
    /**
     * @private
     * @returns {void}
     */
    removeField(block: BlockWidget, isBookmark?: boolean, isContentControl?: boolean): void;
    /**
     * @private
     * @param {IWidget} node Specifies the node.
     * @returns {void}
     */
    addRemovedNodes(node: IWidget): void;
    private deleteBlock;
    private deleteTableCell;
    private deleteCellsInTable;
    /**
     * @private
     */
    removeDeletedCellRevision(row: TableRowWidget): any;
    private onConfirmedTableCellsDeletion;
    private onConfirmedCellDeletion;
    private removeRevisionForRow;
    private removeRevisionsInRow;
    /**
     * @private
     */
    removeRevisionForCell(cellWidget: TableCellWidget, removeCollection: boolean): any;
    private removeRevisionForInnerTable;
    /**
     * @private
     */
    removeRevisionForBlock(paraWidget: ParagraphWidget, revision: Revision, skipParaMark: boolean, addToRevisionInfo: boolean): any;
    private unlinkRangeByRevision;
    private isWholeRowSelected;
    private deleteCell;
    private paragrapghBookmarkCollection;
    private deleteContainer;
    private deleteTableBlock;
    private splitTable;
    private updateEditPosition;
    private deleteContent;
    private setActionInternal;
    private checkClearCells;
    private isEndInAdjacentTable;
    /**
     * @private
     * @param table
     * @returns {TableWidget}
     */
    cloneTableToHistoryInfo(table: TableWidget): TableWidget;
    private insertParagraphPaste;
    private removeInlines;
    private skipTracking;
    private canHandleDeletion;
    /**
     *
     * @param comment
     * Deletes comment start and end markers along with its comment widgets.
     */
    private deleteCommentInSelection;
    /**
     * @private
     */
    removeContent(lineWidget: LineWidget, startOffset: number, endOffset: number, editAction?: number): void;
    /**
     * Deletes comment widgets from comment pane along with history preservation.
     */
    private deleteCommentWidgetInline;
    private clearFieldElementRevisions;
    private addRemovedRevisionInfo;
    /**
     * @private
     * @returns {void}
     */
    removeEmptyLine(paragraph: ParagraphWidget): void;
    /**
     * Clone the list level
     *
     * @param {WListLevel} source - Specifies the source
     * @private
     * @returns {WListLevel} - Returns the list level
     */
    cloneListLevel(source: WListLevel): WListLevel;
    /**
     * Copies the list level
     *
     * @param {WListLevel} destination - Specifies the destination
     * @param {WListLevel} listLevel - Specifies the list level
     * @private
     * @returns {void}
     */
    copyListLevel(destination: WListLevel, listLevel: WListLevel): void;
    /**
     * Clone level override
     *
     * @param {WLevelOverride} source  @returns {void} - Specifies the level override
     * @private
     * @returns {WLevelOverride} - Returns the level overeide
     */
    cloneLevelOverride(source: WLevelOverride): WLevelOverride;
    /**
     * Update List Paragraph
     * @private
     * @returns {void}
     */
    updateListParagraphs(): void;
    /**
     * @private
     * @returns {void}
     */
    updateListParagraphsInBlock(block: BlockWidget): void;
    /**
     * Applies list format
     *
     * @param {WList} list - Specifies the list.
     * @private
     * @returns {void}
     */
    onApplyList(list: WList): void;
    /**
     * Applies bullets or numbering list
     *
     * @param {string} format - Specifies the format
     * @param {ListLevelPattern} listLevelPattern - Specifies the list level patterns
     * @param {string} fontFamily - Specifies the font family.
     * @private
     * @returns {void}
     */
    applyBulletOrNumbering(format: string, listLevelPattern: ListLevelPattern, fontFamily: string): void;
    private addListLevels;
    /**
     * Insert page break at cursor position
     *
     * @returns {void}
     */
    insertPageBreak(): void;
    /**
     * @private
     * @returns {void}
     */
    onEnter(isInsertPageBreak?: boolean): void;
    private splitParagraphInternal;
    private insertParaRevision;
    private applyRevisionForParaMark;
    private checkParaMarkMatchedWithElement;
    private checkToMatchEmptyParaMark;
    private checkToMatchEmptyParaMarkBack;
    /**
     * @private
     * @returns {void}
     */
    updateNextBlocksIndex(block: BlockWidget, increaseIndex: boolean): void;
    private updateIndex;
    /**
     * @private
     * @returns {void}
     */
    updateEndPosition(): void;
    private checkAndRemoveComments;
    private updateHistoryForComments;
    /**
     * @private
     * @returns {void}
     */
    onBackSpace(): void;
    /**
     * @private
     * @returns {boolean}
     */
    insertRemoveBookMarkElements(): boolean;
    /**
     * @private
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isBackSpace - Specifies is backspace.
     * @returns {boolean}
     */
    deleteSelectedContents(selection: Selection, isBackSpace: boolean): boolean;
    private removeWholeElement;
    private getSelectedComments;
    /**
     * Remove single character on left of cursor position
     *
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isRedoing - Specified the is redoing.
     * @private
     * @returns {void}
     */
    singleBackspace(selection: Selection, isRedoing: boolean): void;
    private setPositionForHistory;
    private removeAtOffset;
    private removeCharacter;
    private removeCharacterInLine;
    private removeRevisionsInformation;
    private handleDeleteTracking;
    private toCombineOrInsertRevision;
    private updateLastElementRevision;
    private updateEndRevisionIndex;
    private retrieveRevisionInOder;
    private handleDeletionForInsertRevision;
    private handleDeleteBySplitting;
    private updateCursorForInsertRevision;
    private checkToCombineRevisionsInSides;
    /**
     * Remove the current selected content or one character right of cursor.
     *
     * @returns {void}
     */
    delete(): void;
    private deleteEditElement;
    private removeContentControlMark;
    /**
     * Remove single character on right of cursor position
     *
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isRedoing - Specified the is redoing.
     * @private
     * @returns {void}
     */
    singleDelete(selection: Selection, isRedoing: boolean): void;
    private singleDeleteInternal;
    private deleteParagraphMark;
    private handleDeleteParaMark;
    private insertDeleteParaMarkRevision;
    private retrieveRevisionByType;
    private combineRevisionOnDeleteParaMark;
    private updateEditPositionOnMerge;
    private checkEndPosition;
    private checkInsertPosition;
    private checkIsNotRedoing;
    /**
     * deleteSelectedContentInternal
     * @private
     */
    deleteSelectedContentInternal(selection: Selection, isBackSpace: boolean, startPosition: TextPosition, endPosition: TextPosition): boolean;
    /**
     * Init EditorHistory
     *
     * @private
     * @param {Action} action Specified the action.
     * @returns {void}
     */
    initHistory(action: Action): void;
    /**
     * Init Complex EditorHistory
     *
     * @private
     * @param {Action} action Specified the action.
     * @returns {void}
     */
    initComplexHistory(action: Action): void;
    /**
     * Insert image
     *
     * @private
     * @param {string} base64String Base64 string, web URL or file URL.
     * @param {number} width Image width
     * @param {number} height Image height
     * @returns {void}
     */
    insertPicture(base64String: string, width: number, height: number, isUiInteracted: boolean): void;
    private generateFallBackImage;
    private insertPictureInternal;
    private fitImageToPage;
    /**
     * @param {selection} Selection context.
     * @param {elementBox} Elementbox
     * @param selection
     * @param elementBox
     * @private
     */
    insertInlineInSelection(selection: Selection, elementBox: ElementBox): void;
    /**
     * @private
     * @returns {void}
     */
    onPortrait(): void;
    /**
     * @private
     * @returns {void}
     */
    onLandscape(): void;
    private copyValues;
    /**
     * @param property
     * @private
     * @returns {void}
     */
    changeMarginValue(property: string): void;
    /**
     * @param property
     * @private
     * @returns {void}
     */
    onPaperSize(property: string): void;
    /**
     * @param blockAdv
     * @param updateNextBlockList
     * @param blockAdv
     * @param updateNextBlockList
     * @private
     * @returns {void}
     */
    updateListItemsTillEnd(blockAdv: BlockWidget, updateNextBlockList: boolean): void;
    /**
     * @param block
     * @private
     * @returns {void}
     */
    updateWholeListItems(block: BlockWidget, isFindingListParagraph?: boolean, listID?: number): ParagraphWidget;
    private getNextBlockForList;
    private updateListItems;
    private updateListItemsForTable;
    private updateListItemsForRow;
    private updateListItemsForCell;
    /**
     * @param block
     * @private
     * @returns {void}
     */
    updateRenderedListItems(block: BlockWidget): void;
    private updateRenderedListItemsForTable;
    private updateRenderedListItemsForRow;
    private updateRenderedListItemsForCell;
    private updateListItemsForPara;
    private updateRenderedListItemsForPara;
    private updateListNumber;
    /**
     * Get offset value to update in selection
     *
     * @param selection
     * @private
     * @returns {void}
     */
    getOffsetValue(selection: Selection): void;
    private setPositionParagraph;
    /**
     * @param textPosition
     * @param editPosition
     * @param textPosition
     * @param editPosition
     * @private
     * @returns {void}
     */
    setPositionForCurrentIndex(textPosition: TextPosition, editPosition: string): void;
    /**
     * Insert page number in the current cursor position.
     *
     * @param {string} numberFormat - Optional switch that overrides the numeral style of the page number.
     * @returns {void}
     */
    insertPageNumber(numberFormat?: string): void;
    /**
     * @param numberFormat
     * @private
     * @returns {void}
     */
    insertPageCount(numberFormat?: string): void;
    private createFields;
    /**
     * Insert Bookmark at current selection range
     *
     * @param {string} name - Name of bookmark
     * @returns {void}
     */
    insertBookmark(name: string): void;
    /**
     * Deletes specific bookmark
     *
     * @param {string} bookmarkName - Name of bookmark to delete.
     * @returns {void}
     */
    deleteBookmark(bookmarkName: string): void;
    /**
     * @param bookmark
     * @private
     * @returns {void}
     */
    deleteBookmarkInternal(bookmark: BookmarkElementBox): void;
    private getSelectionInfo;
    private insertElements;
    private insertElementsInternal;
    /**
     * @param index
     * @private
     * @returns {CommentElementBox}
     */
    getCommentElementBox(index: string): CommentElementBox;
    /**
     * @param position
     * @private
     * @returns {BlockInfo}
     */
    getBlock(position: IndexInfo): BlockInfo;
    private getBlockInternal;
    /**
     * @param position
     * @param isInsertPosition
     * @private
     * @returns {void}
     */
    updateHistoryPosition(position: TextPosition | string, isInsertPosition: boolean): void;
    /**
     * Applies the borders based on given settings.
     *
     * @param {BorderSettings} settings
     * @returns {void}
     */
    applyBorders(settings: BorderSettings): void;
    private applyAllBorders;
    private applyInsideBorders;
    private getTopBorderCellsOnSelection;
    private getLeftBorderCellsOnSelection;
    private getRightBorderCellsOnSelection;
    private getBottomBorderCellsOnSelection;
    private clearAllBorderValues;
    private clearBorder;
    private getAdjacentCellToApplyBottomBorder;
    private getAdjacentBottomBorderOnEmptyCells;
    private getAdjacentCellToApplyRightBorder;
    private getSelectedCellsNextWidgets;
    private getBorder;
    /**
     * Applies borders
     *
     * @param {WBorders} sourceBorders
     * @param {WBorders} applyBorders
     * @private
     * @returns {void}
     */
    applyBordersInternal(sourceBorders: WBorders, applyBorders: WBorders): void;
    /**
     * Apply shading to table
     *
     * @param {WShading} sourceShading
     * @param {WShading} applyShading
     * @private
     * @returns {void}
     */
    applyShading(sourceShading: WShading, applyShading: WShading): void;
    private applyBorder;
    /**
     * Apply Table Format changes
     *
     * @param {WTableFormat} format Specifies table format
     * @param {boolean} isShading Specifies shading.
     * @private
     * @returns {void}
     */
    onTableFormat(format: WTableFormat, isShading?: boolean): void;
    private applyTableFormat;
    private applyTablePropertyValue;
    private handleTableFormat;
    private updateGridForTableDialog;
    /**
     * Applies Row Format Changes
     *
     * @param {WRowFormat} format Specifies row format
     * @private
     * @returns {void}
     */
    onRowFormat(format: WRowFormat): void;
    private applyRowFormat;
    private applyRowPropertyValue;
    private handleRowFormat;
    /**
     * Applies Cell Format changes
     *
     * @param {WCellFormat} format Specifies cell format
     * @private
     * @returns {void}
     */
    onCellFormat(format: WCellFormat): void;
    /**
     * Applies Paragraph Format changes
     *
     * @param {WParagraphFormat} format Specifies cell format
     * @private
     * @returns {void}
     */
    onParaFormat(format: WParagraphFormat): void;
    /**
     * @param selection
     * @param value
     * @private
     * @returns {void}
     */
    updateCellMargins(selection: Selection, value: WCellFormat): void;
    private updateFormatForCell;
    private getSelectedCellInColumn;
    private getColumnCells;
    private getTableWidth;
    private applyCellPropertyValue;
    private handleCellFormat;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * Updates the table of contents.
     *
     * @param tocField
     * @private
     * @returns {void}
     */
    updateToc(tocField?: FieldElementBox): void;
    private getTocSettings;
    private decodeTSwitch;
    /**
     * Inserts, modifies or updates the table of contents based on given settings.
     *
     * @param {TableOfContentsSettings} tableOfContentsSettings
     * @returns {void}
     */
    insertTableOfContents(tableOfContentsSettings?: TableOfContentsSettings): void;
    private appendEmptyPara;
    private constructTocFieldCode;
    private constructTSwitch;
    private appendEndField;
    private validateTocSettings;
    /**
     * Builds the TOC
     *
     * @private
     * @returns {ParagraphWidget[]}
     *
     */
    buildToc(tocSettings: TableOfContentsSettings, fieldCode: string, isFirstPara: boolean, isStartParagraph?: boolean): ParagraphWidget[];
    private createOutlineLevels;
    private createHeadingLevels;
    private isHeadingStyle;
    private isOutlineLevelStyle;
    private createTocFieldElement;
    private createTOCWidgets;
    private insertTocHyperlink;
    private insertTocPageNumber;
    private updatePageRef;
    /**
     * Inserts toc bookmark.
     *
     * @param widget
     * @returns {string}
     */
    private insertTocBookmark;
    private generateBookmarkName;
    /**
     * Change cell content alignment
     *
     * @param verticalAlignment
     * @param textAlignment
     * @param verticalAlignment
     * @param textAlignment
     * @private
     * @returns {void}
     */
    onCellContentAlignment(verticalAlignment: CellVerticalAlignment, textAlignment: TextAlignment): void;
    /**
     * @param user
     * @private
     * @returns {void}
     */
    insertEditRangeElement(user: string): void;
    private insertEditRangeInsideTable;
    private addRestrictEditingForSelectedArea;
    /**
     * @param user
     * @private
     * @returns {void}
     */
    addEditElement(user: string): EditRangeStartElementBox;
    /**
     * @param protectionType
     * @private
     * @returns {void}
     */
    protect(protectionType: ProtectionType): void;
    private addEditCollectionToDocument;
    /**
     * @param editStart
     * @param user
     * @private
     * @returns {void}
     */
    updateRangeCollection(editStart: EditRangeStartElementBox, user: string): void;
    /**
     * @param user
     * @private
     * @returns {void}
     */
    removeUserRestrictions(user: string): void;
    /**
     * @param editStart
     * @param currentUser
     * @private
     * @returns {void}
     */
    removeUserRestrictionsInternal(editStart: EditRangeStartElementBox, currentUser?: string): void;
    /**
     * @private
     * @returns {void}
     */
    removeAllEditRestrictions(): void;
    /**
     * Insert specified form field at current selection.
     *
     * @param {FormFieldType} type Form field type
     * @returns {void}
     */
    insertFormField(type: FormFieldType): void;
    private insertFormFieldInternal;
    private getFormFieldData;
    /**
     * @param field
     * @param info
     * @private
     * @returns {void}
     */
    setFormField(field: FieldElementBox, info: TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo): void;
    /**
     * @param type
     * @param formData
     * @param type
     * @param formData
     * @private
     * @returns {boolean}
     */
    editFormField(type: FormFieldType, formData: FormField): boolean;
    private getDefaultText;
    private getFormFieldCode;
    /**
     * @param field
     * @param reset
     * @param value
     * @param field
     * @param reset
     * @param value
     * @private
     * @returns {void}
     */
    toggleCheckBoxFormField(field: FieldElementBox, reset?: boolean, value?: boolean): void;
    /**
     * @param field
     * @param value
     * @param reset
     * @private
     * @returns {void}
     */
    updateFormField(field: FieldElementBox, value: string | number, reset?: boolean): void;
    private updateFormFieldInternal;
    private updateFormFieldResult;
    private checkBookmarkAvailability;
    private getBookmarkName;
    /**
     * @param formField
     * @private
     * @returns {void}
     */
    applyFormTextFormat(formField: FieldElementBox): void;
    private insertSpaceInFormField;
    /**
     * @param formField
     * @private
     * @returns {string}
     */
    getFieldResultText(formField?: FieldElementBox): string;
    /**
     * @param field
     * @param text
     * @private
     * @returns {void}
     */
    applyTextFormatInternal(field: FieldElementBox, text: string): void;
    private constructCommentInitial;
    /**
     * Insert Footnote at current selection
     *
     * @returns {void}
     */
    insertFootnote(): void;
    private updateFootnoteCollection;
    /**
     * Insert Endnote at current selection
     *
     * @returns {void}
     */
    insertEndnote(): void;
    private updateEndnoteCollection;
    private updateEndNoteIndex;
    private separator;
    private continuationSeparator;
    private updateFootNoteIndex;
}
/**
 * @private
 */
export interface SelectionInfo {
    start: string;
    end: string;
}
/**
 * @private
 */
export interface ContinueNumberingInfo {
    currentList: WList;
    listLevelNumber: number;
    listPattern: ListLevelPattern;
}
/**
 * Specifies the settings for border.
 */
export interface BorderSettings {
    /**
     * Specifies the border type.
     */
    type: BorderType;
    /**
     * Specifies the border color.
     */
    borderColor?: string;
    /**
     * Specifies the line width.
     */
    lineWidth?: number;
    /**
     * Specifies the border style.
     */
    borderStyle?: LineStyle;
}
/**
 * @private
 */
export interface TocLevelSettings {
    [key: string]: number;
}
/**
 * @private
 */
export interface PageRefFields {
    [key: string]: FieldTextElementBox;
}
/**
 * Specifies the settings for table of contents.
 */
export interface TableOfContentsSettings {
    /**
     * Specifies the start level.
     */
    startLevel?: number;
    /**
     * Specifies the end level.
     */
    endLevel?: number;
    /**
     * Specifies whether hyperlink can be included.
     */
    includeHyperlink?: boolean;
    /**
     * Specifies whether page number can be included.
     */
    includePageNumber?: boolean;
    /**
     * Specifies whether the page number can be right aligned.
     */
    rightAlign?: boolean;
    /**
     * Specifies the tab leader.
     */
    tabLeader?: TabLeader;
    /**
     * @private
     */
    levelSettings?: TocLevelSettings;
    /**
     * Specifies whether outline levels can be included.
     */
    includeOutlineLevels?: boolean;
}
/**
 * Defines the character format properties of document editor
 */
export interface CharacterFormatProperties {
    /**
     * Defines the bold formatting
     */
    bold?: boolean;
    /**
     * Defines the italic formatting
     */
    italic?: boolean;
    /**
     * Defines the font size
     */
    fontSize?: number;
    /**
     * Defines the font family
     */
    fontFamily?: string;
    /**
     * Defines the underline property
     */
    underline?: Underline;
    /**
     * Defines the strikethrough
     */
    strikethrough?: Strikethrough;
    /**
     * Defines the subscript or superscript property
     */
    baselineAlignment?: BaselineAlignment;
    /**
     * Defines the highlight color
     */
    highlightColor?: HighlightColor;
    /**
     * Defines the font color
     */
    fontColor?: string;
    /**
     * Defines the bidirectional property
     */
    bidi?: boolean;
    /**
     * Defines the allCaps formatting
     */
    allCaps?: boolean;
}
/**
 * Defines the paragraph format properties of document editor
 */
export interface ParagraphFormatProperties {
    /**
     * Defines the left indent
     */
    leftIndent?: number;
    /**
     * Defines the right indent
     */
    rightIndent?: number;
    /**
     * Defines the first line indent
     */
    firstLineIndent?: number;
    /**
     * Defines the text alignment property
     */
    textAlignment?: TextAlignment;
    /**
     * Defines the spacing value after the paragraph
     */
    afterSpacing?: number;
    /**
     * Defines the spacing value before the paragraph
     */
    beforeSpacing?: number;
    /**
     * Defines the spacing between the lines
     */
    lineSpacing?: number;
    /**
     * Defines the spacing type(AtLeast,Exactly or Multiple) between the lines
     */
    lineSpacingType?: LineSpacingType;
    /**
     * Defines the bidirectional property of paragraph
     */
    bidi?: boolean;
    /**
     * Defines the keep with next property of paragraph
     */
    keepWithNext?: boolean;
    /**
     * Defines the keep lines together property of paragraph
     */
    keepLinesTogether?: boolean;
    /**
     * Defines the widow control property of paragraph
     */
    widowControl?: boolean;
}
/**
 * Defines the section format properties of document editor
 */
export interface SectionFormatProperties {
    /**
     * Defines the header distance.
     */
    headerDistance?: number;
    /**
     * Defines the footer distance.
     */
    footerDistance?: number;
    /**
     * Defines the page width.
     */
    pageWidth?: number;
    /**
     * Defines the page height.
     */
    pageHeight?: number;
    /**
     * Defines the left margin of the page.
     */
    leftMargin?: number;
    /**
     * Defines the top margin of the page.
     */
    topMargin?: number;
    /**
     * Defines the bottom margin of the page.
     */
    bottomMargin?: number;
    /**
     * Defines the right margin of the page.
     */
    rightMargin?: number;
}
/**
 * @private
 */
export interface TabPositionInfo {
    defaultTabWidth: number;
    fPosition: number;
    position: number;
}
