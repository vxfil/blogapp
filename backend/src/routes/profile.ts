import express from 'express';
import * as profileController from '../controllers/profileController';
import pasport from 'passport';

const profileRouter = express.Router();

profileRouter.post(
  '/upload_avatar',
  pasport.authenticate('jwt', { session: false }),
  profileController.uploadAvatar
);

profileRouter.post(
  '/update_profile',
  pasport.authenticate('jwt', { session: false }),
  profileController.updateProfile
);

profileRouter.get(
  '/profile_info/:id',
  pasport.authenticate('jwt', { session: false }),
  profileController.profileInfo
);

export default profileRouter;
