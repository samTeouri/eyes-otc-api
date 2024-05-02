import * as path from 'path';
import { Request, Response } from 'express';
import multer from 'multer';

const uploadVideoPath = path.resolve(__dirname, '../..', 'public/uploads/videos');

const storageVideo: multer.StorageEngine = multer.diskStorage({
    destination: uploadVideoPath,
    filename(req: Express.Request, video: Express.Multer.File, fn: (error: Error | null, filename: string) => void): void {
        fn(null, `${new Date().getTime().toString()}-${video.fieldname}${path.extname(video.originalname)}`);
    },
});

const uploadVideo = multer({
    storage: storageVideo,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, video, callback) {
        const extension: boolean = ['.mp4', '.mov', '.avi'].indexOf(path.extname(video.originalname).toLowerCase()) >= 0;
        const mimeType: boolean = ['video/quicktime', 'video/x-msvideo', 'video/mp4'].indexOf(video.mimetype) >= 0;

        if (extension && mimeType) {
            return callback(null, true);
        }
    
        callback(new Error('Invalid file type. Only picture file on type PNG, JPEG and JPG are allowed!'));
    },
}).single('video');

export const handleSingleUploadVideo = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
        uploadVideo(req, res, (error) => {
            if (error) {
                reject(error);
            }

            resolve({ file: req.file, body: req.body });
        });
    });
};