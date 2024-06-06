// access the all html elements 
let formEl = document.getElementById("addUserForm");
let nameInputEl = document.getElementById("name");
let nameErrMsg = document.getElementById("nameErrMsg");
let emailInputEl = document.getElementById("email");
let emailErrMsg = document.getElementById("emailErrMsg");
let workingStatusEl = document.getElementById("status");
let maleRadioEl = document.getElementById("genderMale");
let femaleRadioEl = document.getElementById("genderFemale");
let submitbutEl = document.getElementById("submit-button");
// create the html object for user data 
let userdata = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};
// occurs when the name input element value changes
nameInputEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        nameErrMsg.textContent = "Required *";
        nameErrMsg.classList.add("required-msg");
    } else {
        nameErrMsg.textContent = "";
    }
    userdata.name = event.target.value;
    console.log(userdata.name);
});
// occurs when the email input element value changes
emailInputEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsg.textContent = "Required *";
        emailErrMsg.classList.add("required-msg");
    } else {
        emailErrMsg.textContent = "";
    }
    userdata.email = event.target.value;
    console.log(userdata.email);
});
// occurs when the working status  input element value changes
workingStatusEl.addEventListener("change", function(event) {
    userdata.status = event.target.value;
    console.log(userdata.status);
});
// occurs when the male radio input element value changes
maleRadioEl.addEventListener("change", function(event) {
    userdata.gender = event.target.value;
    console.log(userdata.gender);
})
// // occurs when the female radio input element value changes
femaleRadioEl.addEventListener("change", function(event) {
    userdata.gender = event.target.value;
    console.log(userdata.gender);
});
// function for user validatiuons 
function validateFormData(userdata) {
    console.log(userdata);
    let {
        name,
        email
    } = userdata;
    if (name === "") {
        nameErrMsg.textContent = "Required *";
    }
    if (email === "") {
        emailErrMsg.textContent = "Required *";
    }
}
// function for the user data send to the server
function createUserData(userdata) {
    let url = "https://gorest.co.in/public-api/users";

    let option = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 16d47cf68059ecea8b9b8a37048f841e8d77f4867bc8911ad353eebe11d86141"
        },
        body: JSON.stringify(userdata)
    };
    fetch(url,option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if(jsonData.code===422){
                if(jsonData.data[0].message==="has already been taken"){
                    emailErrMsg.textContent="given email already taken";
                    emailErrMsg.classList.add("required-msg");
                    console.log(emailErrMsg.textContent);
                }
            }
        });

}

formEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateFormData(userdata);
    createUserData(userdata);
});