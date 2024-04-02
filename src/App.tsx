import { Button, notification, Steps, theme } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Dish from './pages/Dish';
import MealCategory from './pages/MealCategory';
import Restaurant from './pages/Restaurant';
import Review from './pages/Review';
import { nextStep, resetState } from './redux/actions';

function App() {
  const steps = [
    {
      title: 'Step 1',
      content: <MealCategory />,
    },
    {
      title: 'Step 2',
      content: <Restaurant />,
    },
    {
      title: 'Step 3',
      content: <Dish />,
    },
    {
      title: 'Review',
      content: <Review />,
    },
  ];
  const { token } = theme.useToken();
  const data = useSelector((state: any) => state.order);
  const dispatch = useDispatch()
  const next = () => {
    if (data.step === 0) {
      if (!data.meal) {
        notification.warning({
          message: 'Warning',
          description: 'Please select a meal.',
        });
        return;
      }
    } else if (data.step === 1) {
      if (!data.restaurant) {
        notification.warning({
          message: 'Warning',
          description: 'Please select a restaurant.',
        });
        return;
      }
    } else if (data.step === 2) {
      if (data.dishes.length === 0) {
        notification.warning({
          message: 'Warning',
          description: 'Please select a dish.',
        });
        return;
      } else if (data.dishes.length > 0) {
        const totalQuantity = data.dishes.reduce(
          (total: any, dish: any) => total + dish.quantity,
          0
        );
        if (totalQuantity < data.people) {
          notification.warning({
            message: 'Warning',
            description:
              'Total quantity of dishes must be greater than or equal to the number of people.',
          });
          return;
        }
      }
    }
    dispatch(nextStep(data.step + 1))
  };

  const prev = () => {
    dispatch(nextStep(data.step - 1))
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const handleSubmit = () => {
    dispatch(resetState())
    notification.success({
      message: "Success",
      description: "Order successfully!"
    })
  }
  return (
    <div className='App'>
      <Steps current={data.step} items={items} />
      <div style={contentStyle}>{steps[data.step].content}</div>
      <div style={{ marginTop: 24 }}>
        {data.step > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {data.step < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {data.step === steps.length - 1 && (
          <Button
            type='primary'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
