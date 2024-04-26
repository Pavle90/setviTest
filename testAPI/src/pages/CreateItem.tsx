import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem } from '../services/itemServices';

const CreateItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //random generating userId due to user creation
  const userId = Math.floor(Math.random() * 100) + 1;
  const navigate = useNavigate();
  const client =  useQueryClient();


  const {mutate:mutateCreate} = useMutation({
    mutationFn:createItem, 
    onSuccess: () => {
      client.invalidateQueries({queryKey:['items']});
      navigate('/');
    },
  });

  const handleSubmit = () => {
    mutateCreate({ title, body: description, userId });
  };

  return (
    <div>
      <h2>Create Item</h2>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        multiline
        rows={1}
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default CreateItem;
