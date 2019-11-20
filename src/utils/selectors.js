import { createSelector } from 'reselect';

export const getFilterFields = createSelector(
  state => state.focused,
  focused => {
    switch (focused) {
      case 'adventurer':
      case 'weapon':
        return ['rarity', 'element', 'weapon'];
      case 'dragon':
        return ['rarity', 'element'];
      default:
        return ['rarity', 'type', 'weapon'];
    }
  }
);
