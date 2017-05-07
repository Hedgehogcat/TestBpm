//=====================================================================================
/*工具类 ,约定，方法全部小写，全局参数全部大写*/
function log() {
    this.level = "";
    this.msg = function (Level, MSG) {

        if (this.level === undefined) {
            this.level = 6;
        }
        if (this.level === null) {
            this.level = 6;
        }
        if (isNaN(this.level)) {
            this.level = 6;
        }
        if (this.level === "") {
            this.level = 0;
        }

        /*
        1级保留，会不限条件显示，并且会写日志
        */
        var levelAlert = Level;
        var msgAlert = MSG;

        var numargs = arguments.length;
        if (numargs === 0) {
            alert("缺少参数的消息！");
            return;
        }
        if (numargs === 1) {
            //默认一个参数指msg level=0
            msgAlert = levelAlert;
            levelAlert = 0;
        }
        if (isNaN(levelAlert)) {
            levelAlert = 0;
        }
        if (parseFloat(levelAlert) < parseFloat(this.level)) {
            try {
                console.log(levelAlert + "\t" + msgAlert);
            }
            catch (err) {
                //alert("log.msg::" + err);
            }
            alert(msgAlert);
        }
    };
}
log.level = 6;
//公共方法


log.getWidth = function (elementID) {
    try {
        var elem = document.getElementById(elementID);
        if (elem == null) {
            return 0;
        }
        return elem.style.clientWidth;
    }
    catch (err) {
        alert(err);
    }
};

log.setWidth = function (elementID, width) {
    try {
        var elem = document.getElementById(elementID);
        if (elem == null) {
            return 0;
        }
        elem.style.height = width.toString();
    }
    catch (err) {
        alert(err);
    }
};
log.setHeight = function (elementID, height) {
    try {
        var elem = document.getElementById(elementID);
        if (elem == null) {
            return 0;
        }
        elem.style.height = String(height).toString();
    }
    catch (err) {
        alert(err);
    }
};
log.msg = function (Level, MSG) {
    if (Level < log.level) {
        alert(MSG);
    }
};
//log.prototype.msg = function (Level, MSG)
//{
//    //属于实例的方法，然后使用的又是prototype晚期绑定，所以呢
//    //在使用msg这个实例方法的时候，要先定义log.prototype.msg = function (Level, MSG)，先定义后使用
//    //在使用 log.msg()的使用，log.msg的定义可以出现在使用之后
//};

/*
在js中，变量要先定义，后使用，函数也一样。
在aras的js method对象中写的方法中的var变量，都属于 私有变量和私有方法，方法内可见。
*/


//判断一个对象是基于jQuery的jQuery对象
log.isjQueryObject = function (obj) {
    if (obj instanceof jQuery) {
        return true;
    }
    else {
        return false;
    }
};
//判断一个对象是json对象
log.isjsonObject = function (obj) {

};


log.trimAll = function (trimString) {
    //判断是否是空值
    if (trimString === "") {
        return trimString;
    }

    //去除首位的空格
    while (trimString.substring(0, 1) == " ") {
        trimString = trimString.substring(1, trimString.length);
    }
    while (trimString.substring(trimString.length - 1, trimString.length) == " ") {
        trimString = trimString.substring(0, trimString.length - 1);
    }
    return trimString;
};

log.trimSatrt = function (trimString, charStr) {
    //判断是否是空值
    if (trimString === "") {
        return trimString;
    }

    //去除首位的空格
    while (trimString.substring(0, 1) == charStr) {
        trimString = trimString.substring(1, trimString.length);
    }
    return trimString;
};

log.trimEnd = function (trimString, charStr) {
    //判断是否是空值
    if (trimString === "") {
        return trimString;
    }


    while (trimString.substring(trimString.length - 1, trimString.length) == charStr) {
        trimString = trimString.substring(0, trimString.length - 1);
    }
    return trimString;
};


//JSON string convert object
log.jsonString2object = function (str) {
    var obj = JSON.parse(str, null);
    return obj;
};

log.jsonObject2String = function (jsonObject) {
    var inventoryJSONTextAgain = JSON.stringify(jsonObject, null, 3);
    return inventoryJSONTextAgain;
};
log.jsonObject2string = function (jsonObject) {
    var inventoryJSONTextAgain = JSON.stringify(jsonObject, null, 3);
    return inventoryJSONTextAgain;
};

log.object2string2 = function (object, type) {
    var str = "";
    for (var key in object) {
        if (type === 1) {
            str = str + key + ":" + object[key] + "\n";
        }
        else if (type === 2) {
            str = str + key + ":" + object[key] + "</br>";
        }
        else if (type === 3) {
            str = str + key + ":" + object[key] + "$$$";
        }

    }
    return str;
};

log.object2string = function (object, type) {
    return log.object2string2(object, 1);
};
/*
测试某个属性是否存在于某个对象当中，按照语法，使用 for in只能检测出子类中的属性
无法检测原型链上的属性。
检查属性的起源：在需要确定对象类型（如对象是否是一个HTML DOM元素）的时候，JS引擎的内置方法无法给出
一个统一的结果（各个版本的IE返回值不一样，另外还要针对 统一版本的兼容模式进行测试），转而测试对象的
属性来判断对象类型。
*/
log.propertyIsExist = function (object, property) {

    for (var key in object) {
        if (property === key) {
            return true;
        }
    }
    return false;
};



//进行断点，通知IE调试器打开调试
log.debug = function () {
    if (log.DEBUG === true) {
        debugger;
        alert("已经插入断点语句，如果没有提示打开调试器，请重置调试选项后，重新登录测试，。");
    }
};

log.msg2IE = function (msg) {
    var win = window.open();
    win.document.writeln(msg);
};
log.consolelog = function (consoleMSG) {
    try {
        console.log(consoleMSG);
    }
    catch (err) {
        alert("consolelog:" + err);
    }
};

//function (elem, smallNumber),元素,系数(0,1] 返回值 float pix为单位
log.fixWidth4Parent = function (elem, smallNumber) {
    //hasOwnProperty 只能检查子类，不能检测原型链上的其他属性，如 toString

    if (!log.propertyIsExist(elem, "innerHTML")) {
        alert("给定的对象不是一个HTML元素，不能计算宽度。");
        return -1;
    }
    if (isNaN(parseFloat(smallNumber))) {
        smallNumber = 1;
    }
    var pElem = elem.parentNode;
    return parseFloat(pElem.style.width) * parseFloat(smallNumber);

};
log.fixWidth4Elem = function (elem, smallNumber) {
    //hasOwnProperty 只能检查子类，不能检测原型链上的其他属性，如 toString

    if (!log.propertyIsExist(elem, "innerHTML")) {
        alert("给定的对象不是一个HTML元素，不能计算宽度。");
        return -1;
    }
    if (isNaN(parseFloat(smallNumber))) {
        smallNumber = 1;
    }
    var pElem = elem;
    return parseFloat(pElem.style.width) * parseFloat(smallNumber);

};

//function (elem, smallNumber),元素,系数(0,1] 返回值 float pix为单位
log.fixHeight4Parent = function (elem, smallNumber) {

    if (!log.propertyIsExist(elem, "innerHTML")) {
        alert("给定的对象不是一个HTML元素，不能计算宽度。");
        return -1;
    }
    if (isNaN(parseFloat(smallNumber))) {
        smallNumber = 1;
    }
    var pElem = elem.parentNode;
    //style 不是实际的style。越变越小
    return parseFloat(pElem.style.height) * parseFloat(smallNumber);
};

log.fixHeight4Elem = function (elem, smallNumber) {

    if (!log.propertyIsExist(elem, "innerHTML")) {
        alert("给定的对象不是一个HTML元素，不能计算宽度。");
        return -1;
    }
    if (isNaN(parseFloat(smallNumber))) {
        smallNumber = 1;
    }
    var pElem = elem;
    //style 不是实际的style。越变越小
    return parseFloat(pElem.style.height) * parseFloat(smallNumber);
};

log.fixHeight4ID = function (elemID, smallNumber) {

    try {
        var elem = document.getElementById(elemID);
        if (elem === null) {
            throw new Error("给定ID的元素不存在");
        }
        if (isNaN(parseFloat(smallNumber))) {
            smallNumber = 1;
        }
        var pElem = elem;
        //style 不是实际的style。越变越小
        return parseFloat(pElem.clientHeight) * parseFloat(smallNumber);
    }
    catch (err) {
        alert("计算元素高度出错." + err);
    }
};
log.fixWidth4ID = function (elemID, smallNumber) {

    try {
        var elem = document.getElementById(elemID);
        if (elem === null) {
            throw new Error("给定ID的元素不存在");
        }
        if (isNaN(parseFloat(smallNumber))) {
            smallNumber = 1;
        }
        var pElem = elem;
        //style 不是实际的style。越变越小
        return parseFloat(pElem.clientWidth) * parseFloat(smallNumber);
    }
    catch (err) {
        alert("计算元素高度出错." + err);
    }
};

/*
@param:要检查的对象
@return: true o r false
@function: 检查传入对象是否有效值，对于传入对象是 null ,undefined,返回 false,其他true
@ps:
*/
log.isValidVar = function (obj) {
    if (obj === undefined || obj === null) {
        return false;
    }
    return true;
};
/*
@param:要检查的对象
@return: true o r false
@function: 检查传入对象是否有效值，对于传入对象是 null ,undefined,或者 String("") 返回 false,其他true
@ps:
*/
log.isValidVar2 = function (obj) {
    if (obj === undefined || obj === null || obj === "") {
        return false;
    }
    return true;
};

