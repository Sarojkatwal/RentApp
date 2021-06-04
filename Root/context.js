import React from "react";
const UserContext = React.createContext()

export const withData = Component => props => (
    <UserContext.Consumer>
        {
            data => <Component {...props} data={data} />
        }
    </UserContext.Consumer>
)
export default UserContext;