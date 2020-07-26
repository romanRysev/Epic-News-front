import { baseServerUrl } from "../constants/constants";

export class MainApi {
  constructor() {
    (this.baseUrl = baseServerUrl),
      (this.headers = {
        "Content-Type": "application/json",
        credentials: "include",
        withCredentials: true,
      });
    this.isLogged = false;
    this.user = {};
  }

  makeFetch(link, method = "GET", body) {
    if (body) {
      body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}/${link}`, {
      method: method,
      headers: this.headers,
      body: body,
      credentials: "include",
      withCredentials: true,
    })
      .then((res) => {
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
    return this.makeFetch("users/me");
  }

  signup() {
    return this.makeFetch("signup", "POST", {
      name: "Roman",
      email: "peley9171@gmail.com",
      password: "62vgvhc4",
    }).then((res) => console.log(res));
  }

  signin() {
    return this.makeFetch("signin", "POST", {
      email: "peley9171@gmail.com",
      password: "62vgvhc4",
    });
  }

  getArticles() {
    return this.makeFetch("articles/").then((res) => console.log(res));
  }

  createArticle(data, word) {
    const {title, content, publishedAt, source, url, urlToImage} = data;
    return this.makeFetch("articles/", "POST", {
      keyword: word,
      title,
      text: content,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage,
    }).then((res) => console.log(res));
  }

  removeArticle(id) {
    return this.makeFetch(`articles/${id}`, "DELETE").then((res) =>
      console.log(res)
    );
  }
}
