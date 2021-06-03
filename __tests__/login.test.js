import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';
import LoginPage from '../pages/login';
import store from '../store';

afterEach(cleanup);

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe('Login test suit', () => {

	it('Should take a snapshot', () => {
		const { asFragment } = render(<LoginPage />, { wrapper: Wrapper });
		expect(asFragment(<LoginPage />)).toMatchSnapshot();
	})

	it('Should render with out error', async () => {
		render(<LoginPage />, { wrapper: Wrapper });
	});

	it('Username initial state is empty and enabled', () => {
		const { getByTestId } = render(<LoginPage />, { wrapper: Wrapper });
		const userNameField = getByTestId('username');
		expect(userNameField).toBeInTheDocument();
		expect(userNameField).toBeRequired();
		expect(userNameField).toHaveTextContent('');
		expect(userNameField).not.toBeDisabled();

	});

	it('Username value should be consistent', async() => {
		const { getByTestId } = render(<LoginPage />, { wrapper: Wrapper });
		const userNameField = getByTestId('username');
		await user.type(userNameField, 'Roman' );
		expect(userNameField.value).toBe('Roman');
	});

	it('Password initial state is empty and enabled', () => {
		const { getByTestId } = render(<LoginPage />, { wrapper: Wrapper });
		const passwordField = getByTestId('password');
		expect(passwordField).toBeInTheDocument();
		expect(passwordField).toBeRequired();
		expect(passwordField).toHaveTextContent('');
		expect(passwordField).not.toBeDisabled();
		expect(passwordField).toHaveAttribute('type', 'password');
	});

	it('Password value should be consistent', async() => {
		const { getByTestId } = render(<LoginPage />, { wrapper: Wrapper });
		const passwordField = getByTestId('password');
		await user.type(passwordField, '3jfncncjcnjdnc');
		expect(passwordField.value).toBe('3jfncncjcnjdnc');
	});

	it('Button text should be Login and enabled ', () => {
		const { getByTestId } = render(<LoginPage />, { wrapper: Wrapper });
		const submitButton = getByTestId('submit');
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toHaveTextContent('Login');
		expect(submitButton).not.toBeDisabled();
		expect(submitButton).toHaveAttribute('type', 'submit');
	});

	it('Form should have consistent values ', async() => {
		const { getByTestId } = render(<LoginPage />, { wrapper: Wrapper });

		const userNameField = getByTestId('username');
		await user.type(userNameField, 'jane.doe');

		const passwordField = getByTestId('password');
		await user.type(passwordField, '3jfncncjcnjdnc');
		expect(getByTestId('loginform')).toHaveFormValues({
				username: 'jane.doe',
				password: '3jfncncjcnjdnc',
		});
				
	});

});