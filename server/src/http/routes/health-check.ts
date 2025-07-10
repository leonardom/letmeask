import type { FastifyPluginCallback } from 'fastify'

export const healthCheck: FastifyPluginCallback = (app) => {
  app.get('/health-check', () => {
    return {
      status: 'ok',
    }
  })
}
