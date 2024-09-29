const fs = require('fs')

const filePath = ('./file.json')


let command = process.argv[2]

let args = process.argv[3]


function loadTask(){
    try {
        let dataBuffer = fs.readFileSync(filePath)
        let dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }

}



function saveTask(taskArray){
    try{
        
       fs.writeFileSync(filePath,JSON.stringify(taskArray))
    } catch(err){
        throw new Error("Error while saving the file")
    }
}





function addTask(arg){
    tasks = loadTask()

    tasks.push({task:arg})

    saveTask(tasks)
}



function removeTask(args){
    let tasks = loadTask()

    tasks = tasks.filter((_, index) => index !== (args-1));
    console.log(`Task ${args} removed successfully`);
    
    saveTask(tasks)

}


if(command ==='add'){
    addTask(args)
}

else if(command === 'list'){
    const tasks = loadTask()
    tasks.forEach((task , index) => {
        console.log(`${index+1}- ${task.task}`);
        
    });
}

else if(command==='remove'){
    const taskNo = args.match(/\d+/)[0]; // '12'
    removeTask(taskNo)
}

