<template>
  <div class="button-height p-h-1">
    <button class="full-width" @click="$emit('save-local')">保存</button>
  </div>

  <ul class="fill-rest overflow-auto p-h-1">
    <li
      v-for="item in computedList"
      :key="item.weaponId"
      class="flex-v-center flex-h-between"
    >
      <input
        :id="`craft-weapon-${item.weaponId}`"
        v-model="computedValue"
        :value="item.weaponId"
        type="radio"
        name="craft-weapon"
        class="radio-select"
        @change="$emit('load-state', item)"
      />

      <label
        :for="`craft-weapon-${item.weaponId}`"
        class="radio-label image-outer square-image icon-l"
      >
        <img
          :src="`/image/weapon/${item.skinId}.png`"
          alt=""
          class="image-inner"
          draggable="false"
        />
      </label>

      <button class="p-h-3" @click="removeItem(item.weaponId)">删除</button>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'CraftList',
  props: {
    seriesStore: {
      type: Object,
      default: () => {},
    },

    weaponId: {
      type: [Number, String],
      default: '',
    },
  },
  emits: ['save-local', 'load-state', 'clear-state'],
  setup(props, { emit }) {
    const computedList = computed(() => {
      return Object.values(props.seriesStore)
        .map((item) => item.weaponInfo)
        .sort((a, b) => {
          return a.elementId - b.elementId || a.typeId - b.typeId;
        });
    });

    const computedValue = computed({
      get: () => props.weaponId,
      set: () => null,
    });

    const removeItem = (id) => {
      Reflect.deleteProperty(props.seriesStore, id);
      if (props.weaponId == id) {
        emit('clear-state');
      }
    };

    return {
      computedList,
      computedValue,

      removeItem,
    };
  },
};
</script>

<style scoped>
.button-height {
  height: 40px;
}

.fill-rest {
  height: calc(100% - 40px);
}
</style>
