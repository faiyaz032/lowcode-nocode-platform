import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import FormContainer from './components/form-container/form-container.component';
import FormForCrud from './components/formForCrud/formForCrud.component';
import SideBar from './components/sidebar/sidebar.component';
import CrudItem from './pages/crudItem/crudItem.page';

import WelcomeScreen from './components/welcome-screen/welcomeScreen.component';
import ErrorPage from './pages/404page/error.page';
import CrudItemEdit from './pages/crudItem-edit/crudItem-edit-page.component';
import Login from './pages/login/login.page';
import BearerContext from './utilities/contexts/bearerContext/bearerContext';
import UserContext from './utilities/contexts/userContexts/userContext';

function App() {
  const [sideMenus, setSideMenus] = useState(undefined);
  const [bearer, setBearer] = useState(null);
  const location = useLocation();
  console.log(location.pathname.includes('*'));

  console.log(process.env.REACT_APP_SEVER_URL);

  useEffect(
    function () {
      if (bearer?.token) {
        fetch(`${process.env.REACT_APP_SEVER_URL}/api/crud`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearer.token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (data.message?.includes('expired')) {
              alert('Your login has expired. Please logout and login again');
              return;
            }

            setSideMenus([...data.crudItems]);
          });
      } else {
        const prevBearer = JSON.parse(localStorage.getItem('user'));
        if (prevBearer) {
          setBearer(prevBearer);
        }
      }
    },
    [bearer]
  );
  return (
    <BearerContext.Provider value={{ bearer: bearer?.token, setBearer }}>
      <>
        <div className="App">
          {sideMenus && location.pathname !== '/login' && !location.pathname.includes('*') ? (
            <SideBar sideMenus={sideMenus} perm={bearer?.perm} />
          ) : (
            ''
          )}
          <Routes>
            <Route
              path="/"
              element={
                bearer?.perm ? (
                  <FormContainer
                    title="Crud Name"
                    setSideMenus={setSideMenus}
                    sideMenus={sideMenus}
                    DataForm={FormForCrud}
                  />
                ) : (
                  <WelcomeScreen />
                )
              }
            ></Route>
            <Route path="/login" element={<Login setBearer={setBearer} />}></Route>
            <Route
              path="/crudItem/:crudItem"
              element={
                bearer?.token ? (
                  <UserContext.Provider value={sideMenus}>
                    <CrudItem />
                  </UserContext.Provider>
                ) : (
                  ''
                )
              }
            ></Route>
            <Route
              path="/crudItem/edit/:crudItem"
              element={bearer?.perm ? <CrudItemEdit /> : <ErrorPage />}
            ></Route>
            {/* <Route path='/crudItem/edit/:crudItem' element={<CrudItemEdit />}></Route> */}
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
      </>
    </BearerContext.Provider>
  );
}

export default App;
