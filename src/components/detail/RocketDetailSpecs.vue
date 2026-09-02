<template>
  <div class="specs-grid-wrapper">
    <h2 class="text-h6 font-weight-bold text-white mb-4 d-flex align-center">
      <v-icon
        icon="mdi-gauge"
        color="primary"
        class="mr-2"
        size="24"
      />
      Technical & Operational Specifications
    </h2>

    <v-row>
      <!-- Metric 1: Cost Per Launch -->
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="spec-metric-card h-100 pa-5"
          variant="outlined"
        >
          <div class="d-flex align-center mb-3">
            <div class="metric-icon-box bg-primary-subtle text-primary mr-3">
              <v-icon
                icon="mdi-currency-usd"
                size="24"
              />
            </div>
            <div>
              <div class="text-caption text-grey-lighten-1 text-uppercase font-weight-bold tracking-wider">
                Cost Per Launch
              </div>
            </div>
          </div>

          <div
            class="text-h5 font-weight-black mb-1"
            :class="hasCost ? 'text-primary' : 'text-grey-lighten-1'"
          >
            {{ formattedCost }}
          </div>

          <div class="text-caption text-grey-darken-1">
            {{ hasCost ? 'Estimated commercial price' : 'Cost data unavailable for vehicle' }}
          </div>
        </v-card>
      </v-col>

      <!-- Metric 2: Maiden Flight -->
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="spec-metric-card h-100 pa-5"
          variant="outlined"
        >
          <div class="d-flex align-center mb-3">
            <div class="metric-icon-box bg-secondary-subtle text-secondary mr-3">
              <v-icon
                icon="mdi-calendar-star"
                size="24"
              />
            </div>
            <div>
              <div class="text-caption text-grey-lighten-1 text-uppercase font-weight-bold tracking-wider">
                Maiden Flight
              </div>
            </div>
          </div>

          <div
            class="text-h5 font-weight-black mb-1"
            :class="hasFlightDate ? 'text-white' : 'text-grey-lighten-1'"
          >
            {{ formattedFlightDate }}
          </div>

          <div class="text-caption text-grey-darken-1">
            {{ hasFlightDate ? 'Inaugural orbital launch' : 'Historical flight date unknown' }}
          </div>
        </v-card>
      </v-col>

      <!-- Metric 3: Manufacturer & Country -->
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="spec-metric-card h-100 pa-5"
          variant="outlined"
        >
          <div class="d-flex align-center mb-3">
            <div class="metric-icon-box bg-accent-subtle text-accent mr-3">
              <v-icon
                icon="mdi-earth"
                size="24"
              />
            </div>
            <div>
              <div class="text-caption text-grey-lighten-1 text-uppercase font-weight-bold tracking-wider">
                Country / Origin
              </div>
            </div>
          </div>

          <div class="text-h5 font-weight-black text-white mb-1">
            {{ formattedCountry }}
          </div>

          <div class="text-caption text-grey-darken-1">
            {{ rocket.isLocal ? 'User-Created Configuration' : 'Manufactured by SpaceX' }}
          </div>
        </v-card>
      </v-col>

      <!-- Metric 4: Fleet Classification -->
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="spec-metric-card h-100 pa-5"
          variant="outlined"
        >
          <div class="d-flex align-center mb-3">
            <div class="metric-icon-box bg-info-subtle text-info mr-3">
              <v-icon
                icon="mdi-shield-check-outline"
                size="24"
              />
            </div>
            <div>
              <div class="text-caption text-grey-lighten-1 text-uppercase font-weight-bold tracking-wider">
                Fleet Provenance
              </div>
            </div>
          </div>

          <div class="text-h5 font-weight-black text-white mb-1">
            {{ rocket.isLocal ? 'Custom Asset' : 'Official LL2' }}
          </div>

          <div class="text-caption text-grey-darken-1">
            {{ rocket.isLocal ? 'Session storage memory' : 'Synchronized via Launch Library' }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Rocket } from '@/models/Rocket'
import {
  formatCurrency,
  formatDate,
  formatCountry,
} from '@/mappers/Formatters'

interface Props {
  rocket: Rocket
}

const props = defineProps<Props>()

const hasCost = computed(() => {
  return props.rocket.launchCost !== null && props.rocket.launchCost !== undefined
})

const hasFlightDate = computed(() => {
  return typeof props.rocket.maidenFlight === 'string' && props.rocket.maidenFlight.trim() !== ''
})

const formattedCost = computed(() => formatCurrency(props.rocket.launchCost, 'Not available'))
const formattedFlightDate = computed(() => formatDate(props.rocket.maidenFlight, 'Unknown'))
const formattedCountry = computed(() => formatCountry(props.rocket.country, 'Unknown'))
</script>

<style scoped>
.specs-grid-wrapper {
  width: 100%;
}

.spec-metric-card {
  background: rgba(17, 24, 39, 0.75) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.spec-metric-card:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.3) !important;
}

.metric-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-primary-subtle {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
}

.bg-secondary-subtle {
  background: rgba(129, 140, 248, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.25);
}

.bg-accent-subtle {
  background: rgba(192, 132, 252, 0.12);
  border: 1px solid rgba(192, 132, 252, 0.25);
}

.bg-info-subtle {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
}

.tracking-wider {
  letter-spacing: 1px;
}
</style>
