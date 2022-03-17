import { Button, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import PostModal from "../PostModal/PostModal";

const AddPost = () => {
  const { user } = useAuth();

  const [openPostModal, setOpenPostModal] = React.useState(false);
  const handleOpenPostModal = () => setOpenPostModal(true);
  const handleClosePostModal = () => setOpenPostModal(false);

  return (
    <Container>
      <Paper sx={{borderRadius: 3}} variant="outlined" square>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', p: 2}}>
          <Box sx={{textAlign: 'center'}}>
              <Link to="/profile">
              <img style={{borderRadius: '50%', width: '70px'}} src={user.photoURL} alt="" />
              </Link>
          </Box>
          <Box sx={{width: '70%', borderRadius: 16}}>
              <Button onClick={handleOpenPostModal} sx={{width: '100%', backgroundColor: '#F3F3F4', color: 'black', ":hover": {backgroundColor: "#E4E4EB"} }}>Whats On Your Mind {user.displayName}?</Button>
          </Box>
        </Box>
      </Paper>
      <PostModal
      openPostModal={openPostModal}
      handleOpenPostModal={handleOpenPostModal}
      handleClosePostModal={handleClosePostModal}
      ></PostModal>
    </Container>
  );
};

export default AddPost;
