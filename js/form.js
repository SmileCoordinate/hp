document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('thanksModal');
  const closeButton = modal.querySelector('.close');
  const contactForm = document.getElementById('contactForm');

  modal.style.display = "none";

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formDataObj = {
      inquiryType: contactForm.querySelector('input[name="inquiryType"]:checked')?.value,
      name: contactForm.querySelector('input[name="name"]').value,
      email: contactForm.querySelector('input[name="email"]').value,
      message: contactForm.querySelector('textarea[name="message"]').value
    };

    fetch("https://script.google.com/macros/s/AKfycby34PNkIIuU4-PClH3lA6VEiDZRhH5MFmI95xhnbvn-qWbLA4VOpUaqHdhbjn4--hfG/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    }).then(response => response.text()).then(data => {
      console.log("Response:", data);
      modal.style.display = "block";
      modal.classList.add("show");
      contactForm.reset();
    }).catch(error => {
      alert('送信に失敗しました。');
      console.error("Fetch error:", error);
    });
  });

  closeButton.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => (modal.style.display = "none"), 300);
  };

  window.onclick = event => {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  };
});
