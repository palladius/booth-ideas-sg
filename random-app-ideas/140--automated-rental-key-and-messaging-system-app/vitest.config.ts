/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'happy-dom',
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
});
