<template>
  <div class="rocket-list-grid py-4">
    <v-row class="ma-n2">
      <v-col
        v-for="rocket in rockets"
        :key="rocket.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-2"
      >
        <RocketCard :rocket="rocket" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import type { Rocket } from '@/models/Rocket'
import RocketCard from './RocketCard.vue'

interface Props {
  rockets: Rocket[]
}

defineProps<Props>()
</script>

<style scoped>
.rocket-list-grid {
  width: 100%;
}
</style>
