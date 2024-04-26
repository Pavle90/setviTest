import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {fetchItem, updateItem, deleteItem} from '../services/itemServices'
import { Item } from '../types/ItemTypes'



const ItemDetails: React.FC = () => {
  const client =  useQueryClient();
  const { id } = useParams<{ id: string }>();
  const numberId = Number(id)
  const { data: item, isLoading, isError } = useQuery<Item>({
    queryKey: ['items', id],
    queryFn: () => fetchItem(numberId),
  })
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setuserId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.body);
      setuserId(item.userId)
    }
  }, [item]);

  const {mutate:mutateUpdate} = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      client.invalidateQueries({queryKey:['item', id]});
      navigate('/');
    },
  });

  const {mutate:mutateDelete} = useMutation({
    mutationFn:deleteItem,
    onSuccess: () => {
      client.invalidateQueries({queryKey:['item', id]});
      navigate('/');
    },
  });

  const handleUpdate = () => {
    mutateUpdate({ id:numberId, title, body: description, userId });
  };

  const handleDelete = () => {
    mutateDelete(Number(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h2>Item Details</h2>
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
      <Button  sx={{marginBottom:2}}variant="contained" onClick={handleUpdate}>
        Update
      </Button>
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default ItemDetails;
