import NavBar from "../features/navbar/Navbar";
import Checkout from "../features/checkout/Checkout";

function CartPage() {
    return ( 
        <div>
            <NavBar>
                <Checkout></Checkout>
            </NavBar>
        </div>
     );
}

export default CartPage;