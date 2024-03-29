var context = document.getElementById("scene").getContext("2d");
var keyMap = 0;
var keys = {
  '37': 1,
  '38': 2,  
  '39': 4  
};



 
var gravedad = 1;
var limiteV = 6;
var alto = 400;
var velocidadSalto = -15;
var anchoPlataforma = 200;
var altoPlataforma = 20;
var plataformas = [];
 
var personaje = {
  x: 280,
  y: 40,
  vy: 0,
  vx: 1,
  enPiso: true
};
 
 


var Plataforma = function(x, y){
  var x = x;
  var y = y;
  return {
    x: x,
    y: y,
    dibujar: function(){
      context.fillRect(x, y, anchoPlataforma, altoPlataforma);
    }
  }
};



 
function aplicarGravedad(){
  if(!personaje.enPiso){
    personaje.vy += gravedad;
    if(personaje.vy > limiteV){
      personaje.vy = limiteV;
    }
  }
  personaje.y += personaje.vy;
  if(personaje.y > alto - 40){
    personaje.y = alto - 40;
    personaje.enPiso = true;
  }
};



 
function mover(){
  personaje.x = personaje.x + personaje.vx; 
};



 
function crearPlataformas(){
  plataformas.push(new Plataforma(220, 50));
};



 
function dibujar(){
  context.fillStyle = "black";
  context.fillRect(0,0,600,400);
 
  context.fillStyle = "green";
  context.fillRect(personaje.x, personaje.y, 40, 40);
  context.fillText(keyMap.toString(2), 10, 10);
};
 



function saltar(){
  if(personaje.enPiso){
    personaje.vy = velocidadSalto;
    personaje.enPiso = false;
  }
}



 
function leerEntradas(){
  if(keyMap & 4){
    personaje.vx = limiteV;
  }else if(keyMap & 1){
    personaje.vx = -limiteV;
  }else{
    personaje.vx = 0;
  }
  if(keyMap & 2){
    saltar();
  }
};



 
function validarColisiones(){
  if(personaje.vy<0){
    return;
  }
  for (var i = plataformas.length - 1; i >= 0; i--) {
    var plat = plataformas[i];
    if((personaje.x + 40 > plat.x && personaje.x+40 < plat.x + anchoPlataforma ||
        personaje.x > plat.x && personaje.x < plat.x + anchoPlataforma) &&
       (personaje.y + 40 > plat.y && personaje.y+40 < plat.y + altoPlataforma ||
        personaje.y > plat.y && personaje.y < plat.y + altoPlataforma)){
      
      personaje.enPiso = true;
      personaje.vy = 0;
      return;
    }
  };
  personaje.enPiso = false;
}
 
function actualizarMundo(){
  mover();
  validarColisiones();
  aplicarGravedad();
}
 
function loop(){
  leerEntradas();
  actualizarMundo();
  dibujar();
 
  requestAnimationFrame(loop);
}
 
crearPlataformas();
requestAnimationFrame(loop);
 
 
// TECLADO
document.addEventListener('keydown', function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  if(keys[key]){
    keyMap = keys[key] | keyMap;
    e.preventDefault();
  }
});
 
 
document.addEventListener('keyup', function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  if(keyMap & keys[key]){
    keyMap -= keys[key];
    e.preventDefault();
  }
});