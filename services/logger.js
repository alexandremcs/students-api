import { request } from "express"
import winston from "winston"

const __logger__ = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({filename: "info.log", level: "info"})
    ]
})

const info = request => {
    let id = request.user == undefined ? "" : request.user.sub
    __logger__.info({
        endpoint: request.method + " " + request.url,
        userId: id,
        data: request.body
    })
}

export const logger = {info}