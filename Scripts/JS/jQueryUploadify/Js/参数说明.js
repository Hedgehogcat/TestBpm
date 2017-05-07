$("#uploadifySelectFile").uploadify({
    'method': 'Post',
    'queueID': 'showUploadFile',
    'wmode': 'transparent',
    'auto': false,
    'multi': true,
    'uploader': uploadifySet.comPath + 'jQueryUploadify/Swf/uploadify.swf',
    'cancelImg': uploadifySet.comPath + 'jQueryUploadify/Image/uploadifyCancelSmall.png',
    'buttonImg': uploadifySet.comPath + 'jQueryUploadify/Image/uploadifySelect.png',
    'script': uploadifySet.ajaxPath,
    'folder': uploadifySet.filePath,
    'sizeLimit': uploadifySet.fileSize,
    'queueSizeLimit': uploadifySet.fileCount,
    'fileDesc': uploadifySet.fileTypeText,
    'fileExt': uploadifySet.fileExt,
    'onSelect': function (e, id, fileObj) {
        //id：单个文件临时随机ID，fileObj：单个文件相关属性（如下oneFile）
        var oneFile = {
            "creationDate": {
                "date": 24,
                "dateUTC": 24,
                "day": 5,
                "dayUTC": 5,
                "fullYear": 2013,
                "fullYearUTC": 2013,
                "hours": 8,
                "hoursUTC": 0,
                "milliseconds": 748,
                "millisecondsUTC": 748,
                "minutes": 46,
                "minutesUTC": 46,
                "month": 4,
                "monthUTC": 4,
                "seconds": 50,
                "secondsUTC": 50,
                "time": 1369356410748,
                "timezoneOffset": -480
            },
            "modificationDate": {
                "date": 16,
                "dateUTC": 16,
                "day": 4,
                "dayUTC": 4,
                "fullYear": 2012,
                "fullYearUTC": 2012,
                "hours": 10,
                "hoursUTC": 2,
                "milliseconds": 0,
                "millisecondsUTC": 0,
                "minutes": 33,
                "minutesUTC": 33,
                "month": 7,
                "monthUTC": 7,
                "seconds": 40,
                "secondsUTC": 40,
                "time": 1345084420000,
                "timezoneOffset": -480
            },
            "name": "dotnetfx45_full_x86_x64.exe",
            "size": 50349920,
            "type": ".exe"
        };
    },
    'onCancel': function (e, id, fileObj, data, remove, clearFast) {
        //单个取消事件
    },
    'onSelectOnce': function (e, data) {
        //data：所有文件总信息（如下allFile）
        var allFile = {
            "allBytesTotal": 101614631,
            "fileCount": 3,
            "filesReplaced": 0,
            "filesSelected": 3
        };
    },
    'onComplete': function (e, id, fileObj, response, data) {
        //单个文件临时随机ID，fileObj：单个文件相关属性（如下oneFile），response：文件上传地址（2013/06/21//file_167673911819703.exe），data：{"speed":10020.408163265305,"fileCount":0}
        var oneFile = {
            "creationDate": {
                "date": 24,
                "dateUTC": 24,
                "day": 5,
                "dayUTC": 5,
                "fullYear": 2013,
                "fullYearUTC": 2013,
                "hours": 8,
                "hoursUTC": 0,
                "milliseconds": 562,
                "millisecondsUTC": 562,
                "minutes": 41,
                "minutesUTC": 41,
                "month": 4,
                "monthUTC": 4,
                "seconds": 53,
                "secondsUTC": 53,
                "time": 1369356113562,
                "timezoneOffset": -480
            },
            "filePath": "/UploadFile//dotNetFx45_Full_setup.exe",
            "modificationDate": {
                "date": 24,
                "dateUTC": 24,
                "day": 5,
                "dayUTC": 5,
                "fullYear": 2013,
                "fullYearUTC": 2013,
                "hours": 8,
                "hoursUTC": 0,
                "milliseconds": 470,
                "millisecondsUTC": 470,
                "minutes": 41,
                "minutesUTC": 41,
                "month": 4,
                "monthUTC": 4,
                "seconds": 56,
                "secondsUTC": 56,
                "time": 1369356116470,
                "timezoneOffset": -480
            },
            "name": "dotNetFx45_Full_setup.exe",
            "size": 1005568,
            "type": ".exe"
        };
    },
    'onQueueFull': function (e, count) {
        //count：允许上传的最大文件数量
    },
    'onAllComplete': function (e, data) {
        //data：{"errors":0,"filesUploaded":1,"speed":5223.404255319149,"allBytesLoaded":1005568}
    }
});