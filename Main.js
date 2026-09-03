const ANIMATIONS_PATH = `Data/Animations.json`;
const COLLECTIONS_PATH = `Data/Collections.json`;

let sequences = {};
let collections = {};

let bannersInfo = []

async function loadJsons() {
    let response = await fetch(ANIMATIONS_PATH);
    sequences = await response.json();
    response = await fetch(COLLECTIONS_PATH);
    collections = await response.json();
}

const jsonsReady = loadJsons();

/**
 * @param {string} pKey
 * @param {number} pScroll
 */
function getFrame(pKey, pScroll) {

    const lSequence = sequences[pKey];
    if (lSequence == null)
        return ``;

    const lPath = lSequence["rootPath"];
    const lTotalFrames = lSequence["maxFrame"];

    const lFrame = Math.floor(pScroll * (lTotalFrames - 1)) + 1;

    return `${lPath}/frame_${String(lFrame).padStart(4, "0")}.png`;
}

/**
 * @param {string} pID
 * @param {string[]} pKeys
 */
async function AddBanner(pID, pKeys){
    await jsonsReady;

    const lFullImageTrack = document.getElementById(pID);

    bannersInfo.push({
        id: pID,
        images: [],
        index: 0,
    });
    
    const lIndex = bannersInfo.length - 1;

    for (const lKey of pKeys) {
        const lCollection = collections[lKey];
        if(lCollection == null)
            continue;
        
        for (const lPath of lCollection) {
            bannersInfo[lIndex].images.push(lPath);
        }
    }
    
    ResetBanner(lIndex)

    lFullImageTrack.addEventListener('animationiteration', () => {
        ResetBanner(lIndex)
    });
}


/**
 * @param {number} pIndex
 */
function ResetBanner(pIndex){
    const lBannerInfo = bannersInfo[pIndex];
    if (lBannerInfo == null || lBannerInfo.images.length === 0)
        return;
    
    const lFullImageTrack = document.getElementById(lBannerInfo.id);

    for (let i = 0; i < lFullImageTrack.children.length; i++) {
        lFullImageTrack.children[i].src = lBannerInfo.images[lBannerInfo.index];
        
        lBannerInfo.index = (lBannerInfo.index + 1 + lBannerInfo.images.length) % lBannerInfo.images.length;
    }
}