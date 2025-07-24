import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Extract numeric value from cost string (e.g., "$15" or "S$15")
    const getNumericCost = (costString) => {
        const match = costString.toString().match(/[\d.]+/); // Extract digits and decimals
        return match ? parseFloat(match[0]) : 0;
    };

    const calculateTotalAmount = () => {
        return cart
            .reduce((total, item) => total + getNumericCost(item.cost) * item.quantity, 0)
            .toFixed(2);
    };

    const calculateTotalCost = (item) => {
        return (getNumericCost(item.cost) * item.quantity).toFixed(2);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        if (onContinueShopping) {
            onContinueShopping();
        }
    };

    const handleCheckoutShopping = (e) => {
        e.preventDefault();
        alert('Functionality to be added for future reference');
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">${getNumericCost(item.cost)}</div>
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-total">
                                Total: ${calculateTotalCost(item)}
                            </div>
                            <button
                                className="cart-item-delete"
                                onClick={() => handleRemove(item)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>
                    Continue Shopping
                </button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;
