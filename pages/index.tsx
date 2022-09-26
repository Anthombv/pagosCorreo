import React from "react";
import NavBar from "../lib/components/navbar";
import { Container } from "react-bootstrap";
import Footer from "../lib/components/footer";
import BGRPanel from "../lib/layouts/config/bgr";
import TabContainer, { TabPanel } from "../lib/components/tab_container";
import PichinchaPanel from "../lib/layouts/config/pichincha";

// Inicio de la app
const Home = () => {
  const tabPanels: Array<TabPanel> = [
    {
      name: 'PICHINCHA',
      content: <PichinchaPanel />
    },
    {
      name: 'BGR',
      content: <BGRPanel />
    },
  ]

  return (
    <>
      <NavBar />
      <Container>
        <h1 className="text-danger mb-4 mt-4 text-center">
          SOLICITUD
        </h1>
        <TabContainer tabPanels={tabPanels} style={{ padding: '40px 0' }} />
      </Container>
      <Footer />
    </>
  );
};
export default Home;