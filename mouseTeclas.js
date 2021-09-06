var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};
var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var x = 100;
var y = 100;
var estado = 0; //Estado del mouse

document.body.style.margin = 300;
cuadrito.style.position = 'fixed';
resize();
window.addEventListener('resize', resize);

function resize() {
  papel.canvas.width = window.innerWidth;
  papel.canvas.height = window.innerHeight;
}

 /Estados para las diagonales/
var diagonal_UP = 0;
var diagonal_DOWN = 0;
var diagonal_LEFT = 0;
var diagonal_RIGHT = 0;

dibujarLinea("red", x-1, y-1, x+1, y+1, papel);

document.addEventListener("keydown", dibujarTeclado);
document.addEventListener("keydown", dibujarDiagonal);
document.addEventListener("keyup", quitarDiagonal);
document.addEventListener("mousedown", presionarMouse);
document.addEventListener("mousemove", moverMouse);
document.addEventListener("mouseup", soltarMouse);

function dibujarLinea(color, x_inicial, y_inicial, x_final, y_final, lienzo){
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.moveTo(x_inicial, y_inicial);
  lienzo.lineTo(x_final, y_final);
  lienzo.stroke();
  lienzo.closePath();
}

/** FUNCIONES PARA DIBUJAR CON  EL MOUSE ***/

function presionarMouse(evento){
  if(evento.buttons == 1){
    estado = 1; //El estado indica que el mouse esta oprimido.
    console.log(evento);
    x = evento.offsetX;
    y = evento.offsetY;
  }
}

function moverMouse(evento){
  if(estado == 1){
    console.log(evento);
    dibujarLinea("brown", x, y, evento.offsetX, evento.offsetY, papel)
    x = evento.offsetX;
    y = evento.offsetY;
  }
}

function soltarMouse(evento){
  console.log(evento);
  estado = 0;
}

/**FUNCION PARA DIBUJAR CON TECLADO*/

function dibujarTeclado(evento) {
  var colorcito = "brown";
  var movimiento = 2;
  console.log(evento);

  switch(evento.keyCode){
    case teclas.UP:
      dibujarLinea(colorcito, x, y, x, y - movimiento, papel);
      y = y - movimiento;
      diagonal_UP = 1; //Para mantener presionada la tecla up
      break;
    case teclas.DOWN:
      dibujarLinea(colorcito, x, y, x, y + movimiento, papel);
      y = y + movimiento;
      diagonal_DOWN = 1;  //Para mantener presionada la tecla down
      break;
    case teclas.LEFT:
      dibujarLinea(colorcito, x, y, x - movimiento, y, papel);
      x = x - movimiento;
      diagonal_LEFT = 1;  //Para mantener presionada la tecla left
      break;
    case teclas.RIGHT:
      dibujarLinea(colorcito, x, y, x + movimiento, y, papel);
      x = x + movimiento;
      diagonal_RIGHT = 1;  //Para mantener presionada la tecla right
      break;
  }
}

/*FUNCIONES PARA LAS DIAGONALES**/

function dibujarDiagonal(evento){
  var colorcito = "blue";
  var movimiento = 2;

  //Creamos otro switch para la segunda tecla que se oprimirá
  switch (evento.keyCode) {
    case teclas.RIGHT:
      if(diagonal_UP == 1){
        dibujarLinea(colorcito, x, y, x + movimiento, y - movimiento, papel);
        x = x + movimiento;
        y = y - movimiento;
      }

      else if(diagonal_DOWN == 1){
        dibujarLinea(colorcito, x, y, x + movimiento, y + movimiento, papel);
        x = x + movimiento;
        y = y + movimiento;
      }
      break;

    case teclas.LEFT:
      if(diagonal_UP == 1){
        dibujarLinea(colorcito, x, y, x - movimiento, y - movimiento, papel);
        x = x - movimiento;
        y = y - movimiento;
      }

      else if(diagonal_DOWN == 1){
        dibujarLinea(colorcito, x, y, x - movimiento, y + movimiento, papel);
        x = x - movimiento;
        y = y + movimiento;
      }
      break;

    case teclas.UP:
      if(diagonal_LEFT == 1){
        dibujarLinea(colorcito, x, y, x - movimiento, y - movimiento, papel);
        x = x - movimiento;
        y = y - movimiento;
      }

      else if(diagonal_RIGHT == 1){
        dibujarLinea(colorcito, x, y, x + movimiento, y - movimiento, papel);
        x = x + movimiento;
        y = y - movimiento;
      }
      break;

    case teclas.DOWN:
      if(diagonal_LEFT == 1){
        dibujarLinea(colorcito, x, y, x - movimiento, y + movimiento, papel);
        x = x - movimiento;
        y = y + movimiento;
      }

      else if(diagonal_RIGHT == 1){
        dibujarLinea(colorcito, x, y, x + movimiento, y + movimiento, papel);
        x = x + movimiento;
        y = y + movimiento;
      }
      break;
  }

}

// Funcion para quitar las diagonales y dibujar de nuevo en linea recta
function quitarDiagonal(evento){
  switch (evento.keyCode){
    case teclas.UP:
      diagonal_UP = 0;
      break;

    case teclas.DOWN:
      diagonal_DOWN = 0;
      break;

    case teclas.RIGHT:
      diagonal_RIGHT = 0;
      break;

    case teclas.LEFT:
      diagonal_LEFT = 0;
      break;
  }
}
