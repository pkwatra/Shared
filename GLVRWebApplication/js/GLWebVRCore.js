var URL = 'GLR.jpg';

THREE.ImageUtils.crossOrigin = '';
var camera, scene, renderer;

var isUserInteracting = false, isOptionClick = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    onPointerDownPointerX = 0, onPointerDownPointerY = 0,
    onPointerDownLon = 0, onPointerDownLat = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;
var updateFcts	= [];
var video;

function init() {

  var container, mesh;

  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
  camera.target = new THREE.Vector3( 0, 0, 0 );

  scene = new THREE.Scene();

  var geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  var material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( URL )
  } );

  mesh = new THREE.Mesh( geometry, material );

  scene.add( mesh );  

  var geo_img = new THREE.BoxGeometry(4, 3, 1);    
  var mat_img = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture("pawan.jpg")});
  var img = new THREE.Mesh(geo_img, mat_img);   
  img.name ="pawan";
  img.position.z = -10;
  img.position.y = 5;
  scene.add(img); 


  var videofile = 'sintel.mp4';
  
  var video = document.createElement( 'video' );
  video.width = 640;
  video.height = 360;
  video.loop = true;
  video.muted = true;
  video.src = videofile;
  video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
  video.play();

  var geo_video = new THREE.BoxGeometry(6, 5, 1);    
  var video_texture = new THREE.VideoTexture( video );
  //video_texture.minFilter = THREE.LinearFilter;
  //video_texture.format = THREE.RGBFormat;
  var video_material   = new THREE.MeshBasicMaterial( { map : video_texture } );
  var video_mesh = new THREE.Mesh( geo_video, video_material );
  video_mesh.position.z = -20;
  video_mesh.position.y = 5;

  video_mesh.rotateY(THREE.Math.degToRad(130));
  
  //video_mesh.rotation.x = Math.PI * 0.1;
  //video_mesh.rotation.y = Math.PI * 0.3;
  scene.add( video_mesh ); 

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  var domEvents	= new THREEx.DomEvents(camera, renderer.domElement)
  domEvents.addEventListener(img, 'click', function(event){
      console.log('you clicked on mesh', img);     
      isOptionClick = !isOptionClick;   
      console.log(isOptionClick);
      
  }, false); 
 
  
 
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

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}


function onVideoPlayButtonClick(){
		video.play()
}

	function onVideoPauseButtonClick(){
		video.pause()
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

function animate() {

  requestAnimationFrame( animate );
  update();

}






function update() {

  if ( isUserInteracting === false  && isOptionClick == false ) {

    lon += 0.1;

  }

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );

  camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  camera.target.y = 500 * Math.cos( phi );
  camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

  camera.lookAt( camera.target );

  /*
				// distortion
				camera.position.copy( camera.target ).negate();
				*/

  renderer.render( scene, camera );

}