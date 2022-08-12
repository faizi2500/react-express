import axios from 'axios';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserModal = ({
  value,
  data,
  changeShowToTrue,
  show,
  changeShowToFalse,
  person,
}) => {
  // console.log(value);
  // console.log(data);

  // console.log(array)
  // const [show, setShow] = useState(false);
  // const [person, setPerson] = useState([]);
  const handleClose = () => {
    changeShowToFalse('CLOSE-DELTE-MODAL');
  };
  // const handleShow = () => setShow(true);
  const handleShow = () => {
    // const person2 = data.filter((obj) => obj._id == value);
    // setPerson(person2[0]);
    changeShowToTrue('DELETE', value);
  };
  console.log(person);

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
    // setShow(false)
  };
  // console.log(person3);
  // const person = {
  //   user_name: 'BILAL',
  //   user_email: 'a1@gmail.com',
  //   user_mobile: '021215',
  //   user_comments: 'Hello'
  // }
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
        <Modal.Header closeButton>
          <Modal.Title>{person.user_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            <span>{person.user_email}</span> | <span>{person.user_mobile}</span>
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
