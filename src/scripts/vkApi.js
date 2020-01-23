VK.init({ // инициализация запроса
    apiId: 7292575 // id от какого приложения запрос
});

VK.Auth.login(data =>{
    if (data.session){
        console.log('ok')
    } else {
        console.log(new Error('Не удалось'))
    }
}, 2); // 2 указывает к чему хотим получить доступ