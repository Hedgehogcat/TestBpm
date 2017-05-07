<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MetroMenuHead.aspx.cs"
    Inherits="Com.JoinSoft.Common.MetroMenuHead" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="../Scripts/Metro-UI-CSS/min/iconFont.min.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/Metro-UI-CSS/min/metro-bootstrap.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../Scripts/Metro-UI-CSS/docs/js/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="../Scripts/Metro-UI-CSS/min/metro.min.js" type="text/javascript"></script>
    <script src="../Scripts/Metro-UI-CSS/min/html5shiv.js" type="text/javascript"></script>
    <script src="../Scripts/Metro-UI-CSS/min/respond.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var json = { "home": "主页", "menu": "菜单" };
        function setLocation(id, title) {
            if (id == "") {
                id = "menu";
            }
            if (!json[id]) {
                json[id] = document.getElementById("_location").innerHTML + "/" + title;
            }
            if (id == "home" || id == "menu") {
                document.getElementById("_location").innerHTML = json[id];
            }
            else {
                document.getElementById("_location").innerHTML = json[id];
            }
        }
        function lastMenu() {
            var str = document.getElementById("_location").innerHTML;
            str = str.substring(0, str.lastIndexOf("/"));
            var last_id = "";
            if (str != "") {
                for (x in json) {
                    if (json[x] === str) {
                        last_id = x;
                        break;
                    }
                }
                parent.window.lastMenu(last_id);
            }
        }
    </script>
    <title></title>
</head>
<body class=" metro">
    <div class="navigation-bar ">
        <div class="navigation-bar-content">
            <span class="element  icon-cc-share">武汉凌云交汇软件</span> <span class="element-divider">
            </span><span id="_location" class="element icon-location">菜单</span><span class="element-divider"></span>
            <button class="element icon-switch place-right bg-cyan" onclick="window.parent.reload();">
                注销
            </button>
            <span class="element-divider" title=""></span>
            <button class="element   icon-redo place-right bg-cyan" onclick="lastMenu();">
                上级菜单
            </button>
            <span class="element-divider"></span>
            <button class="element icon-home place-right bg-cyan" onclick="window.parent.dirUrl('');">
                主界面
            </button>
        </div>
    </div>
</body>
</html>
