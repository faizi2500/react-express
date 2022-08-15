import axios from 'axios';
import { useMemo, useRef, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import Form from 'react-bootstrap/Form';

// import Select from 'react-select';
import countryList from 'react-select-country-list';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {AiOutlineUserAdd} from 'react-icons/ai';
import Select from 'react-select';
import { ModalFooter } from 'react-bootstrap';

const AddUserReactTable = ({addshow, changeShowToTrue, changeShowToFalse}) => {
  const ref = useRef(null);
  const [country, setCountry] = useState('default');
  const [cities, setCities] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 15,
      minHeight: 15,
    }),
  };
  const cityList = []
  if (country) {
    const countryCode = country.value;
    const list = City.getCitiesOfCountry(countryCode);
    list.map((each) => cityList.push(each.name));
  }

  console.log(cityList);

  const handleNameChange = (e, variable) => {
    if (variable === 'name') {
      setName(e.target.value);
    } else if (variable === 'email') {
      setEmail(e.target.value);
    } else if (variable === 'contact') {
      setContact(e.target.value);
    } else if (variable === 'comment') {
      setComment(e.target.value);
    } else {
      console.log('not found');
    }
  };

  // console.log(City.getCitiesOfCountry('PK'));
  const changeHandler = (value) => {
    setCountry(value);
  };

  const handleCity = (e) => {
    setCities(e.target.value);
  }

  const handleCheckbox = (e) => {
    e.preventDefault();
    ref.current.checked ? setSubscribe(true) : setSubscribe(false);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    let city = '';
    cities ? city = cities : city = "Not chosen";
    console.log('working');
    const obj = {
      user_name: name,
      user_email: email,
      user_mobile: contact,
      user_comments: comment,
      user_subscribed: subscribe,
      user_country: country.label,
      user_city: city,
    };
    const data = JSON.stringify(obj);
    const config = {
      method: 'post',
      url: 'https://crudcrmapiexpress.herokuapp.com/projects',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
      });
    setName('');
    setEmail('');
    setContact('');
    setComment('');
    setSubscribe(false);
    setCountry('default');
    setCities('');
      
    changeShowToFalse('ADD');
  };

  return (
    <>
      <div className="add-user-btn-container d-flex justify-content-end">
        <Button
          variant="light"
          className="mx-5 px-4"
          onClick={() => changeShowToTrue('ADD')}
        >
          <AiOutlineUserAdd style={{width: '1.75rem', height: '1.75rem'}} />
        </Button>
      </div>
      <Modal
        show={addshow}
        onHide={() => changeShowToFalse('ADD')}
        backdrop="static"
        keyboard={false}
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmission(e)}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputName"
                className="form-label mx-5 px-3"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto"
                id="exampleInputName"
                value={name}
                onChange={(e) => handleNameChange(e, 'name')}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label mx-5 px-3"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control w-75 mx-auto"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => handleNameChange(e, 'email')}
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="form-text w-75 mx-auto">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputName"
                className="form-label mx-5 px-3"
              >
                Conatact Number
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto"
                id="exampleInputName"
                value={contact}
                onChange={(e) => handleNameChange(e, 'contact')}
                required
              />
            </div>
            <div>
              <Select
                className="w-75 mx-auto border-none mb-3"
                options={options}
                value={country}
                onChange={changeHandler}
                placeholder="Select Country"
                required
              />
              <input
                tabIndex={-1}
                className="form-control w-75 mx-auto hidden-input-country-validation"
                autoComplete="off"
                style={{opacity: 0, height: 0}}
                value={country}
                onChange={() => console.log('this')}
                required
              />
            </div>
            {cityList.length > 1 ? (
              <div className="">
                <Form.Select
                  as="select"
                  className="w-75 mx-auto cities-option-dropdown"
                  aria-label="Default select example"
                  placeholder="Select City Optional"
                  defaultValue={cities || ''}
                  onChange={(e) => handleCity(e)}
                >
                  <option value={cities}>Select City (Optional)</option>
                  {cityList.map((each) => (
                    <option value={each}>{each}</option>
                  ))}
                </Form.Select>
              </div>
            ) : (
              <div>
                <Select
                  className="w-75 mx-auto border-none"
                  options="Not Selected"
                  value="None"
                  placeholder="Select City"
                  isDisabled
                />
              </div>
            )}
            <div className="form-floating w-75 mx-auto mt-4">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                value={comment}
                onChange={(e) => handleNameChange(e, 'comment')}
                style={{height: '100px'}}
              />
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
            <div className="my-3 form-check w-75 mx-auto">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={subscribe}
                onChange={(e) => handleCheckbox(e)}
                ref={ref}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Receive exciting deals and news
              </label>
            </div>
            <ModalFooter>
              <Button
                variant="secondary"
                onClick={() => changeShowToFalse('ADD')}
              >
                Close
              </Button>
              <Button type="submit" variant="primary">
                Sumbit
              </Button>
            </ModalFooter>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUserReactTable;
