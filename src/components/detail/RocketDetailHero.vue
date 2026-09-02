<template>
  <div class="detail-hero-wrapper">
    <!-- Back to Catalog Navigation Button -->
    <div class="mb-4">
      <v-btn
        to="/"
        variant="tonal"
        color="primary"
        prepend-icon="mdi-arrow-left"
        class="text-none font-weight-bold back-btn px-4"
      >
        Back to Fleet Catalog
      </v-btn>
    </div>

    <!-- Main Hero Card -->
    <v-card
      class="detail-hero-card overflow-hidden"
      variant="outlined"
      elevation="4"
    >
      <!-- Hero Photograph Display -->
      <div class="hero-image-container position-relative">
        <RocketImage
          :src="rocket.imageUrl"
          :alt="rocket.name"
          :aspect-ratio="21 / 9"
          height="340"
          :rounded="false"
        />

        <!-- Gradient Overlay for Contrast -->
        <div class="hero-gradient-overlay" />

        <!-- Floating Origin Badge Top Right -->
        <div class="position-absolute top-0 right-0 pa-4 origin-badge-wrap">
          <v-chip
            v-if="rocket.isLocal"
            size="large"
            color="accent"
            variant="flat"
            class="font-weight-bold shadow-md"
            prepend-icon="mdi-tune-vertical"
          >
            Custom User Configuration
          </v-chip>
          <v-chip
            v-else
            size="large"
            color="primary"
            variant="flat"
            class="font-weight-bold text-black shadow-md"
            prepend-icon="mdi-rocket-launch"
          >
            Official SpaceX Fleet
          </v-chip>
        </div>
      </div>

      <!-- Vehicle Overview Information -->
      <v-card-text class="pa-6 pa-md-8">
        <div class="d-flex flex-wrap align-center gap-2 mb-2">
          <v-chip
            size="small"
            variant="outlined"
            color="primary"
            class="font-weight-medium"
          >
            ID: {{ rocket.id }}
          </v-chip>
          <v-chip
            size="small"
            variant="outlined"
            color="secondary"
            class="font-weight-medium"
          >
            {{ rocket.country || 'Global Origin' }}
          </v-chip>
        </div>

        <h1 class="text-h4 text-md-h3 font-weight-black text-white mb-4">
          {{ rocket.name }}
        </h1>

        <div class="description-section">
          <h2 class="text-subtitle-1 font-weight-bold text-primary mb-2 text-uppercase tracking-wider">
            Vehicle Overview
          </h2>
          <p class="text-body-1 text-grey-lighten-2 leading-relaxed">
            {{ formattedDescriptionText }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Rocket } from '@/models/Rocket'
import RocketImage from '@/components/common/RocketImage.vue'
import { formatDescription } from '@/mappers/Formatters'

interface Props {
  rocket: Rocket
}

const props = defineProps<Props>()

const formattedDescriptionText = computed(() => formatDescription(props.rocket.description))
</script>

<style scoped>
.detail-hero-wrapper {
  width: 100%;
}

.detail-hero-card {
  background: rgba(17, 24, 39, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 20px !important;
  backdrop-filter: blur(12px);
}

.hero-image-container {
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.hero-gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: linear-gradient(to top, rgba(17, 24, 39, 0.95), transparent);
  pointer-events: none;
}

.origin-badge-wrap {
  z-index: 2;
}

.leading-relaxed {
  line-height: 1.75;
}

.tracking-wider {
  letter-spacing: 1.5px;
}

.back-btn {
  border: 1px solid rgba(56, 189, 248, 0.3);
  transition: transform 0.2s ease;
}

.back-btn:hover {
  transform: translateX(-3px);
}
</style>
