﻿

//var bankUserName = "";
//var bankPassword = "";
//var MainData = "";

var ArrayChecks = [];
$(document).ready(function () {

    chrome.storage.sync.get(['bankUserName'], function (result) {


        chrome.storage.sync.get(['bankId'], function (resultBankId) {

            if (result.bankUserName) {
                setTimeout(function () {
                    if (resultBankId.bankId == 20) {
                        $("#ctl00_PlaceHolderLogin_ctl00_tbUserName").val("").val(result.bankUserName);
                    }
                    if (resultBankId.bankId == 10) {

                        $("#uid")[0].click();
                        $("#uid").val("").val(result.bankUserName);
                    }
                    //פועלים
                    if (resultBankId.bankId == 12) {

                        $("#userID").val("").val(result.bankUserName);
                    }

                    //דיסקונט
                    if (resultBankId.bankId == 11) {

                        $("#tzId").val("").val(result.bankUserName);
                    }


                }, 1000)


            }

        });
    });

    chrome.storage.sync.get(['bankPassword'], function (result) {

        chrome.storage.sync.get(['bankId'], function (resultBankId) {
            if (result.bankPassword) {

                setTimeout(function () {
                    if (resultBankId.bankId == 20) {
                        $("#ctl00_PlaceHolderLogin_ctl00_tbPassword").val("").val(result.bankPassword);
                    }
                    if (resultBankId.bankId == 10) {
                        $("#password")[0].click();
                        $("#password").val("").val(result.bankPassword);
                    }
                    if (resultBankId.bankId == 12) {
                        $("#userPassword").val("").val(result.bankPassword);
                    }
                    if (resultBankId.bankId == 11) {
                        $("#tzPassword").val("").val(result.bankPassword);
                    }

                    setTimeout(function () {
                        if (resultBankId.bankId == 20) {
                            $("#ctl00_PlaceHolderLogin_ctl00_Enter")[0].click();
                        }
                        if (resultBankId.bankId == 10) {
                            var Notenter = $("#errHeader").text();
                            if (!Notenter) $("#enter")[0].click();
                        }
                        if (resultBankId.bankId == 12) {
                            $("#inputSend")[0].click();
                        }
                        if (resultBankId.bankId == 11) {
                            $(".sendBtn")[0].click();
                        }

                    }, 1000)

                }, 1000)
            }
        });
    });

    $(document).click(function (event) {

        var targetEle = $(event.target);

        // פועלים  הורדה צקים 
        if (location.href.includes("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/current-account/transactions") && $(targetEle) && $($(targetEle))[0].id == "main-title") {
            ArrayChecks = [];
            $("IFRAME").remove();

            var data = [];
            var dataPo = $(".icon-cell.icon.icon-ActionsChecks");//.find("span");

            $(dataPo).each(function (index) {

                if ($(this).parent().text() == " שיק ")
                    data.push($(this)[0])//.click();


            });

            // debugger
            GetCheckPoalim(0, data);




            //$(".icon-cell.icon.icon-ActionsChecks").each(function (index) {

            //    if($(this).parent().text() == " שיק ")
            //       $(this)[0].click();


            //});

            //setTimeout(function () {
            //    $("[id^='check-images-']").each(function (index) {
            //        var CheckNumber = ($(this).attr("id")).replace("check-images-", "");
            //        var Image = $(this).find("img");
            //        var ImageLink = getBase64Image(Image[0]);
            //        ArrayChecks.push({ ImageLink: ImageLink, CheckNumber: $.trim(CheckNumber) });

            //    });
            //    downloadURI(ArrayChecks, false);

            //}, 20000);

        }

        // בנקים מזרחי הורדה צקים 
       else if (location.href.includes("https://mto.mizrahi-tefahot.co.il/ngOnline/") && $(targetEle) && $($(targetEle).parent())[0].className == "sky-page-title") {
            ArrayChecks = [];

            $(".ng-scope.k-plus.link").each(function (index) {
                $(this)[0].click();

            });

            setTimeout(function () {
                $(".chequeWrapper").each(function (index) {

                    var CheckNumber = $($(".chequeDetails >div>div> div:contains('מספר שיק')")[index]).next().text();
                    var ImageLink = $($(".front")[index]).attr("src");

                    ArrayChecks.push({ ImageLink: ImageLink, CheckNumber: $.trim(CheckNumber) });

                });


                downloadURI(ArrayChecks, false);

            }, 20000);

        }

            // בנקים לאומי הורדה צקים 
        else if (location.href.includes("https://hb2.bankleumi.co.il/ebanking/SO") && location.href.includes("BusinessAccountTrx")) {

            if (targetEle[0].className == "ts-state-title") {

                ArrayChecks = [];
                var data = $(".additional-link:visible");//.find("span");
                // debugger
                GetCheckLeumi(0, data);

            }

        }

            //צקים מרכנטיל
        else if (location.href.includes("https://start.telebank.co.il/apollo/core/templates/SME") && location.href.includes("CHKVEW")) {




            if (targetEle[0].tagName == "A") {
                return;
            }

            if (targetEle[0].className == "btnClose") {


                if (ArrayChecks.length > 0)
                    downloadURI(ArrayChecks, false);
                ArrayChecks = [];
            } else {

                //  else if (targetEle[0].className != "nextArrow ng-scope" && !(targetEle[0].className).includes("prevArrow")) {
                setTimeout(function () {
                    $(".contentChecks").find("img").each(function (index) {

                        var CheckNumber = $(".popupHeaderItem:nth-child(2)").find("span").text();
                        ArrayChecks.push({ ImageLink: $(this).attr("src"), CheckNumber: CheckNumber });
                        $(".nextArrow")[0].click();


                    });
                }, 4000);

            }

            // }
        }

        else {

            //*********************************** קוד סיסמא
            try {

                var eventId = $(event.target).attr('id');
                if (eventId == "dvOpenBankLink" || eventId == "dvOpenBankImg") {


                    var bankUserName = $("#txtBankUserName").val();
                    var bankPassword = $("#txtBankPassword").val();
                    var bankId = eval($("#STypeBanks").val());

                    //alert(bankPassword);
                    //var bankData = [];

                    //bankData.push(bankUserName);
                    //bankData.push(bankPassword);
                    //bankData.push(bankId);

                    //var elementsIds = getBankElementIds(bankId);
                    //bankData.push(elementsIds);
                    //// מעיד שפעם ראשונה
                    //bankData.push(1);

                    chrome.storage.sync.set({ 'bankUserName': bankUserName }, function () { });
                    chrome.storage.sync.set({ 'bankPassword': bankPassword }, function () { });
                    chrome.storage.sync.set({ 'bankId': bankId }, function () { });
                    //setCookie('bankUserName', bankUserName,90);
                    //setCookie('bankPassword', bankPassword,90);
                    //setCookie('bankId', bankId,90);









                }
            } catch (e) {


            }

        }

    });

});


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    //img.width = img.width + 300;
    //img.height = img.height + 250;
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


