import Relay from 'react-relay';
import React, { Component, PropTypes } from 'react';

import Link from './Link';

class Main extends Component {
  render() {
    const content = this.props.store.links.map((link) =>
      <Link key={link._id} link={link} />
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

Main.propTypes = {
  store: PropTypes.object.isRequired,
};

// Declare the data requirement for this component

Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        links {
          _id,
          ${Link.getFragment('link')}
        }
      }
    `,
  },
});

export default Main;
