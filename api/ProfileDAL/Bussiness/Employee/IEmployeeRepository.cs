using Common.BaseRequest;
using Common.Extensions;
using Common.Interfaces;
using Common.Paging;
using ProfileDAL.Models;
using ProfileDAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProfileDAL.Repositories
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<PagedResult<EmployeeDTO>> GetAll(EmployeeDTO param);
        Task<PagedResult<EmployeeDTO>> GetEmployeeList(EmployeeDTO param);
        Task<ResultWithClientError> UpdateEmployee(EmployeeInput param);
        Task<ResultWithClientError> GetOtherListById(BaseRequest request);
        Task<ResultWithClientError> GetEmployeeById(BaseRequest request);
        Task<ResultWithClientError> GetEmployeeInfo();
        Task<ResultWithClientError> GetContractInfo();
        Task<PagedResults<ContractDTO>> GetContractList(ContractDTO param);
        Task<ResultWithClientError> GetContractById(BaseRequest request);
        Task<PagedResults<BankDTO>> GetBankList(BankDTO param);
        Task<ResultWithClientError> GetBankById(BaseRequest request);
        Task<PagedResults<PositionViewDTO>> GetPositionList(PositionViewDTO param);
        Task<ResultWithClientError> GetPositionById(BaseRequest request);
        Task<PagedResults<ProvinceDTO>> GetProvinceList(ProvinceDTO param);
        Task<ResultWithClientError> GetProvinceById(BaseRequest request);
        Task<PagedResults<DistrictDTO>> GetDistrictList(DistrictDTO param);
        Task<ResultWithClientError> GetDistrictById(BaseRequest request);
        Task<PagedResults<WardDTO>> GetWardlist(WardDTO param);
        Task<ResultWithClientError> GetWardById(BaseRequest request);
        Task<ResultWithClientError> GetCommendInfo();
        Task<ResultWithClientError> GetDisciplineInfo();
        Task<ResultWithClientError> GetInschangeInfo();
        Task<ResultWithClientError> GetWorkingInfo();
        Task<ResultWithError> EmployeeEdit(EmployeeEditInput param);
        Task<ResultWithError> EmployeePassportEdit(EmployeePassportDTO param);
        Task<ResultWithError> EmployeeMainInfoEdit(EmployeeMainInfoDTO param);
        Task<ResultWithError> EmployeeInfoEdit(EmployeeInfoDTO param);
        Task<ResultWithError> EmployeeAddressEdit(EmployeeAddressDTO param);
        Task<ResultWithError> EmployeeCurAddressEdit(EmployeeCurAddressDTO param);
        Task<ResultWithError> EmployeeContactInfoEdit(EmployeeContactInfoDTO param);

        Task<ResultWithError> EmployeeVisaEdit(EmployeeVisaDTO param);
        Task<ResultWithError> EmployeeEducationEdit(EmployeeEducationDTO param);
        Task<ResultWithError> EmployeeCertificateEdit(EmployeeCertificateDTO param);
        Task<ResultWithError> EmployeeWorkPermitEdit(EmployeeWorkPermitDTO param);
        Task<ResultWithError> EmployeeBankEdit(EmployeeBankDTO param);

        Task<ResultWithClientError> GetEmployeeFamily();
        Task<ResultWithClientError> GetListEmployeePaper();

        Task<PagedResults<OtherListDTO>> GetOtherListByType(OtherListDTO param);

        /// <summary>
        /// get list situation of employee
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> ListSituation(long EmpId);
        Task<ResultWithError> RemoveRelation(int id);
        /// <summary>
        /// add situation
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> CreateSituation(SituationDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(EmployeeInput param);
        Task<ResultWithError> UpdateAsync(EmployeeInput param);
        Task<ResultWithError> GetList();
        Task<ResultWithError> GetListByOrg(int OrgId);
        Task<ResultWithError> PortalGetBy(int type);
        Task<ResultWithError> PortalGetFamily();
        Task<ResultWithError> GetInfo();
        Task<ResultWithError> GetInforContract(long Id);
        /// <summary>
        /// Get employee cho màn hình nghỉ việc, cần thông tin hợp đồng
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<ResultWithError> GetInforLeaveJob(long Id);
        Task<ResultWithError> GetEmpAlowance(List<long> Ids);
        Task<ResultWithError> GetListEmpToImport();
        Task<ResultWithError> ImportProfile(EmpImportParam param);
        Task<PagedResult<EmpPopupDTO>> GetListPopup(EmpPopupDTO param);
        Task<ResultWithError> TemplateImport();
        Task<ResultWithError> Delete(List<int> Ids);
        Task<ResultWithError> GetListPaper(int EmpId);
        Task<ResultWithError> CreatePaperAsync(PaperInput param);
        Task<PagedResult<EmployeePopup>> GetPopup(EmployeePopup param);
        Task<ResultWithError> PortalContactBook(string name);
        Task<ResultWithError> PortalGetContact(int EmpId);
        Task<ResultWithError> ScanQRCode();

        Task<ResultWithError> PortalEditInfomation(EmployeeEditInput param);
        Task<ResultWithError> PortalAddSituation(SituationEditDTO param);
        Task<PagedResult<EmployeeEditDTO>> GetAllProfileEdit(EmployeeEditDTO param);
        Task<PagedResult<FamilyEditDTO>> GetAllFamilyAdd(FamilyEditDTO param);
        Task<ResultWithError> EditInfomationBy(int id);
        Task<ResultWithError> ApproveProfileEdit(int id, int type);
    }
}
