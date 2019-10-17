import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { install_package } from 'src/api';
import './AddPackage.css';

export default function AddPackage() {
  const [show, setShow] = useState(false);
  const [packageName, setPackageName] = useState('');

  const handleClose = () => {
    setShow(false);
    setPackageName('');
  };

  const handleShow = () => setShow(true);

  const handlePackageChange = (e) => {
    const pkgName = e.target.value;
    console.log(pkgName);
    setPackageName(pkgName);
  };

  const handleSave = async () => {
    setShow(false);
    const response = await install_package(packageName);
    console.log(response);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="add-pkg-btn">
        Add Package
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a pip Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="add-pkg">
            Package Name
          </label>
          <input id="add-pkg" type="text" value={packageName} onChange={handlePackageChange} />
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
