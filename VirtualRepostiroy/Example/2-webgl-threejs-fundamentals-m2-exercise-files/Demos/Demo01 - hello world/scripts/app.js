var example = (function(){

   "use strict";

      var URL = 'GLR.jpg';

      //THREE.ImageUtils.crossOrigin = '';
      var camera, scene, renderer;

      var isUserInteracting = false, isOptionClick = false, animation =false,
          onMouseDownMouseX = 0, onMouseDownMouseY = 0,
          onPointerDownPointerX = 0, onPointerDownPointerY = 0,
          onPointerDownLon = 0, onPointerDownLat = 0,
          lon = 0, onMouseDownLon = 0,
          lat = 0, onMouseDownLat = 0,
          phi = 0, theta = 0;
        
        
        var  moveCamera = 80;
        var  counter = 0;
  
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

          var videofile = 'sintel.mp4';
          
          var video = document.createElement( 'video' );         
          video.loop = true;         
          video.src = videofile;
          video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
          video.setAttribute("controls","controls")
          video.play();

          var geo_video = new THREE.BoxGeometry(4, 3, 1);    
          var video_texture = new THREE.VideoTexture( video );
          video_texture.minFilter = THREE.LinearFilter;
      
		      video_texture.magFilter = THREE.LinearFilter;
				
          video_texture.format = THREE.RGBFormat;
          var video_material   = new THREE.MeshBasicMaterial( { map : video_texture } );
          var video_mesh = new THREE.Mesh( geo_video, video_material );
          video_mesh.position.z = 1;
          video_mesh.position.y = 9.5;
          video_mesh.position.x = 20;
          video_mesh.scale.x = 3;
          video_mesh.scale.y = 1.9;
          

          video_mesh.rotateY(THREE.Math.degToRad(106));
          video_mesh.rotateZ(THREE.Math.degToRad(-3));
          
          //video_mesh.rotation.x = Math.PI * 0.1;
          //video_mesh.rotation.y = Math.PI * 0.3;
          scene.add( video_mesh ); 
          
         var geo_img = new THREE.BoxGeometry(4, 3, 1);    
          var mat_img = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture("pawan.jpg")});
          var img = new THREE.Mesh(geo_img, mat_img);   
          img.name ="pawan";
          img.position.z = -10;
          img.position.y = 5;
          scene.add(img); 
         
          

         
          

          renderer = new THREE.WebGLRenderer();
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( window.innerWidth, window.innerHeight );
          container.appendChild( renderer.domElement );

          var domEvents	= new THREEx.DomEvents(camera, renderer.domElement)
          domEvents.addEventListener(img, 'click', function(event){
        
              isOptionClick = !isOptionClick;   

              counter = 0;

              animation = true;
              
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


        function onDocumentMouseDown( event ) {

          event.preventDefault();

          isUserInteracting = true;
          animation = false;


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
          TWEEN.update();
          requestAnimationFrame( animate );
          update();

        }





        function update() {

          if ( isUserInteracting === false  && isOptionClick == false && animation == false) {

              lon += 0.1;

          } 

          if (isUserInteracting === false && animation)
          {       
              lon += 0.5;              
              if (camera.target.x > 490){ animation =false; }                        
          }        
       
         
          console.log( camera.target);  

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

    function initScene()
    {
        init();
        animate();
    }

 

    window.onload = initScene;
    
    return {
        scene: scene
    }

})();
