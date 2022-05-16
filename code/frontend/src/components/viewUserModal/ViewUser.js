import React,{useState} from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { modalClosed } from "../reducers/usersSlice";
import "./ViewUser.css";

export function ViewUser(props) {
  const dispatch = useDispatch();

  const [entity,setEntity]= useState([]);
  ( async()=>{
    const user = await axios.get(`http://localhost:8000/emp/view/${props._id}`).then((response)=>{
      const result = response.data
      setEntity(result)
      return result
    })
  })();
  const modal = useSelector((state) => state.users.modal);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalClosed());
  };

  return (
    <Modal
      className="modal  position-absolute top-50 start-50 translate-middle"
      isOpen={modal}
      onRequestClose={handleClose}
      overlayClassName="Overlay"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="m-2">
        <div className="d-flex flex-column align-items-center">
          <h2>User Details</h2>
        </div>
        <div className="d-flex flex-column align-items-center mt-5">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Id</label>
              <input
                className="form-control "
                type="text"
                _id="nameInput"
                label="Id"
                value={entity._id}
                disabled
              />
            </div>
            <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              _id="nameInput"
              value={entity.name}
              disabled
            />
            </div>
            <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="text"
              _id="emailInput"
              value={entity.email}
              disabled
            />
            </div>
            <div className="col-md-6">
            <label className="form-label">Department</label>
            <input
              className="form-control"
              type="text"
              _id="nameInput"
              value={entity.department}
              disabled
            />
            </div>
            <button className="btn btn-danger mt-3" onClick={handleClose}>
              close
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
