//поля
 const body = document.querySelector('body')
const trigger = document.querySelector('.main__trigger')
const input  = document.querySelector('.search_task')
const taskList = document.querySelector('.tasks__wrapper')
const form = document.querySelector('.form__header')
const formSubmit = document.querySelector('.form')
const taskText = document.querySelectorAll('.task__text')
const tasksOptions = document.querySelector('.tasks__options')
const header = document.querySelector('.header')
const optionsItems = document.querySelectorAll('.options__item')
let fake = document.querySelectorAll('.fake_check')
const check = document.querySelector('#check')
const checkBoxList = document.querySelectorAll('#heckBoxList')


// сохранненые данные 
let tasks =[
{
    name: 'aa',
    color: '#fff'

},
{
    name: 'task2',
    color: '#fff'

}
] 
const store = localStorage
//рабочий масив 
let workTaskList = JSON.parse(store.getItem('tasks'))
 

const fields = {
    background: 'white',
    filtred: true
}
//функции 
 let render = ()=>{
   
        if(store.getItem('tasks')) {

    let html =   workTaskList.map((task)=>{
        return `
        <div class="task">
        <div class="task__wrapper">
            <div class="task__left">
                <label  class="form__label label">
                    <input class="check check_search" type="checkbox">
                    <span class="fake fake_check" id= 'heckBoxList'></span>
                </label>
                <div class="task__text" style="color: ${task.color};">${task.name}</div>
            </div>
            <div class="task__right"> <img src="./styles/image/icon-cross.svg" alt="icon-cross"></div>
        </div>
    </div>
        
        `
    })
    taskList.innerHTML = html
 
} else{
    html = `<h1 class = 'task__massage'>No task list</h1>`
    taskList.innerHTML = html
}
 }
    
 let dataLoading = ()=>{
    if (store.getItem('tasks')) {
        workTaskList = JSON.parse(store.getItem('tasks'))
       
        render()
    } else{
       // store.setItem('tasks', JSON.stringify(tasks))
        render()
        console.log('render')
    }
 }

 
  dataLoading() 


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
      for (item of  workTaskList ) {
            item.color = '#25273c' 
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
        for (item of  workTaskList ) {
            item.color = '#fff'
    
    }
}
    render()
    
}
let hoverOption = ()=>{
    
    if (fields.background == 'night') {
       
    for (let index = 0; index< optionsItems.length; index++){
        optionsItems[index] .addEventListener('mouseover', ()=>{
            
                    
                
            optionsItems[index].style.color = '#000'


    })
    
    }
} else{
    for (let index = 0; index< optionsItems.length; index++){
        optionsItems[index] .addEventListener('mouseover', ()=>{
            
                    
                
            optionsItems[index].style.color = '#fff'


    })
    
    }

  }

}

 


let onHoverOption = ()=>{
    for (let index = 0; index < optionsItems.length; index++) {
            optionsItems[index].addEventListener('mouseout', ()=>{
                if ( optionsItems.className == 'active') {
                    optionsItems[index].style.color = 'red'
                }
                optionsItems[index].style.color = '#52546b'

    })
    
    }
  
         
    

}

let taskFilter = (array)=>{
   let arrayFiltered = array.concat()
   return arrayFiltered.filter((item)=>{
        return  item.name.indexOf(input.value) !== -1
      
    })  
    
}

 let inputChenge = (event)=>{
    if (event.keyCode == 13) {
        if (fields.filtred) {
            if (input.value === '') {
                render()
                
            }
            workTaskList = taskFilter(JSON.parse(store.getItem('tasks')))
            render()
            
            
        }else{
            if (input.value === '') {
              return
            }
            createTask()
            input.value = ''


            
        }
                     
    }
    
 }

let  preventForm = (event)=>{
    event.preventDefault()
}

let inputCheck=()=>{
    if(fields.filtred) {
        fields.filtred = false
        
    } else{
        fields.filtred = true
    }
    console.log(fields.filtred)
}

let createTask = ()=>{
    let array = []
    let task
    if (store.getItem('tasks')) {
         array =  JSON.parse(store.getItem('tasks'))
        if (fields.background === 'white') {
            task = {
               name: input.value,
               color: '#fff',
   
           }  

           
       } else{
        task = {
            name: input.value,
            color: '#25273c',
 
        }
        
    }
      

}  else{
    if (fields.background === 'white') {
        task = {
           name: input.value,
           color: '#fff',

       }  
       
   }  else{
    task = {
        name: input.value,
        color: '#25273c',

    }
    
}


}
array.push(task)
store.setItem('tasks', JSON.stringify(array))
dataLoading() 
}

formSubmit.addEventListener('submit',preventForm )
check.addEventListener('click', inputCheck)
document.addEventListener('keyup', inputChenge)
tasksOptions.addEventListener('mouseout', onHoverOption)
tasksOptions.addEventListener('mouseover',hoverOption)
trigger.addEventListener('click', chencheBackground)