<%@ Page Language="C#" AutoEventWireup="true"  %>
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
<link href="../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
    type="text/css" />
<link href="../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
<script src="../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
<script src="../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
  
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
        .easyui-accordion ul li div.selected a
        {
            color: #416AA3;
            font-weight: bold;
        }
    </style>

<script type="text/javascript" language="javascript">
    $(function () {
        InitLeftMenu();
        $('body').layout();
    });

       

        function InitLeftMenu() {
            $('.easyui-accordion li a').click(function () {
                var tabTitle = $(this).text();
                var url = $(this).attr("href");
                addTab(tabTitle, url);
                $('.easyui-accordion li div').removeClass("selected");
                $(this).parent().addClass("selected");
            }).hover(function () {
                $(this).parent().addClass("hover");
            }, function () {
                $(this).parent().removeClass("hover");
            });
        }

        function addTab(subtitle, url) {
            if (!$('#tabs').tabs('exists', subtitle)) {
                $('#tabs').tabs('add', {
                    title: subtitle,
                    content: createFrame(subtitle,url),
                    closable: true,
                    width: $('#mainPanle').width() - 10,
                    height: $('#mainPanle').height() - 26
                });
            } else {
                $('#tabs').tabs('select', subtitle);
            }
        }

        function createFrame(subtitle,url) {
            var s = '<iframe name="mainFrame_' + subtitle + '" scrolling="no" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
            return s;
        }
    </script>

</head>

<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
    <noscript>
        <div style="position: absolute; z-index: 100000; height: 2046px; top: 0px; left: 0px;
            width: 100%; background: white; text-align: center;">
            <img src="images/noscript.gif" alt='抱歉，请开启脚本支持！' />
        </div>
    </noscript>
    <div region="north" split="true" style="overflow: hidden; height: 40px; background: #D2E0F2 repeat-x center 50%;
        line-height: 20px; color: #2319DC;">
        <div style=" font-size:20px;">欢迎使用本系统</div>
    </div>
    
    <div region="west" split="true" title="导航菜单" style="width: 180px;overflow:hidden;" icon="icon-redo">
        <div id="menu" class="easyui-accordion" fit="true" border="false">
            <div title="应用功能" style="overflow:auto; padding: 10px;" icon="icon-edit">
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
            </div>
        </div>
    </div>
    <div region="center" id="mainPanle" style="background: #eee;overflow:hidden;">
        <div id="tabs" class="easyui-tabs" fit="true" border="false">
            <div title="主页" style="padding: 20px;" id="home">
                <h1>
                    我的任务中心...</h1>
            </div>
        </div>
    </div>

    <div region="south" style="height: 30px; background: #D2E0F2;">
        <div style="text-align: center; font-weight: bold">
        <span>
            欢迎用户:
            <% if (Com.JoinSoft.Services.ComServices.GetLoginUser() != null)
            {
                Response.Write(Com.JoinSoft.Services.ComServices.GetLoginUser().UserName);
            }
            else
            {
                Response.Write("----");
            } %>
            &nbsp;&nbsp;&nbsp;
            登陆时间:
            <%= DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") %>
            &nbsp;&nbsp;&nbsp;
            当前数据库:
            <%=Com.JoinSoft.Services.ServerEntity.DbName %>
            &nbsp;&nbsp;&nbsp;
            当前应用服务器:
            <a  target="_blank" href="<%=Com.JoinSoft.Services.ServerEntity.ServerURL %>">
            <%=Com.JoinSoft.Services.ServerEntity.ServerURL %>
            </a>
        </span>
       
         </div>
    </div>
</body>
</html>


 