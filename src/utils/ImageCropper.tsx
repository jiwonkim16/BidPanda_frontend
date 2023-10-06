import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({
  croppedImage, // crop할 이미지
  setCroppedAreaPixels, // 이미지 {width: , height: , x: , y: } setstate, 잘린 이미지 값
  width = "4", // 이미지 비율
  height = "2", // 이미지 비율
  cropShape = "none", // 이미지 모양 round 설정 시 원으로 바뀜
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedAreaPixel) => {
    setCroppedAreaPixels(croppedAreaPixel);
  }, []);

  return (
    <>
      <Cropper
        image={croppedImage}
        crop={crop}
        zoom={zoom}
        aspect={width / height}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        cropShape={cropShape}
      />
    </>
  );
};

export default ImageCropper;
