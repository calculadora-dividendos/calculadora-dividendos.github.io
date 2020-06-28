function search() {
	var stockCode = document.getElementById("stockCode").value
	var quantity = document.getElementById("quantity").value
	var startDate = document.getElementById("startDate").value
	var endDate = document.getElementById("endDate").value

	if (validate(stockCode, quantity, startDate, endDate)) {
		$('#overlay').fadeIn()
		$("#resultTable tr#columnResultID").remove();
		hideAlert()
		callPostProvents(stockCode, quantity, startDate, endDate)
	}
}

/**
 * Chama o serviço para pegar as informações de dividendos
 * 
 * @param {String} stockCode 
 * @param {String} quantity 
 */
function callPostProvents(stockCode, quantity, startDate, endDate) {
	postProvents(stockCode, quantity, startDate, endDate, function callbackSuccess(result) {
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
	if (result.result.success) {
		$("#result").show()
		$("#info").show()
	
		printTable(result.data)
		printInfo(result)
	} else {
		showAlert(result.result.description)
	}
	$('#overlay').fadeOut()
}

/**
 * Exibe as informações da empresa
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
function validate(stockCode, quantity, startDate, endDate) {
	var isValid = true
	if (stockCode == null || stockCode == "") {
		isValid = false
		showAlert("Código da ação não pode ser vazio.")
	} else if (quantity == null || quantity == "" || quantity == 0) {
		isValid = false
		showAlert("Quantidade não pode ser vazio.")
	} else if (startDate == null || startDate == "") {
		isValid = false
		showAlert("Data inicial não pode ser vazia.")
	} else if (endDate == null || endDate == "") {
		isValid = false
		showAlert("Data final não pode ser vazia.")
	} else if (startDate > endDate) {
		isValid = false
		showAlert("Data final não pode ser maior que a data inicial.")
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