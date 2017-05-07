/*******************************************************
* 
* 创建人：Quber
* 创建日期：2013年6月21日
* 创建说明：jQuery Uploadify Plugin Demo
* 修改人：
* 修改日期：
* 修改说明：
*
* 联系方式：
*     QQ：757200834
*     邮箱：qubernet@163.com
*     博客：http://qubernet.blog.163.com/
*
*******************************************************/

$(function () {
    initUploadify();
    $(".uploadify-tip").append($(".uploadify-btn"));
});

function initUploadify() {
    var uploadifySet = {
        isShowTip: true,
        isShowFileMoreError: true,
        isShowCompletedInfo: true,
        isShowCancelBtn: true,
        comPath: "/Scripts/Js/",
        ajaxPath: "/Common/jQueryUploadify.ashx",
        filePath: "~/Data/File/",
        fileSize: 1024 * 1024 * 1024 * 1.5,
        fileCount: 12,
        fileTypeText: "上传的文件类型(*.*)",
        fileExt: "*.*"
    };

    var reltype = reltype ? reltype : log.getQueryString("parentName");
    reltype = reltype ? reltype : log.ajax.getMethodResult2VHtml("GetRelationshipItemName", "<itemname>" + window.parent.document.itemTypeName + "</itemname>", "TEXT");

    var action = window.parent.document.action;
    if (action !== "add") {
        if (action == "get") {
            $('.uploadify-btn').css("display", "none");
        }
        var rel = window.parent.document.json.AML[0].Relationships;
        if (rel !== []) {
            for (var i = 0; i < rel.length; i++) {
                var existfileid = rel[i].related_id.id;
                var existfilename = rel[i].related_id.property.webfilename;
                var existrelid = rel[i].id;
                var byteSize = Math.round(rel[i].related_id.property.file_size / 1024 * 100) * .01;
                var suffix = 'KB';
                if (byteSize > 1000) {
                    byteSize = Math.round(byteSize * .001 * 100) * .01;
                    suffix = 'MB';
                }
                $(".uploadify-status").css("display", "none");
                $(".uploadify-status").html("上传状态：上传完成！");
                jQuery('#showUploadFile').append('<div id="uploadifySelectFile' + existfileid + '" class="uploadifyQueueItem completed">' +
								'<div class="cancel">' +
								'	<a href="javascript:jQuery(\'#uploadifySelectFile\').uploadifyCancel(\'' + existfileid + '\')"' + (action == 'get' ? 'style="display:none"' : "") + '><img src=" ' + uploadifySet.comPath + 'jQueryUploadify/Image/uploadifyCancelSmall.png" border="0" /></a>' +
								'</div>' +
								'<span class="fileName">' + existfilename + '(' + byteSize + suffix + ')</span><span class="percentage">- 上传成功</span>' +
                                '<div id="uploadifySelectFile' + existfileid + 'Value" style="display:none">' +
                                '<input id="relid" value=""/><input id="fileid" value=""/>' +
                                '</div>' +
                                '<div id="uploadifySelectFile' + existfileid + 'File" class="tool">' +
                                '<a href="javascript:jQuery(\'#uploadifySelectFile\').uploadifyView(\'' + existfileid + '\')">查看</a> <a href="/Data/File/' + existfileid + "_" + existfilename + '" title="' + existfilename + '"  rel="downloadr">下载</a>' +
                                '</div>' +
							'</div>');
                $('#uploadifySelectFile' + existfileid + 'Value input[id=relid]').val(existrelid);
                $('#uploadifySelectFile' + existfileid + 'Value input[id=fileid]').val(existfileid);
            }
            $('a[rel*=downloadr]').downloadr();
            $("div[id=showUploadFile] div[id$=File]").removeClass().addClass("tool1");
        }
    }
    //选择文件
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
            //            alert(id);
        },
        'onCancel': function (e, id, fileObj, data, remove, clearFast) {
            if (getSingleFileCount() - 1 == 0) {
                $("#showUploadFile div,#showUploadifyInfo div,#showUploadifyInfo ul,.uploadify-status").fadeOut(250, "", function () {
                    $("#showUploadifyInfo,.uploadify-status").html("");
                });

            }
            //修改json
            var reltid = $('#uploadifySelectFile' + id + 'Value input[id=relid]').val();
            var fileid = $('#uploadifySelectFile' + id + 'Value input[id=fileid]').val();
            if (window.parent.document.json.AML[0]) {
                var jsonNd = log.findJsonNd(window.parent.document.json.AML[0], reltype, reltid);
                if (jsonNd !== null) {
                    if (jsonNd.action !== "add") {
                        log.setJsonNdAction(jsonNd, reltype, reltid, "delete");
                    }
                    else {
                        log.setJsonNdAction(jsonNd, reltype, reltid, "");
                    }
                }
            }
        },
        'onSelectOnce': function (e, data) {
            $(".pleseSelectFile,.uploadify-status").fadeOut(1000, "", function () {
                $(".pleseSelectFile").html("");
            });
            $(".uploadify-status").fadeIn(1000, "", function () {
            }).html("上传状态：等待上传！");
        },
        'onComplete': function (e, id, fileObj, response, data) {
            //返回文件ID，修改json，查看/下载的文件ID
            response = eval('(' + response + ')');
            var filename = response.fileName;
            var filepath = response.filePath;
            var fileid = response.fileUUID;
            var aml = "<AML>" +
                      "<Item isNew='1' isTemp='1' type='File' action='add' id='" + fileid + "'>" +
                        "<webfilename>" + filename + "</webfilename>" +
                        "<file_size>" + fileObj.size + "</file_size>" +
                        "<Relationships>" +
                          "<Item type='Located' action='add' where=\"related_id='67BBB9204FE84A8981ED8313049BA06C'\">" +
                            "<related_id>67BBB9204FE84A8981ED8313049BA06C</related_id>" +
                          "</Item>" +
                        "</Relationships>" +
                      "</Item>" +
                    "</AML>";
            var fileResult = log.ajax.getMethodResult("Pub_XT_ApplyAML", "<aml>" + log.uiservices.amlToTxt(aml) + "</aml>", "TEXT", "json");
            if (fileResult.isError == "true" || fileResult.count != 1) {
                $.messager.alert("Error", fileResult.errorMsg, "error");
                return;
            }
            //修改json
            if (window.parent.document.json.AML[0].action != "add") 
            {
                window.parent.document.json.AML[0].action = "edit";
            }
            var rel = {}; //关系类
            rel.type = reltype; //关系类ItemType
            rel.action = "add"; //新增
            rel.id = log.ajax.getMethodResult2VHtml("Pub_XT_GetNewID", "", "TEXT"); //新增关系类ID
            rel.property = {};
            rel.property.related_id = fileid; //文件ID
            var jsonRelItem = [];
            if (!window.parent.document.json.AML[0].Relationships) {
                window.parent.document.json.AML[0].Relationships = [];
            }
            jsonRelItem = window.parent.document.json.AML[0].Relationships;
            jsonRelItem.push(rel);
            //查看/下载的文件ID
            $('#uploadifySelectFile' + id + 'Value input[id=relid]').val(rel.id);
            $('#uploadifySelectFile' + id + 'Value input[id=fileid]').val(fileid);
            $('#uploadifySelectFile' + id + 'File a[rel*=downloadr]').attr('href', '/Data/File/' + fileid + "_" + filename);
            $('div[id=showUploadFile] div[id$=File]').removeClass().addClass("tool1");

            $('a[rel*=downloadr]').downloadr();
        },
        'onQueueFull': function (e, count) {
            //是否显示文件过多提示信息
            if (uploadifySet.isShowFileMoreError) {
                $("#showUploadifyInfo").html("<div>提示：选择的文件过多，最多上传数量为：" + count + "，多余的文件将省略</div>");
            }
        },
        'onAllComplete': function (e, data) {
            //是否显示上传完毕提示信息
            if (uploadifySet.isShowCompletedInfo) {
                var fileCount = data.filesUploaded;
                var fileBytes = data.allBytesLoaded;
                var fileSpeed = data.speed;
                var fileError = data.errors;
                var info = "";
                info += "<ul>";
                //                info += "<li>文件上传完毕：</li>";
                info += "<li class='completedinfo right'>上传成功文件总数量：" + fileCount + "个</li>";
                info += "<li class='completedinfo error'>上传失败文件总数量：" + fileError + "个</li>";
                info += "<li class='completedinfo time'>文件上传平均速度：" + keepTwoDecimal(fileSpeed) + "KB/s</li>";
                info += "<li class='completedinfo size'>上传文件总容量：" + getFileSize(fileBytes) + "</li>";
                info += "</ul>";
                $(".uploadify-status").fadeIn(1000, "", function () {
                    $("#showUploadifyInfo").html(info);
                    $(".uploadify-info .info ul").fadeIn(1000, "", function () {
                    });
                }).html("上传状态：上传完成！");
            }
            //            $("#lbtnUploadifyC").attr("disabled", false);
            $("#lbtnUploadifyC").fadeIn(1000, "", function () {
            });
        }
    });

    initSomeBtnClick(uploadifySet);
}
//Init Btn Click
function initSomeBtnClick(jsonSet) {
    //开始上传
    $("#lbtnUploadifyS").click(function () {
        var isTrue = $(".uploadify-status").html() == "上传状态：上传完成！";
        if ($.trim($("#showUploadFile").html()).length != 0 && !isTrue) {
            $(".uploadify-status").fadeIn(1000, "", function () {
            }).html("上传状态：上传中&nbsp;&nbsp;<img src=\"" + jsonSet.comPath + "jQueryUploadify/Css/Image/loading.gif\" alt=\"\" />");
            $("#uploadifySelectFile").uploadifyUpload();
            //            $("#lbtnUploadifyC").attr("disabled", true);
            $("#lbtnUploadifyC").css("display", "none");
        }
        else {
            $("#showUploadifyInfo").html("<div class=\"pleseSelectFile\">请选择需要上传的文件</div>");
            $(".uploadify-info .info .pleseSelectFile").fadeIn(1000, "", function () {
            });
        }
        return false;
    });

    //取消上传
    $("#lbtnUploadifyC").click(function () {
        $("#showUploadFile div,#showUploadifyInfo div,#showUploadifyInfo ul,.uploadify-status").fadeOut(250, "", function () {
            $("#showUploadifyInfo,.uploadify-status").html("");
        });

        $(".uploadifyQueueItem .cancel").each(function () {
            var hrefCancel = $(this).find("a").attr("href").replace("javascript:jQuery('#uploadifySelectFile').uploadifyCancel('", "").replace("')", "");
            jQuery('#uploadifySelectFile').uploadifyCancel(hrefCancel);
        });
    });

    //是否显示友情提示信息
    if (jsonSet.isShowTip) {
        $(".uploadify-tip").html("友情提示：一次最多上传" + jsonSet.fileCount + "个文件，单文件大小不超过" + getFileSize(jsonSet.fileSize));
    } else {
        $(".uploadify-tip").css("display", "none");
    }

    //是否显示取消按钮
    if (!jsonSet.isShowCancelBtn) {
        $("#lbtnUploadifyC").css("display", "none");
    }
}

//获取面板中文件总数量
function getSingleFileCount() {
    var count = 0;
    $(".uploadifyQueueItem .cancel").each(function () {
        var hrefCancel = $(this).find("a").attr("href");
        if (hrefCancel.length > 0) count++;
    });
    return count;
}

//根据文件的字节得到文件大小
function getFileSize(fileByte) {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = keepTwoDecimal(fileSizeByte / 1024) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = keepTwoDecimal(fileSizeByte / (1024 * 1024)) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = keepTwoDecimal(fileSizeByte / (1024 * 1024 * 1024)) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
}

//四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}