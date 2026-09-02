<template>
  <v-card
    class="rocket-card h-100 d-flex flex-column"
    variant="outlined"
    elevation="2"
    :to="`/rocket/${rocket.id}`"
    hover
  >
    <!-- Card Media with Origin Badge Overlay -->
    <div class="card-media-wrapper position-relative">
      <RocketImage
        :src="rocket.imageUrl"
        :alt="rocket.name"
        :aspect-ratio="16 / 9"
        height="210"
        :rounded="false"
      />

      <!-- Origin Badge Chip Overlay -->
      <div class="badge-overlay position-absolute top-0 right-0 pa-3">
        <v-chip
          v-if="rocket.isLocal"
          size="small"
          color="accent"
          variant="flat"
          class="font-weight-bold shadow-sm"
          prepend-icon="mdi-tune-vertical"
        >
          Custom Config
        </v-chip>
        <v-chip
          v-else
          size="small"
          color="primary"
          variant="flat"
          class="font-weight-bold shadow-sm text-black"
          prepend-icon="mdi-rocket-launch"
        >
          SpaceX Official
        </v-chip>
      </div>
    </div>

    <!-- Card Content -->
    <v-card-text class="pa-4 flex-grow-1 d-flex flex-column">
      <!-- Title -->
      <h3 class="text-h6 font-weight-bold text-white mb-1 line-clamp-1">
        {{ rocket.name }}
      </h3>

      <!-- Country Tag & Maiden Flight Line -->
      <div class="d-flex align-center text-caption text-grey-lighten-1 mb-3">
        <v-icon
          icon="mdi-earth"
          size="14"
          class="mr-1 text-primary"
        />
        <span>{{ formattedCountry }}</span>
        <span class="mx-2 text-grey-darken-1">•</span>
        <v-icon
          icon="mdi-calendar-blank-outline"
          size="14"
          class="mr-1 text-secondary"
        />
        <span>{{ formattedFlightDate }}</span>
      </div>

      <!-- Description paragraph -->
      <p class="text-body-2 text-grey-lighten-2 line-clamp-3 mb-4 flex-grow-1">
        {{ formattedDesc }}
      </p>

      <!-- Key Specs Summary Strip -->
      <v-sheet
        color="surface-variant"
        class="pa-2 px-3 rounded-lg d-flex justify-space-between align-center text-caption"
        elevation="0"
      >
        <div class="text-grey-lighten-1">
          Launch Cost:
        </div>
        <div class="font-weight-bold text-primary">
          {{ formattedCost }}
        </div>
      </v-sheet>
    </v-card-text>

    <!-- Card Action Button -->
    <v-card-actions class="px-4 pb-4 pt-0">
      <v-btn
        color="primary"
        variant="tonal"
        block
        append-icon="mdi-arrow-right"
        class="text-none font-weight-bold"
      >
        Inspect Specifications
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Rocket } from '@/models/Rocket'
import RocketImage from '@/components/common/RocketImage.vue'
import {
  formatCurrency,
  formatDate,
  formatCountry,
  formatDescription,
} from '@/mappers/Formatters'

interface Props {
  rocket: Rocket
}

const props = defineProps<Props>()

const formattedCost = computed(() => formatCurrency(props.rocket.launchCost))
const formattedFlightDate = computed(() => formatDate(props.rocket.maidenFlight, 'Date Unknown'))
const formattedCountry = computed(() => formatCountry(props.rocket.country, 'Global'))
const formattedDesc = computed(() => formatDescription(props.rocket.description))
</script>

<style scoped>
.rocket-card {
  background: rgba(17, 24, 39, 0.75) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 14px !important;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
  text-decoration: none;
}

.rocket-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4) !important;
  box-shadow: 0 12px 28px -8px rgba(56, 189, 248, 0.15) !important;
}

.card-media-wrapper {
  overflow: hidden;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.badge-overlay {
  z-index: 2;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}
</style>
