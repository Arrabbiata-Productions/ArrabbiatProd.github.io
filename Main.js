const SEQUENCES_PATH = `Data/Sequence/Animations.json`;

let sequences = {};

async function loadSequences() {
    const response = await fetch(SEQUENCES_PATH);
    sequences = await response.json();
}

loadSequences();

function getFrame(pKey, pScroll) {

    const lSequence = sequences[pKey];
    if (lSequence == null)
        return ``;

    const lPath = lSequence["rootPath"];
    const lTotalFrames = lSequence["maxFrame"];

    const lFrame = Math.floor(pScroll * (lTotalFrames - 1)) + 1;

    return `${lPath}/frame_${String(lFrame).padStart(4, "0")}.png`;
}
