<%@ Page Language="C#" AutoEventWireup="true" %>

<%@ Import Namespace="Aras.IOM" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<%--    <link href="../../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../../Scripts/SystemJS/log.js" type="text/javascript"></script>--%>
     <%Response.Write(Com.JoinSoft.Services.UrlServices.GetScriptText()); %>
    <style type="text/css">
        .td_a
        {
            background-color: #D3D3D3;
            height: 30px;
            font-size: 14px;
            text-align: center;
            border-style: solid;
        }
        .td_b
        {
            height: 30px;
            font-size: 14px;
            text-align: left;
            border-style: solid;
        }
        .table_a
        {
            width: 890px;
            border-style: outset;
            border-style: solid;
            border-collapse: collapse;
        }
        .table_b
        {
            font-size: 14px;
        }
    </style>
    <script type="text/javascript" language="javascript">
        setInterval(function () {
        log.ajax.getMessage();
    }, 10000); 
       //选择转交给哪些角色
       function wl_Identity_Chose()
       {
        $('#wl_identity_win').window('open');  // open a window  
       }
       //初始化部门树
       function setTree()
       {
        var jsonStr =log.ajax.getMethodResult("Pub_GetTreeJson","<aml>&lt;Item type='Gy_Department' action='get'&gt;&lt;/Item&gt;</aml>", "TEXT");
        $('#tt').tree({            
              data:eval('(' + jsonStr + ')'),
              onClick:function(node)
	          {   
                setEmpDg(node.id);
              }
           });
       }
