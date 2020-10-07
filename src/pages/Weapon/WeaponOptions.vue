<template>
  <div class="flex-h-between">
    <div class="p-h-1">
      <input id="is-obtained" v-model="computedObtained" type="checkbox" />
      <label for="is-obtained" class="p-v-1 p-h-2">持有</label>
    </div>

    <button class="p-h-3" @click="$emit('add-store')">添加</button>
  </div>

  <ul>
    <weapon-options-item
      v-for="(option, key) in weaponOptions"
      :key="key"
      v-model:from="option.from"
      v-model:to="option.to"
      :max="option.max"
      :option-id="key"
      :label="labels[key]"
      :is-obtained="isObtained"
    ></weapon-options-item>
  </ul>
</template>

<script>
import { computed } from 'vue';
import WeaponOptionsItem from './WeaponOptionsItem.vue';

export default {
  name: 'WeaponOptions',
  components: { WeaponOptionsItem },
  props: {
    isObtained: {
      type: Boolean,
      default: false,
    },

    weaponOptions: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['toggle-obtained', 'add-store'],
  setup(props, { emit }) {
    const computedObtained = computed({
      get: () => props.isObtained,
      set: (value) => {
        emit('toggle-obtained', value);
      },
    });

    const labels = {
      1: '上限解锁',
      2: '武器精炼',
      3: '追加插槽',
      5: '种别加成',
      6: '追加持有',
    };

    return {
      computedObtained,
      labels,
    };
  },
};
</script>
