const url = 'http://localhost:5000';

export async function get_installed_packages() {
  console.debug('[api] fetching package list...');
  return fetch(`${url}/installed`, {
    method: 'get',
  });
}

export async function install_package(name) {
  console.debug(`[api] installing package ${name}...`);
  return fetch(`${url}/install`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pkgName: name }),
  });
}

export async function uninstall_package(name) {
  console.debug(`[api] uninstalling package ${name}...`);
  return fetch(`${url}/uninstall`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pkgName: name }),
  });
}
