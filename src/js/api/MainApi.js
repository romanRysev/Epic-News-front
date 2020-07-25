import {baseServerUrl} from '../constants/constants';

export class MainApi {
  constructor() {
    this.baseUrl = baseServerUrl,
    this.headers= {
      'Content-Type': 'application/json',
      credentials: 'include',
      withCredentials: true,
    }
  }

  makeFetch(link, method='GET', body) {

    if (body) {
      body = JSON.stringify(body)
    }

    return  fetch(`${this.baseUrl}/${link}`, {
      method: method,
      headers: this.headers,
      body: body,
      credentials: 'include',
      withCredentials: true,
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
    return  this.makeFetch('users/me').then(res => console.log(res));;
}

  signup() {
    return this.makeFetch('signup', 'POST', {
      'name': 'Roman',
      'email': 'peley9171@gmail.com',
      'password': '62vgvhc4'
    }).then(res => console.log(res));
  }

  signin() {
    return this.makeFetch('signin', 'POST', {
      'email': 'peley9171@gmail.com',
      'password': '62vgvhc4'
    }).then(res => console.log(res));
  }

  getArticles() {
    return  this.makeFetch('articles/').then(res => console.log(res));;
  }

  createArticle() {
    return  this.makeFetch('articles/', 'POST', {
      keyword: 'peley13@gmail.com11',
      title: '62vgvhc4',
      text: 'peley13@gmail.com',
      date: '62vgvhc4',
      source: '62vgvhc4',
      link: 'https://trello.com/b/oqTCMkAx/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC',
      image: 'https://trello.com/b/oqTCMkAx/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC'
    }).then(res => console.log(res));
  }

  removeArticle(id) {
    return  this.makeFetch(`articles/${id}`, 'DELETE').then(res => console.log(res));
}
}