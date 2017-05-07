using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Com.JoinSoft.Services;
using System.IO;
using Aras.IOM;
using System.Text;
using System.Web.SessionState;

namespace Com.JoinSoft.Services
{
    /// <summary>
    /// jQueryUploadify 的摘要说明
    /// </summary>
    public class jQueryUploadify : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/Json";
            HttpPostedFile file = context.Request.Files["Filedata"];
            string uploadPath = @context.Request["folder"];
            string fileUUID = Com.Bpm.Base.Units.Help.GetUUIDToUpper();
            string saveBasePath = "~/Data/File/";
            saveBasePath = context.Server.MapPath(saveBasePath);
            string savePath = saveBasePath + fileUUID + "\\";
            string fileName = savePath.TrimEnd('\\') + "_" + Path.GetFileName(file.FileName);
            Com.JoinSoft.Services.ResultEntity result = new ResultEntity();
            try
            {
                if (file != null)
                {
                    context.Request.Files[0].SaveAs(fileName);
                    //下面这句代码缺少的话，上传成功后上传队列的显示不会自动消失
                    //context.Response.Write(string.Format("{0}/{1}", Path.GetFileName(fileName), fileName,fileUUID));
                    context.Response.Write("{fileUUID:\"" + fileUUID + "\",filePath:\"" + fileName + "\",fileName:\"" + Path.GetFileName(file.FileName) + "\"}");
                }
                else
                {
                    context.Response.Write("0");
                }
            }
            catch (Exception ex)
            {
                result.SetErrorInfo("Exception", ex.Message);
                context.Response.Write(result.ToJsonString());
                return;
            }


            //if (file != null)
            //{
            //    //获取文件后缀名
            //    string extension = file.FileName.Substring(file.FileName.LastIndexOf("."), (file.FileName.Length - file.FileName.LastIndexOf(".")));
            //    //按年月日生成文件夹
            //    string folderName = GetDateNYR();
            //    //生成新文件名
            //    string fileName = file.FileName;// "file_" + GetRandomStr(15, true, true, true) + extension.ToLower();
            //    string fileAllPath = uploadPath + folderName;
            //    CreateFilePath(fileAllPath);

            //    //保存原文件
            //    file.SaveAs(System.Web.HttpContext.Current.Server.MapPath(fileAllPath + fileName));

            //    //下面这句代码缺少的话，上传成功后上传队列的显示不会自动消失
            //    context.Response.Write(string.Format("{0}/{1}", folderName, fileName));
            //}
            //else
            //{
            //    context.Response.Write("0");
            //}
        }

        #region 随机字符串
        /// <summary>
        /// 随机字符串
        /// </summary>
        /// <param name="iLength">字符串长度</param>
        /// <param name="blOnlyNumber">是否只包含数字</param>
        /// <param name="blHaveNumber">是否包含数字</param>
        /// <param name="blIsLower">是否全部为小写</param>
        /// <returns></returns>
        public static string GetRandomStr(int iLength, bool blOnlyNumber, bool blHaveNumber, bool blIsLower)
        {
            char[] arrChar;
            if (blOnlyNumber) arrChar = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
            else
            {
                if (!blHaveNumber) arrChar = new char[] { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
                else arrChar = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
            }
            System.Text.StringBuilder num = new System.Text.StringBuilder();
            Random rnd = new Random(DateTime.Now.Millisecond);
            for (int i = 0; i < iLength; i++)
            {
                num.Append(arrChar[rnd.Next(0, arrChar.Length)].ToString());
            }
            return blIsLower ? num.ToString().ToLower() : num.ToString().ToUpper();
        }
        #endregion

        /// <summary>
        /// 若文件夹（路径）不存在，则创建
        /// </summary>
        /// <param name="str_Savepath">保存路径，如：FileUpload/</param>
        public static void CreateFilePath(string str_FolderPath)
        {
            string str_Path = System.Web.HttpContext.Current.Server.MapPath(str_FolderPath);
            if (!System.IO.Directory.Exists(str_Path))
                System.IO.Directory.CreateDirectory(str_Path);
        }

        /// <summary>
        /// 获取年月日字符串（2013/05/30/）
        /// </summary>
        /// <returns></returns>
        public static string GetDateNYR()
        {
            string str_Date = DateTime.Now.ToString("yyyy/MM/dd/");
            return str_Date;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}