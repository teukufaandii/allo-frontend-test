<template>
  <div
    class="rocket-image-container"
    :class="{ 'rounded-lg': rounded, 'rocket-image--has-src': hasValidSrc && !hasError }"
    :style="containerStyle"
  >
    <!-- Actual Remote Image with graceful loading and error capture -->
    <v-img
      v-if="hasValidSrc && !hasError"
      :src="src!"
      :alt="alt"
      :aspect-ratio="aspectRatio"
      :height="height"
      :cover="cover"
      class="rocket-image-element"
      @error="handleImageError"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height image-placeholder-shimmer">
          <v-progress-circular
            color="primary"
            indeterminate
            size="28"
            width="2"
          />
        </div>
      </template>
    </v-img>

    <!-- Defensive Fallback: Stylized Rocket SVG Placeholder -->
    <div
      v-else
      class="rocket-image-fallback d-flex flex-column align-center justify-center fill-height"
      :style="{ minHeight: fallbackMinHeight }"
    >
      <img
        :src="placeholderSvg"
        :alt="alt || 'Rocket placeholder'"
        class="placeholder-svg-graphic"
        loading="lazy"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import placeholderSvg from '@/assets/placeholders/rocket-placeholder.svg'

interface Props {
  src?: string | null
  alt?: string
  aspectRatio?: string | number
  height?: string | number
  cover?: boolean
  rounded?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  src: null,
  alt: 'Rocket configuration image',
  aspectRatio: '16/9',
  height: undefined,
  cover: true,
  rounded: true,
})

const hasError = ref(false)

const hasValidSrc = computed(() => {
  return typeof props.src === 'string' && props.src.trim().length > 0
})

const fallbackMinHeight = computed(() => {
  if (props.height) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return '200px'
})

const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0f172a',
  }
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return styles
})

function handleImageError() {
  hasError.value = true
}

// Reset error state when src changes
watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)
</script>

<style scoped>
.rocket-image-container {
  width: 100%;
  display: block;
  background: linear-gradient(135deg, #0b0f19 0%, #111827 50%, #1f2937 100%);
}

.rocket-image-element {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.rocket-image-container:hover .rocket-image-element {
  transform: scale(1.03);
}

.image-placeholder-shimmer {
  background: rgba(15, 23, 42, 0.6);
}

.rocket-image-fallback {
  width: 100%;
  background-color: #0b0f19;
  position: relative;
  overflow: hidden;
}

.placeholder-svg-graphic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
