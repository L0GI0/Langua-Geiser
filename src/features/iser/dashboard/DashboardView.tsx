import { useDispatch, useSelector } from 'react-redux' 
import { logOut, authenticate } from 'features/account/store/accountSlice' 
import RoundButton from "common/components/RoundButton";
import { RootState } from "rootStore/rootReducer";
import LinearProgress from "@mui/material/LinearProgress";
import styled from 'styled-components'

// ----------------------------------------------------------------------

const StyledDiv = styled.div`
  width: 100px;
`

// ----------------------------------------------------------------------

const DashboardView = () => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.accountReducer.users)

  const onLogOut = () => {
    dispatch(logOut())
  }

  const getUsers = () => {
    dispatch(authenticate())
  }

  return (<>
    <div>Admin Dashboard  </div>
      <RoundButton text="Log out" onClick={onLogOut}/>
      <RoundButton text="auth" onClick={getUsers}/>
      <StyledDiv><LinearProgress value={60} valueBuffer={90} variant="determinate"/></StyledDiv>
      <ul>
        { users && users.map((user: any) => {
          return <li>{user.name}</li> 
        })}
      </ul>

  </>);
};

export default DashboardView;