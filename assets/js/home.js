const myId = document.getElementById("myId").value;
const myName = document.getElementById("myName").value;
const room = document.getElementById("room").value;
const sendBtn = document.getElementById("send");

const addNewMessage = (data) => {

    let sender = null;

    if(data.id === 000){
        sender = "bot"
    }else if(data.id === myId){
        sender = "me"
    }else{
        sender = "other"
    }

    document.querySelector(".chat-box-body ul").innerHTML += `
    <li class="item ${sender}">
        <div class="useravatar">${data.name.slice(0,2)}</div>
        <div class="message">${data.msg}</div>
    </li>
    `
}

const addNewUser = (users) => {
    document.querySelector(".users-lists").innerHTML = ``
    users.forEach(el=>{
        document.querySelector(".users-lists").innerHTML += `
        <li class="online-user" id="${el.myId}">
            <div class="useravatar">${el.myName.slice(0,1)}</div>
            <div class="username">${el.myName}</div>
        </li>
        
        `
    })
}


fetch(`/getchat/${room}`).then(data => data.json()).then(result => {
    result.forEach(el => {
        let sender = null;
        if(el.fromId === myId){
            sender = "me"
        }else{
            sender = "other"
        }
    
        document.querySelector(".chat-box-body ul").innerHTML += `
        <li class="item ${sender}" >
            <div class="useravatar">${el.senderName.slice(0,2)}</div>
            <div class="message">${el.message}</div>
        </li>
        `
    })

    const socket = io();

    socket.on("joinRoom", ()=>{
        socket.emit("addToRoom", {user:{myId, myName}, room})
    });
    
    socket.on("message", (data) => {
        console.log(11)
        addNewMessage(data)
    })

    socket.on("updateOnline", (users)=>{
        addNewUser(users)
    })
    
    sendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(11)
        const msg = document.getElementById("message").value;
        socket.emit("sendMessage", {fromId: myId, senderName: myName, message: msg, room: room})
        document.getElementById("message").value = ""
        document.getElementById("message").focus()
    }) 
})












