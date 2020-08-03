import './css/style.scss';
import './css/_index.scss';
import './css/_login.scss';

document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            attrs: [
                {
                    key: 'today',
                    highlight: {
                        backgroundColor: '#ff8080',
                    },
                    dates: new Date()
                }
            ],
        }
    })
});