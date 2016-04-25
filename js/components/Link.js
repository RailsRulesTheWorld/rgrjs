import React, { Component } from 'react';
import Relay from 'react-relay';

class Link extends Component {
  render() {
    const { link } = this.props;
    return (
      <li>
        <a href={link.url}>{link.title}</a>
      </li>
    );
  }
}

Link = Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL`
      fragment on Link {
        url,
        title,
      }
    `,
  },
});

export default Link;
