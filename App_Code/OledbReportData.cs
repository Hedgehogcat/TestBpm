using System;
using System.Data;
using System.Data.OleDb;
using System.Configuration;
using System.IO;
using System.IO.Compression;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//class  OledbReportData
public class OledbReportData
{
    //★特别提示★：
    //连接Grid++Report Access例子数据库的连接串，应该修改为与实际一致，如果安装目录不在C:\Grid++Report 5.0，应进行修改。
    public const string OleDbConnStr = @"Provider=Microsoft.Jet.OLEDB.4.0;User ID=Admin;Data Source=C:\Grid++Report 5.0\Samples\Data\Northwind.mdb";

    //定义在SQL中表示日期值的包围符号，Access用“#”, 而MS SQl Server用“'”，为了生成两者都可用的查询SQL语句，将其参数化定义出来。这样处理只是为了演示例子方便
    public const char DateSqlBracketChar = '#';

    //<<根据SQL产生报表需要的 XML 数据
    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 OleDb 数据引擎
    public static void GenNodeXmlData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress)
    {
        DoGenDetailData(DataPage, QuerySQL, ToCompress, false);
    }

    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 OleDb 数据引擎, 这里只产生报表参数数据
    //当报表没有明细时，调用本方法生成数据，查询SQL应该只能查询出一条记录
    public static void GenParameterReportData(System.Web.UI.Page DataPage, string ParameterQuerySQL)
    {
        DoGenParameterData(DataPage, ParameterQuerySQL, false);
    }

    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 OleDb 数据引擎, 根据RecordsetQuerySQL获取报表明细数据，根据ParameterQuerySQL获取报表参数数据
    public static void GenEntireReportData(System.Web.UI.Page DataPage, string RecordsetQuerySQL, string ParameterQuerySQL, bool ToCompress)
    {
        DoGenEntireData(DataPage, RecordsetQuerySQL, ParameterQuerySQL, ToCompress, false);
    }
    
    //根据查询SQL,产生提供给报表生成需要的 XML 数据，采用 OleDb 数据引擎，字段值为空也产生数据
    public static void FullGenNodeXmlData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress)
    {
        OleDbConnection myConn = new OleDbConnection(OleDbConnStr);
        OleDbCommand myCommand = new OleDbCommand(QuerySQL, myConn);
        myConn.Open();
        OleDbDataReader myReader = myCommand.ExecuteReader();
        XMLReportData.GenNodeXmlDataFromReader(DataPage, myReader, ToCompress);
        myReader.Close();
        myConn.Close();
    }
    //>>根据SQL产生报表需要的 XML 数据


    //<<根据SQL产生报表需要的 JSON 数据
    //根据查询SQL,产生提供给报表生成需要的 JSON 数据，采用 OleDb 数据引擎
    public static void JSON_GenDetailData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress)
    {
        DoGenDetailData(DataPage, QuerySQL, ToCompress, true);
    }

    //根据 查询SQL 产生提供给报表生成需要的 JSON 数据，采用 OleDb 数据引擎, 这里只产生报表参数数据
    //当报表没有明细时，调用本方法生成数据，查询SQL应该只能查询出一条记录
    public static void JSON_GenParameterData(System.Web.UI.Page DataPage, string ParameterQuerySQL)
    {
        DoGenParameterData(DataPage, ParameterQuerySQL, true);
    }

    //根据查询SQL,产生提供给报表生成需要的 JSON 数据，采用 OleDb 数据引擎, 根据RecordsetQuerySQL获取报表明细数据，
    //根据ParameterQuerySQL获取报表参数数据
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

        OleDbConnection myConn = new OleDbConnection(OleDbConnStr);
        OleDbCommand myCommand = new OleDbCommand(QuerySQL, myConn);
        myConn.Open();
        OleDbDataReader myReader = myCommand.ExecuteReader();
        if (myReader.Read())
            Total = myReader.GetInt32(0);
        myReader.Close();
        myConn.Close();

        return Total;
    }


    //<<private function
    //根据查询SQL,产生提供给报表生成需要的 XML 或 JSON 数据，采用 OleDb 数据引擎
    private static void DoGenDetailData(System.Web.UI.Page DataPage, string QuerySQL, bool ToCompress, bool IsJSON)
    {
        OleDbConnection myConn = new OleDbConnection(OleDbConnStr);
        OleDbDataAdapter myda = new OleDbDataAdapter(QuerySQL, myConn);
        DataSet myds = new DataSet();
        myConn.Open();
        myda.Fill(myds);
        myConn.Close();

        if (IsJSON)
            JSONReportData.GenDetailData(DataPage, myds, ToCompress);
        else
            XMLReportData.GenDetailData(DataPage, myds, ToCompress);
    }

    //根据查询 SQL,产生提供给报表生成需要的 XML 或 JSON 数据，采用 OleDb 数据引擎, 这里只产生报表参数数据
    //当报表没有明细时，调用本方法生成数据，查询 SQL 应该只能查询出一条记录
    private static void DoGenParameterData(System.Web.UI.Page DataPage, string ParameterQuerySQL, bool IsJSON)
    {
        OleDbConnection myConn = new OleDbConnection(OleDbConnStr);
        OleDbCommand myCommand = new OleDbCommand(ParameterQuerySQL, myConn);
        myConn.Open();
        OleDbDataReader myReader = myCommand.ExecuteReader();

        if (IsJSON)
            JSONReportData.GenParameterData(DataPage, myReader);
        else
            XMLReportData.GenParameterData(DataPage, myReader);
        myReader.Close();
        myConn.Close();
    }

    //根据查询SQL,产生提供给报表生成需要的 或 JSON 数据，采用 OleDb 数据引擎, 根据RecordsetQuerySQL获取报表明细数据，根据ParameterQuerySQL获取报表参数数据
    private static void DoGenEntireData(System.Web.UI.Page DataPage, string RecordsetQuerySQL, string ParameterQuerySQL, bool ToCompress, bool IsJSON)
    {
        OleDbConnection myConn = new OleDbConnection(OleDbConnStr);
        myConn.Open();

        OleDbDataAdapter myda = new OleDbDataAdapter(RecordsetQuerySQL, myConn);
        DataSet myds = new DataSet();
        myda.Fill(myds);

        OleDbCommand mycmd = new OleDbCommand(ParameterQuerySQL, myConn);
        OleDbDataReader mydr = mycmd.ExecuteReader(CommandBehavior.CloseConnection);

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