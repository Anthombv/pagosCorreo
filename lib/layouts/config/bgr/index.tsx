import { Table } from "react-bootstrap";

const BGRPanel = () => {
  return (
    <>
      <div
        className="image"
        style={{
          marginTop: "30px",
          backgroundImage: `url(${"bgr.jpg"})`,
          height: "250px",
          width: "100%",
          overflow: "hidden hidden",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          position: "relative",
          backgroundRepeat: "no-repeat",
          marginBottom: "15px",
        }}
      ></div>
      <h1>¿Cómo activo mis cuentas para realizar transferencias?</h1>
      <li>
        En el menú de BGR Digital seleccione “Transferencias” y luego “Activar
        Cuentas”.
      </li>
      <li>
        Seleccione la cuenta e ingrese el monto máximo para uso de la cuenta, el
        cual no puede ser superior al autorizado por BGR.
      </li>
      <li>Generar código temporal dinámico.</li>
      <li>
        Digite el código generado que se envía a su número celular registrado
        por SMS y/o correo electrónico.
      </li>
      <p style={{ marginTop: "15px" }}>
        <strong>
          Aquí tendra dos videos donde estan los pasos para hacer una
          transferencia:
        </strong>
      </p>
      <ol>
        <li style={{ marginBottom: "15px" }}>
          Crear un nuevo Beneficiario y hacer una transferencia
        </li>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/hQ1nm8w8jaE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <li style={{ marginTop: "15px", marginBottom: "15px" }}>
          Los pasos para realizar una transferencia desde el menú de servicios o
          posición consolidada se detallan en este otro video.
        </li>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/9QYqDC7ksy0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ol>
      <h1
        style={{
          color: "#0F265C",
          fontSize: "28px",
          lineHeight: "34px",
          fontFamily: "sans-serif",
          fontWeight: "normal",
          marginBottom: "10px",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        Datos de la Cuenta Grupo ANCON BGR
      </h1>
      <Table responsive style={{ width: "50%", marginLeft: "25%", marginBottom: "5%" }}>
        <thead>
          <tr>
            <th style={{ width: "50%", border: "1px solid", textAlign: "center" }}>Banco:</th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>BANCO GENERAL RUMIÑAHUI</td>
          </tr>
          <tr>
            <th style={{ width: "50%", border: "1px solid", textAlign: "center" }}>Tipo de Cuenta:</th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>CORRIENTE</td>
          </tr>
          <tr>
            <th style={{ width: "50%", border: "1px solid", textAlign: "center" }}>Numero de Cuenta:</th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>8020394004</td>
          </tr>
          <tr>
            <th style={{ width: "50%", border: "1px solid", textAlign: "center" }}>RUC/ID:</th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>1791714881001</td>
          </tr>
          <tr>
            <th style={{ width: "50%", border: "1px solid", textAlign: "center" }}>RAZÓN/NOMBRE:</th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>Inmoconstrucciones</td>
          </tr>
        </thead>
      </Table>
      <h1
        style={{
          color: "#0F265C",
          fontSize: "28px",
          lineHeight: "34px",
          fontFamily: "sans-serif",
          fontWeight: "normal",
          marginBottom: "10px",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        Lineas directas para el envio de comprobantes de pagos
      </h1>
      <p style={{ color: "#4A4A50", wordWrap: "break-word" }}>
        Envia tu comprobante de pago por nuestra linea directa de WhatsApp
        pulsando el botton <strong>WhatsApp Ancon</strong>
      </p>
      <p>
        <a
          style={{
            textDecoration: "none",
            background: `#25d366 url(${"https://tochat.be/click-to-chat-directory/css/whatsapp.svg"}) no-repeat 1.5em center`,
            backgroundSize: "1.6em",
            display: "table",
            fontFamily: "sans-serif",
            margin: "1em auto",
            color: "#fff",
            fontSize: "0.9em",
            padding: "1em 2em 1em 3.5em",
            borderRadius: "2em",
            fontWeight: "bold",
          }}
          href="https://wa.me/593979000690?text=Me%20interesa%20el%20auto%20que%20estás%20vendiendo"
        >
          WhatsApp ANCON
        </a>
      </p>
      <p
        style={{ color: "#4A4A50", wordWrap: "break-word" }}
      >
        O también envia tu comprobante de pago por nuestra linea directa de
        correo electrónico pulsando el boton de <strong> Email ANCON </strong>
      </p>
      
        <p>
          <a
            style={{
              textDecoration: "none",
              background: `#0000FF url(${"correo.png"}) no-repeat 1.5em center`,
              backgroundSize: "2em",
              padding: "1em 2em 1em 4.5em",
              display: "table",
              fontFamily: "sans-serif",
              borderRadius: "2em",
              margin: "1em auto",
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "5%",
            }}
            href="mailto:mbarcia@grupoancon.com"
          >
            Mail ANCON
          </a>
        </p> 
    </>
  );
};

export default BGRPanel;
