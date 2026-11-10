import { render, screen } from '@testing-library/react';
import ShoeCard from './ShoeCard';

describe('ShoeCard', () => {
    test('displays ShoeCard component', () => {
        const shoe = {
            id: 1,
            brand: "Test Shoe",
            model: "Test Model",
            price: 125.99,
        };

        render(<ShoeCard shoe={shoe} />);
        
        expect(screen.getByText("Test Shoe")).toBeInTheDocument();
        expect(screen.getByText("Test Model")).toBeInTheDocument();
        expect(screen.getByText("$125.99")).toBeInTheDocument();
    });
});