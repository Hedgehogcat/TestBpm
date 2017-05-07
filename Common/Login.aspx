<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Aras.IOM" %>
<%@ Import Namespace="System.Web.Caching" %>
<%@ Import Namespace="Com.JoinSoft.Services" %>
<%
    Com.JoinSoft.Services.ComServices.SetOutStrame();
    string userName=Request["userName"];
    string pwd = Request["pwd"];
    bool isfirst =false;
    if (string.IsNullOrEmpty(userName)||string.IsNullOrEmpty(pwd))
    {
        Response.Write("缺少用户名或密码");
        return;
    }
    string result=Com.JoinSoft.Services.LoginServices.LoginAras(userName,pwd,null);
    if (result == "true")
    {
        //设置缓存(该缓存被设置为1分钟后过期)  
        isfirst = true;
        Hashtable ht = new Hashtable();
        ht.Add("ip", Request.UserHostAddress);
        ht.Add("session", Com.JoinSoft.Services.ComServices.GetSession());

        HttpRuntime.Cache.Insert(userName, ht, null, DateTime.Now.AddMinutes(1), Cache.NoSlidingExpiration, CacheItemPriority.Low, checkSession);
    }

    Response.Write(result);
    return;
%>
<script type="text/C#" runat="server">
    private void checkSession(string key, object value, CacheItemRemovedReason reason)
    {
        try
        {
            Hashtable ht = (Hashtable)value;
            HttpSessionState session = (HttpSessionState)ht["session"];
            if (HttpContext.Current != null)
            {
                return;
            }
            if (session == null || session["UserEntity"] == null)
            {

            }
            else
            {
                HttpRuntime.Cache.Insert(key, value, null, DateTime.Now.AddMinutes(1), Cache.NoSlidingExpiration, CacheItemPriority.Low, checkSession);
            }
        }
        catch (Exception ex)
        {
            string ss = ex.Message;
            
        }

    }   
</script>