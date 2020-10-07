<template>
  <div class="dropdown">
    <input
      id="picked-series"
      v-model="isOpen"
      type="checkbox"
      class="dropdown-ctrl col-0"
    />

    <label for="picked-series" class="relative-outer weapon-series-image">
      <img
        :src="`/image/weapon-series/${seriesId}.png`"
        alt=""
        class="absolute-inner"
        draggable="false"
      />
    </label>

    <label for="picked-series" class="dropdown-close"></label>

    <ul class="dropdown-menu">
      <li v-for="id in series" :key="id" class="m-n-1">
        <input
          :id="`weapon-series-${id}`"
          v-model="computedValue"
          :value="id"
          type="radio"
          name="weapon-series"
          class="radio-select"
          @click="isOpen = false"
        />

        <label
          :for="`weapon-series-${id}`"
          class="radio-label full-width p-h-1"
        >
          <div class="relative-outer weapon-series-image">
            <img
              :src="`/image/weapon-series/${id}.png`"
              alt=""
              class="absolute-inner"
              draggable="false"
            />
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'WeaponSeries',
  props: {
    seriesId: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update-series'],
  setup(props, { emit }) {
    const series = [1, 2, 5, 3, 4, 6];
    const isOpen = ref(false);

    const computedValue = computed({
      get: () => props.seriesId,
      set: (value) => {
        emit('update-series', value);
      },
    });

    return {
      series,
      computedValue,
      isOpen,
    };
  },
};
</script>
