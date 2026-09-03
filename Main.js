const SEQUENCES_PATH = `Data/Sequence/Animations.json`;

let sequences = {};

async function loadSequences() {
    const response = await fetch(SEQUENCES_PATH);
    sequences = await response.json();

    console.log(sequences);
}

loadSequences();

function getFrame(pKey, pScroll) {

    console.log(pKey);
    console.log(pScroll);
    const lSequence = sequences[pKey];
    if (lSequence == null)
        return ``;


    const lPath = lSequence["rootPath"];
    const lTotalFrames = lSequence["maxFrame"];
    console.log(lPath);

    const lFrame = Math.floor(pScroll * (lTotalFrames - 1)) + 1;

    return `${lPath}/frame_${String(lFrame).padStart(4, "0")}.png`;
}
