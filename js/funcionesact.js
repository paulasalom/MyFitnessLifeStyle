var contenidoJsonC='',contenidoJsonA='',contenidoJson=''; //variable global con todo el contenido de JSON compañeros
var resultadoBusqueda=[]; //Array con todas las calas y actividades con mascota
var respuestaClima='';
var ordenMejores=[];

window.onload=function(){ //Detecta cuando la ventana terminó de cargar todo el html
  var elContenidoC=extraeContenidoDeFrameC(); //llamada del frame con el texto
  var elContenidoA=extraeContenidoDeFrameA(); //llamada del frame con el texto
  var elContenido=extraeContenidoDeFrame();
  contenidoJsonC=JSON.parse(elContenidoC); //Lo convertimos a JSON
  contenidoJsonA=JSON.parse(elContenidoA); //Lo convertimos a JSON
  contenidoJson=JSON.parse(elContenido);
  tresMejoresTiendas();
  extraeMascotas(); 
  añadirCajas();
  colocarResultados(); 
  cambiarIdsBotones();
  }

function extraeContenidoDeFrameC(){ //definicion
var miFrameC=document.getElementById("contenidoJsonCalas");
var contenidoC=miFrameC.contentWindow.document.body.innerText;
return contenidoC;
}
function extraeContenidoDeFrameA(){ //definicion
var miFrameA=document.getElementById("contenidoJsonAct");
var contenidoA=miFrameA.contentWindow.document.body.innerText;
return contenidoA;
}
function extraeContenidoDeFrame(){ //definicion
var miFrame=document.getElementById("contenidoDelJson");
var contenido=miFrame.contentWindow.document.body.innerText;
return contenido;
}
function extraeMascotas(){ //definicion
var i=0,x=0;
var mascotas='';
for(i=0;i<contenidoJsonC.length;i++){
   mascotas=contenidoJsonC[i]['dadesPropies']['serveis'].animals;
   if(mascotas=="Sí"){
     resultadoBusqueda.push(contenidoJsonC[i])
     }
  }
for(x=0;x<contenidoJsonA.length;x++){
   mascotas=contenidoJsonA[x]['dadesPropies'].mascotes;
   if(String(mascotas)=="true"){
     resultadoBusqueda.push(contenidoJsonA[x])
     }
  }
}
function añadirCajas(){ //definicion
  var contenedor=document.getElementsByClassName('container thumbs')[0];
  var i=0;
  for(i=0;i<resultadoBusqueda.length-1;i++){
    var copia=document.getElementsByClassName('col-sm-6 col-md-4')[i].cloneNode(true);
    contenedor.appendChild(copia);
    }
}
//---------------------------------------------------------------------------
function cambiarIdsBotones(){
  var botones=document.getElementsByClassName('btn-toolbar text-center btn btn-success');
  var c=0;
  for(c=0;c<botones.length;c++){
  document.getElementsByClassName('btn-toolbar text-center btn btn-success')[c].setAttribute('id','detalles-'+c);  
    }
  
  }
