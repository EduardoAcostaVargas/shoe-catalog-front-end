import { useState, useEffect } from "react";
import ShoeForm from "../components/ShoeForm";
import "../App.css";

function ManageShoes() {
    const [shoes, setShoes] = useState([]);
    const [editingShoe, setEditingShoe] = useState(null);

    function loadShoes() {
        fetch("http://localhost:8080/shoes")
        .then((response) => response.json())
        .then((data) => setShoes(data));
    }

    function deleteShoe(id) {
        fetch(`http://localhost:8080/shoes/${id}`,{
            method: "DELETE"
        }).then((response)=> {
            console.log("Deleted shoe ID:", id);
            if(!response.ok) {
                throw new Error("Failed to delete shoe");
            }
            loadShoes();
        })
    }

    useEffect(() => {
        loadShoes();
    }, []);



    return (
        <main>
            <h1> Manage Shoes</h1>
            <p>Add new shoes or update your existing catalog.</p>
            <section class="panel">
                <ShoeForm
                    key={editingShoe?.id ?? "new"}
                    shoe={editingShoe}
                    onSaved={loadShoes}
                    onCancelEdit={() => setEditingShoe(null)}
                />
            </section>
          
         <section class="panel">   
                <h2>Shoe Catalog</h2>
                <div className= "table-wrapper">
                    <table>
                        <thead>
                        
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                
                        <tbody>
                            {shoes.map((shoe) => (
                                <tr key={shoe.id}>
                                    <td>{shoe.id}</td>
                                    <td>{shoe.brand}</td>
                                    <td>{shoe.model}</td>
                                    <td>{shoe.shoeSize}</td>
                                    <td>{shoe.price}</td>
                                    <td>
                                        <button className="button button-primary" onClick={() => setEditingShoe(shoe)}>Edit</button>
                                        <button className="button button-danger" onClick={() => deleteShoe(shoe.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    
    );
}


export default ManageShoes;