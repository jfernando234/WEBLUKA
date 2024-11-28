
const headerMenu=document.querySelector('.hm-header');

console.log(headerMenu.offsetTop);

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 80){
        headerMenu.classList.add('header-fixed');
    }else{
        headerMenu.classList.remove('header-fixed');
    }
})

/*=========================================
    Tabs
==========================================*/
if(document.querySelector('.hm-tabs')){

    const tabLinks=document.querySelectorAll('.hm-tab-link');
    const tabsContent=document.querySelectorAll('.tabs-content');

    tabLinks[0].classList.add('active');

    if(document.querySelector('.tabs-content')){
        tabsContent[0].classList.add('tab-active');
    }
    

    for (let i = 0; i < tabLinks.length; i++) {
        
        tabLinks[i].addEventListener('click',()=>{

            
            tabLinks.forEach((tab) => tab.classList.remove('active'));
            tabLinks[i].classList.add('active');
            
            tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
            tabsContent[i].classList.add('tab-active');
            
        });
        
    }

}

/*=========================================
    MENU
==========================================*/

const menu=document.querySelector('.icon-menu');
const menuClose=document.querySelector('.cerrar-menu');

menu.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.add('active');
})

menuClose.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.remove('active');
})

/*            LOGIN       */

// Asegúrate de que el DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos
    const btnLogin = document.getElementById('btn-login');  // Botón Iniciar Sesión
    const modal = document.getElementById('modal-login');   // Modal
    const closeBtn = document.querySelector('.close');      // Botón de cerrar modal

    // Mostrar el modal al hacer clic en el botón
    btnLogin.addEventListener('click', function() {
        modal.style.display = 'block';  // Muestra el modal
    });

    // Ocultar el modal al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';  // Oculta el modal
    });

    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';  // Cierra el modal si se hace clic fuera
        }
    });
});