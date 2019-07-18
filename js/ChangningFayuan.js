$(function () {
    let a;
    $(document).ready(function () {
        $(document).on("click",".a", function () {
            let yh_token = localStorage.getItem("yh_token");
            let ls_token = localStorage.getItem("ls_token");
            let fg_token = localStorage.getItem("fg_token");
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
                    "token":token,
                }),
                async: false,
                type: "POST",
                contentType : "application/json; charset=utf-8",
                dataType: "JSON",
                success: function (data) {
                    console.log(data.status);
                    a = data;
                    if (a.status === 0){
                        document.getElementsByTagName("a")[0].removeAttribute("href");
                        document.getElementsByTagName("a")[1].removeAttribute("href");
                        document.getElementsByTagName("a")[4].removeAttribute("href");
                        document.getElementsByTagName("a")[5].removeAttribute("href");
                        alert("请先点击登录注册！");
                        return false;
                    } else if (a.status === 1) {
                        console.log(data);
                    }
                },
            })
        });
    });

    $(document).on("click", "#register", function () {
        if (localStorage.getItem("yh_token") !== null || localStorage.getItem("ls_token") !== null || localStorage.getItem("fg_token") !== null ) {
            document.getElementById("register").disabled = true;
            alert("已登录！");
        } else {
            window.location.href = "./Register.html";
        }
    })

    $(document).on("click", "#set", function () {
        if (localStorage.getItem("yh_token") === null || localStorage.getItem("ls_token") === null || localStorage.getItem("fg_token") === null ) {
            document.getElementById("set").disabled = true;
            alert("请先登录！");
        } else {
            window.location.href = "./Register.html";
        }
    })
});

