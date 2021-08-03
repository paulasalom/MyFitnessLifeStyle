var contenidoJson=''; //variable global con todo el contenido de nuestro JSON
var resultadoBusqueda=[]; //vector con resultados obtenidos en la busqueda
var preciosBusqueda=[];
var ordenMejores=[];
var ultimaPosicionAgregada=0;//ultima posicion de elemento de linea de tiendas  

var cantiDadEuros='';

function alIniciar(){
  document.getElementsByClassName('container thumbs')[0].
            getElementsByTagName('a')[3].style.visibility='hidden';
            
document.getElementsByClassName('container thumbs')[0].style.visibility='hidden';
            
  }

window.onload=function(){ //Detecta cuando la ventana terminó de cargar todo el html
  var elContenido=extraeContenidoDeFrame(); //llamada del frame con el texto
  contenidoJson=JSON.parse(elContenido); //Lo convertimos a JSON
  //tresMejoresTiendas();
  alIniciar();
  }
  
function extraeContenidoDeFrame(){ //definicion
var miFrame=document.getElementById("contenidoDelJson");
//poder manipular el elemento de la página html con el Id indicado
var contenido=miFrame.contentWindow.document.body.innerText;
//innertext devuelve solo el texto sin tags del html
return contenido;
}
//---------------------------------------------------------------------------

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
var ordenados=[]; //array con precios ordenados
$('#ordenId').change(function(){ //coge la opcion clickada entre precio ascen y descen
  var elementoElegido='';
  elementoElegido=document.getElementById('ordenId').value;
  if(elementoElegido!='Ordenar'){ //La opcion ordenar es la predete. que no hace nada
    if(resultadoBusqueda.lenght==0){ //si no hay resultados en la busqueda, se informa
      alert('No hay resultados de busqueda');
      }else{
        ordenados=[];
        borrarTiendasDebajodefila1();
        ultimaPosicionAgregada=2;
  numeroFilaTiendas=0;
        if(elementoElegido=='Descendente'){
          ordenados.push(resultadoBusqueda[0]); //del conjunto resultante de la busqueda, ordenamos por precio
          var nombreAEliminar=ordenados[0]['nom']; //quitar el de referencia para que no se repita en el array ordenado
          var c=0,i=0;
          for(i=0;i<resultadoBusqueda.length;i++){ //con referencia el primer resultado, 
          // vamos mirando el precio de los que van llegando y se van comparando para ordenarlo
            for(c=0;c<ordenados.length;c++){
              if(parseInt(resultadoBusqueda[i]['preu']['import'])>=parseInt(ordenados[c]['preu']['import'])){
                ordenados.splice(c,0,resultadoBusqueda[i]); //en el indice c, borramos 0 info, metemos el precio nuevo
                break;
                }
              }//cierre for c
              if(c>=ordenados.length){ //si no es más grande que ninguno, se pondrá al final del array
                ordenados.push(resultadoBusqueda[i]);
                }
            }//cierre for i
            for(i=0;i<ordenados.length;i++){
              if(ordenados[i]['nom']==nombreAEliminar){
                ordenados.splice(i,1); //borramos la tienda repetida de referencia
                break;
                }
              }
          }else{ //---------------------ASCENDENTE
            ordenados.push(resultadoBusqueda[0]); //del conjunto resultante de la busqueda, ordenamos por precio
            var nombreAEliminar=ordenados[0]['nom'];
          var c=0,i=0;
          for(i=0;i<resultadoBusqueda.length;i++){ //con referencia el primer resultado, 
          // vamos mirando el precio de los que van llegando y se van comparando para ordenarlo
            for(c=0;c<ordenados.length;c++){
              if(parseInt(resultadoBusqueda[i]['preu']['import'])<=parseInt(ordenados[c]['preu']['import'])){
                ordenados.splice(c,0,resultadoBusqueda[i]); //en el indice c, borramos 0 info, metemos el precio nuevo
                break;
                }
              }//cierre for c
              if(c>=ordenados.length){ //si no es más grande que ninguno, se pondrá al final del array
                ordenados.push(resultadoBusqueda[i]);
                }
            }//cierre for i
             for(i=0;i<ordenados.length;i++){
              if(ordenados[i]['nom']==nombreAEliminar){
                ordenados.splice(i,1); //borramos la tienda repetida de referencia
                break;
                }
              }
            }
         
       var z=0;
       for(z=0;z<3;z++){
         tiendas=document.getElementsByClassName('col-sm-6 col-md-4'); //indicamos clase donde salen resultados
         //nombre
  tiendas[z].childNodes[1].
  childNodes[3].childNodes[1].innerHTML=ordenados[z]['nom'];
  
  //foto tienda
  tiendas[z].childNodes[1].
  childNodes[1].setAttribute('src',
  ordenados[z]['imatges'][0]);
  
   //descripcion  
  tiendas[z].childNodes[1].childNodes[3].
  childNodes[3].childNodes[0].innerHTML=ordenados[z]['descripcio'];
  
  
  cantiDadEuros=''; //inicializar variable
            for(x=1;x<=parseInt(ordenados[z]['preu']['import']);x++){ //segun cantidad importe, cantidad de simbolos euro
            cantiDadEuros=cantiDadEuros+'€';  
              }         
            tiendas[z].childNodes[1].childNodes[3].childNodes[9].
            childNodes[0].innerHTML=cantiDadEuros; //cantidad euros
  
  tiendas[z].childNodes[1].childNodes[3].childNodes[6].
  setAttribute('src','img/'+ordenados[z]['dadesPropies']['valoracio']+
            'estrella.png');
  
  tiendas[z].childNodes[1].childNodes[3].childNodes[11].childNodes[1].setAttribute('href','tienda.html?name='+ordenados[z].nom+'&descripcion='+ordenados[z]['descripcio']+'&coordenadas='+ordenados[z]["geoposicionament"][0]['geoposicionament1']['lat']+','+ordenados[z]["geoposicionament"][0]['geoposicionament1'].long+'&direccion='+ordenados[z]["geoposicionament"][0]['geoposicionament1'].address+'&telefono='+ordenados[z]["contacte"].telf+'&email='+ordenados[z]["contacte"].email+'&horariolv='+ordenados[z]["horari"]["di"][0]["in"]+','+ordenados[z]["horari"]["di"][0]["out"]+'&horariosb='+ordenados[z]["horari"]["ds"][0]["in"]+','+ordenados[z]["horari"]["ds"][0]["out"]+'&horariodm='+ordenados[z]["horari"]["dg"][0]["in"]+','+ordenados[z]["horari"]["dg"][0]["out"]+'&foto='+ordenados[z]['imatges'][0]+','+ ordenados[z]['imatges'][1]);    
  
       }//fin for z
        if(ordenados.length>3){
            document.getElementsByClassName('container thumbs')[0].
            getElementsByTagName('a')[3].style.visibility='visible';
            }
  
        resultadoBusqueda=ordenados;
        } //cierre else
    }
  });
