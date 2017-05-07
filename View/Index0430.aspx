<%@ Page Language="C#" AutoEventWireup="true" %>

<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Aras.IOM" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>欢迎使用本系统</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%   Response.Write(Com.JoinSoft.Services.UrlServices.GetScriptText()); %>
    <script src="../Scripts/SystemJS/indexmsg.js" type="text/javascript"></script>
    <style type="text/css">
        .easyui-accordion ul
        {
            list-style-type: none;
            margin: 0px;
            padding: 10px;
        }
        .easyui-accordion ul li
        {
            padding: 0px;
        }
        .easyui-accordion ul li a
        {
            line-height: 24px;
        }
        .easyui-accordion ul li div
        {
            margin: 2px 0px;
            padding-left: 10px;
            padding-top: 2px;
        }
        .easyui-accordion ul li div.hover
        {
            border: 1px dashed #99BBE8;
            background: #E0ECFF;
            cursor: pointer;
        }
        .easyui-accordion ul li div.hover a
        {
            color: #416AA3;
        }
        .easyui-accordion ul li div.selected
        {
            border: 1px solid #99BBE8;
            background: #E0ECFF;
            cursor: default;
        }
        .cus-index-logo-imagebutton
        {
            position: absolute;
            z-index: 1;
        }
        .easyui-accordion ul li div.selected a
        {
            color: #416AA3;
            font-weight: bold;
        }
    </style>
    <script type="text/javascript" language="javascript">
        $(function () {
            $('#user_theme').combobox({
                onSelect: function (record) {
                    var theme_mes = "更换主题为" + record.label + "?(更换需要重新登录!)";
                    $.messager.confirm('确认', theme_mes, function (r) {
                        if (r) {
                            document.cookie = "user_theme=" + record.value;
                            log.ajax.onlineCallback('loginOut'); window.location.href = '/View/Login?method_name=index.aspx';
                        }
                    });
                }
            });
        }) 
    </script>
