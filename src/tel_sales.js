/**
 * Created by zz on 2016/7/5.
 * 一、接口：
 *  待呼导出      /saletel/exportqueue/
 *  已呼导出      /saletel/exportcall/
 *
 * 二、数据
 *  window.TEL_AGENT  保存呼叫队列的当前经纪人数据
 *  window.WORK_PARAM 保存当前电销工作的各类参数
 *    calltyp     //呼叫类型  1是呼入，2是呼出
 *    work_type  //队列类型   1:待呼,2:已呼 再次呼叫
 *
 * 三、telSales
 *  alert:(msg)
 *  calledData:Object
 *  configRender:()
 *  init:(isAgain)
 *  keywordInput:(container, type)
 *  keywordPop:(type, input)
 *  page1_mid:(res, isAgain)
 *  page1_top: (res)
 *  page2_bot:(res)
 *  page2_top: (res, uid)
 *  pubSave:(exit)
 *  saveChoose:()
 *  screenClick: (container, calltype)
 *  searchCalled:()
 *  searchUncall:()
 *  startWork:(calltel, calluid)
 *  tabCalled:()
 *  tabPage:(container, renderFn)
 *  uncallData:Object
 *
 */
//引入公用库
var xk_www = require('exports?xk_www!./lib/comm.js');
var tel_date = require("exports?tel_date!./moudle/tel_date.js");//周振的日期js
if ($('#agent-table').length) {
  /*使用产品滑过查看更多 标签版块滑过查看更多*/
  xk_www.getMoreProduct($('.pd-3 .box-products'), 66);
  xk_www.getMoreProduct($('.pd-4 .r-info'), 180);

} else {
  window.telSales = {
    alert: function (msg) {
      xk_www.popE(msg)
    },
    init: function (isAgain) {
      if (!xkTelInfo.isCallCenter) {
        $("#tel-bar").addClass("dn")
      }
      var historyUncall = JSON.parse(localStorage.getItem("uncallData")) || {};
      telSales.uncallData = {
        ajaxType: "GET",
        citycode: xkTel.citycode,//城市编号
        jobid: xkTel.jobid,//销售工号
        tel_group_id: xkTel.group_id,//部组id
        callqueue: historyUncall.callqueue || 1,//呼叫队列
      };
      telSales.calledData = {
        ajaxType: "GET",
        citycode: xkTel.citycode,//城市编号
        jobid: xkTel.jobid,//销售工号
        tel_group_id: xkTel.group_id//部组id
      };
      xk_www.postData("/saleajax/telstatresult/", {
        ajaxType: "GET",
        //noLoad: false,
        citycode: xkTel.citycode,//城市编号
        level: xkTel.level,
        group_id: xkTel.group_id,//部组id
        jobid: xkTel.jobid//销售工号
      }, function (res) {
        telSales.page1_top(res, isAgain);
      });
      xk_www.postData("/saleajax/tellist/", telSales.uncallData, function (res) {
        telSales.page1_mid(res)
      });
    },
    page1_top: function (res) {
      $(".r-c #page1_top").addClass("dn").html(baidu.template("tel_top_temp", res.result)).removeClass("dn").addClass("animated fadeIn");
      $(".date-picker-wrapper").remove();//每次进来先清空
      setTimeout(tel_date.init_top(), 0);//开启时间插件
      $(".result_date").on("click", function () {
        var dateVal = $('#result_date').val().split("到");
        if (!dateVal[0] || !dateVal[1]) {
          xk_www.popE("时间不正确");
          return false;
        }
        xk_www.postData("/saleajax/telstatresult/", {
          ajaxType: "GET",
          //noLoad: false,
          citycode: xkTel.citycode,//城市编号
          level: xkTel.level,
          group_id: xkTel.group_id,//部组id
          jobid: xkTel.jobid,//销售工号
          start_date: $('#result_date').val().split("到")[0],
          end_date: $('#result_date').val().split("到")[1]
        }, function (res) {
          $(".r-c #page1_top .stat-item").html(baidu.template("tel_top_content", res.result.data));
        });
      });
    },
    page1_mid: function (res, isAgain) {
      $(".r-c #page1_middle").addClass("dn").html(baidu.template("tab_main_temp", res.result)).removeClass("dn").addClass("animated fadeIn");
      var startWork = document.getElementById("startWork");
      isAgain && startWork && (startWork.innerHTML = "开始工作");
      /*调用分页*/
      telSales.tabPage($("#uncall-tag"), function (current_page) {
        telSales.uncallData.currpage = current_page;
        xk_www.postData("/saleajax/tellist/", telSales.uncallData, function (res) {
          $("#uncall-tag .log-table-sales").html(baidu.template("uncall_tab_temp", res.result));
        });
      });
      //END
      /*绑定部组配分配、开始工作、设置目标事件*/

      //开始工作按钮
      $("#uncall-tag .hd_btn").on("click", "#startWork", function () {
        /*获取呼叫队列第一个号码*/
        //保存一份当前的uncallData配置到locationStorage；
        localStorage.setItem("uncallData", JSON.stringify(telSales.uncallData));

        xk_www.postData("/saleajax/tellist/", $.extend({}, telSales.uncallData, {
          is_work: 1
        }), function (res) {
          if (!res.result.data.list.length) {
            xk_www.popE("呼叫队列没有号码");
            return false;
          }
          var uid = res.result.data.list[0].uid;
          var tel = res.result.data.list[0].basicinfo.mobile;

          //alert(tel);
          if (!tel || !uid) {
            xk_www.popE("呼出参数不全");
            return false;
          }

          /*保存一份本次取出来的信息*/
          window.TEL_AGENT = $.extend({}, res.result.data.list[0]);

          window.WORK_PARAM = {
            work_type: 1,
            calltype: 2
          };//工作参数

          if (window.xkTelInfo.isCallCenter) {//第三方
            callout(tel, uid);
          } else {//无第三方时
            telSales.startWork(tel, uid);
          }
        });
      });

      //置忙按钮
      $("#uncall-tag .hd_btn").on("click", "#quitWork", function () {
        if ($(this).html() == "置忙") {
          pause();
        } else if ($(this).html() == "置闲") {
          doStatus();
        }
      });

      //设置目标按钮
      $("#uncall-tag .hd_btn").on("click", "#setTarget", function () {
        var stHtml = "<p class='target_P clearfix'>" +
          "<input name='connect_num' maxlength='8' placeholder='接通数量' value='" + ((window.xkTelInfo.targetInfo && window.xkTelInfo.targetInfo.connect_num) || '') + "'>" +
          "<input name='conversion_num' maxlength='8'  placeholder='转化数量' value='" + ((window.xkTelInfo.targetInfo && window.xkTelInfo.targetInfo.conversion_num) || '') + "'>" +
          "</p>";
        xk_www.commPop(stHtml, {}, {
          isModal: true,
          title: "目标设置（日/人 均值）",
          button: [
            {
              value: '取消',
              callback: function () {
              },
              autofocus: false
            }, {
              value: '确定',
              callback: function () {
                var connectN = $.trim($("input[name=connect_num]").val()),
                  conversionN = $.trim($("input[name=conversion_num]").val());
                if (!(connectN > 0)) {
                  xk_www.popE("接通数量输入值非法");
                  return false;
                }
                if (!(conversionN > 0)) {
                  xk_www.popE("转化数量输入值非法");
                  return false;
                }
                xk_www.postData("/saleajax/teltarget/", {
                  ajaxType: "GET",
                  citycode: xkTel.citycode,//城市编号
                  group_id: xkTel.group_id,//部组id
                  login_jobid: xkTel.login_jobid,//销售工号
                  connect_num: connectN,
                  conversion_num: conversionN
                }, function (res) {
                  /*待优化随返回回来的传*/
                  window.xkTelInfo.targetInfo.connect_num = connectN;
                  window.xkTelInfo.targetInfo.conversion_num = conversionN;
                  xk_www.popS("设置成功", function () {
                    $(".result_date").trigger("click");
                  });
                });
              },
              autofocus: true
            }
          ]
        });
      });

      //部组分配按钮
      $("#uncall-tag .hd_btn").on("click", "#groupAllocat", function () {
        xk_www.postData("/saleajax/groupassigngetconfig/", {
          ajaxType: "GET",
          citycode: xkTel.citycode,//城市编号
          tel_group_id: xkTel.group_id//部组id
        }, function (res) {
          var data = res.result.data;
          xk_www.commPop("group_allocat_temp", data, {
            isModal: true,
            width: 455,
            title: "部组分配",
            onshow: function () {
              var unGroup = $("#unchooseGroup"),
                edGroup = $("#chooseedGroup");
              $("#chooseedGroup,#unchooseGroup").on("dblclick", "dd", function () {
                $(this).clone(false).appendTo($(this).parent("dl").siblings("dl"));
                $(this).remove();
              });
              $("#tel_basic").change(function () {
                var val = $(this).val(),
                  telGroup = [];
                if (!val) {
                  xk_www.popE("所选销售不存在");
                  return false;
                }

                edGroup.find("dd").remove();
                unGroup.find("dd").remove();

                for (var i = 0; i < data.tel.length; i++) {
                  if (data.tel[i].jobid == val) {
                    telGroup = data.tel[i].group;
                    break
                  }
                }
                var temp = "<%for(var t=0;t< group.length;t++){%><dd data-id=<%=group[t].id%>><%=group[t].name%></dd><%}%>";

                var unGroupArr = [];
                for (var n = 0; n < data.group.length; n++) {
                  unGroupArr.push(data.group[n]);
                  for (var m = 0; m < telGroup.length; m++) {
                    data.group[n].id == telGroup[m].id && unGroupArr.pop()
                  }
                }

                //console.log(telGroup);
                //console.log(unGroupArr);
                edGroup.append(baidu.template(temp, {group: telGroup})); //已选
                unGroup.append(baidu.template(temp, {group: unGroupArr}));//待选重渲染

              })
            },
            button: [
              {
                value: '取消',
                callback: function () {
                },
                autofocus: false
              }, {
                value: '确定',
                callback: function () {
                  var groupArr = [];
                  $("#chooseedGroup dd").each(function () {
                    groupArr.push($(this).data("id"));
                  });
                  var group_id = groupArr.join(",");
                  xk_www.postData("/saleajax/groupassign/", {
                    citycode: xkTel.citycode,
                    jobid: $("#tel_basic").val(),
                    group_id: group_id
                  }, function (res) {
                    xk_www.popS("部组分配成功！", function () {
                      location.reload();//重刷页面
                    })
                  })
                },
                autofocus: true
              }
            ]
          })
        })
      });

      //导出数据按钮
      $("#uncall-tag .hd_btn").on("click", "#exportUncall", function () {
        var param = "";
        $.each(telSales.uncallData, function (i, n) {
          if(n===null || n===undefined){
            return
          }
          if (param) {
            param += ("&" + i + "=" + n)
          } else {
            param += ("?" + i + "=" + n)
          }
        });
        console.log("/saletel/exportqueue/" + param);

        location.href = "/saletel/exportqueue/" + param;
      });

      /*绑定切换事件*/
      $(".Telemarketing_main .main-title li").on('click', function () {
        if ($(this).hasClass("current")) {
          return false;
        }
        $(this).addClass("current").siblings().removeClass("current");
        if ($(this).data("type") == "uncall") {
          $("#uncall-tag").removeClass("dn").siblings().addClass("dn");
        } else {
          if ($(this).data("time") != "0") {//标识已经异步渲染过一次，就只需要切换dn
            $("#called-tag").removeClass("dn").siblings().addClass("dn");
            return false;
          }
          $(this).data("time", "1");//标识异步渲染一次
          telSales.tabCalled();//调用渲染
        }
      });

      /*未接筛选接口*/
      xk_www.postData("/saleajax/gettellistconfig/", {
        ajaxType: "GET",
        citycode: xkTel.citycode,//城市编号
        jobid: xkTel.jobid,//销售工号
        tel_group_id: xkTel.group_id//部组id
      }, function (res) {
        /*渲染筛选板块*/
        $("#uncall-tag .tag_callCon .hd_btn").after(baidu.template("uncall_choose_temp", res.result));

        //时间插件开启
        tel_date.init_uncall();

        //绑定筛选事件
        telSales.screenClick($("#uncall-tag .tag_callCon"), "uncall");

        //绑定关键字查找
        telSales.keywordInput($("#uncall-tag .tag_callCon"), "uncall");

        //日期筛选
        $(".queue_t").click(function () {
          var dateVal = $('#queueDate').val().split("到");
          if (!dateVal[0] || !dateVal[0]) {
            delete telSales.uncallData.queuedate;
          } else {
            telSales.uncallData.queuedate = dateVal[0].replace(/-/g, "") + "-" + dateVal[1].replace(/-/g, "");
          }
          //此处可能有重置时间带来的隐患
          //console.log(telSales.uncallData.queuedate);
          telSales.searchUncall();//调用筛选搜索列表
        });
      });
    },
    tabCalled: function () {
      xk_www.postData("/saleajax/getcalllist/", {
        ajaxType: "GET",
        citycode: xkTel.citycode,//城市编号
        jobid: xkTel.jobid,//销售工号
        tel_group_id: xkTel.group_id//部组id
      }, function (res) {
        $("#called-tag .log-table").html(baidu.template("called_tab_temp", res.result));//渲染表格
        $("#called-tag .main-foot").html(baidu.template("tel_page_foot", res.result.data));//渲染分页
        $("#called-tag").removeClass("dn").siblings().addClass("dn");//切换显示
        telSales.tabPage($("#called-tag"), function (current_page) {//调用分页方法
          telSales.calledData.currpage = current_page;
          xk_www.postData("/saleajax/getcalllist/", telSales.calledData, function (res) {
            $("#called-tag .log-table-sales").html(baidu.template("called_tab_temp", res.result));
          });
        });

        //导出数据按钮
        $("#called-tag .hd_btn").on("click", "#exportCalled", function () {
          var param = "";
          $.each(telSales.calledData, function (i, n) {
            if(n===null || n===undefined){
              return
            }
            if (param) {
              param += ("&" + i + "=" + n)
            } else {
              param += ("?" + i + "=" + n)
            }
          });
          location.href = "/saletel/exportcall/" + param;
        });

        $("#called-tag .log-table").on("click", "a.callBtn", function () {
          //var uid = $(this).data("uid");
          var id = $(this).data("id");
          //var call_time = $(this).data("time");//记录拜访时间

          xk_www.postData("/saleajax/getcalllist/", $.extend({}, telSales.calledData, {
            //uid: uid,
            id: id,
            is_call: 1,//再次呼叫
            //call_time: call_time
          }), function (res) {
            if (!res.result.data.list.length) {
              xk_www.popE("呼叫队列没有号码");
              return false;
            }

            var uid = res.result.data.list[0].uid;
            var tel = res.result.data.list[0].basicinfo.mobile;


            if (!uid || !tel) {
              xk_www.popE("呼出参数不全");
              return false;
            }

            /*保存一份本次取出来的信息*/
            window.TEL_AGENT = $.extend({}, res.result.data.list[0]);//队列该单个经纪人信息
            window.WORK_PARAM = {
              work_type: 2,
              calltype: 2
            };//工作参数

            if (window.xkTelInfo.isCallCenter) {
              callout(tel, uid);
            } else {
              telSales.startWork(tel, uid)
            }

          });
          return false;
        })

      });
      xk_www.postData("/saleajax/getcallconfig/", {
        ajaxType: "GET",
        noLoad: false,
        citycode: xkTel.citycode,//城市编号
        jobid: xkTel.jobid,//销售工号
        tel_group_id: xkTel.group_id//部组id
      }, function (res) {
        /*渲染已呼筛选*/
        $("#called-tag .tag_callCon .hd_btn").after(baidu.template("called_choose_temp", res.result));

        /*时间插件开启*/
        tel_date.init_called();

        //绑定筛选事件
        telSales.screenClick($("#called-tag .tag_callCon"), "called");

        telSales.keywordInput($("#called-tag .tag_callCon"), "called");//绑定关键字查找

        $(".call_t").click(function () {
          var dateVal = $('#callDate').val().split("到");
          if (!dateVal[0] || !dateVal[0]) {
            delete telSales.calledData.call_date;
          } else {
            telSales.calledData.call_date = dateVal[0].replace(/-/g, "") + "-" + dateVal[1].replace(/-/g, "");
          }
          //此处可能有重置时间带来的隐患
          //console.log(telSales.calledData.call_date);
          telSales.searchCalled();//调用筛选搜索列表
        });
        // END 绑定筛选事件
      });
    },
    screenClick: function (container, calltype) {/*筛选点击*/

      container.on("click", ".item a", function () {
        if ($(this).hasClass("onend")) {
          return false;
        }
        var item = $(this).closest(".item");

        if (!$(this).parent().hasClass("group_div") || !$(this).data("id")) {
          $(this).siblings("a.onend").removeClass("onend");
        } else {
          $(this).siblings("a:not([data-id])").removeClass("onend")
        }

        $(this).addClass("onend");

        var type = $(this).data("type"),
          json = $(this).data("json");

        switch (type) {
          case "district":
            render()
            delete telSales[calltype + "Data"].block
            break;
          case "block":
            break;
          case "parent":
            render()
            delete telSales[calltype + "Data"].group
            break;
          case "group":
            break;
          case "callqueue"://待呼：呼叫队列
            break;
          case "visitlabel"://已呼：电销标签
            break;
          case "call_status"://已呼：呼叫状态
            break;
          case "buylevel"://已呼：客户意向
            break;
          default:
            console.error("type值非法");
        }

        delete telSales[calltype + "Data"].currpage;

        var thisId = null;
        if (type == "block" || type == "group") {
          var curCond = telSales[calltype + "Data"][type];
          var id = $(this).data("id");
          if (id && curCond) {//存在
            thisId = curCond + "," + id;
          } else {//不存在
            thisId = id
          }
        } else {
          thisId = $(this).data("id");
        }

        telSales[calltype + "Data"][type] = thisId;
        function render() {//板块和部组下级联动渲染
          var data = typeof json === "string" ? JSON.parse(json) : json;
          if (data) {
            item.find(".line-list .choose")
              .html(baidu.template(type == "district" ? "choose_block_hover_temp" : "choose_group_hover_temp", {data: data}));
            item.find(".line-list").removeClass("dn");
          } else {
            item.find(".line-list").addClass("dn");
          }
        }

        /*根据calltype调换对应的search函数*/
        if (calltype == "uncall") {
          telSales.searchUncall();//调用筛选搜索列表
        } else if (calltype == "called") {
          telSales.searchCalled();
        } else {
          console.error("点击筛选未传calltype");
        }

      });

    },
    keywordInput: function (container, type) {//容器

      var keyUpFunc=(function(){//利用闭包保护上一次的value
        var saveValue="";//用于保存上一次的value
        return (function (event){
          if (event.keyCode == 13) {
            $(this).siblings(".keyword_pop_box").empty();
            telSales[type + "Data"].keyword = $(this).val();
            type == "uncall" ? telSales.searchUncall() : telSales.searchCalled();
            return false;
          }
          var value=$(this).val();
          if(saveValue!=value){
            saveValue=value;
            delete telSales[type + "Data"].keyword;
            telSales.keywordPop(type, $(this));
          }
        });//返回一个函数，可以访问到
      }());

      container.on("keyup", ".keyword-input", xk_www.debounce(keyUpFunc, 50, false));

      container.on("click",".call_search .icon-look",function(){
        $(this).siblings(".keyword_pop_box").empty();
        telSales[type + "Data"].keyword = $(this).siblings("input").val();
        type == "uncall" ? telSales.searchUncall() : telSales.searchCalled();
      });

      container.on("blur", ".keyword-input", function () {/*.call_search*/
        var keyword_pop_box = $(this).siblings(".keyword_pop_box");
        !keyword_pop_box.data("focus") && keyword_pop_box.empty();
        $(this).data("focus", "");
      });

      container.on("click", ".keyword_pop_box li", function () {
        /*清除*/
        /*delete telSales[type + "Data"].company;
         delete telSales[type + "Data"].store;
         delete telSales[type + "Data"].uid;*/

        /*$.extend(telSales[type + "Data"], {
         company: null,
         store: null,
         uid: null
         });*/

        /*var role = $(this).data("role"),
         uid = $(this).data("uid");
         if (role == 1) {/!*1公司 7门店 8经纪人*!/
         telSales[type + "Data"].company = uid
         } else if (role == 7) {
         telSales[type + "Data"].store = uid
         } else if (role == 8) {
         telSales[type + "Data"].uid = uid
         } else {
         xk_www.popE("role类型错误！");
         return false;
         }*/
        var Input = $(this).closest(".keyword_pop_box").siblings(".keyword-input");
        Input.val($(this).find(".content_name").text());
        Input.siblings(".icon-look").trigger("click");
        //$(this).closest(".keyword_pop_box").empty();
        /*if (type == "uncall") {
         telSales.searchUncall();
         } else if (type == "called") {
         telSales.searchCalled();
         }*/
      });
      container.find(".keyword_pop_box").hover(function () {/*焦点标识*/
        $(this).data("focus", "1")
      }, function () {
        $(this).data("focus", "");
      });
    },
    keywordPop: function (type, input) {
      var val = $.trim(input.val());
      if (!val || !val.length) {
        input.siblings(".keyword_pop_box").html("");
        return false;
      }
      telSales.keyAjax && telSales.keyAjax.abort();
      telSales.keyAjax = $.ajax({
        type: 'GET',
        url: "/saleajax/getcallkeyword/",
        data: $.extend({}, telSales[type + "Data"], {
          keyword: val,
          type: type == "uncall" ? 1 : 2,//	true	int	1待呼 2已呼
          num: 10
        }),
        success: function (res) {
          telSales.keyAjax = null;
          var res = (typeof res == 'string') ? JSON.parse(res) : res;
          if (res.result.code == 0) {
            if (!res.result.data.length) {
              return false;
            }
            input.siblings(".keyword_pop_box").html(baidu.template("keyword_pop_temp", res.result));
          } else {
            console.error(res.result.message)
          }
        }
      });
    },
    searchUncall: function () {//待呼叫表格更新
      console.log(telSales.uncallData);
      telSales.uncallAjax && telSales.uncallAjax.abort();
      telSales.uncallAjax = $.ajax({
        type: "GET",
        url: "/saleajax/tellist/",
        data: telSales.uncallData,
        success: function (res) {
          var res = (typeof res == 'string') ? JSON.parse(res) : res;
          if (res.result.code == 0) {
            $("#uncall-tag .log-table-sales").html(baidu.template("uncall_tab_temp", res.result));
            $("#uncall-tag .main-foot").html(baidu.template("tel_page_foot", res.result.data));
            $("#page1_middle .main-title li:first span").text(res.result.data.queuenum);
          } else {
            xk_www.popE(res.result.message);
          }
        }
      });
    },
    searchCalled: function () {//已呼叫表格更新
      console.log(telSales.calledData);
      telSales.calledAjax && telSales.calledAjax.abort();
      telSales.calledAjax = $.ajax({
        type: "GET",
        url: "/saleajax/getcalllist/",
        data: telSales.calledData,
        success: function (res) {
          var res = (typeof res == 'string') ? JSON.parse(res) : res;
          if (res.result.code == 0) {
            $("#called-tag .log-table-sales").html(baidu.template("called_tab_temp", res.result));
            $("#called-tag .main-foot").html(baidu.template("tel_page_foot", res.result.data));
            $("#page1_middle .main-title li:last span").text(res.result.data.callnum);
          } else {
            xk_www.popE(res.result.message);
          }
        }
      });
    },
    tabPage: function (container, renderFn) {
      if (!container || !renderFn) {
        console.error("tabPage调用参数缺少");
      }
      container.on("click", ".main-foot li a", function () {
        //console.log("翻页");//此处可能出现bug调用多次；
        var total_page = container.find(".turn-page .total span").html() * 1,
          current_page = container.find(".turn-page a.active").html() * 1;
        var _this = $(this),
          result = "";
        if (_this.parent("li").hasClass("next")) {
          current_page += 1;
        } else if (_this.parent("li").hasClass("prev")) {
          current_page -= 1;
        } else if (/*!(_this.html() <= total_page) || */_this.html() == current_page) {
          return false;
        } else {//正常页码
          current_page = _this.html() * 1;
        }
        if (current_page < 1 || current_page > total_page) {
          xk_www.popE(current_page + "页码不存在");
          return false;
        }
        renderFn(current_page);//渲染传进来的渲染函数
        if (current_page > 1) {
          container.find(".main-foot .prev").removeClass("dn");
        } else {
          container.find(".main-foot .prev").addClass("dn");
        }
        if (current_page < total_page) {
          container.find(".main-foot .next").removeClass("dn");
        } else {
          container.find(".main-foot .next").addClass("dn");
        }
        if (total_page <= 5) {
          container.find(".turn-page .page a").each(function () {
            if ($(this).html() == current_page) {
              $(this).addClass("active")
            } else {
              $(this).removeClass("active")
            }
          });
          return false;
        }
        var forPage = function (i) { //循环页数函数
          if (i == current_page) {
            result += '<li class="page"><a href="javascript:;" class="active">' + current_page + '</a></li>';
          } else {
            result += '<li class="page"><a href="javascript:;">' + i + '</a></li>';
          }
        };//判断条件改循环出哪些页码
        if (current_page >= 3 && current_page <= total_page - 2) {
          for (var i = current_page - 2; i <= current_page + 2; i++) {
            forPage(i);
          }
        } else if (current_page < 3) {
          for (var i = 1; i <= 5; i++) {
            forPage(i);
          }
        } else if (current_page > total_page - 2) {
          for (var i = total_page - 4; i <= total_page; i++) {
            forPage(i);
          }
        }
        container.find(".turn-page").children(".page").remove();
        container.find(".turn-page .prev").after(result);
        return false;
      });
    },
    startWork: function (calltel, calluid) {
      /*页面滑动到顶部*/
      $(".fixed-backtop").trigger("click");
      xk_www.postData("/saleajax/telagentinfo/", {
        ajaxType: "GET",
        noLoad: false,
        citycode: xkTel.citycode,//城市编号
        uid: calluid,
        mobile: calltel
      }, function (res) {
        var uid = res.result.data.info.basicinfo.uid;
        var tel = res.result.data.info.basicinfo.mobile;
        if (uid && tel) {
          telSales.page2_top(res, uid);
        } else {
          if (window.WORK_PARAM.notdataNumber) {
            xk_www.popE(window.WORK_PARAM.notdataNumber + "来电<br />该电话未在库中");
          } else {
            xk_www.popE("经纪人：" + calluid + ",电话：" + calltel + "不存在");

          }
          return false;
        }
      });
    },
    page2_top: function (res, uid) {
      if (xkTelInfo.isCallCenter) {//?????
        $("#tel-bar").removeClass("dn")
      }
      $(".r-c").children("#page1_top,#page1_middle,#page1_bottom,#tel_work").addClass("animated fadeOut").remove();

      $(".r-c").append(baidu.template("enter_main_temp", res.result.data));//渲染经纪人信息
      $("#tel_work").removeClass("dn").addClass("animated fadeIn");
      /*使用产品滑过查看更多 标签版块滑过查看更多*/
      xk_www.getMoreProduct($('.pd-3 .box-products'), 66);
      xk_www.getMoreProduct($('.pd-4 .r-info'), 180);

      /*渲染多个销售回访*/
      var visitCon = $("#tel_work .visitCon");
      if (visitCon.length) {
        var pidData = window.WORK_PARAM.work_type == 1 ? {
          //tpye: 1,
          date: window.TEL_AGENT.queueinfo.queuedate
        } : {
          //type: 2,
          pid: window.TEL_AGENT.visitinfo.pid
        };
      }

      if (visitCon.length) {
        xk_www.postData("/saleajax/visitdetails/", $.extend({
          ajaxType: "GET",
          citycode: xkTel.citycode,
          uid: $("#tel_work").data("uid")
        }, pidData), function (res) {
          visitCon.append(baidu.template("basic_show_temp", res.result));
          telSales.configRender();//调用拜访配置渲染页面
        });
      } else {
        telSales.configRender();//调用拜访配置渲染页面
      }

      /*window.timeNumber = setInterval(function () {//通话计时器
       var cnotime = $("#cnotime");
       if (!cnotime.html().length) {
       return
       }
       var time = cnotime.html().split(":");
       time[2] -= (-1);
       if (time[2] >= 60) {
       time[2] = 0;
       time[1] -= (-1);
       if (time[1] >= 60) {
       time[1] = 0;
       time[0] -= (-1);
       }
       }
       time[2] < 10 && (time[2] = "0" + time[2] * 1);
       time[1] < 10 && (time[1] = "0" + time[1] * 1);
       time[0] < 10 && (time[0] = "0" + time[0] * 1);
       cnotime.html(time.join(":"));
       }, 1000);*/
      //!window.xkTelInfo.isCallCenter && $("#cnotime").data("time", Date.parse(new Date()) / 1000);

      /*记录呼叫时间的起始*/
      !window.xkTelInfo.isCallCenter && $("#tel_work").data("time", Date.parse(new Date()) / 1000);

      xk_www.postData("/saleajax/telagentvisitlist/", {//经纪人拜访记录
        ajaxType: "GET",
        noLoad: false,
        citycode: xkTel.citycode,//城市编号
        uid: uid,
        type: 2//代表电销
      }, function (res) {
        $(".record_4 .main-title a span").html(res.result.data.tel_total);//渲染历史记录个数
        telSales.page2_bot(res)
      });
    },
    configRender: function () {/*拜访配置渲染*/
      xk_www.postData("/saleajax/configure/", {//竞对情况
        ajaxType: "GET",
        noLoad: false
      }, function (res) {
        $(".yx>.radio-w").html(baidu.template("tel_buylevel", res.result.data));//客户意向渲染，其实现在不走配置

        setTimeout(tel_date.init_work(), 0);//开启时间插件

        $(".visitCon .item").append(baidu.template("tel_return_config", res.result.data));//多个销售拜访都要添加拜访

        $(".jdui").append(baidu.template("tel_rival", res.result.data));//竞对情况

        $(".checkCon .radio-w").append(baidu.template("degree_intention_temp", res.result.data));//回访核实

        xk_www.postData("/saleajax/getlastrival/", {//上次填写的竞对情况
          ajaxType: "GET",
          noLoad: false,
          role: 8,
          uid: $("#tel_work").data("uid")
        }, function (res) {//灌进数据
          if (!res.result.data.rivalinfo) {
            return false;
          }
          $.each(res.result.data.rivalinfo, function (i, n) {
            if (i.indexOf("putamount") != -1 || i.indexOf("lengthofuse") != -1) {//投放金额和端口使用时长
              $("input[name=" + i + "]").val(n).closest("ul").find(".tit .btn-check-no").attr("class", "btn-check-ok");
            } else if (i.indexOf("istrade") != -1) {//近期成交
              $("." + i).find("i[data-val=" + n + "]").attr("class", "btn-radio-ok").closest("ul").find(".tit .btn-check-no").attr("class", "btn-check-ok");
            } else if (i.indexOf("satisfaction") != -1) {//端口满意度
              $("." + i).find("i[data-val=" + n + "]").attr("class", "btn-radio-ok").closest("ul").find(".tit .btn-check-no").attr("class", "btn-check-ok");
              n == "2" && $("." + i).closest("ul").find(".w_cause").removeClass("dn");
            } else if (i.indexOf("reason") != -1) {//请输入不满意原因不回显 但是要显示出来
              n.length && $("." + i).parent(".w_cause").removeClass("dn").closest("ul").find(".tit .btn-check-no").attr("class", "btn-check-ok");
              //n.length && $("input[name=" + i + "]").val(n).parent(".w_cause").removeClass("dn").closest("ul").find(".tit .btn-check-no").attr("class", "btn-check-ok");
            }
          });
        });
        telSales.saveChoose();//保存电话沟通的客户选择
      });
    },
    page2_bot: function (res) {
      //拜访记录渲染
      $("#visit-table").html(baidu.template("tel_visited_record", res.result.data));

      //翻页渲染
      $(".c_record .main-foot").html(baidu.template("tel_page_foot", res.result.data));

      //调用翻页js绑定
      telSales.tabPage($("#tel_work .record_4"), function (currp) {
        xk_www.postData("/saleajax/telagentvisitlist/", {
          ajaxType: "GET",
          noLoad: true,
          citycode: xkTel.citycode,//城市编号
          uid: $("#tel_work").data("uid"),
          currpage: currp
        }, function (res) {
          $("#visit-table").html(baidu.template("tel_visited_record", res.result.data));
        });
      });
    },
    saveChoose: function () {//此处需要处理，去掉沟通详情，新增回访详情
      $(".yx .radio-w").on("click", "span", function () {//预约情况
        var radio = $(this).children("i");
        if (radio.hasClass('disable')) {
          return;
        }
        if (radio.hasClass("btn-radio-no")) {
          radio.addClass("btn-radio-ok").removeClass("btn-radio-no").parent("span").siblings("span").children(".btn-radio-ok").removeClass("btn-radio-ok").addClass("btn-radio-no");

          if ($(this).data("extra") && $(this).data("extra").indexOf("sugtime") != -1) {
            $(".yx .times").removeClass("dn");
            if ($(this).data("val") == 3) {
              $(".yx .times .date-box").removeClass("dn");
              $(".yx .times .tit").eq(1).removeClass("dn").siblings(".tit").addClass("dn");
            } else {
              $(".yx .times .date-box").removeClass("dn");
              $(".yx .times .tit").eq(0).removeClass("dn").siblings(".tit").addClass("dn");
            }
          } else {
            $(".yx .times").addClass("dn");
          }

          if ($(this).data("extra") && $(this).data("extra").indexOf("noreason") != -1) {
            $(".yx .tel_nointentionreason").removeClass("dn");
          } else {
            $(".yx .tel_nointentionreason").addClass("dn");
          }

          if ($(this).data("extra") === "notconn") {
            $(".notconn_item").removeClass("dn");
          } else {
            $(".notconn_item").addClass("dn");
          }

          if ($(this).data("hide") == 1) {
            $(".visitCon,.jdui,.checkCon").addClass("dn");
          } else {
            $(".visitCon,.jdui,.checkCon").removeClass("dn");
          }
        } else {
          radio.removeClass("btn-radio-ok").addClass("btn-radio-no");
          $(".yx .times").addClass("dn");
          $(".yx .tel_nointentionreason").addClass("dn");
          $(".notconn_item").addClass("dn");
          $(".visitCon,.jdui,.checkCon").removeClass("dn");
        }
        return false;
      });//客户意向

      /*未接通*/
      $(".notconn_item").on("click", ".btn-radio-no", function () {
        $(".notconn_item").find(".btn-radio-ok").attr("class", "btn-radio-no");
        $(this).attr("class", "btn-radio-ok");
      });

      //竞对情况
      $(".jdui").on("click", "i", function () {
        if ($(this).hasClass("btn-check-no")) {
          $(this).addClass("btn-check-ok").removeClass("btn-check-no");

        } else if ($(this).hasClass("btn-check-ok")) {
          $(this).removeClass("btn-check-ok").addClass("btn-check-no");

        } else if ($(this).hasClass("btn-check")) {
          $(this).attr("class", "btn-checked");

          $(this).siblings("input").removeAttr("disabled");//不满意原因其他
        } else if ($(this).hasClass("btn-checked")) {
          $(this).attr("class", "btn-check");

          $(this).siblings("input").attr("disabled", "disabled");//不满意原因其他
        }

      }).on("click", "span[class$=istrade] i", function () {
        if ($(this).hasClass("btn-radio-no")) {
          $(this).attr("class", "btn-radio-ok").siblings(".btn-radio-ok").attr("class", "btn-radio-no");
        }
      }).on("click", "span[class$=satisfaction] i", function () {
        if ($(this).hasClass("btn-radio-no")) {
          $(this).index() == 1 ? $(this).closest("li").next("li.w_cause").removeClass("dn") : $(this).closest("li").next("li.w_cause").addClass("dn");
          $(this).attr("class", "btn-radio-ok").siblings(".btn-radio-ok").attr("class", "btn-radio-no");
        }
      });//竞对情况

      /*回访详情*/
      $(".visitCon .config_check i").on("click", function () {
        if ($(this).hasClass("btn-radio-no")) {
          $(this).attr("class", "btn-radio-ok").siblings(".btn-radio-ok").attr("class", "btn-radio-no");
        }
        //start 如果是回访是否面见选项
        if ($(this).parent(".config_check").data("name") != "tomeet") {
          return false;
        }
        if ($(this).data("val") == "2") {
          $(this).closest("div.item").find(".groupCon li").addClass("dn");
          $(this).closest("li").removeClass("dn");
        } else {
          $(this).closest("div.item").find(".groupCon li").removeClass("dn");
          $(this).closest("li").removeClass("dn");
        }
        //End
      });

      /*核实意向*/
      $(".checkCon").on("click", ".radio-w i", function () {
        if ($(this).hasClass("btn-radio-no")) {
          $(this).closest(".radio-w").find(".btn-radio-ok").attr("class", "btn-radio-no");
          $(this).attr("class", "btn-radio-ok");
        } else {
          return false;
        }
      });

      /*勾选短信*/
      $("#msg-sms i").on("click", function () {
        if ($(this).hasClass("btn-check-no")) {
          if (!$.trim($("#remark").val()).length) {
            xk_www.popE("短信发送内容不能为空，请填写详细描述！")
            return false
          }
          $(this).attr("class", "btn-check-ok")
        } else {
          $(this).attr("class", "btn-check-ok");
        }
      });

      //保存
      if (window.xkTelInfo.isCallCenter) {
        $(".btn-item").on("click", ".success-btn", function () {
          if ($(this).data("type") == "finish") {
            telSales.pubSave(true);
          } else if ($(this).data("type") == "nextone") {
            telSales.pubSave();
          } else {
            xk_www.popE("提交方式非法！")
          }
          return false;
        });
      } else {
        $(".btn-item").on("click", "div", function () {
          if ($(this).data("type") == "cancel") {
            //刷新或者init()
            window.WORK_PARAM.callfailed = null;//呼叫失败

            $(".r-c").children("#page1_top,#page1_middle,#page1_bottom,#tel_work").remove();
            $(".r-c").append('<div id="page1_top"></div><div id="page1_middle"></div><div id="page1_bottom"></div>');

            telSales.init(true);
            return false;
          }
          /*是否失败根据是否选择未接通按钮*/
          window.WORK_PARAM.callfailed = $(".yx .radio-w .btn-radio-ok").parent("span").data("extra") == "notconn" ? 1 : null;

          if ($(this).data("type") == "finish") {
            telSales.pubSave(true);
          } else if ($(this).data("type") == "nextone") {
            telSales.pubSave();
          } else {
            xk_www.popE("提交方式非法！")
          }

          return false;
        });
      }
    },
    pubSave: function (exit) {
      var isOk = true,
        pubData = {};
      var custSpan = $('.yx .radio-w').find('.btn-radio-ok').parent("span");
      var cust = custSpan.data('val');//电销意向
      pubData.customerintention = cust;//	电销客户意向:可面见 无面见意向 未接通 离职 改行
      /*通过判断 呼叫失败未失败 或者是 沟通信息没隐藏 来判断要传参*/
      if (!window.WORK_PARAM.callfailed && custSpan.data("hide") != 1) {
        var custType = custSpan.data("extra");//额外带参
        /*if (!cust) {
         xk_www.popE("预约情况必须选择");
         return false;
         }*/
        var sugtime = $(".yx .times #datePicker").html();
        if (custType && custType.indexOf("sugtime") != 1 && sugtime) {
          pubData.suggeststoretime = sugtime;//建议到店时间二选一
        }

        if (custType && custType.indexOf("noreason") != 1) {
          pubData.tel_nointentionreason = $("#tel_nointentionreason").val();
        }

        //通过【首次邀约】【指派邀约】【临时指派】队列进入时，【预约 情况】为【必填】（未填提示文案：“请填写预约情况选项”）
        if (window.WORK_PARAM.work_type == 1 && (window.TEL_AGENT.queueinfo.is_firstcall == 1 || window.TEL_AGENT.queueinfo.is_tempassign == 1) && !$(".yx .radio-w .btn-radio-ok").length) {
          xk_www.popE("请填写预约情况选项");
          return false
        }

        //只有电销通过【回访核实】队列入口进入时，该字段为【必填】，通过呼出列表【呼出】时，该字段【选填】；
        if (window.WORK_PARAM.work_type == 1 && (window.TEL_AGENT.queueinfo.is_telsalevisit == 1)) {
          var tomeetLength = $(".visitCon .groupCon .config_check[data-name=tomeet]").length;
          var tomeetOkLength = $(".visitCon .groupCon .config_check[data-name=tomeet] .btn-radio-ok").length;
          if (tomeetLength && (tomeetLength != tomeetOkLength)) {
            xk_www.popE("请填写销售是否面见选项");
            return false;
          }
        }

        var selectedJd = $('.jdui>ul>.tit .btn-check-ok');//已选竞对
        selectedJd.each(function () {
          var list = $(this).closest("ul"),
            Jdname = $(this).parent("span").text();
          var putamount = list.find('[name$=putamount]');
          /*if (!putamount.val()) {
            isOk = false;
            xk_www.popE(Jdname + '投放金额为空');
            return false;
          }*/
          if (!/^\d*$/.test(list.find('[name$=putamount]').val())) {
            isOk = false;
            xk_www.popE(Jdname + '投放金额不为数字');
            return false;
          }
          pubData[putamount.attr("name")] = putamount.val();
          var istrade = list.find('[class$=istrade]');
          if (!istrade.find('.btn-radio-ok').length) {
            isOk = false;
            xk_www.popE(Jdname + '近期成交未选择');
            return false;
          }
          pubData[istrade.attr("class")] = istrade.find('.btn-radio-ok').data("val");
          var lengthofuse = list.find('[name$=lengthofuse]');
          /*if (!lengthofuse.val()) {
            isOk = false;
            xk_www.popE(Jdname + '端口使用时长为空');
            return false;
          }*/
          if (!/^\d*$/.test(list.find('[name$=lengthofuse]').val())) {
            isOk = false;
            xk_www.popE(Jdname + '端口使用时长不为数字');
            return false;
          }
          pubData[lengthofuse.attr("name")] = lengthofuse.val();
          var satisfaction = list.find('[class$=satisfaction]');
          if (!satisfaction.find('.btn-radio-ok').length) {
            isOk = false;
            xk_www.popE(Jdname + '端口满意度未选择');
            return false;
          } else {
            if (satisfaction.find('.btn-radio-ok').data("val") == 2) {
              var wcauseUl = list.find(".w_cause ul"),
                noreasonArr = [];
              wcauseUl.find(".btn-checked").each(function () {
                if ($(this).siblings("input").length) {
                  noreasonArr.push($(this).siblings("input").val())
                } else {
                  noreasonArr.push($(this).parent("li").text())
                }
              })
              pubData[wcauseUl.attr("class")] = noreasonArr.join("；");
              //console.log(pubData[wcauseUl.attr("class")]);
              if (!pubData[wcauseUl.attr("class")]) {
                isOk = false;
                xk_www.popE(Jdname + '端口不满意原因未填写');
                return false;
              }
            }

          }
          pubData[satisfaction.attr("class")] = satisfaction.find('.btn-radio-ok').data("val");
        });
        if (!isOk) {
          return false;
        }
        /*遍历多个销售的回访详情*/
        var items = $(".visitCon .item.line");
        var ReturnVisit = {};
        for (var i = 0; i < items.length; i++) {

          items.eq(i).find("li select").each(function () {
            var that = $(this),
              val = that.val();
            that.closest("li").hasClass("dn") && (val = null);
            if (i == 0) {
              ReturnVisit[that.attr("name")] = [];
            }
            ReturnVisit[that.attr("name")].push(val);
          });
          items.eq(i).find("li .config_check").each(function () {
            var that = $(this),
              val = that.find(".btn-radio-ok").data("val");
            that.closest("li").hasClass("dn") && (val = null);
            if (i == 0) {
              ReturnVisit[that.data("name")] = [];
            }
            ReturnVisit[that.data("name")].push(val);
          });
        }

        $.each(ReturnVisit, function (i, n) {
          pubData[i] = n.join(",");
        });


        /*核实意向*/
        var buylevelRadio = $(".checkCon .radio-w .btn-radio-ok");
        if (buylevelRadio.length) {
          pubData.buylevel = buylevelRadio.data("val")
        } else {
          xk_www.popE("核实意向的意向程度为必填项")
          return false
        }

      } else {

        /*进入这里可能是失败可能是信息隐藏*/
        if (window.WORK_PARAM.callfailed) {
          pubData.callfailed = window.WORK_PARAM.callfailed;
          /*接通失败必须填选未接通原因*/
          var notconn_item = $(".notconn_item .btn-radio-ok");
          pubData.notconn_item = notconn_item.data("val");
          if (!notconn_item.length || !pubData.notconn_item) {
            xk_www.popE("请填选未接通原因");
            return false;
          }
        }

      }

      /*传递详细描述*/
      var remark = $('#remark').val();
      $.trim(remark) && (pubData.remark = remark);
      if (pubData.remark && pubData.remark.length > 100) {
        xk_www.popE('详细描述不能大于100字');
        return false;
      }

      /*传递是否短信提醒*/
      if ($("#msg-sms i").hasClass("btn-check-ok")) {
        if (!$.trim(remark)) {
          xk_www.popE("短信发送内容不能为空，请填写详细描述！");
          return false;
        }
        pubData.sms = 1
      }

      /*var status = $("#payment_status").data("status");//付费还是免费
       if (status == 0) {
       pubData.visittype = 1
       } else if (status == 1) {
       pubData.visittype = 2
       } else {
       xk_www.popE("客户状态非法！");
       return false;
       }*/

      /*传递拜访标签*/
      if (window.WORK_PARAM.calltype == 1) {//接到电话呼入时
        pubData.visitlabel = 11;

        if (window.WORK_PARAM.visitlabel != 11) {
          console.error("visitlabel出了问题！")
        }

      } else {
        pubData.visitlabel = 0;
      }

      /*传递queuedate和condition*/
      if (window.WORK_PARAM.work_type == 1) {//待呼才有传递queuedate
        pubData.queuedate = window.TEL_AGENT.queueinfo.queuedate;
        pubData.condition = $.extend({is_work: 1}, telSales.uncallData);
      } else {
        pubData.condition = $.extend({is_call: 1}, telSales.calledData);
      }

      if (window.WORK_PARAM.calltype == 1 || window.WORK_PARAM.calltype == 2) {//传递标签
        var labelParent = window.WORK_PARAM.work_type == 1 ? window.TEL_AGENT.queueinfo : window.TEL_AGENT.visitinfo;
        pubData.is_firstcall = labelParent.is_firstcall;  //首次邀约
        pubData.is_tempassign = labelParent.is_tempassign;//临时指派
        pubData.is_telsalevisit_invite = labelParent.is_telsalevisit_invite;//回访 邀约核实
        pubData.is_telsalevisit_strange = labelParent.is_telsalevisit_strange; //回访 陌拜核实
        pubData.is_telsalevisit_self = labelParent.is_telsalevisit_self;//回访 自我安排核实
        pubData.is_notstandard = labelParent.is_notstandard; //未达标
        pubData.is_7expire = labelParent.is_7expire; //7到期
        pubData.is_7open = labelParent.is_7open;  //7开通
      }

      /*传递上次销售拜访id*/
      var pidArr = [];
      $(".visitCon .dataPid").each(function () {
        pidArr.push($(this).data("pid"));
      });
      pubData.pid = pidArr.join(",");

      $.extend(pubData, {
        citycode: window.xkTel.citycode,
        role: 8,
        uid: $("#tel_work").data("uid"),
        visitway: 3,
        calltype: window.WORK_PARAM.calltype,  //1是呼入，2是呼出
        work_type: window.WORK_PARAM.work_type  //队列类型 1:待呼,2:已呼 再次呼叫
      });
      if (!exit) {//退出
        pubData.isnext = 1;//1开始工作或再次呼叫 为1时 is_all currpage num 无效
        pubData.isnext && (window.WORK_PARAM.work_type == 2) && (pubData.condition.call_time = window.TEL_AGENT.visitinfo.call_time);//传下一个 并且呼叫列表 才上次传拜访时间
      } else {
        //window.work_type = null;//调取类型清空，防止打电话进来出错
        //window.TEL_AGENT = null;
        //window.WORK_PARAM = null;
      }
      if (!window.xkTelInfo.isCallCenter) {//是否禁用呼叫中心接口
        pubData.calltype = 2; //关闭呼叫中心的电销拜访 必定是呼出
        pubData.close = 1;
        pubData.start_time = $("#tel_work").data("time");
        pubData.end_time = Date.parse(new Date()) / 1000;
      }
      console.log(pubData);

      function postVisit() {
        xk_www.showLoad();
        pubData.condition = JSON.stringify(pubData.condition);//转json字符串
        $.post("/saleajax/visit", pubData, function (res) {
          var res = (typeof res == 'string') ? JSON.parse(res) : res;
          if (res.result.code == 0) {
            xk_www.hideLoad();
            window.WORK_PARAM.callfailed = null;//呼叫失败
            if (exit) {//保存并退出
              window.TEL_AGENT = null;
              window.WORK_PARAM = null;
              $(".r-c").children("#page1_top,#page1_middle,#page1_bottom,#tel_work").remove();
              $(".r-c").append('<div id="page1_top"></div><div id="page1_middle"></div><div id="page1_bottom"></div>');
              telSales.init(true);
              window.xkTelInfo.isCallCenter && doStatus();//置闲
            } else {
              if (typeof (res.result.data.nextinfo) == "object") {//有下一个
                var uid = res.result.data.nextinfo.uid;
                var tel = res.result.data.nextinfo.basicinfo.mobile;

                if (!uid || !tel) {
                  xk_www.popE("呼出参数不全");
                  return false;
                }

                window.TEL_AGENT = res.result.data.nextinfo;
                window.WORK_PARAM = $.extend({}, {
                  work_type: window.WORK_PARAM.work_type,//待呼队列，还是已呼队列
                  calltype: 2  //呼出
                });

                if (window.xkTelInfo.isCallCenter) {
                  callout(tel, uid);
                } else {
                  telSales.startWork(tel, uid);
                }

              } else {//无下一个

                window.TEL_AGENT = null;
                window.WORK_PARAM = null;
                var title = pubData.isnext ? "无下一个，返回列表页" : "保存成功，返回列表页";
                xk_www.popE(title, function () {
                  $(".r-c").children("#page1_top,#page1_middle,#page1_bottom,#tel_work").remove();
                  $(".r-c").append('<div id="page1_top"></div><div id="page1_middle"></div><div id="page1_bottom"></div>');
                  telSales.init(true);
                  window.xkTelInfo.isCallCenter && doStatus();//置闲
                })

              }
            }
          } else {
            xk_www.hideLoad();
            if (res.result.code == -44) {
              console.error("保存拜访接口发出了get请求");
              postVisit();
            } else {
              xk_www.popE(res.result.message)
            }
          }
        })
      }

      isOk && postVisit();
      /*post结束*/
    }
  };
}
window.onload = function () {
  /*已呼出明细*/
  if ($('#agent-table').length) {
    return false;
  }
  telSales.init();
  if (!window.xkTelInfo.isCallCenter) {
    window.onbeforeunload = function () {
      if ($("#tel_work").length) {
        return "若刷新本页面，将会丢失您填写的内容，通话时长将会重新计算，确认刷新吗？";
      }
    }
  }
}