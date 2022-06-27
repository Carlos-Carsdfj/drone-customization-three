import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap, Power2 } from 'gsap'
//Global variables
let currentRef = null
const timeline = new gsap.timeline({
  defaults: {
    duration: 1,
    ease: Power2.easeOut,
  },
})

//Scene, camera, renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100)
scene.add(camera)
camera.position.set(5, 5, 5)
camera.lookAt(new THREE.Vector3())

const renderer = new THREE.WebGLRenderer()
renderer.setSize(100, 100)

//OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight)
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight
  camera.updateProjectionMatrix()
}
window.addEventListener('resize', resize)

//Animate the scene
const animate = () => {
  orbitControls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

//cube
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
)
scene.add(cube)
// cube clones
const cube2 = cube.clone()
cube2.position.set(0, 4, 0)
scene.add(cube2)
const cube3 = cube.clone()
cube3.position.set(0, 8, 0)
scene.add(cube3)
const cube4 = cube.clone()
cube4.position.set(0, 12, 0)
scene.add(cube4)

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current
  resize()
  currentRef.appendChild(renderer.domElement)
}

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.removeFromParent()
  currentRef.removeChild(renderer.domElement)
}

export const moveCube = () => {
  timeline
    .from(cube.position, {
      y: 2,
      x: -2,
      z: 2,
    })
    .from(
      cube.rotation,
      {
        y: Math.PI * 2,
      },
      '-=1.0'
    )
    .to(camera.position, {
      x: 10,
      y: 10,
      z: 10,
    })
    .to(camera, {
      zoom: 2,
      onUpdate: () => {
        camera.updateProjectionMatrix()
      },
    })
    .to(orbitControls.target, {
      y: 4,
    })
}

moveCube()
