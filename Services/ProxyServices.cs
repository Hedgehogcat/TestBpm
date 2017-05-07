using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aras.IOM;


/*****************************
//罗汉文
//20141109
//
*****************************/
namespace Com.JoinSoft.Services
{
   
    /// <summary>
    /// 面向后台服务器,对于业务及UI层,只能调用GetMethodResult方法，大部分时候，参数应该 dataFormat= "TEXT"
    /// </summary>
    public class ArasProxyServices : Com.JoinSoft.Services.IProxyServices
    {
        public ArasProxyServices()
        { }


        public string GetMethodResult2VHtml(string mehtodName, string tagParams, string dataFormat)
        { 
            string html= GetMethodResult( mehtodName,  tagParams,  dataFormat);
            return UIServices.Html2String(html);
        }

        public  string GetMethodResult(string mehtodName, string tagParams, string dataFormat)
        {
            Innovator inn = Com.JoinSoft.Services.ComServices.GetInnovator();
            //Item result = applyMethodEx(mehtodName, tagParams);
            Item result = inn.applyMethod(mehtodName, tagParams);
            if (result.isError())
            {
                return result.getErrorString();
            }
            if (dataFormat=="SOAP")
            {
               return  result.ToString();
            }
            else if (dataFormat == "RESULT")
            {
                //outChars = this.outItem.dom.SelectSingleNode(Item.XPathResult).OuterXml;
                return result.getResult();
            }
            else if (dataFormat == "ITEMS" || dataFormat == "TEXT")
            {
                try
                {
                    return result.dom.SelectSingleNode(Item.XPathResult).InnerXml;
                }
                catch (Exception ex)
                {

                    return "NULL";
                }
            }
            else
            {
                return result.ToString(); 
            }
        }

        protected Item GetMethodResult(string mehtodName, string tagParams)
        {
            Item result = applyMethodEx(mehtodName, tagParams);
            return result;
        }

        protected Item applyMethodEx(string mehtodName, string tagParams)
        {
           return  Com.JoinSoft.Services.ComServices.GetInnovator().applyMethod(mehtodName, tagParams);
        }
    }
}