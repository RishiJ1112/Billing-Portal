document.addEventListener('DOMContentLoaded', function () {
    const addItemButton = document.getElementById('add-item');
    const invoiceItems = document.getElementById('invoice-items');

    addItemButton.addEventListener('click', function () {
        const rowCount = invoiceItems.rows.length;
        const row = invoiceItems.insertRow();

        row.innerHTML = `
            <td>${rowCount + 1}</td>
            <td><input type="text" name="particular" placeholder="Item Description"></td>
            <td><input type="number" name="qty" min="0" step="1"></td>
            <td><input type="number" name="rate" min="0" step="0.01"></td>
            <td><input type="number" name="amount" readonly></td>
            <td><button type="button" class="remove"><i class="fas fa-trash-alt"></i></button></td>
        `;

        row.querySelector('.remove').addEventListener('click', function () {
            row.remove();
            updateRowNumbers();
            updateTotals();
        });

        row.querySelector('[name="qty"]').addEventListener('input', updateAmount);
        row.querySelector('[name="rate"]').addEventListener('input', updateAmount);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Invoice submitted successfully!');
    });

    function updateAmount() {
        const row = this.closest('tr');
        const qty = parseFloat(row.querySelector('[name="qty"]').value) || 0;
        const rate = parseFloat(row.querySelector('[name="rate"]').value) || 0;
        const amount = qty * rate;
        row.querySelector('[name="amount"]').value = amount.toFixed(2);
        updateTotals();
    }

    function updateTotals() {
        let total = 0;
        invoiceItems.querySelectorAll('tr').forEach(row => {
            const amount = parseFloat(row.querySelector('[name="amount"]').value) || 0;
            total += amount;
        });
        const gst = total * 0.18; // Assuming GST is 18%
        const netAmt = total + gst;

        document.getElementById('total').value = total.toFixed(2);
        document.getElementById('gst').value = gst.toFixed(2);
        document.getElementById('net_amt').value = netAmt.toFixed(2);
    }

    function updateRowNumbers() {
        invoiceItems.querySelectorAll('tr').forEach((row, index) => {
            row.querySelector('td:first-child').textContent = index + 1;
        });
    }

    document.querySelectorAll('[name="qty"], [name="rate"]').forEach(input => {
        input.addEventListener('input', updateAmount);
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function () {
            button.closest('tr').remove();
            updateRowNumbers();
            updateTotals();
        });
    });
});
