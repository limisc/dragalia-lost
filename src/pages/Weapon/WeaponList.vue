<template>
  <ul class="p-h-1">
    <li v-for="item in filteredWeapons" :key="item._Id">
      <input
        :id="`weapon-${item._Id}`"
        v-model="computedValue"
        :value="item._Id"
        type="radio"
        name="weapon"
        class="radio-select"
        @change="$emit('update-state', item)"
      />

      <label
        :for="`weapon-${item._Id}`"
        class="radio-label image-outer square-image icon-l"
      >
        <img
          :src="`/image/weapon/${item._WeaponSkinId}.png`"
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
import weapons from '/json/weapon.json';

export default {
  name: 'WeaponList',
  props: {
    seriesId: {
      type: Number,
      required: true,
    },

    typeId: {
      type: Number,
      required: true,
    },

    weaponId: {
      type: [Number, String],
      default: '',
    },
  },
  emits: ['update-state'],
  setup(props) {
    const filteredWeapons = computed(() => {
      return Object.values(weapons)
        .filter(({ _WeaponSeriesId, _WeaponType }) => {
          return (
            _WeaponSeriesId === props.seriesId && _WeaponType === props.typeId
          );
        })
        .sort((a, b) => {
          return a._ElementalType - b._ElementalType || b._Rarity - a._Rarity;
        });
    });

    const computedValue = computed({
      get: () => props.weaponId,
      set: () => null,
    });

    return {
      filteredWeapons,
      computedValue,
    };
  },
};
</script>
