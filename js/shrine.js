var camera, scene, renderer;
var d20, dieMaterial, d20Mesh;
var i;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 800; // how far zoomed out we are

    scene = new THREE.Scene();

    d20 = new THREE.IcosahedronGeometry( 120, 0 );
    // wireframe: draw lines instead of coloring sides
    dieMaterial = new THREE.MeshLambertMaterial( { wireframe: false, emissive: 0xaaaaaa } );
    d20Mesh = new THREE.Mesh( d20, dieMaterial );
    d20Mesh.position.set(0,200,0);
    scene.add( d20Mesh );

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
    requestAnimationFrame( animate );
    
    d20Mesh.rotation.y += 0.01;
    d20Mesh.rotation.x += 0.01;

    renderer.render( scene, camera );
}
