using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Com.Bpm.Base.Helps;
using System.Web.Script.Serialization;
using System.IO;
using System.Web.SessionState;

namespace Com.JoinSoft.Services
{
    public class UrlServices
    {
        public static string GetScriptText()
        {
            string fileName1 = "./../Scripts/js.json";
            string fileName = Com.Bpm.Base.Helps.HttpHelp.GetServerObject().MapPath("~/Scripts/js.json");
            if (!File.Exists(fileName))
            {
                return "";
            }
            string n1 = Path.GetFullPath(fileName1);

            TxtFileHelp txt = new TxtFileHelp(fileName);
            string text = txt.GetText(fileName);
            var serializer = new JavaScriptSerializer();
            serializer.RegisterConverters(new[] { new DynamicJsonHelp() });
            dynamic obj = serializer.Deserialize(text, typeof(object));
            string changetheme = "";
            var theme = "";
            //HttpSessionState session =

            if (Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Request.Cookies["user_theme"] != null)
            {
                theme = Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Request.Cookies["user_theme"].Value;
                Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Session["user_theme"] = Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Request.Cookies["user_theme"].Value;
            }
            if (Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Session["user_theme"]!=null)
            {
                theme = Com.Bpm.Base.Helps.HttpHelp.GetCurrentHttpContext().Session["user_theme"].ToString();
            }
            if (theme != "" && theme != null)
            {
                changetheme = obj.key2.Replace("default", theme);
            }
            else
            {
                changetheme = obj.key2;
            }
            string abcdefg = obj.key1 + changetheme + obj.key3 + obj.key4 + obj.key5 + obj.key6 + obj.key7;

            return abcdefg;
        }
    }
}