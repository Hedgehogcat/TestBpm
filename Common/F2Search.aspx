<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="F2Search.aspx.cs" Inherits="Com.JoinSoft.Common.F2Search" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <% =Request["title"] %></title>
    <%--    <link href="../../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../../Scripts/SystemJS/log.js" type="text/javascript"></script>--%>
     <%Response.Write(Com.JoinSoft.Services.UrlServices.GetScriptText()); %>
    <script type="text/javascript" language="javascript">  
        setInterval(function () {
        log.ajax.getMessage();
    }, 10000); 
        var name ="<% =Request["name"] %>";
        var singSelect="<% =Request["singselect"] %>";
        var where="<% =Request["where"] %>";
        if(name=="")
        {
          alert("查询参数不全！");
          window.returnValue={};
          window.close();
        }
        if(where=="")
        {
         where="1=1";
        }
        var loadcode= log.ajax.getMethodResult("Pub_GetSearchGrid", "<itemname>" + name + "</itemname>", "TEXT");
        loadcode = loadcode.replace(/&lt;/g,"<");
        loadcode = loadcode.replace(/&gt;/g,">");
        if(singSelect=="0")
        {
         loadcode+="$('#dg').datagrid('options').singleSelect=false;";
        }
        var setDg= new Function("where",loadcode);
       $(function(){
       $(".easyui-linkbutton").bind('click',  function()
        { 
            try
            {
            var cmdID=this.id;
            switch (cmdID)
            {
             case "check" :
             var rows=$('#dg').datagrid('getSelections');
             if(rows.length=="0")
             {
               alert("请选择数据！");
               return;
             }
             window.returnValue=rows;
             window.close();
             break;
             case "clear" : 
              window.returnValue={};
              window.close();
             break;
             case "leave" : 
             window.returnValue=undefined;
              window.close();
             break;
             default:
             break; 
            }
            }
            catch(err)
            {
              alert(err);
            }
        });
       });
        window.onload=function(){

         setDg(where);
         };
        
    </script>
</head>
<body id="body1">
    <form id="form1" runat="server">
    <div id="toolbar">
        <div class="easyui-panel" style="padding: 0px; fit: true;">
            <table cellspacing="0" cellpadding="0" style="margin: right">
                <tr>
                    <td>
                        <a id="check" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-biz-check',plain:true">
                            选择</a>
                    </td>
                    <td>
                        <div class="datagrid-btn-separator" />
                    </td>
                    <td>
                        <a id="clear" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-biz-clear',plain:true ">
                            清除</a>
                    </td>
                    <td>
                        <div class="datagrid-btn-separator" />
                    </td>
                    <td>
                        <a id="leave" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-biz-leave',plain:true">
                            退出</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="search" class="easyui-panel" style="height: 50px; padding: 0px;">
        <%=Com.JoinSoft.Services.UIServices.GetSerachBoxHtml(
            new Com.JoinSoft.Services.ArasProxyServices().GetMethodResult("pub_XT_FindSearchBox", "<fitemname>" + Request["name"] + "</fitemname>", "TEXT"))%>
    </div>
    <div id="da" class="easyui-panel" style="height: 420px">
        <table id="dg">
        </table>
    </div>
    <div id="status">
        <div id="ppp" class="easyui-panel" style="height: 25px; padding: 0px;">
            <input id="inputtext" type="text" style="text-align: left" value="当前:已经选中0项" />
        </div>
    </div>
    </form>
</body>
</html>
