export class Form {
  constructor() {

  }

  checkInputValidity(event, errorElement) {
    const form = event.target.parentElement;
    console.log(form.checkValidity());
    if (!form.checkValidity()) {
      if (event.target.validity.valueMissing) {
        errorElement.textContent = 'Это обязательное поле'
        return false;
      }
      if (event.target.validity.tooLong || event.target.validity.tooShort) {
        errorElement.textContent = 'Должно быть от 2 до 20 символов'
        return false;
      }
      if (event.target.validity.typeMismatch) {
        errorElement.textContent = 'Здесь должна быть почта'
        return false;
      }
      errorElement.textContent = ''
      return false;
    }
    errorElement.textContent = ''
    return true;
  }

  setSubmitButtonState(result, event) {
    const button = event.target.parentElement.querySelector('.form__button');
    if (result) {
      button.classList.remove('button_disabled');
      button.removeAttribute('disabled');
    } else {
      button.classList.add('button_disabled');
      button.setAttribute('disabled', true);
    }
  }

  _clear() {

  }
}
