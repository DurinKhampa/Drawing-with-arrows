var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};
console.log(teclas);

document.addEventListener("keydown", dibujarTeclado);
var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var x = 50;
var y = 50;

dibujarlinea("white", x - 1, y - 1, x + 1, y + 1, papel);

function dibujarlinea(color, x_i, y_i, x_f, y_f, lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.moveTo(x_i, y_i);
  lienzo.lineTo(x_f, y_f);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarTeclado(evento)
{
  var colorcito = "white";
  var movimiento = 3;
  switch (evento.keyCode)
  {
    case teclas.UP:
    dibujarlinea(colorcito, x, y, x, y - movimiento, papel);
    y = y - movimiento;
      break;
    case teclas.DOWN:
    dibujarlinea(colorcito, x, y, x, y + movimiento, papel);
    y = y + movimiento;
      break;
    case teclas.LEFT:
    dibujarlinea(colorcito, x, y, x - movimiento, y, papel);
    x = x - movimiento;
      break;
    case teclas.RIGHT:
    dibujarlinea(colorcito, x, y, x + movimiento, y, papel);
    x = x + movimiento;
      break;
    case teclas.RIGHTDOWN:
    dibujarlinea(colorcito, x, y, x + movimiento, y + movimiento, papel);
    x = x + movimiento;
    y = y + movimiento;
    console.log(teclas);
      break;
    default:
    console.log("otra tecla");
      break;
  }
}
