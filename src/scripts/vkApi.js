VK.init({ // подключение приложения
    apiId: 7298671 // id приложения
});

VK.Auth.login((data)=>{ // отправка запроса на разрешение
    if (data.session) { // если разрешил
        console.log('все ок')
    } else {
        console.log(new Error('Что то пшло не так'))
    }
}, 8);