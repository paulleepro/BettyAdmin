import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { FormControlLabel } from '../../components/FormControlLabel';
import { Radio } from '../../components/Radio';


afterEach(cleanup);

describe('FormControlLabel component test suit', () => {

	it('Should take a snapshot', () => {
		const { asFragment } = render(<FormControlLabel 
      value="never"
      control={<Radio />}
      label="Never" />);
		expect(asFragment(<FormControlLabel />)).toMatchSnapshot();
	})

	it('Should render with out error', () => {
		render(<FormControlLabel 
      value="never"
      control={<Radio />}
      label="Never" />);
	});
})