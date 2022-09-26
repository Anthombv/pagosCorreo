import react from "react";

const Footer = () => {
  return (
    <div
      style={{
        marginTop: "15%",
        backgroundColor: "#ddd",
        padding: "16px",
        position: "fixed",
        display: "block",
        bottom: 0,
        height: "60px",
        width: "100%",
      }}
    >
      <table width="90%" align="center" >
        <tr>
          <td
            style={{ 
              color: "#959595",
              fontSize: "14px",
              position: "fixed",
            }}
          >
            © Desarrollado por Sistemas <strong>2022</strong>
          </td>

          <td
            style={{
              color: "black",
              bottom: 10,
              fontSize: "10px",
              position: "fixed",
              padding: "0% 0% 0% 65%",
            }}
          >
            Versión 1.0{" "}
          </td>

          <td
            style={{
              color: "#850b0b",
              fontSize: "14px",
              position: "fixed",
              padding: "0% 63% 0% 60.4%",
            }}
          >
            <a
              style={{
                textDecoration: "none",
                color: "#a32a2a",
              }}
              href="https://grupoancon.com/"
            >
              www.grupoancon.com
            </a>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Footer;
