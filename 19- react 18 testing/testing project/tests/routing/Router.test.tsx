import React from 'react';
import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react'
import {RouterProvider, createMemoryRouter} from 'react-router';
import Home from '../../src/components/Home';

describe('Router', () => {
    it('should render the home page for /', () => {
        const routes = [
            {
                path: '/',
                element: <Home />
            }
        ]
        const router = createMemoryRouter(routes, {initialEntries: ['/']})

        render(<RouterProvider router={router} />)

        expect(screen.getByRole('heading', {name: /pruebas/i})).toBeInTheDocument();
    })
})