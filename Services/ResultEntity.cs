using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace Com.JoinSoft.Services
{
    /// <summary>
    /// 一般通讯返回格式
    /// </summary>
    public class ResultEntity
    {
        public string status = "";

        public string error_code = "";
        public string error_note = "";

        public string code = "";
        public string note = "";
        public readonly List<ResultEntity> items = new List<ResultEntity>();


        public override string ToString()
        {
            string result = "";
            result = "status:" + status;
            result = result + "$$$" + "error_code:" + error_code;
            result = result + "$$$" + "error_note:" + error_note;
            result = result + "$$$" + "code:" + code;
            result = result + "$$$" + "note:" + note;
            return result;
            //   return base.ToString();
        }

        public string ToJsonString()
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            result.Append("\"status\":\"" + status + "\",");
            result.Append("\"code\":\"" + code + "\",");
            result.Append("\"note\":\"" + note + "\",");
            result.Append("\"error_code\":\"" + error_code + "\",");
            result.Append("\"error_note\":\"" + error_note + "\"");
            result.Append("}");
            return result.ToString();
        }

        public void SetErrorInfo(string error_code,
            string error_note)
        {
            this.status = "-1";
            this.error_code = error_code;
            this.error_note = error_note;
        }

        public void SetOKInfo(string code,
           string note)
        {
            this.status = "1";
            this.code = code;
            this.note = note;
        }


    }
}