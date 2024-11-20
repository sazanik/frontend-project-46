import { defineConfig } from 'vite';

export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'html', 'lcov', 'json'],
      },
    },
  },
);
