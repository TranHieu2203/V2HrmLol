using System.Threading.Tasks;
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
using System.Data;
using System.Dynamic;
using System.Diagnostics;

namespace AttendanceDAL.Repositories
{
    public class TimeSheetDailyRepository : TLARepository<TimeSheetDaily>, ITimeSheetDailyRepository
    {
        private AttendanceDbContext _appContext => (AttendanceDbContext)_context;
        public TimeSheetDailyRepository(AttendanceDbContext context) : base(context)
        {

        }
        public async Task<PagedResult<ExpandoObject>> GetAll(TimeSheetDailyDTO param)
        {
            try
            {
                if (param.PageNo == 0)
                {
                    param.PageNo = 1;
                }
                if (param.PageSize == 0)
                {
                    param.PageSize = 20;
                }
                var r = await QueryData.ExecutePaging("PKG_TIMESHEET.LIST_TIMESHEET_DAILY",
                    new
                    {
                        p_is_admin = _appContext.IsAdmin == true ? 1 : 0,
                        p_org_id = param.ORG_ID,
                        p_period_id = param.PERIOD_ID,
                        P_IS_QUIT = param.IS_QUIT,
                        P_CODE = param.EMPLOYEE_CODE,
                        P_NAME = param.EMPLOYEE_NAME,
                        P_ORG_NAME = param.ORG_NAME,
                        P_POS_NAME = param.POSITION_NAME,
                        p_page_no = param.PageNo,
                        p_page_size = param.PageSize,
                        P_CUR = QueryData.OUT_CURSOR,
                        P_CUR_PAGE = QueryData.OUT_CURSOR
                    }, true);

                return r;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Create Data
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>

        public async Task<ResultWithError> UpdateAsync(TimeSheetDailyInputDTO param)
        {
            try
            {
                var dt = await QueryData.ExecuteStore<ReferParam>("PKG_TIMESHEET.UPDATE_DAILY",
                                          new
                                          {
                                              
                                              P_USER_ID = _appContext.CurrentUserId,
                                              P_TYPE_ID = param.TimeTypeId,
                                              P_EMP_ID = param.EmployeeId,
                                              P_PERIOD_ID = param.PeriodId,
                                              P_START = param.DateStart,
                                              P_END = param.DateEnd,
                                              P_CUR = QueryData.OUT_CURSOR
                                          });


                return new ResultWithError(dt);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
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
                    var r = _appContext.TimeSheetDailys.Where(x => x.ID == item ).FirstOrDefault();
                    if (r == null)
                    {
                        return new ResultWithError(404);
                    }
                    var result = _appContext.TimeSheetDailys.Update(r);
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
        /// Insert du lieu may cham cong sang timesheet_machine va clone sang timesheet_daily
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> CalTimesheetDaily(TimeSheetInputDTO param)
        {
            try
            {
                var p = await _appContext.WorkSigns.Where(c => c.PERIOD_ID == param.PeriodId ).CountAsync();
                if (p == 0)
                {
                    return new ResultWithError("NOT_WORK_SIGN");
                }


                await QueryData.Execute("PKG_TIMESHEET_V2.CAL_TIMESHEET_SWIPE",
                    new
                    {
                        p_is_admin = _appContext.IsAdmin == true ? 1 : 0,
                        p_org_id = param.OrgId,
                        p_period_id = param.PeriodId
                    }, true);
                return new ResultWithError(200);

            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Portal Get By Id
        /// </summary>
        /// <param name="periodId"></param>
        /// <returns></returns>
        public async Task<ResultWithError> PortalGetBY(int periodId)
        {
            try
            {
                var r = await (from p in _appContext.TimeSheetDailys
                               from m in _appContext.TimesheetMachines.Where(x => x.EMPLOYEE_ID == p.EMPLOYEE_ID && x.WORKINGDAY == p.WORKINGDAY).DefaultIfEmpty()
                               from a in _appContext.TimeTypes.Where(x => x.ID == p.TIMETYPE_ID)
                               where p.EMPLOYEE_ID == _appContext.EmpId && p.PERIOD_ID == periodId
                               select new
                               {
                                   WorkingDay = p.WORKINGDAY,
                                   TimeTypeName = "[" + a.CODE + "] " + a.NAME,
                                   TimePoint1 = m.TIME_POINT1,
                                   TimePoint4 = m.TIME_POINT4,
                                   LateIn = m.LATE_IN,
                                   EarlyOut = m.EARLY_OUT,
                                   OT = 0
                               }).ToListAsync();
                return new ResultWithError(r);

            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// Tenant ScanCode User
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<ResultWithError> TenantUpTime(SwipeDataTenantDTO param)
        {
            try
            {
                var r = _appContext.Employees.Where(x=>x.ID == param.EmpId).Count();
                if (r > 0)
                {
                    var data = new SwipeData();
                    data.EMP_ID = _appContext.EmpId;
                    data.TIME_POINT = DateTime.Now;
                    data.LATITUDE = param.Latitude;
                    data.LONGITUDE = param.Longitude;
                    data.MODEL = param.Model;
                    data.MAC = param.Mac;
                    data.OPERATING_SYSTEM = param.OperationSystem;
                    data.OPERATING_VERSION = param.OperationVersion;
                    data.WIFI_IP = param.WifiIp;
                    data.BSS_ID = param.Bssid;
                    var result = _appContext.SwipeDatas.Add(data);
                    await _appContext.SaveChangesAsync();
                    return new ResultWithError(200);
                }
                else
                {
                    return new ResultWithError("EMPLOYEE_NOT_EXISTS");
                }
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public async Task<ResultWithError> CheckQRCode(string code, string ip)
        {
            if (ip != null)
            {
                var r = await (from p in _appContext.SettingMaps
                               where p.QRCODE == code && p.IP.Contains(ip)
                               select new
                               {
                                   id = p.ID
                               }).FirstOrDefaultAsync();
                if (r != null)
                {
                    return new ResultWithError(r);
                }
                else
                {
                    return new ResultWithError("QRCODE_NOT_EXISTS");
                }
            }
            else
            {
                var r = await (from p in _appContext.SettingMaps
                               where p.QRCODE == code && p.IS_ACTIVE == true
                               select new
                               {
                                   id = p.ID
                               }).FirstOrDefaultAsync();
                if (r != null)
                {
                    return new ResultWithError(r);
                }
                else
                {
                    return new ResultWithError("QRCODE_NOT_EXISTS");
                }
            }

        }
        /// <summary>
        /// PortalUpTime (Affter ScanQRCode of Tenant)
        /// </summary>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public async Task<ResultWithError> PortalUpTimeGPRS(SwipeDataGPRSDTO param)
        {
            try
            {
                // Lưu dữ liệu vào SwipeData
                var data = new SwipeDataTmp();
                try
                {
                    data.EMP_ID = _appContext.EmpId;
                }
                catch
                {
                    data.TENANT_ID = 0;
                    data.EMP_ID = 0;
                }

                try
                {
                    data.WIFI_IP = param.WifiIp;
                    data.BSS_ID = param.Bssid;
                }
                catch
                {
                }
                try
                {
                    data.LATITUDE = param.Latitude;
                    data.LONGITUDE = param.Longitude;
                }
                catch
                {
                }

                try
                {
                    data.MODEL = param.Model;
                    data.IMAGE = param.Image;
                    data.MAC = param.Mac;
                    data.OPERATING_SYSTEM = param.OperatingSystem;
                    data.OPERATING_VERSION = param.OperatingVersion;
                }
                catch
                {

                }
                data.TIME_POINT = DateTime.Now;
                var result = _appContext.SwipeDataTmps.Add(data);
                await _appContext.SaveChangesAsync();
                try
                {
                    await QueryData.Execute("PKG_TIMESHEET.TIME_KEEPING_V2",
                     new
                     {
                         
                         P_TIME = data.TIME_POINT,
                         P_EMP_ID = _appContext.EmpId,
                         P_ID_TMP = data.ID
                     }, false);
                }
                catch
                {
                }
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                LogFile(ex.Message);
                return new ResultWithError(ex.Message);
            }
        }

        /// <summary>
        /// PortalUpTime (ERROR)
        /// </summary>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public async Task<ResultWithError> PortalUpTimeGPRS_ERROR(SwipeDataGPRSDTO param)
        {
            try
            {
                // Lưu dữ liệu vào SwipeData
                var data = new SwipeDataWrong();
               
                try
                {
                    data.EMP_ID = _appContext.EmpId;
                    data.TIME_POINT = DateTime.Now;
                }
                catch
                {

                    data.EMP_ID = 0;
                    data.TIME_POINT = DateTime.Now;
                }

                try
                {
                    data.LATITUDE = param.Latitude;
                    data.LONGITUDE = param.Longitude;
                    data.MODEL = param.Model;
                    data.IMAGE = param.Image;
                    data.MAC = param.Mac;
                    data.OPERATING_SYSTEM = param.OperatingSystem;
                    data.OPERATING_VERSION = param.OperatingVersion;
                    data.WIFI_IP = param.WifiIp;
                    data.BSS_ID = param.Bssid;
                }
                catch
                {

                }

                var result = _appContext.SwipeDataWrongs.Add(data);
                await _appContext.SaveChangesAsync();

                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }

        public string GetWifiMac()
        {
            Process proc = new Process();
            proc.StartInfo.CreateNoWindow = true;
            proc.StartInfo.FileName = "cmd";

            proc.StartInfo.Arguments = @"/C ""netsh wlan show networks mode=bssid | findstr BSSID """;

            proc.StartInfo.RedirectStandardOutput = true;
            proc.StartInfo.UseShellExecute = false;
            proc.Start();
            string output = proc.StandardOutput.ReadToEnd();
            proc.WaitForExit();






            //string mac = "";
            //var card = NetworkInterface.GetAllNetworkInterfaces().FirstOrDefault();
            //if (card == null)
            //    return null;
            //else
            //{
            //    byte[] bytes = card.GetPhysicalAddress().GetAddressBytes();
            //    for (int i = 0; i < bytes.Length; i++)
            //    {
            //        mac = string.Concat(mac + (string.Format("{0}", bytes[i].ToString("X2"))));
            //        if (i != bytes.Length - 1)
            //        {
            //            mac = string.Concat(mac + ":");
            //        }
            //    }
            //    mac = card.GetPhysicalAddress().ToString();
            return output;
            //}
        }


        public async Task<ResultWithError> MapKeeping(paramSearch param)
        {
            try
            {
                var r = await QueryData.ExecuteList("PKG_TIMESHEET.MAP_KEEPING",
                 new
                 {
                     P_EMP_ID = param.EmpId,
                     P_PERIOD_ID = param.PeriodId,
                     P_DAY = param.Day,
                     P_CUR = QueryData.OUT_CURSOR
                 }, true);
                return new ResultWithError(r);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);

            }

        }


        /// <summary>
        /// Haversine Algorithm
        /// </summary>
        static double _eQuatorialEarthRadius = 6378.1370D;
        static double _d2r = (Math.PI / 180D);
        public bool CheckDistanceIP(string ip)
        {
            try
            {
                List<SettingMapDTO> list = _appContext.SettingMaps.Where(c =>  c.IS_ACTIVE == true && c.IP != null)
                            .Select(d => new SettingMapDTO()
                            {
                                Lat = d.LAT,
                                Long = d.LNG,
                                Radius = d.RADIUS,
                                Ip = d.IP
                            }).ToList();

                if (list.Count == 0)
                {
                    return true;
                }

                if (ip == null)
                {
                    return false;
                }
                //  var sip = ip.Substring(0, 10);
                foreach (var item in list)
                {
                    // đúng IP
                    if (ip == item.Ip)
                    {
                        return true;
                    }
                }
                return false;

            }
            catch (Exception ex)
            {

                return false;
            }

        }
        public async Task<ResultWithError> CheckDistance(double lat1, double long1)
        {
            try
            {
                bool key = false;
                var r = await (from p in _appContext.SettingMaps
                               where p.IS_ACTIVE == true & p.LAT != null && p.LNG != null
                               select new
                               {
                                   Lat = p.LAT,
                                   Long = p.LNG,
                                   Radius = p.RADIUS,
                                   address = p.ADDRESS
                               }).ToListAsync();

                if (r.Count == 0)
                {
                    return new ResultWithError(200);
                }

                foreach (var item in r)
                {
                    var d = HaversineInM(lat1, long1, double.Parse(item.Lat), double.Parse(item.Long));
                    if (d <= (double)item.Radius + 100)
                    {
                        key = true;
                    }
                }

                if (!key)
                {
                    return new ResultWithError(400);
                }
                return new ResultWithError(200);
            }
            catch (Exception ex)
            {
                return new ResultWithError(ex.Message);
            }
        }


        public async Task<ResultWithError> CheckWifi(string wifi)
        {
            bool bWifi = false;
            var r = await (from p in _appContext.SettingMaps
                           where p.IS_ACTIVE == true && p.IP != null
                           select p.IP).ToListAsync();
            if (r.Count == 0)
            {
                return new ResultWithError(200);
            }

            foreach (var item in r)
            {
                var ips = item.ToString().Trim().Split(";");
                foreach (var sub in ips)
                {
                    if (sub.Trim() == wifi.Trim())
                    {
                        bWifi = true;
                        break;
                    }
                }
            }

            if (!bWifi)
            {
                return new ResultWithError("WIFI_INCORRECT");
            }

            return new ResultWithError(200);



        }
        private double HaversineInM(double lat1, double long1, double lat2, double long2)
        {
            //return DistanceBetweenPlaces(long1, lat1, long2, lat2);
            return (1000D * HaversineInKM(long1, lat1, long2, lat2));
        }

        private static double HaversineInKM(double lat1, double long1, double lat2, double long2)
        {
            double dlong = (long2 - long1) * _d2r;
            double dlat = (lat2 - lat1) * _d2r;
            double a = Math.Pow(Math.Sin(dlat / 2D), 2D) + Math.Cos(lat1 * _d2r) * Math.Cos(lat2 * _d2r) * Math.Pow(Math.Sin(dlong / 2D), 2D);
            double c = 2D * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1D - a));
            double d = _eQuatorialEarthRadius * c;

            return d;
        }

        const double PIx = 3.141592653589793;
        const double RADIO = 6378.16;

        /// <summary>
        /// Convert degrees to Radians
        /// </summary>
        /// <param name="x">Degrees</param>
        /// <returns>The equivalent in radians</returns>
        public static double Radians(double x)
        {
            return x * PIx / 180;
        }

        /// <summary>
        /// Calculate the distance between two places.
        /// </summary>
        /// <param name="lon1"></param>
        /// <param name="lat1"></param>
        /// <param name="lon2"></param>
        /// <param name="lat2"></param>
        /// <returns></returns>
        public static double DistanceBetweenPlaces(
            double lon1,
            double lat1,
            double lon2,
            double lat2)
        {
            double dlon = Radians(lon2 - lon1);
            double dlat = Radians(lat2 - lat1);

            double a = (Math.Sin(dlat / 2) * Math.Sin(dlat / 2)) + Math.Cos(Radians(lat1)) * Math.Cos(Radians(lat2)) * (Math.Sin(dlon / 2) * Math.Sin(dlon / 2));
            double angle = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return angle * 6378137;//distance in miles
        }

        public static double DistanceBetweenPlaces1(double lon1, double lat1, double lon2, double lat2)
        {
            double R = 6371; // km

            double sLat1 = Math.Sin(Radians(lat1));
            double sLat2 = Math.Sin(Radians(lat2));
            double cLat1 = Math.Cos(Radians(lat1));
            double cLat2 = Math.Cos(Radians(lat2));
            double cLon = Math.Cos(Radians(lon1) - Radians(lon2));

            double cosD = sLat1 * sLat2 + cLat1 * cLat2 * cLon;

            double d = Math.Acos(cosD);

            double dist = R * d;

            return dist;
        }
        public async Task<PagedResult<ExpandoObject>> V2GetAll(TimeSheetDailyDTO param)
        {
            try
            {
                if (param.PageNo == 0)
                {
                    param.PageNo = 1;
                }
                if (param.PageSize == 0)
                {
                    param.PageSize = 20;
                }
                var r = await QueryData.ExecutePaging("PKG_TIMESHEET_V2.LIST_TIMESHEET_DAILY",
                    new
                    {
                        p_is_admin = _appContext.IsAdmin == true ? 1 : 0,
                        p_org_id = param.ORG_ID,
                        p_period_id = param.PERIOD_ID,
                        P_CODE = param.EMPLOYEE_CODE,
                        P_NAME = param.EMPLOYEE_NAME,
                        P_ORG_NAME = param.ORG_NAME,
                        P_POS_NAME = param.POSITION_NAME,
                        P_TYPE = param.TYPE_ID == null ? 1 : param.TYPE_ID,
                        p_page_no = param.PageNo,
                        p_page_size = param.PageSize,
                        P_CUR = QueryData.OUT_CURSOR,
                        P_CUR_PAGE = QueryData.OUT_CURSOR
                    }, true);
                return r;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
