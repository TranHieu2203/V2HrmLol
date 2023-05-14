﻿using System.Threading.Tasks;
using Common.Paging;
using AttendanceDAL.EntityFrameworkCore;
using AttendanceDAL.Models;
using AttendanceDAL.ViewModels;
using System.Linq;
using Common.Repositories;
using Common.Extensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

namespace AttendanceDAL.Repositories
{
    public class ShiftRepository : TLARepository<Shift>, IShiftRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public ShiftRepository(AttendanceDbContext context) : base(context)
        {

        }
        /// <summary>
        /// CMS Get All Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<PagedResult<ShiftDTO>> GetAll(ShiftDTO param)
        {
            var queryable = from p in _appContext.Shifts
                            from m in _appContext.TimeTypes.Where(x => x.ID == p.TIME_TYPE_ID)
                            
                            orderby p.ORDERS
                            select new ShiftDTO
                            {
                                Id = p.ID,
                                Code = p.CODE,
                                Name = p.NAME,
                                HoursStart = p.HOURS_START,
                                HoursStop = p.HOURS_STOP,
                                BreaksFrom = p.BREAKS_FROM,
                                BreaksTo = p.BREAKS_TO,
                                TimeTypeId = p.TIME_TYPE_ID,
                                TimeTypeName = m.NAME,
                                IsNoon = p.IS_NOON,
                                IsBreak = p.IS_BREAK,
                                TimeLate = p.TIME_LATE,
                                TimeEarly = p.TIME_EARLY,
                                Note = p.NOTE,
                                IsActive = p.IS_ACTIVE,
                                Coefficient = p.COEFFICIENT,
                                Orders = p.ORDERS
                            };


            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                queryable = queryable.Where(p => p.Name.ToUpper().Contains(param.Name.ToUpper()));
            }

            if (!string.IsNullOrWhiteSpace(param.Note))
            {
                queryable = queryable.Where(p => p.Note.ToUpper().Contains(param.Note.ToUpper()));
            }


