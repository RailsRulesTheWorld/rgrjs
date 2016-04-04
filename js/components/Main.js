import API from '../API';
import React, {Component} from 'react';
import LinkStore from '../stores/LinkStore';

const _getAppStore = () => {
  return {
    links: LinkStore.getAll()
  };
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = _getAppStore();
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    LinkStore.removeListener('change', this.onChange);
  }


  onChange() {
    console.log('4. In onChange');
    this.setState(_getAppStore());
  }

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on('change', this.onChange);
  }


  render() {
    const content = this.state.links.slice(0, this.props.limit).map((link) => {
      return (
        <li key={link.id}>
          <a href={link.url}>{link.title}</a>
        </li>
      );
    });

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

Main.propTypes = {

}

export default Main;
