import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../../hooks/use_auth";
import theme from "../../styles/theme";
import {
  FactureAdvance,
  FactureCenter,
  FactureProject,
  FactureProvider,
  ModalProps,
  ResponseData,
} from "../../types";
import { CheckPermissions } from "../../utils/check_permissions";
import HttpClient from "../../utils/http_client";

const initialFactureAdvance: FactureAdvance = {
  id: null,
  //Solicitante
  project: {
    name: "",
  },
  centerCost: {
    name: "",
  },
  provider: {
    name: "",
  },
  details: "",
  value: 0,
  file: null,
  observation: "",
  typeCard: "",
  codBank: "",
  typeProv: "",
  //Tesoreria
  beneficiary: "",
  identificationCard: "",
  bank: "",
  accountBank: "",
  accountType: "",
  numberCheck: "",
  bankCheck: "",
  discount: 0,
  //Financiero
  typePayments: "",
  payments: "",
  //Tesoreria 2
  difference: 0,
  accreditedPayment: 0,
  //Contabilidad
  documentDelivered: "",
  factureDate: "",
  factureNumber: 0,
  numberRetention: 0,
  valueRetention: 0,
  valueNet: 0,
  observationConta: "",
};

interface Props extends ModalProps<FactureAdvance> {
  initialData?: FactureAdvance;
}