            if (param.IsActive != null)
            {
                queryable = queryable.Where(p => p.IsActive == param.IsActive);
            }
            return await PagingList(queryable, param);
        }
        /// <summary>
        /// CMS Get Detail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        public async Task<ResultWithError> GetById(int id)
        {
            try
            {
                var r = await (from p in _appContext.Shifts.Where(c => c.ID == id)
                               from m in _appContext.TimeTypes.Where(x => x.ID == p.TIME_TYPE_ID)
                               
                               select new
                               {
                                   Id = p.ID,
                                   Code = p.CODE,
                                   Name = p.NAME,
                                   HoursStart = p.HOURS_START,
                                   HoursStop = p.HOURS_STOP,
                                   BreaksFrom = p.BREAKS_FROM,
                                   BreaksTo = p.BREAKS_TO,
                                   TimeTypeId = p.TIME_TYPE_ID,
                                   TimeTypeName = m.NAME,
                                   IsNoon = p.IS_NOON,
                                   IsBreak = p.IS_BREAK,
                                   TimeLate = p.TIME_LATE,
                                   TimeEarly = p.TIME_EARLY,
                                   ShiftIn = p.SHIFT_IN,
                                   ShiftOut = p.SHIFT_OUT,
                                   Orders = p.ORDERS,
                                   Note = p.NOTE,
                                   MonId = p.MON_ID,
                                   TueId = p.TUE_ID,
                                   WedId = p.WED_ID,
                                   ThuId = p.THU_ID,
                                   FriId = p.FRI_ID,
                                   SatId = p.SAT_ID,
                                   SunId = p.SUN_ID,
                                   IsActive = p.IS_ACTIVE,
                                   Coefficient = p.COEFFICIENT,
                                   TimeStandard = p.TIME_STANDARD
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        public async Task<ResultWithError> GetShiftCycle(int id)
        {
            try
            {
                var r = await (from p in _appContext.Shifts.Where(c => c.ID == id)
                               
                               select new
                               {
                                   Id = p.ID,
                                   MonId = p.MON_ID,
                                   TueId = p.TUE_ID,
                                   WedId = p.WED_ID,
                                   ThuId = p.THU_ID,
                                   FriId = p.FRI_ID,
                                   SatId = p.SAT_ID,
                                   SunId = p.SUN_ID
                               }).FirstOrDefaultAsync();
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Create Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CreateAsync(ShiftInputDTO param)
        {
            try
            {
                var a = _appContext.Shifts.Where(x => x.CODE == param.Code ).Count();
                if (a > 0)
                {
                    return new ResultWithError(Message.CODE_EXIST);
                }

                var data = Map<ShiftInputDTO, Shift>(param, new Shift());
                data.TIME_START = param.HoursStart.ToString("HH24:MI:SS");
                data.TIME_STOP = param.HoursStop.ToString("HH24:MI:SS");
                if (param.BreaksFrom != null)
                {
                    data.TIME_BREAKS_FROM = param.BreaksFrom.Value.ToString("HH24:MI:SS");
                    data.TIME_BREAKS_TO = param.BreaksTo.Value.ToString("HH24:MI:SS");
                }
                
                data.IS_ACTIVE = true;
                var result = await _appContext.Shifts.AddAsync(data);

                dynamic res = await QueryData.ExecuteObject("PKG_PAYROLL.ADD_SHIFT",
                   new
                   {
                       
                       P_CODE = data.CODE,
                       P_CUR = QueryData.OUT_CURSOR,
                   }, false);
                if (res.STATUS == 400)
                {
                    return new ResultWithError(res.MESSAGE);
                }
                await _appContext.SaveChangesAsync();
                param.Id = data.ID;
                return new ResultWithError(param);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Edit Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> UpdateAsync(ShiftInputDTO param)
        {
            try
            {
                // check code
                var r = _appContext.Shifts.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                param.Code = null;
                var data = Map<ShiftInputDTO, Shift>(param, r);
                data.TIME_START = param.HoursStart.ToString("HH:mm:ss");
                data.TIME_STOP = param.HoursStop.ToString("HH:mm:ss");
                if (param.BreaksFrom != null)
                {
                    data.TIME_BREAKS_FROM = param.BreaksFrom.Value.ToString("HH:mm:ss");
                    data.TIME_BREAKS_TO = param.BreaksTo.Value.ToString("HH:mm:ss");
                }
                var result = _appContext.Shifts.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex);
            }
        }  /// <summary>
           /// CMS Edit Shift cycle
           /// </summary>
           /// <param name="param"></param>
           /// <returns></returns>
        public async Task<ResultWithError> UpdateShiftCycle(ShiftCycleInput param)
        {
            try
            {
                // check code

                var r = _appContext.Shifts.Where(x => x.ID == param.Id ).FirstOrDefault();
                if (r == null)
                {
                    return new ResultWithError(404);
                }
                var data = Map<ShiftCycleInput, Shift>(param, r);
                var result = _appContext.Shifts.Update(data);
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex);
            }
        }
        /// <summary>
        /// CMS Change Status Data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> ChangeStatusAsync(List<int> ids)
        {
            try
            {
                foreach (var item in ids)
                {
                    var r = _appContext.Shifts.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    r.IS_ACTIVE = !r.IS_ACTIVE;
                    var result = _appContext.Shifts.Update(r);
                }
                await _appContext.SaveChangesAsync();
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {

                return new ResultWithError(ex.Message);
            }
        }
        /// <summary>
        /// Get List Group is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetList(int type)
        {
            try
            {
                if (type == 2) // Danh sách ca trực
                {
                    var queryable = await (from p in _appContext.Shifts
                                           join t in _appContext.TimeTypes on p.TIME_TYPE_ID equals t.ID
                                           where p.IS_ACTIVE == true  && (t.MORNING_ID == 14 || t.MORNING_ID == 15 || t.MORNING_ID == 16 || t.MORNING_ID == 81)
                                           orderby p.ORDERS
                                           select new
                                           {
                                               Id = p.ID,
                                               Name = p.NAME,
                                               MonId = p.MON_ID,
                                               TueId = p.TUE_ID,
                                               WedId = p.WED_ID,
                                               ThuId = p.THU_ID,
                                               FriId = p.FRI_ID,
                                               SatId = p.SAT_ID,
                                               SunId = p.SUN_ID
                                           }).ToListAsync();
                    return new ResultWithError(queryable);
                }
                else
                {
                    var queryable = await (from p in _appContext.Shifts
                                           join t in _appContext.TimeTypes on p.TIME_TYPE_ID equals t.ID
                                           where p.IS_ACTIVE == true  && t.MORNING_ID != 14 && t.MORNING_ID != 15 && t.MORNING_ID != 16 && t.MORNING_ID != 81
                                           orderby p.ORDERS
                                           select new
                                           {
                                               Id = p.ID,
                                               Name = p.NAME,
                                               MonId = p.MON_ID,
                                               TueId = p.TUE_ID,
                                               WedId = p.WED_ID,
                                               ThuId = p.THU_ID,
                                               FriId = p.FRI_ID,
                                               SatId = p.SAT_ID,
                                               SunId = p.SUN_ID
                                           }).ToListAsync();
                    return new ResultWithError(queryable);
                }

            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Get List Group is Activce
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public async Task<ResultWithError> GetListToImport()
        {
            try
            {
                var queryable = await (from p in _appContext.Shifts
                                       where p.IS_ACTIVE == true 
                                       select new
                                       {
                                           Id = p.ID,
                                           Code = p.CODE,
                                           Name = p.NAME,
                                       }).ToListAsync();
                return new ResultWithError(queryable);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }
    }
}
