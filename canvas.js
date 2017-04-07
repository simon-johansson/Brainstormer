// Defining variables
var first = 1,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    isMouseDown = false,
    allInputs = document.querySelectorAll("input[type='text']");

// Canvas size
canvas.width = 800;
canvas.height = 500;

// Events in canvas
$('canvas').on("mousedown", drawTrue);
$('canvas').on("click", function(){return false;});
$('canvas').on("mouseup", drawFalse);
$('canvas').on("mouseout", drawFalse);
$('canvas').on("mousemove", draw);

// Change input value
// If key up or key right >> input value +1
// If key down or key left >> input value -1
for(i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("keydown", function(ev){
    ev = ev || window.event;
    // Check if value is number
      if(!isNaN(this.value)){
      // Read keyCode from event and when it's arrow up or right, value will increment
      if(ev.keyCode == "38" || ev.keyCode == "39"){
        ++this.value;
      }
      // If event keyCode will be from arrow down or left, value will decrement
      else if(ev.keyCode == "40" || ev.keyCode == "37"){
        // Check if value isn't zero. If is value stay same.
        if(this.value !== 0){
          --this.value;
        }
      }
    }
    // If value isn't number
    else {
      return false;
    }
  }, false);
}

// Declaring more event listeners
// document.getElementById("button_clear").addEventListener("click", clear, false);
// document.getElementById("size_range").addEventListener("change", sizeSelectRange, false);
// document.getElementById("size_text").addEventListener("keyup", sizeSelectText, false);
// document.getElementById("bristles_range").addEventListener("change", bristlesSelectRange, false);
// document.getElementById("bristles_text").addEventListener("keyup", bristlesSelectText, false);


// Function that select brush size
function sizeSelectRange() {
  // document.getElementById("size_text").value = document.getElementById("size_range").value;
  // Brush.size = document.getElementById("size_text").value;
  Brush.size = 10;
}

// Function that select brush size if it's changed by text input
function sizeSelectText() {
  // document.getElementById("size_range").value = parseInt(document.getElementById("size_text").value, 10);
  // Brush.size = document.getElementById("size_text").value;
  Brush.size = 10;
}

// Function that select bristles value
function bristlesSelectRange() {
  // document.getElementById("bristles_text").value = document.getElementById("bristles_range").value;
  // Brush.number = document.getElementById("bristles_text").value;
  Brush.number = 100;
}

// Function that select bristles value from text input
function bristlesSelectText() {
  // document.getElementById("bristles_range").value = parseInt(document.getElementById("bristles_text").value, 10);
  // Brush.number = document.getElementById("bristles_text").value;
  Brush.number = 100;
}

// This function return selected color
function colorSelect() {
  colors = document.getElementsByName("colors");
  for(i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", function(){
      Brush.color = this.style.background;
      // document.getElementById("type_of_option").style.background = this.style.background;
    }, false);
  }
}

// Defning object Brush
Brush = {
  size : 10,
  number : 10,
  color : colorSelect()
};

// Defining object BrushType
BrushType = {
  // Function that select brush§
  selectBrushBefore: function() {
    return BrushType.normalBefore();
    // if(document.getElementById("normal").checked === true){
    //   return BrushType.normalBefore();
    // }
    // else if(document.getElementById("weird").checked === true){
    //   return BrushType.weirdBefore();
    // }
  },
  selectBrushAfter: function() {
    return BrushType.normalAfter();
    // if(document.getElementById("normal").checked === true){
    //   return BrushType.normalAfter();
    // }
    // else if(document.getElementById("weird").chcecked === true){
    //   return BrushType.weirdAfter();
    // }
    // else if(document.getElementById("dotted").checked === true){
    //   return BrushType.dottedAfter();
    // }
  },
  // Brushes
  // Normal Brush
  normalBefore: function() {
    // Drawing line
    // Defining color of line
    ctx.strokeStyle = Brush.color;
    ctx.beginPath();
    // Defining size of brush
    ctx.lineWidth = Brush.size;
    // Start point of line
    ctx.moveTo(x, y);
    // Lines ending >> lines will be rounded on ends
    ctx.lineCap = 'round';
  },
  normalAfter: function() {
    // End point of line
    ctx.lineTo(x, y);
    // Draw line
    ctx.stroke();
  },
  // Weird Brush
  weirdBefore: function() {
    if(Brush.size != 1) {
      ctx.fillStyle = Brush.color;
      ctx.beginPath();
      ctx.arc(x, y, Brush.size / 2, Math.PI * 2, 0, false);
      ctx.closePath();
      ctx.fill();
  }

    ctx.strokeStyle = Brush.color;
    ctx.beginPath();
    ctx.lineWidth = Brush.size;
    ctx.moveTo(x, y);
  },
  weirdAfter: function() {
    ctx.lineTo(x, y);
    ctx.stroke();

  if(Brush.size != 1) {
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(x, y, Brush.size / 4, Math.PI * 2, 0, false);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = Brush.color;
      ctx.beginPath();
      ctx.arc(x, y, Brush.size / 2, Math.PI * 2, 0, false);
      ctx.closePath();
      ctx.fill();
  }
  },
  // Dotted Brush
  dottedAfter: function() {
    for(i = 0; i < Brush.number; i++){
      size = Brush.size / 2;
      randomNumber_1 = Math.round(Math.random() * (size + size) - size);
      randomNumber_2 = Math.round(Math.random() * (size + size) - size);
      if(randomNumber_1 == randomNumber_2 && randomNumber_1 > size / 2){
        randomNumber_1 = Math.round(Math.random() * (size / 2 + size / 2) - size / 2);
        randomNumber_2 = Math.round(Math.random() * (size / 2 + size / 2) - size / 2);
      }
      ctx.fillStyle = Brush.color;
      ctx.beginPath();
      ctx.arc(x + randomNumber_1, y + randomNumber_2, 1, Math.PI * 2, 0, false);
      ctx.closePath();
      ctx.fill();
    }
  }
};

// Clearing of canvas
function clear() {
  canvas.width = canvas.width;
}

// Check if mouse is down
function drawTrue() {
  isMouseDown = true;
}

// Check if mouse is down
function drawFalse() {
  first = 1;
  isMouseDown = false;
}

// Function of drawing
function draw(ev) {
  // Check if mouse is down or not
  if(isMouseDown){
    if(first == 1) {
      // Return mouse X position to var x
      x = (ev.pageX - canvas.offsetLeft - $('canvas').offset().left) + 100;
      // Return mouse Y position to var y
      y = (ev.pageY - canvas.offsetTop - $('canvas').offset().top) + 70;
      first = 0;
    }
    else if(first === 0){
      // Calling of brush function
      BrushType.selectBrushBefore();
      x = (ev.pageX - canvas.offsetLeft - $('canvas').offset().left) + 100;
      y = (ev.pageY - canvas.offsetTop - $('canvas').offset().top) + 70;
      // Calling of other brush function
      BrushType.selectBrushAfter();
    }
  }
}
