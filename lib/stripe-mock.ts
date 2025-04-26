// Mock implementation of Stripe for local development

// Mock Stripe object
export const stripe = {
  checkout: {
    sessions: {
      create: async () => ({
        url: 'http://localhost:3000/mock-checkout',
      }),
    },
  },
  billingPortal: {
    sessions: {
      create: async () => ({
        url: 'http://localhost:3000/mock-billing',
      }),
    },
  },
  webhooks: {
    constructEvent: () => ({
      type: 'mock.event',
      data: {
        object: {
          id: 'mock_id',
          customer: 'mock_customer',
          subscription: 'mock_subscription',
          status: 'active',
          items: {
            data: [{ price: { id: 'mock_price' } }],
          },
        },
      },
    }),
  },
};

export default stripe; 