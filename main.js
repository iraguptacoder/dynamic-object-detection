
objects = [];
img = "";
status = "";

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(420, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(420, 420);
    video.hide();
    objectdetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status-detecting objects";
}

function modelloaded(){
    console.log("modelloaded");
    status = true;
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0,0 , 420,420);
    //fill("#FF0000");
    //text("dog", 45,75);
    //noFill();
    //stroke("#FF0000");
    //rect(30, 60, 450, 350);

    if(status != ""){
        objectdetector.detect(video, gotresults);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status detected objects";
            document.getElementById("numobj").innerHTML = "number of objects detected are - " + objects.length;
                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
    }
}