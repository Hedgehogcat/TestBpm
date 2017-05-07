<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserManager.aspx.cs" Inherits="Com.JoinSoft.BizPage.UserManager" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>用户管理</title>

    <style type="text/css">
    html { height:100%; border:0;}
    body { height:100%; margin:0;}

    </style>

    <link href="../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
    type="text/css" />
    <link href="../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../Scripts/SystemJS/log.js" type="text/javascript"></script>

    <script type="text/javascript" language="javascript">

        //全局变量

        //启动方法
        $(function () {
           
            initPage();
        });

        function initPage() {

            $('#dgUserManager').datagrid(
            {
                url: '/Common/ServerProxy.aspx',
                //              fit: true,
                columns:
        [[
        { field: "id", title: "ID", data_type: "string", data_source: "", width: 100, hidden: true },
        { field: "login_name", title: "用户名", data_type: "string", data_source: "", width: 100, hidden: false },
        { field: "first_name", title: "姓式", data_type: "string", data_source: "", width: 100, hidden: false },
        { field: "last_name", title: "名称", data_type: "string", data_source: "", width: 100, hidden: false },
        { field: "fax", title: "传真号", data_type: "string", data_source: "", width: 100, hidden: false }
        ]],
                toolbar: [{
                    iconCls: 'icon-add',
                    handler: function () {
                        alert('add');
                    }
                }, '-', {
                    iconCls: 'icon-edit',
                    handler: function () {
                        alert('edit');
                    }
                }],

                height: 550,
                //              width: 800,
                fitColumns: true, //自适应列宽
                idField: 'id',
                autoRowHeight: true, //自适应行高
                rownumbers: true, //显示行数
                striped: true, //交替显示行背景
                nowrap: false, //超出列宽自动截取长度
                pagination: true, //显示底部工具栏 
                pageSize: 10,
                singleSelect: true,
                collapsible: true,
                remoteSort: false,
                sortName: 'login_name', //初始排序字段
                sortOrder: 'asc', //初始排序方式
                method: 'post',
                queryParams: {
                    JF: "GRID2",
                    TYPE: 'AML',
                    AML: "<AML><Item type='User' select='id,login_name,first_name,last_name,fax' action='get'></Item></AML>"
                },
                onSelect: function (rowIndex, rowData) {
                },
                onLoadSuccess: function (data) {

                },
                onLoadError: function (data) {
                    $.messager.alert("加载异常:", log.getErrorString(data));
                },
                onClickRow: function (rowIndex, rowData) {
                },
                onDblClickRow: function (rowIndex, rowData) {
                }
            });
        }

        
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
       <table id="dgUserManager"></table>
    </div>
    </form>
</body>
</html>
