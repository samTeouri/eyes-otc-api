"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseCloudMessagingService = void 0;
const admin = __importStar(require("firebase-admin"));
const dotenv = __importStar(require("dotenv"));
const serviceAccountKey = require('../serviceAccountKey.json');
dotenv.config();
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});
const messaging = admin.messaging(app);
class FirebaseCloudMessagingService {
    constructor() {
        this.sendNotification = (deviceToken, notification) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = {
                    notification: notification,
                    token: deviceToken,
                    webpush: {
                        fcmOptions: {
                            link: "http://localhost:3000"
                        }
                    }
                };
                return yield messaging.send(message)
                    .then((reponse) => {
                    console.log(`Notification envoyée : ${reponse}`);
                })
                    .catch((reason) => {
                    console.log(`Error sending notification : ${reason}`);
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.sendNotifications = (devicesTokens, notification) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = {
                    notification: notification,
                    tokens: devicesTokens,
                    webpush: {
                        fcmOptions: {
                            link: "http://localhost:3000"
                        }
                    }
                };
                if (devicesTokens.length != 0) {
                    return yield messaging.sendEachForMulticast(message)
                        .then((reponse) => {
                        console.log(`Notifications envoyées : ${reponse}`);
                    })
                        .catch((reason) => {
                        console.log(`Error sending notifications : ${reason}`);
                    });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.FirebaseCloudMessagingService = FirebaseCloudMessagingService;
