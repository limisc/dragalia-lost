/* Context HOC */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Context from './Context';

const langRegEx = /en|ja|zh/;

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      setLang: this.setLang,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let {
      location: { search },
      match: {
        params: { page, lang },
      },
    } = props;

    if (!lang) {
      const exec = langRegEx.exec(navigator.language || '');
      lang = exec ? exec[0] : 'en';
      props.history.replace(`/${page}/${lang}${search}`);

      return { lang };
    } else if (lang !== state.lang) {
      props.history.replace(`/${page}/${lang}${search}`);

      return { lang };
    }

    return null;
  }

  setLang = lang => {
    this.setState({ lang });
    const {
      location: { search },
      match: {
        params: { page },
      },
    } = this.props;
    this.props.history.push(`/${page}/${lang}${search}`);
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default withRouter(ThemeProvider);
