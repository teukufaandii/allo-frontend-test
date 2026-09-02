<template>
  <v-card
    class="filter-bar-card mb-6 pa-4 pa-sm-5"
    variant="outlined"
    elevation="1"
  >
    <v-row
      align="center"
      justify="space-between"
    >
      <!-- Search Input Column -->
      <v-col
        cols="12"
        md="6"
        lg="5"
        class="py-1"
      >
        <v-text-field
          v-model="modelQuery"
          placeholder="Search by vehicle name or description..."
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          variant="solo-filled"
          density="comfortable"
          bg-color="surface-variant"
          class="search-text-field rounded-lg"
          @click:clear="modelQuery = ''"
        >
          <template #clear>
            <v-icon
              icon="mdi-close-circle"
              size="18"
              class="cursor-pointer text-grey-lighten-1"
              @click="modelQuery = ''"
            />
          </template>
        </v-text-field>
      </v-col>

      <!-- Origin Filter Chips Column -->
      <v-col
        cols="12"
        md="6"
        lg="7"
        class="py-1 d-flex flex-wrap align-center justify-start justify-md-end gap-2"
      >
        <div class="text-caption text-grey-lighten-1 font-weight-medium mr-2 d-none d-sm-inline">
          Filter Provenance:
        </div>

        <v-chip-group
          v-model="modelOrigin"
          mandatory
          selected-class="chip-selected"
          class="origin-chip-group"
        >
          <!-- Option 1: All -->
          <v-chip
            value="all"
            filter
            variant="tonal"
            size="default"
            class="font-weight-medium origin-chip"
          >
            <v-icon
              icon="mdi-view-grid-outline"
              size="16"
              class="mr-1"
            />
            All Vehicles ({{ totalCount }})
          </v-chip>

          <!-- Option 2: SpaceX Official -->
          <v-chip
            value="spacex"
            filter
            variant="tonal"
            size="default"
            class="font-weight-medium origin-chip"
          >
            <v-icon
              icon="mdi-rocket-launch"
              size="16"
              class="mr-1"
            />
            SpaceX Fleet ({{ spacexCount }})
          </v-chip>

          <!-- Option 3: Custom / User-Added -->
          <v-chip
            value="custom"
            filter
            variant="tonal"
            size="default"
            class="font-weight-medium origin-chip"
          >
            <v-icon
              icon="mdi-tune-vertical"
              size="16"
              class="mr-1"
            />
            Custom Config ({{ customCount }})
          </v-chip>
        </v-chip-group>

        <!-- Quick Clear Button if active filters -->
        <v-btn
          v-if="hasActiveFilters"
          variant="text"
          color="primary"
          size="small"
          prepend-icon="mdi-close"
          class="text-none ml-1 font-weight-bold"
          @click="$emit('reset')"
        >
          Reset
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { OriginFilter } from '@/models/CatalogFilter'

interface Props {
  searchQuery: string
  selectedOrigin: OriginFilter
  totalCount: number
  spacexCount: number
  customCount: number
  hasActiveFilters: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void
  (e: 'update:selectedOrigin', val: OriginFilter): void
  (e: 'reset'): void
}>()

const modelQuery = computed({
  get: () => props.searchQuery,
  set: (val: string | null) => emit('update:searchQuery', val ?? ''),
})

const modelOrigin = computed({
  get: () => props.selectedOrigin,
  set: (val: OriginFilter) => {
    if (val) emit('update:selectedOrigin', val)
  },
})
</script>

<style scoped>
.filter-bar-card {
  background: rgba(17, 24, 39, 0.75) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(12px);
}

.search-text-field :deep(.v-field) {
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.2s ease;
}

.search-text-field :deep(.v-field--focused) {
  border-color: #38bdf8 !important;
}

.origin-chip {
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  transition: all 0.2s ease;
}

.chip-selected {
  background: rgba(56, 189, 248, 0.18) !important;
  border-color: #38bdf8 !important;
  color: #38bdf8 !important;
  font-weight: 700 !important;
}

.gap-2 {
  gap: 8px;
}
</style>
