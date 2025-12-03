export const getWeekDate = (weekNumber, startDate) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + (weekNumber - 1) * 7);
  return date;
};

export const formatDate = (date) => {
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

export const getCurrentWeek = (startDate) => {
  const now = new Date();
  const diffTime = now - startDate;
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  return Math.max(1, diffWeeks);
};

export const calculateStats = (studyAreas) => {
  let totalCards = 0;
  let totalModules = 0;
  let totalHours = 0;
  
  Object.values(studyAreas).forEach(area => {
    totalModules += area.modules || 0;
    totalHours += area.hours || 0;
    
    if (area.flashcards) {
      Object.values(area.flashcards).forEach(category => {
        totalCards += category.cards.length;
      });
    }
  });
  
  return { 
    totalAreas: Object.keys(studyAreas).length, 
    totalCards, 
    totalModules, 
    totalHours 
  };
};