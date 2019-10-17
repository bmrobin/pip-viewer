import React from 'react';
import renderer from 'react-test-renderer';
import Package from './Package';

describe('Package component', () => {
  it('should render component', () => {
    const component = renderer.create(<Package name="pkgName" version="1.2.3" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
