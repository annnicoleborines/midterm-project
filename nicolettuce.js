let cart = [];

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const qtyInput = button.parentElement.querySelector(".qty-input");
    const qty = parseFloat(qtyInput.value);

    if (qty <= 0 || isNaN(qty)) {
      alert("Please enter a valid kilo amount.");
      return;
    }

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, qty, price });
    }

    qtyInput.value = 0; // reset to 0
    updateCart();
  });
});

function updateCart() {
  const list = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("total-price");
  const messageBox = document.getElementById("message");

  list.innerHTML = "";
  let total = 0;
  let text = "I would like to order:\n";

  if (cart.length === 0) {
    list.innerHTML = "<li>Cart is empty</li>";
    totalDisplay.innerText = 0;
    messageBox.value = "";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <input type="number" value="${item.qty}" min="0" step="0.5"
        style="width:60px"
        onchange="editQty(${index}, this.value)">
      <span>₱${subtotal.toFixed(2)}</span>
    `;

    list.appendChild(li);
    text += `- ${item.qty}kg ${item.name} (₱${subtotal.toFixed(2)})\n`;
  });

  totalDisplay.innerText = total.toFixed(2);
  messageBox.value = text + `\nGRAND TOTAL: ₱${total.toFixed(2)}`;
}

function editQty(index, value) {
  value = parseFloat(value);
  if (value <= 0 || isNaN(value)) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = value;
  }
  updateCart();
}
