<%@ Page Language="C#" AutoEventWireup="true" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="/Data/css/default.css" rel="stylesheet" type="text/css" />
<link href="../Scripts/jquery-easyui-1.4.1/themes/default/easyui.css" rel="stylesheet"   type="text/css" />    
<link href="../Scripts/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-easyui-1.4.1/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../Scripts/SystemJS/log.js" type="text/javascript"></script>

    <script type="text/javascript">  
     $(function(){
            $('#id1').form({
                success:function(data){
                    //$.messager.alert('Info', data, 'info');
                    var data = eval('(' + data + ')');  // change the JSON string to javascript object   
                    if (data.status == 1){   
                        $("#upload").hide();
                        $("#src").show();
                        $("#fileurl").text(data.note);
                        $("#fileurl").attr("href","../../Data/file/"+data.note);
                        $("#fileurl").attr("target","_blank");
                        var aml = undefined;
                        aml  = window.parent.document.json.AML[0];
                        if (aml) {
                            var itemname = log.getQueryString("itemname");
                            var property = log.getQueryString("property");
                            var value =data.note;
                             value = value.split("_");
                            log.setJsonProperty(aml,property,value[0]);
                        }
                        
                    } 
                }
            });
        });
    </script> 
</head>
<body>
<form id="id1" action="/common/fileupload.aspx?genfile=1" method="post" enctype="multipart/form-data">
<div id="upload">
<input name="file1" type="file" />
<input  type="submit" value="上传"/>
</div>
<div id="src">
<a href="" onclick="" id="fileurl"></a>
</div>
</form>

</body>
</html>
