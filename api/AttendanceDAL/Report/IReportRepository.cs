using Common.Extensions;
using System.Threading.Tasks;


namespace AttendanceDAL.Repositories
{
    public interface IReportRepository 
    {
        Task<ResultWithError> AT002(ParaInputReport param);
        Task<ResultWithError> AT003(ParaInputReport param);
    }
}
