let orderHistory = [];

function clearErrors() {
  document.getElementById("tabletNameError").innerText = "";
  document.getElementById("quantityError").innerText = "";
  document.getElementById("addressError").innerText = "";
}

function calculatePrice() {
  clearErrors();

  const tabletName = document.getElementById("tabletName").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const pricePerTablet = 10;

  let hasError = false;

  if (!tabletName) {
    document.getElementById("tabletNameError").innerText =
      "Tablet name is required.";
    hasError = true;
  }

  if (quantity <= 0 || isNaN(quantity)) {
    document.getElementById("quantityError").innerText =
      "Please enter a valid quantity.";
    hasError = true;
  }

  if (!hasError) {
    const totalPrice = pricePerTablet * quantity;
    document.getElementById("priceOutput").innerHTML = `
                    <table class="output-table">
                        <tr><th>Tablet Name</th><th>Quantity</th><th>Price Per Tablet (₹)</th><th>Total Price (₹)</th></tr>
                        <tr><td>${tabletName}</td><td>${quantity}</td><td>${pricePerTablet}</td><td>${totalPrice}</td></tr>
                    </table>`;
  }
}

function saveAddress() {
  clearErrors();

  const tabletName = document.getElementById("tabletName").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const address = document.getElementById("address").value;

  let hasError = false;

  if (!tabletName) {
    document.getElementById("tabletNameError").innerText =
      "Tablet name is required.";
    hasError = true;
  }

  if (quantity <= 0 || isNaN(quantity)) {
    document.getElementById("quantityError").innerText =
      "Please enter a valid quantity.";
    hasError = true;
  }

  if (!address) {
    document.getElementById("addressError").innerText =
      "Delivery address is required.";
    hasError = true;
  }

  if (!hasError) {
    orderHistory.push({ tabletName, quantity, address });
    showPopup(
      `Address saved successfully!<br>Tablet: ${tabletName}<br>Quantity: ${quantity}<br>Delivery Address: ${address}`
    );
    document.getElementById("placeOrderButton").style.display = "block";
  }
}

function showPaymentForm(paymentMethod) {
  if (paymentMethod === "none") {
    document.getElementById("upiOptions").style.display = "none";
  } else if (paymentMethod === "upi") {
    document.getElementById("upiOptions").style.display = "block";
  }
}

function placeOrder() {
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );

  if (!paymentMethod) {
    showPopup("Please select a payment method.");
    return;
  }

  let paymentMessage = "";
  if (paymentMethod.value === "upi") {
    const upiId = document.getElementById("upiId").value;
    if (!upiId) {
      showPopup("Please enter a valid UPI ID.");
      return;
    }
    paymentMessage = `Payment via UPI ID: ${upiId}`;
  } else if (paymentMethod.value === "cash") {
    paymentMessage = "Cash on Delivery selected.";
  }

  showPopup(`Order placed successfully!<br>${paymentMessage}`);
  setTimeout(() => {
    window.location.href = "thankyou.html"; // Redirect to "Thank you" page
  }, 2000);
}

function showPopup(message) {
  document.getElementById("popupMessage").innerHTML = message;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}
