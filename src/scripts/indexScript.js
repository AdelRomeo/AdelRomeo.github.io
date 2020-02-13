let btnS = document.querySelectorAll('.main-menu > button');
const menu = document.querySelector('.main-menu');
const backEffect = document.querySelector('.hover-affect');
const body = document.querySelector('body');


(() => {
    menu.addEventListener('click', async (e)=>{

        // if (e.target !== btnS[0]){ // кружок рядом с фоном
        //     backEffect.classList.add('hover-affect-hover')
        // }  else {
        //     backEffect.classList.remove('hover-affect-hover')
        // }

        for (let i = 1; i < btnS.length; i++){
            if (e.target === btnS[i]){
                menu.style.marginLeft = '00px';
                menu.style.width = '400px';
            }
            if (e.target === btnS[0]){
                menu.style.marginLeft = '0';
                menu.style.width = '100%';
            }
        }


        if (e.target === btnS[0]){
            backEffect.style.top = '7px';
            backEffect.style.borderRadius = '15px';
        }
        if (e.target === btnS[1]){
            backEffect.style.top = '120px';
            backEffect.style.borderRadius = '50px';
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

