<template>
  <div v-show="computedCoin" class="flex-v-center">
    <div class="image-outer square-image icon-m m-1">
      <img
        :src="`/image/material/coin.png`"
        alt=""
        class="image-inner"
        draggable="false"
      />
    </div>
    <div class="p-h-2">{{ computedCoin.toLocaleString() }}</div>
  </div>

  <div class="fill-rest overflow-auto p-h-1">
    <ul class="row">
      <li v-for="(quantity, key) in computedRest" :key="key" class="p-1">
        <div class="image-outer square-image icon-m m-auto">
          <img
            :src="`/image/material/${key}.png`"
            alt=""
            class="image-inner"
            draggable="false"
          />
        </div>

        <p class="p-t-1 text-center">{{ quantity.toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import weapons from '/json/weapon.json';
import buildups from '/json/buildup.json';

const unifyObject = (...objs) => {
  return objs.reduce((unified, cur) => {
    const entries = Object.entries(cur);

    for (let i = 0; i < entries.length; i += 1) {
      const [key, value] = entries[i];

      if (!unified[key]) {
        unified[key] = 0;
      }

      unified[key] += value;
    }

    return unified;
  }, {});
};

const sumNeeds = (item, id, limit) => {
  const needs = {};
  for (let i = 1; i <= limit; i += 1) {
    const key = item[`${id}Id${i}`];
    if (!key) break;

    if (!needs[key]) {
      needs[key] = 0;
    }

    needs[key] = item[`${id}Quantity${i}`];
  }

  return needs;
};

const createNeeds = (weaponInfo) => {
  if (weaponInfo.isObtained) return {};

  const weaponId = weaponInfo.weaponId;
  const weapon = weapons[weaponId];
  const needs = sumNeeds(weapon, '_CreateEntity', 5);
  needs.coin = weapon._CreateCoin;

  return needs;
};

const buildupNeeds = (item) => {
  let needs = {};

  const weaponInfo = item.weaponInfo;
  const weaponOptions = item.weaponOptions;

  const group = buildups[weaponInfo.groupId];
  const options = Object.entries(weaponOptions);

  for (let i = 0; i < options.length; i += 1) {
    const [optionId, option] = options[i];

    if (option.from !== option.to) {
      if (!needs.coin) {
        needs.coin = 0;
      }

      const optionItems = group[optionId].slice(option.from, option.to);
      for (let j = 0; j < optionItems.length; j += 1) {
        const optionItem = optionItems[j];
        needs.coin += optionItem?._BuildupCoin || 0;
        needs = unifyObject(
          needs,
          sumNeeds(optionItem, '_BuildupMaterial', 10)
        );
      }
    }
  }

  return needs;
};

export default {
  name: 'WeaponMaterialList',
  components: {},
  props: {
    seriesStore: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const totalNeeds = computed(() => {
      const values = Object.values(props.seriesStore);
      let needs = {};

      for (let i = 0; i < values.length; i += 1) {
        const item = values[i];
        needs = unifyObject(
          needs,
          createNeeds(item.weaponInfo),
          buildupNeeds(item)
        );
      }

      return needs;
    });

    const computedCoin = computed(() => totalNeeds.value.coin || 0);
    const computedRest = computed(() => {
      // eslint-disable-next-line no-unused-vars
      const { coin, ...rest } = totalNeeds.value;
      return rest;
    });

    return {
      computedCoin,
      computedRest,
    };
  },
};
</script>

<style scoped>
.fill-rest {
  height: calc(100% - 80px);
}
</style>
