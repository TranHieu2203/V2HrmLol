using ProfileDAL.ViewModels;
using ProfileDAL.Models;
using Common.Interfaces;
using Common.Paging;
using Common.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProfileDAL.Repositories
{
    public interface IBookingRepository : IRepository<Booking>
    {
        Task<PagedResult<BookingDTO>> GetAll(BookingDTO param);
        Task<ResultWithError> GetById(int id);
        Task<ResultWithError> PortalReg(BookingInputDTO param);
        Task<ResultWithError> PortalEditReg(BookingInputDTO param);
        Task<ResultWithError> PortalDelete(int id);
        Task<ResultWithError> ChangeStatusAsync(int id, int statusId, string note);
        Task<ResultWithError> PortalMyList();
        Task<ResultWithError> PortalListByRoom(BookingDTO param);
        Task<ResultWithError> PortalGetBy(int id);
    }
}
