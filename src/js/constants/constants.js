export const BASE_SERVER_URL = `https://api.epic-news.site`;
export const NEWS_SERVER_URL = `https://praktikum.tk/news/v2/everything`; //`https://praktikum.tk/news/v2/everything`
export const NEWS_API_TOKEN = "1963a8db2009488f92a7b0a5040ad5ec";
export const ELEMENTS_PER_LINE = 3;
export const SIGNIN_POPUP_TEMPLATE = `<div class="signin">
<h2 class="signin__title popup__title">Вход</h2>
<form class="form signin__form" name="signin">
  <p class="form__input-title signin__email-title">Email</p>
  <input type="email" name="email" class="form__input signin__email-input" pattern="[a-zA-Z0-9]+[a-zA-Z0-9._-]*@+[a-zA-Z0-9]+\.+[a-zA-Z]+" placeholder="Введите почту" required>
  <p class="signin__email-error form__error"></p>
  <p class="form__input-title signin__password-title">Пароль</p>
  <input type="password" name="password" class="form__input signin__password-input" placeholder="Введите пароль" minlength="7" required>
  <p class="signin__password-error form__error"></p>
  <p class="signin__form-error form__error"></p>
  <button class="button form__button signin__button button_disabled" disabled>Войти</button>
</form>
<div class="popup__switch">
  или
    <span class="popup__switch-color-text "> Зарегистрироваться</span>
  </div>
</div>`;
export const SIGNUP_POPUP_TEMPLATE = `<div class="signup">
<h2 class="signup__title popup__title">Регистрация</h2>
<form class="form signup__form" name="signup">
    <p class="form__input-title signup__email-title">Email</p>
    <input type="email" name="email" class="form__input signup__email-input" pattern="[a-zA-Z0-9]+[a-zA-Z0-9._-]*@+[a-zA-Z0-9]+\.+[a-zA-Z]+" placeholder="Введите почту" required>
    <p class="signup__email-error form__error"></p>
    <p class="form__input-title signup__password-title">Пароль</p>
    <input type="password" name="password" class="form__input signup__password-input" placeholder="Введите пароль" minlength="7" required>
    <p class="signup__password-error form__error"></p>
    <p class="form__input-title signup__name-title">Имя</p>
    <input type="text" name="name" class="form__input signup__name" pattern="[А-Яа-яёЁa-zA-Z-\s]*" placeholder="Введите своё имя" minlength="2" maxlength="20" required>
    <p class="signup__name-error form__error"></p>
    <p class="signup__form-error form__error"></p>
    <button class="button form__button signup__button button_disabled" disabled>Зарегистрироваться</button>
</form>
<div class="popup__switch">
  или
    <span class="popup__switch-color-text "> Войти</span>
  </div>
</div>`;
export const SUCCESSFUL_POPUP_TEMPLATE = `<div class="signup-successful"><h2 class="signup__title popup__title">Пользователь успешно зарегистрирован!</h2>
<span class="popup__switch-color-text ">Выполнить вход</span></div>`;