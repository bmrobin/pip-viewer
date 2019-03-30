import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getPackages, uninstallPackage } from 'src/redux/actions/packageActions';
import Package from './Package';

class PackageList extends React.Component {
  componentDidMount() {
    this.props.getPackages();
  }

  render() {
    const packages = this.props.packageList.map(pkg => (
      <Package key={pkg.name} version={pkg.version} name={pkg.name} />
    ));
    return (
      <Table striped responsive hover>
        <thead>
          <tr>
            <td>Pkg Name</td>
            <td>Pkg Version</td>
          </tr>
        </thead>
        <tbody>{packages}</tbody>
      </Table>
    );
  }
}

PackageList.propTypes = {
  getPackages: PropTypes.func.isRequired,
  packageList: PropTypes.arrayOf(Package).isRequired,
};

const mapStateToProps = state => ({
  packageList: state.packages.packages,
});

export default connect(
  mapStateToProps,
  { getPackages },
)(PackageList);
