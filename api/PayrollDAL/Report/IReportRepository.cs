using Common.Extensions;
using PayrollDAL.ViewModels;
using System.Threading.Tasks;


namespace PayrollDAL.Repositories
{
    public interface IReportRepository 
    {
        Task<ResultWithError> PA001(ParaInputReport param);
        Task<ResultWithError> PA002(ParaInputReport param);
        Task<ResultWithError> ThuNhapBinhQuan(int? orgId);
        Task<ResultWithError> CoCauNhanSu(CCNSParam param);
        Task<ResultWithError> TongHopQuyLuong(CCNSParam param);

    }
}
