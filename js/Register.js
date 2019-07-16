$(function () {
    $("#b2").on("click", function () {
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
        let test3 = $.trim($("#text3").val());
        if (test3 === "" || test3 === "请输入验证码")return alert("请输入验证码!");
        form1.submit();
    });

    $("#b3").on("click", function () {
        let text11 = $.trim($("#text11").val());
        if (text11 === "") {
            alert("请输入账号！");
        }
        let text22 = $.trim($("#text22").val());
        if (text22 === "") {
            alert("请输入密码！");
        }
        form2.submit();
    });

    $("#b4").on("click", function () {
        let text111 = $.trim($("#text111").val());
        if (text111 === "") {
            alert("请输入账号！");
        }
        let text222 = $.trim($("#text222").val());
        if (text222 === "") {
            alert("请输入密码！");
        }
        form3.submit();
    });

    let countdown = 60;
    function settime(obj) {
        if (countdown === 0) {
            obj.removeAttribute("disabled");
            obj.innerText = "获取验证码";
            countdown = 60;
        } else {
            obj.setAttribute("disabled", true);
            obj.innerText = "重新发送(" + countdown +")";
            countdown --;
        }
        setTimeout(function () {
            settime(obj);
        }, 1000)
    }

    $("#b1").on("click", function () {
        let text1 = $("#text1").val();
        if (text1 === "") return alert("请输入您的手机号码！");
        settime(this);
        $.ajax({
            url: "",
            async: false,
            type: "post",
            success: function (data) {
                if (!data.error) {
                    alert("发送验证码成功！");
                }
            }, error: function (data) {
                alert("发送失败！请检查输入的手机号码是否正确！");
            }
        })
    });

    $(".li1").ready(function () {
        let a = document.getElementById("li1").innerHTML;
        console.log(a);
        $('#content').html($('#ls').html());
    });

    $("#li1").on("click", function () {
        $("#li2").removeClass("active") ;
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

