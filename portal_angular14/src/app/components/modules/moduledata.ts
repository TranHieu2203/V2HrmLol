import { IModule } from "./modules.component"

import { ArchiveComponent } from "src/app/business-modules/workplace/archive/archive.component"
import { WorkComponent } from "src/app/business-modules/workplace/work/work.component"
import { ProcessComponent } from "src/app/business-modules/workplace/process/process.component"
import { DocumentComponent } from "src/app/business-modules/workplace/document/document.component"
import { ScheduleComponent } from "src/app/business-modules/workplace/schedule/schedule.component"
import { ESignComponent } from "src/app/business-modules/workplace/esign/esign.component"

import { ApplicationComponent } from "src/app/business-modules/hrm/application/application.component"
import { AssetComponent } from "src/app/business-modules/hrm/asset/asset.component"
import { RecruitmentComponent } from "src/app/business-modules/hrm/recruitment/recruitment.component"
import { PersonnelComponent } from "src/app/business-modules/hrm/personnel/personnel.component"
import { TimecheckComponent } from "src/app/business-modules/hrm/timecheck/timecheck.component"
import { PayrollComponent } from "src/app/business-modules/hrm/payroll/payroll.component"
import { KpiComponent } from "src/app/business-modules/hrm/kpi/kpi.component"
import { TrainingComponent } from "src/app/business-modules/hrm/training/training.component"

import { MarketingComponent } from "src/app/business-modules/crm/marketing/marketing.component"
import { CustomerCareComponent } from "src/app/business-modules/crm/customer-care/customer-care.component"
import { SaleComponent } from "src/app/business-modules/crm/sale/sale.component"
import { RevenueExpendComponent } from "src/app/business-modules/crm/revenue-expend/revenue-expend.component"
import { WarehouseComponent } from "src/app/business-modules/crm/warehouse/warehouse.component"
import { PurchaseComponent } from "src/app/business-modules/crm/purchase/purchase.component"

import { SupportComponent } from "src/app/business-modules/advance/support/support.component"
import { MarketComponent } from "src/app/business-modules/advance/market/market.component"
import { ReportComponent } from "src/app/business-modules/advance/report/report.component"
import { AutomationComponent } from "src/app/business-modules/advance/automation/automation.component"
import { OpenApiComponent } from "src/app/business-modules/advance/open-api/open-api.component"
import { CloudsComponent } from "src/app/business-modules/advance/clouds/clouds.component"

