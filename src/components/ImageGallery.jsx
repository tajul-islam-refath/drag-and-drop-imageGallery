import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "./Grid";
import { SortablePhoto } from "./SortablePhoto";
import { Photo } from "./Photo";

import image1 from "../assets/images/image-1.webp";
import image2 from "../assets/images/image-2.webp";
import image3 from "../assets/images/image-3.webp";
import image4 from "../assets/images/image-4.webp";
import image5 from "../assets/images/image-5.webp";
import image6 from "../assets/images/image-6.webp";
import image7 from "../assets/images/image-7.webp";
import image8 from "../assets/images/image-8.webp";
import image9 from "../assets/images/image-9.webp";
import image10 from "../assets/images/image-10.jpeg";
import image11 from "../assets/images/image-11.jpeg";
import icon from "../assets/images/img-icon.png";

const ImageGallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      image: image1,
    },
    {
      id: 2,
      image: image2,
    },
    {
      id: 3,
      image: image3,
    },
    {
      id: 4,
      image: image4,
    },
    {
      id: 5,
      image: image5,
    },
    {
      id: 6,
      image: image6,
    },
    {
      id: 7,
      image: image7,
    },
    {
      id: 8,
      image: image8,
    },
    {
      id: 9,
      image: image9,
    },
    {
      id: 10,
      image: image10,
    },
    {
      id: 11,
      image: image11,
    },
  ]);
  const [activeImage, setActiveImage] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [selectedImageIDs, setSelectedImageIDs] = useState([]);

  const onSelectedImageID = (selectedImageId) => {
    let index = selectedImageIDs.findIndex(
      (imageId) => imageId == selectedImageId
    );
    if (index == -1) {
      setSelectedImageIDs((prev) => [...prev, selectedImageId]);
    } else {
      let filteredImageIDs = selectedImageIDs.filter(
        (imageId) => imageId != selectedImageId
      );
      setSelectedImageIDs(filteredImageIDs);
    }
  };

  const deleteSelectedImages = () => {
    const filteredImages = images.filter(
      (item) => !selectedImageIDs.includes(item.id)
    );
    setImages(filteredImages);
    setSelectedImageIDs([]);
  };

  function handleDragStart(event) {
    let draggedImage = images.find((image) => image.id == event.active.id);
    draggedImage && setActiveImage(draggedImage);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.findIndex((image) => image.id === active.id);
        const newIndex = images.findIndex((image) => image.id === over.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }

    setActiveImage(null);
  }

  function handleDragCancel() {
    setActiveImage(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <div className="imageGallery">
        <div className="topBar">
          <div>
            {selectedImageIDs.length == 0 && <h4>Gallery</h4>}
            {selectedImageIDs.length != 0 && (
              <>
                <input type="checkbox" checked={true} />
                <label htmlFor="">
                  {" "}
                  {selectedImageIDs.length} Files Selected{" "}
                </label>
              </>
            )}
          </div>
          {selectedImageIDs.length != 0 && (
            <a className="delete-btn" onClick={() => deleteSelectedImages()}>
              Delete files
            </a>
          )}
        </div>
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <Grid columns={5}>
            {images.map((item, index) => (
              <SortablePhoto
                key={item.id}
                url={item.image}
                id={item.id}
                index={index}
                selectedImageIDs={selectedImageIDs}
                activeImage={activeImage}
                onSelectedImageID={onSelectedImageID}
              />
            ))}
            <div className="photo selectImage">
              <img src={icon} alt="" />
              <p>Add Images</p>
            </div>
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale={true}>
          {activeImage ? (
            <Photo
              url={activeImage.image}
              id={activeImage.id}
              index={images.findIndex((item) => item.id === activeImage.id)}
              selectedImageIDs={selectedImageIDs}
              activeImage={activeImage}
              onSelectedImageID={onSelectedImageID}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default ImageGallery;
