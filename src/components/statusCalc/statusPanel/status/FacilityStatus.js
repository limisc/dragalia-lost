// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import InputItem from '../status/statusSettings/levelInput/InputItem';
// import uuidv4 from 'uuid/v4';

// const mapStateToProps = (state) => {
//   const { UIData: { IMG_PATH }, statusSets: { adventurer: { type, element }, facility } } = state;
//   return {
//     IMG_PATH,
//     type,
//     element,
//     facility,
//   };
// }

// class FacilityStatus extends Component {
//   constructor(props) {
//     super(props);
//     this.getImagePath = this.getImagePath.bind(this);
//   }

//   render() {
//     const { facilityType, facility: { [facilityType]: { contentList } } } = this.props;
//     return (
//       <div className="column">
//         <div className="ui two column grid">
//           <div className="six wide column">
//             <img
//               className="status-avatar"
//               alt="facility_avatar"
//               src={this.getImagePath()}
//             />
//             <p style={{ textAlign: "center" }}><b>{facilityType.charAt(0).toUpperCase() + facilityType.slice(1)}</b></p>
//           </div>

//           <div className="nine wide column">
//             <div className="ui form">
//               <div className="two fields">
//                 {contentList.map(item =>
//                   <InputItem
//                     key={uuidv4()}
//                     section="facility"
//                     facilityType={facilityType}
//                     label={item}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   getImagePath() {
//     const { IMG_PATH, facilityType, type, element } = this.props;
//     const name = facilityType === "dojo" ? type : element;
//     return `${IMG_PATH}/facility/${facilityType}_${name}.png`;
//   }
// }

// export default connect(
//   mapStateToProps,
// )(FacilityStatus);