/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Hidden, InputAdornment } from '@material-ui/core';

import { AppContext, history } from "context";
import { translate, resetAll } from "actions";
import { Select } from "components";

const mapStateToProps = (state) => {
  const { stats, halidom, details } = state;
  // console.log(details)
  return {
    stats,
    halidom,
    details
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetAll: () => dispatch(resetAll()),
  };
}

class DetailsPanel extends Component {
  state = {
    rows: ["adventurer", "weapon", "wyrmprint1", "wyrmprint2", "dragon", "ability", "halidom"],
    total: {
      en: "Total (Adjusted - Fafnir Statue)",
      ja: "合計 (調整 - ファフ二ール像)",
      zh: "合计 (修正法夫纳像加成)",
    },
    dungeon: "",
    info: {
      hms: {
        STR: 7230,
        multiplier: 3.6,
        element: "Wind",
        adventage: "Water",
        disadvantage: "Flame",
      },
      hbh: {
        STR: 7230,
        multiplier: 4.8,
        element: "Flame",
        adventage: "Wind",
        disadvantage: "Water",
      }
    },
    defense: "",
    HP: "",
  }

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _changeLang = (e) => {
    history.push(`/${e.target.value}`);
  }

  _getTotal = (details) => {
    let HP = 0, STR = 0, might = 0;
    const keys = Object.keys(details);
    for (const k of keys) {
      HP += details[k].HP;
      STR += details[k].STR;
      might += details[k].might;
    }
    return { HP, STR, might };
  }

  _handleKeyPress = (e) => {
    //prevent user enter + - e in number input field.
    if (["+", "-", "e"].includes(e.key)) {
      e.preventDefault();
    }
  }

  _calcDamage = () => {
    let damage = "";
    let { dungeon, defense, HP, info } = this.state;
    const { adventurer, wyrmprint1, wyrmprint2, dragon, weapon } = this.props.stats;

    if (dungeon && adventurer) {
      let reduce = 0, res = 0, eleModifier = 1;
      defense = parseInt(defense, 10) || 0;
      // let reduce = 0, res = 0, defense = 0;
      if (adventurer.defense1) {
        let { mana } = adventurer;
        mana = parseInt(mana, 10);
        let temp = 0;
        if (mana >= 30) {
          temp = adventurer.defense2;
        } else if (mana >= 10) {
          temp = adventurer.defense1;
        }
        defense += temp;
      }

      if (adventurer.element === info[dungeon].adventage) {
        eleModifier = 1.5;
      } else if (adventurer.element === info[dungeon].disadvantage) {
        eleModifier = 0.5;
      }

      if (weapon && weapon.defense) {
        if (weapon.eleDefense === "" || weapon.eleDefense === adventurer.element) {
          defense += weapon.defense;
        }
      }

      if (wyrmprint1) {
        const { unbind } = wyrmprint1;
        if (unbind === "4") {
          defense += wyrmprint1.defense2 || 0;
          reduce += wyrmprint1.enemy === dungeon ? wyrmprint1.reduce2 : 0;
          res += wyrmprint1.elementRes === info[dungeon].element ? wyrmprint1.res2 : 0;
        } else {
          defense += wyrmprint1.defense1 || 0;
          reduce += wyrmprint1.enemy === dungeon ? wyrmprint1.reduce1 : 0;
          res += wyrmprint1.elementRes === info[dungeon].element ? wyrmprint1.res1 : 0;
        }
      }
      console.log("wyrmprint1", defense, reduce, res)
      if (wyrmprint2) {
        const { unbind } = wyrmprint2;
        if (unbind === "4") {
          defense += wyrmprint2.defense2 || 0;
          reduce += wyrmprint2.enemy === dungeon ? wyrmprint2.reduce2 : 0;
          res += wyrmprint2.elementRes === info[dungeon].element ? wyrmprint2.res2 : 0;
        } else {
          defense += wyrmprint2.defense1 || 0;
          reduce += wyrmprint2.enemy === dungeon ? wyrmprint2.reduce1 : 0;
          res += wyrmprint2.elementRes === info[dungeon].element ? wyrmprint2.res1 : 0;
        }
      }
      console.log("wyrmprint1 + wyrmprint2", defense, reduce, res)

      if (dragon && dragon.elementRes && dragon.elementRes === info[dungeon].element) {
        res += dragon.unbind === "4" ? dragon.res2 : dragon.res1;
      }

      const { STR = "", multiplier = "" } = info[dungeon];
      damage = Math.round(5 / 3 * STR * multiplier * (1 - reduce * 0.01) * (1 - res * 0.01) * 1.05 * eleModifier / (adventurer.DefCoef * (1 + defense * 0.01)));
    }
    return damage;
  }