/*
获取当前浏览器的名称
原理:向服务器发起请求,检查浏览器类型和版本(使用服务器端检查比JS检查准确简洁)
返回:浏览器类型+"$$"+主版本号*/
log.getIEVersion = function () {
    var browser = navigator.appName;
    var b_version = navigator.appVersionvar;
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");
    return trim_Version;
    if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
        ;
    }
    else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
        ;
    }
};
/*
获取当前浏览器的名称
原理:向服务器发起请求,检查浏览器类型和版本(使用服务器端检查比JS检查准确简洁)
返回:浏览器类型+"$$"+主版本号*/
log.getBrowessName = function () {

};

log.date2string = function () {
    var d = new Date();
    var ret = d.getFullYear() + "-";
    ret += ("00" + (d.getMonth() + 1)).slice(-2) + "-";
    ret += ("00" + d.getDate()).slice(-2) + " ";
    ret += ("00" + d.getHours()).slice(-2) + ":";
    ret += ("00" + d.getMinutes()).slice(-2) + ":";
    ret += ("00" + d.getSeconds()).slice(-2);
    return ret;

};
log.date2YMDstring = function () {
    var d = new Date();
    var ret = d.getFullYear() + "-";
    ret += ("00" + (d.getMonth() + 1)).slice(-2) + "-";
    ret += ("00" + d.getDate()).slice(-2);
    return ret;

};
log.date2Ystring = function () {
    var d = new Date();
    var ret = d.getFullYear();
    return ret;

};
log.date2Dstring = function () {
    var d = new Date();
    var ret = "";
    ret += ("00" + d.getDate()).slice(-2);
    return ret;
};
log.date2Mstring = function () {
    var d = new Date();
    var ret = "";
    ret += ("00" + d.getMonth()).slice(-2);
    return ret;
};

//var hash=new log.oHashTable();
log.oHashtable = function HashTable() {
    var size = 0;
    var entry = new Object();

    this.getSourceObject = function () {
        return entry;
    }

    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }

    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }

    this.getValueEmpty = function (key) {
        return this.containsKey(key) ? entry[key] : "";
    }

    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }

    this.containsKey = function (key) {
        return (key in entry);
    }

    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }

    this.getValues = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }

    this.getKeys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }

    this.getSize = function () {
        return size;
    }

    this.clear = function () {
        size = 0;
        entry = new Object();
    }
};
/*以下写法有问题。？？
log.oHashtable = log.oHashtable;*/



log.getWidth4ID = function (elementID) {
    try {
        var elem = document.getElementById(elementID);
        if (elem == null) {
            return 0;
        }
        return elem.clientWidth;
    }
    catch (err) {
        alert(err);
    }
};

log.getHeight4ID = function (elementID) {
    try {
        var elem = document.getElementById(elementID);
        if (elem == null) {
            return 0;
        }

        return elem.clientHeight;
    }
    catch (err) {
        alert(err);
    }
};

/*hashtable转标签对,要求键和值都是字符串或者简单值,不能有objec的拓展或者对象json之类的*/
log.hashtable2TagString = function (hashtable) {
    // var hash=(log.oHashtable)hashtable;
    var sourceObject = hashtable.getSourceObject();
    var str = "";
    //循环hash的键值
    for (var temp in sourceObject) {

        var value = sourceObject[temp];
        if (value === undefined || value === null) {
            value = "";
        }
        //此次需要处理转义，名称和值中含有xml规范规定的需要转义的字符
        str = str + "<" + String(temp).toLowerCase() + ">" + log.xmlTransValue(value) + "</" + String(temp).toLowerCase() + ">";
    }
    return str;
};

log.hashtable2ItemTagString = function (hashtable) {

    // var hash=(log.oHashtable)hashtable;
    var sourceObject = hashtable.getSourceObject();
    var relationships_type = hashtable.getValueEmpty("relationships_type");
    var str = "<Item type='" + relationships_type + "'>";
    //循环hash的键值
    for (var temp in sourceObject) {
        var value = sourceObject[temp];
        if (value === undefined || value === null) {
            value = "";
        }
        //此次需要处理转义，名称和值中含有xml规范规定的需要转义的字符
        str = str + "<" + String(temp).toLowerCase() + ">" + log.xmlTransValue(value) + "</" + String(temp).toLowerCase() + ">";
    }
    str = str + "</Item>";
    return str;
};

///对xml字符串中的字符进行转义
log.xmlTransValue = function (xmlStr) {
    var result = "";
    var re1 = new RegExp("<", "gi");
    var re2 = new RegExp(">", "gi");
    if (log.isValidVar2(xmlStr)) {
        xmlStr = String(xmlStr).replace(re1, "&lt;");
        result = String(xmlStr).replace(re2, "&gt;");
    }
    return result;
};

log.oApplyBody = function (applyMethodName, applyMethod_ID) {
    this.applyMethodName = applyMethodName;
    this.applyMethodID = applyMethod_ID;
    this.mainHashtable = new log.oHashtable();
    this.reshArray = new Array();
    this.innovator = null;
};

log.oApplyBody.prototype.toBodyString = function () {
    var boayString = "";
    var bodyString_applyMethodName = "";
    var bodyString_mainHashtable = "";
    var bodyString_reshArray = "";
    try {
        //JavaScript 中的“this”是函数上下文，不是在声明时决定的，而是在调用时决定的  
        bodyString_applyMethodName = this.applyMethodName;

        bodyString_mainHashtable = log.hashtable2TagString(this.mainHashtable);
        var arrayLength = this.reshArray.length;
        for (var a = 0; a < arrayLength; a++) {
            var tempHashtable = this.reshArray[a];
            //检查tempHashtable的类型是否是 oHashtable
            bodyString_reshArray = bodyString_reshArray + log.hashtable2ItemTagString(tempHashtable);
        }

        boayString = "<apply_name>" + bodyString_applyMethodName + "</apply_name>" + "<apply_params1 cc='controller'>" +
    bodyString_mainHashtable + "</apply_params1>" + "<apply_params2 cc='controller'>" + bodyString_reshArray + "</apply_params2>";
    }
    catch (err_toBodyString) {
        alert("err_toBodyString:" + log.getErrorString(err_toBodyString));
    }
    return boayString;
};

log.oApplyBody.prototype.toBodyStringEx = function () {
    var boayString = "";
    var bodyString_applyMethodName = "";
    var bodyString_mainHashtable = "";
    var bodyString_reshArray = "";
    try {
        //JavaScript 中的“this”是函数上下文，不是在声明时决定的，而是在调用时决定的  
        bodyString_applyMethodName = this.applyMethodName;

        bodyString_mainHashtable = log.hashtable2TagString(this.mainHashtable);
        var arrayLength = this.reshArray.length;
        for (var a = 0; a < arrayLength; a++) {
            var tempHashtable = this.reshArray[a];
            //检查tempHashtable的类型是否是 oHashtable
            bodyString_reshArray = bodyString_reshArray + log.hashtable2ItemTagString(tempHashtable);
        }

        boayString = bodyString_mainHashtable + "<Relationships>" + bodyString_reshArray + "</Relationships>";
    }
    catch (err_toBodyStringEx) {
        alert("err_toBodyStringEx:" + log.getErrorString(err_toBodyStringEx));
    }
    return boayString;
};
//传递json

log.oApplyBody.prototype.applyServer = function (innovatorObject) {
    var resultItem = null;
    try {
        var innerInn = null;
        if (arguments.length <= 0) {
            innerInn = new Innovator();
        }
        else if (!log.isValidVar(innovatorObject)) {
            innerInn = new Innovator();
        }
        else {
            innerInn = innovatorObject;
        }
        if (!log.isValidVar(innerInn)) {
            alert("一直无法实例化出Innovator对象.向服务器的请求被停止.");
            return;
        }
        resultItem = innerInn.applyMethod("publicUserApplyController", this.toBodyString());
    }
    catch (err_applyServer) {
        alert("err_applyServer:" + log.getErrorString(err_applyServer));
    }
    return resultItem;
};

