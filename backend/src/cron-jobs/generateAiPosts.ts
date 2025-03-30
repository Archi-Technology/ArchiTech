import { PostService } from "../services/post.service";

const cron = require('node-cron');
const postService = new PostService();

cron.schedule('0 0 * * *', async () => {
    try {
        await postService.createPostGeneratedByAI();
        console.log('executed cron job successfully');
    } catch (e) {
        console.log('failed to execure cron job, got the error:', e);
    }
});