import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log('form submitted', data)
        const saveCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: saveCart, shipment: data, orderTime: new Date()}

        fetch('https://floating-coast-56810.herokuapp.com/addOrder', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                processOrder()
               alert('your order placed successfully'); 
            }
        })
    };

    console.log(watch("example"));
    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input  defaultValue={loggedInUser.name}{...register("name", { required: true })} placeholder="Your Name"/>
            {errors.name && <span className="error">Name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email"/>
            {errors.email && <span className="error">Email is required</span>}

            <input  {...register("address", { required: true })} placeholder="Your Address"/>
            {errors.address && <span className="error">Address is required</span>}

            <input  {...register("phone", { required: true })} placeholder="Your Phone number"/>
            {errors.phone && <span className="error">Phone is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;