import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { get_installed_packages, uninstall_package } from 'src/api';
import Package from './Package';

export default class PackageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageList: [],
    };
  }

  async componentDidMount() {
    const packageListResponse = await get_installed_packages();
    const packageList = await packageListResponse.json();
    this.setState({
      packageList,
    });
  }

  render() {
    const packages = this.state.packageList.map(pkg => (
      <Package
        key={pkg.name}
        version={pkg.version}
        name={pkg.name}
        uninstall={uninstall_package}
      />
    ));
    return (
      <div className="pkg-list-table">
        <Table striped responsive hover>
          <thead>
            <tr>
              <td>Pkg Name</td>
              <td>Pkg Version</td>
            </tr>
          </thead>
          <tbody>{packages}</tbody>
        </Table>
      </div>
    );
  }
}
