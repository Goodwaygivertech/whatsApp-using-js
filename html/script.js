var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;
// var audio=new Audio("/audio/ding.mp3");

function onload() {
        socket = io();
        usernameInput = document.getElementById("NameInput");
        chatIDInput = document.getElementById("IDInput");
        messageInput = document.getElementById("ComposedMessage");
        chatRoom = document.getElementById("RoomID");

        dingSound = document.getElementById("Ding");

        socket.on("join", function(room) {
                chatRoom.innerHTML = "Chatroom : " + room;
        })

        socket.on("recieve", function(message) {
                console.log(message);
                if (messages.length < 10) {
                        messages.push(message);
                        dingSound.currentTime = 0;
                        dingSound.play();

                }
                else {
                        messages.shift();
                        messages.push(message);
                        dingSound.play();
                }
                for (i = 0; i < messages.length; i++) {
                        document.getElementById("Message" + i).innerHTML = messages[i];
                        document.getElementById("Message" + i).style.color = "red";
                        // document.getElementById("Message" + i).style.backgroundColor = "black";
                        // document.getElementById("Message" + i).style.padding = "3px";
                        // document.getElementById("Message" + i).style.width = "50%";
                        // document.getElementById("Message" + i).style.textAlign = "center";
                        // document.getElementById("Message" + i).style.margin = " 5px auto";
                        // document.getElementById("Message" + i).style.display = "block";
                        // dingSound.play();
                }
        })
}

function Connect() {
        socket.emit("join", chatIDInput.value, usernameInput.value);
}

function Send() {
        if (delay && messageInput.value.replace(/\s/g, "") != "") {
                delay = false;
                setTimeout(delayReset, 1000);
                socket.emit("send", messageInput.value);
                messageInput.value = "";
        }
}

function delayReset() {
        delay = true;
}