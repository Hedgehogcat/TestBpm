/*******************************************************
// Copyright (C) 凌云交汇软件公司版权所有。
// 方法功能描述：实现UI上的功能

//
//创建人：罗汉文
//创建日期：20140514
//
//修改标识：XXX 20XX年XX月XX日
//修改描述：增加XXX功能
//
//修改标识：XXX 20XX年XX月XX日
//修改描述：修改XXX功能
***************************************************/
try {
    log.fixDiv90862FORM(document);
}
catch (err1) {
    alert("Error:" + log.getErrorString(err1));
}

//try
//{
var inn = new Innovator();
var l = new log();
var L = l;
l.level = 5;

var Itemvalue = inn.applyMethod("M_MatchLog2GY_MrepairplanTree", "");
var datevalue = Itemvalue.getResult();
var dg1SQL = "";
var currSelectTreeNode = null; //当前选择的树节点
var currSelectPGH = ""; //
var currSelectDg1Row = null; //当前选择的 Dg1的行

var t_dep_itemID = "";  //领料部门
var t_dep_keyed_name = "";
var f_t_emp_itemID = ""; //发料人
var f_t_emp_keyed_name = "";
var t_emp_itemID = "";  //领料人
var t_emp_keyed_name = "";
function initWinParam() {
    //     t_dep_itemID = "";
    //     t_dep_keyed_name = "";
    //     f_t_emp_itemID = "";
    //     f_t_emp_keyed_name = "";
    //     t_emp_itemID = "";
    //     t_emp_keyed_name = "";
    /*win打开后，显示的是上次填入的值，有利于用户操作*/

}



//定义表格参数
itemName = "M_WorkCardNo10";
top.aras.colvar = GetColInfo("M_WorkCardNo10");
top.aras.where = "1=2";
var colvar = GetColInfo(itemName);
makessearchbox(top.aras.colvar, '', '', '', '', '', top.aras.where);


/*
选择某机型的某派工单信息
查询出其对应的配料信息【M_MatchLog】。
配料信息列表：派工号、工卡号、工卡名称、物料名称、图号、配套数量、批次号、领用状态、备注。
注：领用状态为领用的在此处不显示。
注：选定配产信息时，只能选定相同派工号、相同工卡的物料才能一次领料
工卡号、工卡名称,图号,不在此表 
M_MatchLog.fstatus !=0
*/
//var dg1Columns = GetColInfo("M_MatchLog");
//ID  是M_MatchLog 的id
var dg1Columns = [[
            { field: "ck", checkbox: true, title: "", data_source: "", width: 30 },
            { field: "id", title: "ID", data_type: "string", data_source: "", width: 40, hidden: true },
		    { field: "fowrkcardinfoid", title: "派工号", data_type: "string", data_source: "", width: 40, formatter: function (value, row, index) {
		        return currSelectPGH;
		    }
		    },
             { field: "m_workcardno10_id", title: "工卡ID", data_type: "string", data_source: "", width: 40, hidden: true },
		    { field: "fworkno", title: "工卡号", data_type: "string", data_source: "", width: 40, sortable: true },
		    { field: "fworkcardname", title: "工卡名称", data_type: "string", data_source: "", width: 40 },
		    { field: "fitemid", title: "物料内码", data_type: "string", data_source: "", width: 40, hidden: true },
		    { field: "fstockid", title: "仓库ID", data_type: "string", data_source: "", hidden: true, width: 40 },
		    { field: "gy_item_fname", title: "物料名称", data_type: "string", data_source: "", width: 40 },
		    { field: "fitemmodel", title: "图号", data_type: "string", data_source: "", width: 40 },
		    { field: "fmatchqty", title: "批次配套数量", data_type: "string", data_source: "", width: 40 },
		    { field: "flotno", title: "批次号", data_type: "string", data_source: "", width: 40 },
		    { field: "fstatus", title: "领用状态", data_type: "string", data_source: "", width: 0,
		        formatter: function (value, row, index) {
		            if (value == "1") {
		                return "是";
		            } else {
		                return "否";
		            }
		        }
		    },
		    { field: "fnote", title: "备注", data_type: "string", data_source: "", width: 40 }
		]];

