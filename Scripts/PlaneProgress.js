
var colorarry = new Array("#0000FF", "#FF00FF", "#FF0033", "#238E23", "#7F00FF", "#CC3299", "#007FFF",
                        "#9932CD", "#4F2F4F", "#9370DB", "#FF7F00", "#3299CC", "#8E2323", "#23238E");

//拼柱状图生成所需数据
//var data1 = "[";
//var data2 = "[";
//var data3 = "[";
//var data4 = "[";
//var data5 = "[";
//var xAxis = "[";
//var columndata = "[";
//var result = inn.applyMethod("PubCallExecProc", "<procname>M_ScheduleQuaryColumn</procname>");
var result = log.ajax.getMethodResult("PubCallExecProc2", "<procname>M_ScheduleQuaryColumn</procname>","TEXT");
//装入XmlDom
//result=
//for (var i = 0; i < result.getItemCount(); i++) {
//    var fworkcardinfoid = result.getItemByIndex(i).getProperty("fworkcardinfoid", "");
//    var WKG = result.getItemByIndex(i).getProperty("新增", "");
//    var YKG = result.getItemByIndex(i).getProperty("执行", "");
//    var YWG = result.getItemByIndex(i).getProperty("完工", "");
//    var WJJWT = result.getItemByIndex(i).getProperty("未解决问题", "");
//    var YJJWT = result.getItemByIndex(i).getProperty("已解决问题", "");
//    if (i === result.getItemCount() - 1) {
//        xAxis = xAxis + "'" + fworkcardinfoid + "'";
//        data1 = data1 + "" + WKG + "";
//        data2 = data2 + "" + YKG + "";
//        data3 = data3 + "" + YWG + "";
//        data4 = data4 + "" + WJJWT + "";
//        data5 = data5 + "" + YJJWT + "";
//    }
//    else {
//        xAxis = xAxis + "'" + fworkcardinfoid + "',";
//        data1 = data1 + "" + WKG + ",";
//        data2 = data2 + "" + YKG + ",";
//        data3 = data3 + "" + YWG + ",";
//        data4 = data4 + "" + WJJWT + ",";
//        data5 = data5 + "" + YJJWT + ",";
//    }
//}

//xAxis = xAxis + "]";
//data1 = data1 + "]";
//data2 = data2 + "]";
//data3 = data3 + "]";
//data4 = data4 + "]";
//data5 = data5 + "]";

//columndata = columndata + "{name:'" + "新增" + "',color:'" + colorarry[1] + "',data:" + data1 + "}," + "\n";
//columndata = columndata + "{name:'" + "执行" + "',color:'" + colorarry[2] + "',data:" + data2 + "}," + "\n";
//columndata = columndata + "{name:'" + "完工" + "',color:'" + colorarry[3] + "',data:" + data3 + "}," + "\n";
//columndata = columndata + "{name:'" + "未解决问题" + "',color:'" + colorarry[4] + "',data:" + data4 + "}," + "\n";
//columndata = columndata + "{name:'" + "已解决问题" + "',color:'" + colorarry[5] + "',data:" + data5 + "}";
//columndata = columndata + "]";
var result1 = eval("(" + result + ")");
var columndata = result1.columnData;  //eval("(" + result1.columnData + ")");
var xAxis = result1.xAxis;// eval("(" + result1.xAxis + ")");