log.oApplyBody.prototype.applyServerEx = function (innovatorObject) {
    var resultItem = null;
    try {
        var innerInn = null;
        if (arguments.length <= 0) {
            innerInn = new Innovator();
        }
        else if (!log.isValidVar(innovatorObject)) {
            innerInn = new Innovator();
        }
        else {
            innerInn = innovatorObject;
        }
        if (!log.isValidVar(innerInn)) {
            alert("一直无法实例化出Innovator对象.向服务器的请求被停止.");
            return;
        }
        resultItem = innerInn.applyMethod(this.applyMethodName, this.toBodyStringEx());
    }
    catch (err_applyServerEx) {
        alert("err_applyServerEx:" + log.getErrorString(err_applyServerEx));
    }
    return resultItem;
};
//=========================================================
// ajax ljqmanager
log.ajax = function () {
    this.inn = null;
    this.url = "";
};
log.ajax.getSerachCodeJHTML = function (queryGridID, callFun) {
    var resultCode = false;
    try {
        //log.oAras.isAgentURL
        var URL = log.oAras.isAgentURL;
        $.ajax({
            type: "POST",
            url: URL,
            dataType: "jsonp",
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            //jsonpCallback: "callback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            data: { ljqmanager: "getserachcode", GRIDQUERYID: queryGridID, DATABASE: "LydbRunTest",
                AUTHUSER: "admin", AUTHPASSWORD: "abcadmin8", SERVERURL: log.oAras.isAspxURL
            },
            async: false,
            success: function (msg) {
                alert("返回结果:" + msg);
                callFun(msg);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                resultCode = textStatus;
                alert("textStatus:" + textStatus);
            },
            processData: true

        });

    }
    catch (err_getSerachCode) {
        alert("err_getSerachCode:" + log.getErrorString(err_getSerachCode));
    }
    return resultCode;
};
log.ajax.getSerachCodeHTML = function (queryGridID, clientDivID, successCallFun, errorCallFun) {
    var resultCode = false;
    try {
        var URL = '../../Server/GetServerJsons.aspx?ljqmanager=getserachcode'; // log.oAras.isAgentURL;
        $.ajax({
            type: "POST",
            url: URL,
            dataType: "text",
            data: { GRIDQUERYID: queryGridID },
            async: false,
            success: function (msg) {
                try {
                    if (log.isValidVar2(document.getElementById(clientDivID))) {
                        document.getElementById(clientDivID).innerHTML = msg;
                    }
                    else {
                        alert("不存在id为" + clientDivID + "的元素.");
                    }

                    if (successCallFun != null) {
                        successCallFun(msg);
                    }
                }
                catch (err_getSerachCodeHTML_ajax) {
                    ;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                try {
                    //alert("读取错误:" + textStatus);
                    if (errorCallFun != null) {
                        errorCallFun(textStatus);
                    }
                }
                catch (err_getSerachCodeHTML_error) {
                    //alert("读取错误:" + err_getSerachCodeHTML_error);
                }
            },
            processData: true

        });

    }
    catch (err_getSerachCode) {
        alert("err_getSerachCode:" + log.getErrorString(err_getSerachCode));
    }
    return resultCode;
};

//clientGridID dataGrid ID,queryTJ 查询的条件 简单讲是sql的where,TJType条件的类型--原始语句的追加还是 子查询的过滤，建议使用子查询的过滤
//sql 查询视图？
log.ajax.ExecGridSerach = function (clientGridID, TJType) {
    try {
        var filte = "field_" + clientGridID + "_";
        var where = " ";
        var $idControls = $("*[id^='" + filte + "']");
        var allEmpty = false;
        var add = true;
        $("*[id^='" + filte + "']").each(function (index, element) {
            var FieldName = String($(this).attr("id")).replace(filte, "");
            var array = new Array();
            array[0] = FieldName.substring(0, FieldName.lastIndexOf("_"));
            array[1] = FieldName.substring(FieldName.lastIndexOf("_") + 1, FieldName.length);
            var FieldValue = "";
            if (array[1] == "easyui-textbox") {
                FieldValue = $(this).val();
                if (log.isValidVar2(FieldValue)) {
                    where = where + array[0] + " like '%" + FieldValue + "%'  and  ";
                }
            }
            if (array[1] == "easyui-combobox") {
                FieldValue = $('#' + $(this).attr("id")).combobox('getText');
                if (log.isValidVar2(FieldValue)) {
                    where = where + array[0] + " like '%" + FieldValue + "%'  and  ";
                }
            }
            if (array[1] == "easyui-datebox") {
                var from = $('#' + $(this).attr("id")).datebox('getValue');
                var end = $('#' + $(this).attr("id").replace("easyui-datebox", "end")).datebox('getValue');
                if (from === "" && end !== "") {
                    where = where + array[0] + " <= ' " + end + " '  and  ";
                }
                if (from !== "" && end === "") {
                    where = where + array[0] + " >= '" + from + "'  and  ";
                }
                if (from !== "" && end !== "") {
                    where = where + array[0] + " between '" + from + "' and '" + end + "'  and  ";
                }
                else {
                    return;
                }
            }
            if (array[1] == "end") {
                return;
            }
        });

        where = where + "1=1";
        var addParam = {};
        if (TJType.toUpperCase() === "BODY")
        { addParam = { BODY: where }; }
        else if (TJType.toUpperCase() === "WHERE")
        { addParam = { WHERE: where }; }
        else { addParam = { WHERE: where }; }

        var gridArr = clientGridID.split(",");
        for (i = 0; i < gridArr.length; i++) {
            var _clientGridID = gridArr[i];
            var $grid = $("#" + _clientGridID);
            if ($grid == null || $grid == undefined) {
                return;
            }
            var params = $.extend($('#' + _clientGridID).datagrid("options").queryParams, addParam);
            $('#' + _clientGridID).datagrid('load', params);
        }
    }
    catch (err_ExecGridSerach) {
        //alert("查询错误:" + log.getErrorString(err_ExecGridSerach));
    }
};

//log.ajax.ExecGridSerach = function (clientGridID, TJType)
//{
//    try
//    {
//        var filte = "field_" + clientGridID + "_";
//        var where = " ";
//        var $idControls = $("*[id^='" + filte + "']");
//        var allEmpty = false;  //检测所有为空就查询所有  

//        $("*[id^='" + filte + "']").each(function (index, element)
//        {
//            var FieldName = String($(this).attr("id")).replace(filte, "");
//            var FieldValue = $(this).val();
//            if (log.isValidVar2(FieldValue))
//            {
//                allEmpty = true;
//                where = where + FieldName + " like '%" + FieldValue + "%'  and  ";
//            }

//        });

//        where = where + "1=1";

//        var addParam = {};
//        if (TJType.toUpperCase() === "BODY")
//        { addParam = { BODY: where }; }
//        else if (TJType.toUpperCase() === "WHERE")
//        { addParam = { WHERE: where }; }
//        else { addParam = { WHERE: where }; }
//        var $grid = $("#" + clientGridID);
//        if ($grid == null || $grid == undefined)
//        {
//            return;
//        }
//        var params = $.extend($('#' + clientGridID).datagrid("options").queryParams, addParam);

//        $('#' + clientGridID).datagrid('load', params);
//    }
//    catch (err_ExecGridSerach)
//    {
//        //alert("查询错误:" + log.getErrorString(err_ExecGridSerach));
//    }
//};

log.ajax.getGridSerachFilter = function (clientGridID, TJType) {
    try {

        var field = "field_" + clientGridID + "_";
        var where = " ";
        var $idControls = $("*[id^='" + field + "']");
        var allEmpty = false;

        $("*[id^='" + field + "']").each(function (index, element) {
            var FieldName = String($(this).attr("id")).replace(field, "");
            var FieldValue = $(this).val();
            if (log.isValidVar2(FieldValue)) {
                allEmpty = true;
                where = where + FieldName + " like '%" + FieldValue + "%'  and  ";
            }

        });
        where = where + "1=1";
        return where;

    }
    catch (getGridSerachFilter) {
        alert("获取搜索框查询条件出错:" + log.getErrorString(getGridSerachFilter));
        return "";
    }
};
//=========================================================

log.TagString2hashtable = function (tagString) {
    tagString = "<Aras9086>" + String(tagString) + "</Aras9086>";
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    var hash = new log.oHashtable();
    try {
        xmlDoc.async = "false";
        xmlDoc.loadXML(tagString);
    }
    catch (err1) {
        //标签对有错误
        return hash;
    }
    //循环键

    var nodes = xmlDoc.documentElement.childNodes;
    for (var i = 0; i < nodes.length; i++)//只遍历了一层
    {
        var name = nodes[i].nodeName;
        var value = nodes[i].nodeValue;
        hash.add(name, value);
    }

    return hash;
};


log.fixDiv9086WH = function (documentObj) {
    try {
        var document = documentObj;
        var clientWidth = document.body.clientWidth - 1;
        var clientHeight = document.body.clientHeight - 1;
        var div9086 = document.getElementById("div9086");
        if (div9086 == null) {
            var e1 = new Error();
            e1.message = "缺少id为 div9086 的元素.";
            throw e1;
        }
        div9086.style.position = "absolute";
        div9086.style.top = "0px";
        div9086.style.left = "0px";
        div9086.style.width = clientWidth.toString() + "px";
        div9086.style.height = clientHeight.toString() + "px";
        var div29086 = document.getElementById("div29086");
        if (div29086 == null) {
            var e2 = new Error();
            e2.message = "缺少id为 div29086 的元素.";
            throw e2;
        }
        $("#div29086").layout("resize");
        return;
    }
    catch (err3) {
        alert("调整DIV9086自适应屏幕分辨率过程中发生错误：" + err3);
    }
};


//layout===============================
/*
@param: 
layoutID id属性值，
panelType：'north' 'south'.... ,
panelHeight: 高度, -1 表示不指定值  
panelWidth： 宽度,-1 表示不指定值
*/
log.fixLayoutPanelWH = function (layoutID, panelType, panelHeight, panelWidth) {
    try {
        var whObj = {};
        if (panelHeight !== -1) {
            whObj.height = panelHeight;
        }
        if (panelWidth !== -1) {
            whObj.width = panelWidth;
        }
        var layout_id = "#" + layoutID;
        $(layout_id).layout("panel", panelType).panel("resize", whObj);
        $(layout_id).layout("resize");
    }
    catch (err) {
        alert("调整Layout布局过程中发生错误。" + log.getErrorString(err));
    }
};
log.getLayoutPanelHeight = function (layoutID, panelType) {
    try {
        var elemID = "#" + layoutID;
        return $(elemID).layout('panel', panelType).panel('options').height;
    }
    catch (err) {
        alert("读取Layout布局大小中发生错误。" + log.getErrorString(err));

    }

};
log.getLayoutPanelWidth = function (layoutID, panelType) {
    try {
        var elemID = "#" + layoutID;
        return $(elemID).layout('panel', panelType).panel('options').width;
    }
    catch (err) {
        alert("读取Layout布局大小中发生错误。" + log.getErrorString(err));
    }
};
//=====================================
//datagrid=============================
log.fixDataGridWH = function (datagridID, Height, Width) {
    try {
        var whObj = {};
        if (Height !== -1) {
            whObj.height = Height;
        }
        if (Width !== -1) {
            whObj.width = Width;
        }
        var datagrid_id = "#" + datagridID;
        $(datagrid_id).datagrid('resize', whObj);
    }
    catch (err_fixDataGridWH) {
        alert("调整DataGrid布局过程中发生错误。" + log.getErrorString(err_fixDataGridWH));
    }
};

//======================================
//panel
log.fixPanelWH = function (panelID, Height, Width) {
    try {
        var whObj = {};
        if (Height !== -1) {
            whObj.height = Height;
        }
        if (Width !== -1) {
            whObj.width = Width;
        }
        var elemID = "#" + panelID;
        $(elemID).panel("resize", whObj);
    }
    catch (err_fixPanelWH) {
        alert("调整Panel布局过程中发生错误。" + log.getErrorString(err_fixPanelWH));
    }
};
//=======================================
//tabs
log.fixTabsWH = function (tabsID, Height, Width) {
    try {
        var whObj = {};
        if (Height !== -1) {
            whObj.height = Height;
        }
        if (Width !== -1) {
            whObj.width = Width;
        }
        var tabs_id = "#" + tabsID;
        $(tabs_id).tabs('resize', whObj);
    }
    catch (err_fixTabsWH) {
        alert("调整Tabs布局过程中发生错误。" + log.getErrorString(err_fixTabsWH));
    }
};
//========================================
//添加事件监听方法，后添加的会先执行
/*
@param:
win: 当前window
eventName:  如 'load'  'resize'
functionObject:  定义的function对象
*/
log.eventListener = function (win, eventName, functionObject) {
    try {
        win.attachEvent(eventName, functionObject);
    }
    catch (err_eventListener) {
        alert(log.getErrorString(err_eventListener));
    }
};

/*
@param:
win:当前window
functionObject:定义的function对象
*/
log.addOnResizeEvent = function (win, functionObject) {
    log.eventListener(win, "onresize", functionObject);
};



//直接对9086进行布局，没有29086
log.fixDiv90862FORM = function (documentObj) {
    try {
        var MainDataForm = document.getElementById("MainDataForm");
        if (MainDataForm == null) {
            alert("MainDataForm == null");
            //   throw new Error("MainDataForm is NULL");
        }
        var clientWidth = MainDataForm.clientWidth.toString() + "px";
        var clientHeight = MainDataForm.clientHeight.toString() + "px";
        var div9086 = document.getElementById("div9086");
        if (div9086 == null) {
            var e1 = new Error();
            e1.message = "缺少id为 div9086 的元素.";
            alert(e1.message);
        }
        div9086.style.position = "absolute";
        div9086.style.top = "0px";
        div9086.style.left = "0px";

        div9086.style.width = clientWidth;
        div9086.style.height = clientHeight;
        try {
            $("#div9086").layout("resize");
        }
        catch (err4) {

            /* 一抛就抛给了Aras，没有给err3，为毛*/
            var e1 = new Error();
            e1.message = "不是Layout";
            //应该使用级别控制
            //alert(e1.message);
        }
        return;
    }
    catch (err3) {
        alert("调整DIV9086自适应屏幕分辨率过程中发生错误：" + log.getErrorString(err3));
    }
};
//直接对9086进行布局，没有29086
log.fixDiv90862Elem = function (documentObj, elemID) {
    try {
        var MainDataForm = document.getElementById(elemID);
        if (MainDataForm == null) {
            throw new Error(elemID + "  is NULL");
        }
        var clientWidth = MainDataForm.clientWidth.toString() + "px";
        var clientHeight = MainDataForm.clientHeight.toString() + "px";
        var div9086 = document.getElementById("div9086");
        if (div9086 == null) {
            var e1 = new Error();
            e1.message = "缺少id为 div9086 的元素.";
            throw e1;
        }
        div9086.style.position = "absolute";
        div9086.style.top = "0px";
        div9086.style.left = "0px";

        div9086.style.width = clientWidth;
        div9086.style.height = clientHeight;
        try {
            $("#div9086").layout("resize");
        }
        catch (err4) {

            /* 一抛就抛给了Aras，没有给err3，为毛
            var e1 = new Error();
            e1.message = "不是Layout";
            throw e1;
            */
        }
        return;
    }
    catch (err3) {
        alert("调整DIV9086自适应屏幕分辨率过程中发生错误：" + log.getErrorString(err3));
    }
};

log.getErrorString = function (err_Item) {
    var result = "";
    for (var item_err in err_Item) {
        result = result + item_err + ":" + err_Item[item_err] + "\n";

    }
    return result;
};
//==============================================================================
/*

*Aras Help*
向Aras服务器的操作的封装
会独立出一个Aras UI 接口层，Aras Server将成为后台的后端服务器
...或许 太晚了
*/
log.oAras = function () {

};



log.oAras.hostURL = "http://192.168.4.73";
log.oAras.baseURL = log.oAras.hostURL + "/test";
log.oAras.dataBase = "LydbRunTest";
log.oAras.clientURL = log.oAras.baseURL + "/Client";
log.oAras.serverURL = log.oAras.baseURL + "/Server";

log.oAras.isAspxURL = log.oAras.baseURL + "/Server/innovatorServer.aspx";
log.oAras.isAgentURL = "/Common/ServerProxy.aspx";
log.oAras.isAgentURL2 = log.oAras.isAgentURL + "?jsoncallback=?";



log.oAras.oUser = function () {
    this.userID = ""; //用户ID
    this.userName = ""; //登录名称
    this.userPwd = "";
    this.empID = ""; //职员ID
    this.empName = ""; //职员名称
    this.depID = ""; //部门ID
    this.depName = ""; //部门名称
    this.identityID = ""; //角色ID
    var useritem = log.ajax.getMethodResult("Pub_XT_GetUserInfo", "", "TEXT", "json");
    if (useritem.isError == "true" || useritem.count !== 1) {
        $.messager.alert("Error", useritem.errorMsg, "error");
        return;
    }
    else {
        this.userID = useritem.content[0].userID == undefined ? "未绑定用户" : useritem.content[0].userID;
        this.userName = useritem.content[0].userName == undefined ? "未绑定用户" : useritem.content[0].userName;
        this.empID = useritem.content[0].empID == undefined ? "未绑定职员" : useritem.content[0].empID;
        this.empName = useritem.content[0].empName == undefined ? "未绑定职员" : useritem.content[0].empName;
        this.depID = useritem.content[0].depID == undefined ? "未绑定部门" : useritem.content[0].depID;
        this.depName = useritem.content[0].depName == undefined ? "未绑定部门" : useritem.content[0].depName;
        this.identityID = useritem.content[0].identityID == undefined ? "未绑定角色" : useritem.content[0].identityID;
    }
};
log.oInnovator = function () {
    this.innovator = null;
};

log.getInnovator = function () {

};

log.createInnovator = function () {

};

//获取网页传递的参数
log.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//Web 参数
log.oWeb = function () {

};
log.oWeb.hostURL = "/";
log.oWeb.baseURL = "/";
log.oWeb.DataURL = log.oWeb.hostURL + "Data/";
log.oWeb.BizBaseURL = log.oWeb.hostURL + "BizPage/";
log.oWeb.ViewBaseURL = log.oWeb.hostURL + "View/";
log.oWeb.ImageBaseURL = log.oWeb.hostURL + "Data/Image/";
log.oWeb.CssBaseURL = log.oWeb.hostURL + "Data/Css/";


//===============================================================================
/* UI Level*/
log.fixLayoutWH = function (layoutID, width, height) {
    try {
        var whObj = {};
        if (height !== -1) {
            whObj.height = height;
        }
        if (width !== -1) {
            whObj.width = width;
        }
        var elemID = "#" + layoutID;
        $(elemID).layout('resize', whObj);
    }
    catch (err_fixLayoutWH) {
        alert("调整Layout布局过程中发生错误。" + log.getErrorString(err_fixLayoutWH));
    }
};

log.fixMainWindowToMax = function () {
    //获得IETooles

};

//window.onerror = function solve(sMessage, sUrl, sLine)
//{
//    //alert("log框架捕获的异常：\n sMessage:" + sMessage + "\n sLine:" + sLine + "\n  sUrl:" + sUrl);
//};

//==================================================================================
/*
XmlDocument
*/
// 在IE下使用，未拓展
log.oXMLDOC = function (xmlDOC) {
    this.xmlDoc = xmlDOC;
};

log.createXMLDOC = function () {
    try {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    }
    catch (e) {
        log.msg(5, "创建 MSXML组件实例失败。" + e);
        return null;
    }
    return xmlDoc;
};


log.oXMLDOC.prototype.loadXMLString = function (xmlStr) {
    //    this.xmlDoc.loadXML(xmlStr);
};
//====================================================
//cookie操作
log.cookie = function (name, value) {
    //cookie和页面document及服务器路径及域名及时间有关系
    //默认 当前页面的同级及子级别可以方法当前页创建的cookie
    //默认 以add方式附加键值
};
log.cookie.addCookie = function () {
    var nameStr = String(name);
    var valueStr = escape(String(value));
    document.cookie = nameStr + "=" + valueStr;
};
log.cookie.getCookie = function (cookieName) {
    var result = null;
    var myCookie = document.cookie + ";";
    var searchName = cookieName + "=";
    var startOfCookie = myCookie.indexOf(searchName);
    var endOfCookie;
    if (startOfCookie != -1) {
        startOfCookie += searchName.length;
        endOfCookie = myCookie.indexOf(";", startOfCookie);
        result = unescape(myCookie.substring(startOfCookie, endOfCookie));
    }
    return result;
};
log.cookie.setCookie = function (name, value, expires, path, domain, secure) {
    var expDays = expires * 24 * 60 * 60 * 1000;
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + expDays);
    var expString = ((expires == null) ? "" : (";expires=" + expDate.toGMTString()));
    var pathString = ((path == null) ? "" : (";path=" + path));
    var domainString = ((domain == null) ? "" : (";domain=" + domain));
    var secureString = ((secure == true) ? ";secure" : "");
    document.cookie = name + "=" + escape(value) + expString + pathString + domainString + secureString;
};

