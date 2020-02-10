let btnS = document.querySelectorAll('.main-menu > button');
const menu = document.querySelector('.main-menu');
const backEffect = document.querySelector('.hover-affect');

(() => {
    menu.addEventListener('click', async (e)=>{
        if (e.target !== btnS[0]){
            backEffect.classList.add('hover-affect-hover')
        } else {
            backEffect.classList.remove('hover-affect-hover')
        }


        if (e.target === btnS[0]){
            backEffect.style.top = '7px';
            backEffect.style.borderRadius = '15px';
        }
        if (e.target === btnS[1]){
            backEffect.style.top = '120px';
            backEffect.style.borderRadius = '50px';
            backEffect.classList.add('shake');
        }
        if (e.target === btnS[2]){
            backEffect.style.top = '240px';
            backEffect.style.borderRadius = '50px';
        }
        if (e.target === btnS[3]){
            backEffect.style.top = '360px';
            backEffect.style.borderRadius = '50px';
        }
        if (e.target === btnS[4]){
            backEffect.style.top = '480px';
            backEffect.style.borderRadius = '50px';
        }
    })
})();