//------
function tresMejoresTiendas(){ //definicion
var mejor=document.getElementsByClassName('dropdown-menu');
ordenMejores.push(contenidoJson[0]); //del conjunto resultante de la busqueda, ordenamos por precio
var elimina=ordenMejores[0]['nom']; //quitar el de referencia para que no se repita en el array ordenado
var x=0,y=0;
for(y=0;y<contenidoJson.length;y++){ //con referencia el primer resultado, 
          // vamos mirando la valoracion de los que van llegando y se van comparando para ordenarlo
  for(x=0;x<ordenMejores.length;x++){
    if(parseInt(contenidoJson[y]['dadesPropies']['valoracio'])>=parseInt(ordenMejores[x]['dadesPropies']['valoracio'])){
     ordenMejores.splice(x,0,contenidoJson[y]); //en el indice c, borramos 0 info, metemos la valoracion nueva
     break;
     }
     }//cierre for c
     if(x>=ordenMejores.length){ //si no es mÃ¡s grande que ninguno, se pondrÃ¡ al final del array
      ordenMejores.push(contenidoJson[y]);
      }
      }//cierre for i
      for(y=0;y<ordenMejores.length;y++){
      if(ordenMejores[y]['nom']==elimina){
      ordenMejores.splice(y,1); //borramos la tienda repetida de referencia
      break;
                }
              }
        var nombreTienda1=ordenMejores[0]['nom']; //nombre tienda
        var nombreTienda2=ordenMejores[1]['nom'];
        var nombreTienda3=ordenMejores[2]['nom'];
        
mejor[0].childNodes[1].childNodes[0].innerText=nombreTienda1;
mejor[0].childNodes[3].childNodes[0].innerText=nombreTienda2;
mejor[0].childNodes[5].childNodes[0].innerText=nombreTienda3;
            //descripcion=ordenMejores[c]['descripcio']; //descripcion
mejor[0].childNodes[1].childNodes[0].setAttribute('href','tienda.html?name='+ordenMejores[0]['nom']+'&descripcion='+ordenMejores[0]['descripcio']+'&coordenadas='+ordenMejores[0]["geoposicionament"][0]['geoposicionament1']['lat']+','+ordenMejores[0]["geoposicionament"][0]['geoposicionament1']['long']+'&direccion='+ordenMejores[0]["geoposicionament"][0]['geoposicionament1']['address']+'&telefono='+ordenMejores[0]["contacte"]["telf"]+'&email='+ordenMejores[0]["contacte"]["email"]+'&horariolv='+ordenMejores[0]["horari"]["di"][0]["in"]+','+ordenMejores[0]["horari"]["di"][0]["out"]+'&horariosb='+ordenMejores[0]["horari"]["ds"][0]["in"]+','+ordenMejores[0]["horari"]["ds"][0]["out"]+'&horariodm='+ordenMejores[0]["horari"]["dg"][0]["in"]+','+ordenMejores[0]["horari"]["dg"][0]["out"]+'&foto='+ordenMejores[0]['imatges'][0]+','+ ordenMejores[0]['imatges'][1]);
mejor[0].childNodes[3].childNodes[0].setAttribute('href','tienda.html?name='+ordenMejores[1].nom+'&descripcion='+ordenMejores[1]['descripcio']+'&coordenadas='+ordenMejores[1]["geoposicionament"][0]['geoposicionament1']['lat']+','+ordenMejores[1]["geoposicionament"][0]['geoposicionament1'].long+'&direccion='+ordenMejores[1]["geoposicionament"][0]['geoposicionament1'].address+'&telefono='+ordenMejores[1]["contacte"].telf+'&email='+ordenMejores[1]["contacte"].email+'&horariolv='+ordenMejores[1]["horari"]["di"][0]["in"]+','+ordenMejores[1]["horari"]["di"][0]["out"]+'&horariosb='+ordenMejores[1]["horari"]["ds"][0]["in"]+','+ordenMejores[1]["horari"]["ds"][0]["out"]+'&horariodm='+ordenMejores[1]["horari"]["dg"][0]["in"]+','+ordenMejores[1]["horari"]["dg"][0]["out"]+'&foto='+ordenMejores[1]['imatges'][0]+','+ ordenMejores[1]['imatges'][1]);
mejor[0].childNodes[5].childNodes[0].setAttribute('href','tienda.html?name='+ordenMejores[2].nom+'&descripcion='+ordenMejores[2]['descripcio']+'&coordenadas='+ordenMejores[2]["geoposicionament"][0]['geoposicionament1']['lat']+','+ordenMejores[2]["geoposicionament"][0]['geoposicionament1'].long+'&direccion='+ordenMejores[2]["geoposicionament"][0]['geoposicionament1'].address+'&telefono='+ordenMejores[2]["contacte"].telf+'&email='+ordenMejores[2]["contacte"].email+'&horariolv='+ordenMejores[2]["horari"]["di"][0]["in"]+','+ordenMejores[2]["horari"]["di"][0]["out"]+'&horariosb='+ordenMejores[2]["horari"]["ds"][0]["in"]+','+ordenMejores[2]["horari"]["ds"][0]["out"]+'&horariodm='+ordenMejores[2]["horari"]["dg"][0]["in"]+','+ordenMejores[2]["horari"]["dg"][0]["out"]+'&foto='+ordenMejores[2]['imatges'][0]+','+ ordenMejores[2]['imatges'][1]);
}


