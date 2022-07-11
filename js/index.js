const body = document.querySelector('body'),
      modeToggle = body.querySelector('.mode_toggle'),
      sideBar = body.querySelector('nav'),
      sideToggle = body.querySelector('.sidebar_toggle');

      
      //   Dark & Light Mode
let getMode = localStorage.getItem('mode');

if(getMode === 'dark'){
    body.classList.toggle('dark');
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if(body.classList.contains('dark')){
        localStorage.setItem('mode', 'dark');
    }else{
        localStorage.setItem('mode', 'light');
    }
});

    //   Sidebar Toggle 
let getStatus = localStorage.getItem('status');

if(getStatus === 'close'){
    sideBar.classList.toggle('close');
}

sideToggle.addEventListener('click', () => {
    sideBar.classList.toggle('close');
    if(sideBar.classList.contains('close')){
        localStorage.setItem('status', 'close');
    }else{
        localStorage.setItem('status', 'open');
    }
});