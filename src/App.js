import React, {Component, useEffect, useState, SyntheticEvent} from 'react';
import { Column, Row } from 'simple-flexbox';
import { useGlobalEvent } from "beautiful-react-hooks";
import { StyleSheet, css } from 'aphrodite';
import './App.css';
import Scroll from './Content/MainPage/Scroll'
import Sidebar from './Content/SIdebar/SideBar';
import HeaderComponent from './Content/Header/HeaderComponent'
import Card from './Content/MainPage/Cards/Dashboard/Cards';
import SaasCard from './Content/MainPage/Cards/Sophosaas/SaasCard';
import Login from './Content/Login/Login/Login';
import FwbCards from './Content/MainPage/Cards/Fixed-wireless/fwbCard';
import CreateSubscriber from './Content/MainPage/Cards/Sophosaas/CreateSubscriber/CreateSubscriber.1';
import Decommission from './Content/MainPage/Cards/Sophosaas/Decommission/Decommision';
import FwbCreate from './Content/MainPage/Cards/Fixed-wireless/Create_Subscriber/CreateSubscriber.1';
import QuerySubscriber from './Content/MainPage/Cards/Fixed-wireless/Query_Subscriber/querySub'

const styles = StyleSheet.create({
  container: {
      height: '100%',
      minHeight: '100vh'
  },
  content: {
      marginTop: 54
  },
  mainBlock: {
      backgroundColor: '#F7F8FC',
      marginLeft: 255,
      padding: 30,
      borderBottom: '30px',
      '@media(max-width: 768px)':{
        marginLeft:0
      }
  }
});

function App () {
  
  function usePersistedState(key, defaultValue) {
    const [state, setState] = React.useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }
  const [selectedItem, setselectedItem] = usePersistedState('selectedItem','Login');
  const [isSignedIn, setisSignedIn] = usePersistedState('isSignedIn',false);;
  const [auth_token, setauth_token] = usePersistedState('auth_token',"");
  const [name, setname] = usePersistedState('name',"");
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((event: React.SyntheticEvent) => {
    setWindowWidth(window.innerWidth);
  });
  useEffect(() => {
  })

  return (
      <div>
        <Row className={css(styles.container)}>
                  <Sidebar selectedItem={selectedItem} 
                          onChange={(selectedItem) => setselectedItem(selectedItem)}
                          isSignedIn={isSignedIn}  />
                  <Column flexGrow={1} className={css(styles.mainBlock)}>
                  <HeaderComponent title={selectedItem} 
                          onChange={(selectedItem) => setselectedItem(selectedItem)} 
                          auth_token={auth_token} 
                          isSignedin={isSignedIn}
                          user_name = {name}
                          onSignChange={(isSignedIn) => setisSignedIn(isSignedIn)}
                          />
                      {
                        selectedItem === 'Login'? 
                        <Login ClassName={css(styles.content)} 
                            isSignedIn={isSignedIn}
                            auth_token={auth_token} 
                            onChange={(isSignedIn) => setisSignedIn(isSignedIn)}
                            tokenChange={(auth_token) => setauth_token(auth_token)}
                            onSignChange={(selectedItem)=> setselectedItem(selectedItem)}
                            nameChange={(name) => setname(name)}
                            />
                        : selectedItem === 'Sophos as a Service' && isSignedIn === true ? 
                        <SaasCard ClassName={css(styles.content)}
                          auth_token={auth_token}
                        />
                        : selectedItem === 'Dashboard' && isSignedIn === true?
                        <Card ClassName={css(styles.content)} selectedItem={selectedItem} 
                        onChange={(selectedItem) => setselectedItem({ selectedItem })} 
                        auth_token={auth_token}/>
                        : selectedItem === 'Fixed Wireless Broadband' && isSignedIn === true?
                        <FwbCards auth_token={auth_token}/>
                        : selectedItem === 'Sophos > Create Subscriber' && isSignedIn === true?
                        <CreateSubscriber auth_token={auth_token}/>
                        : selectedItem === 'Sophos > Decommission' && isSignedIn === true?
                        <Decommission auth_token={auth_token}/>
                        : selectedItem === 'Fwb > Create Subscriber' && isSignedIn === true?
                        <FwbCreate auth_token={auth_token}
                        onChange={(selectedItem) => setselectedItem(selectedItem)}
                        />
                        : selectedItem === 'Fwb > Query Subscriber' && isSignedIn === true?
                        <QuerySubscriber auth_token={auth_token}/>
                        :<Login ClassName={css(styles.content)} 
                        isSignedIn={isSignedIn}
                        auth_token={auth_token} 
                        onChange={(isSignedIn) => setisSignedIn({ isSignedIn })}
                        tokenChange={(auth_token) => setauth_token({auth_token})}
                        />
                      }
                  </Column>
              </Row>
      </div>
      );
    }


export default App;