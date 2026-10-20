import { Link,useLocation } from "react-router-dom";
import {SportShoe, House, Settings, } from "lucide-react";

function Navigation() {
    const location = useLocation();

    const isManageShoesPage = location.pathname =="/manage";
    const pageTitle = isManageShoesPage ? "Manage Shoes" : "Shoe Catalog";

    return(
        <header className="app-header">
            <Link to="/" className="brand">
                <SportShoe size={35} color = "white"/>
                <span>{pageTitle}</span>
            </Link>

            <nav className="main-nav">
                <Link to="/" className={!isManageShoesPage ? "nav-link active" : "nav-link"}>
                <House size={18}/>
                <span>Catalog</span>
                </Link>
        
                <Link to="/manage" className={isManageShoesPage ? "nav-link active" : "nav-link"}>
                <Settings size={18}/>
                <span>Manage Shoes</span>
                </Link>
            </nav>
        </header>
    );
}

export default Navigation;