//--------------------------------------------------------------------
function cambiarClima(unBoton){
  console.log('hola desde cambiar clima'+unBoton.id);
  var boton=document.getElementById(unBoton.id);
  var numeroBoton=unBoton.id.split('-')[1];
  numeroBoton=parseInt(numeroBoton);
  result2=document.getElementsByClassName('modal fade');
  foto2= resultadoBusqueda[numeroBoton]['imatges'][1]; //foto portada
  titulo=resultadoBusqueda[numeroBoton]['nom'];
  var latitud=resultadoBusqueda[numeroBoton]['geoposicionament1']['lat'];
  var longitud=resultadoBusqueda[numeroBoton]['geoposicionament1']['long'];
  consultarClima(latitud,longitud);
  result2[0].childNodes[1].childNodes[1].childNodes[1].innerText=titulo; //titulo modal
  result2[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1].setAttribute('src',foto2);
  }
//---
function colocarResultados(){
var c=0;
var latitud=0,longitud=0;
var botonesDetalles='';
result=document.getElementsByClassName('col-sm-6 col-md-4');
//botonesDetalles=document.getElementsByClassName('btn btn-success');
for(c=0;c<resultadoBusqueda.length;c++){
  foto= resultadoBusqueda[c]['imatges'][0]; //foto portada
  titulo=resultadoBusqueda[c]['nom']; //nombre tienda
  latitud=resultadoBusqueda[c]['geoposicionament1']['lat'];
  longitud=resultadoBusqueda[c]['geoposicionament1']['long'];
  consultarClima(latitud,longitud);
  descripcion=resultadoBusqueda[c]['descripcio']; //descripcion
  /*descripcion=descripcion+'Clima:'+
  respuestaClima['weather'][0]['main']+
  'Descripcion Clima:'+respuestaClima['weather'][0]['description'];//descripcion+=*/

  result[c].childNodes[1].childNodes[1].setAttribute('src',foto);
  result[c].childNodes[1].childNodes[3].childNodes[1].innerHTML=titulo;
  result[c].childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML=descripcion;
}
}
//---------
function consultarClima(latitud,longitud){
  var codigo='f7dc9f986d4aed4c0bc472a1d562a40a';
  fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&APPID='+codigo)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
        var celsius = Math.round(parseFloat(data.main.temp)-273.15);
    document.getElementById('temp').innerHTML=celsius+'&deg';
    var tiempo = data.weather[0].description; 
    
    if( tiempo.indexOf('rain') > 0 ) {
      document.getElementsByClassName('modal fade')[0].childNodes[1].childNodes[1].childNodes[3].childNodes[3].className = 'fas fa-umbrella fa-4x';
  } else if( tiempo.indexOf('cloud') > 0 ) {
    document.getElementsByClassName('modal fade')[0].childNodes[1].childNodes[1].childNodes[3].childNodes[3].className = 'fas fa-cloud fa-4x';
  } else if( tiempo.indexOf('sunny') > 0 ) {
  	document.getElementsByClassName('modal fade')[0].childNodes[1].childNodes[1].childNodes[3].childNodes[3].className = 'fas fa-sun fa-4x';
  }
  document.getElementById('location').innerHTML = data.name;
  })
  .catch(function() {
    // catch any errors
  });
}
      





