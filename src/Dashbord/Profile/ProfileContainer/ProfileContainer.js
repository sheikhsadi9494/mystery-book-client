import { Box } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';

const ProfileContainer = () => {
    return (
        <div>
            <Box>
            <UserInfo></UserInfo>
            </Box>
            <Outlet />
        </div>
    );
};

export default ProfileContainer;