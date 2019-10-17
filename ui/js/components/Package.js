import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export default function Package({ name, version, uninstall }) {
  const [showWarning, setShowWarning] = useState(false);
  const [uninstallError, setUninstallError] = useState(false);
  const [uninstallErrorMsg, setUninstallErrorMsg] = useState('');

  const handleShowWarning = (show) => {
    setShowWarning(show);
    if (!show) {
      setUninstallErrorMsg('');
      setUninstallError(false);
    }
  };

  const handleUninstall = async () => {
    const responseBody = await uninstall(name);
    if (responseBody.status !== 200) {
      setUninstallError(true);
      const response = await responseBody.json();
      setUninstallErrorMsg(response);
    } else {
      handleShowWarning(false);
      setUninstallErrorMsg('');
      setUninstallError(false);
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{version}</td>
      <td>
        <Button bssize="sm" onClick={() => handleShowWarning(true)}>
          X
        </Button>

        <Modal show={showWarning} onHide={() => handleShowWarning(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Uninstall {name}=={version}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              !uninstallError &&
              'Are you sure you want to uninstall this package?'
            }
            {
              uninstallError &&
              <div className="error">
                <p>Error uninstalling &quot;{name}&quot;</p>
                <p>{uninstallErrorMsg}</p>
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleShowWarning(false)}>
              No
            </Button>
            <Button variant="primary" onClick={handleUninstall}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

      </td>
    </tr>
  );
}

Package.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  uninstall: PropTypes.func.isRequired,
};
