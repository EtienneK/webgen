import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

import type { Config } from '../lib/config.js'
import Layout from '../components/layouts/PageLayout.js'

function createApp (config: Config) {
  return new Hono()

    .use('/static/css/pico.min.css', serveStatic({ path: './node_modules/@picocss/pico/css/pico.min.css' }))
    .use('/static/js/htmx.min.js', serveStatic({ path: './node_modules/htmx.org/dist/htmx.min.js' }))

    .get('/', (c) => {
      return c.html(
        <Layout title='Starter template'>
          <main className='container'>
            <h1>Hello world!</h1>
            <p>This is a web application starter template.</p>
          </main>
        </Layout>
      )
    })

    .get('/search', (c) => {
      const query = c.req.query('q')
      return c.json({ query, results: ['result1', 'result2'] })
    })
}

export default createApp
