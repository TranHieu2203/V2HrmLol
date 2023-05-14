using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Threading.Tasks;
using System.Dynamic;

namespace AttendanceDAL.Repositories
{
    public interface ITimeSheetDailyRepository : IRepository<TimeSheetDaily>
    {
        Task<PagedResult<ExpandoObject>> GetAll(TimeSheetDailyDTO param);

        Task<ResultWithError> UpdateAsync(TimeSheetDailyInputDTO param);
        /// <summary>
        /// Tông hợp công gốc sang công daily và swipe lai data 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> CalTimesheetDaily(TimeSheetInputDTO param);
        /// <summary>
        /// Portal Get By Id
        /// </summary>
        /// <param name="periodId"></param>
        /// <returns></returns>
        Task<ResultWithError> PortalGetBY(int periodId);

        /// <summary>
        /// Tenant ScanCode User
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> TenantUpTime(SwipeDataTenantDTO param);
        /// <summary>
        /// Chấm công qua GPRS
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<ResultWithError> PortalUpTimeGPRS(SwipeDataGPRSDTO param);
        Task<ResultWithError> PortalUpTimeGPRS_ERROR(SwipeDataGPRSDTO param);
        string GetWifiMac();
        Task<ResultWithError> MapKeeping(paramSearch param);
        Task<ResultWithError> CheckDistance(double lat1, double long1);
        bool CheckDistanceIP(string ip);
        Task<ResultWithError> CheckWifi(string wifi);
        Task<ResultWithError> CheckQRCode(string code, string ip);
        /// <summary>
        /// V2
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<PagedResult<ExpandoObject>> V2GetAll(TimeSheetDailyDTO param);

    }
}
