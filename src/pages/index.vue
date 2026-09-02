<template>
  <div class="catalog-page-container">
    <!-- Hero Header Banner -->
    <section class="hero-section mb-6 py-8 px-4 px-md-8 rounded-xl">
      <v-row
        align="center"
        justify="space-between"
      >
        <v-col
          cols="12"
          md="7"
        >
          <div class="d-flex align-center mb-2">
            <v-chip
              size="small"
              color="primary"
              variant="outlined"
              class="mr-2 font-weight-bold"
              prepend-icon="mdi-orbit"
            >
              Orbital Fleet
            </v-chip>
            <span class="text-caption text-grey-lighten-1">Launch Library 2.2.0 Telemetry</span>
          </div>

          <h1 class="text-h4 text-sm-h3 font-weight-black text-white mb-3">
            SpaceX Rocket Catalog
          </h1>

          <p class="text-body-1 text-grey-lighten-2 max-w-prose mb-0">
            Explore orbital launch vehicles, heavy-lift rockets, and custom mission configurations designed for low Earth orbit and deep space exploration.
          </p>
        </v-col>

        <v-col
          cols="12"
          md="5"
          class="text-md-right mt-4 mt-md-0 d-flex flex-column align-start align-md-end gap-3"
        >
          <!-- Quick Stats Pill -->
          <v-sheet
            color="surface"
            class="pa-3 px-4 rounded-lg d-inline-flex align-center border-subtle"
            elevation="0"
          >
            <v-icon
              icon="mdi-rocket"
              color="primary"
              size="28"
              class="mr-3"
            />
            <div class="text-left">
              <div class="text-h6 font-weight-bold text-white line-height-1">
                {{ totalCount }}
              </div>
              <div class="text-caption text-grey-lighten-1">
                Total Configurations
              </div>
            </div>
          </v-sheet>

          <!-- Primary Action: Add Custom Rocket Button -->
          <v-btn
            color="primary"
            variant="flat"
            size="large"
            prepend-icon="mdi-plus"
            class="text-none font-weight-bold px-6 text-black rounded-lg shadow-md"
            @click="isAddDialogOpen = true"
          >
            Add Custom Rocket
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <!-- Async State 1: Loading State -->
    <LoadingState
      v-if="loading && rockets.length === 0"
      message="Retrieving SpaceX launcher specifications..."
      :count="8"
    />

    <!-- Async State 2: Error State with Retry -->
    <ErrorRetryState
      v-else-if="error && rockets.length === 0"
      :message="error"
      :loading="loading"
      @retry="handleRetry"
    />

    <!-- Async State 3: Success State (Filter Bar + Rocket Grid / Empty State) -->
    <div
      v-else
      class="catalog-content"
    >
      <!-- Interactive Filter and Real-Time Search Bar -->
      <RocketFilterBar
        v-model:search-query="searchQuery"
        v-model:selected-origin="selectedOrigin"
        :total-count="totalCount"
        :spacex-count="spacexCount"
        :custom-count="customCount"
        :has-active-filters="hasActiveFilters"
        @reset="resetFilters"
      />

      <!-- Contextual Empty State when 0 rockets match search/filters -->
      <EmptyState
        v-if="filteredRockets.length === 0"
        :show-reset="hasActiveFilters"
        :message="searchQuery.trim() !== ''
          ? `No vehicles found matching '${searchQuery}'. Try adjusting your keywords or clearing the filter.`
          : 'No launch vehicles found for the selected origin category.'"
        @reset="resetFilters"
      />

      <!-- Responsive Rocket Grid -->
      <RocketList
        v-else
        :rockets="filteredRockets"
      />
    </div>

    <!-- Modal Form: Add Custom Rocket Dialog -->
    <AddRocketDialog
      v-model="isAddDialogOpen"
      @created="handleRocketCreated"
    />

    <!-- Success Snackbar Notification -->
    <v-snackbar
      v-model="snackbarShow"
      color="surface"
      location="bottom right"
      timeout="4000"
      class="border-subtle"
    >
      <div class="d-flex align-center">
        <v-icon
          icon="mdi-check-circle"
          color="success"
          size="22"
          class="mr-2"
        />
        <div class="text-body-2 text-white">
          Rocket <strong>{{ createdRocketName }}</strong> created successfully!
        </div>
      </div>
      <template #actions>
        <v-btn
          color="primary"
          variant="text"
          size="small"
          @click="snackbarShow = false"
        >
          Dismiss
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Rocket } from '@/models/Rocket'
import { useRocketCatalog } from '@/composables/useRocketCatalog'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorRetryState from '@/components/common/ErrorRetryState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import RocketFilterBar from '@/components/catalog/RocketFilterBar.vue'
import RocketList from '@/components/catalog/RocketList.vue'
import AddRocketDialog from '@/components/catalog/AddRocketDialog.vue'

const {
  rockets,
  filteredRockets,
  searchQuery,
  selectedOrigin,
  totalCount,
  spacexCount,
  customCount,
  hasActiveFilters,
  loading,
  error,
  loadRockets,
  resetFilters,
} = useRocketCatalog()

const isAddDialogOpen = ref(false)
const snackbarShow = ref(false)
const createdRocketName = ref('')

function handleRetry() {
  loadRockets(true)
}

function handleRocketCreated(rocket: Rocket) {
  createdRocketName.value = rocket.name
  snackbarShow.value = true
}

onMounted(() => {
  loadRockets()
})
</script>

<style scoped>
.catalog-page-container {
  width: 100%;
}

.hero-section {
  background: radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.12) 0%, rgba(17, 24, 39, 0.8) 90%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.max-w-prose {
  max-width: 650px;
  line-height: 1.6;
}

.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.gap-3 {
  gap: 12px;
}

.line-height-1 {
  line-height: 1;
}
</style>
