<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Aras.IOM" %>
<%
    
    try
    {
        //baseBiz
        Response.Write("遇到错误.<br/>");
        string uuid = Request["uuid"];
        if (string.IsNullOrEmpty(uuid))
        {
            return;
        }
        string err = Com.JoinSoft.Services.ComServices.GetCMap().Get(uuid) as string;
        Com.JoinSoft.Services.ComServices.GetCMap().Remove(uuid);
        if (err==null)
        {
            err = "获取错误源失败";
        }
        Response.Write(err);
    }
    catch(Exception ex)
    {
        Response.Write("catch遇到错误.<br/>" + ex.Message);
    }
%>
<script type="text/C#" runat="server">
    
   
</script>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<title>欢迎</title>

</head>
<body>
</body>
</html>


 