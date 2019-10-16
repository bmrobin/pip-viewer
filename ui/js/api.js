const url = 'http://localhost:5000';

export async function get_installed_packages() {
  return fetch(`${url}/installed`, {
    method: 'get',
  });
}

export function install_package(name) {
  return fetch(`${url}/install`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pkgName: name }),
  });
}

export function uninstall_package(name) {
  return fetch(`${url}/uninstall`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pkgName: name }),
  });
}
