import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "../reducers/usersSlice";
import axios from "axios";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [department, setDepartment] = useState(null);
  const [id,setId]= useState(null)
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleDepartment = (e) => setDepartment(e.target.value);

  const handleClick = async () => {
    const user = await axios
      .post("http://localhost:8000/emp/create", {
        name,
        email,
        department,
      })
      .then((response) => {
        const user = response.data;
        setId(user._id)
        return user;
      });
    if (name && email && department) {
      dispatch(
        userAdded({
          _id:id
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setEmail("");
  };

  return (
    <>
      <div className="card w-40 d-flex flex-column align-items-center shadow p-3 mb-5 bg-white rounded position-absolute top-50 start-50 translate-middle">
        <div className="d-flex flex-column align-items-center">
          <h1>Add user</h1>
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
            <div className="col-sm-8">
              <button
                type="submit"
                onClick={handleClick}
                className="btn btn-primary mt-3"
              >
                Add user
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
