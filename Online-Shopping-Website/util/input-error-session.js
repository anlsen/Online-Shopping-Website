function setErrorOnSession(req, user, message, callback) {
  req.session.inputData = {
    hasError: true,
    message: message,
    userData: {
      ...user,
    },
  };
  req.session.save(callback);
}



function getInputData(req, defaultValues) {
  if (req.session.inputData) {
    const inputData = { ...req.session.inputData };
    req.session.inputData = null;
    return inputData;
  } else {
    return {
      hasError: false,
      userData: {
        ...defaultValues,
      },
    };
  }
}

module.exports = {
  setErrorOnSession: setErrorOnSession,
  getInputData: getInputData,
};
