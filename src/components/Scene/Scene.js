import { useEffect, useRef } from 'react'
import { ContainerScene } from './Scene.elements'
import { cleanUpScene, initScene, gspaAnimation } from './Script'

const Scene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    initScene(mountRef)

    return () => {
      cleanUpScene()
    }
  }, [])

  return (
    <>
      <ContainerScene
        className="SceneContainer"
        ref={mountRef}
      ></ContainerScene>
      <button
        onClick={() => gspaAnimation('cube1')}
        style={{ padding: '1rem' }}
      >
        CUBE 1
      </button>
      <button
        onClick={() => gspaAnimation('cube2')}
        style={{ padding: '1rem' }}
      >
        CUBE 2
      </button>
      <button
        onClick={() => gspaAnimation('cube3')}
        style={{ padding: '1rem' }}
      >
        CUBE 3
      </button>
      <button
        onClick={() => gspaAnimation('cube4')}
        style={{ padding: '1rem' }}
      >
        CUBE 4
      </button>
    </>
  )
}

export default Scene
