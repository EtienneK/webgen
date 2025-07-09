import { Hono } from 'hono'

import type { Config } from '../lib/config.js'

function createApp(config: Config) {
  const app = new Hono()

  app.get('/search', (c) => {
    const query = c.req.query('q')
    return c.json({ query: query, results: ['result1', 'result2'] })
  })

  return app
}

export default createApp
