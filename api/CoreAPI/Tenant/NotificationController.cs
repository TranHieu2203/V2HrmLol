using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CoreDAL.Repositories;
using CoreAPI.ViewModels;
using System;
using ProfileDAL.Repositories;
using System.Net;
using Newtonsoft.Json;
using System.Text;
using System.IO;

namespace CoreAPI.MultiTenant
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/notification/[action]")]
    public class NotificationController : BaseController
    {
        protected readonly IProfileBusiness _IProfileBusiness;
        public NotificationController(IUnitOfWork unitOfWork, IProfileBusiness IProfileBusiness) : base(unitOfWork)
        {
            _IProfileBusiness = IProfileBusiness;
        }

        /// <summary>
        /// admin tenant create user 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> SendNotification([FromBody] NotificationModel item)
        {
            try
            {
                //var r = await QueryData.ExecuteStore<NotifyHomeView>("PKG_NOTIFY.PORTAL_COUNT_HOME", new
                //{
                //    P_TENANT_ID = _tlaDbContext.TenantID,
                //    P_EMP_ID = _tlaDbContext.EmpId,
                //    P_CUR = QueryData.OUT_CURSOR
                //});


                WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
                tRequest.Method = "post";
                //Gohr
                //serverKey - Key from Firebase cloud messaging server  
                //tRequest.Headers.Add(string.Format("Authorization: key=AAAAZlSd_3E:APA91bFGs4FLQTRfORS8c_Ny4v8Ti7uAh9iuhh7RaT9aD6PF-eqHYQ6H79iK1bGL8v9RQxSD2CIAsgxSNYfxiyfQtU0utSfYPj6WJy1PhYHg44BYcZBOg2geaJy6HkPPHtw8tW2qb8XS", "mykey"));
                //Sender Id - From firebase project setting  
                //tRequest.Headers.Add(string.Format("Sender: id=439506304881", "mySendId"));
                // Core
                tRequest.Headers.Add(string.Format("Authorization: key=AAAARIhlN68:APA91bHqUjyZRhE_uu6cHKPxsNYGVe_spYvpxDI_JBfGibrKHAsEznz1wKMyzEXGLA3fT4T1ZTGMTpJDApP6l14Tre8p545777N-XP1XQnFVwDgVPBxbYwokA_LKaQkVc3EzR4bEBvyJ", "mykey"));
                tRequest.Headers.Add(string.Format("Sender: id=294346110895", "mySendId"));

                tRequest.ContentType = "application/json";
                var payload = new
                {
                    registration_ids = item.Devices,
                    priority = "high",
                    content_available = true,
                    notification = new
                    {
                        body = item.Body,
                        title = item.Title,
                        badge = 2,
                        icon = "https://png.icons8.com/color/50/000000/key.png"
                    }
                };

                string postbody = JsonConvert.SerializeObject(payload).ToString();
                Byte[] byteArray = Encoding.UTF8.GetBytes(postbody);
                tRequest.ContentLength = byteArray.Length;
                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);
                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            if (dataStreamResponse != null) using (StreamReader tReader = new StreamReader(dataStreamResponse))
                                {
                                    String sResponseFromServer = tReader.ReadToEnd();
                                    //result.Response = sResponseFromServer;
                                }
                        }
                    }
                }
                return Ok("Ok");
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }
    }
}
