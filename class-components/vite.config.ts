import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    clearMocks: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov'],
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        'src/setupTests.ts',
        '**/*.d.ts',
      ],
      clean: true,
      reportsDirectory: 'coverage',
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
});
