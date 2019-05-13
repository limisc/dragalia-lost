/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  // DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { elements, facilities } from 'data';
import { getLimit, getHalidomSectionKey, addHalidom } from 'actions';
import Select from './Select';
import withTheme from './withTheme';

class CustomDialog extends React.PureComponent {
  state = {
    type: 'event',
    element: this.props.element || '',
    weapon: this.props.weapon || '',
    elements: Object.keys(elements),
    weapons: Object.keys(facilities.weapon),
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  facilityTemplate = () => {
    const { type } = this.state;
    const types = ['altar', 'dojo', 'event', 'slime', 'fafnir'];
    const label2 = type === '' ? '' : type === 'dojo' ? 'weapon' : 'element';
    return (
      <Fragment>
        {/* <DialogTitle>Add New Facility</DialogTitle> */}
        <DialogContent>
          <Select
            classes="col-2"
            label="type"
            value={type}
            options={types}
            onChange={this.onChange}
          />

          <Select
            classes="col-2"
            label={label2}
            value={this.state[label2]}
            disabled={!type}
            options={this.state[`${label2}s`]}
            onChange={this.onChange}
          />
        </DialogContent>
      </Fragment>
    );
  };

  buildFacility = () => {
    const { type, element, weapon } = this.state;

    if ((type === 'dojo' && weapon) || (type !== 'dojo' && element)) {
      let field, section;
      if (type === 'dojo') {
        field = 'weapon';
        section = weapon;
      } else if (type === 'fafnir') {
        field = 'dragon';
        section = element;
      } else {
        field = 'element';
        section = element;
      }
      const item = { id: 'SIMC', type, level: getLimit(type) };
      this.props.addHalidom(field, section, item);
      this.props.handleClose();
    }
  };

  render() {
    const { lang, open, handleClose } = this.props;
    // console.log(this.state.element);
    return (
      <Dialog
        open={open}
        maxWidth="xs"
        classes={{ paperScrollPaper: 'dialog-flex' }}
      >
        {this.facilityTemplate()}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.buildFacility} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  const { element, weapon, dragon } = getHalidomSectionKey(stats);
  return { element, weapon, dragon };
};

const mapDispatchToProps = dispatch => {
  return {
    addHalidom: (field, section, item) =>
      dispatch(addHalidom(field, section, item)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomDialog)
);
