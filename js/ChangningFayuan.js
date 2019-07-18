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
                        layer.open({
                            type: 1,
                            shade: false,
                            title: false,
                            content:'\<\a href="./Register.html" style="text-decoration:none;font-size:18px;color:black;">&nbsp;&nbsp;&nbsp;请先登录注册！\<\/a>'
                        });
                        return false;
                    } else if (a.status === 1) {
                        console.log(data);
                    }
                },
            })
        });
    });
});

