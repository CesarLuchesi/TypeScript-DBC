import { AuthContext } from "../../context/AuthContext"
import { useContext} from "react";

function Header() {
const {handleLogout,loginOn} = useContext<any>(AuthContext);

  return (
    <div>
      Header
      {/* {loginOn && */}
    <button onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Header