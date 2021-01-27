import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../services/pixabayApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImagesErrorView from '../ImagesErrorView/ImagesErrorView';
import SpinnerLoader from '../../UI/SpinnerLoader/SpinnerLoader';
import ImagesIdleView from '../ImagesIdleView/ImagesIdleView';
import Button from '../../UI/Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  ERROR: 'error',
};

function RenderImagesApi({ imageName }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus(Status.PENDING);
    async function findImagesByName() {
      try {
        const data = await fetchData(imageName, page);
        if (data.total > 0) {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setStatus(Status.RESOLVED);
        } else {
          setStatus(Status.ERROR);
        }
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    }
    findImagesByName();
  }, [imageName, page]);

  useEffect(() => {
    resetImages();
  }, [imageName]);

  function handleButtonClick() {
    setPage(prevState => prevState + 1);
    scrollPage();
  }
  function resetImages() {
    setImages([]);
  }

  function scrollPage() {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 1000);
  }

  if (status === Status.IDLE) {
    return <ImagesIdleView />;
  }

  if (status === Status.REJECTED) {
    return <ImagesErrorView errorMessage={error.message} />;
  }

  if (status === 'error') {
    return (
      <ImagesErrorView errorMessage={`Нет картинок с именем: '${imageName}'`} />
    );
  }

  if (status === 'pending' || status === 'resolved') {
    return (
      <>
        <ImageGallery images={images} />
        {status === Status.PENDING ? (
          <SpinnerLoader />
        ) : (
          <Button onLoadMore={handleButtonClick} />
        )}
      </>
    );
  }
}

RenderImagesApi.propTypes = {
  imageName: PropTypes.string,
};

export default RenderImagesApi;