//-------------------------------------------------------------------
$('form').submit(function(e){
  e.preventDefault(e); //anular evento de form cuando se envia con buscar
  });
//------------
function borrarTiendasDebajodefila1(){
var y=0;
var padre=document.getElementsByClassName('containerTiendas')[0];
var Hijos=document.getElementsByClassName('container thumbs');
var Hijo='';
for(y=1;y<Hijos.length;y++){
Hijo=Hijos[y];
padre.removeChild(Hijo);  
  }
  }
//---------
//boton buscar
$('#buscarId').click(function(){ //En jquery el id se identifica con #
  resultadoBusqueda=[]; //reinicio array para siguiente busqueda
  var listaServicios=document.getElementById('list-types'); //coge los servicios disponibles en el desplegable
  var listaPoblaciones=document.getElementById('select-city');
  var listaValoracion=document.getElementById('offer-types');
  var listaOrdenar=document.getElementById('ordenId');
  var servicioElegido=''; //variable que guardará la opción escogida por usuario
  var poblacionElegida='';
  var valoracionElegida='';
  var ordenElegido='';
  var longitud=0; //longitud del vector de jsons
  var i=0,c=0,x=0;
  var lat=0,long=0;//variables con latitud y longitud para mapa
  var tiendas=''; //para modificar resultados de la busqueda
  var nombreTienda='',valoracion='',descripcion='',precio='',fotoTienda=''; //variables para resultados
  var direccion='',telefono='',email='',horariolvin='',horariolvout='',horariosbin='',horariosbout='',horariodmin='',horariodmout='';
  var botonesDetalles=''; //boton detalles verde que nos lleva a la tienda en concreto
  var serviciosEnjson='',poblacionesEnJson=''; //vector con resultado de servicios, poblaciones...por separado
  var busquedaCoincidente=false; //es correcto cuando la busqueda coincide con el servicio del json
  var valoracion1=0,valoracion2=0; //variables para separar las valoraciones 3-4
  servicioElegido=listaServicios.value;
  poblacionElegida=listaPoblaciones.value;
  valoracionElegida=listaValoracion.value;
  ordenElegido=listaOrdenar.value; // recoger opcion elegida por usuario
  longitud=contenidoJson.length; // obtener la longitud del vector
  //reiniciar contadores y vectores
  ordenados=[];
  resultadoBusqueda=[];
  borrarTiendasDebajodefila1();
  ultimaPosicionAgregada=0;
  numeroFilaTiendas=0;

  for(i=0;i<longitud;i++){ //recorrer todos las tiendas del json para buscar coincidencias de la busqueda
  serviciosEnjson=contenidoJson[i]['dadesPropies']['servicios']; //array con todos los servicios que hay en todas las tiendas
  poblacionesEnJson=contenidoJson[i]['geoposicionament'];
  servicioElegido=servicioElegido.toLowerCase();//a minusculas
  //para que no haya problemas con mayusculas y minusculas
  for(x=0;x<serviciosEnjson.length;x++){
      serviciosEnjson[x]=serviciosEnjson[x].toLowerCase();
  }
  
  if(serviciosEnjson.includes(servicioElegido)==true){ //si el servicio buscado está en alguna tienda
    for(c=0;c<poblacionesEnJson.length;c++){ //miramos si la población está en alguna tienda
      if(poblacionesEnJson[c]['geoposicionament'+String(c+1)]['city']==poblacionElegida){
      busquedaCoincidente=true;  
      break; //cuando coincida no hace falta buscar más
      }//cierre if poblacion   
    }//cierre for c poblaciones(puede haber más de una sucursal en Mallorca)
    if(busquedaCoincidente==true){ //y finalmente miramos la valoracion elegida (solo hay una opción por tienda)
      busquedaCoincidente=false; //dejamos preparado para siguiente busqueda
      valoracion1=valoracionElegida.split('-')[0]; //separamos los numeros (3-4)
      valoracion2=valoracionElegida.split('-')[1];
      if(contenidoJson[i]['dadesPropies']['valoracio']==valoracion1 || contenidoJson[i]['dadesPropies']['valoracio']==valoracion2){
        resultadoBusqueda.push(contenidoJson[i]); //y metemos en resultados las tiendas encontradas que coincidan con la busqueda elegida
        }

      } //cierre if coincidencia
  }//cierre if includes
    
  if(contenidoJson[i]['tipus']){
    
    }//cierre if   
    }//cierre for i
         if(resultadoBusqueda.length==0){ //si no ha encontrado ninguna tienda
         
        alert("No hay resultados para esta búsqueda");
         document.getElementsByClassName('container thumbs')[0].
  style.visibility='hidden';
          }else{ //si resultados
          document.getElementsByClassName('container thumbs')[0].
  style.visibility='visible';
    //hacer visibles todas ñas tiendas
  for(x=0;x<3;x++){
    document.getElementsByClassName('container thumbs')[0].
            getElementsByClassName('col-sm-6 col-md-4')[x].
            style.visibility='visible';
  }
          tiendas=document.getElementsByClassName('col-sm-6 col-md-4'); //indicamos clase donde salen resultados
          botonesDetalles=document.getElementsByClassName('btn btn-success'); //indicamos clase del boton detalles verde
          //recorremos todas las tiendas que han salido como resultados
          
          if(resultadoBusqueda.length>3){
            document.getElementsByClassName('container thumbs')[0].
            getElementsByTagName('a')[3].style.visibility='visible';
            }
            
              if(resultadoBusqueda.length<3){
            for(x=resultadoBusqueda.length;x<3;x++){
            document.getElementsByClassName('container thumbs')[0].
            getElementsByClassName('col-sm-6 col-md-4')[x].
            style.visibility='hidden';
            }
              }
          //for(c=0;c<resultadoBusqueda.length;c++){
          for(c=0;c<3;c++){
            //cogemos info Json de cada tienda
            fotoTienda= resultadoBusqueda[c]['imatges'][0]; //foto portada
            fotoTienda2= resultadoBusqueda[c]['imatges'][1];
            nombreTienda=resultadoBusqueda[c]['nom']; //nombre tienda
            descripcion=resultadoBusqueda[c]['descripcio']; //descripcion
            valoracion=resultadoBusqueda[c]['dadesPropies']['valoracio']; //valoracion
            precio=resultadoBusqueda[c]['preu']['import']; //precio
            long=resultadoBusqueda[c]["geoposicionament"][0]['geoposicionament1']['long'];            
            lat=resultadoBusqueda[c]["geoposicionament"][0]['geoposicionament1']['lat'];
            direccion=resultadoBusqueda[c]["geoposicionament"][0]['geoposicionament1']['address'];
            telefono=resultadoBusqueda[c]["contacte"]["telf"];
            email=resultadoBusqueda[c]["contacte"]["email"];
            horariolvin=resultadoBusqueda[c]["horari"]["di"][0]["in"];
            horariolvout=resultadoBusqueda[c]["horari"]["di"][0]["out"];
            horariosbin=resultadoBusqueda[c]["horari"]["ds"][0]["in"];
            horariosbout=resultadoBusqueda[c]["horari"]["ds"][0]["out"];
            horariodmin=resultadoBusqueda[c]["horari"]["dg"][0]["in"];
            horariodmout=resultadoBusqueda[c]["horari"]["dg"][0]["out"];
            //llegamos hasta el 'div' del html que nos interesa poner la info
            tiendas[c].childNodes[1].childNodes[1].setAttribute('src',fotoTienda);
            tiendas[c].childNodes[1].childNodes[3].childNodes[1].innerHTML=nombreTienda;
            tiendas[c].childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML=descripcion;
            tiendas[c].childNodes[1].childNodes[3].childNodes[6].setAttribute('src','img/'+valoracion+
            'estrella.png');
            cantiDadEuros=''; //inicializar variable
            for(x=1;x<=precio;x++){ //segun cantidad importe, cantidad de simbolos euro
            cantiDadEuros=cantiDadEuros+'€';  
              }         
            tiendas[c].childNodes[1].childNodes[3].childNodes[9].childNodes[0].innerHTML=cantiDadEuros; //cantidad euros
            //al darle al boton detalles de una tienda, pasamos sus parametros concretos por url a tiendas.html
            botonesDetalles[c+1].setAttribute('href','tienda.html?name='+nombreTienda+'&descripcion='+descripcion+'&coordenadas='+lat+','+long+'&direccion='+direccion
            +'&telefono='+telefono+'&email='+email+'&horariolv='+horariolvin+','+horariolvout+'&horariosb='+horariosbin+','+horariosbout+'&horariodm='+horariodmin+','+horariodmout+'&foto='+fotoTienda+','+fotoTienda2);
            }//fin for
            ultimaPosicionAgregada=2;//added
            console.log('ultima posicion');
            }         

  
  }); //evento click con jquery una vez dado a botón 'buscar'

