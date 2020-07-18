import {baseServerUrl} from '../constants/constants';

export class MainApi {
  constructor() {
    this.baseUrl = baseServerUrl,
    this.headers= {
      'Content-Type': 'application/json'
    }
  }

  makeFetch(link, method='GET', body) {

    if (body) {
      body = JSON.stringify(body)
    }

    return  fetch(`${this.baseUrl}/${link}`, {
      method: method,
      headers: this.headers,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getMe() {
    return  console.log(this.makeFetch('users/me'));
}
}