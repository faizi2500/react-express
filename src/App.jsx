import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import CRM from './components/CRM'
import { DesktopBanner } from './components/DesktopBanner'
import DesktopForm from './components/DesktopForm'
import Form from './components/Form'

const App = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 850);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 850);
  };

    useEffect(() => {
      window.addEventListener('resize', updateMedia);
      return () => window.removeEventListener('resize', updateMedia);
    });
  return (
    <div id='body-div'>
      <Routes>
        <Route path='/' element={
          (
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
          )
          // <>
          //   <Banner />
          //   <Form />
          // </>
        }
        />
        <Route path='/crm' element={
          <CRM/>
        }
        />
      </Routes>
    </div>
  )
}

export default App