import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Package = ({ name, version, uninstall }) => (
  <tr>
    <td>{name}</td>
    <td>{version}</td>
    <td>
      <Button bssize="sm" onClick={() => uninstall(name)}>
        X
      </Button>
    </td>
  </tr>
);

Package.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  uninstall: PropTypes.func.isRequired,
};

export default Package;
