using System.Threading.Tasks;
using PayrollDAL.EntityFrameworkCore;
using PayrollDAL.ViewModels;
using PayrollDAL.Models;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace PayrollDAL.Repositories
{
    public class TempSortRepository : TLARepository<KpiFormula>
    {
        private PayrollDbContext _appContext => (PayrollDbContext)_context;
        public TempSortRepository(PayrollDbContext context) : base(context)
        {

        }
        

        /// <summary>
        /// CMS Edit Data for System
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(List<TempSortInputDTO> param, int type)
        {
            try
            {
                var lst = new List<SysTempSort>();
                foreach (var item in param)
                {
                    var data = Map<TempSortInputDTO, SysTempSort>(item, new SysTempSort());
                    //data.TYPE_ID = type;
                    //
                    lst.Add(data);
                }

                await _appContext.SysTempSorts.AddRangeAsync(lst);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        } 
    }
}
