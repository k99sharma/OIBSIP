import { useEffect, useState } from "react";
import { getAllUsers, titleCase, makeAdmin } from '../../../utils/helper';


function RoleChangeButton(props) {
    const handleRoleChange = async () => {
        const res = await makeAdmin(props.token, props.id);
        if (res.error) {
            alert(res.message);
        } else {
            alert('Role changed');
            props.setIsRoleChanged(true);
        }
    }

    return (
        <>
            <button className={props.currentRole === 'ADMIN' ? 'hidden' : ''} onClick={handleRoleChange}>
                <div className="bg-red-500 px-2 py-1 rounded-lg text-white">
                    Make Admin
                </div>
            </button>
        </>
    );
}

export function UsersBoard(props) {
    const [users, setUsers] = useState([]);
    const [isRoleChanged, setIsRoleChanged] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            const res = await getAllUsers(props.token);
            if (res.error) {
                alert(res.message);
            } else {
                setUsers(res.data);
            }
        }

        fetchUsers();
        setIsRoleChanged(false);
    }, [isRoleChanged])

    return (
        <>
            <div className="bg-amber-300 flex-grow grid grid-cols-1 md:grid-cols-6 py-3 px-5 mb-10 font-bold text-base md:items-center md:justify-items-center rounded-md">
                <div>
                    First Name
                </div>

                <div>
                    Last Name
                </div>

                <div>
                    Email Address
                </div>

                <div>
                    Phone Number
                </div>

                <div>
                    Role
                </div>
            </div>
            {

                users.map(user => {
                    return <div key={user._id} className="bg-white border-2 border-amber-400 flex-grow grid grid-cols-1 md:grid-cols-6 py-3 px-5 mb-4 md:items-center md:justify-items-center rounded-md">
                        <div className="mb-1">
                            {titleCase(user.firstName)}
                        </div>

                        <div className="mb-1">
                            {titleCase(user.lastName)}
                        </div>

                        <div className="mb-1">
                            {user.email}
                        </div>

                        <div className="mb-1">
                            {user.phoneNumber}
                        </div>

                        <div className="mb-1">
                            {user.role}
                        </div>

                        <div className="mb-1">
                            <RoleChangeButton id={user._id} token={props.token} currentRole={user.role} setIsRoleChanged={setIsRoleChanged} />
                        </div>
                    </div>
                })
            }
        </>

    );
}