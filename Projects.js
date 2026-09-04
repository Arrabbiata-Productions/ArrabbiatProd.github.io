
let ProjectKey;
let OverviewIndex;

function UpdateOverviewImage(){
    console.log("Update OverviewImage");
    const lOverview = document.getElementById("overview-image");
    if (lOverview == null)
        return;
    
    const lCollection = collections[ProjectKey]
    if (lCollection == null)
        return;
    
    let lNewIndex = Math.floor(Math.random() * lCollection.length);
    while (lNewIndex === OverviewIndex){
        lNewIndex = Math.floor(Math.random() * lCollection.length);
    }
    
    lOverview.src = lCollection[lNewIndex];
    OverviewIndex = lNewIndex;
}

async function InitOnReady(){
    await jsonsReady;
    console.log("Ready");

    setInterval(UpdateOverviewImage, 5000);
}
InitOnReady();