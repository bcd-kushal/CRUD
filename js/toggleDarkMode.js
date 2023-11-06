//const setRootStylesVariables = document.documentElement;
import { ace_editor } from "./script";
import cssColors from "../json/themeShades.json";

const modeSelectorButton = document.querySelector(".darkModeContainer");

let isDarkMode = false;


modeSelectorButton.addEventListener( "click", () => {

    function toggleLightDark( colors ){
        
        console.log(colors)
        const root = document.documentElement;

        if (isDarkMode) {
            for (const [key,val] of Object.entries(colors) ) {
                console.log( key, ": ", val );
                //var updatedVal = (rootStylesVariables.getPropertyValue(key) == val[0])? val[1] : val[0];
                root.style.setProperty( key, val[0] );
            }
        } else {
            for (const [key,val] of Object.entries(colors) ) {
                console.log( key, ": ", val );
                //var updatedVal = (rootStylesVariables.getPropertyValue(key) == val[0])? val[1] : val[0];
                root.style.setProperty( key, val[1] );

            }
        }

        console.log( isDarkMode );
        isDarkMode = !isDarkMode;

    }

    
/* 
    const obj = Object.entries( cssColors );
    for(const [key, val] of obj){
        changeCSSGlobalVariableValueOnThemeChange( key, val );
    } */

    function toggleHeaderRowTheme(){
        const rootStylesVariables = getComputedStyle( document.documentElement );

        const thColor = document.querySelectorAll(".thDB");
        thColor.forEach((el,index) => {
            el.style.backgroundColor = rootStylesVariables.getPropertyValue("--tableHeaderCol");
        });
        
    }

    function initializeHeaderRows(){

        const query_tab = document.getElementsByClassName('queryParamsTab')[0];
        const crud_tab = document.getElementsByClassName('HeadersTab')[0];
        const table_tab = document.getElementsByClassName('JSONTab')[0];

        const rootStylesVariables = getComputedStyle( document.documentElement );

        let hoverTabColor = rootStylesVariables.getPropertyValue("--hovercard");
        let TabColor = rootStylesVariables.getPropertyValue("--primarycard");

        
        query_tab.style.backgroundColor = (query_tab.style.backgroundColor == (isDarkMode==true)? cssColors["--hovercard"][0] : cssColors["--hovercard"][1] ) ? hoverTabColor : TabColor;
        crud_tab.style.backgroundColor = (crud_tab.style.backgroundColor == (isDarkMode==true)? cssColors["--hovercard"][0] : cssColors["--hovercard"][1] ) ? hoverTabColor : TabColor;
        table_tab.style.backgroundColor = (table_tab.style.backgroundColor == (isDarkMode==true)? cssColors["--hovercard"][0] : cssColors["--hovercard"][1] ) ? hoverTabColor : TabColor;


    }

    function switchIconTheme(){
        
        let percentage = ( isDarkMode == true )? 100 : 0;

        const icons = document.querySelectorAll("img");
        icons.forEach((el,index) => {
            if( index != 3 )
                el.style.filter = `invert(${percentage}%)`;
        });

    }

    
    function switchACE_Theme(){
        var aceTheme = "ace/theme";
        
        document.getElementById("editor").style.transition = "0s";

        aceTheme += (isDarkMode)? "/twilight" : "/tomorrow"; 
        ace_editor.setTheme( aceTheme );

    }

    function toggleThemeIcons(){
        
        // Function to change the image when the div is clicked
        function changeImage( myImage) {
            if ( !isDarkMode ) {
                myImage.src = "./imgs/icons/lightMode.png";
                myImage.alt = "dark mode icon";
                myImage.style.height = "24px";
            } else {
                myImage.src = "./imgs/icons/darkMode.png";
                myImage.alt = "light mode icon";
                myImage.style.height = "25px";
            }
        }

        //const imageContainer = document.getElementsByClassName("darkModeContainer")[0];
        const themeIcon = document.getElementsByClassName("themeIcon")[0];
        changeImage( themeIcon );

    }


    toggleLightDark( cssColors );
    toggleHeaderRowTheme();
    initializeHeaderRows();
    switchIconTheme();
    switchACE_Theme();
    toggleThemeIcons();
    

});