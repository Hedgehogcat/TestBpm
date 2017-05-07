$(function () {
    InitLeftMenu();
    $('body').layout();
    $("#user").html("<div>&nbsp;&nbsp;用户:" + username + "</div>");
    $("#depart").html("<div>&nbsp;&nbsp;部门:" + deptname + "</div>");
    $('#MessageUnReadpp,#MessageIsReadpp,#MessageAllpp').pagination({
        pageSize: size,
        pageList: [5, 10, 20, 30],
        showPageList: true,
        layout: ['first', 'prev', 'next', 'last', 'manual'],
        onSelectPage: function (pageNumber, pageSize) {
            ChangePage(pageNumber, pageSize);
        },
        onChangePageSize: function (pageSize) {
            size = pageSize;
            //移除多余数据
            var deleteindex = size * divcount;
            var title = "MessageUnRead";
            var index = $("#messageList").tabs("getTabIndex", $("#messageList").tabs("getSelected"));
            switch (index) {
                case 0:
                    title = "MessageUnRead";
                    break;
                case 1:
                    title = "MessageIsRead";
                    break;
                case 2:
                    title = "MessageAll";
                    break;
            }
            while ($("#" + title + " div:eq(0) div:eq(" + deleteindex + ")").length > 0) {
                $("#" + title + " div:eq(0) div:eq(" + deleteindex + ")").remove();
            }
        }
    });
    $('#messageList').tabs({
        onSelect: function (title) {
            SetMessageCount();
        }
    });

    //            $('#emp').datagrid({
    //                url: '/data/image/datagrid_data1.json',
    //                pagination: true,
    //                method: "get",
    //                columns: [[
    //                            { field: 'user', title: '用户', width: 60 },
    //                            { field: 'name', title: '职员', width: 50 },
    //                            { field: 'dept', title: '部门', width: 50 },
    //                            { field: 'status', title: '状态', width: 50 }
    //                        ]],
    //                onLoadSuccess: function (data) {
    //                    if (!empdatagridData) {
    //                        empdatagridData = data;
    //                        changeEmpState(data);
    //                    }
    //                }
    //            });
    var jsonstr = log.ajax.getMethodResult("Pub_GetTreeJson", "<datatype>proc</datatype><procname>GetDepartmentAndEmp</procname><attributes>identityid,identityname,username</attributes><icon>icon</icon>", "TEXT");
    $('#emp').tree({
        data: eval('(' + jsonstr + ')'),
        lines: true,
        onlyLeafCheck: false,
        cascadeCheck: false,
        checkbox: false,
        onLoadSuccess: function (node, data) {
            if (!empdatagridData) {
                empdatagridData = data;
                changeEmpState(data);
            }
        }
    });
    online_mon();
    setInterval(function () {
        setTimeout("online_mon()", 1000);
    }, 100000);
    setInterval(function () {
        if (!$("#empdiv").window("options").closed && !$("#empdiv").panel("options").collapsed) {
            changeEmpState(empdatagridData); 
        }
    }, 60000);
});
function changeEmpState(data) {
    var obj = log.ajax.onlineCallback('getOnlineData');
    if ($.type(obj) == "object") {
        if (obj.error === "false") {
            var onlineData = obj.onlineData;
            var roots = $("#emp").tree("getRoots");
            //循环检查树结构中的人员是否在线
            for (var j = 0; j < roots.length; j++) {
                var children = $("#emp").tree("getChildren", roots[j].target);
                for (var c = 0; c < children.length; c++) {
                    //叶子节点是人员
                    if ($("#emp").tree("isLeaf", children[c].target)) {
                        //检查是否在线
                        for (var o = 0; o < onlineData.length; o++) {
                            if (onlineData[o].user == children[c].attributes.username) {
                                var targetNode = $("#emp").tree("find", children[c].id).target;
                                $("#emp").tree("update", {
                                    target: targetNode,
                                    iconCls: "icon-online"
                                });
                                break;
                            }
                            else if (o == onlineData.length - 1) {
                                var targetNode = $("#emp").tree("find", children[c].id).target;
                                if (children[c].attributes.username) {
                                    $("#emp").tree("update", {
                                        target: targetNode,
                                        iconCls: "icon-offline"
                                    });
                                }
                            }
                        }
                    }
                }
            }
        } else {
            return;
        }
    } else {
        return;
    }
    empdatagridData = $("#emp").tree("options").data;
}

