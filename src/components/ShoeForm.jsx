import { useEffect, useState } from "react";
import {Plus, Save, X, RotateCcw} from "lucide-react";

function ShoeForm({ shoe, onSaved, onCancelEdit }) {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const isEditing = shoe !== null;

    useEffect(() => {
        setBrand(shoe?.brand ?? "");
        setModel(shoe?.model ?? "");
        setPrice(shoe?.price ?? "");
        setSize(shoe?.shoeSize ?? "");
        setErrors({});
        setSubmitted(false);
    }, [shoe]);

    function validateForm() {
        const newErrors = {};

        if (!brand.trim()) {
            newErrors.brand = "Brand is required";
        }

        if (!model.trim()) {
            newErrors.model = "Model is required";
        }

        if (size.trim() === "") {
            newErrors.size = "Size is required";
        } else if (!Number.isFinite(Number(size))) {
            newErrors.size = "Size must be a number";
        } else if (Number(size) <= 0) {
            newErrors.size = "Size cannot be negative"
        }

         if (price.trim() === "") {
            newErrors.price = "Price is required";
        } else if (!Number.isFinite(Number(price))) {
            newErrors.price = "Price must be a number";
        } else if (Number(price) <= 0) {
            newErrors.price = "Price cannot be negative"
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event){
        event.preventDefault();
        setSubmitted(true);

        if(!validateForm()){
            console.log("Error found during form submission.")
            return;
        }

        const shoeData = {
            brand: brand,
            model: model,
            shoeSize: Number(size),
            price: Number(price)
        };

        let url = "http://localhost:8080/shoes";
        let method = "POST";

        if(isEditing){
            url = `http://localhost:8080/shoes/${shoe.id}`;
            method = "PUT";
        }


        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shoeData)
        })
        .then((response)=> {
            if(!response.ok) {
                throw new Error(`Failed to  ${isEditing ? "update" : "create"} shoe`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(isEditing ? "Updated shoe:" : "Shoe added:", data);

            setBrand("");
            setModel("");
            setPrice("");
            setSize("");
            setErrors({});
            setSubmitted(false);

            onSaved();

            if(isEditing){
                onCancelEdit();
            }
        })
        .catch((error)=> {
            console.error(error);
        });

       
    }

    function handleCancel(){
        setBrand("");
        setModel("");
        setPrice("");
        setSize("");
        
        onCancelEdit();
    }

    function handleFieldChange(field, value, setter) {
        setter(value);

        if(submitted) {
            setErrors((previous) => ({
                ...previous,
                [field]: undefined,
            }))
        }
    }




    return(
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit Shoe" : "Add Shoe"}</h2>

            <div className="form-field">
                <label htmlFor="brand">
                    Brand
                    <input 
                    type= "text" 
                    placeholder="Enter brand"
                    value={brand}
                    onChange={event => handleFieldChange("brand", event.target.value, setBrand)}
                    className = {errors.brand ? "input-error" : ""}
                    aria-invalid = {Boolean(errors.brand)}
                    aria-describedby = {errors.brand ? "brand-error" : undefined}
                    />
                </label>
                {errors.brand && (
                    <span id = "brand-error" className = "field-error">{errors.brand}</span>
                )}
            </div>

            <div className="form-field">
                <label htmlFor="model">
                    Model
                    <input 
                    type= "text" 
                    placeholder="Enter model"
                    value={model} 
                    onChange={event => handleFieldChange("model", event.target.value, setModel)}
                    className = {errors.model ? "input-error" : ""}
                    aria-invalid = {Boolean(errors.model)}
                    aria-describedby = {errors.model ? "model-error" : undefined}
                    />
                </label>
                {errors.model && (
                    <span id = "model-error" className = "field-error">{errors.model}</span>
                )}
            </div>

            <div className="form-field">
                <label htmlFor="shoeSize">
                    Size
                    <input 
                    type= "text" 
                    value={size} 
                    onChange={event => handleFieldChange("size", event.target.value, setSize)} 
                    placeholder="Enter size"
                    className = {errors.size ? "input-error" : ""}
                    aria-invalid = {Boolean(errors.size)}
                    aria-describedby = {errors.size ? "size-error" : undefined}
                    />
                </label>
                {errors.size && (
                    <span id = "size-error" className = "field-error">{errors.size}</span>
                )}
            </div>

            <div className="form-field">
                <label htmlFor="price">
                    Price
                    <input type= "text"
                    value={price} 
                    onChange={event => handleFieldChange("price", event.target.value, setPrice)} 
                    placeholder="Enter price"
                    className = {errors.price ? "input-error" : ""}
                    aria-invalid = {Boolean(errors.price)}
                    aria-describedby = {errors.price ? "price-error" : undefined}
                    />
                </label>
                {errors.price && (
                    <span id = "price-error" className = "field-error">{errors.price}</span>
                )}
            </div>

            <div className="form-actions">
                <button type="submit" className="button button-primary">
                    {isEditing ? (
                        <>
                        <Save size = {18}/>
                        Update Shoe
                        </>
                    ) : (
                        <>
                        <Plus size = {18} />
                        Add Shoe
                        </>
                    )}
                </button>
                    {isEditing && (<button 
                    type="button"
                    className=" button button-secondary"
                    onClick={handleCancel}
                >
                    <>
                    <X size = {18}/>
                    Cancel Edit
                    </>
                </button>)}
            </div>

        </form>

    );
}

export default ShoeForm;