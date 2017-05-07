<%@ Page Language="C#" AutoEventWireup="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
    <title>欢迎登陆系统</title>
    <link href="../Data/css/login.css" rel="stylesheet" type="text/css" rev="stylesheet"
        media="all" />
    <link href="../Data/css/demo.css" rel="stylesheet" type="text/css" rev="stylesheet"
        media="all" />
    <link href="../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <link href="../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        function getCookieValue(name) {
            var allcookies = document.cookie;
            name += "=";
            var pos = allcookies.indexOf(name);
            if (pos != -1) {
                var start = pos + name.length;
                var end = allcookies.indexOf(";", start);
                if (end == -1) end = allcookies.length;
                var value = allcookies.substring(start, end);
                return (value);
            } else {
                return "";
            }
        }
        $(function () {
            var userNameValue = getCookieValue("userName_login");
            $('#txtUserID').textbox('setValue', userNameValue);
        })

        document.onkeydown = function (event_e) {
            if (window.event) {
                event_e = window.event;
            }
            var int_keycode = event_e.charCode || event_e.keyCode;
            if (int_keycode == '13') {
                //your handler function,please.              
                checkLogin();
                return false;
            }
        }

        function refImg() {
            document.getElementById("imgReg").src = "RegImg.aspx?t=" + new Date();
        }
        function checkLogin() {
            var txtUserID = $.trim($("#txtUserID").val());
            var txtPassword = $.trim($("#txtPassword").val());
            //var txtReg = $.trim($("#txtReg").val());
            if (txtUserID == "") {
                $("#lblRegMsg").text("用户名不能为空");
                return;
            }
            else if (txtPassword == "") {
                $("#lblRegMsg").text("密码不能为空");
                return;
            }
            //进行登录操作 http://localhost:1897/View/index.aspx
            $("#lblRegMsg").text("");
            $.ajax({
                url: "/Common/Login.aspx",
                type: "POST",
                data: {
                    'userName': txtUserID,
                    'pwd': txtPassword
                    //                    ,
                    //                    'reg': txtReg
                },
                dataType: 'text',
                success: function (data) {

                    if (data.toString() == "true") {
                        document.cookie = "userName_login=" + txtUserID;
                        var date = new Date();
                        date.setTime(date.getTime() + 7200000 * 60 * 1000);
                        document.cookie = "expires=" + date.toGMTString();
                        document.cookie = "path=/";
                        window.location.href = "index";
                    }
                    else {
                        $("#lblRegMsg").text(data.toString());
                    }
                },
                error: function (data) {
                    alert("登录异常，请联系管理员！" + data);
                }
            });
        }
    </script>
</head>
<body style="background: url(../Data/Image/theme-pic2.jpg) #BCE0FF top center  no-repeat;">
    <form id="form1" runat="server">
    <div class="banner">
        <div class="login-aside">
            <%--<div id="o-box-up">
            </div>--%>
            <div id="o-box-down" style="table-layout: fixed;">
                <div class="error-box">
                </div>
                <div class="fm-item">
                    <label for="logonId" class="form-label">
                        用户名：</label>
                    <input class="easyui-textbox" style="width: 60%; height: 30px; padding: 12px" data-options="prompt:'输入用户名',iconCls:'icon-man',iconWidth:38"
                        type="text" id="txtUserID" tabindex="1" />
                    <div class="ui-form-explain">
                    </div>
                </div>
                <div class="fm-item">
                    <label for="logonId" class="form-label">
                        密&nbsp;&nbsp;码：</label>
                    <input class="easyui-textbox" style="width: 60%; height: 30px; padding: 12px" data-options="prompt:'输入密码',iconCls:'icon-lock',iconWidth:38"
                        type="password" id="txtPassword" tabindex="2" />
                    <div class="ui-form-explain">
                    </div>
                </div>
                <%--<div class="fm-item">
                    <label for="logonId" class="form-label">
                        数据库：</label>
                    <input type="" id="Password1" tabindex="2" />
                    <div class="ui-form-explain">
                    </div>
                </div>--%>
                <div class="fm-item pos-r">
                    <%-- <label for="logonId" class="form-label">
                        验证码:</label>
                    <input type="text" id="txtReg" tabindex="3" style="width: 60px; vertical-align: top" />--%>
                    <%-- <img id="imgReg" height="25px" width="95px" src="RegImg.aspx" onclick="refImg()" />--%>
                </div>
                <div id="lblRegMsg" style="color: Red">
                </div>
                <div class="fm-item btn">
                    <label for="logonId" class="form-label">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <%--<div style="width:30px;display:inline-block"></div>--%>
                    <a href="#" id="btnSubmit" class="easyui-linkbutton" onclick="checkLogin()" style="padding: 1px 0px;
                        width: 25%; height: 95%; text-align: center;"><span style="font-size: 10pt;">登&nbsp;&nbsp;录</span>
                    </a>
                    <div class="ui-form-explain">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
