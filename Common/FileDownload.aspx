<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Com.JoinSoft.Services" %>


<%
 
    ResultEntity re = new ResultEntity();
    string fileName=Request["filename"];         //文件名称 uuid+"_"+文件原名称
    string requesttype = Request["requesttype"]; //url,down  返回文件下载地址,直接提示用户下载
    if (string.IsNullOrEmpty(requesttype))
    {
        requesttype = "url";
    }
    if (string.IsNullOrEmpty(fileName))
    {
        re.SetErrorInfo("UserException", "缺少参数filename");
        Response.Write(re.ToJsonString());
        return;
    }
    string saveBasePath = "~/Data/File/";
    saveBasePath = Server.MapPath(saveBasePath);
    string fileURLName = saveBasePath.TrimEnd('\\')+"\\"+fileName;
    if (!File.Exists(fileURLName))
    {
        re.SetErrorInfo("UserException", "文件" + fileName + "不存在.");
        Response.Write(re.ToJsonString());
        return;
    }
    else
    {
        if (requesttype == "url")
        {
            re.SetOKInfo("url", fileURLName);
        }
        else
        {
            Response.Redirect("/Data/File/" + fileName);
        }
    }

%>