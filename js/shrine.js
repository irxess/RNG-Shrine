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
    // wireframe: draw lines instead of coloring sides
    dieMaterial = new THREE.MeshLambertMaterial( { color: 0xffcc00, wireframe: false } );
    mesh = new THREE.Mesh( d20, dieMaterial );
    scene.add( mesh );

    // Add lights
    var leftLight = new THREE.PointLight( 0xffffff );
    leftLight.position.set( -600, 0, 0 ); // x, y, z?
    scene.add( leftLight );
    var rightLight = new THREE.PointLight( 0xffffff );
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
    //mesh.rotation.y += 0.015;
    mesh.rotation.y += Math.sin(i);

    renderer.render( scene, camera );
}
