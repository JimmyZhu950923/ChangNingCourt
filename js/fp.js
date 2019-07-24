$(function () {
    $.toast.prototype.defaults.duration = 1000;
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

    $(document).on("click", "#b1", function () {
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
            alert("请输入新密码！");
        }
        t2.val(text2);
        let t22 = $("#text22");
        let text22 = $.trim(t22.val());
        if (text22 === "") {
            alert("请再输入新密码！");
        }
        t22.val(text22);
        let t3 = $("#text3");
        let text3 = $.trim(t3.val());

        if (text3 === "") {
           alert("请输入验证码！");
        }
        let code = a.data;
        if (text2 !== text22) {
            $.toast("两次输入的密码不相同，请重新输入！", "text");
            t2.val("");
            t22.val("");
        } else if (text3 !== code) {
            $.toast("验证码错误，请重新输入！", "text");
            $("#text3").val("");
            return false;
        } else if (text3 === code) {
            $.ajax({
                url: "http://218.242.129.151:9200/hyapi",
                data: JSON.stringify({
                    jsons: {
                        sjhm: text1,
                        mm: text2,
                    },
                    method: "setczmm"
                }),
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (!data.error) {
                        $.toast("密码重置成功！");
                        setTimeout(function () {
                            window.location.href = "./signIn.html";
                        },1500);
                    }
                },
            })
        }
    });
});