const FactureAdvanceModal = (props: Props) => {
  const { auth } = useAuth();
  const [initialValues, setInitialValues] = useState<FactureAdvance>(
    initialFactureAdvance
  );
  const [image, setImage] = useState<File>(null);
  const [treasuryImage, setTreasuryImage] = useState<File>(null);
  const [projects, setProjects] = useState([]);
  const [providers, setProviders] = useState([]);
  const [centers, setCenters] = useState([]);
  const [clients, setClients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const loadClients = async () => {
    const response: ResponseData = await HttpClient(
      "/api/client/",
      "GET",
      auth.userName,
      auth.role
    );
    setClients(response.data ?? []);
  };

  const OnSuggestHandler = (text: string, field: string) => {
    formik.setFieldValue(field, text);
    setSuggestions([]);
  };

  const onChangeHandler = (
    text: string,
    field: string,
    suggestions: Array<any>,
    name: boolean = true
  ) => {
    let matches = [];
    if (text.length > 0) {
      matches = suggestions.filter((element) => {
        const regex = new RegExp(`${text}`, "gi");
        return name
          ? element.name.match(regex)
          : element.beneficiary.match(regex);
      });
    }
    setSuggestions(matches);
    formik.setFieldValue(field, text);
  };


  const loadProjects = async () => {
    const response: ResponseData = await HttpClient(
      "/api/project/",
      "GET",
      auth.userName,
      auth.role
    );
    setProjects(response.data ?? []);
  };

  const loadProviders = async () => {
    const response: ResponseData = await HttpClient(
      "/api/provider/",
      "GET",
      auth.userName,
      auth.role
    );
    setProviders(response.data ?? []);
  };

  const loadCenters = async () => {
    const response: ResponseData = await HttpClient(
      "/api/centro_costos/",
      "GET",
      auth.userName,
      auth.role
    );
    setCenters(response.data ?? []);
  };

  const handleClose = () => {
    formik.resetForm({ values: initialFactureAdvance });
    setImage(null);
    props.close();
  };

  const formik = useFormik<FactureAdvance>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: FactureAdvance) => {
      const file = image ?? props.initialData?.file;
      const treasuryFile = treasuryImage ?? props.initialData?.treasuryFile;
      if (file !== null && treasuryFile != null) {
        await props.onDone({ ...formData, file, treasuryFile });
      } else if (file !== null) {
        await props.onDone({ ...formData, file });
      } else if (treasuryFile !== null) {
        await props.onDone({ ...formData, treasuryFile });
      } else {
        await props.onDone(formData);
      }
      handleClose();
    },
  });

  useEffect(() => {
    if (props.initialData) setInitialValues(props.initialData);
  }, [props.initialData]);

  useEffect(() => {
    formik.setFieldValue(
      "valueNet",
      formik.values.value - formik.values?.valueRetention  ?? 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values?.value, formik.values?.valueRetention]);

  useEffect(() => {
    formik.setFieldValue(
      "difference",
      formik.values?.valueNet - formik.values?.accreditedPayment - formik.values?.discount ?? 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values?.valueNet, formik.values?.accreditedPayment, formik.values?.discount]);

  useEffect(() => {
    loadClients();
    loadProjects();
    loadProviders();
    loadCenters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal show={props.visible} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: theme.colors.red }}>
              Crear Nuevo Items
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              {CheckPermissions(auth, [0, 1]) && (
                <>
                  <Form.Label className="ml-5">Proyecto</Form.Label>
                  <Form.Select
                    name="project.name"
                    value={formik.values?.project.name}
                    onChange={formik.handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccione un proyecto
                    </option>
                    {projects.map((projec: FactureProject, index: number) => (
                      <option key={index} value={projec.name}>
                        {projec.name}
                      </option>
                    ))}
                  </Form.Select>
                </>
              )}
               {CheckPermissions(auth, [0, 1]) && (
                <div>
                  <Form.Label className="ml-5 mt-3">
                    Centro de Costos
                  </Form.Label>
                  <Form.Control
                  type="text"
                  placeholder=" Digite un Centos de Costos"
                  value={formik.values?.centerCost.name}
                  onChange={(e) =>
                    onChangeHandler(e.target.value, "centerCost.name", centers)
                  }
                />
                  {suggestions &&
                  suggestions.map((suggestionC, e) => (
                    <div
                      key={e}
                      style={{cursor: "pointer"}}
                      onClick={() =>
                        OnSuggestHandler(suggestionC.name, "centerCost.name")
                      }
                    >
                      {suggestionC.name}
                    </div>
                  ))}
              </div>
              )}
              {CheckPermissions(auth, [0, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Proveedor</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="provider.name"
                    value={formik.values?.provider.name}
                    onChange={formik.handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccione un proveedor
                    </option>
                    {providers.map(
                      (provider: FactureProvider, index: number) => (
                        <option key={index} value={provider.name}>
                          {provider.name}
                        </option>
                      )
                    )}
                  </Form.Select>
                </>
              )} 
              {CheckPermissions(auth, [0, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Detalles</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Detalle de Factura"
                    name="details"
                    value={formik.values?.details ?? "" }
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 1, 2]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Valor</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Valor de Factura"
                    name="value"
                    value={formik.values?.value ?? 0}
                    onChange={formik.handleChange}
                  />
                </>
              )}
               {CheckPermissions(auth, [0, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Observacion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escriba una observacion"
                    name="observation"
                    value={formik.values?.observation ?? ""}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 3, 1]) && (
                <div>
                  <Form.Label className="ml-5 mt-3">Beneficiario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite un Beneficiario"
                    value={formik.values?.beneficiary}
                    onChange={(e) =>
                      onChangeHandler(
                        e.target.value,
                        "beneficiary",
                        clients,
                        false
                      )
                    }
                  />
                  {suggestions &&
                    suggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          OnSuggestHandler(
                            suggestion.beneficiary,
                            "beneficiary"
                          );
                          formik.setFieldValue("bank", suggestion.bank);
                          formik.setFieldValue(
                            "accountBank",
                            suggestion.accountBank
                          );
                          formik.setFieldValue(
                            "accountType",
                            suggestion.accountType
                          );
                          formik.setFieldValue(
                            "identificationCard",
                            suggestion.identificationCard
                          );
                          formik.setFieldValue(
                            "codBank",
                            suggestion.codBank
                          )
                          formik.setFieldValue(
                            "typeCard",
                            suggestion.typeCard
                          )
                        }}
                      >
                        {suggestion.beneficiary}
                      </div>
                    ))}
                </div>
              )}
              {CheckPermissions(auth, [0, 3, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Cedula O RUC del Beneficiario
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="C.I. O RUC"
                    name="identificationCard"
                    value={formik.values?.identificationCard ?? ""}
                    onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 3, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Banco del Beneficiario
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="# de Cuenta Bancaria"
                    name="bank"
                    value={formik.values?.bank ?? ""}
                    onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 3, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Numero de Cuenta Bancaria
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="# de Cuenta Bancaria"
                    name="accountBank"
                    value={formik.values?.accountBank ?? ""}
                    onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 3, 1]) && (
                <>
                <Form.Label className="ml-5 mt-3">
                  Tipo de Cuenta Bancaria
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tipo de cuenta"
                  name="accountType"
                  value={formik.values?.accountType ?? ""}
                  onChange={formik.handleChange}
                  disabled
                />
              </>
              )}
                {CheckPermissions(auth, [0, 3, 1]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Código del Banco</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Codigo del banco"
                    name="codBank"
                    value={formik.values?.codBank ?? ""}
                    onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
               {CheckPermissions(auth, [0, 1, 3]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Tipo de identificación
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cedula o RUC"
                    name="typeCard"
                    value={formik.values?.typeCard ?? ""}
                    onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 3]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Elegir Prov o Nomina
                  </Form.Label>
                  <Form.Select
                    name="typeProv"
                    value={formik.values?.typeProv}
                    onChange={formik.handleChange}
                  >
                    <option>Seleccione Prov o Nomina</option>
                    <option value="NOMINA">NOMINA</option>
                    <option value="PROV">PROV</option>
                  </Form.Select>
                </>
              )}
              {CheckPermissions(auth, [0, 1, 3]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Tipo de Pago</Form.Label>
                  <Form.Select 
                    name="typePayments"
                    value={formik.values?.typePayments}
                    onChange={formik.handleChange}
                  >
                    <option>Seleccione un tipo de pago</option>
                    <option value="CHEQUE">CHEQUE</option>
                    <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                  </Form.Select>
                </>
              )}
              {CheckPermissions(auth, [0, 3]) && (
                <>
                  <Form.Label>Número del Cheque</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Digite el numero del cheque"
                    name="numberCheck"
                    value={formik.values?.numberCheck ?? ""}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 3]) && (
                <>
                  <Form.Label>Banco del Cheque</Form.Label>
                  <Form.Select
                    name="bankCheck"
                    value={formik.values?.bankCheck}
                    onChange={formik.handleChange}
                  >
                    <option>Seleccione el banco del Cheque</option>
                    <option value="PICHINCHA">PICHINCHA</option>
                    <option value="BGR">BGR</option>
                  </Form.Select>
                </>
              )}
              {CheckPermissions(auth, [0, 4]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Pago</Form.Label>
                  <Form.Select
                    name="payments"
                    value={formik.values?.payments}
                    onChange={formik.handleChange}
                  >
                    <option>Seleccione una opción</option>
                    <option value="APROBADO">APROBADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                  </Form.Select>
                </>
              )}
              {CheckPermissions(auth, [0, 6]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Pago Acreditado</Form.Label>
                  <Form.Control
                    type="number"
                    name="accreditedPayment"
                    value={formik.values?.accreditedPayment ?? 0}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 6]) && (
                <>
                  <Form.Label>Descuento</Form.Label>
                  <Form.Control 
                    type="number"
                    name="discount"
                    value={formik.values?.discount ?? 0}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 6]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Diferencia</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    name="difference"
                    value={formik.values?.difference ?? 0}
                    // onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
               {CheckPermissions(auth, [0, 6]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Adjuntar imagen de la Factura
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Seleccione un archivo"
                    name="treasuryFile"
                    onChange={(event: any) => {
                      setTreasuryImage(event.target.files[0]);
                    }}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 7]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Adjuntar imagen del pago
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Seleccione un archivo"
                    name="file"
                    onChange={(event: any) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 7]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Documento</Form.Label>
                  <Form.Select
                    name="documentDelivered"
                    value={formik.values?.documentDelivered}
                    onChange={formik.handleChange}
                  >
                    <option>Seleccione un Documento</option>
                    <option value="Factura Electronica">
                      Factura Electrónica
                    </option>
                    <option value="Copia">Copia</option>
                    <option value="Factura Original">Factura Original</option>
                    <option value="Liquidacion de compra">Liquidación de compra</option>
                    <option value="N/A">N/A</option>
                  </Form.Select>
                </>
              )}
              {CheckPermissions(auth, [0, 7]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Fecha de Factura
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Fecha de Factura"
                    name="factureDate"
                    value={formik.values?.factureDate ?? ""}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 7]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Numero de Factura
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Numero de Factura"
                    name="factureNumber"
                    value={formik.values?.factureNumber ?? 0}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 2]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Numero de Retencion
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Numero de retencion"
                    name="numberRetention"
                    value={formik.values?.numberRetention ?? 0}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 2]) && (
                <>
                  <Form.Label className="ml-5 mt-3">
                    Valor de Retencion
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Valor de Retencion"
                    name="valueRetention"
                    value={formik.values?.valueRetention ?? 0}
                    onChange={formik.handleChange}
                  />
                </>
              )}
              {CheckPermissions(auth, [0, 2]) && (
                <>
                  <Form.Label className="ml-5 mt-3">Valor Pagado</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Valor Pagado"
                    name="valueNet"
                    value={formik.values?.valueNet ?? 0}
                    // onChange={formik.handleChange}
                    disabled
                  />
                </>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="outline-danger" type="submit">
                Guardar Item
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FactureAdvanceModal;
