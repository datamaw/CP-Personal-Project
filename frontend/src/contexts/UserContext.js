import { createContext } from "react"

let defaultValue = {
  user: null,
  setUser: () => {}
}
const UserContext = createContext(defaultValue)

export default UserContext;