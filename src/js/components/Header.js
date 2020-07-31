export class Header {
  constructor() {
    this.isLoggedIn = false;
    this.userName = "";
    this.menuLink = document.querySelector(".menu__link_home");
  }

  render(props, page) {
    if (props) {
      this.isLoggedIn = true;
      this.userName = props.data.name;
    }
    const button = document.querySelector(".header__autorization-button");
    if (this.isLoggedIn) {
      if (page == "main") {
        button.textContent = this.userName;
        const buttonIcon = document.createElement("img");
        buttonIcon.setAttribute("src", `./images/logout.svg`);
        buttonIcon.setAttribute("alt", "logout");
        buttonIcon.classList.add("header__autorization-button-icon");
        button.append(buttonIcon);
      } else {
        button.textContent = this.userName;
        const buttonIcon = document.createElement("img");
        buttonIcon.setAttribute("src", `./images/logout_black.svg`);
        buttonIcon.setAttribute("alt", "logout");
        buttonIcon.classList.add("header__autorization-button-icon");
        button.append(buttonIcon);
      }
    } else {
      button.textContent = "Авторизоваться";
      console.log(this.menuLink)
      this.menuLink.classList.add('menu__link_invisible')
    }
  }
}