var dg2Columns = [[
{ field: "gy_item_fname", title: "物料名称", data_type: "string", data_source: "", width: 40 },
{ field: "fitemmodel", title: "图号", data_type: "string", data_source: "", width: 40 },
{ field: "fmatchqty", title: "批次配套数量", data_type: "string", data_source: "", width: 40 },
{ field: "flotno", title: "批次号", data_type: "string", data_source: "", width: 40 },
{ field: "gy_stock_fname", title: "发料仓库", data_type: "string", data_source: "", width: 40 },
{ field: "fnote", title: "备注", data_type: "string", data_source: "", width: 40 }
]];


//=====================================================================================
//隐藏win 窗口
$('#win1').window('close');
//加载树
SetTree(datevalue);
top.aras.dg1SQLSTRING = "select null";
top.aras.dg1ORDERBY = "";
top.aras.dg1ORDERTYPE = "";
l.msg(5, "加载表格");
SetDg1(null);
l.msg(5, "表格初始化完成");
//=====================================================================================
//注册事件
$('#btnclose').bind('click', function () {
    $('#win1').window('close');
});
//保存
$('#btnsave').bind('click', function () {
    /*
    	保存当前信息入领料单主表：M_MatoutBill和M_MatoutBillList表；
    	更改即时库存表信息（M_Inventory），减少当前物料、当前批次号、当前仓库出库时对应的即时库存数量；
    	反写配套物料表（M_MatchLog）的领料信息：领用数量、领用人、领用时间、状态置为1；
    	反写装配器材需求表（M_assembledproductCardNo10），的领料数量

    */
    var isSuccess = false;

    try {
        if (t_dep_itemID === "" || f_t_emp_itemID === "" || t_emp_itemID === "") {
            l.msg(3, "领料人，发料人，领料部门是必填字段。需要填写。");
            return;
        }
        l.msg(5, "0");
        var userInfo = inn.applyMethod("PubGetUserInfo", "");
        var user_emp_id = userInfo.getProperty("empid", "");
        var dg1SelectRow = $("#dg1").datagrid("getSelected");
        var tree1Select = $('#tt').tree("getSelected");
        var selectRowsB = $("#dg1").datagrid("getSelections");

        /*fmakerid  制单人 t_emp
        fworkcardid 执行工卡内码 M_WorkCardNo10
        fworkcardno 执行工卡号  forgen
        fworkcardinfoid  派工内码 M_repairplan
        fworkcardinfono 派工号  forgen
        fyear 年度
        Period 月份
        fsmanagerid 领料人
        FPurposeID 领料类型{ 配套领料、申请领料}
        fdeptid 领料部门
        ffmanagerid 发料人
        fstockid 发货仓库
        FmakerID 制单人 t_Emp
        fbillno 单据编号*/

        l.msg(5, "1");
        var M_MatOutBillItem = inn.newItem("M_MatoutBill", "add");
        M_MatOutBillItem.setProperty("fmakerid", user_emp_id);
        M_MatOutBillItem.setProperty("fworkcardid", dg1SelectRow.m_workcardno10_id);
        M_MatOutBillItem.setProperty("fworkcardno", dg1SelectRow.fworkno);
        M_MatOutBillItem.setProperty("fworkcardinfoid", tree1Select.id);
        M_MatOutBillItem.setProperty("fworkcardinfono", dg1SelectRow.fowrkcardinfoid);
        M_MatOutBillItem.setProperty("fyear", log.date2Ystring());
        M_MatOutBillItem.setProperty("period", log.date2Mstring());
        M_MatOutBillItem.setProperty("fsmanagerid", t_emp_itemID);
        M_MatOutBillItem.setProperty("fpurposeid", "配套领料");
        M_MatOutBillItem.setProperty("fdeptid", t_dep_itemID);
        M_MatOutBillItem.setProperty("ffmanagerid", f_t_emp_itemID);
        //M_MatOutBillItem.setProperty("fstockid", gy_stock_id);//什么意思？ 选多个配料信息的时候，有多个仓库······此字段已作废
        M_MatOutBillItem.setProperty("fbillno", $("#djh").val());

        M_MatOutBillItem = M_MatOutBillItem.apply();
        if (M_MatOutBillItem.isError()) {
            l.msg(3, "向配套领用表增加数据时发生异常，" + M_MatOutBillItem.getErrorString());
            return;
        }

        l.msg(5, "2");
        var b_sourceid = M_MatOutBillItem.getID();
        l.msg(5, "3");
        for (var b = 0; b < selectRowsB.length; b++) {

            /*
            	更改即时库存表信息（M_Inventory），减少当前物料、当前批次号、当前仓库 出库时对应的即时库存数量
            查询规则：
            派工号+工卡号+物料+批次号+仓库 规则
            */
            var M_Inventory = inn.newItem("M_Inventory", "get");
            l.msg(5, "4");
            M_Inventory.setProperty("fworkcardno", dg1SelectRow.fworkno);
            M_Inventory.setProperty("fworkcardinfono", tree1Select.text);
            M_Inventory.setProperty("fitemid", selectRowsB[b].fitemid);
            M_Inventory.setProperty("fbatchno", selectRowsB[b].flotno);
            if (selectRowsB[b].fstockid === null || selectRowsB[b].fstockid === "" || selectRowsB[b].fstockid === undefined) {
                l.msg(3, "物料ID为：" + selectRowsB[b].fitemid + "的物料缺少仓库信息，不能确定及时库存数据，暂停领料。");
                return;
            }
            l.msg(5, "5");
            l.msg(5, "物料ID:" + selectRowsB[b].fitemid + "仓库ID:" + selectRowsB[b].fstockid);
            l.msg(5, "6");
            M_Inventory.setProperty("fstockid", selectRowsB[b].fstockid);  //仓库ID

            l.msg(5, "及时库存查询条件 AML ：" + M_Inventory);
            M_Inventory = M_Inventory.apply();
            if (M_Inventory.isError()) {
                //l.msg(3, "按照规则 派工号+工卡号+物料+批次号+仓库 查询，缺少即使库存数据,不能修改即时库存数量。");

            }
            else {
                if (M_Inventory.getItemCount() > 1) {
                    l.msg(3, "使用规则 派工号+工卡号+物料+批次号+仓库 查询，查询到多个库存数据，不唯一。");
                }
                else {
                    M_Inventory.setAction("edit");
                    //计算即使库存
                    var fqty = M_Inventory.getProperty("fqty", "0");
                    var jssl = selectRowsB[b].fmatchqty;
                    l.msg(5, "即使库存数量：" + fqty);
                    l.msg(5, "要减去的库存数量：" + jssl);

                    if (isNaN(jssl)) {
                        jssl = 0;
                    }
                    fqty = parseFloat(fqty) - parseFloat(jssl);
                    if (fqty < 0) {
                        alert("领料后库存为负数，停止领料");
                        return;
                    }
                    l.msg(5, "减去后的库存数量：" + fqty);
                    M_Inventory.setProperty("fqty", fqty); //设置库存数量
                    l.msg(5, "8");
                    M_Inventory = M_Inventory.apply();
                    if (M_Inventory.getItemCount() == -1) {
                        l.msg(3, "减少库存失败。" + M_Inventory.getErrorString());
                    }
                    l.msg(5, "9");

                }
            }
            l.msg(5, "10");
            /*
            fitemid 物料表内码 GY_Itemfqty
            fqty 数量
            fbatchno 批次号
            fstockid  发货仓库
            */

            var M_MatoutBillListItem = inn.newItem("M_MatoutBillList", "add");
            M_MatoutBillListItem.setProperty("source_id", b_sourceid);
            M_MatoutBillListItem.setProperty("fitemid", selectRowsB[b].fitemid);
            M_MatoutBillListItem.setProperty("fqty", selectRowsB[b].fmatchqty);
            M_MatoutBillListItem.setProperty("fbatchno", selectRowsB[b].flotno);
            M_MatoutBillListItem.setProperty("fstockid", selectRowsB[b].fstockid);
            M_MatoutBillListItem.setProperty("fisusesourceid", selectRowsB[b].id);
            M_MatoutBillListItem = M_MatoutBillListItem.apply();
            l.msg(5, "11");

            /*
            	反写配套物料表（M_MatchLog）的领料信息：领用数量、领用人、领用时间、状态置为1
            */
            var M_MatchLogItem1 = inn.newItem("M_MatchLog", "get");
            M_MatchLogItem1.setProperty("id", selectRowsB[b].id);
            M_MatchLogItem1 = M_MatchLogItem1.apply();
            if (M_MatchLogItem1.isError()) {
                isSuccess = false;
                l.msg(3, "反写配套物料表 时未找到需要反写的数据。");
            }
            else {
                M_MatchLogItem1.setAction("edit");
                M_MatchLogItem1.setProperty("foutqty", selectRowsB[b].fmatchqty); //领用数量
                M_MatchLogItem1.setProperty("fouterid", t_emp_itemID); //领用人
                M_MatchLogItem1.setProperty("foutdate", "__now()"); //领用时间
                M_MatchLogItem1.setProperty("fstatus", "1");
                M_MatchLogItem1 = M_MatchLogItem1.apply();
                l.msg(5, "12");
                if (M_MatchLogItem1.isError()) {
                    l.msg(3, "反写物料配套表 领用数量、领用人、领用时间、状态置为1 数据时发生错误:" + M_MatchLogItem1.getErrorString());
                }
                else {
                    l.msg(5, "13");

                    /*	反写装配器材需求表（M_assembledproductCardNo10），的领料数量 M_AssemblyproductCardNo10*/

                    var M_assembledproductCardNo10Item1 = inn.newItem("M_AssemblyproductCardNo10", "get");
                    M_assembledproductCardNo10Item1.setProperty("id", M_MatchLogItem1.getProperty("source_id", ""));
                    M_assembledproductCardNo10Item1 = M_assembledproductCardNo10Item1.apply();
                    l.msg(5, "14");

                    if (M_assembledproductCardNo10Item1.isError()) {
                        isSuccess = false;
                        l.msg(3, "反写装配器材需求表 时发生错误，未找到需要反写的数据");
                    }
                    else {
                        l.msg(5, "15");

                        var fqty2 = M_assembledproductCardNo10Item1.getProperty("fqty", "0");
                        if (isNaN(parseFloat(fqty2))) {
                            l.msg(3, "原始领料数量为非数字，将置为0后进行计算。");
                            fqty2 = 0;
                        }

                        fqty2 = parseFloat(fqty2) + parseFloat(selectRowsB[b].fmatchqty);
                        M_assembledproductCardNo10Item1.setAction("edit");

                        M_assembledproductCardNo10Item1.setProperty("fqty", fqty2);
                        M_assembledproductCardNo10Item1 = M_assembledproductCardNo10Item1.apply();

                        // L.msg(3,M_assembledproductCardNo10Item1.ToString());

                        if (M_assembledproductCardNo10Item1.isError()) {
                            l.msg(3, "反写装配器材需求表的领用数量时发生错误:" + M_assembledproductCardNo10Item1.getErrorString());
                        }

                        l.msg(5, "16");
                        //修改状态为是
                        //表格2找到表格1中的数据》》改成刷新当前页数据
                        $("#dg1").datagrid("reload");

                        isSuccess = true;
                    }
                }
            }
        }
    }
    catch (err_Save) {
        isSuccess = false;
        $("#dg1").datagrid("reload");
        log.msg(3, "领料失败." + log.getErrorString(err_Save));

    }

    if (isSuccess === true) {
        log.msg(3, "领料成功.");
        $("#win1").window("close");
    }
    else {
        log.msg(3, "领料失败.");
    }
    $("#dg1").datagrid("unselectAll");




});