//mousemove
var contenedor='';
var filaTrestiendas='';
var copia='';
var numeroFilaTiendas=0;
var posicionInicial=0,posicionFinal=0;
var tmp=0;
var tiendasFila='';
//copiar fila con las tiendas
function copiatienda(control){
  numeroFilaTiendas++;
  posicionInicial=ultimaPosicionAgregada+1;
  posicionFinal=posicionInicial+2;
  
  if(posicionInicial<=resultadoBusqueda.length-1){
  if(posicionFinal>resultadoBusqueda.length-1){
    posicionFinal=resultadoBusqueda.length-1;
    }
  contenedor=document.getElementsByClassName('containerTiendas')[0];
console.log(numeroFilaTiendas);
filaTrestiendas=document.getElementsByClassName
('container thumbs')[numeroFilaTiendas-1];
//filaTrestiendas.setAttribute('class','container thumbs'+numeroFilaTiendas);
copia=filaTrestiendas.cloneNode(true);
//colocar ancla
copia.setAttribute('id','tiendas'+numeroFilaTiendas);
tmp=posicionFinal+1;
//tiendasFila=copia.getElementsByClassName('col-sm-6 col-md-4');



if(posicionFinal-posicionInicial!=2){
while(tmp<=posicionInicial+2){
tiendasFila=copia.getElementsByClassName('col-sm-6 col-md-4');
  
  copia.removeChild(tiendasFila[tiendasFila.length-1] );
  console.log('tmp '+tmp+',pos '+posicionInicial+'='+
  (tmp-posicionInicial));
  
  tmp++;
  }
}//fin de if resta posiciones
tmp=posicionInicial;
tiendasFila=copia.getElementsByClassName('col-sm-6 col-md-4');
while(tmp<=posicionFinal){
  //nombre
  tiendasFila[tmp-posicionInicial].childNodes[1].
  childNodes[3].childNodes[1].innerHTML=resultadoBusqueda[tmp]['nom'];
  
  //foto tienda
  tiendasFila[tmp-posicionInicial].childNodes[1].
  childNodes[1].setAttribute('src',
  resultadoBusqueda[tmp]['imatges'][0]);
  
   //descripcion  
  tiendasFila[tmp-posicionInicial].childNodes[1].childNodes[3].
  childNodes[3].childNodes[0].innerHTML=resultadoBusqueda[tmp]['descripcio'];
  
  
   //valoracion
  
  tiendasFila[tmp-posicionInicial].childNodes[1].childNodes[3].
  childNodes[6].setAttribute('src','img/'+
  resultadoBusqueda[tmp]['dadesPropies']['valoracio']+
            'estrella.png');
   //precio
  
  cantiDadEuros=''; //inicializar variable
            for(x=1;x<=parseInt(resultadoBusqueda[tmp]['preu']['import']);x++){ //segun cantidad importe, cantidad de simbolos euro
            cantiDadEuros=cantiDadEuros+'€';  
              }         
  
  
  
  tiendasFila[tmp-posicionInicial].childNodes[1].childNodes[3].
  childNodes[9].childNodes[0].innerHTML=cantiDadEuros; //cantidad euros
  
  
  tiendasFila[tmp-posicionInicial].childNodes[1].childNodes[3].
  childNodes[11].childNodes[1].setAttribute('href','tienda.html?name='+resultadoBusqueda[tmp].nom+'&descripcion='+resultadoBusqueda[tmp]['descripcio']+'&coordenadas='+resultadoBusqueda[tmp]["geoposicionament"][0]['geoposicionament1']['lat']+','+resultadoBusqueda[tmp]["geoposicionament"][0]['geoposicionament1'].long+'&direccion='+resultadoBusqueda[tmp]["geoposicionament"][0]['geoposicionament1'].address+'&telefono='+resultadoBusqueda[tmp]["contacte"].telf+'&email='+resultadoBusqueda[tmp]["contacte"].email+'&horariolv='+resultadoBusqueda[tmp]["horari"]["di"][0]["in"]+','+resultadoBusqueda[tmp]["horari"]["di"][0]["out"]+'&horariosb='+resultadoBusqueda[tmp]["horari"]["ds"][0]["in"]+','+resultadoBusqueda[tmp]["horari"]["ds"][0]["out"]+'&horariodm='+resultadoBusqueda[tmp]["horari"]["dg"][0]["in"]+','+resultadoBusqueda[tmp]["horari"]["dg"][0]["out"]+'&foto='+resultadoBusqueda[tmp]['imatges'][0]+','+ resultadoBusqueda[tmp]['imatges'][1]); 
  
  

  tmp++;
  }//cierre de while

if (tmp>=resultadoBusqueda.length-1){
  
  copia.getElementsByTagName('a')
  [copia.getElementsByTagName('a').length-1].style.visibility='hidden';

  }


contenedor.appendChild(copia);
document.location.href='#'+copia.id;

  }
  ultimaPosicionAgregada=posicionFinal;

  control.style.visibility='hidden';
  }





