<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadifyDemo.aspx.cs"
    Inherits="JQueryUploadDemo.UploadifyDemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html;charset=gb2312"/>
    <title>jQuery Uploaify Demo By Quber</title>
    <link href="../Scripts/Js/jQueryUploadify/Css/uploadify.css" rel="stylesheet" type="text/css"
        charset="gb2312" />
    <script src="../Scripts/Js/jQueryMin.js" type="text/javascript"></script>
    <script src="../Scripts/Js/jQueryUploadify/Js/jquery.uploadify.v2.1.4.js" type="text/javascript"
        charset="gb2312"></script>
    <script src="../Scripts/Js/jQueryUploadify/Js/swfobject.js" type="text/javascript"
        charset="gb2312"></script>
    <%--<script src="JS/json.js" type="text/javascript"></script>--%>
    <script src="../Scripts/JS/UploadifyDemo.js" type="text/javascript"></script>
    <script src="../Scripts/SystemJS/log.js" type="text/javascript"></script>
    <script src="../Scripts/downloadr/jqbrowser.js" type="text/javascript"></script>
    <script src="../Scripts/downloadr/downloadr.js" type="text/javascript"></script>
    <script src="../Scripts/facebox/facebox.js" type="text/javascript"></script>
    <link href="../Scripts/facebox/facebox.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="../Scripts/downloadr/downloadr.css" media="screen" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="uploadify-main">
        <div class="uploadify-info uploadify-tip">
        </div>
        <div class="uploadify-info uploadify-status">
        </div>
        <div class="uploadify-info">
            <div id="showUploadifyInfo" class="info">
            </div>
        </div>
        <div id="showUploadFile">
        </div>
        <div class="uploadify-clear">
        </div>
        <div class="uploadify-btn">
            <input type="file" name="uploadify" id="uploadifySelectFile" />
            <a id="lbtnUploadifyS" href="javascript:return false;">
                <img alt="开始上传" class="uploadify-img" src="../Scripts/Js/jQueryUploadify/Image/uploadifyStart.png" />
            </a><a id="lbtnUploadifyC" href="javascript:;">
                <img alt="取消上传" class="uploadify-img" src="../Scripts/Js/jQueryUploadify/Image/uploadifyCancel.png" />
            </a>
        </div>
    </div>
    </form>
</body>
</html>
