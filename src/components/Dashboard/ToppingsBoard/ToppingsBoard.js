import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import {  getAllToppings, createTopping } from '../../../utils/helper';


function ToppingCard(props) {
    return (
        <div className="topping shadow-lg rounded-lg md:mx-3 mb-3 p-2">
            <div className="toppping__image p-1 mb-2">
                <img className="h-48 w-full" src='' alt='' />
            </div>

            <div className="topping__name flex justify-center items-center font-bold text-lg text-gray-800 mb-1">
                {props.topping.name}
            </div>

            <div className="topping__price flex justify-center items-center text-base mb-2">
                <span className="mr-1 font-bold">Price: </span>{`₹ ${props.topping.price}.00`}
            </div>
        </div>
    );
}

function CreateToppingButton(props) {
    let [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('VEG');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createTopping(props.token, {
            name,
            price,
            category,
        })

        if(res.error){
            alert(res.message);
        }else{
            alert('Topping is created!');
            closeModal();
            props.setNew(true);
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-2 text-lime-500 hover:-translate-y-1 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create New Topping
                                </Dialog.Title>

                                <div className="mt-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="block">
                                                <span className="text-grey-700">Enter Topping Name</span>
                                                <input type='text' onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Topping Name' required />
                                            </label>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block">
                                                <span className="text-grey-700">Enter Price (₹)</span>
                                                <input type='text' onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Topping Price' required />
                                            </label>
                                        </div>

                                        <div className="mb-3">
                                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" />
                                                <span className="ml-2">Is Vegetarian</span>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 border border-transparent rounded-md hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export function ToppingBoard(props) {
    const [toppingList, setToppingList] = useState([]);
    const [isNewCreated, setIsNewCreated] = useState(false);

    useEffect(() => {
        const fetchToppings = async (token) => {
            const res = await getAllToppings(token);
            if (res.error) {
                alert(res.message);
            } else {
                setToppingList(res.data);
            }
        }

        fetchToppings(props.token);
        setIsNewCreated(false);
    }, [isNewCreated])

    return (
        <div className="toppings">
            <div className="toppings__options flex p-2 rounded-md mb-3 bg-white">
                <CreateToppingButton setNew = { setIsNewCreated } token = { props.token } />
            </div>

            <div className="toppings__board p-2 bg-white">
                <div className="grid grid-cols-1 justify-items-center items-center md:grid-cols-6">
                    {
                        toppingList.map(topping => {
                            return <ToppingCard isDeleted={setIsNewCreated} key={topping._id} topping={topping} token={props.token} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}