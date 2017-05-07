<%@ Page Language="C#" AutoEventWireup="true" ValidateRequest="false" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="Aras.IOM" %>
<%
    
    try
    {
        initVar();
        initConnParam();
        initOutStrame();
        createInnovator();
        LogWrite("requestURL:" + requestURL);
        if (requestURL.Contains("ljqmanager"))
        {
            //调用ljqmanager
            LogWrite("调用ljqmanager");
           this.outChars= ljqmanagerServices();
           LogWrite("ljqmanager result :" + this.outChars);
           Response.ClearContent();
           Response.Write(this.outChars);
           Response.OutputStream.Flush();
           return;
        }

        if (string.IsNullOrEmpty(requestMethodBody))
        {
            requestMethodBody = "";
        }
        if (TYPE == "AML")
        {
            Item amlRequest = inn.newItem();
            amlRequest.loadAML(requestAML);
            if (amlRequest.isError())
            {
                LogWrite("装载AML语句发生错误,错误值:" + requestAML);
            }
            LogWrite("AML部分:\t" + requestAML);
            amlRequest.setAttribute("page", this.page);
            amlRequest.setAttribute("pagesize", this.rows);
            //记录查询语句 Log信息级别
            LogWrite("requestMethodBody处理前: \t:" + this.requestMethodBody);
            this.requestMethodBody.Replace("&lt;", "<");
            LogWrite("requestMethodBody处理后: \t:" + this.requestMethodBody);
            LogWrite("AML部分: \t:" + this.requestAML);
            if (requestAML.IndexOf("where=") < 0)
            {
                amlRequest.setAttribute("where", this.requestMethodBody);
                LogWrite("组装后AML where处理前: \t:" + amlRequest.getAttribute("where", ""));
                amlRequest.getAttribute("where", "").Replace("&lt;", "<");
                LogWrite("组装后AML where处理后: \t:" + amlRequest.getAttribute("where", ""));
            }
            //amlRequest.setAttribute("maxRecords", this.maxRecords);
            LogWrite("组装后最终请求AML语句: \t" + amlRequest.ToString());

            this.outItem = amlRequest.apply();

        }
        else if (TYPE == "METHOD")
        {   
            LogWrite("执行方法名称:"+this.requestMethod + "  参数字符串：" + this.requestMethodBody);
            this.outItem = this.inn.applyMethod(this.requestMethod, this.requestMethodBody + "<page>" + this.page + "</page><pagesize>" + this.rows + "</pagesize><parentid>" + Request["id"] + "</parentid>");
     LogWrite("Method this.outItem DOM:"+ this.outItem.ToString());

        }
       else if (TYPE == "CALLMETHOD")
        {
            LogWrite("执行方法名称:"+this.requestMethod + "  参数字符串：" + this.requestMethodBody);
            System.Diagnostics.Debug.WriteLine("------------------------------：" + this.requestMethod);
            if (this.requestMethod=="basicProductChose")
            {
                ;
            }
            
            (this.inn.getConnection() as HttpServerConnection).Timeout = 300000000;
            (this.inn.getConnection() as HttpServerConnection).ReadWriteTimeout = 300000000;
            this.outItem = this.inn.applyMethod(this.requestMethod, this.requestMethodBody);
     LogWrite("CALLMETHOD Method this.outItem DOM:"+ this.outItem.ToString());
        }
        else if (TYPE == "SQLALL")
        {
            LogWrite("TYPE = SQLALL");
            this.ExecSQLList();
            string SQLSTRING = this.GetWhereSqlString();
            string ORDERBY = Request["ORDERBY"];
            string ORDERTYPE = Request["ORDERTYPE"];
            LogWrite("查询类型：执行SQL语句，返回所有数据 TYPE=SQLALL。\n SQL语句：\n" + SQLSTRING + "\n ORDERBY:" + ORDERBY + "\n ORDERTYPE:" + ORDERTYPE);
            string sql = SQLSTRING;
            string sql2admin = "<sql2admin>" + sql + "</sql2admin>";
            LogWrite("sql2admin:\n" + sql2admin);
            this.outItem = this.inn.applyMethod("publicUser2AdminApplySQL", sql2admin);
            //this.outItem = this.inn.applySQL(sql);
        }
        else if (TYPE == "SQL")
        {
            string[] sqlVar = this.requestMethod.Split(new char[] { '&' });
            LogWrite(sqlVar[0]);
            this.outItem = this.inn.applyMethod("cama_ApplySql", "<sql>" + sqlVar[0] + "</sql>");
            Item selectCountItem = this.inn.applyMethod("cama_ApplySql", "<sql>" + sqlVar[1] + "</sql>");
            outItem.getItemByIndex(0).setAttribute("itemmax", selectCountItem.getItemByIndex(0).getProperty("total", "0"));
            if (selectCountItem.getItemByIndex(0).getProperty("total", "0") == "0")
            {
                this.outChars = "{\"total\":" + "0,\"rows\":" + "[]" + "}";
                Response.Write(outChars);
                return;
            }
            
        }
        else if (TYPE == "SQLFY")
        {
            this.ExecSQLList();
            int pageSize = 10;
            int page = 1;
            if (!string.IsNullOrEmpty(this.page))
            {
                try
                {
                    pageSize = Int32.Parse(this.rows);
                }
                catch
                {
                    pageSize = 10;
                }
            }
            if (!string.IsNullOrEmpty(this.rows))
            {
                try
                {
                    page = Int32.Parse(this.page);
                }
                catch
                {
                    page = 1;
                }
            }
            string SQLSTRING = this.GetWhereSqlString();
            string ORDERBY = Request["ORDERBY"];
            string ORDERTYPE = Request["ORDERTYPE"];
LogWrite("查询类型：执行SQL语句，返回所有数据 TYPE=SQLFY。\n SQL语句：\n" + SQLSTRING + "\n ORDERBY:" + ORDERBY + "\n ORDERTYPE:" + ORDERTYPE);
            int count=this.GetSqlQueryCount(SQLSTRING);
            this.total = count.ToString();
            LogWrite("查询总数\t" + count.ToString());
            if (count <= 0)
            {
                this.outItem = inn.newError("查询总数出现错误.");
            }
            else
            {
                string sql = this.SQLStrPreProc(SQLSTRING, page, pageSize, ORDERBY, ORDERTYPE);
                // this.outItem = this.inn.applyMethod("SQLStrPreProc", sql);
                /*applySQL 管理员才能执行
                 publicUser2AdminApplySQL 方法  参数 sql2admin
                 */
                //this.outItem = this.inn.applySQL(sql);
                string sql2admin = "<sql2admin>" + sql + "</sql2admin>";
                LogWrite("sql2admin:\n" + sql2admin);
                this.outItem = this.inn.applyMethod("publicUser2AdminApplySQL", sql2admin);
            }
        }
        else if (TYPE == "SQLFY2")
        {
            this.ExecSQLList();
            
            int pageSize = 10;
            int page = 1;
            if (!string.IsNullOrEmpty(this.page))
            {
                try
                {
                    pageSize = Int32.Parse(this.rows);
                }
                catch
                {
                    pageSize = 10;
                }
            }
            if (!string.IsNullOrEmpty(this.rows))
            {
                try
                {
                    page = Int32.Parse(this.page);
                }
                catch
                {
                    page = 1;
                }
            }
            string SQLSTRING = this.GetWhereSqlString();
            string ORDERBY = Request["ORDERBY"];
            string ORDERTYPE = Request["ORDERTYPE"];
            LogWrite("查询类型：执行SQL语句，返回所有数据 TYPE=SQLFY2。\n SQL语句：\n" + SQLSTRING + "\n ORDERBY:" + ORDERBY + "\n ORDERTYPE:" + ORDERTYPE);
            int count = this.GetSqlQueryCount(SQLSTRING);
            this.total = count.ToString();
            LogWrite("查询总数\t" + count.ToString());
            if (count <= 0)
            {
                this.outItem = inn.newError("查询总数出现错误.");
            }
            else
            {
                string sql = this.SQLStrPreProc2(SQLSTRING, page, pageSize, ORDERBY, ORDERTYPE);
                string sql2admin = "<sql2admin>" + sql + "</sql2admin>";
                LogWrite("sql2admin:\n" + sql2admin);
                this.outItem = this.inn.applyMethod("publicUser2AdminApplySQL", sql2admin);
            }
        }



        //JF != "METHOD"||JF!="TEXT"||JF!="RESULT"||JF!="ITEMS"||JF!="SOAP"||
        if ((this.outItem == null || this.outItem.isError()) && (JF == "GRID"||JF=="GRID2"))
        {
            //this.outChars = "{\"total\":" + "0,\"rows\":" + "[]" + "}";
            //Response.Write(outChars);
            if (this.outItem == null)
            {
                LogWrite("异常  if (this.outItem == null )");
                this.outChars = "{\"total\":\"" + "0" + "\"" + ",\"rows\":" + "[]" + "}";
                Response.Write(this.outChars);
                return;
            }
            if (this.outItem.getItemCount() < 0)
            {
                LogWrite("异常   if (this.outItem.getItemCount() < 0)  " + this.outItem.getErrorString() + "\n" + this.outItem.getErrorCode());
                LogWrite("this.outItem.ToString:" + this.outItem.ToString());
                this.outChars = "{\"total\":\"" + "0" + "\"" + ",\"rows\":" + "[]" + "}";
                Response.Write(this.outChars);
                return;
            }
            if (this.outItem.getItemCount() == 0)
            {
                LogWrite("异常   if (this.outItem.getItemCount() == 0) ，未查询到数据。");
            }

        }

        //分析数据  XML 到 JSON
        if (string.IsNullOrEmpty(JF) || JF == "GRID")
        {
            LogWrite("生成表格数据1");
            string jsonMainData = Item2JSONBase(this.outItem);
            //string jsonMainData = Item2JSONBase2(this.outItem);
            this.outChars = "{\"total\":\"" + this.total + "\"" + ",\"rows\":" + jsonMainData + "}";
        }
        else if (JF == "GRID2")
        {
            LogWrite("生成表格数据2");
            string jsonMainData = Item2JSONBase2(this.outItem);
            this.outChars = "{\"total\":\"" + this.total + "\"" + ",\"rows\":" + jsonMainData + "}";
        }
        else if (JF == "TREE")
        {
            LogWrite("生成TREE数据");
            string jsonMainData = Item2JSONBase(this.outItem);
            this.outChars = jsonMainData;
        }
        else if (JF == "ITEMS" || JF == "TEXT" )
        {
            LogWrite("生成METHOD数据");
            if (this.outItem.dom.SelectSingleNode(Item.XPathFault) == null)
            {
                this.outChars = this.outItem.dom.SelectSingleNode(Item.XPathResult).InnerXml;
            }
            else
            {
                this.outChars = this.outItem.dom.SelectSingleNode(Item.XPathFault).InnerXml;
            }
        }
        else if (JF == "RESULT")
        {
            LogWrite("生成METHOD数据");
            if (this.outItem.dom.SelectSingleNode(Item.XPathFault) == null)
            {
                this.outChars = this.outItem.dom.SelectSingleNode(Item.XPathResult).InnerXml;
            }
            else
            {
                this.outChars = this.outItem.dom.SelectSingleNode(Item.XPathFault).OuterXml;
            }
            
        }
        else if (JF == "SOAP")
        {
            LogWrite("生成METHOD数据");
            this.outChars = this.outItem.ToString();
        }
        
        if (this.ISJSONP=="1")
        {
            LogWrite("JSONP");
            String callback = Request.Params["jsoncallback"] == null ? "" : Request.Params["jsoncallback"];
            outChars = callback+"("+outChars+")";
        }
        if (Request.UserHostAddress == "127.0.0.1"||Request.UserHostAddress =="::1")
        {
            LogWrite(outChars);
        }
        if (this.SERVEROUTDATA == "1")
        {
            LogWrite(outChars);
        }
        if (this.SERVEROUTXML == "1")
        {
            LogWrite(this.outItem.dom.OuterXml);
        }
        

        Response.Write(outChars);
        return;

    }
    catch (Exception ex)
    {
        //记录查询语句 Log信息级别
        LogWrite("错误:" + ex.Message + "\t" + ex.StackTrace);
        Response.Write(ex.Message);
        Response.Flush();
        return;
    }
