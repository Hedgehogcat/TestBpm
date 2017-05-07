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
            string level = ps.GetMethodResult("WEB_XT_getMenuConfig", "", "TEXT");
            string type = Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Request["type"];
            if (type!=""&&type !=null)
            {
                level = type;
            }
            if (level == "3")
            {
                return ps.GetMethodResult("testMain", "", "TEXT");
            }
            else if (level == "2")
            {
                return ps.GetMethodResult("GetMainMenuInfo", "", "TEXT");
            }
            else
            {
                return "";
            }
        }
        public string GenMainMenuHtml()
        {
            ArasProxyServices ps = new ArasProxyServices();
            string level = ps.GetMethodResult("WEB_XT_getMenuConfig", "", "TEXT");
            string north = "<div region=\"north\" style=\"overflow: hidden; height: 52px; border-bottom-width: 0px; " +
                              "  position: relative; background: #D2E0F2 repeat-x center 50%; line-height: 20px; " +
                              "  color: #2319DC;\"> " +
                              "  <img src=\"/Data/Image/backImage2.png\" alt=\"\" width=\"100%\" height=\"52px\" /> " +
                             "   <div class=\"cus-index-logo-imagebutton\" style=\"top: 20px; right: 60px;\"> " +
                              "      <a href=\"#\" id=\"user_info\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-man'\" " +
                             "           onclick=\"log.ajax.ChangeUserInfo();\" " +
                             "           style=\"padding: 5px 0px; width:120; height: 25px; text-align: center\"><span style=\"font-size: 12px;\"> " +
                             "               个人信息</span> </a> " +
                             "      <a href=\"#\" id=\"btnSubmit\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-biz-leave'\" " +
                             "           onclick=\"log.ajax.onlineCallback('loginOut');window.location.href='/View/Login?method_name=index.aspx';\" " +
                             "           style=\"padding: 5px 0px; width: 60; height: 25px; text-align: center\"><span style=\"font-size: 12px;\"> " +
                             "               注销</span> </a> " +
                             "   </div> " +
                             "</div>";
            string center = "<div region=\"center\" id=\"mainPanle\" style=\"background: #eee; overflow: hidden;\"> " +
                               " <div id=\"tabs\" class=\"easyui-tabs\" fit=\"true\" border=\"false\">{0}" +
                                 "   <div title=\"主页\" style=\"padding: 0px;\" id=\"home\"> " +
                                  "      <iframe frameborder=\"0\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" " +
                                   "         allowtransparency=\"yes\" src=\"/BizPage/TemplateList/TemplateList.aspx?formname=WelcomePage\"  " +
                                    "        style=\"height:100%; width: 100%\"></iframe> " +
                                "    </div> " +
                             "   </div> " +
                            "</div>";
            string MainMenuHtml = "";
            string jsonMenuInfo = GetMainMenuInfo();
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();

            List<MenuInfoEntity> menus = jss.Deserialize<List<MenuInfoEntity>>(jsonMenuInfo);
            string type = Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Request["type"];
            if (type != ""&&type !=null)
            {
                level = type;
            }
            if (level == "3")
            {
                MainMenuHtml += "<div region=\"west\" split=\"true\" title=\"导航菜单\" style=\"width: 200px; overflow: hidden;\" icon=\"icon-redo\">";
                MainMenuHtml += "<div id=\"menu\" class=\"easyui-accordion\" fit=\"true\" border=\"false\">";
                foreach (MenuInfoEntity menu in menus)
                {
                    try
                    {
                        string GroupStr =
                    "<div title=\"" + menu.flabel + "\" data-options=\"iconCls:'icon-" +
                    menu.fimage.ToLower().Replace("_", "-").Replace(".png", "") + "',selected:true,animate:false\">" +
                    "<div title=\"" + menu.forderby + "\" class=\"easyui-accordion\" style=\"border: 0px;\">" +
                        "<ul id=\"" + menu.id + "\">" +
                        "</ul>" +
                    "</div>" +
                     "</div>\n" +
                        "<script type=\"text/javascript\">$(function(){ \n" +
                        "$('#" + menu.id + "').tree({    \n" +
                           "url:\" ../../Common/ServerProxy.aspx?TYPE=METHOD&JF=ITEMS&METHOD=Web_GetMenuTreeJson&BODY=<node>" + menu.id + "</node> \",\n" +
                           "onSelect: function(node){ " +
                            "    if (node.attributes.url){     " +
                            "    addTab(node.text, node.attributes.url,node.id); " +
                            "    } " +
                            "} " +
                           "});  \n" +
                         "})</script>\n";
                        MainMenuHtml = MainMenuHtml + GroupStr;
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }
                center = string.Format(center, "");
                MainMenuHtml += "</div> </div>";
            }
            if (level == "2")
            {
                MainMenuHtml += "<div region=\"west\" split=\"true\" title=\"导航菜单\" style=\"width: 200px; overflow: hidden;\" icon=\"icon-redo\">";
                MainMenuHtml += "<div id=\"menu\" class=\"easyui-accordion\" fit=\"true\" border=\"false\">";
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
                center = string.Format(center, "");
                MainMenuHtml += "</div> </div>";
            }
            if (level == "4")
            {
                north = "<div region=\"north\" style=\"height: 45px;border-bottom-width: 0px;\"> " +
                        "<iframe id=\"metro_menu_head\" frameborder=\"0\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" " +
                                    "allowtransparency=\"yes\" src=\"/Common/MetroMenuHead.aspx\" style=\"height: 100%; width: 100%; position:relative; z-index:4;\"> " +
                                "</iframe> " +
                        "</div>";
                string addpage = "<div title=\"菜单\" style=\"padding: 0px;\" id=\"menu\"> " +
                                "<iframe id=\"metro_menu\" frameborder=\"0\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" " +
                                    "allowtransparency=\"yes\" src=\"/Common/MetroMenu.aspx\" style=\"height:100%; width: 100%\"> " +
                                "</iframe> " +
                               " </div>";
                center = string.Format(center, addpage);
            }
            if (menus != null && menus.Count() == 0)
            {
                MainMenuHtml += "当前没有你的菜单授权信息";
            }
            MainMenuHtml += north + center;
            return MainMenuHtml;
        }

    }
    public class MenuInfoEntity
    {
        public string id = "";
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