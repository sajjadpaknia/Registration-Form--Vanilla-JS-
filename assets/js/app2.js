// Get element from the DOM
const loginFormContainer = document.querySelector(
  ".form-container-content.login"
);
const signUpFormContainer = document.querySelector(
  ".form-container-content.signUp"
);
const loginForm = document.querySelector(".form-box.login");
const signUpForm = document.querySelectorAll(".form-box.signUp");
const signUpFieldsets = document.querySelectorAll("#signUp-fieldset");
const accountFieldsets = document.querySelectorAll("#account-fieldset");
const emailFieldsets = document.querySelectorAll(".email-fieldset");
const passwordFieldsets = document.querySelectorAll(".password-fieldset");
const nameFieldsets = document.querySelectorAll(".name-fieldset");
const usernameFieldset = document.querySelector(".username-fieldset");
const emailInputs = document.querySelectorAll("#email");
const loginEmailInput = document.querySelector("[data-input='login-email']");
const passwordInputs = document.querySelectorAll("#password");
const nameInputs = document.querySelectorAll("[data-input='name']");
const usernameInput = document.querySelector("#username");
const eyeIconContainer = document.querySelector(".eye-icon-container");
const loginBtn = document.querySelector("#login-btn");
const submitBtn = document.querySelectorAll(".submit__btn");
const nextBtns = document.querySelectorAll(".next-btn");
const stepForms = document.querySelectorAll(".step-form");
const inputs = document.querySelectorAll("input");
inputs.forEach((i) => {
  i.autocomplete = "off";
});
// login validation
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  emailInputs.forEach((input, index) => {
    if (input.name === "login-form-email-input") {
      emailValidation("login", input, index);
      return;
    }
  });
  passwordInputs.forEach((input, index) => {
    if (input.name === "login-form-password-input") {
      passwordValidation("login", input, index);
      LoginValidation(index);
      return;
    }
  });
});
function LoginValidation(index) {
  if (
    !emailFieldsets[index].classList.contains("error") &&
    !passwordFieldsets[index].classList.contains("error")
  ) {
    loading("login", index);
    // loginForm.submit();
  } else {
    console.log("error");
  }
}

// add Event Listener - email
const EMAIL_MAX_LENGTH = 60;
emailInputs.forEach((input, index) => {
  input.placeholder = "example@mail.com";
  input.maxLength = EMAIL_MAX_LENGTH;
  input.addEventListener("blur", () => {
    if (input.name === "login-form-email-input") {
      emailValidation("login", input, index);
      return;
    } else if (input.name === "signUp-form-email-input") {
      emailValidation("signUp", input, index);
      return;
    }
  });
});
// add Event Listener - email

// add Event Listener - password
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 24;
let signUpFormPasswordInput = "";
passwordInputs.forEach((input, index) => {
  input.maxLength = PASSWORD_MAX_LENGTH;
  if (input.name === "login-form-password-input") {
    input.addEventListener("blur", () => {
      passwordValidation("login", input, index);
    });
    input.placeholder = "Enter your password";
    return;
  } else if (input.name === "signUp-form-password-input") {
    input.placeholder = "6+ strong characters";
    input.addEventListener("blur", () => {
      passwordValidation("signUp", input, index);
    });
    input.addEventListener("input", (event) => {
      signUpFormPasswordInput = event.target.value;
    });
    return;
  } else if (input.name === "signUp-form-repeat-password-input") {
    input.placeholder = "Repeat your password";
    input.addEventListener("blur", () => {
      repeatPasswordValidation(input, index);
    });
    return;
  }
});
function repeatPasswordValidation(input, index) {
  const passwordInputValue = input.value.replace(/\s/g, "").toString();
  if (passwordInputValue === "") {
    setError(
      "password",
      `Password must be ${PASSWORD_MIN_LENGTH}+ characters `,
      index
    );
    return;
  } else if (passwordInputValue !== signUpFormPasswordInput) {
    setError("password", `Password no fix `, index);
    return;
  } else {
    setSuccess("password", index);
  }
}
// add Event Listener - password

// Email validation
function emailValidation(typeOfForm, input, index) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailInputValue = input.value.trim().toString().toLowerCase();
  const emailRegexResult = emailRegex.test(emailInputValue);
  if (emailInputValue === "") {
    setError("email", "Email can't be blank.", index);
    return;
  } else if (!emailRegexResult) {
    setError("email", "The entered email is incorrect.", index);
    return;
  } else if (typeOfForm === "login") {
    fetchLoginEmail(emailInputValue, index);
    return;
  } else if (typeOfForm === "signUp") {
    fetchSignUpEmail(emailInputValue, index);
    return;
  }
}

