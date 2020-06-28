function postProvents(stockCode, startDate, endDate, callbackSuccess, callbackErrror) {

    var url = URL_PROVENTS_2
        .replace("{STOCK_CODE}", "PETR4")
        .replace("{START_DATE}", "2019-01-01")
        .replace("{END_DATE}", "2019-12-30")


        // fetch('http://www.google.com', {
        //     headers: new Headers({
        //       'Content-type': 'application/json'
        //     })
        //   })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data)
        //   })
        //   .catch(error => console.error(error))

        // function reqListener () {
        //     console.log(this.responseText);
        //   }
          
        //   var oReq = new XMLHttpRequest();
        //   oReq.onload = reqListener;
        //   oReq.open("get", "http://www.google.com", true);
        //   oReq.setRequestHeader('Access-Control-Allow-Origin','http://www.google.com');
        //   oReq.setRequestHeader('Content-type','application/json');
        //   oReq.setRequestHeader('Access-Control-Allow-Methods','GET');
        //   oReq.send();

        $.ajax({
            url : 'https://www.google.com/',
            type : 'GET',
            headers: { "Accept": "application/json", "Access-Control-Allow-Origin": "*"},
            // contentType: "application/json",
            // dataType: "text",
            // headers: {
            // "Access-Control-Allow-Origin": "*",
            // "my-second-header": "second value"
            // },
            
            beforeSend : function(xhr){
                xhr.withCredentials = true;
                console.log("enviando")
            }
       })
       .done(function(msg){
            console.log("done")
            console.log(msg)
       })
       .fail(function(jqXHR, textStatus, msg){
            console.log("fail")
            console.log(textStatus)
            console.log(jqXHR)
            console.log(msg)
       }); 
}