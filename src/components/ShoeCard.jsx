
import { BookOpen, ShoppingCart } from "lucide-react";
import "../App.css";

function ShoeCard({ shoe, onAddToCart }) {
  return (
    <article className="shoe-card">
      <div className="shoe-card-details">
      {shoe.imageUrl ?(
         <img
          src={shoe.imageUrl} 
          alt={"image of " + shoe.brand + "shoe"} 
          loading="lazy"
          />
      ) : (
        <div className="shoe-icon-placeholder">
          <BookOpen area-hidden = "true" />
        </div>
      )}
      </div>
      
      <div className="shoe-card-content">
        <h2 className = "shoe-brand">{shoe.brand}</h2>
        <p className = "shoe-model">{shoe.model}</p>
        <p className = "shoe-price">${shoe.price.toFixed(2)}</p>

        <button
        type = "button"
        className = "button button-primary"
        onClick={() => onAddToCart(shoe)}
        >
          <ShoppingCart size = {18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ShoeCard;