import themeColors from "./json/themeShades.json";

const sortButton = document.querySelector(".sortByButton");
const filterButton = document.querySelector(".filterButton");

let isVisible = {
    sort: false,
    filter: false
};

const headerTab = document.querySelector(".HeadersTab");
headerTab.addEventListener( "click", () => {

    moveThisButtonToThatButton( ".sortByButton", ".sortBox", false );
    moveThisButtonToThatButton( ".filterButton", ".filterBox", false );   

});


//========== DRIVER CODE =========================================
function moveThisButtonToThatButton( str1, str2, onclick ){
    
    function x(){
        const headerTab = document.querySelector(".HeadersTab");
        
        if(( headerTab.style.backgroundColor!= hoverBGCol.light ) && ( headerTab.style.backgroundColor!= hoverBGCol.dark ))
        return;
    
        const el = document.querySelector( str1 ).getBoundingClientRect();
        //.sortByButton, .filterButton
    
        const offsetY = ( !onclick )? 15 : 5;
        const box = document.querySelector( str2 );  //.sortBox, .filterBox
        const boxCoord = box.getBoundingClientRect();

        const whichButton = ( str1.indexOf( "sort" ) > -1 )? "sort" : "filter";
    
        const coord = {
            x: el.x - ( boxCoord.width - el.width )/2,
            y: el.y + el.height + offsetY
        }
        
        //console.table( coord );
        
        if( !onclick ){
            
            box.style.left = coord.x + "px";
            box.style.top = coord.y + "px";
            box.style.visibility = "hidden";

            isVisible[ whichButton ] = false;
    
        } else {

            box.style.visibility = ( isVisible[ whichButton ] )? "hidden" : "visible";
            isVisible[ whichButton ] = !isVisible[ whichButton ];

        }
    }
    
    if( !onclick )
        setTimeout( x, 1.5*1000 );
    else
        x();

}
//=========================================================================




let hoverBGCol = {
    light: hexToRgb( themeColors["--hovercard"][0] ),
    dark:  hexToRgb( themeColors["--hovercard"][1] )
};

//console.table( hoverBGCol );


sortButton.addEventListener( "click", () => { moveThisButtonToThatButton( ".sortByButton", ".sortBox", true ) });
filterButton.addEventListener( "click", () => { moveThisButtonToThatButton( ".filterButton", ".filterBox", true ) });


// add the functionality for clicking anywhere outside the button, then
// the visibility will go hidden for that respective button event

//sortButton.addEventListener( "click", ( e ) => { e.stopPropagation(); } );
document.addEventListener( "click", ( e ) => {
    if( isVisible.sort && e.target !== sortButton ){
        document.querySelector(".sortBox").style.visibility = "hidden";
        isVisible.sort = false;
    }
    if( isVisible.filter && e.target !== filterButton ){
        document.querySelector(".filterBox").style.visibility = "hidden";
        isVisible.filter = false;
    }
});



//===========[ UTILS ]=======================================================

function hexToRgb(hex) {
    // Remove any leading # or 0x from the input string
    hex = hex.replace(/^#|0x/g, '');
    hex = hex.toUpperCase();

    // Parse the hex string to get the red, green, and blue components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}