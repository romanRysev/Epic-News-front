export class Form {
  constructor(form) {
    this.form = form;
  }

  _validateInputElement(event, errorElement) {}

  _validateForm() {}

  _clear() {
    this.form.reset();
  }
}
