using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Dynamic;

namespace AttendanceDAL.Repositories
{
    public interface IWorkSignRepository : IRepository<WorkSign>
    {
        Task<PagedResult<ExpandoObject>> GetAll(WorkSignDTO param);
        //Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(WorkSignInputDTO param);
        Task<ResultWithError> UpdateAsync(WorkSignInputDTO param);
        //Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> Delete(WorkSignDeleteDTO param);
        Task<ResultWithError> ImportTimeSort(List<ImportExcelDTO> param, int type);
        Task<ResultWithError> TemplateExport(ExportTemplateDTO param);
        Task<ResultWithError> ImportTimeSortNew(ImportWorkSignParam param);
    }
}
