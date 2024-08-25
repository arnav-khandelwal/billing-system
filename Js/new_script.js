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

const products = {
    "101": {
        description: "Product A Description",
        pricePerUnit: 50,
        discount: 5,
        tax: 12
    },
    "102": {
        description: "Product B Description",
        pricePerUnit: 75,
        discount: 10,
        tax: 18
    },
    "103": {
        description: "Product C Description",
        pricePerUnit: 30,
        discount: 3,
        tax: 5
    },
    "104": {
        description: "Product D Description",
        pricePerUnit: 100,
        discount: 15,
        tax: 20
    },
    "105": {
        description: "Product E Description",
        pricePerUnit: 200,
        discount: 25,
        tax: 36
    },
    "106": {
        description: "Product F Description",
        pricePerUnit: 40,
        discount: 8,
        tax: 10
    }
};

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

function setCurrentDateTime() {
    const curr = getCurrentDateTime();
    document.getElementById('invoiceDate').value = curr;
}

function getCurrentDateTime(){
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Months are zero-indexed
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

window.onload = setCurrentDateTime;

document.getElementById('addRowBtn').addEventListener('click', addRow);

function addRow() {
    const tableBody = document.getElementById('tb').getElementsByTagName('tbody')[0];
    const nextSerialNumber = tableBody.rows.length + 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nextSerialNumber}</td>
        <td><input type="text" class="form-control" placeholder="ID"></td>
        <td><input type="text" class="form-control" placeholder="Description" disabled></td>
        <td><input type="number" class="form-control" placeholder="Qty" value="1" min="1"></td>
        <td><input type="text" class="form-control" placeholder="Price" disabled></td>
        <td><input type="text" class="form-control" placeholder="Discount" disabled></td>
        <td><input type="text" class="form-control" placeholder="Tax" disabled></td>
        <td><input type="text" class="form-control" placeholder="Amount" disabled></td>
    `;
    document.getElementById('addRowBtn').disabled = true;
    tableBody.appendChild(newRow);
    attachRowListeners(newRow);
}

function attachRowListeners(row) {
    const idInput = row.querySelector('input[placeholder="ID"]');
    const qtyInput = row.querySelector('input[placeholder="Qty"]');

    idInput.addEventListener('input', function () {
        const idValue = idInput.value;
        if (products[idValue]) {
            const product = products[idValue];
            row.querySelector('input[placeholder="Description"]').value = product.description;
            row.querySelector('input[placeholder="Price"]').value = product.pricePerUnit;
            row.querySelector('input[placeholder="Qty"]').value = 1;
            row.querySelector('input[placeholder="Discount"]').value = product.discount;
            row.querySelector('input[placeholder="Tax"]').value = product.tax;
            updateAmount(row, product);
            document.getElementById('addRowBtn').disabled = false;
        } else {
            clearRow(row);
            document.getElementById('addRowBtn').disabled = true;
        }
    });

    qtyInput.addEventListener('input', function () {
        qtyInput.value = Math.max(qtyInput.value, 1); // Ensure quantity is at least 1
        const idValue = idInput.value;
        if (products[idValue]) {
            updateAmount(row, products[idValue]);
        }
    });
}

function updateAmount(row, product) {
    const qtyInput = row.querySelector('input[placeholder="Qty"]');
    const qty = parseInt(qtyInput.value) || 0;
    const pricePerUnit = parseFloat(product.pricePerUnit) || 0;
    const discount = parseFloat(product.discount) || 0;
    const tax = parseFloat(product.tax) || 0;

    const discountAmount = (pricePerUnit * qty) * (discount / 100);
    const taxableAmount = (pricePerUnit * qty) - discountAmount;
    const taxAmount = taxableAmount * (tax / 100);
    const totalAmount = taxableAmount + taxAmount;

    row.querySelector('input[placeholder="Amount"]').value = totalAmount.toFixed(2);
    updateTotalBill();
}

function clearRow(row) {
    row.querySelector('input[placeholder="Description"]').value = '';
    row.querySelector('input[placeholder="Price"]').value = '';
    row.querySelector('input[placeholder="Discount"]').value = '';
    row.querySelector('input[placeholder="Tax"]').value = '';
    row.querySelector('input[placeholder="Amount"]').value = '';
    updateTotalBill();
}

function updateTotalBill() {
    const rows = document.querySelectorAll('#tb tbody tr');
    let total = 0;
    rows.forEach(row => {
        const amount = parseFloat(row.querySelector('input[placeholder="Amount"]').value) || 0;
        total += amount;
    });
    document.getElementById('total').value = total.toFixed(2);
}

const initialIdInput = document.querySelector('input[placeholder="ID"]');
if (initialIdInput) {
    const initialRow = initialIdInput.closest('tr');
    attachRowListeners(initialRow);
}

document.querySelector('.btn-secondary').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const invoiceBox = document.getElementById("invoice-box");

    invoiceBox.style.position = 'absolute';
    invoiceBox.style.left = '-9999px';
    invoiceBox.style.display = 'block';
    
    const d = getCurrentDateTime().replace("T", " ");
    const sl = document.getElementById("salesman").value;
    document.getElementById("billInfo").innerHTML = 
    `Invoice #: 677<br>
    Date: ${d}<br>
    SalesMan: ${sl}<br>
    `;
    
    const tb = document.getElementById("tb").innerHTML;
    document.getElementById("items").innerHTML = `${tb}`;
    html2canvas(invoiceBox).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");

        invoiceBox.style.display = 'none';
        invoiceBox.style.position = '';
        invoiceBox.style.left = '';
    });
});

function generateBarcode(value) {
    JsBarcode("#barcode", value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true
    });
}
