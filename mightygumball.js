/* mightygumball.js */
/*
 * get the content of a JSON file using Ajax 
 *
 */

window.onload = init;

function init() {
//	getSales();
}

//
// With XMLHttpRequest Level 2 (implemented in new versions of Firefox, Safari
// and Chrome) you can check progress and check for the "load" event with the
// onload event handler instead of checking the onreadystatechange
//


function updateSales(sales) {
    	var salesDiv = document.getElementById("sales");        
	for (var i = 0; i < sales.length; i++) {        
		var sale = sales[i];        
		var div = document.createElement("div");        
		div.setattribute("class", "saleItem");        
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";        salesDiv.appendChild(div);    
	}
}

