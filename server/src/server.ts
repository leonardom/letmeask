import app from './app.ts'
import { env } from './env.ts'

async function start() {
  try {
    await app.listen({ port: env.PORT })
    // biome-ignore lint/suspicious/noConsole: app start console
    console.log(`🚀 HTTP Server running on port: ${env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start();
