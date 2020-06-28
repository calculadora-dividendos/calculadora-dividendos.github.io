function postProvents(stockCode, quantity, callbackSuccess, callbackErrror) {
    var json = JSON.stringify({
        code: stockCode,
        quantity: quantity,
        startDate: "2019-01-01",
        endDate: "2019-12-30"
    })

    $.ajax({
        url: URL_PROVENTS + "/provents",
        type: 'POST',
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success: function(result) {
            callbackSuccess(result)
        },
        error: function(error) {
            callbackErrror()
        }
    })
}

function getHealth(callbackSuccess, callbackErrror) {
    $.ajax({
        url: URL_PROVENTS + "/health",
        method: 'GET',
        headers: headers,
        dataType: "jsonp",
        success: function(result) {
            callbackSuccess()
        },
        error: function(error) {
            callbackErrror()
        }
    })
}