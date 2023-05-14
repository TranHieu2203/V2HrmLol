import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
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
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { IpServiceService } from "src/app/_services/ip-service.service";

const _ = require("lodash");
import { TreeViewComponent } from "@syncfusion/ej2-angular-navigations";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-angular-inputs";
import { DataManager, Query, Predicate } from "@syncfusion/ej2-data";
setCulture("en");

@Component({
  selector: "cms-app-groupuserpermission",
  templateUrl: "./groupuserpermission.component.html",
  styleUrls: ["./groupuserpermission.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class GroupUserPermissionComponent implements OnInit {

  toolItems$ = new BehaviorSubject<any[]>([
    ToolbarItem.SAVE
  ])

  // Varriable Language
  languages: any;
  selectedLanguage: any;

  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;

  @ViewChild("treeView", { static: false })
  public treeView!: TreeViewComponent;

  @ViewChild("listTreeObj", { static: true })
  public listTreeObj!: TreeViewComponent;
  @ViewChild("maskObj", { static: true })
  public maskObj!: MaskedTextBoxComponent;
  localData = [];
  public field = {};

  public dataUserOrg: Object[] = [];
  public field2: Object = {
    dataSource: this.dataUserOrg,
    id: "ID",
    parentID: "PARENT_ID",
    text: "NAME",
    hasChildren: "HAS_CHILD",
    isChecked: "IS_CHECKED",
  };
  // set the CheckBox to the TreeView
  public showCheckBox: boolean = true;
  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  // Khai báo data
  public data!: any[];

  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;
  nodeSelected: any;
  tab: number = 1;

  /**
   * Constructor
   *
   */
  constructor(
    private _coreService: CoreService,
    private notification: Notification,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private ip: IpServiceService,
    private _tlaTranslationLoaderService: TranslationLoaderService
  ) {
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
    this.getListData();
    this.getTenantUser().then((res: any) => {
      this.localData = res.data;
      this.changeDataSource(this.localData);
    });
    this.GetUserOrg().then((res: any) => {
      this.dataUserOrg = res;
      this.field2 = {
        dataSource: this.dataUserOrg,
        id: "ID",
        parentID: "PARENT_ID",
        text: "NAME",
        hasChildren: "HAS_CHILD",
        expanded: "EXPAND",
      };
    });
  }
  check(e: any, field: string, event: any) {
    let index = _.findIndex(this.data, (item: any) => {
      return item.functionId == e.functionId;
    });
    if (index > -1) {
      this.data[index][field] = event.checked;
      if(!event.checked){
        this.data[index].isAll = false;
        this.gridInstance.refreshColumns();
      }
      if(field == "isAll")
      {
        var newData = Object.assign({}, (this.gridInstance.dataSource as any)[index]);
        this.data[index] = newData;
        newData.isView = event.checked;
        newData.isAdd = event.checked;
        newData.isEdit = event.checked;
        newData.isDelete = event.checked;
        newData.isApproved = event.checked;
        newData.isLock = event.checked;
        newData.isSum = event.checked;
        newData.isCal = event.checked;
        newData.isImport = event.checked;
        newData.isExport = event.checked;
        this.gridInstance.setRowData(index,newData)
        this.gridInstance.updateRow(index,newData);
        this.gridInstance.refreshColumns();
      }
    }
  }
  userSelecting(e: any) {
    this.nodeSelected = e.nodeData.id;
    this.getListData(this.nodeSelected);
    this.getPermissionSelect(this.nodeSelected).then((res: any) => {
      this.treeView.checkedNodes = res.map((i: any) => i.toString());
    });
  }
  getPermissionSelect(id: any) {
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/Setting/ListGroupPermission?Id=" + id)
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  getTenantUser() {
    return new Promise((resolve) => {
      this._coreService.Get("tenant/group/GetListGroup").subscribe((res: any) => {
        resolve(res);
      });
    });
  }
  GetUserOrg() {
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/Organization/GetOrgPermission")
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  changetab(id: any) {
    this.tab = id;
  }
  //Filtering the TreeNodes
  public searchNodes(args: any) {
    let _text = this.maskObj.element.value;
    let predicats = [],
      _array = [],
      _filter = [];
    if (_text == "") {
      this.changeDataSource(this.localData);
    } else {
      let predicate = new Predicate("name", "contains", _text, true);
      let filteredList = new DataManager(this.localData).executeLocal(
        new Query().where(predicate)
      );
      for (let j = 0; j < filteredList.length; j++) {
        _filter.push((filteredList[j] as any)["id"]);
        let filters = this.getFilterItems(filteredList[j], this.localData);
        for (let i = 0; i < filters.length; i++) {
          if (_array.indexOf(filters[i]) == -1 && filters[i] != null) {
            _array.push(filters[i]);
            predicats.push(new Predicate("id", "equal", filters[i], false));
          }
        }
      }
      if (predicats.length == 0) {
        this.changeDataSource([]);
      } else {
        let query = new Query().where(Predicate.or(predicats));
        let newList = new DataManager(this.localData).executeLocal(query);
        this.changeDataSource(newList);
        let proxy = this;
        setTimeout(function (this: any) {
          proxy.listTreeObj.expandAll();
        }, 100);
      }
    }
  }
  //Find the Parent Nodes for corresponding childs
  public getFilterItems(fList: any, list: any): any {
    let nodes = [];
    nodes.push(fList["id"]);
    let query2 = new Query().where("id", "equal", fList["pid"], false);
    let fList1 = new DataManager(list).executeLocal(query2);
    if (fList1.length != 0) {
      let pNode = this.getFilterItems(fList1[0], list);
      for (let i = 0; i < pNode.length; i++) {
        if (nodes.indexOf(pNode[i]) == -1 && pNode[i] != null)
          nodes.push(pNode[i]);
      }
      return nodes;
    }
    return nodes;
  }
  public changeDataSource(data: any) {
    this.listTreeObj.fields = {
      dataSource: data,
      id: "id",
      text: "name",
      parentID: "pid",
      hasChildren: "hasChild",
    };
  }

  getListData = (id?: any): void => {
    const state = { skip: 0, take: 100 };
    let extraParams: any[] = [];
    if (id) {
      extraParams.push({
        field: "userGroupId",
        value: id,
      });
    }
    this._coreService
      .GetAll(state, "tenant/grouppermission/GridFuntion", extraParams)
      .subscribe((res: any) => {
        this.data = res.result;
        this.gridInstance.pageSettings.totalRecordsCount = res.count;
      });
  };

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.pageIndex = Math.floor(state.skip! / state.take!);
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
    switch (buttonId) {
      case ToolbarItem.EDIT:
        break;
      case ToolbarItem.SAVE:
        if (!this.nodeSelected) {
          this.notification.warning("Chưa chọn nhóm tài khoản");
          return;
        }
        if (this.tab == 1) {
          let y = this.data.map((item: any) => {
            return {
              groupId: item.userGroupId,
              functionId: item.functionId,
              permissionString:
                (item.isView ? "VIEW," : "") +
                (item.isAdd ? "ADD," : "") +
                (item.isEdit ? "EDIT," : "") +
                (item.isDelete ? "DELETE," : "") +
                (item.isLock ? "LOCK," : "") +
                (item.isSum ? "AT_SUM," : "") +
                (item.isCal ? "PA_CAL," : "") +
                (item.isImport ? "IMPORT," : "") +
                (item.isExport ? "EXPORT," : "") +
                (item.isAll ? "ALL," : ""),
                
            };
          });
          this._coreService
            .Post("tenant/grouppermission/Update", y)
            .subscribe((res: any) => {
              if (res.statusCode == 400) {
                this.notification.checkErrorMessage(res.message);
              } else {
                this.notification.editSuccess();
              }
            });
        } else if (this.tab == 2) {
          let checkIds = Object.assign(
            [],
            this.treeView.checkedNodes.map((i: any) => Number(i))
          );
          if (checkIds.length > 0) {
            checkIds.forEach((id) => {
              let p;
              findParent(null, id, this.dataUserOrg);
              function findParent(parentId?: any, findId?: any, array?: any) {
                if (array && array.length > 0) {
                  array.forEach((element: any) => {
                    if (element.id == findId && parentId) {
                      p = parentId;
                    }
                  });
                  array.forEach((element: any) => {
                    findParent(element.id, id, element.child);
                  });
                }
              }
              if (p && checkIds.indexOf(p) == -1) {
                checkIds.push(p);
              }
            });
          }
          let a = {
            GroupId: this.nodeSelected,
            OrgIds: checkIds,
          };

          this._coreService
            .Post("hr/Setting/UpdateGroup", a)
            .subscribe((res: any) => {
              if (res.statusCode == 400) {
                this.notification.checkErrorMessage(res.message);
              } else {
                this.notification.editSuccess();
              }
            });
        }

        break;

      default:
        break;
    }
  };
}
