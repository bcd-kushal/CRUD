

const query_tab = document.getElementsByClassName('queryParamsTab')[0];
const crud_tab = document.getElementsByClassName('HeadersTab')[0];
const table_tab = document.getElementsByClassName('JSONTab')[0];




// functions to change tabs -----------------------------------------
const tab_index = {
    '[data-query-params-tab]': 1,
    '[data-headers-tab]': 2,
    '[data-json-tab]': 3
}

document.querySelector('[data-query-params-tab]').addEventListener('click', () => {
    toggleTabs(tab_index["[data-query-params-tab]"]);
});
document.querySelector('[data-headers-tab]').addEventListener('click', () => {
    toggleTabs(tab_index["[data-headers-tab]"]);
});
document.querySelector('[data-json-tab]').addEventListener('click', () => {
    toggleTabs(tab_index["[data-json-tab]"]);
});
//---------------------------------------------------------------------



// tab functioning ----------------------------------------------------
function toggleTabs(num) {

    const rootStylesVariables = getComputedStyle( document.documentElement );

    let hoverTabColor = rootStylesVariables.getPropertyValue("--hovercard");
    let TabColor = rootStylesVariables.getPropertyValue("--primarycard");

    query_tab.style.backgroundColor = (num == 1) ? hoverTabColor : TabColor;
    crud_tab.style.backgroundColor = (num == 2) ? hoverTabColor : TabColor;
    table_tab.style.backgroundColor = (num == 3) ? hoverTabColor : TabColor;

    query_tab.style.fontWeight = (num == 1) ? "bold" : "normal";
    crud_tab.style.fontWeight = (num == 2) ? "bold" : "normal";
    table_tab.style.fontWeight = (num == 3) ? "bold" : "normal";


    const query_field = document.getElementsByClassName('queryWrapper')[0];
    const headers_field = document.getElementsByClassName('headerWrapper')[0];
    const json_field = document.getElementsByClassName('jsonWrapper')[0];



    if (num == 1) {
        query_field.style.display = "block";
        headers_field.style.display = "none";
        json_field.style.display = "none";
    } else if (num == 2) {
        query_field.style.display = "none";
        headers_field.style.display = "block";
        json_field.style.display = "none";
    } else {
        query_field.style.display = "none";
        headers_field.style.display = "none";
        json_field.style.display = "block";
    }
}

function toggleResponseTabs(num) {

    const rootStylesVariables = getComputedStyle( document.documentElement );

    const bodyAnsBox = document.getElementsByClassName('bodyAnsContainer')[0];
    const headerAnsBox = document.getElementsByClassName('headerAnsContainer')[0];

    bodyAnsBox.style.display = (num === 1) ? "block" : "none";
    headerAnsBox.style.display = (num === 2) ? "block" : "none";

    const bodyResponseTab = document.querySelector('[data-body-response-tab]');
    const headerResponseTab = document.querySelector('[data-header-response-tab]');
    const hoverShade = rootStylesVariables.getPropertyValue("--af");
    const tabShade = rootStylesVariables.getPropertyValue("--primarycard");

    bodyResponseTab.style.backgroundColor = (num === 1) ? hoverShade : tabShade;
    headerResponseTab.style.backgroundColor = (num === 2) ? hoverShade : tabShade;
    bodyResponseTab.style.fontWeight = (num === 1) ? "bold" : "normal";
    headerResponseTab.style.fontWeight = (num === 2) ? "bold" : "normal";
}
//---------------------------------------------------------------------
