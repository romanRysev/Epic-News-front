import {
  SIGNIN_POPUP_TEMPLATE,
  SIGNUP_POPUP_TEMPLATE,
  SUCCESSFUL_POPUP_TEMPLATE,
} from "../constants/constants";

export class Popup {
  constructor() {
    this.popupContent = document.querySelector(".popup__content");
    this.popup = document.querySelector(".popup");
    this.content = "";
  }

  setContent(props) {
    const { contentType } = props;

    switch (contentType) {
      case "signin":
        this.popupContent.insertAdjacentHTML(
          "beforeend",
          SIGNIN_POPUP_TEMPLATE
        );
        this.content = contentType;
        break;

      case "signup":
        this.popupContent.insertAdjacentHTML(
          "beforeend",
          SIGNUP_POPUP_TEMPLATE
        );
        this.content = contentType;
        break;

      case "signup-successful":
        this.popupContent.insertAdjacentHTML(
          "beforeend",
          SUCCESSFUL_POPUP_TEMPLATE
        );
        this.content = contentType;
        break;
    }
  }

  clearContent() {
    this.popupContent.lastChild.remove();
  }

  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }
}
