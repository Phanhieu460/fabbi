import { InputNumber, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal, addPerson } from '../redux/actions';

const { Text } = Typography;

const MealCategory = () => {
    const dispatch = useDispatch();
    const meal = useSelector((state: any) => state.order.meal);
    const people = useSelector((state: any) => state.order.people);
    const onChange = (value: any) => {
        dispatch(addPerson(value));
    };
    const handleChangeMeal = (value: any) => {
        dispatch(addMeal(value));
    };
    return (
        <div style={{ lineHeight: '0px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px',
                }}
            >
                <Text>Please select a meal</Text>
                <Select
                    value={meal ? meal : undefined}
                    onChange={handleChangeMeal}
                    placeholder='Select a meal'
                    options={[
                        {
                            value: 'breakfast',
                            label: 'Breakfast',
                        },
                        {
                            value: 'lunch',
                            label: 'Lunch',
                        },
                        {
                            value: 'dinner',
                            label: 'Dinner',
                        },
                    ]}
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
                <Text>Please enter number of people</Text>
                <InputNumber
                    value={people ? people : 1}
                    min={1}
                    max={10}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default MealCategory;
