import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoeForm from './ShoeForm';

describe("ShoeForm", () => {
    test("shows validation errors when required fields are empty", async () => {
        const user = userEvent.setup();

        render(<ShoeForm shoe={null} onSaved={() => {}} />);

        const submitButton = screen.getByRole("button", {
            name: /add shoe/i,
        });

        await user.click(submitButton);

        expect(screen.getByPlaceholderText(/Enter brand/i)).toHaveClass(
            "input-error"
        );
        expect(screen.getByPlaceholderText(/Enter model/i)).toHaveClass(
            "input-error"
        );
        expect(screen.getByPlaceholderText(/Enter price/i)).toHaveClass(
            "input-error"
        );
    });
});