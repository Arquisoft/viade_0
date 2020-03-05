import React from 'react'
import { render, fireEvent } from "@testing-library/react";
import EmailForm from "./EmailForm";

test('check email button activated when 2 emails are equal', async () => {
  const correctValues = { email: 'test@example.org', remail: 'test@example.org' };

  const { getByLabelText, getByText, container } = render(<EmailForm/>);
  
  const inputEmail = getByLabelText('email-input');
  const inputRemail = getByLabelText('remail-input');

  fireEvent.change(inputEmail, { target: { value: correctValues.email }});
  expect(getByText(/Submit/i).closest('button')).toHaveAttribute('disabled');
  
  fireEvent.change(inputRemail, { target: { value: correctValues.remail }});
  expect(getByText(/Submit/i).closest('button')).not.toHaveAttribute('disabled');
  
});