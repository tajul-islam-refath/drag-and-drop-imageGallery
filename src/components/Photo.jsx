import React, { forwardRef } from "react";

export const Photo = forwardRef(
  (
    {
      id,
      url,
      index,
      faded,
      style,
      selectedImageIDs,
      activeImage,
      onSelectedImageID,
      ...props
    },
    ref
  ) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 310 : 150,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      ...style,
    };

    return (
      <div className="photo" ref={ref} style={inlineStyles}>
        <div
          {...props}
          className={`${activeImage?.id != id ? "overlay" : "overlay-hd"} ${
            selectedImageIDs.includes(id) ? "overlay-blk" : ""
          }`}></div>
        <input
          className={`${activeImage?.id != id ? "input" : "input-hd"} ${
            selectedImageIDs.includes(id) ? "input-blk" : ""
          } `}
          type="checkbox"
          name={`selected-${id}`}
          checked={selectedImageIDs.includes(id)}
          onChange={() => onSelectedImageID(id)}
        />
      </div>
    );
  }
);
