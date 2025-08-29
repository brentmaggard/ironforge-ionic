import { rest } from 'msw';

// Exercise data for future API integration
const mockExercises = [
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    description: 'Compound lower body exercise targeting quads, glutes, and hamstrings',
    completionCount: 23,
    muscleGroups: ['Quads', 'Glutes', 'Back'],
    primaryMuscles: ['Quads', 'Glutes'],
    secondaryMuscles: ['Back', 'Core'],
    equipment: 'Barbell',
    type: 'strength'
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    description: 'Upper body compound movement for chest, shoulders, and triceps',
    completionCount: 18,
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Barbell',
    type: 'strength'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    description: 'Full body compound exercise focusing on posterior chain',
    completionCount: 15,
    muscleGroups: ['Back', 'Glutes', 'Posterior thighs'],
    primaryMuscles: ['Back', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Traps', 'Forearms', 'Core'],
    equipment: 'Barbell',
    type: 'strength'
  }
];

export const handlers = [
  // GET /api/exercises - Paginated exercise list
  rest.get('/api/exercises', (req, res, ctx) => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const search = url.searchParams.get('search') || '';
    const muscleGroup = url.searchParams.get('muscleGroup');
    
    let filteredExercises = mockExercises;
    
    // Apply search filter
    if (search) {
      filteredExercises = mockExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(search.toLowerCase()) ||
        exercise.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply muscle group filter
    if (muscleGroup) {
      filteredExercises = filteredExercises.filter(exercise =>
        exercise.muscleGroups.includes(muscleGroup)
      );
    }
    
    // Simulate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedExercises = filteredExercises.slice(startIndex, endIndex);
    
    // Simulate network delay
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        exercises: paginatedExercises,
        total: filteredExercises.length,
        page,
        totalPages: Math.ceil(filteredExercises.length / limit),
        hasMore: endIndex < filteredExercises.length
      })
    );
  }),

  // GET /api/exercises/:id - Individual exercise details
  rest.get('/api/exercises/:id', (req, res, ctx) => {
    const { id } = req.params;
    const exercise = mockExercises.find(ex => ex.id === id);
    
    if (!exercise) {
      return res(
        ctx.delay(100),
        ctx.status(404),
        ctx.json({ error: 'Exercise not found' })
      );
    }
    
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json(exercise)
    );
  }),

  // POST /api/workouts/:id/exercises - Add exercise to workout
  rest.post('/api/workouts/:workoutId/exercises', (req, res, ctx) => {
    return res(
      ctx.delay(150),
      ctx.status(201),
      ctx.json({ success: true, message: 'Exercise added to workout' })
    );
  }),

  // Error scenarios for testing
  rest.get('/api/exercises/error', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.status(500),
      ctx.json({ error: 'Server error' })
    );
  })
];