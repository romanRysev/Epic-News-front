export class Header {
  constructor() {
    this.isLoggedIn = false;
    this.userName = '';
  }

  render(props) {
    if (props) {
      this.isLoggedIn = true
      this.userName = props.data.name;
    }
    const button = document.querySelector(".header__autorization-button");
    if (this.isLoggedIn) {
      button.textContent = this.userName;
      const buttonIcon = document.createElement("img");
      buttonIcon.setAttribute("src", `./images/logout.svg`);
      buttonIcon.setAttribute("alt", "logout");
      buttonIcon.classList.add("header__autorization-button-icon");
      button.append(buttonIcon);
    } else {
      button.textContent = "Авторизоваться";
      const link = document.querySelector(".menu__link_home");
      link.parentNode.remove(link);
    }
  }
}
