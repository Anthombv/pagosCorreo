import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingContainer from "../../../components/loading_container";
import UserModal from "../../../components/modals/users/user";
import TreeTable, { ColumnData } from "../../../components/tree_table";
import { useAuth } from "../../../hooks/use_auth";
import { ResponseData, User } from "../../../types";
import HttpClient from "../../../utils/http_client";

const UsersPanel = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<User>>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadData = async () => {
    setLoading(true);
    const response = await HttpClient(
      "/api/user",
      "GET",
      auth.userName,
      auth.role
    );
    if (response.success) {
      const users: Array<any> = response.data;
      setTableData(users);
    } else {
      toast.warning(response.message);
    }
    setLoading(false);
  };

  // ejecuta funcion al renderizar la vista
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => setModalVisible(true);
  const hideModal = async () => {
    if (editingUser != null) setEditingUser(null);
    setModalVisible(false);
    await loadData();
  };

  const columns: ColumnData[] = [
    {
      dataField: "name",
      caption: "Nombre del empleado",
      width: 330,
    },
    {
      dataField: "userName",
      caption: "Usuario",
      width: 100,
    },
    {
      dataField: "email",
      caption: "E-mail",
      width: 220,
    },
    {
      dataField: "identificationCard",
      caption: "Cedula o RUC",
    },
    {
      dataField: "cellphone",
      caption: "# celular",
      width: 95,
    },
    {
      dataField: "dateAdmission",
      caption: "Fecha de Ingreso",
      width: 95,
    },
    {
      dataField: "department.name",
      caption: "Departamento",
    },
    {
      dataField: "position",
      caption: "Cargo o Puesto",
    },
    {
      dataField: "role",
      caption: "Rol",
      width: 120,
      cellRender: ({ text }: any) => {
        switch (text) {
          case "0":
            return "Administrador";
          case "1":
            return "Solicitante";
          case "2":
            return "Contabilidad";
          case "3":
            return "Tesorería";
          case "4":
            return "Financiero";
          case "5":
            return "Gerencia";
          case "6":
            return "Pagos";
          case "7":
            return "Anticipo";  
          default:
            return "";
        }
      },
    },
  ];

  const buttons = {
    edit: (rowData: any) => {
      setEditingUser(rowData);
      showModal();
    },
    delete: async (rowData: any) => {
      await HttpClient(
        "/api/user/" + rowData.id,
        "DELETE",
        auth.userName,
        auth.role
      );
      await loadData();
    },
  };

  return (
    <div style={{ padding: "40px 0" }}>
      <Button variant="outline-danger" className="mb-4" onClick={showModal}>
        Crear Usuario
      </Button>
      <LoadingContainer visible={loading} miniVersion>
        <TreeTable
          dataSource={tableData}
          columns={columns}
          buttons={buttons}
          searchPanel={false}
          colors={{ headerBackground: "#F8F9F9", headerColor: "#CD5C5C" }}
          paging
          showNavigationButtons
          showNavigationInfo
          pageSize={10}
          infoText={(actual, total, items) =>
            `Página ${actual} de ${total} (${items} Usuarios)`
          }
        />
      </LoadingContainer>
      <UserModal
        visible={modalVisible}
        close={hideModal}
        initialData={editingUser}
        onDone={async (newUser: User) => {
          const response: ResponseData =
            editingUser == null
              ? await HttpClient(
                  "/api/user",
                  "POST",
                  auth.userName,
                  auth.role,
                  newUser
                )
              : await HttpClient(
                  "/api/user",
                  "PUT",
                  auth.userName,
                  auth.role,
                  newUser
                );
          if (response.success) {
            toast.success(
              editingUser == null ? "Usuario creado!" : "Usuario actualizado!"
            );
          } else {
            toast.warning(response.message);
          }
        }}
      />
    </div>
  );
};

export default UsersPanel;
