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
<%
    Com.JoinSoft.Services.ComServices.SetOutStrame();
    string callMethod=Request["method"];
    if (string.IsNullOrEmpty(callMethod) )
    {
        Response.Write("{\"error\": \"true\",\"errorinfo\": \"缺少调用参数传递\"}");
        return;
    }
                 
    if (callMethod == "getOnlineCount")
    {
        Response.Write(getOnlineCount());
    }
    else if (callMethod == "getOnlineData")
    {
        Response.Write(getOnlineData());
    }
    else if (callMethod == "loginOut")
    {
        Response.Write(loginOut());
    }

    //return;
%>
<script type="text/C#" runat="server">
    private string getOnlineCount()
    {
        int count = 0;
        string ss= "";
        foreach (DictionaryEntry item in HttpRuntime.Cache)
        {
            if (item.Value is Hashtable)
            {
                count++;
            }
            //ss += item.Key.ToString()+ item.Value.ToString()+ ",";
        }
        return "{\"error\": \"false\",\"errorinfo\": \"\",\"onlineCount\":" + count.ToString() + ",\"value\":\""+ss+"\"}";
    }

    private string loginOut()
    {
        HttpContext.Current.Session["UserEntity"] = null;
        return "{\"error\": \"false\",\"errorinfo\": \"\",\"onlineCount\":0,\"value\":\"\"}";
    }

    private string getOnlineData()
    {
        int count = 0;
        string ss = "[";
        foreach (DictionaryEntry item in HttpRuntime.Cache)
        {
            if (item.Value is Hashtable)
            {
                count++;
                ss += "{\"user\":\"" + item.Key + "\"},";
            }
        }
            //ss += item.Key.ToString()+ item.Value.ToString()+ ",";
        if (ss.Length>2)
        {
            ss = ss.Substring(0, ss.Length - 1);
        }
        
        ss += "]";
        return "{\"error\": \"false\",\"errorinfo\": \"\",\"onlineData\":" + ss.ToString() + ",\"value\":\"\"}";
    }
</script>

