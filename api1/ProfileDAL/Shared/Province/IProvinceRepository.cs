using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IProvinceRepository : IRepository<Province>
    {
        Task<PagedResult<ProvinceDTO>> GetAll(ProvinceDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> CreateAsync(ProvinceInputDTO param);
        Task<ResultWithError> UpdateAsync(ProvinceInputDTO param);
        Task<ResultWithError> ChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetListProvince();
        Task<PagedResult<DistrictDTO>> DistrictGetAll(DistrictDTO param);
        Task<ResultWithError> DistrictById(int id);
        Task<ResultWithError> DistrictCreateAsync(DistrictInputDTO param);
        Task<ResultWithError> DistrictUpdateAsync(DistrictInputDTO param);
        Task<ResultWithError> DistrictChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetListDistrict(int ProvinceId);
        Task<PagedResult<WardDTO>> WardGetAll(WardDTO param);
        Task<ResultWithError> WardCreateAsync(WardInputDTO param);
        Task<ResultWithError> WardUpdateAsync(WardInputDTO param);
        Task<ResultWithError> WardChangeStatusAsync(List<int> ids);
        Task<ResultWithError> GetListWard(int DistrictId);
    }
}
