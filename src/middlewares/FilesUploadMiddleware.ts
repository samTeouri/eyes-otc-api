import * as path from 'path';
import multer from 'multer';

const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads/files');

const storageFile: multer.StorageEngine = multer.diskStorage({
    destination: uploadFilePath,
    filename(req: Express.Request, file: Express.Multer.File, fn: (error: Error | null, filename: string) => void): void {
        fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
    },
});

export const uploadFile = multer({
    storage: storageFile,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const extension: boolean = ['.png', '.jpg', '.jpeg', '.mp4', '.mov', '.qt', '.avi', '.webm', '.m4v', '.mp3'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
        const mimeType: boolean = ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo', 'video/x-m4v', 'audio/mpeg', 'audio/mp4'].indexOf(file.mimetype) >= 0;

        if (extension && mimeType) {
            return callback(null, true);
        }

        callback(new Error(`Invalid file type. Type ${file.mimetype} is not allowed!`));
    },
});