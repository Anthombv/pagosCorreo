/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useFormik } from "formik";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { useAuth } from "../../hooks/use_auth";
import { LoginData } from "../../types";
import HttpClient from "../../utils/http_client";
import { toast } from "react-toastify";
import LoadingContainer from "../../components/loading_container";

// login de la app
const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // llama la funcion para iniciar sesion
  const { login } = useAuth();

  // valores del formulario
  const [initialValues, _setInitialValues] = useState<LoginData>({
    userName: "",
    password: "",
  });

  // envia los datos del formulario
  const onSubmit = async (formData: LoginData) => {
    setLoading(true);
    const response = await HttpClient("/api/login", "POST", "", -1, formData);
    if (response.success) {
      const data = response.data;
      login(data);
    } else {
      toast.warning(response.message);
    }
    setLoading(false);
  };

  // maneja los datos y comportamiento del formulario
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit,
  });

  return (
    <>
      <title>Inicio de sesión</title>
      <LoadingContainer visible={loading} miniVersion>
        <div
          style={{
            fontFamily: "sans-serif",
            height: "100vh",
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(81, 11, 18, 0.8) 0%, rgba(188, 27, 42, 0.8) 35%, rgba(208, 109, 118, 0.8) 100%)",
            flexDirection: "column",
          }}
        >
          <Container className="w-75 rounded shadow">
            <Row
              className="align-items-stretch"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "2em",
              }}
            >
              <Col
                className="d-none d-lg-block col-md-5 col-lg-5 col-xl-5 rounded"
                style={{
                  backgroundImage: `url(${"Foto12.jpg"})`,
                  backgroundPosition: "center center",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "24px",
                    textAlign: "center",
                    font: "bold",
                  }}
                >
                  Permisos
                </p>
              </Col>
              <Col className="bg-white p-5 rounded-end">
                <div className="text-center">
                  <img src="logo.jpeg" width="60" alt="" />
                </div>
                <Form onSubmit={formik.handleSubmit}>
                  <h2
                    style={{ color: "rgba(175, 35, 35, 0.8)" }}
                    className="fw-bold text-center py-5"
                  >
                    BIENVENIDO/A
                  </h2>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      Nombre de Usuario
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      placeholder="Ingrese su usuario"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      placeholder="Ingrese su contraseña"
                    />
                  </Form.Group>
                  <Button type="submit" variant="outline-danger mt-3">
                    Iniciar sesion
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </LoadingContainer>
    </>
  );
};

export default Login;
