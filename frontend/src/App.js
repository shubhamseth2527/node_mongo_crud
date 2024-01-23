import { Container, Col, Row } from "react-bootstrap";
import Register from './components/register/Register';
import Login from './components/login/Login';
import "./App.css";

function App() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Register/>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Login/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
