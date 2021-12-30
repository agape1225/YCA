(() => {
    let galleryStartIndex = 1;
    let galleryEndIndex = 97;

    let setGallery = () => {
        // 1. 12개의 canvas 생성 후 삽입
        // 2. 각 canvas에 이미지 그리기
        for (let i = 0; i < 12; i++) {
            if (galleryStartIndex > galleryEndIndex) {
                document.querySelector('#getGalleryBtn').remove();
                break;
            } else {
                let img = new Image();
                img.src = `/asset/img/gallery/gallery${galleryStartIndex}.jpg`;

                document.querySelector('.gallery-box').appendChild(img);

                galleryStartIndex++;
            }
        }
    }

    // TODO get Gallery
    document.querySelector('#getGalleryBtn').addEventListener("click", () => {
        setGallery();
    })

    window.addEventListener('load', () => {
        setGallery();
    })
})()