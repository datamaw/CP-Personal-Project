// import { redirectToLogin }  from "../api/authentication.js"
// import LoginButton from "../auth/LoginButton";
// import React, { useState, useEffect } from "react";
// import queryString from "query-string"


// const CallBackPage = ({ location }) => {
//     const { code } = queryString.parse(location.search);

//     const [callbackData, setCallbackData] = useState("none")

//     useEffect(() => {
//         fetch(`http://localhost:8000/callback?code${code}`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             }
//         })
//         .then(res => res.json())
//         .then(res => setCallbackData(JSON.stringify(res)))
//     }, [code])

//     return (
//         <div>
//             <h2>Callback Auth Page</h2>
//         </div>
//     )
// }

// export default CallBackPage;