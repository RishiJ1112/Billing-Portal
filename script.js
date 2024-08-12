let historyData = []; 

function addParentRow() {
    let tableBody = document.getElementById('invoice-body');
    let parentRow = document.createElement('tr');
    parentRow.className = 'parent-row';
    parentRow.innerHTML = `
        <td><input type="text" name="description" placeholder="Item Description"></td>
        <td><input type="number" name="quantity" placeholder="Quantity" class="parent-quantity" readonly></td>
        <td><input type="number" name="unit_price" placeholder="Unit Price" class="unit-price" oninput="calculateTotal(this)"></td>
        <td class="total">0.00</td>
        <td>
            <button type="button" onclick="addChildRow(this)">Add Child</button>
            <button type="button" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    let childRow = document.createElement('tr');
    childRow.className = 'child-row';
    childRow.innerHTML = `
        <td colspan="5">
            <table class="child-table">
                <thead>
                    <tr>
                        <th>Taka ID</th>
                        <th>Shade</th>
                        <th>Order No.</th>
                        <th>Quantity</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" name="child_description" placeholder="Taka ID"></td>
                        <td><input type="text" name="additional_field_1" placeholder="Shade"></td>
                        <td><input type="text" name="order_no" placeholder="Order No."></td>
                        <td><input type="number" name="child-quantity" placeholder="Quantity" class="child-quantity" oninput="updateParentQuantity(this); calculateTotal(this)"></td>
                        <td><input type="text" name="additional_field_2" placeholder="Remarks"></td>
                        <td>
                            <button type="button" onclick="deleteRow(this)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    `;

    tableBody.appendChild(parentRow);
    tableBody.appendChild(childRow);
}

function addChildRow(button) {
    let parentRow = button.closest('.parent-row');
    let childTable = parentRow.nextElementSibling.querySelector('.child-table tbody');
    let childRow = document.createElement('tr');
    childRow.innerHTML = `
        <td><input type="text" name="child_description" placeholder="Taka ID"></td>
        <td><input type="text" name="additional_field_1" placeholder="Shade"></td>
        <td><input type="text" name="order_no" placeholder="Order No."></td>
        <td><input type="number" name="child-quantity" placeholder="Quantity" class="child-quantity" oninput="updateParentQuantity(this); calculateTotal(this)"></td>
        <td><input type="text" name="additional_field_2" placeholder="Remarks"></td>
        <td>
            <button type="button" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    childTable.appendChild(childRow);
    updateParentQuantity(childRow.querySelector('.child-quantity'));
}

function deleteRow(button) {
    let row = button.closest('tr');
    if (row.classList.contains('parent-row')) {
        let nextRow = row.nextElementSibling;
        if (nextRow && nextRow.classList.contains('child-row')) {
            nextRow.remove();
        }
        row.remove();
    } else if (row.closest('.child-row')) {
        let parentRow = row.closest('.child-row').previousElementSibling;
        row.remove();
        updateParentQuantity(parentRow.querySelector('.parent-quantity'));
    } else {
        row.remove();
    }

    updateGrandTotal();
}

function calculateTotal(element) {
    let row = element.closest('tr');
    let quantityField = row.querySelector('.quantity') || row.querySelector('.parent-quantity');
    let unitPriceField = row.querySelector('.unit-price');
    let totalField = row.querySelector('.total');

    let quantity = parseFloat(quantityField ? quantityField.value : 0) || 0;
    let unitPrice = parseFloat(unitPriceField ? unitPriceField.value : 0) || 0;

    if (totalField) {
        totalField.textContent = (quantity * unitPrice).toFixed(2);
    }

    updateGrandTotal();
}

function updateParentQuantity(element) {
    let parentRow = element.closest('.child-row').previousElementSibling;
    let childRows = element.closest('tbody').querySelectorAll('.child-quantity');
    let parentQuantityField = parentRow.querySelector('.parent-quantity');
    let totalQuantity = 0;

    childRows.forEach(function(childQuantity) {
        totalQuantity += parseFloat(childQuantity.value) || 0;
    });

    parentQuantityField.value = totalQuantity.toFixed(2);
    calculateTotal(parentRow.querySelector('.unit-price'));
}

function updateGrandTotal() {
    let totals = document.querySelectorAll('.total');
    let grandTotal = 0;

    totals.forEach(function(total) {
        grandTotal += parseFloat(total.textContent) || 0;
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

    let gst = grandTotal * 0.025;
    let sgst = grandTotal * 0.025;
    let finalTotal = grandTotal + gst + sgst;

    document.getElementById('gst-amount').textContent = gst.toFixed(2);
    document.getElementById('sgst-amount').textContent = sgst.toFixed(2);
    document.getElementById('final-total').textContent = finalTotal.toFixed(2);
}

