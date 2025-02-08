import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, AmbientLight, DirectionalLight, Material, Color, Raycaster, Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GeometryPrimitiveAdder from "./geometry-primitive-adder";
import EnumPrimitive from "../types/primitive.enum";
import ThreeSelectHandler from "./three-select-handler";

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
        this.scene.background = new Color(0x171717)
        this.animate();

        this.addCanvasListners();
        this.addLightSources();

        this.canvasRef.appendChild(this.renderer.domElement);
    }

    public getMeshes(): Mesh[] {
        return this.scene.children.filter((child) => child instanceof Mesh);
    }

    public refresView(): void {
        // refresh ideally should be done through state mangment like redux or zustand or 
        // through reactive programing like rxjs but in the isntruction did not show if its possible 
        const meshes = this.getMeshes()
        this.scene.remove(...meshes)
        this.scene.add(...meshes)
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
        this.camera.position.set(0, 0, 40);
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

        this.canvasRef?.addEventListener('mouseup', (e) => {
            e.preventDefault();
            const raycaster = new Raycaster();
            const pointer = new Vector2();
            const rect = this.renderer.domElement.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            pointer.y = - ((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

            raycaster.setFromCamera(pointer, this.camera);

            const intersects = raycaster.intersectObjects(this.scene.children, true);
            const mesh = intersects?.[0]?.object;
            if (mesh instanceof Mesh) ThreeSelectHandler.selectMesh(mesh);
        })
    }

    private addLightSources(): void {
        const ambientLight = new AmbientLight(0xffffff, 0.7);
        const directionalLight = new DirectionalLight(0xffffff, 2);
        directionalLight.position.set(100, 100, 100);
        this.scene.add(ambientLight, directionalLight);
    }
}