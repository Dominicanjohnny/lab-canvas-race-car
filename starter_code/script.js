window.onload = function() {

  //setInterval does not need () when calling function in parameter, setTimeout does
  function interval(){
    setInterval(updateCanvas, 100);
  }

  document.getElementById("start-button").onclick = function() {
    interval();
    startGame();
  };

  var theCanvas = document.getElementById("game-board");
  var ctx = theCanvas.getContext("2d");

  function startGame() {
    createGameBoard()
    drawCar()
  }


  function createGameBoard(){
    // console.log("Creating game"

    //Grass
    ctx.fillStyle = "green"
    //has four parameters 
    ctx.fillRect(0,0,500, 600)
    
    //Street
    ctx.fillStyle = "gray"
    ctx.fillRect(50, 0, 400, 600);

    //Street-side lines
    ctx.fillStyle = "white";
    ctx.fillRect(60, 0, 10, 600);
    ctx.fillRect(430, 0, 10, 600);

    //Dashed Line
                   // | dashed middle line
    ctx.lineWidth = "18";
                    // empty space between lines
                      //|
    ctx.setLineDash([40,20]);
                  // |  
                  // height of each line 
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.moveTo(245, 600);
    ctx.lineTo(245, 0);
    ctx.stroke();

    //Score
    ctx.font = "50px Helevetica"
    ctx.fillStyle = "pink";
                          //score, x, y      
    ctx.fillText("Score : " + board.score, 0, 50)
  }


  // Create Car

  //creates whole object
  var carImage = new Image();
  carImage.src= "images/car.png"

  var car = {
    width: 50,
    height: 80,
    //220 = (245 - 50)/2  width of the car diveded by 2
    x: 220, 
    // 520 = canvas.width
    y: 520, 
    moveLeft: function(){
        if(this.x > 60){
        // console.log("x before :", this.x)
        this.x -= 10;
        // console.log("x after: ", this. x)
        }
     },
    moveRight: function(){
      if(this.x < 400){
        this.x += 10
      }
    }
  }
  
  function drawCar (){
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
  }

  document.onkeydown = function(e){
    if(e.keyCode === 37){
      car.moveLeft();
      console.log("going left")
    } else if(e.keyCode === 39){
      car.moveRight();
      console.log("going right")
    } else {
      console.log("what are you doing")
    }

    createGameBoard();
    drawCar();
    for(var i=0; i < myObstacles.length; i++){
      myObstacles[i].createObstacle();
      myObstacles[i].y += 10;
    }
  }

  var myObstacles = [];

  var board = {
    score: 0,
    frames: 0
  }

  function Obstacle(x, y, width, height){
    this.x = x;
    this.y = y; 
    this.width = width;
    this.height = height;
    this.createObstacle = function(){
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.left = function(){
      return this.x
    }
    this.right = function(){
      return this.x + this.width
    }
    this.top = function(){
      return this.y
    }
    this.bottom = function(){
      return this.y + this.height
    }
    this.checkCollision = function(obstacle){
      return !((car.y > obstacle.bottom())) ||
      (car.x + 50 < obstacle)
    }
  }

function updateCanvas(){
    ctx.clearRect(0,0,500,600)
    createGameBoard();
    drawCar();
    board.frames ++;
    if(board.frames % 60 === 1){
          obstacleX = 60 + Math.floor(Math.random() * 300);
          obstacleY = 0;
          obstacleWidth = 100;
          obstacleHeight = 20;
          myObstacles.push(new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight));
    }

  for(var i=0; i < myObstacles.length; i++){
    myObstacles[i].createObstacle();
    myObstacles[i].y += 10;
  }
}





    //Move Car


    //Move Canvas



    //Obstacles


    //Collision

};