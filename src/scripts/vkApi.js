VK.init({
    apiId: 7292575
});

VK.Auth.login(data =>{
    if (data.session){
        console.log('ok')
    } else {
        console.log(new Error('Не удалось'))
    }
}, 8);