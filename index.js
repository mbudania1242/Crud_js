let IPAddress = "http://192.168.0.104:5000/";
function toggleCheck() {
  let table = this.closest("table");
  let checks = table.querySelectorAll('input[type="checkbox"]');
  checks.forEach((check) => (check.checked = this.checked));
}
//Fetch All Data  (Read)
let allcustomer = () => {
  fetch(IPAddress + "users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data) {
        // console.log(data.users);
        Table(data.users);
      }
    });
};

let Table = (data) => {
  let table = document.createElement("table");
  let tr = document.createElement("tr");
  let thSR = document.createElement("th");
  let themail = document.createElement("th");
  let thname = document.createElement("th");
  let thpassword = document.createElement("th");
  let thphone = document.createElement("th");
  let thaction = document.createElement("th");
  let thaction2 = document.createElement("th");
  thSR.textContent = "Sr. No.";
  themail.textContent = "Email";
  thname.textContent = "Name";
  thpassword.textContent = "Password";
  thphone.textContent = "Phone";
  thaction2.textContent = "Edit";
  let toggleAll = document.createElement("input");
  toggleAll.id = "toggle-all";
  toggleAll.setAttribute("type", "checkbox");
  toggleAll.addEventListener("click", toggleCheck);
  thaction.appendChild(toggleAll);
  tr.classList.add("border-[2px]", "border-[purple]");
  tr.appendChild(thaction);
  tr.appendChild(thSR);
  tr.appendChild(thname);
  tr.appendChild(themail);
  tr.appendChild(thphone);
  tr.appendChild(thpassword);
  tr.appendChild(thaction2);
  table.appendChild(tr);
  let sr = 1;
  data.map((items) => {
    let tr = document.createElement("tr");
    // let tdsr = document.createElement("td");
    let tdsr = document.createElement("td");
    let tdname = document.createElement("td");
    let tdemail = document.createElement("td");
    let tdphone = document.createElement("td");
    let tdpassword = document.createElement("td");
    let tdcheckbox = document.createElement("td");
    let tdEdit = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    let Buttonedit = document.createElement("Button");
    Buttonedit.textContent = "Edit";
    Buttonedit.setAttribute("id", items._id);
    Buttonedit.setAttribute("class", "edit-btn");
    Buttonedit.classList.add(
      "bg-purple-600",
      "m-[2px]",
      "p-[2px]",
      "text-[white]",
      "rounded-[5px]",
      "hover:text-[black]",
      "hover:bg-[white]",
      "border-2",
      "border-purple-700",
      "transition",
      "ease-in-out",
      "duration-500"
    );
    tdEdit.appendChild(Buttonedit);

    input.setAttribute("value", items._id);
    tdname.textContent = items.name;
    tdemail.textContent = items.email;
    tdphone.textContent = items.phone;
    tdpassword.textContent = items.password;
    tdsr.textContent = sr;

    tdcheckbox.appendChild(input);
    tr.appendChild(tdcheckbox);
    tr.appendChild(tdsr);
    tr.appendChild(tdname);
    tr.appendChild(tdemail);
    tr.appendChild(tdphone);
    tr.appendChild(tdpassword);
    tr.appendChild(tdEdit);
    table.appendChild(tr);
    tr.classList.add("border-[2px]", "border-[purple]", "text-center");
    table.classList.add("w-[900px]");
    document.getElementById("showdiv").appendChild(table);
    sr++;
  });
};

//(Create) New Customer
let Create = (Alldetails) => {
  fetch(IPAddress + "create-user", {
    method: "POST",
    headers: {
      "content-type": "application/json;",
    },
    body: JSON.stringify(Alldetails),
  })
    .then((res) => {
      return res.json();
    })
    .then((mass) => {
      if (mass.message == "success") {
        alert("New Customer Added.");
        Clearinput();
      } else {
        alert("Something went Wrong, please try again later");
      }
    });
};
let Submit = document.getElementById("Submit");
if (Submit) {
  Submit.addEventListener("click", () => {
    console.log("test");
    let name = document.getElementById("Name");
    let email = document.getElementById("Email");
    let password = document.getElementById("password");
    let phone = document.getElementById("Phone");
    if (
      name.value != null &&
      name.value != "" &&
      password.value != null &&
      password.value != "" &&
      email.value != null &&
      email.value != "" &&
      phone.value != null &&
      phone.value != ""
    ) {
      let Alldetails = {
        email: email.value,
        name: name.value,
        password: password.value,
        phone: phone.value,
      };
      Create(Alldetails);
    } else {
      alert("Please enter all the details and then try to submit it.");
    }
    //Create(Alldetails);
  });
}
//Clear Input filled

let Clearinput = () => {
  let name = document.getElementById("Name");
  let email = document.getElementById("Email");
  let password = document.getElementById("password");
  let phone = document.getElementById("Phone");
  name.value = "";
  email.value = "";
  password.value = "";
  phone.value = "";
};

//Fetching Data By using Customer Id
function Edit(id) {
  fetch(IPAddress + `/get-user/${id}`)
    .then((res) => {
      if (!res.ok) {
        console.log("There is an error");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      filldatatoinput(data);
    });
}

let filldatatoinput = (res) => {
  console.log(res);
};

//CustomerDetails(1);

let deleteUsingCheckbox = () => {
  let table = document.querySelector("table");
  let checks = table.querySelectorAll('td>input[type="checkbox"]');
  checks.forEach((check) => {
    let checked = check.checked;
    if (checked) {
      let value = check.value;
      Delete(value);
    }
  });
};

//Delete Customer by Using Id (Delete)
let Delete = (cId) => {
  // console.log(customerId, typeof customerId);
  fetch(IPAddress + `/delete-user/${cId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((mass) => {
      console.log("Enter 2");
      alert(mass.message);
      window.location.reload();
    })
    .catch((error) => {
      console.log("There is an error", error);
    });
};
//Delete(1);

//Update Customer Data (Update)
let update = (Updatedetails, Cid) => {
  fetch(IPAddress + `/update-user/${Cid}`, {
    method: "POST",
    body: JSON.stringify(Updatedetails),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.message);
      window.location.reload();
    });
};
// update(Updatedetails, 1);

let saveupdate = () => {
  let _id = document.getElementById("_id").value;
  let updateobje = {
    email: document.getElementById("UEmail").value,
    name: document.getElementById("UName").value,
    password: document.getElementById("Upassword").value,
    phone: document.getElementById("UPhone").value,
  };
  update(updateobje, _id);
};
