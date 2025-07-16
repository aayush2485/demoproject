// Utility to get element by ID
const $id = id => document.getElementById(id);

function openPopup() {
  $id('popupOverlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  $id('serialTableSection').innerHTML = '';
}

function closePopup() {
  $id('popupOverlay').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function clearFormFields() {
  // Clear top fields
  $id('totalQty').value = '';
  $id('expiryAfter').value = '';
  $id('expiryUnit').selectedIndex = 0;
  // Clear serial and date inputs
  document.querySelectorAll('input[name="serialNo[]"], input[name="warrantyDate[]"]').forEach(input => input.value = '');
}

function handleApply(event) {
  event.preventDefault();
  // Validate Total Qty > 0
  const qtyVal = $id('totalQty').value.trim();
  const qty = parseInt(qtyVal);
  if (isNaN(qty) || qty <= 0) {
    const warningDiv = $id('serialWarning');
    const overlay = $id('serialWarningOverlay');
    warningDiv.querySelector('.warning-icon').innerHTML = `
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" stroke="#F27474" stroke-width="4" fill="#fff"/>
        <line x1="20" y1="20" x2="44" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
        <line x1="44" y1="20" x2="20" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `;
    warningDiv.querySelector('.warning-message').textContent = 'Total Qty. must be greater than 0.';
    overlay.style.display = 'block';
    warningDiv.style.display = 'block';
    setTimeout(() => {
      warningDiv.style.display = 'none';
      overlay.style.display = 'none';
    }, 1500);
    return;
  }
  // Collect current serial numbers and dates before regenerating the table
  const prevSerials = Array.from(document.querySelectorAll('input[name="serialNo[]"]')).map(input => input.value);
  const prevDates = Array.from(document.querySelectorAll('input[name="warrantyDate[]"]')).map(input => input.value);

  const expiryAfter = parseInt($id('expiryAfter').value) || 0;
  const expiryUnit = $id('expiryUnit').value;
  const now = new Date();
  if (expiryAfter > 0) {
    if (expiryUnit === 'Year') now.setFullYear(now.getFullYear() + expiryAfter);
    if (expiryUnit === 'Month') now.setMonth(now.getMonth() + expiryAfter);
    if (expiryUnit === 'Day') now.setDate(now.getDate() + expiryAfter);
  }
  const expiryDate = now.toLocaleDateString('en-GB');
  let table = '<table class="serial-table"><thead><tr><th>Serial No.</th><th>Warranty Date</th></tr></thead><tbody>';
  for (let i = 0; i < qty; i++) {
    const val = prevSerials[i] ? prevSerials[i].replace(/"/g, '&quot;') : '';
    const dateVal = prevDates[i] ? prevDates[i].replace(/"/g, '&quot;') : expiryDate;
    table += `<tr><td><input type='text' name='serialNo[]' class='invisible-input' value="${val}"></td><td><input type='text' name='warrantyDate[]' class='invisible-date-input' value="${dateVal}"></td></tr>`;
  }
  table += '</tbody></table>';
  $id('serialTableSection').innerHTML = table;
}

function handleCancel() {
  clearFormFields();
  closePopup();
}

// Overlay click closes popup
$id('popupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});
// Escape key closes popup
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePopup();
});

// Prevent Enter key from submitting form in any input
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#entryForm input').forEach(function(input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') e.preventDefault();
    });
  });
  // Auto-format warranty date fields as dd/mm/yyyy
  document.addEventListener('input', function(e) {
    if (e.target.name === 'warrantyDate[]') {
      let v = e.target.value.replace(/[^\d]/g, '').slice(0,8);
      if (v.length >= 5) v = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
      else if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
      e.target.value = v;
    }
  });
  document.querySelector('.add-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const serialInputs = document.querySelectorAll('input[name="serialNo[]"]');
    const dateInputs = document.querySelectorAll('input[name="warrantyDate[]"]');
    const serials = Array.from(serialInputs).map(input => input.value.trim());
    const dates = Array.from(dateInputs).map(input => input.value.trim());
    const warningDiv = $id('serialWarning');
    const overlay = $id('serialWarningOverlay');
    if (serials.some(val => val === '')) {
      warningDiv.querySelector('.warning-icon').innerHTML = `
        <svg viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#F27474" stroke-width="4" fill="#fff"/>
          <line x1="20" y1="20" x2="44" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
          <line x1="44" y1="20" x2="20" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `;
      warningDiv.querySelector('.warning-message').textContent = 'Please fill in all Serial Numbers.';
      overlay.style.display = 'block';
      warningDiv.style.display = 'block';
      setTimeout(() => {
        warningDiv.style.display = 'none';
        overlay.style.display = 'none';
      }, 1500);
      return;
    }
    // Check for duplicate serial numbers
    const seen = new Set();
    let duplicate = null;
    for (const val of serials) {
      if (seen.has(val) && val !== '') {
        duplicate = val;
        break;
      }
      seen.add(val);
    }
    if (duplicate) {
      warningDiv.querySelector('.warning-icon').innerHTML = `
        <svg viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#F27474" stroke-width="4" fill="#fff"/>
          <line x1="20" y1="20" x2="44" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
          <line x1="44" y1="20" x2="20" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `;
      warningDiv.querySelector('.warning-message').textContent = `Duplicate Serial Number found: ${duplicate}`;
      overlay.style.display = 'block';
      warningDiv.style.display = 'block';
      setTimeout(() => {
        warningDiv.style.display = 'none';
        overlay.style.display = 'none';
      }, 1500);
      return;
    }
    if (dates.some(val => val === '')) {
      warningDiv.querySelector('.warning-icon').innerHTML = `
        <svg viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#F27474" stroke-width="4" fill="#fff"/>
          <line x1="20" y1="20" x2="44" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
          <line x1="44" y1="20" x2="20" y2="44" stroke="#F27474" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `;
      warningDiv.querySelector('.warning-message').textContent = 'Please fill in all Warranty Dates.';
      overlay.style.display = 'block';
      warningDiv.style.display = 'block';
      setTimeout(() => {
        warningDiv.style.display = 'none';
        overlay.style.display = 'none';
      }, 1500);
      return;
    }
    // Optionally, close the popup or reset the form here
    // closePopup();
  });
});