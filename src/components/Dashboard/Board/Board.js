function UsersBoard() {
    return (
        <div>
            Users
        </div>
    );
}

function ToppingBoard() {
    return (
        <div>
            Topping
        </div>
    );
}

function PizzasBoard() {
    return (
        <div>
            Pizzas
        </div>
);
}


export function Board(props) {
    return (
        <div className="board flex justify-center items-center bg-amber-400 rounded-2xl">
            {
                props.selectedBoard === 'users'
                &&
                <UsersBoard />
            }

            {
                props.selectedBoard === 'topping'
                &&
                <ToppingBoard />
            }

            {
                props.selectedBoard === 'pizzas'
                &&
                <PizzasBoard />
            }
        </div>
    );
}