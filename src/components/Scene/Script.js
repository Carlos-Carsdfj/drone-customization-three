import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap, Power2 } from 'gsap'
import * as dat from 'dat.gui'

//Global variables
let currentRef = null
const timeline = new gsap.timeline({
  defaults: {
    duration: 1,
    ease: Power2.easeOut,
  },
})
const gui = new dat.GUI()
const animationParams = {
  cube1: {
    target: {
      x: 0,
      y: 0,
      z: 0,
    },
    camera: {
      x: 10,
      y: 10,
      z: 10,
    },
    zoom: 1.2,
  },
  cube2: {
    target: {
      x: 0,
      y: 4,
      z: 0,
    },
    camera: {
      x: -5,
      y: -5,
      z: 1 - 6,
    },
    zoom: 3,
  },
  cube3: {
    target: {
      x: 0,
      y: 8,
      z: 0,
    },
    camera: {
      x: 4,
      y: -1,
      z: -9,
    },
    zoom: 2,
  },
  cube4: {
    target: {
      x: 0,
      y: 12,
      z: 0,
    },
    camera: {
      x: 15,
      y: 15,
      z: 15,
    },
    zoom: 1,
  },
}

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

//Gui

gui.add(camera.position, 'x').min(-10).max(15).step(1).name('Camera position x')

gui.add(camera.position, 'y').min(-10).max(15).step(1).name('Camera position y')

gui.add(camera.position, 'z').min(-10).max(15).step(1).name('Camera position z')
gui
  .add(camera, 'zoom')
  .min(1)
  .max(5)
  .step(1)
  .name('Zoom')
  .onChange(() => {
    camera.updateProjectionMatrix()
  })

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
  gui.destroy()
  scene.removeFromParent()
  currentRef.removeChild(renderer.domElement)
}

export const gspaAnimation = (meshParams) => {
  const mesh = animationParams[meshParams]
  timeline
    .to(orbitControls.target, {
      x: mesh.target.x,
      y: mesh.target.y,
      z: mesh.target.z,
    })
    .to(
      camera.position,
      {
        x: mesh.camera.x,
        y: mesh.camera.y,
        z: mesh.camera.z,
      },
      '-=1.0'
    )
    .to(
      camera,
      {
        zoom: mesh.zoom,
        onUpdate: () => {
          camera.updateProjectionMatrix()
        },
      },
      '-=1.0'
    )
}
