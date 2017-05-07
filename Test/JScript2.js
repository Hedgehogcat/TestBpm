/*******************************************************
// Copyright (C) 凌云交汇软件公司版权所有。
// 方法功能描述：配套信息查询

//
//创建人：罗汉文
//创建日期：20140730
//
//修改标识：XXX 20XX年XX月XX日
//修改描述：增加XXX功能
//
//修改标识：XXX 20XX年XX月XX日
//修改描述：修改XXX功能
***************************************************/



try {
    var inn = new Innovator();
    var l = new log();
    l.level = 6;
    log.fixDiv90862FORM(document);
    //function (queryGridID, clientDivID, successCallFun, errorCallFun)
    debugger;
    log.ajax.getSerachCodeHTML("1", "div_serach", null, null);
    //定义表格参数
    itemName = "M_Matchlog";
    top.aras.where = "1=2";
    var dg1Columns = [[
             { field: "ck", checkbox: true, title: "勾选", data_source: "", width: 30 },
            { field: "id", title: "ID", data_type: "string", data_source: "", hidden: true },
		    { field: "fworkcardinfoid", title: "派工号", data_type: "string", data_source: "", width: 40 },
             { field: "m_workcardno10_id", title: "工卡ID", data_type: "string", data_source: "", width: 40 },
		    { field: "fworkno", title: "工卡号", data_type: "string", data_source: "", width: 40 },
		    { field: "fworkcardname", title: "工卡名称", data_type: "string", data_source: "", width: 40 },
		    { field: "fitemid", title: "物料内码", data_type: "string", data_source: "", width: 40 },
		    { field: "gy_item_fname", title: "物料名称", data_type: "string", data_source: "", width: 40 },
		    { field: "fitemmodel", title: "图号", data_type: "string", data_source: "", width: 40 },
		    { field: "fmatchqty", title: "批次配套数量", data_type: "string", data_source: "", width: 40 },
		    { field: "flotno", title: "批次号", data_type: "string", data_source: "", width: 40 },
            { field: "fmatcherid", title: "配套人", data_type: "string", data_source: "", width: 40 },
            { field: "fmatchdate", title: "配套时间", data_type: "string", data_source: "", width: 40 },
            { field: "foutqty", title: "领用数量", data_type: "string", data_source: "", width: 40 },
            { field: "fouterid", title: "领用人", data_type: "string", data_source: "", width: 40 },
            { field: "foutdate", title: "领用时间", data_type: "string", data_source: "", width: 40 },
            { field: "fstatus", title: "领用状态", data_type: "string", data_source: "", width: 40 },
            { field: "fprintnum", title: "打印次数", data_type: "string", data_source: "", width: 40 },
            { field: "fstockid", title: "仓库ID", data_type: "string", data_source: "", width: 40 },
		    { field: "fnote", title: "备注", data_type: "string", data_source: "", width: 40 }
		]];


    //=====================================================================================
    //注册事件
    $('#btnQuery').bind('click', function () {
        if (!isotherPerm('MatchGet', '查询')) {
            top.aras.AlertError("您没有该功能的权限！");
            return;
        }
        var inputStr = document.getElementById("pgh").value;
        if (inputStr === null || inputStr === "") {
            alert("请输入完整的派工号");
            return;
        }

        currSelectPGH = inputStr;
        QueryGrid(currSelectPGH);

    });
    $('#btnclose').bind('click', function () {
        $('#win1').window('close');
    });
    //删除
    $('#btndelete').bind('click', function () {
        if (!isotherPerm('MatchGet', '删除')) {
            top.aras.AlertError("您没有该功能的权限！");
            return;
        }
        try {
            l.msg(5, "执行删除");
            var row = $('#dg1').datagrid('getSelected');
            var state = row.fstatus;
            if (state.toString() !== "0") {
                alert("单据状态不为【未领用】状态，不能删除！");
                return;
            }
            l.msg(5, "1");

            var gkh = row.fworkno;
            var pgh = row.fworkcardinfoid;
            var fitemid = row.fitemid;
            var flotno = row.flotno;
            var ckid = row.fstockid;

            var M_WorkCardNo10_id = row.m_workcardno10_id;

            var fmatchqty = row.fmatchqty;
            l.msg(5, "2");

            //删除操作
            var m_matchlog_id = row.id;
            var M_Matchlog_Item = inn.newItem("M_Matchlog", "delete");
            M_Matchlog_Item.setID(m_matchlog_id);
            M_Matchlog_Item = M_Matchlog_Item.apply();
            if (M_Matchlog_Item.isError()) {
                alert("删除及时库存是错误:" + M_Matchlog_Item.getErrorString());
                return;
            }
            l.msg(5, "3");
            //反写器材需求表
            var M_Inventory = inn.newItem("M_Inventory", "get");
            M_Inventory.setProperty("fworkcardno", gkh);
            M_Inventory.setProperty("fworkcardinfono", pgh);
            M_Inventory.setProperty("fitemid", fitemid);
            M_Inventory.setProperty("fbatchno", flotno);
            M_Inventory.setProperty("fstockid", ckid);
            l.msg(5, "及时库存查询条件 AML ：" + M_Inventory);
            M_Inventory = M_Inventory.apply();
            if (M_Inventory.getItemCount() !== 1) {
                alert("安装规则检查及时库存信息时出现异常，查询数据总数不为1." + M_Inventory.getItemCount() + "详细信息：" + M_Inventory.getErrorString());
                return;
            }
            //修改状态
            M_Inventory.setAction("edit");
            var count = M_Inventory.getProperty("fqty", "0");
            try {
                count = parseFloat(count) - parseFloat(fmatchqty);

            }
            catch (err1) {
                alert("库存计算出现错误." + err1);
                return;
            }
            if (count < 0) {
                alert("错误，库存计算为负数。");
                return;
            }
            l.msg(5, "4");
            if (isNaN(parseFloat(count))) {
                alert("修改即时库存失败,计算出的库存数量为非数字。");
                return;
            }
            M_Inventory.getProperty("fqty", "0");
            M_Inventory = M_Inventory.apply();
            if (M_Inventory.isError()) {
                alert("修改即时库存失败!" + M_Inventory.getErrorString());
                return;
            }
            //修改执行工卡状态
            var M_WorkCardNo10_Item = inn.newItem("M_WorkCardNo10", "get");
            M_WorkCardNo10_Item.setID(m_workcardno10_id);
            M_WorkCardNo10_Item = M_WorkCardNo10_Item.apply();
            var WNo10State = M_WorkCardNo10_Item.getProperty("fworkstate", "");
            if (fworkstate === 4) {
                M_WorkCardNo10_Item.setAction("edit");
                M_WorkCardNo10_Item.setProperty("fworkstate", "3");
                M_WorkCardNo10_Item = M_WorkCardNo10_Item.apply();
                if (M_WorkCardNo10_Item.isError()) {
                    alert("修改执行工卡状态时发生错误:" + M_WorkCardNo10_Item.getErrorString());
                    return;
                }

            }

            alert("删除成功");
            //移除当前行
            var index = $('#dg1').datagrid('getRowIndex', row); //获取某行的行号            
            $('#dg1').datagrid('deleteRow', index); //通过行号移除该行
        }
        catch (err2) {
            alert("删除失败!" + err2);
        }

    });



    //生产领用
    $('#btn_scly').bind('click', function () {


    });


    $('#btn_refresh').bind('click', function () {
        //刷新
    });

    function QueryGrid(currSelectPGH) {
        top.aras.dg1ORDERBY = "";
        top.aras.dg1ORDERTYPE = "";
        SetDg1();
    }

    function SetDg1() {
        ////log.fixHeight4Parent($("#dg1")[0], 1), //log.fixWidth4Parent($("#dg1")[0], 1),
        $("#dg1").datagrid({
            url: '../../Server/GetServerJsons.aspx',
            //            height: 450,
            //            width: 1010,
            height: log.fixHeight4ID("sjlb", 0.90),
            width: log.fixWidth4ID("sjlb", 1),
            fitColumns: true, //自适应列宽
            idField: 'id',
            autoRowHeight: true, //自适应行高
            rownumbers: true, //显示行数
            singleSelect: false, //行单选 一起一次配料
            striped: true, //交替显示行背景
            nowrap: false, //超出列宽自动截取长度
            pagination: true, //显示底部工具栏 
            collapsible: true,
            columns: dg1Columns,
            method: 'post',
            queryParams: {
                JF: "GRID2",
                TYPE: 'SQLFY2',
                GRIDQUERYID: '3',
                ORDERBY: top.aras.dg1ORDERBY,
                ORDERTYPE: top.aras.dg1ORDERTYPE
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


        $(".datagrid-header-check").attr("disabled", "disabled");
        $("#dg1").datagrid("unselectAll");
    }
    //=====================================================================================

    QueryGrid(null);
}
catch (err0) {
    alert(err0);
}
