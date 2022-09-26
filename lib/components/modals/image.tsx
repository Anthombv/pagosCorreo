import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProps } from "../../types";
import TabContainer, { TabPanel } from "../tab_container";

export type ImageModalProps = {
  title: string;
  image: string;
};

interface Props extends ModalProps<any> {
  title: string;
  image: string;
}

const ImageModal = (props: Props) => {
  const [data, setData] = useState(null);

  const tabPanels: Array<TabPanel> = [{
    name: 'Solicitante',
    content: (data?.image ? (
      <Image
        src={data?.image}
        layout="responsive"
        width="100%"
        height="100%"
        alt=''
      />
    ) : (
      <p style={{
        color: "black",
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px'
      }}>
        Sin imagen cargada
      </p>
    ))
  },
]

  useEffect(() => {
    setData(props);
  }, [props]);

  return (
    <Modal show={props.visible} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{data?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TabContainer
          tabPanels={tabPanels}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
