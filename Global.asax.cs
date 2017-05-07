using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Routing;

namespace Com.JoinSoft
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            System.Diagnostics.Trace.WriteLine("Application_Start");
            Com.JoinSoft.Services.GlobalServices.RegisterRoutes(RouteTable.Routes);
            Com.JoinSoft.Services.ServerEntity.InitServerEntity();
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            System.Diagnostics.Trace.WriteLine("Session_Start,DateTime:" + Com.JoinSoft.Services.ComServices.GetDateTimeString());
            System.Diagnostics.Trace.WriteLine("Session_Start,SID:" + Session.SessionID);
            Session.Timeout = 5; //分钟 24h
        }
        protected void Session_End(object sender, EventArgs e)
        {
            System.Diagnostics.Trace.WriteLine("Session_End,DateTime:" + Com.JoinSoft.Services.ComServices.GetDateTimeString());
            System.Diagnostics.Trace.WriteLine("Session_End,SID:" + Session.SessionID);
        }

       
        
        protected void Application_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            System.Diagnostics.Trace.WriteLine("Application_PreRequestHandlerExecute:" + Request.Url.ToString());
            Com.JoinSoft.Services.GlobalServices.PreRequestHandlerExecute();
        }

       

        protected void Application_Error(object sender, EventArgs e)
        {
            //baseBiz
            try
            {
                string errStr = "";
                Com.JoinSoft.Services.GlobalServices.Error(out errStr);
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }

        
    }
}