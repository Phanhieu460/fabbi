
import dishData from "../data/dishes.json"
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Select, Typography } from 'antd';
import { addRestaurant } from '../redux/actions';

const { Text } = Typography

const Restaurant = () => {
    const distpatch = useDispatch()
    const meal = useSelector((state: any) => state.order.meal)
    const restaurant = useSelector((state: any) => state.order.restaurant)

    const uniqueRestaurants: Set<string> = new Set();
    const filterRestaurant = dishData
        .filter((item) => item.availableMeals.includes(meal))
        .filter((item) => {
            if (!uniqueRestaurants.has(item.restaurant)) {
                uniqueRestaurants.add(item.restaurant);
                return true;
            }
            return false;
        })
        .map((item) => ({
            value: item.restaurant,
            label: item.restaurant,
        }));
    const handleChangeRestaurant = (value: any) => {
        distpatch(addRestaurant(value))
    }
    return (
        <Flex justify='space-between' align='center'>
            <Text>Please select a restaurant</Text>
            <Select
                value={restaurant ? restaurant : undefined}
                title='Please select a restaurant'
                options={filterRestaurant}
                placeholder='Select a restaurant'
                onChange={handleChangeRestaurant}
            />
        </Flex>
    );
}

export default Restaurant