// Order API service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface CartItem {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  date: number;
  total_amount: number;
  items: CartItem[];
}

export class OrderApiService {
  private static instance: OrderApiService;

  private constructor() {}

  public static getInstance(): OrderApiService {
    if (!OrderApiService.instance) {
      OrderApiService.instance = new OrderApiService();
    }
    return OrderApiService.instance;
  }

  /**
   * Submit current order to the backend
   * @param orderData - Order data to submit
   * @returns Promise<void>
   */
  async submitOrder(orderData: OrderData): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/currentOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
      throw new Error('Failed to submit order. Please try again later.');
    }
  }
}

// Export a singleton instance
export const orderApiService = OrderApiService.getInstance();