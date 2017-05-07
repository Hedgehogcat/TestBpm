using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Data;
using System.Text;

namespace Com.JoinSoft.Services
{
    public class ExportServices
    {
        public void export(string filename, string sql, string columns)
        {
            HttpResponse Response = HttpContext.Current.Response;
            Response.Clear();
            Response.AppendHeader("Content-Disposition", "attachment;filename=" + filename + ".xls");
            Response.Write("<html><head><meta http-equiv=Content-Type;content=\"application/ms-excel;charset=utf-8\"><title></title></head><body><center>");
            Com.JoinSoft.Services.ExportServices es = new Com.JoinSoft.Services.ExportServices();
            string excelText = es.DataToExcel(sql, columns);
            Response.Write(excelText);
            Response.Write("</center></body></html>");
            Response.End();

        }

        public string DataToExcel(string sql, string columns)
        {
            ArasProxyServices aps = new ArasProxyServices();
            string result = aps.GetMethodResult2VHtml("Pub_xt_getExportData", "<sql>" + sql + "</sql><columns>" + columns + "</columns>", "TEXT");
            result = result.Replace("&lt;", "<");
            result = result.Replace("&gt;", ">");
            return result;
        }
    }
}