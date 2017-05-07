<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BasicManageDefaultWithTree.aspx.cs"
    Inherits="Com.JoinSoft.BizPage.BasicDataManagement.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../../Scripts/SystemJS/log.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        var itemname = "<% =Request["itemname"] %>";     //对象类名称
        var dgid = "<% =Request["dgid"] %>";            //表格ID
        var loadcode= log.ajax.getMethodResult("Pub_returnDatagrid", "<itemname>" + itemname + "</itemname><dgid>" + dgid + "</dgid>", "TEXT");
        loadcode = loadcode.replace(/&lt;/g,"<");
        loadcode = loadcode.replace(/&gt;/g,">");
        var setDg= new Function("where",loadcode);
        function treeData(){
             var jsonStr =log.ajax.getMethodResult("Pub_GetTreeJson", encodeURIComponent('<datatype>proc</datatype><procname>DEV_ItemGroupTree</procname>'), "TEXT");  //'<%=Com.JoinSoft.Services.ServerEntity.ServerURL %>/Common/ServerProxy.aspx?TYPE=METHOD&JF=METHOD&METHOD=pub_MakeTreeToJson&BODY='+encodeURIComponent('<datatype>proc</datatype><procname>DEV_ItemGroupTree</procname>');
             return eval('(' + jsonStr + ')');
        }          
        function setTree()
        {     
          $('#tt').tree({            
              data:treeData(),
              onClick:function(node)
	          {   
                var str="DEV_SpareParts.fspcategory='"+node.id+"'";
                var queryParams = $('#dg').datagrid('options').queryParams; 
                 queryParams.BODY =str;
                $('#dg').datagrid('options').queryParams=queryParams;       
                $("#dg").datagrid('reload'); 
              }
           });
        }
    </script>
</head>
<body onload="setDg('1=1'),setTree()">
    <div id="cc" class="easyui-layout" fit="true">
        <div data-options="region:'north',title:'搜索框',split:true" style="height: 60px;">
            111111
        </div>
        <div data-options="region:'west',title:'<% =Request["treetitle"] %>',split:true"
            style="width: 180px;">
            <ul id="tt">
            </ul>
        </div>
        <div id='da' data-options="region:'center',title:'<% =Request["title"] %>'">
            <table id="dg">
            </table>
        </div>
    </div>
</body>
</html>
