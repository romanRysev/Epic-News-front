import '../styles/main/index.css';
import {MainApi} from './api/MainApi.js'
import {NewsApi} from './api/NewsApi.js'
import {Header} from './components/Header'
import {Popup} from './components/Popup'
import {NewsCard} from './components/NewsCard'
import {NewsCardList} from './components/NewsCardList'

(function () {
const Api = new NewsApi();
const HeaderBlock = new Header();
const PopupWindow = new Popup();
const Card = new NewsCard();
const CardList = new NewsCardList(Card);

const authButton = document.querySelector('.header__autorization-button');
const popupCloseButton = document.querySelector('.popup__close');
const preloader = document.querySelector('.preloader');
const moreButton = document.querySelector('.articles__more-button');

HeaderBlock.render({ isLoggedIn: true, userName: 'Roman' });


async function a() {
    preloader.classList.add('preloader_visible');
await Api.getNews('RU').then((res) => {CardList.setArticles(res);CardList.renderList();});
    preloader.classList.remove('preloader_visible');
}

a();

moreButton.addEventListener('click', () => {CardList.renderList()})
authButton.addEventListener('click', () => {PopupWindow.clearContent(); PopupWindow.setContent({contentType: 'signup-successful'}); PopupWindow.open()})
popupCloseButton.addEventListener('click', () => {PopupWindow.close()})
}) ()