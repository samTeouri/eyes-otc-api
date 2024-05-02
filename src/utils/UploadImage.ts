import * as path from 'path';
import { Request, Response } from 'express';
import multer from 'multer';

const uploadImagePath = path.resolve(__dirname, '../..', 'public/uploads/images');

const storageImage: multer.StorageEngine = multer.diskStorage({
    destination: uploadImagePath,
    filename(req: Express.Request, image: Express.Multer.File, fn: (error: Error | null, filename: string) => void): void {
        fn(null, `${new Date().getTime().toString()}-${image.fieldname}${path.extname(image.originalname)}`);
    },
});

const uploadImage = multer({
    storage: storageImage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, image, callback) {
        const extension: boolean = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(image.originalname).toLowerCase()) >= 0;
        const mimeType: boolean = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(image.mimetype) >= 0;

        if (extension && mimeType) {
            return callback(null, true);
        }
    
        callback(new Error('Invalid file type. Only picture file on type PNG, JPEG and JPG are allowed!'));
    },
}).single('picture');

export const handleSingleUploadImage = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
        uploadImage(req, res, (error) => {
            if (error) {
                reject(error);
            }

            resolve({ file: req.file, body: req.body });
        });
    });
};