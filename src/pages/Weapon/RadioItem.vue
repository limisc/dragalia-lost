<template>
  <input
    :id="`${name}-${value}`"
    v-model="computedValue"
    :value="value"
    :name="name"
    type="radio"
    class="radio-select"
  />

  <label :for="`${name}-${value}`" :class="['radio-label', $attrs.class]">
    <img
      :src="`/image/${computedPath}/${computedSrc}.png`"
      class="col-12"
      draggable="false"
    />
  </label>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RadioItem',
  props: {
    modelValue: {
      type: [Number, String],
      default: '',
    },

    value: {
      type: [Number, String],
      default: '',
    },

    name: {
      type: String,
      required: true,
    },

    // image path
    path: {
      type: String,
      default: '',
    },

    // image src id
    src: {
      type: [Number, String],
      default: '',
    },
  },
  emits: ['update:modelValue', 'pick'],
  setup(props, { emit }) {
    const computedPath = computed(() => props.path || props.name);
    const computedSrc = computed(() => props.src || props.value);
    const computedValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      },
    });

    return {
      computedPath,
      computedSrc,
      computedValue,
    };
  },
};
</script>
