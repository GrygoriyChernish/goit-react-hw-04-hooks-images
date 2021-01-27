import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ modalImg, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return (
      () => {
        window.removeEventListener('keydown', handleKeyDown);
      },
      []
    );
  }, [onClose]);

  function handleBackDropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={s.Overlay} onClick={handleBackDropClick}>
      <div className={s.Modal}>
        {<img src={modalImg} alt="Большя картинка элемента коллекции" />}
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