function setColumn() {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'aa',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: '架次飞机完成情况汇总一览表'
        },
        plotOptions: {
            column: {
                depth: 25,
                point: {
                    events: {
                        click: function () {
                            if (this.series.name === "新增") {
                                setDg1("b.FWORKCARDINFOID='" + this.category + "' and c.ROLLUP_PERCENT_COMPL IS NULL ");
                                $('#win').window('open');
                                $('#dg2').datagrid('loadData', []);
                            }
                            if (this.series.name === "执行") {
                                setDg1("b.FWORKCARDINFOID='" + this.category + "' and (c.ROLLUP_PERCENT_COMPL>=0 and c.ROLLUP_PERCENT_COMPL<100)");
                                $('#win').window('open');
                                $('#dg2').datagrid('loadData', []);
                            }
                            if (this.series.name === "完工") {
                                setDg1("b.FWORKCARDINFOID='" + this.category + "' and (c.ROLLUP_PERCENT_COMPL =100)");
                                $('#win').window('open');
                                $('#dg2').datagrid('loadData', []);
                            }
                            if (this.series.name === "未解决问题") {
                                setDg3("b.FWORKCARDINFOID='" + this.category + "' and a.state in ('处理中','填写问题')");
                                $('#win_1').window('open');
                            }
                            if (this.series.name === "已解决问题") {
                                setDg3("b.FWORKCARDINFOID='" + this.category + "' and a.state in ('关闭')");
                                $('#win_1').window('open');
                            }
                            //                           alert('Category: ' + this.category + ', value: ' + this.y+this.series.name);

                        }
                    }
                }
            }
        },
        yAxis: {
            min: 0,
            title: { text: '数目' }
        },
        xAxis: {
            categories: eval("(" + xAxis + ")")
        },
        series: eval(columndata)
    });
}