//删除指定名称的cookie：
log.cookie.clearNameCookie = function (name) {
    var ThreeDays = 3 * 24 * 60 * 60 * 1000;
    var expDate = new Date();
    expDate.setTime(expDate.getTime() - ThreeDays);
    document.cookie = name + "=;expires=" + expDate.toGMTString();
};

//===================================================================
//JsonSoftBpm
//·dataType：想从服务器得到哪种类型的数据。xml,html,script,json,jsonp,text
//原型 log.ajax.getSerachCodeHTML = function (queryGridID, clientDivID, successCallFun, errorCallFun)
//注意：同步访问才能获取结果
log.ajax.getMethodResult = function (mehtodName, tagParams, dataFormat, dataType) {
    var resultCode = false;
    var result = "";
    if (dataType == undefined || dataType == "") dataType = "text";
    try {
        var URL = "/Common/ServerProxy.aspx";
        if (dataFormat == null || dataFormat == "") {
            dataFormat = "RESULT";
        }
        $.ajax({
            type: "POST",
            url: URL,
            dataType: dataType,
            data: { TYPE: "CALLMETHOD", JF: dataFormat, METHOD: mehtodName, BODY: tagParams },
            async: false,
            success: function (msg) {
                try {
                    result = msg;
                    //return msg;
                }
                catch (getMethodResult_Error) {
                    alert("getMethodResult:" + getMethodResult_Error);
                    result = msg;
                    //return "";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                try {
                    //alert("读取错误:" + textStatus);
                    //                    if (errorCallFun != null) {
                    //                        errorCallFun(textStatus);
                    //                    }
                }
                catch (getMethodResult_error) {
                    //alert("读取错误:" + getMethodResult_error);
                }
            },
            processData: true

        });

    }
    catch (err_getSerachCode) {
        alert("err_getSerachCode:" + log.getErrorString(err_getSerachCode));
    }
    return result;
};

