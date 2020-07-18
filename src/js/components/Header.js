export class Header {
  constructor() {

  }

  render(props) {
    const { isLoggedIn, userName } = props;
    const button =  document.querySelector('.header__autorization-button');
    if(isLoggedIn) {
      button.textContent = userName;
      const buttonIcon = document.createElement('img');
      buttonIcon.setAttribute('src', `./images/logout.svg`);
      buttonIcon.setAttribute('alt', 'logout');
      buttonIcon.classList.add('header__autorization-button-icon');
      button.append(buttonIcon);
    } else {
      button.textContent = 'Авторизоваться';
      const link =  document.querySelector('.menu__link_home');
      link.parentNode.remove(link);
    }
  }
}