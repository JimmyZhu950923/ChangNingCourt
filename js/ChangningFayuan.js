$(function () {
    let a;
    let yh_token = localStorage.getItem("yh_token");
    let ls_token = localStorage.getItem("ls_token");
    let fg_token = localStorage.getItem("fg_token");
    $(document).ready(function () {
        let token;
        if (yh_token !== null) {
            token = yh_token;
        } else if (ls_token !== null) {
            token = ls_token;
        } else if (fg_token !== null) {
            token = fg_token;
        }
        $.ajax({
            url: "http://218.242.129.151:9200/user/checkLogin",
            data: JSON.stringify({
                "token": token,
            }),
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (data) {
                console.log(data.status);
                a = data;
                if (a.status === 0) {
                    $(document).on("click", "#register", function () {
                        window.location.href = "./Register.html";
                    });
                    return false;
                } else if (a.status === 1) {
                    let register = $("#register");
                    register.html("退出");
                    register.attr("id", "signOut");
                    if (yh_token !== null && ls_token === null && fg_token === null) {
                        $("#one").attr("href", "http://wxgzh.hshfy.sh.cn/yhfw/#/wsla/list");
                        $("#two").attr("href", "http://wxgzh.hshfy.sh.cn/yhfw/#/ajlist");
                        $("#three").attr("href", "http://wxgzh.hshfy.sh.cn/yhfw/#/wssd/list");
                        $("#four").attr("href", "http://wxgzh.hshfy.sh.cn/yhfw/#/cldj/list");
                    } else if (yh_token === null && ls_token !== null && fg_token === null) {
                        $("#one").attr("href", "http://wxgzh.hshfy.sh.cn/lsfw/#/wsla/list");
                        $("#two").attr("href", "http://wxgzh.hshfy.sh.cn/lsfw/#/ajlist");
                        $("#three").attr("href", "http://wxgzh.hshfy.sh.cn/lsfw/#/wssd/list");
                        $("#four").attr("href", "http://wxgzh.hshfy.sh.cn/yhfw/#/cldj/list");
                    } else if (yh_token === null && ls_token === null && fg_token !== null) {
                        $("#one").attr("href", "http://wxgzh.hshfy.sh.cn/fgfw/#/wsla/list");
                        $("#two").attr("href", "http://wxgzh.hshfy.sh.cn/fgfw/#/ajlist");
                        $("#three").attr("href", "http://wxgzh.hshfy.sh.cn/fgfw/#/wssd/list");
                        $("#four").attr("href", "http://wxgzh.hshfy.sh.cn/fgfw/#/cldj/list");
                    }
                }
            },
        })
    });

    $(document).on("click", ".a", function () {
        let token;
        if (yh_token !== null) {
            token = yh_token;
        } else if (ls_token !== null) {
            token = ls_token;
        } else if (fg_token !== null) {
            token = fg_token;
        }
        $.ajax({
            url: "http://218.242.129.151:9200/user/checkLogin",
            data: JSON.stringify({
                "token": token,
            }),
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (data) {
                a = data;
                if (a.status === 0) {
                    $.toast("请先登录注册！", "text", function () {
                        window.location.href = "./Register.html";
                    });
                    $(document).on("click", "#register", function () {
                        window.location.href = "./Register.html";
                    });
                    return false;
                } else if (a.status === 1) {
                    let register = $("#register");
                    register.html("退出");
                    register.attr("id", "signOut");
                }
            },
        })
    });

    $(document).on("click", "#signOut", function () {
        $.confirm({
            title: "退出",
            text: "请确认退出！！！",
            onOK: function () {
                $.closeModal();
                $.toast("成功退出！", "text");
                localStorage.removeItem("yh_token");
                localStorage.removeItem("ls_token");
                localStorage.removeItem("fg_token");
                setTimeout(function () {
                    window.location.reload();
                }, 2100);
            },
            onCancel: function () {
                $.closeModal();
            }
        });
        // $.modal({
        //     title: "退出",
        //     text: "请确认退出？",
        //     buttons: [
        //         {text: "确认", onClick: function () {
        //                 $.closeModal();
        //                 $.toast("成功退出！", "text");
        //                 localStorage.removeItem("yh_token");
        //                 localStorage.removeItem("ls_token");
        //                 localStorage.removeItem("fg_token");
        //                 setTimeout(function () {
        //                     window.location.reload();
        //                 }, 2100);
        //             }
        //             },
        //         {text: "取消",className: "default", onClick: function () {
        //                 $.closeModal();
        //             }}
        //     ],
        // });
    });
});
