<%@ Page Language="C#" AutoEventWireup="true" %>

<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Com.JoinSoft.Services" %>
<%@ Import Namespace="Aras.IOM" %>
<%
    string method = Request["method"];
    string dataFormat = Request["dataFormat"];
    if (method == "UIServices.GetSerachBoxHtml")
    {
        string name = Request["name"];
        Response.Write(UIServices.GetSerachBoxHtml(name));
    }
    else if (method == "ImportServices.Excel2Json")
    {
        string filename = Request["filename"];
        string columns = Request["columns"];
        ImportServices importecxel = new ImportServices();
        string result = importecxel.Excel2Json(filename, columns);
        Response.Write(result);
    }
    else if (method == "ExportServices.export")
    {
        Com.JoinSoft.Services.ExportServices es = new Com.JoinSoft.Services.ExportServices();
        //string filename = Request["filename"];
        //string sql = Request["sql"];
        //string columns = Request["columns"];
        string filename = "测试";
        string sql = "select * from ( select i.CREATED_ON,i.id, cus.fname,replace(CONVERT(varchar(12),i.fdate,111),'/','-')as fdate,main.FNUMBER,bas.FNAME name,i.FSERVNO,i.FSERVNUMBER,a.LABEL_ZH as fservfrom,i.FEXITPRO,replace(CONVERT(varchar(12),i.FMUSTSERVDATE,111),'/','-')as FMUSTSERVDATE,i.fservcyc,d.LABEL_ZH as fservocetype,e.LABEL_ZH as fservocename,gp.FNAME as freceivman,replace(CONVERT(varchar(12),i.FRECEIVDATE,111),'/','-')as FRECEIVDATE,maker.FNAME as fmaker,replace(CONVERT(varchar(12),i.fmakerdate,111),'/','-')as fmakerdate,b.LABEL_ZH as fstatus,f.LABEL_ZH as ftravelfs,(select COUNT(*) from innovator.S_SERVINFOFILE where SOURCE_ID=i.id) as WEBFILENAME,i.fnote,infomain.servinfopch,users.keyed_name as makers  from innovator.S_SERVINFO i left join innovator.GY_DEVMAIN as main on main.id=i.fdevmainid left join innovator.S_BASICPRO as bas on bas.id=main.FNAME left join innovator.GY_CUSTOMER as cus on cus.id=i.FCUSTID left join innovator.[VALUE] a on a.SOURCE_ID=(select id from innovator.[LIST] where NAME='S_ServInfo_FServFrom_List')and a.VALUE=i.fservfrom left join innovator.[VALUE] b on b.SOURCE_ID=(select id from innovator.[LIST] where NAME='S_ServInfo_FStatus')and b.VALUE=i.FSTATUS left join innovator.S_DEVSERVICESORT c on c.id=i.FSERVER left join innovator.[value] as d on d.source_id=(select id from innovator.[LIST] where NAME='SServoceType')and d.VALUE=c.FSERVOCETYPE left join innovator.[value] as e on e.source_id=(select id from innovator.[LIST] where NAME='FServoceName_FServoceName')and e.VALUE=c.FSERVOCENAME left join innovator.GY_EMP as gp on gp.id=i.FRECEIVMAN left join innovator.GY_CUSTOMER as maker on maker.id=i.FMAKERID left join innovator.[VALUE] as f on f.SOURCE_ID=(select id from innovator.[list] where NAME='S_ServInfo_FTravelFS') and f.VALUE=i.FTRAVELFS left join innovator.S_ServInfomain infomain on infomain.id=i.fservinfomainid left join innovator.[user] users on users.id=i.created_by_id where 1=1) aa where  fstatus like '%创建%'  and  name like '%大炮%'  and  1=1 order by fmustservdate DESC";
        string columns = "[{\"field\":\"freceivdate\",\"title\":\"信息接收时间\"},{\"field\":\"makers\",\"title\":\"制单人\"},{\"field\":\"fmustservdate\",\"title\":\"要求到场时间\"},{\"field\":\"fname\",\"title\":\"顾客名称\"},{\"field\":\"fdate\",\"title\":\"登记日期\"},{\"field\":\"name\",\"title\":\"产品名称\"},{\"field\":\"fservno\",\"title\":\"信息台账编号\"},{\"field\":\"fservnumber\",\"title\":\"信息处理卡编号\"},{\"field\":\"fexitpro\",\"title\":\"存在问题\"},{\"field\":\"fservfrom\",\"title\":\"信息来源\"},{\"field\":\"fservcyc\",\"title\":\"服务周期\"},{\"field\":\"fservocetype\",\"title\":\"服务属性\"},{\"field\":\"fservocename\",\"title\":\"服务方式\"},{\"field\":\"freceivman\",\"title\":\"信息接收人\"},{\"field\":\"fmaker\",\"title\":\"信息填制人\"},{\"field\":\"fmakerdate\",\"title\":\"信息填制时间\"},{\"field\":\"fstatus\",\"title\":\"状态\"},{\"field\":\"ftravelfs\",\"title\":\"出差登记状态\"},{\"field\":\"webfilename\",\"title\":\"附件\"},{\"field\":\"fnote\",\"title\":\"备注\"},{\"field\":\"servinfopch\",\"title\":\"批次号\"}]";
        Innovator inn= Com.JoinSoft.Services.ComServices.GetInnovator();
        Item q = inn.newItem("Export", "get");
        q = q.apply();
        if (!q.isError() && q.getItemCount() == 1)
        {
            filename = q.getProperty("filename", "");
            filename += "_"+System.DateTime.Now.ToString("yyyyMMddhhmmss");
            sql = q.getProperty("sql", "");
            columns = q.getProperty("columns", "");
            es.export(filename, sql, columns);
        }
        else
        {
            Response.Write("导出失败！");
        }
      
    }
%>