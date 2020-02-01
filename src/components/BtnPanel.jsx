import React, { memo } from 'react';
import locales from 'locales';
import Image from './Image';

const BtnPanel = memo(function Panel(props) {
  const { btns, lang, onClick } = props;

  return (
    <div className="btn-panel">
      {btns.map(key => {
        const image = `icon/${key}`;
        const title = locales(key, lang);
        return (
          <button key={key} type="button" name={key} onClick={onClick}>
            <Image image={image} size="xs" title={title} />
          </button>
        );
      })}
    </div>
  );
});

export default BtnPanel;
