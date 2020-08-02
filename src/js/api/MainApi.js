import { BASE_SERVER_URL } from "../constants/constants";

export class MainApi {
  constructor() {
    (this.baseUrl = BASE_SERVER_URL),
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
        return Promise.reject({ error: res.status });
      })
      .catch((err) => {
        return err;
      });
  }

  getMe() {
    return this.makeFetch("users/me");
  }

  signup(data) {
    const { email, password, name } = data;
    return this.makeFetch("signup", "POST", {
      name: name,
      email: email,
      password: password,
    }).then((res) => console.log(res));
  }

  signin(data) {
    const { email, password, mode } = data;
    if (!mode) {
      return this.makeFetch("signin", "POST", {
        email: email,
        password: password,
      });
    }
    return this.makeFetch("signin", "POST", {
      email: email,
      password: password,
      mode: mode,
    });
  }

  getArticles() {
    return this.makeFetch("articles/");
  }

  createArticle(data, word) {
    const { title, description, publishedAt, source, url, urlToImage } = data;
    return this.makeFetch("articles/", "POST", {
      keyword: word,
      title,
      text: description,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage,
    });
  }

  removeArticle(id) {
    return this.makeFetch(`articles/${id}`, "DELETE");
  }
}