//dataFormat 请求的数据格式  json text xml html
log.ajax.getWebResult = function (mehtodName, ParamObject, dataFormat) {
    //debugger;
    var resultCode = false;
    var result = "";
    try {
        if (dataFormat == null || dataFormat == "") {
            dataFormat = "RESULT";
        }

        var URL = "/Common/WebResult.aspx?method=" + mehtodName + "&dataFormat=" + dataFormat;

        $.ajax({
            type: "POST",
            url: URL,
            data: ParamObject,
            async: false,
            success: function (msg) {
                try {
                    result = msg;
                    //return msg;
                }
                catch (getWebResult_Error) {
                    alert("getWebResult:" + getWebResult_Error);
                    result = msg;
                    //return "";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                try {
                    //alert("读取错误:" + textStatus);
                    //                    if (errorCallFun != null) {
                    //                        errorCallFun(textStatus);
                    //                    }
                }
                catch (getWebResult_error) {
                    //alert("读取错误:" + getWebResult_error);
                }
            },
            processData: true
        });

    }
    catch (getWebResult) {
        alert("getWebResult:" + log.getErrorString(getWebResult));
    }
    return result;
};

log.ajax.getMethodResult2VHtml = function (mehtodName, tagParams, dataFormat) {

    var html = log.ajax.getMethodResult(mehtodName, tagParams, dataFormat);
    if (html == null || html == undefined || html == "") {
        return "";
    }
    return log.uiservices.htmlDecode(html);
};

//===============================================================
//uiservices对象
log.uiservices = function ()
{ };

