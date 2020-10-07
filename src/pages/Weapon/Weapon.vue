<template>
  <div class="row full-height">
    <div class="col-12 col-tablet-6 col-laptop-4 col-laptop-l-3 p-h-1">
      <weapon-series
        :series-id="weaponInfo.seriesId"
        @update-series="updateSeries"
      >
      </weapon-series>

      <weapon-types
        :type-id="weaponInfo.typeId"
        @update-type="updateType"
      ></weapon-types>

      <div class="row">
        <weapon-list
          v-bind="weaponInfo"
          @update-state="updateState"
        ></weapon-list>

        <div v-show="weaponInfo.weaponId" class="col">
          <weapon-options
            :is-obtained="weaponInfo.isObtained"
            :weapon-options="weaponOptions"
            @toggle-obtained="toggleObtained"
            @add-store="addStore"
          ></weapon-options>
        </div>
      </div>
    </div>

    <div class="col-12 col-tablet-6 col-laptop-3 col-laptop-l-2 full-height">
      <craft-list
        :weapon-id="weaponInfo.weaponId"
        :series-store="store[weaponInfo.seriesId]"
        @load-state="loadState"
        @clear-state="clearState"
        @save-local="saveLocal"
      ></craft-list>
    </div>

    <div class="col col-mobile-12 full-height">
      <material-list :series-store="store[weaponInfo.seriesId]"></material-list>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import WeaponSeries from './WeaponSeries.vue';
import WeaponTypes from './WeaponTypes.vue';
import WeaponList from './WeaponList.vue';
import WeaponOptions from './WeaponOptions.vue';
import CraftList from './CraftList.vue';
import MaterialList from './MaterialList.vue';

import buildup from '/json/buildup.json';

export default {
  name: 'Weapon',
  components: {
    WeaponSeries,
    WeaponTypes,
    WeaponList,
    WeaponOptions,

    CraftList,
    MaterialList,
  },
  setup() {
    const LOCAL_KEY = 'dragalialost.info/weapon';
    const initStore = {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    };

    let storeData = localStorage.getItem(LOCAL_KEY);
    storeData = storeData ? JSON.parse(storeData) : initStore;

    const store = reactive(storeData);

    const initWeaponInfo = {
      seriesId: 3,
      typeId: 1,
      weaponId: '',
      groupId: '',
      skinId: '',
      elementId: '',
      isObtained: false,
    };

    const state = reactive({
      weaponInfo: {
        ...initWeaponInfo,
      },
      weaponOptions: {},
    });

    const updateSeries = (seriesId) => {
      state.weaponInfo = {
        ...initWeaponInfo,
        seriesId,
        typeId: state.weaponInfo.typeId,
      };

      state.weaponOptions = {};
    };

    const updateType = (typeId) => {
      state.weaponInfo = {
        ...initWeaponInfo,
        typeId,
        seriesId: state.weaponInfo.seriesId,
      };

      state.weaponOptions = {};
    };

    const updateState = (weapon) => {
      console.log(weapon);
      const {
        _Id,
        _WeaponSeriesId,
        _WeaponType,
        _WeaponBodyBuildupGroupId,
        _WeaponSkinId,
        _ElementalType,
      } = weapon;

      const record = store[_WeaponSeriesId][_Id];

      if (record) {
        state.weaponInfo = record.weaponInfo;
        state.weaponOptions = record.weaponOptions;
      } else {
        const group = buildup[_WeaponBodyBuildupGroupId] || {};
        const options = {};
        const keys = Object.keys(group);
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          let to;
          const max = group[key].length;

          if (key === '1') {
            to = Math.min(5, max);
          } else if (key === '2' || key === '5') {
            to = 1;
          } else {
            to = 0;
          }

          options[key] = {
            from: 0,
            to,
            max: group[key].length,
          };
        }

        state.weaponInfo = {
          seriesId: _WeaponSeriesId,
          typeId: _WeaponType,
          weaponId: _Id,
          groupId: _WeaponBodyBuildupGroupId,
          skinId: _WeaponSkinId,
          elementId: _ElementalType,
          isObtained: false,
        };

        state.weaponOptions = options;
      }
    };

    const loadState = (weaponInfo) => {
      const seriesId = weaponInfo.seriesId;
      const weaponId = weaponInfo.weaponId;

      const record = store[seriesId][weaponId];
      if (record) {
        state.weaponInfo = record.weaponInfo;
        state.weaponOptions = record.weaponOptions;
      }
    };

    const clearState = () => {
      state.weaponInfo = {
        ...initWeaponInfo,
        seriesId: state.weaponInfo.seriesId,
        typeId: state.weaponInfo.typeId,
      };

      state.weaponOptions = {};
    };

    const toggleObtained = (isObtained) => {
      state.weaponInfo.isObtained = isObtained;
      if (!isObtained) {
        const options = Object.values(state.weaponOptions);
        for (let i = 0; i < options.length; i += 1) {
          options[i].from = 0;
        }
      }
    };

    const addStore = () => {
      const seriesId = state.weaponInfo.seriesId;
      const weaponId = state.weaponInfo.weaponId;
      if (!store[seriesId][weaponId]) {
        store[seriesId][weaponId] = { ...state };
      }
    };

    const saveLocal = () => {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(store));
    };

    watch(
      [
        () => state.weaponOptions?.[1]?.from,
        () => state.weaponOptions?.[1]?.to,
      ],
      ([from, to]) => {
        const options = state.weaponOptions;
        if (options[2]) {
          if (from > 4) {
            options[2].from = 1;
            options[2].to = 1;
          } else if (to > 4) {
            options[2].to = 1;
          }
        }
      }
    );

    return {
      ...toRefs(state),

      store,

      updateSeries,
      updateType,
      updateState,

      loadState,
      clearState,
      toggleObtained,

      addStore,
      saveLocal,
    };
  },
};
</script>

<style>
input[type='range'] {
  min-width: 0;
}
</style>
