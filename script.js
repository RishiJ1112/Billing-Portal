function addParentRow() {
    let tableBody = document.getElementById('invoice-body');
    let parentRow = document.createElement('tr');
    parentRow.className = 'parent-row';
    parentRow.innerHTML = `
        <td><input type="text" name="description" placeholder="Item Description"></td>
        <td><input type="number" name="quantity" placeholder="Quantity" class="quantity" oninput="calculateTotal(this)"></td>
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
                                        <th>Rate</th>
                                        <th>Remarks</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="text" name="child_description" placeholder="Taka ID"></td>
                                        <td><input type="text" name="additional_field_1" placeholder="Shade"></td>
                                        <td><input type= "text" name= "order no" placeholder = "Order No."</td>
                                        <td><input type="number" name="child_quantity" placeholder="Quantity" class="quantity" oninput="calculateTotal(this)"></td>
                                        <td><input type="number" name="child_unit_price" placeholder="Unit Price" class="unit-price" oninput="calculateTotal(this)"></td>

                                        <td><input type="text" name="additional_field_2" placeholder="Remarks"></td>
                                        <td class="total">0.00</td>
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
    let parentRow = button.parentElement.parentElement;
    let childTable = parentRow.nextElementSibling.querySelector('.child-table tbody');
    let childRow = document.createElement('tr');
    childRow.innerHTML = `
     <td><input type="text" name="child_description" placeholder="Taka ID"></td>
     <td><input type="text" name="additional_field_1" placeholder="Shade"></td>
     <td><input type= "text" name= "order no" placeholder = "Order No."</td>
     <td><input type="number" name="child_quantity" placeholder="Quantity" class="quantity" oninput="calculateTotal(this)"></td>
     <td><input type="number" name="child_unit_price" placeholder="Unit Price" class="unit-price" oninput="calculateTotal(this)"></td>
     <td><input type="text" name="additional_field_2" placeholder="Remarks"></td>
     <td class="total">0.00</td>
     <td>
         <button type="button" onclick="deleteRow(this)">Delete</button>
     </td>
    `;

    childTable.appendChild(childRow);
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    let parent = row.parentElement.parentElement.parentElement.parentElement;

    if (row.classList.contains('parent-row') && row !== parent.querySelector('.parent-row:first-child')) {
        row.nextElementSibling.remove();
        row.remove();
    } else if (row.classList.contains('child-row')) {
        row.remove();
    } else {
        row.remove();
    }

    updateGrandTotal();
}

function calculateTotal(element) {
    let row = element.parentElement.parentElement;
    let quantity = row.querySelector('.quantity').value;
    let unitPrice = row.querySelector('.unit-price').value;
    let total = row.querySelector('.total');
    
    total.textContent = (quantity * unitPrice).toFixed(2);
    updateGrandTotal();
}

function updateGrandTotal() {
    let totals = document.querySelectorAll('.total');
    let grandTotal = 0;
    
    totals.forEach(function(total) {
        grandTotal += parseFloat(total.textContent);
    });
    
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

    let gst = grandTotal * 0.10;
    let sgst = grandTotal * 0.10;
    let finalTotal = grandTotal + gst + sgst;

    document.getElementById('gst-amount').textContent = gst.toFixed(2);
    document.getElementById('sgst-amount').textContent = sgst.toFixed(2);
    document.getElementById('final-total').textContent = finalTotal.toFixed(2);
}
