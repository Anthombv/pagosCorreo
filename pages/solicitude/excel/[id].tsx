/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import LoadingContainer from "../../../lib/components/loading_container";
import { useAuth } from "../../../lib/hooks/use_auth";
import { useWindowSize } from "../../../lib/hooks/use_window_size";
import theme from "../../../lib/styles/theme";
import { ResponseData, Solicitude } from "../../../lib/types";
import HttpClient from "../../../lib/utils/http_client";
import ReactExport from "react-data-export";
import { Button, Row, Table } from "react-bootstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelSolicitude = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [solicitude, setSolicitude] = useState<Solicitude>(null);

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

  const DataSet  = [
    {
      columns: [
        {
          title: "Proyecto",
          style: { font: { sz: "13", bold: true } },
          width: { wch: 15 },
        }, // width in pixels
        {
          title: "Centro de costos",
          style: { font: { sz: "13", bold: true } },
          width: { wch: 15 },
        }, // width in characters
        {
          title: "Proveedor",
          style: { font: { sz: "13", bold: true } },
          width: { wch: 15 },
        }, // width in pixels
        {
          title: "Fecha",
          style: { font: { sz: "13", bold: true } },
          width: { wch: 10 },
        }, // width in pixels
        {
          title: "# Factura",
          style: { font: { sz: "13", bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: "Detalle",
          style: { font: { sz: "13", bold: true } },
          width: { wch: 30  },
        }, // width in pixels
        {
          title: "Valor",
          style: { font: { sz: "13", bold: true } },
          width: { wch: 10 },
        }, // width in characters
        {
          title: "Documento",
          style: { font: { sz: "13", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "# Retención",
          style: { font: { color: {}, sz: "13", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "Valor Retención",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Valor Pagado",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Beneficiario",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Cédula",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Banco de Beneficiario",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "# Cuenta",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Tipo de Cuenta",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Tipo de Pago",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
        {
          title: "Pago",
          style: { font: { border: '1px solid black', sz: "13", bold: true } },
          width: { wpx: 110 },
        }, // width in pixels
      ],
      data: solicitude?.items.map((item) => [
        { value: item.project?.name, style: { } },
        { value: item.centerCost?.name, style: { } },
        {
          value: item.provider?.name,
          style: {
          },
        },
        {
          value: item.factureDate,
          style: {
            
          },
        },
        {
          value: item.factureNumber,
          style: {
          },
        },
        {
          value: item.details,
          style: {
          },
        },
        {
          value: item.value,
          style: {
          },
        },
        {
          value: item.documentDelivered,
          style: {
          },
        },
        {
          value: item.numberRetention,
          style: {
          },
        },
        {
          value: item.valueRetention,
          style: {
          },
        },
        {
          value: item.valueNet,
          style: {
          },
        },
        {
          value: item.beneficiary,
          style: {
          },
        },
        {
          value: item.identificationCard,
          style: {
       
          },
        },
        {
          value: item.bank,
          style: {
            
          },
        },
        {
          value: item.accountBank,
          style: {
          
          },
        },
        {
          value: item.accountType,
          style: {

          },
        },
        {
          value: item.typePayments ?? '',
          style: {

          },
        },
        {
          value: item.payments,
          style: {

          },
        },
      ]),
    },
  ];

  return (
    <>
      <LoadingContainer visible={loading}>
        {solicitude === null ? (
          <div>Error al cargar los datos</div>
        ) : (
          <div>
            <table width="100%" className="mt-5">
              <tr>
                <td>
                  <div style={{ paddingLeft: "10%" }}>
                    <h3
                      style={{
                        background: theme.colors.red,
                        padding: "20px 35px 20px 35px",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      DETALLE DE PAGOS SOLICITADOS
                    </h3>
                  </div>
                </td>
                <td>
                  <img
                    src="/logo_horizontal.png"
                    className=""
                    alt="logo"
                    style={{
                      width: "300px",
                      height: "60px",
                      marginLeft: "10em",
                      marginBottom: "30px",
                    }}
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
            </table>
            <Row>
              <Table responsive>
                <thead>
                  <tr className="text-center">
                    <th>Proyecto</th>
                    <th>Centro de Costos</th>
                    <th>Proveedor</th>
                    <th>Fecha de Factura</th>
                    <th># Factura</th>
                    <th>Dealle</th>
                    <th>Valor</th>
                    <th>Documento</th>
                    <th># Retención</th>
                    <th>Valor Retención</th>
                    <th>Valor Pagado</th>
                    <th>Beneficiario</th>
                    <th>Cédula</th>
                    <th>Banco de Beneficiario</th>
                    <th># Cuenta</th>
                    <th>Tipo de Cuenta</th>
                    <th>Tipo de Pago</th>
                    <th>Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitude.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.project?.name ?? ""}</td>
                      <td>{item.centerCost?.name ?? ""}</td>
                      <td>{item.provider?.name ?? ""}</td>
                      <td>{item.factureDate ?? ""}</td>
                      <td>{item.factureNumber ?? ""}</td>
                      <td>{item.details ?? ""}</td>
                      <td>{item.value ?? ""}</td>
                      <td>{item.documentDelivered ?? ""}</td>
                      <td>{item.numberRetention}</td>
                      <td>{item.valueRetention}</td>
                      <td>{item.valueNet ?? ""}</td>
                      <td>{item.beneficiary ?? ""}</td>
                      <td>{item.identificationCard ?? ""}</td>
                      <td>{item.bank ?? ""}</td>
                      <td>{item.accountBank ?? ""}</td>
                      <td>{item.accountType ?? ""}</td>
                      <td>{item.typePayments}</td>
                      <td>{item.payments}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </div>
        )}
      </LoadingContainer>

      <ExcelFile
        filename="Solicitud"
        element={
          <button type="button" className="btn btn-success float-right m-3">
            Exportar Excel
          </button>
        }
      >
        <ExcelSheet dataSet={DataSet} name="Solicitud">
           <ExcelColumn label="Solicitante" value="soliciter" />
        </ExcelSheet>    
        
      </ExcelFile>

      <div>
        <Button
          className="btn btn-success mt-4 m-4"
          onClick={() => Router.push({ pathname: "/" })}
        >
          Volver
        </Button>
      </div>
    </>
  );
};

export default ExcelSolicitude;
