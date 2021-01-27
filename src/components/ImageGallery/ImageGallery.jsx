import { useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../../UI/Modal/Modal';

function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleClickOnImage(event) {
    setModalImg(event.target.dataset.modalimg);
    toggleModal();
  }

  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClick={handleClickOnImage}
            />
          );
        })}
      </ul>
      {showModal && <Modal modalImg={modalImg} onClose={toggleModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};

export default ImageGallery;
