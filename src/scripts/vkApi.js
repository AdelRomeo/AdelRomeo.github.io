VK.init({ // подключение приложения
    apiId: 7298671 // id приложения
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login((data)=>{ // отправка запроса на разрешение/ функция выполнится когда пользователь что то сделает с окном
            if (data.session) { // если разрешил/ если авторизовались
                resolve(); // переход к .then()
            } else {
                reject();
            }
        }, 2 | 4 | 8); // коды доступа к определенной информации // VK.Auth.revokeGrants() //очистить авторизацию
    })
}

function callApi(method, params){ //универсальная функция для вызова разных методов с разными параметрами
    params.v = '5.62'; // версия запроса
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data)=>{
            if (data.error){ // если появилась ошибка
                reject(data.error)
            } else { // если все норм
                resolve(data.response)
            }
        })
    })
}

auth()
    .then(()=>{ // когда все норм
        return callApi('friends.get')
    })
    .then((data)=>{
        console.log(data)
    });