<script>

const frameCount = 45;

const currentFrame = index => (
    `sequence/frame_${(index + 1).toString().padStart(4, '0')}.png`
);

const canvas = document.getElementById('sequence');

const context = canvas.getContext('2d');

/* TAILLE */

canvas.width = 500;
canvas.height = 500;

/* STOCKAGE IMAGES */

const images = [];

/* PRELOAD */

for (let i = 0; i < frameCount; i++) {

    const img = new Image();

    img.src = currentFrame(i);

    images.push(img);

}

/* PREMIERE FRAME */

images[0].onload = () => {

    context.drawImage(
        images[0],
        0,
        0,
        500,
        500
    );

};

/* SCROLL */

window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;

    const maxScroll =
        document.body.scrollHeight - window.innerHeight;

    const scrollFraction =
        scrollTop / maxScroll;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.drawImage(
            images[frameIndex],
            0,
            0,
            500,
            500
        );

    });

});

</script>