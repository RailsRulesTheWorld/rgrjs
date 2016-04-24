import API from '../API';
import React, { Component, PropTypes } from 'react';
import LinkStore from '../stores/LinkStore';

const _getAppStore = () => ({
  links: LinkStore.getAll(),
});

class Main extends Component {
  static propTypes = {
    limit: PropTypes.number,
  };

  static defaultProps = {
    limit: 4,
  };

  state = _getAppStore();

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    LinkStore.removeListener('change', this.onChange);
  }


  onChange = () => {
    console.log('4. In onChange');
    this.setState(_getAppStore());
  };

  render() {
    const content = this.state.links.slice(0, this.props.limit).map((link) =>
      <li key={link.id}>
        <a href={link.url}>{link.title}</a>
      </li>
    );

    return (
      <div>
        <h3>Links</h3>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

export default Main;