function fetchLoginEmail(inputValue, index) {
  // server request
  if (inputValue !== "admin@mail.com") {
    setError(
      "email",
      "The email entered is not available. Enter ➞ admin@mail.com",
      index
    );
    return;
  } else {
    setSuccess("email", index);
  }
}
function fetchSignUpEmail(inputValue, index) {
  // server request
  if (inputValue === "admin@mail.com") {
    setError("email", "The email entered has already been registered.", index);
    return;
  } else {
    setSuccess("email", index);
  }
}
// Email validation
// Password validation
function passwordValidation(typeOfForm, input, index) {
  const passwordInputValue = input.value.replace(/\s/g, "").toString();
  if (passwordInputValue === "") {
    setError(
      "password",
      `Password must be ${PASSWORD_MIN_LENGTH}+ characters `,
      index
    );
    return;
  } else if (typeOfForm === "login") {
    fetchLoginPassword(passwordInputValue, index);
    return;
  } else if (typeOfForm === "signUp") {
    if (
      passwordInputValue.length < PASSWORD_MIN_LENGTH ||
      passwordInputValue.length > PASSWORD_MAX_LENGTH
    ) {
      setError(
        "password",
        `Enter between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters. `,
        index
      );
      return;
    } else {
      setSuccess("password", index);
    }
  }
}

function fetchLoginPassword(inputValue, index) {
  // server request
  if (inputValue !== "admin123") {
    setError(
      "password",
      "The password entered is not available. Enter ➞ admin123",
      index
    );
    return;
  } else {
    setSuccess("password", index);
  }
}
// Password validation

// login validation

// signUp validation
signUpForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.id === "signUp-form") {
      nameInputs.forEach((input, index) => {
        nameValidation("name", input, index);
      });
      emailInputs.forEach((input, index) => {
        if (input.name === "signUp-form-email-input") {
          emailValidation("signUp", input, index);
          signUpValidation(signUpFieldsets, index - 1);

          return;
        }
      });
    } else if (form.id === "account-form") {
      usernameValidation("username", usernameInput);
      passwordInputs.forEach((input, index) => {
        if (input.name === "signUp-form-password-input") {
          passwordValidation("signUp", input, index);
          input.addEventListener("input", (event) => {
            signUpFormPasswordInput = event.target.value;
          });
        } else if (input.name === "signUp-form-repeat-password-input") {
          repeatPasswordValidation(input, index);
          signUpValidation(accountFieldsets, index - 1);
          //( index - 1 )=> Because we have three password inputs.
          return;
        }
      });
    }
  });
});

function signUpValidation(typeOfFieldsets, index) {
  // Checking for errors in fieldsets
  let signUpFieldsetsArray = Array.from(typeOfFieldsets);
  let isError = null;
  let arrayOfFieldsetErrors = [];
  signUpFieldsetsArray.map((fieldset) => {
    getBoolean = Boolean(fieldset.classList.contains("error"));
    arrayOfFieldsetErrors.push(getBoolean);
  });
  isError = arrayOfFieldsetErrors.includes(true);

  // Checking for errors in fieldsets
  // functionality
  if (isError === false) {
    loading("signUp", index);
    // loginForm.submit();
  } else {
    console.log("error");
  }
  // functionality
}
// add Event Listener - name
const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 24;
nameInputs.forEach((input, index) => {
  input.maxLength = NAME_MAX_LENGTH;
  input.minLength = NAME_MIN_LENGTH;
  input.addEventListener("blur", () => {
    nameValidation("name", input, index);
  });
  if (input.name === "first-name") {
    input.placeholder = "Enter your first name";
  } else if (input.name === "last-name") {
    input.placeholder = "Enter your last name";
  }
});
// add Event Listener - name

// add Event Listener - username
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 24;
usernameInput.minLength = USERNAME_MIN_LENGTH;
usernameInput.maxLength = USERNAME_MAX_LENGTH;
usernameInput.placeholder = "johndoe";
usernameInput.addEventListener("blur", () => {
  usernameValidation("username", usernameInput);
});
// add Event Listener - username

// Name validation
function nameValidation(inputType, input, index) {
  const inputValue = input.value.replace(/\s/g, "").toString().toLowerCase();
  if (inputValue === "") {
    setError(inputType, "This field can't be blank.", index);
    return;
  } else if (inputValue.length < NAME_MIN_LENGTH) {
    setError(
      inputType,
      `Min ${NAME_MIN_LENGTH} and max ${NAME_MAX_LENGTH} characters. `,
      index
    );

    return;
  } else {
    setSuccess(inputType, index);
  }
}
// Name validation

// Username validation
function usernameValidation(typeOfInput, input) {
  const inputValue = input.value.replace(/\s/g, "").toString().toLowerCase();
  if (inputValue === "") {
    setError(typeOfInput, "Username can't be blank.");
    return;
  } else if (inputValue.length < USERNAME_MIN_LENGTH) {
    setError(
      typeOfInput,
      `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters. `
    );
    return;
  } else {
    setSuccess(typeOfInput);
  }
}
// Username validation

// show next step
let formStepNum = 0;
function showNextStep(index) {
  // formStepNum++;
  stepForms[index].classList.add("hide");
  stepForms[index].classList.remove("show");
  stepForms[index + 1].classList.add("show");
  updateProgressbar(index + 1);
}

