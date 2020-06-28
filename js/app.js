function search() {
	var stockCode = document.getElementById("stockCode").value
	var quantity = document.getElementById("quantity").value

	if (validate(stockCode, quantity)) {
		$('#overlay').fadeIn()
		$("#resultTable tr#columnResultID").remove();
		hideAlert()
		callPostProvents(stockCode, quantity)
	}
}

/**
 * Chama o serviço para pegar as informações de dividendos
 * 
 * @param {String} stockCode 
 * @param {String} quantity 
 */
function callPostProvents(stockCode, quantity) {
	postProvents(stockCode, quantity, function callbackSuccess(result) {
		printValues(result)
		
	}, function callbackError() {
		showAlert("Ocorreu um erro ao tentar consultar as informações, tente novamente mais tarde.")
	})
}

/**
 * Exibe os valores na tela
 * 
 * @param {JSON} result 
 */
function printValues(result) {
	$("#result").show()
	$("#info").show()

	printTable(result.data)
	printInfo(result)

	$('#overlay').fadeOut()
}

/**
 * 
 * 
 * @param {JSON} result 
 */
function printInfo(result) {
	document.getElementById("info-total").innerHTML = result.total
	document.getElementById("info-name").innerHTML = result.companyName
	document.getElementById("info-code").innerHTML = result.stockCode
}

/**
 * Exibe os valores na tabela
 * 
 * @param {LIST} data 
 */
function printTable(data) {
	$.each(data, function (index, m) {
	   var nTr = "<tr id='columnResultID'>"
	   nTr += "<td>" + m.paymentDay + "</td>"
	   nTr += "<td>" + m.earningType + "</td>"
	   nTr += "<td>" + m.dy + "</td>"
	   nTr += "<td>" + m.uniqueValue + "</td>"
	   nTr += "<td>" + m.totalValue + "</td>"
	   nTr += "</tr>"

	   $(nTr).appendTo('#resultTable')
   })
}

/**
 * Valida os campos inseridos pelo usuário
 * 
 * @param {String} stockCode 
 * @param {String} quantity 
 */
function validate(stockCode, quantity) {
	var isValid = true
	if (stockCode == null || stockCode == "") {
		isValid = false
		showAlert("Código da ação não pode ser vazio.")
	} else if (quantity == null || quantity == "" || quantity == 0) {
		isValid = false
		showAlert("Quantidade não pode ser vazio.")
	} 
	return isValid
}

/**
 * Exibe o alerta de erro
 * 
 * @param {String} text 
 */
function showAlert(text) {
	$('#overlay').fadeOut()
	$("#error-alert").show()
	document.getElementById("error-alert").innerHTML = text
}

/**
 * Oculta o alerta de erro
 */
function hideAlert() {
	$("#error-alert").hide()
}