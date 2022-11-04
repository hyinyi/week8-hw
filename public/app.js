//Step 4. SOCKET connection
let socket = io();

//connect socket client
socket.on('connect',()=>{
    console.log('Connected');
});


//p5 code
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100); 
    textSize(50);

    //Step 8. listen for data forom the server 
    socket.on('data', (data)=>{
    console.log(data);
    //drawing with data coming in
    emoji(data);
});
}

function mousePressed(){

    let mousePos = {
        x: mouseX,
        y: mouseY,
    }

    //step 5. EMIT DATA to the server
    socket.emit('data', mousePos);
}

function emoji(obj){
    let emo =['😊','🌟','❤️','🫶','🍻']
    let a = random(emo);
    text(a, mouseX,mouseY);
}