log.uiservices.htmlEncode = function (str) {
    var s = str;
    if (s.length == 0) return "";
    //s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/    /g, "&nbsp;");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
};
log.uiservices.htmlDecode = function (str) {
    var s = str;
    if (s.length == 0) return "";
    //s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, "    ");
    s = s.replace(/'/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    s = s.replace(/&amp;/g, "&");
    return s;
};
/*正则表达式 替换括号,尖括号等*/
log.uiservices.amlToTxt = function (str) {
    var RexStr = /\<|\>|\"|\'|\&/g
    str = str.replace(RexStr, function (MatchStr) {
        switch (MatchStr) {
            case "<":
                return "&lt;";
                break;
            case ">":
                return "&gt;";
                break;
            case "\"":
                //return "&quot;";
                return "\"";
                break;
            case "'":
                //return "&#39;";
                return "'";
                break;
            case "&":
                return "&amp;";
                break;
            default:
                break;
        }
    })
    return str;
};
//End uiservices==========================================================================
log.url = function ()
{ };
log.url.urlFullPath = function (urlFullPath) {
    return urlFullPath;
};

//===================================================================
//===================================================================
//将Json String转化成Aml string
log.JsonToAml = function (json) {
    //    json = eval('(' + json + ')');
    var count = json.AML.length;
    var aml = "<AML>";
    for (var i = 0; i < count; i++) {
        var item = json.AML[i];           //获取到每个对象
        var type = "";
        var action = "";
        var id = "";
        var version = "";
        var where = "";
        var propertys = {};
        var Relationships = [];
        if ("type" in item) {
            type = item.type;             //主表表名
        }
        if ("action" in item) {
            action = item.action;         //主表操作
        }
        if ("version" in item) {
            version = item.version;         //是否换版
        }
        if ("id" in item) {
            id = item.id;                 //主表操作对象ID
        }
        if ("where" in item) {
            where = item.where;            //过滤条件
        }
        if ("property" in item) {
            propertys = item.property;     //主表修改(增加，删除,读取)的字段
        }
        if ("Relationships" in item) {
            Relationships = item.Relationships;
        }
        var mainarry = [];              //主表字段组
        var mainstr = "";
        var relstr = "";
        for (var x in propertys)        //主表字段
        {
            mainarry.push(x);
        }
        var fcount = mainarry.length;      //主表操作涉及的字段
        if (fcount > 0) {
            for (var j = 0; j < fcount; j++) {
                var property = (item.property)[mainarry[j]];
                var properitem = "";
                if (typeof property == "object")        //如果该字段是Item类型，现在只取ID（可传对象类名字和keyed_name）
                {
                    if ("keyed_name" in property) {
                        properitem += " keyed_name='" + property.keyed_name + "'";
                    }
                    else {
                        properitem += "";
                    }
                    if ("type" in property) {
                        properitem += " type='" + property.type + "'";
                    }
                    else {
                        properitem += "";
                    }
                    if ("id" in property) {
                        property = property.id;
                    }
                    else {
                        property = "";
                        properitem = "";
                    }
                }
                mainstr += "<" + mainarry[j] + "" + properitem + ">" + property + "</" + mainarry[j] + ">";
            }
        }
        var relcount = Relationships.length;
        if (relcount > 0)                                           //存在关系类
        {
            relstr = " <Relationships>  ";
            for (var k = 0; k < relcount; k++) {
                var relarry = [];                  //关系表字段组
                var relpro = "";
                var rel = Relationships[k];
                var reltype = "";
                var relaction = "";
                var relid = "";
                var relwhere = "";
                var relpropertys = {};
                if ("type" in rel) {
                    reltype = rel.type;
                }
                if ("action" in rel) {
                    relaction = rel.action;
                }
                if ("id" in rel) {
                    relid = rel.id;
                }
                if ("where" in rel) {
                    relwhere = rel.where;
                }
                var relatedarry = [];             //子表字段组
                var relatedpro = "";
                var relatedstr = "";
                var relateditem = {};
                if ("related_id" in rel) {                          //存在子表
                    relatedstr = "<related_id>";
                    relateditem = rel.related_id;
                    var relatedtype = "";
                    var relatedaction = "";
                    var relatedid = "";
                    var relatedwhere = "";
                    var relatedpropertys = {};
                    if ("type" in relateditem) {
                        relatedtype = relateditem.type;
                    }
                    if ("action" in relateditem) {
                        relatedaction = relateditem.action;
                    }
                    if ("id" in relateditem) {
                        relatedid = relateditem.id;
                    }
                    if ("where" in relateditem) {
                        relatedwhere = relateditem.where;
                    }
                    if ("property" in relateditem) {
                        relatedpropertys = relateditem.property;
                    }
                    for (var z in relatedpropertys) {
                        relatedarry.push(z);
                    }
                    if (relatedarry.length > 0)                          //子表存在字段读取（修改等）
                    {
                        for (var m = 0; m < relatedarry.length; m++) {
                            var relatedproperty = (relateditem.property)[relatedarry[m]];
                            var propertyitem = "";
                            if (typeof relatedproperty == "object")    //如果该字段是Item类型并且不是三层表,现在只取ID（可传对象类名字和keyed_name）
                            {
                                if ("keyed_name" in relatedproperty) {
                                    propertyitem += " keyed_name=\"" + relatedproperty.keyed_name + "\"";
                                }
                                else {
                                    propertyitem += "";
                                }
                                if ("type" in relatedproperty) {
                                    propertyitem += " type=\"" + relatedproperty.type + "\"";
                                }
                                else {
                                    propertyitem += "";
                                }
                                if ("id" in relatedproperty) {
                                    relatedproperty = relatedproperty.id;
                                }
                                else {
                                    relatedproperty = "";
                                }
                            }
                            relatedpro += "<" + relatedarry[m] + "" + propertyitem + ">" + relatedproperty + "</" + relatedarry[m] + ">";
                        }
                        relatedstr += "<Item ";
                        if (relatedtype !== "") {
                            relatedstr += " type='" + relatedtype + "' ";
                        }
                        if (relatedaction !== "") {
                            relatedstr += " action='" + relatedaction + "' ";
                        }
                        if (relatedid !== "") {
                            relatedstr += " id='" + relatedid + "' ";
                        }
                        if (relatedwhere !== "") {
                            relatedstr += " where='" + relatedwhere + "' ";
                        }
                        relatedstr += " >" + relatedpro + "</Item>";
                    }
                    relatedstr += "</related_id>";
                }
                if ("property" in rel) {
                    relpropertys = rel.property;
                }
                for (var y in relpropertys) {
                    relarry.push(y);
                }
                if (relarry.length > 0)                          //关系表存在字段读取（修改等）
                {
                    for (var l = 0; l < relarry.length; l++) {
                        var relproperty = (rel.property)[relarry[l]];
                        if (typeof relproperty == "object")    //如果该字段是Item类型并且不是三层表,现在只取ID（可传对象类名字和keyed_name）
                        {
                            if ("id" in relproperty) {
                                relproperty = relproperty.id;
                            }
                            else {
                                relproperty = "";
                            }
                        }
                        relpro += "<" + relarry[l] + ">" + relproperty + "</" + relarry[l] + ">";
                    }
                }
                relstr += "<Item ";
                if (reltype !== "") {
                    relstr += " type='" + reltype + "' ";
                }
                if (relaction !== "") {
                    relstr += " action='" + relaction + "' ";
                }
                if (relid !== "") {
                    relstr += " id='" + relid + "' ";
                }
                if (relwhere !== "") {
                    relstr += " where='" + relwhere + "' ";
                }
                relstr += " >" + relpro + "" + relatedstr + "</Item> ";
            }
            relstr += "</Relationships> ";
        }
        //        if (action === "add") {
        //            aml += "<Item type='" + type + "' action='" + action + "'  >" + mainstr + "" + relstr + "</Item>";
        //        }
        //        else {
        if (where !== "") {
            aml += "<Item type='" + type + "' action='" + action + "' where=\"" + where + "\" ";
            if (version != "") {
                aml += " version='" + version + "'";
            }
            if (id != "") {
                aml += " id='" + id + "'";
            }
            aml += ">" + mainstr + "" + relstr + "</Item>";
        }
        else {
            aml += "<Item type='" + type + "' action='" + action + "'";
            if (version != "") {
                aml += " version='" + version + "'";
            }
            if (id != "") {
                aml += " id='" + id + "'";
            }
            aml += ">" + mainstr + "" + relstr + "</Item>";
        }
        //        }
    }
    aml += "</AML>";
    return aml;
};
//===================================================================
//对象类，字段，值
log.setJsonProperty = function (jsonNd, propName, value) {
    var type = jsonNd.type;
    var id = jsonNd.id;
    var aml = log.findJsonNd(jsonNd, type, id);
    if (aml.action == "get") { aml.action = "edit"; }
    var propertys = aml.property;
    propertys[propName] = value;
};
//对象类，字段
log.getJsonProperty = function (jsonNd, propName) {
    var type = jsonNd.type;
    var id = jsonNd.id;
    var aml = log.findJsonNd(jsonNd, type, id);
    var propertys = aml.property;
    return propertys[propName];
};
//对象类，字段，属性，值
log.setJsonPropertyAttribute = function (jsonNd, propName, attr, value) {
    var type = jsonNd.type;
    var id = jsonNd.id;
    var aml = log.findJsonNd(jsonNd, type, id);
    if (aml.action == "get") { aml.action = "edit"; }
    var propertys = aml.property;
    var propNd = {};
    if (typeof propertys[propName] == "object") {
        propNd = propertys[propName];
    }
    propNd[attr] = value;
    propertys[propName] = propNd;
};
//对象类，字段，属性
log.getJsonPropertyAttribute = function (jsonNd, propName, attr) {
    var type = jsonNd.type;
    var id = jsonNd.id;
    var aml = log.findJsonNd(jsonNd, type, id);
    var propertys = aml.property;
    return propertys[propName][attr];
};
//主表，关系类，关系类ID
log.addJsonRelationship = function (jsonNd, type, id) {
    var jsonRel = [];
    if (!jsonNd.Relationships) {
        jsonNd.Relationships = [];
    }
    jsonRel = jsonNd.Relationships;
    var relNd = {};
    relNd.type = type;
    relNd.action = "add";
    relNd.id = id;
    relNd.property = {};
    relNd.related_id = {};
    jsonRel.push(relNd);
};
//主表，关系类，关系类ID
log.getJsonRelationship = function (jsonNd, type, id) {
    var res = null;
    for (var i = 0; i < jsonNd["Relationships"].length; i++) {
        if (jsonNd["Relationships"][i].type == type && jsonNd["Relationships"][i].id == id) {
            res = jsonNd["Relationships"][i];
        }
    }
    return res;
};
//开始节点，type，id
log.findJsonNd = function (jsonNd, type, id) {
    var res = null;
    if (jsonNd === null) {
        for (var i = 0; i < document.json.AML.length; i++) {
            res = log.findJsonNd(document.json.AML[i], type, id);
            if (res !== null) {
                return res;
            }
        }
    }
    if (jsonNd === null) { return res; }
    if (jsonNd.type == type && jsonNd.id == id) {
        res = jsonNd;
    }
    else {
        if (typeof jsonNd.related_id == "object") {
            res = log.findJsonNd(jsonNd.related_id, type, id);
            if (res !== null) {
                return res;
            }
        }
        if (res == null && typeof jsonNd.Relationships == "object") {
            for (var i = 0; i < jsonNd.Relationships.length; i++) {
                res = log.findJsonNd(jsonNd.Relationships[i], type, id);
                if (res !== null) {
                    return res;
                }
            }

        }
    }
    return res;
};
//操作类型edit
log.setFormAction = function (newaction) {
    var type = document.type;
    var id = document.id;
    var action = document.action;
    if (newaction == action) {
        return true;
    }
    var allProp = $("textarea[id][id$=_system]"); //以 _system 结尾的 textarea
    try {
        //设置窗体字段的显示状态
        for (var i = 0; i < allProp.length; i++) {
            var textid = allProp[i].id; //text的ID
            var fieldname = textid.substring(0, textid.indexOf("_system")); //fieldname
            var arr = getFieldIdByName(fieldname).split("_");
            var fieldid = arr[0]; //fieldid
            var data_type = arr[1]; //显示的数据类型
            var readOnly = false; //只读
            var disabled = false; //不可用
            if (fieldname === "layout") { continue; }
            switch (data_type) {
                case "item":
                    if (!readOnly && !disabled) {
                        if (newaction != "get") {
                            $("#" + fieldid + "_img").css("visibility", "visible");
                        }
                        else {
                            $("#" + fieldid + "_img").css("visibility", "hidden");
                        }
                    }
                    break;
                default:
                    if (!readOnly && !disabled) {
                        var className = $("#" + fieldid).attr("class");
                        if (newaction != "get") {
                            $("#" + fieldid).removeAttr("readOnly");
                            $("#" + fieldid).removeAttr("disabled");
                            if (className.indexOf("easyui-numberbox") === 0) {
                                $("#" + fieldid).numberbox("enable");
                            }
                            if (data_type === "date") {
                                $("#" + fieldid).datebox("enable");
                            }
                        }
                        else {
                            $("#" + fieldid).attr("readOnly", "readonly");
                            $("#" + fieldid).attr("disabled", "disabled");
                            if (className.indexOf("easyui-numberbox") === 0) {
                                $("#" + fieldid).numberbox("disable");
                            }
                            if (data_type === "date") {
                                $("#" + fieldid).datebox("disable");
                            }
                        }
                    }
                    break;
            }
        }
        //设置主表action为newaction
        document.json.AML[0].action = newaction;
        //将所有的下级/字表action设置为get
        log.setJsonNdAction("", type, id, "get");
    }
    catch (err) {
        return false;
    }
    return true;
};
//设置jsonNd的action
log.setJsonNdAction = function (jsonNd, type, id, action) {
    if (jsonNd === null) {
        jsonNd = document.json.AML[0];
    }
    if (jsonNd.type == type && jsonNd.id == id) {
        jsonNd.action = action;
        return;
    }
    if (typeof jsonNd.related_id == "object") {
        log.setJsonNdAction(log.findJsonNd(jsonNd.related_id, type, id), type, id, action);
    }
    if (typeof jsonNd.Relationships == "object") {
        for (var i = 0; i < jsonNd.Relationships.length; i++) {
            log.setJsonNdAction(log.findJsonNd(jsonNd.Relationships[i], type, id), type, id, action);
        }
    }
};
//===============================================================
//uiBiz对象
log.uiBiz = function ()
{ };
/// 实现datagrid 新增，编辑，查看，删除封装
/// ele：事件对应的窗体元素
////type：查询界面的 新增，编辑，删除，查看
log.uiBiz.dgToolbar = function (ele, type) {
    //alert($.type(ele));
    var dgid;
    var width = 900;
    var height = 550;
    if ($.type(ele) == "object") {
        dgid = log.uiBiz.getDgByToolbarEvent(ele);
    } else if ($.type(ele) == "string") {
        dgid = ele;
    } else {
        $.messager.alert("Error", "传入的参数类型错误！", "error");
        return;
    }
    var param = new Object;

    if (dgid)
        var dg = $("#" + dgid).datagrid("getSelected");
    else
        return;
    if (!dgmsg_sys[dgid][0] || !dgmsg_sys[dgid][1]) {
        $.messager.alert("Error", "网格配置未绑定对象类或者窗体！", "error");
        return;
    }
    param.formname = dgmsg_sys[dgid][1];
    param.itemname = dgmsg_sys[dgid][2];
    var aml = "<AML><Item type=\"Form\" action=\"get\" select=\"width,height\"><name>" + param.formname + "</name></Item></AML>";
    var formitem = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
    if (formitem.isError == "true" || formitem.count != 1) {
        $.messager.alert("Error", formitem.errorMsg, "error");
        return;
    }
    else {
        width = formitem.content[0].width == "" ? width : formitem.content[0].width;
        height = formitem.content[0].height == "" ? height : formitem.content[0].height;
    }
    param.topWin = window;
    param.topDgList = [dgid];
    switch (type) {
        case '新增':
            param.action = "add";
            param.isEditmode = "true";
            param.id = log.ajax.getMethodResult2VHtml("Pub_XT_GetNewID", "", "TEXT");
            break;
        case '编辑':
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            param.action = "edit";
            param.isEditmode = "true";
            param.id = dg.id;
            break;
        case '查看':
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            param.action = "get";
            param.isEditmode = "false";
            param.id = dg.id;
            break;
        case '删除':
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            $.messager.confirm("Warning", "是否确定删除？", function (r) {
                if (r) {
                    var deleteJosn = { "AML": [{ "type": dgmsg_sys[dgid][2], "action": "delete", "id": dg.id}] };
                    var aml = log.JsonToAml(deleteJosn);
                    //                alert(aml);
                    try {
                        var res = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
                        if (res.isError === "true") {
                            $.messager.alert("Error", res.msg + res.errorMsg, "error");
                        }
                        else {
                            //                            $.messager.alert("info", res.msg, "info");
                            var dgfun = dgid + "_system(\"1=1\")";
                            var fun = eval(dgfun);
                            //fun();
                        }
                    }
                    catch (err) {
                        $.messager.alert("Error", "Error!" + err, "error");
                    }
                }
            });
            break;
        default:

    }
    if (type != "删除")
        var win = window.showModalDialog('/BizPage/TemplateDialog/TemplateDialogView.aspx?formname=' + param.formname + '&itemname=' + param.itemname + '&iseditmode=' + param.isEditmode, param, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;scroll:no;status:yes');

}

/// 实现业务窗体datagrid 工具栏封装
/// ele：事件对应的窗体元素
////type：查询界面的 增行，减行 新增，编辑，删除，查看
log.uiBiz.dgToolbarEdit = function (ele, type, relpropertyjson) {
    var param = new Object;
    //var dgid = log.uiBiz.getDgByToolbarEvent(ele);
    var dgid;
    if ($.type(ele) == "object") {
        dgid = log.uiBiz.getDgByToolbarEvent(ele);
    } else if ($.type(ele) == "string") {
        dgid = ele;
    } else {
        $.messager.alert("Error", "传入的参数类型错误！", "error");
        return;
    }
    if (dgid)
        var dg = $("#" + dgid).datagrid("getSelected");
    else
        return;
    if (!dgmsg_sys[dgid][2]) {
        $.messager.alert("Error", "网格配置未绑定对象类！", "error");
        return;
    }
    //    param.formname = dgmsg_sys[dgid][1];
    //    param.itemname = dgmsg_sys[dgid][2];
    //    param.topWin = window;
    //    param.topDgList = [dgid];
    switch (type) {
        case '增行':
            var id = log.ajax.getMethodResult("Pub_XT_GetNewID", "", "TEXT");
            $("#" + dgid).datagrid('appendRow', { "id": id + "_new" });
            var addtempjosn = [{ "type": "" + dgmsg_sys[dgid][2] + "", "action": "add", "id": "" + id + "", "property": {}}];
            addtempjosn[0].property = relpropertyjson;
            $.merge(document.json.AML, addtempjosn);
            break;
        case '减行':
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            var dgobj = $("#" + dgid);
            var deleteindex = dgobj.datagrid('getRowIndex', dg);
            var deleteid = dg.id;
            dgobj.datagrid('deleteRow', deleteindex);
            var str = new Array();
            str = deleteid.split("_");
            if (str.length == 2 && str[1] == "new") {
                $.each(document.json.AML, function (i, obj) {
                    if (obj.id == str[0]) {
                        document.json.AML.splice(i, 1);
                    }
                });
            }
            else if (str.length == 1 && str[0].length == 32) {
                var allids = new Array();
                $.each(document.json.AML, function (j, obj) {
                    allids.push(obj.id);
                    if (obj.id == str[0]) {
                        obj.action = "delete";
                    }
                });
                if (allids.indexOf(str[0]) == -1) {
                    $.merge(document.json.AML, [{ "type": "" + dgmsg_sys[dgid][2] + "", "action": "delete", "id": "" + str[0] + ""}]);
                }
            }

            break;

        default:

    }

}


/// 实现datagrid 非标功能封装
/// ele：事件对应的窗体元素
////type：查询界面的 新增，编辑，删除，查看
//   obj.formname obj.itemname  obj.topDgList obj.id
//mustSelectRow 是否必须选中当前dg行 true false
log.uiBiz.dgToolbarExt = function (ele, type, obj, mustSelectRow) {

    var param = new Object;
    var width = 900;
    var height = 550;
    //var dgid = log.uiBiz.getDgByToolbarEvent(ele);
    var dgid;
    if ($.type(ele) == "object") {
        dgid = log.uiBiz.getDgByToolbarEvent(ele);
        if (!dgmsg_sys[dgid][0] || !dgmsg_sys[dgid][1]) {
            $.messager.alert("Error", "网格配置未绑定对象类或者窗体！", "error");
            return;
        }
    } else if ($.type(ele) == "string") {
        dgid = ele;
    } else {
        $.messager.alert("Error", "传入的参数类型错误！", "error");
        return;
    }
    if (dgid)
        var dg = $("#" + dgid).datagrid("getSelected");
    else
        return;

    param.formname = obj.formname;
    param.itemname = obj.itemname;
    var aml = "<AML><Item type=\"Form\" action=\"get\" select=\"width,height\"><name>" + obj.formname + "</name></Item></AML>";
    var formitem = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
    if (formitem.isError == "true" || formitem.count != 1) {
        $.messager.alert("Error", formitem.errorMsg, "error");
        return;
    }
    else {
        width = formitem.content[0].width == "" ? width : formitem.content[0].width;
        height = formitem.content[0].height == "" ? height : formitem.content[0].height;
    }
    if (obj.data) {
        param.data = obj.data;
    }
    else {
        param.data = "";
    }
    param.topWin = window;

    if (!obj.topDgList || obj.topDgList.length < 1) {
        obj.topDgList = [dgid];
    }
    param.topDgList = obj.topDgList;

    switch (type) {
        case '新增':
            if (mustSelectRow) {
                if (!dg) {
                    $.messager.alert("Warning", "请先选择行！", "info");
                    return;
                }
            }
            param.action = "add";
            param.isEditmode = "true";
            param.id = log.ajax.getMethodResult2VHtml("Pub_XT_GetNewID", "", "TEXT");
            break;
        case '编辑':
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            if (!obj.id) {
                obj.id = dg.id;
            }
            param.action = "edit";
            param.isEditmode = "true";
            param.id = obj.id;
            break;
        case '查看':
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            if (!obj.id) {
                obj.id = dg.id;
            }
            param.action = "get";
            param.isEditmode = "false";
            param.id = obj.id;
            break;

        default:

    }
    if (type != "删除")
        var win = window.showModalDialog('/BizPage/TemplateDialog/TemplateDialogView.aspx?formname=' + param.formname + '&itemname=' + param.itemname + '&iseditmode=' + param.isEditmode, param, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;scroll:no;status:yes');

}

//通过datagrid的toolbar的linkbutton查找datagrid的id
log.uiBiz.getDgByToolbarEvent = function (ele) {
    var dom = $(ele);
    dom = $(ele).parents(".datagrid-toolbar");
    dom = dom.next();
    dom = dom.find(".datagrid-f");
    if (dom.length < 1 || dom.prop("id") == undefined || dom.prop("id") == "") {
        $.messager.alert("Error", "获取datagrid元素失败！", "error");
        return "";
    }
    return dom.prop("id");


}

//检查用户是否有该linkbutton的功能权限 返回true 或者 false
//event 事件元素
//id linkbutton元素id
//formname 窗体名称
log.uiBiz.checkUserPermission = function (event, id, formname) {
    try {
        event = event ? event : window.event;
        var obj = event.srcElement ? event.srcElement : event.target;
        var btnId = id ? id : $(obj).parents(".easyui-linkbutton").prop("id");
        btnId = btnId ? btnId : $(obj).parents(".l-btn").prop("id");
        var btntext = $(obj).parents(".easyui-linkbutton").prop("text");
        btntext = btntext ? btntext : $(obj).parents(".l-btn").prop("text");
        formname = formname ? formname : log.getQueryString("formname");
        if (log.getQueryString("iseditmode") == "false" && btntext != "退出") { return false; }
        //        $.messager.alert("Warning", "btnId:" + btnId + "   formname：" + formname, "info");
        var isExist = log.ajax.getMethodResult("Pub_GetExistsPermission", "<identityid></identityid><fbtnid>" + btnId + "</fbtnid><fformname>" + formname + "</fformname>", "TEXT", "json");

        if (isExist.isError == "true" || (isExist.isError == "false" && isExist.count == "0")) {
            $.messager.alert("Warning", "没有权限1", "info");
            event.stopImmediatePropagation();
            return false;
        }
    }
    catch (err) {
        alert(err);
        return false;
    }
    return true;
}

//获取linkbutton的元素 返回元素或者 空 undefined
//event 事件元素
log.uiBiz.getLinkbuttonObj = function (event) {
    var ele = "";
    try {
        event = event ? event : window.event;
        var obj = event.srcElement ? event.srcElement : event.target;
        ele = obj;
    }
    catch (err) {
        alert(err);
        return "";
    }
    return ele;
}

//获取linkbutton的id值 返回32位id 或者 空值
//obj dom元素
log.uiBiz.getLinkbuttonId = function (obj) {
    var id = "";
    try {
        var btnId = id ? id : $(obj).parents(".easyui-linkbutton").prop("id");
        btnId = btnId ? btnId : $(obj).parents(".l-btn").prop("id");
        id = btnId;
    }
    catch (err) {
        alert(err);
        return "";
    }
    return id;
}

//按钮配置调用的通用打印方法 返回值无
//event 事件元素 
//dg 元素id
//id 作作为模板搜索条件的id 可能为一个以逗号分隔的长字符串 
//fgrfnumber 打印模板编号
log.uiBiz.printBygrf = function (event, dgid, id, fgrfnumber) {
    var btnid = "";
    var ele;
    try {
        ele = log.uiBiz.getLinkbuttonObj(event);
        btnid = log.uiBiz.getLinkbuttonId(ele);
        if (!dgid) {
            dgid = log.uiBiz.getDgByToolbarEvent(ele);

        }

        if (dgid) {
            var dg = $("#" + dgid).datagrid("getSelections");
            if (!dg) {
                $.messager.alert("Warning", "请先选择行！", "info");
                return;
            }
            var print_ids = "";
            for (var i = 0; i < dg.length; i++) {
                print_ids += dg[i].id;
                if (i !== dg.length - 1) {
                    print_ids += "','";
                }
            }
            id = print_ids;
        }
        else
            return;
        if (!id) {
            $.messager.alert("Warning", "模板的查询条件为空！", "info");
        }
        btnid =btnid.substring(0,32);
        var res = log.ajax.getMethodResult("Pub_PrintTemplet", "<id>" + id + "</id><fnumber>" + fgrfnumber + "</fnumber><btnid>" + btnid + "</btnid>", "TEXT");
        res = log.uiservices.htmlDecode(res);
        //alert(res);
        var win = window.open('../../Common/Print.aspx', "_blank", "scrollbars=yes,resizable=yes,status=no");
        var doc = win.document.open();
        doc.write(res);
        //doc.close();
    }
    catch (err) {
        $.messager.alert("Warning", err, "info");
        return;
    }
    return;
}


//客户端执行AML语句
log.uiBiz.ApplyAML = function () {
    var aml = log.JsonToAml(document.json);
    try {
        var res = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
        if (res.isError === "true") {
            try {
                //		log.setFormAction("get");
                //设置主表action为newaction
                document.json.AML[0].action = "get";
                //将所有的下级/字表action设置为get
                log.setJsonNdAction("", document.type, document.id, "get");
            }
            catch (err) {
                $.messager.alert("Error", err, "err");
            }
        }
        else {
            $.messager.alert("Info", res.msg, "info");
        }
    }
    catch (err) {
        $.messager.alert("Error", "Error!" + err, "error");
    }
};



//methodname 调用的方法名，现有：退出 loginOut，在线数据列表 getOnlineData，在线总数 getOnlineCount  
log.ajax.onlineCallback = function (methodname) {
    var result = "";
    if (!methodname) {
        $.messager.alert("Warning", "onlineCallback的调用参数不能为空", "info");
    }
    var URL = "/Common/OnlineService.aspx";
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: { method: methodname },
        async: false,
        success: function (msg) {
            try {
                result = msg;
                //return msg;
            }
            catch (getMethodResult_Error) {
                $.messager.alert("Warning", getMethodResult_Error, "info");
                result = msg;
                //return "";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            try {
                $.messager.alert("Warning", textStatus, "info");
            }
            catch (getMethodResult_error) {
                $.messager.alert("Warning", getMethodResult_error, "info");
            }
        },
        processData: true

    });
    return result;
}

log.ajax.getMessage = function () {
    log.ajax.getMethodResult("EmptyFunction", "", "TEXT");

};
//点击查看文件列表，传入文件ID的数据
log.ajax.ViewFileDg = function (fileIDArr) {
    var height = 500;
    var width = 900;
    var itemname = "File";
    var formname = "FileGet";
    aml = "<AML><Item type=\"Form\" action=\"get\" select=\"width,height\"><name>" + formname + "</name></Item></AML>";
    var formitem = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
    if (formitem.isError === "true" || formitem.count !== 1) {
        $.messager.alert("Error", formitem.errorMsg, "error");
        return;
    }
    else {
        width = formitem.content[0].width === "" ? width : formitem.content[0].width;
        height = formitem.content[0].height === "" ? height : formitem.content[0].height;
    }
    var param = new Object;
    param.action = "add";
    param.formname = formname;
    param.itemname = itemname;
    param.isEditmode = "true";
    param.data = fileIDArr;
    param.id = log.ajax.getMethodResult("Pub_XT_GetNewID", "", "TEXT");
    var win = window.showModalDialog('/BizPage/TemplateDialog/TemplateDialogView.aspx?formname=' + formname + '&itemname=' + itemname + '&iseditmode=' + param.isEditmode, param, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;scroll:no;status:no');
};
//IE8 不支持js indexOf函数的问题
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
        { from += len; }

        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
            { return from; }
        }
        return -1;
    };
}
//搜索点击弹出Item框
function icon_Search(e, b, c) {
    var b = b.split("$");
    var item = b[0]; ;
    var field = "keyed_name";
    if (b.length === 2) {
        field = b[1];
    }
    url = "/Common/F2Search.aspx?name=" + item + "&title=" + c + "";
    var result = window.showModalDialog(url, '', 'dialogWidth=900px;dialogHeight=550px;scroll:no;status:no');
    if (result === undefined) {
        return;
    }
    else if (JSON.stringify(result) == "{}") {
        $(e.data.target).textbox('setValue', '');
    }
    else if (result.length = 1) {
        $(e.data.target).textbox('setValue', result[0][field]);
    }
}
log.ajax.ChangeUserInfo = function ChangeUserInfo() {
    var height = 500;
    var width = 900;
    var itemname = "User";
    var formname = "UserChange";
    aml = "<AML><Item type=\"Form\" action=\"get\" select=\"width,height\"><name>" + formname + "</name></Item></AML>";
    var formitem = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
    if (formitem.isError === "true" || formitem.count !== 1) {
        $.messager.alert("Error", formitem.errorMsg, "error");
        return;
    }
    else {
        width = formitem.content[0].width === "" ? width : formitem.content[0].width;
        height = formitem.content[0].height === "" ? height : formitem.content[0].height;
    }
    var param = new Object;
    param.action = "edit";
    param.formname = formname;
    param.itemname = itemname;
    param.isEditmode = "true";
    param.id = oUser.userID;
    var win = window.showModalDialog('/BizPage/TemplateDialog/TemplateDialogView.aspx?formname=' + formname + '&itemname=' + itemname + '&iseditmode=' + param.isEditmode, param, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;scroll:no;status:no');
}
//添加到最后面
var oUser = new log.oAras.oUser();