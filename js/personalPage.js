var lookUpButton=$("#media").find("button")[0];
lookUpButton.onclick = function () {
    $.ajax({
        type: "GET",    //请求方式（默认GET） GET或POST，仅部分浏览器支持PUT和DELETE

        url: "data/interviewResult.json",     //发送请求的地址，默认为当前页面地址
        // data:"name=John&location=Boston",  //发送到服务器的数据，必须为key/value类型（数组会被转换）

        cache: true,     //设置缓存。默认值为true，当dataType为script时，默认为false。

        timeout: 20000,  //设置请求超时时间（毫秒）

        success: function (data) {
            var interviewStr='';
            var myModal=$("#myModal");
            if (data.type===1)
            {
                myModal.find(".modal-title").text("一面结果");
                interviewStr = '恭喜你成功通过第一轮面试，继续加油！';
            }
            else
            {
                myModal.find(".modal-title").text("二面结果");
                interviewStr = '恭喜你成功通过第二轮面试，欢迎你加入科技服务部！';
            }
            if (data.result==='ok')
                myModal.find(".modal-body").text(interviewStr);
            else
                myModal.find(".modal-body").text('很遗憾，你没有通过面试');

            myModal.modal('show');
        },       //成功回调函数，函数的参数由服务器返回

        // contentType:"application/json"  //发送信息至服务器时内容编码类型。默认为application/x-www-form-urlencoded

        dataType: "json",   //需要服务器返回的数据，可用值:xml,html,script,json,jsonp,text

        ifModified: "true",    //仅在服务器数据改变时获取新数据，默认值为false。

        beforeSend: function (request) {
            // 禁用按钮防止重复提交
           lookUpButton.setAttribute("disabled", "disabled");
        }, //参数为XMLHttpRequest对象，发送前可以修改XMLHttpRequest,如果返回false可取消本次请求。

        complete: function () {
            //取消对提交按钮的禁止
            lookUpButton.removeAttribute("disabled");
        },          //请求完成回调函数，（成功失败均调用）

        error: function (data) {
            console.log("error方法执行了，失败的信息为：" + data);
        },         //请求失败时调用函数。该函数三个对象，XMDHttpRequest，错误信息（可选），捕获的错误对象，错误信息可有null，timeout，error，notmodified和parsererror

    });
}