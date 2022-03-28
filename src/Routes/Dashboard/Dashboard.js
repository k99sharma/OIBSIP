// css
import './Dashboard.css';

import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { titleCase } from "../../utils/helper";


function Board() {
    return (
        <div className="flex justify-center items-center">

        </div>
    );
}

const menuOptions = [
    {
        id: 0,
        name: 'users',
    },
    {
        id: 1,
        name: 'topping'
    },
    {
        id: 2,
        name: 'pizzas'
    },
]

function DashboardMenuOptions(props) {
    return (
        <div className='flex p-5'>
            {
                menuOptions.map(option => {
                    return <button onClick={ () => { props.setSelectedBoard(option.name) }} className={`hover:-translate-y-1 transition rounded-lg ${props.selectedBoard === option.name && 'bg-gray-300'}`}>
                        <div className='mx-5 text-lg '>
                            { titleCase(option.name) }
                        </div>
                    </button>
                })
            }
        </div>
    )
}

export function Dashboard() {
    const authCtx = useContext(AuthContext);
    const [selectedBoard, setSelectedBoard] = useState('users');

    return (
        <div className="dashboard">
            <div className="dashboard__heading text-3xl font-medium mb-2 px-5 py-2">
                Hi! <span>{titleCase(authCtx.user.name.split(' ')[0])}</span>
            </div>

            <hr />

            <div className='flex justify-center items-center'>
                <DashboardMenuOptions selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
            </div>


            <Board />
        </div>
    );
}