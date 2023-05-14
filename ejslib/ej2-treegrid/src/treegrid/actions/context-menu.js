import { Grid, ContextMenu as cmenu } from '@syncfusion/ej2-grids';
import { isNullOrUndefined, select } from '@syncfusion/ej2-base';
/**
 * ContextMenu Module for TreeGrid
 *
 * @hidden
 */
var ContextMenu = /** @class */ (function () {
    function ContextMenu(parent) {
        Grid.Inject(cmenu);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     * @returns {void}
     */
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on('contextMenuOpen', this.contextMenuOpen, this);
        this.parent.on('contextMenuClick', this.contextMenuClick, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    ContextMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('contextMenuOpen', this.contextMenuOpen);
        this.parent.off('contextMenuClick', this.contextMenuClick);
    };
    ContextMenu.prototype.contextMenuOpen = function (args) {
        var addRow = select('#' + this.parent.element.id + '_gridcontrol_cmenu_AddRow', args.element);
        var editRecord = select('#' + this.parent.element.id + '_gridcontrol_cmenu_Edit', args.element);
        var indent = select('#' + this.parent.element.id + '_gridcontrol_cmenu_Indent', args.element);
        var outdent = select('#' + this.parent.element.id + '_gridcontrol_cmenu_Outdent', args.element);
        if (addRow) {
            if (this.parent.grid.editSettings.allowAdding === false) {
                addRow.style.display = 'none';
            }
            else {
                addRow.style.display = 'block';
            }
        }
        if ((this.parent.editSettings.mode === 'Cell' || this.parent.editSettings.mode === 'Batch')
            && !(isNullOrUndefined(editRecord)) && !(editRecord.classList.contains('e-menu-hide'))) {
            editRecord.style.display = 'none';
        }
        if (indent || outdent) {
            var tObj = this.parent;
            var selectedrow = tObj.getSelectedRows()[0];
            var targetElement = args.event.target.closest('td');
            if (isNullOrUndefined(targetElement) || (!isNullOrUndefined(targetElement) && !targetElement.classList.contains('e-rowcell'))) {
                indent.style.display = outdent.style.display = 'none';
            }
            else {
                if (selectedrow.rowIndex === 0 || tObj.getSelectedRowIndexes().length > 1) {
                    indent.style.display = outdent.style.display = 'none';
                }
                else if (args['name'] !== 'rowDeselected' || (!isNullOrUndefined(selectedrow) && tObj.grid.isCheckBoxSelection)) {
                    var selectedItem = tObj.getCurrentViewRecords()[selectedrow.rowIndex];
                    if (!isNullOrUndefined(selectedItem)) {
                        if ((selectedItem.level > tObj.getCurrentViewRecords()[selectedrow.rowIndex - 1].level)) {
                            indent.style.display = 'none';
                        }
                        else {
                            indent.style.display = 'block';
                        }
                        if (selectedItem.level === tObj.getCurrentViewRecords()[selectedrow.rowIndex - 1].level) {
                            indent.style.display = 'block';
                        }
                        if (selectedItem.level === 0) {
                            outdent.style.display = 'none';
                        }
                        if (selectedItem.level !== 0) {
                            outdent.style.display = 'block';
                        }
                    }
                }
                if (args['name'] === 'rowDeselected' && isNullOrUndefined(selectedrow) && !tObj.grid.isCheckBoxSelection) {
                    if (this.parent.toolbar['includes']('Indent')) {
                        indent.style.display = 'none';
                    }
                    if (this.parent.toolbar['includes']('Outdent')) {
                        outdent.style.display = 'none';
                    }
                }
            }
        }
    };
    ContextMenu.prototype.contextMenuClick = function (args) {
        if (args.item.id === 'Above' || args.item.id === 'Below' || args.item.id === 'Child') {
            this.parent.notify('savePreviousRowPosition', args);
            this.parent.setProperties({ editSettings: { newRowPosition: args.item.id } }, true);
            this.parent.editModule['isAddedRowByContextMenu'] = true;
            this.parent.addRecord();
        }
        if (args.item.id === this.parent.element.id + '_gridcontrol_cmenu_Indent' || args.item.id === this.parent.element.id + '_gridcontrol_cmenu_Outdent') {
            if (!isNullOrUndefined(this.parent.rowDragAndDropModule)) {
                var indentOutdentAction = 'indentOutdentAction';
                var action = args.item.id === this.parent.element.id + '_gridcontrol_cmenu_Indent' ? 'indent' : 'outdent';
                this.parent.rowDragAndDropModule[indentOutdentAction](null, action);
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns ContextMenu module name
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    /**
     * Destroys the ContextMenu.
     *
     * @function destroy
     * @returns {void}
     */
    ContextMenu.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Gets the context menu element from the TreeGrid.
     *
     * @returns {Element} Return Context Menu root element.
     */
    ContextMenu.prototype.getContextMenu = function () {
        return this.parent.grid.contextMenuModule.getContextMenu();
    };
    return ContextMenu;
}());
export { ContextMenu };
