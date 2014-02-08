var camera, scene, renderer;
var mesh;
var poleR, poleR, podium, podiumTop, d20; // shapes
var dieMaterial, podiumMaterial; //materials
var lefLight, rightLight, movingTestLight; //lights
var i;


// constants
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var cameraDistance = 800;
var smallObjectsDetail = 10;
var poleLength = 600;
var leftPolePositionX = -500;
var rightPolePositionX = -leftPolePositionX;
var polePositionY = -200;
var poleRadius = 10;
var d20PositionY = 250;
var sphereHeight = 45;

init();
animate( new Date().getTime() );

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = cameraDistance; // how far zoomed out we are

    scene = new THREE.Scene();

    podium = new THREE.CylinderGeometry(100, 100, 500, 14, 1, false);
    podiumMaterial = new THREE.MeshNormalMaterial( { color: 0xffcc00, wireframe: false, emissive: 0xdddddd, ambient: 0xffff00 } ); // wireframe: draw lines instead of coloring sides
    podiumTop = new THREE.CylinderGeometry(150, 150, 50, 14, 1, false);
    pMesh = new THREE.Mesh( podium , podiumMaterial );
    ptMesh = new THREE.Mesh( podiumTop , podiumMaterial );
    pMesh.position.set(0,-200,0);
    ptMesh.position.set(0,50,0);
    scene.add( pMesh );
    scene.add( ptMesh );
    
    poleR = new THREE.CylinderGeometry(poleRadius, poleRadius, poleLength, smallObjectsDetail, 1, false);
    poleL = new THREE.CylinderGeometry(poleRadius, poleRadius, poleLength, smallObjectsDetail, 1, false);
    pRMesh = new THREE.Mesh( poleR , podiumMaterial );
    pLMesh = new THREE.Mesh( poleL , podiumMaterial );
    pRMesh.position.set( rightPolePositionX, polePositionY, 0);
    pLMesh.position.set( leftPolePositionX, polePositionY, 0);
    scene.add( pRMesh );
    scene.add( pLMesh );
    
    d20 = new THREE.IcosahedronGeometry( 120, 0 );
    var d20materials = [];
	d20.faceVertexUvs[0] = [];
    for(var i = 0; i < d20.faces.length; i++) {      
		d20.faceVertexUvs[0].push([
		    new THREE.Vector2( 0,0 ),
		    new THREE.Vector2( 0,1 ),
		    new THREE.Vector2( 1,1 ), ]);
        
        d20.faces[i].materialIndex = i;
        d20materials.push(new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D20/'+(1+i)+'.png') } ));
	}    
	var d20meshFaceMaterial = new THREE.MeshFaceMaterial( d20materials );
    d20mesh = new THREE.Mesh( d20, d20meshFaceMaterial );
    d20mesh.position.set( 0, d20PositionY, 0 );
    scene.add( d20mesh );

    var leftSphere = new THREE.SphereGeometry( sphereHeight, smallObjectsDetail/2, smallObjectsDetail/2, Math.PI, Math.PI, Math.PI/2 );
    var sphereMaterial = new THREE.MeshNormalMaterial( { color: 0x66ff66, emissive: 0xff0040, ambient: 0xffff00 } );
    leftSphereMesh = new THREE.Mesh( leftSphere, sphereMaterial );
    leftSphereMesh.material.side = THREE.DoubleSide;
    leftSphereMesh.position.set( leftPolePositionX, poleLength/2 + polePositionY + sphereHeight, 0);
    scene.add( leftSphereMesh );

    var rightSphere = new THREE.SphereGeometry( sphereHeight, smallObjectsDetail/2, smallObjectsDetail/2, Math.PI, Math.PI, Math.PI/2 );
    rightSphereMesh = new THREE.Mesh( rightSphere, sphereMaterial );
    rightSphereMesh.material.side = THREE.DoubleSide;
    rightSphereMesh.position.set( rightPolePositionX, poleLength/2 + polePositionY + sphereHeight, 0);
    scene.add( rightSphereMesh );

    // Add lights
    var leftLight = new THREE.PointLight( 0x00ff00 );
    leftLight.position.set( leftPolePositionX, poleLength/2 + polePositionY + sphereHeight - 5, 0 );
    scene.add( leftLight );
    
    var rightLight = new THREE.PointLight( 0xff0000 );
    rightLight.position.set( rightPolePositionX + 60, poleLength/2 + polePositionY + sphereHeight, 0 );
    scene.add( rightLight );
    
    movingTestLight = new THREE.PointLight( 0xffbb44 );
    movingTestLight.position.set(leftPolePositionX - 20 );
    scene.add( movingTestLight );

    var ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add( ambientLight );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}

function animate(t) {
    requestAnimationFrame( animate );
    
    d20mesh.rotation.y += 0.01;
    d20mesh.rotation.z += 0;
    d20mesh.rotation.x += 0.01;
    movingTestLight.intensity -= 0.006;
    movingTestLight.position.set( movingTestLight.position + 5 );

    renderer.render( scene, camera );
}
