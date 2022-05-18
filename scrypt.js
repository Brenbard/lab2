(function() {
    let fileUploadEl = document.getElementById('imageLoader'),
        srcImgEl = document.getElementById('src-image')

    fileUploadEl.addEventListener("change", function (e) {
        srcImgEl.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    srcImgEl.onload = function () {
        let src = cv.imread(srcImgEl);
        let dst = new cv.Mat();
        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(src, dst, 50, 100, 3, false);
        cv.imshow('imageCanvas', dst); // отображаем вывод на canvas
        src.delete(); // очищаем память
        dst.delete();
    }
})()


function getImage(canvas){
    let imageData = canvas.toDataURL();
    let image = new Image();
    image.src = imageData;
    return image;
}

function saveImage(image) {
    let link = document.createElement("a");
    link.setAttribute("href", image.src);
    link.setAttribute("download", "canvasImage");
    link.click();
}

function saveCanvasAsImageFile(){
    let image = getImage(document.getElementById("imageCanvas"));
    saveImage(image);
}