//生产领用
$('#btn_scly').bind('click', function () {
    if (!isotherPerm('M_MatOutBill', '生产领用')) {
        top.aras.AlertError("您没有该功能的权限！");
        return;
    }
    initWinParam();
    //准备数据
    var selectRows = $("#dg1").datagrid("getSelections");
    // L.msg(3,log.jsonObject2string(selectRows));
    if (selectRows.length <= 0) {
        l.msg(3, "先选择数据");
        return;
    }
    //检查配套是否完成
    for (var _a = 0; _a < selectRows.length; _a++) {
        if (selectRows[_a].fstatus == "1") {
            log.msg(3, "存在已久配套的数据，不能继续配套。");
            return;
        }

    }

    $("#win1").window("open");

    var firstR = selectRows[0];
    //生成当前时间
    var ymd = log.date2YMDstring();
    //生成单据号
    var djh = inn.applyMethod("publicUserGenSeqNum", "<type>1</type><numlength>4</numlength><tablename>M_MatOutBill</tablename><filedname>fbillno</filedname><prevstr>Out</prevstr>").getResult();
    $("#djh").val(djh);
    $("#rq").val(ymd);
    $("#pgh").val(currSelectPGH); //firstR.fowrkcardinfoid?????
    $("#gkh").val(firstR.fworkno);
    //查询物料,获取仓库
    var objData = { 'total': 1, 'rows': []
    };
    var objArr = [];

    for (var a = 0; a < selectRows.length; a++) {
        var t = { id: null, gy_item_fname: null, fitemmodel: null, fmatchqty: null,
            flotno: null, fnote: null, gy_stock_fname: null, gy_stock_id: null
        };
        t.id = selectRows[a].id;
        t.gy_item_fname = selectRows[a].gy_item_fname;
        t.fitemmodel = selectRows[a].fitemmodel;
        t.fmatchqty = selectRows[a].fmatchqty;
        t.flotno = selectRows[a].flotno;
        t.fnote = selectRows[a].fnote;


        var ckName = "";
        var gyItem1 = inn.getItemById("GY_Item", selectRows[a].fitemid); //fstockid
        if (gyItem1.isError()) {
            ckName = "";
        }
        else {
            ckID = gyItem1.getProperty("fstockid", "");
            ckName = gyItem1.getPropertyAttribute("fstockid", "keyed_name");
        }
        t.gy_stock_fname = ckName;
        t.gy_stock_id = ckID;
        objArr.push(t);
    }
    objData.rows = objArr;
    //初始化格子
    SetDg2();
    $('#dg2').datagrid('loadData', objData);




});


