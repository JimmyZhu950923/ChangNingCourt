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
                    document.getElementsByTagName("a")[0].removeAttribute("href");
                    document.getElementsByTagName("a")[1].removeAttribute("href");
                    document.getElementsByTagName("a")[4].removeAttribute("href");
                    document.getElementsByTagName("a")[5].removeAttribute("href");
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
                    document.getElementsByTagName("a")[0].removeAttribute("href");
                    document.getElementsByTagName("a")[1].removeAttribute("href");
                    document.getElementsByTagName("a")[4].removeAttribute("href");
                    document.getElementsByTagName("a")[5].removeAttribute("href");
                    $.toast("请先登录注册！", "text");
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
                $.toast("成功退出！","text");
                localStorage.removeItem("yh_token");
                localStorage.removeItem("ls_token");
                localStorage.removeItem("fg_token");
                window.location.reload();
            },
            onCancel: function () {
            }
        });
    });
});
