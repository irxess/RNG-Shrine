var camera, scene, renderer;
var d20, material, mesh;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    d20 = new THREE.IcosahedronGeometry( 120, 0 );
    material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
    mesh = new THREE.Mesh( d20, material );
    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );

    mesh.rotation.y += 0.015;

    renderer.render( scene, camera );
}