function GetCheckPoalim(counter, data) {

    if (counter <= data.length) {
        setTimeout(function () {
            try {

                if (counter > 0) {
                    var element = $("[id^='check-images-']")[counter - 1];
                    var CheckNumber = ($(element).attr("id")).replace("check-images-", "");
                    var Image = $(element).find("img");
                    var ImageLink = getBase64Image(Image[0]);
                    ArrayChecks.push({ ImageLink: ImageLink, CheckNumber: $.trim(CheckNumber) });
                    
                }

                if (counter == data.length) downloadURI(ArrayChecks, false);
            } catch (e) {



            }
            counter++;

            $(data)[counter - 1].click();

            GetCheckPoalim(counter, data);
        }, 2000);
    }
}

function GetCheckLeumi(counter, data) {

    if (counter <= data.length) {
        setTimeout(function () {
            try {

                $(".item-title").each(function (index) {
                    if ($(this).text() == "מספר שיק") {
                        var CheckNumber = $(this).next().text();
                        if ($(".ts-img-responsive").length) {

                            var ImageLink = $(".ts-img-responsive").attr("src");
                            ArrayChecks.push({ ImageLink: ImageLink, CheckNumber: CheckNumber });
                        }

                    }
                });


                $("button.close-icon")[0].click();

                if (counter == data.length) downloadURI(ArrayChecks, false);
            } catch (e) {



            }
            counter++;

            $(data)[counter - 1].click();

            GetCheckLeumi(counter, data);
        }, 6000);
    }
}

function downloadURI(urlsArray, name1) {


    var str = JSON.stringify(urlsArray);
    var data = encode(str);
    var blob = new Blob([data], {
        type: 'application/octet-stream'
    });
    saveAs(blob, "data.json");

    //  $("<a />", {
    //      "download": "data.json",
    //      "href": "data:application/json," + encodeURIComponent(JSON.stringify(urlsArray))
    //  }).appendTo("body")
    //.click(function () {
    //    $(this).remove()
    //})[0].click()


}

var encode = function (s) {
    var out = [];
    for (var i = 0; i < s.length; i++) {
        out[i] = s.charCodeAt(i);
    }
    return new Uint8Array(out);
}


function getBankElementIds(bankId) {
    var elemIds = [];


    // מזרחי
    if (bankId == "20") {

        elemIds.push("#ctl00_PlaceHolderLogin_ctl00_tbUserName");
        elemIds.push("#ctl00_PlaceHolderLogin_ctl00_tbPassword");
        elemIds.push("#ctl00_PlaceHolderLogin_ctl00_Enter");

    }

    // לאומי
    if (bankId == "10") {

        elemIds.push("#uid");
        elemIds.push("#password");
        elemIds.push("#enter");

    }





    return elemIds;


}


