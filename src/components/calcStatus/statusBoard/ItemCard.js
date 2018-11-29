import React, { Component } from 'react';

class ItemCard extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  render() {
    const { index, section, item, handleSection, modifyUnbind } = this.props;
    const base_dir = process.env.PUBLIC_URL;

    console.log(item)
    const avatarProps = {
      className: "avatar",
      src: item ? `${base_dir}/img/${section}s/${item.img}` : `${base_dir}/img/icon/add.png`,
    }

    if (section !== 'facility') avatarProps.onClick = () => handleSection(index);

    let setting_section = null;

    // if (item !== null) {
    //   if (section === "adventurer") {

    //   } else if (section === "facility") {

    //   } else {
    //     setting_section =
    //       <div className="unbind set">
    //         <img src={`${base_dir}/img/unbind/left-icon.png`} alt={"left-icon"} onClick={() => modifyUnbind(index, -1)} />
    //         <img src={`${base_dir}/img/unbind/${item.unbind}_Unbind.png`} alt={"unbind_image"} />
    //         <img src={`${base_dir}/img/unbind/right-icon.png`} alt={"right-icon"} onClick={() => modifyUnbind(index, 1)} />
    //       </div>
    //   }
    // }

    console.log("ItemCard - Re-render" + index)
    return (
      <div className="three column row">
        <div id="avatar-section" className="column">
          <img alt={item ? `${item.img}` : "add.png"} {...avatarProps} />
          <p style={{ textAlign: "center" }}>{item ? item.Name : section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()}</p>
        </div>

        <div id="setting-section" className="column">
          <div className="ui form">
            {setting_section}



            {/* <div className={status ? "inline field" : "inline disabled field"}>
              <label>Level</label>
              <input type="text" placeholder="Level"></input>
            </div>

            {section === "adventurer" &&
              <div className="inline disabled field">
                <label>Mana Circle</label>
                <select>
                  <option>50</option>
                  <option>40</option>
                  <option>30</option>
                  <option>20</option>
                  <option>10</option>
                  <option>0</option>
                </select>
              </div>
            } */}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;