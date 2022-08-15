import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import CRM from './components/CRM'
import { DesktopBanner } from './components/DesktopBanner'
import DesktopForm from './components/DesktopForm'
import Form from './components/Form'
import ReactTable from './components/ReactTable'
import TableComponent from './components/TableComponent'
import TableMobileComponent from './components/TableMobileComponent'

const App = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 850);
  const [update, setUpdate] = useState('false');
  const [data, setData] = useState([]);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 850);
  };

  if (update) {
    setUpdate(false);
  };

  const handleUpdate = () => {
    fetchFromAPI();
    setUpdate(true);
  }

  const fetchFromAPI = async () => {
    const config = {
      method: 'get',
      url: 'https://crudcrmapiexpress.herokuapp.com/projects/',
      headers: {},
    };

    const response = await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data[0]));
        return response.data;
        
      })
      .catch(function (error) {
        console.log(error);
      });
    await setData(response);
  }

  useEffect(() => {
    fetchFromAPI()
  }, []);

    const columns = useMemo(
      () => [
        {
          // first group - TV Show
          Header: 'TV Show',
          // First group columns
          columns: [
            {
              Header: '#',
              accessor: 'show.serial',
            },
            {
              Header: 'Name',
              accessor: 'show.name',
            },
            {
              Header: 'Email',
              accessor: 'show.email',
            },
            {
              Header: 'Contact',
              accessor: 'show.contact',
            },
            {
              Header: 'Subscribed',
              accessor: 'show.subscribed',
            },
          ],
        },
      ],
      []
    );

    useEffect(() => {
      window.addEventListener('resize', updateMedia);
      return () => window.removeEventListener('resize', updateMedia);
    });
  return (
    <div id="body-div">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isDesktop ? (
                <div className="desktop-home-page">
                  <DesktopBanner />
                  <DesktopForm />
                </div>
              ) : (
                <>
                  <Banner />
                  <Form />
                </>
              )}
            </>
          }
        />
        <Route
          path="/table"
          element={
            <>
              {isDesktop ? (
                <TableComponent data={data} handleUpdate={handleUpdate} />
              ) : (
                <TableMobileComponent data={data} handleUpdate={handleUpdate} />
              )}
            </>
          }
        />
        {/* <Route path="/crm" element={<CRM />} /> */}
        {/* <Route path="/react-table" element={<ReactTable columns={columns} />} /> */}
        {/* <Route path="/table" element={<TableComponent data={data} handleUpdate={handleUpdate} />} /> */}
      </Routes>
    </div>
  );
}

export default App