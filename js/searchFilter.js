
const TABLE_LOAD_TIMEOUT = 10*1000;

setTimeout(() => {

    const searchBar = document.querySelector(".searchField");
    const tableData = document.querySelector(".tableDB");

    let totalRowsOnDisplay = 0;

    searchBar.addEventListener( "keyup", () => {

        const keyword = searchBar.value.toLowerCase();
        const rows = tableData.getElementsByTagName("tr");

        let k = 0;

        for( var i=1; i<rows.length; i++ ){
            const row = rows[i];
            const cells = row.getElementsByTagName("td");

            let rowDisplay = false;

            for( let j=0; j<cells.length; j++ ){
                const cell = cells[j];
                if(cell){
                    const textContent = cell.textContent || cell.innerText || "";
                    if( textContent.toLowerCase().indexOf( keyword ) > -1 ){
                        rowDisplay = true;

                        for( let x=0; x<cells.length; x++ )
                            cells[x].style.backgroundColor = ( k%2 == 1)? "rgba(150,150,150,0.07)" : "transparent";

                        break;
                    }
                }
            }

            if( rowDisplay ){
                row.style.display = "";
                totalRowsOnDisplay += 1;
                k += 1;
            } else {
                row.style.display = "none";
            }

        }

        if( totalRowsOnDisplay == 0 ) //no rows match the filter
            console.log( " No Rows Match the Filter. ");
    });

}, TABLE_LOAD_TIMEOUT );

