<template>
  <ul class="row">
    <li v-for="id in 9" :key="id" class="col col-mobile-2">
      <input
        :id="`weapon-type-${id}`"
        v-model="computedValue"
        :value="id"
        type="radio"
        name="weapon-type"
        class="radio-select"
      />

      <label
        :for="`weapon-type-${id}`"
        class="radio-label image-outer square-image"
      >
        <img
          :src="`/image/weapon-type/${id}.png`"
          alt=""
          class="image-inner"
          draggable="false"
        />
      </label>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'WeaponTypes',
  props: {
    typeId: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update-type'],
  setup(props, { emit }) {
    const computedValue = computed({
      get: () => props.typeId,
      set: (value) => {
        emit('update-type', value);
      },
    });

    return {
      computedValue,
    };
  },
};
</script>
