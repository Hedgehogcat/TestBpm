using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Com.JoinSoft.Services
{
    public class UIControlType : DBTypeConvert
    {
        public UIControlType()
        {

        }

        public static string GetEasyUIType(string dbType)
        {
            if (string.IsNullOrEmpty(dbType))
            {
                return "";
            }
            string uiType = "";
            switch (dbType.ToLower())
            {
                case _string:
                    uiType = "easyui-textbox";
                    break;
                case _integer:
                    uiType = "easyui-numberbox";
                    break;
                case _text:
                    uiType = "easyui-textbox";
                    break;
                case _md5:
                    uiType = "easyui-textbox";
                    break;
                case _combobox:
                    uiType = "easyui-combobox";
                    break;
                case _item:
                    uiType = "easyui-textbox";
                    break;
                case _float:
                    uiType = "easyui-numberbox";
                    break;
                case _datebox:
                    uiType = "easyui-datebox";
                    break;
                case _datetime:
                    uiType = "easyui-datetimebox";
                    break;
                default:
                    uiType = "";
                    break;
            }
            return uiType;
        }

        public static string GetHtmlType(string dbType)
        {
            if (string.IsNullOrEmpty(dbType))
            {
                return "";
            }
            string uiType = "";
            switch (dbType.ToLower())
            {
                case _string:
                    break;
                case _integer:
                    break;
                case _text:
                    break;
                case _md5:
                    break;
                case _combobox:
                    break;
                case _item:
                    break;
                case _float:
                    break;
                case _datebox:
                    break;
                case _datetime:
                    break;
                default:
                    uiType = "";
                    break;
            }
            return uiType;
        }

        public static string GetDojoType(string dbType)
        {
            if (string.IsNullOrEmpty(dbType))
            {
                return "";
            }
            string uiType = "";
            switch (dbType.ToLower())
            {
                case _string:
                    break;
                case _integer:
                    break;
                case _text:
                    break;
                case _md5:
                    break;
                case _combobox:
                    break;
                case _item:
                    break;
                case _float:
                    break;
                case _datebox:
                    break;
                case _datetime:
                    break;
                default:
                    uiType = "";
                    break;
            }
            return uiType;
        }

        public static string GetWinFormType(string dbType)
        {
            if (string.IsNullOrEmpty(dbType))
            {
                return "";
            }
            string uiType = "";
            switch (dbType.ToLower())
            {
                case _string:
                    break;
                case _integer:
                    break;
                case _text:
                    break;
                case _md5:
                    break;
                case _combobox:
                    break;
                case _item:
                    break;
                case _float:
                    break;
                case _datebox:
                    break;
                case _datetime:
                    break;
                default:
                    uiType = "";
                    break;
            }
            return uiType;
        }
    }
}