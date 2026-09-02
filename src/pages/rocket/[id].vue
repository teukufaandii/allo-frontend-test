<template>
  <div class="rocket-detail-page-container">
    <!-- Breadcrumb Header -->
    <nav class="breadcrumb-nav mb-4 d-flex align-center text-caption text-grey-lighten-1">
      <router-link
        to="/"
        class="text-decoration-none text-grey-lighten-1 hover-primary"
      >
        <v-icon
          icon="mdi-home-outline"
          size="14"
          class="mr-1"
        />
        Fleet Catalog
      </router-link>
      <span class="mx-2 text-grey-darken-1">/</span>
      <span class="text-white font-weight-medium">
        {{ rocket ? rocket.name : 'Rocket Details' }}
      </span>
    </nav>

    <!-- State 1: Loading State -->
    <LoadingState
      v-if="loading"
      message="Retrieving vehicle telemetry specifications..."
      :count="1"
    />

    <!-- State 2: Rocket Not Found State -->
    <div
      v-else-if="notFound"
      class="not-found-wrapper py-12 text-center"
    >
      <v-card
        class="not-found-card pa-8 mx-auto text-center"
        max-width="540"
        variant="outlined"
      >
        <div class="icon-circle mb-4 mx-auto">
          <v-icon
            icon="mdi-rocket-outline"
            color="warning"
            size="48"
          />
        </div>

        <h2 class="text-h5 font-weight-bold text-white mb-2">
          Launch Vehicle Not Found
        </h2>

        <p class="text-body-1 text-grey-lighten-2 mb-6">
          The requested rocket vehicle configuration (ID: <code class="text-primary">{{ rocketId }}</code>) was not found in active telemetry records.
        </p>

        <v-btn
          to="/"
          color="primary"
          size="large"
          variant="flat"
          prepend-icon="mdi-arrow-left"
          class="text-none font-weight-bold px-6"
        >
          Return to Fleet Catalog
        </v-btn>
      </v-card>
    </div>

    <!-- State 3: Network Error State with Retry -->
    <ErrorRetryState
      v-else-if="error"
      :message="error"
      :loading="loading"
      @retry="() => loadRocket()"
    />

    <!-- State 4: Rocket Details View -->
    <div
      v-else-if="rocket"
      class="rocket-detail-content"
    >
      <!-- Hero Section -->
      <RocketDetailHero
        :rocket="rocket"
        class="mb-6"
      />

      <!-- Technical Specifications Grid -->
      <RocketDetailSpecs
        :rocket="rocket"
        class="mb-6"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRocketDetail } from '@/composables/useRocketDetail'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorRetryState from '@/components/common/ErrorRetryState.vue'
import RocketDetailHero from '@/components/detail/RocketDetailHero.vue'
import RocketDetailSpecs from '@/components/detail/RocketDetailSpecs.vue'

const route = useRoute()
const rocketId = computed(() => {
  const params = route.params as Record<string, string | string[]>
  return Array.isArray(params.id) ? params.id[0] : (params.id || '')
})

const {
  rocket,
  loading,
  error,
  notFound,
  loadRocket,
} = useRocketDetail(rocketId)
</script>

<style scoped>
.rocket-detail-page-container {
  width: 100%;
}

.hover-primary:hover {
  color: #38bdf8 !important;
}

.not-found-card {
  background: rgba(17, 24, 39, 0.85) !important;
  border: 1px solid rgba(245, 158, 11, 0.3) !important;
  border-radius: 18px !important;
  backdrop-filter: blur(12px);
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
