/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { getLimit, loadState, saveState, removeState } from 'actions';
import { BtnGroups, Dialog } from 'components';
import { facilityMaterial, imageMap } from 'data';
import { refs } from 'store';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import MaterialItem from './MaterialItem';
import FacilityItem from './FacilityItem';

class Facility extends React.Component {
  state = {
    open: false,
    facility: loadState('facility') || [],
    btns: ['load', 'del', 'save', 'add'],
  };

  onChange = (value, index) => {
    this.setState(state => ({
      facility: state.facility.map((f, i) => {
        return i === index ? { ...f, value } : f;
      }),
    }));
  };

  onClick = name => () => {
    switch (name) {
      case 'add':
        this.setState({ open: true });
        break;
      case 'load':
        this.setState(state => ({
          facility: loadState('facility') || state.facility,
        }));
        break;
      case 'del':
        this.setState({ facility: [] });
        removeState('facility');
        break;
      case 'save':
        saveState('facility', this.state.facility);
        break;
      default:
        break;
    }
  };

  handleClose = () => this.setState({ open: false });

  handleCreate = state => {
    const { type } = state;
    const key = type === 'dojo' ? 'weapon' : 'element';
    const field = state[key];
    if (type === 'event' || (type && field)) {
      const max = getLimit(type);
      this.setState(state => ({
        open: false,
        facility: [
          ...state.facility,
          {
            type,
            max,
            field,
            value: [0, max],
          },
        ],
      }));
    }
  };

  removeFacility = index => () => {
    this.setState(state => ({
      facility: state.facility.filter((_, i) => i !== index),
    }));
  };

  sumArray = (list, value) => {
    let sum = 0;
    const [start, end] = value;
    for (let i = start; i < end; i++) {
      sum += list[i];
    }
    return sum;
  };

  getImage = (item, field) => {
    switch (item) {
      case 'rupies':
      case 'event':
      case 'item':
      case 'coin1':
      case 'coin2':
      case 'coin3':
      case 'talonstone':
        return imageMap[item];
      default:
        return imageMap[item][field];
    }
  };

  calcMaterial = facility => {
    const res = {};

    facility.forEach(f => {
      if (f.value[0] !== f.value[1]) {
        const materialDict = facilityMaterial[f.type];
        Object.keys(materialDict).forEach(item => {
          const quantity = this.sumArray(materialDict[item], f.value);
          if (quantity !== 0) {
            const key = this.getImage(item, f.field);
            res[key] = (res[key] || 0) + quantity;
          }
        });
      }
    });

    return res;
  };

  render() {
    const { open, btns, facility } = this.state;
    const material = this.calcMaterial(facility);
    const materialArray = Object.keys(material);
    const rowCount = Math.ceil(materialArray.length / 2);
    return (
      <Fragment>
        <div className="column">
          <BtnGroups
            className="col-2 col-4"
            btns={btns}
            onClick={this.onClick}
          />
          <div className="halidom-list">
            {facility.map((f, i) => {
              const image = this.getImage(f.type, f.field);
              return (
                <FacilityItem
                  key={i}
                  index={i}
                  image={image}
                  max={f.max}
                  value={f.value}
                  onClick={this.removeFacility}
                  onChange={this.onChange}
                />
              );
            })}
          </div>
          <Dialog
            upgrade
            open={open}
            type="dojo"
            handleClose={this.handleClose}
            handleCreate={this.handleCreate}
          />
        </div>
        <div className="column" ref={refs.bottom}>
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeGrid
                width={width}
                height={height}
                itemData={{ material, materialArray }}
                columnCount={2}
                columnWidth={width / 2}
                rowCount={rowCount}
                rowHeight={64}
              >
                {MaterialItem}
              </FixedSizeGrid>
            )}
          </AutoSizer>
        </div>
      </Fragment>
    );
  }
}

export default Facility;
