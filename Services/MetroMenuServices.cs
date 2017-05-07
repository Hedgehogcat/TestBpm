using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Com.JoinSoft.Services
{
    public class MetroMenuServices
    {
        public static string getMetroMenu(string id)
        {
            if(id==null)
            {
                id = "";
            }
            ArasProxyServices ps = new ArasProxyServices();
            string html = ps.GetMethodResult("Web_GetMetroMenuInfo", "<id>" + id + "</id>", "TEXT");
            html = html.Replace("&lt;", "<");
            html = html.Replace("&gt;", ">");
            return html;
        }
    }
}