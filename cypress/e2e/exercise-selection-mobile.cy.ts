describe('Exercise Selection Mobile Workflow', () => {
  beforeEach(() => {
    // Set mobile viewport (iPhone SE)
    cy.viewport(375, 667);
    cy.visit('/dashboard');
  });

  it('should complete full exercise selection workflow on mobile', () => {
    // Wait for dashboard to load
    cy.contains('IronForge').should('be.visible');
    cy.contains('Start Workout').should('be.visible');

    // Open exercise library from dashboard menu
    cy.get('[data-testid="user-menu-trigger"]').click();
    cy.contains('Exercise Library').click();
    
    // Wait for exercise library to open with slide animation
    cy.contains('Exercise Library').should('be.visible');
    
    // Wait for skeleton loading to complete
    cy.get('[data-testid="ion-skeleton-text"]', { timeout: 2000 }).should('not.exist');
    
    // Verify exercises are loaded
    cy.contains('Barbell Back Squat').should('be.visible');
    cy.contains('Bench Press').should('be.visible');
    
    // Test search functionality
    cy.get('ion-searchbar').type('deadlift');
    cy.contains('Deadlift').should('be.visible');
    cy.contains('Romanian Deadlift').should('be.visible');
    cy.contains('Barbell Back Squat').should('not.exist');
    
    // Clear search
    cy.get('ion-searchbar').clear();
    cy.contains('Barbell Back Squat').should('be.visible');
    
    // Test muscle group filtering by clicking chip
    cy.contains('Quads').click();
    cy.contains('Barbell Back Squat').should('be.visible');
    cy.contains('Bench Press').should('not.exist'); // Should be filtered out
    
    // Test infinite scroll (scroll to bottom)
    cy.scrollTo('bottom');
    cy.get('ion-infinite-scroll-content').should('be.visible');
    
    // Reset filter by clicking same muscle group
    cy.contains('Quads').click();
    cy.contains('Bench Press').should('be.visible'); // Should be back
    
    // Test exercise info button
    cy.get('.info-button').first().click();
    cy.contains('Instructions').should('be.visible');
    cy.contains('Commentary').should('be.visible');
    cy.contains('Similar Exercises').should('be.visible');
    
    // Test similar exercise navigation
    cy.get('.similar-exercises-card .info-button').first().click();
    cy.contains('Instructions').should('be.visible'); // Should show new exercise
    
    // Close exercise details
    cy.get('.close-button').click();
    cy.contains('Exercise Library').should('be.visible');
    
    // Test filter drawer
    cy.get('.filter-button').click();
    cy.contains('Filter').should('be.visible');
    cy.contains('Exercise type').should('be.visible');
    cy.contains('Muscle groups').should('be.visible');
    
    // Test filter options
    cy.get('ion-checkbox').first().click(); // Uncheck first exercise type
    cy.contains('Chest').click(); // Select chest muscle group
    cy.contains('Apply').click();
    
    // Verify filtering applied
    cy.contains('Bench Press').should('be.visible');
    cy.contains('Barbell Back Squat').should('not.exist');
    
    // Close exercise library
    cy.get('.back-button').click();
    cy.contains('IronForge').should('be.visible'); // Back to dashboard
  });

  it('should handle workout exercise addition flow', () => {
    cy.viewport(375, 667);
    cy.visit('/dashboard');
    
    // Start a new workout
    cy.get('[data-testid="workout-tab"]').click();
    cy.contains('Start New Workout').click();
    
    // Should be on workout page
    cy.contains('00:00:00').should('be.visible'); // Timer should be running
    cy.contains('Add Your First Exercise').should('be.visible');
    
    // Add exercise
    cy.contains('Add Your First Exercise').click();
    
    // Wait for AddExercise modal to load
    cy.contains('Add Exercise').should('be.visible');
    
    // Wait for skeleton loading to complete
    cy.get('[data-testid="ion-skeleton-text"]', { timeout: 1000 }).should('not.exist');
    
    // Search for exercise
    cy.get('ion-searchbar').type('squat');
    cy.contains('Barbell Back Squat').should('be.visible');
    
    // Select exercise
    cy.contains('Barbell Back Squat').click();
    
    // Should be back on workout page with exercise added
    cy.contains('Barbell Back Squat').should('be.visible');
    cy.contains('3 sets').should('be.visible');
    
    // Test set completion
    cy.get('.set-completion-button').first().click();
    cy.get('.set-completion-button').first().should('have.class', 'completed');
    
    // Add another exercise using the exercise button
    cy.contains('Exercise').click();
    cy.get('[data-testid="ion-skeleton-text"]', { timeout: 1000 }).should('not.exist');
    cy.contains('Bench Press').click();
    
    // Should now have 2 exercises
    cy.contains('Barbell Back Squat').should('be.visible');
    cy.contains('Bench Press').should('be.visible');
  });

  it('should handle mobile touch interactions properly', () => {
    cy.viewport(375, 667);
    cy.visit('/dashboard');
    
    // Test responsive design on mobile
    cy.get('[data-testid="user-menu-trigger"]').click();
    cy.contains('Exercise Library').click();
    
    // Wait for loading
    cy.get('[data-testid="ion-skeleton-text"]', { timeout: 2000 }).should('not.exist');
    
    // Test mobile touch targets are adequate
    cy.get('.info-button').should('have.css', 'width', '36px');
    cy.get('.info-button').should('have.css', 'height', '36px');
    
    // Test swipe-like scrolling behavior
    cy.get('.exercise-list').scrollTo('bottom');
    cy.get('ion-infinite-scroll-content').should('be.visible');
    
    // Test muscle chip interactions on mobile
    cy.get('.muscle-group-tag').first().click();
    cy.get('.muscle-group-tag').first().should('have.class', 'active');
    
    // Test mobile keyboard behavior
    cy.get('ion-searchbar').focus().type('bench{enter}');
    cy.contains('Bench Press').should('be.visible');
  });

  it('should maintain performance with skeleton loading', () => {
    cy.viewport(375, 667);
    cy.visit('/dashboard');
    
    // Measure loading performance
    const startTime = Date.now();
    
    cy.get('[data-testid="user-menu-trigger"]').click();
    cy.contains('Exercise Library').click();
    
    // Should immediately show skeletons
    cy.get('[data-testid="ion-skeleton-text"]').should('be.visible');
    
    // Skeletons should disappear after loading
    cy.get('[data-testid="ion-skeleton-text"]', { timeout: 2000 }).should('not.exist');
    
    // Verify performance - should load in reasonable time
    cy.then(() => {
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(3000); // Should load within 3 seconds
    });
  });
});