//Step 4. SOCKET connection
let socket = io();
let r;
let g;
let b;
let size;

//connect socket client
socket.on('connect',()=>{
    console.log('Connected');
});

//Step 8. listen for data forom the server 
socket.on('data', (data)=>{
    console.log(data);
    //drawing with data coming in
    drawObj(data);
});

//p5 code
function setup() {
    createCanvas(600, 600);
    background(100); 

    //assign random values
    r = random(255);
    g = random(255);
    b = random(255);
    size = random (20,50);
}

function mousePressed(){

    let mousePos = {
        x: mouseX,
        y: mouseY,
        r:r,
        g:g,
        b:b,
        size:size
    }

    //step 5. EMIT DATA to the server
    socket.emit('data', mousePos);
}

function drawObj(obj){
    noStroke();
    fill(obj.r, obj.b, obj.g);
    ellipse(mouseX, mouseY, size);
}
