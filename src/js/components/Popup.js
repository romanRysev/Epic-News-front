export class Popup {
  constructor() {
    this.popupContent = document.querySelector('.popup__content');
    this.popup = document.querySelector('.popup');
  }

  setContent(props) {
    const {contentType} = props;
    console.log(contentType);
    const signinPopupContent = `<div class="signin">
    <h2 class="signin__title popup__title">Вход</h2>
    <form class="form signin__form">
        <p class="form__input-title signin__email-title">Email</p>
        <input type="text" class="form__input signin__email-input" pattern="[a-zA-Z0-9]+[a-zA-Z0-9._-]*@+[a-zA-Z0-9]+\.+[a-zA-Z]+" placeholder="Введите почту" required>
        <p class="signin__email-error form__error"></p>
        <p class="form__input-title signin__password-title">Пароль</p>
        <input type="password" class="form__input signin__password-input" placeholder="Введите пароль">
        <p class="signin__password-error form__error"></p>
        <p class="signin__form-error form__error"></p>
        <button class="button form__button signin__button signin__button_disabled">Войти</button>
    </form>
    <div class="popup__switch">
      или
        <span class="popup__switch-color-text "> Зарегистрироваться</span>
      </div>
</div>`;

const signupPopupContent = `<div class="signup">
<h2 class="signup__title popup__title">Регистрация</h2>
<form class="form signup__form">
    <p class="form__input-title signup__email-title">Email</p>
    <input type="text" class="form__input signup__email-input" pattern="[a-zA-Z0-9]+[a-zA-Z0-9._-]*@+[a-zA-Z0-9]+\.+[a-zA-Z]+" placeholder="Введите почту" required>
    <p class="signup__email-error form__error"></p>
    <p class="form__input-title signup__password-title">Пароль</p>
    <input type="password" class="form__input signup__password-input" placeholder="Введите пароль" required>
    <p class="signup__password-error form__error"></p>
    <p class="form__input-title signup__name-title">Имя</p>
    <input type="text" class="form__input signup__name" pattern="[A-Z][a-z]+(-?[A-Z][a-z]+)?" placeholder="Введите своё имя" minlength="2" maxlength="20" required>
    <p class="signup__name-error form__error"></p>
    <p class="signup__form-error form__error"></p>
    <button class="button form__button signup__button button_disabled" disabled>Зарегистрироваться</button>
</form>
<div class="popup__switch">
  или
    <span class="popup__switch-color-text "> Войти</span>
  </div>
</div>`

const signupSuccessfulPopupContent = `<div class="signup-successful"><h2 class="signup__title popup__title">Пользователь успешно зарегистрирован!</h2>
<span class="popup__switch-color-text ">Выполнить вход</span></div>`

    switch (contentType) {
      case 'signin':
        this.popupContent.insertAdjacentHTML('beforeend', signinPopupContent);
      break;

      case 'signup':
        this.popupContent.insertAdjacentHTML('beforeend', signupPopupContent);
      break;

      case 'signup-successful':
        this.popupContent.insertAdjacentHTML('beforeend', signupSuccessfulPopupContent);
      break;
    }

  }

  clearContent() {
    this.popupContent.lastChild.remove();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}