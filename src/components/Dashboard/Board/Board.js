import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { getAllUsers, titleCase, makeAdmin, getAllToppings, deleteTopping, createTopping } from '../../../utils/helper';


import { UsersBoard } from "../UsersBoard/UsersBoard";
import { ToppingBoard } from '../ToppingsBoard/ToppingsBoard';
import { PizzasBoard } from "../PizzasBoard/PizzaBoard";


export function Board(props) {
    return (
        <div className="board bg-amber-200 rounded-2xl p-4">
            {
                props.selectedBoard === 'users'
                &&
                <UsersBoard token={props.token} />
            }

            {
                props.selectedBoard === 'toppings'
                &&
                <ToppingBoard token={props.token} />
            }

            {
                props.selectedBoard === 'pizzas'
                &&
                <PizzasBoard token={props.token} />
            }
        </div>
    );
}