//查看单据
function ShowViewItem(itemtype,billid,formname)
{
    var height=500;
	var width=900;
	var itemname=itemtype;
	var formname=formname;  
	aml = "<AML><Item type=\"Form\" action=\"get\" select=\"width,height\"><name>" + formname + "</name></Item></AML>";
	var formitem = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
	if (formitem.isError === "true" || formitem.count !== 1) {
	    $.messager.alert("Error", formitem.errorMsg, "error");
	    return;
	}
	else {
	    width = formitem.content[0].width === "" ? width : formitem.content[0].width;
	    height = formitem.content[0].height === "" ? height : formitem.content[0].height;
	}
	var param = new Object;
	param.action = "get";
	param.formname=formname;
	param.itemname=  itemname;  
	param.isEditmode= "false";
	param.id=billid; 
	var win = window.showModalDialog('/BizPage/TemplateDialog/TemplateDialogView.aspx?formname='+formname+'&itemname='+itemname+'&iseditmode='+param.isEditmode,param,'dialogWidth='+width+'px;dialogHeight='+height+'px;scroll:no;status:no');
}
       //删除已选角色
       function Iden_delete(id)
       {
         var deleteindex=$('#selecteddg').datagrid('getRowIndex',id);  
         $('#selecteddg').datagrid('deleteRow', deleteindex);  
         var unselectedindex=$('#idendg').datagrid('getRowIndex',id);
         $('#idendg').datagrid('unselectRow',unselectedindex);   
       }
       //确认角色选择
       function Idenchose_confirm_btn()
       {
          var confirmrows=$('#selecteddg').datagrid('getRows');
          if(confirmrows.length>0)
          {
            var idenstr="";
            var idenidstr="";
            for(var i=0;i<confirmrows.length;i++)
            {
             idenstr+=confirmrows[i].name+";";
             idenidstr+=confirmrows[i].id+";";
            }
            $('#ChosedIdentity').textbox('setValue',idenidstr);
            $('#ChosedIdentity').textbox('setText',idenstr); 
          }
          else if(confirmrows=="")
          {
           $('#ChosedIdentity').textbox('setText',""); 
          }
          $('#wl_identity_win').window('close'); 
       }
       //初始化角色列表
       function setIdenDg()
       {
          $("#dg").datagrid({
            url: log.oAras.isAgentURL,
            fit:true,
            fitColumns: true,
            autoRowHeight: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            nowrap:true,
            pagination: false,
            idField: 'id',
            method: 'post',
            columns:[[
            {field:"id",title:"ID",width:60,hidden:true},
            {field:"name",title:"角色组名称",width:60},
            ]],
            queryParams:{
            JF:"GRID2",
            TYPE: 'SQLFY2',
            SQLSTRING:"select CREATED_ON,ID,NAME,IS_ALIAS from innovator.[IDENTITY] where belongsystem='精益服务' and IS_ALIAS='0'"
            },
            onSelect:function(rowIndex, rowData){
              setIentityDg(rowData.id);
            }
            });
       }
       //职员角色选择列表
       function setEmpDg(where)
       {
          $("#idendg").datagrid({
            url: log.oAras.isAgentURL,
            fit:true,
            fitColumns: true,
            autoRowHeight: true,
            rownumbers: true,
            singleSelect: false,
            striped: true,
            nowrap:true,
            pagination: false,
            idField: 'id',
            method: 'post',
            columns:[[
            {field:"id",title:"ID",width:60,hidden:true},
            {field:"name",title:"角色名称",width:60},
            ]],
            queryParams:{
            JF:"GRID2",
            TYPE: 'SQLFY2',
            SQLSTRING:"select CREATED_ON,ID,NAME from innovator.[IDENTITY] where ID in(select RELATED_ID from innovator.ALIAS where SOURCE_ID in(select ID from innovator.[USER] where EMPID in (select id from innovator.Gy_EMP where fdeptid='"+where+"')))"
            },
            onSelect:function(rowIndex, rowData){
              $('#selecteddg').datagrid('appendRow',{
	                id: rowData.id,
	                name: rowData.name
                });    
            },
            onUnselect:function(rowIndex, rowData){
               $('#selecteddg').datagrid('deleteRow',$('#selecteddg').datagrid('getRowIndex',rowData.id));  
            }
            });
       }
        //职员角色选择列表
       function setIentityDg(where)
       {
          $("#idendg").datagrid({
            url: log.oAras.isAgentURL,
            fit:true,
            fitColumns: true,
            autoRowHeight: true,
            rownumbers: true,
            singleSelect: false,
            striped: true,
            nowrap:true,
            pagination: false,
            idField: 'id',
            method: 'post',
            columns:[[
            {field:"id",title:"ID",width:60,hidden:true},
            {field:"name",title:"角色名称",width:60},
            ]],
            queryParams:{
            JF:"GRID2",
            TYPE: 'SQLFY2',
            SQLSTRING:"select CREATED_ON,id,name from innovator.[IDENTITY] where ID in(select related_id from innovator.MEMBER where SOURCE_ID='"+where+"')"
            },
            onSelect:function(rowIndex, rowData){
              $('#selecteddg').datagrid('appendRow',{
	                id: rowData.id,
	                name: rowData.name
                });    
            },
            onUnselect:function(rowIndex, rowData){
               $('#selecteddg').datagrid('deleteRow',$('#selecteddg').datagrid('getRowIndex',rowData.id));  
            }
            });
       }
       //已选择的角色
       function setSelectedDg()
       {
          $("#selecteddg").datagrid({
            fit:true,
            fitColumns: false,
            autoRowHeight: true,
            rownumbers: true,
            singleSelect: false,
            striped: true,
            nowrap:true,
            pagination: false,
            idField: 'id',
            method: 'post',
            columns:[[
            {field:"id",title:"ID",width:60,hidden:true},
            {field:"name",title:"角色名称",width:80},
            {field:"delete",title:"操作",width:60,
              formatter:function(value,row,index)
              {
                return "<input type=\"button\" onclick=\"Iden_delete('"+row.id+"');\" value=\"删除\"/>"; 
              }
            }
            ]]
            });
       }
       //判断路径下个节点有没有分派人
       function wl_Finding_Identity(newValue)
       {
         var path_res=log.ajax.getMethodResult("FindingIfIdentityExit","<newpathid>"+newValue+"</newpathid>", "TEXT");
         if(path_res=="true")
         {
          document.getElementById("wl_idn_chose").style.display = "none";
          document.getElementById("wl_chosed_idens").style.display = "none"; 
         }
         else
         {
          document.getElementById("wl_idn_chose").style.display = "inline-block";
          document.getElementById("wl_chosed_idens").style.display = "table-cell"; 
         }
       }
       window.onload = function () {
            var billid ="<% =Request["billid"] %>";
            //选择路径时判断当前节点有没有分派人(是否显示选人按钮)
            if($('#wl_path_chose').length>0)
            {
                var wl_newpath_id = $('#wl_path_chose').combobox('getValue');
                if(wl_newpath_id)
                {
                 wl_Finding_Identity(wl_newpath_id);
                } 
            }
            //提交按钮
            $('#wf_check').bind('click', function () {
                var wl_pathid = $('#wl_path_chose').combobox('getValue');
                var path = $('#wl_path_chose').combobox('getText');
                var wl_comments = $('#wl_comments').textbox('getText');
                var identityids="";
                if(document.getElementById("wl_idn_chose").style.display !== "none")
                {
                  identityids=$('#ChosedIdentity').textbox('getValue');
                  if(identityids=="")
                  {
                    $.messager.alert('工作流消息',"请选择分派人!",'info');
                    return ;
                  }
                }
                var wl_res = log.ajax.getMethodResult("ApplyWorkFlowAml", "<billid>" + billid + "</billid><pathid>" + wl_pathid + "</pathid><comments>" + wl_comments + "</comments><identityids>"+identityids+"</identityids>", "TEXT");
                $.messager.alert('工作流消息',wl_res,'info',function(){
                 document.location.reload();        //刷新当前页面
                })
            });
           //退出按钮
          $('#wf_close').bind('click', function () {
              window.close();
          });
          //win弹出时加载数据
          $('#wl_identity_win').window({       
            onOpen:function(){    
                setTree(); 
                setIdenDg();
                setSelectedDg();
                }    
           }); 

        }
    </script>
</head>
<body>
    <%

        Innovator inn1 = Com.JoinSoft.Services.ComServices.GetInnovator();
        string billid = Request["billid"];
        string html = inn1.applyMethod("Pub_XT_getWorkFlowInfomation", "<billid>" + billid + "</billid>").getResult();
        Response.Write(html);
    %>
    <div id="wl_identity_win" class="easyui-window" title="信息列表" style="width: 360px;
        height: 400px" data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:false,closed:true">
        <div id="cc" class="easyui-layout" fit="true">
            <div data-options="region:'west',split:false,collapsible:false" style="width: 180px;">
                <div id="aa" class="easyui-accordion" fit="true">
                    <div title="已选人员" data-options="collapsible:true">
                        <table id="selecteddg">
                        </table>
                    </div>
                    <div title="按部门选择">
                        <ul id="tt">
                        </ul>
                    </div>
                    <div title="按角色组选择">
                        <table id="dg">
                        </table>
                    </div>
                </div>
            </div>
            <div data-options="region:'center'" style="padding: 5px; background: #eee;">
                <table id="idendg">
                </table>
            </div>
            <div data-options="region:'south'" style="height: 30px; background-color: #cccccc;"
                align="right">
                <a id="Idenchose_confirm" href="#" onclick="Idenchose_confirm_btn();" class="easyui-linkbutton"
                    data-options="iconCls:'icon-ok'">确认</a>
            </div>
        </div>
    </div>
</body>
</html>
