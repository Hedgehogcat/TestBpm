using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;



namespace Com.JoinSoft.Services
{
    public class UIServices
    {
        public UIServices()
        { }

        public static string String2Html(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return "";
            }
            return Com.JoinSoft.Services.ComServices.GetServer().HtmlEncode(str);
        }

        public static string Html2String(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return "";
            }
            return Com.JoinSoft.Services.ComServices.GetServer().HtmlDecode(str);
        }

        public static string GetToolBarHtml(string toolbarName)
        {
            try
            {
                ArasProxyServices aps = new ArasProxyServices();
                string result = aps.GetMethodResult2VHtml("Pub_XT_CreateToolBarHtml", "<name>" + toolbarName + "</name>", "TEXT");
                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;// throw;
            }
        }

        public static string GetSerachBoxHtml(string serachConfigName)
        {
            try
            {
                ArasProxyServices aps = new ArasProxyServices();
                string serachConfigJson = aps.GetMethodResult("pub_XT_GetSerachInfo", "<name>" + serachConfigName + "</name>", "TEXT");
                System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
                List<SerachBoxItemInfo> SerachBoxItems =
                    jss.Deserialize<List<SerachBoxItemInfo>>(serachConfigJson);
                //生成Html
                /*
<label for=""id1"">Male1</label>
<input id=""id1"" class=""easyui-textbox"" data-options=""iconCls:'icon-search'"" style=""width:300px; height:30px;""> 
                 */
                string SerachBoxHtml = @"
<div id='serachbox_{0}' style="" height:40px; text-align:center; margin-top:8px; margin-bottom:0px;"">
{1}
&nbsp;
<a id=""btn"" href=""#"" class=""easyui-linkbutton"" data-options=""iconCls:'icon-search'"" onclick=""log.ajax.ExecGridSerach('{2}','WHERE')"">搜索</a>
</div>";
                StringBuilder serachBoxItem = new StringBuilder();
                string grid = "";
                foreach (SerachBoxItemInfo item in SerachBoxItems)
                {
                    grid = item.grid;
                    string data_type = item.data_type;
                    string fsourcetype = item.fsourcetype;
                    string data_source = item.data_source;
                    string itemHtml = "<label for=\"" + item.name + "\">" + item.label + "</label>&nbsp;";
                    if (data_type == "datebox")
                    {
                        itemHtml += "<label>From</label>";
                    }
                    itemHtml += "<input id='field_" + item.grid + "_" + item.name + "_" + UIControlType.GetEasyUIType(item.data_type) + "' class=\" " + UIControlType.GetEasyUIType(item.data_type) + " \" ";
                    if (data_type == "combobox")
                    {
                        itemHtml += "data-options=\"valueField:'value',textField:'label',url:' ../../Common/ServerProxy.aspx?TYPE=METHOD&JF=ITEMS&METHOD=WEB_GetSearchComboboxJson&BODY=<id>" + item.id + "</id>'\" ";
                    }
                    if (data_type == "item")
                    {
                        itemHtml += " data-options=\"icons: [{iconCls:'icon-search',handler: function(e){ icon_Search(e,'" + item.data_source + "','" + item.label + "'); } }]\"";
                    }
                    if (data_type == "datebox")
                    {
                        itemHtml += " data-options=\"editable:false\" ";
                    }
                    itemHtml += "style=\"width:" + (item.width == "" ? "200" : item.width) + "px; height:" + (item.height == "" ? "30" : item.height) + "px;\"> ";
                    if (data_type == "datebox")
                    {
                         
                        itemHtml += "<label>To</label>";
                        itemHtml += "<input id='field_" + item.grid + "_" + item.name + "_end' class=\" " + UIControlType.GetEasyUIType(item.data_type) + " \" ";
                        itemHtml += " data-options=\"editable:false\" ";
                        itemHtml += "style=\"width:" + (item.width == "" ? "200" : item.width) + "px; height:" + (item.height == "" ? "30" : item.height) + "px;\"> ";
                    }
                    serachBoxItem.AppendLine(itemHtml);
                }
                SerachBoxHtml = string.Format(SerachBoxHtml, grid,
                    serachBoxItem.ToString(), grid);
                return Html2String(SerachBoxHtml);
            }
            catch (Exception ex)
            {
                return ex.Message;// throw;
            }
        }

        //        public static string GetSerachBoxHtml(string serachConfigName)     
        //        {
        //            try
        //            {
        //                ArasProxyServices aps = new ArasProxyServices();
        //                string serachConfigJson = aps.GetMethodResult("pub_XT_GetSerachInfo", "<name>" + serachConfigName + "</name>", "TEXT");
        //                System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
        //                List<SerachBoxItemInfo> SerachBoxItems =
        //                    jss.Deserialize<List<SerachBoxItemInfo>>(serachConfigJson);
        //                //生成Html
        //                /*
        //<label for=""id1"">Male1</label>
        //<input id=""id1"" class=""easyui-textbox"" data-options=""iconCls:'icon-search'"" style=""width:300px; height:30px;""> 
        //                 */
        //                string SerachBoxHtml = @"
        //<div id='serachbox_{0}' style="" height:40px; text-align:center; margin-top:0px; margin-bottom:0px;"">
        //{1}
        //&nbsp;
        //<a id=""btn"" href=""#"" class=""easyui-linkbutton"" data-options=""iconCls:'icon-search'"" onclick=""log.ajax.ExecGridSerach('{2}','WHERE')"">搜索</a>
        //</div>";
        //                StringBuilder serachBoxItem = new StringBuilder();
        //                string grid = "";
        //                foreach (SerachBoxItemInfo item in SerachBoxItems)
        //                {
        //                    grid = item.grid;
        //                    string itemHtml = "<label for=\"" + item.id + "\">" + item.label + "</label>&nbsp;" +
        //                        "<input id='field_" + item.grid + "_" + item.id + "' class=\"" + UIControlType.GetEasyUIType(item.data_type) +
        //                        "\" data-options=\"iconCls:'icon-search'\"" +
        //                            "style=\"width:200px; height:30px;\"> ";
        //                    serachBoxItem.AppendLine(itemHtml);
        //                }
        //                SerachBoxHtml = string.Format(SerachBoxHtml, grid,
        //                    serachBoxItem.ToString(), grid);
        //                return Html2String(SerachBoxHtml);
        //            }
        //            catch (Exception ex)
        //            {
        //                return ex.Message;// throw;
        //            }
        //        }

        public static string GetMenusHtml(string menuName)
        {
            throw new NotImplementedException();
        }



        public class SerachBoxItemInfo
        {
            public SerachBoxItemInfo()
            { }
            public string name = "";
            public string id = "";
            public string isab = "";
            public string label = "";
            public string data_type = "";
            public string fsourcetype = "";
            public string data_source = "";
            public string grid = ""; //grid id
            public string width = "";
            public string height = "";
        }

        public class ToolbarItemInfo
        {
            public ToolbarItemInfo()
            { }

            public string name = "";
            public string label = "";
            public string icon = "";
            public string ps = "";
            public string method = "";
        }
    }
}