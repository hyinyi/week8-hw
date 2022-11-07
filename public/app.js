//Step 4. SOCKET connection
let socket = io();


  //connect socket client
socket.on('connect',()=>{
    console.log('Connected');
});


//p5 code
let emo =['🌟','❤️','🫶','🍻']
let sounds = [];

// function preload() {
//     sound = loadSound("assets/wow.mp3");
//   }
    
function preload() {
	sounds.push(loadSound("assets/wow.mp3"));
	sounds.push(loadSound("assets/nice.mp3"));
    sounds.push(loadSound("assets/cheer.mp3"));
}



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
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
    random(sounds).play();


}
