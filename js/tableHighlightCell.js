
const TABLE_LOAD_TIMEOUT = 10*1000;

setTimeout(() => {

    const table = document.getElementsByClassName("tableDB")[0];
    const rows = table.getElementsByTagName("tr");

    for( let i=1; i<rows.length; i++ ){
        const cells = rows[i].getElementsByTagName("td");
        for( let j=0; j<cells.length; j++ ){

            //highlight the rows hovered
            cells[j].addEventListener( "mouseenter", () => {
                cells[j].style.boxShadow = "0px 0px 5px 1px var(--border3)";
                rows[i].style.backgroundColor = "var(--hoverTableShade)";

                for( let k=1; k<rows.length; k++ ){
                    const cell = rows[k].getElementsByTagName("td")[j];
                    if(cell)
                        cell.style.backgroundColor = "var(--hoverTableShade)";
            
                }
            });


            cells[j].addEventListener( "mouseleave", () => {
                cells[j].style.boxShadow = "none";
                rows[i].style.backgroundColor = ( i%2 == 0 )? "rgba(150,150,150,0.07)" : "transparent";

                for( let k=1; k<rows.length; k++ ){
                    const cell = rows[k].getElementsByTagName("td")[j];
                    if(cell)
                        cell.style.backgroundColor = ( k%2 == 0 )? "rgba(150,150,150,0.07)" : "transparent";
            
                }
            }); 
        }
    }

}, TABLE_LOAD_TIMEOUT );