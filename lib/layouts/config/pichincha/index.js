import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

const PichinchaPanel = () => {
  const [contactDetail, setContactDetail] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log("Response received", res);
        if (res.status === 200) {
          // console.log("Response succeeded!");
          toast("Thank you for contacting us!");
        } else {
          // console.log("Email/Password is invalid.");
          toast("Email/Password is invalid.");
        }
      })
      .catch((e) => console.log(e));
    reset();
  };

  return (
    <>
      <div
        className="image"
        style={{
          marginTop: "30px",
          backgroundImage: `url(${"pichincha.jpg"})`,
          height: "250px",
          width: "100%",
          overflow: "hidden hidden",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          position: "relative",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="mt-5"
          style={{
            color: "#0F265C",
            fontSize: "42px",
            lineHeight: "38px",
            fontFamily: "sans-serif",
            fontWeight: "normal",
            marginLeft: "10%",
            marginBottom: "10px",
            letterSpacing: "normal",
            display: "block",
          }}
        >
          Transferencias <br></br> bancarias
        </h1>
      </div>
      <p style={{ marginTop: "20px", color: "black" }}>
        Aquí tendra los pasos para realizar una transferencia en el Banco
        PICHINCHA, tanto para la Banca Movil como la Banca Web.
      </p>

      <h2
        style={{
          color: "#0F265C",
          fontSize: "28px",
          lineHeight: "34px",
          fontFamily: "sans-serif",
          fontWeight: "normal",
          marginBottom: "10px",
          marginTop: "8px",
        }}
      >
        Pasos para efectuar transferencias a través de los canales electrónicos.{" "}
        <br />
        Desde Banca WEB:
      </h2>
      <ol style={{ color: "#4A4A50", wordWrap: "break-word" }}>
        <li>Accede a Banca Web, con tu usuario y contraseña.</li>
        <li>Elige “Transferencias”.</li>
        <li>Selecciona; la opción “Directas” o “Interbancarias”.</li>
        <li>
          Coloca el monto a transferir, el nombre del beneficiario, el número de
          cuenta, su correo electrónico y una <br /> descripción que te ayude a
          recordar el motivo de la transacción.
        </li>
        <li>Da clic en “Continuar”; después, en “Transferir”</li>
        <li>Visualizarás un aviso de “Transacción exitosa”.</li>
      </ol>
      <h2
        style={{
          color: "#0F265C",
          fontSize: "28px",
          lineHeight: "34px",
          fontFamily: "sans-serif",
          fontWeight: "normal",
          marginBottom: "10px",
          marginTop: "8px",
        }}
      >
        Desde la aplicación Banca Móvil:
      </h2>
      <ol style={{ color: "#4A4A50", wordWrap: "break-word" }}>
        <li>Accede a Banca Móvil.</li>
        <li>En la sección “¿Qué desea hacer?”, escoge “Transferir dinero”.</li>
        <li>Ingresa el monto a transferir.</li>
        <li>Selecciona la cuenta desde la que transferirás el dinero.</li>
        <li>
          Elige el beneficiario o añade uno nuevo desde el ícono de la esquina
          inferior derecha.
        </li>
        <li>Escribe un comentario o descripción para la transacción.</li>
        <li>Da clic en “Continuar”.</li>
        <li>Da clic en “Realizar pago” y ¡listo!</li>
        <li>No olvides cerrar sesión, una vez terminadas tus transacciones.</li>
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
        Datos de la Cuenta Grupo ANCON PICHINCHA
      </h1>
      <Table responsive style={{ width: "50%", marginLeft: "25%" }}>
        <thead>
          <tr>
            <th
              style={{ width: "50%", border: "1px solid", textAlign: "center" }}
            >
              Banco:
            </th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>
              BANCO PICHINCHA
            </td>
          </tr>
          <tr>
            <th
              style={{ width: "50%", border: "1px solid", textAlign: "center" }}
            >
              Tipo de Cuenta:
            </th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>
              CORRIENTE
            </td>
          </tr>
          <tr>
            <th
              style={{ width: "50%", border: "1px solid", textAlign: "center" }}
            >
              Numero de Cuenta:
            </th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>
              3185109904
            </td>
          </tr>
          <tr>
            <th
              style={{ width: "50%", border: "1px solid", textAlign: "center" }}
            >
              RUC/ID:
            </th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>
              1791714881001
            </td>
          </tr>
          <tr>
            <th
              style={{ width: "50%", border: "1px solid", textAlign: "center" }}
            >
              RAZÓN/NOMBRE:
            </th>
            <td style={{ width: "", border: "1px solid", textAlign: "center" }}>
              Inmoconstrucciones
            </td>
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
      <p style={{ color: "#4A4A50", wordWrap: "break-word" }}>
        O también envia tu comprobante de pago por nuestra linea directa de
        correo electrónico pulsando el boton de <strong> Email ANCON </strong>
      </p>
      <div style={{ width: "30%", marginBottom: "5%" }}>
        <div className="card card-body">
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="form-group mb-3">
              <input
                type="text"
                name="subject"
                id="subject"
                className="form-control"
                placeholder="Ingrese el asunto de su correo"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="form-control"
                placeholder="Ingrese su nombre"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="form-control"
                placeholder="Ingrese su correo electronico"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="tel"
                placeholder="Phone"
                {...register("phone", { required: true })}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows={4}
                placeholder="Message"
                defaultValue={""}
                {...register("message", { required: true })}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <input
                type="file"
                name="image"
                className="form-control"
                placeholder=""
              />
            </div>
            
            <button type="submit" className="px-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PichinchaPanel;
