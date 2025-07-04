// ... existing code ...

type Session = {
  status: string;
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
};

type Program = {
  sessions: Session[];
};

export const CourseSessioonProgramHelper = (program: Program) => {
  const getFirstSessionDate = (): string | null => {
    if (!program?.sessions || program.sessions.length === 0) {
      return null;
    }

    // Sort sessions by date
    const sortedSessions = [...program.sessions].sort((a, b) => {
      // Convert Shamsi dates to comparable format (assuming format is YYYY/MM/DD)
      const [aYear, aMonth, aDay] = a.date.split('/').map(Number);
      const [bYear, bMonth, bDay] = b.date.split('/').map(Number);

      // Compare year
      if (aYear !== bYear) {
        return aYear - bYear;
      }
      // Compare month
      if (aMonth !== bMonth) {
        return aMonth - bMonth;
      }
      // Compare day
      return aDay - bDay;
    });

    // Return the first date
    return sortedSessions[0]?.date || null;
  };

  return {
    getFirstSessionDate,
  };
};
