import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, AmbientLight, DirectionalLight, Material } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GeometryPrimitiveAdder from "./geometry-primitive-adder";
import EnumPrimitive from "../types/primitive.enum";

export default class ThreeContainer {
    private static instance: ThreeContainer;
    private readonly scene = new Scene();
    private readonly camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    private readonly renderer = new WebGLRenderer();
    private readonly controls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    private canvasRef: null | HTMLCanvasElement = null

    private constructor() {
        if (ThreeContainer.instance) throw new Error("Error - use Singleton.getInstance()");
    }

    public static getInstance(): ThreeContainer {
        ThreeContainer.instance = ThreeContainer.instance || new ThreeContainer();
        return ThreeContainer.instance;
    }

    public getScene(): Scene {
        return this.scene;
    }

    public initCanvas(canvasEl: HTMLCanvasElement): void {
        if (this.canvasRef) return
        this.canvasRef = canvasEl;

        this.sceneResize();
        this.setCameraInitialPositin();
        setTimeout(() => { GeometryPrimitiveAdder.addGeometry(EnumPrimitive.Box, 1, 1, 1, 100) }, 1000)
        this.animate();

        this.addCanvasListners();
        this.addLightSources();

        this.canvasRef.appendChild(this.renderer.domElement);
    }

    public getMeshes(): Mesh[] {
        return this.scene.children.filter((child) => child instanceof Mesh);
    }

    public resetScene(): void {
        for (const mesh of this.getMeshes()) {
            if (mesh.material instanceof Material) mesh.material.dispose()
            this.scene.remove(mesh);
        }
    }

    private sceneResize(): void {
        this.updateCameraParams();
        this.setRendererSize();
    }

    private updateCameraParams(): void {
        if (!this.canvasRef) return;
        this.camera.aspect = this.canvasRef.clientWidth / this.canvasRef.clientHeight;
        this.camera.updateProjectionMatrix()
    }

    private setRendererSize(): void {
        if (!this.canvasRef) return;
        this.renderer.setSize(this.canvasRef.clientWidth, this.canvasRef.clientHeight)
    }

    private setCameraInitialPositin(): void {
        this.camera.position.set(0, 0, 15);
    }

    private animate(): void {
        const animate = () => {
            this.controls.update()
            this.renderer.render(this.scene, this.camera);
        }
        this.renderer.setAnimationLoop(animate);
    }

    private addCanvasListners(): void {
        window.addEventListener('resize', () => {
            this.sceneResize()
        })
    }

    private addLightSources(): void {
        const ambientLight = new AmbientLight(0xffffff, 0.3);
        const directionalLight = new DirectionalLight(0xffffff, 2);
        directionalLight.position.set(100, 100, 100);
        this.scene.add(ambientLight, directionalLight);
        directionalLight.castShadow = true
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = - 200;
        directionalLight.shadow.camera.left = - 200;
        directionalLight.shadow.camera.right = 200;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 1000;
    }
}