$('#btn_refresh').bind('click', function () {
    //刷新
});
//领料部门
$('#llbm').bind('click', function () {
    var itemContextVar = {}; //
    var itemtypeNameVar = "T_Department";
    var sourceItemTypeNameVar = "";
    var sourcePropertyNameVar = "";
    var currItemType = "";


    var res = top.showModalDialog(top.aras.getScriptsURL() +
 'searchDialog.html',
 { aras: window.top.aras, itemtypeName: itemtypeNameVar,
     itemContext: itemContextVar, sourceItemTypeName: sourceItemTypeNameVar,
     sourcePropertyName: sourcePropertyNameVar
 },
  'dialogHeight: 450px; dialogWidth: 700px; status:0; help:0; resizable:1;scroll:0;');

    //处理结果
    if (res) {
        t_dep_itemID = res.itemID;  //职员ID
        t_dep_keyed_name = res.keyed_name;
    }
    else {
        t_dep_itemID = "";  //职员ID
        t_dep_keyed_name = "";
    }

    $('#llbm').val(t_dep_keyed_name);
});
//领料ren
$('#llr').bind('click', function () {
    var itemContextVar = {}; //
    var itemtypeNameVar = "T_Emp";
    var sourceItemTypeNameVar = "";
    var sourcePropertyNameVar = "";
    var currItemType = "";


    var res = top.showModalDialog(top.aras.getScriptsURL() +
 'searchDialog.html',
 { aras: window.top.aras, itemtypeName: itemtypeNameVar,
     itemContext: itemContextVar, sourceItemTypeName: sourceItemTypeNameVar,
     sourcePropertyName: sourcePropertyNameVar
 },
  'dialogHeight: 450px; dialogWidth: 700px; status:0; help:0; resizable:1;scroll:0;');

    //处理结果
    if (res) {
        t_emp_itemID = res.itemID;  //职员ID
        t_emp_keyed_name = res.keyed_name;
    }
    else {
        t_emp_itemID = "";  //职员ID
        t_emp_keyed_name = "";
    }

    $('#llr').val(t_emp_keyed_name);
});
//发料ren
$('#flr').bind('click', function () {

    var itemContextVar = {}; //
    var itemtypeNameVar = "T_Emp";
    var sourceItemTypeNameVar = "";
    var sourcePropertyNameVar = "";
    var currItemType = "";


    var res = top.showModalDialog(top.aras.getScriptsURL() +
 'searchDialog.html',
 { aras: window.top.aras, itemtypeName: itemtypeNameVar,
     itemContext: itemContextVar, sourceItemTypeName: sourceItemTypeNameVar,
     sourcePropertyName: sourcePropertyNameVar
 },
  'dialogHeight: 450px; dialogWidth: 700px; status:0; help:0; resizable:1;scroll:0;');

    //处理结果
    if (res) {
        f_t_emp_itemID = res.itemID;  //职员ID
        f_t_emp_keyed_name = res.keyed_name;
    }
    else {
        f_t_emp_itemID = "";  //职员ID
        f_t_emp_keyed_name = "";
    }

    $('#flr').val(f_t_emp_keyed_name);
});






