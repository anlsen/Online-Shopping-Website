function isCredentialsOkay(email, password) {
  return (
    email &&
    email.trim() !== "" &&
    email.includes("@") &&
    password &&
    password.trim().length >= 6
  );
}

function isDetailOkay(detail) {
  return detail && detail.trim() !== "";
}

function isInputOkay(email, password, fullname, street, postal, city) {
  return (
    isCredentialsOkay(email, password) &&
    isDetailOkay(fullname) &&
    isDetailOkay(street) &&
    isDetailOkay(postal) &&
    isDetailOkay(city)
  );
}

function isEmailConfirmed(email,confirm){
    return email===confirm;
}


module.exports={
    isInputOkay:isInputOkay,
    isEmailConfirmed:isEmailConfirmed
}