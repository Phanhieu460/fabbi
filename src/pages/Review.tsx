import { Flex, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Title } = Typography

const Review = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.order)
    return (
        <div style={{ padding: '4px' }}>
            <Flex>
                <Title level={4}>Meal: {data.meal}</Title>
            </Flex>
            <Flex>
                <Title level={4}>People: {data.people}</Title>
            </Flex>
            <Flex>
                <Title level={4}>Restaurant: {data.restaurant}</Title>
            </Flex>
            <Flex>
                <Title level={4}>Dishes:</Title>
                <div style={{ lineHeight: '0px', padding: '2px' }}>
                    {data.dishes.map((item: any) => {
                        return (
                            <Title level={5}>
                                {item.name} - {item.quantity}
                            </Title>
                        );
                    })}
                </div>
            </Flex>



        </div>
    )
}

export default Review