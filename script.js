async function loadSlots() {
  const res = await fetch("/api/slots");
  const slots = await res.json();

  const container = document.getElementById("slots");
  container.innerHTML = "";

  slots.forEach((slot) => {
    const div = document.createElement("div");
    div.className = "slot";

    if (slot.name) {
      div.classList.add("booked");
      div.innerHTML = `
        <strong>${slot.time}</strong><br/>
        Booked by ${slot.name}
      `;
    } else {
      div.innerHTML = `
        <strong>${slot.time}</strong><br/>
        <input placeholder="Your name" id="name-${slot.time}" />
        <button onclick="book('${slot.time}')">Select</button>
      `;
    }

    container.appendChild(div);
  });
}

function showMessage(text, type) {
  const msg = document.getElementById("message");
  msg.className = type;
  msg.innerText = text;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

async function book(time) {
  const name = document.getElementById(`name-${time}`).value;

  if (!name) {
    showMessage("❌ Please enter your name", "error");
    return;
  }

  const res = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time, name }),
  });

  if (res.ok) {
    showMessage(`✅ Slot ${time} booked successfully for ${name}`, "success");
    loadSlots();
  } else {
    showMessage("❌ Slot already booked!", "error");
  }
}

loadSlots();
