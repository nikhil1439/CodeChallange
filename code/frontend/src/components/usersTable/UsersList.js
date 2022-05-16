import { useState, useMemo } from "react";
import { userDeleted, modalOpen } from "../reducers/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ViewUser } from "../viewUserModal/ViewUser";

export function UsersList() {
  const [Uid, setId] = useState(0);
  const dispatch = useDispatch();
  const [entities, setEntities] = useState([]);

  useMemo(() => {
    axios.get("http://localhost:8000/emp/").then((response) => {
      const user = response.data;
      setEntities(user);
      return user;
    });
  }, []);
  const modal = useSelector((state) => state.users.modal);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (_id) => {
    const confirmBox = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmBox === true) {
      const deletedUser = axios
        .delete(`http://localhost:8000/emp/delete/${_id}`)
        .then((response) => {
          const deleted = response.data;
          return deleted;
        });
      window.location.reload(false);
      dispatch(userDeleted({ _id }));
    }
  };

  const handleView = (_id) => {
    dispatch(modalOpen());
    setId(_id);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h1>User List</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="two columns">
          <Link to="/add-user">
            <button className="btn btn-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ _id, name, email, department }, i) => (
                  <tr key={i}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{department}</td>
                    <td>
                      <button
                        className="btn btn-success m-1"
                        onClick={() => handleView(_id)}
                      >
                        View
                      </button>
                      {Uid && modal ? <ViewUser _id={Uid} /> : null}
                      <button
                        className="btn btn-success m-1"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </button>
                      <Link to={`/edit-user/${_id}`}>
                        <button className="btn btn-success m-1">Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
