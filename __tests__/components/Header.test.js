import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Header } from '../../components/Header';
import store from '../../store';

afterEach(cleanup);

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe('Header test suit', () => {

	it('Should take a snapshot', () => {
		const { asFragment } = render(<Header />, { wrapper: Wrapper });
		expect(asFragment(<Header />)).toMatchSnapshot();
	})

	it('Should render with out error',  () => {
		render(<Header />, { wrapper: Wrapper });
	});

});