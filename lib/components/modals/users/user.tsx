import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../../../hooks/use_auth";
import theme from "../../../styles/theme";
import { ModalProps, ResponseData, User, UserDeparment } from "../../../types";
import HttpClient from "../../../utils/http_client";
import LoadingContainer from "../../loading_container";

const initialUser: User = {
  id: null,
  userName: "",
  password: "",
  email: "",
  department: {
    name: "",
  },
  role: 1,
  name: "",
  identificationCard: "",
  dateBirth: "",
  age: 0,
  dateAdmission: "",
  position: "",
  cellphone: "",
};

interface Props extends ModalProps<User> {
  initialData?: User;
}

const UserModal = (props: Props) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<User>(initialUser);
  const [departments, setDepartments] = useState([]);

  const loadData = async () => {
    const response: ResponseData = await HttpClient(
      "/api/department/",
      "GET",
      auth.userName,
      auth.role
    );
    setDepartments(response.data ?? []);
  };

  const handleClose = () => {
    formik.resetForm({ values: initialUser });
    props.close();
  };

  // maneja los datos y comportamiento del formulario
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: User) => {
      setLoading(true);
      await props.onDone(formData);
      setLoading(false);
      handleClose();
    },
  });

  useEffect(() => {
    if (props.initialData) setInitialValues(props.initialData);
  }, [props.initialData]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal show={props.visible} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: theme.colors.red }}>
              Crear Nuevo Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoadingContainer visible={loading} miniVersion>
              <Form.Group>
                <Form.Label className="ml-5">Nombre del Trabajador</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Nombre del Trabajador"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <Form.Label className="ml-5 mt-3">Cedula o RUC</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="CI o RUC"
                  name="identificationCard"
                  onChange={formik.handleChange}
                  value={formik.values.identificationCard}
                />

                <Form.Label className="ml-5 mt-3">
                  Fecha de nacimiento
                </Form.Label>

                <Form.Control type="date" id="dateBirth" />

                <Form.Control
                  className="mt-3"
                  type="number"
                  name="age"
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  disabled
                />

                <Form.Label className="ml-5 mt-3">Nombre de Usuario</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />

                <Form.Label className="ml-5 mt-3">Contraseña</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />

                <Form.Label className="ml-5 mt-3">E-mail</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                <Form.Label className="ml-5 mt-3">Telefono celular</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ingrese el numero del trabajador"
                  name="cellphone"
                  onChange={formik.handleChange}
                  value={formik.values.cellphone}
                />

                <Form.Label className="ml-5 mt-3">Departamento</Form.Label>

                <Form.Select
                  aria-label="Default select department"
                  name="department.name"
                  onChange={formik.handleChange}
                  value={formik.values?.department.name ?? ""}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccione un departamento
                  </option>
                  {departments.map((depart: UserDeparment, index: number) => (
                    <option key={index} value={depart.name}>
                      {depart.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Label className="ml-5 mt-3">Cargo ocupacional</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Cargo que ocupa"
                  name="position"
                  onChange={formik.handleChange}
                  value={formik.values.position}
                />

                <Form.Label className="ml-5 mt-3">Fecha de ingreso</Form.Label>

                <Form.Control
                  type="date"
                  placeholder="Fecha de ingreso"
                  name="dateAdmission"
                  onChange={formik.handleChange}
                  value={formik.values.dateAdmission}
                />

                <Form.Label className="ml-5 mt-3">Tipo de Rol</Form.Label>

                <Form.Select
                  aria-label="Default select role"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  defaultValue={1}
                >
                  <option value={1}>Solicitante</option>
                  <option value={2}>Contabilidad</option>
                  <option value={3}>Tesoreria</option>
                  <option value={4}>Financiero</option>
                  <option value={5}>Gerencia</option>
                  <option value={6}>Pagos</option>
                  <option value={7}>Anticipo</option>
                </Form.Select>
              </Form.Group>
            </LoadingContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="outline-danger" type="submit">
              Guardar Usuario
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
