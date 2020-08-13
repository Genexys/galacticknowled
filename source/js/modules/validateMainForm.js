import {validateForm} from './getValidate';

const validateMainForm = () => {
  const form = document.querySelector(`.main-form`);

  const constraints = {
    name: {
      presence: true,
    },
    phone: {
      presence: true,
      format: {
        pattern: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/
      }
    },
  };

  validateForm(form, constraints);
};

export {validateMainForm};
