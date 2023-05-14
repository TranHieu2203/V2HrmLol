using System;
using System.Text;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using Common.Paging;

namespace Common.DataAccess
{
    class TLANotification
    {
        public TLANotification(TLAContext tlaContext)
        {


            
        }
        // notification
        //public NotificationModel SendNotification(NotificationModel item)
        //{
        //    try
        //    {

                

        //        WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
        //        tRequest.Method = "post";
        //        //serverKey - Key from Firebase cloud messaging server  
        //        tRequest.Headers.Add(string.Format("Authorization: key=AAAAZlSd_3E:APA91bFGs4FLQTRfORS8c_Ny4v8Ti7uAh9iuhh7RaT9aD6PF-eqHYQ6H79iK1bGL8v9RQxSD2CIAsgxSNYfxiyfQtU0utSfYPj6WJy1PhYHg44BYcZBOg2geaJy6HkPPHtw8tW2qb8XS", "mykey"));
        //        //Sender Id - From firebase project setting  
        //        tRequest.Headers.Add(string.Format("Sender: id=439506304881", "mySendId"));
        //        tRequest.ContentType = "application/json";
        //        var payload = new
        //        {
        //            registration_ids = item.Devices,
        //            priority = "high",
        //            content_available = true,
        //            notification = new
        //            {
        //                body = item.Body,
        //                title = item.Title,
        //                badge = 2,
        //            }
        //        };

        //        string postbody = JsonConvert.SerializeObject(payload).ToString();
        //        Byte[] byteArray = Encoding.UTF8.GetBytes(postbody);
        //        tRequest.ContentLength = byteArray.Length;
        //        using (Stream dataStream = tRequest.GetRequestStream())
        //        {
        //            dataStream.Write(byteArray, 0, byteArray.Length);
        //            using (WebResponse tResponse = tRequest.GetResponse())
        //            {
        //                using (Stream dataStreamResponse = tResponse.GetResponseStream())
        //                {
        //                    if (dataStreamResponse != null) using (StreamReader tReader = new StreamReader(dataStreamResponse))
        //                        {
        //                            String sResponseFromServer = tReader.ReadToEnd();
        //                            //result.Response = sResponseFromServer;
        //                        }
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //    return item;
        //}
    }
}
