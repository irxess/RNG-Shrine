var camera, scene, renderer;
var d20, dieMaterial, mesh;
var i;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 800; // how far zoomed out we are

    scene = new THREE.Scene();

    d20 = new THREE.IcosahedronGeometry( 120, 0 );
    poleR = new THREE.CylinderGeometry(10, 10, 600, 8, 1, false);
    poleL = new THREE.CylinderGeometry(10, 10, 600, 8, 1, false);
    podium = new THREE.CylinderGeometry(100, 100, 500, 8, 1, false);
    podiumTop = new THREE.CylinderGeometry(150, 150, 50, 8, 1, false);
    podiumMat = new THREE.MeshLambertMaterial( { color: 0xffcc00, wireframe: false } );
    // wireframe: draw lines instead of coloring sides
    dieMaterial = new THREE.MeshLambertMaterial( { wireframe: false, emissive: 0xaaaaaa } );
    pRMesh = new THREE.Mesh( poleR , podiumMat );
    pLMesh = new THREE.Mesh( poleL , podiumMat );
    pMesh = new THREE.Mesh( podium , podiumMat );
    ptMesh = new THREE.Mesh( podiumTop , podiumMat );
    d20mesh = new THREE.Mesh( d20, dieMaterial );
    pRMesh.position.set(500,-200,0);
    pLMesh.position.set(-500,-200,0);
    d20mesh.position.set(0,250,0);
    pMesh.position.set(0,-200,0);
    ptMesh.position.set(0,50,0);
    scene.add( d20mesh );
    scene.add( pMesh );
    scene.add( pRMesh );
    scene.add( pLMesh );
    scene.add( ptMesh );

    // Add lights
    var leftLight = new THREE.PointLight( 0x00ff00 );
    leftLight.position.set( -600, 0, 0 ); // x, y, z?
    scene.add( leftLight );
    var rightLight = new THREE.PointLight( 0xff0000 );
    rightLight.position.set( 600, 0, 0 ); // x, y, z?
    scene.add( rightLight );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    i = 0;
    requestAnimationFrame( animate );
    
    i += 0.01;
    d20mesh.rotation.y += 0.01;
    d20mesh.rotation.z += 0;
    d20mesh.rotation.x += 0.01;

    renderer.render( scene, camera );
}
