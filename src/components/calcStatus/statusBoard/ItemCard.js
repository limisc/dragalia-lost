import React, { Component } from 'react';

class ItemCard extends Component {

  shouldComponentUpdate(nextProps) {
    // return true;
    return nextProps.status !== this.props.status;
  }

  render() {
    const { index, section, status, handleSection } = this.props;
    // console.log(index, section, status)

    const imgProps = {
      className: "avatar",
      // alt: "......",
      src: `${process.env.PUBLIC_URL}/img/icon/add.png`,
    }

    if (index !== 4) imgProps.onClick = () => handleSection(index);

    return (
      <div className="two column row">
        <div className="column">
          <img
            alt={"card avatar"}
            {...imgProps}
          ></img>
        </div>

        <div className="column">
          <div className="ui form">
            <div className={status ? "inline field" : "inline disabled field"}>
              <label>Level</label>
              <input type="text" placeholder="Level"></input>
            </div>

            <div className="inline disabled field">
              <label>Mana Ring</label>
              <select>
                <option>0</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;