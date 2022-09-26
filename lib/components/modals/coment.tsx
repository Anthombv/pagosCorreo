import FormatedDate from "../../utils/formated_date";
import { ModalProps, ResponseData, Comment } from "../../types";
import { useAuth } from "../../hooks/use_auth";
import { useEffect, useState } from "react";
import HttpClient from "../../utils/http_client";
import { Formik, useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import LoadingContainer from "../loading_container";
import theme from "../../styles/theme";
import { toast } from "react-toastify";
import Router from "next/router";

interface Props extends ModalProps<Comment> {
  initialData?: Comment;
}

const ComentModal = (props: Props) => {
  const { auth } = useAuth();
  const [initialValues, setInitialValues] = useState<Comment>({
    id: null,
    userComment: auth?.userName,
    dateComment: FormatedDate(),
    messageComment: "",
  });

  const handleClose = () => {
    formik.resetForm({ values: initialValues });
    props.close();
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: Comment) => {
      if(formData.messageComment.trim() === '') {
        toast.warning('El comentario no puede estar vacío');
        return
      }
      await props.onDone(formData);
      handleClose();
    },
  });

  useEffect(() => {
    if (props.initialData) setInitialValues(props.initialData);
  }, [props.initialData]);

  return (
    <>
      <Modal show={props.visible} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "dark" }}>
              Comentario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label className="ml-5">Nombre</Form.Label>

              <Form.Control
                placeholder="Nombre"
                name="userComment"
                onChange={formik.handleChange}
                value={formik.values.userComment ?? ""}
                disabled
              />

              <Form.Label className="ml-5 mt-3">Fecha</Form.Label>

              <Form.Control
                name="dateComment"
                onChange={formik.handleChange}
                value={formik.values.dateComment ?? ""}
                disabled
              />

              <Form.Label className="ml-5 mt-3">Comentario</Form.Label>

              <Form.Control
                as = "textarea"
                style={{height: "100px", textAlign: "left"}}
                placeholder="Comentario"
                name="messageComment"
                onChange={formik.handleChange}
                value={formik.values.messageComment ?? ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="outline-danger" type="submit">
              Guardar Comentario
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default ComentModal;
