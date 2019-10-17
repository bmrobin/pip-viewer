import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { install_package } from 'src/api';
import './AddPackage.css';

export default function AddPackage() {
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [installError, setInstallError] = useState(false);
  const [installErrorMsg, setInstallErrorMsg] = useState('');

  const clear = () => {
    setShowPkgModal(false);
    setPackageName('');
    setInstallError(false);
    setInstallErrorMsg('');
  };

  const handleClose = () => {
    clear();
  };

  const handleShow = () => setShowPkgModal(true);

  const handlePackageChange = (e) => {
    setInstallError(false);
    setPackageName(e.target.value);
  };

  const handleSave = async () => {
    /* TODO - implement change check to not do this if the value hasn't changed */
    const installResponse = await install_package(packageName);
    if (installResponse.status !== 200) {
      setInstallError(true);
      const error = await installResponse.json();
      setInstallErrorMsg(error);
    } else {
      clear();
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="add-pkg-btn">
        Add Package
      </Button>

      <Modal show={showPkgModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a pip Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="add-pkg" className="pkg-name-label">
            Package Name:
          </label>
          <input
            id="add-pkg"
            type="text"
            value={packageName}
            onChange={handlePackageChange}
            className="pkg-name"
          />
          {
            installError &&
            <div className="error">
              <p>Error installing &quot;{packageName}&quot;</p>
              <p>{installErrorMsg}</p>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
