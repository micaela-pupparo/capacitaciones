import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap'
import TestingComponentsTab from '../tabs/TestingComponentsTab';
import TestingFormTab from '../tabs/TestingFormTab';

const Home = () => {
    const [key, setKey] = useState('home');
  return (
    <>
        <h1 className="text-center my-4">Pruebas de Testing</h1>
        <div className="container">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k!)}
              className="mb-3"
            >
              <Tab eventKey="home" title="Components">
                <div className="container">
                    <TestingComponentsTab></TestingComponentsTab>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Form">
                <TestingFormTab />
              </Tab>
              <Tab eventKey="contact" title="Contact">
                Tab content for Contact
              </Tab>
            </Tabs>
        </div>
    </>
  )
}

export default Home