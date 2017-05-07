<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="../Scripts/Metro-UI-CSS/min/iconFont.min.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/Metro-UI-CSS/min/metro-bootstrap.min.css" rel="stylesheet"
        type="text/css" />
    <%--  <script src="../Scripts/Metro-UI-CSS/docs/js/jquery/jquery.min.js" type="text/javascript"></script>--%>
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <%--<script src="../Scripts/Metro-UI-CSS/docs/js/jquery/jquery.widget.min.js" type="text/javascript"></script>--%>
    <script src="../Scripts/Metro-UI-CSS/min/metro.min.js" type="text/javascript"></script>
    <script src="../Scripts/Metro-UI-CSS/min/html5shiv.js" type="text/javascript"></script>
    <script src="../Scripts/Metro-UI-CSS/min/respond.min.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript">
       //刷新应用视图
        function reload(a) {
           if(a=="menu")
          {
            window.location.href = "MetroMenu.aspx";
          }
        else{
                window.location.href = "MetroMenu.aspx?id=" + a + "";       
                }
        }       
        //页面生成时定位当前目录
        function getPageID() { 
           var menuid ="<% =Request["id"] %>";
          return menuid;      
        }
    </script>
</head>
<body class="metro" style="background-color: #1BA1E2;">
    <div class="tile-area">
        <%=Com.JoinSoft.Services.MetroMenuServices.getMetroMenu(Request["id"])%>
    </div>
</body>
</html>
