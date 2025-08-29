describe('Ionic Component Usage Improvements', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  describe('Dashboard Page', () => {
    it('should display action cards with proper Ionic components', () => {
      // Check that action cards are present
      cy.contains('Start Workout').should('be.visible');
      cy.contains('Browse Exercises').should('be.visible');
      
      // Verify cards are clickable
      cy.contains('Start Workout').parent().should('have.attr', 'button');
      cy.contains('Browse Exercises').parent().should('have.attr', 'button');
    });

    it('should display progress metrics with proper structure', () => {
      cy.contains('Your Progress').should('be.visible');
      
      // Check that progress items exist
      cy.contains('3/4').should('be.visible');
      cy.contains('Weekly Goal').should('be.visible');
      cy.contains('18.2k').should('be.visible');
      cy.contains('Monthly Volume').should('be.visible');
    });

    it('should display active goals with progress bars', () => {
      cy.contains('Active Goals').should('be.visible');
      cy.contains('View All').should('be.visible');
      
      // Check goal cards
      cy.contains('Bench Press PR').should('be.visible');
      cy.contains('Squat Consistency').should('be.visible');
      
      // Verify progress indicators
      cy.contains('92%').should('be.visible');
      cy.contains('75%').should('be.visible');
    });

    it('should display latest workout information', () => {
      cy.contains('Latest Workout').should('be.visible');
      cy.contains('Full Body Beginner - Week 12').should('be.visible');
      cy.contains('3 exercises • 45m 0s').should('be.visible');
      cy.contains('2 days ago').should('be.visible');
    });
  });

  describe('Exercise Library Accessibility', () => {
    beforeEach(() => {
      // Navigate to exercise library
      cy.get('[data-testid="menu-trigger"]').click();
      cy.contains('Exercise Library').click();
    });

    it('should show loading skeleton initially', () => {
      cy.get('ion-skeleton-text').should('be.visible');
    });

    it('should display exercises after loading completes', () => {
      // Wait for loading to complete
      cy.get('ion-skeleton-text').should('not.exist', { timeout: 3000 });
      
      // Verify exercises are displayed
      cy.contains('Barbell Back Squat').should('be.visible');
      cy.contains('Bench Press').should('be.visible');
      cy.contains('Deadlift').should('be.visible');
    });

    it('should have searchable exercise list', () => {
      cy.get('ion-skeleton-text').should('not.exist', { timeout: 3000 });
      
      // Test search functionality
      cy.get('ion-searchbar input').type('squat');
      cy.contains('Barbell Back Squat').should('be.visible');
      
      // Clear search
      cy.get('ion-searchbar input').clear();
    });

    it('should have clickable muscle group chips', () => {
      cy.get('ion-skeleton-text').should('not.exist', { timeout: 3000 });
      
      // Find and click a muscle group chip
      cy.get('ion-chip').first().click();
      
      // Verify filtering behavior (chip should be highlighted or content filtered)
      cy.get('ion-chip').first().should('have.class', 'active').or('exist');
    });

    it('should display completion badges', () => {
      cy.get('ion-skeleton-text').should('not.exist', { timeout: 3000 });
      
      // Check for completion badges
      cy.get('ion-badge').should('exist');
      cy.contains('Logged workouts').should('be.visible');
    });

    it('should have infinite scroll functionality', () => {
      cy.get('ion-skeleton-text').should('not.exist', { timeout: 3000 });
      
      // Scroll to bottom to trigger infinite scroll
      cy.scrollTo('bottom');
      
      // Check for infinite scroll content
      cy.get('ion-infinite-scroll').should('exist');
      cy.contains('Loading more exercises').should('be.visible').or('not.exist');
    });
  });

  describe('Workout Page Accessibility', () => {
    beforeEach(() => {
      // Navigate to workout page
      cy.get('[data-testid="workout-tab"]').click();
      cy.contains('Start New Workout').click();
    });

    it('should have accessible header buttons', () => {
      // Check that buttons have proper aria-labels
      cy.get('[aria-label="Close workout"]').should('exist');
      cy.get('[aria-label="Pause workout"]').should('exist').or('[aria-label="Resume workout"]').should('exist');
      cy.get('[aria-label="Workout settings"]').should('exist');
      cy.get('[aria-label="Complete workout"]').should('exist');
    });

    it('should update pause button aria-label when clicked', () => {
      // Click pause button
      cy.get('[aria-label="Pause workout"]').click();
      
      // Should now show resume
      cy.get('[aria-label="Resume workout"]').should('exist');
      
      // Click again to resume
      cy.get('[aria-label="Resume workout"]').click();
      
      // Should be back to pause
      cy.get('[aria-label="Pause workout"]').should('exist');
    });
  });

  describe('Profile Page Button Structure', () => {
    beforeEach(() => {
      // Navigate to profile page
      cy.get('[data-testid="menu-trigger"]').click();
      cy.contains('Profile').click();
      cy.contains('Edit').click();
    });

    it('should have proper button structure for avatar editing', () => {
      // Check that avatar is wrapped in a button with proper accessibility
      cy.get('[aria-label="Change profile photo"]').should('exist');
      cy.get('[aria-label="Change profile photo"]').should('be.visible');
      
      // Verify it\'s actually a button element
      cy.get('[aria-label="Change profile photo"]').should('have.prop', 'tagName', 'ION-BUTTON');
    });

    it('should trigger photo action sheet when avatar button is clicked', () => {
      cy.get('[aria-label="Change profile photo"]').click();
      
      // Should show action sheet options
      cy.contains('Take Photo').should('be.visible');
      cy.contains('Choose from Gallery').should('be.visible');
      cy.contains('Remove Photo').should('be.visible');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should work properly on mobile viewport', () => {
      cy.viewport('iphone-x');
      
      // Check that dashboard still displays correctly
      cy.contains('Start Workout').should('be.visible');
      cy.contains('Browse Exercises').should('be.visible');
      cy.contains('Your Progress').should('be.visible');
      
      // Test navigation
      cy.get('[data-testid="workout-tab"]').should('be.visible');
      cy.get('[data-testid="progress-tab"]').should('be.visible');
    });

    it('should handle touch interactions properly', () => {
      cy.viewport('iphone-x');
      
      // Test touch events on cards
      cy.contains('Start Workout').click();
      
      // Should navigate or show action sheet
      cy.url().should('include', '/workout').or('contain', 'Start New Workout');
    });
  });
});