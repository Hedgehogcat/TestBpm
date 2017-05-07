using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Com.JoinSoft.Services
{
    public class DBTypeConvert
    {
        public const string _string = "string";
        public const string _boolean = "boolean";
        public const string _integer = "integer";
        public const string _combobox = "combobox";
        public const string _text = "text";
        public const string _md5 = "md5";
        public const string _item = "item";
        public const string _decimal = "decimal";
        public const string _float = "float";
        public const string _colorlist = "colorlist";
        public const string _datebox = "datebox";
        public const string _datetime = "datetime";

        public static List<string> _typeList = new List<string>() { 
        _string,_boolean,_integer,_combobox,_text,_md5,_item,_decimal,_float,_colorlist,_datebox,_datetime
        };

    }
}