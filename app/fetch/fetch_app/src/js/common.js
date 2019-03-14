import $ from 'jquery';
import store from '../store'

//设置cookie
function setCookie(name, val, time) {
    //document.cookie = "名称=值";
    //document.cookie = "名称=值;expires=时间";
    var d = new Date().getTime();
    d = new Date(d + time);
    document.cookie = name + '=' + val + ";expires=" + d + ';path=/';
}
//获取cookie
function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}
//删除cookie
function delCookie(cookieName) {
    document.cookie = cookieName + "=;expires=-1;path=/"
}

//数据交互---------------ajax----------------start--------------------------------
// 获得ajax post返回Json数据
function postAjax(baseUrl, param) {
    var result;
    param = JSON.stringify(param);
    $.ajax({
        url: baseUrl,
        type: "post",
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        data: param,
        async: false,
        success: function (data) {
            result = data;
        },
        error: function (e) {
            // alert("网络错误，请重试！！");
        }
    });
    return result;
}

// 获得ajax post返回Json数据---附件上传
function postAjaxAtt(baseUrl, param) {
    var result;
    //console.info(paramStr);
    $.ajax({
        url: store.state.hostUrl + baseUrl,
        type: "post",
        data: param,
        async: false,
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        success: function (data) {
            result = data;
        },
        error: function (e) {
            // alert("网络错误，请重试！！");
        }
    });
    return result;
}


//异步ajax post
function ajaxAsync(url, param, callback) {
    var result;
    //console.info(paramStr);
    $.ajax({
        url: store.state.hostUrl + baseUrl,
        type: "post",
        data: param,
        async: true,
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        success: function (data) {
            result = data;
        },
        error: function (e) {
            // alert("网络错误，请重试！！");
        }
    });
    return result;
}

//根据id删除数据（post）
function deldata(_this, param, callback) {
    let type = param.type ? param.type : 0;//是否批量删除(0:否1:是);
    let url = param.url ? param.url : "";//路径
    let delid = param.delid ? param.delid : "";//删除的id
    let delname = param.delname ? param.delname : "";//删除的名称
    _this.$confirm("是否确认删除 " + delname)
        .then(_ => {
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: param,
                async: false,
                success: function (data) {
                    console.info(data);
                    if (data.state == "sucess") {
                        callback();
                    }
                },
                error: function (e) {
                    alert("网络错误，请重试！！");
                    console.info("请检查参数", param)
                }
            });
        })
        .catch(_ => { });

}

//根据用户id获取用户其他信息
function userData() {
    let userid = getCookie("userid");
    if (userid) {
        let param = {
            id: userid,
        }
        let data = postAjax(store.state.permison_url + "/usermanage/select", param);
        //console.info(data);
        return data;
    } else {
        return false;
    }
}
//数据交互---------------ajax----------------end--------------------------------


/*删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
function removeAaary(_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i] == _obj) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}

//将父子关系的Json转换为树形json
function toTreeData(data) {
    var pos = {};
    var tree = [];
    var i = 0;
    while (data.length != 0) {
        if (data[i].parentid == 0) {
            tree.push({
                id: data[i].id,
                label: data[i].clname,
                children: []
            });
            pos[data[i].id] = [tree.length - 1];
            data.splice(i, 1);
            i--;
        } else {
            var posArr = pos[data[i].parentid];
            if (posArr != undefined) {

                var obj = tree[posArr[0]];
                for (var j = 1; j < posArr.length; j++) {
                    obj = obj.children[posArr[j]];
                }

                obj.children.push({
                    id: data[i].id,
                    label: data[i].clname,
                    children: []
                });
                pos[data[i].id] = posArr.concat([obj.children.length - 1]);
                data.splice(i, 1);
                i--;
            }
        }
        i++;
        if (i > data.length - 1) {
            i = 0;
        }
    }
    return tree;
}

//将父子关系的Json转换为树形json——地区
function toTreeDataArea(data) {
    var pos = {};
    var tree = [];
    var i = 0;
    while (data.length != 0) {
        if (data[i].parentid == 0) {
            tree.push({
                value: data[i].id,
                label: data[i].name,
                children: []
            });
            pos[data[i].id] = [tree.length - 1];
            data.splice(i, 1);
            i--;
        } else {
            var posArr = pos[data[i].parentid];
            if (posArr != undefined) {

                var obj = tree[posArr[0]];
                for (var j = 1; j < posArr.length; j++) {
                    obj = obj.children[posArr[j]];
                }

                obj.children.push({
                    value: data[i].id,
                    label: data[i].name,
                    //children: []
                });
                pos[data[i].id] = posArr.concat([obj.children.length - 1]);
                data.splice(i, 1);
                i--;
            }
        }
        i++;
        if (i > data.length - 1) {
            i = 0;
        }
    }
    return tree;
}

//时间戳转化为时间
function dateToString(now) {
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    if (second.length == 1) {
        second = "0" + second;
    }
    var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return dateTime;
}

//返回浏览器类型——是否小于IE11
function getBrowserInfo() {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }else{
        return false;
    }

}

export {
    deldata,//删除数据
    setCookie,//设置cookie
    getCookie,//获取cookie
    delCookie,//删除cookie
    postAjax,//ajax post方法同步
    postAjaxAtt,//ajax post附件上传
    dateToString,//时间戳转化为时间
    toTreeData,//将父子关系的Json转换为树形json
    toTreeDataArea,//将父子关系的Json转换为树形json——地市
    ajaxAsync,//异步ajax post
    removeAaary,//删除数组中某对象
    userData,//用户信息
    getBrowserInfo,
}