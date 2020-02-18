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
    params.v = '5.103'; // версия запроса
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data)=>{
            if (data.error){ // если появилась ошибка
                reject(data.error)
            } else { // если все норм
                resolve(data.response);
            }
        })
    })
}

function geoCode(address){
    return ymaps.geocode(address)
        .then((result)=>{ // result - результат который вернул geocode. фактичиеский адрес (страна, город)
            const points = result.gepObjects.toArray(); // создается массив из адресов соответсвующих result
            
            if (points.length){ //если в массиве есть хоть 1 элемент.
                return points[0].geometry.getCoordinaters(); // выбираем и возвращаем первый из списка
            }
        })
}


let myMap;
let clusterer;

new Promise((resolve)=>{ymaps.ready(resolve)}) // когда дождались загрузку карты
    .then(()=>{auth()}) // авторизируемся в ВК
    .then(()=>{ return callApi('friends.get', {fields: 'city, country'})}) // получаем информацию о друзьях
    .then((friends)=>{ // получаем список друзей
        myMap = new ymaps.Map('mapsCont', { // создание яндекс карты. mapsCont - id элемента куда карта будет помещена
            center: [55.76, 37.00], // координаты карты
            zoom: 10 // приближение
        }, { searchControlProvider: 'yandex#search' }); // вывод элементов интерфейса

        clusterer = new ymaps.Clusterer({ // создание кластеререзатора (схлопывание меток на карте из нескольких в одну)
            present: 'islands#invertedVioletClusterIcons', // тип иконки на карте
            clusterDisableClickZoom: true, // запрет зума при клике по элементу на карте
            openBalloonOnClick: false // запрет открытия информации о метке при клике по ней
        });

        myMap.geoObjects.add(clusterer); // добавление кластеререзатора на карту
        return friends.items; // пробрасываем список друзей дальше по промисам

    })
    .then((friends)=>{ // получение адресов и координат из
        console.log(friends);
        const promises = friends
            .filter((friend)=>{ friend.country && friend.country.title}) // оставляем в массиве только тех друзей у которых указана страна
            .map((friend)=>{ // получаем страну и город из друзей/ map срабатывает для каждого элемента массива(друзей)
                let parts = friend.country.title; // получаем названия страны
                // если city существует
                if (friend.city) {parts += ' ' + friend.city.title;} // к названию страны прибавляем название города
                return parts;
            })
            .map((string)=>{geocode(string)}); // отправляем адреса в геокод и получаем из адресов координаты //string - адрес
        console.log(promises);
        return Promise.all(promises); // возвращает промис когда все промисы (в all) разрешатся(выполнятся)
    })
    .then((cords)=>{
        const placemarks = cords.map((cord)=>{
            return new ymaps.Placemark(cord, {}, {preset: 'islands#blueHomeCircleIcon'})
        });
        clusterer.add(placemarks);
        console.log('test');
        console.log(cords);
    });


// auth()
//     .then(()=>{ // когда все норм
//         return callApi('friends.get', {fields: 'city, country'}) //отправка запроса на получения списка друзей и их фото
//     })
//     .then((data)=>{ // когда список друзей будет получен
//         const resu = document.querySelector('.results');
//         for (let i = 0; i < data.items.length; i++){ // перебор всех друзей
//             let country = data.items[i].country.title || '';
//             resu.innerHTML += data.items[i].id + ' ' + data.items[i].last_name + '<br>';
//             resu.innerHTML += country +'<br>';
//             console.log(data.items[i].id);
//         }
//         console.log(data);
//     });