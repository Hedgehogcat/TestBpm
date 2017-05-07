<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   <%-- <link href="../../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../../Scripts/SystemJS/log.js" type="text/javascript"></script>--%>
    <%Response.Write(Com.JoinSoft.Services.UrlServices.GetScriptText()); %>
    <script src="../../Scripts/Highcharts-4.0.1/highcharts.js" type="text/javascript"></script>
    <script src="../../Scripts/Highcharts-4.0.1/modules/exporting.js" type="text/javascript"></script>
    <script src="../../Scripts/Highcharts-4.0.1/highcharts-3d.js" type="text/javascript"></script>
    <script type="text/javascript">
        function setReport() {
            var jsonString = log.ajax.getMethodResult("ReturnSqlSting", "", "TEXT");
            var resjson = eval('(' + jsonString + ')');
            $('#aa').highcharts({
                chart: { type: 'column' },
                title: { text: '图一' },
                xAxis: {
                    categories: eval(resjson.categories)
                },
                yAxis: { min: 0, title: { text: '数量'} },
                //                tooltip: { headerFormat: '<span style="font-size:10px">{point.key}</span>', pointFormat: '' + '',
                //                    footerFormat: '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f} mm</b></td></tr></tbody></table>', shared: true, useHTML: true
                //                },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0} },
                series: eval(resjson.series)
            });

            $("#dg").datagrid({
                url: log.oAras.isAgentURL,
                fit: true,
                fitColumns: true,
                title: "装备质量信息数据列表",
                autoRowHeight: true,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                nowrap: true,
                pagination: true,
                idField: 'id',
                method: 'post',
                columns: [[
                                            { field: "id", title: "ID", width: 60, hidden: true },
                                            { field: "fnumber", title: "装备编号", width: 60 },
                                            { field: "fname", title: "装备名称", width: 60 },
                                            { field: "did", title: "DID", width: 60, hidden: true },
                                            { field: "lzsj", title: "列装时间", width: 60 },
                                            { field: "lzbh", title: "列装编号", width: 60 },
                                            { field: "wxbzdw", title: "维修保障单位数量", width: 60 },
                                            { field: "wt", title: "问题数量", width: 60 },
                                            { field: "bj", title: "耗费备件数量", width: 60 }
                                 ]],
                queryParams: {
                    JF: "GRID2",
                    TYPE: 'SQLFY2',
                    ORDERBY: 'fnumber',
                    SQLSTRING: resjson.sql
                },
                onClickCell: function (rowIndex, field, value) {
                    var id = $('#dg').datagrid('getRows')[rowIndex].id;
                    var did = $('#dg').datagrid('getRows')[rowIndex].did;
                    if ((field == "wxbzdw" || field == "wt" || field == "bj")) {
                        if (value == 0) {
                            return;
                        }
                        else {
                            if (field == "wxbzdw") {
                                $('#win').window('open');
                                setDgs("1", id);
                            }
                            else if (field == "wt") {
                                $('#win').window('open');
                                setDgs("2", did);
                            }
                            else if (field == "bj") {
                                $('#win').window('open');
                                setDgs("3", id);
                            }
                        }
                    }
                }
            });
        }
        function setDgs(type, id) {
            var jsonString = log.ajax.getMethodResult("ReturnSqlSting", "", "TEXT");
            var resjson = eval('(' + jsonString + ')');
            var sql = "";
            switch (type) {
                case "1":
                    var colvar = [[
                        { field: "id", title: "ID", width: 60, hidden: true },
                        { field: "ftype", title: "通讯类别", width: 60 },
                        { field: "fdepartment", title: "所属单位", width: 60}]];
                    sql = resjson.sql_1 + " where b.fservinfoid='" + id + "'";
                    break;
                case "2":
                    var colvar = [[
                        { field: "id", title: "ID", width: 60, hidden: true },
                        { field: "fphenomenon", title: "故障现象", width: 60 },
                        { field: "freason", title: "初步原因分析", width: 60 },
                        { field: "sclassificationid", title: "故障原因分类", width: 60 },
                        { field: "fopinion", title: "处理意见", width: 60}]];
                    sql = resjson.sql_2 + " where a.S_DEVPROGREMENTID='" + id + "'";
                    break;
                case "3":
                    var colvar = [[
                        { field: "id", title: "ID", width: 60, hidden: true },
                        { field: "fname", title: "备件名称", width: 60 },
                        { field: "fmodel", title: "备件型号", width: 60 },
                        { field: "fpartno", title: "件号", width: 60 },
                        { field: "fqty", title: "数量", width: 60}]];
                    sql = resjson.sql_3 + " where a.fdevserviceid='" + id + "'";
                    break;
                default:
                    break;
            }
            $("#dg1").datagrid({
                url: log.oAras.isAgentURL,
                fit: true,
                fitColumns: true,
                autoRowHeight: true,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                nowrap: true,
                pagination: true,
                idField: 'id',
                method: 'post',
                columns: colvar,
                queryParams: {
                    JF: "GRID2",
                    TYPE: 'SQLFY2',
                    SQLSTRING: sql
                }
            });
        }
    </script>
</head>
<body onload="setReport();">
    <div id="cc" class="easyui-layout" fit="true">
        <div data-options="region:'north',split:true" style="height: 300px;">
            <div id="aa" style="height: 100%; width: 50%; float: left">
            </div>
            <div id="bb" style="height: 100%; width: 50%; float: left">
            </div>
        </div>
        <div data-options="region:'center'">
            <table id="dg">
            </table>
        </div>
    </div>
    <div id="win" class="easyui-window" title="明细" style="width: 600px; height: 400px"
        data-options="iconCls:'icon-search',modal:true,minimizable:false,maximizable:false,draggable:false,collapsible:false,closed:true">
        <div class="easyui-layout" data-options="fit:true">
            <table id="dg1">
            </table>
        </div>
    </div>
</body>
</html>
