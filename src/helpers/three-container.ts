import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, MeshStandardMaterial, AmbientLight, DirectionalLight, Material } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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
        setTimeout(() => { this.addBox() }, 1000)
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

    private addBox(): void {
        const box = new BoxGeometry();
        const material = new MeshStandardMaterial({ color: 0xff00f2 });
        const mesh = new Mesh(box, material);
        this.scene.add(mesh);
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
        const ambientLight = new AmbientLight(0xffffff, 1)
        const directionalLight = new DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 20)
        this.scene.add(ambientLight, directionalLight)
    }
}