// services/api.js
import axios from 'axios';

const API_URL = ' https://testappcrudifyex.pythonanywhere.com/api/v1/';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/`);
    return response.data; // <- тут ожидается массив товаров
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    throw error;
  }
};

export const getCartProducts = () => {
  return axios
    .get(`${API_URL}/cart/`, { withCredentials: true })
    .then(response => response.data)
    .catch(error => {
      console.error('Ошибка при запросе корзины:', error);
      throw error; // Бросаем ошибку дальше
    });
};




export const CreateOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order/create/`, orderData, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка при запросе создания заказа:', error.response.data);
    } else {
      console.error('Ошибка при запросе создания заказа:', error.message);
    }
    throw error;
  }
};



