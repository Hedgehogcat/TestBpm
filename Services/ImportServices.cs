using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;

namespace Com.JoinSoft.Services
{
    public class ImportServices
    {
        public string Excel2Json(string filepath, string columns)
        {
            filepath = @"~/Data/File/Import/" + filepath + "";
            filepath = Com.JoinSoft.Services.ComServices.GetServer().MapPath(filepath);
            //System.Diagnostics.Debug.WriteLine("-----------------------------------------------------");
            //System.Diagnostics.Debug.WriteLine(filepath);
            //System.Diagnostics.Debug.WriteLine(Path.GetFullPath(filepath));
            //System.Diagnostics.Debug.WriteLine(File.Exists(filepath));
            //System.Diagnostics.Debug.WriteLine(File.Exists(Path.GetFullPath(filepath)));
            DataTable dtable = null;
            try
            {
                if (File.Exists(filepath) == false)
                {

                    return "[{\"error_import\":\"文件不存在\"}]";
                }
                Aspose.Cells.Workbook workbook = new Aspose.Cells.Workbook();
                workbook.Open(filepath);

                Aspose.Cells.Worksheet worksheet = workbook.Worksheets[0];
                dtable = worksheet.Cells.ExportDataTable(0, 0, worksheet.Cells.MaxRow + 1, worksheet.Cells.MaxColumn + 1);  //读取有title的excel 
                DataRow row = dtable.Rows[0];
                List<string> names = new List<string>();
                for (int i = 0; i < row.Table.Columns.Count; i++)
                {
                    if (row.ItemArray[i].ToString().Trim() != "")
                    {
                        names.Add(row.ItemArray[i].ToString().Trim());
                    }
                    if (row.ItemArray[i].ToString().Trim() == "")  //如果该列列名为空，移除该列
                    {

                        dtable.Columns.RemoveAt(i);
                        i = i - 1;
                    }
                }
                List<string> names_need = new List<string>() { };      //必须有的列
                string[] strs = columns.Split(';');
                for (int i = 0; i < strs.Length; i++)
                {
                    names_need.Add(strs[i]);
                }
                for (int m = 0; m < names_need.Count; m++)           //判断必须的列是否存在
                {
                    if (names.Contains(names_need[m]))
                    {
                        continue;
                    }
                    else
                    {
                        return "[{\"error_import\":\"Excel中列名：【" + names_need[m] + "】不存在！\"}]";
                    }
                }
                //找出必须有列所在的列号
                List<int> index = new List<int>();
                for (int n = 0; n < names_need.Count; n++)
                {
                    for (int i = 0; i < row.Table.Columns.Count; i++)
                    {
                        if (dtable.Rows[0].ItemArray[i].ToString().Trim() == names_need[n])
                        {
                            index.Add(i);
                        }
                    }
                }
                //拼json结果集
                string json = "[";
                for (int j = 1; j < dtable.Rows.Count; j++)
                {
                    json += "{";
                    for (int k = 0; k < strs.Length; k++)
                    {
                        if (k == strs.Length - 1)
                        {
                            json += "\"column" + k.ToString() + "\":\"" + dtable.Rows[j][index[k]].ToString() + "\"";
                        }
                        else
                        {
                            json += "\"column" + k.ToString() + "\":\"" + dtable.Rows[j][index[k]].ToString() + "\",";
                        }
                    }	
                    if (j == dtable.Rows.Count - 1)
                    {
                        json += "}";
                    }
                    else
                    {
                        json += "}," + "\r\n";
                    }
                }
                json += "]";
                return json;
            }
            catch (System.Exception e)
            {

                return e.Message;
            }

        }
    }
}