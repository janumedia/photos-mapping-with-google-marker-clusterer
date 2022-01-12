import { MapMarker } from "../classes/MapMarker";

const google = window.google;
const iconScale: number = 1;
const iconW: number = 62;
const iconH: number = 72;
const labelOrigin: google.maps.Point = new google.maps.Point(iconW * iconScale - 2, -iconH * iconScale * .01);

let  basedCanvas: HTMLCanvasElement;

export function CreateIcon(marker:MapMarker): google.maps.Icon {
    
    if(!basedCanvas) drawBased();

    let canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = iconW * iconScale;
    canvas.height = iconH * iconScale;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(basedCanvas, 0, 0, iconW * iconScale, iconH * iconScale);
    ctx.scale(iconScale, iconScale);

    let w: number,
    h: number,
    dw: number = 56,
    dh: number = 56,
    img = new Image();
    img.crossOrigin = "Anonymous";
    img.onerror = function(e) {
        console.log(e)
    }
    img.onload = function () {
        w = img.naturalWidth;
        h = img.naturalHeight;
        if (w > h) dw = (dw * w) / h;
        if (h > w) dh = (dh * h) / w;
        var tempCanvas:HTMLCanvasElement = document.createElement("canvas");
        var tempCtx:CanvasRenderingContext2D = tempCanvas.getContext("2d");
        tempCanvas.width = 51;
        tempCanvas.height = 51;
        tempCtx.drawImage(img, 0, 0, w, h, -5, -5, dw, dh);

        ctx.drawImage(tempCanvas, 0, 0, 51, 51, 5, 5, 51, 51);

        marker.setIcon({
            url: canvas.toDataURL(),
            labelOrigin
        });

        // clean's up
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas = null;
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCanvas = null;
        img.onload = null;
        img.onerror = null;
        img.src = "";
        img = null;
    };
    
    img.src = `https://dronkers.janumedia.com/${marker.media.url}`;

    return {
        url: canvas.toDataURL(),
        labelOrigin
    }
}

function drawBased(){
    basedCanvas = document.createElement("canvas");
    basedCanvas.width = iconW * iconScale;
    basedCanvas.height = iconH * iconScale;
    
    const basedCtx: CanvasRenderingContext2D = basedCanvas.getContext("2d");
    basedCtx.scale(iconScale, iconScale);
    basedCtx.save();
    basedCtx.fillStyle = "#FFF";
    basedCtx.strokeStyle = "#000";
    // path
    basedCtx.beginPath();
    basedCtx.moveTo(55.634, 0.206);
    basedCtx.bezierCurveTo(
        58.294,
        0.206,
        60.454,
        2.366,
        60.454,
        5.026000000000001
    );
    basedCtx.lineTo(60.454, 55.635000000000005);
    basedCtx.bezierCurveTo(
        60.454,
        58.295,
        58.294,
        60.455000000000005,
        55.634,
        60.455000000000005
    );
    basedCtx.lineTo(37.24, 60.455000000000005);
    basedCtx.lineTo(30.330000000000002, 70.206);
    basedCtx.lineTo(23.421000000000003, 60.454);
    basedCtx.lineTo(5.026, 60.454);
    basedCtx.bezierCurveTo(
        2.3659999999999997,
        60.454,
        0.20599999999999952,
        58.294,
        0.20599999999999952,
        55.634
    );
    basedCtx.lineTo(0.20599999999999952, 5.027);
    basedCtx.bezierCurveTo(
        0.20599999999999952,
        2.367,
        2.3659999999999997,
        0.20699999999999985,
        5.026,
        0.20699999999999985
    );
    basedCtx.lineTo(55.634, 0.20699999999999985);
    basedCtx.closePath();
    basedCtx.fill();
    basedCtx.stroke();
}