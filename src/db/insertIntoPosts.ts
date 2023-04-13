import { pool } from './pool';

// function to save inital data to database
export const saveToPosts = async (post: Post) => {
  try {
      await pool.query(
        'INSERT INTO initialposts (userid, title, body) VALUES ($1, $2, $3)',
        [post.userId, post.title, post.body],
      );
    
  } catch (error) {
    console.error(error);
  }
};
