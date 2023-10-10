import NavBar from "../features/navbar/Navbar";
import ProfileUser from "../features/user/components/UserProfile";

function UserProfilePage() {
    return ( 
        <div>
            <NavBar>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">User Profile</h1>
                <ProfileUser></ProfileUser>
            </NavBar>
        </div>
     );
}

export default UserProfilePage;