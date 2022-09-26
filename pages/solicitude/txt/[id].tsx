import Router from "next/router";
import react, { useEffect, useState } from "react";
import { useAuth } from "../../../lib/hooks/use_auth";
import { ResponseData, Solicitude } from "../../../lib/types";
import HttpClient from "../../../lib/utils/http_client";
import { saveAs } from "file-saver";
import { Button, Container, Row, Table } from "react-bootstrap";

const SoliTxtPichincha = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [solicitude, setSolicitude] = useState<Solicitude>(null);
  const [items, setItems] = useState("");
  const createFile = () => {
    const blob = new Blob([items], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "cash-Pichincha.txt");
  };

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

  return (
    <>
      {solicitude === null ? (
        <div>Error al cargar los datos</div>
      ) : (
        <div>
          <h1 className="text-danger" style={{ marginTop: "20px", textAlign: "center" }}>
            Descargar Cash Pichincha
          </h1>
          <Container>
            <Row>
              <Table responsive>
                {solicitude.items.map((item, index) => (
                  <tr key={index}>
                    <td>PA</td>
                    <td>{item.typeProv ?? ""}</td>
                    <td>USD</td>
                    <td>{item.value ?? ""}00</td>
                    <td>CTA</td>
                    <td>{item.accountType ?? ""}</td>
                    <td>{item.accountBank ?? ""}</td>
                    <td>PAGO</td>
                    <td>{item.typeCard ?? ""}</td>
                    <td>{item.identificationCard ?? ""}</td>
                    <td>{item.beneficiary ?? ""}</td>
                    <td>{item.codBank ?? ""}</td>
                  </tr>
                ))}
              </Table>
            </Row>
            <textarea 
              style={{width: "60%", marginTop: "8%"}}
              value={items}
              onChange={ (e) => setItems (e.target.value)}
            ></textarea>
          </Container>
          <Button style={{ marginLeft: "50%", marginTop: "2% " }} onClick={createFile}>
            Guardar Cash
          </Button>
          <br></br>
          <br></br>
          <Button
            style={{ marginLeft: "50%", marginBottom: "3%" }}
            onClick={() => Router.push({ pathname: "/" })}
          >
            Volver
          </Button>
        </div>
      )}
    </>
  );
};

export default SoliTxtPichincha;
