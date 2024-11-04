document.getElementById('tipPctSlider').addEventListener('input', updateCalc);
document.getElementById('bill').addEventListener('input', updateCalc);
document.getElementById('currencyMenu').addEventListener('change', updateCalc);

function updateCalc() {
    let bill = parseFloat(document.getElementById('bill').value);
    let tipPct = parseInt(document.getElementById('tipPctSlider').value);
    let currencyMenu = document.getElementById('currencyMenu');
    let rate = parseFloat(currencyMenu.options[currencyMenu.selectedIndex].dataset.rate);
    let currencySym = currencyMenu.options[currencyMenu.selectedIndex].text.match(/\((.*)\)/)[1];

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
        alert('Please enter a valid number');
        document.getElementById('bill').value = '';
    }
}
