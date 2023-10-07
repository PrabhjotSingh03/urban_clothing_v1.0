import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return ( 
        <div>
            <NavBar>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">All Orders</h1>
                <UserOrders></UserOrders>
            </NavBar>
        </div>
     );
}

export default UserOrdersPage;