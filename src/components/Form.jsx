import React, { useRef, useState } from 'react'

const Form = () => {
  const ref = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [successfull, setSuccessful] = useState(false);
  if (successfull) {
    setTimeout(() => {
      setSuccessful(false);
    }, 5000);
  }

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
  }

  const handleCheckbox = (e) => {
    e.preventDefault();
    ref.current.checked ? setSubscribe(true) : setSubscribe(false);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    const obj = {
      user_name: name,
      user_email: email,
      user_mobile: contact,
      user_comments: comment,
      user_subscribed: subscribe,
    };

    const raw = JSON.stringify(obj);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    await fetch('https://crudcrmapiexpress.herokuapp.com/projects/', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log('added successfully');
        setName('');
        setEmail('');
        setContact('');
        setComment('');
        setSubscribe(false);
        setSuccessful(true);
      })
      .catch((error) => console.log('error', error));

  }

  return (
    <>
      {successfull ? (
        <div className="show-success-message">
          <p className="success-text-message">Submitted Successfully</p>
        </div>
      ) : (
        <div className="hide-success-message">
          <p className="hide-text-message">Submitted Successfully</p>
        </div>
      )}
      <div className="mt-2">
        <form onSubmit={(e) => handleSubmission(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label mx-5 px-3">
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
            <label htmlFor="exampleInputName" className="form-label mx-5 px-3">
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
          <div className="w-25 mx-auto form-btn-section">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form