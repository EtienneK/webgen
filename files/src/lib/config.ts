import nodeConfig from 'config'
import { z } from 'zod'

import type { DeepReadonly } from '../types/types.js'

const ConfigSchema = z.object({
  server: z.object({
    port: z.number().int().positive(),
    listen: z.string(),
  }),
})

export type Config = DeepReadonly<z.infer<typeof ConfigSchema>>

const config = ConfigSchema.parse(nodeConfig.util.toObject()) as Config

export default config