function SetTree(TreeVal) {
    if (TreeVal === "" || TreeVal === null || TreeVal === undefined) {
        alert("未查询到数据.");
        TreeVal = "[]";
    }

    $('#tt').tree({
        lines: true,
        data: eval("(" + TreeVal + ")"),
        onSelect: function (node) {
            if (node.text == "派工任务") {
                //顶级阶段，放弃
                return;
            }
            var parent = $('#tt').tree("getParent", node.target);
            if (parent !== undefined && parent !== null && parent.text === "派工任务") {
                //二级节点 ，放弃
                return;
            }
            currSelectPGH = node.text;
            //点击刷新数据


            /*
            查询出当前执行工卡的已配套记录【M_MatchLog】。
            */
            //查询执行工卡信息
            /*
            var selectWCaradNo10 = "select M.id as id from innovator.M_WorkCardNo10 as M , innovator.M_Repairplan as R " +
            "where M.FJOBNUMBER=R.id and R.FWORKCARDINFOID ='" + node.text + "'";
            l.msg(5, "查询执行工卡信息>>" + selectWCaradNo10);
            top.aras.where = "M_MatchLog.fstatus !=0 and M_MatchLog.SOURCE_ID in " +
            "(select id from innovator.M_AssemblyproductCardNo10 where SOURCE_ID in(select id from innovator.M_WorkCardNo10 where id in (" + selectWCaradNo10 + ")))";
            top.aras.aml = "<AML><Item type='M_MatchLog' action='get'></Item></AML>";
            */
            l.msg(5, "选择的派工号：" + currSelectPGH);
            SetDg1(currSelectPGH);
        }
    });
}


