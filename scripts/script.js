//поля
const body = document.querySelector('body')
//const trigger = document.querySelector('.main__trigger')
const input  = document.querySelector('.search_task')
const taskList = document.querySelector('.tasks__wrapper')
const form = document.querySelector('.form__header')
const formSubmit = document.querySelector('.form')
const taskText = document.querySelectorAll('.task__text')
const  checkList = document.querySelectorAll(' .check')
const tasksOptions = document.querySelector('.tasks__options')
const header = document.querySelector('.header')
const optionsItems = document.querySelectorAll('.options__item')
const fake = document.querySelectorAll('.fake_check')
const check = document.querySelector('#check')
const checkBoxList = document.querySelectorAll('#heckBoxList')
const del = document.querySelectorAll('.task__right')
const  tasksOptionMobile = document.querySelector('.tasks__options-mobile')
const counter = document.querySelector('.options__counter')
const desctopOption = document.querySelector('#desctopOption')
const mobileOption = document.querySelector('#mobileOption')
const complited = document.querySelector('.options__right') 
const delTask = document.querySelector('.task__right')

const store = localStorage
//рабочий масив 

let workTaskList = JSON.parse(store.getItem('tasks'))
 

const fields = {
    background: 'white',
    filtred: true, 
}
//функции 

 let render = ()=>{
        let array = JSON.parse(store.getItem('tasks'))

        if(array.length>0) {

    let html =   workTaskList.map((task)=>{
        return `
        <div class="task" id ='${task.id}'>
        <div class="task__wrapper">
            <div class="task__left">
                <label  class="form__label label "  style= 'display: ${task.display}'>
                    <input class="check check_search" type="checkbox" data-task = 'done' >
                    <span class="fake fake_check" data-arg='arg' style="border-color: ${task.borderColor}" id= 'heckBoxList'></span>
                </label>
                <div  class="task__text"   style="color: ${task.color};">${task.name}</div>
            </div>
            <div class="task__right" onclick="deleteTask(${task.id})"> <img src="./styles/image/icon-cross.svg" alt="icon-cross" ></div>
        </div>
    </div>
        
        `
    })
    taskList.innerHTML = html
 
} else if (array.length === 0 || !array){
    html = `<h1 class = 'task__massage'>No task list</h1>`
    taskList.innerHTML = html
} else {
    return
}
 }
    
 
 let saveTaskList =(array)=>{
    store.setItem('tasks', JSON.stringify(array))
 }
 let ginirateId = (array)=>{
    for (let index = 0; index < array.length; index++) {
        let id = index
         array[index].id = id
        console.log(array[index])
    }
    

}


let counterFilter=(array)=>{
    return array.filter((task)=>{
            return task.Complited === false
    })
}

let counterTask = ()=>{
    
     let array = counterFilter(JSON.parse(store.getItem('tasks')))
    counter.innerHTML = `${array.length} items left`   
 }

 let dataLoading = ()=>{
    if (store.getItem('tasks')) {
        workTaskList = JSON.parse(store.getItem('tasks'))
        ginirateId(workTaskList)
        saveTaskList(workTaskList)
        render()
        counterTask()
    } else{

        store.setItem('tasks',  JSON.stringify([]))
        render()
        counterTask()
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
        tasksOptionMobile.style.backgroundColor = '#fff'
        check.style.borderColor='#DBD7D2'
      for (item of  workTaskList ) {
            item.color = '#25273c' 
            item.borderColor='#DBD7D2'
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
        tasksOptionMobile.style.backgroundColor = '#25273c'
        check.style.borderColor='#36384d'
        for (item of  workTaskList ) {
            item.color = '#fff'
            item.borderColor='#36384d'
    
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
let checktasks = (display)=>{
    debugger
   for( item of workTaskList){
    item.display = display
   }
    
}

 let inputChenge = (event)=>{
    if (event.keyCode == 13) {
        if (fields.filtred) {
            if (input.value === '') {
                checktasks('block')
                render()
                
            }else{
                workTaskList = taskFilter(JSON.parse(store.getItem('tasks')))
                checktasks('none')
                render()
            }
           
           
            
            
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
         array = JSON.parse(store.getItem('tasks'))
        let  elem = array.length -1
       let  id = elem +1 
        if (fields.background === 'white') {
            task = {
               name: input.value,
               color: '#fff',
               borderColor: '#36384d',
               Complited: false,
               display : 'block',
   
           }  

           
       } else{
        task = {
            name: input.value,
            color: '#25273c',
            borderColor: '#36384d',
            Complited: false,
            display : 'block',
        }
        
    }
      

}  else{
    if (fields.background === 'white') {
        task = {

           name: input.value,
           color: '#fff',
           borderColor: '#36384d',
           Complited: false,
           display : 'block',

       }  
       
   }  else{
     
    task = {
        name: input.value,
        color: '#25273c',
        borderColor: '#36384d',
        Complited: false,
        display : 'block',

    }
    
}}

array.push(task)
store.setItem('tasks', JSON.stringify(array))
dataLoading() 
}
let deleteTask = (id)=>{
    let array  =  JSON.parse(store.getItem('tasks'))
       workTaskList = array.filter((task)=>{
           return task.id !== id
      
        
    })
    input.value = ''
    ginirateId(workTaskList)
    saveTaskList(workTaskList)
    render()
    counterTask()
}

 let taskComplited = (event)=>{
    if (event.target.dataset.task === 'done') {
       const node = event.target.closest('.task')
       let  elementId = Number(node.id)
       workTaskList[elementId].Complited = true
       let text =  node.querySelector('.task__text')
       text.classList.add('complitedList')
       store.setItem('tasks', JSON.stringify(workTaskList))
    }
       
    }
   
    let optionFiltered=( atribute, array)=>{

            if (atribute === 'active') {
                return array.filter((item)=>{
                    return item.Complited === false
                })
               
            } else if(atribute ==='completid'){
                return array.filter((item)=>{
                    return item.Complited === true
                })

            }   else{
                return array.filter((item)=>{
                    return item
                })
            }
               
        
            
    }
       
    let ActiveTask = ()=>{
            let elem;
          optionsItems.forEach((item)=>{
            item.addEventListener('click',(event)=>{
                elem =  event.target.getAttribute('filtered')
               workTaskList = optionFiltered(elem, JSON.parse(store.getItem('tasks')))
               
            })
           
          })
          render()
          counterTask()

    }
       
let clearComplitedFilter = (array)=>{
    return array.filter((item)=>{
        return item.Complited === false
    })
}



    let clearComplitted  = ()=>{
       let  array = JSON.parse(store.getItem('tasks')) 
        workTaskList = clearComplitedFilter(array)
       // store.setItem('tasks', JSON.stringify(workTaskList))
        render()
        counterTask()
        ginirateId(workTaskList)
        saveTaskList(workTaskList)
    } 
    
    

      
    
    

document.addEventListener('click', taskComplited)
formSubmit.addEventListener('submit',preventForm )
check.addEventListener('click', inputCheck)
document.addEventListener('keyup', inputChenge)
tasksOptions.addEventListener('mouseout', onHoverOption)
tasksOptions.addEventListener('mouseover',hoverOption)
desctopOption.addEventListener('click',  ActiveTask)
mobileOption.addEventListener('click', ActiveTask)
//trigger.addEventListener('click', chencheBackground)
complited.addEventListener('click', clearComplitted)