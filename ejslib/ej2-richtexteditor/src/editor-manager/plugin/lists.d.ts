import { EditorManager } from './../base/editor-manager';
/**
 * Lists internal component
 *
 * @hidden
 * @deprecated
 */
export declare class Lists {
    private parent;
    private startContainer;
    private endContainer;
    private saveSelection;
    private domNode;
    private currentAction;
    /**
     * Constructor for creating the Lists plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private testList;
    private testCurrentList;
    private spaceList;
    private enterList;
    private backspaceList;
    private removeList;
    private keyDownHandler;
    private spaceKeyAction;
    private getAction;
    private revertClean;
    private noPreviousElement;
    private nestedList;
    private applyListsHandler;
    private setSelectionBRConfig;
    private applyLists;
    private removeEmptyListElements;
    private isRevert;
    private checkLists;
    private cleanNode;
    private findUnSelected;
    private revertList;
    private openTag;
    private closeTag;
}
