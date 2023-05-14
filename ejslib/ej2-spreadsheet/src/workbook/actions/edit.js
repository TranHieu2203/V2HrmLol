import { getCell, getSheet } from '../base/index';
import { workbookEditOperation, checkDateFormat, workbookFormulaOperation, refreshChart, checkUniqueRange } from '../common/event';
import { getRangeIndexes, parseIntValue, setLinkModel, getCellAddress } from '../common/index';
import { isNullOrUndefined, getNumericObject } from '@syncfusion/ej2-base';
import { checkIsFormula } from '../../workbook/common/index';
import { getTypeFromFormat } from '../integrations/index';
/**
 * The `WorkbookEdit` module is used to handle the editing functionalities in Workbook.
 */
var WorkbookEdit = /** @class */ (function () {
    /**
     * Constructor for edit module in Workbook.
     *
     * @private
     * @param {Workbook} workbook - Specifies the workbook.
     */
    function WorkbookEdit(workbook) {
        this.parent = workbook;
        this.localeObj = getNumericObject(this.parent.locale);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        this.decimalSep = this.localeObj.decimal;
        this.addEventListener();
    }
    /**
     * To destroy the edit module.
     *
     * @returns {void} - destroy the edit module
     * @hidden
     */
    WorkbookEdit.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookEdit.prototype.addEventListener = function () {
        this.parent.on(workbookEditOperation, this.performEditOperation, this);
    };
    WorkbookEdit.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(workbookEditOperation, this.performEditOperation);
        }
    };
    /**
     * Get the module name.
     *
     * @returns {string} - string
     * @private
     */
    WorkbookEdit.prototype.getModuleName = function () {
        return 'workbookEdit';
    };
    WorkbookEdit.prototype.performEditOperation = function (args) {
        var action = args.action;
        switch (action) {
            case 'updateCellValue':
                args.isFormulaDependent = this.updateCellValue(args.address, args.value, args.sheetIndex, args.isValueOnly, args.formula);
                break;
        }
    };
    WorkbookEdit.prototype.checkDecimalPoint = function (value, formula) {
        if (Number(value)) {
            var decIndex = value.toString().indexOf(this.decimalSep) + 1;
            var checkDec = value.toString().substr(decIndex).length <= 6;
            if (checkDec) {
                if (!formula || formula.includes('RANDBETWEEN')) {
                    value = decIndex < 7 ? value : (parseFloat(value)).toFixed(0);
                }
                else {
                    value = value.toString().length < 11 ? value : (decIndex < 11 ? parseFloat(value).toFixed(9 - decIndex + 2) :
                        parseFloat(value).toFixed(0));
                }
            }
            else {
                value = decIndex > 7 ? (parseFloat(value)).toFixed(0) : (parseFloat(value)).toFixed(6 - decIndex + 2);
            }
        }
        return value;
    };
    WorkbookEdit.prototype.updateCellValue = function (address, value, sheetIdx, isValueOnly, formula) {
        if (sheetIdx === undefined) {
            sheetIdx = this.parent.activeSheetIndex;
        }
        var range;
        var isFormulaDependent;
        if (typeof address === 'string') {
            range = getRangeIndexes(address);
        }
        else {
            range = address;
        }
        var sheet = getSheet(this.parent, sheetIdx);
        var cell = getCell(range[0], range[1], sheet, true);
        var prevVal;
        if (!cell) {
            cell = sheet.rows[range[0]].cells[range[1]] = {};
        }
        else {
            prevVal = cell.value;
        }
        if (!isValueOnly) {
            var isFormula = checkIsFormula(value);
            isFormula = value === '#SPILL!' ? true : isFormula;
            var skipFormula = false; // for unique formula
            if (cell.formula && cell.formula.indexOf('UNIQUE') > -1 && value === '') {
                skipFormula = true;
            }
            if (!isFormula && !skipFormula) {
                if (cell.formula) {
                    cell.formula = '';
                }
                cell.value = parseIntValue(value);
            }
            var eventArgs = {
                action: 'refreshCalculate',
                value: value,
                rowIndex: range[0],
                colIndex: range[1],
                sheetIndex: sheetIdx,
                isFormula: isFormula
            };
            if (getTypeFromFormat(cell.format) !== 'Text') {
                var dateEventArgs = {
                    value: value,
                    rowIndex: range[0],
                    colIndex: range[1],
                    sheetIndex: sheetIdx,
                    updatedVal: ''
                };
                this.parent.notify(checkDateFormat, dateEventArgs);
                if (!isNullOrUndefined(dateEventArgs.updatedVal) && dateEventArgs.updatedVal.length > 0) {
                    cell.value = dateEventArgs.updatedVal;
                }
            }
            if (value === '#SPILL!') {
                cell.value = value;
            }
            else {
                var args = { cellIdx: range, isUnique: false };
                this.parent.notify(checkUniqueRange, args);
                if (!skipFormula) {
                    this.parent.notify(workbookFormulaOperation, eventArgs);
                    isFormulaDependent = eventArgs.isFormulaDependent;
                }
                else {
                    value = cell.value;
                }
                if (isFormula) {
                    cell.formula = eventArgs.value;
                    value = cell.value;
                    if (cell.formula === '=NOW()' && cell.format !== 'M/d/yyyy h:mm') {
                        cell.format = 'M/d/yyyy h:mm';
                    }
                }
                else if (cell.value && typeof cell.value === 'string' && (cell.value.indexOf('www.') === 0 ||
                    cell.value.indexOf('https://') === 0 || cell.value.indexOf('http://') === 0 || cell.value.indexOf('ftp://') === 0)) {
                    this.parent.notify(setLinkModel, { hyperlink: cell.value, cell: sheet.name + "!" + getCellAddress(range[0], range[1]) });
                }
            }
        }
        else {
            if (value && value.toString().indexOf(this.decimalSep) > -1) {
                value = this.checkDecimalPoint(value, formula);
            }
            cell.value = value;
        }
        this.parent.setUsedRange(range[0], range[1], sheet);
        if (this.parent.chartColl.length) {
            this.parent.notify(refreshChart, { cell: cell, rIdx: range[0], cIdx: range[1], sheetIdx: sheetIdx });
        }
        return isFormulaDependent;
    };
    return WorkbookEdit;
}());
export { WorkbookEdit };
