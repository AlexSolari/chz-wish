import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        experimental: {
            async: true
        }
    },
    kit: {
        csrf: {
            trustedOrigins: ['*'],
            checkOrigin: false
        },
        experimental: {
            remoteFunctions: true
        },
        adapter: adapter({
            out: 'public'
        })
    },
    preprocess: vitePreprocess()
};

export default config;
