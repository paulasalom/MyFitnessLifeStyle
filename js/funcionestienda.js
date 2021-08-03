var datosTienda='',nombreTienda='',coordenadas='',direccion='',descripcion='',telefono='',email='', horariolv='',horariosb='',horariodm='',foto='';

var urlCompleta=window.location.href; //cogemos parametros en url
window.onload=function(){ //Detecta cuando la ventana terminó de cargar todo el html
datosTienda=urlCompleta.split('?')[1]; // a partir del ? vienen los datos
nombreTienda=datosTienda.split('&')[0]; //cada dato separado por &
descripcion=datosTienda.split('&')[1];
coordenadas=datosTienda.split('&')[2];
direccion=datosTienda.split('&')[3];
telefono=datosTienda.split('&')[4];
email=datosTienda.split('&')[5];
horariolv=datosTienda.split('&')[6];
horariosb=datosTienda.split('&')[7];
horariodm=datosTienda.split('&')[8];
foto=datosTienda.split('&')[9];

nombreTienda=nombreTienda.replace('name=',''); //quitar la parte de "variable=" para coger solo datos
descripcion=descripcion.replace('descripcion=','');
coordenadas=coordenadas.replace('coordenadas=','');
direccion=direccion.replace('direccion=','');
telefono=telefono.replace('telefono=','');
email=email.replace('email=','');
horariolv=horariolv.replace('horariolv=','');
horariosb=horariosb.replace('horariosb=','');
horariodm=horariodm.replace('horariodm=','');
foto=foto.replace('foto=','');

while(nombreTienda.indexOf('%20')!=-1){
nombreTienda=nombreTienda.replace('%20',' ');  //quitar el %20 y poner espacios
  }
while(direccion.indexOf('%20')!=-1){
direccion=direccion.replace('%20',' ');  
  }
while(telefono.indexOf('%20')!=-1){
telefono=telefono.replace('%20',' ');  
  }
while(descripcion.indexOf('%20')!=-1){
descripcion=descripcion.replace('%20',' ');  
  }

//asignar nombre que corresponde
document.getElementsByTagName('h2')[1].innerHTML=nombreTienda;
document.getElementsByClassName('big')[0].innerHTML=descripcion;
document.getElementById('dire').innerHTML=direccion;
document.getElementById('telf').innerHTML=telefono;
document.getElementById('email').innerHTML=email;
document.getElementById('lv').innerHTML="Lunes a Viernes:    "+horariolv.split(',')[0]+" - "+horariolv.split(',')[1];
document.getElementById('sb').innerHTML="Sabado:    "+horariosb.split(',')[0]+" - "+horariosb.split(',')[1];
document.getElementById('dm').innerHTML="Domingo:    "+horariodm.split(',')[0]+" - "+horariodm.split(',')[1];
document.getElementsByClassName('parallax-container breadcrumbs-custom-main context-dark')[0].childNodes[0].childNodes[0].setAttribute('src',foto.split(',')[0]);
document.getElementsByClassName('carousel-inner')[0].childNodes[1].childNodes[1].setAttribute('src',foto.split(',')[1]);
document.getElementsByClassName('carousel-inner')[0].childNodes[3].childNodes[1].setAttribute('src',foto.split(',')[0]);


var mymap = L.map('mapId').setView([coordenadas.split(',')[0],
coordenadas.split(',')[1]], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFmYTJzMXMiLCJhIjoiY2tvOW1sMDFkMDFwejJvbjI5aGo3eDNqOSJ9.zCOQglS0PB2WEuExvJtorw' //mi token de mapbox
}).addTo(mymap);
};