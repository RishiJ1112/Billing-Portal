document.addEventListener('DOMContentLoaded', function () {
    const addItemButton = document.getElementById('add-item');
    const invoiceItems = document.getElementById('invoice-items');
    const form = document.getElementById('invoice-form');

    addItemButton.addEventListener('click', function () {
        const rowCount = invoiceItems.querySelectorAll('tr').length;
        const row = invoiceItems.insertRow();

        row.innerHTML = `
            <td>${rowCount + 1}</td>
            <td><input type="text" name="Product" placeholder="Product" required></td>
            <td><input type="number" name="qty" min="0" step="1" placeholder="Quantity" required></td>
            <td><input type="number" name="rate" min="0" step="0.01" placeholder="Rate" required></td>
            <td><input type="number" name="amount" placeholder="Amount" readonly></td>
            <td>
                <button type="button" class="remove"><i class="fas fa-trash-alt"></i></button>
                <button type="button" class="add-attributes"><i class="fas fa-plus"></i></button>
            </td>
        `;


        const qtyInput = row.querySelector('[name="qty"]');
        const rateInput = row.querySelector('[name="rate"]');
        const amountInput = row.querySelector('[name="amount"]');
    
        qtyInput.addEventListener('input', function () {
            calculateAmount(qtyInput, rateInput, amountInput);
        });
    
        rateInput.addEventListener('input', function () {
            calculateAmount(qtyInput, rateInput, amountInput);
        });
    

        row.querySelector('.remove').addEventListener('click', function () {
            row.remove();
            updateRowNumbers();
            updateAmount();
        });

        row.querySelector('.add-attributes').addEventListener('click', function () {
            toggleSubForm(row);
        });

        updateRowNumbers();
        updateAmount();
    });

    // To calculate the amount of the table row independently 
    function calculateAmount(qtyInput, rateInput, amountInput) {
        const qty = parseFloat(qtyInput.value);
        const rate = parseFloat(rateInput.value);
        const amount = qty * rate;
        amountInput.value = amount.toFixed(2);
        updateAmount();
    }

    // To update the amount when the data is inserted
    function updateAmount() {
        const rows = invoiceItems.querySelectorAll('tr:not(.sub-form-container)');
        let total = 0;

        rows.forEach(row => {
            const qty = row.querySelector('[name="qty"]').value;
            const rate = row.querySelector('[name="rate"]').value;
            const amountInput = row.querySelector('[name="amount"]');
            const calculatedAmount = qty * rate;

            amountInput.value = calculatedAmount.toFixed(2);
            total += calculatedAmount;
        });

        const gst = total * 0.18;
        const netAmt = total + gst;

        document.getElementById('total').value = total.toFixed(2);
        document.getElementById('gst').value = gst.toFixed(2);
        document.getElementById('net_amt').value = netAmt.toFixed(2);
    }

    // To adjust the row numbers accordingly  
    function updateRowNumbers() {
        const rows = invoiceItems.querySelectorAll('tr:not(.sub-form-container)');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }


    // To open the sub-form in the row
    function toggleSubForm(row) {
        let subFormContainer = row.nextElementSibling;

        if (!subFormContainer || !subFormContainer.classList.contains('sub-form-container')) {
            subFormContainer = document.createElement('tr');
            subFormContainer.classList.add('sub-form-container');
            subFormContainer.innerHTML = `
                        <div class="sub-form">
                        <td>
                        <div class="row">
                            <label for="attribute1">Taka ID</label>
                            <input type="text" name="attribute1" placeholder="Taka ID">
                        </div>
                        <div class="row">
                            <label for="attribute2">Shade</label>
                            <input type="text" name="attribute2" placeholder="Shade">
                        </div>
                        </td>

                        <td>
                        <div class="row">
                            <label for="attribute3">Pattern</label>
                            <input type="text" name="attribute3" placeholder="Pattern">
                        </div>
                        <div class="row">
                            <label for="attribute4">Order No.</label>
                            <input type="number" name="attribute4" placeholder="Order No.">
                        </div>
                        </td>

                        <td>
                        <div class="row">
                            <label for="attribute5">Qty</label>
                            <input type="number" name="attribute5" placeholder="Qty">
                        </div>
                        <div class="row">
                            <label for="attribute6">Remarks</label>
                            <input type="text" name="attribute6" placeholder="Remarks">
                        </div>
                        </td>

                        <td>
                        <button type="button" class="sub-row-add"><i class="fas fa-plus"></i> Add </button> 
                        </td>

                       <td>
                       <button type="button" class="remove-sub-row"><i class="fas fa-trash-alt"></i></button>
                       </td>
                    </div>

            `;
            row.after(subFormContainer);
        }

        subFormContainer.style.display = subFormContainer.style.display === 'none' || subFormContainer.style.display === '' ? 'table-row' : 'none';
    }
    
    

    document.querySelectorAll('[name="qty"], [name="rate"]').forEach(input => {
        input.addEventListener('input', updateAmount);
    });


    // To remove the rows of the table
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            row.remove();
            updateRowNumbers();
            updateAmount();
        });
    });

    document.querySelectorAll('.add-attributes').forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            toggleSubForm(row);
        });
    });
});

