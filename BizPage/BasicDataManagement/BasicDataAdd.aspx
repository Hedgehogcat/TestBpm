<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BasicDataAdd.aspx.cs" Inherits="Com.JoinSoft.BizPage.BasicDataManagement.BasicDataAdd" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script language="javascript" type="text/javascript">
        var param = "singselect=1&name=T_Department&id=dg&title=部门选择";
        url = "/Common/F2Search.aspx?" + param;
        function ss() {
            var result = window.showModalDialog(url, '', 'dialogWidth=900px;dialogHeight=550px;scroll:no;status:no');
            alert(result);
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input type="button" value="搜索" onclick="ss()" />
    </div>
    </form>
</body>
</html>
