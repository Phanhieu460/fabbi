import { Button, InputNumber, notification, Select, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dishData from '../data/dishes.json';
import { addDish } from '../redux/actions';

const { Text } = Typography;

const Dish = () => {
    const [selectedDish, setSelectedDish] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.order);
    const filterDataDish = dishData
        .filter(
            (item: any) =>
                item.restaurant === data.restaurant &&
                item.availableMeals.includes(data.meal)
        )
        .map((item) => ({
            value: item.name,
            label: item.name,
        }));

    const handleChangeDish = () => {
        const totalQuantity = data.dishes.reduce(
            (total: any, dish: any) => total + dish.quantity + quantity,
            0
        );
        if (selectedDish !== '') {
            if (totalQuantity >= 10) {
                notification.warning({
                    message: 'Warning',
                    description: 'You can only select up to 10 dishes.'
                })
            } else {
                dispatch(addDish(selectedDish, quantity));
            }
        } else {
            notification.warning({
                message: 'Warning',
                description: 'Please select a dish.'
            })
        }
        setSelectedDish('');
        setQuantity(1);
    };
    return (
        <>
            <div style={{ lineHeight: '0px', textAlign: 'left' }}>
                {data.dishes.map((item: any) => {
                    return (
                        <p style={{ padding: '4px' }}>
                            Dish: <span>{item.name}</span> - Quantity: <span>{item.quantity}</span>
                        </p>
                    );
                })}
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px',
                }}
            >
                <Text>Please select a dish</Text>
                <Select
                    onChange={(value) => setSelectedDish(value)}
                    placeholder='Select a dish'
                    options={filterDataDish}
                    value={selectedDish ? selectedDish : undefined}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px',
                }}
            >
                <Text>Please enter no of service</Text>
                <InputNumber
                    value={quantity}
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={(value: any) => setQuantity(value)}
                />
            </div>
            <Button onClick={handleChangeDish}>+</Button>
        </>
    );
};

export default Dish;
