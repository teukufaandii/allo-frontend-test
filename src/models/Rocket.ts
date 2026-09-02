/**
 * Domain entity model for Rocket configurations.
 */

export interface Rocket {
  id: string | number
  name: string
  description: string
  imageUrl: string | null
  launchCost: number | null
  country: string | null
  maidenFlight: string | null
  isLocal: boolean
}

export interface CreateRocketInput {
  name: string
  description?: string | null
  launchCost?: number | null
  country?: string | null
  maidenFlight?: string | null
  imageUrl?: string | null
}
