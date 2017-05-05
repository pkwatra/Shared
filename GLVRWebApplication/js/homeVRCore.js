var URL = 'GLR.jpg';

THREE.ImageUtils.crossOrigin = '';
var camera, scene, renderer, cssRenderer, cssScene;

var isUserInteracting = false, isOptionClick = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    onPointerDownPointerX = 0, onPointerDownPointerY = 0,
    onPointerDownLon = 0, onPointerDownLat = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;

var video;
var isStopRotation = false;
var videoGLFile1 ='LifeGL.mp4';
var videoGLFile2 ='30Hacks.mp4';
var videoGLFile3 = 'LifeGL.mp4';
var videoGLFile4 = '30Hacks.mp4';

var updateFcts	= [];

function initHome(bindevent) {

  var container, mesh;

  container = document.getElementById( 'homecontainer' );
 
 

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
  camera.target = new THREE.Vector3( 0, 0, 0 );

  scene = new THREE.Scene();
  cssScene = new THREE.Scene();

  var geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  var material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( URL )
  } );

  mesh = new THREE.Mesh( geometry, material );

  scene.add( mesh ); 


  //create3dPage(
    //  900, 1000,
      //new THREE.Vector3(0, 0, 0),
      //new THREE.Vector3(0, 0, 0),
      //'http://adndevblog.typepad.com/cloud_and_mobile');

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  //cssRenderer = createCssRenderer();

  //container.appendChild(cssRenderer.domElement);  
  container.appendChild( renderer.domElement );  


 
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animateHome() {
  TWEEN.update();
  requestAnimationFrame( animateHome );
  update();

}

function update() {

  if ( isUserInteracting === false  && isOptionClick == false ) {
     if (!isStopRotation)
     {
        lon += 0.05;
     }
  }

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );

  camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  camera.target.y = 500 * Math.cos( phi );
  camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

  camera.lookAt( camera.target );

  renderer.render( scene, camera );
  //cssRenderer.render(cssScene, camera);

}


function BindDragEvents() {

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
    document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);

    //
   
    document.addEventListener( 'dragover', function ( event ) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, false );

    document.addEventListener( 'dragenter', function ( event ) {
      document.body.style.opacity = 0.5;
    }, false );

    document.addEventListener( 'dragleave', function ( event ) {
        document.body.style.opacity = 1;
    }, false );

    document.addEventListener( 'drop', function ( event ) {
        event.preventDefault();
        var reader = new FileReader();

        reader.addEventListener( 'load', function ( event ) {
        material.map.image.src = event.target.result;
        material.map.needsUpdate = true;
    }, false );
    reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
    document.body.style.opacity = 1;
    }, false );
  
}

function onDocumentMouseDown( event ) {
    event.preventDefault();

    isUserInteracting = true;
    

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
}

function onDocumentMouseMove( event ) {

    if ( isUserInteracting === true ) {
        lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
    }
}

function onDocumentMouseUp( event ) {
    isUserInteracting = false;
}

function AddMenuToScene( geo_img, image, x, y, z, sx, sy, sz, r)
{          
      var mat_img = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(image), transparent:true, opacity:1, side: THREE.DoubleSide});
      var objMesh = new THREE.Mesh(geo_img, mat_img); 
      objMesh.position.x = x;
      objMesh.position.z = z;
      objMesh.position.y = y;

      objMesh.scale.x = sx;
      objMesh.scale.y = sy;
      objMesh.scale.z = sz;         

      objMesh.rotateY(THREE.Math.degToRad(r));          

      scene.add(objMesh); 

      return objMesh;
}


function StopRotation(value)
{
    isStopRotation = value;
}



///////////////////////////////////////////////////////////////////
// Creates CSS Renderer
//
///////////////////////////////////////////////////////////////////
function createCssRenderer() {

  var cssRenderer = new THREE.CSS3DRenderer();

  cssRenderer.setSize(window.innerWidth, window.innerHeight);

  cssRenderer.domElement.style.position = 'absolute';
  renderer.domElement.style.zIndex = 0;
  cssRenderer.domElement.style.top = 0;

  return cssRenderer;
}

///////////////////////////////////////////////////////////////////
// Creates CSS object
//
///////////////////////////////////////////////////////////////////
function createCssObject(w, h, position, rotation, url) {

  var html = [

    '<div style="width:' + w + 'px; height:' + h + 'px;">',
    '<iframe src="' + url + '" width="' + w + '" height="' + h + '">',
    '</iframe>',
    '</div>'

  ].join('\n');

  var div = document.createElement('div');

  $(div).html(html);

  var cssObject = new THREE.CSS3DObject(div);

  cssObject.position.x = position.x;
  cssObject.position.y = position.y;
  cssObject.position.z = position.z;

  cssObject.rotation.x = rotation.x;
  cssObject.rotation.y = rotation.y;
  cssObject.rotation.z = rotation.z;

  return cssObject;
}


