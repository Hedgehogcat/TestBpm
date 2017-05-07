using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aras.IOM;


/*****************************
//罗汉文
//20141115
//
*****************************/
namespace Com.JoinSoft.Services
{
    public class IndexServices
    {
        public IndexServices()
        {

        }

        public static string SGetMainMenuInfo()
        {
            IndexServices ins = new IndexServices();
            return ins.GenMainMenuHtml();
        }
        public string GetMainMenuInfo()
        {
            ArasProxyServices ps = new ArasProxyServices();
            return ps.GetMethodResult("GetMainMenuInfo", "", "TEXT");
        }

        public string GenMainMenuHtml()
        {
            //[name,label,url,params,level]
            //List<MenuInfoEntity> test = new List<MenuInfoEntity>();
            //test.Add(new MenuInfoEntity { fname = "fname1", flabel = "flabel", 
            //    children = new List<MenuInfoEntity> {new MenuInfoEntity{fname="1.1fname",flabel="1.1flabel"} } });
            //test.Add(new MenuInfoEntity
            //{
            //    fname = "fname2",
            //    flabel = "flabe2",
            //    children = new List<MenuInfoEntity> { new MenuInfoEntity { fname = "1.2fname", flabel = "1.2flabel" } }
            //});
            //System.Web.Script.Serialization.JavaScriptSerializer jss1 = new System.Web.Script.Serialization.JavaScriptSerializer();
            //string test1=jss1.Serialize(test);

            string MainMenuHtml = "";
            string jsonMenuInfo = GetMainMenuInfo();
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();

            List<MenuInfoEntity> menus = jss.Deserialize<List<MenuInfoEntity>>(jsonMenuInfo);

            foreach (MenuInfoEntity menu in menus)
            {
                try
                {
                    string GroupStr =
                "<div title=\"" + menu.flabel + "\" style=\"padding: 10px;\" data-options=\"iconCls:'icon-" +
                menu.fimage.ToLower().Replace("_", "-").Replace(".png", "") + "',selected:true,animate:false\">" +
                "<div title=\"" + menu.forderby + "\">" +
                    "<ul>{0}" +
                    "</ul>" +
                "</div>" +
                 "</div>\n";
                    string pageStr = "";
                    foreach (MenuInfoEntity pageMenuInfo in menu.children)
                    {
                        try
                        {
                            pageStr = pageStr + "\n" +
                            "<li>" +
                                "<div>" +
                                    "<img src=\"../Data/Image/" + pageMenuInfo.fimage + "\" alt=\"" + pageMenuInfo.flabel + "\"/>&nbsp;" +
                                    "<a target=\"mainFrame_" + pageMenuInfo.flabel + "\" href=\"" + (pageMenuInfo.furl != "" ? pageMenuInfo.furl : "#") + "?" +
                                    pageMenuInfo.fparams.Replace("?", "") +
                                    "\" onclick=\"javascript:return false;\">" +
                                    pageMenuInfo.flabel + "</a>" +
                                "</div>" +
                            "</li>";
                        }
                        catch (Exception ex)
                        {
                            continue;
                        }


                    }
                    GroupStr = string.Format(GroupStr, pageStr);
                    MainMenuHtml = MainMenuHtml + GroupStr;
                }
                catch (Exception ex)
                {

                    continue;
                }

            }
            if (string.IsNullOrEmpty(MainMenuHtml))
            {
                MainMenuHtml = "当前没有你的菜单授权信息";
            }
            return MainMenuHtml;
        }

    }
    public class MenuInfoEntity
    {
        public string flevel = "";
        public string fname = "";
        public string flabel = "";
        public string furl = "";
        public string forderby = "";
        public string fimage = "";
        public string fparams = "";
        public List<MenuInfoEntity> children = new List<MenuInfoEntity>();
    }
}