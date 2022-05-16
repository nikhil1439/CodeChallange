import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { userUpdated } from "../reducers/usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = pathname.replace("/edit-user/", "");
  const { id } = useParams();

  const user = useSelector((state) =>
    state.users.entities.find((user) => user._id === id)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleDepartment = (e) => setDepartment(e.target.value);
  
  const handleClick = () => {
    const edited = axios.patch(`http://localhost:8000/emp/${id}`,{
      name,
      email,
      department
    }).then((response) => {
      const user = response.data;
      return user;
    });
    if (name && email) {
      dispatch(
        userUpdated({
         _id:id,
         name,
         email,
         department
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <>
      <div className="card w-40 d-flex flex-column align-items-center shadow p-3 mb-5 bg-white rounded position-absolute top-50 start-50 translate-middle">
        <div className="d-flex flex-column align-items-center">
          <h1>Edit user</h1>
        </div>
        <div>
          <form className="row g-3">
            <div className="form-group col-md-6">
              <label className="form-label" htmlFor="nameInput">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="name"
                id="nameInput"
                onChange={handleName}
                value={name}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="emailInput">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="test@mailbox.com"
                id="emailInput"
                onChange={handleEmail}
                value={email}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="departmentInput">
                Department
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="department"
                id="departmentInput"
                onChange={handleDepartment}
                value={department}
              />
            </div>
            {error && error}
            <div className="d-flex align-items-center col-sm-8">
              <button
                type="submit"
                onClick={handleClick}
                className="btn btn-primary mt-3"
              >
                Edit user
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
