import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
    packagerConfig: {
        icon: 'src/assets/img/icon',
        executableName: 'starfall',
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({ iconUrl: 'https://lightfor.ge/starfall.ico' }),
        new MakerZIP({}, ['darwin', 'linux']),
        new MakerRpm({}),
        new MakerDeb({ options: { icon: 'src/assets/img/icon.png' } }),
    ],
    plugins: [
        new WebpackPlugin({
            devContentSecurityPolicy:
                "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;",
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload.ts',
                        },
                    },
                    {
                        html: './src/splash.html',
                        name: 'splash_window',
                        js: './src/splash.ts',
                    },
                ],
            },
        }),
    ],
};

export default config;
