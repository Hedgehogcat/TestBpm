<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TemplateDialogView1.aspx.cs" Inherits="Com.JoinSoft.BizPage.TemplateDialog1.TemplateDialogView1" %>
<%@ Import Namespace="Aras.IOM" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--头文件 --%>
    <%
        string formname = Request["formname"];
        string itemname = Request["itemname"];
        string[] vars = formname.Split(new char[]{ '|'});
        if(vars.Length>1)
        {
            formname=vars[0];
            itemname=vars[1];
        }
        Innovator inn = Com.JoinSoft.Services.ComServices.GetInnovator();
        Item bodyItem = inn.applyMethod("pub_XT_SetForm1", "<formname>" + formname + "</formname><type>scriptevent</type>");
        Response.Write(bodyItem.getProperty("scriptlib", ""));
    %>
    <%--事件 --%>
    <%
        Response.Write(bodyItem.getProperty("scriptevent", ""));
    %>
</head>
<body>
    <%--窗体字段 --%>
    <%
        string formname = Request["formname"];
        string itemname = Request["itemname"];
        string[] vars = formname.Split(new char[]{ '|'});
        if(vars.Length>1)
        {
            formname=vars[0];
            itemname=vars[1];
        }
        //string itemname = Request["itemname"];
        Innovator inn1 = Com.JoinSoft.Services.ComServices.GetInnovator();
        Item bodyItem1 = inn1.applyMethod("pub_XT_SetFormField1", "<typename>" + itemname + "</typename><formname>" + formname + "</formname>");
        Response.Write(bodyItem1.getProperty("res", ""));
    %>
</body>
</html>
