//поля
 const body = document.querySelector('body')
const trigger = document.querySelector('.main__trigger')
const input  = document.querySelector('.search_task')
const taskList = document.querySelector('.tasks__wrapper')
const form = document.querySelector('.form__header')
const taskText = document.querySelectorAll('.task__text')
const tasksOptions = document.querySelector('.tasks__options')
const header = document.querySelector('.header')
const optionsItems = document.querySelectorAll('.options__item')
//#595b67


const fields = {
    background: 'white',
}
//функции 

let chencheBackground = ()=>{
    if (fields.background === 'white') {
        fields.background = 'night'
        trigger.innerHTML = `<img  src="./styles/image/icon-moon.svg"  alt="trigger">`
        header.innerHTML = `<img class="header__background" src="./styles/image/bg-desktop-light.jpg" alt="background">`
        body.style.backgroundColor = '#fafafa'
        input.style.color = '#25273c'
        input.style.backgroundColor ='#fff'
        taskList.style.backgroundColor = '#fff'
        form.style.backgroundColor = '#fff'
        tasksOptions.style.backgroundColor = '#fff'
      for (item of  taskText ) {
            item.style.color = '#25273c' 
      }   
    }
    else{
        fields.background = 'white'
        trigger.innerHTML = `<img  src="./styles/image/icon-sun.svg"  alt="trigger">`
        header.innerHTML = '<img class="header__background" src="./styles/image/bg-desktop-dark.jpg" alt="background">'
        body.style.backgroundColor = '#000'
        input.style.color = '#fff'
        input.style.backgroundColor ='#25273c'
        taskList.style.backgroundColor = '#25273c'
        form.style.backgroundColor = '#25273c'
        tasksOptions.style.backgroundColor = '#25273c'
        for (item of  taskText ) {
            item.style.color = '#fff'
    
    }
}

    
}
let hoverOption = ()=>{
    
    if (fields.background == 'night') {
       
    for (let index = 0; index < optionsItems.length; index++) {
            optionsItems[index].addEventListener('mouseover', ()=>{
            optionsItems[index].style.color = '#000'

    })
    
    }
  }
  else{
    for (let index = 0; index < optionsItems.length; index++) {
        optionsItems[index].addEventListener('mouseover', ()=>{
            optionsItems[index].style.color = '#fff'
        })
        
        }

  }

}
let onHoverOption = ()=>{
        for (let index = 0; index < optionsItems.length; index++) {
                optionsItems[index].addEventListener('mouseout', ()=>{
                optionsItems[index].style.color = '#52546b'
    
        })
        
        }
      
             
        

}




tasksOptions.addEventListener('mouseout', onHoverOption)
tasksOptions.addEventListener('mouseover',hoverOption)
trigger.addEventListener('click', chencheBackground)