function SetDg1(currSelectPGH) {

    if (!log.isValidVar2(currSelectPGH)) {
        currSelectPGH = "";
        dg1SQL = "select AT.ID as id, AT.fitemid,AT.fmatchqty,AT.flotno,AT.fstatus,AT.fnote,CT.fworkno,CT.fworkcardname,BT.fitemmodel,ET.fname as GY_Item_fname,ET.fstockid as fstockid,CT.id as M_WorkCardNo10_id  " +
"from innovator.M_MatchLog AS AT,innovator.M_AssemblyproductCardNo10 As BT ,innovator.M_WorkCardNo10 As CT,  " +
"innovator.M_Repairplan As DT ,innovator.GY_Item As ET  " +
"where AT.fstatus=0 and DT.FWORKCARDINFOID ='" + currSelectPGH + "' and DT.id=CT.FJOBNUMBER    and CT.ID =BT.SOURCE_ID and AT.SOURCE_ID=BT.ID and  AT.fitemid=ET.id";

        top.aras.dg1SQLSTRING = dg1SQL;
        top.aras.dg1ORDERBY = "fworkno";
        top.aras.dg1ORDERTYPE = "DESC";
    }
    else {

        dg1SQL = "select AT.ID as id, AT.fitemid,AT.fmatchqty,AT.flotno,AT.fstatus,AT.fnote,CT.fworkno,CT.fworkcardname,BT.fitemmodel,ET.fname as GY_Item_fname,ET.fstockid as fstockid,CT.id as M_WorkCardNo10_id  " +
"from innovator.M_MatchLog AS AT,innovator.M_AssemblyproductCardNo10 As BT ,innovator.M_WorkCardNo10 As CT,  " +
"innovator.M_Repairplan As DT ,innovator.GY_Item As ET  " +
"where AT.fstatus=0 and DT.FWORKCARDINFOID ='" + currSelectPGH + "' and DT.id=CT.FJOBNUMBER    and CT.ID =BT.SOURCE_ID and AT.SOURCE_ID=BT.ID and  AT.fitemid=ET.id";
        l.msg(5, "查询出当前执行工卡的已配套记录>>" + dg1SQL);
        top.aras.dg1SQLSTRING = dg1SQL;
        top.aras.dg1ORDERBY = "fworkno";
        top.aras.dg1ORDERTYPE = "DESC";
    }

    $(".datagrid-header-check").attr("disabled", "disabled");
    ////log.fixHeight4Parent($("#dg1")[0], 1), //log.fixWidth4Parent($("#dg1")[0], 1),
    $("#dg1").datagrid({
        url: '../../Server/GetServerJsons.aspx',
        height: log.fixHeight4ID("sjlb", 0.98),
        width: log.fixWidth4ID("sjlb", 0.99),
        //            height:380,
        //            width:850,
        fitColumns: true, //自适应列宽
        idField: 'id',
        autoRowHeight: true, //自适应行高
        rownumbers: true, //显示行数
        striped: true, //交替显示行背景
        nowrap: false, //超出列宽自动截取长度
        pagination: true, //显示底部工具栏 
        pagesize: 50,
        singleSelect: false,
        collapsible: true,
        columns: dg1Columns,
        remoteSort: false,
        sortName: 'fworkno', //初始排序字段
        sortOrder: 'desc', //初始排序方式
        method: 'post',
        queryParams: {
            JF: "GRID2",
            SERVERURL: top.aras.getServerURL() + "/InnovatorServer.aspx",
            TYPE: 'SQLFY',
            SQLSTRING: top.aras.dg1SQLSTRING,
            ORDERBY: top.aras.dg1ORDERBY,
            ORDERTYPE: top.aras.dg1ORDERTYPE,
            DATABASE: top.aras.getDatabase(),
            AUTHUSER: top.aras.getLoginName(),
            AUTHPASSWORD: top.aras.getPassword()
        },
        onSelect: function (rowIndex, rowData) {
            //和之前选择的行左比较，比较所选行的 工卡号 ，工卡号一致的才能一次配料
            var firstSelectedRow = $("#dg1").datagrid("getSelected");
            if (firstSelectedRow === null) {
                return;
            }
            var gkh = firstSelectedRow.fworkno;
            if (rowData.fworkno !== gkh) {
                l.msg(3, "所选择的数据工卡号和其他行选择的工卡号不一致 ，请选择工卡号一致的进行处理.");
                //取消选择的行
                $("#dg1").datagrid("unselectRow", rowIndex);
            }
        },
        onLoadSuccess: function (data) {
            $("#dg1").datagrid("unselectAll");
        },
        onLoadError: function () {
            alert("绑定表格错误！");
        },
        onClickRow: function (rowIndex, rowData)
        { },
        onDblClickRow: function (rowIndex, rowData) {

        }

    });
    $(".datagrid-header-check").attr("disabled", "disabled");
    $("#dg1").datagrid("unselectAll");
}

