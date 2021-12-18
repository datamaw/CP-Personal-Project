// import { redirectToLogin }  from "../api/authentication.js"
import getProducts from "../auth/GetToken";
import StoreAccess from "../auth/GetToken";

function HomePage(props) {
    return (
        <div>
            <h2>Home Page</h2>
            < getProducts />
        </div>
    )
}

export default HomePage;