  _calcHP = (totalHP) => {
    const { dungeon } = this.state;
    if (dungeon) {
      let { HP } = this.state;
      HP = parseInt(HP, 10) || 0;
      return Math.ceil(totalHP * (1 + HP * 0.01));
    } else {
      return "";
    }
  }
  render() {
    const { lang } = this.context;
    const { details } = this.props;
    const { rows, dungeon, HP, defense } = this.state;
    const hms = {
      "en": "High Midgardsormr",
      "ja": "真ミドガルズオルム",
      "zh": "真耶梦加得"
    }[lang];
    const hbh = {
      "en": "High Brunhilda",
      "ja": "真ブリュンヒルデ",
      "zh": "真布伦希尔德"
    }[lang];


    const { STR = "", multiplier = "" } = this.state.info[dungeon] || {};
    const total = this._getTotal(details);
    // console.log(total.might)

    const damage = this._calcDamage();
    const totalHP = this._calcHP(total.HP);
    return (
      <Fragment>
        <Grid container spacing={8}>

          <Grid item xs={6} sm={3}>
            <Select
              value={lang}
              built
              options={[
                { value: "en", label: "English" },
                { value: "zh", label: "简中" },
                { value: "ja", label: "日本語" },
              ]}
              onChange={this._changeLang}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <Button
              className="btn"
              color="secondary"
              variant="outlined"
              onClick={this.props.resetAll}
            >
              {translate("reset", lang)}
            </Button>
          </Grid>
        </Grid>

        <Paper className="fluid gutter-top">
          <Table className="details-table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">{translate("HP", lang)}</TableCell>
                <TableCell align="right">{translate("STR", lang)}</TableCell>
                <TableCell align="right">{translate("might", lang)}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row}>
                  <TableCell>{translate(row, lang)}</TableCell>
                  <TableCell align="right">{details[row].HP}</TableCell>
                  <TableCell align="right">{details[row].STR}</TableCell>
                  <TableCell align="right">{details[row].might}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>{translate("total", lang)}</TableCell>
                <TableCell align="right">{total.HP}</TableCell>
                <TableCell align="right">{total.STR}</TableCell>
                <TableCell align="right">{total.might}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Grid container spacing={8} style={{ marginTop: "16px" }}>
          <Grid item xs={6} sm={4}>
            <Select
              label="dungeon"
              value={dungeon}
              built
              options={[
                { value: "hms", label: hms },
                { value: "hbh", label: hbh },
              ]}
              onChange={this._onChange}
            />
          </Grid>
          <Hidden smUp>
            <Grid item sm={4}></Grid>
          </Hidden>
          <Grid item xs={6} sm={4}>
            <TextField
              disabled={true}
              label={translate("STR", lang)}
              value={STR}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              disabled={true}
              label={translate("multiplier", lang)}
              value={multiplier}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              disabled={dungeon === ""}
              label={translate("HP", lang)}
              value={HP}
              variant="outlined"
              InputProps={{
                name: "HP",
                type: "number",
                onKeyPress: this._handleKeyPress,
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onChange={this._onChange}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              disabled={dungeon === ""}
              label={translate("defense", lang)}
              value={defense}
              variant="outlined"
              InputProps={{
                name: "defense",
                type: "number",
                onKeyPress: this._handleKeyPress,
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onChange={this._onChange}
            />
          </Grid>

          <Hidden smDown>
            <Grid item sm={4}></Grid>
          </Hidden>

          <Grid item xs={6} sm={4}>
            HP: <p>{totalHP}</p>
          </Grid>

          <Grid item xs={6} sm={4}>
            Damage: <p style={{ color: "red" }}><b>{damage}</b></p>
          </Grid>
        </Grid>

      </Fragment>
    );
  }
}

DetailsPanel.contextType = AppContext;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPanel);