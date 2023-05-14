import {
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";

// Service Translate
import { TranslationLoaderService } from "src/app/common/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
// Import the locale files
import { locale as english } from "../i18n/en";
import { locale as vietnam } from "../i18n/vi";
// Globals File
import { Globals } from "src/app/common/globals";
import { Configs } from "src/app/common/configs";
import { Notification } from "src/app/common/notification";
const _ = require("lodash");
import { L10n, setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";
import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";

import { CoreService } from "src/app/_services/core.service";
import { ConfigService } from "src/app/_services/config.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { ModalService } from "src/app/_services/modal.service";
import { Query, Predicate } from "@syncfusion/ej2-data";
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
import * as moment from "moment";
const $ = require("jquery");
import { ContractInfor, SalaryInfo } from "src/app/_models/app/cms";
setCulture("en");

@Component({
  selector: "cms-profile-contractinfor-edit",
  templateUrl: "./contractinfor-edit.component.html",
  styleUrls: ["./contractinfor-edit.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class ContractInforEditComponent implements OnInit {
  toolItems$ = new BehaviorSubject<any[]>([

  ])
  // Varriable Language
  flagState$ = new BehaviorSubject<string>('')
  // flag show popup toolbar Back
  flagePopup = true;
  paramId = "";

  model: ContractInfor = new ContractInfor();
  modelSalary: SalaryInfo = new SalaryInfo();
  languages: any;
  selectedLanguage: any;
  editForm!: FormGroup;
  public query = new Query();
  public fields: FieldSettingsModel = { value: "id", text: "name" };

  // Toolbar Item
  public toolbar!: ToolbarInterface[];

  // Private
  private _unsubscribeAll: Subject<any>;

  lstContractId: any = [];
  lstStatusId: any = [];
  lstWorkingId: any = [];
  disable: any;
  checked: number = 0;
  /**
   * Constructor
   *
   */
  constructor(
    private _coreService: CoreService,
    private modalService: ModalService,
    private notification: Notification,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private _tlaTranslationLoaderService: TranslationLoaderService
  ) {
    // Get Route Param
    this.activatedRoute.params.subscribe((params: Params) => {
      const paramId = params["id"];
      // Nếu trạng thái chỉnh sửa thì Get dữ liệu
      if (paramId !== "new") {
        const objParam = window.atob(paramId);
        const paramUrl = JSON.parse(objParam);
        if (paramUrl && paramUrl.id) {
          this.checked = 1;
          this.paramId = paramUrl.id;
          this.flagState$.next(paramUrl.type);
        } else {
          // Xu ly redirect
          this.router.navigate(["/errors/404"]);
        }
      } else {
        this.flagState$.next("new");
      }
    });
    this.loadData();
    // Set language
    this.languages = this.globals.languages;

    this._configService._configSubject.next("true");
    // Load file language
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

    this.editForm = this._formBuilder.group({
      code: ["", [Validators.required]], //mã nhân viên
      fullname: [{ value: "", disable: this.disable }, []],
      //unit: [""], //Đơn vị
      positionId: [{ value: "", disable: this.disable }, []], //chức danh
      orgId: ["", []],
      orgParentName: ["", []],
      contractId: ["", [Validators.required]], //Loại hợp đồng
      contractNo: ["", []],
      startDate: ["", [Validators.required]],
      dateEnd: ["", []],

      signer: ["", [Validators.required]], //Người ký
      signerPosition: ["", []], //Chức danh ký
      signDate: ["", [Validators.required]], //Ngày ký
      note: ["", []],
      status: ["", [Validators.required]],
      workingId: ["", [Validators.required]]
    });

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    L10n.load(this.configs.languageGrid);
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    this._translateService.use(this.selectedLanguage.id);

    this.flagState$.subscribe(x => {
      let toolbarList: any[] = [];
      if (x === "view") {
        toolbarList = [ToolbarItem.BACK, ToolbarItem.EDIT];
        this.editForm.disable();
      }
      if (x === "new") {
        toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
      }
      if (x === "edit") {
        toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
        this.editForm.get("code")!.disable();
      }
      this.toolItems$.next(toolbarList)
    })

    this.disable = true;
  }

  changeContractType(e: any) {
    if (e.e) {
      if (this.model.startDate) {
        var item = _.find(this.lstContractId, { id: e.itemData.id });
        if (item.month != null) {
          this.model.expireDate = moment(this.model.startDate).add(item.month, 'month').add(-1, 'days').toDate();
        } else {
          this.model.expireDate = undefined;
        }
      }
      this.checked = 0;
    }
  }
  ChangeDateStart = () => {
    if (this.model.contractTypeId && this.checked == 0) {
      var item = _.find(this.lstContractId, { id: this.model.contractTypeId });
      if (item.month != null) {
        this.model.expireDate = moment(this.model.startDate).add(item.month, 'month').add(-1, 'days').toDate();
      } else {
        this.model.expireDate = undefined;
      }
    } else {
      this.checked = 0;
    }
  }
  loadData() {
    Promise.all([
      new Promise((resolve) => {
        if (this.paramId) {
          if (this.flagState$.value != "new") {
            this._coreService
              .Get("hr/contract/get?id=" + this.paramId)
              .subscribe((res: any) => {
                resolve(res.data);
              });
          }
          else {
            // chuyển từ dashboar sang
            this._coreService
              .Get("hr/employee/GetInforContract?Id=" + this.paramId)
              .subscribe((res: any) => {
                resolve(res.data);
              });
          }
        } else {
          resolve(false);
        }
      }),
      new Promise((resolve) => {
        this._coreService.Get("hr/contracttype/GetList").subscribe((res: any) => {
          resolve(res.data);
        });
      }), //1
      new Promise((resolve) => {
        this._coreService.Get("hr/otherlist/STATUSAPPROVE").subscribe((res: any) => {
          resolve(res.data);
        });
      }), //2
    ]).then((res: any) => {
      this.lstContractId = res[1];
      this.lstStatusId = res[2];
      if (this.paramId) {
        this.model = _.cloneDeep(res[0]);
        this.getlastWorking(this.model.workingId!).then((res1: any) => {
          if (res1) {
            this.modelSalary = res1;
          }
        });
      }
    });
  }
  choiseDecision() {
    if (this.flagState$.value == "view") {
      return;
    }
    if (this.model.employeeId) {
      let param = {
        employeeId: this.model.employeeId,
        selected: this.model.workingId,
      };
      this.modalService.open("cms-app-modalsdecision", param);
      const x = this.modalService.decision.subscribe((res: any) => {
        if (res.id) {
          this.model.workingId = res.id;
          this.model.workingNo = res.decisionNo;
          this.getlastWorking(this.model.workingId!).then((res: any) => {
            this.modelSalary = res;
          });
        }
      });
    } else {
      this.notification.warning("Chọn nhân viên");
    }
  }

    
  loadContractNo(id: number) {
    const x = this._coreService
      .Get("hr/contract/GetContractNo?id=" + id )
      .subscribe((res: any) => {
        this.model.contractNo = res.message;
        x.unsubscribe();
      });
  }

  getlastWorking(workingId: number) {
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/working/GetLastWorking?id=" + workingId)
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  choiseEmp() {
    if (this.flagState$.value == "view") {
      return;
    }
    let param = {
      selected: -1,//this.model.employeeId, //select employee on grid
    };
    this.modalService.open("cms-app-modalsemp", param);
    const x = this.modalService.employee.subscribe((res: any) => {
      this.model.employeeId = res.employeeId;
      this.model.employeeCode = res.employeeCode;
      this.model.employeeName = res.employeeName;
      this.model.positionName = res.positionName;
      this.model.orgName = res.orgName;
      this.model.orgParentName = res.orgParentName;
      this.model.workingId = res.workingId;
      //  this.model.startDate = res.contractExpired ? res.contractExpired : res.dateStart;
      if (res.contractExpired) {
        this.model.startDate = res.contractExpired;
        this.model.startDate = moment(this.model.startDate).add(1, 'days').toDate();
      } else {
        this.model.startDate = new Date();
      }
      if (this.model.workingId) {
        this.getlastWorking(this.model.workingId).then((res1: any) => {
          if (res1) {
            this.modelSalary = res1;
          }
        });
      }
      if (res.employeeId) {
        this.loadContractNo(res.employeeId);
      }
      x.unsubscribe();
    });
  }
  choiseSigner() {
    if (this.flagState$.value == "view") {
      return;
    }
    let param = {
      selected: this.model.signId,
    };
    this.modalService.open("cms-app-modalsemp", param);
    const x = this.modalService.employee.subscribe((res: any) => {
      this.model.signerPosition = res.positionName;
      this.model.signerName = res.employeeName;
      this.model.signId = res.employeeId;
      x.unsubscribe();
    });
  }

  // Event Click Toolbar
  clickToolbar = (itemButton: any): void => {
    const buttonId = itemButton.id;
    switch (buttonId) {
      case ToolbarItem.BACK:
        if (this.editForm.dirty && this.editForm.touched) {
          this.flagePopup = false;
        }
        if (
          (this.editForm.dirty && this.editForm.touched) ||
          this.flagePopup === false
        ) {
          this.modalService.open("confirm-back-modal");
        }
        if (this.flagePopup === true) {
          this.router.navigate(["cms/profile/business/contractinfor"]);
        }
        break;
      case ToolbarItem.ADD:
        break;
      case ToolbarItem.SAVE:
        this.saveData();
        break;
      case ToolbarItem.EDIT:
        if (this.model.statusId == 2 && !this.globals.isAdmin) {
          this.notification.warning("notify.APPROVED");
          return;
        }
        this.flagState$.next("edit");
        this.flagePopup = true;
        this.editForm.enable();
        this.editForm.get("code")!.disable();
        break;
      default:
        break;
    }
  };
  // lưu data open popup
  saveData = () => {
    if (!this.editForm.valid) {
      this.notification.warning("Form chưa hợp lệ !");
      this.editForm.markAllAsTouched();
      return;
    }
    this.model.salBasic = this.modelSalary.salBasic;
    this.model.salPercent = this.modelSalary.salPercent;
    let param = this.convertModel(this.model);
    if (param.expireDate != null) {
      let y = moment(param.startDate).isSameOrBefore(param.expireDate);
      if (!y) {
        this.notification.warning("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        return;
      }
    }

    if (this.flagState$.value === "new") {
      this._coreService.Post("hr/contract/add", param).subscribe(
        (res: any) => {
          if (res.statusCode == 400) {
            this.notification.checkErrorMessage(res.message);
          } else {
            this.notification.addSuccess();
            this.router.navigate(["/cms/profile/business/contractinfor"]);
          }
        },
        (error: any) => {
          this.notification.addError();
        }
      );
    } else {
      this._coreService.Post("hr/contract/Update", param).subscribe(
        (res: any) => {
          if (res.statusCode == 400) {
            this.notification.checkErrorMessage(res.message);
          } else {
            this.notification.editSuccess();
            this.router.navigate(["/cms/profile/business/contractinfor"]);
          }
        },
        (error: any) => {
          this.notification.editError();
        }
      );
    }
  };
  convertModel(param: any) {
    let model = _.cloneDeep(param);
    model.startDate = param.startDate
      ? moment(param.startDate).format("MM/DD/YYYY")
      : null;
    model.expireDate = param.expireDate
      ? moment(param.expireDate).format("MM/DD/YYYY")
      : null;
    model.signDate = param.signDate
      ? moment(param.signDate).format("MM/DD/YYYY")
      : null;
    return model;
  }
  // change date
  changeDate = (model: any) => {
    setTimeout(() => {
      const idDate = "#" + model + "_input";
      const value = $(idDate).val();
      var patt = new RegExp(
        "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
      );
      if (value.length > 0 && patt.test(value.toLowerCase()) === true) {
        this.editForm.get(model)!.setErrors({ incorrect: true });
        return;
      } else if (value.length > 10) {
        this.editForm.get(model)!.setErrors({ incorrect: true });
        return;
      } else {
        this.editForm.get(model)!.clearValidators();
      }
      if (
        value &&
        ((value.length === 8 && value.indexOf("/") === -1) ||
          (value.length === 6 && value.indexOf("/") === -1) ||
          (value.length === 10 && value.indexOf("/") > -1))
      ) {
        if (value.indexOf("-") === -1) {
          const returnDate = this.globals.replaceDate(value);
          // (this.model as any)[model] = returnDate;
          if (returnDate && returnDate.length > 0) {
            $(idDate).val(returnDate);
            const dateParts: any = returnDate.split("/");
            (this.model as any)[model] = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            );
            this.editForm.get(model)!.clearValidators();
          }
        }
      }
    }, 200);
  };

  confirmBack = (status: any): void => {
    if (status === "cancel") {
      this.modalService.close("confirm-back-modal");
    } else {
      this.modalService.close("confirm-back-modal");
      this.router.navigate(["/cms/profile/business/contractinfor"]);
    }
  };
  // filter type
  public onFiltering(e: any, a: any) {
    e.preventDefaultAction = true;
    const predicate = new Predicate("name", "contains", e.text, true, true);
    this.query = new Query();
    this.query = e.text !== "" ? this.query.where(predicate) : this.query;
    e.updateData(a, this.query);
  }
}
