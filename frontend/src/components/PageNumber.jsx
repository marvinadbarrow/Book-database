export const PageNumber = ({pages, whichPage}) =>{


    let lastItemIndex = pages.length - 1
let selectedPage = pages[lastItemIndex][1]
let borderClass;

const getPage = (number) =>{
console.log('getting page...')
console.log(number)
whichPage(number)
}

        return(
            <>

   {
    pages.map(page =>{


        
        if(page[0] == 'page_number'){
            if(page[1] === selectedPage){
borderClass = 'pagination-span selected-page'
            }else{
borderClass = 'pagination-span'
            }
            return(
                <span className={borderClass}   onClick={() =>{
                    getPage(page[1])
                }}><a href=""></a>{page[1] + 1}</span>
            )
        }

    })
   }
            
            </>
            
               )

    


}