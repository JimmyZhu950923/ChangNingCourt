$(function () {
    $(document).on("click", "#b2", function () {
        console.log(1111);
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

        // let method = $("#b2").attr("name");

        $.ajax({
            url: "http://218.242.129.151:9200/user/login",
            data:JSON.stringify( {
                jsons: {
                    sjhm: text1,
                    mm: text2,
                },
                method: "dsrptlogin"
            }),
            type: "POST",
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (!data.error) {
                    alert("登陆注册成功！");
                }
            },
            error: function () {
                alert("手机号或者密码错误！");
                verify();
            }
        })
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
    });

    let countNum = 60;

    function time(elm){
        if(countNum === 0){
            elm.attr('disabled',false);
            elm.val('获取验证码');
            countNum = 60;
            return;
        }else{
            elm.attr('disabled',true);
            elm.val('重新发送('+ countNum + 's)');
            countNum--;
        }

        setTimeout(function(){
            time(elm)
        },1000)
    }

    $(document).on("click","#getCode",function () {
        let text1 = $("#text1").val();
        if (text1 === "") return alert("请输入您的手机号码！");
        time(this);
        $.ajax({
            url: "http://218.242.129.151:9200/sendCode?sjhm=" + text1 + "&fydm=200000",
            async: false,
            type: "GET",
            contentType : "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (data) {
                if (!data.error) {
                    alert("发送验证码成功！");
                }
            },
            error: function () {
                alert("发送失败！请检查输入的手机号码是否正确！");
            }
        });
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

    function verify() {
        let code1 = document.getElementById("text3").value;
        let code2 = document.getElementById("text3").className;
        if (code1 !== code2) {
            alert("验证码错误，请重新输入！");
            return false;
        }
        return true;
    }
});

