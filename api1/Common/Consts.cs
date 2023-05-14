namespace Common.Extensions
{
    public class Consts
    {
        public const int PAGE_SIZE = 20;
        public const int TRIAL = 7;
        public const int APPLICATION_SYSTEM = 1;
        public const string STATUS_CODE_400 = "400";
        public const string APP_NOT_EXISTS = "APPLICATION_NOT_EXISTS";
        public const string CODE_EXISTS = "CODE_EXISTS";
        public const string PACKAGE_NOT_EXISTS = "PACKAGE_NOT_EXISTS";
        public const string MODULE_NOT_EXISTS = "MODULE_NOT_EXISTS";
        public const string GROUP_FUNC_NOT_EXISTS = "GROUP_FUNC_NOT_EXISTS";
        public const string ID_NOT_FOUND = "ID_NOT_FOUND";


        public const int REGISTER_OFF = 2;
        public const int REGISTER_OT = 1;
        public const int REGISTER_LATE = 3;
        public const int REGISTER_ROOM = 4;
        public const int REGISTER_NEW = 0;
        public const int ACTION_CREATE = 1; // TẠO
        public const int ACTION_APPROVE = 2; // PHÊ DUYỆT
        public const int ACTION_DENIED = 3; // TỪ CHỐI

        public const string ALLOWANCE = "PC"; // code nhóm element phụ cấp
        public const string DATA_KPI = "DATA_KPI"; // code nhóm element phụ cấp

    }

    public class SysERP
    {
        public const string HR = "GOHR";
        public const int GoHR = 1;
    }

    public class SystemConfig
    {
        public const string OTHER_AREA = "AREAS";
        public const string PA_ELEMENT_GROUP = "PA_ELEMENT_GROUP";

        public const string APPLICATION = "APPLICATION";
        public const string ALLOWANCE_TYPE = "ALLOWANCE_TYPE";
        public const string SERVER = "SERVER";
        public const string STATUS_EMPLOYEE = "STATUS_EMPLOYEE";
        public const string STATUS_APPROVE = "STATUSAPPROVE";
        public const string STATUS_BHXH = "STATUS_BHXH";
        public const string OBJECT_COMMEND = "OBJECT_COMMEND";// Đối tượng khen thưởng xử phạt
        public const string SOURCE_COST = "SOURCE_COST";//Nguồn chi

        public const string SETTING_REMIND = "SETTING_REMIND";// thiet lap loi nhac
        public const string EMP_EXPIRE_CONTRACT = "EMP_EXPIRE_CONTRACT";// TNhan vien het han hop dong
        public const string EMP_BIRTH_DAY = "EMP_BIRTH_DAY";// Nhan vien sap den sinh nhat
        public const string EMP_REGISTER_CONTRACT = "EMP_REGISTER_CONTRACT";// Nhan vien chua lam hop dong
        public const string EMP_REGISTER_WORKING = "EMP_REGISTER_WORKING";// Nhan vien chua lam quyet dinh
        public const string EMP_METTTING_ROOM = "EMP_METTTING_ROOM";// Đặt phòng hợp
        public const string EMP_PAPER = "EMP_PAPER";// Thiếu giấy tờ cần nôpj
        public const string RESIDENT = "RESIDENT";// Đối tượng thường trú
        public const string PA_3P_EXCHANGE = "PA_3P_EXCHANGE";// quy đổi bảng lương 3p
        public const string LEARNING_LEVEL = "LEARNING_LEVEL";// quy đổi bảng lương 3p
        public const string PAPER = "PAPER";// quy đổi bảng lương 3p
        public const string NO_IMG = "http://gohr.vn:6868/upload/gohr/profile/no-img_100002130320211.png";
    }

    public class OtherListConst
    {
        public const string GENDER = "GENDER";
        public const string RELATION = "RELATION"; // quan hệ nhân thân
        public const string FAMILY_STATUS = "FAMILY_STATUS"; //Tình trạng gia đình
        public const string MAJOR = "MAJOR"; //Trình độ chuyên môn
        public const string GRADUATE_SCHOOL = "GRADUATE_SCHOOL"; //Trường đào tạo
        public const string LEARNING_LEVEL = "LEARNING_LEVEL"; //Trình độ học vấn
        public const string TRAINING_FORM = "TRAINING_FORM"; //Hình thức đào tạo
        public const string RULE_SPACING = "RULE_SPACING"; // nguyên tắc giãn 3p
        public const string TYPE_DECISION = "TYPE_DECISION"; // Loại quyết định
        public const string NATION = "NATION"; //Dân tộc
        public const string NATIONALITY = "NATIONALITY"; // Quốc tịch
        public const string RELIGION = "RELIGION"; // Tôn giáo
        public const string OBJECT_ORG = "OBJECT_ORG"; // Tôn giáo
        public const string OBJECT_EMP = "OBJECT_EMP"; // Tôn giáo
        public const string INS_REGION = "INS_REGION"; // Vùng
        public const string INS_UNIT = "INS_UNIT"; // Đơn vị bảo hiểm
    }
    public class OtherConfig
    {

        //Đối tượng khen thưởng xử phạt
        public const int OBJECT_ORG = 1;
        public const int OBJECT_EMP = 2;

        //Nguôn chi
        public const int SOURCE_COMPANY_FUNDS = 1;//Quỹ công ty


        public const int STATUS_WAITING = 1;
        public const int STATUS_APPROVE = 2;
        public const int STATUS_DECLINE = 3;

        // Khen thưởng
        public const int COMMEND_PERSIONAL = 0;
        public const int COMMEND_COLLECTIVE = 1;
        // Kỷ luật
        public const int DISCIPLINE_PERSIONAL = 0;
        public const int DISCIPLINE_COLLECTIVE = 1;
        // Trạng thái nhân viên
        public const int EMP_STATUS_WORKING = 1;
        public const int EMP_STATUS_MATERNITY = 3;
        public const int EMP_STATUS_TERMINATE = 2;
        // Sắp xếp
        public const int SORT_FML_PAYROLL = 1; // SẮP XẾP CÔNG THỨC LƯƠNG
        public const int SORT_FML_KPI = 2; // SẮP XẾP CÔNG THỨC KPI
        public const int SORT_FML_STRUCT = 3; // SẮP XẾP THÔNG TIN KẾT CẤU BẢNG LƯƠNG

    }
    public class Message
    {
        public const string OBJECT_COMMEND_NOTE_EXIST = "OBJECT_COMMEND_NOTE_EXIST";
        public const string ORG_NOT_EXIST = "ORG_NOT_EXIST";
        public const string EMP_NOT_EXIST = "EMP_NOT_EXIST";
        public const string POSITION_NOT_EXIST = "POSITION_NOT_EXIST";
        public const string CODE_EXIST = "CODE_EXIST";
        public const string SIGNER_NOT_EXIST = "SIGNER_NOT_EXIST";
        public const string STATUS_NOT_EXIST = "STATUS_NOT_EXIST";
        public const string STATUS_BHXH_NOT_EXIST = "STATUS_BHXH_NOT_EXIST";
        public const string RECORD_IS_APPROVED = "RECORD_IS_APPROVED";
        public const string RECORD_NOT_FOUND = "RECORD_NOT_FOUND";
        public const string TIME_SHEET_DAILY_NOT_EXIST = "TIME_SHEET_DAILY_NOT_EXIST";
        public const string TIME_SHEET_LOCKED = "TIME_SHEET_LOCKED"; // bang cong da khoa
        public const string TIME_SHEET_UNLOCKED = "TIME_SHEET_UNLOCKED"; // bang cong  chua khoa
        public const string TYPE_NOT_EXIST = "TYPE_NOT_EXIST";
        public const string INVALID_FORMULA = "INVALID_FORMULA"; // sai cong thuc
        public const string RELATION_SHIP_NOT_EXIST = "RELATION_SHIP_NOT_EXIST"; // Không tồn tại quan hệ
        public const string EXPIRE_DATE = "EXPIRE_DATE"; // Hết hạn trả lời bình chọn câu hỏi
        public const string NOT_MULTIPLE = "NOT_MULTIPLE"; // Không được bình chọn nhiều
        public const string NOT_ADD_ANSWER = "NOT_ADD_ANSWER"; // Không được bình chọn nhiều

        public const string DATA_IS_USED = "DATA_IS_USED";
        public const string DATE_IS_EXISTS = "DATE_IS_EXISTS";
        public const string DATA_IS_EXISTS = "DATA_IS_EXISTS";
        public const string DAY_YEAR_NOT_ENOUGH = "DAY_YEAR_NOT_ENOUGH";    
    }
}
