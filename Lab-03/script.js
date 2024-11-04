document.getElementById('tipPctSlider').addEventListener('input', updateCalc);
document.getElementById('bill').addEventListener('input', updateCalc);
document.getElementById('currencyMenu').addEventListener('change', updateCalc);
document.getElementById('tipPercentInput').addEventListener('input', updateSlider);

function updateCalc() {
    let bill = parseFloat(document.getElementById('bill').value);
    let tipPct = parseInt(document.getElementById('tipPctSlider').value);
    let currencyMenu = document.getElementById('currencyMenu');
    let rate = parseFloat(currencyMenu.options[currencyMenu.selectedIndex].dataset.rate);
    let currencySym = currencyMenu.options[currencyMenu.selectedIndex].text.match(/\((.*)\)/)[1];

    // Update the text box displaying tip percentage
    document.getElementById('tipPercentInput').value = tipPct;

    // Clear previous error message
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('errorMessage').textContent = '';

    // Check if bill is a valid number
    if (!isNaN(bill) && bill >= 0) {
        let tipAmt = bill * (tipPct / 100);
        let total = bill + tipAmt;

        // Convert to selected currency
        tipAmt *= rate;
        total *= rate;

        document.getElementById('tipPctDisplay').textContent = tipPct + '%';
        document.getElementById('tipAmt').value = currencySym + ' ' + tipAmt.toFixed(2);
        document.getElementById('total').value = currencySym + ' ' + total.toFixed(2);
    } else {
        // Display error message in the div
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').textContent = 'Please enter a valid number for the bill amount.';
        document.getElementById('bill').value = '';
    }
}

// Synchronize the slider when tip percentage input is changed
function updateSlider() {
    let tipPctInput = parseInt(document.getElementById('tipPercentInput').value);
    if (!isNaN(tipPctInput) && tipPctInput >= 0 && tipPctInput <= 100) {
        document.getElementById('tipPctSlider').value = tipPctInput;
        updateCalc(); // Recalculate based on new input
    }
}
