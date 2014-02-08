var camera, scene, renderer;
var mesh, dice1, dice2;
var poleR, poleR, podium, podiumTop, d20, floor; // shapes
var dieMaterial, podiumMaterial, poleMat, wall, rust; //materials
var lefLight, rightLight; //lights
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
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = cameraDistance; // how far zoomed out we are

    scene = new THREE.Scene();

    podium = new THREE.CylinderGeometry(100, 100, 500, 14, 1, false);
    rust = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/rust.jpg'),  overdraw: true, } );
	podiumMaterial = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/podium.jpg'),  overdraw: true} );
	poleMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/pole.jpg'), overdraw: true } );
    podiumTop = new THREE.CylinderGeometry(150, 125, 50, 14, 1, false);
    pMesh = new THREE.Mesh( podium , podiumMaterial );
    ptMesh = new THREE.Mesh( podiumTop , rust );
    pMesh.position.set(0,-200,0);
    ptMesh.position.set(0,50,0);
    scene.add( pMesh );
    scene.add( ptMesh );
	
	skyBox = new THREE.CubeGeometry( 3000, 3000, 3000,  4, 4, 4, null, true);
	wall = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/wall.jpg'), side: THREE.BackSide, overdraw: true} );
    floor = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/floor.jpg'),side: THREE.BackSide, overdraw: true} );
	var skyBoxMaterials = [wall,wall,wall,floor,wall,wall];
	var meshBoxFaceMaterial = new THREE.MeshFaceMaterial( skyBoxMaterials );
	boxMesh = new THREE.Mesh(skyBox, meshBoxFaceMaterial );
    boxMesh.position.y = 500;
	boxMesh.flipSided = true;
    scene.add( boxMesh );
	
	var dice = new THREE.CubeGeometry( 50, 50, 50,  4, 4, 4, null, true);
	var d1 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D6/1.jpg'), overdraw: true} );
	var d6 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D6/2.jpg'), overdraw: true} );
	var d3 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D6/3.jpg'), overdraw: true} );
	var d4 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D6/4.jpg'), overdraw: true} );
	var d5 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D6/5.jpg'), overdraw: true} );
	var d2 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/D6/6.jpg'), overdraw: true} );
	var dicemat = [d1,d2,d3,d4,d5,d6];
	dice1 = new THREE.Mesh(dice, new THREE.MeshFaceMaterial( dicemat ) );
	dice2 = new THREE.Mesh(dice, new THREE.MeshFaceMaterial( dicemat ) );
	dice1.position.set( rightPolePositionX, polePositionY + poleLength/2 + sphereHeight + 70, 0);
    dice2.position.set( leftPolePositionX, polePositionY + poleLength/2 + sphereHeight + 70, 0);
	scene.add( dice1 );
	scene.add( dice2 );
	
	
    poleR = new THREE.CylinderGeometry(poleRadius, poleRadius, poleLength, smallObjectsDetail, 1, false);
    poleL = new THREE.CylinderGeometry(poleRadius, poleRadius, poleLength, smallObjectsDetail, 1, false);
    pRMesh = new THREE.Mesh( poleR , poleMat );
    pLMesh = new THREE.Mesh( poleL , poleMat );
    scene.add( pLMesh );
    
    pRMesh.position.set( rightPolePositionX, polePositionY, 0);
    pLMesh.position.set( leftPolePositionX, polePositionY, 0);
    scene.add( pRMesh );
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
    leftSphereMesh = new THREE.Mesh( leftSphere, rust );
    leftSphereMesh.material.side = THREE.DoubleSide;
    leftSphereMesh.position.set( leftPolePositionX, poleLength/2 + polePositionY + sphereHeight, 0);
    scene.add( leftSphereMesh );

    var rightSphere = new THREE.SphereGeometry( sphereHeight, smallObjectsDetail/2, smallObjectsDetail/2, Math.PI, Math.PI, Math.PI/2 );
    rightSphereMesh = new THREE.Mesh( rightSphere, rust );
    rightSphereMesh.material.side = THREE.DoubleSide;
    rightSphereMesh.position.set( rightPolePositionX, poleLength/2 + polePositionY + sphereHeight, 0);
    scene.add( rightSphereMesh );

    // Add lights
    var ambientLight = new THREE.AmbientLight( 0x555555 );
    scene.add( ambientLight );

    leftLight = new THREE.DirectionalLight( 0xccff88 );
    leftLight.position.set( leftPolePositionX, poleLength/2 + polePositionY + sphereHeight + 10, 0 );
    scene.add( leftLight );

    rightLight = new THREE.DirectionalLight( 0xffcc88 );
    rightLight.position.set( rightPolePositionX, poleLength/2 + polePositionY + sphereHeight + 10, 0 );
    scene.add( rightLight );

    renderer = new THREE.CanvasRenderer();
    //renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
	render();
}

function render() 
{
    d20mesh.rotation.y += 0.01;
	dice1.rotation.y -= 0.01;
	dice2.rotation.y -= 0.01;
    d20mesh.rotation.z += 0;
    d20mesh.rotation.x += 0.01;
	dice1.rotation.x -= 0.01;
	dice2.rotation.x -= 0.01;
	renderer.render( scene, camera );
}
