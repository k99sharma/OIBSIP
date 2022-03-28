export function ToppingCard(props){
    return(
        <div className="mx-2 bg-gray-300 p-1 shadow-md text-sm rounded-md">
        {props.topping.name}
        </div>
    );
}