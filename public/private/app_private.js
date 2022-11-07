//Step 4. SOCKET connection
let socket = io('/private');


//Prompt users to enter the room name
window.addEventListener('load', ()=>{
    let roomName = window.prompt('Enter room key: ');
  
    let roomObj = {
      room: roomName
    }
  
    socket.emit('room-name', roomObj);
  });


//connect socket client
socket.on('connect',()=>{
    console.log('Connected');
});


//p5 code
let emo =['❤️']

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0); 
    textSize(50);

    //Step 8. listen for data forom the server 
    socket.on('data', (data)=>{
    console.log(data);
    //drawing with data coming in
    emoji(data);
});
}

function mousePressed(){
    let a = random(emo);
   
    let mousePos = {
        a: a,
        x: mouseX,
        y: mouseY,
    }

    //step 5. EMIT DATA to the server
    socket.emit('data', mousePos);
}

function emoji(obj){
    text(obj.a, obj.x, obj.y);


}
