

var bankUserName = "";
var bankPassword = "";
var MainData = "";
$(document).ready(function () {
  
    //$("#uid").click().val("22222");
    //$("#uid")
   

    // alert(window.parent.location);
    
  

    chrome.storage.sync.get(['gohBankData'], function (result) {
     
        //  alert(result.gohBankData.length);
        //try{
        //    $("#uid").click().val("22222");
        //}catch(e){
        //    alert(e.message);

        //}
     
        //  
       
        // בכדי שלא יחזור שוב אחרי הפעם הראשונה
        if (result.gohBankData.length == 0) return;
        var bankData = [];
        chrome.storage.sync.set({ 'gohBankData': bankData }, function () { });




        var bankId = result.gohBankData[2];
        MainData = bankId;
        if (bankId == "20") {
            $(result.gohBankData[3][0]).val(result.gohBankData[0]);
            $(result.gohBankData[3][1]).val(result.gohBankData[1]);

            setTimeout(function () {
                $(result.gohBankData[3][2])[0].click();
            }, 1000)
        }

        if (bankId == "10") {
            $(result.gohBankData[3][0]).click().val(result.gohBankData[0]);
            $(result.gohBankData[3][1]).click().val(result.gohBankData[1]);
            $(result.gohBankData[3][2])[0].click();
            
            //setTimeout(function () {
            //    $(result.gohBankData[3][2])[0].click();
            //}, 1000)
        }

       
    });
 
    
    //chrome.storage.sync.get(['gohUserName'], function (result) {
       

    //alert(MainData);
   
    //});

    //chrome.storage.sync.get(['gohPassword'], function (result) {
    //    $("#ctl00_PlaceHolderLogin_ctl00_tbPassword").val(result.gohPassword);
    //    setTimeout(function () {
    //        $("#ctl00_PlaceHolderLogin_ctl00_Enter")[0].click();
    //    }, 1000)
    //});

   
    $(document).click(function () {
       

        try{

        var eventId = $(event.target).attr('id');
        if (eventId == "dvOpenBankLink" || eventId == "dvOpenBankImg") {


            bankUserName = $("#txtBankUserName").val();
            bankPassword = $("#txtBankPassword").val();
            bankId = eval($("#STypeBanks").val());
         
            var bankData = [];

            bankData.push(bankUserName);
            bankData.push(bankPassword);
            bankData.push(bankId);
           
            var elementsIds = getBankElementIds(bankId);
            bankData.push(elementsIds);
            // מעיד שפעם ראשונה
            bankData.push(1);

            chrome.storage.sync.set({ 'gohBankData': bankData}, function () { });

            //  chrome.storage.sync.set({ 'gohUserName': bankUserName, 'gohPassword': bankPassword, 'gohBankId': bankId }, function () { });
           


            
            // chrome.storage.sync.set({ 'gohPassword': bankPassword }, function () { });
           
        }
        } catch (e) {
           // alert(e.message);

        }
     
    });

    

});


function getBankElementIds(bankId) {
    var elemIds = [];

   

    if (bankId == "20") {

        elemIds.push("#ctl00_PlaceHolderLogin_ctl00_tbUserName");
        elemIds.push("#ctl00_PlaceHolderLogin_ctl00_tbPassword");
        elemIds.push("#ctl00_PlaceHolderLogin_ctl00_Enter");

    }

    if (bankId == "10") {

        elemIds.push("#uid");
        elemIds.push("#password");
        elemIds.push("#enter");

    }

    return elemIds;


}