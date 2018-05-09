// const basePath = 'http://101.132.147.167/hn'
const basePath = 'http://www.hzmustbe.com/hn'

const wsIp = 'ws://127.0.0.1:9998'

const printWSIP_H = 'ws://localhost:8080/pimg/print/0'//横向
const printWSIP_V= 'ws://localhost:8080/pimg/print/1'//纵向
const AjaxUrl = {
  upload: basePath + '/user/getQRCode',
  cloud: basePath + '/topic/list'
}

const faceObjHeight = 720

// export { base64, basePath, wsIp, AjaxUrl }
const printWSIP={printWSIP_H:printWSIP_H,printWSIP_V:printWSIP_V}

export { basePath, wsIp, printWSIP, AjaxUrl, faceObjHeight}