%>
<script type="text/C#" runat="server">
    Innovator inn = null;
    Item outItem = null;
    //Item inItem = null;
    Item loginItem = null;

    string outChars = "";
    string requestAML = "";
    string requestMethod = "";
    string requestMethodBody = "";
    bool isWritelog = true;
 

    //IOM需要的的参数
    string AUTHUSER = "";
    string AUTHPASSWORD = "";
    string DATABASE = "";
    string SERVEROUTDATA = "";//是否在服务器端输出JSON数据以供检查, 如是 需是"1"
    string SERVEROUTXML = "";//是否在服务器端输出XML数据以供检查, 如是 需是"1"
    string ISJSONP = ""; //是否在服务器端检查是跨域访问, 如是 需是"1"
    //string TIMEZONE_NAME = "China Standard Time";
    //string LOCALE = "zh-CN";
    string SERVERURL = "";
    
    
    //    string maxRecords = "";//最大查询条数
    string TYPE = "";  //API: AML or METHOD or SQL 
    string JF = "";// GRID，TREE，MENU····分析数据的输出格式
    //string DATETYPE = "0";  //“1” 2014-04-05 前10位 “2” 2014-05-09 00:00:00 前19位中间空格格式  "3" 只取时间 00:00:00 
    string DATEFORMAT = "";  //时间格式化样板 ，这个样板应该参考C#中DateTime关于ToString的格式化说明，此次使用的正是其重载的ToString
    List<string> DATEFIELDS = null;
    string GRIDQUERYID = "-1";
 string WHERE="-1";


    string bathPath = string.Empty;
    string logFilePath = string.Empty;
    string requestURL = string.Empty;
    //url参数全部小写 post全部大写
    //string ljqmanager = "";  //拦截器类型 如listservices(带有services)
    // string action = ""; //请求的方法,getlistlabel,getlistvalue


    //datagrid 参数区
    string total = "0";//总记录数
    string rows = "";//每页显示的行数
    string page = "";//当前页
    public void initVar()
    {
        requestURL = Request.Url.ToString();
        bathPath = System.Web.HttpContext.Current.Server.MapPath("./logs/");
 if(Request.UserHostAddress=="::1")
 {
  bathPath = bathPath.Trim('\\') +"\\"+ "127.0.0.1";
 }
 else
 {
  bathPath = bathPath.Trim('\\') +"\\"+ Request.UserHostAddress;
 }
        
        if (!Directory.Exists(bathPath))
        {
            Directory.CreateDirectory(bathPath);
        }
        logFilePath = bathPath + "\\"+System.DateTime.Now.ToString("yyyy-MM-ddTHHmmss")  + "-" + System.Guid.NewGuid().ToString().Replace("-", "") + "Log.txt";
        //LogWrite("开始处理请求");

        TYPE = Request["TYPE"];//1,AML,2,Method 3,SQL
   
        this.DATEFORMAT = Request["DATEFORMAT"];
        if (string.IsNullOrEmpty(this.DATEFORMAT))
        {
            this.DATEFORMAT = "yyyy-MM-dd";
        }
        if(!string.IsNullOrEmpty(Request["DATEFIELDS"]))  // $$
        {
            DATEFIELDS = new List<string>(Request["DATEFIELDS"].Split(new string[] { "$$" }, StringSplitOptions.RemoveEmptyEntries));
        }
        //LogWrite("时间格式样板 在时间格式类型为4的使用使用:" + this.DATEFORMAT);
        
        JF = Request["JF"];//1,AML,2,Method
        //LogWrite("JF:"+JF);
        //maxRecords = Request["maxRecords"] == "" ? "1000" : Request["maxRecords"];
        AUTHUSER = Session["arasUSER"] as string;
        AUTHPASSWORD = Session["arasPWD"] as string;
        if (string.IsNullOrEmpty(AUTHUSER) || string.IsNullOrEmpty(AUTHPASSWORD))
        {
            AUTHUSER = Request["AUTHUSER"];
            AUTHPASSWORD = Request["AUTHPASSWORD"];
        }
        requestAML = Request["AML"];
        requestMethod = Request["METHOD"];
        requestMethodBody = Request["BODY"];
        GRIDQUERYID = Request["GRIDQUERYID"];

       WHERE=Request["WHERE"];

        //Response.Write(TYPE+"-"+JF+"-"+ AUTHUSER+"-"+ AUTHPASSWORD+"-"+ requestAML+"-"+ requestMethod+"-"+ requestMethodBody);
        rows = Request["rows"] == "" ? "20" : Request["rows"];
        page = Request["page"] == "" ? "1" : Request["page"];
        if (TYPE == "SQL")
        {
            requestMethod = requestMethod.Replace("{pagecount}", rows).Replace("{page}", page);
        }

    }

    public void initConnParam()
    {
        this.ISJSONP = Request["ISJSONP"];
        this.SERVEROUTDATA = Request["SERVEROUTDATA"];
        this.SERVEROUTXML = Request["SERVEROUTXML"];
        //this.DATABASE = Request["DATABASE"];
       
        //if (this.DATABASE == null || this.DATABASE=="")
        //{
        //    this.DATABASE = Session["DatabaseName"] as string;
        //    LogWrite("Session DatabaseName:"+this.DATABASE);
        //    if(string.IsNullOrEmpty(this.DATABASE))
        //    {
        //        this.DATABASE = System.Web.Configuration.WebConfigurationManager.AppSettings["DATABASE"].ToString();
        //    }
        //}


        //this.SERVERURL = Request["SERVERURL"];
        //if (string.IsNullOrEmpty(this.SERVERURL))
        //{
        //    this.SERVERURL = Request.Url.ToString();
        //    if (!(this.SERVERURL == null || this.SERVERURL == ""))
        //    {
        //        this.SERVERURL = this.SERVERURL.Replace("GetServerJsons.aspx", "InnovatorServer.aspx");
        //        if (string.IsNullOrEmpty(this.SERVERURL))
        //        {
        //            this.SERVERURL = System.Web.Configuration.WebConfigurationManager.AppSettings["SERVERURL"].ToString();
        //        }
        //    }
        //}
        //LogWrite(" this.DATABASE :" + this.DATABASE);
        //LogWrite(" this.SERVERURL :" + this.SERVERURL);

    }

    public void createInnovator()
    {
        //HttpServerConnection conn = IomFactory.CreateHttpServerConnection(this.SERVERURL, this.DATABASE, this.AUTHUSER, this.AUTHPASSWORD);
        //this.loginItem = conn.Login();
        //if (this.loginItem.isError())
        //{
        //    throw new Exception("登录错误！" + this.loginItem.getErrorString());
        //}
        //else
        //{
        //    LogWrite("登录成功.");
        //}
        //this.inn = IomFactory.CreateInnovator(conn);
        this.inn = Com.JoinSoft.Services.ComServices.GetInnovator();
    }


    public void initOutStrame()
    {
        Response.ContentType = "text/plain";
        Response.Charset = "utf-8";
        Response.Expires = 0;
    }

    //public string string2Json(String s) {          
    //    StringBuilder sb = new StringBuilder();          
    //    for (int i=0; i<Length; i++) {                    
    //        char c = s.ToCharArray(.CharAt(i);              
    //        switch (c) {              
    //            case '\"':                  
    //                sb.Append("\\\"");                  
    //                break;             
    //            case '\\':                 
    //                sb.Append("\\\\");                 
    //                break;             
    //            case '/':                 
    //                sb.Append("\\/");                 
    //                break;              
    //            case '\b':                  
    //                sb.Append("\\b");                  
    //                break;              
    //            case '\f':                  
    //                sb.Append("\\f");                  
    //                break;              
    //            case '\n':                  
    //                sb.Append("\\n");                  
    //                break;              
    //            case '\r':                 
    //                sb.Append("\\r");                  
    //                break;              
    //            case '\t':                  
    //                sb.Append("\\t");                  
    //                break;              
    //            default:                 
    //                sb.Append(c);          
    //                ｝     
    //                return sb.ToString();      
    //        }

    public string ljqmanagerServices()
    {
        string request=Request.QueryString["ljqmanager"];
        LogWrite("request:" + request);
        if (request == "getlistlabel")
        {
            string name = Request.QueryString["name"];
            LogWrite("name:" + name);
            if (name==null)
            {
                name = "";
            }
            string value = Request.QueryString["value"];
            LogWrite("value:" + value);
            if (value == null)
            {
                value = "";
            }
            string aml = "<AML><Item action=\"get\" type=\"List\"><name>"+name+"</name>" +
                "<Relationships>" +
                "<Item action=\"get\" type=\"Value\">" +
                "<value>" + value + "</value>" +
                 "</Item>" +
                 "</Relationships>" +
                "</Item>" +
                "</AML>";
            Item result = this.inn.applyAML(aml);
            if (result.isError())
            {
                ;
            }
            else
            {
               string chars= result.getItemByIndex(0).getRelationships("Value").getItemByIndex(0).getProperty("label","default","zh");

               return chars;
            }
        }
        else if (request == "getlistvalue")
        {
            string name = Request.QueryString["name"];
            string label = Request.QueryString["label"];
            if (name == null)
            {
                name = "";
            }
            if (label == null)
            {
                label = "";
            }
            string aml = "<AML><Item action=\"get\" type=\"List\"><name>" + name + "</name>" +
                "<Relationships>" +
                "<Item action=\"get\" type=\"Value\">" +
                "<label>" + label + "<label>" +
                 "</Item>" +
                 "</Relationships>" +
                "</Item>" +
                "</AML>";
            Item result = this.inn.applyAML(aml);
            if (result.isError())
            {
                return "";
            }
            else
            {
                string chars = result.getItemByIndex(0).getRelationships("Value").getItemByIndex(0).getProperty("value", "default");

                return chars;
            }
        }
        else if (request == "getserachcode")
        {
            string gridid = Request["GRIDQUERYID"];
            return this.GetSerachCode(gridid);
        }
        else if(request=="getusermsg")
        {
            //string msgType = "";// 未读的，已读的，所有的
        }
        return "";
    }

    public string GetSerachCode(string gridqueryid)
    {
        string htmlCode = "";
        
        Item result = inn.applyMethod("publicUserGenHTMLSerach", "<id>"+gridqueryid.ToString()+"</id>");
        if (result.isError())
        {
            htmlCode = "<span>分析查询出错:" + result.getErrorString() + "</span>";
        }
        else 
        {
            htmlCode = result.getResult();
        }
        //分析返回值类型
        //if()
        //{
        
        //}
        string callback = Request["callback"];
        if (string.IsNullOrEmpty(callback) == false)
        {
            //跨域访问
            Response.ContentType = "application/json";
            htmlCode = callback + "({\"result\":\"" + htmlCode.Replace("\\", "\\\\").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t","   ").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"","\\\"") + "\"})";
            
        }
        return htmlCode;
    }

    /// <summary>
    /// 返回组合后的分页语句
    /// </summary>
    /// <param name="sqlStr">完整的SQL语句，查询出所有符合逻辑的数据(不含对排序的控制，不含有对top和分页的控制)，已知问题：对排序字段中有升有降的未处理，可以写视图或者子查询解决</param>
    /// <param name="pageNumber">查询第几页</param>
    /// <param name="everyPageCount">每页的显示数</param>
    /// <param name="orderByFieldString">需要排序的列，以逗号分割，不含有升序降序语法</param>
    /// <param name="orderByType">指定升序,默认升序 ASC</param>
    /// <returns></returns>
    public string SQLStrPreProc(string sqlStr, int pageNumber, int everyPageCount, string orderByFieldString, string orderByType)
    {
        LogWrite("组合分页语句，组合之前的值为 :string sqlStr, int pageNumber, int everyPageCount, string orderByFieldString, string orderByType" + "\r\n" +
            sqlStr + System.Environment.NewLine +
            pageNumber.ToString() + System.Environment.NewLine +
            everyPageCount.ToString() + System.Environment.NewLine +
            orderByFieldString + System.Environment.NewLine +
            orderByType);
        string sql = "";
        try
        {
            //默认升序 ASC DESC 降序
            string orderByType1 = "ASC";
            string orderByType2 = "DESC";
            if (string.IsNullOrEmpty(orderByType))
            {
                orderByType = "ASC";
            }

            if (orderByType == "ASC")
            {
                orderByType1 = "ASC";
                orderByType2 = "DESC";
            }
            else if (orderByType == "DESC")
            {
                orderByType1 = "DESC";
                orderByType2 = "ASC";
            }
            else
            {
                orderByType = "ASC";
                orderByType1 = "ASC";
                orderByType2 = "DESC";
            }


            if (string.IsNullOrEmpty(orderByFieldString))
            {
                orderByFieldString = "id";
            }

            //         sql = "select top " + everyPageCount.ToString() + " * from  " +
            //"(select top (" + ((pageNumber + 1) * everyPageCount).ToString() + ") *  from " +
            //"(" + sqlStr + "  order by " + orderByFieldString + " " + orderByType1 + " ) AS A9086 " +
            //"order by " + orderByFieldString + " " + orderByType2 + ") As B9086 order by " + orderByFieldString + " " + orderByType1 + "";

            sql = "select * from " +
                "(" +
                    "select top " + everyPageCount.ToString() + " * from " +
                    "(" +
                           "select top (" + ((pageNumber + 1) * everyPageCount).ToString() + ") *  " +
                            "from  " +
                            "(" + sqlStr +
                            " )  AS A9086   order by " + orderByFieldString + " " + orderByType1 + " " +
                    ") As B9086  order by " + orderByFieldString + "  " + orderByType2 + "  " +
                ") As C9086  order by " + orderByFieldString + "  " + orderByType1;

            LogWrite("组合之后的分页语句:" + sql);
        }
        catch (Exception ex)
        {
            sql = "";
            LogWrite("组合分页语句失败:" + ex.StackTrace + "\n" + ex.Message);
        }
        return sql;
    }

    public string SQLStrPreProc2(string sqlStr, int pageNumber, int everyPageCount, string orderByFieldString, string orderByType)
    {
        LogWrite("组合分页语句2，组合之前的值为 :string sqlStr, int pageNumber, int everyPageCount, string orderByFieldString, string orderByType" + "\r\n" +
            sqlStr + System.Environment.NewLine +
            pageNumber.ToString() + System.Environment.NewLine +
            everyPageCount.ToString() + System.Environment.NewLine +
            orderByFieldString + System.Environment.NewLine +
            orderByType);
        string sql = "";
        try
        {
            if (string.IsNullOrEmpty(orderByType))
            {
                orderByType = "ASC";
            }
            if (!(orderByType.ToUpper() == "DESC" || orderByType.ToUpper() == "ASC"))
            {
                orderByType = "ASC";
            }
            if (pageNumber<=0)
            {
                pageNumber = 1;
            }
            if (everyPageCount<=0)
            {
                everyPageCount = 10;
            }
            int rowNumberXY = pageNumber * everyPageCount;
            int rowNumberDY = (pageNumber-1) * everyPageCount;
            
            
            if (string.IsNullOrEmpty(orderByFieldString))
            {
                orderByFieldString = "created_on";
            }
            sql = "select * from (select  ROW_NUMBER() over(order by " + orderByFieldString +" "+ orderByType + ") as ROWNUMBER , " +
"*  from (" + sqlStr + ") as A9086 ) as B9086 " +
 "where " + rowNumberXY + ">= ROWNUMBER and ROWNUMBER >" + rowNumberDY;
            LogWrite("组合之后的分页语句:" + sql);
        }
        catch (Exception ex)
        {
            sql = "";
            LogWrite("组合分页语句失败:" + ex.StackTrace + "\n" + ex.Message);
        }
        return sql;
    }

    public string Item2JSONBase(Item singItem)
    {
        if (singItem == null || singItem.getItemCount() == 0)
        {
            LogWrite("查询到的数据为0.");
            return "[]";
        }
        if(this.TYPE.ToUpper()=="AML")
        {
        this.total = singItem.getItemByIndex(0).getAttribute("itemmax", "0") == "0" ? singItem.getItemCount().ToString() : singItem.getItemByIndex(0).getAttribute("itemmax", "0");
        }
        LogWrite("查询到的数据为:" + singItem.getItemCount().ToString());
        StringBuilder sb = new StringBuilder();
        string item2String = singItem.dom.SelectSingleNode(Item.XPathResult).OuterXml;
        // LogWrite("XML数据 Item2JSONBase item2String: \n " + item2String);
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(item2String);
        XmlNode root = doc.DocumentElement;
        XmlNodeList rootChilds = root.ChildNodes;
        string propertyName = "";
        string propertyValue = "";
        sb.Append("[");
        foreach (XmlNode temp in rootChilds)
        {
            XmlNodeList propXMLs = temp.ChildNodes;
            sb.Append("{");
            foreach (XmlNode temp2 in propXMLs)
            {
                propertyName = temp2.Name;
		if(propertyName =="_parentid") propertyName = "_parentId";
                if (propertyName == "id")
                {
                    propertyValue = temp2.InnerText.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                }
                else if (propertyName == "Relationships")
                {
                    //下一步，取子表，进行分析
                    continue;
                }
                else
                {
                    string keyed_name = ((XmlElement)temp2).GetAttribute("keyed_name");
                    if (string.IsNullOrEmpty(keyed_name))
                    {
                        propertyValue = temp2.InnerText.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                    }
                    else
                    {
                        propertyValue = keyed_name.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                    }

                }

                sb.Append("\"" + propertyName + "\"");
                sb.Append(":");
                sb.Append("\"");
                propertyValue = this.DateStr2String(propertyValue, this.DATEFORMAT);
                sb.Append(propertyValue);
                sb.Append("\"");
                sb.Append(",");

            }
            sb.Remove(sb.Length - 1, 1);
            sb.Append("}");
            sb.Append(",");
        }
        if (sb.Length>1)
        {
            sb.Remove(sb.Length - 1, 1);
        }
        sb.Append("]");
        return sb.ToString();
    }

    public int Total2Int()
    {
        int total = -1;
        try
        {
            total=Int32.Parse(this.total);
        }
        catch
        {
            ;
        }
        return total;
    }

    public string Item2JSONBase2(Item singItem)
    {
        try
        {
            if (singItem == null || singItem.getItemCount() == 0 || singItem.getItemCount() < 0)
            {
                LogWrite("查询到的数据为0.");
                return "[]";
            }
            else
            {
                LogWrite("getItemCount()::" + singItem.getItemCount().ToString());
               
            }
            if(this.Total2Int()>0)
            {
                ;
            }
            else
            {
            this.total = singItem.getItemByIndex(0).getAttribute("itemmax", "0") == "0" ? singItem.getItemCount().ToString() : singItem.getItemByIndex(0).getAttribute("itemmax", "0");
            }
            StringBuilder sb = new StringBuilder();
            string item2String = singItem.dom.SelectSingleNode(Item.XPathResult).OuterXml;
            //LogWrite("XML数据 Item2JSONBase2 item2String: \n " + item2String);
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(item2String);
            XmlNode root = doc.DocumentElement;
            XmlNodeList rootChilds = root.ChildNodes;
            string propertyName = "";
            string propertyValue = "";
            sb.Append("[");
            foreach (XmlNode temp in rootChilds)
            {
                XmlNodeList propXMLs = temp.ChildNodes;
                sb.Append("{");
                foreach (XmlNode temp2 in propXMLs)
                {
                    propertyName = temp2.Name;

                    if (propertyName == "id")
                    {
                        propertyValue = temp2.InnerText.Replace("\\", "\\\\").Replace("\\", "\\\\").Replace("\r\n", "\\r\\n").Replace("\n", "\\n");
                    }
                    else if (propertyName == "Relationships")
                    {
                        //下一步，取子表，进行分析
                        continue;
                    }
                    else
                    {
                        string keyed_name = ((XmlElement)temp2).GetAttribute("keyed_name");
                        string ref_type = ((XmlElement)temp2).GetAttribute("type");
                        if (ref_type != "" || keyed_name != "")
                        {
                            //此属性是引用属性，插入一个含有此属性对应表id的字段，命名规则："ref_id_"+实际的名称
                            string ref_field_name = "ref_id_" + propertyName;
                            string ref_field_value = temp2.InnerText.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                            sb.Append("\"" + ref_field_name + "\"");
                            sb.Append(":");
                            sb.Append("\"");
                            sb.Append(ref_field_value);
                            sb.Append("\"");
                            sb.Append(",");
                            //代码继续执行，去添加含有keyed_name的键值
                        }

                        if (string.IsNullOrEmpty(keyed_name))
                        {
                            //keyed_name 不存在
                            propertyValue = temp2.InnerText.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                        }
                        else
                        {
                            //keyed_name 存在
                            propertyValue = keyed_name.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n").Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                            sb.Append("\"" + propertyName + "_id\"");
                            sb.Append(":");
                            sb.Append("\"");
                            sb.Append(temp2.InnerText.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r\n", "\\r\\n")).Replace("\n", "\\n").Replace("\t", "   ").Replace("<", "&lt;").Replace(">", "&gt;");
                            sb.Append("\"");
                            sb.Append(",");
                        }

                    }

                    sb.Append("\"" + propertyName + "\"");
                    sb.Append(":");
                    sb.Append("\"");
                    propertyValue= this.FieldValueFormatOrFited(propertyName, propertyValue,null);
                    sb.Append(propertyValue);
                    sb.Append("\"");
                    sb.Append(",");

                }
                if (sb.Length > 1)
                {
                    sb.Remove(sb.Length - 1, 1);
                }
                sb.Append("}");
                sb.Append(",");
            }
            sb.Remove(sb.Length - 1, 1);
            sb.Append("]");
            return sb.ToString();
        }
        catch(Exception ex)
        {
            LogWrite("Item2JSONBase2 Error::"+ex.Message);
            return "";
        }
    }

    public void LogWrite(string logBody)
    {
        if (!isWritelog) return;
        FileStream fs = null;
        StreamWriter sw = null;
        try
        {
if((this.requestMethod!=null)&&(this.requestMethod.ToLower()=="EmptyFunction".ToLower()||this.requestMethod.ToLower()=="XT_GetMessage".ToLower()||this.requestMethod.ToLower()=="XT_GetUserMessageCount".ToLower()))
{
return;
}
            string logClass = "无分类";


            string dateFormat = @"yyyy-MM-ddTHH:mm:ss";  //大写的HH代表转换为24小时制
            DateTime dt = DateTime.Now;

            fs = new FileStream(logFilePath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite);
            sw = new StreamWriter(fs, System.Text.Encoding.Default);
            //将流定位到文件尾部，向文件追加内容
            //和使用FileMode.append模式的区别是，append只能使用Write模式，任何读取文件的操作会引发IO异常
            fs.Seek(0, SeekOrigin.End);


            sw.WriteLine("开    始\t===========================================================================");
            sw.WriteLine("时    间\t" + dt.ToString(dateFormat));
            sw.WriteLine("分类标识\t" + logClass);
            sw.WriteLine("日志内容\t" + logBody);
            sw.WriteLine("结    束\t===========================================================================");
            sw.WriteLine("");

        }
        catch (Exception ex)
        {
            Response.Write("日志错误:" + "logFilePath:"+logFilePath+" space bathPath:"+bathPath);
            Response.Write("日志错误:" + ex.ToString()+"  \n  "+ex.StackTrace);
            //throw ex;  日志写入发生异常
            //将异常写入到Aras的数据库中，为一个Item 两个字段 Name,Body
        }
        finally
        {
            if (sw != null)
            {
                sw.Flush();
                sw.Close();//sw关闭，则fs会关闭，再关闭fs会导致异常
                //sw.Dispose();
            }

        }
    }
    
    
    public string FieldValueFormatOrFited(string propertyName,string propertyValue,string type)
    {
      
        try
        {
            if(TYPE=="AML")
            {
                if ((!string.IsNullOrEmpty(propertyValue)) && (propertyValue.Length == 19 || propertyValue.Length == 23))
                {
                    return DateStr2String(propertyValue, this.DATEFORMAT);
                }
                else
                {
                    return propertyValue;
                }
            }
            if (TYPE == "SQLFY2" || TYPE == "SQLFY" || TYPE == "SQL" || "SQLLIST" == TYPE || "SQLALL" == TYPE)
            {
                if(this.DATEFIELDS!=null && this.DATEFIELDS.Count>0)
                {
                    if (this.DATEFIELDS.Contains(propertyName))
                    {
                        return DateStr2String(propertyValue, this.DATEFORMAT);
                    }
                }
                else if ((!string.IsNullOrEmpty(propertyValue)) && (propertyValue.Length == 19 || propertyValue.Length == 23 || propertyValue.Length == 18 || propertyValue.Length == 17)) //2014-08-7 00:00:00
               {
                    return DateStr2String(propertyValue, this.DATEFORMAT);
                }
                return propertyValue;
            }
            
        }
        catch
        {
            ;
        }
        return propertyValue;
    }
    
  
    
    public bool IsDate(string str)
    {  
        try  
        {    
            DateTime.Parse(str);    
            return true;  
        }  
        catch  
        {    
            return false;  
        }
    }

    public string  DateStr2String(string dateStr,string format)
    {
        try
        {
            if (string.IsNullOrEmpty(dateStr))
            {
                return dateStr;
            }
            if (string.IsNullOrEmpty(this.DATEFORMAT))
            {
                format = "yyyy-MM-dd";
            }
            DateTime dt=DateTime.Parse(dateStr);
            if (TYPE == "SQLFY2" || TYPE == "SQLFY" || TYPE == "SQL" || "SQLLIST" == TYPE || "SQLALL" == TYPE)
            {
                dt=dt.AddHours(8);
            }
            return dt.ToString(format);
        }
        catch(Exception ex)
        {
            LogWrite("自定义的格式化时间失败：" + dateStr + "\t" + format +"\n"+ ex.Message);
            return dateStr;
        }
    }

    public int GetSqlQueryCount(string sql)
    { 
        int count=0;
        try
        {
            string sqlEx = "select count(*) as count from ( " + sql + " ) as T";
            LogWrite("执行SQL语句查询总数\t" + sqlEx);
            //Item result = this.inn.applySQL(sqlEx);

            string sql2admin = "<sql2admin>" + sql + "</sql2admin>";
            LogWrite("执行SQL语句查询总数 sql2admin:\n" + sql2admin);
            Item result = this.inn.applyMethod("publicUser2AdminApplySQL", sql2admin);
            if (result.isError() || result.getItemCount() == -1 || result.getItemCount() == 0)
            {
                count = 0;
                LogWrite("查询总数出错\t" + result.ToString());
            }
            else
            {
                count = result.getItemCount();
            }
        }
        catch(Exception ex)
        {
            LogWrite("查询总数出错\t"+ex.Message);
        }
        return count;
    }

    public void ExecSQLList()
    {
        //TYPE='SQL*' SQLLIST='sql语句1$$sql语句2'
        try
        {
            string sqlList = Request["SQLLIST"];
            if (!string.IsNullOrEmpty(sqlList))
            {
                string[] sqlArray = sqlList.Split(new string[] { "$$" }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string str in sqlArray)
                {
                    string sqlStr = str;
                    sqlStr = sqlStr.Trim();
                    if (sqlStr.Length <= 0)
                    {
                        continue;
                    }
      LogWrite("SQLList执行语句 str:" + str);
                    Item sqlItem = this.inn.applyMethod("publicUser2AdminApplySQL", "<sql2admin>" + str + "</sql2admin>");
                    if (sqlItem.isError())
                    {
                        LogWrite("SQLList执行错误:" + str + " \r:" + sqlItem.ToString());
                    }
                }
            }
        }
        catch(Exception ex)
        {
            LogWrite("ExecSQLList Error:"+ex.ToString());
        }
    }


    public string GetWhereSqlString()
    {
        string sqlStr = this.GetGridSqlString();
        if(!(string.IsNullOrEmpty(this.requestMethodBody)||this.requestMethodBody=="NULL"))
        {
        sqlStr=sqlStr +" "+this.requestMethodBody;
        }
        else if(!(string.IsNullOrEmpty(this.WHERE)||this.WHERE=="NULL"))
        {
            sqlStr = "select * from (" + sqlStr + ") as T  where  " + WHERE;
        }
        LogWrite("WHERE语句:"+sqlStr);
        //转义
sqlStr=sqlStr.Replace("<","&lt;");
sqlStr=sqlStr.Replace(">","&gt;");
        return sqlStr;
        
    }


    public string GetGridSqlString()
    {
        string sqlStr = "";
        LogWrite("Grid配置,GRIDQUERYID：" + GRIDQUERYID);
        if (string.IsNullOrEmpty(GRIDQUERYID) || GRIDQUERYID == "-1")
        {
            sqlStr = Request["SQLSTRING"];
        }
        else
        {
            string amlQuery = "<AML><Item type='GY_CustomSerach' action='get'><c_id>" + GRIDQUERYID+ "</c_id></Item></AML>";
            Item amlQueryItem=this.inn.applyAML(amlQuery);
            if (amlQueryItem.isError())
            {
                LogWrite("Grid配置错误," + amlQueryItem.ToString());
                sqlStr = "select 'noquerysql_set_error'";
            }
            else
            {
            sqlStr=amlQueryItem.getProperty("c_gridsql","");
            }
        }
     if (string.IsNullOrEmpty(sqlStr))
     {
      sqlStr="";
     }
        return sqlStr;
    }
    
</script>


 