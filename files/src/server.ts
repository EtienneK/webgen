import { serve } from '@hono/node-server'

import createApp from './app/index.js'
import config from './lib/config.js'

const app = createApp(config)

const server = serve({
  fetch: app.fetch,
  port: config.server.port,
  hostname: config.server.listen
}, (info) => {
  console.log()
  console.log(`✅ Serving on ${info.family} ${info.address}:${info.port}`)
  console.log()
})

async function cleanup () {
  server.close()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
