import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Form, Input, message } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const StyledForm = styled(Form)`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: FormData) => {
    try {
      await axios.post('http://127.0.0.1:5000/api/submit', values);
      message.success('Получили весточку от вас!');
      form.resetFields();
    } catch (error) {
      message.error('Произошла ошибка при отправке данных.');
    }
  };

  return (
    <AppWrapper>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название вашей компании.' }]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>

        <Form.Item
          label="Обратная связь"
          name="email"
          rules={[
            { required: true, message: 'Введите email для обратной связи.' },
            { type: 'email', message: 'Введите корректный email.' }
          ]}
        >
          <Input placeholder="Введите email" />
        </Form.Item>

        <Form.Item
          label="Описание компании"
          name="description"
          rules={[
            { required: true, message: 'Необходимо ввести описание' }
          ]}
        >
          <Input.TextArea placeholder="Введите описание компании" rows={4} />
        </Form.Item>

        <Form.Item
          label="Регионы работы"
          name="regions"
        >
          <Input.TextArea placeholder="Введите регионы работы компании" rows={4} />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Отправить
          </Button>
        </Form.Item>
      </StyledForm>
    </AppWrapper>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
