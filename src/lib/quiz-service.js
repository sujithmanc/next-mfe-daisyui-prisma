import prisma from './prisma';

const QuizService = {
  // CREATE: store a JSON payload for a quiz
  async createQuiz(data) {
    try {
      return await prisma.quizzes.create({
        data: { data }
      });
    } catch (error) {
      console.error('Error in createQuiz:', error);
      throw error;
    }
  },

  // READ: fetch all quizzes
  async getAllQuizzes() {
    try {
      return await prisma.quizzes.findMany({
        orderBy: { id: 'desc' }
      });
    } catch (error) {
      console.error('Error in getAllQuizzes:', error);
      throw error;
    }
  },

  // READ: single quiz by id
  async getQuizById(id) {
    try {
      return await prisma.quizzes.findUnique({
        where: { id: parseInt(id, 10) }
      });
    } catch (error) {
      console.error('Error in getQuizById:', error);
      throw error;
    }
  },

  // UPDATE: replace the JSON data
  async updateQuiz(id, newData) {
    try {
      return await prisma.quizzes.update({
        where: { id: parseInt(id, 10) },
        data: { data: newData }
      });
    } catch (error) {
      console.error('Error in updateQuiz:', error);
      throw error;
    }
  },

  // DELETE: remove quiz record
  async deleteQuiz(id) {
    try {
      return await prisma.quizzes.delete({
        where: { id: parseInt(id, 10) }
      });
    } catch (error) {
      console.error('Error in deleteQuiz:', error);
      throw error;
    }
  }
};

export default QuizService;
