import React from 'react';
import { connect } from 'react-redux';
import { selectItem } from 'actions';
import { getImage, refs, scrollTo } from 'utils';
import { Image, Context } from 'components';

function ListItem({
  focused,
  index,
  style,
  data: { cols, field, arr },
  // eslint-disable-next-line no-shadow
  selectItem,
}) {
  const { lang } = React.useContext(Context);
  const item = arr[index];
  const name = item.name[lang];
  const image = getImage(item, field);

  const onClick = () => {
    const params = { statsKey: focused, item };
    selectItem(params);
    scrollTo(refs[focused], true);
  };

  return (
    <div style={style} className="item-list">
      <Image field={field} image={image} onClick={onClick} />
      <span className="name">{name}</span>
      {cols.map(c => {
        if (c === 'weapon' || c === 'element') {
          const icon = `${c}_${item[c]}`;
          return <Image key={c} size="sm" field="icon" image={icon} />;
        }

        return <span key={c}>{item[c]}</span>;
      })}
    </div>
  );
}

const mapStateToProps = ({ focused }) => {
  return { focused };
};

const actionCreators = {
  selectItem,
};

export default connect(
  mapStateToProps,
  actionCreators
)(ListItem);
