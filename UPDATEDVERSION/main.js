import * as THREE from 'three';
import { Mesh } from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("fade").appendChild( renderer.domElement );

// HELPER FUNCTIONS
const { PI, abs } = Math

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

const diff = (a, b) => Math.abs(a - b);


const makeAnimation = (camera, ...args) => {
	if(args.length + 1 != 8){console.error("makeAnimation requires 8 arguments")}
	let [endX, endY, endZ, rotX, rotY, rotZ, spd] = [...args]
	let rotSpd = 0.001
	let xSpd, ySpd, zSpd, xRotSpd, yRotSpd, zRotSpd;
	xSpd = ySpd = zSpd = spd
	xRotSpd = yRotSpd = zRotSpd = rotSpd
	if(camera.position.x > endX)xSpd = -abs(xSpd)
	if(camera.position.y > endY)ySpd = -abs(ySpd)
	if(camera.position.z > endZ)zSpd = -abs(zSpd)
	if(camera.rotation.x > rotX)xRotSpd = -abs(xRotSpd)
	if(camera.rotation.y > rotY)yRotSpd = -abs(yRotSpd)
	if(camera.rotation.z > rotZ)zRotSpd = -abs(zRotSpd)
	const STOPAMT = 0.01
	const newAnimation = () => {
		//animation stop condition
		if(diff(camera.position.y, endY) < STOPAMT && diff(camera.position.x, endX) < STOPAMT && diff(camera.position.z, endZ) < STOPAMT){
			return true
		}
		if(diff(camera.position.x, endX) > STOPAMT){camera.position.x += xSpd}
		if(diff(camera.position.y, endY) > STOPAMT){camera.position.y += ySpd}
		if(diff(camera.position.z, endZ) > STOPAMT){camera.position.z += zSpd}
		if(diff(camera.rotation.x, rotX) > 0.00001){camera.rotation.x += xRotSpd}
		if(diff(camera.rotation.y, rotY) > 0.00001){camera.rotation.y += yRotSpd}
		if(diff(camera.rotation.z, rotZ) > 0.00001){camera.rotation.z += zRotSpd}
	}
	return newAnimation
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

const desk = [
	//keyboard stand
  	pos((new Mesh(geo('box', 1.8, 1, 0.1), basicMaterial({color: "rgb(170,140,100)"}))), 1, 2.5, 1, PI/15, 0, 0),

  	pos((new Mesh(geo('box', 0.1, 1, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), -0.05, 3.2, 1),
    // THESE ARE THE ONES
	pos((new Mesh(geo('box', 0.1, 1, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), 2.05, 3.3, 1),
	pos((new Mesh(geo('box', 0.1, 1, 0.49), basicMaterial({color: "rgb(160,130,90)"}))), 3.8, 3.3, 0.8),

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

]
desk.forEach(t => t.class = 'desk')
const monitor = [
	//screen
	pos((new Mesh(geo('box', 1.4, 0.6, 0.1), basicMaterial({color: "rgb(40, 40, 40)"}))), 0.2, 3.35, 2, PI/2, PI/10, 0),
	pos((new Mesh(geo('box', 1.3, 0.5, 0.1), basicMaterial({color: "rgb(255, 255, 255)"}))), 0.2, 3.3499, 2, PI/2, PI/10, 0),
	//back support
	pos((new Mesh(geo('box', 0.2, 0.6, 0.1), basicMaterial({color: "rgb(0, 0, 0)"}))), 0.25, 3.38, 1.8, PI/2, PI/10, 0),

	//legs
	pos((new Mesh(geo('box', 0.05, 0.4, 0.06), basicMaterial({color: "rgb(0, 0, 0)"}))), 0.40, 3.15, 1.6, 0, 0, PI/5),
	pos((new Mesh(geo('box', 0.05, 0.4, 0.06), basicMaterial({color: "rgb(0, 0, 0)"}))), 0.10, 3.15, 1.6, 0, 0, -PI/5),
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
addToScene(desk)

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
	if(clicked.object.class == 'desk'){
		deskClicked = true
	} else if(clicked.object.name == 'monitor'){
		monitorClicked = true
		// window.location.href = url += 'p5Projects'
	} else if (clicked.object.name == 'laptop') {
		// window.location.href = url += 'mathChalkBoard'
	}
	renderer.render( scene, camera );

}
function click( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	render()
}
window.addEventListener( 'click', click );

window.addEventListener("keydown", e => {
	if(e.key == 'ArrowUp') camera.position.y += 0.2
	if(e.key == 'ArrowDown') camera.position.y -= 0.2
	if(e.key == 'ArrowLeft') camera.rotation.y += 0.2
	if(e.key == 'ArrowRight') camera.rotation.y -= 0.2
})

//OUR ANIMATIONS
//STARTER COORDS
let camRotation = [camera.rotation.x, camera.rotation.y, camera.rotation.z]
let camPosition = camera.position

let deskClicked, atDesk = false;
let walkToDeskAnimation = makeAnimation(camera, 1,1,2,...camRotation, 0.005)

let monitorClicked, atMonitor = false
let monitorAnimation = makeAnimation(camera, 0.5,2.8,2,camRotation[0], camRotation[1] + 0.4, camRotation[2], 0.005)

const locations = [atDesk, atMonitor]

//1, 1, 2 is at desk
camera.position.y = -2

document.getElementById('fade').style.opacity = '1.0'
function fade(){
	let amt = Number(document.getElementById('fade').style.opacity)
	document.getElementById('fade').style.opacity = (amt - 0.01).toString()
}

function animate() {
	requestAnimationFrame( animate );
	if(deskClicked && !atDesk){
		if(walkToDeskAnimation()){
			atDesk = true;
			deskClicked = false
		}
	} else if ( monitorClicked ) {
		if(monitorAnimation() && !atMonitor){
			atMonitor = true
			monitorClicked = false
		} else if (atMonitor){
			fade()
		}
	}
	// ANIMATION CODE STARTS HERE
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// ANIMATION ENDS STARTS HERE
	renderer.render( scene, camera );

}
animate();
