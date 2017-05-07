<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TemplateDialogView.aspx.cs"
    Inherits="Com.JoinSoft.BizPage.TemplateDialog.TemplateDialogView" %>

<%@ Import Namespace="Aras.IOM" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<script type="text/javascript" >
    setInterval(function () {
        log.ajax.getMessage();
    }, 10000); 
</script>
    <title></title>
    <%--头文件 --%>
    <%   Response.Write(Com.JoinSoft.Services.UrlServices.GetScriptText()); %>
    <%
        string formname = Request["formname"];
        Innovator inn = Com.JoinSoft.Services.ComServices.GetInnovator();
        Item bodyItem = inn.applyMethod("pub_XT_SetEditForm", "<formname>" + formname + "</formname><type>scriptevent</type>");
        Response.Write(bodyItem.getProperty("css", ""));
        Response.Write(bodyItem.getProperty("ycss", ""));
       // Response.Write(bodyItem.getProperty("scriptlib", ""));
        Response.Write(bodyItem.getProperty("scriptevent", ""));
    %>
</head>
<body>
    <%--窗体字段 --%>
    <%
        string formname = Request["formname"];
        string itemname = Request["itemname"];
        string iseditmode = Request["iseditmode"];
        Innovator inn1 = Com.JoinSoft.Services.ComServices.GetInnovator();
        if (formname != null && itemname != null)
        {
            Item bodyItem1 = inn1.applyMethod("pub_XT_SetFormField", "<typename>" + itemname + "</typename><formname>" + formname + "</formname><iseditmode>" + iseditmode + "</iseditmode>");
            Response.Write(bodyItem1.getProperty("res", ""));
        }
    %>
</body>
</html>
