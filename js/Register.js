$(function () {
    let d;
    let token;
    $(document).on("click", "#b2", function () {
        let reg = /^1[3|4|5|7|8][0-9]{9}$/;
        let text1 = $.trim($("#text1").val());
        if (text1 === "") {
            alert("请输入手机号码！");
        } else if (!reg.test(text1)) {
            alert("手机号码格式不正确！");
        }
        let t2 = $("#text2");
        let text2 = $.trim(t2.val());
        if (text2 === "") {
            alert("请输入密码！");
        }
        t2.val(text2);
        let t3 = $("#text3");
        let text3 = $.trim(t3.val());
        let code = a.data;
        if (text3 === "") {
            $.toast("请输入验证码！", "text");
        } else if (text3 !== code) {
            $.toast("验证码错误，请重新输入！", "text");
            $("#text3").val("");
            return false;
        } else if (text3 === code) {
            $.ajax({
                url: "http://218.242.129.151:9200/user/login",
                data: JSON.stringify({
                    jsons: {
                        sjhm: text1,
                        mm: text2,
                    },
                    method: "dsrptlogin"
                }),
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.status === 1) {
                        window.location.href = "./ChangningFayuan.html";
                        d = data;
                        token = d.data.token;
                        localStorage.setItem("yh_token", token);
                    } else if (data.status === 0) {
                        if (text1 !== "" && text2 !== "" && text3 !== "") {
                            $.toast("登录失败,账号或密码不正确！", "text");
                            $("#text1").val("");
                            $("#text2").val("");
                        }
                    }
                },
            })
        }
    });

    $(document).on("click", "#b3", function () {
        let text11 = $.trim($("#text11").val());
        if (text11 === "") {
            alert("请输入账号！");
        }
        let text22 = $.trim($("#text22").val());
        if (text22 === "") {
            alert("请输入密码！");
        }
        $.ajax({
            url: "http://218.242.129.151:9200/lower/login",
            data: JSON.stringify({
                "userName": text11,
                "password": text22
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.status === 1) {
                    window.location.href = "./ChangningFayuan.html";
                    d = data;
                    token = d.data.token;
                    localStorage.setItem("ls_token", token);
                } else if (data.status === 0) {
                    if (text11 !== "" && text22 !== "") {
                        $.toast("登录失败,账号或密码不正确！", "text");
                        $("#text11").val("");
                        $("#text22").val("");
                    }
                }
            },
        })
    });

    $(document).on("click", "#b4", function () {
        let text111 = $.trim($("#text111").val());
        if (text111 === "") {
            alert("请输入账号！");
        }
        let text222 = $.trim($("#text222").val());
        if (text222 === "") {
            alert("请输入密码！");
        }
        $.ajax({
            url: "http://218.242.129.151:9200/fyggz/login",
            data: JSON.stringify({
                "userName": text111,
                "password": text222
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.status === 1) {
                    window.location.href = "./ChangningFayuan.html";
                    d = data;
                    token = d.data.token;
                    localStorage.setItem("fg_token", token);
                } else if (data.status === 0) {
                    if (text111 !== "" && text222 !== "") {
                        $.toast("登录失败,账号或密码不正确！", "text");
                        $("#text111").val("");
                        $("#text222").val("");
                    }
                }
            },
        })
    });

    let countdown = 60;

    function time(obj) {
        if (countdown === 0) {
            obj.removeAttribute("disabled");
            obj.value = "获取验证码";
            countdown = 60;
            if (countdown === 60) {
                return false;
            }
        } else {
            obj.setAttribute("disabled", true);
            obj.value = "重新发送(" + countdown + "s)";
            countdown--;
        }
        setTimeout(function () {
            time(obj);
        }, 1000)
    }

    let a;
    $(document).on("click", "#getCode", function () {
        let text1 = $("#text1").val();
        if (text1 === "") return alert("请输入您的手机号码！");
        time(this);
        $.ajax({
            url: "http://218.242.129.151:9200/sendCode?sjhm=" + text1 + "&fydm=200000",
            async: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (data) {
                if (!data.error) {
                   $.toast("发送验证码成功！", "text");
                }
                console.log(data);
                a = data;
            },
            error: function () {
                $.toast("发送失败！请检查输入的手机号码是否正确！", "text");
            }
        });
    });

    $(".li1").ready(function () {
        let a = document.getElementById("li1").innerHTML;
        console.log(a);
        $('#content').html($('#ls').html());
    });

    $("#li1").on("click", function () {
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $(this).addClass("active");
        $("#text1").val("");
        $("#text2").val("");
        $("#text3").val("");
        let a = document.getElementById("li1").innerHTML;
        console.log(a);

        $('#content').html($('#ls').html());
    });

    $("#li2").on("click", function () {
        $("#li1").removeClass("active");
        $("#li3").removeClass("active");
        $(this).addClass("active");
        $("#text1").val("");
        $("#text2").val("");
        $("#text3").val("");
        let b = document.getElementById("li2").innerHTML;
        console.log(b);
        $('#content').html($('#fg').html());
    });

    $("#li3").on("click", function () {
        $("#li1").removeClass("active");
        $("#li2").removeClass("active");
        $(this).addClass("active");
        $("#text1").val("");
        $("#text2").val("");
        $("#text3").val("");
        let c = document.getElementById("li3").innerHTML;
        console.log(c);
        $('#content').html($('#dsr').html());
    });
});

