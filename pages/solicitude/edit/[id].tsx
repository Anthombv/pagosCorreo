import React, { useEffect, useState } from "react";
import { ResponseData, Solicitude } from "../../../lib/types";
import NavBar from "../../../lib/components/navbar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import HttpClient from "../../../lib/utils/http_client";
import { toast } from "react-toastify";
import Router from "next/router";
import LoadingContainer from "../../../lib/components/loading_container";
import { useAuth } from "../../../lib/hooks/use_auth";
import { TabPanel } from "../../../lib/components/tab_container";
import SoliciterPanel from "../../../lib/layouts/edit_solicitude/soliciter";
import {Pendiente} from "../../../lib/utils/constants";
import Footer from "../../../lib/components/footer";
import FormatedDate from "../../../lib/utils/formated_date";

// Inicio de la app
const EditFacture = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<Solicitude>({
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

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      setLoading(true);
      const solicitudeId = Router.query.id as string;
      const response: ResponseData = await HttpClient(
        "/api/solicitude/" + solicitudeId,
        "GET",
        auth.userName,
        auth.role
      );
      setInitialValues(response.data);
      setLoading(false);
    } else {
      setTimeout(loadData, 1000);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData: Solicitude) => {
    if (Router.asPath !== Router.route) {
      setLoading(true);
      const solicitudeId = Router.query.id as string;
      const requestData = {
        ...formData,
        id: solicitudeId,
      };
      const response: ResponseData = await HttpClient(
        "/api/solicitude",
        "PUT",
        auth.userName,
        auth.role,
        requestData
      );
      if (response.success) {
        toast.success("Solicitud editada correctamente!");
        await loadData();
      } else {
        toast.warning(response.message);
      }
      setLoading(false);
    } else {
      setTimeout(onSubmit, 1000);
    }
  };

  const formik = useFormik<Solicitude>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit,
  });

  const printSolicitude = () => {
    if (Router.asPath !== Router.route) {
      const solicitudeId = Router.query.id as string;
      Router.push({ pathname: "/solicitude/print/" + solicitudeId });
    } else {
      setTimeout(printSolicitude, 1000);
    }
  };

  return (
    <>
      <title>Editar Solicitud</title>
      <NavBar />
      <Container>
        <LoadingContainer visible={loading} miniVersion>
          <h1 className="text-danger mb-4 mt-4 text-center">
            Trabajador: {formik.values.soliciter}
          </h1>
          <Row className="mb-4">
            <Col lg={4} md={3}>
              <Form.Group className="mt-2" style={{ width: "400px" }}>
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
            <Col lg={2} md={3} style={{ width: "423px" }}>
              <Form.Group className="mt-2">
                <Form.Label>Tipos de Vacaciones</Form.Label>
                <Form.Select
                  style={{ fontSize: "14px" }}
                  name="typePermissions"
                  value={formik.values?.typePermissions}
                  onChange={formik.handleChange}
                  disabled
                >
                  <option>Seleccione una opción</option>
                  <option value="Vacaciones Anticipadas">
                    Vacaciones Anticipadas
                  </option>
                  <option value="Vacaciones Tomadas">Vacaciones Tomadas</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} style={{ width: "200px" }}>
              <Form.Group className="mt-2">
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
            <Col lg={4} md={3}>
              <Form.Group className="mt-2">
                <Form.Label>Detalle</Form.Label>
                <br />
                <textarea
                  style={{ width: "400px", fontSize: "14px" }}
                  placeholder="Escriba aquí el detalle de su solicitud..."
                  value={formik.values.details ?? ""}
                  name="details"
                  onChange={formik.handleChange}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col lg={5} md={3} className="mt-2" style={{ width: "200px" }}>
              <Form.Group style={{ width: "180px" }}>
                <Form.Label>Fecha de Salida</Form.Label>
                <Form.Control
                  type="date"
                  style={{ fontSize: "14px" }}
                  value={formik.values.dateS ?? ""}
                  name="dateS"
                  onChange={formik.handleChange}
                  disabled
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
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <div
            style={{
              width: "200px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <SoliciterPanel formik={formik} />
          </div>
          <Button
            className="mt-5 px-5"
            variant="outline-danger"
            onClick={() => formik.handleSubmit()}
          >
            Actualizar
          </Button>
        </LoadingContainer>
      </Container>
      <Footer />
    </>
  );
};

export default EditFacture;
