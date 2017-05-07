using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;
using System.IO.Compression;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//class SqlReportData
public class SqlReportData
{
    //★特别提示★：
    //连接SQL Server数据库的连接串，应该修改为与实际一致。如果是运行Grid++Report本身的例子，应该首先附加例子数据库到
    //SQL Server2000/2005数据库上。
    public const string SqlConnStr = "Data Source=(local);Initial Catalog=gridreport;Persist Security Info=True;User ID=sa;Password=;";

    //定义在SQL中表示日期值的包围符号，Access用“#”, 而MS SQl Server用“'”，为了生成两者都可用的查询SQL语句，将其参数化定义出来。这样处理只是为了演示例子方便
    public const char DateSqlBracketChar = '\'';

    //<<根据SQL产生报表需要的 XML 数据
    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 Sql 数据引擎
    public static void GenNodeXmlData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress)
    {
        DoGenDetailData(DataPage, QuerySQL, ToCompress, false);
    }

    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 Sql 数据引擎, 这里只产生报表参数数据
    //当报表没有明细时，调用本方法生成数据，查询SQL应该只能查询出一条记录
    public static void GenParameterReportData(System.Web.UI.Page DataPage, string ParameterQuerySQL)
    {
        DoGenParameterData(DataPage, ParameterQuerySQL, false);
    }

    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 Sql 数据引擎, 根据RecordsetQuerySQL获取报表明细数据，根据ParameterQuerySQL获取报表参数数据
    public static void GenEntireReportData(System.Web.UI.Page DataPage, string RecordsetQuerySQL, string ParameterQuerySQL, bool ToCompress)
    {
        DoGenEntireData(DataPage, RecordsetQuerySQL, ParameterQuerySQL, ToCompress, false);
    }

    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 Sql 数据引擎，字段值为空也产生数据
    public static void FullGenNodeXmlData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress)
    {
        SqlConnection myConn = new SqlConnection(SqlConnStr);
        SqlCommand myCommand = new SqlCommand(QuerySQL, myConn);
        myConn.Open();
        SqlDataReader myReader = myCommand.ExecuteReader();
        XMLReportData.GenNodeXmlDataFromReader(DataPage, myReader, ToCompress);
        myReader.Close();
        myConn.Close();
    }
    //>>根据SQL产生报表需要的 XML 数据


    //<<根据SQL产生报表需要的 JSON 数据
    //根据查询SQL,产生提供给报表生成需要的 JSON 数据，采用 Sql 数据引擎
    public static void JSON_GenDetailData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress)
    {
        DoGenDetailData(DataPage, QuerySQL, ToCompress, true);
    }

    //根据查询SQL,产生提供给报表生成需要的 JSON 数据，采用 Sql 数据引擎, 这里只产生报表参数数据
    //当报表没有明细时，调用本方法生成数据，查询SQL应该只能查询出一条记录
    public static void JSON_GenParameterData(System.Web.UI.Page DataPage, string ParameterQuerySQL)
    {
        DoGenParameterData(DataPage, ParameterQuerySQL, true);
    }

    //根据查询SQL,产生提供给报表生成需要的 JSON 数据，采用 Sql 数据引擎, 根据RecordsetQuerySQL获取报表明细数据，根据ParameterQuerySQL获取报表参数数据
    public static void JSON_GenEntireData(System.Web.UI.Page DataPage, string RecordsetQuerySQL, string ParameterQuerySQL, bool ToCompress)
    {
        DoGenEntireData(DataPage, RecordsetQuerySQL, ParameterQuerySQL, ToCompress, true);
    }
    //>>根据SQL产生报表需要的 JSON 数据


    //获取 Count(*) SQL 查询到的数据行数
    //参数 QuerySQL 指定获取报表数据的查询SQL
    public static int BatchGetDataCount(string QuerySQL)
    {
        int Total = 0;

        SqlConnection myConn = new SqlConnection(SqlConnStr);
        SqlCommand myCommand = new SqlCommand(QuerySQL, myConn);
        myConn.Open();
        SqlDataReader myReader = myCommand.ExecuteReader();
        if (myReader.Read())
            Total = myReader.GetInt32(0);
        myReader.Close();
        myConn.Close();

        return Total;
    }


    //<<private function
    //根据查询SQL,产生提供给报表生成需要的 XML 或 JSON 数据，采用 Sql 数据引擎
    private static void DoGenDetailData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress, bool IsJSON)
    {
        SqlConnection myConn = new SqlConnection(SqlConnStr);
        SqlDataAdapter myda = new SqlDataAdapter(QuerySQL, myConn);
        DataSet myds = new DataSet();
        myConn.Open();
        myda.Fill(myds);
        myConn.Close();

        if (IsJSON)
            JSONReportData.GenDetailData(DataPage, myds, ToCompress);
        else
            XMLReportData.GenDetailData(DataPage, myds, ToCompress);
    }

    //根据查询 SQL,产生提供给报表生成需要的 XML 或 JSON 数据，采用 Sql 数据引擎, 这里只产生报表参数数据
    //当报表没有明细时，调用本方法生成数据，查询 SQL 应该只能查询出一条记录
    private static void DoGenParameterData(System.Web.UI.Page DataPage, string ParameterQuerySQL, bool IsJSON)
    {
        SqlConnection myConn = new SqlConnection(SqlConnStr);
        SqlCommand myCommand = new SqlCommand(ParameterQuerySQL, myConn);
        myConn.Open();
        SqlDataReader myReader = myCommand.ExecuteReader();

        if (IsJSON)
            JSONReportData.GenParameterData(DataPage, myReader);
        else
            XMLReportData.GenParameterData(DataPage, myReader);
        myReader.Close();
        myConn.Close();
    }

    //根据查询SQL,产生提供给报表生成需要的 或 JSON 数据，采用 Sql 数据引擎, 根据RecordsetQuerySQL获取报表明细数据，根据ParameterQuerySQL获取报表参数数据
    private static void DoGenEntireData(System.Web.UI.Page DataPage, string RecordsetQuerySQL, string ParameterQuerySQL, bool ToCompress, bool IsJSON)
    {
        SqlConnection myConn = new SqlConnection(SqlConnStr);
        myConn.Open();

        SqlDataAdapter myda = new SqlDataAdapter(RecordsetQuerySQL, myConn);
        DataSet myds = new DataSet();
        myda.Fill(myds);

        SqlCommand mycmd = new SqlCommand(ParameterQuerySQL, myConn);
        SqlDataReader mydr = mycmd.ExecuteReader(CommandBehavior.CloseConnection);

        if (IsJSON)
        {
            string ParameterPart = JSONReportData.GenParameterText(mydr);
            JSONReportData.GenEntireData(DataPage, myds, ref ParameterPart, ToCompress);
        }
        else
        {
            string ParameterPart = XMLReportData.GenParameterText(mydr);
            XMLReportData.GenEntireData(DataPage, myds, ref ParameterPart, ToCompress);
        }

        myConn.Close();
    }
    //>>private function
}