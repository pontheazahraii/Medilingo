// Mock Clerk browser.js implementation for local development
(function() {
  console.log('Mock Clerk initialized for local development');
  
  // Create a global window.Clerk object
  window.Clerk = {
    version: '4.0.0',
    sdkVersion: '4.0.0',
    load: function() {
      return Promise.resolve({
        user: {
          id: 'mock-user-id',
          firstName: 'Test',
          lastName: 'User',
          fullName: 'Test User',
          imageUrl: '/avatar.png',
          primaryEmailAddress: {
            emailAddress: 'test@example.com'
          },
          getToken: function() {
            return Promise.resolve('mock-token');
          }
        },
        session: { 
          id: 'mock-session-id',
          status: 'active'
        },
        client: {
          sessions: {
            getToken: function() {
              return Promise.resolve('mock-token');
            }
          }
        },
        openSignIn: function() {},
        openSignUp: function() {},
        signOut: function() {
          return Promise.resolve();
        }
      });
    }
  };
  
  // Define all required Clerk methods
  window.__clerk_frontend_api = 'mock-api';
  
  // Create a Proxy for any missing methods
  const clerkHandler = {
    get: function(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      console.log('Mock Clerk: Accessing undefined property', prop);
      return function() {
        return Promise.resolve({});
      };
    }
  };
  
  window.Clerk = new Proxy(window.Clerk, clerkHandler);
  
  // Dispatch an event to signal Clerk is ready
  setTimeout(function() {
    window.dispatchEvent(new Event('clerk.load'));
    window.dispatchEvent(new Event('clerk.ready'));
  }, 0);
})(); 