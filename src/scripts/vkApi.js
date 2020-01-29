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

function callApi(method, params){
    return new Promise((resolve, reject) => {
        VK.api(method, params, (response)=>{
            if (response.error){
                reject(response.error)
            } else {
                resolve(response)
            }
        })
    })
}

auth()
    .then(()=>{
        return callApi('users.get', {fields: 'photo_100'})
    })
    .then((response)=>{
        console.log(response)
    });