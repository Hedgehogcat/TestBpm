<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Com.JoinSoft.Services" %>


<%
    Com.JoinSoft.Services.ResultEntity result = new ResultEntity();
    //
    string genfile = Request["genfile"];
    try
    {
        string saveBasePath = "~/Data/File/Import/";
        saveBasePath = Server.MapPath(saveBasePath);
        string fileUUID = Com.Bpm.Base.Units.Help.GetUUIDToUpper();
        string savePath = saveBasePath + fileUUID + "\\";

        //检查文件数量>0
        if (Request.Files == null || Request.Files.Count==0)
        {
            result.SetErrorInfo("UserException", "没有选择要上传的文件或者缺少文件执行权限.");
            Response.Write(result.ToJsonString());
            return;
        }
        //if (Request.Files.Count != 1)
        //{
        //    result.SetErrorInfo("UserException", "没有选择要上传的文件或者缺少文件执行权限.");
        //    Response.Write(result.ToJsonString());
        //    return;
        //}
        //检查文件大小在范围内

        //检查文件类型在范围内 (参考文件后缀判断)

        //保存文件 到Web服务器
        if (Request.Files[0].FileName=="")
        {
            result.SetErrorInfo("UserException", "没有选择要上传的文件或者缺少文件执行权限.");
            Response.Write(result.ToJsonString());
            return;
        }
        string fileName = savePath.TrimEnd('\\') + "_" + Path.GetFileName(Request.Files[0].FileName);

        if (genfile=="1")
        {
            Com.JoinSoft.Services.ArasProxyServices aps = new ArasProxyServices();
            string fileResult=aps.GetMethodResult("pub_XT_GenItem", "<itemtype></itemtype><where>fileadd</where><filename>" + fileName + 
                "</filename><fileid>" + fileUUID + "</fileid>", "TEXT");
            if (string.IsNullOrEmpty(fileResult) || fileResult.Split('|').Length != 3 || fileResult.Split('|')[0]!="1")
            {
                result.SetErrorInfo("UserException", "添加File失败." + fileResult==null?"":fileResult);
                Response.Write(result.ToJsonString());
                return;
            }
        }
        
        Request.Files[0].SaveAs(fileName);
        //返回文件id
        result.SetOKInfo("filename", Path.GetFileName(fileName));
        Response.Write(result.ToJsonString());
        return ;
    }
    catch(Exception ex)
    {
        result.SetErrorInfo("Exception", ex.Message);
        Response.Write(result.ToJsonString());
        return;
    }

%>