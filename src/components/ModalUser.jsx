import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../store/data-reducer';


const ModalUser = ({ person, handleRefresh }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };
    await fetch(
      `https://crudcrmapiexpress.herokuapp.com/projects/${person._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    
    const getOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const dataFetched = await fetch(
      'https://crudcrmapiexpress.herokuapp.com/projects',
      getOptions
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log('error', error));
    const results = await dataFetched;

    dispatch(dataActions.removeData(results))
    setShow(false);
    handleRefresh();
    window.location.reload()
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>{person.user_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            <span>{person.user_email}</span> | <span>{person.user_mobile}</span>
          </h6>

          <h6 className="my-4 fw-bold">
            {person.user_city} - {person.user_country}
          </h6>
          <h6>Comments</h6>
          <div className="border border-1 w-100 rounded py-4 px-3">
            {person.user_comments}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser