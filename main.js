import * as THREE from 'three';
import { Mesh } from 'three'
//this code breaks the website for some reason but should figure out why
// import WebGL from 'three/addons/capabilities/WebGL.js';

// // Check if the clients device supports WebGL
// if ( WebGL.isWebGLAvailable() ) {

// 	// Initiate function or other initializations here
// 	animate();

// } else {

// 	const warning = WebGL.getWebGLErrorMessage();
// 	document.getElementById( 'container' ).appendChild( warning );

// }



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// HELPER FUNCTIONS
const { PI } = Math

//adds an array of items to a scene
const addToScene = arr => arr.forEach(e => scene.add(e))

//shortform for the geometry of any shape
const geo = (type, ...args) => {
	if(type == 'box'){
		return new THREE.BoxGeometry(...args)
	} else if (type == 'plane'){
		return new THREE.PlaneGeometry(...args)
	}
}
const basicMaterial = arg => new THREE.MeshBasicMaterial(arg)


const pos = (item, ...args) => {
	if(args.length != 3 && args.length != 6){
		console.error('the pos function requires 3 position arguments, or 3 position arguments followed by 3 rotation arguments')
		return
	} else {
		[item.position.x, item.position.y, item.position.z] = [...args].slice(0, 3) 
		if(args.length == 6){
			[item.rotation.x, item.rotation.y, item.rotation.z] = [...args].slice(3, 6) 
		}	
	}
	return item
}

//HELPER FUNCTION END



const room = [
	new Mesh(geo('plane', 10, 10),basicMaterial( {color: "rgb(152, 111, 51)", side: THREE.DoubleSide})),
	pos(new Mesh(geo('plane', 10, 10),basicMaterial({color: "rgb(144, 238, 144)", side: THREE.DoubleSide})), 5, 0, 0, 0, PI/2, 0),
	pos(new Mesh(geo('plane', 10, 10),basicMaterial( {color: "rgb(144, 238, 144)", side: THREE.DoubleSide})), -5, 0, 0, 0, PI/2, 0),
	pos(new Mesh(geo('plane', 10, 10),basicMaterial( {color: "rgb(255)", side: THREE.DoubleSide})), 0, 0, 5),

	//front wall
	pos(new Mesh(geo('plane', 1, 10),basicMaterial( {color: "rgb(100, 198, 124)", side: THREE.DoubleSide})),-4.5, 5, 0, PI/2, 0, 0),
	pos(new Mesh(geo('plane', 5, 10),basicMaterial( {color: "rgb(100, 198, 124)", side: THREE.DoubleSide})),2.5, 5, 0, PI/2, 0, 0),
	pos(new Mesh(geo('plane', 4, 4),basicMaterial( {color: "rgb(100, 198, 124)", side: THREE.DoubleSide})),-2, 5, 0, PI/2, 0, 0),
	pos(new Mesh(geo('plane', 4, 1),basicMaterial( {color: "rgb(100, 198, 124)", side: THREE.DoubleSide})),-2, 5, 5, PI/2, 0, 0),

	//wooden frame
	pos(new Mesh(geo('plane', 4, 0.2),basicMaterial( {color: "rgb(170, 140, 100)", side: THREE.DoubleSide})),-2, 4.99, 4.5, PI/2, 0, 0),
	pos(new Mesh(geo('plane', 4, 0.2),basicMaterial( {color: "rgb(170, 140, 100)", side: THREE.DoubleSide})),-2, 4.99, 1.9, PI/2, 0, 0),
	pos(new Mesh(geo('plane', 2.8, 0.2),basicMaterial( {color: "rgb(170, 140, 100)", side: THREE.DoubleSide})),-4.1, 4.99, 3.2, PI/2, 0, PI/2),
	pos(new Mesh(geo('plane', 2.8, 0.2),basicMaterial( {color: "rgb(170, 140, 100)", side: THREE.DoubleSide})),0, 4.99, 3.2, PI/2, 0, PI/2),
	pos(new Mesh(geo('plane', 2.4, 0.1),basicMaterial( {color: "rgb(255)", side: THREE.DoubleSide})),-2.1, 4.99, 3.2, PI/2, 0, PI/2),
	//sky
	pos(new Mesh(geo('plane', 10, 10),basicMaterial( {color: "rgb(135, 206, 235)", side: THREE.DoubleSide})),0, 5.1, 0, PI/2, 0, 0),
]

