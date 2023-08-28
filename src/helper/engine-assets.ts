import { AssetLoader } from "artistic-engine/loader";

export class EngineAssets {
    private assetLoader: AssetLoader;

    private fonts = [
        // { name: "P", source: "url(https://fonts.gstatic.com/s/rubikiso/v2/x3dickHUfr-S4VAI4sAxefoDjy8.woff2)" },
    ];
    
    private images = [
        // { name: "hololive_logo", source: hololive_logo },
    ];

    constructor(assetLoader: AssetLoader) {
        this.assetLoader = assetLoader;

        this.registerFonts();
        this.registerImages();

        this.assetLoader.onLoad = () => {
            this.onLoad();
        }
        this.assetLoader.load();
    }

    private registerFonts() {
        for (const { name, source } of this.fonts) {
            this.assetLoader.addFont(name, source);    
        }
    }

    public registerImages() {
        for (const { name, source } of this.images) {
            this.assetLoader.addImages(name, source);    
        }
    }

    public onLoad() {
        // TODO: whatever that is to be done after assets are loaded
    }
}
