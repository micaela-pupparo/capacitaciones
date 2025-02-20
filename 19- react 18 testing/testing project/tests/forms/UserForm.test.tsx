import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { userEvent } from '@testing-library/user-event'
import UserForm from '../../src/components/UserForm';

describe('UserForm', () => {
    it('should render form field', () => {
        render(<UserForm />)

        const input = screen.getByLabelText(/name/i);
        expect(input).toBeInTheDocument();
        
    });

    it('should display an error if name is missing', async () => {
        render(<UserForm />)

        const button = screen.getByRole('button')
        const user = userEvent.setup();
        await user.click(button);

        const error = screen.getByText(/requerido/i);
        expect(error).toBeInTheDocument();
    })
})