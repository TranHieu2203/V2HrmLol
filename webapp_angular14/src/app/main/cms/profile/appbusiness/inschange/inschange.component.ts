import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

// Service Translate
import { TranslationLoaderService } from "src/app/common/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
// Import the locale files
import { locale as english } from "./i18n/en";
import { locale as vietnam } from "./i18n/vi";
// Globals File
import { Globals } from "src/app/common/globals";
import { Configs } from "src/app/common/configs";
import { Notification } from "src/app/common/notification";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  GridComponent,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
import { CoreService } from "src/app/_services/core.service";
import { ConfigService } from "src/app/_services/config.service";
import { ModalService } from "src/app/_services/modal.service";
import { Query } from "@syncfusion/ej2-data";
import { Splitter, SplitterComponent } from '@syncfusion/ej2-angular-layouts';
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";
const _ = require("lodash");
import { takeUntil } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
setCulture("en");

@Component({
  selector: "cms-profile-inschange",
  templateUrl: "./inschange.component.html",
  styleUrls: ["./inschange.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class InsChangeComponent implements OnInit {
  toolItems$ = new BehaviorSubject<any[]>([
    ToolbarItem.ADD, ToolbarItem.EDIT,ToolbarItem.DELETE, ToolbarItem.EXPORT_TEMPLATE, ToolbarItem.IMPORT
  ])

  // Varriable Language
  languages: any;
  selectedLanguage: any;

  public dropInstance!: DropDownList;
  // View child Grid
  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;

  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  // Khai báo data
  public data: Observable<DataStateChangeEventArgs>;
  public state!: DataStateChangeEventArgs;
  public modelAdd: any;
  public modelDelete: Array<any> = [];
  // query auto complete
  public query = new Query();
  // list filter

  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;
  button: any;
  field: any;
  nodeSelected: any;
  x: any;
  org: any;
  flagStatus: number = 0;
  dataImport: any[] = [];
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
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private _tlaTranslationLoaderService: TranslationLoaderService
  ) {
    this.data = _coreService;
    // Set language
    this.languages = this.globals.languages;

    this._configService._configSubject.next("true");
    // Load file language
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

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

    // Load List Data
    this.org = this._coreService.organization
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((model: any) => {
        this.nodeSelected = model.id;
        this.getListData();
      });
    setTimeout(() => {
      this._coreService.organizationSelect.next(true);
    }, 100);
  }
  ngOnDestroy() {
    clearTimeout(this.button);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  viewRecord = (event: any) => {
    this.modelAdd = event.rowData;
    const objParamAdd = { id: this.modelAdd.id, type: "view" };
    const paramAdd = window.btoa(JSON.stringify(objParamAdd));
    this.router.navigate(["/cms/profile/business/inschange/", paramAdd]);
  };

  // filter checkbox
  @ViewChild('horizontal', { static: false })
  splitterObj!: SplitterComponent;
  public onCreated() {
    let splitterObj1 = new Splitter({
      height: '100%',
      paneSettings: [
        { size: '94%', min: '20%' },
        { size: '6%', min: '6%' }
      ],
      orientation: 'Vertical'
    });
    splitterObj1.appendTo('#vertical_splitter');
  }
  // GetListData
  getListData = (): void => {
    const state = { skip: 0, take: 20 };
    var extraParams: any = [];
    if (this.flagStatus) {
      extraParams.push({
        field: "WorkStatusId",
        value: 1,
      });
    }
    if (this.nodeSelected) {
      extraParams.push({
        field: "orgId",
        value: this.nodeSelected,
      });
    }
    this._coreService.execute(state, "hr/inschange/GetAll", extraParams);
  };

  GetAllData = (e: any) => {
    this.flagStatus = e.checked;
    this.getListData();
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.pageIndex = Math.floor(state.skip! / state.take!);
    var extraParams: any = [];
    if (this.nodeSelected) {
      extraParams.push({
        field: "orgId",
        value: this.nodeSelected,
      });
    }
    this._coreService.execute(state, "hr/inschange/GetAll", extraParams);
  }
  // Số thứ tự
  formatStt = (index: string) => {
    return (
      this.pageIndex * this.gridInstance.pageSettings.pageSize! +
      parseInt(index, 0) +
      1
    );
  };
  // Event Click Toolbar
  clickToolbar = (itemButton: any): void => {
    const buttonId = itemButton.id;
    let selectDeletes: any = this.gridInstance.getSelectedRecords();
    switch (buttonId) {
      case ToolbarItem.ADD:
        this.router.navigate(["/cms/profile/business/inschange/new"]);
        break;
      case ToolbarItem.EDIT:
        const selectRows: any = this.gridInstance.getSelectedRecords();
        if (selectRows && selectRows.length > 0) {
          const objParamAdd = { id: selectRows[0].id, type: "edit" };
          const paramAdd = window.btoa(JSON.stringify(objParamAdd));
          this.router.navigate(["/cms/profile/business/inschange/", paramAdd]);
        } else {
          this.notification.warning("notify.NO_RECORD_SELECT");
        }
        break;
      case ToolbarItem.DELETE:
        if (selectDeletes && selectDeletes.length > 0) {
          this.modelDelete = selectDeletes;
          this.modalService.open("confirm-delete-modal");
        } else {
          this.notification.warning("notify.NO_RECORD_SELECT");
        }
        break;
      case ToolbarItem.EXPORT_TEMPLATE:
        this._coreService
          .Download("hr/inschange/TemplateImport", this.nodeSelected)
          .subscribe((response: HttpResponse<Blob>) => {
            let filename: string = "TempInsurance.xlsx";
            let binaryData = [];
            binaryData.push(response.body);
            if (binaryData.length > 0) {
              let downloadLink = document.createElement("a");
              downloadLink.href = window.URL.createObjectURL(
                new Blob(binaryData as BlobPart[], { type: "blob" }));
              downloadLink.setAttribute("download", filename);
              document.body.appendChild(downloadLink);
              downloadLink.click();
            }
          });
        break;
      case ToolbarItem.IMPORT:
        document.getElementById("file")!.click();
        break;
      default:
        break;
    }
  };

  inputFile = async (e: any) => {
    var files = e.target.files;
    var file = files[0];
    var data = await this._coreService.readExcel(file);
    this.dataImport = data;
    let x: any = document.getElementById("file");
    x.value = null;
    this.modalService.open("confirm-import-modal");
  };

  confirmImport = (status: any): void => {
    if (status === "cancel") {
      this.modalService.close("confirm-import-modal");
    } else {
      if (this.dataImport) {
        if (this.dataImport.length > 0 && this.dataImport.length < 10000) {
          let param = [{
            data: this.dataImport
          }]
          this._coreService
            .Download("hr/inschange/ImportTemplate", param[0])
            .subscribe((response: HttpResponse<Blob>) => {
              this.modalService.close("confirm-import-modal");
              if (response.status == 204) {
                this.notification.error("Import không thành công! bạn vui lòng kiểm tra lại!");
              }
              else {
                if (response.body!.type == "application/json") {
                  this.notification.success("Import thành công");
                  this.gridInstance.clearSelection();
                  this.gridInstance.refresh();
                }
                else {
                  let binaryData = [];
                  binaryData.push(response.body);
                  if (binaryData.length > 0) {
                    let filename: string = "TempInsuranceError.xlsx";
                    let downloadLink = document.createElement("a");
                    downloadLink.href = window.URL.createObjectURL(
                      new Blob(binaryData as BlobPart[], { type: "blob" }));
                    downloadLink.setAttribute("download", filename);
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    this.notification.warning("Import không thành công! bạn vui lòng kiểm tra lại file TempInsuranceError.xlsx!");
                  }
                }
              }
            });

        }
      }
      else {
        this.modalService.close("confirm-import-modal");
      }

    }
  };

  confirmDelete = (status: any): void => {
    if (status === "cancel") {
      this.modalService.close("confirm-delete-modal");
    } else {
      let lstDeleteIds = _.map(this.modelDelete, "id");
      if (lstDeleteIds.length > 0) {
        this._coreService
          .Post("hr/inschange/Remove", lstDeleteIds)
          .subscribe((success: any) => {
            if (success.statusCode == "200") {
              this.notification.deleteSuccess();
              this.modalService.close("confirm-delete-modal");
              this.gridInstance.clearSelection();
              this.gridInstance.refresh();
            }
            else {
              this.notification.deleteError();
              this.modalService.close("confirm-delete-modal");
            }
          });
      }
    }
  };

  // disbale button chon nhieu ban ghi
  setButtonStatus = (event: any) => {
    if (!this.button) {
      this.button = setTimeout(() => {
        // đếm số bản ghi select
        const rowSelects = this.gridInstance.getSelectedRecords();
        const rowSelectCounts = rowSelects.length;
        // Nếu count > 1 thì disable toolbar
        if (rowSelectCounts > 1) {
          for (let i = 0; i < this.toolbar.length; i++) {
            //disable sửa
            if (this.toolbar[i].id === ToolbarItem.EDIT) {
              this.toolbar[i].isDisable = true;
            }
          }
        } else {
          for (let i = 0; i < this.toolbar.length; i++) {
            // enabled sửa
            if (this.toolbar[i].id === ToolbarItem.EDIT) {
              this.toolbar[i].isDisable = false;
            }
          }
        }
      }, 200);
    }
  };
}
