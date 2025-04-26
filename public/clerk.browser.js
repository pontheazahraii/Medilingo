// Mock implementation for Clerk in development mode
(function() {
  console.log("Using mock Clerk implementation");
  
  // Create a mock Clerk object with the minimum functionality needed
  const mockClerk = {
    load: function(params) {
      console.log("Mock Clerk loaded with params:", params);
      return Promise.resolve();
    },
    
    // Basic user authentication methods
    isLoaded: true,
    isReady: true,
    
    user: {
      id: "mock-user-id",
      firstName: "Test",
      lastName: "User",
      imageUrl: "/avatar.png",
      // Add other properties as needed
    },
    
    // Minimal session methods
    session: {
      id: "mock-session-id",
      userId: "mock-user-id",
      status: "active"
    },
    
    // Add any other required methods or properties
    authenticate: function() {
      return Promise.resolve({
        status: "complete",
        signIn: { status: "complete" },
        signUp: { status: "complete" },
        createdSessionId: "mock-session-id",
        createdUserId: "mock-user-id"
      });
    },
    
    // Add minimal i18n stub to prevent errors
    i18n: {
      t: function(key) { return key; }
    }
  };
  
  // Expose to window
  window.Clerk = mockClerk;
})(); 