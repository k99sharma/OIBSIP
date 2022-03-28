import { titleCase } from '../../../utils/helper';

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

export function DashboardMenuOptions(props) {
    return (
        <div className='flex p-5'>
            {
                menuOptions.map(option => {
                    return <button key={option.id} onClick={ () => { props.setSelectedBoard(option.name) }} className={`hover:-translate-y-1 transition rounded-lg ${props.selectedBoard === option.name && 'bg-gray-300'}`}>
                        <div className='mx-5 text-lg '>
                            { titleCase(option.name) }
                        </div>
                    </button>
                })
            }
        </div>
    )
}
