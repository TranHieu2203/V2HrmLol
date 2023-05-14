using Common.Extensions;
using Common.Repositories;
using AttendanceDAL.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Common.EPPlus;

namespace AttendanceDAL.Repositories
{
    public class ReportRepository : TLARepository, IReportRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public ReportRepository(AttendanceDbContext context) : base(context)
        {

        }

        public async Task<ResultWithError> AT002(ParaInputReport param)
        {
            try
            {
                var r =  QueryData.ExecuteStoreToTable("PKG_REPORT.RPT_AT002",
                new
                {
                    P_ORG_ID = param.OrgId,
                    P_PERIOD_ID = param.PeriodId,
                    P_CUR = QueryData.OUT_CURSOR,
                    P_CUR_TITLE = QueryData.OUT_CURSOR
                }, true);

                if (r.Tables[0].Rows.Count <= 0)
                {
                    return new ResultWithError("DATA_EMPTY");
                }
                r.Tables[0].TableName = "Data";
                r.Tables[1].TableName = "Title";
                var pathTemp = _appContext._config["urlAT002"];
                var memoryStream = Template.FillReport(pathTemp, r);
                return new ResultWithError(memoryStream);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> AT003(ParaInputReport param)
        {
            try
            {
                var r = QueryData.ExecuteStoreToTable("PKG_REPORT.RPT_AT003",
                new
                {
                    P_ORG_ID = param.OrgId,
                    P_PERIOD_ID = param.PeriodId,
                    P_CUR = QueryData.OUT_CURSOR,
                    P_CUR_TITLE = QueryData.OUT_CURSOR
                }, true);

                if (r.Tables[0].Rows.Count <= 0)
                {
                    return new ResultWithError("DATA_EMPTY");
                }
                r.Tables[0].TableName = "Data";
                r.Tables[1].TableName = "Title";                
                var pathTemp = _appContext._config["urlAT003"];
                var memoryStream = Template.FillReport(pathTemp, r);
                return new ResultWithError(memoryStream);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }
    }
}