function SetDg() {
    var queryStr = "select distinct b.FWORKCARDINFOID, " +
			"(select COUNT('') from innovator.PROJECT aa " +
			"inner join innovator.M_REPAIRPLAN bb on aa.FJOBNUMBER=bb.id " +
			"inner join innovator.ACTIVITY2 cc on aa.PROJECT_NUMBER=cc.PROJ_NUM where cc.ROLLUP_PERCENT_COMPL IS NULL  " +
			"and bb.FWORKCARDINFOID=b.FWORKCARDINFOID ) 新增, " +
			"(select COUNT('') from innovator.PROJECT aa " +
			"inner join innovator.M_REPAIRPLAN bb on aa.FJOBNUMBER=bb.id " +
			"inner join innovator.ACTIVITY2 cc on aa.PROJECT_NUMBER=cc.PROJ_NUM where cc.ROLLUP_PERCENT_COMPL <100 and cc.ROLLUP_PERCENT_COMPL >=0 " +
			"and bb.FWORKCARDINFOID=b.FWORKCARDINFOID) 执行, " +
			"(select COUNT('') from innovator.PROJECT aa  " +
			"inner join innovator.M_REPAIRPLAN bb on aa.FJOBNUMBER=bb.id " +
			"inner join innovator.ACTIVITY2 cc on aa.PROJECT_NUMBER=cc.PROJ_NUM where cc.ROLLUP_PERCENT_COMPL=100 " +
			"and bb.FWORKCARDINFOID=b.FWORKCARDINFOID) 完工, " +
			"(select COUNT('') from innovator.PROBLEM aa " +
			"inner join innovator.M_REPAIRPLAN bb on aa.FJOBNUMBER=bb.id " +
			"where bb.FWORKCARDINFOID=b.FWORKCARDINFOID and aa.STATE in ('处理中','填写问题')) 未解决问题, " +
			"(select COUNT('') from innovator.PROBLEM aa " +
			"inner join innovator.M_REPAIRPLAN bb on aa.FJOBNUMBER=bb.id " +
			"where bb.FWORKCARDINFOID=b.FWORKCARDINFOID and aa.STATE in ('关闭')) 已解决问题 " +
			"from innovator.PROJECT a  " +
			"inner join innovator.M_REPAIRPLAN b on a.FJOBNUMBER=b.id ";

    $('#dg').datagrid({
        url: log.oAras.isAgentURL,
        height: log.fixHeight4ID("bb", 1),
        width: log.fixWidth4ID("bb", 1),
        fitColumns: true, //自适应列宽
        autoRowHeight: true, //自适应行高
        rownumbers: true, //显示行数
        singleSelect: true, //行单选
        checkOnSelect: false,
        selectOnCheck: false,
        striped: true, //交替显示行背景
        //	    nowrap: false, //超出列宽自动截取长度
        //	    pagination: true, //显示底部工具栏 
        collapsible: true,
        columns: [[
	                { field: 'fworkcardinfoid', title: '派工号', width: 90 },
	                { field: '新增', title: '新增', width: 120 },
	                { field: '执行', title: '执行', width: 120 },
	                { field: '完工', title: '完工', width: 90 },
	                { field: '未解决问题', title: '未解决问题', width: 100 },
	                { field: '已解决问题', title: '已解决问题', width: 100 }
	    ]],
        method: 'post',
        queryParams: {
            JF: "GRID2",
            TYPE: 'SQLFY2',
            ORDERBY: 'FWORKCARDINFOID',
            SQLSTRING: queryStr
        },
        onDblClickRow: function (rowIndex, row) {
            setDg1("b.FWORKCARDINFOID='" + row.fworkcardinfoid + "'");
            $('#win').window('open');
            $('#dg2').datagrid('loadData', []);
        }
    });
}
//任务明细数据显示
function setDg1(where) {
    var queryStr = "select c.id as cid,e.LABEL_ZH as jd,case when c.rollup_percent_compl IS NULL  then '新增' " +
            "when   c.ROLLUP_PERCENT_COMPL<100 and c.ROLLUP_PERCENT_COMPL>=0 then '执行' " +
            "when   c.ROLLUP_PERCENT_COMPL=100 then '完工' END  as fstate " +
			",c.KEYED_NAME as task,b.FWORKCARDINFOID from innovator.PROJECT a " +
			"inner join innovator.M_REPAIRPLAN b on a.FJOBNUMBER=b.id " +
			"inner join innovator.ACTIVITY2 c on a.PROJECT_NUMBER=c.PROJ_NUM " +
			"inner join innovator.A_XKZ d on d.id=c.FAXKZID " +
			"inner join innovator.[VALUE] e on e.SOURCE_ID=(select ID from innovator.LIST where NAME='Gy_RepairPath') and e.VALUE=d.FREPAIRPATH where " + where;
    $('#dg1').datagrid({
        url: '../../Server/GetServerJsons.aspx',
        height: 270,
        width: 682,
        fitColumns: true, //自适应列宽
        autoRowHeight: true, //自适应行高
        rownumbers: true, //显示行数
        singleSelect: true, //行单选
        checkOnSelect: false,
        selectOnCheck: false,
        striped: true, //交替显示行背景
        nowrap: false, //超出列宽自动截取长度
        pagination: true, //显示底部工具栏 
        collapsible: true,
        columns: [[
	                { field: 'fworkcardinfoid', title: '派工号', width: 90 },
	                { field: 'cid', title: '任务ID', width: 90, hidden: true },
	                { field: 'jd', title: '阶段', width: 100 },
	                { field: 'task', title: '任务', width: 120 },
	                { field: 'fstate', title: '状态', width: 90,
	                    styler: function (value, row, index) {
	                        if (value === "新增") {
	                            return 'background-color:red;value:新增';
	                        }
	                        if (value === "执行") {
	                            return 'background-color:yellow;value:执行;';
	                        }
	                        if (value === "完工") {
	                            return 'background-color:#66FF00;value:完工;';
	                        }
	                    }
	                }
	            ]],
        method: 'post',
        queryParams: {
            JF: "GRID2",
            TYPE: 'SQLFY2',
            ORDERBY: 'FWORKCARDINFOID',
            SQLSTRING: queryStr
        },
        onClickRow: function (rowIndex, row) {
            setDg2("b.FWORKCARDINFOID='" + row.fworkcardinfoid + "' and c.ID='" + row.cid + "'");
        }
    });
}
//作业明细数据
function setDg2(where) {
    var queryStr = "select b.FWORKCARDINFOID,e.FWORKNO,d.FWORKCARDNAME,e.FWORKER,e.FPLANSDATE,e.FPLANEDATE,f.LABEL_ZH as fstate " +
			"from innovator.PROJECT a  " +
			"inner join innovator.M_REPAIRPLAN b on a.FJOBNUMBER=b.id " +
			"inner join innovator.ACTIVITY2 c on a.PROJECT_NUMBER=c.PROJ_NUM " +
			"inner join innovator.ACTIVITY2_ASSIGNMENT d on d.SOURCE_ID=c.ID " +
			"left join innovator.M_WORKCARDNO10 e on e.id=d.FWORKCARD " +
			"left join innovator.[VALUE] f on f.SOURCE_ID=(select ID from innovator.LIST where NAME='fwcardstatelist') and f.VALUE=e.FSTATE where " + where;
    $('#dg2').datagrid({
        url: '../../Server/GetServerJsons.aspx',
        height: 270,
        width: 682,
        fitColumns: true, //自适应列宽
        autoRowHeight: true, //自适应行高
        rownumbers: true, //显示行数
        singleSelect: true, //行单选
        checkOnSelect: false,
        selectOnCheck: false,
        striped: true, //交替显示行背景
        nowrap: false, //超出列宽自动截取长度
        pagination: true, //显示底部工具栏 
        collapsible: true,
        columns: [[
	                { field: 'fworkcardinfoid', title: '派工号', width: 90 },
	                { field: 'fworkno', title: '工卡号', width: 100 },
	                { field: 'fworkcardname', title: '工卡名称', width: 120 },
	                { field: 'fworker', title: '工作者', width: 90 },
	                { field: 'fplansdate', title: '计划开始时间', width: 90 },
	                { field: 'fplanedate', title: '计划完工时间', width: 90 },
	                { field: 'fstate', title: '状态', width: 90,
	                    formatter: function (value, row, index) {
	                        if (value === "" || value === null || value === undefined) {
	                            return "未分派";
	                        }
	                        else {
	                            return value;
	                        }
	                    }
	                }
	    ]],
        method: 'post',
        queryParams: {
            JF: "GRID2",
            TYPE: 'SQLFY2',
            ORDERBY: 'FWORKCARDINFOID',
            SQLSTRING: queryStr
        }
    });
}
//问题明细数据
function setDg3(where) {
    var queryStr = " select a.FNUMBER,c.KEYED_NAME as FREPORTER,a.FCONTENT,a.FREPORTDATE,d.KEYED_NAME as FSUGGESTER,a.FSUGGESTDATE,a.state " +
				"from innovator.PROBLEM a " +
				"inner join innovator.M_REPAIRPLAN b on a.FJOBNUMBER=b.id  " +
				"left join innovator.T_EMP c on c.id=a.FREPORTER " +
				"left join innovator.T_EMP d on d.id=a.FSUGGESTER where " + where;
    $('#dg3').datagrid({
        url: '../../Server/GetServerJsons.aspx',
        height: 462,
        width: 730,
        fitColumns: true, //自适应列宽
        autoRowHeight: true, //自适应行高
        rownumbers: true, //显示行数
        singleSelect: true, //行单选
        checkOnSelect: false,
        selectOnCheck: false,
        striped: true, //交替显示行背景
        nowrap: false, //超出列宽自动截取长度
        pagination: true, //显示底部工具栏 
        collapsible: true,
        columns: [[
	                { field: 'fnumber', title: '问题编号', width: 90 },
	                { field: 'freporter', title: '提出人', width: 100 },
	                { field: 'fcontent', title: '问题描述', width: 120 },
	                { field: 'freportdate', title: '提交日期', width: 90 },
	                { field: 'fsuggester', title: '最后处理人', width: 90 },
	                { field: 'fsuggestdate', title: '最后处理日期', width: 90 },
	                { field: 'state', title: '状态', width: 90 }
	    ]],
        method: 'post',
        queryParams: {
            JF: "GRID2",
            TYPE: 'SQLFY2',
            ORDERBY: 'FNUMBER',
            SQLSTRING: queryStr
        }
    });
}

	