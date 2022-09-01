const giveLoginValidationRules = (values) => {
  let errors = {};

  /*
  
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  */

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default giveLoginValidationRules;
