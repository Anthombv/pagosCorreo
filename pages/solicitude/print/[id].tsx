/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import LoadingContainer from "../../../lib/components/loading_container";
import PdfContainer from "../../../lib/components/pdf_container";
import { useAuth } from "../../../lib/hooks/use_auth";
import { useWindowSize } from "../../../lib/hooks/use_window_size";
import theme from "../../../lib/styles/theme";
import { ResponseData, Solicitude } from "../../../lib/types";
import HttpClient from "../../../lib/utils/http_client";

const PrintSolicitude = () => {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(true);
  const [solicitude, setSolicitude] = useState<Solicitude>(null);
  const windowSize = useWindowSize();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      setLoading(true);
      const solicitudeId = Router.query.id as string;
      const response: ResponseData = await HttpClient(
        "/api/solicitude/" + solicitudeId,
        "GET", auth.userName, auth.role
      );
      setSolicitude(response.data);
      setLoading(false);
    } else {
      setTimeout(loadData, 1000);
    }
  };
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const facturesColumns: Array<string> = [
    "Proyecto",
    "Centro costos",
    "Proveedor",
    "Fecha",
    "# Factura",
    "Detalle",
    "Valor",
    "Documento",
    "# Retención",
    "Valor Retención",
    "Valor Pagado",
    "Beneficiario",
    "Cédula",
    "Banco Beneficiario",
    "# Cuenta",
    "Tipo Cuenta",
    "Tipo Pago",
    "Pago",
  ];

  return (
    <LoadingContainer visible={loading}>
      {solicitude === null ? (
        <div>Error al cargar los datos</div>
      ) : (
        <div>
          <PdfContainer ref={componentRef}>
            <div style={{ width: windowSize.width, minWidth: '500px', padding: "30px 0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <table width="100%">
                <tr>
                  <td>
                  <div style={{ paddingLeft: "10%", }}>
                    <h3
                      style={{
                        background: theme.colors.red,
                        padding: "20px 35px 20px 35px",
                        color: "white",
                        textAlign: "center",

                      }}>
                      DETALLE DE PAGOS SOLICITADOS</h3>
                  </div>
                </td>
                  <td>
                    <img
                      src="/logo_horizontal.png"
                      alt="logo"
                      style={{ width: "300px", height: "60px", marginLeft: "10em", marginBottom: "30px" }}
                    />
                  </td>
                </tr>
              </table> 
              <h3 style={{
                    margin: "0",
                    textAlign: 'center',
                    fontSize: '30px',
                    marginBottom:'10px'
                  }}>
                    SOLICITUD N° <strong style={{ fontSize: '48px' }}>  {solicitude.number} </strong>
                  </h3>

            <table width="95%" align='center' border={2}>
              <tr>
                <td style={{width: '20%'}}>
                  <p style={{ marginTop: '18px', marginLeft: '10px'}}><strong style={{marginRight: '80px'}}>SOLICITANTE: </strong> {solicitude.soliciter}</p>
                </td>
                <td style={{width: '14%'}}>
                  <p style={{ marginTop: '18px', }}><strong style={{marginRight: '35px'}}>SOLICITANTE:</strong>{solicitude.soliciterState}: {solicitude.applicantDate.split('  ')[0] ?? ''}</p>
                </td>
                <td style={{width: '10%'}}>
                  <p style={{ marginTop: '18px', marginLeft: '25%'}}><strong style={{marginRight: '70px'}}>Valor Total: </strong>${solicitude.items.reduce((partialSum, facture) => partialSum + facture.value, 0)}</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>
                  <p style={{ marginLeft: '10px'}}><strong style={{marginRight: '16px'}}>FECHA DE SOLICITUD: </strong>{solicitude.date.split('  ')[0]}</p>
                </td>
                <td>
                  <p><strong style={{marginRight: '18px'}}>CONTABILIDAD:</strong>{solicitude.contableState}: {solicitude.accountantDate.split('  ')[0] ?? ''}</p>
                </td>
                <td style={{width: '12%'}}>
                  <p style={{marginLeft: '25%'}}><strong style={{marginRight: '10px'}}>Valor Total a Pagar: </strong>${solicitude.items.reduce((partialSum, facture) => partialSum + facture.valueNet, 0)}</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '20%'}}> 
                  <p style={{ marginLeft: '10px'}}><strong style={{marginRight: '42px'}}>DETALLE GENERAL:</strong>{solicitude.details}</p> 
                </td>
                <td>
                  <p><strong style={{marginRight: '50px'}}>TESORERÍA:</strong>{solicitude.paymentTreasuryState}: {solicitude.treasuryDate.split('  ')[0] ?? ''}</p>
                </td>
                <td style={{width: '12%'}}>
                  <p style={{marginLeft: '25%'}}><strong style={{marginRight: '26px',}}>Pago Acreditado: </strong>${solicitude.items.reduce((partialSum, facture) => partialSum + facture.accreditedPayment, 0)}</p>
                </td>
              </tr>   
              <tr>
                <td>
                </td>
                <td>
                  <p><strong style={{marginRight: '35px'}}>FINANCIERO:</strong>  {solicitude.financialState}: {solicitude.financialDate.split('  ')[0] ?? ''}</p>
                </td>
                <td style={{width: '12%'}}>
                  <p className="text-danger" style={{marginLeft: '25%'}}><strong style={{marginRight: '80px'}}>Diferencia:</strong>${solicitude.items.reduce((partialSum, facture) => partialSum + facture.difference, 0)}</p>
                </td>
              </tr> 
              <tr>
                <td>
                </td>
                <td>
                  <p><strong style={{marginRight: '77px'}}>PAGOS:</strong>  {solicitude.imageTreasuryState}: {solicitude.contableAdvanceDate.split('  ')[0] ?? ''} </p>
                </td>
              </tr>                                    
            </table>
          </div>
            <Container fluid style={{ marginBottom: '40px', padding: '0 60px' }}>
              <Row>
                <Table responsive>
                  <thead>
                    <tr>
                      {facturesColumns.map((item, index) =>
                        <th
                          style={{
                            textAlign: 'center',
                            backgroundColor: "#8c130f",
                            color: 'white',
                            fontSize: '14px',
                            padding: '10px',
                            border: '1px solid black'
                          }}
                          key={index}>{item}
                        </th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {solicitude.items.map((item, index) =>
                      <tr style={{ border: '1px solid', fontSize: '14px', textAlign: 'center' }} key={index}>
                        <td style={{border: '1px solid' }} >{item.project?.name ?? ''}</td>
                        <td style={{border: '1px solid',  width: 100 }}>{item.centerCost?.name ?? ''}</td>
                        <td style={{border: '1px solid',  width: 120 }}>{item.provider?.name ?? ''}</td>
                        <td style={{border: '1px solid',  width: 90 }}>{item.factureDate ?? ''}</td>
                        <td style={{border: '1px solid',  width: 90 }}>{item.factureNumber ?? ''}</td>
                        <td style={{border: '1px solid',  width: 200, textAlign: 'left' }}>{item.details ?? ''}</td>
                        <td style={{border: '1px solid',  width: 150 }}>{item.value ?? ''}</td>
                        <td style={{border: '1px solid' }}>{item.documentDelivered ?? ''}</td>
                        <td style={{border: '1px solid',  width: 80 }}>{item.numberRetention ?? ''}</td>
                        <td style={{border: '1px solid',  width: 80 }}>{item.valueRetention ?? ''}</td>
                        <td style={{border: '1px solid', width: 120}}>{item.valueNet ?? ''}</td>
                        <td style={{border: '1px solid'}}>{item.beneficiary ?? ''}</td>
                        <td style={{border: '1px solid',  width: 80 }}>{item.identificationCard ?? ''}</td>
                        <td style={{border: '1px solid', width: 80}}>{item.bank ?? ''}</td>
                        <td style={{border: '1px solid',  width: 100 }}>{item.accountBank ?? ''}</td>
                        <td style={{border: '1px solid',  width: 60 }}>{item.accountType ?? ''}</td>
                        <td style={{border: '1px solid'}}>{item.typePayments ?? ''}</td>
                        <td style={{border: '1px solid',  width: 80}}>{item.payments ?? ''}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Row>
            </Container>
          </PdfContainer>
          <div>
            <br></br>
            <br></br>
            <Button style={{ marginLeft: '5%' }} onClick={handlePrint}>Imprimir PDF</Button></div>
            <br></br>
          <div><Button style={{ marginLeft: '5%', marginBottom: "3%"  }} onClick={() => Router.push({ pathname: "/" })}>Volver</Button></div>
        </div>
      )}
    </LoadingContainer>
    
  );
};

export default PrintSolicitude;
