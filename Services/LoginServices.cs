using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aras.IOM;


/*****************************
//罗汉文
//20141108
//
*****************************/
namespace Com.JoinSoft.Services
{

    public class LoginServices
    {

        public LoginServices()
        { }

        public static string LoginAras(string userName, string pwd, string dbName)
        {
            try
            {
                HttpServerConnection httpConn= IomFactory.CreateHttpServerConnection(ServerEntity.ServerURL,ServerEntity.DbName,userName,pwd);
                httpConn.Timeout = 6000;
                Item loginItem=httpConn.Login();
                if (loginItem.isError())
                {
                    return loginItem.getErrorString();
                }
                InitUserSeisson(userName, pwd, httpConn);
                return "true";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string LogOutAras(string sessionID)
        {
            throw new NotImplementedException("等待会话池的完成，会话池需要管理 两个Session");
        }

        public static void InitUserSeisson(string userName, string pwd, HttpServerConnection httpConn)
        {
            ComServices.SetLoginUser(userName, pwd, httpConn);
        }
    }
}