import React from 'react';
import AddPackage from 'src/components/AddPackage';
import PackageList from 'src/components/PackageList';

export default function App() {
  return (
    <div>
      <h1>Pip Viewer</h1>
      <AddPackage />
      <PackageList />
    </div>
  );
}
