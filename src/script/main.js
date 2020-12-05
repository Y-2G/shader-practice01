import vertexSource from '../glsl/shader.vert';
import fragmentSource from '../glsl/shader.frag';

let canvas;
let camera;
let scene;
let renderer;
let uniforms;
let mouse;

function init() {
    canvas = document.getElementById( 'canvas' );

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    mouse = new THREE.Vector2();

    uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_mouse: { type: "v2", value: mouse },
    };

    const material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexSource,
        fragmentShader: fragmentSource
    } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(400, 400);
    
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
    requestAnimationFrame( animate );
    uniforms.u_time.value += 1.0;
    renderer.render( scene, camera );
}

function mouseMoved(x, y) {
    // 左上原点から左下原点に変換
    mouse.x = x / canvas.clientWidth;
    mouse.y = 1.0 - ( y / canvas.clientHeight );
}

window.addEventListener('load', () => {
    init();
    animate();
});

window.addEventListener('mousemove', e => {
    mouseMoved(e.clientX, e.clientY);
});