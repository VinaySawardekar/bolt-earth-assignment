import User from "../modules/user/model";
import { environment } from "../config/environment";

/**
 * Creates a default user if not present.
 * @returns {Promise<void>}
 */
const createDefaultUser = async (): Promise<void> => {
  try {
    // Check if the user already exists
    const user = await User.findOne({
      email: environment.config.DEFUALT_USER_EMAIL,
    });
    if (!user) {
      console.log("Creating default user...");
      // Create a new user
      const newUser = await User.create({
        email: environment.config.DEFUALT_USER_EMAIL,
        username: environment.config.DEFAULT_USER_NAME,
        password: environment.config.DEFAULT_USER_PASSWORD,
      });
      // Save the user
      newUser.save();
      console.log("User created successfully");
    }
  } catch (error: any) {
    // Catch any errors
    console.error("Error creating default user:", error);
  }
};

export default createDefaultUser;
