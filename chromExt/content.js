Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}




$(document).ready(function () {


    var timeOut = "";
    var phoneNumber = "";
    $(document).click(function () {

        var phoneNumber = $("._2UaNq._3mMX1").find("._19RFN").html();
        var eventClass = $(event.target).attr('class');

      
        //if (eventClass == "_3fmQw") {

        //    var downloadUrl = $(event.target).attr("src");
         
        //    var dateAsName = getOnlyNumber(phoneNumber) + "_25_1_2019_11_51_9999";//Date.now().toString() + index.toString();

        //    downloadURI(downloadUrl, dateAsName + ".png");

        //    return;
        //}

        // במידה ומסמן את ההודעה
        if (eventClass == "_3wpnE") {

            if (!$.trim(getOnlyNumber(phoneNumber))) {
                alert("לא ניתן להעלות תמונות מאחר וצריך אנשי קשר עם מספרים ולא שמות...");
                return;
            }

            var dateAsName = getOnlyNumber(phoneNumber) + "_25_1_2019_11_51_9999";
            var parentNode = $(event.target).closest('.FTBzM');
            var ImageLink = $(parentNode).find('img').attr("src");
            
            if (ImageLink)
                 downloadURI(ImageLink, dateAsName + ".png");

        }
       


        return;


        var Up = $(event.target).closest('._2wP_Y');
        var MainRubricaClass = $(Up).attr("class");
        if (MainRubricaClass != "_2wP_Y") return;
        var MainData = $(Up).find('._25Ooe');

        if (MainData) {


            phoneNumber = $(MainData).parent().find("span[class='_1wjpf']").text();
            var NoRead = $(MainData).parent().next().find("span[class='OUeyt']").text();


            //  לא לשכוח לשנות בכרום שלא לשאול לפני הורדה
            clearTimeout(timeOut);

            if (!NoRead) {
                alert("אין הודעות חדשות למספר - " + phoneNumber);
                return;
            }
            //  alert(phoneNumber);
            timeOut = setTimeout(function () {

                var ImageArray = $("._1JVSX");

                //alert(ImageArray.length);

                $(ImageArray).each(function (index) {
                    //  alert($(this).attr("src"));
                    if (index >= ImageArray.length - eval(NoRead)) {


                        var downloadUrl = $(this).attr("src");

                        var dateAsName = getOnlyNumber(phoneNumber) + "_" + getImageTime(this) + "_" + index;//Date.now().toString() + index.toString();

                        downloadURI(downloadUrl, dateAsName + ".png");
                    }
                });

                alert("הכל בוצע בהצלחה!");


            }, NoRead * 2 * 1000 + 2000)
        }


    });



});

function getDayByCurrentFormat(day) {

    var dd = day.getDate();
    var mm = day.getMonth() + 1; //January is 0!
    //if (dd < 10) {
    //    dd = '0' + dd;
    //}
    //if (mm < 10) {
    //    mm = '0' + mm;
    //}


    var yyyy = day.getFullYear();
    var resday = dd + '/' + mm + '/' + yyyy;

    //  alert(today);
    return resday;

}

function getImageTime(Obj) {

    var imageDateTime = "";
    var imageParent = $(Obj).closest('.vW7d1');
    var date = ($(imageParent).prevAll("._3rjxZ")).find("[dir='auto']");//.find("span[dir]");

    $(date).each(function (index) {
        if (index == date.length - 1)
            imageDateTime = getFromWhatsappDate($(this).text());

    });


    var timezone = ($(imageParent).find("._3EFt_")).text();
    imageDateTime += "_" + timezone.replace(':', "_");

    return imageDateTime;
}

function getFromWhatsappDate(datestring) {

    var today = new Date();
    var dayInWeek = today.getDay() + 1;


    var res = datestring;
    if (datestring == "היום") res = getDayByCurrentFormat(today);
    if (datestring == "אתמול") res = getDayByCurrentFormat(today.addDays(-1));

    var diffDays = 0;

    if (datestring == "ראשון") {

        if (dayInWeek >= 1) {
            diffDays = dayInWeek - 1;
        }
        else {
            diffDays = (7 + dayInWeek) - 1;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }
    if (datestring == "שני") {

        if (dayInWeek >= 2) {
            diffDays = dayInWeek - 2;
        }
        else {
            diffDays = (7 + dayInWeek) - 2;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }
    if (datestring == "שלישי") {

        if (dayInWeek >= 3) {
            diffDays = dayInWeek - 3;
        }
        else {
            diffDays = (7 + dayInWeek) - 3;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }
    if (datestring == "רביעי") {

        if (dayInWeek >= 4) {
            diffDays = dayInWeek - 4;
        }
        else {
            diffDays = (7 + dayInWeek) - 4;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }
    if (datestring == "חמישי") {

        if (dayInWeek >= 5) {
            diffDays = dayInWeek - 5;
        }
        else {
            diffDays = (7 + dayInWeek) - 5;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }
    if (datestring == "שישי") {

        if (dayInWeek >= 6) {
            diffDays = dayInWeek - 6;
        }
        else {
            diffDays = (7 + dayInWeek) - 6;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }
    if (datestring == "שבת") {

        if (dayInWeek >= 7) {
            diffDays = dayInWeek - 7;
        }
        else {
            diffDays = (7 + dayInWeek) - 7;
        }

        res = getDayByCurrentFormat(today.addDays(-1 * diffDays));
    }





    //if (datestring == "שלישי") res = getDayByCurrentFormat(today.addDays(-3));
    //if (datestring == "שני") res = getDayByCurrentFormat(today.addDays(-4));
    //if (datestring == "ראשון") res = getDayByCurrentFormat(today.addDays(-5));

    return res.replace('/', '_').replace('/', '_');
}

function getOnlyNumber(str) {
    return str.replace(/\D/g, '');
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

