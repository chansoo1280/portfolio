// #region Global Imports
import React, { ReactNode, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls, mergeVertices } from "@Services"
// #endregion Global Imports

// #region Local Imports
import styles from "./Skills.module.scss"
import { Object3D } from "three"
// #endregion Local Imports
interface contextType extends CanvasRenderingContext2D {
    setColor: (arg0: string) => void
}
interface spriteType extends THREE.Sprite {
    context: contextType
    texture: THREE.Texture
    idx: number
}
const useCanvasStatus = (skills: any) => {
    const [desc, setDesc] = useState(null)
    const controlsObj: any = {
        enabled: true,
        isSelected: false,
        sel_idx: null,
    }
    let scene: any = null
    let camera: any = null
    let controls: any = null
    let renderer: any = null
    const group = new THREE.Group()
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-99, -99)
    let animationFrame: any = null
    const makeTextSprite = (c: HTMLCanvasElement, message: any, parameters: any) => {
        if (parameters === undefined) parameters = {}

        const fontface = Object.prototype.hasOwnProperty.call(parameters, "fontface") ? parameters.fontface : "Arial"

        const fontsize = Object.prototype.hasOwnProperty.call(parameters, "fontsize") ? parameters.fontsize : 18
        const canvas = document.createElement("canvas")

        const context = canvas.getContext("2d") as contextType
        context.font = "Bold " + fontsize + "px " + fontface
        // get size data (height depends only on font size)
        const metrics = context.measureText(message)
        const textWidth = metrics.width
        canvas.width = textWidth
        canvas.height = fontsize
        context.font = "Bold " + fontsize + "px " + fontface
        context.lineWidth = 0
        // text color
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "rgba(0, 0, 0, 1)"

        context.fillText(message, textWidth / 2, fontsize / 2)

        context.setColor = function (color: string) {
            context.fillStyle = color
            context.fillText(message, textWidth / 2, fontsize / 2)
        }

        // context.scale(100, 100)
        // canvas contents will be used for a texture
        const texture = new THREE.Texture(canvas)
        texture.needsUpdate = true

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            // useScreenCoordinates: false,
        })

        const sprite = new THREE.Sprite(spriteMaterial) as spriteType
        // context.translate(textWidth / 2, fontsize / 2)
        sprite.scale.set(textWidth / fontsize, 1, 0)
        sprite.context = context
        sprite.texture = texture
        return sprite
    }
    const init = (c: HTMLCanvasElement) => {
        let setPos: any = null
        let getTopDegree: any = null
        let getLeftDegree: any = null
        let getDiffDegree: any = null
        // SCENE
        scene = new THREE.Scene()
        {
            const near = 20
            const far = 40
            const color = "white"
            scene.fog = new THREE.Fog(color, near, far)
        }
        // CAMERA
        const SCREEN_WIDTH = window.innerWidth * 0.8
        const SCREEN_HEIGHT = window.innerWidth * 0.8
        const VIEW_ANGLE = 45
        const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
        const NEAR = 0.1
        const FAR = 20000
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
        // window.camera = camera
        camera.position.set(0, 0, 30)
        camera.lookAt(scene.position)
        scene.add(camera)

        // window.mouse = mouse
        function onMouseMove(event: any) {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            // console.log(event)
            const wrap = event.path[0]
            mouse.x = (event.offsetX / wrap.offsetWidth) * 2 - 1
            mouse.y = -(event.offsetY / wrap.offsetHeight) * 2 + 1
        }

        c.addEventListener("mousemove", onMouseMove)
        c.addEventListener("click", onMouseClick)

        function onMouseClick(event: any) {
            raycaster.setFromCamera(mouse, camera)

            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(group.children, true)

            if (intersects.length) {
                interface Object3dOfRaycasterType extends Object3D {
                    idx: number
                }
                const Object3dOfintersects = intersects[0].object as Object3dOfRaycasterType
                const idx = Object3dOfintersects.idx
                if (idx === controlsObj.sel_idx) {
                    controls.enabled = true
                    controlsObj.sel_idx = null
                    controlsObj.isSelected = false
                    setDesc(null)
                } else {
                    setPos(idx)
                    controls.enabled = false
                    controlsObj.sel_idx = idx
                    controlsObj.isSelected = true
                    setDesc(skills[idx])
                }
            }
        }

        // RENDERER
        //   if (Detector.webgl)
        //     renderer = new THREE.WebGLRenderer({ antialias: true })
        //   else renderer = new THREE.CanvasRenderer()
        renderer = new THREE.WebGLRenderer({
            canvas: c,
            antialias: true,
            alpha: true,
        })

        renderer.setPixelRatio(window.devicePixelRatio * 1.5)
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
        // CONTROLS
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = false
        controls.enableDamping = true
        controls.autoRotate = true

        /// /////////
        // CUSTOM //
        /// /////////

        scene.add(group)

        let geometry: any = new THREE.IcosahedronGeometry(8)
        geometry.deleteAttribute("normal")
        geometry.deleteAttribute("uv")

        geometry = mergeVertices(geometry)
        const material = new THREE.MeshPhongMaterial({
            color: "#000000",
            opacity: 0,
            alphaTest: 0.5,
            transparent: true,
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        scene.add(mesh)
        const positionAttribute = mesh.geometry.getAttribute("position")
        for (let i = 0; i < positionAttribute.count; i++) {
            const vertex = new THREE.Vector3()
            vertex.fromBufferAttribute(positionAttribute, i)
            mesh.localToWorld(vertex)

            const spritey = makeTextSprite(c, skills[i].name, {
                fontsize: 120,
            })
            spritey.position.set(vertex.x, vertex.y, vertex.z)
            spritey.idx = i
            group.add(spritey)
        }

        setPos = function (idx: number) {
            getDiffDegree(group.children[idx].position, camera.position)
        }

        getTopDegree = function ({ x, y, z }: any) {
            const planePos = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
            const TopDegree = Math.atan2(planePos, -y) / (Math.PI / 180) - 90
            return TopDegree
        }
        getLeftDegree = function ({ x, y, z }: any) {
            const planePos = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
            let leftDegree = Math.asin(z / planePos) / (Math.PI / 180) - 90
            if (x >= 0) {
                leftDegree = -leftDegree
            } else if (x < 0) {
                leftDegree = leftDegree + 180 + 180
            }
            return leftDegree
        }
        getDiffDegree = function ({ x, y, z }: any, cameraPos: any) {
            const cameraTopDegree = getTopDegree(cameraPos)
            const cameraLeftDegree = getLeftDegree(cameraPos)

            const tartgetTopDegree = getTopDegree({ x, y, z })
            const tartgetLeftDegree = getLeftDegree({ x, y, z })

            const TopDiffRadian = (tartgetTopDegree - cameraTopDegree) * (Math.PI / 180)
            let leftDiffRadian = (tartgetLeftDegree - cameraLeftDegree) * (Math.PI / 180)

            controls.setRotateUp(-TopDiffRadian + 0.2)
            // controls.setRotateUp(-TopDiffRadian + 0.2)

            if (Math.PI < leftDiffRadian) {
                leftDiffRadian = leftDiffRadian - Math.PI * 2
            }
            controls.setRotateLeft(leftDiffRadian)
            // controls.setRotateLeft(leftDiffRadian + 0.4)
        }
    }

    const update = () => {
        controls.update()
    }

    const render = () => {
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera)

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(group.children, true)
        if (intersects.length) {
            document.body.style.cursor = "pointer"
            controls.autoRotate = false
        } else {
            document.body.style.cursor = "unset"
            if (controlsObj.isSelected !== true) {
                controls.autoRotate = true
            }
        }
        const vertices = group.children
        for (let i = 0; i < vertices.length; i++) {
            let idx = null
            const vertice = vertices[i] as spriteType
            if (intersects.length) {
                const intersect = intersects[0] as any
                idx = intersect.object.idx
            }
            if (idx === i || controlsObj.sel_idx === i) {
                vertice.context.setColor("#ff0000")
            } else {
                vertice.context.setColor("#000000")
            }
            vertice.texture.needsUpdate = true
        }

        renderer.render(scene, camera)
    }

    const animate = () => {
        animationFrame = requestAnimationFrame(animate)
        render()
        update()
    }

    const bulrLabels = () => {
        console.log("bulrLabels")
    }
    useEffect(() => {
        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [])
    return {
        bulrLabels,
        controls,
        desc,
        init: (c: any) => {
            init(c)
            animate()
        },
        animationFrame: animationFrame,
    }
}

interface Props {
    children?: ReactNode
}
const Skills: React.FunctionComponent<Props> = (props) => {
    const canvas = useRef<HTMLCanvasElement>(null)
    const skills = [
        {
            idx: 0,
            name: "Vue.js",
            title: '"가장 많이 쓴 모던프레임워크"',
            con: "",
        },
        {
            idx: 1,
            name: "HTML",
            title: '"웹표준과 접근성을 준수한 마크업"',
            con: "",
        },
        {
            idx: 2,
            name: "CSS",
            title: '"가장 많이 쓴 모던프레임워크"',
            con: "설명설명 ",
        },
        {
            idx: 3,
            name: "react.js",
            title: '"가장 많이 쓴 모던프레임워크"',
            con: "설명설명 ",
        },
        {
            idx: 4,
            name: "RN",
            title: '"가장 많이 쓴 모던프레임워크"',
            con: "설명설명 ",
        },
        {
            idx: 5,
            name: "THREE.js",
        },
        {
            idx: 6,
            name: "node.js",
        },
        {
            idx: 7,
            name: "c3.js",
        },
        {
            idx: 8,
            name: "Github",
        },
        {
            idx: 9,
            name: "nuxt.js",
        },
        {
            idx: 10,
            name: "next.js",
        },
        {
            idx: 11,
            name: "nest.js",
        },
    ]
    const { bulrLabels, controls, desc, init, animationFrame } = useCanvasStatus(skills)
    const {} = props
    useEffect(() => {
        init(canvas.current)
    }, [])
    return (
        <div className={styles["skills"]}>
            <canvas ref={canvas}></canvas>
        </div>
    )
}

export default Skills
