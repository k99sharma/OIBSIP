import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { getAllPizzas, createPizza, deletePizza, getAllToppings, formatToppingNameToId } from '../../../utils/helper';
import Select from 'react-select';
import { correctToppingFormat } from "../../../utils/helper";
import { ToppingCard } from "../../PizzaCard/ToppingCard/ToppingCard";


function PizzaCard(props) {
    const handleDelete = async () => {
        const res = await deletePizza(props.token, props.pizza._id);
        if (res.error) {
            alert(res.message);
        } else {
            alert('Pizza deleted');
            props.setDeleted(true);
        }
    }

    return (
        <div className="pizza shadow-lg rounded-lg md:mx-3 mb-3 p-2">
            <div className="pizza__image p-1 mb-2">
                <img className="h-48 w-full" src={props.pizza.imageUrl} alt={props.pizza.name} />
            </div>

            <div className="topping__name flex justify-center items-center font-bold text-lg text-gray-800 mb-1">
                {props.pizza.name}
            </div>

            <div className="topping__price flex justify-center items-center text-base mb-2">
                <span className="mr-1 font-bold">Price: </span>{`₹ ${props.pizza.price}.00`}
            </div>

            <div className="pizza__toppings mb-3 px-2 flex grid-cols-3">
                {
                    props.pizza.toppings.map(topping => {
                        return <ToppingCard key={topping._id} topping={topping} />
                    })
                }
            </div>

            <div className="topping__delete flex justify-right items-center">
                <button onClick={handleDelete} className="bg-red-500 text-white px-1 rounded-md">
                    Delete
                </button>
            </div>
        </div>
    );
}

function ToppingsSelect(props) {
    const [toppingsName, setToppingsName] = useState([]);
    const [toppingOptions, setToppingOptions] = useState([]);
    const [toppingData, setToppingData] = useState([]);

    useEffect(() => {
        // fetch toppings data
        const fetchToppings = async (token) => {
            const res = await getAllToppings(token);
            if (res.error) {
                alert(res.message);
            } else {
                setToppingOptions(correctToppingFormat(res.data));
                setToppingData(res.data);
            }
        }
        fetchToppings(props.token);
    }, [])

    useEffect(() => {
        const ids = formatToppingNameToId(toppingsName, toppingData)
        props.setToppings(ids);
    }, [toppingsName])

    return (
        <>
            <Select
                onChange={e => setToppingsName(e)}
                isMulti
                name='toppings'
                options={toppingOptions}
                required
            />
        </>
    );
}

function CrustSelect(props) {
    const crustOptions = [
        { value: 'SMALL', label: 'Small' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'LARGE', label: 'Large' },
    ]
    return (
        <>
            <Select
                onChange={e => props.setCrustType(e.value)}
                name='crust'
                options={crustOptions}
                required
            />
        </>
    );
}

function CreatePizzaButton(props) {
    let [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [crustType, setCrustType] = useState(null);
    const [toppings, setToppings] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPizza(props.token, {
            name,
            imageUrl,
            crustType,
            toppings
        })

        if (res.error) {
            alert(res.message);
        } else {
            alert('Pizza is created!');
            props.setNew(true);
            closeModal();
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
                    className="px-4 py-2 hover:-translate-y-1 transition bg-lime-300 hover:bg-lime-500 text-lime-800 rounded-md"
                >
                    New
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
                            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform shadow-xl rounded-2xl bg-white">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create New Pizza
                                </Dialog.Title>

                                <div className="mt-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="block">
                                                <span className="text-grey-700">Pizza Name</span>
                                                <input type='text' onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Pizza Name' required />
                                            </label>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block">
                                                <span className="text-grey-700">Enter Image Url</span>
                                                <input type='text' onChange={e => setImageUrl(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='https://' required />
                                            </label>
                                        </div>


                                        <div className="mb-3">
                                            <label className="block">
                                                <span className="text-grey-700">Pizza Crust Type</span>
                                                <CrustSelect setCrustType={setCrustType} />
                                            </label>
                                        </div>

                                        {/* TODO react multiselect */}
                                        <div className="mb-3">
                                            <label className="block">
                                                <span className="text-grey-700">Choose Toppings</span>
                                                <ToppingsSelect token={props.token} setToppings={setToppings} />
                                            </label>
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

function NoPizza() {
    return (
        <>
            <div className="noPizza grid grid-cols-1 justify-items-center items-center bg-white rounded-lg">
                <div className="mb-5">
                    <img className="w-52 h-52" src='/topping.png' alt='no pizza' />
                </div>

                <div className="text-4xl font-bold mb-10">
                    No Pizza Found!
                </div>
            </div>
        </>
    )
}

export function PizzasBoard(props) {
    const [pizzaList, setPizzaList] = useState([]);
    const [isNewCreated, setIsNewCreated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);


    useEffect(() => {
        const fetchPizzas = async (token) => {
            const res = await getAllPizzas(token);
            if (res.error) {
                console.log(res.message)
            } else {
                setPizzaList(res.data);
            }
        }

        fetchPizzas(props.token);
        setIsNewCreated(false);
        setIsDeleted(false);
    }, [isNewCreated, isDeleted])


    return (
        <div className="pizza">
            <div className="pizza__options flex p-2 rounded-md mb-3">
                <CreatePizzaButton setNew={setIsNewCreated} token={props.token} />
            </div>
            {
                pizzaList.length !== 0
                    ?
                    <div className="pizza__board p-2 bg-white">
                        <div className="grid grid-cols-1 justify-items-center items-center md:grid-cols-6">
                            {
                                pizzaList.map(pizza => {
                                    return <PizzaCard setDeleted={setIsDeleted} setNew={setIsNewCreated} key={pizza._id} pizza={pizza} token={props.token} />
                                })

                            }
                        </div>
                    </div>
                    :
                    <NoPizza />
            }

        </div>
    );
}