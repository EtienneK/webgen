import { html } from 'hono/html'
import { Style } from 'hono/css'

interface PageProps {
  title: string
  lang?: string
  children?: any
}

const Layout = (props: PageProps) => html`
<!doctype html>
<html lang="${props.lang ?? 'en'}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">

    <title>${props.title}</title>

    <script src="/static/js/htmx.min.js"></script>
    <link rel="stylesheet" href="/static/css/pico.min.css">
    ${<Style />}
  </head>
  <body>
    ${props.children}
  </body>
</html>
`

export default Layout
