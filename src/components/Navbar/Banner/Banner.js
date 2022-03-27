export function Banner(){
    return(
        <div className="banner flex justify-items-center items-center">
            <img src='/logo512.png' height={48} width={48} alt='banner pizza' />
            <div className="ml-2 font-medium text-base">
                Mount Pizza
            </div>
        </div>
       
    );
}