var empdatagridData;
var username = oUser.userName; //读取消息的登录人账号
var deptname = oUser.depName;
var size = 5; //每页消息数量
var divcount = 4; //每条消息的div数量<div id=''><fieldset><div><div>user time</div><div>content</div><div><a/><a/><a/></div></div></fieldset></div>
//消息按钮
//查看
function ViewMessage(messageid) {
    try {
        var aml = "<AML><Item type=\"XT_Message\" action=\"get\" where=\"XT_Message.id=(select source_id from innovator.XT_Message_Ref_Users where id='" + messageid + "')\"></Item></AML>";
        var res = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
        if (res.isError == "true" || res.count == 0) {
            $.messager.alert("Error", res.errorMsg, "error");
            return;
        }
        else {
            var formname = res.content[0].fformname;
            var itemname = "";
            var id = res.content[0].fid;
            var edit = "false";
            var amlstr = "<AML><Item type=\"ItemType\" action=\"get\"><Relationships><Item type=\"View\" action=\"get\"><related_id><Item type=\"Form\" action=\"get\"><name>" + formname + "</name></Item></related_id></Item></Relationships></Item></AML>";
            var result = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(amlstr) + "</aml>", "TEXT", "json");
            if (result.count == 1) {
                itemname = result.content[0].name;
            }
            else {
                $.messager.alert("Error", "Error!查询窗体关联信息失败！" + result.errorMsg, "error");
                return;
            }
            var resultaml = "<AML><Item type=\"" + itemname + "\" action=\"get\"><id>" + id + "</id></Item></AML>";
            var resultshow = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(resultaml) + "</aml>", "TEXT", "json");
            if (resultshow.isError == "true" || resultshow.count !== 1) {
                $.messager.alert("Error", "Error!查询消息关联单据失败！" + result.errorMsg, "error");
                return;
            }
            var param = new Object;
            param.action = "get";
            param.formname = formname;
            param.itemname = itemname;
            param.isEditmode = edit;
            param.id = id;
            var win = window.showModalDialog("/BizPage/TemplateDialog/TemplateDialogView.aspx?formname=" + formname + "&itemname=" + itemname + "&iseditmode=" + edit, param, "dialogWidth=900px;dialogHeight=550px;scroll:no;status:no");
            return;
        }
    } catch (e) {
        $.messager.alert("Error", e.toString(), "error");
    }
}
//回复
function ReviewMessage(messageid) {
    alert("回复");
}
//标记已读
function ReadMessage(messageid) {
    try {
        var name = "标记已读";
        var idList = "";
        if (!messageid) {
            name = "标记当前页";
        }
        else {
            idList = "'" + messageid + "'";
        }
        var aml = "<AML><Item type=\"XT_Message_Ref_Users\" action=\"edit\" where=\"XT_Message_Ref_Users.id in (" + idList + ")\"><isread>1</isread></Item></AML>";
        var res = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
        if (res.isError === "true" || (res.isError === "false" && res.count === 0)) {
            $.messager.alert("Error", "Error" + res.errorMsg, "error");
            return;
        }
        else {
            //修改未读和全部列表中的“标记已读”
            var unread = $("#MessageUnRead div:eq(0) div[id=" + messageid + "] a[name=isRead]").remove();
            if (unread) {
                $("#MessageUnRead div:eq(0) div[id=" + messageid + "] div:eq(2)").append("标记已读");
            }
            var all = $("#MessageAll div:eq(0) div[id=" + messageid + "] a[name=isRead]").remove();
            if (all) {
                $("#MessageAll div:eq(0) div[id=" + messageid + "] div:eq(2)").append("&nbsp;&nbsp;已读");
            }
            //将未读消息添加到已读列表
            if ($("#MessageUnRead div:eq(0) div[id=" + messageid + "]").length > 0 && $("#MessageIsRead div:eq(0) div[id=" + messageid + "]").length == 0) {
                $("#MessageUnRead div:eq(0) div[id=" + messageid + "]").remove().prependTo($("#MessageIsRead div:eq(0)"));
                //如果未读消息多于一页，删除
                var deleteindex = size * divcount;
                while ($("#MessageIsRead div:eq(0) div:eq(" + deleteindex + ")").length > 0) {
                    $("#MessageIsRead div:eq(0) div:eq(" + deleteindex + ")").remove();
                }
                SetMessageCount();
            }
        }
    } catch (e) {
        $.messager.alert("Error", e, "error");
    }
}
//翻页
function ChangePage(page, size) {
    try {
        var index = $("#messageList").tabs("getTabIndex", $("#messageList").tabs("getSelected"));
        var type = "所有";
        var tabId = "MessageAll";
        if (index == 0) {
            type = "未读取";
            tabId = "MessageUnRead";
        }
        else if (index == 1) {
            type = "已读取";
            tabId = "MessageIsRead";
        }
        //remove当前列表所有的消息数据，append
        $("#" + tabId + " div:eq(0) div").remove();
        SetMessageList(type, size, page);
    } catch (e) {
        $.messager.alert("Error", e, "error");
    }
}
function SetMessageList(type, size, page) {
    try {
        var allmsg = log.ajax.getMethodResult("XT_GetMessage", "<username>" + username + "</username><messagetype>" + type + "</messagetype><size>" + size + "</size><page>" + page + "</page>", "GRID2", "json");
        var total = allmsg.total;
        var unread = -1;
        var isread = -1;
        var title = "";
        var tempcount = -1;
        for (var i = 0; i < total; i++) {
            var s = "<div id=\"" + allmsg.rows[i].message_toid + "\">" +
                            "<fieldset>" +
                                " <div>&nbsp;" + allmsg.rows[i].created_by_id + "&nbsp;&nbsp;" + allmsg.rows[i].created_on + "</div>" +
                                " <div>" + allmsg.rows[i].body + "</div>" +
                                " <div style=\"text-align: right\">" +
                                   " <a href=\"javascript:void(0);\" onclick=\"ReviewMessage($(this).parent().parent().parent().attr('id'));\">回复</a>" +
                                   "&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"ViewMessage($(this).parent().parent().parent().attr('id'));\">查看</a>";
            if (allmsg.rows[i].isread == "0") {
                s += "&nbsp;&nbsp;<a name=\"isRead\" href=\"javascript:void(0);\" onclick=\"ReadMessage($(this).parent().parent().parent().attr('id'));\">标记已读</a>";
                s += "</div></fieldset></div>";
                if (unread < size - 1) {
                    unread++;
                }
                title = "MessageUnRead";
                tempcount = unread;
            }
            else {
                s += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已读";
                s += "</div></fieldset></div>";
                if (isread < size - 1) {
                    isread++;
                }
                title = "MessageIsRead";
                tempcount = isread;
            }
            if ((type == "未读取" && unread >= size) || (type == "已读取" && isread >= size) || (unread >= size && isread >= size)) {
                break;
            }
            if (type !== "所有") {
                //检查列表不存在
                if ($("#" + title + " div:eq(0) div[id=" + allmsg.rows[i].message_toid + "]").length == 0) {
                    //检查是否足够一页消息，添加消息，并移除最后个消息div
                    var deleteindex = size * divcount;
                    if (tempcount == 0)//i=0,要添加到首位
                    {
                        $(s).prependTo($("#" + title + " div:eq(0)"));
                    }
                    else if (tempcount != -1) {//添加到第(tempcount-1)位下面
                        var maxindex = (size - 1) * divcount;
                        //检查是否足够一页消息
                        if ($("#" + title + " div:eq(0) div:eq(" + maxindex + ")").length == 0) {
                            var insertindex = (tempcount - 1) * divcount;
                            $(s).insertAfter($("#" + title + " div:eq(0) div:eq( " + insertindex + " )"));
                        }
                    }
                    while ($("#" + title + " div:eq(0) div:eq(" + deleteindex + ")").length > 0) {
                        $("#" + title + " div:eq(0) div:eq(" + deleteindex + ")").remove();
                    }
                }
            }
            else {
                if ($("#MessageAll  div:eq(0) div[id=" + allmsg.rows[i].message_toid + "]").length == 0) {
                    //检查是否足够一页消息，添加消息，并移除最后个消息div
                    var deleteindex = size * divcount;
                    if (i == 0)//i=0,要添加到首位
                    {
                        $(s).prependTo($("#MessageAll div:eq(0)"));
                    }
                    else {//添加到第(tempcount-1)位下面
                        var maxindex = (size - 1) * divcount;
                        //检查是否足够一页消息
                        if ($("#MessageAll div:eq(0) div:eq(" + maxindex + ")").length == 0) {
                            var insertindex = (i - 1) * divcount;
                            $(s).insertAfter($("#MessageAll div:eq(0) div:eq( " + insertindex + " )"));
                        }
                    }
                    while ($("#MessageAll div:eq(0) div:eq(" + deleteindex + ")").length > 0) {
                        $("#MessageAll div:eq(0) div:eq(" + deleteindex + ")").remove();
                    }
                }
            }
        }
        //修改标题，分页数量
        SetMessageCount();
    } catch (e) {
        $.messager.alert("Error", e, "error");
    }
}
//        $(window).unload(function () {
//            $.messager.confirm('确认', '您确认想要退出登录吗？', function (r) {
//                if (r) {
//                    log.ajax.onlineCallback('loginOut');
//                }
//            });
//        });
//修改标题，分页数量
function SetMessageCount(t) {
    try {
        var counts = log.ajax.getMethodResult("XT_GetUserMessageCount", "<username>" + username + "</username>", "GRID2", "json");
        var count0 = 0;
        var count1 = 0;
        for (var c = 0; c < counts.total; c++) {
            if (counts.rows[0].isread !== "0") {
                count0 = 0;
                count1 = counts.rows[0].counts;
            }
            else {
                count0 = counts.rows[0].counts;
                if (c > 0) {
                    count1 = counts.rows[1].counts;
                }
            }
        }
        if (t) {
            if (count0 > 0) {
                sms_mon(true);
            }
            else {
                sms_mon(false);
            }
        }
        var count2 = Number(count0) + Number(count1);
        var index = $("#messageList").tabs("getTabIndex", $("#messageList").tabs("getSelected"));
        var title = "MessageUnRead";
        var count = "1";
        switch (index) {
            case 0:
                count = count0;
                title = "MessageUnRead";
                break;
            case 1:
                count = count1;
                title = "MessageIsRead";
                break;
            case 2:
                count = count2;
                title = "MessageAll";
                break;
        }
        if ($('#' + title + 'pp').pagination("options").total != count) {
            $('#' + title + 'pp').pagination('refresh', {
                total: count
            });
        }
        //修改名称
        if ($("#messageList").tabs("getTab", 0).panel("options").title !== "未读(" + count0 + ")") {
            $("#messageList").tabs("update", {
                tab: $("#messageList").tabs("getTab", 0), // 获取面板
                options: {
                    title: "未读(" + count0 + ")"
                }
            });
        }
        if ($("#messageList").tabs("getTab", 1).panel("options").title !== "未读(" + count1 + ")") {
            $("#messageList").tabs("update", {
                tab: $("#messageList").tabs("getTab", 1), // 获取面板
                options: {
                    title: "已读(" + count1 + ")"
                }
            });
        }
        if ($("#messageList").tabs("getTab", 2).panel("options").title !== "未读(" + count2 + ")") {
            $("#messageList").tabs("update", {
                tab: $("#messageList").tabs("getTab", 2), // 获取面板
                options: {
                    title: "全部(" + count2 + ")"
                }
            });
        }
    } catch (e) {
        $.messager.alert("Error", e, "error");
    }
}
setInterval(function () {
    //要执行的代码
    //刷新消息列表数据 
    //判断是否展开
    if (!$("#win").window("options").closed && !$("#win").panel("options").collapsed) {
        var index = $("#messageList").tabs("getTabIndex", $("#messageList").tabs("getSelected"));
        //检查，如果是第一页，刷新数据
        if (index == 0 && $("#MessageUnReadpp").pagination("options").pageNumber == 1) {
            SetMessageList("未读取", size, "");
        }
        else if (index == 1 && $("#MessageIsReadpp").pagination("options").pageNumber == 1) {
            SetMessageList("已读取", size, "");
        }
        else if (index == 2 && $("#MessageAllpp").pagination("options").pageNumber == 1) {
            SetMessageList("所有", size, "");
        }
        sms_mon(false);
    }
    else {
        sms_mon(false);
        SetMessageCount(true);
    }
    //新消息提示
    var msg = log.ajax.getMessage();
    if (msg == null || msg == undefined || !msg) {
        return;
    }
    $.messager.show({
        title: '<font color=white>系统短消息提醒</font>',
        msg: msg,
        showSpeed: 3000,
        timeout: 40000,     //40秒超时
        showType: 'show',
        width: 260,
        height: 160
    });
}, 3000);


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

