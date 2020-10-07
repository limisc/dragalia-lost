<template>
  <li class="row flex-v-center weapon-options-item">
    <div class="p-1">
      <div class="image-outer square-image icon-m m-auto">
        <img
          :src="`/image/buildup/${optionId}.png`"
          alt=""
          class="image-inner"
          draggable="false"
        />
      </div>
      <p class="text-center">
        {{ label }}
      </p>
    </div>

    <div class="col">
      <div class="row">
        <div v-show="isObtained" class="col col-12">
          <div class="row">
            <span class="p-1">当前</span>

            <input
              v-model="computedFrom"
              :max="max"
              min="0"
              type="range"
              class="flex-1"
            />

            <span class="p-1">{{ from }}</span>
          </div>
        </div>

        <div class="col col-12">
          <div class="row">
            <span class="p-1">目标</span>

            <input
              v-model="computedTo"
              :max="max"
              min="0"
              type="range"
              class="flex-1"
            />

            <span class="p-1">{{ to }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'WeaponOptionsItem',
  props: {
    optionId: {
      type: String,
      default: '',
    },

    from: {
      type: Number,
      default: 0,
    },

    to: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 0,
    },

    label: {
      type: String,
      default: '',
    },

    isObtained: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:from', 'update:to'],
  setup(props, { emit }) {
    const computedFrom = computed({
      get: () => props.from,
      set: (value) => {
        const num = +value;
        emit('update:from', num);

        if (num > props.to) {
          emit('update:to', num);
        }
      },
    });

    const computedTo = computed({
      get: () => props.to,
      set: (value) => {
        const num = +value;
        emit('update:to', num);

        if (num < props.from) {
          emit('update:from', num);
        }
      },
    });

    return {
      computedFrom,
      computedTo,
    };
  },
};
</script>

<style scoped>
.weapon-options-item {
  min-height: 112px;
}
</style>
