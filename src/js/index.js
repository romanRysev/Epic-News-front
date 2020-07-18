import '../styles/main/index.css';
import {MainApi} from './api/MainApi.js'
import {NewsApi} from './api/NewsApi.js'
import {Header} from './components/Header'
import {Popup} from './components/Popup'

(function () {
const Api = new NewsApi();
const HeaderBlock = new Header();
const PopupWindow = new Popup();

Api.getNews();
HeaderBlock.render({ isLoggedIn: true, userName: 'Roman' });
PopupWindow.setContent({contentType: 'signup-successful'});
}) ()