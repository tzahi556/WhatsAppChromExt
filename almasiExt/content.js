


$(document).ready(function () {
    //debugger


    //$.get();
    //audioElement.addEventListener("load", function () {
    //    audioElement.play();
    //}, true);




   // var LastMsgId = "0";

    setInterval(function () {

        var PushAlertsLink = $("#PushAlertContent2 a:first-child").attr("href");
        var MsgId = getUrlParameter(PushAlertsLink, "MsgId");
        var url = window.location.href;

        if (LastMsgId == "0") {
            chrome.storage.sync.set({ 'MsgId': MsgId }, function () { });
           
        }

        chrome.storage.sync.get(['MsgId'], function (result) {
            if (url.indexOf("MsgId") == -1 && result.MsgId != MsgId) {
                generator = window.open(PushAlertsLink, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=700,height=400");
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('src', 'http://sganit.co.il/AlmasiMp3/Industrial.mp3');
                audioElement.setAttribute('autoplay', 'autoplay');
                $.get();
                //audioElement.load()
                audioElement.play();


                chrome.storage.sync.set({ 'MsgId': MsgId }, function () { });


            }


        }, 30000)

    });


    $(document).click(function () {


    });



});


var getUrlParameter = function getUrlParameter(hyperLink, sParam) {
    var sPageURL = hyperLink,//window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
