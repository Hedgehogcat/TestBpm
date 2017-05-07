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
        function setReports(a, b, c) {
            var jsonString = log.ajax.getMethodResult("getSparePartReportInfo", "<year>" + a + "</year><devmain>" + b + "</devmain><sparepart>" + c + "</sparepart>", "TEXT");
            var resjson = eval('(' + jsonString + ')');
            //折线图
            $('#abcdef').highcharts({
                title: {
                    text: '备品更换维修趋势',
                    x: -20 //center
                },
                xAxis: {
                    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: {
                    title: {
                        text: '数量'
                    },
                    min: 0,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '次'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: eval(resjson.linejson)
            });
            //饼图
            $('#container').highcharts({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: '更换备品备件比例图'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [
                        { type: 'pie',
                            name: '所占比例',
                            data: eval(resjson.piejson)
                        }]
            });
            //表格
            $("#dg").datagrid({
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
                columns: [[
                                { field: "id", title: "ID", width: 60, hidden: true },
                                { field: "fname", title: "备件名称", width: 60 },
                                { field: "gh", title: "更换次数总计", width: 60 },
                                { field: "wx", title: "维修次数总计", width: 60 },
                                { field: "counts", title: "总数", width: 60, hidden: true },
                                { field: "bl", title: "占总服务任务比例", width: 60,
                                    formatter: function (value, row, index) {
                                        var a = Number(row.gh) + Number(row.wx);
                                        return (Number(a) * 100 / Number(row.counts)).toFixed(2) + "%";
                                    }
                                },
                                ]],
                queryParams: {
                    JF: "GRID2",
                    TYPE: 'SQLFY2',
                    ORDERBY: 'ID',
                    SQLSTRING: resjson.gridsql
                }
            });
        }
        function productCh(e) {
            url = "/Common/F2Search.aspx?name=GY_DevMain&title=产品选择";
            var result = window.showModalDialog(url, '', 'dialogWidth=900px;dialogHeight=550px;scroll:no;status:no');
            if (result === undefined) {
                return;
            }
            else if (JSON.stringify(result) == "{}") {
                $(e.data.target).textbox('setValue', '');
                $(e.data.target).textbox('setText', '');
            }
            else if (result.length === 1) {
                $(e.data.target).textbox('setValue', result[0].id);
                $(e.data.target).textbox('setText', result[0].fname);
            }
        }
        function itemCh(e) {
            url = "/Common/F2Search.aspx?name=Gy_Item&title=备品备件选择&singselect=0";
            var result = window.showModalDialog(url, '', 'dialogWidth=900px;dialogHeight=550px;scroll:no;status:no');
            if (result === undefined) {
                return;
            }
            else if (JSON.stringify(result) == "{}") {
                $(e.data.target).textbox('setValue', '');
                $(e.data.target).textbox('setText', '');
            }
            else if (result.length >= 1) {
                var names = "";
                var ids = "";
                for (var i = 0; i < result.length; i++) {
                    names += result[i].fname + ";";
                    if (i == result.length - 1) {
                        ids += "'" + result[i].id + "'";
                    }
                    else {
                        ids += "'" + result[i].id + "',";
                    }
                }
                $(e.data.target).textbox('setValue', ids);
                $(e.data.target).textbox('setText', names);
            }
        }
        function ShowReport() {
            if ($('#yearSelect').combobox('getValue') == "") {
                $.messager.alert('提示', '未选择年度！', 'info');
                return;
            }
            if ($('#aa').textbox('getText') == "") {
                $.messager.alert('提示', '未选择产品！', 'info');
                return;
            }
            if ($('#bb').textbox('getText') == "") {
                $.messager.alert('提示', '未选择备品备件！', 'info');
                return;
            }
            setReports($('#yearSelect').combobox('getValue'), $('#aa').textbox('getValue'), $('#bb').textbox('getValue'));
        } 			
    </script>
</head>
<body>
    <div id="cc" class="easyui-layout" fit="true">
        <div data-options="region:'north',split:true" style="height: 40px; text-align: center;
            padding-top: 4px">
            年份:
            <select id="yearSelect" class="easyui-combobox" style="width: 80px">
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
            </select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 产品:<input id="aa" class="easyui-textbox" data-options="icons: [{iconCls:'icon-search',handler: function(e){ productCh(e); } }],prompt:'请选择产品'"
                style="width: 100px" editable="false" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 备品备件:<input id="bb" class="easyui-textbox" data-options="icons: [{iconCls:'icon-search',handler: function(e){ itemCh(e); } }],prompt:'请选择备品备件'"
                style="width: 300px" editable="false" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a id="ShowReportBtn" href="#" class="easyui-linkbutton"
                data-options="iconCls:'icon-search'" onclick="ShowReport();">查询</a>
        </div>
        <div data-options="region:'center'">
            <div id="abcdef" style="height: 49%; width: 100%; float: left">
            </div>
            <div id="container" style="height: 49%; width: 50%; float: left">
            </div>
            <div style="height: 50%; width: 50%; float: left">
                <table id="dg">
                </table>
            </div>
        </div>
    </div>
</body>
</html>
