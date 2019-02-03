Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}




$(document).ready(function () {
  
  
    var timeOut = "";
    var phoneNumber = "";
    $(document).click(function () {

       var eventClass =  $(event.target).attr('class');
       if (eventClass == "_1JVSX") {

           var downloadUrl = $(event.target).attr("src");
          
           var dateAsName = getImageTime(event.target);

           var dateAsName = getOnlyNumber(phoneNumber) + "_" + getImageTime($(event.target)) + "_1";//Date.now().toString() + index.toString();

           downloadURI(downloadUrl, dateAsName + ".png");

           return;
       }


   



        var Up = $(event.target).closest('._2wP_Y');
        var MainRubricaClass = $(Up).attr("class");
        if (MainRubricaClass != "_2wP_Y") return;

        var MainData =  $(Up).find('._25Ooe');
       
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

                  $(ImageArray).each(function (index) {

                      if (index >= ImageArray.length - eval(NoRead)) {
                       
                        //  alert($(this).attr("src"));
                         // alert(index);
                          var downloadUrl = $(this).attr("src");

                          var dateAsName =getOnlyNumber(phoneNumber) +"_"+ getImageTime(this)+"_" + index;//Date.now().toString() + index.toString();
                        

                       //   alert(dateAsName)
                        
                          downloadURI(downloadUrl, dateAsName + ".png");
                          //  console.log(index + ": " + $(this).text());
                      }
                  });


                  alert("הכל בוצע בהצלחה!");


                //  clearInterval(interId);

                  //alert(downloadUrl);
                  //chrome.downloads.download({
                  //    url: downloadUrl,
                  //    filename: 'my-image-again.png',
                  //    conflictAction: 'uniquify',
                  //    saveAs: true
                  //}, alert());
               //  download($("._1JVSX:last").attr("src"), "image2.jpg","");
                 // alert($("._1JVSX:last").attr("src"));
              }, 10000)
       } 

       // alert($(Up).attr("class"));
       // alert($(Down).attr("class"));
        //  console.log(event);
        //var fff = $(event.target).attr("class");
              //
       // alert(fff);
       

        
       //   event.preventDefault() 

        //  event.stopImmediatePropagation();
       // alert(fff);

      //  var Phone = $(event.target);
       
     //  alert($(Phone).parent().find("span[class='_1wjpf']").text());
    //   

       
   
        //if (fff == "_25Ooe") {

        //     //  alert($("._1JVSX:last").attr("src"));
        //     //  downloadURI($("._1JVSX:last").attr("src"), "helloWorld.png");
        //}
        //   alert($("img:last").parent().html());_1JVSX

      // alert(document.getElementsByClassName("_1JVSX")[0].outerHTML);
    });

    //var event = new Event('click');
    ////    // Listen for the event.
    //document.addEventListener('click', function (e) { ReadWhatsappData() }, true);
    //document.dispatchEvent(event);
    ////setTimeout(function () {

    ////    $("span[class='_1wjpf']").click();// מספר הטלפון


    ////}, 100);

   


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
    imageDateTime += "_" + timezone.replace(':',"_");

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

        if (dayInWeek >= 4)
        {
            diffDays = dayInWeek - 4;
        }
        else
        {
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
            diffDays = (7 + dayInWeek) -6;
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

    return res.replace('/', '_').replace('/','_');
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


function ReadWhatsappData() {
   
   
  
   
    //try {
    //   // document.getElementsByClassName("_2wP_Y")[0].click();

    //    //var eventFocus = new Event('focus');
    //    //var eventClick = new Event('click');
    //    //document.getElementsById("pane-side")[0].dispatchEvent(eventFocus);
    //    //document.getElementsByClassName("_2wP_Y")[0].dispatchEvent(eventClick);

    //    var className = "_1wjpf";
    //    //var event = new Event('focus');
    //    var eventc = new Event('click');
    //    // Listen for the event.
    //   // document.getElementsByClassName(className)[0].addEventListener('focus', function (e) { }, true);
    //    document.getElementsByClassName(className)[0].addEventListener('click', function (e) { });
    //    // Dispatch the event.
    //   // document.getElementsByClassName(className)[0].dispatchEvent(event);
    //    document.getElementsByClassName(className)[0].dispatchEvent(eventc);
    //}
    //catch (err) {
    //  // alert(err.message);
    //}

    //// alert($(".OUeyt").html());
    //// alert($("span[class='_1wjpf']").text());
    //var allPhones = $("span[class='_1wjpf']");
    //$(allPhones).each(function (index) {

    //    //  alert($(this).text());
    //    //  alert($(this).find("span[class='OUeyt']"));

    //});

   // $(document).css("pointer-events", "all");
     //$("div").removeAttr("style");
   // alert($("span[class='OUeyt']:last").text());
  
    
   // alert($("._1wjpf:first").html());


    $("._2wP_Y:first").css({
        "border-color": "#C1E0FF",
        "border-width":"4px", 
        "border-style": "solid"
    });


    //var eventFocus = new Event('focus');
    //var eventClick = new Event('click');
    //document.querySelectorAll('._2wP_Y')[0].dispatchEvent(eventFocus);
    //document.querySelectorAll('._2wP_Y')[0].dispatchEvent(eventClick);

    //document.querySelectorAll('._2wP_Y')[0].addEventListener('click', function (e) {
    //    var event = new CustomEvent('custom_event', {
    //        bubbles: true
    //    });
    //    this.dispatchEvent(event);
    //});

    //$(document).on('custom_event', '._2wP_Y', function () {
    //    alert('Custom event captured [selector filter]');
    //});

    //$('._2wP_Y').on('custom_event', function () {
    //    alert('Custom event captured');
    //});




    //  setTimeout(function () {
   // var style = css($(".OUeyt:first"));

    //alert(style);
    //$(".OUeyt:first").click(function () { alert($(this).css()); return false; });
  //  $("div,span").removeAttr("style");

   // $("div,span").css("user-select", "");
   // $("div,span").css("pointer-events", "");

    
   // $(".OUeyt:first").css("user-select", "all");
    //alert();
   // $("div._2EXPL._1f1zm").select();
  //  $("._2wP_Y:first").dblclick();
   // $("._2wP_Y:first").dblclick();
   // }, 200);
   // $("._1wjpf:first")[0].click();
    //  $(rrr).parent().removeAttr("style");


    
    var allNoread = $("span[class='OUeyt']");
    $(allNoread).each(function (index) {
       //alert($(this).text());//כמות ההודעות
       var Phone = $(this).parent().parent().parent().parent().prev();
      // alert($(Phone).find("span[class='_1wjpf']").text());// מספר הטלפון
       
    });




    //alert($("#spButtonText").text());.parents() _1wjpf _3NFp9


}
