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
console.log("new_script.js loaded successfully.");

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
    document.getElementById('phoneNo').value = customer.phone;
    document.getElementById('customer-suggestions').style.display = 'none';
}

function selectSalesmanSuggestion(name) {
    document.getElementById('salesman').value = name;
    document.getElementById('salesman-suggestions').style.display = 'none';
}

document.getElementById('addRowBtn').addEventListener('click', addRow);
function addRow() {
    const tableBody = document.getElementById('tb');
    const nextSerialNumber = tableBody.rows.length + 1;
    const item = document.querySelector('input[placeholder="Item"]').value || 'NONE';
    const description = document.querySelector('input[placeholder="Description"]').value || 'NONE';
    const qty = document.querySelector('input[placeholder="Qty"]').value || '';
    const unit = document.querySelector('select[placeholder="None"]').value || '';
    const pricePerUnit = document.querySelector('input[placeholder="Price/Unit"]').value || '';
    const discount = document.querySelector('input[placeholder="Discount"]').value || '';
    const tax = document.querySelector('select[placeholder="Select"]').value || '';
    const amount = document.querySelector('input[placeholder="Amount"]').value || '';

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
    document.querySelector('input[placeholder="Item"]').value = '';
    document.querySelector('input[placeholder="Description"]').value = '';
    document.querySelector('input[placeholder="Qty"]').value = '';
    document.querySelector('select[placeholder="None"]').value = '';
    document.querySelector('input[placeholder="Price/Unit"]').value = '';
    document.querySelector('input[placeholder="Discount"]').value = '';
    document.querySelector('select[placeholder="Select"]').value = '';
    document.querySelector('input[placeholder="Amount"]').value = '';
}


// Function to set the trail date to the current date and time
function setCurrentDateTime() {
    const now = new Date();
    
    // Get current year, month, day, hours, and minutes
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Months are zero-indexed
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Add leading zeros if necessary
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    // Format the datetime as YYYY-MM-DDTHH:MM
    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    // Set the value of the trailDate input field to the current date and time
    document.getElementById('invoiceDate').value = currentDateTime;
}

// Call the function to set the trail date when the page loads
window.onload = setCurrentDateTime;