import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../store/data-reducer';
import EachTable from './EachTable';
import './CRM.css';
import AddUser from './AddUser';


const CRM = () => {
  const data = useSelector((state) => state.dataReducer.data);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilter, setSelectedFilter] = useState('0');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  if (refresh) {
    setFilteredData([...data]);
    // console.log('filteredData', filteredData);
    setRefresh(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const dataFetched = await fetch('https://crudcrmapiexpress.herokuapp.com/projects', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result;
        })
        .catch((error) => console.log('error', error));
      const results = await dataFetched;
      const resultsRedux = dispatch(dataActions.getData(results));
        setFilteredData(resultsRedux.payload);
    }
    fetchData();
  }, [data])

  const handleRefresh = () => {
    setRefresh(true);
  };

  const handleSelectedValue = (e) => {
    setSelectedFilter(e.target.value);
    if (e.target.value === '0') {
      setFilteredData(data);
    } else if (e.target.value === '1') {
      const dummyData = [...data];
      dummyData.sort(function(a, b){
        const nameA = a.user_name.toLowerCase()
        const nameB = b.user_name.toLowerCase();
        if (nameA < nameB) //sort string ascending
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; //default return value (no sorting)
      });
      setFilteredData(dummyData);
    } else if (e.target.value === '2') {
      const dummyData = [...data];
      const subscribedArray = dummyData.filter((each) => each.user_subscribed)
      setFilteredData(subscribedArray);
    } else if (e.target.value === '3') {
      const dummyData = [...data];
      const subscribedArray = dummyData.filter((each) => !each.user_subscribed);
      setFilteredData(subscribedArray);
    }
  }
  return (
    <div>
      {!data ? (
        <h2>Hello</h2>
      ) : (
        <>
          <div className="crm-page-header">
            <div>
              <img
                src="https://lastingsales.com/wp-content/uploads/2021/11/logo-1.png"
                alt=""
              />
            </div>
            <div id="mobile-filter-section" className="filter-section-div">
              <p className="my-5 mx-5">Filter</p>
              <Form.Select
                defaultValue="0"
                aria-label="Default select example"
                onChange={(e) => handleSelectedValue(e)}
              >
                <option value="0">None</option>
                <option value="1">Sort Alphabetical</option>
                <option value="2">Subscribed</option>
                <option value="3">Unsubscribed</option>
              </Form.Select>
            </div>
            </div>
            <div className="enter-new-user-container">
              <AddUser handleRefresh={handleRefresh} />
            </div>
          <div className="table-entires-selector">
            <table className="table data-entries-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th className='contact-column' scope="col">Contact</th>
                  <th className='subscribe-column' scope="col">Subscribe</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((each, index) => {
                  return <EachTable key={each._id} userEach={each} number={index} handleRefresh={handleRefresh} />;
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default CRM