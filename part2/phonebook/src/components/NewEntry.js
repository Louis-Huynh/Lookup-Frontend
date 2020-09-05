import React from "react";

import styled from "styled-components";
import { Modal } from "react-responsive-modal";

const [modalState, setModalState] = useState(false);

const alternateModalState = () => {
  setModalState(!modalState);
};

const NewEntry = () => {
  return (
    <Wrapper>
      {/* put a modal */}
      <button onClick={this.alternateModalState}></button>

      <Modal open={modalState} onClose={!modalState} center>
        {/* form to add entry */}
      </Modal>
    </Wrapper>
  );
};

export default NewEntry;

const Wrapper = styled.div``;