const stepItems = document.querySelectorAll(".step__item");
function updateProgressbar(indexForm) {
  stepItems.forEach((item, index) => {
    if (index < indexForm + 1) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
// show next step

// signUp validation

// set Error & Success
function setError(input, msg, index) {
  if (input === "email") {
    emailFieldsets[index].classList.remove("valid");
    emailFieldsets[index].classList.add("error");
    emailFieldsets[index].querySelector(".input-error-msg").innerHTML = msg;
  } else if (input === "password") {
    passwordFieldsets[index].classList.remove("valid");
    passwordFieldsets[index].classList.add("error");
    passwordFieldsets[index].querySelector(".input-error-msg").innerHTML = msg;
  } else if (input === "name") {
    nameFieldsets[index].classList.remove("valid");
    nameFieldsets[index].classList.add("error");
    nameFieldsets[index].querySelector(".input-error-msg").innerHTML = msg;
  } else if (input === "username") {
    usernameFieldset.classList.remove("valid");
    usernameFieldset.classList.add("error");
    usernameFieldset.querySelector(".input-error-msg").innerHTML = msg;
  }
}
function setSuccess(input, index) {
  if (input === "email") {
    emailFieldsets[index].classList.remove("error");
    emailFieldsets[index].classList.add("valid");
  } else if (input === "password") {
    passwordFieldsets[index].classList.remove("error");
    passwordFieldsets[index].classList.add("valid");
  } else if (input === "name") {
    nameFieldsets[index].classList.remove("error");
    nameFieldsets[index].classList.add("valid");
  } else if (input === "username") {
    usernameFieldset.classList.remove("error");
    usernameFieldset.classList.add("valid");
  }
}

// Show and hide password value
eyeIconContainer.addEventListener("click", showHidePasswordValue);
function showHidePasswordValue() {
  let input = passwordInputs[0];
  if (input.type === "password") {
    input.setAttribute("type", "text");
    eyeIconContainer.classList.add("hide");
  } else {
    input.setAttribute("type", "password");
    eyeIconContainer.classList.remove("hide");
  }
}
// Show and hide password value

// signup / login transferer
function goToSignUp() {
  signUpFormContainer.classList.remove("hide");
  signUpFormContainer.classList.add("show");
  loginFormContainer.classList.remove("show");
  loginFormContainer.classList.add("hide");
}
function goToLogin() {
  signUpFormContainer.classList.remove("show");
  signUpFormContainer.classList.add("hide");
  loginFormContainer.classList.remove("hide");
  loginFormContainer.classList.add("show");
}
// signup / login transferer
// loading
function loading(form, index) {
  if (form === "login") {
    loginBtn.classList.add("loading");
    loginBtn.style.cursor = "default";
    loginBtn.disabled = true;
    setTimeout(() => {
      loginBtn.classList.remove("loading");
    }, 500);
  } else if (form === "signUp") {
    if (index === "submit") {
      submitBtnLast.classList.add("loading");
      submitBtnLast.style.cursor = "default";
      submitBtnLast.disabled = true;
      setTimeout(() => {
        submitBtnLast.classList.remove("loading");
      }, 500);
      return;
    }
    nextBtns[index].classList.add("loading");
    nextBtns[index].style.cursor = "default";
    nextBtns[index].disabled = true;
    setTimeout(() => {
      nextBtns[index].classList.remove("loading");
      showNextStep(index);
    }, 500);
  }
}
// loading

// uploading file
const uploadFieldset = document.querySelector(".upload-fieldset");
const uploadResult = document.querySelector(".upload-result");
const uploadInput = uploadFieldset.querySelector(".upload-input");
const progressPercent = document.querySelector(".progress-percent");
const progressBarLoad = document.querySelector(".progress-bar--load");
const progressBarContainer = document.querySelector(".upload-result__progress");
const uploadResultFile = document.querySelector(".upload-result__file");
uploadFieldset.addEventListener("click", () => {
  uploadInput.click();
});
uploadFieldset.addEventListener("drop", (e) => {
  e.preventDefault();
  showUploadFile(e);
});
uploadInput.addEventListener("change", (e) => {
  e.preventDefault();
  e.target.disabled = true;
  showUploadFile(e);
});
function showUploadFile(e) {
  progressBarContainer.classList.remove("hide");
  uploadResult.classList.add("show");
  updateUploadProgress(e);
}
let isErrorUpload = true;
function updateUploadProgress(e) {
  let NUMBER = 0;
  setInterval(() => {
    if (NUMBER < 100) {
      NUMBER++;
      progressBarLoad.style.width = `${NUMBER}%`;
      progressPercent.innerHTML = `${NUMBER}%`;
    } else {
      progressBarContainer.classList.add("hide");
      uploadResultFile.classList.remove("hide");
      isErrorUpload = false;
      e.target.disabled = false;
      return;
    }
  }, 20);
}
// submit
const submitBtnLast = document.querySelector(".upload-form-btn");
submitBtnLast.addEventListener("click", (e) => {
  e.preventDefault();
  if (isErrorUpload === false) {
    loading("signUp", "submit");
  }
});
// submit
// uploading file
