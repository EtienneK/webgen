import { testClient } from 'hono/testing'
import { describe, it, expect } from 'vitest' // Or your preferred test runner

import createApp from './index.js'
import config from '../lib/config.js'

const app = createApp({
  ...config,
  ...{ /* override */}
})

describe('Root endpoint', () => {
  const client = testClient(app)

  it('should display a welcome message', async () => {
    const res = await client.index.$get()
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('Hello world!')
  })
})

describe('Search endpoint', () => {
  const client = testClient(app)

  it('should return search results', async () => {
    const res = await client.search.$get({
      query: { q: 'hono' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      query: 'hono',
      results: ['result1', 'result2'],
    })
  })
})