</head>
<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
    <noscript>
        <div style="position: absolute; z-index: 100000; height: 2046px; top: 0px; left: 0px;
            width: 100%; background: white; text-align: center;">
            <img src="images/noscript.gif" alt='抱歉，请开启脚本支持！' />
        </div>
    </noscript>
    <div region="north" style="overflow: hidden; height: 52px; border-bottom-width: 0px;
        position: relative; background: #D2E0F2 repeat-x center 50%; line-height: 20px;
        color: #2319DC;">
        <%--<div style=" font-size:20px;">欢迎使用本系统</div>--%>
        <img src="/Data/Image/backImage2.png" alt="" width="100%" height="52px" />
        <div class="cus-index-logo-imagebutton" style="top: 20px; right: 60px;">
            <a href="#" id="btnSubmit" class="easyui-linkbutton" data-options="iconCls:'icon-biz-leave'"
                onclick="log.ajax.onlineCallback('loginOut');window.location.href='/View/Login?method_name=index.aspx';"
                style="padding: 5px 0px; width: 40%; height: 25px; text-align: center"><span style="font-size: 12px;">
                    注销</span> </a>
            <input style="width: 80px;" id="user_theme" class="easyui-combobox" name="theme" data-options="valueField:'value',textField:'label',url:' ../../Common/ServerProxy.aspx?TYPE=METHOD&JF=ITEMS&METHOD=Web_GetListToJson&BODY=<name>WEB_Theme</name>'" />
            <%--<img 
            alt="注销用户" style=" width:75px;height:25px" src="/Data/Image/logOut.png"   onclick="window.location.href='/View/Login?method_name=index.aspx';"/>--%>
            <%--<img 
            alt="注销用户" style="" src="/Data/Image/logOut.png"   onclick="window.location.href='/View/Login?method_name=i--%>
        </div>
    </div>
    <div region="west" split="true" title="导航菜单" style="width: 200px; overflow: hidden;"
        icon="icon-redo">
        <div id="menu" class="easyui-accordion" fit="true" border="false">
            <%--<div title="应用功能" style="overflow:auto; padding: 10px;" icon="icon-edit">
                <div title="1">
                    <ul>
                        <li>
                            <div>
                                <img src="../Data/Image/16x16_members.gif" alt="用户ICO"/>&nbsp;
                                <a target="mainFrame_用户管理"  href="../BizPage/UserManager.aspx">用户管理</a>
                            </div>
                             <div>
                                <img src="../Data/Image/16x16_calendar.gif" alt="进度ICO"/>&nbsp;
                                <a target="mainFrame_进度查看" href="../BizPage/PlaneProgress.htm">进度查看</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div title="系统管理" style="padding: 10px;" icon="icon-edit">
                <div title="2">
                    <ul>
                        <li>
                            <div>
                                <img src="../Data/Image/16x14_favorites.gif" alt="用户ICO"/>&nbsp;
                                <a target="mainFrame_产品管理" href="" onclick="javascript:alert('未实现');">产品管理</a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="../Data/Image/16x14_favorites.gif" alt="用户ICO"/>&nbsp;
                                <a target="mainFrame_产品管理1" href="../BizPage/xiaopang.aspx" onclick="javascript:return true;alert('未实现');">部门表</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div title="关于" icon="icon-help">
             <div title="3">
                <h4>
                    当前系统处于...
                </h4>
            </div>
            </div>--%>
            <%=Com.JoinSoft.Services.IndexServices.SGetMainMenuInfo()%>
        </div>
    </div>
    <div region="center" id="mainPanle" style="background: #eee; overflow: hidden;">
        <div id="tabs" class="easyui-tabs" fit="true" border="false">
            <div title="主页" style="padding: 0px;" id="home">
                <iframe frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no"
                    allowtransparency="yes" src="/BizPage/TemplateList/TemplateList.aspx?formname=WelcomePage"
                    style="height: 99.9%; width: 99.9%"></iframe>
            </div>
        </div>
    </div>
    <div region="south" style="height: 25px; background: #D2E0F2;">
        <%--<div style="text-align: center; font-weight: bold">
            <span>欢迎用户:
                <% if (Com.JoinSoft.Services.ComServices.GetLoginUser() != null)
                   {
                       Response.Write(Com.JoinSoft.Services.ComServices.GetLoginUser().UserName);
                   }
                   else
                   {
                       Response.Write("----");
                   } %>
                &nbsp;&nbsp;&nbsp; 登陆时间:
                <%= DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") %>
                &nbsp;&nbsp;&nbsp; 当前数据库:
                <%=Com.JoinSoft.Services.ServerEntity.DbName %>
                &nbsp;&nbsp;&nbsp; 当前应用服务器: <a target="_blank" href="<%=Com.JoinSoft.Services.ServerEntity.ServerURL %>">
                    <%=Com.JoinSoft.Services.ServerEntity.ServerURL %>
                </a></span>
        </div>--%>
        <table border="0" width="100%" cellspacing="1" cellpadding="0" class="small">
            <tr>
                <td align="center" width="120">
                    <a href="#" onclick="$('#empdiv').window('open');$('#empdiv').window('expand');">共<input
                        type="text" id="user_count1" size="3">人在线 </a>
                </td>
                <td align="center" width="80">
                    &nbsp; <span id="new_sms"></span><span id="new_sms_sound" style="width: 1px; height: 1px;">
                    </span>
                </td>
                <td id="status_text_container" width="250" align="center">
                    登陆时间:
                    <%= DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") %>
                </td>
                <td width="100" align="center">
                    <div id="user">
                        <%-- &nbsp;&nbsp;&nbsp; 用户:
                        <%=((Com.JoinSoft.Services.UserEntity)(Com.JoinSoft.Services.ComServices.GetSession()["UserEntity"])).UserName%>--%>
                    </div>
                </td>
                <td width="100" align="center">
                    <div id="depart">
                        <%-- &nbsp;&nbsp;&nbsp; 部门:
                    <%=((Com.JoinSoft.Services.UserEntity)(Com.JoinSoft.Services.ComServices.GetSession()["UserEntity"])).UserName%>--%>
                    </div>
                </td>
                <td align="center" width="180">
                    &nbsp; &nbsp;&nbsp;&nbsp; 当前数据库:
                    <%=Com.JoinSoft.Services.ServerEntity.DbName %>
                </td>
                <td align="center">
                    &nbsp; &nbsp;&nbsp;&nbsp; 当前应用服务器: <a target="_blank" href="<%=Com.JoinSoft.Services.ServerEntity.ServerURL %>">
                        <%=Com.JoinSoft.Services.ServerEntity.ServerURL %>
                    </a>
                </td>
            </tr>
        </table>
    </div>
    <div id="win" class="easyui-window" title="我的消息" style="width: 255px; height: 550px"
        data-options="iconCls:'icon-save',closed:true,modal:false,resizable:false,draggable:true,minimizable:false,maximizable:false,top:50,left:1150">
        <div class="easyui-tabs" id="messageList" fit="true">
            <div id="MessageUnRead" title="未读">
                <div style="height: 419px">
                </div>
                <div id="MessageUnReadpp" style="background: #efefef; border: 1px solid #ccc;">
                </div>
            </div>
            <div id="MessageIsRead" title="已读">
                <div style="height: 419px">
                </div>
                <div id="MessageIsReadpp" style="background: #efefef; border: 1px solid #ccc;">
                </div>
            </div>
            <div id="MessageAll" title="全部">
                <div style="height: 419px">
                </div>
                <div id="MessageAllpp" style="background: #efefef; border: 1px solid #ccc;">
                </div>
            </div>
        </div>
    </div>
    <div id="empdiv" class="easyui-window" title="在线列表" style="width: 255px; height: 90%"
        data-options="iconCls:'icon-save',closed:true,modal:false,resizable:false,draggable:true,minimizable:false,maximizable:false,top:50,left:100">
        <ul id="emp">
        </ul>
    </div>
</body>
</html>
