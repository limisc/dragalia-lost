import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectItem } from 'actions';
import { getImage, refs, scrollTo, useEvent } from 'utils';
import { Image } from 'components';

function Item({ data, focused, index, style, selectItem }) {
  const { lang = 'en' } = useParams();
  const item = data[index];
  const {
    skill,
    icon,
    name: { [lang]: name, en },
  } = item;
  const image = getImage(item, focused);

  const handleClick = useEvent(() => {
    selectItem(focused, item);
    scrollTo(refs.col2);
  });

  return (
    <div className="item" style={style}>
      <Image image={image} size="md" onClick={handleClick} />
      <span className="name">{name || en}</span>

      {focused === 'weapon' &&
        (skill ? (
          <Image
            size="sm"
            image={`ability/${skill.image}`}
            title={skill.title}
          />
        ) : (
          <span />
        ))}

      {icon &&
        icon.map(iconItem => {
          const iconImage = `ability/Icon_Ability_${iconItem.image}`;
          const { title } = iconItem;
          return (
            <Image key={title} image={iconImage} size="sm" title={title} />
          );
        })}
    </div>
  );
}

const mapStateToProps = ({ focused }) => {
  return { focused };
};

const mapDispatchToProps = {
  selectItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
