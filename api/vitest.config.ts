import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./**/*.{e2e,test}.ts'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },
})
