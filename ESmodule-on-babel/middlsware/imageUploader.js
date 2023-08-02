import multer from "multer";
import path from "path";
import fs from "fs";

//업로더의 이미지를 로컬서버에 저장 로직
export const createImageUploader = (destination) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
      //cb(null, file.fieldname + "-" + Date.now()); 이 코드로하면 이미지파일이 등록되지 않는 현상 발생, 추가적인 공부필요.
    },
  });

  return multer({ storage });
};

//파일 삭제를 위한 로직
export const deleteFile = (filename) => {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error("Error deleting file", err);
      throw err;
    }
  });
};
