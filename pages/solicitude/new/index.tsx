import React, { useEffect, useState } from "react";
import { ResponseData, Solicitude } from "../../../lib/types";
import NavBar from "../../../lib/components/navbar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../../../lib/hooks/use_auth";
import FormatedDate from "../../../lib/utils/formated_date";
import { useFormik } from "formik";
import Router from "next/router";
import HttpClient from "../../../lib/utils/http_client";
import { toast } from "react-toastify";
import LoadingContainer from "../../../lib/components/loading_container";
import RoleLayout from "../../../lib/layouts/role_layout";
import Footer from "../../../lib/components/footer";
import { Pendiente } from "../../../lib/utils/constants";

// Inicio de la app
const NewFacture = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, _setInitialValues] = useState<Solicitude>({
    number: 0,
    soliciter: auth?.name,
    typePermissions: "",
    details: "",
    dateState: FormatedDate(),
    state: Pendiente,
    date: FormatedDate(),
    dateS: "",
    dateE: "",
  });
  const formik = useFormik<Solicitude>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: Solicitude) => {
      if (formData.typePermissions.trim() === "") {
        toast.warning("Ingrese un tipo de Permiso");
        return;
      }
      if (formData.details.trim() === "") {
        toast.warning("Ingrese un detalle");
        return;
      }
      //if(formData.dateS.trim() === ''){
      //  toast.warning('Este campo es obligatorio');
      //  return
      //}
      //if(formData.dateE.trim() === ''){
      //  toast.warning('Este campo es obligatorio');
      //  return
      //}
      setLoading(true);
      const response: ResponseData = await HttpClient(
        "/api/solicitude",
        "POST",
        auth.userName,
        auth.role,
        { ...formData }
      );
      if (response.success) {
        toast.success("Solicitud creada correctamente!");
      } else {
        toast.warning(response.message);
      }
      setLoading(false);
      Router.back();
    },
  });

  return (
    <RoleLayout permissions={[0, 1]}>
      <title>Solicitud Vacaciones</title>
      <NavBar />
      <div
        style={{
          fontFamily: "sans-serif",
          height: "100vh",
          display: "flex",
          background: "rgba(203, 198, 199, 0.8)",
          flexDirection: "column",
        }}
      >
        <LoadingContainer visible={loading} miniVersion>
          <Container className="rounded shadow">
            <div className="mt-3 mb-3" style={{background: "white"}}>
            <Row 
              style={{
                display: "flex",
                padding: "2em",
                margin: "auto",
                }}>
            <h1 className="text-danger mb-4 mt-4 text-center">
              SOLICITUD DE VACACIONES
            </h1>
              <Col lg={5} md={3}>
                <Form.Group className="mt-2" style={{ width: "450px" }}>
                  <Form.Label>Solicitante</Form.Label>
                  <Form.Control
                    style={{ fontSize: "14px" }}
                    type="text"
                    placeholder="Solicitante"
                    value={formik.values.soliciter}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={3}>
                <Form.Group className="mt-2">
                  <Form.Label>Tipos de Vacaciones</Form.Label>
                  <Form.Select
                    style={{ fontSize: "14px" }}
                    name="typePermissions"
                    value={formik.values?.typePermissions}
                    onChange={formik.handleChange}
                  >
                    <option>Seleccione una opción</option>
                    <option value="Vacaciones Anticipadas">
                      Vacaciones Anticipadas
                    </option>
                    <option value="Vacaciones Tomadas">
                      Vacaciones Anuales
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={3} md={2}>
                <Form.Group className="mt-2" style={{ width: "180px" }}>
                  <Form.Label>Fecha de Creación</Form.Label>
                  <Form.Control
                    style={{ fontSize: "14px" }}
                    type="text"
                    value={formik.values.date ?? ""}
                    name="date"
                    onChange={formik.handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col lg={5} md={3}>
                <Form.Group className="mt-2">
                  <Form.Label>Detalle</Form.Label>
                  <br />
                  <textarea
                    style={{ width: "450px", fontSize: "14px" }}
                    placeholder="Escriba aquí el detalle de su solicitud..."
                    value={formik.values.details ?? ""}
                    name="details"
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mt-2" style={{ width: "200px" }}>
                <Form.Group style={{ width: "180px" }}>
                  <Form.Label>Fecha de Salida</Form.Label>
                  <Form.Control
                    type="date"
                    style={{ fontSize: "14px" }}
                    value={formik.values.dateS ?? ""}
                    name="dateS"
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mt-2" style={{ width: "200px" }}>
                <Form.Group style={{ width: "180px" }}>
                  <Form.Label>Fecha de Entrada</Form.Label>
                  <Form.Control
                    type="date"
                    style={{ fontSize: "14px" }}
                    value={formik.values.dateE ?? ""}
                    name="dateE"
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div>
              <Button
                variant="outline-danger"
                className="px-5 m-5  py-3"
                onClick={() => Router.push({ pathname: "/" })}
              >
                Volver
              </Button>
              <Button
                className="px-3 py-3"
                variant="outline-danger"
                onClick={() => formik.handleSubmit()}
              >
                Guardar SOLICITUD
              </Button>
            </div>
            </div>
          </Container>
        </LoadingContainer>
      </div>
      <Footer />
    </RoleLayout>
  );
};
export default NewFacture;
