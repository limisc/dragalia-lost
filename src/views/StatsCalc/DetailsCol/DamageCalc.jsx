// @flow

import React, { Fragment } from 'react';
import { dungeonInfo } from "data";
import { Select, InputNumber } from "components";
import { translate } from "actions";
import SettingField from "./SettingField";
import DamageBar from "./DamageBar";

class DamageCalc extends React.PureComponent {
  constructor(props) {
    super(props);
    const dungeon = "hms";
    const info = dungeonInfo[dungeon];
    const { STR, multi } = info;
    this.state = {
      info,
      STR,
      multi,
      dungeon,
      id: "",
      ex: "",
      EXHP: "",
      EXDef: "",
      HP: "",
      Def: "",
      textArea: [],
      dungeonList: Object.keys(dungeonInfo),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      stats,
    } = props;

    const { adventurer } = stats;
    const { id, ex } = adventurer || {};
    if (adventurer && (id !== state.id || ex !== state.ex)) {

      return {
        id,
        ex,
        EXHP: adventurer["EXHP" + ex] || "",
        EXDef: adventurer["EXDef" + ex] || "",
      };
    }

    return null;
  }

  render() {
    const {
      lang,
      stats,
      label,
      total,
    } = this.props;

    const {
      STR,
      multi,
      EXHP,
      EXDef,
      HP,
      Def,
      dungeon,
      dungeonList,
    } = this.state;
    const damage = this.calcDamage(stats);
    const {
      min,
      max,
      textArea,
    } = damage || {};

    const { HP: baseHP, STR: tSTR, might: tMight } = total;
    const tHP = this.calcTotalHP(baseHP, EXHP, HP);
    return (
      <div className="details-container">
        <div className="details-row">
          <div className="f-col"><strong>{label}</strong></div>
          <div className="r-col">{translate("HP", lang)}</div>
          <div className="r-col">{translate("STR", lang)}</div>
          <div className="r-col">{translate("might", lang)}</div>
        </div>
        <div className="details-total">
          <div className="f-col">{translate("total", lang)}</div>
          <div className="r-col">{baseHP}</div>
          <div className="r-col">{tSTR}</div>
          <div className="r-col">{tMight}</div>
        </div>
        <Select
          lang={lang}
          value={dungeon}
          label="dungeon"
          options={dungeonList}
          onChange={this.onChange}
        />
        <div className="damage-setting">
          <InputNumber
            lang={lang}
            label="STR"
            value={STR}
            onChange={this.onChange}
          />
          <InputNumber
            disabled
            lang={lang}
            label="multi"
            value={multi}
          />
          <SettingField
            lang={lang}
            label="EXHP"
            value={EXHP}
            onChange={this.onChange}
          />
          <SettingField
            lang={lang}
            label="EXDef"
            value={EXDef}
            onChange={this.onChange}
          />
          <SettingField
            lang={lang}
            label="HP"
            value={HP}
            onChange={this.onChange}
          />
          <SettingField
            lang={lang}
            label="Def"
            value={Def}
            onChange={this.onChange}
          />
        </div>

        {damage && (
          <Fragment>
            <div className="details-row">
              <div className="dungeon-details-col">HP</div>
              <div className="dungeon-details-col">Min</div>
              <div className="dungeon-details-col">Max</div>
            </div>

            <div className="details-row">
              <div className="dungeon-details-col">{tHP}</div>
              <div className="dungeon-details-col">{min}</div>
              <div className="dungeon-details-col">{max}</div>
            </div>
            <DamageBar
              min={min}
              max={max}
              tHP={tHP}
            />
            <div style={{
              width: "100%",
              marginTop: "8px",
            }}>
              {textArea.map((list, i) => {
                const content = list.split(",");
                return (
                  <div className="details-row" key={i}>
                    <div className="dungeon-details-col">{content[0]}</div>
                    <div className="dungeon-details-col">{content[1]}</div>
                    <div className="dungeon-details-col">{content[2]}</div>
                  </div>
                )
              })}
            </div>
          </Fragment>
        )}
      </div>
    );
  }

