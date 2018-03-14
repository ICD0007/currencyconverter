let conversionTable = {};

// Load conversion rates on page load
$(document).ready(function() {
    // This is a free API key. Limited to 1000 requests. Get yours at http://fixer.io.
    // And *never* upload API keys to Github as is done here.
    const apikey = "461b33c62f4b24b3bc1a948a7e517a40";
    const url = "http://data.fixer.io/api/latest?access_key=" + apikey;

    var request = $.ajax({
        url: url,
        type: "GET",
        dataTypes: "json"
    });

    request.done(function(json) {
        var selectorFrom = $("#conversion-from");
        var selectorTo = $("#conversion-to");

        $.each(json.rates, function( key, value ) {
            conversionTable[key] = value;
            selectorFrom.append("<option value="+key+">"+key+"</option>");
            selectorTo.append("<option value="+key+">"+key+"</option>");
        });
    });
    
    request.fail(function(jqXHR, textStatus) {
        console.log("An error occurred");
    });
});

function onConvert() {
    var conversionAmount = parseFloat($("#conversion-amount").val());
    var conversionFrom = $("#conversion-from").val();
    var conversionTo = $("#conversion-to").val();

    // Basic error checking
    if (isNaN(conversionAmount) || !(conversionFrom in conversionTable) || !(conversionTo in conversionTable)) {
        writeLog("[ERROR] Invalid input");
        return false;
    }

    var convertedVal = Math.round(conversionAmount / conversionTable[conversionFrom] * conversionTable[conversionTo] * 100) / 100;
    writeLog(conversionAmount + " " + conversionFrom + " is " + convertedVal + " " + conversionTo);

    return false;
}

function writeLog(msg) {
    var log = $("#log");
    log.html(msg + "\n" + log.html());
}