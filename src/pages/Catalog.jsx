import { useState, useEffect } from "react";
import ShoeCard from "../components/ShoeCard";
import "../App.css";

function Catalog() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/shoes")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Unable to load shoes (HTTP ${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                setShoes(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    function handleAddToCart(shoe) {
        console.log("Add to cart: ", shoe.id);
    }

    return (
        <main>

            <div className = "catalog-header">
                <h1>Find your next running pair</h1>
                <p>Explore our shoes</p>
            </div>

            {loading && <p>Loading shoes...</p>}

            {error && <p role = "alert"> Could not load the catalog: {error}</p>}

            {!loading && !error && shoes.length === 0 && (
                <p> No shoes are available yet.</p>
            )}

            {!loading && !error && shoes.length > 0 && (
                <div className = "shoe-grid">
                    {shoes.map((shoe) => (
                        <ShoeCard key={shoe.id} shoe={shoe} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            )}

            {/*
            <h1>Shoe Catalog</h1>
            {loading && <p>Loading shoes...</p>}
            {error && (
                <p role="alert">
                    Unable to load shoes. Make sure the backend is running on
                    http://localhost:8080.
                </p>
            )}
            {!loading && !error && shoes.length === 0 && <p>No shoes found.</p>}
            {shoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
            */}
        </main>
    );
}

export default Catalog;