///////////////////////////////////////////////////////////////////
// Creates plane mesh
//
///////////////////////////////////////////////////////////////////
function createPlane(w, h, position, rotation) {

  var materialObj = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.0,
    side: THREE.DoubleSide
  });

  var geometryObj= new THREE.PlaneGeometry(w, h);

  var meshObj = new THREE.Mesh(geometryObj, materialObj);

  meshObj.position.x = position.x;
  meshObj.position.y = position.y;
  meshObj.position.z = position.z;

  meshObj.rotation.x = rotation.x;
  meshObj.rotation.y = rotation.y;
  meshObj.rotation.z = rotation.z;

  return meshObj;
}

///////////////////////////////////////////////////////////////////
// Creates 3d webpage object
//
///////////////////////////////////////////////////////////////////
function create3dPage(w, h, position, rotation, url) {

  var plane = createPlane(
      w, h,
      position,
      rotation);

  scene.add(plane);

  var cssObject = createCssObject(
      w, h,
      position,
      rotation,
      url);

  cssScene.add(cssObject);
}

function CreateMesh(visibleMesh)
{
          
          //Creating Video Player
          video = document.createElement( 'video' );         
          video.loop = true;         
          video.src = videoGLFile1;
          video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
          video.setAttribute("controls","controls")         

          var geo_video = new THREE.PlaneGeometry(4.1, 3.2, 3, 3);   
       
          var video_texture = new THREE.VideoTexture( video );
          video_texture.minFilter = THREE.LinearFilter;     
		      video_texture.magFilter = THREE.LinearFilter;
				
          video_texture.format = THREE.RGBFormat;
          var video_material   = new THREE.MeshBasicMaterial( { map : video_texture } );
          var video_mesh = new THREE.Mesh( geo_video, video_material);
         
          video_mesh.position.x = -1.2;
          video_mesh.position.z = -10;
          video_mesh.position.y = 0.2;
          video_mesh.scale.x = 1.95;
          video_mesh.scale.y = 2.3;
          video_mesh.scale.z = 0.25;         

          scene.add( video_mesh ); 
          

     
         var geo_img = new THREE.PlaneGeometry(4, 4, 3, 3);
         var menuOne =  AddMenuToScene( geo_img, 'btnOne.png' , -8.5, 3, -10, 1.25, 0.3, 0.1, 20);
         var menuTwo =  AddMenuToScene( geo_img, 'btnTwo.png' , -8.5, 1.5, -10, 1.25, 0.3, 0.1, 20);
         var menuThree = AddMenuToScene( geo_img, 'btnThree.png',  -8.5, 0, -10, 1.25, 0.3, 0.1, 20);
         var menuFour = AddMenuToScene( geo_img, 'btnFour.png',  -8.5, -1.5 , -10, 1.25, 0.3, 0.1, 20);
            
          var domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
          domEvents.addEventListener(menuOne, 'click', function(event){              
                PlayVideoFile(videoGLFile1);           
                tRotate(menuOne);                    
          }, false); 

          domEvents.addEventListener(menuTwo, 'click', function(event){        
                PlayVideoFile(videoGLFile2);
                tRotate(menuTwo);                    
          }, false); 

          domEvents.addEventListener(menuThree, 'click', function(event){    
                PlayVideoFile(videoGLFile3);    
                tRotate(menuThree);                    
          }, false); 

          domEvents.addEventListener(menuFour, 'click', function(event){      
                PlayVideoFile(videoGLFile4);                
                tRotate(menuFour);                    
          }, false);        
}


function PlayVideoFile(fileName)
{
      video.pause();
      video.src = fileName;  
      video.play();
}


function tRotate( obj ) {
    console.log(obj);
    var tween = new TWEEN.Tween(obj.rotation)
      .to({ y: "-" + 2 * Math.PI}, 1000) // relative animation
      .delay(20)              
      .onComplete(function() {
          // Check that the full 360 degrees of rotation, 
          // and calculate the remainder of the division to avoid overflow.
          if (Math.abs(obj.rotation.y)>=2*Math.PI) {
              obj.rotation.y =obj.rotation.y % (2*Math.PI);
          }
      })
      .start();
}


function onDocumentMouseWheel( event ) {

      // WebKit
      if ( event.wheelDeltaY ) {
          camera.fov -= event.wheelDeltaY * 0.05;
          // Opera / Explorer 9

      } else if ( event.wheelDelta ) {
          camera.fov -= event.wheelDelta * 0.05;
          // Firefox
      } else if ( event.detail ) {
          camera.fov += event.detail * 1.0;
      }

      camera.updateProjectionMatrix();

}