function addTab(subtitle, url,id) {
    if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            id:id,
            title: subtitle,
            content: createFrame(subtitle, url),
            closable: true,
            width: $('#mainPanle').width() - 10,
            height: $('#mainPanle').height() - 26
        });
    } else {
        $('#tabs').tabs('select', subtitle);
    }
}

function createFrame(subtitle, url) {
    var s = '<iframe name="mainFrame_' + subtitle + '" scrolling="no" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
    return s;
}
function online_mon() {
    var obj = log.ajax.onlineCallback("getOnlineCount");

    if ($.type(obj) == "object") {
        if (obj.error === "false") {
            $("#user_count1").val(obj.onlineCount);
            //alert(obj.value);
        } else {
            $("#user_count1").val("-1");
        }

    } else {
        $("#user_count1").val("-1");
    }
    //                $("#user_count1").val(log.ajax.getOnlineCount());
    //                $("#user_count1").size = ($("user_count1").value.length < 3 ? 3 : $("user_count1").value.length);

}
function sms_mon(t) {
    if (t) {
        $("#new_sms").html("<a href=\"#\" onclick=\"$('#win').window('open');$('#win').window('expand');\" title=\"点击查看短信\"><img src=\"../Data/Image/sms.gif\" border=0 height=10> 短信</a>");
        $("#new_sms_sound").html("<object id='sms_sound' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='../Data/Image/swflash.cab' width='0' height='0'><param name='movie' value='../Data/Image/6.swf'><param name=quality value=high><embed id='sms_sound' src='../Data/Image/6.swf' width='0' height='0' quality='autohigh' wmode='opaque' type='application/x-shockwave-flash' plugspace='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'></embed></object>");
    }
    else {
        $("#new_sms").html("<a href=\"#\" onclick=\"$('#win').window('open');$('#win').window('expand');\" title=\"点击查看短信\"> 短信</a>");
        $("#new_sms_sound").html("");
    }
}