// css
import './Dashboard.css';

import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { titleCase } from "../../utils/helper";
import { Board } from '../../components/Dashboard/Board/Board';
import { DashboardMenuOptions } from '../../components/Dashboard/MenuNavigation/MenuNavigation';

export function Dashboard() {
    const authCtx = useContext(AuthContext);
    const [selectedBoard, setSelectedBoard] = useState('users');

    return (
        <div className="dashboard">
            <div className="dashboard__heading text-3xl font-medium mb-2 px-5 py-2">
                Hi! <span>{titleCase(authCtx.user.name.split(' ')[0])}</span>
            </div>

            <hr />

            <div className='dashboard__menu__options flex justify-center items-center'>
                <DashboardMenuOptions selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
            </div>


            <div className='dashboard__menu__board p-5'>
                <Board selectedBoard = { selectedBoard } />
            </div>
        </div>
    );
}