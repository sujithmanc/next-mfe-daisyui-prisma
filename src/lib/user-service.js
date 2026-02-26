import prisma from './prisma';

const UserService = {
  // CREATE: Add a new user
  async createUser(username, email = null) {
    try {
      return await prisma.users.create({
        data: {
          username: username,
          email: email
        }
      });
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  },

  // READ: Get all users
  async getAllUsers() {
    try {
      return await prisma.users.findMany({
        orderBy: { created_at: 'desc' }
      });
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
  },

  // READ: Get a single user by ID
  async getUserById(id) {
    try {
      return await prisma.users.findUnique({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw error;
    }
  },

  // UPDATE: Change username or email
  async updateUser(id, updateData) {
    try {
      return await prisma.users.update({
        where: { id: parseInt(id) },
        data: updateData
      });
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  },

  // DELETE: Remove a user
  async deleteUser(id) {
    try {
      return await prisma.users.delete({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw error;
    }
  }
};

export default UserService;