const User = require("../models/user-model");
const authSession = require("../util/auth-session");
const inputValidation = require("../util/user-input-validation");
const inputErrorSession = require("../util/input-error-session");

function getSignup(req, res) {
  const inputData = inputErrorSession.getInputData(req, {
    email: "",
    password: "",
    "confirm-email": "",
    fullname: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
    },
  });

  res.render("customer/auth/signup", { inputData: inputData });
}

async function postSignup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body["postal-code"],
    req.body.city
  );

  // INVALID USER CREDENTIALS ERROR
  if (
    !inputValidation.isInputOkay(
      user.email,
      user.password,
      user.fullname,
      user.address.street,
      user.address.postalCode,
      user.address.city
    ) ||
    !inputValidation.isEmailConfirmed(user.email, req.body["confirm-email"])
  ) {
    inputErrorSession.setErrorOnSession(
      req,
      { ...user, "confirm-email": req.body["confirm-email"] },
      "Invalid User Credentials",
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  // EMAIL ALREADY EXISTS ERROR
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (existingUser) {
    inputErrorSession.setErrorOnSession(
      req,
      { ...user, "confirm-email": req.body["confirm-email"] },
      "User already exists",
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  try {
    await user.signup();

    res.redirect("/login");
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
}

function getLogin(req, res) {
  const inputData = inputErrorSession.getInputData(req, {
    email: "",
    password: "",
  });
  res.render("customer/auth/login", { inputData: inputData });
}

async function postLogin(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    inputErrorSession.setErrorOnSession(
      req,
      user,
      "User does not exist",
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  let doesPasswordMatch;
  try {
    doesPasswordMatch = await user.doesPasswordMatch(existingUser.password);
  } catch (error) {
    next(error);
    return;
  }

  if (!doesPasswordMatch) {
    inputErrorSession.setErrorOnSession(
      req,
      user,
      "Invalid Password",
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authSession.createAuthSession(req, existingUser, res);
}

function postLogout(req, res) {
  authSession.removeAuthSession(req, res);
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  postLogout: postLogout,
};