export const moduledata: IModule[] = [
    {
        index: 0,
        code: 'WORKPLACE',
        businessModule: 'Workplace',
        tooltip: 'WORKPLACE',
        routerLink: 'workplace-center',
        features: [
            {
                code: 'Tài liệu',
                tooltip: 'Tài liệu',
                component: ArchiveComponent,
                iconClass: 'feather-folder',
                routerLink: 'archive',
            },
            {
                code: 'Công việc',
                tooltip: 'Công việc',
                component: WorkComponent,
                iconClass: 'feather-briefcase',
                routerLink: 'work',
            },
            {
                code: 'Quy trình',
                tooltip: 'Quy trình',
                component: ProcessComponent,
                iconClass: 'feather-play',
                routerLink: 'process',
            },
            {
                code: 'Văn bản',
                tooltip: 'Văn bản',
                component: DocumentComponent,
                iconClass: 'feather-file',
                routerLink: 'document',
            },
            {
                code: 'Lịch biểu',
                tooltip: 'Lịch biểu',
                component: ScheduleComponent,
                iconClass: 'feather-calendar',
                routerLink: 'schedule',
            },
            {
                code: 'Ký số',
                tooltip: 'Ký số',
                component: ESignComponent,
                iconClass: 'feather-check',
                routerLink: 'esign',
            },
        ]
    },
    {
        index: 1,
        code: 'HRM',
        businessModule: 'Hrm',
        tooltip: 'QUẢN TRỊ NHÂN LỰC',
        routerLink: 'hrm-center',
        features: [
            {
                code: 'Đơn từ',
                tooltip: 'Đơn từ',
                component: ApplicationComponent,
                iconClass: 'feather-file',
                routerLink: 'application',
            },
            {
                code: 'Tài sản',
                tooltip: 'Tài sản',
                component: AssetComponent,
                iconClass: 'feather-dollar-sign',
                routerLink: 'asset',
            },
            {
                code: 'Tuyển dụng',
                tooltip: 'Tuyển dụng',
                component: RecruitmentComponent,
                iconClass: 'feather-user-plus',
                routerLink: 'recruitment',
            },
            {
                code: 'Nhân sự',
                tooltip: 'Nhân sự',
                component: PersonnelComponent,
                iconClass: 'feather-users',
                routerLink: 'personnel',
            },
            {
                code: 'Chấm công',
                tooltip: 'Chấm công',
                component: TimecheckComponent,
                iconClass: 'feather-user-check',
                routerLink: 'timecheck',
            },
            {
                code: 'Bảng lương',
                tooltip: 'Bảng lương',
                component: PayrollComponent,
                iconClass: 'feather-dollar-sign',
                routerLink: 'payroll',
            },
            {
                code: 'KPI',
                tooltip: 'KPI',
                component: KpiComponent,
                iconClass: 'feather-list',
                routerLink: 'kpi',
            },
            {
                code: 'Đào tạo',
                tooltip: 'Đào tạo',
                component: TrainingComponent,
                iconClass: 'feather-sunrise',
                routerLink: 'training',
            },
        ]
    },
    {
        index: 2,
        code: 'CRM',
        businessModule: 'Crm',
        tooltip: 'QUẢN LÝ QUAN HỆ KHÁCH HÀNG',
        routerLink: 'crm-center',
        features: [
            {
                code: 'Marketing',
                tooltip: 'Marketing',
                component: MarketingComponent,
                iconClass: 'feather-volume-2',
                routerLink: 'marketing',
            },
            {
                code: 'CSKH',
                tooltip: 'CSKH',
                component: CustomerCareComponent,
                iconClass: 'feather-gift',
                routerLink: 'customercare',
            },
            {
                code: 'Bán hàng',
                tooltip: 'Bán hàng',
                component: SaleComponent,
                iconClass: 'feather-shopping-bag',
                routerLink: 'sale',
            },
            {
                code: 'Thu chi',
                tooltip: 'Thu chi',
                component: RevenueExpendComponent,
                iconClass: 'feather-percent',
                routerLink: 'revenue-expend',
            },
            {
                code: 'Kho hàng',
                tooltip: 'Kho hàng',
                component: WarehouseComponent,
                iconClass: 'feather-map-pin',
                routerLink: 'warehouse',
            },
            {
                code: 'Mua hàng',
                tooltip: 'Mua hàng',
                component: PurchaseComponent,
                iconClass: 'feather-truck',
                routerLink: 'purchase',
            },
        ]
    },
    {
        index: 3,
        code: 'ADVANCE',
        businessModule: 'Advance',
        tooltip: 'NÂNG CAO',
        routerLink: 'advance-center',
        features: [
            {
                code: 'Hỗ trợ',
                tooltip: 'Hỗ trợ',
                component: SupportComponent,
                iconClass: 'feather-help-circle',
                routerLink: 'support',
            },
            {
                code: 'Market',
                tooltip: 'Market',
                component: MarketComponent,
                iconClass: 'feather-flag',
                routerLink: 'market',
            },
            {
                code: 'Báo cáo',
                tooltip: 'Báo cáo',
                component: ReportComponent,
                iconClass: 'feather-pie-chart',
                routerLink: 'report',
            },
            {
                code: 'Tự động',
                tooltip: 'Tự động',
                component: AutomationComponent,
                iconClass: 'feather-play-circle',
                routerLink: 'automation',
            },
            {
                code: 'Open API',
                tooltip: 'Open API',
                component: OpenApiComponent,
                iconClass: 'feather-database',
                routerLink: 'openapi',
            },
            {
                code: 'Clouds',
                tooltip: 'Clouds',
                component: CloudsComponent,
                iconClass: 'feather-cloud',
                routerLink: 'cloud',
            },
        ]
    },
]