function SetDg2() {
    $("#dg2").datagrid({
        //url: '../../Server/GetServerJsons.aspx',
        //            height: log.fixHeight4ID("sjlb1",1),
        //            width: log.fixWidth4ID("sjlb1",1),
        fitColumns: true, //自适应列宽
        idField: 'id',
        autoRowHeight: true, //自适应行高
        rownumbers: true, //显示行数
        singleSelect: true, //行单选 一起一次配料
        striped: true, //交替显示行背景
        nowrap: false, //超出列宽自动截取长度
        pagination: true, //显示底部工具栏 
        collapsible: true,
        columns: dg2Columns,
        method: 'post',
        queryParams: {
            JF: "GRID2",
            SERVERURL: top.aras.getServerURL() + "/InnovatorServer.aspx",
            TYPE: 'AML',
            BODY: top.aras.where,
            DATABASE: top.aras.getDatabase(),
            AUTHUSER: top.aras.getLoginName(),
            AUTHPASSWORD: top.aras.getPassword(),
            AML: "<AML><Item action='get' type='user' where='1=2'></Item></AML>"
        },
        onSelect: function (rowIndex, rowData) {

        },
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert("绑定表格错误！");
        },

        onLoadSuccess: function (data) {

        },
        onClickRow: function (rowIndex, rowData)
        { },
        onDblClickRow: function (rowIndex, rowData) {

        }
    });
    $("#dg2").datagrid("unselectAll");
}
//}
//catch (err)
//{
//    alert("程序有异常信息：" + log.object2string(err,1));
//}

