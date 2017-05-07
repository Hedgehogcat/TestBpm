<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TemplateList.aspx.cs" Inherits="Com.JoinSoft.BizPage.TemplateList.TemplateList" %>

<%@ Import Namespace="Aras.IOM" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <%--头文件 --%>
    <%   Response.Write(Com.JoinSoft.Services.UrlServices.GetScriptText()); %>
    <%
        string formname = Request["formname"];
        Innovator inn = Com.JoinSoft.Services.ComServices.GetInnovator();
        Item bodyItem = inn.applyMethod("pub_XT_SetViewForm", "<formname>" + formname + "</formname><type>scriptevent</type>");
        Response.Write(bodyItem.getProperty("css", ""));
        Response.Write(bodyItem.getProperty("ycss", ""));
        //Response.Write(bodyItem.getProperty("scriptlib", ""));
        Response.Write(bodyItem.getProperty("scriptevent", ""));
    %>
</head>
<body>
    <%--html --%>
    <%
        string formname = Request["formname"];
        Innovator inn1 = Com.JoinSoft.Services.ComServices.GetInnovator();
        Item bodyItem1 = inn1.applyMethod("pub_XT_SetViewForm", "<formname>" + formname + "</formname><type>scripthtml</type>");
        Response.Write(bodyItem1.getProperty("scripthtml", ""));
    %>
</body>
</html>
