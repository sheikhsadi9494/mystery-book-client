import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import useAuth from "../../../hook/useAuth";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PostModal({openPostModal,handleOpenPostModal,handleClosePostModal,}) {
    const [post, setPost] = React.useState();
    const {user} = useAuth();
    const {displayName, photoURL} = user

    const handleBlur = e => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const newPost = {...post};
        newPost[field] = value;
        setPost(newPost);
    }

    const handleSubmit = e => {
        e.preventDefault();
        // collect data 
        const postdata = {
            ...post,
            displayName,
            photoURL
        }
        // console.log(postdata)
        // post data to database
        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(postdata)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert('Post SuccessFully')
                handleClosePostModal(true)
            }
        })
    }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPostModal}
        onClose={handleClosePostModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPostModal}>
          <Box style={{ border: 0, borderRadius: "10px" }} sx={style}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                borderBottom: "1px solid gray",
                pb: 3,
                width: '100%'
              }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              create post
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box>
                    <img src={user.photoURL} style={{width: '60px', borderRadius: '50%'}} alt="" />
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight: 'bold', mx: 2}} variant="body2">
                {user.displayName}
            </Typography>
                    <Typography sx={{fontWeight: 'bold', mx: 2}} variant="body2">
                {user.email}
            </Typography>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit}>
                   <TextField
                   id="standard-multiline-static"
                   label="What's On Your Mind"
                   multiline
                   rows={4}
                   sx={{width: '100%'}}
                   variant="standard"
                   name="post"
                   onBlur={handleBlur}
                   />
                   <TextField
                    label="Image Url"
                    variant="standard" 
                    sx={{width: '100%'}}
                    name="postImg"
                    onBlur={handleBlur}
                    />
                    <Button type="submit" sx={{width: '100%', mt: 3}} variant="contained">Post</Button>
                </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
