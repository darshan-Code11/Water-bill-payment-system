
    let totalBillAmount = 0;

    function onlyDigits(input) {
      input.value = input.value.replace(/[^0-9]/g, '');
    }

    function calculateBill() {
      let refNo = document.getElementById("refNo").value;
      let type = document.getElementById("type").value;
      let units = parseInt(document.getElementById("units").value);

      if (refNo === "" || refNo.length !== 8) {
        alert("Reference Number must be exactly 8 digits!");
        return;
      }

      if (isNaN(units) || units < 0) {
        alert("Please enter valid units!");
        return;
      }

      let typeName = "";
      let chargePerUnit = 0;

      switch (type) {
        case "D":
          chargePerUnit = 3.5;
          totalBillAmount = units * 3.5;
          typeName = "Domestic";
          break;

        case "C":
          chargePerUnit = 5.5;
          totalBillAmount = units * 5.5;
          typeName = "Commercial";
          break;

        case "I":
          chargePerUnit = 4.5;
          totalBillAmount = units * 4.5;
          typeName = "Industrial";
          break;
      }

      document.getElementById("result").innerHTML = `
        <h2 style="text-align:center;">BWSSB Bill Receipt</h2>
        <hr>
        <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
        <p><b>Reference Number:</b> ${refNo}</p>
        <p><b>Connection Type:</b> ${typeName}</p>
        <p><b>Units Consumed:</b> ${units}</p>
        <p><b>Charges Per Unit:</b> ₹${chargePerUnit}</p>
        <hr>
        <h3 style="color:green;">Total Bill Amount: ₹${totalBillAmount}</h3>
        <p><b>Status:</b> <span id="billStatus" style="color:red;">Pending Payment ❌</span></p>
      `;

      document.getElementById("paySection").style.display = "block";
      document.getElementById("paymentStatus").innerHTML = "";
      document.getElementById("timer").innerHTML = "";
      document.getElementById("qrBox").style.display = "none";
      document.getElementById("printBtn").style.display = "none";
    }

    function showOptions() {
      let mode = document.getElementById("payMode").value;

      document.getElementById("upiAppsBox").style.display = "none";
      document.getElementById("creditBox").style.display = "none";
      document.getElementById("debitBox").style.display = "none";

      if (mode === "UPI") document.getElementById("upiAppsBox").style.display = "block";
      if (mode === "CreditCard") document.getElementById("creditBox").style.display = "block";
      if (mode === "DebitCard") document.getElementById("debitBox").style.display = "block";
    }

    function payBill() {
      let mode = document.getElementById("payMode").value;

      if (mode === "") {
        alert("Please select payment mode!");
        return;
      }

      let method = "";

      if (mode === "UPI") {
        method = document.getElementById("upiApp").value;
        document.getElementById("qrBox").style.display = "block";
      } 
      else if (mode === "CreditCard") {
        if (document.getElementById("creditCard").value === "") {
          alert("Enter Credit Card Number!");
          return;
        }
        method = "Credit Card";
        document.getElementById("qrBox").style.display = "none";
      } 
      else if (mode === "DebitCard") {
        if (document.getElementById("debitCard").value === "") {
          alert("Enter Debit Card Number!");
          return;
        }
        method = "Debit Card";
        document.getElementById("qrBox").style.display = "none";
      }

      document.getElementById("paymentStatus").innerHTML = "";
      document.getElementById("printBtn").style.display = "none";

      let timeLeft = 60;

      document.getElementById("timer").innerHTML =
        "Processing payment via " + method + " ... Time left: " + timeLeft + " sec";

      let countdown = setInterval(() => {
        timeLeft--;

        document.getElementById("timer").innerHTML =
          "Processing payment via " + method + " ... Time left: " + timeLeft + " sec";

        if (timeLeft <= 0) {
          clearInterval(countdown);

          document.getElementById("timer").innerHTML = "";
          document.getElementById("qrBox").style.display = "none";

          document.getElementById("paymentStatus").innerHTML =
            "✅ Payment Successful via " + method + "<br>🎉 Bill Paid Successfully!";

          /* CHANGE STATUS AFTER 60 SEC */
          document.getElementById("billStatus").innerHTML = "Bill Paid ✅";
          document.getElementById("billStatus").style.color = "green";

          document.getElementById("result").innerHTML += `
            <hr>
            <h3 style="color:blue;">Payment Status: PAID ✅</h3>
          `;

          document.getElementById("printBtn").style.display = "block";
        }
      }, 1000);
    }

    function printReceipt() {
      window.print();
    }
