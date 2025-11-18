import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    getAuthenticatedUserId(): Promise<string>
  }
}
