import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { AddUser } from "./components/addOrEditUsers/AddUser";
import { EditUser } from "./components/addOrEditUsers/EditUser";
import { UsersList } from "./components/usersTable/UsersList";
import {NotFound} from "./components/notFoundPage/NotFound";
import { Header } from "./components/header/Header";
import { ViewUser } from './components/viewUserModal/ViewUser';

export default function App() {

  
  return (
    <BrowserRouter>
      <div>

        <Header/>

        <Switch>
          <Route exact path="/add-user">
            <AddUser />
          </Route>
          <Route exact path='/edit-user/:id'>
            <EditUser />
          </Route>
          <Route exact path="/">
          <UsersList />
          </Route>
          <Route exact path="/view-user"  >
            <ViewUser  />
          </Route>
          <Route path ='*' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