  onChange = ({ target: { name, value } }) => {
    if (name === "dungeon") {
      const info = dungeonInfo[value];
      const { STR, multi } = info;
      this.setState({
        [name]: value,
        STR,
        multi,
        info,
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  calcDamage = (stats) => {
    let {
      STR,
      multi,
      EXDef,
      Def,
      info,
      dungeon,
    } = this.state;

    const {
      adventurer,
      weapon,
      wyrmprint1,
      wyrmprint2,
      dragon,
    } = stats;

    const textArea = [];
    if (adventurer) {
      let reduceDamage = 0, Res = 0, eleModifier = 1;
      Def = parseInt(Def, 10) || 0;
      Def += parseInt(EXDef, 10) || 0;

      if (adventurer.element === info.disadvantage) {
        eleModifier = 0.5;
      } else if (adventurer.element === info.adventage) {
        eleModifier = 1.5;
      }
      // adventurer ability Def
      if (adventurer.Def1) {
        let { mana, DefLV1, DefLV2, Def1, Def2 } = adventurer;
        mana = parseInt(mana, 10) || 0;
        DefLV1 = parseInt(DefLV1, 10);
        DefLV2 = parseInt(DefLV2, 10);

        if (DefLV2 && mana >= DefLV2) {
          Def += Def2;
          textArea.push(`adventurer,Def,${Def2}`);
        } else if (mana >= DefLV1) {
          Def += Def1;
          textArea.push(`adventurer,Def,${Def1}`);
        }
      }


      // weapon Def
      if (
        weapon
        && weapon.Def
        && adventurer.element.includes(weapon.DefEle)
      ) {
        Def += weapon.Def;
        textArea.push(`weapon,Def,${weapon.Def}`);
      }

      // wyrmprint Def & Res
      let wDef = 0, wReduce = 0, wRes = 0;
      if (wyrmprint1) {
        const {
          unbind,
          Def1,
          Def2,
          conquer,
          reduceDamage1,
          reduceDamage2,
          ResEle,
          Res1,
          Res2,
        } = wyrmprint1;
        if (unbind === "4") {
          if (Def2) {
            wDef += Def2;
            textArea.push(`wyrmprint1,Def,${Def2}`);
          }

          if (conquer && conquer === dungeon) {
            wReduce += reduceDamage2;
            textArea.push(`wyrmprint1,reduceDamage,${reduceDamage2}`);
          }

          if (ResEle && info.element === ResEle) {
            wRes += Res2;
            textArea.push(`wyrmprint1,Res,${Res2}`);
          }
        } else {
          if (Def1) {
            wDef += Def1;
            textArea.push(`wyrmprint1,Def,${Def1}`);
          }

          if (conquer && conquer === dungeon) {
            wReduce += reduceDamage1;
            textArea.push(`wyrmprint1,reduceDamage,${reduceDamage1}`);
          }

          if (ResEle && info.element === ResEle) {
            wRes += Res1;
            textArea.push(`wyrmprint1,Res,${Res1}`);
          }
        }
      }

      if (wyrmprint2) {
        const {
          unbind,
          Def1,
          Def2,
          conquer,
          reduceDamage1,
          reduceDamage2,
          ResEle,
          Res1,
          Res2,
        } = wyrmprint2;
        if (unbind === "4") {
          if (Def2) {
            wDef += Def2;
            if (wDef > 20) {
              textArea.push(`wyrmprint2,Def,${20 - wDef + Def2}(${Def2})`);
              wDef = 20;
            } else {
              textArea.push(`wyrmprint2,Def,${Def2}`);
            }
          }

          if (conquer && conquer === dungeon) {
            wReduce += reduceDamage2;
            if (wReduce > 25) {
              textArea.push(`wyrmprint2,reduceDamage,${25 - wReduce + reduceDamage2}(${reduceDamage2})`);
              wReduce = 25;
            } else {
              textArea.push(`wyrmprint2,reduceDamage,${reduceDamage2}`);
            }
          }

          if (ResEle && info.element === ResEle) {
            wRes += Res2;
            if (wRes > 15) {
              textArea.push(`wyrmprint2,Res,${15 - wRes + Res2}(${Res2})`);
              wRes = 15;
            } else {
              textArea.push(`wyrmprint2,Res,${Res2}`);
            }
          }
        } else {
          if (Def1) {
            wDef += Def1;
            if (wDef > 20) {
              textArea.push(`wyrmprint2,Def,${20 - wDef + Def1}(${Def1})`);
              wDef = 20;
            } else {
              textArea.push(`wyrmprint2,Def,${Def1}`);
            }
          }

          if (conquer && conquer === dungeon) {
            wReduce += reduceDamage1;
            if (wReduce > 25) {
              textArea.push(`wyrmprint2,reduceDamage,${25 - wReduce + reduceDamage1}(${reduceDamage1})`);
              wReduce = 25;
            } else {
              textArea.push(`wyrmprint2,reduceDamage,${reduceDamage1}`);
            }
          }

          if (ResEle && info.element === ResEle) {
            wRes += Res1;
            if (wRes > 15) {
              textArea.push(`wyrmprint2,Res,${15 - wRes + Res1}(${Res1})`);
              wRes = 15;
            } else {
              textArea.push(`wyrmprint2,Res,${Res1}`);
            }
          }
        }
      }

      Def += wDef;
      reduceDamage += wReduce;
      Res += wRes;

      // dragon Res
      if (
        dragon
        && dragon.ResEle
        && dragon.ResEle === info.element
      ) {
        const temp = dragon.unbind === "4" ? dragon.Res2 : dragon.Res1;
        Res += temp;
        textArea.push(`dragon,Res,${temp}`);
      }

      const base = 5 / 3 * STR * multi * eleModifier
        * (1 - reduceDamage * 0.01)
        * (1 - Res * 0.01)
        / (adventurer.DefCoef * (1 + Def * 0.01));
      const max = Math.floor(base * 1.05);
      const min = Math.floor(base * 0.95);
      return {
        max,
        min,
        textArea,
      };
    }
  }

  calcTotalHP = (baseHP, EXHP, HP) => {
    const intHP = parseInt(HP, 10) || 0;
    const intEXHP = parseInt(EXHP, 10) || 0;
    return Math.ceil(baseHP * (1 + intHP * 0.01) * (1 + intEXHP * 0.01));
  }
}

export default DamageCalc;