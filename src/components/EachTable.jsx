import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import ModalUser from './ModalUser';

const EachTable = ({ userEach, number }) => {
  return (
    <tr>
      <th scope="row">{number}</th>
      <td>{userEach.user_name}</td>
      <td>{userEach.user_email}</td>
      <td className="contact-row">{userEach.user_mobile}</td>
      {userEach.user_subscribed ? (
        <td className="subscribe-row">Yes</td>
      ) : (
        <td className="subscribe-row">No</td>
      )}
      <td>
        <ModalUser person={userEach} />
      </td>
    </tr>
  );
}

export default EachTable