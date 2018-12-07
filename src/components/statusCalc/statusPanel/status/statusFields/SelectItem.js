// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// // import LEVEL_LIMIT from '../../../../../redux/store/data/level_data';
// import uuidv4 from 'uuid/v4';
// import { updateStatusAdventurerRarityMana } from '../../../../../redux/actions/actions';

// function mapStateToProps(state) {
//   const { statusSets: { adventurer } } = state;
//   return {
//     adventurer,
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateRarityMana: (key, value) => dispatch(updateStatusAdventurerRarityMana(key, value)),
//   }
// }

// class SelectItem extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       mana: {
//         "5": ["50", "45", "40", "30", "20", "10", "0"],
//         "4": ["40", "30", "20", "10", "0"],
//         "3": ["30", "20", "10", "0"],
//       },
//       rarity: {
//         "3": ["5", "4", "3"],
//         "4": ["5", "4"],
//         "5": "5",
//       }
//     }
//     this._onChange = this._onChange.bind(this);
//   }

//   render() {
//     const { adventurer } = this.props;
//     const disable = adventurer ? false : true;
//     const { rarity = "5", curRarity = "", mana } = adventurer || {};
//     const { mana: { [curRarity]: manaOptions = [] }, rarity: { [rarity]: rarityOptions } } = this.state;
//     return (

//       <div className="equal width fields">
//         <div className="field">
//           <label>Rarity</label>
//           {this.isString(rarityOptions) ?
//             <input disabled value={curRarity} />
//             :
//             <select id="curRarity" disabled={disable} value={curRarity} onChange={this._onChange}>
//               {rarityOptions.map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
//             </select>
//           }
//         </div>

//         <div className="field">
//           <label>Mana</label>
//           <select id="mana" disabled={disable} value={mana} onChange={this._onChange}>
//             {manaOptions.map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
//           </select>
//         </div>
//       </div>
//     );
//   }

//   isString(value) {
//     return typeof value === 'string' || value instanceof String;
//   }

//   _onChange(e) {
//     const { id, value } = e.target;
//     this.props.updateRarityMana(id, value);
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SelectItem);