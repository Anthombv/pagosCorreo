import { Nav, Tab } from 'react-bootstrap';
import { NavStyler } from './styles'

export type TabPanel = {
  name: string,
  content: React.ReactNode
}

type Props = {
  tabPanels: Array<TabPanel>
  style?: React.CSSProperties
}

function TabContainer({ tabPanels, style }: Props) {
  return (
    <NavStyler style={style}>
      <Tab.Container id="tab-container" defaultActiveKey={0}>
        <Nav justify variant="tabs" className="flex-row">
          {tabPanels.map((tab, index) => (
            <Nav.Item key={index}>
              <Nav.Link eventKey={index}>{tab.name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {tabPanels.map((tab, index) => (
            <Tab.Pane key={index} eventKey={index}>
              {tab.content}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </NavStyler>
  );
}

export default TabContainer;