import { get_installed_packages, install_package, uninstall_package } from 'src/utils/api';
import { GET_PACKAGES, EDIT_PACKAGES } from './types';

/**
 * Redux Action for retrieving packages.
 *
 * @returns {Function}
 */
export function getPackages() {
  return async dispatch => {
    const rawResponse = await get_installed_packages();
    const packageList = await rawResponse.json();
    dispatch({
      type: GET_PACKAGES,
      data: packageList,
    });
  };
}

/**
 * Redux Action for installing packages.
 *
 * @param packageName the package to install
 * @returns {Function}
 */
export function installPackage(packageName) {
  return async dispatch => {
    const rawResponse = await install_package(packageName);
    const response = await rawResponse.json();
    console.log(response);
    dispatch({
      type: EDIT_PACKAGES,
    });
  };
}

/**
 * Redux Action for uninstalling packages.
 *
 * @param packageName the package to uninstall
 * @returns {Function}
 */
export function uninstallPackage(packageName) {
  return async dispatch => {
    const rawResponse = await uninstall_package(packageName);
    const response = await rawResponse.json();
    console.log(response);
    await getPackages();
    console.log('got packages?');
    dispatch({
      type: EDIT_PACKAGES,
    });
  };
}
