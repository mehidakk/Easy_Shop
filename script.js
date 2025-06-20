const offers = document.querySelectorAll(".offer");
      const counterDiv = document.querySelector(".counter");
      const totalSpan = document.getElementById("total");
      const valueSpan = document.getElementById("value");
    
      let selectedOffer = null;
    
      let quantity = 3;
    
      function updateTotal() {
        if (selectedOffer === "1") totalSpan.innerText = "1890";
        else if (selectedOffer === "2") totalSpan.innerText = "3500";
        else if (selectedOffer === "3") totalSpan.innerText = (1700 * quantity).toString();
        else totalSpan.innerText = "0";
      }
    
      offers.forEach((offer, index) => {
        offer.addEventListener("click", () => {
          offers.forEach(o => o.classList.remove("selected"));
          offer.classList.add("selected");
    
          if (index === 2) {
            counterDiv.style.display = "flex";
            selectedOffer = "3";
          } else {
            counterDiv.style.display = "none";
            selectedOffer = (index + 1).toString();
          }
    
          updateTotal();
        });
      });
    
      function increment() {
        quantity++;
        valueSpan.innerText = quantity;
        updateTotal();
      }
    
      function decrement() {
        if (quantity > 3) {
          quantity--;
          valueSpan.innerText = quantity;
          updateTotal();
        }
      }
    
      window.increment = increment;
      window.decrement = decrement;
    
      fetch('algeria_cities.json')
      .then(response => response.json())
      .then(data => {
        const wilayaSelect = document.getElementById("wilaya");
        const baladiyaSelect = document.getElementById("baladiya");
    
        const wilayas = {};
    
        data.forEach(entry => {
          const wilaya = entry.wilaya_name;
          const commune = entry.commune_name;
    
          if (!wilayas[wilaya]) {
            wilayas[wilaya] = [];
          }
    
          if (!wilayas[wilaya].includes(commune)) {
            wilayas[wilaya].push(commune);
          }
        });
    
        for (let wilaya in wilayas) {
          const option = document.createElement("option");
          option.value = wilaya;
          option.innerText = wilaya;
          wilayaSelect.appendChild(option);
        }
    
        wilayaSelect.addEventListener("change", function () {
          const selectedWilaya = this.value;
          const communes = wilayas[selectedWilaya] || [];
    
          baladiyaSelect.innerHTML = "";
    
          communes.forEach(commune => {
            const option = document.createElement("option");
            option.value = commune;
            option.innerText = commune;
            baladiyaSelect.appendChild(option);
          });
        });
    
      })
      .catch(error => {
        console.error("Erreur lors du chargement de algeria_cities.json :", error);
      });
    

    
      counterDiv.style.display = "none";
























//request

document.getElementById("input_form").addEventListener("submit", function(e) {
    e.preventDefault();

    var form = e.target;
    var formData = new FormData(form);
    formData.append("quantité", selectedOffer === "3" ? quantity : selectedOffer);

    const submitButton = form.querySelector("button[type='submit']");
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = "جاري الإرسال...";

    fetch("https://script.google.com/macros/s/AKfycbwYQIkhHTURquUopfc6KvSYBCVvS4t1982UBYRsCVt3XU0MjtOOa0wxjkevsy_Z8vSf4A/exec", {
        method: "POST",
        body: formData
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

        // Show the top notification bar
        const notification = document.getElementById("notification-bar");
        notification.style.top = "0";

        // Hide it after 3 seconds
        setTimeout(() => {
            notification.style.top = "-60px";
        }, 3000);

        form.reset();
    })
    .catch(function(error) {
        console.error(error);
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        alert("حدث خطأ أثناء إرسال الطلب.");
    });
});



// function doPost(e) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

//   var row = [
//     e.parameter.name,
//     e.parameter.email,
//     e.parameter.quantity,
//     e.parameter.address,
//     e.parameter.comments
//   ];

//   sheet.appendRow(row);
  
//   return ContentService.createTextOutput("Success");

// }