const table = [
	//keyboard stand
	pos((new Mesh(geo('box', 1.8, 1, 0.1), basicMaterial({color: "rgb(170,140,100)"}))), 1, 2.5, 1, PI/15, 0, 0),

	pos((new Mesh(geo('box', 0.1, 1, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), -0.05, 3.2, 1),
	pos((new Mesh(geo('box', 0.1, 1, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), 2.05, 3.2, 1),

	pos((new Mesh(geo('box', 4, 1, 0.1), basicMaterial({color: "rgb(184,155,113)"}))), 1.9, 3.2, 1.2),

	pos((new Mesh(geo('box', 0.1, 0.8, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), -0.05, 3.28, 1.3),
	pos((new Mesh(geo('box', 0.1, 0.5, 2.5), basicMaterial({color: "rgb(160,130,90)"}))), 1.01, 3.28, 1.3),

	pos((new Mesh(geo('box', 1.15, 1, 0.1), basicMaterial({color: "rgb(184,155,113)"}))), 0.48, 3.35, 1.5),

	pos((new Mesh(geo('box', 2.9, 1, 0.1), basicMaterial({color: "rgb(184,155,113)"}))), 2.4, 3.5, 2.5),

	pos((new Mesh(geo('box', 0.1, 0.5, 2.5), basicMaterial({color: "rgb(160,130,90)"}))),3.8, 3.28, 1.3),

	//black backing for the cabinet
	pos((new Mesh(geo('box', 3, 1.3, 0.1), basicMaterial({color: "rgb(0, 0, 0)"}))), 2.5, 3.55, 1.8, PI/2, 0, 0),

	pos((new Mesh(geo('box', 2.9, 1, 0.1), basicMaterial({color: "rgb(184,155,113)"}))), 2.4, 3.7, 1.5),

	pos((new Mesh(geo('box', 0.1, 0.2, 1), basicMaterial({color: "rgb(160,130,90)"}))),3.2, 3.31, 2),
	pos((new Mesh(geo('box', 0.1, 0.2, 1), basicMaterial({color: "rgb(160,130,90)"}))),1.7, 3.31, 2),

	pos((new Mesh(geo('box',1.5, 1, 0.07), basicMaterial({color: "rgb(184,155,113)"}))), 2.45, 3.75, 2.25),
	pos((new Mesh(geo('box', 1.5, 1, 0.07), basicMaterial({color: "rgb(184,155,113)"}))), 2.45, 3.75, 2),

	pos((new Mesh(geo('box', 1.9, 1.3, 0.1), basicMaterial({color: "rgb(184, 155, 113)"}))), 3, 2.75, 0.58, PI/2, 0, 0),
	pos((new Mesh(geo('box', 1.9, 0.2, 0.1), basicMaterial({color: "rgb(160, 130, 90)"}))), 3, 2.74, 1.05, PI/2, 0, 0),

	pos((new Mesh(geo('box', 0.1, 1, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), 3.8, 3.2, 0.8),
]
const monitor = [
	//screen
	pos((new Mesh(geo('box', 1, 0.6, 0.1), basicMaterial({color: "rgb(40, 40, 40)"}))), 0.4, 3.35, 2, PI/2, 0, 0),
	pos((new Mesh(geo('box', 0.9, 0.5, 0.1), basicMaterial({color: "rgb(255, 255, 255)"}))), 0.4, 3.3499, 2, PI/2, 0, 0),
	//back support
	pos((new Mesh(geo('box', 0.2, 0.6, 0.1), basicMaterial({color: "rgb(0, 0, 0)"}))), 0.45, 3.38, 1.8, PI/2, 0, 0),

	//legs
	pos((new Mesh(geo('box', 0.05, 0.4, 0.06), basicMaterial({color: "rgb(0, 0, 0)"}))), 0.65, 3.1, 1.6, 0, 0, PI/5),
	pos((new Mesh(geo('box', 0.05, 0.4, 0.06), basicMaterial({color: "rgb(0, 0, 0)"}))), 0.30, 3.1, 1.6, 0, 0, -PI/5),
]
monitor[1].name = 'monitor'
const laptop = [

	pos((new Mesh(geo('box', 1, 0.6, 0.1), basicMaterial({color: "rgb(20, 20, 20)"}))), 2, 3.1, 1.6, PI/2, 0, 0),
	pos((new Mesh(geo('box', 0.9, 0.5, 0.1), basicMaterial({color: "rgb(255, 255, 255)"}))), 2, 3.0999, 1.6, PI/2, 0, 0),
	pos((new Mesh(geo('box', 1, 0.45, 0.05), basicMaterial({color: "rgb(0, 0, 0)"}))), 2, 2.9	, 1.27, 0, 0, 0),
]
laptop[1].name = 'laptop'


const keyBoard = [
	pos((new Mesh(geo('box', 0.7, 0.2, 0.05), basicMaterial({color: "rgb(0, 0, 0)"}))), 1, 2.4, 1.1, PI/15, 0, 0)
]

const curve = new THREE.EllipseCurve(
		0,  0,            // ax, aY
		10, 10,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false,            // aClockwise
		0                 // aRotation
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const ellipse = new THREE.Line( geometry, material );
ellipse.position.y = 4
ellipse.position.z = 2
scene.add(ellipse)

addToScene(keyBoard)
addToScene(room)
addToScene(monitor)
addToScene(laptop)
addToScene(table)

pos(camera, 1, 1, 2, PI/2, 0, 0)

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const clicked = raycaster.intersectObjects( scene.children )[0];
	//intersects gets ALL OBJECTS IT INTERSECTS
	//so we pick just one
	

	//DEV TESTING ONLY, COLORS CLICKED OBJECT
	//intersects[0].object.material.color.set( 0xff0000 );
	let url = window.location.href
	if(clicked.object.name == 'monitor'){
		url += 'p5Projects'
	} else if (clicked.object.name == 'laptop') {
		url += 'mathChalkBoard'
	}
	window.location.href = url
	renderer.render( scene, camera );

}
function click( event ) {
	console.log(camera)
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	render()
}
window.addEventListener( 'click', click );

window.addEventListener("keydown", e => {
	if(e.key == 'ArrowUp') camera.rotation.x += 0.02
	if(e.key == 'ArrowDown') camera.rotation.x -= 0.02
})

function animate() {
	requestAnimationFrame( animate );
	// ANIMATION CODE STARTS HERE
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// ANIMATION ENDS STARTS HERE
	renderer.render( scene, camera );

}
animate();



