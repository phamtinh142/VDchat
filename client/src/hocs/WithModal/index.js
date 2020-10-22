import React, { useState } from 'react';

const withModal = (ModalComponent) => (WrapperComponent) => () => {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState(null);
  const showModal = (dataModal) => {
    setIsShow(true);
    setData(dataModal);
  };

  const hideModal = () => {
    setIsShow(false);
    setData(null);
  };

  return (
    <>
      <WrapperComponent showModal={showModal} />
      {
        isShow && (
          <ModalComponent 
            data={data}
            hideModal={hideModal}
          />
        )
      }
    </>
  );
};

export default withModal;