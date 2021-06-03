import React from 'react';
import { cleanup, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Input } from '../../components/Input';

afterEach(cleanup);

describe('Input test suit', () => {

	it('Should take a snapshot', () => {
		const { asFragment } = render(<Input />);
		expect(asFragment(<Input />)).toMatchSnapshot();
	})

	it('Should render with out error', () => {
		render(<Input />);
	});

	it('Input default value is empty and enabled', () => {
		const { getByTestId } = render(<Input data-testid='inputField'/>);
		const mockField = getByTestId('inputField');
		expect(mockField).toBeInTheDocument();
		expect(mockField).not.toBeRequired()
		expect(mockField).toHaveTextContent('');
		expect(mockField).not.toBeDisabled();

	});

	it('Input Props test', () => {
		const { getByTestId } = render(<Input data-testid='mockId' type='email' id='mockId' value='mock' disabled required/>);
		const mockField = getByTestId('mockId');
		expect(mockField).toBeInTheDocument();
		expect(mockField).toBeRequired()
		expect(mockField).toHaveAttribute('type','email')
		expect(mockField).toHaveAttribute('id','mockId')
		expect(mockField).toHaveValue('mock')
		expect(mockField).toBeDisabled();
		mockField.focus()
    expect(mockField).not.toHaveFocus()
	})

	it('Click event works correctly', () => {
		const { getByTestId } = render(<Input data-testid='mockId'/>);
		const mockField = getByTestId('mockId');
		mockField.focus()
    expect(mockField).toHaveFocus()

		mockField.blur()
		expect(mockField).not.toHaveFocus()
	})

	it('Input value should be consistent', async() => {
		const { getByTestId } = render(<Input data-testid='mockId'/>);
		const mockField = getByTestId('mockId');
		await user.type(mockField, 'Roman' );
		expect(mockField.value).toBe('Roman');
	});

});