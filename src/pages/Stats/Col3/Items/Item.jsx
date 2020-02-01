import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectItem } from 'actions';
import { getImage, getOutBGC, refs, scrollTo, useEvent } from 'utils';
import { Image } from 'components';

function Item(props) {
  const { data, focused, index, style, theme, selectItem } = props;
  const { lang = 'en' } = useParams();
  const item = data[index];
  const {
    Skill,
    Icon,
    Name: { [lang]: name, en },
  } = item;
  const image = getImage(item, focused);

  const handleClick = useEvent(() => {
    selectItem(focused, item);
    scrollTo(refs.col2);
  });

  return (
    <div className="item" style={style}>
      <div className="item-content" style={getOutBGC(theme)}>
        <Image image={image} size="md" onClick={handleClick} />
        <span className="name">{name || en}</span>

        {focused === 'weapon' &&
          (Skill ? (
            <Image
              size="sm"
              image={`skills/${Skill.Image}`}
              title={Skill.Name}
            />
          ) : (
            <span />
          ))}

        {Icon &&
          Icon.map(icon => (
            <Image
              key={icon.Name}
              size="sm"
              image={`abilities/Icon_Ability_${icon.Image}`}
              title={icon.Name}
            />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ focused, theme }) => {
  return { focused, theme };
};

const mapDispatchToProps = {
  selectItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
