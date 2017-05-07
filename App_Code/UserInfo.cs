using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Com.JoinSoft.App_Code
{
    public class UserInfo
    {
        private int id;
        private string userName;
        private string userPassword;
        private string onLine;
        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        public string UserName
        {
            get { return userName; }
            set { userName = value; }
        }
        public string UserPassword
        {
            get { return userPassword; }
            set { userPassword = value; }
        }
        public string OnLine
        {
            get { return onLine; }
            set { onLine = value; }
        }  
    }
}