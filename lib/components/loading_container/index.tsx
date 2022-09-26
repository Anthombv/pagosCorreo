import Image from "next/image";
import { useEffect, useState } from "react";
import { GifContainer } from "./style";

type Props = {
  visible: boolean;
  children: React.ReactNode;
  miniVersion?: boolean;
};

const LoadingContainer = (props: Props): JSX.Element => {
  const { visible, children, miniVersion } = props;
  const [loading, setVisibility] = useState<boolean>(visible);

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  return loading ? (
    <GifContainer miniVersion={miniVersion}>
      <Image
        src="/loading.gif"
        alt="loading-gif"
        width="580px"
        height="435px"
      />
    </GifContainer>
  ) : (
    <>{children}</>
  );
};

export default LoadingContainer;
