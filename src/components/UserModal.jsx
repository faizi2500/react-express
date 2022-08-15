import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserModal = ({
  value,
  changeShowToTrue,
  show,
  changeShowToFalse,
  person,
}) => {
  console.log(value);

  const handleClose = () => {
    changeShowToFalse('CLOSE-DELTE-MODAL');
  };
  // const handleShow = () => setShow(true);
  const handleShow = () => {
    // const person2 = data.filter((obj) => obj._id == value);
    // setPerson(person2[0]);
    changeShowToTrue('DELETE-MODAL-BOX', value);
  };

  const handleUserDelete = async () => {
    const config = {
      method: 'delete',
      url: `https://crudcrmapiexpress.herokuapp.com/projects/${person._id}`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    changeShowToFalse('DELETE');
  };
  
  return (
    <>
      <Button
        variant="primary"
        className="View-btn"
        onClick={() => handleShow()}
      >
        View
      </Button>

      <Modal
        show={show}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
        centered
        scrollable={true}
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
          <Button variant="danger" onClick={handleUserDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModal;
