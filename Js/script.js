const customers = [
    { name: 'Alice Johnson', phone: '123-456-7890' },
    { name: 'Bob Smith', phone: '234-567-8901' },
    { name: 'Charlie Brown', phone: '345-678-9012' },
    { name: 'Diana Prince', phone: '456-789-0123' }
];

const salesmen = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Davis'
];
// krish arnav
function showCustomerSuggestions(value) {
    const suggestionsBox = document.getElementById('customer-suggestions');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    if (value) {
        const filteredCustomers = customers.filter(customer => 
            customer.name.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredCustomers.length > 0) {
            filteredCustomers.forEach(customer => {
                const div = document.createElement('div');
                div.textContent = customer.name;
                div.onclick = () => selectCustomerSuggestion(customer.name);
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
}

function showSalesmanSuggestions(value) {
    const suggestionsBox = document.getElementById('salesman-suggestions');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    if (value) {
        const filteredSalesmen = salesmen.filter(name => 
            name.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredSalesmen.length > 0) {
            filteredSalesmen.forEach(name => {
                const div = document.createElement('div');
                div.textContent = name;
                div.onclick = () => selectSalesmanSuggestion(name);
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
}

function selectCustomerSuggestion(name) {
    const customer = customers.find(customer => customer.name === name);
    document.getElementById('customer').value = customer.name;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-suggestions').style.display = 'none';
}

function selectSalesmanSuggestion(name) {
    document.getElementById('salesman').value = name;
    document.getElementById('salesman-suggestions').style.display = 'none';
}
//add-row button added by Rudra
document.getElementById('addRowBtn').addEventListener('click', addRow);
function addRow() {
 
    const tableBody = document.querySelector('table tbody');

    const nextSerialNumber = tableBody.rows.length + 1;
    const item = document.getElementById('ITEM').value || 'NONE';
    const description = document.getElementById('DESCRIPTION').value || 'NONE';
    const qty = document.getElementById('QTY').value || '';
    const unit = document.getElementById('UNIT').value || '';
    const pricePerUnit = document.getElementById('PRICE/UNIT').value || '';
    const discount = document.getElementById('DISCOUNT').value || '';
    const tax = document.getElementById('TAX').value || '';
    const amount = document.getElementById('AMOUNT').value || '';
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nextSerialNumber}</td>
        <td>${item}</td>
        <td>${description}</td>
        <td>${qty}</td>
        <td>${unit}</td>
        <td>${pricePerUnit}</td>
        <td>${discount}</td>
        <td>${tax}</td>
        <td>${amount}</td>
    `;
    tableBody.appendChild(newRow);
    clearInputs();
}

function clearInputs() {
    document.getElementById('ITEM').value = '';
    document.getElementById('DESCRIPTION').value = '';
    document.getElementById('QTY').value = '';
    document.getElementById('UNIT').value = '';
    document.getElementById('PRICE/UNIT').value = '';
    document.getElementById('DISCOUNT').value = '';
    document.getElementById('TAX').value = '';
    document.getElementById('AMOUNT').value = '';
}
