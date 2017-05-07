using System;
namespace Com.JoinSoft.Services
{
    interface IProxyServices
    {
        //Aras.IOM.Item applyMethodEx(string mehtodName, string tagParams);
        //Aras.IOM.Item GetMethodResult(string mehtodName, string tagParams);
        string GetMethodResult(string mehtodName, string tagParams, string dataFormat);
        string GetMethodResult2VHtml(string mehtodName, string tagParams, string dataFormat);
    }
}
